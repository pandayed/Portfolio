import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'fastapi-async-operations',
    title: 'Async path operations',
    summary: 'Choose async def or def based on how the libraries called by the operation work.',
    updatedOn: '2026-09-30',
    sections: [
        {
            id: 'awaitable-library',
            title: 'Use async def with awaitable libraries',
            paragraphs: [
                'Use async def when the code awaits an asynchronous library call. While that call waits for I/O, such as a network response, the event loop can work on other tasks. You can write await only inside an async def function.',
            ],
            examples: [{
                code: [
                    '@app.get("/status")',
                    'async def read_status():',
                    '    result = await async_client.get_status()',
                    '    return {"status": result}',
                ].join('\n'),
                result: 'The handler waits for the async client without blocking the event loop during that wait.',
            }],
        },
        {
            id: 'blocking-library',
            title: 'Use def with synchronous I/O libraries',
            paragraphs: [
                'If a library performs blocking I/O and has no asynchronous interface, a normal def path operation is a suitable choice. FastAPI runs normal path operation functions in an external thread pool.',
            ],
            examples: [{
                code: [
                    '@app.get("/legacy-status")',
                    'def read_legacy_status():',
                    '    result = sync_client.get_status()',
                    '    return {"status": result}',
                ].join('\n'),
                result: 'The synchronous network call runs in a worker thread rather than directly blocking the event loop.',
            }],
        },
        {
            id: 'avoid-blocking-async',
            title: 'Do not block inside async def',
            paragraphs: [
                'A blocking call inside async def stops the event loop while it runs. That can delay other requests handled by the same worker. Choose a library with async support, or put synchronous work in a normal FastAPI path operation or dependency where appropriate.',
            ],
            exceptions: [
                'FastAPI only applies its thread-pool behavior to path operation functions and dependencies that it calls. A normal utility function that you call directly from async def runs directly and can block.',
                'Async code helps when work waits on supported asynchronous I/O. It does not make CPU-heavy work run in parallel.',
            ],
        },
    ],
};

export default note;
