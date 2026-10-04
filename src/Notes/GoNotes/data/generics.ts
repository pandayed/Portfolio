import type { GoNote } from '../types';

const note = {
    "notionId": "24e24eb1-ed54-8016-bb3f-e11fa478ed00",
    "slug": "generics",
    "title": "Generics",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "9df65395-5da9-50ca-9bea-4078b7215fe9",
            "type": "text",
            "richText": [
                [
                    "Generics, introduced in Go 1.18, let a function or type use type parameters. A constraint controls which type arguments are accepted and which operations the body may use."
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
            "type": "text",
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
                    " declares a type parameter T. any is exactly an alias for interface{}. A type parameter keeps the chosen type consistent throughout each instantiation."
                ]
            ]
        },
        {
            "id": "61a2aa74-9c23-57eb-a1d9-0d6372a7622b",
            "type": "text",
            "richText": [
                [
                    "Both calls print 1, 2 and 3 on separate lines. In the first call, the argument lets Go infer T as int."
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
            "type": "text",
            "richText": [
                [
                    "Stack[T] stores elements of T. Pop returns a value and a success flag so an empty stack does not index past the slice."
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
            "type": "text",
            "richText": [
                [
                    "The Number constraint admits int, float64 and defined types with either underlying type. All admitted types support addition, so Sum can use +."
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
            "type": "text",
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
                    " means any type whose underlying type is int. Without the tilde, an int type term admits int itself. Constraints containing type terms are used as constraints, not ordinary interface value types."
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
                                "Any type argument; no arbitrary arithmetic or field access"
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
            "type": "text",
            "richText": [
                [
                    "IndexOf([]string{\"a\", \"b\"}, \"b\") returns 1. A []int element type is not comparable, so a slice of []int cannot use this function."
                ]
            ]
        },
        {
            "id": "78fcd204-eca2-5ec6-88e4-a1d49eb90868",
            "type": "text",
            "richText": [
                [
                    "Go 1.20+ allows comparable interface types such as any to satisfy comparable. Comparisons of their dynamic values may still panic if those values are slices, maps or functions. comparable does not make every possible interface value safe to compare."
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
