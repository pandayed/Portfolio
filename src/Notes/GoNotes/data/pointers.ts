import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8046-a462-c0176675768d",
    "slug": "pointers",
    "title": "Pointers",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "c033f3d5-be59-5c4f-a32b-85dc25451ef4",
            "type": "text",
            "richText": [
                [
                    "A pointer value identifies a variable. "
                ],
                [
                    "*int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a pointer type, "
                ],
                [
                    "&x",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " takes an address, and "
                ],
                [
                    "*p",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " accesses the pointed-to variable."
                ]
            ]
        },
        {
            "id": "9317aff1-5dc8-5da9-ae00-749b6b4ca605",
            "type": "text",
            "richText": [
                [
                    "Unless a block declares functions or types, examples below are function-body excerpts using fmt."
                ]
            ]
        },
        {
            "id": "f678a08c-62eb-5ede-90b5-6fa906b78ba5",
            "type": "sub_header",
            "richText": [
                [
                    "Declaring and using pointers"
                ]
            ]
        },
        {
            "id": "dacc80eb-d402-57fb-a813-903929d20b99",
            "type": "code",
            "richText": [
                [
                    "x := 10\nvar p *int = &x\nfmt.Println(*p) // 10\n*p = 20\nfmt.Println(x)  // 20\n\ny := 5\nq := &y\nfmt.Println(*q) // 5"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "96138b1d-b29e-51a2-a24c-994f76a44a45",
            "type": "sub_header",
            "richText": [
                [
                    "Nil and pointers to pointers"
                ]
            ]
        },
        {
            "id": "53206999-b37c-5273-8df1-13fb5638d8a2",
            "type": "code",
            "richText": [
                [
                    "var p *int\nfmt.Println(p == nil) // true\n// fmt.Println(*p)    // panics: p is nil\n\nx := 10\np = &x\npp := &p\nfmt.Println(**pp) // 10"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "4a6712a7-6aa8-5912-8e04-0b8e92558106",
            "type": "sub_header",
            "richText": [
                [
                    "Passing a pointer by value"
                ]
            ]
        },
        {
            "id": "1a8a12f1-f0fe-5357-979a-e70df9317c58",
            "type": "text",
            "richText": [
                [
                    "Go copies arguments into parameters, including pointer values. Copying a pointer preserves access to the same variable. Reassigning the parameter itself does not replace the caller’s pointer."
                ]
            ]
        },
        {
            "id": "b540d455-c0dc-525e-9f0a-c2d316ef2af6",
            "type": "code",
            "richText": [
                [
                    "func increment(n *int) {\n    (*n)++\n}\n\nfunc incrementExample() {\n    x := 5\n    increment(&x)\n    fmt.Println(x) // 6\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "28a59d15-d7bb-5661-8b0d-2c00744bd543",
            "type": "sub_header",
            "richText": [
                [
                    "Pointers to structs"
                ]
            ]
        },
        {
            "id": "f16d9fdf-11d2-5ceb-8f3c-50c0e544dc3a",
            "type": "code",
            "richText": [
                [
                    "type User struct { Name string }\n\nfunc changeName(u *User) {\n    u.Name = \"Alice\" // same field access as (*u).Name\n}\n\nfunc changeNameExample() {\n    user := User{Name: \"Bob\"}\n    changeName(&user)\n    fmt.Println(user.Name) // Alice\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "7286b5f1-53eb-5ac8-8487-4b29b0632538",
            "type": "text",
            "richText": [
                [
                    "Construction and fields: "
                ],
                [
                    "Structs",
                    [
                        [
                            "a",
                            "#/notes/go/struct"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "08cdd5dd-96df-5ba8-a6e7-4fcedf77cc4e",
            "type": "sub_header",
            "richText": [
                [
                    "new(T) and addresses of literals"
                ]
            ]
        },
        {
            "id": "270cd0ac-70a5-532b-9296-3094f592e0f7",
            "type": "text",
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
                    " creates a zero-initialized variable of type T and returns "
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
                    ". Taking the address of a composite literal creates a pointer to a value initialized by that literal."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80b5-95d9-df4055bd2d54",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1",
                "col-2"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "c05b6d8f-a8dc-599c-9b6b-4d0c7e0328a3",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Expression"
                            ]
                        ],
                        "col-1": [
                            [
                                "Pointer type"
                            ]
                        ],
                        "col-2": [
                            [
                                "Initial pointed-to value"
                            ]
                        ]
                    }
                },
                {
                    "id": "62811742-41f9-5a33-a493-4891b14b7d88",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "new(int)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "*int",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-2": [
                            [
                                "0",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "9a785181-518d-5528-8436-d71168497a1f",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "new(Point)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "*Point",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-2": [
                            [
                                "Point{X: 0, Y: 0}",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "304ea705-4744-5f47-b90d-4b75fbb1ced2",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "&Point{X: 1, Y: 2}",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "*Point",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-2": [
                            [
                                "The specified fields"
                            ]
                        ]
                    }
                },
                {
                    "id": "9d473be7-e7ac-5b05-ad8e-ba72b8e7155b",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "new([]int)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "*[]int",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-2": [
                            [
                                "A nil slice"
                            ]
                        ]
                    }
                },
                {
                    "id": "9d99d03c-576c-5f0c-a688-d14fea7f3fdf",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "&[]int{}",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "*[]int",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-2": [
                            [
                                "A non-nil empty slice"
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "38099d50-0061-5049-8b32-4c781ead99b4",
            "type": "code",
            "richText": [
                [
                    "type Point struct { X, Y int }\n\nfunc pointerConstruction() {\n    x := new(int)\n    fmt.Println(*x) // 0\n    *x = 42\n    fmt.Println(*x) // 42\n\n    p := &Point{X: 1, Y: 2}\n    fmt.Println(p.X) // 1\n\n    s := &[]int{1, 2, 3}\n    fmt.Println((*s)[0]) // 1\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "d9e9d268-84bf-5f6a-a771-6514d4b518ba",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use new(T) when the zero value is the desired starting point. Use a composite literal when explicit field or element values make construction clearer."
                ]
            ]
        },
        {
            "id": "52d7737e-dab6-59b8-b640-191dd5d74cf6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Composite literal syntax applies to structs, arrays, slices and maps. "
                ],
                [
                    "&int{}",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is not valid. An existing integer variable can be addressed with "
                ],
                [
                    "&x",
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
            "id": "a80d9e70-6e98-5db3-888a-b65b0465f357",
            "type": "bulleted_list",
            "richText": [
                [
                    "Neither form promises heap allocation. Placement depends on compiler analysis and how the value is used."
                ]
            ]
        },
        {
            "id": "575972fa-4e90-5836-a78b-c07840eedf5c",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Built-in new",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/builtin#new"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "a7901b7d-8485-593b-9df6-2b30ae26e494",
            "type": "sub_header",
            "richText": [
                [
                    "Copied values and shared storage"
                ]
            ]
        },
        {
            "id": "f666ffe6-c513-509c-90d0-6cd5c534272a",
            "type": "text",
            "richText": [
                [
                    "A slice value describes backing storage; map and channel values refer to their respective data structures. Passing them still copies a value. Element updates can affect shared storage, while reassigning a parameter does not reassign the caller’s variable."
                ]
            ]
        },
        {
            "id": "34f56cfc-72e6-5909-a8ec-a87fd319c36d",
            "type": "code",
            "richText": [
                [
                    "func changeFirst(s []int) {\n    s[0] = 100       // modifies a shared element; requires a non-empty slice\n    s = s[:0]        // changes only this local slice value\n}\n\nfunc sliceArgument() {\n    values := []int{1, 2}\n    changeFirst(values)\n    fmt.Println(values, len(values)) // [100 2] 2\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "ab561547-528e-53a0-b1b1-14a8360886be",
            "type": "text",
            "richText": [
                [
                    "Return an updated slice when a function appends or changes its length and the caller needs that slice value. Arrays are copied as whole values."
                ]
            ]
        },
        {
            "id": "7e5d6164-c7f5-53dd-85e2-df5db060b64d",
            "type": "text",
            "richText": [
                [
                    "Backing storage, copying and append: "
                ],
                [
                    "Slices & Arrays",
                    [
                        [
                            "a",
                            "#/notes/go/slices-arrays"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "1de1e274-5b54-5b0c-8490-ccf48a703f72",
            "type": "sub_header",
            "richText": [
                [
                    "Pointer arithmetic and unsafe"
                ]
            ]
        },
        {
            "id": "5ccba88d-0dda-5a95-bb53-9683ded3a8ec",
            "type": "text",
            "richText": [
                [
                    "Ordinary Go pointers do not support arithmetic such as p++ or p+1. unsafe.Pointer permits restricted conversions between pointer types and other unsafe operations. It does not remove the documented validity requirements."
                ]
            ]
        },
        {
            "id": "33d6da38-d7ff-5f4a-a713-f8e7c929e337",
            "type": "text",
            "richText": [
                [
                    "Package-scope declarations, using unsafe: this example converts between pointer types whose base types have the same layout. This particular conversion also works directly as "
                ],
                [
                    "(*int)(p)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "; unsafe is unnecessary here and is shown only to explain the syntax."
                ]
            ]
        },
        {
            "id": "a6a38abb-b213-5d06-a25b-312a53c3e6a3",
            "type": "code",
            "richText": [
                [
                    "type Counter int\n\nfunc counterPointer(p *Counter) *int {\n    return (*int)(unsafe.Pointer(p))\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "a6d60dc0-f171-55f3-a34d-5e3703e2da20",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "unsafe.Pointer conversion restrictions",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/unsafe#Pointer"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "900b8f2c-8c77-5562-9a3e-c29a5a93b1fa",
            "type": "sub_header",
            "richText": [
                [
                    "Choosing pointers and lifetime"
                ]
            ]
        },
        {
            "id": "dec84052-81fe-5a1e-8d71-af2019b48027",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use pointers for mutation, shared identity, optional values represented by nil, or avoiding a copy when that fits the API. A pointer to a basic type can be appropriate for an optional field."
                ]
            ]
        },
        {
            "id": "7573f22f-b1ec-555e-b392-61a660681aaa",
            "type": "bulleted_list",
            "richText": [
                [
                    "Garbage collection manages memory lifetime. A reachable pointer keeps its referenced Go object reachable; reclamation is not immediate when the last reference disappears."
                ]
            ]
        },
        {
            "id": "da9e1b3d-d11e-5472-9df0-8fcc0ba31fcb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pointers do not provide synchronization. Concurrent access to shared mutable data still needs coordination."
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
