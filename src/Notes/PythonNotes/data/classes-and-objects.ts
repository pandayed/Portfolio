import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "classes-and-objects",
    "title": "Classes and objects",
    "summary": "Create instances, initialize state, and separate instance attributes from shared class attributes.",
    "updatedOn": "2026-10-15",
    "exampleLayout": "grouped",
    "sections": [
        {
            "id": "class-object",
            "title": "Classes and instances",
            "bullets": [
                "A class defines a kind of object. Calling the class creates an instance.",
                "An attribute is a name accessed with a dot, such as person.name. A method is a function attached to a class."
            ],
            "examples": [
                {
                    "title": "Creating two independent instances",
                    "description": [
                        "Each call creates a new Person object."
                    ],
                    "code": "class Person:\n    pass\n\nfirst = Person()\nsecond = Person()\nfirst.name = \"Mia\"\nsecond.name = \"Leo\"\nprint(first.name, second.name)\nprint(first is second)",
                    "result": "Mia Leo\nFalse"
                }
            ]
        },
        {
            "id": "init-self",
            "title": "Initializing state with __init__",
            "bullets": [
                "Python calls __init__ after creating the instance. Its arguments supply the initial state.",
                "self refers to the instance receiving the method call. Python passes it automatically in person.introduce().",
                "__init__ initializes an object. It must not return a value other than None."
            ],
            "examples": [
                {
                    "title": "Initializing and using a Person",
                    "description": [
                        "Keep the attributes needed by a method in the same class definition."
                    ],
                    "code": "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def introduce(self):\n        return f\"Hi, I am {self.name}\"\n\nperson = Person(\"Mia\", 20)\nprint(person.name, person.age)\nprint(person.introduce())",
                    "result": "Mia 20\nHi, I am Mia",
                    "explanation": [
                        "self.name stores state on this instance. Each Person can have a different name and age."
                    ]
                }
            ]
        },
        {
            "id": "class-instance-attributes",
            "title": "Class and instance attributes",
            "bullets": [
                "A class attribute is stored on the class. Instances can read it when they do not have an attribute with the same name.",
                "An instance attribute belongs to one instance. Assigning person.species creates an instance attribute; it does not change Person.species.",
                "Put per-instance mutable data, such as lists and dictionaries, inside __init__. A mutable class attribute is shared by instances."
            ],
            "examples": [
                {
                    "title": "Keeping separate lists for separate people",
                    "description": [
                        "Use a class attribute for a shared default and an instance attribute for each person’s skills."
                    ],
                    "code": "class Person:\n    species = \"Human\"\n\n    def __init__(self, name):\n        self.name = name\n        self.skills = []\n\nfirst = Person(\"Mia\")\nsecond = Person(\"Leo\")\nfirst.skills.append(\"Python\")\nfirst.species = \"Custom label\"\nprint(first.skills, second.skills)\nprint(first.species, second.species, Person.species)",
                    "result": "['Python'] []\nCustom label Human Human"
                }
            ]
        },
        {
            "id": "deletion-access",
            "title": "Attribute deletion and access conventions",
            "bullets": [
                "del object.attribute removes an attribute. Later access raises AttributeError unless lookup finds another value on the class or its bases.",
                "del person removes the name binding. It does not directly destroy the object. Other references can still keep it alive.",
                "A leading underscore marks a non-public name by convention. A double leading underscore triggers name mangling to reduce accidental clashes in subclasses. It is not access control."
            ],
            "examples": [
                {
                    "title": "Removing an instance override",
                    "description": [
                        "Deleting the override makes the class value visible again."
                    ],
                    "code": "class Person:\n    species = \"Human\"\n\nperson = Person()\nperson.species = \"Custom label\"\ndel person.species\nprint(person.species)",
                    "result": "Human"
                }
            ],
            "paragraphs": [
                [
                    "Continue with ",
                    {
                        "text": "Methods and attribute lookup",
                        "href": "#/notes/python/methods-and-attributes"
                    },
                    ". Reference: ",
                    {
                        "text": "Python tutorial: classes",
                        "href": "https://docs.python.org/3/tutorial/classes.html"
                    },
                    "."
                ]
            ]
        }
    ]
};

export default note;
