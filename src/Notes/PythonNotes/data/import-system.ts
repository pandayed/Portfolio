import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "import-system",
    "title": "How Python imports modules",
    "summary": "Follow an import through the module cache, finders, sys.path, and module execution.",
    "updatedOn": "2026-10-01",
    "sections": [
        {
            "id": "steps",
            "title": "What import mymodule does",
            "bullets": [
                "import `mymodule` asks Python for a module named `mymodule` and binds the resulting module object to that name.",
                "If Python cannot find it, the import raises `ModuleNotFoundError`.",
                "Python first checks `sys.modules`, a mapping of module names to modules already loaded in this interpreter process.",
                "A cached module can be returned immediately.",
                "If the name is not cached, Python asks finders to locate it.",
                "Standard finders can locate built-in modules, frozen modules, and modules on an import path.",
                "A loader creates or obtains the module object and executes its top-level code.",
                "Python stores the module in `sys.modules` as part of loading it.",
                "The import statement then binds the module to the name `mymodule` in the importing code."
            ]
        },
        {
            "id": "sys-path",
            "title": "What sys.path is for",
            "examples": [
                {
                    "title": "Inspecting the search path",
                    "code": "import sys\n\nprint(type(sys.path))  # <class 'list'>\nprint(sys.path[0])  # Varies with how and where Python starts",
                    "result": "sys.path contains location strings. Its contents depend on the interpreter, environment, and launch command."
                }
            ],
            "bullets": [
                "`sys.path` is a list of locations used by Python’s usual path-based finder for top-level imports.",
                "It commonly includes the script’s folder, standard library locations, and the active environment’s site-packages.",
                "It is not a list of modules that have already been imported.",
                "Its first entry depends on how Python starts.",
                "For a file run as a script, that entry is normally the script’s folder.",
                "In an interactive session or with python -m, it normally points to the current folder.",
                "Environment and startup settings can change the path.",
                "`sys.path` is one part of the import system.",
                "Built-in modules and custom import hooks need not come from those directories.",
                "For a submodule such as `shop.pricing`, Python searches within the parent package’s `__path__` rather than treating the dotted name as a top-level file on `sys.path`."
            ]
        },
        {
            "id": "cache-example",
            "title": "Why a second import does not normally rerun code",
            "examples": [
                {
                    "title": "demo_module.py",
                    "code": "print(\"module loaded\")  # module loaded",
                    "description": [
                        "The file is saved as `demo_module.py` beside `main.py`.",
                        "Its top-level statement prints when `main.py` first imports it."
                    ]
                },
                {
                    "title": "main.py",
                    "code": "import sys\n\nprint(\"demo_module\" in sys.modules)  # False in this fresh process\nimport demo_module\nprint(\"demo_module\" in sys.modules)  # True\nimport demo_module\nprint(demo_module is sys.modules[\"demo_module\"])  # True",
                    "result": "The lines are False, module loaded, True, True. The second import does not print module loaded again.",
                    "description": [
                        "The file is saved as `main.py` beside `demo_module.py` from the preceding block.",
                        "Run `python3 main.py` in a fresh process after saving both files.",
                        "The first import executes `demo_module.py`.",
                        "The second import reuses the module in `sys.modules` and does not run its top-level `print` again."
                    ]
                }
            ],
            "bullets": [
                [
                    "Related note: ",
                    {
                        "text": "Modules and packages",
                        "href": "#/notes/python/modules-and-packages"
                    },
                    "."
                ],
                "The `sys.modules` cache lasts for this interpreter process.",
                "Starting a new process usually executes the module again on its first import.",
                "A .pyc bytecode cache can save compilation work.",
                "It is separate from `sys.modules`, which caches the loaded module object within a process."
            ]
        },
        {
            "id": "references",
            "title": "References",
            "bullets": [
                [
                    {
                        "text": "import system reference",
                        "href": "https://docs.python.org/3/reference/import.html"
                    }
                ],
                [
                    {
                        "text": "sys.path initialization guide",
                        "href": "https://docs.python.org/3/library/sys_path_init.html"
                    }
                ]
            ]
        }
    ],
    "exampleLayout": "grouped"
};

export default note;
