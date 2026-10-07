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
    { id: 'callbacks', title: 'Callbacks can run now or later' },
    { id: 'promises', title: 'Promises have one eventual result' },
    { id: 'async-await', title: 'async returns a Promise; await reads its result' },
    { id: 'promise-chains', title: 'Handlers create new Promises' },
    { id: 'scheduling', title: 'Microtasks run before the next timer task' },
    { id: 'sequential-concurrent', title: 'Call timing determines sequential or concurrent work' },
    { id: 'combinators', title: 'Promise combinators observe different outcomes' },
    { id: 'network-requests', title: 'fetch distinguishes HTTP responses from network failure' },
    { id: 'cancellation', title: 'Cancellation belongs to the operation' },
    { id: 'retries', title: 'A retry calls the operation again' },
    { id: 'bounded-concurrency', title: 'A worker limit controls how many operations start' },
    { id: 'application-patterns', title: 'Application patterns' },
    { id: 'common-mistakes', title: 'Returned values explain common async mistakes' },
    { id: 'reasoning-about-async', title: 'Find the order from when each callback is queued' },
];

const runtimeExample = `function inner() {
  console.log('inner');
}
function outer() {
  console.log('outer starts');
  inner(); // outer is still on the stack while inner runs
  console.log('outer ends');
}
setTimeout(() => console.log('timer callback'), 0);
outer();
console.log('script ends');
// outer starts, inner, outer ends, script ends, timer callback`;

const callbackExample = `function now(callback) {
  callback('synchronous');
}
function later(callback) {
  setTimeout(() => callback('asynchronous'), 0);
}
now(console.log); // synchronous
later(console.log);
console.log('caller continues');
// synchronous, caller continues, asynchronous

// This sample API uses the convention callback(error, value).
function readUser(id, callback) {
  setTimeout(() => {
    if (id === 7) callback(null, { name: 'Ava' });
    else callback(new Error('User missing'));
  }, 0);
}
readUser(7, (error, user) => {
  if (error) console.log(error.message);
  else console.log(user.name); // Ava
});
readUser(8, (error, user) => {
  if (error) console.log(error.message); // User missing
  else console.log(user.name);
});`;

const eventCallbackExample = `// EventTarget exists in browsers and modern Node.js.
const target = new EventTarget();
let calls = 0;
const listener = () => console.log('event', ++calls);
target.addEventListener('update', listener);
target.dispatchEvent(new Event('update')); // event 1
target.dispatchEvent(new Event('update')); // event 2
target.removeEventListener('update', listener);
target.dispatchEvent(new Event('update')); // no output
// dispatchEvent calls listeners synchronously. A real user event
// reaches the browser through its event processing instead.`;

const nestedCallbackExample = `// Self-contained callback APIs for dependent steps.
const readUser = (fails, done) => setTimeout(() => {
  if (fails) done(new Error('User read failed'));
  else done(null, { id: 7 });
}, 0);
const readOrders = (id, fails, done) => setTimeout(() => {
  if (fails) done(new Error('Order read failed'));
  else done(null, ['book']);
}, 0);
function load({ userFails = false, orderFails = false }, done) {
  readUser(userFails, (userError, user) => {
    if (userError) return done(userError);
    readOrders(user.id, orderFails, (orderError, orders) => {
      if (orderError) return done(orderError);
      done(null, orders);
    });
  });
}
const report = (label) => (error, orders) => {
  console.log(label, error ? error.message : orders[0]);
};
load({}, report('success')); // success book
load({ userFails: true }, report('first step')); // first step User read failed
load({ orderFails: true }, report('second step')); // second step Order read failed
// Each error reaches the final callback. A first-step failure skips readOrders.
// These independent calls can finish in a different order from their start order.`;

const promiseStateExample = `console.log('before constructor');
let complete;
const pending = new Promise((resolve, reject) => {
  console.log('executor'); // runs during the constructor call
  complete = resolve;
});
pending.then((value) => console.log('handler:', value));
console.log('result not supplied yet');
complete('first');
complete('second'); // ignored: the first resolution already won
pending.then((value) => console.log('late handler:', value));
console.log('after resolve');
// before constructor
// executor
// result not supplied yet
// after resolve
// handler: first
// late handler: first (attached after settlement, still runs later)

Promise.reject(new Error('failed'))
  .catch((error) => console.log(error.message)); // failed`;

const thenableExample = `const thenable = {
  then(resolve) {
    resolve('from thenable');
  },
};
Promise.resolve(thenable).then(console.log); // from thenable

let finishInner;
const inner = new Promise((resolve) => { finishInner = resolve; });
const outer = new Promise((resolve, reject) => {
  resolve(inner); // outer follows inner, which is still pending
  reject(new Error('ignored')); // cannot undo that resolution
});
outer.then((value) => console.log('outer:', value));
console.log('inner still pending');
finishInner('ready');
// inner still pending appears before outer: ready.`;

const promisifyExample = `function legacyGetValue(key, callback) {
  setTimeout(() => {
    if (key === 'theme') callback(null, 'dark');
    else callback(new Error('Missing key'));
  }, 0);
}
function getValueAsPromise(key) {
  return new Promise((resolve, reject) => {
    legacyGetValue(key, (error, value) => {
      if (error) reject(error);
      else resolve(value);
    });
  });
}
getValueAsPromise('theme').then(console.log); // dark
getValueAsPromise('missing').catch((error) => console.log(error.message));
// Missing key`;

const chainExample = `const original = Promise.resolve(2);
const next = original
  .then((number) => number + 1) // plain value: 3
  .then((number) => Promise.resolve(number * 2)) // follows Promise: 6
  .then((number) => {
    console.log(number); // 6
    throw new Error('step failed'); // rejects the next Promise here
  })
  .then(() => console.log('skipped')) // no rejection handler here
  .catch((error) => {
    console.log(error.message); // step failed
    return 'recovered'; // new Promise fulfills
  })
  .then(console.log); // recovered
console.log(original === next); // false: a different Promise`;

const returnExample = `const work = () => new Promise((resolve) => {
  setTimeout(() => { console.log('work finished'); resolve('done'); }, 0);
});
async function compare() {
  await Promise.resolve().then(() => {
    work(); // Promise is not returned
  }).then((value) => console.log('chain value:', value));
  // chain value: undefined happens before work finished

  await Promise.resolve().then(() => {
    return work();
  }).then((value) => console.log('joined value:', value));
  // joined value: done happens after this work finished
}
compare();`;

const finallyExample = `async function inspect() {
  const original = Promise.resolve('ready');
  const afterCleanup = original.finally(() => {});
  console.log(original === afterCleanup); // false: a new Promise
  console.log(await Promise.resolve('kept').finally((...args) => {
    console.log('arguments:', args.length); // 0
    return 'ignored';
  })); // kept

  try {
    await Promise.reject(new Error('original')).finally(() => 'ignored');
  } catch (error) { console.log(error.message); } // original

  try {
    await Promise.resolve('success').finally(() => {
      throw new Error('cleanup failed');
    });
  } catch (error) { console.log(error.message); } // cleanup failed

  try {
    await Promise.resolve('success').finally(() => {
      return Promise.reject(new Error('async cleanup failed'));
    });
  } catch (error) { console.log(error.message); } // async cleanup failed
}
inspect();`;

const asyncAwaitExample = `async function answer() { return 42; }
async function fail() { throw new Error('failed'); }
const result = answer();
console.log(result instanceof Promise); // true
result.then(console.log); // 42, later
fail().catch((error) => console.log(error.message)); // failed, later
// true, 42, failed`;

