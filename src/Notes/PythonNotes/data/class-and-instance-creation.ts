import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'class-and-instance-creation',
    title: 'Creating classes and instances',
    summary: 'Understand metaclasses, then see the different jobs of __new__ and __init__ when making an instance.',
    updatedOn: '2026-10-15',
    exampleLayout: 'grouped',
    sections: [
        {
            id: 'metaclass',
            title: 'A metaclass creates a class',
            paragraphs: ['A class is itself an object. Its metaclass controls how that class object is created. Python normally uses type. In class MyClass(metaclass=MyMeta), MyMeta creates MyClass when Python executes the class definition; calling MyClass() later creates an ordinary instance of MyClass.'],
            examples: [{
                title: 'Observe a metaclass creating a class',
                code: [
                    'class MyMeta(type):',
                    '    def __new__(mcls, name, bases, namespace):',
                    '        print(f"creating {name}")',
                    '        return super().__new__(mcls, name, bases, namespace)',
                    '',
                    '',
                    'class MyClass(metaclass=MyMeta):',
                    '    pass',
                    '',
                    '',
                    'print(type(MyClass).__name__)',
                ].join('\n'),
                result: 'creating MyClass\nMyMeta',
            }],
            bullets: ['A custom metaclass can enforce rules on class definitions or register classes as they are defined. It affects class creation across a hierarchy.', 'Use an ordinary class, class decorator, or __init_subclass__ for simpler class customization. Custom metaclasses are mainly useful when a framework needs to control class creation.'],
        },
        {
            id: 'new-init',
            title: '__new__ creates an instance; __init__ initializes it',
            paragraphs: ['When you call a class, __new__ receives the class and creates or chooses the instance. If it returns an instance of that class, Python then calls __init__ on that instance with the constructor arguments. __init__ sets initial state and must return None.'],
            examples: [{
                title: 'Observe instance creation before initialization',
                code: [
                    'class A:',
                    '    def __new__(cls):',
                    '        print("new")',
                    '        return super().__new__(cls)',
                    '',
                    '    def __init__(self):',
                    '        print("init")',
                    '',
                    '',
                    'a = A()',
                ].join('\n'),
                result: 'new\ninit',
                explanation: ['__new__ returns an A instance, so Python calls __init__ afterward.'],
            }],
            bullets: ['If __new__ returns an object that is not an instance of A, Python does not call A.__init__ on it.', 'Most classes need only __init__. Override __new__ when creation itself must change, such as when subclassing an immutable built-in type.'],
        },
    ],
};

export default note;
