import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8099-9df4-e4e544ae459d",
    "slug": "closures",
    "title": "Closures",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "03542633-e952-5bab-9c8e-c78896dbb44c",
            "type": "text",
            "richText": [
                [
                    "A function literal can refer to variables from its surrounding scope. It shares those variables with that scope, and they remain available while the closure can use them."
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
            "type": "text",
            "richText": [
                [
                    "Complete program: each call to makeCounter creates a new count variable. Calls to the same returned function update that same variable."
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
            "type": "text",
            "richText": [
                [
                    "Two closures from the same invocation can share a variable; two calls to a factory can create separate variables. Capture retains a variable, rather than freezing its value when the literal is created."
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
                    "Function factories, such as a counter or multiplier with configured state."
                ]
            ]
        },
        {
            "id": "b657f2b1-b7ae-593b-903e-e396c92ef87c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Callbacks, request handlers or goroutines that use surrounding variables."
                ]
            ]
        },
        {
            "id": "d66b3aec-af23-5739-9d46-55cc6d5dc441",
            "type": "bulleted_list",
            "richText": [
                [
                    "Small fakes or test helpers with state held by a returned function."
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
            "type": "text",
            "richText": [
                [
                    "Go 1.22+ language semantics give variables declared by a for loop a separate instance for each iteration. The module’s go version normally selects the language semantics; a newer toolchain alone does not change an older module’s rules."
                ]
            ]
        },
        {
            "id": "b41d1142-f80f-51f5-9074-941b507af32f",
            "type": "text",
            "richText": [
                [
                    "In this function-body excerpt, funcs holds callbacks called after the loop. It isolates capture from goroutine scheduling."
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
                                "Language semantics"
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
            "type": "text",
            "richText": [
                [
                    "The new rule applies to variables declared by the loop. Assigning to an already-declared variable still reuses it, even in Go 1.22+:"
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
            "type": "text",
            "richText": [
                [
                    "Alternative to the previous excerpt: passing the current value as a function argument avoids sharing the loop variable across goroutines. This works with older language versions too. The function below uses fmt and sync."
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
            "type": "text",
            "richText": [
                [
                    "Each goroutine prints its own argument, 0, 1 or 2; the order varies. Under older semantics, launching goroutines that read the shared loop variable without synchronization can also create a data race."
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
            "type": "text",
            "richText": [
                [
                    "Captured variables stay reachable as long as a reachable closure needs them. Retaining a closure can therefore retain data it captures. A closure does not synchronize concurrent updates to that data."
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