const dashboardExample = `async function loadDashboard(fails = false) {
  console.log('loading');
  try {
    const user = await (fails
      ? Promise.reject(new Error('user offline'))
      : Promise.resolve({ id: 7 }));
    const orders = await Promise.resolve(['book']);
    return { user, orders };
  } catch (error) {
    throw new Error('Could not load dashboard', { cause: error });
  } finally {
    console.log('cleanup');
  }
}
async function inspectDashboard() {
  const data = await loadDashboard();
  console.log(data.user.id, data.orders[0]);
  try { await loadDashboard(true); }
  catch (error) { console.log(error.message, error.cause.message); }
}
inspectDashboard();
// loading, cleanup, 7 book
// loading, cleanup, Could not load dashboard user offline`;

const awaitRejectionExample = `async function inspect() {
  try {
    await Promise.reject(new Error('request failed'));
    console.log('not reached');
  } catch (error) {
    console.log(error.message); // request failed
  }
}
inspect();`;

const awaitSchedulingExample = `async function showOrder() {
  console.log('2');
  await 42; // even a plain value resumes in a later microtask
  console.log('4');
}
console.log('1');
showOrder();
console.log('3');
// 1, 2, 3, 4`;

const topLevelAwaitExample = `// Browser module markup:
// <script type="module" src="answer.js"></script>
// answer.js:
const answer = await Promise.resolve(42); // SyntaxError here in a classic script
console.log(answer); // 42

// The same top-level await in a classic <script> is a SyntaxError.
// This form works inside a classic script:
(async () => {
  console.log(await Promise.resolve(42)); // 42
})();`;

const schedulingExample = `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => {
  console.log('C');
  queueMicrotask(() => console.log('F'));
});
queueMicrotask(() => console.log('D'));
console.log('E');
// Browser output: A, E, C, D, F, B`;

const timerDelayExample = `const started = performance.now();
setTimeout(() => {
  console.log('timer after blocking code');
  console.log(performance.now() - started >= 30); // true
}, 0);
while (performance.now() - started < 30) { /* short blocking demo */ }
console.log('blocking code finished');
// blocking code finished, timer after blocking code, true
// Actual elapsed time is variable. This code briefly blocks the thread.`;

const sequentialExample = `function load(label) {
  console.log('start', label);
  return new Promise((resolve) => setTimeout(() => {
    console.log('finish', label);
    resolve(label);
  }, 0));
}
async function compare() {
  console.log('sequential');
  const user = await load('user');
  const settings = await load('settings');
  console.log(user, settings);
  // start user, finish user, start settings, finish settings, user settings

  console.log('concurrent');
  const both = await Promise.all([load('user'), load('settings')]);
  console.log(both.join(' '));
  // start user, start settings, then their finishes, then user settings
}
compare();`;

const dependencyExample = `const getUser = () => Promise.resolve({ id: 7, role: 'reader' });
const getOrders = (id) => { console.log('orders for', id); return Promise.resolve(['book']); };
const getPermissions = (role) => { console.log('role', role); return Promise.resolve(['read']); };
async function load() {
  const user = await getUser(); // id and role must exist before these calls
  const [orders, permissions] = await Promise.all([
    getOrders(user.id),
    getPermissions(user.role),
  ]);
  console.log(orders[0], permissions[0]);
}
load();
// orders for 7, role reader, book read`;

const combinatorExample = `const delayed = (ms, value, fails = false) => new Promise((resolve, reject) => {
  setTimeout(() => fails ? reject(new Error(value)) : resolve(value), ms);
});
async function inspect() {
  const first = delayed(20, 'first input');
  const second = delayed(0, 'second input');
  console.log(await Promise.all([first, second]));
  // ['first input', 'second input']: input order, not completion order

  const settled = await Promise.allSettled([
    Promise.resolve('ok'), Promise.reject(new Error('bad')),
  ]);
  console.log(settled[0].status, settled[0].value); // fulfilled ok
  console.log(settled[1].status, settled[1].reason.message); // rejected bad

  try {
    await Promise.race([delayed(0, 'fast failure', true), delayed(20, 'success')]);
  } catch (error) { console.log(error.message); } // fast failure
  console.log(await Promise.any([
    delayed(0, 'fast failure', true), delayed(20, 'success'),
  ])); // success: ignores the earlier rejection

  try {
    await Promise.any([Promise.reject('A'), Promise.reject('B')]);
  } catch (error) {
    console.log(error.name, error.errors.join(',')); // AggregateError A,B
  }
}
inspect();`;

const noCancellationExample = `async function inspect() {
  const slow = new Promise((resolve) => setTimeout(() => {
    console.log('slow still finished');
    resolve('slow');
  }, 20));
  try {
    await Promise.all([slow, Promise.reject(new Error('early failure'))]);
  } catch (error) { console.log(error.message); } // early failure
  console.log(await Promise.race([Promise.resolve('winner'), slow])); // winner
  await slow; // slow still finished: neither combinator cancelled it
}
inspect();`;

const fetchExample = `// Browser setup: the same-origin server provides these endpoints:
// /api/user       -> 200 and {"name":"Ava"}
// /api/missing    -> 404 and {"message":"Missing"}
// /api/bad-json   -> 200 and the text "not JSON"
// /api/wrong-user -> 200 and {"name":7}
async function getUser(path) {
  const response = await fetch(path); // Promise fulfills even for 404
  console.log('HTTP', response.status);
  if (!response.ok) throw new Error('HTTP ' + response.status); // HTTP failure here
  const user = await response.json(); // invalid JSON throws here through await
  if (user === null || typeof user !== 'object'
      || typeof user.name !== 'string') {
    throw new Error('Invalid user data'); // wrong data shape fails here
  }
  return user;
}
for (const path of ['/api/user', '/api/missing', '/api/bad-json', '/api/wrong-user']) {
  getUser(path)
    .then((user) => console.log(user.name))
    .catch((error) => console.log(path, error.message));
}
// Each request logs its status. The four outcomes are Ava,
// HTTP 404, a JSON parse error, and Invalid user data.
// Completion order is variable. A network failure rejects fetch
// before a response status can be logged.`;

const responseBodyExample = `// Browser or modern Node.js: no network service required here.
async function inspect() {
  const missing = new Response('Missing', { status: 404 });
  console.log(missing.ok, missing.status); // false 404
  try {
    await new Response('not JSON').json();
  } catch (error) { console.log(error.name); } // SyntaxError
  const wrongShape = await new Response('{"name":7}').json();
  console.log(typeof wrongShape.name); // number: valid JSON, wrong shape
}
inspect();`;

const requestStateExample = `let state = { status: 'idle' };
async function loadItems(operation) {
  state = { status: 'loading' };
  try {
    const items = await operation();
    state = { status: items.length === 0 ? 'empty' : 'success', items };
  } catch (error) {
    state = error.name === 'AbortError'
      ? { status: 'cancelled' }
      : { status: 'error', message: 'Could not load items' };
  }
  console.log(state.status);
}
async function inspect() {
  await loadItems(() => Promise.resolve(['book'])); // success
  await loadItems(() => Promise.resolve([])); // empty
  await loadItems(() => Promise.reject(new Error('internal server detail'))); // error
  await loadItems(() => Promise.reject(new DOMException('Aborted', 'AbortError'))); // cancelled
}
inspect();
// state becomes loading during each wait. The displayed error message
// is application text; it does not expose internal server detail.`;

const cancellationExample = `// Browser setup: /api/slow takes longer than 5 seconds to respond.
async function loadSlow() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch('/api/slow', { signal: controller.signal });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return await response.json();
  } finally {
    clearTimeout(timeoutId); // runs on success, failure, or cancellation
  }
}
loadSlow().catch((error) => console.log(error.name));
// AbortError when the timer aborts first. Network/server failures
// can happen sooner. The timeout is a timer delay, not an exact deadline.`;

const abortSignalExample = `async function inspect() {
  const controller = new AbortController();
  controller.abort();
  console.log(controller.signal.aborted); // true
  try {
    // An already-aborted signal rejects without starting this request.
    await fetch('https://example.com/', { signal: controller.signal });
  } catch (error) { console.log(error.name); } // AbortError
  console.log(typeof Promise.resolve().cancel); // undefined
}
inspect();`;

