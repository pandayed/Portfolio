import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "fastapi-async-operations",
    "title": "Async path operations",
    "summary": "Choose async def or def based on how the libraries called by the operation work.",
    "updatedOn": "2026-09-30",
    "sections": [
        {
            "id": "awaitable-library",
            "title": "Using async def with awaitable libraries",
            "examples": [
                {
                    "code": "@app.get(\"/status\")\nasync def read_status():\n    result = await async_client.get_status()\n    return {\"status\": result}",
                    "result": "The handler waits for the async client without blocking the event loop during that wait.",
                    "title": "Using async def with awaitable libraries",
                    "description": [
                        "The fragment requires a FastAPI `app` and an `async_client` with an awaitable `get_status` method."
                    ]
                }
            ],
            "bullets": [
                "Use `async def` when the code awaits an asynchronous library call.",
                "While that call waits for I/O, such as a network response, the event loop can work on other tasks.",
                "You can write `await` only inside an `async def` function."
            ]
        },
        {
            "id": "blocking-library",
            "title": "Using def with synchronous I/O libraries",
            "examples": [
                {
                    "code": "@app.get(\"/legacy-status\")\ndef read_legacy_status():\n    result = sync_client.get_status()\n    return {\"status\": result}",
                    "result": "The synchronous network call runs in a worker thread rather than directly blocking the event loop.",
                    "title": "Using def with synchronous I/O libraries",
                    "description": [
                        "The fragment requires a FastAPI `app` and a `sync_client` with a blocking `get_status` method."
                    ]
                }
            ],
            "bullets": [
                "If a library performs blocking I/O and has no asynchronous interface, a normal `def` path operation is a suitable choice.",
                "FastAPI runs normal path operation functions in an external thread pool."
            ]
        },
        {
            "id": "avoid-blocking-async",
            "title": "Avoiding blocking inside async def",
            "bullets": [
                "A blocking call inside `async def` stops the event loop while it runs.",
                "That can delay other requests handled by the same worker.",
                "Choose a library with async support, or put synchronous work in a normal FastAPI path operation or dependency where appropriate."
            ]
        }
    ],
    "exampleLayout": "grouped"
};

export default note;
