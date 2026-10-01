import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'methods-and-attributes',
    title: 'Methods and attribute lookup',
    summary: 'Choose instance, class, or static methods, and see how instance attributes can hide class attributes.',
    updatedOn: '2026-10-01',
    sections: [
        {
            id: 'method-kinds',
            title: 'Instance, class, and static methods',
            bullets: [
                'An instance method receives the instance as self. Use it when the method reads or changes that instance.',
                'A @classmethod receives the class as cls. Use it for an alternative constructor or behavior that needs the class. Calling it on a subclass passes that subclass as cls.',
                'A @staticmethod receives neither self nor cls automatically. Use it for a helper that belongs near the class but needs no instance or class state. A module-level function is also reasonable for a general helper.',
            ],
            examples: [{
                code: [
                    'class User:',
                    '    def __init__(self, name):',
                    '        self.name = name',
                    '',
                    '    def greeting(self):',
                    '        return f"Hello, {self.name}"',
                    '',
                    '    @classmethod',
                    '    def from_uppercase(cls, text):',
                    '        return cls(text.title())',
                    '',
                    '    @staticmethod',
                    '    def valid_name(text):',
                    '        return bool(text.strip())',
                    '',
                    '',
                    'user = User.from_uppercase("MIA")',
                    'print(user.greeting())',
                    'print(User.valid_name("  "))',
                ].join('\n'),
                result: 'First line: Hello, Mia. Second line: False. from_uppercase creates a User; greeting reads that instance; valid_name uses neither self nor cls.',
            }],
        },
        {
            id: 'attribute-lookup',
            title: 'Class attributes and instance attributes',
            paragraphs: ['For an ordinary attribute, a.x checks the instance first, then the class and its base classes. Assigning a.x creates or changes an instance attribute. It does not change A.x. Descriptors can change this usual lookup order; see the descriptors page.'],
            examples: [{
                code: [
                    'class A:',
                    '    x = 10',
                    '',
                    '',
                    'a = A()',
                    'print(a.x)',
                    'a.x = 20',
                    'print(a.x)',
                    'print(A.x)',
                ].join('\n'),
                result: 'With the intended line breaks, the three lines are 10, 20, and 10. The pasted run-together snippet is not valid Python. The assignment creates a.x on a; A.x remains 10.',
            }],
            bullets: ['Another A instance still reads A.x as 10. del a.x would remove the instance attribute, so a.x would read 10 again.', [
                'For managed attributes such as @property, read ',
                { text: 'Descriptors and properties', href: '#/notes/python/descriptors-and-properties' },
                '.',
            ]],
        },
    ],
};

export default note;