const latestRequestExample = `let newest = 0;
let shown;
let unguarded;
async function search(operation) {
  const requestId = ++newest;
  const result = await operation();
  unguarded = result; // shows what an unconditional UI update would do
  if (requestId === newest) shown = result;
}
let finishOld;
let finishNew;
const old = search(() => new Promise((resolve) => { finishOld = resolve; }));
const recent = search(() => new Promise((resolve) => { finishNew = resolve; }));
async function inspect() {
  finishNew('new result');
  await recent;
  finishOld('old result');
  await old;
  console.log(unguarded); // old result: a stale completion replaced the new one
  console.log(shown); // new result: the identifier check ignored the old completion
}
inspect();`;

const abortPreviousExample = `// Browser setup: /api/search?q=... returns JSON search results.
let activeController;
let newest = 0;
async function search(query) {
  activeController?.abort();
  const controller = new AbortController();
  activeController = controller;
  const requestId = ++newest;
  try {
    const response = await fetch('/api/search?q=' + encodeURIComponent(query), {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const results = await response.json();
    if (requestId === newest) console.log('latest results:', results);
  } catch (error) {
    if (error.name !== 'AbortError' && requestId === newest) console.log('Search failed');
  } finally {
    if (activeController === controller) activeController = undefined;
  }
}
search('a');
search('ava');
// The second call aborts the first. Only the latest successful result
// is printed. Aborting does not guarantee the server undoes work.`;

const retryExample = `const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function retry(operation, attempts = 3) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try { return await operation(); }
    catch (error) {
      if (attempt === attempts || !error.temporary) throw error;
      const delay = 10 * 2 ** (attempt - 1);
      console.log('retry after', delay);
      await sleep(delay);
    }
  }
}
async function inspectRetries() {
  let calls = 0;
  const result = await retry(() => {
    calls += 1;
    console.log('attempt', calls);
    if (calls < 3) throw Object.assign(new Error('temporary'), { temporary: true });
    return 'ready';
  });
  console.log(result);
  // attempt 1, retry after 10, attempt 2, retry after 20, attempt 3, ready

  let permanentCalls = 0;
  try {
    await retry(() => {
      permanentCalls += 1;
      throw new Error('permanent');
    });
  } catch (error) { console.log(error.message, permanentCalls); }
  // permanent 1: no retry

  let exhaustedCalls = 0;
  try {
    await retry(() => {
      exhaustedCalls += 1;
      throw Object.assign(new Error('still temporary'), { temporary: true });
    });
  } catch (error) { console.log(error.message, exhaustedCalls); }
  // retry after 10, retry after 20, still temporary 3
}
inspectRetries();
// Each demonstration waits for the preceding demonstration to finish.`;

const retryPolicyExample = `// This is an application policy, not a JavaScript rule.
const retryableStatus = (status) => [429, 502, 503, 504].includes(status);
console.log(retryableStatus(503)); // true
console.log(retryableStatus(400)); // false: validation failure
console.log(retryableStatus(401)); // false: authentication failure

// Parse Retry-After as seconds or a date.
function retryAfterMs(value, now = Date.now()) {
  if (/^\\d+$/.test(value)) return Number(value) * 1000;
  const date = Date.parse(value);
  return Number.isNaN(date) ? 0 : Math.max(0, date - now);
}
console.log(retryAfterMs('2')); // 2000
console.log(retryAfterMs('Wed, 07 Oct 2026 00:00:02 GMT', Date.parse('2026-10-07T00:00:00Z'))); // 2000

const baseDelay = 250;
const attempt = 2;
const exponentialDelay = baseDelay * 2 ** (attempt - 1); // 500
const jitter = Math.floor(Math.random() * 100); // integer from 0 through 99
console.log(exponentialDelay + jitter); // 500 through 599, variable`;

const retryWriteExample = `// Browser setup: a secure context, such as an HTTPS page or localhost,
// provides crypto.randomUUID. The relative URL uses that page's origin.
// Service setup: POST /api/orders supports Idempotency-Key.
// Successful responses contain JSON {id: <order-id>}.
// The server records the first result for a key and returns it again
// for repeated requests with that key. JavaScript does not enforce this.
const key = crypto.randomUUID(); // create once for this logical order
const sendOrder = () => fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key },
  body: JSON.stringify({ productId: 7 }),
});
// If the first response is lost after the server creates the order,
// a retry with the same key returns that order under this contract.
// A server ignoring the key may create a duplicate order.
async function compare() {
  const first = await sendOrder();
  if (!first.ok) throw new Error('HTTP ' + first.status);
  const original = await first.json();
  const second = await sendOrder(); // same key, same logical order
  if (!second.ok) throw new Error('HTTP ' + second.status);
  const repeated = await second.json();
  console.log(original.id === repeated.id); // true under the stated contract
}
compare().catch((error) => console.log(error.message));

// PUT /api/preferences with {theme:'dark'} can be idempotent:
// repeating it leaves the same preference. This depends on the service.`;

const abortableDelayExample = `function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    const onAbort = () => { clearTimeout(id); reject(signal.reason); };
    if (signal?.aborted) { reject(signal.reason); return; }
    const id = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}
const controller = new AbortController();
sleep(1000, controller.signal)
  .then(() => console.log('delay finished'))
  .catch((error) => console.log(error.name));
controller.abort(); // AbortError, not delay finished
// A retry loop can await sleep(delay, signal) and pass the same
// signal to fetch. The caller can then stop both the delay and request.`;

const concurrencyExample = `async function mapWithConcurrency(items, limit, mapper) {
  if (!Number.isInteger(limit) || limit < 1) {
    throw new RangeError('Invalid limit'); // failure for limit 0
  }
  const results = new Array(items.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await mapper(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}
async function inspectFailures() {
  try {
    await mapWithConcurrency([1], 0, (number) => number);
  } catch (error) { console.log(error.name, error.message); }
  // RangeError Invalid limit: the mapper is not called

  let finishSecond;
  const failing = mapWithConcurrency([1, 2, 3], 2, (number) => {
    console.log('failure demo starts', number);
    if (number === 1) return Promise.reject(new Error('mapper failed'));
    if (number === 2) return new Promise((resolve) => { finishSecond = resolve; });
    return Promise.resolve(number);
  });
  try { await failing; }
  catch (error) { console.log(error.message); } // mapper failed
  finishSecond(2); // other worker completes item 2 and starts item 3
}
async function inspectConcurrency() {
  let active = 0;
  let highest = 0;
  const results = await mapWithConcurrency([1, 2, 3, 4], 2, async (number) => {
    active += 1;
    highest = Math.max(highest, active);
    await new Promise((resolve) => setTimeout(resolve, 0));
    active -= 1;
    return number * 10;
  });
  console.log(results.join(',')); // 10,20,30,40: input order
  console.log(highest); // 2
  await inspectFailures();
}
inspectConcurrency();
// Success: 10,20,30,40, then 2.
// Failure: RangeError Invalid limit, failure demo starts 1,
// failure demo starts 2, mapper failed, failure demo starts 3.
// A mapper failure does not stop other workers from taking more items.`;

const eagerMapExample = `let starts = 0;
const promises = [1, 2, 3].map((value) => {
  starts += 1;
  return Promise.resolve(value);
});
console.log(starts); // 3: map already called every mapper
Promise.all(promises).then((values) => console.log(values.join(','))); // 1,2,3`;

const debounceExample = `function debounce(callback, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}
const debounced = debounce((query) => console.log('start request for', query), 20);
debounced('a');
debounced('av');
debounced('ava');
// Only start request for ava prints after the delay.
// Once that callback has run, a later call does not stop its work.
// This function only cancels a timer that has not run yet.`;

const asyncIterableExample = `async function* pages() {
  yield await Promise.resolve(['Ava', 'Ben']);
  yield await Promise.resolve(['Cam']);
}
async function consume() {
  for await (const users of pages()) {
    console.log(users.join(','));
  }
}
consume();
// Ava,Ben
// Cam`;

