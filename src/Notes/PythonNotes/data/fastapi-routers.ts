import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "fastapi-routers",
    "title": "Splitting an application with APIRouter",
    "summary": "Group related path operations in separate modules and include them in the main app.",
    "updatedOn": "2026-09-30",
    "sections": [
        {
            "id": "why-routers",
            "title": "Grouping related operations",
            "examples": [
                {
                    "title": "app/routers/items.py",
                    "code": "from fastapi import APIRouter\n\nrouter = APIRouter(prefix=\"/items\", tags=[\"items\"])\n\n@router.get(\"/\")\nasync def read_items():\n    return []\n\n@router.get(\"/{item_id}\")\nasync def read_item(item_id: int):\n    return {\"item_id\": item_id}",
                    "result": "The router declares GET /items/ and GET /items/{item_id}.",
                    "description": [
                        "The file is saved as `app/routers/items.py` in the project layout below."
                    ]
                }
            ],
            "bullets": [
                "A small example can keep its routes in `main.py`.",
                "As an API grows, place related path operations in separate Python modules.",
                "`APIRouter` lets each module declare routes that become part of the main FastAPI application."
            ]
        },
        {
            "id": "include-router",
            "title": "Including the router in the application",
            "examples": [
                {
                    "title": "app/main.py",
                    "code": "from fastapi import FastAPI\nfrom app.routers import items\n\napp = FastAPI()\napp.include_router(items.router)",
                    "result": "The item routes are available through the main application.",
                    "explanation": [
                        "Import the router module and pass its router to `app.include_router`().",
                        "FastAPI adds those operations to the application and its OpenAPI documentation."
                    ],
                    "description": [
                        "The file is saved as `app/main.py`.",
                        "The project layout below makes `app` and `app.routers` importable packages."
                    ]
                }
            ]
        },
        {
            "id": "project-shape",
            "title": "A small project layout",
            "examples": [
                {
                    "language": "text",
                    "code": "app/\n    __init__.py\n    main.py\n    routers/\n        __init__.py\n        items.py\n        users.py",
                    "result": "main.py creates the app and includes routers. Each router module owns a related group of operations.",
                    "title": "A small project layout"
                }
            ],
            "bullets": [
                "Use a prefix to give every path in a router a shared beginning.",
                "Use tags to group related operations in the generated API docs.",
                "Add dependencies to a router when every operation in that group needs the same request check."
            ]
        }
    ],
    "exampleLayout": "grouped"
};

export default note;
