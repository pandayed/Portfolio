import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "modules-and-packages",
    "title": "Modules and packages",
    "summary": "Split code into modules, choose import forms, and organize related modules in packages.",
    "updatedOn": "2026-10-15",
    "exampleLayout": "grouped",
    "sections": [
        {
            "id": "module",
            "title": "Use a Python file as a module",
            "bullets": [
                "A module contains definitions and statements. A .py file is the usual way to write one.",
                "Each module has its own namespace: its collection of names. Importing lets another module use those names.",
                "Python searches for modules through its import machinery. The script’s folder and installed libraries are common search locations. Avoid local names such as json.py that hide standard library modules."
            ],
            "examples": [
                {
                    "title": "Import a function from another file",
                    "description": [
                        "Save both files in the same folder. Run python3 main.py from that folder."
                    ],
                    "code": "# prices.py\ndef price_with_tax(price):\n    return price * 1.10\n\n# main.py\nimport prices\nprint(prices.price_with_tax(20))",
                    "result": "22.0",
                    "explanation": [
                        "The comments mark separate files. import prices binds the module name; prices.price_with_tax accesses its function."
                    ]
                }
            ]
        },
        {
            "id": "import-forms",
            "title": "Choose an import form",
            "bullets": [
                "import module keeps the module name in each use. from module import name binds the selected name directly.",
                "as gives an imported module or name a local alias.",
                "Avoid from module import *. It makes name origins unclear and can replace existing bindings."
            ],
            "examples": [
                {
                    "title": "Four import forms",
                    "description": [
                        "These forms use the standard library math module, so no extra file or installation is needed."
                    ],
                    "code": "import math\nprint(math.sqrt(25))\n\nfrom math import sqrt\nprint(sqrt(25))\n\nimport math as numbers\nprint(numbers.sqrt(25))\n\nfrom math import sqrt as square_root\nprint(square_root(25))",
                    "result": "5.0\n5.0\n5.0\n5.0",
                    "explanation": [
                        "from math import sqrt binds sqrt directly. That statement alone does not bind math."
                    ]
                }
            ]
        },
        {
            "id": "import-execution",
            "title": "Separate importable code from script work",
            "bullets": [
                "The first import normally executes a module’s top-level statements. Later imports in the same process normally reuse the loaded module.",
                "Use the __name__ guard for work that should run only when the module is started as the program.",
                "For a directly started script, __name__ is \"__main__\". For an imported module, it is the module’s import name."
            ],
            "examples": [
                {
                    "title": "Guard a script entry point",
                    "description": [
                        "Save this file as greetings.py. Run python3 greetings.py, or import greetings from another file."
                    ],
                    "code": "def greet(name):\n    return f\"Hello, {name}\"\n\nif __name__ == \"__main__\":\n    print(greet(\"Mia\"))",
                    "result": "Hello, Mia",
                    "explanation": [
                        "The displayed output is from running the script. Importing greetings defines greet without running the guarded print."
                    ]
                }
            ]
        },
        {
            "id": "package",
            "title": "Group modules in a package",
            "bullets": [
                "A package is a module that can contain submodules and subpackages. A regular package uses a folder with __init__.py. That file can be empty.",
                "A subpackage is another package inside a package. Its import name includes its parents, such as shop.reports.monthly.",
                "Namespace packages can omit __init__.py and span multiple folders. Use a regular package for these examples."
            ],
            "examples": [
                {
                    "title": "Import from a regular package",
                    "description": [
                        "Create shop/ beside main.py. Create an empty shop/__init__.py. Save the other two files below, then run python3 main.py."
                    ],
                    "code": "# shop/pricing.py\ndef total(price, shipping):\n    return price + shipping\n\n# main.py\nimport shop.pricing\nprint(shop.pricing.total(10, 2))\n\nfrom shop import pricing\nprint(pricing.total(10, 2))\n\nfrom shop.pricing import total\nprint(total(10, 2))",
                    "result": "12\n12\n12",
                    "explanation": [
                        "shop is the package, shop.pricing is its module, and total is a function inside that module."
                    ]
                }
            ]
        },
        {
            "id": "imports-inside-packages",
            "title": "Import between modules in a package",
            "bullets": [
                "An absolute import starts with the package name, such as from shop.pricing import total.",
                "A relative import starts from the current package. One dot means the current package; two dots mean its parent.",
                "Relative imports need package context. The -m option finds and runs a module by its import name."
            ],
            "examples": [
                {
                    "title": "Run a package module with -m",
                    "description": [
                        "Create a shop/ folder with an empty __init__.py and the two files below. From the folder containing shop/, run python3 -m shop.main."
                    ],
                    "code": "# shop/pricing.py\ndef total(price, shipping):\n    return price + shipping\n\n# shop/main.py\nfrom .pricing import total\n\nif __name__ == \"__main__\":\n    print(total(10, 2))",
                    "result": "12",
                    "explanation": [
                        "Running python3 shop/main.py directly does not supply the package context needed by this relative import."
                    ]
                }
            ]
        },
        {
            "id": "installed-packages",
            "title": "Import names and installation names",
            "bullets": [
                "The standard library includes modules such as math, json, and pathlib. They need no separate installation.",
                "An import package is code used by an import statement. A distribution package is something a package manager installs. One distribution can provide multiple modules and packages.",
                "Installation names and import names can differ. The Pillow distribution provides the PIL import package.",
                "A source distribution contains source code. A wheel is a built distribution used for installation. These formats do not change import syntax."
            ],
            "paragraphs": [
                [
                    "Installation and project isolation belong in ",
                    {
                        "text": "Virtual environments and pip",
                        "href": "#/notes/python/virtual-environments"
                    },
                    "."
                ],
                [
                    "References: ",
                    {
                        "text": "Python tutorial: modules and packages",
                        "href": "https://docs.python.org/3/tutorial/modules.html"
                    },
                    " and ",
                    {
                        "text": "distribution packages versus import packages",
                        "href": "https://packaging.python.org/en/latest/discussions/distribution-package-vs-import-package/"
                    },
                    "."
                ]
            ]
        }
    ]
};

export default note;
