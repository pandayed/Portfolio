import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'functions-and-scope',
    title: 'Functions and scope',
    summary: 'Define functions, pass arguments, return values, and reason about name lookup.',
    updatedOn: '2026-09-20',
    sections: [
        {
            id: 'define-return',
            title: 'Define and return',
            examples: [{
                code: [
                    'def say_name():',
                    '    print("Lal Bihari Pandey")',
                    '',
                    '',
                    'def full_name(first, last):',
                    '    return first + " " + last',
                    '',
                    '',
                    'print(say_name())             # Prints the name, then None',
                    'print(full_name("Lal", "Pandey"))',
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
            id: 'arguments',
            title: 'Arguments',
            examples: [{
                code: [
                    'def name(first, last="Pandey"):',
                    '    return f"{first} {last}"',
                    '',
                    'print(name("Lal"))',
                    'print(name(last="George", first="Ayushi"))',
                ].join('\n'),
            }],
            exceptions: ['A parameter with a default must follow required positional parameters. Avoid a mutable object such as [] as a default when each call needs a fresh value.'],
        },
        {
            id: 'args-kwargs',
            title: '*args and **kwargs',
            examples: [{
                code: [
                    'def add(*numbers):',
                    '    return sum(numbers)',
                    '',
                    '',
                    'def print_name(**parts):',
                    '    print(parts["first"], parts["last"])',
                    '',
                    '',
                    'print(add(1, 2, 3, 4))',
                    'print_name(first="Lal", last="Pandey")',
                ].join('\n'),
            }],
            bullets: ['args is a tuple of extra positional arguments.', 'kwargs is a dictionary of extra keyword arguments.'],
        },
        {
            id: 'annotations',
            title: 'Function annotations',
            examples: [{
                code: [
                    'def pair(number: int, label: str) -> tuple[int, str]:',
                    '    return number, label',
                ].join('\n'),
            }],
            exceptions: ['Annotations do not enforce argument or return types by themselves. Use a type checker or validation tool when enforcement is required.'],
        },
        {
            id: 'scope',
            title: 'Local and global scope',
            paragraphs: ['Python resolves names through local, enclosing, global, and built-in scopes. An if or loop block does not create its own local scope. A function does.'],
            examples: [{
                code: [
                    'message = "global"',
                    '',
                    'def change_message():',
                    '    global message',
                    '    message = "changed"',
                ].join('\n'),
            }],
            exceptions: [
                'A name assigned only inside a branch may be unbound when that branch does not run.',
                'Changing global state inside a function makes dependencies harder to see. Prefer parameters and return values when practical.',
            ],
        },
    ],
};

export default note;
