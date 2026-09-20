/* Copied from the Go by Questions page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "2ef24eb1-ed54-809e-8b5d-f92ac35da6cc",
    "slug": "go-by-questions",
    "title": "Go by Questions",
    "updatedOn": "2026-01-24",
    "blocks": [
        {
            "id": "2ef24eb1-ed54-81aa-8f77-eea71868dd94",
            "type": "header",
            "richText": [
                [
                    "Beginner"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8118-a6c4-df015b0eecf1",
            "type": "bulleted_list",
            "richText": [
                [
                    "B01 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is a Go package, and what must a runnable (executable) program contain?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81fd-a073-f6707cbd3cfd",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8167-a313-e01b3cd9c92a",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A "
                                ],
                                [
                                    "package",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " is the unit of compilation and namespace in Go."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8123-bad8-f5f2f50d4d1e",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A runnable program must have:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-811f-b029-e2d3932693c8",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "package main",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8197-a945-d9fe7acd7379",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "A "
                                        ],
                                        [
                                            "func main()",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " entry point (no parameters, no return values)."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-816d-917f-ce06c9710f5e",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Exported identifiers start with an "
                                ],
                                [
                                    "uppercase",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " letter (e.g., "
                                ],
                                [
                                    "fmt.Println",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ")."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81e6-adb2-fc07fd3f9e60",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81e9-bdb6-fd25847071be",
                            "type": "code",
                            "richText": [
                                [
                                    "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hello\")\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8127-963e-c4bf1ac75315",
            "type": "bulleted_list",
            "richText": [
                [
                    "B02 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do "
                ],
                [
                    "import",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " forms work, including aliases and blank imports?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-812f-8b25-c0de803faa2a",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8158-848c-e102635daab0",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "import \"path\"",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " brings a package into scope using its package name."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8101-9e4f-f8746ba4611a",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "import alias \"path\"",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " renames the import locally."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81e9-8697-c99b0c5b5d35",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "import . \"path\"",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " brings exported names into the current package scope (discouraged; harms readability)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81c9-8601-cb5cb8146b5b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "import _ \"path\"",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is a "
                                ],
                                [
                                    "blank import",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    ": it imports only for "
                                ],
                                [
                                    "side effects",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " (runs "
                                ],
                                [
                                    "init()",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "), commonly used to register drivers/plugins."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8150-a84e-e724b5875bbf",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81f2-8d70-f874d0b8945e",
                            "type": "code",
                            "richText": [
                                [
                                    "import (\n    f \"fmt\"\n    _ \"net/http/pprof\"\n)\n\nfunc main() { f.Println(\"ok\") }"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8106-a376-ffbd0b4fdb9f",
            "type": "bulleted_list",
            "richText": [
                [
                    "B03 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is the difference between "
                ],
                [
                    "var",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " declarations and "
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
                    " short variable declarations?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81b7-8484-e1d235f74116",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81d7-a9ed-e071e65442fa",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "var name type",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " declares a variable with an explicit type (or inferred if an initializer exists)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8129-bcf4-fbc0ee7a1bb4",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "name := expr",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is a "
                                ],
                                [
                                    "short variable declaration",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    ":"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8197-9055-eb5971f9e023",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Only valid inside functions."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8175-8837-cc1a4f23cfe5",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Type is inferred from "
                                        ],
                                        [
                                            "expr",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            "."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8168-b92a-ee80c856a77b",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "In the same scope, "
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
                                            " "
                                        ],
                                        [
                                            "redeclares",
                                            [
                                                [
                                                    "b"
                                                ]
                                            ]
                                        ],
                                        [
                                            " variables only if "
                                        ],
                                        [
                                            "at least one",
                                            [
                                                [
                                                    "b"
                                                ]
                                            ]
                                        ],
                                        [
                                            " new variable is introduced; otherwise it is a compile error."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8148-b529-f2107f1403e8",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8188-9680-e8d28e0324be",
                            "type": "code",
                            "richText": [
                                [
                                    "var x int        // x == 0\ny := 10          // inferred int\ny, z := 20, 30   // y reassigned, z newly declared (valid)\n// y := 40        // compile error: no new variables on left side of :="
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-818e-9c45-fe360bd1e1d6",
            "type": "bulleted_list",
            "richText": [
                [
                    "B04 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do "
                ],
                [
                    "const",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " work?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8187-aa4c-f0daaf92fe46",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81be-9861-cf380fb11629",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "const",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " defines compile-time constants (numbers, strings, booleans, and constant expressions)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-812e-b209-dcc5f11c8599",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "iota",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is reset to "
                                ],
                                [
                                    "0",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " at each "
                                ],
                                [
                                    "const",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " block and increments by "
                                ],
                                [
                                    "1",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " per line."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-814b-8131-ea04a1c75eaf",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Untyped constants can be used where different numeric types are required without explicit conversions (until they need a concrete type)."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81ed-9448-c22dd4d80318",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-815b-babb-e2171004e732",
                            "type": "code",
                            "richText": [
                                [
                                    "const (\n    _ = iota\n    KB = 1 << (10 * iota)\n    MB\n    GB\n)"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8147-9de4-cd1f266bd1b8",
            "type": "bulleted_list",
            "richText": [
                [
                    "B05 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are Go’s basic built-in types and their zero values?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81d7-9e42-d90100ae0e66",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81df-b962-e692b022f6cf",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Numeric: "
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
                                    ", "
                                ],
                                [
                                    "int8..int64",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ", "
                                ],
                                [
                                    "uint...",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ", "
                                ],
                                [
                                    "uintptr",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ", "
                                ],
                                [
                                    "float32/64",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ", "
                                ],
                                [
                                    "complex64/128",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " → zero is "
                                ],
                                [
                                    "0",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8123-93cb-e43524a84caf",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "bool",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " → zero is "
                                ],
                                [
                                    "false",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81cb-80d1-c40243f3fd13",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "string",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " → zero is "
                                ],
                                [
                                    "\"\"",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " (empty string, not "
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
                                    ")."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-815a-ba2f-dbc886453d14",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Pointers, slices, maps, channels, functions, interfaces → zero is "
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
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8164-b247-f73dc579f037",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Structs/arrays → zero value is the type with all fields/elements set to their zero values."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81d2-ad69-e46b1d9e7a24",
            "type": "bulleted_list",
            "richText": [
                [
                    "B06 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What’s the difference between a defined type and a type alias, and how do conversions work?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8188-866a-d0dab8da640b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81f6-bac9-cd6ff3514edd",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "type MyInt int",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " creates a "
                                ],
                                [
                                    "defined type",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " distinct from "
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
                                    " (methods can be added; assignments require conversion)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8190-b29e-d8f5e53bcd43",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "type MyInt = int",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " creates a "
                                ],
                                [
                                    "type alias",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " (exactly the same type as "
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
                                    ")."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-814e-b929-c96c2b9e48f3",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Go has "
                                ],
                                [
                                    "explicit conversions",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    ", not implicit numeric casting."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-811f-954d-e0b72cdaac04",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8134-98ee-f25d1291fa6b",
                            "type": "code",
                            "richText": [
                                [
                                    "type MyInt int\ntype YourInt = int\n\nvar a int = 3\nvar b MyInt = MyInt(a) // explicit conversion required\n\nvar c YourInt = a      // no conversion (alias)"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-812f-b876-db2e7f42f911",
            "type": "bulleted_list",
            "richText": [
                [
                    "B07 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do "
                ],
                [
                    "if",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "for",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", and "
                ],
                [
                    "switch",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " work in Go?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8128-bc11-e3bdaab77334",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81e7-910e-cd602f884968",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "if",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " can include a short statement scoped to the "
                                ],
                                [
                                    "if",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ":"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8141-bd9f-d137c259b5b2",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "if v := f(); v > 0 { ... }",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8131-8fa2-f4cf0945a78b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "for",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is the only loop keyword (acts as "
                                ],
                                [
                                    "while",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ", C-style, or infinite loop)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81ac-a718-fb6729910256",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "switch",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " cases don’t fall through by default (use "
                                ],
                                [
                                    "fallthrough",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " explicitly; it jumps to next case body without re-checking)."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81a4-957a-c306a56aea75",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8178-8674-e33c9e0584ae",
                            "type": "code",
                            "richText": [
                                [
                                    "if n := len(s); n == 0 { return }\n\nfor i := 0; i < 10; i++ {}\n\nfor cond() {}\n\nswitch x {\ncase 1, 2:\n    // ...\ndefault:\n    // ...\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8175-89cb-c79b7fc07b66",
            "type": "bulleted_list",
            "richText": [
                [
                    "B08 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do multiple return values work, and what is the blank identifier "
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
                    "?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81ce-9036-d69b56e8b114",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8189-89d1-d24e4bc83b12",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Functions can return multiple values, commonly "
                                ],
                                [
                                    "(value, error)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81fe-b5fc-c457d2017da0",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "_",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " discards a value you don’t need."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8150-afb7-f7bd6b12518e",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8185-bfe7-e37cff162f59",
                            "type": "code",
                            "richText": [
                                [
                                    "v, err := strconv.Atoi(\"42\")\nif err != nil { /* handle */ }\n\n_, err = strconv.Atoi(\"bad\") // ignore v"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81a1-881b-c0f5ab3e3f5c",
            "type": "bulleted_list",
            "richText": [
                [
                    "B09 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are named return values and “naked returns,” and when should you avoid them?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-810a-b9d2-f0e2607197e3",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81f1-b215-d30645d6e239",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Named return values declare result variables in the function signature."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81be-8bd8-f4a5fcc33a1b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A "
                                ],
                                [
                                    "return",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " without arguments returns the current values of those result variables (“naked return”)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81d6-bc45-e94b943b4337",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Avoid naked returns in longer functions because they obscure what is being returned."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8167-9b93-ee215c2d52e6",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8198-aea9-f8e5dbefcfb6",
                            "type": "code",
                            "richText": [
                                [
                                    "func div(a, b int) (q int, err error) {\n    if b == 0 { return 0, fmt.Errorf(\"divide by zero\") }\n    q = a / b\n    return // returns q, err\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8166-a248-e93ecc4ac1ed",
            "type": "bulleted_list",
            "richText": [
                [
                    "B10 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What does "
                ],
                [
                    "defer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " do, and in what order do deferred calls run?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81ee-8e08-dd2133aaa8b4",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81a5-895a-c732268db3c1",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "defer f()",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " schedules "
                                ],
                                [
                                    "f()",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " to run when the surrounding function returns (normal return or panic)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81d4-9749-f340c794f088",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Deferred calls run in "
                                ],
                                [
                                    "LIFO",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " order."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-810d-8f31-f0825a5881ac",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Deferred function arguments are evaluated "
                                ],
                                [
                                    "immediately",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " when the "
                                ],
                                [
                                    "defer",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " statement executes."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81b2-90d1-f0e89940767b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-815a-88f9-cf807d1f88d5",
                            "type": "code",
                            "richText": [
                                [
                                    "func f() {\n    defer fmt.Println(\"third\")\n    defer fmt.Println(\"second\")\n    fmt.Println(\"first\")\n}\n// Output:\n// first\n// second\n// third"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8181-9abe-e69ef80da300",
            "type": "bulleted_list",
            "richText": [
                [
                    "B11 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is Go’s idiomatic error handling pattern?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-813a-9ab7-f06b8db15d38",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81b3-8de1-d6251a47e439",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Functions typically return "
                                ],
                                [
                                    "(T, error)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "; "
                                ],
                                [
                                    "error",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is "
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
                                    " on success."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8178-9c68-ea09d558db26",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Errors are values; do not use exceptions for expected failures."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81b2-a465-ea305dcaa532",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8160-b48e-f190e5851063",
                            "type": "code",
                            "richText": [
                                [
                                    "f, err := os.Open(path)\nif err != nil {\n    return fmt.Errorf(\"open %s: %w\", path, err)\n}\ndefer f.Close()"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8120-9666-dfd8810e1de4",
            "type": "bulleted_list",
            "richText": [
                [
                    "B12 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is the difference between "
                ],
                [
                    "panic",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and returning an "
                ],
                [
                    "error",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "? How does "
                ],
                [
                    "recover",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " work?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81b1-8088-e17ffc2f5cae",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-811d-8027-c027c88d11d8",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Return an "
                                ],
                                [
                                    "error",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " for "
                                ],
                                [
                                    "expected",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " failure modes (bad input, missing file, network failure)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-818c-a53b-eca60a0579cc",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "panic",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " indicates "
                                ],
                                [
                                    "programmer errors",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " or irrecoverable invariants (nil dereference, out-of-bounds, broken assumptions)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-818a-ab5f-ec0760e791ca",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "recover()",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " only stops a panic if called "
                                ],
                                [
                                    "inside a deferred function",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " in the same goroutine as the panic."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8122-8b03-e3271f2b79a1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8120-a301-c0bfdaab0556",
                            "type": "code",
                            "richText": [
                                [
                                    "func safe() (err error) {\n    defer func() {\n        if r := recover(); r != nil {\n            err = fmt.Errorf(\"panic: %v\", r)\n        }\n    }()\n    mayPanic()\n    return nil\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-813a-aa54-fc3066592746",
            "type": "bulleted_list",
            "richText": [
                [
                    "B13 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Arrays vs slices: how are they different semantically?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-815a-a81c-ed72bfce215b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81d8-a561-e2651d20fabe",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "An "
                                ],
                                [
                                    "array",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " "
                                ],
                                [
                                    "[N]T",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " has fixed length "
                                ],
                                [
                                    "N",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " and is a "
                                ],
                                [
                                    "value",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " (assigning copies all elements)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-814b-99ad-c453573491e7",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A "
                                ],
                                [
                                    "slice",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " "
                                ],
                                [
                                    "[]T",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is a descriptor (pointer, length, capacity) referencing an underlying array; assigning copies the descriptor, not the elements."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8111-89d3-d507ee75c6ed",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-813b-a9bd-f50fb0627150",
                            "type": "code",
                            "richText": [
                                [
                                    "a := [3]int{1, 2, 3}\nb := a\nb[0] = 99\n// a[0] == 1, b[0] == 99 (array copy)\n\ns := []int{1, 2, 3}\nt := s\nt[0] = 99\n// s[0] == 99, t[0] == 99 (shared backing array)"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81a6-b9b4-d4ae9b6fcf02",
            "type": "bulleted_list",
            "richText": [
                [
                    "B14 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do "
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
                    ", "
                ],
                [
                    "cap",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "make",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", and "
                ],
                [
                    "append",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " work for slices?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-819a-be9f-fd6c6b44c4b4",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8184-ad43-cc0f6ac16334",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "len(s)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is number of elements visible in the slice."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8107-984f-f115b5b3601e",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "cap(s)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is number of elements available from the slice start to the end of the underlying array."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8116-b0f4-e3e23ec0ffc5",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "make([]T, len, cap)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " allocates an underlying array and returns a slice describing it."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8159-80a5-e46613b695ff",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "append",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " may reallocate to a new underlying array when capacity is insufficient; it returns the new slice."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8158-aba2-ece30c876a73",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-810c-a720-c521a1374419",
                            "type": "code",
                            "richText": [
                                [
                                    "s := make([]int, 0, 2)\ns = append(s, 1, 2)\ns = append(s, 3) // may allocate new backing array"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81a2-b06b-f7f5478e3901",
            "type": "bulleted_list",
            "richText": [
                [
                    "B15 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do maps work, including the “comma ok” idiom and "
                ],
                [
                    "delete",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8163-91eb-d9ba2072c203",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8150-98d0-f9c7c2687bc9",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A map is a hash table: "
                                ],
                                [
                                    "map[K]V",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8165-89c2-fa2b20ab97ca",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Lookup: "
                                ],
                                [
                                    "v, ok := m[k]",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-818b-bb49-c68264c4ae8d",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "ok",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " is "
                                        ],
                                        [
                                            "true",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " only if the key exists."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-816e-9e30-ce438b844ac5",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "If missing, "
                                        ],
                                        [
                                            "v",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " is the zero value of "
                                        ],
                                        [
                                            "V",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            "."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8169-bd15-f8f84f1d0f50",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "delete(m, k)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " removes a key (no-op if missing)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8159-8400-f647eeadef7b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "The zero value of a map is "
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
                                    "; reading from a "
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
                                    " map is safe, writing panics."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81db-81bc-d0afa366a507",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-818d-ab18-d267afe035b3",
                            "type": "code",
                            "richText": [
                                [
                                    "var m map[string]int // nil\n_, _ = m[\"x\"]        // ok (reads as 0)\n\nm = make(map[string]int)\nm[\"x\"] = 1\n\nv, ok := m[\"x\"]\ndelete(m, \"x\")"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81fd-abef-e1859938a576",
            "type": "bulleted_list",
            "richText": [
                [
                    "B16 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do strings, bytes, and runes work in Go?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-814a-bd45-e6b9b9131790",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81a1-80e1-e91f225e8b6e",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A "
                                ],
                                [
                                    "string",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is an immutable sequence of bytes (typically UTF-8 text, but not enforced)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-818e-bf27-dfb2a1982e23",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Indexing a string ("
                                ],
                                [
                                    "s[i]",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ") yields a "
                                ],
                                [
                                    "byte",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81de-a489-d555b8bf0da9",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "rune",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is an alias for "
                                ],
                                [
                                    "int32",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " and represents a Unicode code point."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8139-b0c3-d55afe64c1d9",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "for range",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " over a string decodes UTF-8 and yields runes (and byte indices)."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8171-9f6d-d5ba1f5fbb94",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8150-9848-e290d54a4830",
                            "type": "code",
                            "richText": [
                                [
                                    "s := \"€\"\nfmt.Println(len(s)) // 3 bytes in UTF-8\n\nfor i, r := range s {\n    fmt.Println(i, r) // i is byte index, r is rune\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-818b-855d-c9fa0305b7f2",
            "type": "bulleted_list",
            "richText": [
                [
                    "B17 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is a struct, and how do composite literals work?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-813d-b9c4-dfdbce756d63",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81a8-a7ed-cf6eb4815530",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A struct groups fields under one type: "
                                ],
                                [
                                    "type T struct { ... }",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-813d-88cc-f8cf145e9825",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Composite literals:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81f9-9939-cc282f3ef740",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Positional: "
                                        ],
                                        [
                                            "T{v1, v2}",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " (fragile if fields reorder)"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-810a-8c89-e51ad653e734",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Named: "
                                        ],
                                        [
                                            "T{Field: v}",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " (preferred for clarity)"
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-814e-a311-c40203dfcc30",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8119-80b1-e997e58f1d4a",
                            "type": "code",
                            "richText": [
                                [
                                    "type User struct {\n    ID   int\n    Name string\n}\n\nu1 := User{1, \"Ada\"}\nu2 := User{ID: 2, Name: \"Linus\"}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-816c-be83-e6b98d85a295",
            "type": "bulleted_list",
            "richText": [
                [
                    "B18 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do pointers work in Go, and when are they "
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
                    "?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81b5-81c1-c77d10d46976",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8181-bfc3-d244a03bb37e",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "&x",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " yields the address of "
                                ],
                                [
                                    "x",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8145-ac61-e3f34e964004",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "*p",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " dereferences pointer "
                                ],
                                [
                                    "p",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-812f-9eac-cac2f97699de",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "The zero value of a pointer type is "
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
                                    "; dereferencing "
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
                                    " panics."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-815b-8e8f-cbc5fbd4dea3",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Go does not support pointer arithmetic (outside "
                                ],
                                [
                                    "unsafe",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ")."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8116-a5c3-d45316144b2d",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81c5-8257-da0db9654b00",
                            "type": "code",
                            "richText": [
                                [
                                    "x := 10\np := &x\n*p = 20\n// x == 20"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81ab-a4fe-c89dd7887f1c",
            "type": "bulleted_list",
            "richText": [
                [
                    "B19 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is a method in Go, and what is a receiver?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81c6-921f-dbc2b20ed6f8",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8158-8c7c-edaf1e900f60",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A method is a function with a "
                                ],
                                [
                                    "receiver",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " argument: "
                                ],
                                [
                                    "func (r T) M()",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-815f-8d36-dafcd90a05db",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "In Go, methods can be defined only on a defined (named) type declared in the same package. The receiver must be written as either "
                                ],
                                [
                                    "T",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " or "
                                ],
                                [
                                    "*T",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ", where "
                                ],
                                [
                                    "T",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is that defined type. Methods cannot be defined on built-in types or on types declared in other packages."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8106-8243-ecc9427691ca",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8148-bf0c-ee66343baf1b",
                            "type": "code",
                            "richText": [
                                [
                                    "type Counter int\n\nfunc (c *Counter) Inc() { *c++ }"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8115-b24e-c83a16929804",
            "type": "bulleted_list",
            "richText": [
                [
                    "B20 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is an interface, and how does implicit implementation work?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81dd-9719-faaf36506c29",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81f3-8dc5-de126b3efc39",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "An interface is a set of method signatures."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-817c-b93b-e0405f930a21",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A type implements an interface implicitly by implementing all its methods; there is no "
                                ],
                                [
                                    "implements",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " keyword."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8117-84c2-da473099297f",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "any",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is an alias for "
                                ],
                                [
                                    "interface{}",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8105-b19b-c0dad9ddda92",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-816e-a0b0-dd33390edec3",
                            "type": "code",
                            "richText": [
                                [
                                    "type Stringer interface { String() string }\n\ntype User struct{ Name string }\nfunc (u User) String() string { return u.Name }\n\nvar s Stringer = User{Name: \"Ada\"} // implicit"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8150-848e-d50a195c74bd",
            "type": "bulleted_list",
            "richText": [
                [
                    "B21 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are type assertions and type switches?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81a0-830f-c93373fd6553",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8193-8b12-efd9015089f7",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A type assertion "
                                ],
                                [
                                    "v, ok := x.(T)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " checks whether interface value "
                                ],
                                [
                                    "x",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " holds a concrete value of type "
                                ],
                                [
                                    "T",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8192-a006-fb12056e88f4",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A type switch inspects the dynamic type of an interface."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81a5-8587-f7533044085e",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-813d-adde-ce90278cd327",
                            "type": "code",
                            "richText": [
                                [
                                    "var x any = 42\n\nif v, ok := x.(int); ok {\n    fmt.Println(v)\n}\n\nswitch v := x.(type) {\ncase int:\n    fmt.Println(\"int\", v)\ncase string:\n    fmt.Println(\"string\", v)\ndefault:\n    fmt.Println(\"other\")\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81aa-84f5-f3be34d329d6",
            "type": "bulleted_list",
            "richText": [
                [
                    "B22 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is embedding, and how is it different from inheritance?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8169-8567-e3e549ac7735",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81ca-9c24-f6723b17a49b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Embedding places a type as an anonymous field in a struct."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81f8-94b8-e4d2dfa17d9c",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Embedded fields’ methods can be "
                                ],
                                [
                                    "promoted",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " to the outer type."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81fa-9fc2-ee6976cae863",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "This is composition, not subtype inheritance; it promotes behavior but does not create an “is-a” relationship."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81c5-98ef-d334f288b7ae",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81d9-b28e-d047b05292df",
                            "type": "code",
                            "richText": [
                                [
                                    "type Logger struct{}\nfunc (Logger) Log(msg string) {}\n\ntype Service struct {\n    Logger // embedded\n}\n\nfunc main() {\n    var s Service\n    s.Log(\"hi\") // promoted method\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81f1-9099-e804618709b9",
            "type": "bulleted_list",
            "richText": [
                [
                    "B23 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What’s the difference between "
                ],
                [
                    "new",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "make",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81fb-ad8e-fddcf161d5f4",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81a7-af1d-dd9cfbd9d03d",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "new(T)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " allocates zeroed storage for type "
                                ],
                                [
                                    "T",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " and returns "
                                ],
                                [
                                    "T",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8101-8191-d9ce787f226e",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "make",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " initializes and returns "
                                ],
                                [
                                    "ready-to-use",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " values for slices, maps, and channels:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81d3-b01d-ef4dd49e3dc7",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "make([]T, ...)",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " returns "
                                        ],
                                        [
                                            "[]T",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8130-96dd-c9db5ddd3753",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "make(map[K]V, ...)",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " returns "
                                        ],
                                        [
                                            "map[K]V",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81c2-98a9-d99e847c8405",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "make(chan T, ...)",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " returns "
                                        ],
                                        [
                                            "chan T",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-816e-ba07-c571934bf7ec",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8100-8587-d06590766a2b",
                            "type": "code",
                            "richText": [
                                [
                                    "p := new(int)   // *int, points to 0\ns := make([]int, 3) // []int{0,0,0}\nm := make(map[string]int)\nc := make(chan int, 1)"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8162-a564-d5faa9ee35a0",
            "type": "bulleted_list",
            "richText": [
                [
                    "B24 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is a goroutine, and what is the key practical rule about shared memory?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-819f-9e47-e530029604c3",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81c6-8dc4-fa8c4cb3fec1",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A goroutine is a lightweight concurrent execution unit scheduled by the Go runtime."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8125-a142-d0693f4344c5",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Practical rule: "
                                ],
                                [
                                    "Do not access shared mutable state from multiple goroutines without synchronization",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " (channels, mutexes, atomics), or you have a data race."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8117-9ad5-d6f5c86640fa",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8169-97fd-fe2dd59a0a3c",
                            "type": "code",
                            "richText": [
                                [
                                    "go func() {\n    fmt.Println(\"runs concurrently\")\n}()"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8115-ac38-f6e25490e009",
            "type": "bulleted_list",
            "richText": [
                [
                    "B25 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do channels work (buffered vs unbuffered), and what does "
                ],
                [
                    "close",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " mean?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81b7-9b70-d1a2b7f33067",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81b5-aa7f-e7a521bbb330",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A channel transmits typed values between goroutines."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8198-a375-d60339c38b59",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Unbuffered channel: send and receive synchronize (send blocks until a receiver receives)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8118-8097-fb3513434792",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Buffered channel: sends block only when the buffer is full; receives block when empty."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81f0-9b26-e3ae81944c1e",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "close(ch)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ":"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8194-9fc4-c66426ac781c",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Signals “no more values will be sent.”"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-819a-8aa4-e1b34a62721d",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Receivers can still drain buffered values."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81a5-a744-d1a3285199a3",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Receiving from a closed channel yields the element type’s zero value with "
                                        ],
                                        [
                                            "ok == false",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            "."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-817a-ab16-eb1d1275379c",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Only the sender-side owner should close; closing twice panics."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8118-a5b0-d2c3504084d7",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-818e-a71b-c8d0d59f0503",
                            "type": "code",
                            "richText": [
                                [
                                    "ch := make(chan int, 2)\nch <- 1\nch <- 2\nclose(ch)\n\nfor v := range ch { // drains 1,2 then stops\n    fmt.Println(v)\n}\n\nv, ok := <-ch // v==0, ok==false (already closed and drained)\n_ = v; _ = ok"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81a1-a360-d45f5d255f72",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-8109-93b4-e34fd687f934",
            "type": "header",
            "richText": [
                [
                    "Medium"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-81c2-8b68-fe1ac7086309",
            "type": "bulleted_list",
            "richText": [
                [
                    "M01 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is the "
                ],
                [
                    "context",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " package for, and what are the rules for using it correctly?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81fb-8587-e437c8f5e47e",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-819d-830d-d2490cebac29",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "context.Context",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " carries:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81b9-92c4-c7b7e448e218",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Cancellation ("
                                        ],
                                        [
                                            "Done()",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " channel)"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8160-b3c7-e7702847b2f0",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Deadline ("
                                        ],
                                        [
                                            "Deadline()",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            ")"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8199-9f16-d8381c5068b4",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Error reason ("
                                        ],
                                        [
                                            "Err()",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            ")"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-814f-91ae-ce57af0463e7",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Request-scoped values ("
                                        ],
                                        [
                                            "Value(key)",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            ")"
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8137-8118-ebee845f3f33",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Rules:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8146-9bb2-d7daef2a1a16",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Pass "
                                        ],
                                        [
                                            "ctx",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " as the "
                                        ],
                                        [
                                            "first parameter",
                                            [
                                                [
                                                    "b"
                                                ]
                                            ]
                                        ],
                                        [
                                            ": "
                                        ],
                                        [
                                            "func Do(ctx context.Context, ...)",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            "."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8149-84df-ddfde2508003",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Do not store contexts in structs for later use."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8177-b5ed-e679bf9d3718",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Always call the cancel function returned by "
                                        ],
                                        [
                                            "WithCancel/WithTimeout/WithDeadline",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " to release resources."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8169-9dcd-ed4116383bdd",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Use "
                                        ],
                                        [
                                            "Value",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " only for request-scoped metadata (auth, trace IDs), not for optional parameters."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81f1-a68e-edb6f4fb2024",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8163-a1a6-f5acb3cbfca1",
                            "type": "code",
                            "richText": [
                                [
                                    "ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)\ndefer cancel()\n\nreq, _ := http.NewRequestWithContext(ctx, \"GET\", url, nil)\nresp, err := http.DefaultClient.Do(req)"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-815c-a207-c2a1a3c12142",
            "type": "bulleted_list",
            "richText": [
                [
                    "M02 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do "
                ],
                [
                    "init()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " functions work and in what order do they run?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8106-b49d-cbabb62fa9cf",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81ef-9a65-fd3d70dcbeaf",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Within one package:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-815b-8186-ca8dde3d6fc0",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Package-level variables are initialized in dependency order."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8145-909b-cd232be9510f",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Then "
                                        ],
                                        [
                                            "init()",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " functions run in source order (across files, order is by file dependency; do not rely on file name order)."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-810d-85f7-fe3731aade02",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Across packages:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-810b-b5cc-eeaf6a1d6d59",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Imported packages initialize before the importing package."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8115-b637-cee74b845564",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "The program starts at "
                                        ],
                                        [
                                            "main.main",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " after all inits complete."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81ce-8ce4-d73e218572bb",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81a1-ba64-ee8158f25f0b",
                            "type": "code",
                            "richText": [
                                [
                                    "var x = f() // runs before init()\n\nfunc init() { /* runs after x initialized */ }"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-812e-887a-f8de8454d2f2",
            "type": "bulleted_list",
            "richText": [
                [
                    "M03 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do Go modules resolve versions (Minimal Version Selection), and what is "
                ],
                [
                    "replace",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " used for?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81dc-b40e-fdef4e9200e2",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81c1-8c49-f032623b488d",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Go modules use "
                                ],
                                [
                                    "Minimal Version Selection (MVS)",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    ":"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8176-bde2-f98fe40eb1e7",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "For each module path in the build list, Go chooses the "
                                        ],
                                        [
                                            "highest required",
                                            [
                                                [
                                                    "b"
                                                ]
                                            ]
                                        ],
                                        [
                                            " version across dependencies (not necessarily the latest published)."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-810a-bf4f-cecf6323a7eb",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "replace",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " overrides a module version/path locally (common for forks, local development)."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8179-b1ba-c94dc70feeab",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example (go.mod):",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8108-9463-eca60a746ca8",
                            "type": "code",
                            "richText": [
                                [
                                    "module example.com/app\n\ngo 1.22\n\nrequire example.com/lib v1.4.0\n\nreplace example.com/lib => ../lib"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81b8-831d-e4aa1b5463d4",
            "type": "bulleted_list",
            "richText": [
                [
                    "M04 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is variable shadowing, and why is "
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
                    " a common source of bugs?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8192-8256-d4895696c4eb",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8108-ba1f-c71a7b38aa1e",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Shadowing occurs when an inner scope declares a variable with the same name as an outer scope."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-814f-8dfb-cefdeef942d6",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    ":=",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " can unintentionally create a new variable (especially inside "
                                ],
                                [
                                    "if",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "/"
                                ],
                                [
                                    "for",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "), leaving the outer variable unchanged."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81dd-8523-f322a2e4d156",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example (bug):",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8131-ba2d-ee7a9ce212c2",
                            "type": "code",
                            "richText": [
                                [
                                    "err := do()\nif err != nil { return err }\n\nif err := doAgain(); err != nil { // shadows outer err\n    return err\n}\n// outer err is still whatever it was"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81b3-a165-e430e1f112d3",
            "type": "bulleted_list",
            "richText": [
                [
                    "M05 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Value receiver vs pointer receiver: what are the exact semantics and typical rules?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81df-b49b-e8d6b6490ffe",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81d7-ad4b-db55fd46544c",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Value receiver "
                                ],
                                [
                                    "func (t T) M()",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " receives a "
                                ],
                                [
                                    "copy",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " of "
                                ],
                                [
                                    "T",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-813b-9ddf-c67466ced79d",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Pointer receiver "
                                ],
                                [
                                    "func (t *T) M()",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " can mutate the original value and avoids copying large structs."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81eb-9b4e-f21b074ed7aa",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Typical rules:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8125-ae31-ca6d20ffc06a",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Use pointer receivers if the method mutates state or if "
                                        ],
                                        [
                                            "T",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " is large."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-816c-9a40-f3521c2780a3",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Use consistent receiver types across a type’s methods to avoid surprising method sets."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8141-80cf-df6b0bdf4fdb",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81b3-800a-d8a4bc566c4c",
                            "type": "code",
                            "richText": [
                                [
                                    "type S struct{ n int }\n\nfunc (s S) ByValue()  { s.n++ }   // does not update caller\nfunc (s *S) ByPtr()   { s.n++ }   // updates caller"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81c3-b1a6-fbb4016138b4",
            "type": "bulleted_list",
            "richText": [
                [
                    "M06 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is a method set, and how does it affect interface satisfaction?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8134-9a6c-c236db8a95c7",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8107-b779-fb1a9f049a5d",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Method set determines which methods a type has for assignment/calls:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-814b-a096-f75fcca6ca60",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "For "
                                        ],
                                        [
                                            "T",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            ": methods with receiver "
                                        ],
                                        [
                                            "T",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            "."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-811b-ab6f-e83862c325d5",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "For "
                                        ],
                                        [
                                            "*T",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            ": methods with receiver "
                                        ],
                                        [
                                            "T",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " "
                                        ],
                                        [
                                            "and",
                                            [
                                                [
                                                    "b"
                                                ]
                                            ]
                                        ],
                                        [
                                            " "
                                        ],
                                        [
                                            "*T",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            "."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81e7-942b-e7d0ad417503",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81d7-9002-e77a8a18abc5",
                            "type": "code",
                            "richText": [
                                [
                                    "type I interface{ M() }\ntype T struct{}\nfunc (t *T) M() {}\n\nvar _ I = &T{} // ok\n// var _ I = T{} // compile error"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8102-8595-df14f8b665fe",
            "type": "bulleted_list",
            "richText": [
                [
                    "M07 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is the “typed nil in an interface” trap?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8135-b0f8-d3c8e9ad99c7",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81d4-848e-cfe08850eaa5",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "An interface value is "
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
                                    " only if "
                                ],
                                [
                                    "both",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    ":"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81b7-88ee-c5184f997c66",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Its dynamic type is "
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
                                            ", and"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-812b-894b-fb8b46d73f3a",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Its dynamic value is "
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
                                            "."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81e9-9537-eb66ca61c9d9",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "If you store a typed "
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
                                    " pointer in an interface, the interface itself is "
                                ],
                                [
                                    "non-nil",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " because it has a dynamic type."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-819e-9d42-c7076fd4be07",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8156-bc41-dfb6052d2654",
                            "type": "code",
                            "richText": [
                                [
                                    "type MyErr struct{}\nfunc (*MyErr) Error() string { return \"x\" }\n\nvar p *MyErr = nil\nvar err error = p\nfmt.Println(err == nil) // false (typed nil)"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-819a-b096-e76bed034186",
            "type": "bulleted_list",
            "richText": [
                [
                    "M08 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is the difference between a "
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
                    " slice and an empty slice? When does it matter?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81ec-a367-e1eeddcd0334",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8176-b3c8-d4ae6ca1b4a8",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "nil",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " slice: "
                                ],
                                [
                                    "var s []int",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " ⇒ "
                                ],
                                [
                                    "s == nil",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ", "
                                ],
                                [
                                    "len(s)==0",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ", "
                                ],
                                [
                                    "cap(s)==0",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8191-9d92-ce39938b5e04",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Empty slice: "
                                ],
                                [
                                    "s := []int{}",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " or "
                                ],
                                [
                                    "make([]int,0)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " ⇒ "
                                ],
                                [
                                    "s != nil",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ", "
                                ],
                                [
                                    "len==0",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8194-a195-f49f2c00efe9",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Many APIs treat them the same, but it can matter for:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81a5-b9ca-ec603ca0b288",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "JSON encoding (commonly "
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
                                            " → "
                                        ],
                                        [
                                            "null",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            ", empty → "
                                        ],
                                        [
                                            "[]",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " depending on encoder/struct tags)"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81a5-8fa3-d15f6edaae87",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Exact equality checks ("
                                        ],
                                        [
                                            "s == nil",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " is only true for nil slice)"
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8164-95c2-f157e5ccfb31",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81de-9608-fb0139bedfdb",
                            "type": "code",
                            "richText": [
                                [
                                    "var a []int\nb := []int{}\nfmt.Println(a == nil, len(a)) // true 0\nfmt.Println(b == nil, len(b)) // false 0"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8104-890c-fd5e836a3877",
            "type": "bulleted_list",
            "richText": [
                [
                    "M09 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How can "
                ],
                [
                    "append",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " accidentally overwrite data due to shared backing arrays?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81f2-b2be-ef605e56eeaa",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8184-9d47-ec37643b39e3",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "If two slices share the same underlying array, appending to one "
                                ],
                                [
                                    "within its capacity",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " writes into that same array and can change the other slice’s observed values."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81ae-887e-e6012063b584",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "If append exceeds capacity, it reallocates and breaks sharing."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81aa-999f-edcde4e2cb94",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81a7-8b23-f7fc1a56400c",
                            "type": "code",
                            "richText": [
                                [
                                    "base := []int{1, 2, 3, 4}\na := base[:2]      // [1 2], cap 4\nb := base[2:3]     // [3], shares backing array\n\na = append(a, 99)  // writes into base[2]\nfmt.Println(b[0])  // 99 (was 3)"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-816e-87c6-d2a63d36a612",
            "type": "bulleted_list",
            "richText": [
                [
                    "M10 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What does "
                ],
                [
                    "copy(dst, src)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " guarantee?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8107-91ab-e012f59cc76f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-819b-9305-d6c14227db62",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Copies "
                                ],
                                [
                                    "min(len(dst), len(src))",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " elements."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-817d-ab5e-cd362b15c573",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Works correctly even if "
                                ],
                                [
                                    "dst",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " and "
                                ],
                                [
                                    "src",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " overlap (like "
                                ],
                                [
                                    "memmove",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ")."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8169-869f-f29ceab1d47f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8173-b312-c7dbd6004af7",
                            "type": "code",
                            "richText": [
                                [
                                    "s := []int{1, 2, 3, 4}\ncopy(s[1:], s[:3]) // overlapping copy\nfmt.Println(s)     // [1 1 2 3]"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-815c-8f6f-def13f8e7276",
            "type": "bulleted_list",
            "richText": [
                [
                    "M11 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are the rules for closing channels, and what are the most common mistakes?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-812b-b7e5-d98485a774a7",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81fa-86aa-c428be34ba13",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Only close a channel to signal "
                                ],
                                [
                                    "no more sends",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81b9-ad4a-d3b755799812",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Only the goroutine that “owns” sending should close it (not receivers)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8195-a39e-f0a4b6db695c",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Never send on a closed channel (panic)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8170-ac09-cdae3e82dfcb",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Never close a channel twice (panic)."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81e1-9b52-ee446eb70efe",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example (fan-out pattern):",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8179-ac8e-f646404634a2",
                            "type": "code",
                            "richText": [
                                [
                                    "// Producer closes:\ngo func() {\n    defer close(ch)\n    for _, v := range values { ch <- v }\n}()"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8122-a6be-c8099c5645ac",
            "type": "bulleted_list",
            "richText": [
                [
                    "M12 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How does "
                ],
                [
                    "select",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " behave, including "
                ],
                [
                    "default",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81a1-b1ea-f2c8d48d32ab",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-812d-b027-c79f2e15d918",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "select",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " chooses one ready communication case:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-810b-a8e6-db1ba4613697",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "If multiple are ready, it pseudo-randomly selects one (prevents starvation patterns but not strict fairness guarantees)."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81d4-91ee-ee2feafa23e5",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "If none are ready and there is a "
                                        ],
                                        [
                                            "default",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            ", it executes "
                                        ],
                                        [
                                            "default",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " immediately (non-blocking select)."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8194-b964-d8dd724a1f69",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "If none are ready and no "
                                        ],
                                        [
                                            "default",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            ", it blocks."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8119-a4b0-e3f6a9bbb253",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81f7-8491-f16f6d2d85a1",
                            "type": "code",
                            "richText": [
                                [
                                    "select {\ncase v := <-ch:\n    _ = v\ndefault:\n    // no value available right now\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-813f-9b81-e87b955af884",
            "type": "bulleted_list",
            "richText": [
                [
                    "M13 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do "
                ],
                [
                    "sync.WaitGroup",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " rules prevent races and panics?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81e7-aaa8-c8bc43f0049d",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-811e-8882-c7f637a3ff84",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Call "
                                ],
                                [
                                    "Add(n)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " "
                                ],
                                [
                                    "before",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " launching goroutines (or otherwise ensure no goroutine can call "
                                ],
                                [
                                    "Done",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " before "
                                ],
                                [
                                    "Add",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ")."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8117-9103-c39e558a4975",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Each goroutine must call "
                                ],
                                [
                                    "Done()",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " exactly once per increment."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81ed-a66c-d4913b9bada3",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A "
                                ],
                                [
                                    "WaitGroup",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " must not be copied after first use."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-815e-ac92-c47faf17545b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Counter going negative panics."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-812a-9c42-ef3d570289e3",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81fc-8aae-e54a0705a380",
                            "type": "code",
                            "richText": [
                                [
                                    "var wg sync.WaitGroup\nwg.Add(1)\ngo func() {\n    defer wg.Done()\n    work()\n}()\nwg.Wait()"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-818b-871f-f46ae3d041cb",
            "type": "bulleted_list",
            "richText": [
                [
                    "M14 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " When should you use "
                ],
                [
                    "sync.Mutex",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " vs "
                ],
                [
                    "sync.RWMutex",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-815d-9b8e-f3c2f740699f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8132-8f60-c392df35a2b9",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Mutex",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is simplest and often fastest under contention."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81d7-9d2c-c63a35782466",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "RWMutex",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " helps when:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81b9-8843-e06432cd7a35",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Reads vastly outnumber writes, and"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8135-b265-e2dffe6311d6",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Critical sections are non-trivial."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-819a-9c54-f9b244217c6d",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "RWMutex",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " can underperform if there are many writers or if read sections are short (more bookkeeping)."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81c2-8874-f0ac948b259f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8148-85fd-c784dee86a1f",
                            "type": "code",
                            "richText": [
                                [
                                    "var mu sync.RWMutex\nmu.RLock(); _ = m[k]; mu.RUnlock()\nmu.Lock(); m[k] = v; mu.Unlock()"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8121-ab02-ebaf4beb039a",
            "type": "bulleted_list",
            "richText": [
                [
                    "M15 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How does error wrapping work with "
                ],
                [
                    "%w",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "errors.Is",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", and "
                ],
                [
                    "errors.As",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81a0-98fd-dc3336ac1cce",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8112-92f1-ccf6fbc91585",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "fmt.Errorf(\"...: %w\", err)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " wraps an error (adds context while preserving the original)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8129-b33c-cbec989e8aff",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "errors.Is(err, target)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " checks whether "
                                ],
                                [
                                    "err",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " equals "
                                ],
                                [
                                    "target",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " or wraps something that does."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8111-bf3f-effefc88b12f",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "errors.As(err, &typed)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " extracts a specific error type from a wrap chain."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-811d-8d72-c444c4d14ab8",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8136-9f08-f21a6255ef3b",
                            "type": "code",
                            "richText": [
                                [
                                    "var ErrNotFound = errors.New(\"not found\")\n\nerr := fmt.Errorf(\"load user: %w\", ErrNotFound)\nfmt.Println(errors.Is(err, ErrNotFound)) // true"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-819d-931f-fba549e4f0e3",
            "type": "bulleted_list",
            "richText": [
                [
                    "M16 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do you define a custom error type that supports unwrapping?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8133-a19e-c722f663b2b2",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8172-827b-d904f200b0e8",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Implement "
                                ],
                                [
                                    "Error() string",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8186-a6de-c622c7d33ecf",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Optionally implement "
                                ],
                                [
                                    "Unwrap() error",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " to expose the underlying cause."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-815b-8b09-f441bff39fcf",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8138-8ae9-db0d0919f1df",
                            "type": "code",
                            "richText": [
                                [
                                    "type OpError struct {\n    Op  string\n    Err error\n}\nfunc (e *OpError) Error() string { return e.Op + \": \" + e.Err.Error() }\nfunc (e *OpError) Unwrap() error { return e.Err }"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-811f-843d-fc8d81538050",
            "type": "bulleted_list",
            "richText": [
                [
                    "M17 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Why is "
                ],
                [
                    "defer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " inside hot loops sometimes a performance problem, and what’s a safe alternative?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-813f-830a-cdf9de0acd55",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81bb-82b8-d8ba33a9004b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "defer",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " has overhead (it must record a deferred call for execution on return)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8101-a3ce-c538b60785aa",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "In hot loops, that overhead may be measurable."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8106-805b-db226a9eb8f9",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Alternative: manually call cleanup at the correct time, or factor loop body into a helper function and defer once per iteration in the helper if needed."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81bd-b867-f6e99c982298",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81cf-a021-e56bf9421eba",
                            "type": "code",
                            "richText": [
                                [
                                    "for _, name := range files {\n    f, err := os.Open(name)\n    if err != nil { continue }\n    // prefer:\n    func() {\n        defer f.Close()\n        use(f)\n    }()\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81c7-ac64-ea9b698ebf2d",
            "type": "bulleted_list",
            "richText": [
                [
                    "M18 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is the “loop variable capture” trap with goroutines, and what is the safest pattern?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-815c-be44-e29ac221447c",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8150-96f3-d51bd16ad7de",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Capturing a loop variable in a closure can lead to all goroutines observing an unexpected value."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-817e-9477-d941fe61de02",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Safe pattern (works across versions): pass the variable as a parameter to the goroutine or shadow it inside the loop."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8182-9df8-c2d9e25dc143",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8135-aedf-f9b29018c520",
                            "type": "code",
                            "richText": [
                                [
                                    "for _, v := range vals {\n    v := v // shadow (safe)\n    go func(x int) { fmt.Println(x) }(v)\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-812b-be61-e73dfde839a0",
            "type": "bulleted_list",
            "richText": [
                [
                    "M19 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are the key differences between "
                ],
                [
                    "time.After",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "time.NewTimer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " in long-running systems?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-816a-a259-fd5d6dbf35ba",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81c6-b703-c2f4b25ba749",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "time.After(d)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " allocates a timer and returns its channel; in tight loops it can create many timers."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81ff-83f7-e411bf3a62a7",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "time.NewTimer(d)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " gives explicit control:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-817b-91c7-c9f1d3e6e123",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "You can "
                                        ],
                                        [
                                            "Stop()",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " it and "
                                        ],
                                        [
                                            "Reset()",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " it to reuse a single timer object."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-811f-a96f-dd2c00c50fa3",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "For repeated timeouts in loops, reusing a "
                                ],
                                [
                                    "Timer",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " typically reduces allocations."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8130-87d9-e1b1fbf8d43b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8126-8564-c96019e05cef",
                            "type": "code",
                            "richText": [
                                [
                                    "t := time.NewTimer(time.Second)\ndefer t.Stop()\n\nfor {\n    t.Reset(time.Second)\n    select {\n    case <-t.C:\n        // timeout\n    case <-ctx.Done():\n        return\n    }\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8190-93b1-c0d8e20bd7a4",
            "type": "bulleted_list",
            "richText": [
                [
                    "M20 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do you implement a worker pool with channels?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-816e-bb82-fbf0b4bfbc2b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8164-bbeb-ce0cfaa7f165",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Use:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8197-adca-e35632e68517",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "An input jobs channel"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8198-9af2-e15f2fce8c41",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "A fixed number of worker goroutines that read jobs"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81a9-b30d-e80d64d653b1",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "A "
                                        ],
                                        [
                                            "WaitGroup",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " to wait for all workers to finish"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-810b-b487-cafc139e4007",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Close the jobs channel to signal completion"
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-817b-bb1c-f726c132874b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8179-bac8-ed9513d2e372",
                            "type": "code",
                            "richText": [
                                [
                                    "jobs := make(chan Job)\nvar wg sync.WaitGroup\n\nfor i := 0; i < 4; i++ {\n    wg.Add(1)\n    go func() {\n        defer wg.Done()\n        for j := range jobs { handle(j) }\n    }()\n}\n\ngo func() {\n    defer close(jobs)\n    for _, j := range allJobs { jobs <- j }\n}()\n\nwg.Wait()"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8139-a3b4-d9a0fa76b6fd",
            "type": "bulleted_list",
            "richText": [
                [
                    "M21 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is table-driven testing and why is it idiomatic in Go?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81b7-a6d6-ccd0f2f1fcbf",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8170-a6fa-f73878660850",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Table-driven tests define a slice of test cases and iterate over them."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81f6-9176-fa94060b935f",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Benefits:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81e8-9cdf-e91e29f84740",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Easy coverage expansion"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8107-a51a-f50743eb708f",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Consistent structure"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8110-8b50-efe0bcad7fe7",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Works well with subtests ("
                                        ],
                                        [
                                            "t.Run",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            ")"
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81c9-9a91-f83b1f33ff28",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81d9-9bf1-da1b0fba1ebc",
                            "type": "code",
                            "richText": [
                                [
                                    "func TestAdd(t *testing.T) {\n    cases := []struct{\n        a, b int\n        want int\n    }{\n        {1, 2, 3},\n        {0, 0, 0},\n    }\n\n    for _, tc := range cases {\n        t.Run(fmt.Sprintf(\"%d+%d\", tc.a, tc.b), func(t *testing.T) {\n            if got := Add(tc.a, tc.b); got != tc.want {\n                t.Fatalf(\"got %d, want %d\", got, tc.want)\n            }\n        })\n    }\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8170-90c8-c89707de44a7",
            "type": "bulleted_list",
            "richText": [
                [
                    "M22 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do you write a correct benchmark with "
                ],
                [
                    "testing.B",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-813c-b0f0-e388df8fc837",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81e1-ad34-dbee399e923f",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Put the operation under test inside a loop that runs "
                                ],
                                [
                                    "b.N",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " times."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8130-a171-f4d47ce8cf22",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Avoid counting setup time:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8126-ae34-d17e4ad9987d",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "b.ResetTimer()",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " after setup"
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81c3-95ec-d6da0ac40363",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Avoid compiler elimination:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-812e-9a69-c2010eb94f20",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Store result in a package-level "
                                        ],
                                        [
                                            "var",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " sink."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81b5-88e0-e4de32b3506c",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8154-b5cc-e8079ba9bb8a",
                            "type": "code",
                            "richText": [
                                [
                                    "var sink int\n\nfunc BenchmarkWork(b *testing.B) {\n    data := make([]int, 1_000)\n    b.ResetTimer()\n    for i := 0; i < b.N; i++ {\n        sink = work(data)\n    }\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-816c-8e06-c8045fe19bc6",
            "type": "bulleted_list",
            "richText": [
                [
                    "M23 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What does "
                ],
                [
                    "go test -race",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " detect, and what are its limits?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8131-be16-ec81adead136",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8153-83d0-eef62cd918fc",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Detects data races by instrumenting reads/writes at runtime."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8149-9216-d7ee18398838",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Limits:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-812e-9ad7-f3c86daae78a",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Not a proof of correctness; it detects races that occur in executed paths."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81e4-b3c8-d34bc81112c2",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Adds significant overhead; timing changes can hide/expose races."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8136-92b6-fba5ef4cdf45",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Still one of the most effective tools for finding concurrency bugs."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-812f-8411-f99efc9402da",
            "type": "bulleted_list",
            "richText": [
                [
                    "M24 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do you do basic profiling in Go?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8152-a85b-dded44e59f4b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8156-a8fa-dc3bcd69c9d8",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "CPU profile:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8187-af92-ea6fd8472166",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "go test -cpuprofile cpu.out ./...",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8113-997e-dce8a8a4a887",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "go tool pprof cpu.out",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81d4-be9a-de7fcd124520",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Heap profile:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8198-853c-e1675262c978",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "go test -memprofile mem.out ./...",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81c6-98e6-c4307eaad07b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "For servers, use "
                                ],
                                [
                                    "net/http/pprof",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " to expose endpoints for live profiling."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81db-94b7-dca94304496e",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example (server):",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81b1-8748-fa2ade8140ff",
                            "type": "code",
                            "richText": [
                                [
                                    "import _ \"net/http/pprof\"\n\ngo func() {\n    _ = http.ListenAndServe(\"localhost:6060\", nil)\n}()"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81d4-89f4-ddc1a19698a5",
            "type": "bulleted_list",
            "richText": [
                [
                    "M25 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are generics in Go, and what do constraints do?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8128-bf4f-d0ff79dc4326",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81e6-9379-db1b67754426",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Generics allow type parameters: "
                                ],
                                [
                                    "func F[T any](...)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-813a-845c-fa869167bb51",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A constraint restricts valid types for "
                                ],
                                [
                                    "T",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ":"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8141-98b2-ee64c17b38e0",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "any",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " allows any type."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81ab-a487-f696baaa8aec",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "comparable",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " allows types usable with "
                                        ],
                                        [
                                            "==",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " and "
                                        ],
                                        [
                                            "!=",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " (needed for map keys, set membership)."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8169-928b-dec5f7fa52e8",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Type inference often infers "
                                ],
                                [
                                    "T",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " from arguments."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8132-941d-d3b00469a28e",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81c1-a9ab-cc782f46b682",
                            "type": "code",
                            "richText": [
                                [
                                    "func Contains[T comparable](s []T, x T) bool {\n    for _, v := range s {\n        if v == x { return true }\n    }\n    return false\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-811c-81ba-dbd52466cb19",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-8125-b40a-fa5be5ac6979",
            "type": "header",
            "richText": [
                [
                    "Hard"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-814c-ade2-ca33539479fc",
            "type": "bulleted_list",
            "richText": [
                [
                    "H01 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What does the Go memory model guarantee, and what does it not guarantee?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81f8-b461-cf65787a630f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-815c-a4fa-ee3f862ec0f1",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "It guarantees that within a single goroutine, operations occur in program order."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-811c-bb8e-d8967b256d39",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Between goroutines, reads/writes are only guaranteed to be observed in a specific order when there is a "
                                ],
                                [
                                    "happens-before",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " relationship created by synchronization (mutexes, channels, atomics, etc.)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8137-8dcd-e00edf78bf7d",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Without synchronization, a program has a "
                                ],
                                [
                                    "data race",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " and its behavior is not meaningfully specified by the memory model (you cannot rely on “it works on my machine”)."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8108-8c37-d97ebb79a3f3",
            "type": "bulleted_list",
            "richText": [
                [
                    "H02 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What exactly is a data race in Go?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81e1-8ac3-cc8f2c24800d",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-816f-9625-e5e7e48aab65",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A data race occurs when:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-818d-9259-fd55e50eed29",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Two goroutines access the same variable concurrently,"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81db-9d23-e68b5b31e016",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "At least one access is a write,"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8113-b21d-e04ccf46282c",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "And there is no synchronization that establishes a happens-before ordering between them."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8146-9e29-ecc4a862416b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Consequences:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8125-8fce-d51c9612ce9d",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Observed values can be stale, torn (for some types on some architectures), or appear to violate sequential reasoning."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81e3-9615-c558073ebdfc",
            "type": "bulleted_list",
            "richText": [
                [
                    "H03 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " When should you use "
                ],
                [
                    "sync/atomic",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " instead of a mutex?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8173-9d1f-e7fd6684bc70",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8190-98bc-de593379e60f",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Use atomics for simple shared state when:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81a6-a4f8-ebfbae836872",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "The update/read is expressible as a single atomic operation (e.g., counters, flags, pointers)."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81c0-b433-c4414f12cbff",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "You understand memory ordering requirements."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81c6-945c-f0907a5667bb",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Prefer mutexes when:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8192-8bc4-c2d1e7bb015d",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "You must update multiple fields together (invariant across multiple variables)."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81be-aab4-c11a3b2dd025",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "You need to protect complex structures (maps, slices, structs with relationships)."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8122-b0b4-d5d12b7d1fee",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example (atomic counter):",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8191-9c6d-f0825865bb1e",
                            "type": "code",
                            "richText": [
                                [
                                    "var n atomic.Int64\nn.Add(1)\nv := n.Load()\n_ = v"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81d2-b10f-dcc7ff8fa65e",
            "type": "bulleted_list",
            "richText": [
                [
                    "H04 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do channels establish happens-before relationships?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-813a-8440-ff5c54bf80a2",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8129-8eb8-fe55a93c8e5b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A successful send on a channel happens-before the corresponding receive completes."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8125-a0d0-da3cde18e991",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Closing a channel happens-before a receive that returns "
                                ],
                                [
                                    "ok == false",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " observes the close."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8163-b93b-c7e34b66c43b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "This makes channels both a communication mechanism and a synchronization primitive."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8112-91fb-dca232e2b545",
            "type": "bulleted_list",
            "richText": [
                [
                    "H05 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How does using a "
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
                    " channel in "
                ],
                [
                    "select",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " help structure concurrent code?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81ba-9088-c5dc988c296b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-817a-9f1b-e39d2d8c7ceb",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Sending to or receiving from a "
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
                                    " channel blocks forever."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-817f-8728-e5cb97a41d54",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "In a "
                                ],
                                [
                                    "select",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ", a case with a "
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
                                    " channel is effectively disabled."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8143-9e2f-fab9d9cfd1f0",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "This enables dynamic enabling/disabling of select cases without extra conditionals."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81e4-ae57-d4a9e58699ab",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-810c-865b-de6275d38a46",
                            "type": "code",
                            "richText": [
                                [
                                    "var out chan<- int // nil disables the send case\n\nselect {\ncase out <- 1:\n    // only possible when out is non-nil\ncase <-ctx.Done():\n    return\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-814c-b946-ec84a387026f",
            "type": "bulleted_list",
            "richText": [
                [
                    "H06 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is the most common "
                ],
                [
                    "context",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "related goroutine leak, and how do you prevent it?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8153-95cd-d51db84f20de",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81a4-8397-d5170c0f2ff6",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Leak pattern: a goroutine blocks forever on send/receive/work because cancellation is not observed."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81c2-bfcb-e300d6ddbcd4",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Prevention:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81e7-b1b2-d6a7ee2c4e90",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Always select on "
                                        ],
                                        [
                                            "ctx.Done()",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " in blocking loops."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8180-97b9-dca2823a84d4",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Ensure downstream operations accept context (I/O, RPC)."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81ac-acbc-fec042b0fdf1",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Always call the cancel function to release timers/resources in derived contexts."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8136-b3e4-e497d754973b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81bf-bdae-caf1d8e25635",
                            "type": "code",
                            "richText": [
                                [
                                    "for {\n    select {\n    case job := <-jobs:\n        _ = job\n    case <-ctx.Done():\n        return\n    }\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-813b-8726-fe1baac9b0e0",
            "type": "bulleted_list",
            "richText": [
                [
                    "H07 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is escape analysis, and how does it affect allocations?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-816d-8be1-dda39dab9b84",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8140-9a55-f002fbce4051",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Escape analysis determines whether a value can be safely allocated on the stack."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8193-9262-d82f6650f842",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "If the compiler cannot prove the value doesn’t outlive the function (e.g., returned pointer, stored in heap, captured by closure), it "
                                ],
                                [
                                    "escapes",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " and is allocated on the heap."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-810a-89eb-de6fd9bcfb41",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Inspect with: "
                                ],
                                [
                                    "go build -gcflags=-m",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " (or "
                                ],
                                [
                                    "m=2",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " for more detail)."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81ae-b1f8-ece2d5ba96a1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example (likely escape):",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8127-ab17-e1e3b26588a4",
                            "type": "code",
                            "richText": [
                                [
                                    "func New() *int {\n    x := 1\n    return &x // x must live after return ⇒ heap\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81ae-9b7b-caecc342b65f",
            "type": "bulleted_list",
            "richText": [
                [
                    "H08 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do goroutine stacks work (growth and implications)?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8160-bc0a-f954d9cc9a89",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-811c-992f-e2ff60604a05",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Goroutine stacks start small and grow/shrink dynamically."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81c0-b51a-cf557ca4b2d7",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "The runtime can copy a goroutine’s stack during growth, so you must not keep raw pointers into stack memory outside safe rules (especially when using "
                                ],
                                [
                                    "unsafe",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ")."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8170-a48c-f0df463257e6",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Deep recursion can still overflow, but dynamic stacks allow far more goroutines than OS threads."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-815b-acb7-e6396e491f6c",
            "type": "bulleted_list",
            "richText": [
                [
                    "H09 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How does Go’s garbage collector work at a high level, and what is "
                ],
                [
                    "GOGC",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8142-81f7-f97596709d0a",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8179-9677-d50bf8186938",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Go GC is a concurrent, tri-color mark-and-sweep collector with short stop-the-world (STW) phases."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81bf-8b46-c392a23b9290",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "GOGC",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " controls GC frequency:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-813b-a06f-fcad4e82fa5c",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Higher "
                                        ],
                                        [
                                            "GOGC",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " ⇒ allow more heap growth ⇒ fewer GC cycles but more memory usage."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8149-97c7-c7b87eb841bf",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Lower "
                                        ],
                                        [
                                            "GOGC",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " ⇒ more frequent GC ⇒ potentially lower memory but more CPU overhead."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8197-ac85-d9ea919c163e",
            "type": "bulleted_list",
            "richText": [
                [
                    "H10 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are the exact semantics of "
                ],
                [
                    "sync.Pool",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8164-8fb2-f391958cf76a",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8167-a027-f42f0160fac4",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "sync.Pool",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is for "
                                ],
                                [
                                    "temporary",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " objects to reduce allocations."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81d8-ad7a-d245cfd034cf",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "The GC is allowed to clear pooled items at any time during a collection cycle."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-811a-9b06-d1a65cbb1e6e",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "You must assume:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8190-be6e-fa249feb29dc",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Items may disappear."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-818b-bd9a-e16fbbc7b8d5",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Items may be reused by any goroutine."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81ff-9c55-c65ba63736b6",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Do not use "
                                ],
                                [
                                    "sync.Pool",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " for long-lived caches or resources requiring finalization."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8177-8789-e541f06a52ba",
            "type": "bulleted_list",
            "richText": [
                [
                    "H11 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Why is concurrent access to a plain Go "
                ],
                [
                    "map",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " unsafe, even for “concurrent reads and occasional writes”?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81ec-a57c-fbdd0ab2e1ce",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-815a-ba60-f85690726698",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Go’s built-in map implementation is not designed for concurrent mutation."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-814e-bb2d-c90d008e57dc",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Any concurrent write with any other map operation (read or write) is a data race and can trigger runtime failures (including “concurrent map iteration and map write”)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81e2-a271-f174d609b60b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Use:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8139-b388-edc2c4f831cd",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "sync.Mutex",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            "/"
                                        ],
                                        [
                                            "RWMutex",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " around a map, or"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81aa-acf5-d0d0978bd708",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "sync.Map",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " for specific read-mostly patterns."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81e9-a9f6-c81d2f23fa5e",
            "type": "bulleted_list",
            "richText": [
                [
                    "H12 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Why is map iteration order not stable, and why should you never depend on it?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8116-8b57-fc3396fe4a7a",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81ab-a61b-e8e0258356ab",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Map iteration order is intentionally unspecified and can vary between runs and even across iterations as the map grows."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8190-b020-d0e724bf1f0b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Depending on it causes nondeterministic behavior and flaky tests."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8134-ae26-da739bbb3c7a",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "If deterministic order is needed, extract keys, sort, then iterate."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81cd-bc95-f90fc6bf5b54",
            "type": "bulleted_list",
            "richText": [
                [
                    "H13 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is the “sub-slice memory retention” problem for slices, and how do you fix it?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8126-8693-dd8ccc5569ae",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8149-accc-ca0607adddb2",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A sub-slice references the same underlying array, so it can keep a large array alive even if you only need a small portion."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8184-9875-e3ab2d56dfbc",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Fix by copying into a new slice with minimal capacity."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8173-99e6-fd05edb56991",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-817c-a9da-d550ddd33afe",
                            "type": "code",
                            "richText": [
                                [
                                    "big := make([]byte, 10<<20) // 10MB\nsmallView := big[:10]       // retains 10MB backing array\n\nsmall := append([]byte(nil), smallView...) // copy; releases big when no longer referenced\n_ = small"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-818f-8029-c98d490537f0",
            "type": "bulleted_list",
            "richText": [
                [
                    "H14 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Do substring operations on strings copy data? What is the retention pitfall?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8151-93ec-ee692a3558fd",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8182-8a6a-ccf39ca2cb4c",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Slicing a string (e.g., "
                                ],
                                [
                                    "s[i:j]",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ") creates a new string header referencing the same underlying bytes (no copy)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81b6-a6c5-c1593bf99a37",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Pitfall: a small substring can keep a large original string alive."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8180-9529-dba912119618",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Fix: force a copy (e.g., "
                                ],
                                [
                                    "strings.Clone",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " or "
                                ],
                                [
                                    "string([]byte(sub))",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ")."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8189-af89-e5fa32d07f89",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-816d-998a-c84c7907f8ff",
                            "type": "code",
                            "richText": [
                                [
                                    "sub := s[i:j]                 // shares backing bytes\nsub = strings.Clone(sub)      // forces copy (when available)"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81de-9421-d96af53d26b5",
            "type": "bulleted_list",
            "richText": [
                [
                    "H15 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is the internal shape of an interface value, and why can interfaces allocate?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81f4-aea2-f516d5cfa06f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81fc-8f58-eeaa7c230dc6",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Conceptually, an interface value contains:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8102-8394-c99e44fef6e8",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "A pointer to type information (method table / type descriptor)"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81f9-883f-f9734364dc01",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "A pointer to the data (or the data itself for some representations)"
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81c9-b797-d671a261d17c",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Assigning a non-pointer, non-small value into an interface can require boxing, potentially causing an allocation depending on escape analysis and usage."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81ed-ac1c-e6a261f6a7d1",
            "type": "bulleted_list",
            "richText": [
                [
                    "H16 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What’s the difference between a method value and a method expression?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81f6-a8cb-f475aa577ea1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81bc-bf44-c4119357ae8b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Method value binds a receiver and produces a function of remaining args; it can allocate if it must capture the receiver."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81e9-9de6-e58b10f14af3",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Method expression does not bind; it produces a function that takes the receiver explicitly as the first argument."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81db-94f7-f14808c82dfd",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8131-b67e-f74356d9a511",
                            "type": "code",
                            "richText": [
                                [
                                    "type T struct{}\nfunc (T) M(int) {}\n\nvar t T\nf1 := t.M      // method value: func(int)\nf2 := T.M      // method expression: func(T, int)\n\nf1(1)\nf2(t, 1)"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81f5-965b-c1682d8534f2",
            "type": "bulleted_list",
            "richText": [
                [
                    "H17 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are the core safety rules when using "
                ],
                [
                    "reflect",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to set a value?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8165-a7ed-c5ad6f7f6eea",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81ad-9138-d4ab91215953",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "To set a value via reflection:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81cf-8a60-f321fdb0c8b8",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "You need a "
                                        ],
                                        [
                                            "reflect.Value",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " that is "
                                        ],
                                        [
                                            "addressable",
                                            [
                                                [
                                                    "b"
                                                ]
                                            ]
                                        ],
                                        [
                                            " and "
                                        ],
                                        [
                                            "settable",
                                            [
                                                [
                                                    "b"
                                                ]
                                            ]
                                        ],
                                        [
                                            "."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-817d-93e3-cc39052047f6",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Typically you must pass a pointer into "
                                        ],
                                        [
                                            "reflect.ValueOf",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            ", then call "
                                        ],
                                        [
                                            "Elem()",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            "."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-818c-ad8e-c522a4b8dbae",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8137-96fa-d92536ddf753",
                            "type": "code",
                            "richText": [
                                [
                                    "x := 0\nv := reflect.ValueOf(&x).Elem()\nv.SetInt(42)"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81dc-952c-d3df0f64f45a",
            "type": "bulleted_list",
            "richText": [
                [
                    "H18 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are the key "
                ],
                [
                    "unsafe",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " pointer conversion rules you must not violate?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8113-a9fb-c3efcc4d121e",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8104-8574-f738f45cae2d",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "You may convert between "
                                ],
                                [
                                    "T",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " and "
                                ],
                                [
                                    "unsafe.Pointer",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81b6-957b-cd44019a1b76",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "You may convert "
                                ],
                                [
                                    "unsafe.Pointer",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " to "
                                ],
                                [
                                    "uintptr",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " only for arithmetic/temporary use, and you must not let the GC lose track of the original pointer."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81d6-a501-fa39b0eb034c",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "You must not store a "
                                ],
                                [
                                    "uintptr",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " derived from a pointer and later convert it back after a GC point (the object may move logically due to stack growth or become unreachable)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81ae-926a-fd8275125bdd",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "You must obey alignment rules for the target type."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8196-b1fd-c3cbaa53e0ab",
            "type": "bulleted_list",
            "richText": [
                [
                    "H19 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Explain Go’s scheduler model (G-M-P) and what "
                ],
                [
                    "GOMAXPROCS",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " controls."
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81b1-b3e1-f8ad4fa5757f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-817f-a59b-f6cf76eb503b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "G",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    ": goroutine (the work)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81a2-bb68-dccd401a2550",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "M",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    ": OS thread (executes goroutines)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81fd-87b0-cca68236375c",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "P",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    ": processor context (owns run queues, scheduler state)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8152-842a-e82484c83812",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "GOMAXPROCS",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " controls the number of "
                                ],
                                [
                                    "P",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " available, which limits how many goroutines can run "
                                ],
                                [
                                    "simultaneously",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " (parallelism), not how many can exist."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81f6-9d6b-c4cd4d8998b9",
            "type": "bulleted_list",
            "richText": [
                [
                    "H20 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What happens when a goroutine blocks in a syscall (e.g., disk/network) and why does it matter?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81ac-825b-d8beabd70f75",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8155-b5af-c2b4d29a7f3e",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "If a goroutine blocks in a syscall, the underlying OS thread may block."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81ec-a2ec-c47ddc07fa50",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "The runtime can create or repurpose other threads to keep other goroutines running, as long as there are available "
                                ],
                                [
                                    "P",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "s."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8112-b124-dfa1713349c2",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "This is why Go can multiplex many goroutines despite blocking operations."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8115-aa8c-ecc959357a8f",
            "type": "bulleted_list",
            "richText": [
                [
                    "H21 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are the most common causes of deadlocks in Go?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-814f-8d55-e0665c12a07b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8111-91dd-cddea9f8505a",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Unbuffered channel send/receive without a matching receiver/sender."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-812c-bd82-d5cc089d84d6",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Waiting on a "
                                ],
                                [
                                    "WaitGroup",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " whose counter never reaches zero."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81dd-8295-c910d91e87d4",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Lock ordering inversion (goroutine A holds "
                                ],
                                [
                                    "mu1",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " then waits for "
                                ],
                                [
                                    "mu2",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "; goroutine B holds "
                                ],
                                [
                                    "mu2",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " then waits for "
                                ],
                                [
                                    "mu1",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ")."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8130-95ff-e16893abc13f",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Sending on a channel that no goroutine receives from (or that is "
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
                                    ")."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8104-824c-d5226925935f",
            "type": "bulleted_list",
            "richText": [
                [
                    "H22 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How does "
                ],
                [
                    "net/http",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " server concurrency work by default?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81e1-b215-ceff4d7fcc84",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81c4-b0e3-f161461f508d",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "The server accepts connections and serves them concurrently."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-811c-84ef-cc7e6a93ac7f",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Each request is handled in its own goroutine (exact internal structure varies by protocol and version, but the key model is concurrent request handling)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-813f-a5c7-f6f70223874c",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Request cancellation is propagated via "
                                ],
                                [
                                    "Request.Context()",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " (client disconnects or server timeouts can cancel the context)."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81c5-bfe1-eb99dff2a79a",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-815b-9221-ea68af31e144",
                            "type": "code",
                            "richText": [
                                [
                                    "http.HandleFunc(\"/\", func(w http.ResponseWriter, r *http.Request) {\n    select {\n    case <-r.Context().Done():\n        return\n    default:\n        // work\n    }\n})"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-810c-b06a-fa7125d78d3f",
            "type": "bulleted_list",
            "richText": [
                [
                    "H23 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are "
                ],
                [
                    "encoding/json",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " performance pitfalls that matter in interviews?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81eb-98ab-c27a3ab110d4",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81e9-9f09-daa41868d5ce",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Reflection-based encoding/decoding allocates; repeated use in hot paths can be expensive."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81fa-ba6c-fe18208c9252",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "map[string]any",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " decoding is flexible but slower and less type-safe than decoding into structs."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81ee-94c5-ee26f4ae5dcf",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "omitempty",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " omits zero values (including empty slices/maps) which can affect API semantics."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81ac-836a-da299fcf6f01",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Custom "
                                ],
                                [
                                    "MarshalJSON/UnmarshalJSON",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " gives control but must be correct and efficient."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-813b-b359-fd01d3c23dc4",
            "type": "bulleted_list",
            "richText": [
                [
                    "H24 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How does Go fuzzing work at a practical level?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81e7-8d3a-f0065e9c87a8",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81dc-a82c-ff9097dd5089",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Fuzz tests ("
                                ],
                                [
                                    "func FuzzXxx(*testing.F)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ") generate inputs to find crashes, hangs, and invariant violations."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81ae-b0b9-f6102b348e5c",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "You seed with representative examples and define the property/invariants."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8114-9e4c-feb19e7ffc0e",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Fuzzing is most effective for parsers, encoders/decoders, and state machines."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-81bc-96ee-f49a6fce91c3",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8105-a793-d308ce82eb31",
                            "type": "code",
                            "richText": [
                                [
                                    "func FuzzParse(f *testing.F) {\n    f.Add(\"seed\")\n    f.Fuzz(func(t *testing.T, s string) {\n        _ = Parse(s) // should not panic\n    })\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8158-9370-dc6bb160ab8e",
            "type": "bulleted_list",
            "richText": [
                [
                    "H25 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do build tags, "
                ],
                [
                    "internal",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " packages, and "
                ],
                [
                    "go:generate",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " help maintain real-world Go codebases?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-815e-a49e-deb2a395d1e1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81a9-92c7-f3c597819dd3",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Build tags ("
                                ],
                                [
                                    "//go:build ...",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ") select files for specific OS/arch/features."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8147-854f-db5e30bb54f4",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "internal/",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " packages enforce import boundaries (only parent subtree can import), preventing API sprawl."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-813d-9b44-c86abacba969",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "//go:generate",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " records code generation steps in source control and makes them reproducible via "
                                ],
                                [
                                    "go generate",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81cc-917c-c430392c1735",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-813c-8d59-d83594c42445",
            "type": "header",
            "richText": [
                [
                    "Expert"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8155-a28f-efd634382057",
            "type": "bulleted_list",
            "richText": [
                [
                    "E01 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is the difference between "
                ],
                [
                    "GOGC",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "GOMEMLIMIT",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", and how do they interact in production?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81b7-b451-fed4f34713bf",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81fb-965c-f71c1a7c52c5",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "GOGC",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " sets the target heap growth percentage that influences GC frequency (CPU vs memory trade-off)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8164-8c52-cd73d11aab81",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "GOMEMLIMIT",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " (and "
                                ],
                                [
                                    "runtime/debug.SetMemoryLimit",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ") sets a soft memory ceiling for the runtime; the GC pacer will try to keep memory under that limit by increasing GC aggressiveness."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8129-a9c8-efb9846fd804",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "In practice:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8171-9d0b-e660655edb2f",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "GOMEMLIMIT",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " is used to respect container limits."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-815f-bb27-c247bbce03cb",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "GOGC",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " tunes throughput vs memory within that ceiling."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81b8-aaa7-c676215cf7b3",
            "type": "bulleted_list",
            "richText": [
                [
                    "E02 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is the GC write barrier, and why does it matter for performance and correctness?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8154-8604-fee0e8134330",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81cd-8931-df5c7035b094",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "During concurrent marking, the runtime must maintain correctness when pointers are mutated."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8117-b65a-f440c3ff86b7",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A write barrier records pointer updates so the GC does not miss reachable objects (preserves the tri-color invariant)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81f6-b38e-fb5b60263622",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Implications:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8189-822a-d68fcb614854",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Pointer-heavy writes can be more expensive during mark phases."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8152-ae9a-d722898869fe",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "unsafe",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " code that hides pointers from the GC can break correctness (use-after-free, memory corruption)."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8180-91c6-c6135cb01d9d",
            "type": "bulleted_list",
            "richText": [
                [
                    "E03 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Why are finalizers ("
                ],
                [
                    "runtime.SetFinalizer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ") considered a last resort?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-812b-ab29-ef4663f318f4",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81a5-8c75-cbd3736067c5",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Finalizers run at an unspecified time after an object becomes unreachable (or may not run before program exit)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8136-9328-f8ec90ec0a45",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "They can resurrect objects, complicating reasoning."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8135-a1df-ff3e384c3145",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "They add GC overhead and nondeterminism."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81a6-91f5-e08d8d11bae1",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Prefer explicit "
                                ],
                                [
                                    "Close()",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " and resource ownership patterns."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-812d-83ef-cdf095a1135c",
            "type": "bulleted_list",
            "richText": [
                [
                    "E04 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What do you need to know about "
                ],
                [
                    "sync.Mutex",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " behavior under contention (including starvation)?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8117-b03a-f3bd6bbbbacf",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8127-9c2a-fbf58a0de555",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Under contention, mutex implementations balance throughput and fairness."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81fe-81e7-fdd533ba89ab",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Go’s mutex can enter a starvation-avoidance mode under specific contention patterns to prevent a goroutine from being perpetually delayed."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8107-862e-f23e5cd53134",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Practical outcome:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8160-85a2-f6625b7ccc47",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Heavily contended locks can dominate CPU time; reduce contention via sharding, reducing critical section size, or using lock-free/atomic patterns where appropriate."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-813e-a1cd-c8fd98baba96",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Measure using mutex/block profiles (not guesses)."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-819e-8898-c4cc2169f5d2",
            "type": "bulleted_list",
            "richText": [
                [
                    "E05 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do channels work internally at a conceptual level, and what does "
                ],
                [
                    "close",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " actually do?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81cb-bf16-ddeb34a936c5",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8151-a56c-d9aa4a9cd7a0",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A channel maintains:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81da-b6de-c06843ffb576",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "A buffer (for buffered channels)"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-816e-a180-db4a28677149",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Queues of waiting senders and receivers"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81f4-94fa-f1df75b3bc2c",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "A closed flag"
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81bf-ade7-d844c89609ee",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Send:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81e5-b2a8-c250499d56da",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "If a receiver is waiting, it hands off directly."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-811b-a429-ffef9bdee573",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Else if buffer has space, enqueue."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81d4-a8cd-f958ba4e9027",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Else block the sender."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81a1-902a-f16d365cb771",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Close:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8134-bb40-e8013d7983ee",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Sets closed flag and wakes blocked receivers/senders appropriately."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81bf-9a4c-d8b9b0332628",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Receivers drain buffered values, then receive zero values with "
                                        ],
                                        [
                                            "ok == false",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            "."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81c1-99f8-e03bc3ed670a",
            "type": "bulleted_list",
            "richText": [
                [
                    "E06 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Why can "
                ],
                [
                    "make(map[K]V, hint)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " improve performance, and what are its limits?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81fa-87fb-d15e5224bc73",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-816e-8e4f-d6855e60dd73",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "The hint lets the runtime allocate an initial table sized to reduce growth/rehash steps as you insert elements."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8194-a9c8-c9696b9d86dd",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Limits:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81ea-b2a1-d75d7af4271c",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "It is a hint, not a guarantee."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81eb-abaf-ea5a33724f52",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Overestimating can waste memory; underestimating increases growth work."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8144-867b-d8dd7ce1a37c",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-814b-9207-cc21c49d0dbd",
                            "type": "code",
                            "richText": [
                                [
                                    "m := make(map[string]int, 10_000) // reduces rehashing if you really insert ~10k keys"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-813c-95db-f8de61d57dc1",
            "type": "bulleted_list",
            "richText": [
                [
                    "E07 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " When is "
                ],
                [
                    "sync.Map",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " the right choice, and what are the tradeoffs?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-818c-b187-e255f9ccee0b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81d0-a6d1-d6709d6d4686",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Best for:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81e2-9fa0-f862bdf2f44e",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Read-mostly workloads"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81aa-8933-e657f911a4d0",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Keys that are stable (rare deletes/overwrites)"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81ed-b238-e31b800e54fe",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "High contention scenarios where a single mutex is a bottleneck"
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8101-b4b6-f453c68e04f0",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Tradeoffs:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-815f-8f9c-eff5aad8e298",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "More complex semantics and overhead for write-heavy workloads"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8179-a3b4-c17ca64f2c9e",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Type assertions needed (it stores "
                                        ],
                                        [
                                            "any",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            ")"
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8105-b536-c331a8d31f9b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "For general-purpose maps with balanced reads/writes, a "
                                ],
                                [
                                    "map",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " protected by "
                                ],
                                [
                                    "RWMutex",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is often better."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8136-a388-fd7ffa7962a1",
            "type": "bulleted_list",
            "richText": [
                [
                    "E08 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What memory-ordering guarantees do Go atomics provide, and why does it matter?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-812a-8428-e28d62013e03",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8185-aa28-de95b9d8457c",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Atomic operations establish synchronization that can create happens-before relationships (for the atomic variable in question)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-813b-bee4-e756a3a6d877",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Correct lock-free designs require that:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-813a-9792-f438d9b7670f",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Writers publish data before publishing a pointer/flag that makes it visible."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8162-be46-d9541ff16f43",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Readers load visibility flags/pointers atomically before consuming referenced data."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81d0-8b23-c4d0041a423c",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Misordered atomics can produce rare, architecture-dependent failures."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81d3-aad1-c49656b5fede",
            "type": "bulleted_list",
            "richText": [
                [
                    "E09 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is the ABA problem in lock-free programming, and how is it typically mitigated?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81c6-8bb4-ceae41715053",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-817e-8ae1-df27c49fbfb0",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "ABA occurs when:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-810e-aef0-c20294268a7b",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "A pointer/value changes from A → B → A, and a compare-and-swap sees “A” again and incorrectly assumes nothing changed."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81d4-a061-e66d8a119539",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Mitigations:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81e0-b664-fcb762536a9d",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Version tagging (A becomes (ptr, counter))"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8133-a881-e7f300d73285",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Hazard pointers / epoch-based reclamation (advanced; ensures safe memory reclamation)"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8196-bb84-e61d0041e08a",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Avoiding reuse of nodes without a safe reclamation scheme"
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8107-bb66-e51155dd9701",
            "type": "bulleted_list",
            "richText": [
                [
                    "E10 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are Go type sets and the "
                ],
                [
                    "~",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " operator in constraints?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8108-bada-d968875f12d2",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8150-8111-e8526818084c",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A constraint can be an interface whose elements form a "
                                ],
                                [
                                    "type set",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " (the set of permitted types for a type parameter)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8168-9c14-c984dc4f7234",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "~T",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " means “any type whose underlying type is "
                                ],
                                [
                                    "T",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ".”"
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8157-b81c-e3fc786999ad",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81cf-831e-c122d0767035",
                            "type": "code",
                            "richText": [
                                [
                                    "type IntLike interface {\n    ~int | ~int64\n}\n\nfunc Sum[T IntLike](s []T) T {\n    var total T\n    for _, v := range s { total += v }\n    return total\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8162-ae20-e7a45a9888d9",
            "type": "bulleted_list",
            "richText": [
                [
                    "E11 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How are Go generics implemented at runtime/compile time, and what are the performance implications?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8170-bffd-f4d635de61a5",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-812d-b7dd-e4cf14ff3213",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Go does not implement generics via reflection-based type erasure."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-810c-98c1-d416936e6e25",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "The compiler generates code that operates over representations (“shapes”) and supplies type-specific information via dictionaries where needed."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-817a-844f-edfb9fda02c5",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Implications:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8169-9d57-ed0e0bd8c972",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Often close to handwritten code, but some operations may involve dictionary lookups rather than fully specialized machine code in every case."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81d2-a1f4-ff8020b9dd68",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Allocation behavior still depends on escape analysis; generics do not inherently allocate."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-813b-9617-f20a1f6fece4",
            "type": "bulleted_list",
            "richText": [
                [
                    "E12 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How does the module checksum database (sumdb) protect builds, and when do "
                ],
                [
                    "GOPRIVATE",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " / "
                ],
                [
                    "GONOSUMDB",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " matter?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81b9-ae69-e334292cb467",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8179-be38-e3e29e5c4e48",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "The checksum database allows verifying that a module version’s content matches a known cryptographic checksum, preventing tampering."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8128-86c7-c3035462dfe3",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "For private modules, you typically set:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8112-8363-f77279834826",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "GOPRIVATE",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " to mark module paths as private (affects proxy and sumdb usage)."
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81c0-abc8-e505071e7f4b",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "GONOSUMDB",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " to skip sumdb for specific paths if needed."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81ea-ad1f-d7604a1420f6",
            "type": "bulleted_list",
            "richText": [
                [
                    "E13 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are the most important cgo rules and pitfalls for Go runtime correctness?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-816a-9769-fff686f21a43",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81f9-9135-ea4e60680f98",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "cgo calls are expensive (cross-language boundary, scheduler/stack considerations)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8110-97c4-f2e9302677e2",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Pointer passing rules:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81b4-af6c-d85f9dfe33df",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "You generally must not pass Go pointers to C if C will keep them beyond the call, unless using specific supported mechanisms."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8186-bccf-f5b8fe6e1878",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Thread affinity:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-817d-8097-eb53771d28d2",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Some C libraries require a stable OS thread; use "
                                        ],
                                        [
                                            "runtime.LockOSThread()",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " carefully (it reduces scheduler flexibility)."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8179-93fd-c8276e5eb2f5",
            "type": "bulleted_list",
            "richText": [
                [
                    "E14 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What does "
                ],
                [
                    "runtime.LockOSThread()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " do, and when is it justified?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81be-9b38-c7dd05fc3990",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8163-bd4b-d0259a9331d7",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "It pins the current goroutine to its current OS thread until it unlocks."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81b9-ab30-c5e0fc8e7dbf",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Justified for:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-818c-9a4c-da312debff0f",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Interacting with thread-affine C APIs (GUI toolkits, certain TLS/OpenGL contexts)."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8185-b934-f3c47c3f4f84",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Costs:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-815c-b5b1-c98159552c03",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Reduces scheduling flexibility; too many locked threads can harm performance."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81ce-9945-de41a26008d8",
            "type": "bulleted_list",
            "richText": [
                [
                    "E15 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How does "
                ],
                [
                    "io.Copy",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " achieve high performance, and what interfaces does it leverage?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-819c-8e57-cb40892a6114",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81bd-800f-df4aa4340405",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "io.Copy(dst, src)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " checks whether:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-819a-a7e5-e9b601483e4c",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "src",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " implements "
                                        ],
                                        [
                                            "io.WriterTo",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " ("
                                        ],
                                        [
                                            "WriteTo(w)",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            "), or"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8109-82b4-f74d7b9ae7a7",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "dst",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " implements "
                                        ],
                                        [
                                            "io.ReaderFrom",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " ("
                                        ],
                                        [
                                            "ReadFrom(r)",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            "),"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-819d-a0b8-f0ee6108a0d6",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "and uses those for optimized transfers (often zero-copy-ish via kernel syscalls in some implementations)."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8150-bcbd-f6c4fd91cde1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-818e-9ecf-c60e2d70a9c8",
                            "type": "code",
                            "richText": [
                                [
                                    "// Many types (e.g., *os.File) implement ReaderFrom/WriterTo for fast paths.\nn, err := io.Copy(dst, src)\n_ = n; _ = err"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8151-aad6-facc6e002cd7",
            "type": "bulleted_list",
            "richText": [
                [
                    "E16 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is the “functional options” pattern, and why is it widely used in Go APIs?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-812b-9061-e92e130083da",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81e4-945f-d52020de4442",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "It represents optional configuration as functions that mutate a private config struct."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81f3-9296-c941f6832a0d",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Benefits:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-815c-bee7-c1240fcbc5f1",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Avoids combinatorial constructors"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8182-81f3-c28765f4aea6",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Preserves backward compatibility when adding new options"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-819c-9ce5-e3d945797464",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Keeps zero-value defaults meaningful"
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8152-9e1b-cf7db9b06fc1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81ce-b2ec-cc097296f76d",
                            "type": "code",
                            "richText": [
                                [
                                    "type Option func(*Config)\ntype Config struct{ Timeout time.Duration }\n\nfunc WithTimeout(d time.Duration) Option {\n    return func(c *Config) { c.Timeout = d }\n}\n\nfunc New(opts ...Option) *Client {\n    cfg := Config{Timeout: time.Second}\n    for _, opt := range opts { opt(&cfg) }\n    return &Client{cfg: cfg}\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8128-b124-f726bc94f620",
            "type": "bulleted_list",
            "richText": [
                [
                    "E17 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Why is “store context in a struct” considered a design smell?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8100-9c7e-d00faaa1f0c7",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-810c-afba-e65f30006056",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Context is request-scoped and cancellation-scoped."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8198-bf80-d603be30f3a5",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Storing it in a long-lived object risks:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8180-a127-fd093d246b2f",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Using a canceled context for unrelated requests"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-813c-b1cd-de5b39a0b280",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Retaining values longer than intended"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81fb-bb2a-d5a6f09a2991",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Making lifetimes unclear"
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8186-8ccc-c2364a522ed8",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Preferred: pass "
                                ],
                                [
                                    "ctx",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " explicitly through call chains."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8165-9d8f-f651399603ad",
            "type": "bulleted_list",
            "richText": [
                [
                    "E18 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are best practices for designing interfaces in Go (especially for testability)?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8135-9e14-f3cb6f3690bb",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81d8-b0a1-dfc763f7dee4",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Keep interfaces small and consumer-defined (“accept interfaces, return concrete types”)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-815f-8ddf-f2ec46c491cc",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Define interfaces at the point of use (caller side) when possible."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8100-90a7-c105e91049d0",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Prefer behavior-focused method names that match "
                                ],
                                [
                                    "io",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " patterns."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8179-a20d-f3e722ae6518",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81f2-bf04-dfed16210d1b",
                            "type": "code",
                            "richText": [
                                [
                                    "// Consumer-defined:\ntype Store interface {\n    Get(ctx context.Context, id string) (User, error)\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8181-8fc4-fa1df7cb2a78",
            "type": "bulleted_list",
            "richText": [
                [
                    "E19 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What is the most common misuse of "
                ],
                [
                    "errors.New",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " sentinel errors in large systems?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8135-a637-ea57fe0303c1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8178-a201-d294495c47cf",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Comparing errors by string or creating new errors repeatedly and expecting equality:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8177-b6ba-c2016d999be7",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "errors.New(\"x\") == errors.New(\"x\")",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " is false (different values)."
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81f7-9b9c-de5e1dbbe035",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Correct approaches:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8153-ba5c-cccd27c47adb",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Use a package-level sentinel variable and "
                                        ],
                                        [
                                            "errors.Is",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            ", or"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81ab-bb71-c7fb0d1ecd85",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Use typed errors and "
                                        ],
                                        [
                                            "errors.As",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            "."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81c3-b538-c372c369b163",
            "type": "bulleted_list",
            "richText": [
                [
                    "E20 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How does the default "
                ],
                [
                    "http.Client",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " behave, and what are the production-grade timeout rules?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-816e-b099-ede08d4be060",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81b9-9ad8-f82a6c903d82",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "http.Client{}",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is usable; it uses a shared "
                                ],
                                [
                                    "Transport",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " with connection pooling."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-811b-a742-fdbe76e1b759",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Production rules:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-816c-a13f-f42bd2b5b0f9",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Always use timeouts:"
                                        ]
                                    ],
                                    "children": [
                                        {
                                            "id": "2ef24eb1-ed54-8154-a5b9-fbbaa08e634e",
                                            "type": "bulleted_list",
                                            "richText": [
                                                [
                                                    "Prefer request-scoped timeouts via "
                                                ],
                                                [
                                                    "Request.Context()",
                                                    [
                                                        [
                                                            "c"
                                                        ]
                                                    ]
                                                ]
                                            ]
                                        },
                                        {
                                            "id": "2ef24eb1-ed54-8123-9ab0-f86a70ba62df",
                                            "type": "bulleted_list",
                                            "richText": [
                                                [
                                                    "Consider "
                                                ],
                                                [
                                                    "http.Client.Timeout",
                                                    [
                                                        [
                                                            "c"
                                                        ]
                                                    ]
                                                ],
                                                [
                                                    " as an overall bound (but be aware it includes body reading)"
                                                ]
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81d1-a347-c339ab2c348e",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Reuse clients/transports; creating one per request prevents connection reuse and can exhaust resources."
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8122-9242-f0527ea3e84b",
            "type": "bulleted_list",
            "richText": [
                [
                    "E21 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What does "
                ],
                [
                    "runtime/trace",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " show that CPU profiles don’t?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-81cc-919f-ee229ea47d70",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81ea-b486-e87e13f9bbc9",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Execution traces show:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8105-9aeb-ecc390bf1809",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Goroutine scheduling events"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81a9-89ba-c454ac67a8bf",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Blocking reasons (syscalls, channels, mutexes)"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81c5-8a38-f865b8d597cb",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Network poller events"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-816f-bcc7-c66698a5d88b",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "GC events correlated with application activity"
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81bb-b94b-dc3d004d383b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Useful for diagnosing latency, contention, and scheduler-induced stalls."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-812d-bcdb-c5d8f6d74fe8",
            "type": "bulleted_list",
            "richText": [
                [
                    "E22 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " In heap profiling, what is the difference between “inuse” and “allocs” views?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8123-b8b1-efdc1fb3a34d",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-819d-8707-e411f74638f0",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "“Inuse” shows memory currently retained (what contributes to RSS/heap size)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81f7-9137-c639496722c3",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "“Allocs” shows cumulative allocations over time (what contributes to GC pressure)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-811c-9254-f9ef0a9d08ac",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Optimization strategy differs:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-8195-8b19-c5a769a61218",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Large inuse: reduce retained object graphs / avoid retention"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8167-8e9d-f03630d56f5e",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Large allocs: reduce allocation rate / reuse buffers / preallocate"
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81b1-a230-f0fb18715aec",
            "type": "bulleted_list",
            "richText": [
                [
                    "E23 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " How do you minimize struct padding and why might it matter for performance?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8127-b778-ed70d8772d7b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81fc-9ed1-f75d8b43464a",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Go aligns fields; padding is inserted to satisfy alignment."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-8179-9cdb-c3c65c3b3b9b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Reordering fields can reduce size, improving cache utilization and reducing GC scanning work for pointer-heavy structs."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8165-be38-da4ab8f06ff8",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code example:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-8196-9515-d607553ec9aa",
                            "type": "code",
                            "richText": [
                                [
                                    "// Potentially larger due to padding:\ntype A struct {\n    b byte\n    i int64\n}\n\n// Often smaller:\ntype B struct {\n    i int64\n    b byte\n}"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8157-80c4-c17686bdc2b8",
            "type": "bulleted_list",
            "richText": [
                [
                    "E24 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are precise, high-impact ways to reduce GC pressure in Go services?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8106-ab64-c0a7bf371893",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81d8-b61c-f6a3191c7406",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Reduce allocation rate:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81d2-9246-f964669f0aa0",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Reuse "
                                        ],
                                        [
                                            "[]byte",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " buffers (carefully manage ownership)"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-81db-bda8-e65b9f8ad0b6",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Use "
                                        ],
                                        [
                                            "bytes.Buffer",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " / "
                                        ],
                                        [
                                            "strings.Builder",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " with "
                                        ],
                                        [
                                            "Grow",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8166-8ce3-ea92d3ef0b58",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Avoid "
                                        ],
                                        [
                                            "fmt.Sprintf",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            " in hot paths (prefer "
                                        ],
                                        [
                                            "Append",
                                            [
                                                [
                                                    "c"
                                                ]
                                            ]
                                        ],
                                        [
                                            "style APIs, builders, or structured logging)"
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81f3-b4ff-d398cd6de25b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Reduce retention:"
                                ]
                            ],
                            "children": [
                                {
                                    "id": "2ef24eb1-ed54-81d8-a0a0-cafe4f71f6a6",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Copy small subslices/substrings out of large backings"
                                        ]
                                    ]
                                },
                                {
                                    "id": "2ef24eb1-ed54-8186-ba8b-e9300670215d",
                                    "type": "bulleted_list",
                                    "richText": [
                                        [
                                            "Avoid global caches of large object graphs unless bounded and necessary"
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-818d-ab8f-d875c0ea2217",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Measure using allocation profiles ("
                                ],
                                [
                                    "memprofile",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ", pprof allocs) and benchmarks."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-81a5-8fb6-f06691418924",
            "type": "bulleted_list",
            "richText": [
                [
                    "E25 — Question:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " What are “advanced standard-library traps” that experienced Go engineers watch for?"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8154-a199-da28e664855c",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Answer:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2ef24eb1-ed54-81d9-ada9-cdb65a441a57",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "time.After",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " in tight loops creates many timers; prefer reusable "
                                ],
                                [
                                    "time.Timer",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-811c-bf88-c736147cd41a",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "sync.Mutex",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " and "
                                ],
                                [
                                    "sync.WaitGroup",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " must not be copied after first use (copying breaks correctness)."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-81b7-89bc-f00416aba76c",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "math/rand",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " top-level functions share a global source guarded by synchronization; for high concurrency, prefer per-goroutine "
                                ],
                                [
                                    "rand.Rand",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " with its own "
                                ],
                                [
                                    "Source",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    "."
                                ]
                            ]
                        },
                        {
                            "id": "2ef24eb1-ed54-816d-88c5-dd1289ac9814",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "context.Value",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " lookups are linear in the number of wrapped contexts; keep values minimal and shallow."
                                ]
                            ]
                        }
                    ]
                }
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
