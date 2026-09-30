import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'fastapi-path-and-query',
    title: 'Path and query parameters',
    summary: 'Read values from the URL path and query string, then validate them with type annotations.',
    updatedOn: '2026-09-30',
    sections: [
        {
            id: 'path-parameters',
            title: 'Read a value from the path',
            paragraphs: [
                'A path parameter is a named part of the URL path. Put its name in braces in the route, then declare a function parameter with the same name. A Python type annotation tells FastAPI how to parse and validate the value.',
            ],
            examples: [{
                code: [
                    'from fastapi import FastAPI',
                    '',
                    'app = FastAPI()',
                    '',
                    '@app.get("/items/{item_id}")',
                    'async def read_item(item_id: int):',
                    '    return {"item_id": item_id}',
                ].join('\n'),
                result: 'GET /items/42 passes the integer 42 to read_item and returns {"item_id":42}.',
            }],
        },
        {
            id: 'query-parameters',
            title: 'Read values from the query string',
            paragraphs: [
                'Query parameters come after ? in a URL. Separate multiple parameters with &. A function parameter that is not part of the path is treated as a query parameter by default.',
            ],
            examples: [{
                code: [
                    '@app.get("/items/")',
                    'async def read_items(skip: int = 0, limit: int = 20):',
                    '    return {"skip": skip, "limit": limit}',
                ].join('\n'),
                result: 'GET /items/?skip=20&limit=5 returns {"skip":20,"limit":5}. GET /items/ uses the defaults.',
            }],
            bullets: [
                'URL values arrive as text. FastAPI parses them using the declared Python types.',
                'A default value makes a query parameter optional.',
                'Use str | None = None when a value may be omitted and should have no value inside the function.',
                'Use Query inside typing.Annotated when you need extra validation, such as a minimum or maximum length.',
            ],
        },
        {
            id: 'where-values-come-from',
            title: 'How FastAPI identifies input values',
            bullets: [
                'A parameter whose name appears in the route comes from the path.',
                'A simple value such as int or str that is not in the route comes from the query string.',
                'A Pydantic model parameter comes from the request body.',
            ],
        },
    ],
};

export default note;
