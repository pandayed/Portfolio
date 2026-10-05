/* Focused Go study notes, refined from the imported source. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8073-b1bd-cc1e8381338d",
    "slug": "constants-variables",
    "title": "Constants & Variables",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "f2e35985-ef4a-5625-be47-01c81d81632f",
            "type": "bulleted_list",
            "richText": [
                [
                    "A constant names a value that is fixed when the program is compiled."
                ]
            ]
        },
        {
            "id": "019e7f68-5afd-5a39-b803-d61871998b58",
            "type": "bulleted_list",
            "richText": [
                [
                    "A variable stores a value that can change."
                ]
            ]
        },
        {
            "id": "73722251-f923-5c47-903e-b4c6cfa3bedf",
            "type": "bulleted_list",
            "richText": [
                [
                    "The commented-out declarations below show errors."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Constants can be booleans, strings, or numbers."
                ]
            ]
        },
        {
            "id": "d01bb446-95b7-5b25-b529-87332242d974",
            "type": "bulleted_list",
            "richText": [
                [
                    "Rune and complex values can also be constants."
                ]
            ]
        },
        {
            "id": "6fec60d0-4cbe-55c0-a454-9f3eaca909d7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Slices, maps, structs, functions, and "
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
            "type": "bulleted_list",
            "richText": [
                [
                    "An untyped constant has no fixed type. You can assign it to a type that can hold its value."
                ]
            ]
        },
        {
            "id": "45e8f307-390e-51b9-994a-5da34b258e1f",
            "type": "bulleted_list",
            "richText": [
                [
                    "A typed constant already has a type. Assigning it follows the rules for that type."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "If you do not give the variable a type, Go uses the constant’s default type."
                ]
            ]
        },
        {
            "id": "835c109f-2379-563f-8149-6ee9cab866e7",
            "type": "bulleted_list",
            "richText": [
                [
                    "For example, "
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A constant expression cannot use the value of a variable."
                ]
            ]
        },
        {
            "id": "81f1c20e-334c-5444-8e93-e6f5a9542c8b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Ordinary function calls cannot produce constants."
                ]
            ]
        },
        {
            "id": "30a7f149-7b6e-5bed-ba6b-317c1083a6df",
            "type": "bulleted_list",
            "richText": [
                [
                    "Some built-in functions can produce constants. For example, "
                ],
                [
                    "len(\"Go\")",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a constant."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Use constants for fixed limits, version strings, and related named values."
                ]
            ]
        },
        {
            "id": "192af8be-1669-5d0a-9d20-8d97ef34bb8f",
            "type": "bulleted_list",
            "richText": [
                [
                    "See "
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
            "type": "bulleted_list",
            "richText": [
                [
                    "If you do not give a variable an initial value, it gets its type’s "
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    ":=",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " only inside a function."
                ]
            ]
        },
        {
            "id": "19c7328f-f385-5dc0-9ed8-5fa19dd5e78a",
            "type": "bulleted_list",
            "richText": [
                [
                    "At least one variable on the left must be new in that scope."
                ]
            ]
        },
        {
            "id": "256bfa4c-4e7b-5390-8232-eb0d2bd2e906",
            "type": "bulleted_list",
            "richText": [
                [
                    "The blank identifier "
                ],
                [
                    "_",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " does not count as a new variable."
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
