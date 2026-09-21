import ArticleLayout from '../../Blogs/ArticleLayout/ArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import {
    JAVASCRIPT_ASYNC_ROUTE,
    JAVASCRIPT_EVENT_LOOP_ROUTE,
    NOTES_ROUTE,
    toHref,
} from '../../routing/routes';

const sections: TocEntry[] = [
    { id: 'mental-model', title: 'The runtime model' },
    { id: 'callbacks', title: 'Callbacks' },
    { id: 'promises', title: 'Promises' },
    { id: 'promise-chains', title: 'Promise chains and errors' },
    { id: 'async-await', title: 'async and await' },
    { id: 'scheduling', title: 'The event loop and scheduling' },
    { id: 'sequential-concurrent', title: 'Sequential and concurrent work' },
    { id: 'combinators', title: 'Promise combinators' },
    { id: 'network-requests', title: 'Network requests' },
    { id: 'cancellation', title: 'Cancellation and timeouts' },
    { id: 'retries', title: 'Retries' },
    { id: 'bounded-concurrency', title: 'Bounded concurrency' },
    { id: 'application-patterns', title: 'Application patterns' },
    { id: 'common-mistakes', title: 'Common mistakes' },
    { id: 'reasoning-about-async', title: 'How to reason about asynchronous code' },
];

const callbackExample = `function readUser(userId, onSuccess, onError) {
  fetchUser(userId, (error, user) => {
    if (error) {
      onError(error);
      return;
    }

    onSuccess(user);
  });
}`;

const promiseCreationExample = `function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(milliseconds), milliseconds);
  });
}

const delay = wait(500); // pending Promise

delay.then((milliseconds) => {
  console.log(\`Waited \${milliseconds} ms\`);
});`;

const promisifyExample = `function getValueAsPromise(key) {
  return new Promise((resolve, reject) => {
    legacyGetValue(key, (error, value) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(value);
    });
  });
}`;

const chainExample = `getUser(7)
  .then((user) => getOrders(user.id)) // return the next Promise
  .then((orders) => orders.filter((order) => order.isOpen))
  .then((openOrders) => {
    console.log(openOrders);
  })
  .catch((error) => {
    console.error('The chain failed:', error);
  })
  .finally(() => {
    hideLoadingIndicator();
  });`;

const recoveryExample = `loadPreferences()
  .catch((error) => {
    console.warn('Using defaults:', error);
    return defaultPreferences; // chain becomes fulfilled
  })
  .then(renderPreferences);`;

const asyncAwaitExample = `async function loadDashboard(userId) {
  showLoadingIndicator();

  try {
    const user = await getUser(userId);
    const orders = await getOrders(user.id);
    return { user, orders };
  } catch (error) {
    throw new Error('Could not load dashboard', { cause: error });
  } finally {
    hideLoadingIndicator();
  }
}

loadDashboard(7).then(renderDashboard).catch(showError);`;

const schedulingExample = `console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));
queueMicrotask(() => console.log('D'));

console.log('E');

// Output: A, E, C, D, B`;

const awaitSchedulingExample = `async function showOrder() {
  console.log('2');
  await null;
  console.log('4');
}

console.log('1');
showOrder();
console.log('3');

// Output: 1, 2, 3, 4`;

const sequentialExample = `// Sequential: second request starts after the first finishes.
const user = await getUser();
const settings = await getSettings();

// Concurrent: both requests start before either is awaited.
const userPromise = getUser();
const settingsPromise = getSettings();
const [user, settings] = await Promise.all([
  userPromise,
  settingsPromise,
]);`;

const dependencyExample = `const user = await getUser();

// These depend on user, but not on each other.
const [orders, permissions] = await Promise.all([
  getOrders(user.id),
  getPermissions(user.role),
]);`;

const combinatorExample = `const results = await Promise.allSettled([
  loadProfile(),
  loadRecommendations(),
  loadNotifications(),
]);

for (const result of results) {
  if (result.status === 'fulfilled') {
    console.log(result.value);
  } else {
    console.error(result.reason);
  }
}`;

