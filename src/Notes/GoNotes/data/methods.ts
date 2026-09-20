/* Copied from the Methods page in Notion. Missing pointer markers from the
   source were restored using the Go method-set rules. */

import type { GoNote } from '../types';

const note = {
    "notionId": "2f124eb1-ed54-807a-925e-faca53721562",
    "slug": "methods",
    "title": "Methods",
    "updatedOn": "2026-01-24",
    "blocks": [
        {
            "id": "2f224eb1-ed54-8051-b4d7-d924a3def698",
            "type": "text"
        },
        {
            "id": "2f224eb1-ed54-80a4-870b-eec2f3045948",
            "type": "text",
            "richText": []
        },
        {
            "id": "2f224eb1-ed54-80a4-ae67-fb35a4acecd7",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8067-a36e-e8e78c4c8a20",
            "type": "sub_sub_header",
            "richText": [
                [
                    "What a Method Is"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8004-889c-c0cad8da8db8",
            "type": "bulleted_list",
            "richText": [
                [
                    "A "
                ],
                [
                    "method",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " is a function that is "
                ],
                [
                    "associated with a specific defined type",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8040-9335-fe1f2f30a85a",
            "type": "bulleted_list",
            "richText": [
                [
                    "The association is created using a "
                ],
                [
                    "receiver",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80d2-b512-da81ca533b78",
            "type": "bulleted_list",
            "richText": [
                [
                    "Without a receiver, a function is "
                ],
                [
                    "not",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " a method."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8037-a636-d05374fb1d25",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-804f-9feb-ea28ea6deb81",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Receiver"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80b2-880d-f861b718bd16",
            "type": "bulleted_list",
            "richText": [
                [
                    "A "
                ],
                [
                    "receiver",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " is a special parameter that appears "
                ],
                [
                    "before the method name",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8030-a8d8-cc976d9b1c1d",
            "type": "bulleted_list",
            "richText": [
                [
                    "It binds the function to a "
                ],
                [
                    "defined type",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8093-953c-c6eaeb218980",
            "type": "bulleted_list",
            "richText": [
                [
                    "It determines "
                ],
                [
                    "on which type the method can be called",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-806c-8ad1-f8074badaed3",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8001-acc1-f713330986a8",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Receiver Syntax"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-809b-b763-d23d361f39a6",
            "type": "bulleted_list",
            "richText": [
                [
                    "General form:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80eb-a151-f798eadd6131",
                    "type": "code",
                    "richText": [
                        [
                            "func (r T) MethodName(params) returns"
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-80f9-98d8-d21e9ebe88a2",
            "type": "bulleted_list",
            "richText": [
                [
                    "r",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8002-a5a1-de3b78d92ca1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Receiver variable name."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-807f-8dc9-d9b54f68e1ef",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Local to the method body."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-807f-b986-d0f62e450aaf",
            "type": "bulleted_list",
            "richText": [
                [
                    "T",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8001-9a9a-db714867a007",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "A "
                        ],
                        [
                            "defined (named) type",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " declared in the same package."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-80b0-aa05-d30b989bc498",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-80b2-acc8-d5d7e5866b00",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Receiver vs Normal Parameter"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80d4-8449-c8a915fb0db6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Receiver"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80b7-910e-d5e2124c3387",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Written before the method name."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8020-8ad0-ebf4f02f85cd",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Determines method ownership."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8097-aba9-fe5ca65726f6",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Enables "
                        ],
                        [
                            "value.Method()",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " syntax."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-800e-86bd-cabae0e484aa",
            "type": "bulleted_list",
            "richText": [
                [
                    "Normal parameter"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80ca-8476-c927d2021cfd",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Written after the method name."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8037-9086-c3dc88dbad74",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Passed explicitly by the caller."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-80d5-b0f9-f0b85616ec8f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Does not attach behavior to a type."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-8036-8ca5-ccbfeb081c12",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-802b-a51e-c7220f552700",
            "type": "sub_sub_header",
            "richText": [
                [
                    "How Method Calls Actually Work"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8072-9a2c-c459957b8d4b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Method call:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8020-97c3-f7afce227b55",
                    "type": "code",
                    "richText": [
                        [
                            "v.Method(x)"
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-80ce-a894-c14ce424a871",
            "type": "bulleted_list",
            "richText": [
                [
                    "Is compiled as:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8051-a8be-f86755911c60",
                    "type": "code",
                    "richText": [
                        [
                            "Method(v, x)"
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-8030-b3ba-ff6dacec561a",
            "type": "bulleted_list",
            "richText": [
                [
                    "The receiver is passed "
                ],
                [
                    "like a parameter",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", but selected via dot notation."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80e7-b033-e94cb215f3f9",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-80a0-aaea-ecdb62005414",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Value Receiver ("
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
                    ")"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-802a-af53-e78e1f94e1bc",
            "type": "bulleted_list",
            "richText": [
                [
                    "Receiver type is "
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
            "id": "2f124eb1-ed54-8031-8102-ce1ed23cdc17",
            "type": "bulleted_list",
            "richText": [
                [
                    "The method receives a "
                ],
                [
                    "copy",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " of the value."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80e3-bcbb-d247c7021c85",
            "type": "bulleted_list",
            "richText": [
                [
                    "Changes to receiver fields do "
                ],
                [
                    "not",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " affect the caller."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80f0-bc5e-daa1a86940e4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use value receiver when:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-807c-8f35-caceaa8ad0bb",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "The type is small and cheap to copy."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-80ba-ba84-df2d762f1f70",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "The method does not modify the value."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-806d-b33b-ec4bf6b09de3",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "The type represents immutable data."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-8021-86bb-c39193351f5a",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8030-8939-d671c5925354",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Pointer Receiver ("
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
                    ")"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80fb-97b3-c6cfb25ddb3a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Receiver type is "
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
            "id": "2f124eb1-ed54-80ea-8358-d2e5480ae6db",
            "type": "bulleted_list",
            "richText": [
                [
                    "The method receives the "
                ],
                [
                    "address",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " of the value."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80db-9f16-dfe577ed9f9f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Changes affect the original value."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8057-adcc-e6eab8ab84be",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use pointer receiver when:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8041-8397-e021d90e0196",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "The method modifies the receiver."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-800a-9861-cba006f00f16",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "The type is large."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-80ce-96b6-c399b2c69217",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Consistency with other methods requires it."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-8031-a3db-e0cc1a910749",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8017-94bb-d83243877da8",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Method Sets (Important)"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8041-aa00-d6d77a917bf6",
            "type": "bulleted_list",
            "richText": [
                [
                    "For a value "
                ],
                [
                    "v",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " of type "
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
                    ":"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8039-97b6-ff255bfe5e35",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Method set includes methods with receiver "
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
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-807f-8bbb-ff26e4ff490b",
            "type": "bulleted_list",
            "richText": [
                [
                    "For a value "
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
                    " of type "
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
                    ":"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80b7-bb23-d62a624bdade",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Method set includes methods with receiver "
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
                            " "
                        ],
                        [
                            "and",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " "
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
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-8074-bf9a-f476d46e42d3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Compiler rule:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80fe-982b-db221fb89cbf",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "If a value is addressable, Go may "
                        ],
                        [
                            "implicitly take its address",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " to call a pointer-receiver method."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-8038-9fae-e1438ac8750e",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8005-8669-fcd8770241d2",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Nil Receivers"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80ec-a491-d400bac95149",
            "type": "bulleted_list",
            "richText": [
                [
                    "Only possible with "
                ],
                [
                    "pointer receivers",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-807e-8e69-e7dce8ddf602",
            "type": "bulleted_list",
            "richText": [
                [
                    "Calling a method on a "
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
                    " pointer is "
                ],
                [
                    "allowed",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-809e-96ae-d0cc5379a274",
            "type": "bulleted_list",
            "richText": [
                [
                    "Panic occurs "
                ],
                [
                    "only if",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " the method body dereferences the receiver."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80e9-a94e-f9929bbefda7",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-80dd-bcba-e8080046b762",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Where Methods Can Be Defined"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8096-b36b-ec11e55e012e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Methods can be defined "
                ],
                [
                    "only on defined (named) types",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8071-8827-d95716a33cf9",
            "type": "bulleted_list",
            "richText": [
                [
                    "The defined type must be declared in the "
                ],
                [
                    "same package",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80f8-b32f-e3fde6d79570",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-807a-aea0-c17f70972c4b",
            "type": "sub_sub_header",
            "richText": [
                [
                    "What You Cannot Define Methods On"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8062-9667-c211df448062",
            "type": "bulleted_list",
            "richText": [
                [
                    "Built-in types:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80eb-8708-e3ba80538c9e",
                    "type": "bulleted_list",
                    "richText": [
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
                            "string",
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
                            "map",
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
                            "slice",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            ", etc."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-8005-8941-e57f77efb25a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Types defined in another package."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80a7-a3d1-f4ac403c50e4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Anonymous types."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8052-99de-f70bf262038d",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8026-967b-fa0147703d43",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Custom Types and Methods"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8055-9879-da6029af77e9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Creating a defined type enables method definitions:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8032-a932-eef359eecbc4",
                    "type": "code",
                    "richText": [
                        [
                            "type UserID int"
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-8046-84cf-c734ac68a129",
            "type": "bulleted_list",
            "richText": [
                [
                    "Methods can now be attached to "
                ],
                [
                    "UserID",
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
            "id": "2f124eb1-ed54-8017-ba84-fa337a19ec29",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-80b4-8575-d15edb20a7ed",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Methods Are Not Stored in Structs"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8021-bbf7-f18a0318d881",
            "type": "bulleted_list",
            "richText": [
                [
                    "Methods are associated with "
                ],
                [
                    "types",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not values."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80c5-8587-cb9232f3125e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Struct values do not “contain” methods."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8025-b174-dd1836163dc6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Method lookup is resolved at compile time using the type."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80c0-88fd-ff4f38db445e",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-808a-b648-c7397cd2c258",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Methods vs Functions (Summary)"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80c4-a051-f715d01586e6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Function"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80c0-b068-d6771323bba7",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "No receiver."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8014-8006-ca5694f1b2d9",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Called by name."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-8037-afb4-f9a5eec24237",
            "type": "bulleted_list",
            "richText": [
                [
                    "Method"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-809e-9c29-e2a7c00d0b42",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Has a receiver."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8008-a7c4-fee22f22c45b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Called using dot notation on a value."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-80a8-90cd-fe63bb3518cc",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8044-9d90-ffd5d38c47e9",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Design Intent in Go"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8089-965f-c98a24270ed9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go uses methods to:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8039-96f0-e800718ed8d8",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Attach behavior to data."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-80ff-b233-fc6556686c95",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Enable interfaces."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-803d-8680-e3596af56743",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Avoid class-based inheritance."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-8037-824a-eafadbbbeb7f",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8061-accf-e8ece1a3dfba",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Things to Remember"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8001-bcdd-f6ddf712f800",
            "type": "bulleted_list",
            "richText": [
                [
                    "Receiver is not optional for methods."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-802c-9655-f10555d23dde",
            "type": "bulleted_list",
            "richText": [
                [
                    "T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " vs "
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
                    " affects mutability and method sets."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80dc-9f2a-e92bd00d5161",
            "type": "bulleted_list",
            "richText": [
                [
                    "Methods are just functions with a special first argument."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-809c-ae5a-e4de16fe0146",
            "type": "bulleted_list",
            "richText": [
                [
                    "Defined type + receiver = method."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80c7-8bc7-c2e1ccf9e179",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8021-ab41-f66cc321187c",
            "type": "sub_header",
            "richText": [
                [
                    "Method Set"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80d0-b035-e01cce1a6d85",
            "type": "bulleted_list",
            "richText": [
                [
                    "A method set is the "
                ],
                [
                    "exact set of methods that a type is allowed to call",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-806a-9b45-cdac2c8c654b",
            "type": "bulleted_list",
            "richText": [
                [
                    "The compiler uses the method set to decide:"
                ]
            ],
            "children": [
                {
                    "id": "2f224eb1-ed54-806d-a2c7-efb6e06de33e",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Which methods can be invoked on a value."
                        ]
                    ]
                },
                {
                    "id": "2f224eb1-ed54-80a7-a44d-cf37ceb2c67b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Whether a type satisfies an interface."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f224eb1-ed54-80c7-8bf7-e17f80d4d568",
            "type": "text",
            "richText": [
                [
                    "Method Set of a value type ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "T",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80df-bf3e-d402695f5800",
            "type": "bulleted_list",
            "richText": [
                [
                    "Contains "
                ],
                [
                    "only methods with receiver ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "T",
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
                    "."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-802e-a1b2-e5d8b196a3de",
            "type": "bulleted_list",
            "richText": [
                [
                    "Does "
                ],
                [
                    "not",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " include methods with receiver "
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
            "id": "2f224eb1-ed54-80d2-b86e-c4819a925951",
            "type": "text",
            "richText": [
                [
                    "Method Set of a pointer type ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "*T",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80a0-8285-d076f78b99ac",
            "type": "bulleted_list",
            "richText": [
                [
                    "Contains methods with receiver "
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
            "id": "2f224eb1-ed54-8091-b3a2-e9fa57d64108",
            "type": "bulleted_list",
            "richText": [
                [
                    "Contains methods with receiver "
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
            "id": "2f224eb1-ed54-8046-a4f5-f3bf634d4df4",
            "type": "text",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-808d-959c-f6b4a1f3cac7",
            "type": "code",
            "richText": [
                [
                    "type User struct{}\n\nfunc (u User) Read() {}\nfunc (u *User) Write() {}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2f224eb1-ed54-8075-82d0-f81db1db5ac2",
            "type": "text",
            "richText": [
                [
                    "Method set of "
                ],
                [
                    "User",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-801a-927a-ed624437c892",
            "type": "bulleted_list",
            "richText": [
                [
                    "Read()",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80be-aced-fa02dc4312b1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Write()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " ❌ not included"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8042-afb8-cd4c89727380",
            "type": "text",
            "richText": [
                [
                    "Method set of "
                ],
                [
                    "*User",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80ae-be14-d55741830445",
            "type": "bulleted_list",
            "richText": [
                [
                    "Read()",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8023-b28f-d0b1c560d8ba",
            "type": "bulleted_list",
            "richText": [
                [
                    "Write()",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8072-80ce-ca2fca6ad816",
            "type": "text",
            "richText": [
                [
                    "Why this rule exists",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8017-8d2a-c40887aa30f0",
            "type": "bulleted_list",
            "richText": [
                [
                    "A value does not always have an address."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8002-920e-dee9b276c280",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pointer receiver methods require an address."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80dd-8999-e664fac3bd86",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go forbids calling pointer-receiver-only methods on plain values unless addressable."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8053-9b6b-ccdbfc1d8cab",
            "type": "text",
            "richText": [
                [
                    "Important compiler behavior (often misunderstood)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80e9-93fc-d924ddd9d033",
            "type": "bulleted_list",
            "richText": [
                [
                    "If a value "
                ],
                [
                    "is addressable",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", Go may automatically take its address for method calls."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-808d-940c-f96f3b3f5cba",
            "type": "bulleted_list",
            "richText": [
                [
                    "This is "
                ],
                [
                    "syntactic convenience",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not a change in method set rules."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8004-ab6f-e81152b61c6a",
            "type": "text",
            "richText": [
                [
                    "Correct but subtle:"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-802f-a05d-f74da8b06f87",
            "type": "code",
            "richText": [
                [
                    "u := User{}\nu.Write() // allowed because u is addressable"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2f224eb1-ed54-80c4-adf9-d6241ffe1afe",
            "type": "text",
            "richText": [
                [
                    "Still true:"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8037-b6ac-cdeac5a4eb2a",
            "type": "bulleted_list",
            "richText": [
                [
                    "User",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "’s method set does NOT include "
                ],
                [
                    "Write()",
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
            "id": "2f224eb1-ed54-80ae-abc4-d77179ca6cbe",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-80a5-8d7f-da768fbbf8d8",
            "type": "bulleted_list",
            "richText": [
                [
                    "Method sets and interfaces (critical rule)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-804c-b9a8-ca8ec0b94683",
            "type": "bulleted_list",
            "richText": [
                [
                    "A type satisfies an interface "
                ],
                [
                    "only if its method set fully matches the interface",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8097-a495-cd927cb4f0c0",
            "type": "text",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80f6-9d2c-cbc20076de61",
            "type": "code",
            "richText": [
                [
                    "type Writer interface {\n    Write()\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2f224eb1-ed54-8026-b174-c1edcd6a4d21",
            "type": "text",
            "richText": [
                [
                    "Results:"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8019-8da0-ebbfe982dff0",
            "type": "bulleted_list",
            "richText": [
                [
                    "User",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " ❌ does NOT implement "
                ],
                [
                    "Writer",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8037-8426-c775e26232e8",
            "type": "bulleted_list",
            "richText": [
                [
                    "*User",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " ✅ implements "
                ],
                [
                    "Writer",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80dc-ba2b-cf6a38f0240c",
            "type": "text",
            "richText": [
                [
                    "Reason:"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-804c-bfc3-c10b7162f223",
            "type": "bulleted_list",
            "richText": [
                [
                    "Write()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " exists only in "
                ],
                [
                    "*User",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "’s method set."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8096-b1de-f8767ea832b2",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-806d-99bd-e076967290ec",
            "type": "text",
            "richText": [
                [
                    "Common mistake (you must avoid)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8052-8b08-c158bad83c35",
            "type": "bulleted_list",
            "richText": [
                [
                    "Thinking: “If I can call the method, it’s in the method set”"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80b9-bed5-d7708142ad3e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Wrong."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80d4-9b83-fd530e439fbc",
            "type": "bulleted_list",
            "richText": [
                [
                    "Method sets are a "
                ],
                [
                    "compile-time type property",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not a call-site convenience."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80f8-a8c2-d9d78eb9b69e",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-8082-a398-e91b3bc145b6",
            "type": "text",
            "richText": [
                [
                    "Rule summary (memorize this)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8012-8524-eb3dc8d85b32",
            "type": "bulleted_list",
            "richText": [
                [
                    "Method set of "
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
                    " → methods with receiver "
                ],
                [
                    "T",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8040-a7b0-c1a08310f00e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Method set of "
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
                    " → methods with receiver "
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
                    " and "
                ],
                [
                    "*T",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8074-96c9-ef4ccced28a3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Interface checks use method sets only"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8005-8c16-dd538f7c6c4d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Auto-addressing does NOT change method sets"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80f5-83b8-eaa1ccffea21",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-8067-a42e-cbbf4fc17958",
            "type": "bulleted_list",
            "richText": [
                [
                    "What you got right",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80a7-a1fa-c23bd3524e9e",
            "type": "bulleted_list",
            "richText": [
                [
                    "If a method has receiver "
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
                    ", then:"
                ]
            ],
            "children": [
                {
                    "id": "2f224eb1-ed54-801d-a4a7-d9badf862572",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "The method is "
                        ],
                        [
                            "not",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " in "
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
                            "’s method set."
                        ]
                    ]
                },
                {
                    "id": "2f224eb1-ed54-8007-aec7-e37c80f860b4",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "The method "
                        ],
                        [
                            "is",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " in "
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
                            "’s method set."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f224eb1-ed54-8066-8026-f60c8d50736a",
            "type": "bulleted_list",
            "richText": [
                [
                    "This part is "
                ],
                [
                    "100% correct",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8077-bffb-eab2003c738c",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-806a-959b-f649c3b86550",
            "type": "bulleted_list",
            "richText": [
                [
                    "What you missed (this is important)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80c5-9ddf-d513fac86a68",
            "type": "bulleted_list",
            "richText": [
                [
                    "A value of type "
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
                    " can call a "
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
                    " receiver method "
                ],
                [
                    "only if the value is addressable",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-800a-a02b-d282fb3ba47e",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-8084-94b9-d51bf8ac681e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Correct, complete statement",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-803e-905d-d6f1b0d1dda6",
            "type": "bulleted_list",
            "richText": [
                [
                    "If a method has receiver "
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
                    ":"
                ]
            ],
            "children": [
                {
                    "id": "2f224eb1-ed54-80a1-928c-d75fe4ac31bd",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "T",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            "’s method set does "
                        ],
                        [
                            "not",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " include it."
                        ]
                    ]
                },
                {
                    "id": "2f224eb1-ed54-804b-8e0b-d8d910157d33",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "*T",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            "’s method set "
                        ],
                        [
                            "does",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " include it."
                        ]
                    ]
                },
                {
                    "id": "2f224eb1-ed54-80b7-bb29-da2eefb37c78",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "A value of type "
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
                            " can call it "
                        ],
                        [
                            "only when the compiler can take its address",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            "."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f224eb1-ed54-809c-bff4-e3e6493a9acf",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-8095-91fe-fb058359258e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Addressable vs non-addressable (key distinction)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80d8-be48-d21b68e06253",
            "type": "text",
            "richText": [
                [
                    "Addressable → call allowed:"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-808c-a0e3-eb2ff0800286",
            "type": "code",
            "richText": [
                [
                    "t := T{}\nt.M() // compiler rewrites to (&t).M()\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2f224eb1-ed54-809a-b471-ef6d0ee05a65",
            "type": "text",
            "richText": [
                [
                    "Not addressable → call NOT allowed:"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-800a-96d1-f078ebad3212",
            "type": "code",
            "richText": [
                [
                    "T{}.M()        // compile-time error\ngetT().M()     // compile-time error if getT() returns T\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2f224eb1-ed54-80a5-a518-f90d2a9b9271",
            "type": "text",
            "richText": [
                [
                    "Reason:"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-801b-95d2-f6b362a66721",
            "type": "bulleted_list",
            "richText": [
                [
                    "The compiler cannot take the address of a temporary value."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80ad-8f4e-de95ad2f775f",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-8038-ba62-efc4ef250091",
            "type": "bulleted_list",
            "richText": [
                [
                    "Why this does NOT affect method sets",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-803f-bdbb-e4c282b0bbb1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Auto-addressing is a "
                ],
                [
                    "call-site convenience only",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-802f-913e-c85fb828aa42",
            "type": "bulleted_list",
            "richText": [
                [
                    "It does "
                ],
                [
                    "not",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " modify:"
                ]
            ],
            "children": [
                {
                    "id": "2f224eb1-ed54-8049-8cf2-f8a298713acf",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "the type"
                        ]
                    ]
                },
                {
                    "id": "2f224eb1-ed54-801a-be3b-e39233bf0211",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "the method set"
                        ]
                    ]
                },
                {
                    "id": "2f224eb1-ed54-80b8-899f-c513a17bf52c",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "interface satisfaction"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f224eb1-ed54-80ee-840e-fc54248af878",
            "type": "text",
            "richText": [
                [
                    "So this is always true:"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80b8-8473-ed25514aea5a",
            "type": "bulleted_list",
            "richText": [
                [
                    "T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " does "
                ],
                [
                    "not",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " implement an interface that requires a method implemented with receiver "
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
            "id": "2f224eb1-ed54-804f-8c2c-cfe39a446d3e",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-802d-ae87-fe3bca821b08",
            "type": "bulleted_list",
            "richText": [
                [
                    "One-line rule (exact)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80bc-88d6-cc1f8aa5ed60",
            "type": "bulleted_list",
            "richText": [
                [
                    "Calling a method ≠ method being in the method set."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80b7-b0e8-d4863a314d69",
            "type": "bulleted_list",
            "richText": [
                [
                    "Method sets are "
                ],
                [
                    "type-level",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", calls are "
                ],
                [
                    "context-level",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80b1-b38f-f9b9af6178b8",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-80d9-a430-fa7b8c9967ac",
            "type": "bulleted_list",
            "richText": [
                [
                    "Final corrected version of your sentence",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80dc-8dab-cc1f235edf40",
            "type": "bulleted_list",
            "richText": [
                [
                    "❌ Incomplete:"
                ]
            ],
            "children": [
                {
                    "id": "2f224eb1-ed54-804a-8121-f2c61ac3658d",
                    "type": "text",
                    "richText": [
                        [
                            "“If a method has receiver "
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
                            ", then a "
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
                            " can also call it…”"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f224eb1-ed54-8014-abed-cb5446785fd1",
            "type": "bulleted_list",
            "richText": [
                [
                    "✅ Correct:"
                ]
            ],
            "children": [
                {
                    "id": "2f224eb1-ed54-8012-88a6-f3a55ed9eb3a",
                    "type": "text",
                    "richText": [
                        [
                            "“If a method has receiver "
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
                            ", a value of type "
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
                            " can call it "
                        ],
                        [
                            "only if it is addressable",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            ", but "
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
                            "’s method set still does not include it.”"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f224eb1-ed54-801d-87b6-d1140af302b5",
            "type": "text",
            "richText": [
                [
                    "If you want, next we can:"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80cf-8328-e473e99d17d6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Prove this with interface assignment failures"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80b6-aca7-cb3051a9e311",
            "type": "bulleted_list",
            "richText": [
                [
                    "Contrast this with C++ implicit "
                ],
                [
                    "this",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-801d-8611-ca95c0502f58",
            "type": "bulleted_list",
            "richText": [
                [
                    "Build a decision table you can memorize for interviews"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8064-ac12-e3c80aa30819",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-80a0-ba8e-e5dba0e415a2",
            "type": "text",
            "richText": [
                [
                    "Not every value of type "
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
                    " can call a method with receiver "
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
            "id": "2f224eb1-ed54-804b-beb6-d65cef09b050",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-8019-8abd-f4920f6a4c36",
            "type": "text",
            "richText": [
                [
                    "When a ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "T",
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
                    " value CAN call a ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "*T",
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
                    " receiver method",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8033-900f-c894fb5f6e84",
            "type": "bulleted_list",
            "richText": [
                [
                    "The value is "
                ],
                [
                    "addressable",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80a1-9af4-dac2c7327385",
            "type": "bulleted_list",
            "richText": [
                [
                    "Examples:"
                ]
            ],
            "children": [
                {
                    "id": "2f224eb1-ed54-8055-b6e2-c584315801af",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Local variables"
                        ]
                    ]
                },
                {
                    "id": "2f224eb1-ed54-80ec-b9ae-f6b29d8a8fc1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Struct fields"
                        ]
                    ]
                },
                {
                    "id": "2f224eb1-ed54-8087-9f10-dc5cd0f4056e",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Array elements"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f224eb1-ed54-806c-bcb9-c82843309bda",
            "type": "code",
            "richText": [
                [
                    "t := T{}\nt.M() // allowed → rewritten as (&t).M()\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2f224eb1-ed54-80b2-bb56-d27431ba898c",
            "type": "text",
            "richText": [
                [
                    "When a ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "T",
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
                    " value CANNOT call a ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "*T",
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
                    " receiver method",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80fe-831d-e35db113c19a",
            "type": "bulleted_list",
            "richText": [
                [
                    "The value is "
                ],
                [
                    "not addressable",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8052-ae6c-e6399d2a5eae",
            "type": "bulleted_list",
            "richText": [
                [
                    "Examples:"
                ]
            ],
            "children": [
                {
                    "id": "2f224eb1-ed54-80e1-aa0b-d8a5effee5a4",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Composite literals"
                        ]
                    ]
                },
                {
                    "id": "2f224eb1-ed54-8082-9e36-c8767aaa89e1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Function return values"
                        ]
                    ]
                },
                {
                    "id": "2f224eb1-ed54-804a-aec6-d6a4ec8aa919",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Map index results"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f224eb1-ed54-8054-96b3-c77cbaf2616a",
            "type": "code",
            "richText": [
                [
                    "T{}.M()      // error\nmakeT().M()  // error\nm[key].M()   // error\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2f224eb1-ed54-8072-8598-ea3fc27c33a0",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-80a0-b999-d338af6ebe15",
            "type": "bulleted_list",
            "richText": [
                [
                    "Why this distinction exists",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-804c-9a3a-f2b7c6be7cf4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pointer receiver methods require an actual memory address."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8083-9f7a-c390ad49662c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Some "
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
                    " values do not have a stable address."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8038-993d-c8078982ffa9",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-80eb-95ce-c9ce2abc3e5b",
            "type": "bulleted_list",
            "richText": [
                [
                    "What does NOT change",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8015-8d57-dfc7245591c5",
            "type": "bulleted_list",
            "richText": [
                [
                    "T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "’s method set still excludes "
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
                    " receiver methods."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-806d-b14b-de7873ead515",
            "type": "bulleted_list",
            "richText": [
                [
                    "Interface satisfaction rules remain unchanged."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-809d-ba48-f8ac19e10936",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-8055-88db-c972d13e17aa",
            "type": "bulleted_list",
            "richText": [
                [
                    "One-sentence summary (perfectly accurate)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8002-8495-dd2f26e74255",
            "type": "bulleted_list",
            "richText": [
                [
                    "A "
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
                    " value can call a "
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
                    " receiver method "
                ],
                [
                    "only if it is addressable",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", even though that method is "
                ],
                [
                    "never",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " in "
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
                    "’s method set."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8067-8935-c6e2b1a040e0",
            "type": "divider"
        },
        {
            "id": "2f224eb1-ed54-80d9-88ab-f7b311e772ee",
            "type": "text",
            "richText": [
                [
                    "Quick check (teach it back)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8013-b9a9-e2a8ef8ba472",
            "type": "bulleted_list",
            "richText": [
                [
                    "Can "
                ],
                [
                    "T{}",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " call a "
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
                    " receiver method?"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8084-a8ef-e382952ff0db",
            "type": "bulleted_list",
            "richText": [
                [
                    "Can a local variable "
                ],
                [
                    "t := T{}",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " call it?"
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80a1-98a7-f71ee0d158e4",
            "type": "text",
            "richText": [
                [
                    "Answer those, and we’ll move to "
                ],
                [
                    "embedded types and method sets",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", where this rule becomes crucial."
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