const paginationExample = `// Browser setup: /api/users returns
// {users:[{name:'Ava'}], nextPage:'/api/users?page=2'}.
// Page 2 returns {users:[{name:'Ben'}], nextPage:null}.
async function* paginatedUsers() {
  let nextPage = '/api/users';
  while (nextPage) {
    const response = await fetch(nextPage);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const page = await response.json();
    // This example assumes the stated response shape.
    yield page.users;
    nextPage = page.nextPage;
  }
}
(async () => {
  try {
    for await (const users of paginatedUsers()) {
      console.log(users.map((user) => user.name).join(','));
    }
  } catch (error) { console.log(error.message); }
})();
// Under the service contract: Ava, then Ben.
// A stream can likewise expose an async iterable; its iterator
// controls when each next chunk becomes available.`;

const ownershipExample = `// Browser setup: /api/updates returns JSON; call cleanup on page exit.
function startUpdates() {
  const controller = new AbortController();
  let timeoutId;
  const listener = () => console.log('online event');
  window.addEventListener('online', listener); // event subscription
  const pending = fetch('/api/updates', { signal: controller.signal });
  timeoutId = setTimeout(() => console.log('refresh due'), 1000);
  pending.catch((error) => {
    if (error.name !== 'AbortError') console.log('Updates failed');
  });
  return () => {
    clearTimeout(timeoutId);
    window.removeEventListener('online', listener);
    controller.abort();
  };
}
const cleanup = startUpdates();
cleanup();
// The timer log cannot run; the online subscription is removed;
// the request receives an abort signal. Its failure is handled.`;

const mistakesExample = `const save = (id) => new Promise((resolve) => setTimeout(() => {
  console.log('saved', id);
  resolve(id);
}, 0));
async function inspect() {
  const returned = [1, 2].forEach((id) => save(id));
  console.log(returned); // undefined: forEach discards callback results
  await returned;
  console.log('forEach wait ended'); // before saved 1 and saved 2

  const promises = [3, 4].map((id) => save(id));
  console.log(Array.isArray(await promises)); // true: await does not await array entries
  await Promise.all(promises);
  console.log('all saved'); // after saved 3 and saved 4

  for (const id of [5, 6]) await save(id);
  // saved 5 precedes starting and saving 6
}
inspect();`;

const floatingPromiseExample = `const save = () => Promise.reject(new Error('save failed'));
async function inspect() {
  let pending;
  try {
    pending = save(); // returns a rejected Promise; no synchronous throw
    console.log('caller continued');
  } catch (error) { console.log('not reached'); }
  await pending.catch((error) => console.log(error.message)); // save failed

  try { await save(); }
  catch (error) { console.log('caught through await'); }
}
inspect();

// This function returns the failure to its caller:
function forward() { return save(); }
forward().catch((error) => console.log('caller handled', error.message));

// Intentional background work still has a rejection handler:
void save().catch((error) => console.log('background handled', error.message));
// Without a rejection handler, the runtime reports an unhandled
// rejection. Reporting behavior depends on the browser or Node.js.`;

const asyncExecutorExample = `// Intentional incorrect code. Read it; do not run it as an example.
const outer = new Promise(async (resolve) => {
  throw new Error('executor failed');
});
outer.catch(() => console.log('outer rejected')); // does not handle that error
// The async executor returns its own rejected Promise.
// The Promise constructor ignores that return value.
// outer stays pending because neither resolve nor reject was called.
// The executor's separate Promise produces an unhandled rejection.

// A direct async function carries its own failure correctly:
async function load() { throw new Error('load failed'); }
load().catch((error) => console.log(error.message)); // load failed

// An existing Promise can be returned directly:
const existing = Promise.resolve('ready');
const direct = () => existing;
direct().then(console.log); // ready, no new Promise wrapper needed`;

const reasoningExample = `console.log('1');
setTimeout(() => {
  console.log('5');
  queueMicrotask(() => console.log('6'));
}, 0);
Promise.resolve().then(() => console.log('3')).then(() => console.log('4'));
console.log('2');
// Browser: 1, 2, 3, 4, 5, 6
// The second then handler is queued after the first handler completes.
// The microtask inside the timer runs after that timer callback ends.`;

