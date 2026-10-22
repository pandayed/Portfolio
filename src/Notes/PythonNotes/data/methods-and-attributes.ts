import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "methods-and-attributes",
    "title": "Methods and attribute lookup",
    "summary": "Choose instance, class, or static methods, then follow attribute lookup.",
    "updatedOn": "2026-10-15",
    "exampleLayout": "grouped",
    "sections": [
        {
            "id": "method-kinds",
            "title": "Instance, class, and static methods",
            "bullets": [
                "An instance method receives the instance as `self`.",
                "Use it to read or change instance state.",
                "A `@classmethod` receives the class as `cls`.",
                "Use it for an alternative constructor or behavior that needs the class.",
                "Calling it on a subclass passes that subclass.",
                "A `@staticmethod` receives neither `self` nor `cls` automatically.",
                "Use it for a helper related to the class.",
                "A general helper can remain a module-level function."
            ],
            "examples": [
                {
                    "title": "Choosing the method receiver",
                    "description": [
                        "Create a user from text, then call a method that reads that user’s name."
                    ],
                    "code": "class User:\n    def __init__(self, name):\n        self.name = name\n\n    def greeting(self):\n        return f\"Hello, {self.name}\"\n\n    @classmethod\n    def from_text(cls, text):\n        return cls(text.strip().title())\n\n    @staticmethod\n    def valid_name(text):\n        return bool(text.strip())\n\nuser = User.from_text(\" MIA \")\nprint(user.greeting())\nprint(User.valid_name(\"  \"))",
                    "result": "Hello, Mia\nFalse",
                    "explanation": [
                        "`from_text` receives `User` as `cls` and returns a new instance. `greeting` receives that instance. `valid_name` uses only its explicit argument."
                    ]
                }
            ]
        },
        {
            "id": "attribute-lookup",
            "title": "Following ordinary attribute lookup",
            "bullets": [
                [
                    "Class and instance data are explained in ",
                    {
                        "text": "Classes and objects",
                        "href": "#/notes/python/classes-and-objects"
                    },
                    ". Managed lookup belongs in ",
                    {
                        "text": "Descriptors and properties",
                        "href": "#/notes/python/descriptors-and-properties"
                    },
                    "."
                ],
                "For an ordinary data attribute, Python checks the instance, then its class and base classes.",
                "An instance value can hide a class value.",
                "A method found on a class binds to the instance when accessed through that instance.",
                "This binding supplies `self`.",
                "Descriptors, including properties, can change attribute lookup and assignment behavior."
            ],
            "examples": [
                {
                    "title": "A bound method already has its instance",
                    "description": [
                        "The two calls pass the same instance to `greet`."
                    ],
                    "code": "class Greeter:\n    def __init__(self, name):\n        self.name = name\n\n    def greet(self):\n        return f\"Hello, {self.name}\"\n\nperson = Greeter(\"Mia\")\nprint(person.greet())\nprint(Greeter.greet(person))",
                    "result": "Hello, Mia\nHello, Mia"
                }
            ]
        },
        {
            "id": "references",
            "title": "References",
            "bullets": [
                [
                    {
                        "text": "Python tutorial: method objects",
                        "href": "https://docs.python.org/3/tutorial/classes.html#method-objects"
                    }
                ],
                [
                    {
                        "text": "built-in classmethod and staticmethod",
                        "href": "https://docs.python.org/3/library/functions.html#classmethod"
                    }
                ]
            ]
        }
    ]
};

export default note;
