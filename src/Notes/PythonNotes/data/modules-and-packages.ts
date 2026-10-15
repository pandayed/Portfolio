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
            "title": "Using a Python file as a module",
            "bullets": [
                "A module is usually one .py file containing Python code, such as functions, classes, and variables.",
                "A package groups related modules and can also contain smaller packages called subpackages. In this hierarchy, the package is the larger container. A module can also exist on its own, outside a package.",
                "For example, shop/pricing.py is the pricing module inside the shop package. A total function defined in pricing.py belongs to that module.",
                "Each module has its own namespace: its collection of names. Importing lets another module use those names.",
                "Python searches for modules through its import machinery. The script’s folder and installed libraries are common search locations. Avoid local names such as json.py that hide standard library modules."
            ],
            "examples": [
                {
                    "title": "Importing a function from another file",
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
            "title": "Choosing an import form",
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
            "title": "Separating importable code from script work",
            "bullets": [
                "The first import normally executes a module’s top-level statements. Later imports in the same process normally reuse the loaded module.",
                "Use the __name__ guard for work that should run only when the module is started as the program.",
                "For a directly started script, __name__ is \"__main__\". For an imported module, it is the module’s import name."
            ],
            "examples": [
                {
                    "title": "Guarding a script entry point",
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
            "title": "Grouping modules in a package",
            "bullets": [
                "A regular package is a folder containing an __init__.py file and usually other Python files. Each of those other .py files is a module in the package. __init__.py can be empty.",
                "Technically, a package is a special kind of module that can contain other modules. An ordinary module such as pricing.py does not contain submodules just because it imports them.",
                "A subpackage is another package inside a package. Its import name includes its parents, such as shop.reports.monthly.",
                "Namespace packages can omit __init__.py and span multiple folders. Use a regular package for these examples."
            ],
            "examples": [
                {
                    "title": "Importing from a regular package",
                    "description": [
                        "Create shop/ beside main.py. Create an empty shop/__init__.py. Save the other two files below, then run python3 main.py.",
                        "The project folder contains main.py and the shop package folder. The shop folder contains __init__.py and the pricing.py module."
                    ],
                    "code": "# shop/pricing.py\ndef total(price, shipping):\n    return price + shipping\n\n# main.py\nimport shop.pricing\nprint(shop.pricing.total(10, 2))\n\nfrom shop import pricing\nprint(pricing.total(10, 2))\n\nfrom shop.pricing import total\nprint(total(10, 2))",
                    "result": "12\n12\n12",
                    "explanation": [
                        "The containment order is shop package → pricing module → total function. main.py is a separate module beside the shop package.",
                        "In shop.pricing.total, each dot selects the next name: pricing within shop, then total within pricing."
                    ]
                }
            ]
        },
        {
            "id": "imports-inside-packages",
            "title": "Importing between modules in a package",
            "bullets": [
                "An absolute import starts with the package name, such as from shop.pricing import total.",
                "A relative import starts from the current package. One dot means the current package; two dots mean its parent.",
                "Relative imports need package context. The -m option finds and runs a module by its import name."
            ],
            "examples": [
                {
                    "title": "Running a package module with -m",
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