const JavaScriptAsync = () => (
    <ArticleLayout
        title="Asynchronous Programming in JavaScript"
        route={JAVASCRIPT_ASYNC_ROUTE}
        sections={sections}
        backRoute={JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}
        backLabel="Back to JavaScript and TypeScript notes"
    >
        <section className="Article__section" aria-labelledby="mental-model">
            <h2 id="mental-model" className="SectionTitle">The runtime model</h2>
            <ul className="Article__notes">
                <li>Synchronous code runs one statement after another. A synchronous function finishes before the code that called it continues.</li>
                <li>Asynchronous code starts an operation and handles its result later. Other code can run while the operation waits.</li>
                <li>The call stack records function calls that have started but have not returned.</li>
                <li>The host runtime is the environment running JavaScript, such as a browser or Node.js. It supplies APIs for timers and network requests.</li>
                <li>A callback is a function passed to another function. <code>() =&gt; console.log('timer callback')</code> creates the callback in this example.</li>
                <li><code>setTimeout(callback, 0)</code> asks the host to run the callback later. The number is a delay in milliseconds.</li>
                <li><code>setTimeout</code> returns without waiting. A zero delay still means later, after the current code finishes.</li>
                <li>A queued callback on the same event-loop thread runs after current synchronous work finishes. It cannot interrupt that work.</li>
            </ul>
            <JavaScriptRunner>{runtimeExample}</JavaScriptRunner>
            <ol className="Article__steps">
                <li><code>setTimeout</code> registers the timer. It prints nothing yet.</li>
                <li><code>outer()</code> prints <code>outer starts</code>. Its call to <code>inner()</code> prints <code>inner</code>.</li>
                <li><code>inner</code> returns. <code>outer</code> prints <code>outer ends</code> and returns.</li>
                <li>The last synchronous statement prints <code>script ends</code>. The timer callback then prints <code>timer callback</code>.</li>
            </ol>
        </section>
        <section className="Article__section" aria-labelledby="callbacks">
            <h2 id="callbacks" className="SectionTitle">Callbacks can run now or later</h2>
            <ul className="Article__notes">
                <li>A callback is a function passed to another function. Being a callback does not make it asynchronous.</li>
                <li>The receiving API decides when and how often to call it. The now and later functions below use different timing.</li>
                <li>The error-first callback convention uses <code>callback(error, value)</code>. On success, the first argument is <code>null</code> and the second is the result.</li>
                <li>On failure, the first argument is an error. Check it before reading the result.</li>
                <li><code>new Error('User missing')</code> creates an error object. It does not throw by itself. Its <code>message</code> property contains that text.</li>
                <li>This callback convention belongs to the API. JavaScript does not require every callback to use it.</li>
            </ul>
            <JavaScriptRunner>{callbackExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li><code>now(console.log)</code> passes the logging function without calling it. <code>callback('synchronous')</code> calls it immediately.</li>
                <li><code>later(console.log)</code> registers a timer. <code>caller continues</code> therefore appears before <code>asynchronous</code>.</li>
                <li>For <code>readUser(8, ...)</code>, <code>callback(new Error('User missing'))</code> supplies the failure. The <code>if (error)</code> branch prints its message.</li>
                <li>The failure branch must not read <code>user.name</code>. No user was supplied on that call.</li>
            </ul>
            <h3 className="Article__subTitle">Repeated events and dependent callbacks</h3>
            <ul className="Article__notes">
                <li>An event is a notification such as a click or an update. An event listener is a callback registered to receive it.</li>
                <li><code>EventTarget</code> is an object that accepts listeners. <code>addEventListener</code> registers one. <code>removeEventListener</code> removes that same function.</li>
                <li><code>new Event('update')</code> creates the notification. <code>dispatchEvent</code> delivers it and calls its listeners synchronously.</li>
                <li>An event listener can run repeatedly. One Promise represents one result, so it cannot represent an entire stream of events.</li>
                <li>Dependent steps need earlier results. <code>readOrders(user.id, ...)</code> waits until <code>readUser</code> supplies a user.</li>
                <li>The nested example accepts an options object. <code>userFails</code> and <code>orderFails</code> default to <code>false</code>.</li>
                <li><code>report(label)</code> returns a callback that remembers the label. The success branch reads <code>orders[0]</code>, the first array item.</li>
                <li><code>return done(userError)</code> reports the first failure and leaves that callback. It skips <code>readOrders</code>.</li>
                <li><code>return done(orderError)</code> reports the second failure. Otherwise <code>done(null, orders)</code> reports success.</li>
            </ul>
            <JavaScriptRunner>{eventCallbackExample}</JavaScriptRunner>
            <JavaScriptRunner>{nestedCallbackExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Read the API contract to find its callback timing, error convention, and number of calls. A Promise conversion fits an operation with one eventual result.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="promises">
            <h2 id="promises" className="SectionTitle">Promises have one eventual result</h2>
            <ul className="Article__notes">
                <li>A Promise is an object that represents one result. The result may already exist or arrive later.</li>
                <li><strong>Pending</strong> means no final result yet. <strong>Fulfilled</strong> means success with a value. <strong>Rejected</strong> means failure with a reason.</li>
                <li>A fulfilled or rejected Promise is <strong>settled</strong>. Its final outcome cannot change.</li>
                <li>new Promise calls its executor immediately. The executor is the function passed to the constructor.</li>
                <li>The constructor supplies two functions to the executor. <code>resolve(value)</code> supplies success or follows another Promise. <code>reject(reason)</code> supplies failure.</li>
                <li>A handler is a callback for an outcome. <code>promise.then(onSuccess)</code> registers a success handler. <code>promise.catch(onFailure)</code> registers a failure handler.</li>
                <li><code>Promise.resolve(value)</code> creates a fulfilled Promise for a plain value. <code>Promise.reject(reason)</code> creates a rejected Promise.</li>
                <li>Handlers run later, even when the Promise is already settled. <code>complete = resolve</code> below stores the function so another statement can call it.</li>
            </ul>
            <JavaScriptRunner>{promiseStateExample}</JavaScriptRunner>
            <ol className="Article__steps">
                <li>The constructor immediately prints <code>executor</code> between the first two surrounding logs.</li>
                <li><code>complete('first')</code> fulfills <code>pending</code>. <code>complete('second')</code> cannot replace that value.</li>
                <li><code>after resolve</code> prints before either handler. Registering a handler does not run it inline.</li>
                <li>Both success handlers receive <code>first</code>. The final rejection handler separately prints <code>failed</code>.</li>
            </ol>
            <h3 className="Article__subTitle">Converting an error-first callback API</h3>
            <ul className="Article__notes">
                <li><code>getValueAsPromise</code> returns the new Promise immediately. The timer supplies the eventual result through its callback.</li>
                <li><code>reject(error)</code> converts the callback failure into rejection. The caller handles it with <code>catch</code>.</li>
                <li><code>resolve(value)</code> converts callback success into fulfillment. The caller reads it with <code>then</code>.</li>
            </ul>
            <JavaScriptRunner>{promisifyExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Return existing API Promises directly. Use new Promise when converting a one-result callback API, as getValueAsPromise does. Reject with Error objects when a message and stack trace are useful.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="async-await">
            <h2 id="async-await" className="SectionTitle">async returns a Promise; await reads its result</h2>
            <ul className="Article__notes">
                <li>An async function always returns a Promise. Returning a plain value fulfills it. Throwing rejects it.</li>
                <li><code>const value = await promise</code> pauses this function until the Promise settles. On success, it assigns the fulfillment value to <code>value</code>.</li>
                <li>On rejection, the <code>await</code> expression throws the rejection reason inside this function.</li>
                <li><code>throw new Error(message)</code> stops the current path with an error. <code>try/catch</code> sends that error to the matching <code>catch</code> block.</li>
                <li><code>finally</code> runs when control leaves the associated <code>try/catch</code>, after success or failure.</li>
            </ul>
            <JavaScriptRunner>{asyncAwaitExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li><code>answer()</code> returns a Promise, so <code>result instanceof Promise</code> prints <code>true</code>. Its success handler later prints <code>42</code>.</li>
                <li>The exact failure in <code>fail()</code> is <code>throw new Error('failed')</code>. The function returns a rejected Promise. Its <code>catch</code> later prints <code>failed</code>.</li>
            </ul>
            <JavaScriptRunner>{awaitRejectionExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li>In <code>inspect</code>, <code>Promise.reject(new Error('request failed'))</code> creates the rejected Promise.</li>
                <li>The <code>await Promise.reject(...)</code> statement throws that reason. <code>console.log('not reached')</code> is skipped.</li>
                <li>The surrounding <code>catch</code> prints <code>request failed</code>. Handle the failure there, or let the returned Promise reject for the caller to handle.</li>
            </ul>
            <h3 className="Article__subTitle">Add context to a failure and always run cleanup</h3>
            <JavaScriptRunner>{dashboardExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li>In <code>loadDashboard(true)</code>, the rejected user Promise causes the first <code>await</code> to throw. The orders statement is skipped.</li>
                <li><code>throw new Error('Could not load dashboard', ...)</code> adds context and rejects the returned Promise. Its <code>cause</code> property stores the original error.</li>
                <li><code>finally</code> prints <code>cleanup</code> for either outcome. It does not turn a failure into success.</li>
            </ul>
            <h3 className="Article__subTitle">A suspension affects this function</h3>
            <ul className="Article__notes">
                <li>An async function runs immediately until <code>await</code>. Code after <code>await</code> resumes later.</li>
                <li>That later step is a <strong>continuation</strong>: the code that continues a paused function.</li>
                <li>The runtime schedules it as a <strong>microtask</strong>, a callback handled after the current synchronous work. The scheduling section explains its order relative to timers.</li>
                <li>Even <code>await 42</code> resumes later. The value is already available, but the continuation is still deferred.</li>
                <li>Other synchronous code continues during that suspension. await does not create a new thread.</li>
            </ul>
            <JavaScriptRunner>{awaitSchedulingExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">Top-level await requires a module</h3>
            <ul className="Article__notes">
                <li>A module is a JavaScript file loaded with module rules. A browser uses <code>&lt;script type="module"&gt;</code> for it.</li>
                <li>Top level means outside every function. Modules allow top-level <code>await</code>.</li>
                <li>The exact failing statement in a classic script is <code>const answer = await Promise.resolve(42)</code>. It causes a <code>SyntaxError</code> before the script runs.</li>
                <li>Load the file as a module, or move that statement into an <code>async</code> function.</li>
                <li>The final <code>()</code> in the example calls the async function immediately. Its surrounding parentheses make it a function expression.</li>
            </ul>
            <CodeBlock language="javascript">{topLevelAwaitExample}</CodeBlock>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Use an async function when the code runs as a classic script. Catch where recovery or context is needed, as the dashboard and rejection examples show.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="promise-chains">
            <h2 id="promise-chains" className="SectionTitle">Handlers create new Promises</h2>
            <ul className="Article__notes">
                <li>then and catch return new Promises. The handler return value becomes the next result.</li>
                <li>A plain return value fulfills the next Promise. A returned Promise makes the chain wait for its outcome.</li>
                <li>A chain is a sequence such as <code>promise.then(...).then(...).catch(...)</code>. Each step observes the Promise returned by the previous step.</li>
                <li>Throwing in a handler rejects the next Promise. Without a matching failure handler, the rejection continues to later steps.</li>
                <li>A catch handler that returns a value recovers: the following then receives that value.</li>
            </ul>
            <JavaScriptRunner>{chainExample}</JavaScriptRunner>
            <ol className="Article__steps">
                <li><code>original === next</code> prints <code>false</code> synchronously. The chain returned a different Promise.</li>
                <li>The first success handler returns <code>3</code>. The next returns a Promise fulfilled with <code>6</code>.</li>
                <li><code>console.log(number)</code> prints <code>6</code>. The exact failure line is <code>throw new Error('step failed')</code>.</li>
                <li>The success-only handler that prints <code>skipped</code> cannot handle rejection. It does not run.</li>
                <li><code>catch</code> prints <code>step failed</code> and returns <code>recovered</code>. That return value makes the final success handler run.</li>
            </ol>
            <h3 className="Article__subTitle">Returning an operation joins it to the chain</h3>
            <ul className="Article__notes">
                <li>A handler that returns nothing supplies undefined. An operation started without returning its Promise is outside that chain.</li>
            </ul>
            <JavaScriptRunner>{returnExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li>The first <code>work()</code> call starts a timer but its handler returns nothing. The next handler receives <code>undefined</code> before that timer finishes.</li>
                <li>The second handler uses <code>return work()</code>. Its next handler waits for that returned Promise and receives <code>done</code>.</li>
                <li>Two work timers exist in this example. Both print <code>work finished</code>. Only the second is part of the second chain.</li>
            </ul>
            <h3 className="Article__subTitle">finally preserves or replaces the outcome</h3>
            <ul className="Article__notes">
                <li>finally returns a new Promise and calls its callback with no result arguments.</li>
                <li>A normal return value from finally preserves the earlier value or failure.</li>
                <li>Throwing or returning a rejected Promise from finally replaces the earlier outcome with that failure.</li>
            </ul>
            <JavaScriptRunner>{finallyExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li><code>return 'ignored'</code> in <code>finally</code> does not replace <code>kept</code> or the earlier <code>original</code> failure.</li>
                <li><code>throw new Error('cleanup failed')</code> rejects the cleanup Promise. The surrounding <code>await</code> throws that error to <code>catch</code>.</li>
                <li><code>return Promise.reject(new Error('async cleanup failed'))</code> causes the same replacement through a rejected Promise.</li>
                <li>Keep cleanup successful if the earlier result must pass through unchanged. If cleanup can fail, the caller must handle its failure too.</li>
            </ul>
            <h3 className="Article__subTitle">Resolving with another Promise or thenable</h3>
            <ul className="Article__notes">
                <li>resolve follows another Promise. The outer Promise can remain pending while it waits for the inner one.</li>
                <li>A thenable is an object with a callable then method. Promise resolution follows the outcome that method supplies.</li>
                <li>Once resolution has started, a later resolve or reject call cannot replace it.</li>
            </ul>
            <JavaScriptRunner>{thenableExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Return the Promise for work that belongs to the chain. Use finally for cleanup, and catch only where the code can recover or provide useful context.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="scheduling">
            <h2 id="scheduling" className="SectionTitle">Microtasks run before the next timer task</h2>
            <ul className="Article__notes">
                <li>In a browser, Promise handlers, queueMicrotask callbacks, and await continuations run as microtasks.</li>
                <li>A queue stores callbacks in order. A microtask checkpoint is the point where the browser runs pending microtasks.</li>
                <li>At that checkpoint, the browser runs each queued microtask. A microtask added during this work joins the end of the queue.</li>
                <li>A timer callback is a later task. A zero delay cannot interrupt the current script or its queued microtasks.</li>
            </ul>
            <JavaScriptRunner>{schedulingExample}</JavaScriptRunner>
            <ol className="Article__steps">
                <li>The current script prints <code>A</code> and <code>E</code>. The timer and callbacks wait.</li>
                <li>The Promise handler was queued first. It prints <code>C</code> and adds <code>F</code> to the end of the microtask queue.</li>
                <li><code>D</code> was already queued, so it runs before <code>F</code>.</li>
                <li>Once the microtask queue is empty, the timer callback prints <code>B</code>.</li>
            </ol>
            <ul className="Article__notes">
                <li>A timer delay makes a callback eligible after a wait. Busy code, browser throttling, and other scheduled work can postpone it.</li>
                <li>Long synchronous work blocks other callbacks on the same thread. Endless microtasks can also prevent later tasks and painting.</li>
            </ul>
            <JavaScriptRunner>{timerDelayExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li>The <a className="Link" href={toHref(JAVASCRIPT_EVENT_LOOP_ROUTE)}>event loop note</a> demonstrates rendering delays, recursive microtasks, and Node.js ordering separately.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="sequential-concurrent">
            <h2 id="sequential-concurrent" className="SectionTitle">Call timing determines sequential or concurrent work</h2>
            <ul className="Article__notes">
                <li>In the load function below, calling the function starts its timer. await waits for the returned Promise.</li>
                <li>Awaiting one call before making the next makes these operations sequential.</li>
                <li>Concurrent operations have overlapping waits. Their JavaScript callbacks still run one at a time on this thread.</li>
                <li>In <code>Promise.all([load('user'), load('settings')])</code>, JavaScript calls both <code>load</code> functions while building the array.</li>
                <li><code>Promise.all</code> returns a Promise for all their results. Its <code>await</code> waits for both timers.</li>
            </ul>
            <JavaScriptRunner>{sequentialExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li>An operation that needs user.id cannot be called with that id until the user result arrives.</li>
                <li>After the user arrives, orders and permissions below can start together because neither needs the other result.</li>
            </ul>
            <JavaScriptRunner>{dependencyExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Start independent waits together when their combined load is acceptable. Keep dependent work in order. The bounded concurrency section demonstrates limiting the number of active operations.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="combinators">
            <h2 id="combinators" className="SectionTitle">Promise combinators observe different outcomes</h2>
            <ul className="Article__notes">
                <li>A Promise combinator observes several inputs and returns one Promise for their combined outcome. It does not start calls that have already run.</li>
                <li><code>Promise.all</code> fulfills when every input fulfills. Its result array follows input order. It rejects when an input rejects.</li>
                <li>Promise.allSettled waits for every input and returns a status plus value or reason for each input, also in input order.</li>
                <li>Promise.race follows the first settled input, whether it fulfills or rejects.</li>
                <li><code>Promise.any</code> fulfills from the first successful input. It ignores failures while success is still possible.</li>
                <li>If every input rejects, <code>Promise.any</code> rejects with <code>AggregateError</code>. This error groups the rejection reasons in its <code>errors</code> array, in input order.</li>
            </ul>
            <JavaScriptRunner>{combinatorExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li><code>reject(new Error(value))</code> inside <code>delayed</code> creates the timed failure. A rejection is a Promise outcome, not a synchronous throw from <code>delayed()</code>.</li>
                <li>For <code>Promise.race</code>, the <code>fast failure</code> input settles first. <code>await Promise.race(...)</code> therefore throws to its <code>catch</code>.</li>
                <li>For <code>Promise.any</code>, that same early failure does not end the wait. The later successful input supplies <code>success</code>.</li>
                <li>The last <code>await Promise.any(...)</code> throws <code>AggregateError</code> because both inputs reject. Its <code>catch</code> prints <code>AggregateError A,B</code>.</li>
            </ul>
            <ul className="Article__notes">
                <li>Rejecting Promise.all or settling Promise.race does not cancel other input operations. The slow timer below still finishes.</li>
            </ul>
            <JavaScriptRunner>{noCancellationExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Use all when every value is required, allSettled when every outcome must be inspected, race for the first outcome, and any for the first success. Cancellation needs support from the underlying operation.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="network-requests">
            <h2 id="network-requests" className="SectionTitle">fetch distinguishes HTTP responses from network failure</h2>
            <ul className="Article__notes">
                <li><code>fetch(path)</code> sends a network request. The example uses URLs on the same server as the page.</li>
                <li>HTTP is the request and response protocol used by web servers. A status code describes the response: <code>200</code> means success, <code>404</code> means not found, and <code>500</code> means server failure.</li>
                <li><code>fetch</code> returns a Promise for a <code>Response</code> object. That object holds the status, headers, and response body.</li>
                <li>A 404 or 500 is still a response. It normally fulfills the Promise rather than rejecting it.</li>
                <li>response.ok is true for status codes 200 through 299. The application below throws when it is false.</li>
                <li>A network failure rejects <code>fetch</code> before it supplies a response.</li>
                <li>JSON is a text format for values such as objects and arrays. <code>response.json()</code> reads the body and parses that text into JavaScript values.</li>
                <li>Body reading is a separate asynchronous operation. Invalid JSON makes its Promise reject with <code>SyntaxError</code>.</li>
                <li>Valid JSON does not prove that its properties have the types an application expects.</li>
            </ul>
            <CodeBlock language="javascript">{fetchExample}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Input</th><th scope="col">Exact failing statement</th><th scope="col">Reason and handling</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">Network failure</th><td><code>await fetch(path)</code></td><td>No Response arrives. The caller's catch handles rejection.</td></tr>
                        <tr><th scope="row">/api/missing</th><td><code>throw new Error('HTTP ' + response.status)</code></td><td>The application rejects HTTP 404. json() is not reached.</td></tr>
                        <tr><th scope="row">/api/bad-json</th><td><code>await response.json()</code></td><td>The text cannot be parsed as JSON. The caller catches SyntaxError.</td></tr>
                        <tr><th scope="row">/api/wrong-user</th><td><code>throw new Error('Invalid user data')</code></td><td>The parsed name is a number. The application requires a string.</td></tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>These failures need different fixes: restore connectivity, choose an existing endpoint, return valid JSON, or return the expected data shape.</li>
                <li>The server-dependent snippet needs the endpoints stated in its comments. The next example uses local <code>Response</code> objects to show status and parsing without a server.</li>
            </ul>
            <JavaScriptRunner>{responseBodyExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">Application state records each outcome</h3>
            <ul className="Article__notes">
                <li>State is the data an application stores to describe its current screen. <code>status</code> below is an application-defined property.</li>
                <li><code>idle</code> means no request yet. <code>loading</code> means waiting. The example then records <code>empty</code>, <code>success</code>, <code>error</code>, or <code>cancelled</code>.</li>
                <li><code>DOMException</code> is a browser error type. The example creates one named <code>AbortError</code> to simulate cancellation. The next section shows real cancellation.</li>
            </ul>
            <JavaScriptRunner>{requestStateExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Check the HTTP status and data shape at the request boundary, as getUser does. Keep loading and outcome states explicit. Display a useful application error message instead of raw internal details.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="cancellation">
            <h2 id="cancellation" className="SectionTitle">Cancellation belongs to the operation</h2>
            <ul className="Article__notes">
                <li>A Promise has no general cancel method. An operation must support cancellation separately.</li>
                <li><code>AbortController</code> creates a controller and its <code>signal</code>. Pass that signal to an API that supports cancellation.</li>
                <li><code>controller.abort()</code> sets <code>signal.aborted</code> to <code>true</code> and notifies that API.</li>
                <li>For <code>fetch</code>, the default abort reason is an error named <code>AbortError</code>. The request or body-reading Promise rejects when it observes cancellation.</li>
                <li>A timeout implemented with setTimeout aborts when that callback runs. It is not an exact clock deadline.</li>
            </ul>
            <CodeBlock language="javascript">{abortSignalExample}</CodeBlock>
            <CodeBlock language="javascript">{cancellationExample}</CodeBlock>
            <ul className="Article__notes">
                <li>In <code>loadSlow</code>, <code>controller.abort()</code> is the cancellation trigger. An <code>await</code> on the cancelled request or body read throws the abort reason.</li>
                <li>The final <code>catch</code> prints the error name. Treat this expected cancellation separately from a request failure.</li>
                <li><code>return await response.json()</code> keeps this function inside <code>try</code> until body reading finishes. <code>finally</code> then clears the timer.</li>
            </ul>
            <h3 className="Article__subTitle">Overlapping searches can finish out of order</h3>
            <ul className="Article__notes">
                <li>An older request can finish after a newer request. Without an application check, its result can replace the newer result.</li>
                <li>A request identifier is a number assigned to one call. <code>++newest</code> increments the shared number and returns it.</li>
                <li><code>requestId === newest</code> means this call is still the latest. The check prevents an older completion from updating the displayed result.</li>
            </ul>
            <JavaScriptRunner>{latestRequestExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li><code>activeController?.abort()</code> uses optional chaining. It calls <code>abort</code> only when a controller exists.</li>
                <li><code>encodeURIComponent(query)</code> encodes characters so the query can be placed in the URL.</li>
                <li>Aborting the previous request and checking the identifier can work together. An abort does not guarantee that the server undoes work already performed.</li>
            </ul>
            <CodeBlock language="javascript">{abortPreviousExample}</CodeBlock>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Cancel work when its owner no longer needs it. Handle AbortError separately from request failure. For latest-result interfaces, check the request identifier before updating state.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="retries">
            <h2 id="retries" className="SectionTitle">A retry calls the operation again</h2>
            <ul className="Article__notes">
                <li>The retry function below makes another call after failure. JavaScript does not classify failures as temporary automatically.</li>
                <li>The example stops after three attempts or a non-temporary failure. Its delay doubles between retry attempts.</li>
                <li><code>operation</code> is a function, so calling it again can start new work. Awaiting the same rejected Promise again does not retry anything.</li>
                <li><code>Object.assign(error, &#123; temporary: true &#125;)</code> adds a property to the error object. The retry helper checks that application-defined property.</li>
                <li><code>2 ** n</code> means 2 raised to the power n. Here it makes the waits 10 ms, then 20 ms.</li>
            </ul>
            <JavaScriptRunner>{retryExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li>The operation's <code>throw</code> supplies the original failure. <code>await operation()</code> handles both that synchronous throw and a returned Promise's rejection.</li>
                <li><code>throw error</code> inside <code>retry</code> ends retries and rejects the Promise returned by <code>retry</code>. The caller's <code>catch</code> receives it.</li>
                <li><code>inspectRetries</code> awaits each demonstration before starting the next. <code>permanent 1</code> means one call; <code>still temporary 3</code> means three calls.</li>
            </ul>
            <h3 className="Article__subTitle">HTTP policy, backoff, and server timing</h3>
            <ul className="Article__notes">
                <li>A retry policy is an application rule that selects failures to retry. The sample selects <code>429</code> (too many requests) and some server failures.</li>
                <li><code>400</code> means the request is invalid. <code>401</code> means authentication is required. Retrying unchanged input usually repeats those failures.</li>
                <li><code>Retry-After</code> is response metadata supplied by the server. It can tell the client how long to wait.</li>
                <li>The parser uses <code>/^\d+$/</code> to match a string containing only digits. <code>Date.parse</code> handles the date form.</li>
                <li>A Retry-After response header can specify seconds or an HTTP date. The parser below supports both.</li>
                <li>Jitter is a random addition to a delay. It gives clients different retry times instead of one fixed retry time.</li>
            </ul>
            <JavaScriptRunner>{retryPolicyExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">Repeating writes and stopping a retry</h3>
            <ul className="Article__notes">
                <li>Retrying a write can create duplicate data if the first write succeeded but its response was lost.</li>
                <li>An idempotent operation has the same intended effect when repeated. An idempotency key helps only when the server implements that contract.</li>
                <li>A retry wait is another pending operation. It can stop on an abort signal when the wait implementation listens to that signal.</li>
            </ul>
            <CodeBlock language="javascript">{retryWriteExample}</CodeBlock>
            <JavaScriptRunner>{abortableDelayExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Limit attempts, retry only failures appropriate for the operation, and account for Retry-After. Use server-supported idempotency for writes. Pass cancellation through both requests and retry delays.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="bounded-concurrency">
            <h2 id="bounded-concurrency" className="SectionTitle">A worker limit controls how many operations start</h2>
            <ul className="Article__notes">
                <li>Array.map calls its mapper for every present item immediately. Promise.all does not postpone those calls.</li>
                <li>A mapper is the callback that turns one input item into a result. It may return a plain value or a Promise.</li>
                <li>A worker here is an async function that repeatedly takes an item. It is not a worker thread.</li>
                <li>The helper starts at most <code>limit</code> mapper calls before waiting. Each worker takes another item after its current one finishes.</li>
                <li><code>nextIndex++</code> supplies the current index and then increments it. A worker takes that index before reaching <code>await</code>, so two workers do not take the same item.</li>
                <li><code>Array.from(&#123; length: ... &#125;, worker)</code> calls <code>worker</code> the requested number of times. <code>Promise.all</code> waits for the returned worker Promises.</li>
                <li>Results are stored under their original index. The array keeps input order even when operations finish in a different order.</li>
                <li>A mapper failure rejects the combined Promise. This helper has no shared stop flag, so other workers can finish their current item and start remaining items after that rejection.</li>
            </ul>
            <JavaScriptRunner>{eagerMapExample}</JavaScriptRunner>
            <JavaScriptRunner>{concurrencyExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li><code>mapWithConcurrency([1], 0, ...)</code> reaches <code>throw new RangeError('Invalid limit')</code>. A range error reports an unacceptable numeric value.</li>
                <li>That helper is async, so the call returns a rejected Promise. The caller's <code>await</code> throws to its <code>catch</code>. Use a positive integer limit.</li>
                <li><code>Promise.reject(new Error('mapper failed'))</code> in the failure demonstration rejects item 1. The worker's <code>await mapper(...)</code> then throws.</li>
                <li><code>Promise.all</code> rejects the helper's result. Item 2 still completes and that worker starts item 3. Add a shared stop rule if that behavior does not fit the application.</li>
            </ul>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Use a small fixed list when starting everything together is acceptable. Use a worker limit when the API capacity, memory use, or cost requires fewer active operations. This helper rejects invalid limits.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="application-patterns">
            <h2 id="application-patterns" className="SectionTitle">Application patterns</h2>
            <h3 className="Article__subTitle">Debouncing resets a pending timer</h3>
            <ul className="Article__notes">
                <li>Debouncing waits for a pause between repeated calls. Each call cancels the pending timer and starts a new delay.</li>
                <li><code>(...args)</code> collects the call's arguments into an array. <code>callback(...args)</code> passes those arguments to the callback.</li>
                <li>Only the latest call's timer remains. Its callback receives the latest arguments.</li>
                <li>Once a callback has started a request, resetting the timer does not cancel that request.</li>
            </ul>
            <JavaScriptRunner>{debounceExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">Async iteration reads one next result at a time</h3>
            <ul className="Article__notes">
                <li>A generator is a function that supplies a sequence one value at a time. <code>function*</code> declares it. <code>yield value</code> supplies one value and pauses it.</li>
                <li><code>async function*</code> declares an async generator. It can await work before supplying each value.</li>
                <li>An async iterable is an object that supplies its next value asynchronously. Calling <code>pages()</code> returns such an object without running the whole sequence.</li>
                <li><code>for await...of</code> asks for the next value and waits for it. It runs the loop body, then asks again until the sequence ends.</li>
                <li>A paginated request can yield one page at a time. The next-page request below starts when the loop asks for the next value.</li>
            </ul>
            <JavaScriptRunner>{asyncIterableExample}</JavaScriptRunner>
            <CodeBlock language="javascript">{paginationExample}</CodeBlock>
            <h3 className="Article__subTitle">Resource ownership determines cleanup</h3>
            <ul className="Article__notes">
                <li>The owner is the part of the application that starts an operation and decides when it is no longer needed.</li>
                <li><code>startUpdates</code> returns a cleanup function. Calling <code>cleanup()</code> clears its timer, removes its event listener, and aborts its request.</li>
                <li>These are separate API calls. Settling a Promise does not perform them all.</li>
            </ul>
            <CodeBlock language="javascript">{ownershipExample}</CodeBlock>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Debounce frequent input when the delay is acceptable. Return the Promise to the caller that needs the result. Put cleanup in finally or an owner cleanup function, as the request and subscription examples show.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="common-mistakes">
            <h2 id="common-mistakes" className="SectionTitle">Returned values explain common async mistakes</h2>
            <h3 className="Article__subTitle">forEach discards results; map returns an array</h3>
            <ul className="Article__notes">
                <li>forEach returns undefined. Awaiting that value cannot wait for its callback Promises.</li>
                <li>map returns an array of callback results. Awaiting the array itself returns that array; it does not wait for the Promises inside it.</li>
                <li>Promise.all waits for those Promises. A for...of loop with await waits before starting its next operation.</li>
            </ul>
            <JavaScriptRunner>{mistakesExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">try/catch needs a synchronous throw or an awaited rejection</h3>
            <ul className="Article__notes">
                <li>Calling a function that returns a rejected Promise does not throw that rejection synchronously.</li>
                <li>A returned Promise lets the caller observe failure. A rejection handler can also handle intentional background work.</li>
                <li>An unhandled rejection is reported by the host runtime. Its reporting policy differs across runtimes.</li>
            </ul>
            <JavaScriptRunner>{floatingPromiseExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">The Promise constructor ignores an executor return value</h3>
            <ul className="Article__notes">
                <li>An async executor returns its own Promise. The outer Promise constructor ignores that returned Promise.</li>
                <li>The exact failure statement below is <code>throw new Error('executor failed')</code>. Because the executor is async, it rejects the executor's separate Promise.</li>
                <li>Neither <code>resolve</code> nor <code>reject</code> is called for <code>outer</code>. It stays pending, so <code>outer.catch</code> cannot handle the separate rejection.</li>
                <li>Use an ordinary executor for callback conversion. Use an async function directly for Promise-based work.</li>
            </ul>
            <CodeBlock language="javascript">{asyncExecutorExample}</CodeBlock>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Use an ordinary executor for callback conversion. Await, return, or handle each Promise according to who owns its result. Return an existing Promise directly when no API conversion is needed.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="reasoning-about-async">
            <h2 id="reasoning-about-async" className="SectionTitle">Find the order from when each callback is queued</h2>
            <ul className="Article__notes">
                <li>The browser example below prints its synchronous logs first. Its first then handler runs at the microtask checkpoint.</li>
                <li>The second then handler is queued after the first finishes. Both run before the timer task.</li>
                <li>The microtask added inside the timer runs after that timer callback ends, before another task.</li>
            </ul>
            <JavaScriptRunner>{reasoningExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>For each statement, record whether it runs now, queues a microtask, or asks the host for later work. Then follow the queue order shown above.</li>
                <li>For a race between requests, use the cancellation section examples. Node.js adds phase and next-tick rules shown in the <a className="Link" href={toHref(JAVASCRIPT_EVENT_LOOP_ROUTE)}>event loop note</a>.</li>
            </ul>
        </section>
        <section className="Article__section">
            <ul className="Article__notes">
                <li>Reference: <a className="Link" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise behavior</a>.</li>
                <li>Reference: <a className="Link" href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">fetch responses, body parsing, and cancellation</a>.</li>
                <li>Reference: <a className="Link" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function">async function returns and suspension</a>.</li>
                <li>Reference: <a className="Link" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally">finally result and failure behavior</a>.</li>
                <li>Reference: <a className="Link" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of">async iteration</a>.</li>
                <li>Reference: <a className="Link" href="https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort">abort signals and default abort reasons</a>.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default JavaScriptAsync;
