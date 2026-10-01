import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'functions-and-scope',
    title: 'Functions and scope',
    summary: 'Define functions, pass arguments, and understand defaults, scope, closures, and decorators.',
    updatedOn: '2026-10-01',
    sections: [
        {
            id: 'define-return',
            title: 'Define and return',
            examples: [{
                code: [
                    'def say_name():',
                    '    print("Lal Bihari Pandey")  # Lal Bihari Pandey',
                    '',
                    '',
                    'def full_name(first, last):',
                    '    return first + " " + last',
                    '',
                    '',
                    'print(say_name())  # First Lal Bihari Pandey, then None',
                    'print(full_name("Lal", "Pandey"))  # Lal Pandey',
                ].join('\n'),
            }],
            bullets: [
                'A function returns None when execution reaches the end without a return value.',
                'A return statement ends the current function call.',
                'Returning comma-separated values creates a tuple.',
                'Style tools expect two blank lines around top-level function definitions.',
            ],
        },
        {
            id: 'parameters-vs-arguments',
            title: 'Parameters versus arguments',
            paragraphs: [
                'A parameter is a name in a function definition. An argument is a value supplied when the function is called. During the call, Python binds each argument to a parameter.',
            ],
            examples: [{
                code: [
                    'def greet(name):  # name is a parameter',
                    '    return f"Hello, {name}"',
                    '',
                    'print(greet("Ava"))  # "Ava" is an argument',
                ].join('\n'),
                result: 'Hello, Ava',
            }],
        },
        {
            id: 'arguments',
            title: 'Positional, keyword, and default arguments',
            examples: [{
                code: [
                    'def name(first, last="Pandey"):',
                    '    return f"{first} {last}"',
                    '',
                    'print(name("Lal"))  # Lal Pandey',
                    'print(name(last="George", first="Ayushi"))  # Ayushi George',
                ].join('\n'),
            }],
            bullets: [
                'A positional argument is matched by position. A keyword argument names its parameter.',
                'A default supplies a value when the caller omits that argument.',
            ],
            exceptions: ['A parameter with a default must follow required positional parameters.'],
        },
        {
            id: 'args-kwargs',
            title: 'Variable arguments: *args and **kwargs',
            examples: [{
                code: [
                    'def add(*numbers):',
                    '    return sum(numbers)',
                    '',
                    '',
                    'def print_name(**parts):',
                    '    print(parts["first"], parts["last"])  # Lal Pandey (for the call below)',
                    '',
                    '',
                    'print(add(1, 2, 3, 4))  # 10',
                    'print_name(first="Lal", last="Pandey")  # Lal Pandey',
                ].join('\n'),
            }, {
                title: 'Forward arguments to another function',
                code: [
                    'def describe(first, second, *, punctuation="!"):',
                    '    return f"{first} {second}{punctuation}"',
                    '',
                    'def forward(*args, **kwargs):',
                    '    return describe(*args, **kwargs)',
                    '',
                    'print(forward("Hello", "Ava", punctuation="."))',
                ].join('\n'),
                result: 'Hello Ava.',
            }],
            paragraphs: [
                'Use *args when a function accepts any number of extra positional arguments. Use **kwargs when callers can supply varying named options. You can use both in one function. The names args and kwargs are conventions; the * and ** do the work.',
            ],
            bullets: [
                'Inside the function, the name after * (often args) holds a tuple of extra positional arguments.',
                'Inside the function, the name after ** (often kwargs) holds a dictionary of extra keyword arguments.',
                'At a call site, * unpacks an iterable into positional arguments and ** unpacks a mapping into keyword arguments. This is also useful when a wrapper forwards a call.',
            ],
        },
        {
            id: 'mutable-default-arguments',
            title: 'Mutable default arguments',
            paragraphs: [
                'Python evaluates a default value once when it defines the function. Calls that omit the argument reuse that same object. A list can therefore keep changes from earlier calls.',
                'Running def, append, return, and print together without the needed line breaks and indentation raises SyntaxError. The examples below show the intended Python code.',
            ],
            examples: [{
                title: 'The same default list is reused',
                code: [
                    'def foo(items=[]):',
                    '    items.append(1)',
                    '    return items',
                    '',
                    'print(foo())',
                    'print(foo())',
                    'print(foo())',
                ].join('\n'),
                result: 'The lines print [1], then [1, 1], then [1, 1, 1]. Each call without items appends to the same default list.',
            }, {
                title: 'Create a fresh list for each omitted argument',
                code: [
                    'def foo(items=None):',
                    '    if items is None:',
                    '        items = []',
                    '    items.append(1)',
                    '    return items',
                    '',
                    'print(foo())',
                    'print(foo())',
                    'print(foo())',
                ].join('\n'),
                result: 'Each line prints [1]. A caller that passes a list still has that list changed by append.',
            }],
        },
        {
            id: 'annotations',
            title: 'Function type annotations',
            examples: [{
                code: [
                    'def pair(number: int, label: str) -> tuple[int, str]:',
                    '    return number, label',
                ].join('\n'),
            }],
            paragraphs: ['Annotations document expected argument and return types. They do not enforce those types by themselves. A type checker or validation tool can check them.'],
        },
        {
            id: 'scope',
            title: 'Name lookup and the LEGB rule',
            paragraphs: [
                'Python looks for a name in this order: Local (the current function), Enclosing (outer functions), Global (the module), then Built-in (names such as len). It stops at the first match. An if or loop block does not create a new scope; a function does.',
            ],
            examples: [{
                title: 'The nearest x wins',
                code: [
                    'x = 10',
                    '',
                    'def outer():',
                    '    x = 20',
                    '',
                    '    def inner():',
                    '        x = 30',
                    '        print(x)',
                    '',
                    '    inner()',
                    '',
                    'outer()',
                ].join('\n'),
                result: '30. The local x in inner is found first. If inner did not define x, lookup would find 20 in outer. If outer did not define x either, it would find the module-level 10.',
            }],
            bullets: [
                'Use global inside a function when assigning to a module-level name. Use nonlocal to assign to a name in an enclosing function.',
                'Reading a name from an outer scope does not require global or nonlocal.',
            ],
            exceptions: ['A name assigned only inside a branch may be unbound when that branch does not run.'],
        },
        {
            id: 'closures-late-binding',
            title: 'Closures and late binding',
            paragraphs: [
                'A closure is a function that uses names from an enclosing function after that outer function returns. A function reads such a name when it runs, not when it is created. In the loop below, all three lambdas read the same i after the loop leaves it at 2. At module level, i is global; the same late lookup happens with an enclosing function.',
            ],
            examples: [{
                title: 'Late lookup',
                code: [
                    'funcs = []',
                    'for i in range(3):',
                    '    funcs.append(lambda: i)',
                    '',
                    'print([f() for f in funcs])',
                ].join('\n'),
                result: '[2, 2, 2]',
            }, {
                title: 'Bind each value when creating the function',
                code: [
                    'funcs = []',
                    'for i in range(3):',
                    '    funcs.append(lambda i=i: i)',
                    '',
                    'print([f() for f in funcs])',
                ].join('\n'),
                result: '[0, 1, 2]. Each default argument is evaluated when its lambda is created.',
            }, {
                title: 'A function keeps an enclosing value',
                code: [
                    'def make_greeting(name):',
                    '    def greet():',
                    '        return f"Hello, {name}"',
                    '    return greet',
                    '',
                    'greet_ava = make_greeting("Ava")',
                    'print(greet_ava())',
                ].join('\n'),
                result: 'Hello, Ava. greet still reads name from make_greeting after make_greeting has returned.',
            }],
        },
        {
            id: 'decorators',
            title: 'Function decorators',
            paragraphs: [
                'A decorator takes a function and returns a function or other callable. Python applies @my_decorator when it defines hello. The syntax is equivalent to defining hello first, then assigning hello = my_decorator(hello). Calling hello later calls the returned wrapper.',
                'Use a decorator for behavior shared by several functions, such as logging or timing. functools.wraps keeps the wrapped function\'s name and documentation available.',
            ],
            examples: [{
                code: [
                    'from functools import wraps',
                    '',
                    'def my_decorator(func):',
                    '    @wraps(func)',
                    '    def wrapper(*args, **kwargs):',
                    '        print("Before")',
                    '        result = func(*args, **kwargs)',
                    '        print("After")',
                    '        return result',
                    '    return wrapper',
                    '',
                    '@my_decorator',
                    'def hello():',
                    '    print("Hello")',
                    '',
                    'hello()',
                ].join('\n'),
                result: 'Before, Hello, and After print on separate lines, in that order. The decorator returns wrapper; the call to hello runs wrapper.',
            }],
        },
    ],
};

export default note;
