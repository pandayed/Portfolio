import type { GoNote } from '../types';

const note = {
    "notionId": "24a24eb1-ed54-807f-82ae-e73c3476d760",
    "slug": "functions",
    "title": "Functions",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "09cf19a8-c88b-5aa9-a964-453190eddcae",
            "type": "text",
            "richText": [
                [
                    "A function declares parameters and optional results. Arguments are copied into parameters when the function is called."
                ]
            ]
        },
        {
            "id": "8d4a1fb7-a62e-5908-b8c0-98c34a7acc66",
            "type": "text",
            "richText": [
                [
                    "Examples below are declarations or function-body excerpts. Printing snippets use fmt."
                ]
            ]
        },
        {
            "id": "7b00b12b-185e-5b00-b284-f673897c2b42",
            "type": "sub_header",
            "richText": [
                [
                    "Basic syntax"
                ]
            ]
        },
        {
            "id": "f042a41e-268a-5220-a284-4695f1807c56",
            "type": "text",
            "richText": [
                [
                    "Syntax reference: replace the placeholder names and types. Function declarations belong at package scope; call statements belong inside a function."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-80e2-8bd7-c1f02ca1a857",
            "type": "code",
            "richText": [
                [
                    "func functionName(param1 type1, param2 type2) returnType {\n    // body\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "9191b47b-72be-5a84-836c-21b858713496",
            "type": "text",
            "richText": [
                [
                    "The func keyword starts the declaration. Each parameter has a name and type; result types follow the parameter list. Omit the result type for a function that returns nothing."
                ]
            ]
        },
        {
            "id": "790c56e4-94b3-5334-b8ea-6cdcbfa58407",
            "type": "sub_header",
            "richText": [
                [
                    "Single return value"
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-804e-b7eb-c002e5fc5724",
            "type": "code",
            "richText": [
                [
                    "func add(a int, b int) int {\n    return a + b\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "8f25e9cb-0f04-5d17-9d68-974491624923",
            "type": "text",
            "richText": [
                [
                    "Inside a function, "
                ],
                [
                    "result := add(2, 3)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " assigns 5 to result."
                ]
            ]
        },
        {
            "id": "43aea64e-0992-57aa-a2ce-8de7867ad8de",
            "type": "sub_header",
            "richText": [
                [
                    "Multiple return values"
                ]
            ]
        },
        {
            "id": "f4c11ae2-d5c9-5c2b-a4c2-951694a4180e",
            "type": "text",
            "richText": [
                [
                    "This integer division example requires b to be nonzero. Each result is assigned separately."
                ]
            ]
        },
        {
            "id": "4145098c-ad25-5d21-a8c4-816c0eae8909",
            "type": "code",
            "richText": [
                [
                    "func divide(a, b int) (int, int) {\n    return a / b, a % b\n}\n\nfunc divisionExample() {\n    q, r := divide(10, 3)\n    fmt.Println(q, r) // 3 1\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24a24eb1-ed54-80a7-b0c7-f31f6195e612",
            "type": "text",
            "richText": [
                [
                    "Returning a value and an error: "
                ],
                [
                    "Errors",
                    [
                        [
                            "a",
                            "#/notes/go/errors"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "a9e7b60e-a772-574f-8396-3237f7630b2b",
            "type": "sub_header",
            "richText": [
                [
                    "Named return values"
                ]
            ]
        },
        {
            "id": "01b167d3-85cd-545c-b223-015914b83120",
            "type": "code",
            "richText": [
                [
                    "func rectProps(length, width float64) (area, perimeter float64) {\n    area = length * width\n    perimeter = 2 * (length + width)\n    return // returns the current named result values\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "f4017b69-98b1-5f90-9b2b-66688a9f42da",
            "type": "text",
            "richText": [
                [
                    "Named results are variables declared by the signature. A plain return uses their current values. rectProps(3, 2) returns 6 and 10."
                ]
            ]
        },
        {
            "id": "7f7acfef-f527-5b2c-9f73-3f27531291fb",
            "type": "sub_header",
            "richText": [
                [
                    "Parameter grouping and pointers"
                ]
            ]
        },
        {
            "id": "15260d92-6376-54f3-892f-2eacfb685820",
            "type": "text",
            "richText": [
                [
                    "When adjacent parameters have the same type, write it once. This is an alternative declaration of add, not a second declaration in the same package."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-8053-93fa-eca279bccffb",
            "type": "code",
            "richText": [
                [
                    "func add(a, b int) int { return a + b }"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "1d4bd13b-d45f-5ea0-8a6b-65e4e7428d5a",
            "type": "text",
            "richText": [
                [
                    "Passing a pointer copies its address value. A function can use it to change the pointed-to variable."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-8054-9350-fac1d4e305bd",
            "type": "code",
            "richText": [
                [
                    "func update(val *int) { *val = 100 }"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "4ed2c3c0-8641-5214-a2e3-b261bc0f141e",
            "type": "text",
            "richText": [
                [
                    "Mutation and copied values: "
                ],
                [
                    "Pointers",
                    [
                        [
                            "a",
                            "#/notes/go/pointers"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "81de0be2-c8cf-544b-a1f3-6379bfb2c2ef",
            "type": "sub_header",
            "richText": [
                [
                    "Ignoring a result"
                ]
            ]
        },
        {
            "id": "62c99716-181c-52e0-97e1-42921d5c1ede",
            "type": "text",
            "richText": [
                [
                    "Use the blank identifier for a result that is deliberately unused. Function-body excerpt using the divide declaration above:"
                ]
            ]
        },
        {
            "id": "f6f57905-88e3-5405-b342-66bc7022fcfe",
            "type": "code",
            "richText": [
                [
                    "_, remainder := divide(10, 3)\nfmt.Println(remainder) // 1"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "ab2f0905-c8e6-516a-8625-f746a16ee72b",
            "type": "text",
            "richText": [
                [
                    "Function values and callbacks: "
                ],
                [
                    "Anonymous/Inline Functions",
                    [
                        [
                            "a",
                            "#/notes/go/anonymous-inline-functions"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "1916d6cb-c73a-5f8c-a5c4-59e884e7d3a0",
            "type": "text",
            "richText": [
                [
                    "Variable argument lists: "
                ],
                [
                    "Variadic Functions",
                    [
                        [
                            "a",
                            "#/notes/go/variadic-functions"
                        ]
                    ]
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
