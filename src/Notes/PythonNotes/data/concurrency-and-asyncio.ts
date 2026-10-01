import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'concurrency-and-asyncio',
    title: 'Threads, processes, asyncio, and the GIL',
    summary: 'Choose a concurrency model, understand the CPython GIL and event loop, and protect shared data.',
    updatedOn: '2026-10-01',
    sections: [
        {
            id: 'concurrency-and-parallelism',
            title: 'Concurrency versus parallelism',
            paragraphs: [
                'Concurrency means making progress on more than one task during the same period. A task can pause while another runs. Parallelism means two tasks actually run at the same instant, for example on different CPU cores. Concurrent work does not always run in parallel.',
            ],
        },
        {
            id: 'gil',
            title: 'The GIL in CPython',
            paragraphs: [
                'In a usual GIL-enabled CPython build, the Global Interpreter Lock (GIL) allows only one thread at a time to execute Python code in a process. This limits parallel speedups for CPU-heavy Python code in threads. The GIL is an implementation detail of CPython, not a rule for every Python implementation.',
                'A thread can release the GIL while it waits for blocking I/O, and some extension code releases it too. Other threads can run during that time. The GIL therefore does not prevent concurrent network requests or file operations.',
                'CPython also has optional free-threaded builds, starting with Python 3.13. They can run Python threads in parallel with the GIL disabled, though the GIL can be enabled at runtime. Do not assume every installed CPython has this mode or that shared data is safe without synchronization.',
                [
                    'Read the official ',
                    { text: 'threading documentation', href: 'https://docs.python.org/3/library/threading.html#gil-and-performance-considerations' },
                    ' and ',
                    { text: 'free-threading guide', href: 'https://docs.python.org/3/howto/free-threading-python.html' },
                    ' for the installed Python version.',
                ],
            ],
        },
        {
            id: 'choose-concurrency',
            title: 'Choose threads, processes, or asyncio',
            bullets: [
                'Multithreading: threads share one process and its memory. Choose it for several blocking I/O calls, such as downloading files with a synchronous network library. While one call waits, another thread can run. Protect shared mutable data with a lock or a thread-safe queue.',
                'Multiprocessing: separate processes have separate Python memory and can run CPU-heavy Python code on different cores in a usual GIL-enabled CPython build. Choose it for independent image transformations or numerical calculations. Passing data between processes costs time and memory.',
                'asyncio: one event loop can schedule many coroutines that cooperate by awaiting non-blocking I/O. Choose it for many network connections when the client and server libraries have async APIs. An ordinary blocking call inside a coroutine still blocks the event loop.',
                'For CPU-heavy work, asyncio alone does not make the calculation run on another core. Use processes or another suitable worker when parallel CPU execution is needed.',
            ],
            paragraphs: [
                'Choose based on what a task does while it runs and whether its libraries support async I/O. All three can handle concurrent work, but they use different scheduling and memory models.',
                [
                    'See the Python ',
                    { text: 'multiprocessing', href: 'https://docs.python.org/3/library/multiprocessing.html' },
                    ' and ',
                    { text: 'asyncio', href: 'https://docs.python.org/3/library/asyncio.html' },
                    ' documentation for their APIs.',
                ],
            ],
        },
        {
            id: 'asyncio-event-loop',
            title: 'How the asyncio event loop works',
            paragraphs: [
                'Calling an async function creates a coroutine object; it does not run the body by itself. asyncio.run() starts the top-level coroutine and manages an event loop. Tasks let the loop schedule several coroutines.',
                'When a task awaits an unfinished operation, such as a network read, that task pauses. The event loop runs another ready task and watches for I/O readiness or completion. When the operation is ready, the loop resumes the waiting task. An await does not itself create a thread.',
                'For many network connections, each connection can have a small amount of task and socket state. The loop watches the sockets and resumes work when they are ready, so it does not need one thread per connection. Real limits still include memory, file descriptors, network capacity, and work done for each connection.',
                'A CPU-heavy loop or synchronous time.sleep() inside an async function holds up other tasks on that event loop. Use await with an async I/O API; move a required blocking call to a worker when appropriate.',
            ],
            examples: [{
                title: 'Two tasks take turns while waiting',
                code: [
                    'import asyncio',
                    '',
                    'async def fetch(number):',
                    '    await asyncio.sleep(0.1)  # Stand-in for async I/O',
                    '    return number * 2',
                    '',
                    'async def main():',
                    '    results = await asyncio.gather(fetch(1), fetch(2))',
                    '    print(results)',
                    '',
                    'asyncio.run(main())',
                ].join('\n'),
                result: '[2, 4]. Both coroutines can pause while waiting. gather returns results in the order its arguments were passed, even if tasks finish in another order.',
            }],
            bullets: [[
                'The ',
                { text: 'coroutines and tasks guide', href: 'https://docs.python.org/3/library/asyncio-task.html' },
                ' describes task scheduling; the ',
                { text: 'event loop reference', href: 'https://docs.python.org/3/library/asyncio-eventloop.html' },
                ' covers I/O watching and callbacks.',
            ]],
        },
        {
            id: 'shared-counter-race',
            title: 'Shared counters and race conditions',
            paragraphs: [
                'Two threads changing the same counter need synchronization. The operation counter += 1 reads the old value, computes a new value, and assigns it. The GIL does not provide a supported guarantee that this whole update is atomic. Depending on the interpreter and timing, an unprotected run may print 200000 or may lose updates.',
                'A lock lets only one thread at a time perform the full read-modify-write update. Both threads must use the same lock for every update to that counter.',
            ],
            examples: [{
                title: 'Unprotected shared update',
                code: [
                    'counter = 0',
                    '',
                    'def increment():',
                    '    global counter',
                    '    for _ in range(100_000):',
                    '        counter += 1',
                ].join('\n'),
                result: 'If two threads call increment(), 200000 is the intended total, but this code does not guarantee that result. A particular run that prints 200000 does not prove the update is safe.',
            }, {
                title: 'Guard the update with one lock',
                code: [
                    'from threading import Lock, Thread',
                    '',
                    'counter = 0',
                    'counter_lock = Lock()',
                    '',
                    'def increment():',
                    '    global counter',
                    '    for _ in range(100_000):',
                    '        with counter_lock:',
                    '            counter += 1',
                    '',
                    'threads = [Thread(target=increment) for _ in range(2)]',
                    'for thread in threads:',
                    '    thread.start()',
                    'for thread in threads:',
                    '    thread.join()',
                    '',
                    'print(counter)',
                ].join('\n'),
                result: '200000. join() waits for both threads. The shared lock protects each complete counter update.',
            }],
            bullets: [[
                'Use ',
                { text: 'threading.Lock', href: 'https://docs.python.org/3/library/threading.html#lock-objects' },
                ' for shared state that requires a coordinated update.',
            ]],
        },
    ],
};

export default note;
