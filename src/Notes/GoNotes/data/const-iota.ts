/* Copied from the const & iota page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "2ef24eb1-ed54-80e2-8aa2-dbdc21358c81",
    "slug": "const-iota",
    "title": "const & iota",
    "updatedOn": "2026-01-21",
    "blocks": [
        {
            "id": "2ef24eb1-ed54-800f-8365-d120c1661196",
            "type": "sub_header",
            "richText": [
                [
                    "const",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " in Go"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8018-84e6-e00c0ae83dac",
            "type": "text",
            "richText": [
                [
                    "What ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "const",
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
                    " is",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80c6-8b8a-c0362f54da1a",
            "type": "bulleted_list",
            "richText": [
                [
                    "const",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " declares "
                ],
                [
                    "compile-time constants",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8066-bc79-da595eac7b2d",
            "type": "bulleted_list",
            "richText": [
                [
                    "The value:"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-80bf-a1c1-c9c3d3a39d71",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Is fixed at compile time"
                        ]
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-80b1-ab9d-c78af18b71bf",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Cannot change at runtime"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-800b-96b1-d1a064c44a66",
            "type": "text",
            "richText": [
                [
                    "What can be ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "const",
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
            "id": "2ef24eb1-ed54-803d-8c25-fdecd5611dee",
            "type": "bulleted_list",
            "richText": [
                [
                    "Numbers"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80ec-91a1-fd094eba823e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Strings"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-809f-a98f-c0f27a068b68",
            "type": "bulleted_list",
            "richText": [
                [
                    "Booleans"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80df-9f92-f4ffd54193f8",
            "type": "bulleted_list",
            "richText": [
                [
                    "Expressions made only of constants"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80d1-a682-cc38ebdaf0ed",
            "type": "text",
            "richText": [
                [
                    "What cannot be ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "const",
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
                    " (important)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80a9-bec7-e0f93093747e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Function results"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80fd-8146-fe623558ff39",
            "type": "bulleted_list",
            "richText": [
                [
                    "Runtime values"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80f3-8fbc-e03dc9aeb59e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Slices, maps, structs"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-802b-8864-d45c65a47a11",
            "type": "text",
            "richText": [
                [
                    "Why ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "const",
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
                    " exists",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80cc-a736-ef71ab2a601a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Safety: value cannot change"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-802c-a7b7-c50e1ea78bc9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Performance: no runtime storage needed"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8041-abbe-ea0e9f85bad0",
            "type": "bulleted_list",
            "richText": [
                [
                    "Express intent: “this is fixed forever”"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80a0-9e6e-c64e893a7b4c",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-80be-acc8-f715d57ff506",
            "type": "sub_header",
            "richText": [
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " in Go"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8075-a9a8-d986b4ca5453",
            "type": "text",
            "richText": [
                [
                    "What ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "iota",
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
                    " is",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80bc-a499-c528b9aeb289",
            "type": "bulleted_list",
            "richText": [
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a "
                ],
                [
                    "counter",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80c0-976c-cfe7a52acccc",
            "type": "bulleted_list",
            "richText": [
                [
                    "It exists "
                ],
                [
                    "only inside a ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "const",
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
                    " block",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80cb-bd99-c05b77002660",
            "type": "bulleted_list",
            "richText": [
                [
                    "It starts at "
                ],
                [
                    "0",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80a8-8b1c-f360719e566b",
            "type": "bulleted_list",
            "richText": [
                [
                    "It increments by "
                ],
                [
                    "1",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " for each line"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8011-8003-c7a41920202a",
            "type": "text",
            "richText": [
                [
                    "Critical rule",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-807d-b408-c283f74a2933",
            "type": "bulleted_list",
            "richText": [
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is reset to "
                ],
                [
                    "0",
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
                    "for every new ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "const",
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
                    " block",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80de-a1f6-dc442a43e20a",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-802e-b08f-f9bb4a496c2d",
            "type": "sub_header",
            "richText": [
                [
                    "How "
                ],
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " actually works (step-by-step)"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8051-b0de-d0cbe9d108ca",
            "type": "text",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-807a-8cfa-eb044a6467d3",
            "type": "code",
            "richText": [
                [
                    "const (\n    A = iota\n    B\n    C\n)\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2ef24eb1-ed54-80dc-a0bf-edac0fe00650",
            "type": "text",
            "richText": [
                [
                    "What happens:"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80c4-929f-f7c3a06f1e29",
            "type": "bulleted_list",
            "richText": [
                [
                    "First line → "
                ],
                [
                    "iota = 0",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → "
                ],
                [
                    "A = 0",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8090-8d7d-f06faa15960d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Second line → "
                ],
                [
                    "iota = 1",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → "
                ],
                [
                    "B = 1",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8046-a8d7-f84f5fb62dcb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Third line → "
                ],
                [
                    "iota = 2",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → "
                ],
                [
                    "C = 2",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80b4-ba21-f384b8c3861d",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-8040-a986-e90a56895242",
            "type": "sub_header",
            "richText": [
                [
                    "Why "
                ],
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " exists"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80a1-a508-e74ff2e4d7ed",
            "type": "bulleted_list",
            "richText": [
                [
                    "To define "
                ],
                [
                    "related constants",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-804a-ac1e-f50333db99a7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Especially:"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8037-a9e2-e0cdd106b70e",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Enums"
                        ]
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-803f-a77e-d600412b625b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "States"
                        ]
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-804c-aa41-f6b10e6867b2",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Modes"
                        ]
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-8071-a26b-c62b8fd4d339",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Flags"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8068-931e-d5b9aeb9904d",
            "type": "text",
            "richText": [
                [
                    "Without "
                ],
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", you would repeat numbers manually."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8059-9bb9-c7a9a20b25d9",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-8018-93c6-e8e467994cf0",
            "type": "sub_header",
            "richText": [
                [
                    "Are "
                ],
                [
                    "const",
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
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " related?"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8055-ab23-f6697e70b976",
            "type": "text",
            "richText": [
                [
                    "Yes, but precisely",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8065-9633-fe1b79be5299",
            "type": "bulleted_list",
            "richText": [
                [
                    "const",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is the "
                ],
                [
                    "feature",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8036-bc77-c75b082508ac",
            "type": "bulleted_list",
            "richText": [
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a "
                ],
                [
                    "tool inside ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "const",
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
            "id": "2ef24eb1-ed54-80c4-baa8-c56da949fb6b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Relationship:"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-8080-be83-e6e668f5a5ae",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "iota",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " only works inside "
                        ],
                        [
                            "const",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ]
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-807b-8aec-fd820aea020e",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "const",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " works perfectly without "
                        ],
                        [
                            "iota",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8061-a177-caab32c80ee0",
            "type": "text",
            "richText": [
                [
                    "So:"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8049-a78c-f8e64ced22f9",
            "type": "bulleted_list",
            "richText": [
                [
                    "const",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " ≠ "
                ],
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8081-a7dd-f5c15f5b8d31",
            "type": "bulleted_list",
            "richText": [
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " ⊂ "
                ],
                [
                    "const",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80cc-a27f-cf25365c2226",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-8038-8bd0-eb4b63a61a03",
            "type": "sub_header",
            "richText": [
                [
                    "Real-world use (this is important)"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8040-aa9d-d3037b45d996",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Enum-like values"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8096-bdbc-fa858498e63c",
            "type": "code",
            "richText": [
                [
                    "const (\n    Pending = iota\n    Approved\n    Rejected\n)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2ef24eb1-ed54-80c0-80b8-c60e6fa2d668",
            "type": "text",
            "richText": [
                [
                    "Why this is good:"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80d5-99e2-cedbfe059f5b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Clear meaning"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-808e-ac47-ec9374184be9",
            "type": "bulleted_list",
            "richText": [
                [
                    "No magic numbers"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80c2-a4b3-e24bcb6eb123",
            "type": "bulleted_list",
            "richText": [
                [
                    "Easy to insert new states"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8091-87ae-d0837f34268d",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-8098-afd9-c48c00b7d18a",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Skipping values"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80b4-af50-ef4e3cf78e52",
            "type": "code",
            "richText": [
                [
                    "const (\n    _ = iota\n    Read\n    Write\n)\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2ef24eb1-ed54-80e5-8d3d-f626e927a291",
            "type": "bulleted_list",
            "richText": [
                [
                    "_",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " ignores "
                ],
                [
                    "0",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80dd-86b8-d4abda66a88c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Read = 1",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8063-80f6-d1b6145a24cc",
            "type": "bulleted_list",
            "richText": [
                [
                    "Write = 2",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-800f-8c5d-e8e7a1ca052b",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-80d7-bcc2-ddfcaf06b320",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Bit flags (very common)"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-800c-bae1-ff686e529df5",
            "type": "code",
            "richText": [
                [
                    "const (\n    Read = 1 << iota\n    Write\n    Execute\n)\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2ef24eb1-ed54-8088-8ec2-f25b4147827b",
            "type": "text",
            "richText": [
                [
                    "Results:"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80bb-abc9-e4797bf4d71a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Read = 1",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " ("
                ],
                [
                    "001",
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
            "id": "2ef24eb1-ed54-8086-b61b-fb4995c945bc",
            "type": "bulleted_list",
            "richText": [
                [
                    "Write = 2",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " ("
                ],
                [
                    "010",
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
            "id": "2ef24eb1-ed54-80c6-b667-d74a7c2c5b36",
            "type": "bulleted_list",
            "richText": [
                [
                    "Execute = 4",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "("
                ],
                [
                    "100",
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
            "id": "2ef24eb1-ed54-80c0-8813-de726c9ff596",
            "type": "text",
            "richText": [
                [
                    "Used for:"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-801b-a9a2-eb35dfbe42fc",
            "type": "bulleted_list",
            "richText": [
                [
                    "Permissions"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80bc-8331-e7a972f648d6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Feature flags"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8034-9bf3-de8ab46ef9e3",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-8072-85aa-c23d6539cc33",
            "type": "sub_header",
            "richText": [
                [
                    "Are they actually used in real Go code?"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80ea-a5f2-e316c8e59cc9",
            "type": "text",
            "richText": [
                [
                    "Yes, heavily",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-807b-b797-c7f511d5de50",
            "type": "bulleted_list",
            "richText": [
                [
                    "Standard library uses them"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-803f-a64f-f2e8dea71331",
            "type": "bulleted_list",
            "richText": [
                [
                    "Production Go services use them"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-801e-965e-e5e52a46f032",
            "type": "bulleted_list",
            "richText": [
                [
                    "Especially for:"
                ]
            ],
            "children": [
                {
                    "id": "2ef24eb1-ed54-805e-b678-fa94411a3a34",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Enums"
                        ]
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-80fb-82ae-e2ede44f74f2",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Flags"
                        ]
                    ]
                },
                {
                    "id": "2ef24eb1-ed54-80c9-ba86-ce4446727254",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Protocol states"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2ef24eb1-ed54-8073-b26e-ffcee319ba1f",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-8021-a194-e9895e1edd7e",
            "type": "sub_header",
            "richText": [
                [
                    "Common beginner mistake (important)"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80eb-817c-c4cc5682c3e6",
            "type": "text",
            "richText": [
                [
                    "Wrong assumption",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-801d-ae47-fc8255fcfdb0",
            "type": "bulleted_list",
            "richText": [
                [
                    "“"
                ],
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is like a variable”"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8017-b9eb-cac31955e1d7",
            "type": "text",
            "richText": [
                [
                    "Correction",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80c7-ae98-ca5b16bc0fa3",
            "type": "bulleted_list",
            "richText": [
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is "
                ],
                [
                    "not a variable",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-807c-b66a-f5e967cc4ea6",
            "type": "bulleted_list",
            "richText": [
                [
                    "It is a "
                ],
                [
                    "compile-time counter",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-808a-bcc3-c270ac83cd35",
            "type": "bulleted_list",
            "richText": [
                [
                    "You cannot read or modify it at runtime"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8083-8969-ce0cb79264c5",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-8026-b1aa-c6c1e5b14c98",
            "type": "sub_header",
            "richText": [
                [
                    "Final mental model"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8032-9c87-cc246c9b60d4",
            "type": "bulleted_list",
            "richText": [
                [
                    "const",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → “this value is fixed at compile time”"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8011-82c4-ec0e084db0ef",
            "type": "bulleted_list",
            "richText": [
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → “generate related constant values automatically”"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8017-8cba-f67ccadf1286",
            "type": "bulleted_list",
            "richText": [
                [
                    "They are related because "
                ],
                [
                    "iota",
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
                    "only exists to help ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "const",
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
        }
    ]
} as const satisfies GoNote;

export default note;
