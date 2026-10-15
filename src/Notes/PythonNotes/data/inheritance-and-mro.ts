import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'inheritance-and-mro',
    title: 'Inheritance and method resolution order',
    summary: 'Find the order Python searches for inherited methods, including a diamond of multiple inheritance.',
    updatedOn: '2026-10-15',
    exampleLayout: 'grouped',
    sections: [
        {
            id: 'inheritance',
            title: 'Inherit and override a method',
            bullets: [
                'class Child(Parent) defines Child as a subclass of Parent. It can use methods inherited from Parent.',
                'Define a method with the same name to override inherited behavior.',
                'Use super() to call the next implementation in the inheritance order. This lets a subclass extend inherited behavior.',
            ],
            examples: [{
                title: 'Extend a greeting from a parent class',
                description: ['Initialize the shared name in Person, then extend its greeting in Student.'],
                code: 'class Person:\n    def __init__(self, name):\n        self.name = name\n\n    def greet(self):\n        return f"Hello, {self.name}"\n\nclass Student(Person):\n    def greet(self):\n        return super().greet() + " (student)"\n\nstudent = Student("Ada")\nprint(student.greet())\nprint(isinstance(student, Person))',
                result: 'Hello, Ada (student)\nTrue',
                explanation: ['Student inherits __init__ and overrides greet. A Student instance is also an instance of Person.'],
            }],
        },
        {
            id: 'what-mro-means',
            title: 'What MRO means',
            paragraphs: ['Method resolution order (MRO) is the ordered list of classes Python uses when it looks up an inherited method or attribute. The class itself comes first. The list includes each ancestor once and ends at object. Python uses the C3 rule to preserve the stated order of direct bases and to keep shared ancestors after their subclasses.'],
            bullets: ['Read Class.__mro__ or call Class.mro() to inspect the actual order.', 'super() continues through the MRO after the current class. In multiple inheritance, that next class need not be a direct parent of the current class.'],
        },
        {
            id: 'diamond-example',
            title: 'The D(B, C) example',
            examples: [{
                title: 'Inspect the inheritance order of a diamond',
                code: [
                    'class A:',
                    '    pass',
                    '',
                    'class B(A):',
                    '    pass',
                    '',
                    'class C(A):',
                    '    pass',
                    '',
                    'class D(B, C):',
                    '    pass',
                    '',
                    '',
                    'print([cls.__name__ for cls in D.__mro__])',
                ].join('\n'),
                result: "['D', 'B', 'C', 'A', 'object']",
                explanation: ['Python checks D, B, C, their shared ancestor A, then object.'],
            }],
            paragraphs: ['A comes after C even though B inherits from A. Searching A before C would skip a possible method on C. If B and C specify incompatible base orders, Python raises TypeError when it creates the class.'],
        },
    ],
};

export default note;
