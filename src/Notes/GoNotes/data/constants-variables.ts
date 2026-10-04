/* Focused Go study notes, refined from the imported source. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8073-b1bd-cc1e8381338d",
    "slug": "constants-variables",
    "title": "Constants & Variables",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "f2e35985-ef4a-5625-be47-01c81d81632f",
            "type": "text",
            "richText": [
                [
                    "A constant names a fixed compile-time value. A variable stores a value that can change."
                ]
            ]
        },
        {
            "id": "73722251-f923-5c47-903e-b4c6cfa3bedf",
            "type": "text",
            "richText": [
                [
                    "Each snippet is independent. Invalid declarations are commented out; the remaining lines illustrate valid declarations."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80e8-b3a2-ee4df8b423e5",
            "type": "sub_header",
            "richText": [
                [
                    "Constants (const)"
                ]
            ]
        },
        {
            "id": "a01743cd-b607-5c74-886f-92d19a2df73c",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "const version = \"1.0\"\nconst limit int = 100\nconst enabled = true"
                ]
            ]
        },
        {
            "id": "d8c2542e-63fa-5cc8-93e9-7ba27b9b03b3",
            "type": "text",
            "richText": [
                [
                    "Constants can be boolean, string, or numeric values, including runes and complex numbers. Slices, maps, structs, functions, and "
                ],
                [
                    "nil",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " cannot be constants."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-805e-b2e6-ed417c9d43c6",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Typed vs Untyped Constants"
                ]
            ]
        },
        {
            "id": "b9203129-796f-5fe5-91db-d6fbb265a241",
            "type": "text",
            "richText": [
                [
                    "An untyped constant can be assigned to a compatible type when its value fits. A typed constant follows that type’s assignment rules."
                ]
            ]
        },
        {
            "id": "1ae24bc8-b3e8-5c49-9464-89c9a09b598f",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "const untyped = 42\nvar small int32 = untyped\nvar large int64 = untyped\n\nconst typed int32 = 42\n// var wrong int64 = typed // invalid: int32 is not assignable to int64\nvar converted int64 = int64(typed)\n\n// var overflow uint8 = 256 // invalid: 256 does not fit in uint8"
                ]
            ]
        },
        {
            "id": "355fe16c-c02e-5994-890a-2d1ea2cb4eab",
            "type": "text",
            "richText": [
                [
                    "Without an explicit variable type, an untyped constant uses its default type. For example, "
                ],
                [
                    "count := 42",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " creates an "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " variable."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80a3-8f76-fe2eee715660",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Constant Expressions"
                ]
            ]
        },
        {
            "id": "8e80b0c2-d4f3-5444-a4cd-c478b03f4eed",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "const sum = 5 + 3\nconst name = \"Go\" + \"Lang\"\nconst letters = len(\"Go\") // allowed: length of a constant string"
                ]
            ]
        },
        {
            "id": "d2f7f564-4554-5a52-947b-590c572b8d7d",
            "type": "text",
            "richText": [
                [
                    "Ordinary function calls and runtime variable values are not constant expressions. Some built-ins have constant results under specific rules, such as "
                ],
                [
                    "len",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " of a constant string."
                ]
            ]
        },
        {
            "id": "5c0bda93-9233-565d-b20f-759c9cf25e3c",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "var current = 10\n// const fromVariable = current // invalid: current is a variable\n// const sine = math.Sin(1.0)   // invalid even with math imported"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80ac-aebe-d9eede70b838",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Multiple Constants"
                ]
            ]
        },
        {
            "id": "ea2398ae-7865-532f-b24c-cc8449ead137",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "const (\n    A = 1\n    B = 2\n    C = 3\n)"
                ]
            ]
        },
        {
            "id": "f00b0f7a-d583-52f9-a3cf-003c05e2efc4",
            "type": "text",
            "richText": [
                [
                    "Use constants for fixed limits, version strings, and related named values. See "
                ],
                [
                    "Iota & Flags",
                    [
                        [
                            "a",
                            "#/notes/go/const-iota"
                        ]
                    ]
                ],
                [
                    " for sequences, skipped values, and bit flags."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80a1-87da-e8b26adf4908",
            "type": "sub_header",
            "richText": [
                [
                    "Variables (var)"
                ]
            ]
        },
        {
            "id": "b15b3d8e-b6ae-5f58-8397-196f8e6cf54a",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "13aa5fdb-85d0-5e3e-bc04-b0389ce54012",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Declaration"
                            ]
                        ],
                        "col-1": [
                            [
                                "Meaning"
                            ]
                        ]
                    }
                },
                {
                    "id": "f120af0a-ea32-5f29-a7fe-8a6b73a24e98",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "var count int",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Declare an int with no explicit initializer."
                            ]
                        ]
                    }
                },
                {
                    "id": "14095691-3264-5433-a63c-fadefc1d5ee3",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "var count int = 10",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Provide both type and initial value."
                            ]
                        ]
                    }
                },
                {
                    "id": "c79c121b-11ec-5dc7-a713-ef698c155575",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "var count = 10",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Infer the type from the initializer."
                            ]
                        ]
                    }
                },
                {
                    "id": "5ea3cfde-e603-5248-92f7-cd8964040952",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "count := 10",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Short declaration inside a function."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "ee145fd1-9332-5176-9385-ca8cee22529f",
            "type": "text",
            "richText": [
                [
                    "Without an initializer, a variable receives its type’s "
                ],
                [
                    "zero value",
                    [
                        [
                            "a",
                            "#/notes/go/zero-values"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "eaa1d482-94a1-58ac-b6a4-a986c360d72c",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "var (\n    count int = 1\n    language = \"Go\"\n    active = true\n)"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-808c-8a4f-dec4d6351ce9",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Short Declaration (Inside Functions Only)"
                ]
            ]
        },
        {
            "id": "01e36cc1-2ef0-5899-8a45-db8b572ed542",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "func example() {\n    count := 10\n    count = 11 // assignment changes the existing variable\n    count, ready := 12, true // ready is new in this scope\n    _ = count\n    _ = ready\n}"
                ]
            ]
        },
        {
            "id": "7b568de3-1c1e-5a63-865c-17b106445c26",
            "type": "text",
            "richText": [
                [
                    "A short declaration must introduce at least one new non-blank variable in the same scope. It cannot appear at package scope."
                ]
            ]
        },
        {
            "id": "320bc3b0-1701-5d34-b796-70876c9cad11",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Go specification: constants and variable declarations",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Constants"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        }
    ]
} satisfies GoNote;

export default note;