const fetchExample = `class HttpError extends Error {
  constructor(response) {
    super(\`HTTP \${response.status}\`);
    this.name = 'HttpError';
    this.status = response.status;
  }
}

async function getUser(userId, { signal } = {}) {
  const response = await fetch(\`/api/users/\${userId}\`, { signal });

  if (!response.ok) {
    throw new HttpError(response);
  }

  return response.json();
}`;

const cancellationExample = `async function loadUser(userId) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    return await getUser(userId, { signal: controller.signal });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('The request was cancelled or timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}`;

const latestRequestExample = `let activeController;

async function search(query) {
  activeController?.abort();
  const controller = new AbortController();
  activeController = controller;

  try {
    const response = await fetch(
      \`/api/search?q=\${encodeURIComponent(query)}\`,
      { signal: controller.signal },
    );
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return await response.json();
  } finally {
    if (activeController === controller) activeController = undefined;
  }
}`;

const retryExample = `const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function retry(operation, { attempts = 3, baseDelay = 250 } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === attempts) break;
      await sleep(baseDelay * 2 ** (attempt - 1));
    }
  }

  throw lastError;
}

const user = await retry(() => getUser(7));`;

const concurrencyExample = `async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex]);
    }
  }

  const workerCount = Math.min(limit, items.length);
  const workers = Array.from({ length: workerCount }, () => worker());
  await Promise.all(workers);
  return results;
}

const users = await mapWithConcurrency(ids, 4, getUser);`;

const debounceExample = `function debounce(callback, delay) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

const searchAfterTypingStops = debounce(search, 300);`;

const asyncIterableExample = `async function* paginatedUsers() {
  let nextPage = '/api/users';

  while (nextPage) {
    const response = await fetch(nextPage);
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    const page = await response.json();
    yield page.users;
    nextPage = page.nextPage;
  }
}

for await (const users of paginatedUsers()) {
  renderUsers(users);
}`;

const mistakesExample = `// Wrong: forEach does not wait for async callbacks.
await ids.forEach(async (id) => saveUser(id));

// Sequential, when order or rate limits require it.
for (const id of ids) {
  await saveUser(id);
}

// Concurrent, when the operations are independent.
await Promise.all(ids.map((id) => saveUser(id)));`;

const floatingPromiseExample = `// Await it when the caller must know whether it worked.
await saveSettings(settings);

// Return it when your caller should await it.
return saveSettings(settings);

// Mark intentional fire-and-forget work, and handle its failure.
void sendAnalytics(event).catch(reportAnalyticsError);`;

