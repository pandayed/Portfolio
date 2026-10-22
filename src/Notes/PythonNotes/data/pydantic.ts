import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "pydantic",
    "title": "Pydantic models",
    "summary": "Define data fields, validate input, read errors, and turn a model into a dictionary.",
    "updatedOn": "2026-09-30",
    "sections": [
        {
            "id": "model-fields",
            "title": "Defining a model with fields",
            "examples": [
                {
                    "title": "Creating and reading a model",
                    "code": "from pydantic import BaseModel\n\nclass Item(BaseModel):\n    name: str\n    price: float\n\nitem = Item(name=\"Notebook\", price=4.5)\nprint(item.name)   # Notebook\nprint(item.price)  # 4.5",
                    "result": "item is an Item instance. Its name is a string and its price is a float."
                }
            ],
            "bullets": [
                "Pydantic is a Python library for validating data.",
                "A model is a class that inherits from `BaseModel`.",
                "Its annotated attributes describe the fields and the values each field accepts.",
                "You can use a Pydantic model in ordinary Python code without FastAPI."
            ]
        },
        {
            "id": "validation-and-conversion",
            "title": "Validating and converting input",
            "examples": [
                {
                    "title": "Building a model from a dictionary",
                    "code": "from pydantic import BaseModel\n\nclass Item(BaseModel):\n    name: str\n    price: float\n\nraw = {\"name\": \"Notebook\", \"price\": \"4.50\"}\nitem = Item.model_validate(raw)\nprint(item.price)        # 4.5\nprint(type(item.price))  # <class 'float'>",
                    "result": "model_validate accepts the dictionary and returns an Item. The original price string becomes a float in the model."
                }
            ],
            "bullets": [
                "Creating a model validates the supplied values.",
                "Pydantic can convert compatible input, such as a numeric string to a `float`.",
                "An annotation alone does not validate an ordinary Python variable.",
                "Validation happens when Pydantic creates or validates a model."
            ]
        },
        {
            "id": "required-default-null",
            "title": "Required fields, defaults, and None",
            "examples": [
                {
                    "code": "from pydantic import BaseModel\n\nclass Item(BaseModel):\n    name: str                 # required\n    note: str | None           # required; may be None\n    description: str | None = None  # may be omitted\n\nitem = Item(name=\"Notebook\", note=None)\nprint(item.note)         # None\nprint(item.description)  # None",
                    "result": "Omitting name or note raises ValidationError. Omitting description uses its default None.",
                    "title": "Required fields, defaults, and None"
                }
            ],
            "bullets": [
                "A field with no default is required.",
                "A default lets you omit that field.",
                "The type `str` | `None` allows a string or `None`, but the field is still required if it has no default.",
                "Add = `None` when you want to leave it out."
            ]
        },
        {
            "id": "nested-models",
            "title": "Using models inside models",
            "examples": [
                {
                    "code": "from pydantic import BaseModel\n\nclass Address(BaseModel):\n    city: str\n\nclass User(BaseModel):\n    name: str\n    address: Address\n\nuser = User.model_validate({\"name\": \"Asha\", \"address\": {\"city\": \"Delhi\"}})\nprint(user.address.city)  # Delhi\nprint(type(user.address).__name__)  # Address",
                    "result": "The address dictionary becomes an Address instance inside User.",
                    "title": "Using models inside models"
                }
            ],
            "bullets": [
                "A field can use another Pydantic model as its type.",
                "Pydantic validates the nested dictionary and creates a nested model instance."
            ]
        },
        {
            "id": "validation-errors",
            "title": "Reading a validation error",
            "examples": [
                {
                    "code": "from pydantic import BaseModel, ValidationError\n\nclass Item(BaseModel):\n    quantity: int\n\ntry:\n    Item.model_validate({\"quantity\": \"many\"})\nexcept ValidationError as error:\n    first = error.errors()[0]\n    print(first[\"loc\"])   # ('quantity',)\n    print(first[\"type\"])  # int_parsing",
                    "result": "The quantity field cannot be parsed as an integer. No Item instance is returned.",
                    "title": "Reading a validation error"
                }
            ],
            "bullets": [
                "Pydantic raises `ValidationError` when an input cannot produce a valid model.",
                "Each error identifies a field and a problem.",
                "Catch the error when your program needs to handle invalid input."
            ]
        },
        {
            "id": "model-dump",
            "title": "Getting a dictionary from a model",
            "examples": [
                {
                    "code": "from pydantic import BaseModel\n\nclass Item(BaseModel):\n    name: str\n    price: float\n\nitem = Item(name=\"Notebook\", price=4.5)\nprint(item.model_dump())  # {'name': 'Notebook', 'price': 4.5}",
                    "result": "model_dump() returns a dict. The displayed single quotes are Python dict syntax, not JSON.",
                    "title": "Getting a dictionary from a model"
                }
            ],
            "bullets": [
                "`model_dump`() returns a Python dictionary.",
                "Nested models become nested dictionaries.",
                "Use model_dump_json() when you need a JSON string instead."
            ]
        },
        {
            "id": "fastapi-connection",
            "title": "How FastAPI uses a model",
            "bullets": [
                "FastAPI uses a Pydantic model parameter to describe a JSON request body.",
                "It reads and validates the body before calling the endpoint.",
                "The endpoint receives a model instance, so its fields are available as attributes."
            ]
        },
        {
            "id": "references",
            "title": "References",
            "bullets": [
                [
                    "For the HTTP request example, read ",
                    {
                        "text": "Request bodies with Pydantic",
                        "href": "#/notes/python/fastapi-request-bodies"
                    },
                    ". For the full Pydantic API, read the ",
                    {
                        "text": "official Pydantic model documentation",
                        "href": "https://pydantic.dev/docs/validation/latest/concepts/models/"
                    },
                    "."
                ]
            ]
        }
    ],
    "exampleLayout": "grouped"
};

export default note;
