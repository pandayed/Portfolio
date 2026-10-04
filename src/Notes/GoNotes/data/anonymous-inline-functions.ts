import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-801b-af91-ec0564709d69",
    "slug": "anonymous-inline-functions",
    "title": "Anonymous/Inline Functions",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "2f5a6c45-7601-5996-a8ac-1e7e4301c6b2",
            "type": "text",
            "richText": [
                [
                    "A function literal declares a function without a name. It can be called immediately, stored in a variable, passed as an argument or returned."
                ]
            ]
        },
        {
            "id": "a6be72ab-1df6-5dba-863f-5a49ccd60d4f",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Function literals",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Function_literals"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8043-987f-caeaa994664e",
            "type": "sub_header",
            "richText": [
                [
                    "Syntax"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8097-b4ee-c27e93874b1e",
            "type": "code",
            "richText": [
                [
                    "func(paramList) returnType {\n    // body\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "65e1f96b-4f48-5853-b541-34150efd9b7d",
            "type": "text",
            "richText": [
                [
                    "The term inline here means writing a function literal at its use site. It does not guarantee compiler inlining."
                ]
            ]
        },
        {
            "id": "356aeedf-0904-5dbc-a64a-85b0061197cf",
            "type": "sub_header",
            "richText": [
                [
                    "Immediate invocation"
                ]
            ]
        },
        {
            "id": "4ad56ced-8d0c-52a0-bd6a-3ba3a7eccfd9",
            "type": "text",
            "richText": [
                [
                    "The final parentheses call the literal with arguments."
                ]
            ]
        },
        {
            "id": "1f012821-3638-50ce-b8ba-c3274c8d8023",
            "type": "code",
            "richText": [
                [
                    "result := func(a, b int) int {\n    return a + b\n}(5, 3)\nfmt.Println(result) // 8"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "0496b9d0-748d-56d2-b0fd-218a743c28bd",
            "type": "sub_header",
            "richText": [
                [
                    "Assigning a function value"
                ]
            ]
        },
        {
            "id": "c45f33c1-af26-5ce6-9e2a-4359274c2fb6",
            "type": "code",
            "richText": [
                [
                    "add := func(x, y int) int {\n    return x + y\n}\nfmt.Println(add(2, 3)) // 5"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "04023e42-32c3-5c7f-b9af-550ed4b2ce3c",
            "type": "sub_header",
            "richText": [
                [
                    "Passing a callback"
                ]
            ]
        },
        {
            "id": "8306fb87-8519-5d41-9299-50c1abda4856",
            "type": "code",
            "richText": [
                [
                    "func operate(x, y int, op func(int, int) int) int {\n    return op(x, y)\n}\n\nfunc callbackExample() {\n    result := operate(4, 2, func(a, b int) int {\n        return a * b\n    })\n    fmt.Println(result) // 8\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "967c5d8b-d16e-5941-a297-c2d93fe80521",
            "type": "sub_header",
            "richText": [
                [
                    "Returning a function"
                ]
            ]
        },
        {
            "id": "6052927a-e59f-5fef-973e-fc48abd7e6f4",
            "type": "code",
            "richText": [
                [
                    "func multiplier(factor int) func(int) int {\n    return func(x int) int {\n        return x * factor\n    }\n}\n\nfunc multiplierExample() {\n    double := multiplier(2)\n    fmt.Println(double(5)) // 10\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "d85ed29e-6dda-5b10-81ab-3dc178cacf69",
            "type": "text",
            "richText": [
                [
                    "The returned function captures factor, so this example is also a closure. Function-literal syntax and captured state are separate concepts."
                ]
            ]
        },
        {
            "id": "79f7f93f-c218-5bb9-8e2c-ef7c2849b666",
            "type": "text",
            "richText": [
                [
                    "Captured variables, lifetime and loop scope: "
                ],
                [
                    "Closures",
                    [
                        [
                            "a",
                            "#/notes/go/closures"
                        ]
                    ]
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
