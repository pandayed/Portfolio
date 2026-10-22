import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "fastapi-request-bodies",
    "title": "Request bodies with Pydantic",
    "summary": "Describe JSON input with a Pydantic model and let FastAPI parse and validate it.",
    "updatedOn": "2026-09-30",
    "sections": [
        {
            "id": "model-shape",
            "title": "Describing the expected JSON",
            "examples": [
                {
                    "title": "A create-item request",
                    "code": "from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass ItemInput(BaseModel):\n    name: str\n    price: float\n    description: str | None = None\n\n@app.post(\"/items/\")\nasync def create_item(item: ItemInput):\n    return {\"name\": item.name, \"price\": item.price}",
                    "result": "A JSON body with name and price creates an ItemInput. description may be omitted.",
                    "description": [
                        "The code is saved as `main.py` in a FastAPI project.",
                        "The development server runs with `uv run fastapi dev main.py`."
                    ]
                }
            ],
            "bullets": [
                [
                    "A request body carries data from a client to an API. For JSON input, define a ",
                    {
                        "text": "Pydantic",
                        "href": "#/notes/python/pydantic"
                    },
                    " model with the fields the endpoint accepts. FastAPI reads the JSON body, validates it, and gives the function a model instance."
                ]
            ]
        },
        {
            "id": "input-validation",
            "title": "Validation happens before the function runs",
            "examples": [
                {
                    "title": "JSON body",
                    "code": "{\"name\": \"Notebook\", \"price\": \"4.50\"}",
                    "result": "price is converted to the number 4.5. The function receives item.price as a float.",
                    "description": [
                        "The JSON is sent as the body of `POST /items/` to the application above."
                    ],
                    "language": "text"
                }
            ],
            "bullets": [
                [
                    {
                        "text": "Pydantic",
                        "href": "#/notes/python/pydantic"
                    },
                    " checks the incoming data against the model fields. It converts compatible values to the declared types and reports values it cannot accept. If the body is invalid, FastAPI returns a validation response without running the path operation function."
                ]
            ]
        },
        {
            "id": "path-query-body",
            "title": "Combining path, query, and body values",
            "examples": [
                {
                    "code": "@app.put(\"/items/{item_id}\")\nasync def update_item(item_id: int, item: ItemInput, notify: bool = False):\n    return {\n        \"item_id\": item_id,\n        \"name\": item.name,\n        \"notify\": notify,\n    }",
                    "result": "PUT /items/42?notify=true reads 42 from the path, true from the query, and the item fields from the JSON body.",
                    "title": "Combining path, query, and body values",
                    "description": [
                        "The operation is added to the same `app` and uses the `ItemInput` model above."
                    ]
                }
            ],
            "bullets": [
                [
                    "One operation can receive values from several places. FastAPI uses the route name for path values, a ",
                    {
                        "text": "Pydantic",
                        "href": "#/notes/python/pydantic"
                    },
                    " model for the JSON body, and a simple value outside the route for a query parameter."
                ]
            ]
        }
    ],
    "exampleLayout": "grouped"
};

export default note;
