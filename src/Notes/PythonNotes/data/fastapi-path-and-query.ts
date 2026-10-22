import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "fastapi-path-and-query",
    "title": "Path and query parameters",
    "summary": "Read values from the URL path and query string, then validate them with type annotations.",
    "updatedOn": "2026-09-30",
    "sections": [
        {
            "id": "path-parameters",
            "title": "Path parameters",
            "examples": [
                {
                    "code": "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get(\"/items/{item_id}\")\nasync def read_item(item_id: int):\n    return {\"item_id\": item_id}",
                    "result": "GET /items/42 passes the integer 42 to read_item and returns {\"item_id\":42}.",
                    "title": "Path Param",
                    "description": [
                        "The code is saved as `main.py` in a FastAPI project.",
                        "The development server runs with `uv run fastapi dev main.py`."
                    ]
                }
            ],
            "bullets": [
                "A path parameter is a named part of the URL path.",
                "Put its name in braces in the route, then declare a function parameter with the same name.",
                "A Python type annotation tells FastAPI how to parse and validate the value."
            ]
        },
        {
            "id": "query-parameters",
            "title": "Query parameters",
            "examples": [
                {
                    "code": "@app.get(\"/items/\")\nasync def read_items(skip: int = 0, limit: int = 20):\n    return {\"skip\": skip, \"limit\": limit}",
                    "result": "GET /items/?skip=20&limit=5 returns {\"skip\":20,\"limit\":5}. GET /items/ uses the defaults.",
                    "title": "Query Param",
                    "description": [
                        "This operation is added to the `app` defined in the path-parameter example."
                    ]
                }
            ],
            "bullets": [
                "`Query` parameters come after ?",
                "in a URL.",
                "Separate multiple parameters with &.",
                "A function parameter that is not part of the path is treated as a query parameter by default.",
                "URL values arrive as text.",
                "FastAPI parses them using the declared Python types.",
                "A default value makes a query parameter optional.",
                "Use `str` | `None` = `None` when a value may be omitted and should have no value inside the function.",
                "Use `Query` inside `typing.Annotated` when you need extra validation, such as a minimum or maximum length."
            ]
        },
        {
            "id": "where-values-come-from",
            "title": "Request value sources",
            "bullets": [
                "A parameter whose name appears in the route comes from the path.",
                "A simple value such as `int` or `str` that is not in the route comes from the query string.",
                [
                    "A ",
                    {
                        "text": "Pydantic",
                        "href": "#/notes/python/pydantic"
                    },
                    " model parameter comes from the request body."
                ]
            ]
        }
    ],
    "exampleLayout": "grouped"
};

export default note;
