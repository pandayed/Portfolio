/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8079-adc5-d9521cddb953",
    "slug": "cpp-vs-go",
    "title": "CPP vs Go",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "cpp-vs-go-01",
            "type": "text",
            "richText": [
                [
                    "Use this comparison if you already know C++. Similar syntax does not imply the same type system or resource lifetime rules."
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
                                "Structs hold fields; methods are declared separately with an explicit receiver such as (t T) or (t *T)."
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
                                "Single or multiple inheritance; virtual methods can be overridden."
                            ]
                        ],
                        "col-2": [
                            [
                                "No class inheritance or overriding. Use composition, embedding, and interfaces. Embedding does not create a subtype."
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
                                "Interfaces describe required methods; types implement them implicitly. No virtual keyword."
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
                                "public, private, protected; friend grants selected access."
                            ]
                        ],
                        "col-2": [
                            [
                                "Package scope and exported identifiers. Uppercase initial letters export names. No protected or friend keyword."
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
                                "Special constructor syntax, overloads, and member initialization lists."
                            ]
                        ],
                        "col-2": [
                            [
                                "No special constructor syntax. Use zero values, composite literals, or ordinary functions such as NewClient."
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
                                "Function and operator overloading; default arguments."
                            ]
                        ],
                        "col-2": [
                            [
                                "No function or operator overloading and no default arguments. Use distinct functions or explicit parameters."
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
                                "Type parameters and constraints support generic types and functions (Go 1.18+). The rules differ from C++ templates."
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
                                "Casts include conversions and dynamic_cast for polymorphic hierarchies."
                            ]
                        ],
                        "col-2": [
                            [
                                "Explicit conversions for compatible types; type assertions and switches inspect the dynamic type of an interface."
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
                                "No C-style preprocessor. Imports, build constraints, and code generation serve different purposes."
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
                                "inline has language and linkage rules; optimization is a compiler decision."
                            ]
                        ],
                        "col-2": [
                            [
                                "No inline keyword. The compiler may inline eligible functions."
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
                                "Automatic storage duration, containers, smart pointers, or explicit new/delete."
                            ]
                        ],
                        "col-2": [
                            [
                                "Garbage-collected Go memory. Allocation and collection costs depend on use."
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
                                "RAII binds cleanup to object lifetime; destructors run at scope exit for automatic objects."
                            ]
                        ],
                        "col-2": [
                            [
                                "No deterministic destructor. Explicit Close methods and defer commonly release resources when the surrounding function returns."
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
                                "Errors are values. panic/recover handles panics; it is not ordinary error-return control flow."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "cpp-vs-go-06",
            "type": "text",
            "richText": [
                [
                    "A deferred cleanup does not run at the end of an inner block or loop iteration. For a file opened in each iteration, a helper function can give each file its own function lifetime. Garbage collection does not replace closing the file."
                ]
            ]
        },
        {
            "id": "cpp-vs-go-07",
            "type": "text",
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
            "type": "text",
            "richText": [
                [
                    "Virtual dispatch tables and Go interface representation are implementation details, not equivalent language guarantees. Compiled Go programs also contain symbol names. Their spelling can include package paths and compiler-generated names; lack of overloads does not mean Go has no name transformation."
                ]
            ]
        },
        {
            "id": "cpp-vs-go-10",
            "type": "text",
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
            "type": "text",
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
            "type": "text",
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
