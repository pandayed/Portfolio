import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import JavaScriptRunner from '../JavaScriptRunner/JavaScriptRunner';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import {
    JAVASCRIPT_ASYNC_ROUTE,
    JAVASCRIPT_EVENT_LOOP_ROUTE,
    JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE,
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
        backRoute={JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}
        backLabel="Back to JavaScript and TypeScript notes"
    >
        <section className="Article__section">
            <ul className="Article__notes">
                <li>JavaScript runs one callback at a time on an event-loop thread.</li>
                <li>Asynchronous work can finish later while that thread runs other code.</li>
                <li>Examples include network requests, timers, and user events.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="mental-model">
            <h2 id="mental-model" className="SectionTitle">The runtime model</h2>
            <ul className="Article__notes">
                <li>The call stack tracks function calls that have not returned.</li>
                <li>A function call adds work to the stack. Returning removes that call.</li>
                <li>The host environment, such as a browser, manages waits for timers, network responses, and user events.</li>
            </ul>
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
            <ul className="Article__notes">
                <li>Asynchronous work does not always run in parallel.</li>
                <li>JavaScript callbacks on one event loop run one at a time.</li>
                <li>Long calculations delay user input, rendering, timers, and Promise handlers on that thread.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="callbacks">
            <h2 id="callbacks" className="SectionTitle">Callbacks</h2>
            <ul className="Article__notes">
                <li>A callback is a function passed to other code for that code to call.</li>
                <li>Timers and user events use callbacks.</li>
                <li>A callback can also run synchronously. <code>array.map(callback)</code> calls its callback before <code>map</code> returns.</li>
            </ul>
            <CodeBlock language="javascript">{callbackExample}</CodeBlock>
            <ul className="Article__notes">
                <li>Nested steps become hard to read.</li>
                <li>Each level must forward errors correctly.</li>
                <li>The API must define whether the callback can run zero, one, or many times.</li>
                <li>Event listeners can run many times.</li>
                <li>Promises represent operations with one result.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="promises">
            <h2 id="promises" className="SectionTitle">Promises</h2>
            <ul className="Article__notes">
                <li>A Promise is an object that represents a result that may arrive later.</li>
                <li>A new Promise is <code>pending</code>. It has no result yet.</li>
                <li>A <code>fulfilled</code> Promise has a value. A <code>rejected</code> Promise has a reason for failure.</li>
                <li>A Promise is settled when it is fulfilled or rejected. Its state cannot change after that.</li>
            </ul>
            <JavaScriptRunner>{promiseCreationExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li><code>resolve(value)</code> fulfills the Promise, unless the value is another Promise or thenable.</li>
                <li>A thenable is an object with a callable <code>then</code> method. The Promise follows its result.</li>
                <li><code>reject(error)</code> rejects it. Reject with an <code>Error</code> object so the stack and message are useful.</li>
                <li>The executor is the function passed to <code>new Promise</code>. The constructor calls it immediately and synchronously.</li>
                <li><code>.then</code>, <code>.catch</code>, and <code>.finally</code> handlers always run later.</li>
                <li>Use Promises returned by existing APIs.</li>
                <li>Use <code>new Promise</code> to convert a callback or event API to a Promise.</li>
            </ul>
            <CodeBlock language="javascript">{promisifyExample}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="promise-chains">
            <h2 id="promise-chains" className="SectionTitle">Promise chains and errors</h2>
            <ul className="Article__notes">
                <li>Each call to <code>.then</code>, <code>.catch</code>, or <code>.finally</code> returns a new Promise.</li>
                <li>The handler is the callback passed to that method. Its result affects the new Promise.</li>
            </ul>
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
            <ul className="Article__notes">
                <li>Return the next Promise from each handler so the chain waits for it and can catch its failure.</li>
                <li>Without <code>return</code>, that operation runs outside the chain.</li>
                <li>A <code>.catch</code> handler can recover by returning a value. Throw the error again if it cannot recover.</li>
            </ul>
            <CodeBlock language="javascript">{recoveryExample}</CodeBlock>
            <ul className="Article__notes">
                <li>Use <code>.finally</code> for cleanup. Its callback receives no result argument.</li>
                <li>Its return value normally does not replace the result.</li>
                <li>If the callback throws or returns a rejected Promise, the new Promise rejects instead.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="async-await">
            <h2 id="async-await" className="SectionTitle">async and await</h2>
            <ul className="Article__notes">
                <li>An <code>async</code> function always returns a Promise.</li>
                <li>Returning <code>42</code> fulfills that Promise with <code>42</code>. Throwing an error rejects it.</li>
                <li><code>await</code> pauses only that async function. It does not block the JavaScript thread.</li>
            </ul>
            <CodeBlock language="javascript">{asyncAwaitExample}</CodeBlock>
            <ul className="Article__notes">
                <li><code>await promise</code> produces the fulfillment value.</li>
                <li>If the Promise rejects, <code>await</code> throws that reason.</li>
                <li><code>await plainValue</code> still resumes asynchronously.</li>
                <li>Use <code>try/catch</code> only where you can add context, recover, or present an error.</li>
                <li>Do not catch an error only to log and hide it. Callers may need the failure.</li>
                <li>Top-level <code>await</code> is available in modern JavaScript modules.</li>
                <li>In normal scripts or build setups that do not support it, use an async function.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="scheduling">
            <h2 id="scheduling" className="SectionTitle">The event loop and scheduling</h2>
            <ul className="Article__notes">
                <li>A microtask is queued work that runs after the current synchronous work and before the next task.</li>
                <li>Promise handlers, code after <code>await</code>, and <code>queueMicrotask</code> use microtasks.</li>
                <li>The runtime runs queued microtasks until the queue is empty.</li>
                <li>Timers, many events, and input/output (I/O) callbacks use queues managed by the host environment.</li>
                <li>In this browser example, Promise microtasks run before the next timer task.</li>
            </ul>
            <JavaScriptRunner>{schedulingExample}</JavaScriptRunner>
            <JavaScriptRunner>{awaitSchedulingExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li>A timer delay is the minimum wait before its callback becomes eligible to run.</li>
                <li>A zero-millisecond delay does not run the callback immediately.</li>
                <li>Long synchronous code or a loop that keeps adding microtasks can delay timers and rendering.</li>
                <li>Read the <a className="Link" href={toHref(JAVASCRIPT_EVENT_LOOP_ROUTE)}>event loop and task queues note</a> for browser and Node.js scheduling rules.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="sequential-concurrent">
            <h2 id="sequential-concurrent" className="SectionTitle">Sequential and concurrent work</h2>
            <ul className="Article__notes">
                <li>In these examples, calling the function starts the operation. <code>await</code> waits for its result.</li>
                <li>Start independent operations first, then await them together.</li>
                <li>Await operations in order when one needs an earlier result or the system requires that order.</li>
            </ul>
            <CodeBlock language="javascript">{sequentialExample}</CodeBlock>
            <CodeBlock language="javascript">{dependencyExample}</CodeBlock>
            <ul className="Article__notes">
                <li>Concurrent operations can reduce waiting time. They also increase load.</li>
                <li>Bounded concurrency limits how many operations run at once. Use it for large input lists.</li>
            </ul>
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
                <li><code>Promise.all</code> and <code>Promise.allSettled</code> return result arrays in input order.</li>
                <li><code>Promise.race</code> uses the first input to settle. <code>Promise.any</code> uses the first input to fulfill.</li>
                <li><code>Promise.all</code> rejects early, but it does not cancel the other operations.</li>
                <li><code>Promise.race</code> does not cancel the operations that lose.</li>
                <li><code>Promise.any</code> rejects with <code>AggregateError</code> when every input rejects.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="network-requests">
            <h2 id="network-requests" className="SectionTitle">Network requests</h2>
            <ul className="Article__notes">
                <li><code>fetch</code> returns a Promise.</li>
                <li>It rejects for a network failure or cancellation.</li>
                <li>It normally fulfills for HTTP errors such as 404 and 500.</li>
                <li>Check <code>response.ok</code> before reading the body.</li>
            </ul>
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
            <ul className="Article__notes">
                <li>A Promise has no general <code>cancel</code> method. The operation itself must support cancellation.</li>
                <li><code>AbortController</code> sends an abort signal to APIs such as <code>fetch</code>.</li>
            </ul>
            <CodeBlock language="javascript">{cancellationExample}</CodeBlock>
            <ul className="Article__notes">
                <li>Cancel work when a user leaves a page, replaces a search, or no longer needs its result.</li>
                <li>Handle cancellation separately from network and server failures.</li>
                <li>If the API supports cancellation, aborting can save resources and stop old work.</li>
            </ul>
            <h3 className="Article__subTitle">Latest request wins</h3>
            <ul className="Article__notes">
                <li>Search requests can overlap.</li>
                <li>An older response must not replace a newer result.</li>
                <li>Abort the previous request or check a request identifier before updating state.</li>
            </ul>
            <CodeBlock language="javascript">{latestRequestExample}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="retries">
            <h2 id="retries" className="SectionTitle">Retries</h2>
            <ul className="Article__notes">
                <li>Retry failures that may be temporary, such as a network interruption, HTTP 429, or selected 5xx responses.</li>
                <li>Do not normally retry validation errors, authentication failures, or permanent 4xx responses.</li>
                <li>Retrying a write can duplicate data.</li>
                <li>An idempotent operation has the same effect when repeated. An idempotency key lets the server identify repeated attempts at one operation.</li>
            </ul>
            <CodeBlock language="javascript">{retryExample}</CodeBlock>
            <ul className="Article__notes">
                <li>Use a small attempt limit.</li>
                <li>Increase the delay after each failure. In larger systems, add a random delay, called jitter, so clients do not retry together.</li>
                <li>Honor server guidance such as <code>Retry-After</code>.</li>
                <li>Allow cancellation during both the operation and the delay.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="bounded-concurrency">
            <h2 id="bounded-concurrency" className="SectionTitle">Bounded concurrency</h2>
            <ul className="Article__notes">
                <li><code>Promise.all(items.map(doWork))</code> calls <code>doWork</code> for every item immediately.</li>
                <li>Use this for a small fixed list.</li>
                <li>For a large list, use a fixed number of workers to limit concurrent operations.</li>
            </ul>
            <CodeBlock language="javascript">{concurrencyExample}</CodeBlock>
            <ul className="Article__notes">
                <li>Choose the limit from the API rate limit, memory use, and cost of each operation.</li>
                <li>A concurrency helper still needs a suitable limit.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="application-patterns">
            <h2 id="application-patterns" className="SectionTitle">Application patterns</h2>
            <h3 className="Article__subTitle">Debounce frequent input</h3>
            <ul className="Article__notes">
                <li>Debouncing waits until calls stop for a set period.</li>
                <li>For search input, it reduces requests while the user types.</li>
                <li>It does not cancel a request that has already started. Add cancellation when needed.</li>
            </ul>
            <CodeBlock language="javascript">{debounceExample}</CodeBlock>
            <h3 className="Article__subTitle">Consume values over time</h3>
            <ul className="Article__notes">
                <li>An async iterable provides a sequence of values that may arrive later.</li>
                <li>Use <code>for await...of</code> to read those values.</li>
                <li>Paginated data and streams can provide an async iterable.</li>
            </ul>
            <CodeBlock language="javascript">{asyncIterableExample}</CodeBlock>
            <h3 className="Article__subTitle">Keep ownership clear</h3>
            <ul className="Article__notes">
                <li>The function that starts work should return its Promise.</li>
                <li>The layer that can recover should catch the error.</li>
                <li>The layer that owns a resource should clean it up in <code>finally</code> or a lifecycle cleanup.</li>
                <li>The caller decides whether to run work in order, run it concurrently, or allow cancellation.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="common-mistakes">
            <h2 id="common-mistakes" className="SectionTitle">Common mistakes</h2>
            <h3 className="Article__subTitle">Using forEach with async callbacks</h3>
            <CodeBlock language="javascript">{mistakesExample}</CodeBlock>
            <h3 className="Article__subTitle">Leaving a floating Promise</h3>
            <ul className="Article__notes">
                <li>A floating Promise is not awaited, returned, or given a rejection handler.</li>
                <li>Its failure can produce an unhandled rejection without the caller knowing.</li>
            </ul>
            <CodeBlock language="javascript">{floatingPromiseExample}</CodeBlock>
            <h3 className="Article__subTitle">More mistakes to avoid</h3>
            <ul className="Article__notes">
                <li>Do not wrap an existing Promise in <code>new Promise</code> unless the API conversion requires it.</li>
                <li>Do not use an <code>async</code> Promise executor. Its thrown errors do not reliably reject the outer Promise.</li>
                <li>Do not write <code>await array.map(async ...)</code>. Await <code>Promise.all(array.map(async ...))</code>.</li>
                <li>Do not make independent operations sequential by awaiting each call immediately.</li>
                <li>Do not assume <code>try/catch</code> catches a Promise you started but did not await or return.</li>
                <li>Do not mix callbacks and Promises for the same result unless an API requires it.</li>
                <li>Clean up timers, event listeners, subscriptions, and pending requests.</li>
                <li>Do not use a delay as proof that asynchronous work finished. Await the actual completion signal.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="reasoning-about-async">
            <h2 id="reasoning-about-async" className="SectionTitle">How to reason about asynchronous code</h2>
            <ol className="Article__steps">
                <li>Run all synchronous statements in stack order.</li>
                <li>Record Promise handlers and continuations after <code>await</code> as microtasks.</li>
                <li>Record timers and events as tasks.</li>
                <li>When the stack is empty, run all queued microtasks in queue order.</li>
                <li>Take the next eligible task, then run all queued microtasks again.</li>
            </ol>
            <ul className="Article__notes">
                <li><code>then</code> and <code>await</code> both read Promise results. Use <code>then</code> to chain handlers or <code>await</code> to write steps in order.</li>
                <li>A race condition happens when the result depends on which overlapping operation finishes first.</li>
                <li>To control that order, cancel old work, check a request identifier or version, run dependent updates in sequence, or use an idempotent operation.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default JavaScriptAsync;
