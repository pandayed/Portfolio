import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'dunder-variables-and-main',
    title: 'Dunder variables and main()',
    summary: 'Understand special module names, direct execution, imports, and the main entry-point pattern.',
    updatedOn: '2026-10-15',
    exampleLayout: 'grouped',
    sections: [
        {
            id: 'dunder-names',
            title: 'What dunder means',
            bullets: [
                'Dunder means double underscore. Names such as __name__ start and end with two underscores.',
                'Python gives documented dunder names special meanings. Do not invent new dunder names for ordinary variables.',
                'Dunder names are not private variables. A leading underscore such as _value is a separate convention for internal use.',
                'Some dunder names hold values, such as __name__. Others name methods, such as __init__ and __str__. Special methods belong in the class and object-model notes.',
            ],
        },
        {
            id: 'module-variables',
            title: 'Common module dunder variables',
            bullets: [
                '__name__ identifies the module. An imported module uses its import name, including its package path when applicable.',
                '__doc__ holds the module docstring, or None when no docstring is present. A docstring is a string placed at the beginning of a module, class, or function to document it.',
                '__file__ usually identifies the file from which a module was loaded. It is optional; do not assume it exists in an interactive session or for every module.',
                '__package__ records package context used for relative imports. __spec__ holds import metadata and can be None for a directly executed file.',
                '__dict__ exposes the module namespace as a dictionary of names and values.',
            ],
            examples: [
                {
                    title: 'Read metadata from an imported module',
                    description: [
                        'Save these as two separate files in the same folder. Run python3 inspect_module.py.',
                    ],
                    code: '# greetings.py\n"""Greeting helpers."""\n\ndef greet(name):\n    return f"Hello, {name}"\n\n# inspect_module.py\nimport greetings\n\nprint(greetings.__name__)\nprint(greetings.__doc__)\nprint("greet" in greetings.__dict__)',
                    result: 'greetings\nGreeting helpers.\nTrue',
                    explanation: [
                        'Python sets the module metadata while loading greetings. The greet function is one of the names stored in its namespace.',
                    ],
                },
            ],
        },
        {
            id: 'name-guard',
            title: 'Direct execution versus import',
            bullets: [
                'When Python starts a file as the program, its __name__ is "__main__". When another module imports it, its __name__ is its import name.',
                'The condition if __name__ == "__main__": runs its block only in the program entry module. This condition is commonly called the main guard.',
                'Importing still executes unguarded top-level statements on the first normal import. The guard protects only the statements inside its block.',
            ],
            examples: [
                {
                    title: 'Compare running and importing the same file',
                    description: [
                        'Save the files below in the same folder. Run each command in a separate process.',
                    ],
                    code: '# greetings.py\nprint(f"Module name: {__name__}")\n\nif __name__ == "__main__":\n    print("Started as the program")\n\n# use_greetings.py\nimport greetings\nprint("Import finished")',
                    result: '$ python3 greetings.py\nModule name: __main__\nStarted as the program\n\n$ python3 use_greetings.py\nModule name: greetings\nImport finished',
                    explanation: [
                        'The first print is outside the guard, so it runs in both cases. The guarded print runs only when greetings.py is the entry file.',
                    ],
                },
            ],
        },
        {
            id: 'main-function',
            title: 'Use a main() function',
            bullets: [
                'Python does not require a main function as C++ does. It starts by executing the entry module’s top-level statements.',
                'main is an ordinary function name, chosen by convention. Defining main() does not call it automatically.',
                'Put the program’s startup work in main(), then call it inside the main guard. Keep reusable functions outside the guard.',
                'Local variables in main() stay local to that function. Importing the module makes its functions available without starting the guarded workflow.',
            ],
            examples: [
                {
                    title: 'Keep a reusable function separate from startup',
                    description: ['Save this file as app.py and run python3 app.py.'],
                    code: 'def greet(name):\n    return f"Hello, {name}"\n\ndef main():\n    name = "Ada"\n    print(greet(name))\n\nif __name__ == "__main__":\n    main()',
                    result: 'Hello, Ada',
                    explanation: [
                        'Python defines greet and main before reaching the guard. The guard then calls main.',
                        'Another file can import app and call app.greet("Mia"). Importing app alone does not call main.',
                        'A return value from main() does not automatically become the process exit status. Command-line tools can use sys.exit(main()) with an integer status: 0 for success and a nonzero value for failure.',
                    ],
                },
            ],
        },
        {
            id: 'package-entry',
            title: 'Run a package with __main__.py',
            bullets: [
                'The string "__main__", a function named main(), and a file named __main__.py have different roles.',
                'python3 -m package_name runs that package’s __main__.py. This file commonly delegates startup to a function in another module.',
                'python3 -m package_name.module_name runs the selected module as the entry module. Its __name__ is also "__main__".',
            ],
            examples: [
                {
                    title: 'Create a package entry point',
                    description: [
                        'Create a hello_app folder with an empty __init__.py and the two files below. Run python3 -m hello_app from the folder containing hello_app.',
                    ],
                    code: '# hello_app/cli.py\ndef main():\n    print("Hello from a package")\n\n# hello_app/__main__.py\nfrom .cli import main\n\nmain()',
                    result: 'Hello from a package',
                    explanation: [
                        '__main__.py stays short. Importing hello_app.cli defines main without calling it.',
                        'This package entry file calls main directly. Importing hello_app.__main__ explicitly would execute that call too.',
                    ],
                },
            ],
        },
        {
            id: 'references',
            title: 'References',
            bullets: [
                [{ text: 'Python documentation: __main__ and entry points', href: 'https://docs.python.org/3/library/__main__.html' }],
                [{ text: 'Python data model: module attributes', href: 'https://docs.python.org/3/reference/datamodel.html#modules' }],
                [{ text: 'Python lexical analysis: reserved name patterns', href: 'https://docs.python.org/3/reference/lexical_analysis.html#reserved-classes-of-identifiers' }],
            ],
        },
    ],
};

export default note;
