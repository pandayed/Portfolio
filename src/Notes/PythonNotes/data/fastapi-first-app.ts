import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "fastapi-first-app",
    "title": "A first FastAPI application",
    "summary": "Install FastAPI, declare an HTTP operation, and run the development server.",
    "updatedOn": "2026-09-30",
    "sections": [
        {
            "id": "install-and-run",
            "title": "Installing and running the application",
            "examples": [
                {
                    "title": "Creating a project and installing FastAPI",
                    "language": "text",
                    "code": "uv init fastapi-notes --bare\ncd fastapi-notes\nuv add \"fastapi[standard]\"",
                    "result": "uv records FastAPI and its dependencies in the project files.",
                    "description": [
                        "The commands below use `uv` to manage a project and its packages.",
                        "Run them in a new project folder.",
                        "The example requires `uv` installed in the terminal."
                    ]
                },
                {
                    "title": "Starting the development server",
                    "language": "text",
                    "code": "uv run fastapi dev main.py",
                    "result": "The server prints a local address, usually http://127.0.0.1:8000.",
                    "explanation": [
                        "The development command starts a local server and watches files for changes."
                    ],
                    "description": [
                        "The project contains the `main.py` shown in the next section.",
                        "The command runs from the `fastapi-notes` directory."
                    ]
                }
            ],
            "bullets": [
                [
                    "FastAPI is a Python framework for building HTTP APIs. It uses Python type annotations to describe request data and create API documentation. FastAPI is built on ",
                    {
                        "text": "Starlette",
                        "href": "https://www.starlette.io/"
                    },
                    " for web handling and ",
                    {
                        "text": "Pydantic",
                        "href": "#/notes/python/pydantic"
                    },
                    " for data validation."
                ]
            ]
        },
        {
            "id": "first-operation",
            "title": "Declaring a path operation",
            "examples": [
                {
                    "title": "main.py",
                    "code": "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get(\"/\")\nasync def read_root():\n    return {\"message\": \"Hello, API\"}",
                    "result": "GET / returns the JSON object {\"message\":\"Hello, API\"}.",
                    "description": [
                        "Create `main.py` and define a FastAPI app.",
                        "The URL path is /.",
                        "The HTTP method is GET.",
                        "The code is saved as `main.py` in the project directory."
                    ]
                }
            ],
            "bullets": [
                "The decorator connects an HTTP method and URL path to a Python function.",
                "FastAPI calls that function when a matching request arrives.",
                "The function is a path operation function.",
                "FastAPI calls it for a matching request.",
                "Returning a Python dictionary produces a JSON response."
            ]
        },
        {
            "id": "automatic-docs",
            "title": "Opening the generated API docs",
            "examples": [
                {
                    "language": "text",
                    "code": "http://127.0.0.1:8000/docs",
                    "result": "The page lists GET / and lets you send a request to it.",
                    "title": "Opening the generated API docs",
                    "description": [
                        "While the development server is running, open /docs on its local address."
                    ]
                }
            ],
            "bullets": [
                "FastAPI builds an interactive page from the application routes and their type annotations.",
                "The OpenAPI schema describes those operations in a format other tools can read."
            ]
        }
    ],
    "exampleLayout": "grouped"
};

export default note;
