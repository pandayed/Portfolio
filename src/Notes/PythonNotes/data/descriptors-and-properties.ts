import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "descriptors-and-properties",
    "title": "Descriptors and properties",
    "summary": "See how __get__, __set__, and __delete__ manage attribute access and how @property uses the same protocol.",
    "updatedOn": "2026-10-01",
    "sections": [
        {
            "id": "descriptor-protocol",
            "title": "The descriptor protocol",
            "bullets": [
                "A descriptor is an object stored as a class attribute that defines `__get__`, `__set__`, or `__delete__`.",
                "Python calls these methods when code reads, assigns, or deletes the managed attribute.",
                "This lets one reusable object control attribute access for many instances.",
                "`__get__(self, instance, owner)` runs for a read such as `person.age`. instance is the object; owner is its class.",
                "A class-level read passes `None` as instance.",
                "`__set__(self, instance, value)` runs for an assignment such as `person.age` = 20.",
                "`__delete__(self, instance)` runs for del `person.age`."
            ]
        },
        {
            "id": "custom-descriptor",
            "title": "A descriptor that stores a value",
            "examples": [
                {
                    "code": "class Age:\n    def __get__(self, instance, owner):\n        if instance is None:\n            return self\n        return instance.__dict__[\"_age\"]\n\n    def __set__(self, instance, value):\n        if value < 0:\n            raise ValueError(\"age must be nonnegative\")\n        instance.__dict__[\"_age\"] = value\n\n    def __delete__(self, instance):\n        del instance.__dict__[\"_age\"]\n\n\nclass Person:\n    age = Age()\n\n\nperson = Person()\nperson.age = 20\nprint(person.age)\ndel person.age\nprint(\"_age\" in person.__dict__)",
                    "result": "The lines are 20 and False. Person.age holds the descriptor. The actual age is stored in each person instance under _age, so different Person objects do not share one age.",
                    "title": "Managing age with a descriptor",
                    "description": [
                        "The `Age` descriptor validates assignments and stores each value on its `Person` instance."
                    ]
                }
            ],
            "bullets": [
                "Because `Age` defines `__set__` and `__delete__`, it is a data descriptor.",
                "It takes priority over an instance attribute with the same public name.",
                "A descriptor with only `__get__` is a non-data descriptor; an instance attribute with that name takes priority over it.",
                "Ordinary methods are non-data descriptors."
            ]
        },
        {
            "id": "property",
            "title": "@property uses descriptors",
            "examples": [
                {
                    "code": "class Person:\n    def __init__(self, age):\n        self.age = age\n\n    @property\n    def age(self):\n        return self._age\n\n    @age.setter\n    def age(self, value):\n        if value < 0:\n            raise ValueError(\"age must be nonnegative\")\n        self._age = value\n\n    @age.deleter\n    def age(self):\n        del self._age\n\n\nperson = Person(20)\nprint(person.age)\nperson.age = 21\nprint(person.age)\ndel person.age",
                    "result": "The two print calls show 20 and 21. The getter runs on reads, the setter runs in __init__ and on reassignment, and the deleter removes the stored value.",
                    "title": "Managing age with a property",
                    "description": [
                        "The property uses getter, setter, and deleter methods to manage the instance’s age."
                    ]
                }
            ],
            "bullets": [
                "`@property` creates a descriptor from getter, setter, and optional deleter methods.",
                "It is usually the simpler choice when one class needs a managed attribute.",
                "Build a custom descriptor when the same rule must be reused across several attributes or classes."
            ]
        }
    ],
    "exampleLayout": "grouped"
};

export default note;
