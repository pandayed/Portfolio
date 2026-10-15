import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "scope-and-closures",
    "title": "Scope, closures, and decorators",
    "summary": "Follow name lookup, use functions as values, and build closures and decorators.",
    "updatedOn": "2026-10-15",
    "exampleLayout": "grouped",
    "sections": [
        {
            "id": "scope",
            "title": "Name lookup and local assignment",
            "bullets": [
                "For ordinary function code, Python searches Local, Enclosing function, Global module, then Built-in names. This order is called LEGB.",
                "An if or loop block does not create a new function scope.",
                "Assignment inside a function normally makes the name local throughout that function. Reading it before assigning raises UnboundLocalError.",
                "A name assigned only in a branch may be unbound if that branch does not run."
            ],
            "examples": [
                {
                    "title": "Find the nearest name",
                    "code": "x = 10\n\ndef outer():\n    x = 20\n    def inner():\n        x = 30\n        print(x)\n    inner()\n\nouter()",
                    "result": "30",
                    "explanation": [
                        "inner finds its local x first. Without that assignment, it would find x in outer."
                    ]
                }
            ]
        },
        {
            "id": "global-nonlocal",
            "title": "Reassign names outside the current function",
            "bullets": [
                "Use global to assign to a module-level name. Use nonlocal to assign to a name in an enclosing function.",
                "Reading an outer name does not require either declaration.",
                "Changing an object through a name differs from rebinding that name. Appending to an outer list does not itself require global or nonlocal."
            ],
            "examples": [
                {
                    "title": "Update a module-level counter",
                    "code": "count = 0\n\ndef increment():\n    global count\n    count += 1\n\nincrement()\nprint(count)",
                    "result": "1"
                }
            ]
        },
        {
            "id": "function-values-lambda",
            "title": "Functions are values",
            "bullets": [
                "You can assign a function to a variable, pass it to another function, or return it.",
                "Use the function name without parentheses to refer to the function. Parentheses call it.",
                "lambda creates a function from one expression. The expression supplies its return value."
            ],
            "examples": [
                {
                    "title": "Pass a function as an argument",
                    "code": "def apply_twice(function, value):\n    return function(function(value))\n\ndef double(number):\n    return number * 2\n\nprint(apply_twice(double, 3))\nprint(apply_twice(lambda number: number + 1, 3))",
                    "result": "12\n5"
                }
            ]
        },
        {
            "id": "closures",
            "title": "Keep enclosing state in a closure",
            "bullets": [
                "A closure is a function that retains access to names in an enclosing function after that function returns.",
                "Use nonlocal when the closure needs to reassign an enclosing name."
            ],
            "examples": [
                {
                    "title": "Keep a separate counter for each closure",
                    "code": "def make_counter():\n    count = 0\n    def increment():\n        nonlocal count\n        count += 1\n        return count\n    return increment\n\ncounter = make_counter()\nprint(counter())\nprint(counter())",
                    "result": "1\n2"
                }
            ]
        },
        {
            "id": "closures-late-binding",
            "title": "Late lookup in closures",
            "bullets": [
                "A function reads an enclosing name when the function runs. It does not automatically save that name's current value when the function is created.",
                "A default parameter can capture the value at function creation time."
            ],
            "examples": [
                {
                    "title": "Compare late lookup with a captured default",
                    "code": "def make_functions():\n    late = []\n    captured = []\n    for i in range(3):\n        late.append(lambda: i)\n        captured.append(lambda i=i: i)\n    return late, captured\n\nlate, captured = make_functions()\nprint([function() for function in late])\nprint([function() for function in captured])",
                    "result": "[2, 2, 2]\n[0, 1, 2]",
                    "explanation": [
                        "The late functions share the same enclosing i, which ends at 2.",
                        "Each captured function has its own default value, evaluated during that loop iteration."
                    ]
                }
            ]
        },
        {
            "id": "decorators",
            "title": "Wrap a function with a decorator",
            "bullets": [
                "A decorator receives a function and returns the value that replaces its name. A wrapper function is a common replacement.",
                "@decorate above a definition applies decorate when Python defines the function. It has the effect of assigning hello = decorate(hello) after the definition.",
                "Use functools.wraps to preserve the wrapped function's name and documentation."
            ],
            "examples": [
                {
                    "title": "Run behavior before and after a function call",
                    "code": "from functools import wraps\n\ndef decorate(function):\n    @wraps(function)\n    def wrapper(*args, **kwargs):\n        print(\"Before\")\n        result = function(*args, **kwargs)\n        print(\"After\")\n        return result\n    return wrapper\n\n@decorate\ndef hello():\n    print(\"Hello\")\n\nhello()",
                    "result": "Before\nHello\nAfter",
                    "explanation": [
                        "The decorator creates the wrapper during the definition. Calling hello() later runs that wrapper."
                    ]
                }
            ]
        },
        {
            "id": "references",
            "title": "Tutorial reference",
            "bullets": [
                [
                    {
                        "text": "Python tutorial: Scopes and namespaces",
                        "href": "https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces"
                    }
                ]
            ]
        }
    ]
};

export default note;
