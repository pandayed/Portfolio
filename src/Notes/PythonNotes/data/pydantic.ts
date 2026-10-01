import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'pydantic',
    title: 'Pydantic models',
    summary: 'Define data fields, validate input, read errors, and turn a model into a dictionary.',
    updatedOn: '2026-09-30',
    sections: [
        {
            id: 'model-fields',
            title: 'Define a model with fields',
            paragraphs: [
                'Pydantic is a Python library for validating data. A model is a class that inherits from BaseModel. Its annotated attributes describe the fields and the values each field accepts. You can use a Pydantic model in ordinary Python code without FastAPI.',
            ],
            examples: [{
                title: 'Create and read a model',
                code: [
                    'from pydantic import BaseModel',
                    '',
                    'class Item(BaseModel):',
                    '    name: str',
                    '    price: float',
                    '',
                    'item = Item(name="Notebook", price=4.5)',
                    'print(item.name)   # Notebook',
                    'print(item.price)  # 4.5',
                ].join('\n'),
                result: 'item is an Item instance. Its name is a string and its price is a float.',
            }],
        },
        {
            id: 'validation-and-conversion',
            title: 'Validate and convert input',
            paragraphs: [
                'Creating a model validates the supplied values. Pydantic can convert compatible input, such as a numeric string to a float. An annotation alone does not validate an ordinary Python variable. Validation happens when Pydantic creates or validates a model.',
            ],
            examples: [{
                title: 'Build a model from a dictionary',
                code: [
                    'from pydantic import BaseModel',
                    '',
                    'class Item(BaseModel):',
                    '    name: str',
                    '    price: float',
                    '',
                    'raw = {"name": "Notebook", "price": "4.50"}',
                    'item = Item.model_validate(raw)',
                    'print(item.price)        # 4.5',
                    'print(type(item.price))  # <class \'float\'>',
                ].join('\n'),
                result: 'model_validate accepts the dictionary and returns an Item. The original price string becomes a float in the model.',
            }],
        },
        {
            id: 'required-default-null',
            title: 'Required fields, defaults, and None',
            paragraphs: [
                'A field with no default is required. A default lets you omit that field. The type str | None allows a string or None, but the field is still required if it has no default. Add = None when you want to leave it out.',
            ],
            examples: [{
                code: [
                    'from pydantic import BaseModel',
                    '',
                    'class Item(BaseModel):',
                    '    name: str                 # required',
                    '    note: str | None           # required; may be None',
                    '    description: str | None = None  # may be omitted',
                    '',
                    'item = Item(name="Notebook", note=None)',
                    'print(item.note)         # None',
                    'print(item.description)  # None',
                ].join('\n'),
                result: 'Omitting name or note raises ValidationError. Omitting description uses its default None.',
            }],
        },
        {
            id: 'nested-models',
            title: 'Use models inside models',
            paragraphs: [
                'A field can use another Pydantic model as its type. Pydantic validates the nested dictionary and creates a nested model instance.',
            ],
            examples: [{
                code: [
                    'from pydantic import BaseModel',
                    '',
                    'class Address(BaseModel):',
                    '    city: str',
                    '',
                    'class User(BaseModel):',
                    '    name: str',
                    '    address: Address',
                    '',
                    'user = User.model_validate({"name": "Asha", "address": {"city": "Delhi"}})',
                    'print(user.address.city)  # Delhi',
                    'print(type(user.address).__name__)  # Address',
                ].join('\n'),
                result: 'The address dictionary becomes an Address instance inside User.',
            }],
        },
        {
            id: 'validation-errors',
            title: 'Read a validation error',
            paragraphs: [
                'Pydantic raises ValidationError when an input cannot produce a valid model. Each error identifies a field and a problem. Catch the error when your program needs to handle invalid input.',
            ],
            examples: [{
                code: [
                    'from pydantic import BaseModel, ValidationError',
                    '',
                    'class Item(BaseModel):',
                    '    quantity: int',
                    '',
                    'try:',
                    '    Item.model_validate({"quantity": "many"})',
                    'except ValidationError as error:',
                    '    first = error.errors()[0]',
                    '    print(first["loc"])   # (\'quantity\',)',
                    '    print(first["type"])  # int_parsing',
                ].join('\n'),
                result: 'The quantity field cannot be parsed as an integer. No Item instance is returned.',
            }],
        },
        {
            id: 'model-dump',
            title: 'Get a dictionary from a model',
            paragraphs: [
                'model_dump() returns a Python dictionary. Nested models become nested dictionaries. Use model_dump_json() when you need a JSON string instead.',
            ],
            examples: [{
                code: [
                    'from pydantic import BaseModel',
                    '',
                    'class Item(BaseModel):',
                    '    name: str',
                    '    price: float',
                    '',
                    'item = Item(name="Notebook", price=4.5)',
                    'print(item.model_dump())  # {\'name\': \'Notebook\', \'price\': 4.5}',
                ].join('\n'),
                result: 'model_dump() returns a dict. The displayed single quotes are Python dict syntax, not JSON.',
            }],
        },
        {
            id: 'fastapi-connection',
            title: 'How FastAPI uses a model',
            paragraphs: [
                'FastAPI uses a Pydantic model parameter to describe a JSON request body. It reads and validates the body before calling the endpoint. The endpoint receives a model instance, so its fields are available as attributes.',
                [
                    'For the HTTP request example, read ',
                    { text: 'Request bodies with Pydantic', href: '#/notes/python/fastapi-request-bodies' },
                    '. For the full Pydantic API, read the ',
                    { text: 'official Pydantic model documentation', href: 'https://pydantic.dev/docs/validation/latest/concepts/models/' },
                    '.',
                ],
            ],
        },
    ],
};

export default note;
