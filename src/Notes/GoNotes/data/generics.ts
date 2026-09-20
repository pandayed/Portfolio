/* Copied from the Generics page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24e24eb1-ed54-8016-bb3f-e11fa478ed00",
    "slug": "generics",
    "title": "Generics",
    "updatedOn": "2025-08-15",
    "blocks": [
        {
            "id": "25024eb1-ed54-80b9-8fe8-e6b108d7699c",
            "type": "bulleted_list",
            "richText": [
                [
                    "A way to write functions and types that work with any data type, while still keeping type safety."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80e4-961c-daed394e19d6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Introduced:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Go 1.18."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80df-8253-c5bd986a5477",
            "type": "bulleted_list",
            "richText": [
                [
                    "Purpose:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Avoid code duplication and allow reusable, type-safe code."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-8006-8157-d7b8bbb9b99a",
            "type": "divider"
        },
        {
            "id": "25024eb1-ed54-8062-8b38-cc6b94660f71",
            "type": "bulleted_list",
            "richText": [
                [
                    "Type Parameter:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Placeholder for a type (like "
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
                    ") in a function or type definition."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-8005-9c30-ccc256f52855",
            "type": "bulleted_list",
            "richText": [
                [
                    "Constraint:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Rule that limits what types can be passed to a type parameter."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80c2-93ae-e64f703982f8",
            "type": "bulleted_list",
            "richText": [
                [
                    "Type Inference:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Go can sometimes deduce type parameters automatically."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80ad-b1e1-f436fef8aea1",
            "type": "divider"
        },
        {
            "id": "25024eb1-ed54-80a1-8792-e709a313da0f",
            "type": "sub_header",
            "richText": [
                [
                    "Generic Function Syntax",
                    [
                        [
                            "b"
                        ]
                    ]
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
            "id": "25024eb1-ed54-8055-b455-cfee2f2a302d",
            "type": "bulleted_list",
            "richText": [
                [
                    "[T any]",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → Declares type parameter "
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
                    " that can be any type."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80a4-a726-f113a2384c7c",
            "type": "bulleted_list",
            "richText": [
                [
                    "any",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → A built-in constraint, same as "
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
                    " but type-safe."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-8043-9231-c77d0e34a199",
            "type": "divider"
        },
        {
            "id": "25024eb1-ed54-8014-a73d-d4c5d74f5d04",
            "type": "sub_header",
            "richText": [
                [
                    "Generic Type Syntax",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80b1-9fdb-ef0805689714",
            "type": "code",
            "richText": [
                [
                    "type Stack[T any] struct {\n    items []T\n}\n\nfunc (s *Stack[T]) Push(item T) {\n    s.items = append(s.items, item)\n}\n\nfunc (s *Stack[T]) Pop() T {\n    n := len(s.items) - 1\n    item := s.items[n]\n    s.items = s.items[:n]\n    return item\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "25024eb1-ed54-807c-af92-e00a57b3a368",
            "type": "divider"
        },
        {
            "id": "25024eb1-ed54-8074-9a33-c7227405e7e4",
            "type": "sub_header",
            "richText": [
                [
                    "Constraints",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-8088-afbd-f36a7a5b9c1a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Purpose:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Restrict what operations are allowed on a type parameter."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-807e-a348-ca7f918d04c3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Example:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-8022-ab27-d994c707fcd9",
            "type": "code",
            "richText": [
                [
                    "type Number interface {\n    ~int | ~float64\n}\n\nfunc Sum[T Number](nums []T) T {\n    var total T\n    for _, v := range nums {\n        total += v\n    }\n    return total\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "25024eb1-ed54-80d9-991f-d3fac22fc500",
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
                    " means \"int or any type whose underlying type is int\"."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-8098-8721-f705d813f6f1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Operators like "
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
                    " only work if the constraint supports them."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80e3-ace2-ddb436b62fd3",
            "type": "divider"
        },
        {
            "id": "25024eb1-ed54-80fd-b37f-fadcf8e5477c",
            "type": "sub_header",
            "richText": [
                [
                    "Built-in Constraints",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-806f-84e1-f7f50cd168b2",
            "type": "bulleted_list",
            "richText": [
                [
                    "any",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → any type."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80b3-a4ea-f7c668ac1fc7",
            "type": "bulleted_list",
            "richText": [
                [
                    "comparable",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → types that can be compared with "
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
                    "."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-8042-9814-eea355a1dfc4",
            "type": "text",
            "richText": [
                [
                    "Example:"
                ]
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
            "id": "25024eb1-ed54-801c-8f5f-c7230f5f0af6",
            "type": "divider"
        },
        {
            "id": "25024eb1-ed54-80e2-ba56-fbcf73304fe0",
            "type": "sub_header",
            "richText": [
                [
                    "Type Inference",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80ba-a8b2-ccb71c31bcd8",
            "type": "code",
            "richText": [
                [
                    "PrintSlice([]int{1, 2, 3}) // Go infers T = int"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "25024eb1-ed54-8019-a576-ee20b7250820",
            "type": "bulleted_list",
            "richText": [
                [
                    "Often no need to explicitly write "
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
            "id": "25024eb1-ed54-80f6-ada7-c60623fe9165",
            "type": "divider"
        }
    ]
} as const satisfies GoNote;

export default note;
