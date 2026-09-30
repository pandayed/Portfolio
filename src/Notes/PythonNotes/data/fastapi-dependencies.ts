import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'fastapi-dependencies',
    title: 'Reusable dependencies',
    summary: 'Share request logic and provide values to path operations with Depends.',
    updatedOn: '2026-09-30',
    sections: [
        {
            id: 'dependency-purpose',
            title: 'What a dependency does',
            paragraphs: [
                'A dependency is logic that a path operation needs before it can do its work. FastAPI calls the dependency, resolves its own parameters, and passes the result into the path operation. Use dependencies to share logic such as pagination, authentication checks, or access to a resource.',
            ],
        },
        {
            id: 'declare-dependency',
            title: 'Declare a dependency with Depends',
            paragraphs: [
                'Pass the dependency function to Depends. Do not call the function yourself. FastAPI invokes it for each matching request and injects the returned value.',
            ],
            examples: [{
                code: [
                    'from typing import Annotated',
                    'from fastapi import Depends, FastAPI',
                    '',
                    'app = FastAPI()',
                    '',
                    'async def pagination(skip: int = 0, limit: int = 20):',
                    '    return {"skip": skip, "limit": limit}',
                    '',
                    '@app.get("/items/")',
                    'async def read_items(page: Annotated[dict, Depends(pagination)]):',
                    '    return page',
                ].join('\n'),
                result: 'GET /items/?skip=10 passes {"skip":10,"limit":20} to read_items as page.',
            }],
            bullets: [
                'The dependency can have parameters that FastAPI reads from the request.',
                'A dependency can itself use other dependencies.',
                'FastAPI includes dependency parameters in the generated API documentation.',
                'Annotated keeps the Python type and the FastAPI dependency declaration together.',
            ],
        },
        {
            id: 'dependency-use',
            title: 'Use dependencies for shared request work',
            paragraphs: [
                'A dependency can return a value, such as parsed pagination settings or a database session. It can also enforce a requirement and raise an HTTPException when the request is not allowed to continue.',
            ],
        },
    ],
};

export default note;
