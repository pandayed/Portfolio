/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8079-adc5-d9521cddb953",
    "slug": "cpp-vs-go",
    "title": "CPP vs Go",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "cpp-vs-go-01",
            "type": "bulleted_list",
            "richText": [
                [
                    "This comparison assumes you know C++."
                ]
            ]
        },
        {
            "id": "cpp-vs-go-01-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Similar syntax does not mean the same type or cleanup rules."
                ]
            ]
        },
        {
            "id": "cpp-vs-go-02",
            "type": "sub_header",
            "richText": [
                [
                    "Types and language features"
                ]
            ]
        },
        {
            "id": "cpp-vs-go-03",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1",
                "col-2"
            ],
            "hasColumnHeader": true,
            "children": [
                {
                    "id": "cpp-vs-go-03-row-0",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Feature"
                            ]
                        ],
                        "col-1": [
                            [
                                "C++"
                            ]
                        ],
                        "col-2": [
                            [
                                "Go"
                            ]
                        ]
                    }
                },
                {
                    "id": "cpp-vs-go-03-row-1",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Classes and methods"
                            ]
                        ],
                        "col-1": [
                            [
                                "class and struct can contain methods."
                            ]
                        ],
                        "col-2": [
                            [
                                "Structs hold fields. Declare methods separately with a receiver such as (t T) or (t *T)."
                            ]
                        ]
                    }
                },
                {
                    "id": "cpp-vs-go-03-row-2",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Inheritance and overriding"
                            ]
                        ],
                        "col-1": [
                            [
                                "Single or multiple inheritance. Can override virtual methods."
                            ]
                        ],
                        "col-2": [
                            [
                                "No class inheritance or overriding. Use composition, embedding, and interfaces. Embedding does not make one type a subtype of another."
                            ]
                        ]
                    }
                },
                {
                    "id": "cpp-vs-go-03-row-3",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Abstract types and dispatch"
                            ]
                        ],
                        "col-1": [
                            [
                                "Abstract classes and virtual functions."
                            ]
                        ],
                        "col-2": [
                            [
                                "Interfaces list required methods. A type implements an interface by having those methods. No virtual keyword."
                            ]
                        ]
                    }
                },
                {
                    "id": "cpp-vs-go-03-row-4",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Access control"
                            ]
                        ],
                        "col-1": [
                            [
                                "public, private, and protected control access. friend allows selected code to access private members."
                            ]
                        ],
                        "col-2": [
                            [
                                "Package-level names, fields, and methods are exported when they start uppercase. No protected or friend keyword."
                            ]
                        ]
                    }
                },
                {
                    "id": "cpp-vs-go-03-row-5",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Constructors"
                            ]
                        ],
                        "col-1": [
                            [
                                "Special constructor syntax. Supports overloads and member initialization lists."
                            ]
                        ],
                        "col-2": [
                            [
                                "No special constructor syntax. Use zero values, literals such as T{}, or functions such as NewClient."
                            ]
                        ]
                    }
                },
                {
                    "id": "cpp-vs-go-03-row-6",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Overloading"
                            ]
                        ],
                        "col-1": [
                            [
                                "Supports function overloading, operator overloading, and default arguments."
                            ]
                        ],
                        "col-2": [
                            [
                                "No function or operator overloading or default arguments. Use different function names or pass arguments explicitly."
                            ]
                        ]
                    }
                },
                {
                    "id": "cpp-vs-go-03-row-7",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Generics"
                            ]
                        ],
                        "col-1": [
                            [
                                "Templates support generic types and functions."
                            ]
                        ],
                        "col-2": [
                            [
                                "Generic types and functions use type parameters and constraints (Go 1.18+). A constraint says which types are allowed. The rules differ from C++ templates."
                            ]
                        ]
                    }
                },
                {
                    "id": "cpp-vs-go-03-row-8",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Static members"
                            ]
                        ],
                        "col-1": [
                            [
                                "Class static fields and methods."
                            ]
                        ],
                        "col-2": [
                            [
                                "Package-level variables and functions. No class static members."
                            ]
                        ]
                    }
                },
                {
                    "id": "cpp-vs-go-03-row-9",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Namespaces"
                            ]
                        ],
                        "col-1": [
                            [
                                "Namespaces organize names."
                            ]
                        ],
                        "col-2": [
                            [
                                "Packages organize names. A directory below another package needs its own import."
                            ]
                        ]
                    }
                },
                {
                    "id": "cpp-vs-go-03-row-10",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Type conversions"
                            ]
                        ],
                        "col-1": [
                            [
                                "Casts convert types. dynamic_cast checks conversions in a class hierarchy with polymorphic types."
                            ]
                        ],
                        "col-2": [
                            [
                                "Explicit conversions for compatible types. Type assertions and type switches check the concrete type stored in an interface."
                            ]
                        ]
                    }
                },
                {
                    "id": "cpp-vs-go-03-row-11",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Preprocessor"
                            ]
                        ],
                        "col-1": [
                            [
                                "#include, #define, and conditional preprocessing."
                            ]
                        ],
                        "col-2": [
                            [
                                "No C-style preprocessor. Uses imports, build constraints, and code generation for different tasks."
                            ]
                        ]
                    }
                },
                {
                    "id": "cpp-vs-go-03-row-12",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Inlining"
                            ]
                        ],
                        "col-1": [
                            [
                                "inline has language and linking rules. The compiler decides whether to inline a call."
                            ]
                        ],
                        "col-2": [
                            [
                                "No inline keyword. The compiler can replace some calls with the function body."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "cpp-vs-go-04",
            "type": "sub_header",
            "richText": [
                [
                    "Memory, resources, and errors"
                ]
            ]
        },
        {
            "id": "cpp-vs-go-05",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1",
                "col-2"
            ],
            "hasColumnHeader": true,
            "children": [
                {
                    "id": "cpp-vs-go-05-row-0",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Concern"
                            ]
                        ],
                        "col-1": [
                            [
                                "C++"
                            ]
                        ],
                        "col-2": [
                            [
                                "Go"
                            ]
                        ]
                    }
                },
                {
                    "id": "cpp-vs-go-05-row-1",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Memory management"
                            ]
                        ],
                        "col-1": [
                            [
                                "Uses local objects, containers, smart pointers, or explicit new/delete."
                            ]
                        ],
                        "col-2": [
                            [
                                "Garbage collection frees unused Go memory. Memory allocation and collection costs depend on the program."
                            ]
                        ]
                    }
                },
                {
                    "id": "cpp-vs-go-05-row-2",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Destruction and resource lifetime"
                            ]
                        ],
                        "col-1": [
                            [
                                "RAII ties cleanup to object lifetime. Destructors run when local objects leave scope."
                            ]
                        ],
                        "col-2": [
                            [
                                "No automatic destructor. Use Close and defer for cleanup when the function returns."
                            ]
                        ]
                    }
                },
                {
                    "id": "cpp-vs-go-05-row-3",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Error handling"
                            ]
                        ],
                        "col-1": [
                            [
                                "Exceptions and try/catch, or explicit error results."
                            ]
                        ],
                        "col-2": [
                            [
                                "Return errors as values. Use panic/recover for panics, not normal error handling."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "cpp-vs-go-06",
            "type": "bulleted_list",
            "richText": [
                [
                    "defer runs cleanup when the current function returns."
                ]
            ]
        },
        {
            "id": "cpp-vs-go-06-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "It does not run cleanup at the end of an inner block or each loop iteration."
                ]
            ]
        },
        {
            "id": "cpp-vs-go-06-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "When opening a file in each iteration, use a helper function to close each file before the next iteration."
                ]
            ]
        },
        {
            "id": "cpp-vs-go-06-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Garbage collection does not replace closing files."
                ]
            ]
        },
        {
            "id": "cpp-vs-go-07",
            "type": "bulleted_list",
            "richText": [
                [
                    "See "
                ],
                [
                    "Defer",
                    [
                        [
                            "a",
                            "#/notes/go/defer"
                        ]
                    ]
                ],
                [
                    " for evaluation order and cleanup examples."
                ]
            ]
        },
        {
            "id": "cpp-vs-go-08",
            "type": "sub_header",
            "richText": [
                [
                    "Compiler implementation details"
                ]
            ]
        },
        {
            "id": "cpp-vs-go-09",
            "type": "bulleted_list",
            "richText": [
                [
                    "C++ virtual dispatch tables and Go interface layouts are compiler details."
                ]
            ]
        },
        {
            "id": "cpp-vs-go-09-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "The languages do not guarantee the same layout."
                ]
            ]
        },
        {
            "id": "cpp-vs-go-09-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Compiled Go programs also contain symbols, which name functions and other program parts."
                ]
            ]
        },
        {
            "id": "cpp-vs-go-09-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Symbol names can include package paths and names made by the compiler."
                ]
            ]
        },
        {
            "id": "cpp-vs-go-09-read-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "The compiler can change symbol names even though Go does not overload functions."
                ]
            ]
        },
        {
            "id": "cpp-vs-go-10",
            "type": "bulleted_list",
            "richText": [
                [
                    "Sources: "
                ],
                [
                    "Go FAQ",
                    [
                        [
                            "a",
                            "https://go.dev/doc/faq"
                        ]
                    ]
                ],
                [
                    ""
                ]
            ]
        },
        {
            "id": "cpp-vs-go-11",
            "type": "bulleted_list",
            "richText": [
                [
                    ""
                ],
                [
                    "Constructor functions and composite literals",
                    [
                        [
                            "a",
                            "https://go.dev/doc/effective_go#composite_literals"
                        ]
                    ]
                ],
                [
                    ""
                ]
            ]
        },
        {
            "id": "cpp-vs-go-12",
            "type": "bulleted_list",
            "richText": [
                [
                    ""
                ],
                [
                    "Go symbol inspection command",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/cmd/nm"
                        ]
                    ]
                ],
                [
                    ""
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
