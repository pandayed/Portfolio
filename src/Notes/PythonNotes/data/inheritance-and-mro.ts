import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'inheritance-and-mro',
    title: 'Inheritance and method resolution order',
    summary: 'Find the order Python searches for inherited methods, including a diamond of multiple inheritance.',
    updatedOn: '2026-10-01',
    sections: [
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
                result: "With the intended line breaks, this prints ['D', 'B', 'C', 'A', 'object']. The pasted run-together class definitions are invalid Python. Python checks D, then B, then C, then their shared parent A, then object.",
            }],
            paragraphs: ['A comes after C even though B inherits from A. Searching A before C would skip a possible method on C. If B and C specify incompatible base orders, Python raises TypeError when it creates the class.'],
        },
    ],
};

export default note;
