import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "fastapi-responses-and-errors",
    "title": "Response models and HTTP errors",
    "summary": "Define the data an operation returns, choose a status code, and report expected errors.",
    "updatedOn": "2026-09-30",
    "sections": [
        {
            "id": "response-model",
            "title": "Describing the response",
            "examples": [
                {
                    "code": "from pydantic import BaseModel\n\nclass UserPublic(BaseModel):\n    username: str\n\n@app.get(\"/users/{user_id}\", response_model=UserPublic)\nasync def read_user(user_id: int):\n    return {\"username\": \"ada\", \"password_hash\": \"hidden\"}",
                    "result": "The response contains username. password_hash is omitted because it is not in UserPublic.",
                    "title": "Describing the response",
                    "description": [
                        "The fragment requires an `app = FastAPI()` instance."
                    ]
                }
            ],
            "bullets": [
                "An output model documents the response shape and checks the data your function returns.",
                "It can also filter fields that are not part of the public response model."
            ]
        },
        {
            "id": "status-codes",
            "title": "Choosing a response status code",
            "examples": [
                {
                    "code": "from fastapi import status\n\n@app.post(\"/items/\", status_code=status.HTTP_201_CREATED)\nasync def create_item(item: ItemInput):\n    return item",
                    "result": "A successful POST returns status 201. FastAPI also records this status in the generated API schema.",
                    "title": "Choosing a response status code",
                    "description": [
                        "The fragment uses a FastAPI `app` and the `ItemInput` model from the request-body note."
                    ]
                }
            ],
            "bullets": [
                "FastAPI uses 200 OK by default for a successful operation.",
                "Set `status_code` on the route decorator when the operation has a different success status, such as 201 Created after creating a resource."
            ]
        },
        {
            "id": "expected-errors",
            "title": "Raising an HTTPException for an expected error",
            "examples": [
                {
                    "code": "from fastapi import HTTPException\n\n@app.get(\"/items/{item_id}\")\nasync def read_item(item_id: int):\n    item = items.get(item_id)\n    if item is None:\n        raise HTTPException(status_code=404, detail=\"Item not found\")\n    return item",
                    "result": "A missing item returns status 404 and JSON containing {\"detail\":\"Item not found\"}.",
                    "title": "Raising an HTTPException for an expected error",
                    "description": [
                        "The fragment requires a FastAPI `app` and an `items` dictionary keyed by integer item IDs."
                    ]
                }
            ],
            "bullets": [
                "Raise `HTTPException` when the request is valid but the requested action cannot be completed.",
                "For example, return 404 when an item does not exist.",
                "Raising the exception stops the operation and sends an HTTP error response."
            ]
        }
    ],
    "exampleLayout": "grouped"
};

export default note;
