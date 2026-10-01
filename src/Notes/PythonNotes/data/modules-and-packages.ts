import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'modules-and-packages',
    title: 'Modules and packages',
    summary: 'Split Python code into files, import it, and run a module inside a package.',
    updatedOn: '2026-09-30',
    sections: [
        {
            id: 'module',
            title: 'Use a Python file as a module',
            paragraphs: [
                'A .py file can be imported as a module. Put related functions or values in one file, then import that module where you need it.',
                'Save these two files in the same folder. Run the command from that folder.',
            ],
            examples: [{
                title: 'prices.py',
                code: [
                    'TAX_RATE = 0.10',
                    '',
                    'def price_with_tax(price):',
                    '    return price * (1 + TAX_RATE)',
                ].join('\n'),
            }, {
                title: 'main.py',
                code: [
                    'import prices',
                    '',
                    'print(prices.price_with_tax(20))  # 22.0',
                ].join('\n'),
            }, {
                title: 'Run the program',
                language: 'text',
                code: 'python3 main.py',
                result: 'The output is 22.0.',
            }],
            bullets: [
                'import prices gives you the module name prices. Use prices.price_with_tax to get a name from it.',
                'from prices import price_with_tax imports that name directly. You can then call price_with_tax(20).',
                'Python finds modules through its import search path. The script’s folder and installed libraries are common places on that path.',
            ],
        },
        {
            id: 'import-execution',
            title: 'Importing runs the module',
            paragraphs: [
                'On the first import, Python executes the module’s top-level statements and makes its names available. It normally keeps the loaded module in memory, so a later import in the same process does not run those statements again.',
                'Keep reusable work inside functions. Use a main guard for work that should run when a file is started as a program.',
            ],
            examples: [{
                title: 'greetings.py',
                code: [
                    'def greet(name):',
                    '    return f"Hello, {name}"',
                    '',
                    'if __name__ == "__main__":',
                    '    print(greet("Lal"))  # Hello, Lal',
                ].join('\n'),
                result: 'python3 greetings.py prints Hello, Lal. import greetings defines greet without calling print.',
            }],
            bullets: [
                'Python sets __name__ to "__main__" for the file started as the program.',
                'When another file imports greetings, its __name__ is "greetings". The guarded lines do not run.',
            ],
        },
        {
            id: 'package',
            title: 'A package groups modules',
            paragraphs: [
                'A regular package is a folder of Python modules with an __init__.py file. The file can be empty. Its presence marks the folder as a package and lets it hold package setup code when needed.',
                'Use a package when several modules belong together. This example has a shop package and one module inside it.',
            ],
            examples: [{
                title: 'Project files',
                language: 'text',
                code: [
                    'project/',
                    '├── main.py',
                    '└── shop/',
                    '    ├── __init__.py',
                    '    └── pricing.py',
                ].join('\n'),
            }, {
                title: 'shop/pricing.py',
                code: [
                    'def total(price, shipping):',
                    '    return price + shipping',
                ].join('\n'),
            }, {
                title: 'main.py',
                code: [
                    'from shop.pricing import total',
                    '',
                    'print(total(10, 2))  # 12',
                ].join('\n'),
                result: 'From project/, python3 main.py prints 12.',
            }],
            bullets: [
                'shop is the package. shop.pricing is a module inside it. total is a function in that module.',
                'Python also supports namespace packages without __init__.py. Start with a regular package while learning.',
            ],
        },
        {
            id: 'imports-inside-packages',
            title: 'Import between modules in a package',
            paragraphs: [
                'An absolute import starts with the package name: from shop.pricing import total. A relative import starts from the current package: from .pricing import total. The single dot means the current package.',
                'Relative imports need package context. Run a package module with -m from the folder above the package. The -m option asks Python to find and run the module by its import name.',
            ],
            examples: [{
                title: 'Package files',
                language: 'text',
                code: [
                    'project/',
                    '└── shop/',
                    '    ├── __init__.py',
                    '    ├── pricing.py',
                    '    └── main.py',
                ].join('\n'),
            }, {
                title: 'shop/main.py',
                code: [
                    'from .pricing import total',
                    '',
                    'if __name__ == "__main__":',
                    '    print(total(10, 2))  # 12',
                ].join('\n'),
            }, {
                title: 'Run from project/',
                language: 'text',
                code: 'python3 -m shop.main',
                result: 'The output is 12. Running python3 shop/main.py directly gives this relative import no package context.',
            }],
        },
        {
            id: 'installed-packages',
            title: 'Your packages and installed packages',
            examples: [{
                title: 'Create a virtual environment and install a library (macOS/Linux)',
                language: 'text',
                code: [
                    'python3 -m venv .venv',
                    'source .venv/bin/activate',
                    'python -m pip install pydantic',
                ].join('\n'),
                result: 'The active virtual environment receives the installed distribution. Its Python can then import pydantic.',
            }],
            bullets: [
                'Keep .venv out of version control. Each developer can create it again for the project.',
                'python -m pip uses pip from the selected Python interpreter.',
            ],
            paragraphs: [
                'The Python standard library includes modules such as json and pathlib. You can import them without installing a separate library. Other projects publish libraries that you install with a package manager such as pip.',
                'The word package has two related uses: an import package is code you import, such as shop; a distribution package is something you install. Their names do not always match.',
                'A virtual environment gives a project its own installed packages. After creating one, use its Python interpreter to install and run dependencies.',
                [
                    'Read the ',
                    { text: 'Python modules tutorial', href: 'https://docs.python.org/3/tutorial/modules.html' },
                    ' and the ',
                    { text: 'Python Packaging User Guide', href: 'https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/' },
                    ' for more detail.',
                ],
            ],
        },
    ],
};

export default note;
