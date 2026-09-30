import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'classes-and-objects',
    title: 'Classes and objects',
    summary: 'Create instances, initialize state, define methods, and separate class data from instance data.',
    updatedOn: '2026-09-20',
    sections: [
        {
            id: 'class-object',
            title: 'Classes and instances',
            paragraphs: ['A class defines a kind of object. Calling the class creates an instance. Class attributes belong to the class; methods define behavior for its instances.'],
            examples: [{
                code: [
                    'class Person:',
                    '    species = "Human"',
                    '',
                    '    def introduce(self):',
                    '        print(f"Hi, I am {self.name}")  # Example: Hi, I am Ayushi',
                ].join('\n'),
            }],
        },
        {
            id: 'init-self',
            title: '__init__ and self',
            paragraphs: ['After Python creates an instance, it calls __init__ to initialize it. self is the instance passed to an instance method.'],
            examples: [{
                code: [
                    'class Person:',
                    '    def __init__(self, name, age):',
                    '        self.name = name',
                    '        self.age = age',
                    '',
                    '    def introduce(self):',
                    '        print(f"Hi, I am {self.name}")  # Example: Hi, I am Ayushi',
                    '',
                    '',
                    'person = Person("Ayushi", 20)',
                    'person.introduce()',
                ].join('\n'),
            }],
            bullets: ['Python calls __init__ after creating an instance. It initializes the instance. Most classes only need __init__.'],
        },
        {
            id: 'class-instance-attributes',
            title: 'Class and instance attributes',
            paragraphs: ['A class attribute is stored on the class and shared through normal lookup. An instance attribute is stored on one instance.'],
            examples: [{
                code: [
                    'class Person:',
                    '    species = "Human"',
                    '',
                    '    def __init__(self, age, color):',
                    '        self.age = age',
                    '        self.color = color',
                    '',
                    '',
                    'first = Person(20, "brown")',
                    'second = Person(21, "brown")',
                    'print(first.species, second.age)  # Human 21',
                    'print(Person.species)  # Human',
                ].join('\n'),
            }],
            bullets: ['Instances read the same mutable class attribute unless an instance shadows it. Define per-instance lists and dictionaries inside __init__.'],
        },
        {
            id: 'deletion-access',
            title: 'Deletion and access conventions',
            examples: [{
                code: [
                    'person = Person(20, "brown")',
                    'del person.age',
                    'del person',
                ].join('\n'),
            }],
            bullets: [
                'Python does not make class members private by default. A leading underscore marks a non-public name by convention. A double leading underscore triggers name mangling, not access control.',
                'del person removes that name binding. The object is destroyed only when no references keep it alive.',
            ],
        },
    ],
};

export default note;
