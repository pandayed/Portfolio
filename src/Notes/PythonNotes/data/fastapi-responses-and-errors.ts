import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'fastapi-responses-and-errors',
    title: 'Response models and HTTP errors',
    summary: 'Define the data an operation returns, choose a status code, and report expected errors.',
    updatedOn: '2026-09-30',
    sections: [
        {
            id: 'response-model',
            title: 'Describe the response',
            paragraphs: [
                'An output model documents the response shape and checks the data your function returns. It can also filter fields that are not part of the public response model.',
            ],
            examples: [{
                code: [
                    'from pydantic import BaseModel',
                    '',
                    'class UserPublic(BaseModel):',
                    '    username: str',
                    '',
                    '@app.get("/users/{user_id}", response_model=UserPublic)',
                    'async def read_user(user_id: int):',
                    '    return {"username": "ada", "password_hash": "hidden"}',
                ].join('\n'),
                result: 'The response contains username. password_hash is omitted because it is not in UserPublic.',
            }],
            exceptions: [
                'A response model does not replace authorization. Decide whether the caller may access the resource before returning its data.',
            ],
        },
        {
            id: 'status-codes',
            title: 'Choose a response status code',
            paragraphs: [
                'FastAPI uses 200 OK by default for a successful operation. Set status_code on the route decorator when the operation has a different success status, such as 201 Created after creating a resource.',
            ],
            examples: [{
                code: [
                    'from fastapi import status',
                    '',
                    '@app.post("/items/", status_code=status.HTTP_201_CREATED)',
                    'async def create_item(item: ItemInput):',
                    '    return item',
                ].join('\n'),
                result: 'A successful POST returns status 201. FastAPI also records this status in the generated API schema.',
            }],
        },
        {
            id: 'expected-errors',
            title: 'Raise an HTTPException for an expected error',
            paragraphs: [
                'Raise HTTPException when the request is valid but the requested action cannot be completed. For example, return 404 when an item does not exist. Raising the exception stops the operation and sends an HTTP error response.',
            ],
            examples: [{
                code: [
                    'from fastapi import HTTPException',
                    '',
                    '@app.get("/items/{item_id}")',
                    'async def read_item(item_id: int):',
                    '    item = items.get(item_id)',
                    '    if item is None:',
                    '        raise HTTPException(status_code=404, detail="Item not found")',
                    '    return item',
                ].join('\n'),
                result: 'A missing item returns status 404 and JSON containing {"detail":"Item not found"}.',
            }],
            exceptions: [
                'Raise HTTPException. Returning an HTTPException object does not signal an error response.',
                'Do not use an HTTP error for a server bug. Unexpected failures should remain server errors and be fixed in application code.',
            ],
        },
    ],
};

export default note;
