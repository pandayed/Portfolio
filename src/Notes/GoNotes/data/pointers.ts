import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8046-a462-c0176675768d",
    "slug": "pointers",
    "title": "Pointers",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "c033f3d5-be59-5c4f-a32b-85dc25451ef4",
            "type": "bulleted_list",
            "richText": [
                [
                    "A pointer holds the address of a variable."
                ]
            ]
        },
        {
            "id": "001093b9-435c-5de1-8d2a-61e4163e11a2",
            "type": "bulleted_list",
            "richText": [
                [
                    "*int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " means a pointer to an "
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
                    "."
                ]
            ]
        },
        {
            "id": "82067d59-e477-59e7-ac70-74b362efb1d6",
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
                    " gets the address of "
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
            "id": "1096bb56-984c-51e4-a845-e436950f2f6f",
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
                    " reads or changes the variable at the address in "
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Go copies arguments into function parameters. This includes pointers."
                ]
            ]
        },
        {
            "id": "cb60fd0d-8350-5b2d-b1ef-eadbd575392f",
            "type": "bulleted_list",
            "richText": [
                [
                    "The copied pointer still points to the same variable."
                ]
            ]
        },
        {
            "id": "0b456034-4cfa-5917-a3fe-9ec22ffcb364",
            "type": "bulleted_list",
            "richText": [
                [
                    "Changing the local pointer does not change the caller’s pointer."
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
                    " creates a variable of type "
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
                    " with its zero value."
                ]
            ]
        },
        {
            "id": "888cdf28-c1a8-5628-ba8b-2c73309a6a6c",
            "type": "bulleted_list",
            "richText": [
                [
                    "It returns a pointer of type "
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
        },
        {
            "id": "c6099e98-3ca2-56e4-8f66-6e308aaa73bf",
            "type": "bulleted_list",
            "richText": [
                [
                    "A composite literal, such as "
                ],
                [
                    "Point{X: 1}",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", sets the starting fields or elements."
                ]
            ]
        },
        {
            "id": "0a17bda4-347b-5231-82a4-d37292a27124",
            "type": "bulleted_list",
            "richText": [
                [
                    "Taking its address, such as "
                ],
                [
                    "&Point{X: 1}",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", returns a pointer to that value."
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
                                "Starting value"
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
                    "Use "
                ],
                [
                    "new(T)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " when you want to start with the zero value."
                ]
            ]
        },
        {
            "id": "e7d7419c-62a2-51cd-b035-e88a00369492",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a composite literal when you want to set fields or elements at creation."
                ]
            ]
        },
        {
            "id": "52d7737e-dab6-59b8-b640-191dd5d74cf6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Composite literals work with structs, arrays, slices and maps."
                ]
            ]
        },
        {
            "id": "5e1fcf5f-2348-502f-a853-3fe4ff88a411",
            "type": "bulleted_list",
            "richText": [
                [
                    "&int{}",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is invalid because "
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
                    " is not a composite type."
                ]
            ]
        },
        {
            "id": "2f171e7d-b7f2-54ae-b6f2-955bc2d35e82",
            "type": "bulleted_list",
            "richText": [
                [
                    "For an existing integer variable "
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
                    ", use "
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
                    " to get its address."
                ]
            ]
        },
        {
            "id": "a80d9e70-6e98-5db3-888a-b65b0465f357",
            "type": "bulleted_list",
            "richText": [
                [
                    "Neither form guarantees that the variable is stored on the heap."
                ]
            ]
        },
        {
            "id": "64fd8ea4-9e1d-5d53-9b92-4f2b75d05342",
            "type": "bulleted_list",
            "richText": [
                [
                    "The heap is memory managed by garbage collection. The compiler decides where to store the variable based on its use."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A slice describes part of an array. Copying the slice does not copy that array."
                ]
            ]
        },
        {
            "id": "40943c03-9a0d-5a9b-817b-4a3303054a57",
            "type": "bulleted_list",
            "richText": [
                [
                    "Copies of a map or channel value also use the same map or channel."
                ]
            ]
        },
        {
            "id": "9bc9e528-0477-564c-92e6-6a627125ab59",
            "type": "bulleted_list",
            "richText": [
                [
                    "Passing these values to a function still copies the value."
                ]
            ]
        },
        {
            "id": "3e2ecb2a-cbbd-5cef-a5c3-e84a1b9d0a7a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Changing a shared slice element or map entry can affect the caller’s data."
                ]
            ]
        },
        {
            "id": "e6a626a2-530d-55e3-9e04-54e0115d6512",
            "type": "bulleted_list",
            "richText": [
                [
                    "Assigning a new value to the parameter does not replace the caller’s variable."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Return the updated slice if the caller needs its new length or the result of "
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
                    "."
                ]
            ]
        },
        {
            "id": "db315636-99e5-5297-a843-f942f988dde7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Passing an array copies the whole array."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Ordinary Go pointers do not support arithmetic such as "
                ],
                [
                    "p++",
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
                    "p+1",
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
            "id": "c42c548a-43ce-5147-b544-f1c3c0a63952",
            "type": "bulleted_list",
            "richText": [
                [
                    "unsafe.Pointer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " allows some pointer conversions that ordinary pointers do not."
                ]
            ]
        },
        {
            "id": "60da5f83-eb82-5eb6-b5c6-7a0d1e9be5d6",
            "type": "bulleted_list",
            "richText": [
                [
                    "These operations must still follow the rules in the unsafe package documentation."
                ]
            ]
        },
        {
            "id": "33d6da38-d7ff-5f4a-a713-f8e7c929e337",
            "type": "bulleted_list",
            "richText": [
                [
                    "Counter",
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
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " use the same memory layout here."
                ]
            ]
        },
        {
            "id": "17e96d37-d730-539f-b5f9-648703b23995",
            "type": "bulleted_list",
            "richText": [
                [
                    "This conversion also works directly as "
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
                    ". It does not need "
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
                    "."
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
                    "Use a pointer when a function must change the original variable."
                ]
            ]
        },
        {
            "id": "40b2d582-1e81-5bd2-9f10-bf012c5061ad",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use pointers when several places need to share the same value or when copying a large value is unsuitable."
                ]
            ]
        },
        {
            "id": "37f31fe4-3fc6-54be-852a-d3104adb259a",
            "type": "bulleted_list",
            "richText": [
                [
                    "A nil pointer can represent a missing optional value. This also applies to basic types such as "
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
                    "."
                ]
            ]
        },
        {
            "id": "7573f22f-b1ec-555e-b392-61a660681aaa",
            "type": "bulleted_list",
            "richText": [
                [
                    "Garbage collection frees memory that the program can no longer reach."
                ]
            ]
        },
        {
            "id": "22ddc83a-ab5b-5bef-83ac-313f8f28d820",
            "type": "bulleted_list",
            "richText": [
                [
                    "A reachable pointer keeps the object it points to reachable."
                ]
            ]
        },
        {
            "id": "03930cb1-1f88-5a13-9763-95197446f127",
            "type": "bulleted_list",
            "richText": [
                [
                    "Removing the last reference does not free the memory immediately."
                ]
            ]
        },
        {
            "id": "da9e1b3d-d11e-5472-9df0-8fcc0ba31fcb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pointers do not protect data from simultaneous access."
                ]
            ]
        },
        {
            "id": "04818507-0df9-57c1-81f5-a06b81b55366",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a lock or another form of synchronization when goroutines share data and at least one changes it."
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
