import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8099-9df4-e4e544ae459d",
    "slug": "closures",
    "title": "Closures",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "03542633-e952-5bab-9c8e-c78896dbb44c",
            "type": "bulleted_list",
            "richText": [
                [
                    "A function literal can use variables from the scope around it."
                ]
            ]
        },
        {
            "id": "128d7c28-d2d1-5147-a65a-23167e0f05ef",
            "type": "bulleted_list",
            "richText": [
                [
                    "The function and the surrounding code share those variables."
                ]
            ]
        },
        {
            "id": "bfda78bd-f595-584a-914e-d3ca8ceab17c",
            "type": "bulleted_list",
            "richText": [
                [
                    "The variables stay available while the closure can use them."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80f0-9844-d1acaa06c689",
            "type": "text",
            "richText": [
                [
                    "Function-literal syntax: "
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
            "id": "47c7ebe8-545e-5853-8af7-5503e9e55384",
            "type": "sub_header",
            "richText": [
                [
                    "Independent captured state"
                ]
            ]
        },
        {
            "id": "9dc3a4c2-00c9-561d-933d-930c554aa815",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each call to "
                ],
                [
                    "makeCounter",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " creates a new "
                ],
                [
                    "count",
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
            "id": "b2fadf13-940c-5e01-8bcc-3fb71166021c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Calls to the same returned function update that same "
                ],
                [
                    "count",
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
            "id": "5fa554e6-4f67-5db1-89f1-1324e9d34137",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\nfunc makeCounter() func() int {\n    count := 0\n    return func() int {\n        count++\n        return count\n    }\n}\n\nfunc main() {\n    counterA := makeCounter()\n    fmt.Println(counterA()) // 1\n    fmt.Println(counterA()) // 2\n    fmt.Println(counterA()) // 3\n\n    counterB := makeCounter()\n    fmt.Println(counterB()) // 1\n    fmt.Println(counterA()) // 4\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "b024abe0-37eb-5b55-a116-f6babfb5a1a4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Two closures created during one function call can share a variable."
                ]
            ]
        },
        {
            "id": "2023185b-09e6-501f-ab8b-5c9c5fe68c3b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Two separate calls can create separate variables."
                ]
            ]
        },
        {
            "id": "ed293f1e-5aaf-58f1-a600-40c7633de726",
            "type": "bulleted_list",
            "richText": [
                [
                    "A closure keeps access to a variable. It does not save a fixed copy of the variable’s value."
                ]
            ]
        },
        {
            "id": "1bb009d6-d3d5-535a-ac01-baee53b5725d",
            "type": "sub_header",
            "richText": [
                [
                    "Common uses"
                ]
            ]
        },
        {
            "id": "890d30c3-0a43-51c5-a078-c88c848f84a9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Return a counter or multiplier that keeps its own state."
                ]
            ]
        },
        {
            "id": "b657f2b1-b7ae-593b-903e-e396c92ef87c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use surrounding variables in a callback, request handler or goroutine."
                ]
            ]
        },
        {
            "id": "d66b3aec-af23-5739-9d46-55cc6d5dc441",
            "type": "bulleted_list",
            "richText": [
                [
                    "Return a small fake or test helper that keeps state between calls."
                ]
            ]
        },
        {
            "id": "3d8249bb-bde8-5b34-9c97-81ab83319de6",
            "type": "sub_header",
            "richText": [
                [
                    "Loop variables and Go versions"
                ]
            ]
        },
        {
            "id": "2fe17ec7-4ac2-5779-a90e-f8a85f5e2f95",
            "type": "bulleted_list",
            "richText": [
                [
                    "In Go 1.22+ language versions, a variable declared by the loop gets a new instance for each iteration."
                ]
            ]
        },
        {
            "id": "a35e0727-7023-5bb2-bab3-063f0e8a1ac0",
            "type": "bulleted_list",
            "richText": [
                [
                    "The "
                ],
                [
                    "go",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " version in "
                ],
                [
                    "go.mod",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " normally selects these language rules."
                ]
            ]
        },
        {
            "id": "9111a058-ac64-5f04-8d3d-658ba7362670",
            "type": "bulleted_list",
            "richText": [
                [
                    "Installing a newer Go toolchain alone does not change the rules of an older module."
                ]
            ]
        },
        {
            "id": "b41d1142-f80f-51f5-9074-941b507af32f",
            "type": "bulleted_list",
            "richText": [
                [
                    "funcs",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " stores functions that run after the loop."
                ]
            ]
        },
        {
            "id": "7622cd65-83f9-5b68-b71b-8fb9b99dad04",
            "type": "bulleted_list",
            "richText": [
                [
                    "No goroutines are used here, so execution order does not affect the result."
                ]
            ]
        },
        {
            "id": "2c14e6bf-7a19-5acf-9e38-12070e2fa209",
            "type": "code",
            "richText": [
                [
                    "var funcs []func()\nfor i := 0; i < 3; i++ {\n    funcs = append(funcs, func() { fmt.Println(i) })\n}\nfor _, f := range funcs { f() }"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "4bc213f3-ccfb-59db-82d8-3d9e814f08a3",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "1c7ba8e4-b19c-53f7-a3dc-201903c86562",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Loop rules"
                            ]
                        ],
                        "col-1": [
                            [
                                "Expected printed values"
                            ]
                        ]
                    }
                },
                {
                    "id": "b324f75f-9762-5af4-92f6-47d63437fc24",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Go 1.22+"
                            ]
                        ],
                        "col-1": [
                            [
                                "0, then 1, then 2"
                            ]
                        ]
                    }
                },
                {
                    "id": "c1a3ef68-f7c5-5090-8af1-980471237c76",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Before Go 1.22"
                            ]
                        ],
                        "col-1": [
                            [
                                "3, then 3, then 3: all callbacks share one loop variable"
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "1236e2d4-684e-5576-ba29-3236c3614b8a",
            "type": "bulleted_list",
            "richText": [
                [
                    "The Go 1.22 change applies to variables declared by the loop."
                ]
            ]
        },
        {
            "id": "c6c3fdcc-f41e-51e5-8ff9-dc223e440fd0",
            "type": "bulleted_list",
            "richText": [
                [
                    "If the variable was declared before the loop, every iteration still uses that same variable."
                ]
            ]
        },
        {
            "id": "2709e1c2-c8c0-5349-9a4d-305313b375b3",
            "type": "code",
            "richText": [
                [
                    "var i int\nvar funcs []func()\nfor i = 0; i < 3; i++ {\n    funcs = append(funcs, func() { fmt.Println(i) })\n}\nfor _, f := range funcs { f() } // 3, 3, 3 in all language versions"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "90abc078-ae1a-58b9-b520-73f478546ceb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass the current value as a function argument to give each goroutine its own parameter."
                ]
            ]
        },
        {
            "id": "6ad29d33-f2cf-5f6e-a00e-7e0cb6aeca1c",
            "type": "bulleted_list",
            "richText": [
                [
                    "This also works with older Go language versions."
                ]
            ]
        },
        {
            "id": "7e5d7199-464f-5868-ae7e-dcd9f1f97bcd",
            "type": "code",
            "richText": [
                [
                    "func printIterations() {\n    var wg sync.WaitGroup\n    for i := 0; i < 3; i++ {\n        wg.Add(1)\n        go func(n int) {\n            defer wg.Done()\n            fmt.Println(n)\n        }(i)\n    }\n    wg.Wait()\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "df7fb2f9-9206-5f45-b5a5-371be6f8ba04",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each goroutine prints its own argument: 0, 1 or 2. Their order can change."
                ]
            ]
        },
        {
            "id": "6054b95c-4d72-569a-8af6-56783550c11b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Under older loop rules, goroutines can read the shared variable while the loop changes it."
                ]
            ]
        },
        {
            "id": "9bd3c93a-defa-5760-917d-4ca02c15b09c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Without synchronization, that is a data race."
                ]
            ]
        },
        {
            "id": "3312dc18-287e-5422-900f-bb03461d1ac0",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Go 1.22 loop-variable change",
                    [
                        [
                            "a",
                            "https://go.dev/blog/loopvar-preview"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "aa51621f-7363-5971-b93b-29a15df2266a",
            "type": "text",
            "richText": [
                [
                    "Concurrency and program lifetime: "
                ],
                [
                    "Goroutines",
                    [
                        [
                            "a",
                            "#/notes/go/goroutines"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "dd3e222e-b35b-5d16-bcd5-bded276aa96c",
            "type": "sub_header",
            "richText": [
                [
                    "Captured-variable lifetime"
                ]
            ]
        },
        {
            "id": "3dab3820-32c3-5dfa-8703-f59680c623b4",
            "type": "bulleted_list",
            "richText": [
                [
                    "A reachable closure can still be used by the program."
                ]
            ]
        },
        {
            "id": "eadc6231-0db6-5b21-ade0-3fd07682980c",
            "type": "bulleted_list",
            "richText": [
                [
                    "It keeps the captured variables it needs in memory."
                ]
            ]
        },
        {
            "id": "3ea9728e-c750-5d5b-9a1d-4dcf900f744d",
            "type": "bulleted_list",
            "richText": [
                [
                    "A closure does not protect shared data from simultaneous updates by goroutines."
                ]
            ]
        },
        {
            "id": "42168ab8-9ccb-532e-9dfd-0756a326fced",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Function literals and shared variables",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Function_literals"
                        ]
                    ]
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
