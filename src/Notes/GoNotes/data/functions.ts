import type { GoNote } from '../types';

const note = {
    "notionId": "24a24eb1-ed54-807f-82ae-e73c3476d760",
    "slug": "functions",
    "title": "Functions",
    "updatedOn": "2026-10-05",
    "blocks": [
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Start the declaration with "
                ],
                [
                    "func",
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
            "id": "9c2638b3-c50a-5203-9355-4fd322727253",
            "type": "bulleted_list",
            "richText": [
                [
                    "Give each parameter a name and a type."
                ]
            ]
        },
        {
            "id": "6405724f-02cd-55a3-981a-240a38358213",
            "type": "bulleted_list",
            "richText": [
                [
                    "Write return types after the parameter list."
                ]
            ]
        },
        {
            "id": "5565ab1c-df98-5fba-9d53-3ce30c1a2059",
            "type": "bulleted_list",
            "richText": [
                [
                    "Leave out the return type if the function returns nothing."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "result := add(2, 3)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " stores 5 in "
                ],
                [
                    "result",
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
            "type": "bulleted_list",
            "richText": [
                [
                    "b",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " must not be zero when calling "
                ],
                [
                    "divide",
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
            "id": "832b9bc9-ec2b-5b4a-9545-47e16ac02e2a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Assign the two results to two variables."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Named results are variables declared in the function signature."
                ]
            ]
        },
        {
            "id": "b12142d0-800b-5bdc-a014-1bacdc3b74c3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A plain "
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
                    " returns their current values."
                ]
            ]
        },
        {
            "id": "3723abfe-e641-5833-bd91-bc8d43bfa73e",
            "type": "bulleted_list",
            "richText": [
                [
                    "rectProps(3, 2)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns 6 and 10."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Write the type once when neighboring parameters share it."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Passing a pointer copies the address it holds."
                ]
            ]
        },
        {
            "id": "ef8bff37-7ef2-53bb-9126-b789a83d2202",
            "type": "bulleted_list",
            "richText": [
                [
                    "The function can use that address to change the original variable."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Use the blank identifier "
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
                    " when you do not need a result."
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
