import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "fastapi-dependencies",
    "title": "Dependencies",
    "summary": "Provide shared request logic with Depends, using pagination for product and order lists.",
    "updatedOn": "2026-10-15",
    "exampleLayout": "grouped",
    "sections": [
        {
            "id": "dependency-purpose",
            "title": "What a dependency does",
            "bullets": [
                "A dependency is a function that provides a value or checks a requirement before a path operation runs.",
                "FastAPI calls the dependency and passes its return value to the path operation. This is called dependency injection.",
                "For example, an online shop can use the same pagination dependency for its product and order lists. Each endpoint receives validated pagination settings without repeating that logic."
            ]
        },
        {
            "id": "annotated",
            "title": "Understanding Annotated before using Depends",
            "bullets": [
                "Annotated comes from Python’s typing module. Annotated[Type, metadata] combines a type annotation with extra information for a tool or framework.",
                "In Annotated[dict, Depends(pagination)], dict is the type of value the parameter receives. Depends(pagination) tells FastAPI which function supplies that value.",
                "Annotated does not call pagination or validate the value by itself. FastAPI reads the Depends information and performs the dependency call.",
                "Pass the function as Depends(pagination), without parentheses after pagination. Depends(pagination()) would call it immediately instead of letting FastAPI call it with request values."
            ]
        },
        {
            "id": "declare-dependency",
            "title": "Declaring a dependency with Depends",
            "bullets": [
                "A dependency can declare request parameters just like a path operation. Here, skip and limit come from the query string.",
                "FastAPI resolves those parameters, calls pagination, and supplies its returned dictionary as page. The endpoint then uses page to select records."
            ],
            "examples": [
                {
                    "title": "Sharing pagination between products and orders",
                    "description": [
                        "An online shop needs paginated product and order lists. Both endpoints must reject a negative skip or a limit outside 1–100.",
                        "Save this as main.py and run fastapi dev main.py. The lists stand in for stored records so the example needs no database."
                    ],
                    "code": "from typing import Annotated\nfrom fastapi import Depends, FastAPI, HTTPException\n\napp = FastAPI()\n\nproducts = [\"Keyboard\", \"Mouse\", \"Monitor\", \"Webcam\"]\norders = [\"Order-101\", \"Order-102\", \"Order-103\", \"Order-104\"]\n\ndef pagination(skip: int = 0, limit: int = 2) -> dict:\n    if skip < 0 or not 1 <= limit <= 100:\n        raise HTTPException(\n            status_code=400,\n            detail=\"skip must be non-negative and limit must be 1–100\",\n        )\n    return {\"skip\": skip, \"limit\": limit}\n\n@app.get(\"/products/\")\ndef list_products(page: Annotated[dict, Depends(pagination)]):\n    start = page[\"skip\"]\n    return products[start:start + page[\"limit\"]]\n\n@app.get(\"/orders/\")\ndef list_orders(page: Annotated[dict, Depends(pagination)]):\n    start = page[\"skip\"]\n    return orders[start:start + page[\"limit\"]]",
                    "result": "GET /products/?skip=1&limit=2 → [\"Mouse\",\"Monitor\"]\nGET /orders/?skip=2&limit=1 → [\"Order-103\"]\nGET /products/?limit=0 → HTTP 400 with the validation message",
                    "explanation": [
                        "For the first request, FastAPI reads skip=1 and limit=2 from the URL and converts them to integers using the dependency’s type annotations.",
                        "FastAPI calls pagination(skip=1, limit=2). It returns {\"skip\": 1, \"limit\": 2}, which FastAPI passes to list_products as page. page is not a request body.",
                        "list_products selects products[1:3], returning Mouse and Monitor. list_orders uses the same dependency to paginate a different list.",
                        "If skip or limit is omitted, pagination uses its default. GET /products/ returns the first two products.",
                        "If pagination raises HTTPException, FastAPI sends that error response without running the endpoint. A non-integer value such as skip=abc fails FastAPI’s parameter validation with HTTP 422 before pagination runs.",
                        "An ordinary helper would require each endpoint to declare skip and limit and call the helper itself. Depends lets FastAPI supply those inputs and call the shared function."
                    ]
                }
            ]
        },
        {
            "id": "dependency-use",
            "title": "Using dependencies for shared request work",
            "bullets": [
                "Dependencies can also provide a database session or check whether a request is allowed to continue.",
                "A dependency can declare its own dependencies. FastAPI resolves those first.",
                "FastAPI includes dependency request parameters in the generated API documentation."
            ]
        }
    ]
};

export default note;
