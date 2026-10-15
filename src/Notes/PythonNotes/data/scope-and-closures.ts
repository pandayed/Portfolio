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
                "A closure is a function together with the enclosing bindings it keeps. A binding connects a name to an object.",
                "The inner function that uses those bindings is called a closure. The outer function creates it. The whole outer-and-inner block is not one closure.",
                "A free variable is a name used from an enclosing function rather than a local variable or parameter of the inner function.",
                "A closure works while the outer call is active and after it returns. Returning the inner function is a common way to keep it.",
                "A nested function that uses no enclosing function names has no captured closure cells. Nesting alone does not create a state-retaining closure in this sense.",
                "Use nonlocal when the closure needs to reassign an enclosing name."
            ],
            "examples": [
                {
                    "title": "Keep a separate counter for each closure",
                    "code": "def make_counter():\n    count = 0\n    def increment():\n        nonlocal count\n        count += 1\n        return count\n    return increment\n\ncounter = make_counter()\nprint(counter())\nprint(counter())\nother_counter = make_counter()\nprint(other_counter())",
                    "result": "1\n2\n1",
                    "description": [
                        "Keep a count between calls without a module-level variable."
                    ],
                    "explanation": [
                        "increment is the closure. make_counter creates it.",
                        "Calls through counter share one count binding. A separate make_counter call creates a separate binding for other_counter."
                    ]
                }
            ]
        },
        {
            "id": "closure-retention",
            "title": "Which enclosing variables stay alive",
            "bullets": [
                "Python stores captured enclosing bindings in cells. function.__closure__ exposes those cells. It does not contain every local variable of the outer call.",
                "An unrelated outer local is not retained merely because a closure exists. Other references, including saved frames or debugging tools, can still keep its object alive.",
                "A captured binding keeps its current object reachable. References from that object can keep further objects alive.",
                "Closures from one outer call share captured bindings. They observe reassignment and object mutation instead of receiving independent snapshots.",
                "A binding needed by a deeper nested function can be carried through an intermediate function even when that intermediate function does not read its value.",
                "When no live reference needs the captured state, it can be garbage-collected. Do not depend on immediate collection."
            ],
            "examples": [
                {
                    "title": "Keep a prefix without capturing an unused list",
                    "description": [
                        "Create a text formatter and inspect which enclosing name it captures."
                    ],
                    "code": "def make_formatter(prefix):\n    temporary = [0] * 1000\n    def format_message(message):\n        return f\"{prefix}: {message}\"\n    return format_message\n\nformat_warning = make_formatter(\"WARNING\")\nprint(format_warning(\"Disk nearly full\"))\nprint(format_warning.__code__.co_freevars)",
                    "result": "WARNING: Disk nearly full\n('prefix',)",
                    "explanation": [
                        "format_message captures prefix. message is its own parameter.",
                        "temporary is not captured. The returned formatter does not retain that list through a closure cell.",
                        "co_freevars lists captured enclosing names. It excludes global and built-in names."
                    ]
                }
            ]
        },
        {
            "id": "closure-nesting",
            "title": "How far enclosing access reaches",
            "bullets": [
                "Functions can nest through several levels. Closures are not limited to an outer and an inner function. Interpreter limits still apply to extreme source nesting.",
                "Lookup starts at the nearest enclosing function and continues outward. An inner function can use a grandparent binding even if its parent does not read it.",
                "A nearer binding with the same name hides the farther binding. Local assignment makes that name local unless global or nonlocal changes the rule.",
                "Outer functions cannot directly read inner function locals. Sibling function locals are not directly visible either.",
                "Scope depends on where a function is defined. Calling it from another function does not give it access to that caller's locals.",
                "global targets the defining module. nonlocal targets the nearest enclosing function binding with that name. It requires an existing binding.",
                "Ordinary class attributes are not enclosing function bindings for methods. Access them through self.attribute or ClassName.attribute."
            ],
            "examples": [
                {
                    "title": "Read two enclosing levels after both calls return",
                    "description": [
                        "Keep one binding from an outer function and one from a middle function."
                    ],
                    "code": "def outer():\n    region = \"EU\"\n    def middle():\n        service = \"billing\"\n        def label():\n            return f\"{region}/{service}\"\n        return label\n    return middle\n\nmake_label = outer()\nget_label = make_label()\nprint(get_label())",
                    "result": "EU/billing",
                    "explanation": [
                        "label reads service from middle and region from outer.",
                        "middle carries region for label even though middle does not read its value itself.",
                        "The bindings remain available after both enclosing calls return."
                    ]
                }
            ]
        },
        {
            "id": "closure-use-cases",
            "title": "When to use a closure",
            "bullets": [
                "Closures are normal Python code. They are not deprecated and do not have the avoid-in-new-code guidance often given to JavaScript var.",
                "Use a closure for a small callback with remembered configuration, a function factory, or a decorator wrapper.",
                "Use a class when state needs several named operations or callers should inspect that state.",
                "Use functools.partial when the only job is to prefill arguments of an existing function.",
                "Avoid unnecessary deep nesting and accidental retention of large objects. Late lookup can also surprise callbacks created in loops."
            ],
            "examples": [
                {
                    "title": "Create a logging callback for each service",
                    "description": [
                        "Configure a logger once. Later calls provide only a message."
                    ],
                    "code": "def make_logger(service):\n    def log(message):\n        print(f\"[{service}] {message}\")\n    return log\n\nbilling_log = make_logger(\"billing\")\nauth_log = make_logger(\"auth\")\nbilling_log(\"Invoice created\")\nauth_log(\"Login accepted\")",
                    "result": "[billing] Invoice created\n[auth] Login accepted",
                    "explanation": [
                        "Each log closure remembers service from its own make_logger call.",
                        "An application can pass these callbacks to other functions without supplying the service name on every log call."
                    ]
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
            "title": "Python references",
            "bullets": [
                [
                    {
                        "text": "Python tutorial: Scopes and namespaces",
                        "href": "https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces"
                    }
                ],
                [
                    {
                        "text": "Execution model: name resolution",
                        "href": "https://docs.python.org/3/reference/executionmodel.html#resolution-of-names"
                    }
                ],
                [
                    {
                        "text": "Data model: function closure cells",
                        "href": "https://docs.python.org/3/reference/datamodel.html#user-defined-functions"
                    }
                ],
                [
                    {
                        "text": "Programming FAQ: late lookup in closures",
                        "href": "https://docs.python.org/3/faq/programming.html#why-do-lambdas-defined-in-a-loop-with-different-values-all-return-the-same-result"
                    }
                ],
                [
                    {
                        "text": "functools: partial",
                        "href": "https://docs.python.org/3/library/functools.html#functools.partial"
                    }
                ]
            ]
        }
    ]
};

export default note;
