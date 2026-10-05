import type { GoNote } from '../types';

const note = {
    "notionId": "24e24eb1-ed54-8016-bb3f-e11fa478ed00",
    "slug": "generics",
    "title": "Generics",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "9df65395-5da9-50ca-9bea-4078b7215fe9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Generics were introduced in Go 1.18."
                ]
            ]
        },
        {
            "id": "19697865-2e03-5d96-8bb2-ab7d7cea37fc",
            "type": "bulleted_list",
            "richText": [
                [
                    "A type parameter is a placeholder for a type, such as "
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
            "id": "7b6383f2-b406-52a4-9056-37d980f35db9",
            "type": "bulleted_list",
            "richText": [
                [
                    "A constraint limits which types can replace that placeholder."
                ]
            ]
        },
        {
            "id": "e8ee96ea-e312-5303-abf6-79db6523d723",
            "type": "bulleted_list",
            "richText": [
                [
                    "The constraint also decides which operations the generic code can use."
                ]
            ]
        },
        {
            "id": "6cfd359d-4f77-5d42-804f-6377d1527c68",
            "type": "sub_header",
            "richText": [
                [
                    "Generic functions and inference"
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-807e-a81e-ccdd7fe5b57b",
            "type": "code",
            "richText": [
                [
                    "func PrintSlice[T any](s []T) {\n    for _, v := range s {\n        fmt.Println(v)\n    }\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "6cffdb29-f655-5b8d-b076-5ec5ded93b10",
            "type": "bulleted_list",
            "richText": [
                [
                    "[T any]",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " declares the type parameter "
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
            "id": "bb9e6123-fe27-58f7-a2ab-930c0f6ad036",
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
                    ". It allows any type argument."
                ]
            ]
        },
        {
            "id": "96fadeb4-ee8b-53ec-a4ab-eb07342b9efb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Once a type is chosen for "
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
                    ", every use of "
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
                    " in that function call has the same type."
                ]
            ]
        },
        {
            "id": "61a2aa74-9c23-57eb-a1d9-0d6372a7622b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Both calls print 1, 2 and 3 on separate lines."
                ]
            ]
        },
        {
            "id": "98e1f775-f374-5d76-a89f-dcf267dd7b71",
            "type": "bulleted_list",
            "richText": [
                [
                    "In the first call, Go infers "
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
                    " as "
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
                    " from the argument. This means you do not need to write "
                ],
                [
                    "[int]",
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
            "id": "1e5611a8-771f-5c33-ab53-7ecbed7072a0",
            "type": "code",
            "richText": [
                [
                    "PrintSlice([]int{1, 2, 3})\nPrintSlice[int]([]int{1, 2, 3})"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "491c3929-12d2-5f0f-b07a-d0eefafdf3af",
            "type": "sub_header",
            "richText": [
                [
                    "Generic types"
                ]
            ]
        },
        {
            "id": "a1720035-9003-502a-81e1-73fea9e82dae",
            "type": "bulleted_list",
            "richText": [
                [
                    "Stack[T]",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " stores values of type "
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
            "id": "9f82862f-f8af-543c-9c8f-172e8a9cffd5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pop",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns the value and a boolean that says whether it found an item."
                ]
            ]
        },
        {
            "id": "f6e73da0-04f6-5362-9f71-6b0170ece595",
            "type": "bulleted_list",
            "richText": [
                [
                    "On an empty stack, it returns the zero value and "
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
                    " instead of reading past the slice."
                ]
            ]
        },
        {
            "id": "726e721e-c8dc-5c52-98c9-f319abf8f95a",
            "type": "code",
            "richText": [
                [
                    "type Stack[T any] struct {\n    items []T\n}\n\nfunc (s *Stack[T]) Push(item T) {\n    s.items = append(s.items, item)\n}\n\nfunc (s *Stack[T]) Pop() (T, bool) {\n    if len(s.items) == 0 {\n        var zero T\n        return zero, false\n    }\n    n := len(s.items) - 1\n    item := s.items[n]\n    s.items = s.items[:n]\n    return item, true\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "f49ee776-b5a7-575b-8d42-414487e46221",
            "type": "code",
            "richText": [
                [
                    "var s Stack[int]\ns.Push(7)\nv, ok := s.Pop()\nfmt.Println(v, ok) // 7 true\nv, ok = s.Pop()\nfmt.Println(v, ok) // 0 false"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "824be502-a6a8-5ce1-b72d-6f3b1b4df95b",
            "type": "sub_header",
            "richText": [
                [
                    "Constraints and underlying types"
                ]
            ]
        },
        {
            "id": "0329b048-4176-5332-928a-ff8a7576442b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Number",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " allows "
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
                    "float64",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and defined types based on either of them."
                ]
            ]
        },
        {
            "id": "ad66bda1-eea4-5b92-8d38-c940885f6c92",
            "type": "bulleted_list",
            "richText": [
                [
                    "Every allowed type supports "
                ],
                [
                    "+",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", so "
                ],
                [
                    "Sum",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can add its values."
                ]
            ]
        },
        {
            "id": "fb0da56f-5a0a-53b3-8e09-61d4cbad5b08",
            "type": "code",
            "richText": [
                [
                    "type Number interface {\n    ~int | ~float64\n}\n\nfunc Sum[T Number](nums []T) T {\n    var total T\n    for _, v := range nums {\n        total += v\n    }\n    return total\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "41ef8f79-cc1b-5b93-abb8-f124f0b11e58",
            "type": "bulleted_list",
            "richText": [
                [
                    "The underlying type is the type a defined type is based on. For "
                ],
                [
                    "type Count int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", it is "
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
            "id": "0dd74b04-db2e-5f6d-a86d-76ce593ab66d",
            "type": "bulleted_list",
            "richText": [
                [
                    "~int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " allows every type whose underlying type is "
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
            "id": "e01aacdc-625b-5e69-85b6-a3f75c1c1114",
            "type": "bulleted_list",
            "richText": [
                [
                    "Without "
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
                    ", the type term "
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
                    " allows only "
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
                    " itself."
                ]
            ]
        },
        {
            "id": "a05e5cc9-9bbe-55b9-a178-e54e74796c1f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Interfaces with type terms can be used as constraints. They cannot be used as ordinary interface value types."
                ]
            ]
        },
        {
            "id": "b351a4df-7440-5b38-89a9-a274b5c3d214",
            "type": "code",
            "richText": [
                [
                    "type Count int\n\nfunc sumCounts() {\n    fmt.Println(Sum([]Count{2, 3})) // 5\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "5f950278-87e9-52a5-b8d1-d7787ed58133",
            "type": "sub_header",
            "richText": [
                [
                    "any and comparable"
                ]
            ]
        },
        {
            "id": "2c8e5e00-5429-5c46-a77a-31170fe64b53",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "ccfcf759-201a-5f3d-81a7-821122c42300",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Constraint"
                            ]
                        ],
                        "col-1": [
                            [
                                "Available behavior"
                            ]
                        ]
                    }
                },
                {
                    "id": "4f931d60-66ca-5626-a7aa-0a0796d2245c",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "any",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Accepts any type. Code cannot assume it supports arithmetic or has a particular field."
                            ]
                        ]
                    }
                },
                {
                    "id": "bd58a1a5-11f3-574a-8ae1-2d4af9f03ab2",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "comparable",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Allows == and != in the generic body"
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "25024eb1-ed54-8075-9ba9-d88586992ed5",
            "type": "code",
            "richText": [
                [
                    "func IndexOf[T comparable](slice []T, value T) int {\n    for i, v := range slice {\n        if v == value {\n            return i\n        }\n    }\n    return -1\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "3bff34de-d82e-5416-b5ca-07b944382632",
            "type": "bulleted_list",
            "richText": [
                [
                    "IndexOf([]string{\"a\", \"b\"}, \"b\")",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns 1."
                ]
            ]
        },
        {
            "id": "4623809b-20a9-51bc-be64-d5d5166be803",
            "type": "bulleted_list",
            "richText": [
                [
                    "A slice such as "
                ],
                [
                    "[]int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " cannot be compared with "
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
                    " or "
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
                    ", except against "
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
            "id": "216bf7df-79e2-5a87-aa7c-d430759eadcf",
            "type": "bulleted_list",
            "richText": [
                [
                    "So a slice whose elements are "
                ],
                [
                    "[]int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " cannot use this "
                ],
                [
                    "IndexOf",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " function."
                ]
            ]
        },
        {
            "id": "78fcd204-eca2-5ec6-88e4-a1d49eb90868",
            "type": "bulleted_list",
            "richText": [
                [
                    "In Go 1.20+, a comparable interface type such as "
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
                    " can satisfy "
                ],
                [
                    "comparable",
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
            "id": "f05c90e7-a1e5-599f-9594-8e140e851f87",
            "type": "bulleted_list",
            "richText": [
                [
                    "Its stored value still matters. Comparing interface values that hold slices, maps or functions can panic."
                ]
            ]
        },
        {
            "id": "a9068d15-54ac-5c29-b8f3-f0d5e90ab00d",
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
                    " does not guarantee that every value held in an interface is safe to compare."
                ]
            ]
        },
        {
            "id": "14102221-30f6-5987-9251-14576c54adce",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Getting started with generics",
                    [
                        [
                            "a",
                            "https://go.dev/doc/tutorial/generics"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "93e8949c-30d2-5d50-abaa-48059cf86119",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Type constraints and comparable",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Type_constraints"
                        ]
                    ]
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
