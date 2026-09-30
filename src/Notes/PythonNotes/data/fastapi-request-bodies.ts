import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'fastapi-request-bodies',
    title: 'Request bodies with Pydantic',
    summary: 'Describe JSON input with a Pydantic model and let FastAPI parse and validate it.',
    updatedOn: '2026-09-30',
    sections: [
        {
            id: 'model-shape',
            title: 'Describe the expected JSON',
            paragraphs: [
                'A request body carries data from a client to an API. For JSON input, define a Pydantic model with the fields the endpoint accepts. FastAPI reads the JSON body, validates it, and gives the function a model instance.',
            ],
            examples: [{
                title: 'A create-item request',
                code: [
                    'from fastapi import FastAPI',
                    'from pydantic import BaseModel',
                    '',
                    'app = FastAPI()',
                    '',
                    'class ItemInput(BaseModel):',
                    '    name: str',
                    '    price: float',
                    '    description: str | None = None',
                    '',
                    '@app.post("/items/")',
                    'async def create_item(item: ItemInput):',
                    '    return {"name": item.name, "price": item.price}',
                ].join('\n'),
                result: 'A JSON body with name and price creates an ItemInput. description may be omitted.',
            }],
        },
        {
            id: 'input-validation',
            title: 'Validation happens before the function runs',
            paragraphs: [
                'Pydantic checks the incoming data against the model fields. It converts compatible values to the declared types and reports values it cannot accept. If the body is invalid, FastAPI returns a validation response without running the path operation function.',
            ],
            examples: [{
                title: 'JSON body',
                code: '{"name": "Notebook", "price": "4.50"}',
                result: 'price is converted to the number 4.5. The function receives item.price as a float.',
            }],
        },
        {
            id: 'path-query-body',
            title: 'Combine path, query, and body values',
            paragraphs: [
                'One operation can receive values from several places. FastAPI uses the route name for path values, a Pydantic model for the JSON body, and a simple value outside the route for a query parameter.',
            ],
            examples: [{
                code: [
                    '@app.put("/items/{item_id}")',
                    'async def update_item(item_id: int, item: ItemInput, notify: bool = False):',
                    '    return {',
                    '        "item_id": item_id,',
                    '        "name": item.name,',
                    '        "notify": notify,',
                    '    }',
                ].join('\n'),
                result: 'PUT /items/42?notify=true reads 42 from the path, true from the query, and the item fields from the JSON body.',
            }],
        },
    ],
};

export default note;
