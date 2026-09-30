import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'fastapi-routers',
    title: 'Split an application with APIRouter',
    summary: 'Group related path operations in separate modules and include them in the main app.',
    updatedOn: '2026-09-30',
    sections: [
        {
            id: 'why-routers',
            title: 'Group related operations',
            paragraphs: [
                'A small example can keep its routes in main.py. As an API grows, place related path operations in separate Python modules. APIRouter lets each module declare routes that become part of the main FastAPI application.',
            ],
            examples: [{
                title: 'app/routers/items.py',
                code: [
                    'from fastapi import APIRouter',
                    '',
                    'router = APIRouter(prefix="/items", tags=["items"])',
                    '',
                    '@router.get("/")',
                    'async def read_items():',
                    '    return []',
                    '',
                    '@router.get("/{item_id}")',
                    'async def read_item(item_id: int):',
                    '    return {"item_id": item_id}',
                ].join('\n'),
                result: 'The router declares GET /items/ and GET /items/{item_id}.',
            }],
        },
        {
            id: 'include-router',
            title: 'Include the router in the application',
            paragraphs: [
                'Import the router module and pass its router to app.include_router(). FastAPI adds those operations to the application and its OpenAPI documentation.',
            ],
            examples: [{
                title: 'app/main.py',
                code: [
                    'from fastapi import FastAPI',
                    'from app.routers import items',
                    '',
                    'app = FastAPI()',
                    'app.include_router(items.router)',
                ].join('\n'),
                result: 'The item routes are available through the main application.',
            }],
        },
        {
            id: 'project-shape',
            title: 'A small project layout',
            examples: [{
                language: 'text',
                code: [
                    'app/',
                    '    __init__.py',
                    '    main.py',
                    '    routers/',
                    '        __init__.py',
                    '        items.py',
                    '        users.py',
                ].join('\n'),
                result: 'main.py creates the app and includes routers. Each router module owns a related group of operations.',
            }],
            bullets: [
                'Use a prefix to give every path in a router a shared beginning.',
                'Use tags to group related operations in the generated API docs.',
                'Add dependencies to a router when every operation in that group needs the same request check.',
            ],
        },
    ],
};

export default note;
