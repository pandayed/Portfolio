import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'fastapi-first-app',
    title: 'A first FastAPI application',
    summary: 'Install FastAPI, declare an HTTP operation, and run the development server.',
    updatedOn: '2026-09-30',
    sections: [
        {
            id: 'install-and-run',
            title: 'Install and run the application',
            paragraphs: [
                [
                    'FastAPI is a Python framework for building HTTP APIs. It uses Python type annotations to describe request data and create API documentation. FastAPI is built on ',
                    { text: 'Starlette', href: 'https://www.starlette.io/' },
                    ' for web handling and ',
                    { text: 'Pydantic', href: '#/notes/python/pydantic' },
                    ' for data validation.',
                ],
                'The commands below use uv to manage a project and its packages. Run them in a new project folder. The development command starts a local server and watches files for changes.',
            ],
            examples: [{
                title: 'Create a project and install FastAPI',
                language: 'text',
                code: [
                    'uv init fastapi-notes --bare',
                    'cd fastapi-notes',
                    'uv add "fastapi[standard]"',
                ].join('\n'),
                result: 'uv records FastAPI and its dependencies in the project files.',
            }, {
                title: 'Start the development server',
                language: 'text',
                code: 'uv run fastapi dev main.py',
                result: 'The server prints a local address, usually http://127.0.0.1:8000.',
            }],
        },
        {
            id: 'first-operation',
            title: 'Declare a path operation',
            paragraphs: [
                'Create main.py and define a FastAPI app. The decorator connects an HTTP method and URL path to a Python function. FastAPI calls that function when a matching request arrives.',
            ],
            examples: [{
                title: 'main.py',
                code: [
                    'from fastapi import FastAPI',
                    '',
                    'app = FastAPI()',
                    '',
                    '@app.get("/")',
                    'async def read_root():',
                    '    return {"message": "Hello, API"}',
                ].join('\n'),
                result: 'GET / returns the JSON object {"message":"Hello, API"}.',
            }],
            bullets: [
                'The URL path is /.',
                'The HTTP method is GET.',
                'The function is a path operation function. FastAPI calls it for a matching request.',
                'Returning a Python dictionary produces a JSON response.',
            ],
        },
        {
            id: 'automatic-docs',
            title: 'Open the generated API docs',
            paragraphs: [
                'While the development server is running, open /docs on its local address. FastAPI builds an interactive page from the application routes and their type annotations. The OpenAPI schema describes those operations in a format other tools can read.',
            ],
            examples: [{
                language: 'text',
                code: 'http://127.0.0.1:8000/docs',
                result: 'The page lists GET / and lets you send a request to it.',
            }],
        },
    ],
};

export default note;