const JavaScriptAsync = () => (
    <ArticleLayout
        title="Asynchronous Programming in JavaScript"
        route={JAVASCRIPT_ASYNC_ROUTE}
        sections={sections}
        backRoute={NOTES_ROUTE}
        backLabel="Back to notes"
    >
        <section className="Article__section">
            <p>
                JavaScript runs your code one piece at a time on its main thread. Asynchronous
                programming lets that thread start slow work, continue with other work, and handle
                the result later. The slow work may be a network request, timer, or user event.
            </p>
            <p>
                Learn the runtime model first. Callbacks, Promises, and <code>async</code>/<code>await</code>
                are different ways to express what should happen when asynchronous work finishes.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="mental-model">
            <h2 id="mental-model" className="SectionTitle">The runtime model</h2>
            <p>
                The JavaScript engine has a call stack. A function starts, runs until it returns,
                and leaves the stack. JavaScript does not pause the stack while its host environment
                waits for a timer, network response, or user event.
            </p>
            <ol className="Article__steps">
                <li>JavaScript calls a runtime API such as <code>fetch</code> or <code>setTimeout</code>.</li>
                <li>The host environment manages that operation outside the JavaScript call stack.</li>
                <li>Your current synchronous code finishes.</li>
                <li>The runtime queues work that represents the result.</li>
                <li>The event loop moves queued work to the stack when the stack is empty.</li>
            </ol>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Term</th><th scope="col">Meaning</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">Synchronous</th><td>The caller waits while the operation finishes.</td></tr>
                        <tr><th scope="row">Asynchronous</th><td>The operation can finish later. Its result is delivered later.</td></tr>
                        <tr><th scope="row">Concurrency</th><td>Multiple operations make progress during the same period.</td></tr>
                        <tr><th scope="row">Parallelism</th><td>Multiple operations execute at the same instant, usually on different threads or processors.</td></tr>
                        <tr><th scope="row">Non-blocking</th><td>Starting an operation does not keep the JavaScript thread occupied while it waits.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                Asynchronous does not automatically mean parallel. JavaScript callbacks on one event
                loop still run one at a time. CPU-heavy JavaScript still delays user input, rendering,
                timers, and Promise handlers.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="callbacks">
            <h2 id="callbacks" className="SectionTitle">Callbacks</h2>
            <p>
                A callback is a function passed to other code so that code can call it later.
                Timers and user events use callbacks. Callbacks are not always asynchronous.
                <code>array.map(callback)</code> calls its callback synchronously.
            </p>
            <CodeBlock language="javascript">{callbackExample}</CodeBlock>
            <p>Callback-based asynchronous code has three recurring problems:</p>
            <ul className="Article__notes">
                <li>Nested steps become hard to read.</li>
                <li>Each level must forward errors correctly.</li>
                <li>The API must define whether the callback can run zero, one, or many times.</li>
            </ul>
            <p>
                Event listeners should run many times. A single operation should normally settle once.
                Promises give single-result operations a standard contract.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="promises">
            <h2 id="promises" className="SectionTitle">Promises</h2>
            <p>
                A Promise is an object that represents one eventual result. It starts as
                <code> pending</code>, then becomes either <code>fulfilled</code> with a value or
                <code> rejected</code> with a reason. Once settled, its state cannot change.
            </p>
            <CodeBlock language="javascript">{promiseCreationExample}</CodeBlock>
            <ul className="Article__notes">
                <li><code>resolve(value)</code> fulfills the Promise, unless the value is another Promise or thenable.</li>
                <li><code>reject(error)</code> rejects it. Reject with an <code>Error</code> object so the stack and message are useful.</li>
                <li>The Promise constructor runs its executor immediately and synchronously.</li>
                <li><code>.then</code>, <code>.catch</code>, and <code>.finally</code> handlers always run later.</li>
            </ul>
            <p>
                Most application code consumes Promises returned by existing APIs. Use
                <code> new Promise</code> when adapting a callback or event API, not when you already
                have a Promise.
            </p>
            <CodeBlock language="javascript">{promisifyExample}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="promise-chains">
            <h2 id="promise-chains" className="SectionTitle">Promise chains and errors</h2>
            <p>
                Every call to <code>.then</code>, <code>.catch</code>, or <code>.finally</code> returns a
                new Promise. The handler controls how that new Promise settles.
            </p>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Handler action</th><th scope="col">Resulting Promise</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">Returns a plain value</th><td>Fulfills with that value.</td></tr>
                        <tr><th scope="row">Returns a Promise</th><td>Adopts that Promise's eventual state.</td></tr>
                        <tr><th scope="row">Throws an error</th><td>Rejects with that error.</td></tr>
                        <tr><th scope="row">Has no rejection handler</th><td>The rejection continues down the chain.</td></tr>
                    </tbody>
                </table>
            </div>
            <CodeBlock language="javascript">{chainExample}</CodeBlock>
            <p>
                Return the next Promise from each handler. Without <code>return</code>, the chain does
                not wait for it and cannot catch its failure. A <code>.catch</code> can recover by
                returning a value. Throw again when it cannot recover.
            </p>
            <CodeBlock language="javascript">{recoveryExample}</CodeBlock>
            <p>
                <code>.finally</code> is for cleanup. It receives no result argument. Its return value
                is normally ignored, so it does not replace the result. A thrown error or rejected
                Promise inside <code>finally</code> does replace it with a rejection.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="async-await">
            <h2 id="async-await" className="SectionTitle">async and await</h2>
            <p>
                An <code>async</code> function always returns a Promise. Returning <code>42</code> fulfills
                it with <code>42</code>. Throwing rejects it. The <code>await</code> keyword pauses only
                that async function. It does not block the JavaScript thread.
            </p>
            <CodeBlock language="javascript">{asyncAwaitExample}</CodeBlock>
            <ul className="Article__notes">
                <li><code>await promise</code> produces the fulfillment value.</li>
                <li>If the Promise rejects, <code>await</code> throws that reason.</li>
                <li><code>await plainValue</code> still resumes asynchronously.</li>
                <li>Use <code>try/catch</code> only where you can add context, recover, or present an error.</li>
                <li>Do not catch an error only to log and hide it. Callers may need the failure.</li>
            </ul>
            <p>
                Top-level <code>await</code> works in modern JavaScript modules. In normal scripts and
                many build setups, put the code inside an async function instead.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="scheduling">
            <h2 id="scheduling" className="SectionTitle">The event loop and scheduling</h2>
            <p>
                After the current stack finishes, the runtime drains the microtask queue before it
                takes the next task. Promise handlers, code after <code>await</code>, and
                <code> queueMicrotask</code> use microtasks. Timers, many events, and I/O callbacks use
                task queues. The precise task queues belong to the host environment. Promise
                microtasks run before the next timer task in the browser model used in this note.
            </p>
            <CodeBlock language="javascript">{schedulingExample}</CodeBlock>
            <CodeBlock language="javascript">{awaitSchedulingExample}</CodeBlock>
            <p>
                A zero-millisecond timer means “not before this delay.” It does not mean “run now.”
                Long synchronous code delays it. A loop that continually queues microtasks can also
                delay timers and rendering.
            </p>
            <p>
                See the
                {' '}<a className="Link" href={toHref(JAVASCRIPT_EVENT_LOOP_ROUTE)}>event loop and task queues note</a>
                {' '}for detailed browser and Node.js scheduling rules.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="sequential-concurrent">
            <h2 id="sequential-concurrent" className="SectionTitle">Sequential and concurrent work</h2>
            <p>
                An operation starts when you call the function that creates its Promise, not when you
                await it. Start independent operations first, then await them together. Await in order
                when a later operation needs an earlier result or the system requires ordering.
            </p>
            <CodeBlock language="javascript">{sequentialExample}</CodeBlock>
            <CodeBlock language="javascript">{dependencyExample}</CodeBlock>
            <p>
                Concurrency improves waiting time, but it increases load. Do not start thousands of
                requests together. Use bounded concurrency when the input can be large.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="combinators">
            <h2 id="combinators" className="SectionTitle">Promise combinators</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">API</th><th scope="col">Settles when</th><th scope="col">Use</th></tr></thead>
                    <tbody>
                        <tr><th scope="row"><code>Promise.all</code></th><td>All fulfill, or the first rejects.</td><td>Every result is required.</td></tr>
                        <tr><th scope="row"><code>Promise.allSettled</code></th><td>Every input settles.</td><td>Keep successes and inspect every failure.</td></tr>
                        <tr><th scope="row"><code>Promise.race</code></th><td>The first input settles.</td><td>Observe the first result or failure.</td></tr>
                        <tr><th scope="row"><code>Promise.any</code></th><td>The first input fulfills, or all reject.</td><td>Use the first successful source.</td></tr>
                    </tbody>
                </table>
            </div>
            <CodeBlock language="javascript">{combinatorExample}</CodeBlock>
            <ul className="Article__notes">
                <li>All combinators preserve input order in their result, not completion order.</li>
                <li><code>Promise.all</code> rejects early, but it does not cancel the other operations.</li>
                <li><code>Promise.race</code> does not cancel the operations that lose.</li>
                <li><code>Promise.any</code> rejects with <code>AggregateError</code> when every input rejects.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="network-requests">
            <h2 id="network-requests" className="SectionTitle">Network requests</h2>
            <p>
                <code>fetch</code> is a browser API that returns a Promise. It rejects for a network
                failure or cancellation. It normally
                fulfills for HTTP errors such as 404 and 500. Check <code>response.ok</code> before
                reading the body.
            </p>
            <CodeBlock language="javascript">{fetchExample}</CodeBlock>
            <ul className="Article__notes">
                <li>A successful HTTP response can still contain invalid or unexpected data. Validate data at the boundary.</li>
                <li>Reading the body with <code>json()</code> is asynchronous and can fail.</li>
                <li>Do not show raw internal errors or secrets to users.</li>
                <li>Separate loading, success, empty, error, and cancelled states in the UI.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="cancellation">
            <h2 id="cancellation" className="SectionTitle">Cancellation and timeouts</h2>
            <p>
                A Promise has no general <code>cancel</code> method. The underlying operation must
                support cancellation. <code>AbortController</code> is the standard signal-based API
                used by <code>fetch</code> and other browser APIs.
            </p>
            <CodeBlock language="javascript">{cancellationExample}</CodeBlock>
            <p>
                Cancellation is normal control flow when a user leaves a page, replaces a search,
                or no longer needs a result. Keep it separate from a real network or server failure.
                Aborting saves resources and prevents stale work where the API supports it.
            </p>
            <h3 className="Article__subTitle">Latest request wins</h3>
            <p>
                Search boxes often start overlapping requests. A slower old response must not replace
                a newer result. Abort the previous request or compare a request identifier before
                updating state.
            </p>
            <CodeBlock language="javascript">{latestRequestExample}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="retries">
            <h2 id="retries" className="SectionTitle">Retries</h2>
            <p>
                Retry only failures that may be temporary, such as a network interruption, 429, or
                selected 5xx responses. Do not normally retry validation errors, authentication
                failures, or other permanent 4xx responses. Retrying a write can duplicate data
                unless the operation is idempotent or uses an idempotency key.
            </p>
            <CodeBlock language="javascript">{retryExample}</CodeBlock>
            <ul className="Article__notes">
                <li>Use a small attempt limit.</li>
                <li>Increase the delay after each failure. Add random jitter in larger systems so clients do not retry together.</li>
                <li>Honor server guidance such as <code>Retry-After</code>.</li>
                <li>Allow cancellation during both the operation and the delay.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="bounded-concurrency">
            <h2 id="bounded-concurrency" className="SectionTitle">Bounded concurrency</h2>
            <p>
                <code>Promise.all(items.map(doWork))</code> starts every operation immediately. That is
                fine for a small fixed list. For a large list, run a fixed number of workers.
            </p>
            <CodeBlock language="javascript">{concurrencyExample}</CodeBlock>
            <p>
                Decide the limit from the API rate limit, memory use, and operation cost. The worker
                pattern matters even when a project uses an existing concurrency helper.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="application-patterns">
            <h2 id="application-patterns" className="SectionTitle">Application patterns</h2>
            <h3 className="Article__subTitle">Debounce frequent input</h3>
            <p>
                Debouncing waits until calls stop for a period. It reduces search requests while a
                user types. It does not cancel a request that already started, so combine it with
                request cancellation when needed.
            </p>
            <CodeBlock language="javascript">{debounceExample}</CodeBlock>
            <h3 className="Article__subTitle">Consume values over time</h3>
            <p>
                A Promise represents one result. An async iterable represents a sequence of results.
                Use <code>for await...of</code> for paginated data, streams, or other asynchronous
                sequences that expose the async-iteration contract.
            </p>
            <CodeBlock language="javascript">{asyncIterableExample}</CodeBlock>
            <h3 className="Article__subTitle">Keep ownership clear</h3>
            <ul className="Article__notes">
                <li>The function that starts work should return its Promise.</li>
                <li>The layer that can recover should catch the error.</li>
                <li>The layer that owns a resource should clean it up in <code>finally</code> or a lifecycle cleanup.</li>
                <li>The caller should decide whether work is sequential, concurrent, cancellable, or fire-and-forget.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="common-mistakes">
            <h2 id="common-mistakes" className="SectionTitle">Common mistakes</h2>
            <h3 className="Article__subTitle">Using forEach with async callbacks</h3>
            <CodeBlock language="javascript">{mistakesExample}</CodeBlock>
            <h3 className="Article__subTitle">Leaving a floating Promise</h3>
            <p>
                A Promise that is neither awaited, returned, nor given a rejection handler can fail
                without the caller knowing. This can produce an unhandled rejection.
            </p>
            <CodeBlock language="javascript">{floatingPromiseExample}</CodeBlock>
            <h3 className="Article__subTitle">More mistakes to avoid</h3>
            <ul className="Article__notes">
                <li>Do not wrap an existing Promise in <code>new Promise</code> without a real adapter need.</li>
                <li>Do not use an <code>async</code> Promise executor. Its thrown errors do not reliably reject the outer Promise.</li>
                <li>Do not write <code>await array.map(async ...)</code>. Await <code>Promise.all(array.map(async ...))</code>.</li>
                <li>Do not make independent operations sequential by awaiting each call immediately.</li>
                <li>Do not assume <code>try/catch</code> catches a Promise you started but did not await or return.</li>
                <li>Do not mix callbacks and Promises for the same result unless an API requires it.</li>
                <li>Do not forget cleanup for timers, event listeners, subscriptions, and in-flight requests.</li>
                <li>Do not use a delay as proof that asynchronous work finished. Await the actual completion signal.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="reasoning-about-async">
            <h2 id="reasoning-about-async" className="SectionTitle">How to reason about asynchronous code</h2>
            <p>For output-order questions, write down these queues instead of guessing:</p>
            <ol className="Article__steps">
                <li>Run all synchronous statements in stack order.</li>
                <li>Record Promise handlers and continuations after <code>await</code> as microtasks.</li>
                <li>Record timers and events as tasks.</li>
                <li>When the stack is empty, drain microtasks in queue order.</li>
                <li>Take the next eligible task, then drain microtasks again.</li>
            </ol>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Question</th><th scope="col">Required answer</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">Is JavaScript single-threaded?</th><td>Code on one event loop runs one callback at a time. The host can perform supporting work outside that call stack.</td></tr>
                        <tr><th scope="row">Does await block?</th><td>It pauses that async function and schedules its continuation. It does not block the event-loop thread.</td></tr>
                        <tr><th scope="row">Promise versus callback?</th><td>A callback is a function invocation contract. A Promise is a composable object for one eventual result and standardized error propagation.</td></tr>
                        <tr><th scope="row">Promise.all failure?</th><td>The returned Promise rejects on the first observed rejection. Other operations keep running unless separately cancelled.</td></tr>
                        <tr><th scope="row">then versus await?</th><td>They consume the same Promise contract. Await gives sequential-looking control flow; then is useful for direct composition.</td></tr>
                        <tr><th scope="row">Why did a timer run late?</th><td>Its delay is a minimum. The current task and queued microtasks must finish first.</td></tr>
                        <tr><th scope="row">How do you avoid race conditions?</th><td>Cancel stale work, attach an identity or version, serialize dependent updates, or make the operation idempotent.</td></tr>
                        <tr><th scope="row">How do you handle many requests?</th><td>Use bounded concurrency, rate-limit awareness, cancellation, retry rules, and explicit partial-failure behavior.</td></tr>
                    </tbody>
                </table>
            </div>
        </section>
    </ArticleLayout>
);

export default JavaScriptAsync;
