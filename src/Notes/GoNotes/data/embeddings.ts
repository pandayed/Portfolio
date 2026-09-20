/* Copied from the Embeddings page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-805c-8026-c2b48701fc5e",
    "slug": "embeddings",
    "title": "Embeddings",
    "updatedOn": "2025-08-09",
    "blocks": [
        {
            "id": "24024eb1-ed54-806e-9374-dae26742c155",
            "type": "text",
            "richText": [
                [
                    "It’s Go’s alternative to inheritance."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8045-844f-caffca52542e",
            "type": "text",
            "richText": [
                [
                    "Go supports "
                ],
                [
                    "composition over inheritance",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " by allowing you to "
                ],
                [
                    "embed",
                    [
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    " one struct or interface into another. This mechanism enables "
                ],
                [
                    "reusability",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "method promotion",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", and "
                ],
                [
                    "interface composition",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " without forming class hierarchies."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80f5-9c64-e3053680d0ef",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80c5-a33d-cd50305f97cd",
            "type": "sub_header",
            "richText": [
                [
                    "What is Embedding?",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80e4-b083-d24c3be72346",
            "type": "bulleted_list",
            "richText": [
                [
                    "Embedding is when a "
                ],
                [
                    "struct or interface",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " is included inside another "
                ],
                [
                    "without giving it a name",
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
            "id": "24024eb1-ed54-8071-8768-cfe6779f66a4",
            "type": "bulleted_list",
            "richText": [
                [
                    "All fields and methods of the embedded type become "
                ],
                [
                    "available to the outer type",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " (via "
                ],
                [
                    "promotion",
                    [
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    ")."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8029-9846-c01ce44a3dd1",
            "type": "bulleted_list",
            "richText": [
                [
                    "It works for both:"
                ]
            ],
            "children": [
                {
                    "id": "24024eb1-ed54-8084-9468-ddfd63f3b7fb",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Structs"
                        ]
                    ]
                },
                {
                    "id": "24024eb1-ed54-807e-be4d-f1103ad5c6b6",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Interfaces"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24024eb1-ed54-806c-b1f8-d8fd9de7c95c",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-807a-8dad-eb765b94b735",
            "type": "sub_header",
            "richText": [
                [
                    "Struct Embedding",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8019-8574-f93a14d8c35f",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Syntax:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8075-b0f7-c08b4a705801",
            "type": "code",
            "richText": [
                [
                    "type A struct {\n    FieldA int\n}\n\ntype B struct {\n    A // Embedded anonymously\n    FieldB int\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8001-8a07-db6fd1abd6bf",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Access:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80c3-bb03-e8e57d615757",
            "type": "code",
            "richText": [
                [
                    "b := B{A: A{FieldA: 10}, FieldB: 20}\nfmt.Println(b.FieldA) // Accesses A.FieldA directly"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80d0-b14e-e55940279f49",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Benefit:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80ae-9415-f0a9fbe1ac62",
            "type": "bulleted_list",
            "richText": [
                [
                    "Promotes reuse without inheritance."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-800c-bff3-f287ecb6be41",
            "type": "bulleted_list",
            "richText": [
                [
                    "Allows outer struct to use inner struct's fields/methods transparently."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8093-ba90-faf50e6beabc",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-800b-bd9f-d8e5ecc0a30b",
            "type": "sub_header",
            "richText": [
                [
                    "Method Overriding via Embedding",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80cd-abb1-dc4c314d565a",
            "type": "bulleted_list",
            "richText": [
                [
                    "If both the embedded and outer struct define a method with the same name, the outer method "
                ],
                [
                    "overrides",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " the inner one."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80dc-9858-d9b33248d6a8",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80e0-b9e2-f78c00dbc3fd",
            "type": "code",
            "richText": [
                [
                    "type Animal struct{}\nfunc (a Animal) Speak() { fmt.Println(\"Animal speaks\") }\n\ntype Dog struct {\n    Animal\n}\nfunc (d Dog) Speak() { fmt.Println(\"Dog barks\") }\n\nd := Dog{}\nd.Speak()          // Dog barks\nd.Animal.Speak()   // Animal speaks\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8074-ba9b-f4cc74926609",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-801d-a370-ff2145f2e99e",
            "type": "sub_header",
            "richText": [
                [
                    "Interface Embedding",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-809d-8ad2-d246323037dd",
            "type": "text",
            "richText": [
                [
                    "Interfaces can embed other interfaces to "
                ],
                [
                    "combine behaviors",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " modularly."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8078-8f45-cd720969595a",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-801e-9baa-c0f9ee6e19ca",
            "type": "code",
            "richText": [
                [
                    "type Reader interface {\n    Read()\n}\n\ntype Writer interface {\n    Write()\n}\n\ntype ReadWriter interface {\n    Reader\n    Writer\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8040-96aa-d171bcdd03a3",
            "type": "text",
            "richText": [
                [
                    "Any type that implements both "
                ],
                [
                    "Read()",
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
                    "Write()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " will satisfy "
                ],
                [
                    "ReadWriter",
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
            "id": "24024eb1-ed54-8075-89d0-ec1cf2dbde55",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-807a-8993-f7c2cebfc3a4",
            "type": "sub_header",
            "richText": [
                [
                    "Pointer vs Value Receiver Behavior",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80f1-871b-d443939a678f",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Rule:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8094-b1e9-cc902c42c32c",
            "type": "bulleted_list",
            "richText": [
                [
                    "If the embedded struct has methods with "
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
                    ", you must "
                ],
                [
                    "embed it as a pointer",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " to promote those methods."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-803f-9bfb-e08f4e67f0b1",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-805e-b1b2-e2e98ac97e03",
            "type": "code",
            "richText": [
                [
                    "type A struct{}\nfunc (a *A) Hello() {}\n\ntype B struct {\n    *A // embed as pointer to access Hello()\n}\n\nb := B{A: &A{}}\nb.Hello() // Works\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-808a-bb93-dd57ebfaf1a9",
            "type": "text",
            "richText": [
                [
                    "If "
                ],
                [
                    "A",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " was embedded as a value ("
                ],
                [
                    "A",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " instead of "
                ],
                [
                    "*A",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "), "
                ],
                [
                    "b.Hello()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " would not compile."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-808e-b007-e06c68b52e7f",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8097-a665-cef66d919e50",
            "type": "sub_header",
            "richText": [
                [
                    "Field Name Conflicts",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-800d-abfa-ebe4357074cf",
            "type": "text",
            "richText": [
                [
                    "If multiple embedded structs or the outer struct define the same field/method, you must "
                ],
                [
                    "explicitly qualify",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " the access."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8068-bc1b-cd4dc2ae04c6",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80e3-8d47-e29c00e7a60d",
            "type": "code",
            "richText": [
                [
                    "type A struct{ Name string }\ntype B struct{ Name string }\n\ntype C struct {\n    A\n    B\n}\n\nc := C{}\nc.A.Name = \"One\"\nc.B.Name = \"Two\"\n// fmt.Println(c.Name) → Compile error: ambiguous\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8068-b71a-cdc09464d507",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Outer field takes precedence:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80b4-8348-ecf4013181ac",
            "type": "code",
            "richText": [
                [
                    "type D struct {\n    A\n    Name string\n}\nd := D{A: A{Name: \"Inner\"}, Name: \"Outer\"}\nfmt.Println(d.Name)      // Outer\nfmt.Println(d.A.Name)    // Inner\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-801f-865d-cfc196c719d2",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-801d-a342-dcbe6020f7cc",
            "type": "sub_header",
            "richText": [
                [
                    "Embedding Multiple Structs or Interfaces",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80e6-a2a5-fafec00590fb",
            "type": "text",
            "richText": [
                [
                    "You can embed multiple structs/interfaces at once for composition."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80bc-baa5-f7941ebc5875",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Struct Example:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80c5-ab11-ef3a8f780a8b",
            "type": "code",
            "richText": [
                [
                    "type Engine struct { Power int }\ntype Wheels struct { Count int }\n\ntype Car struct {\n    Engine\n    Wheels\n}\nc := Car{Engine: Engine{120}, Wheels: Wheels{4}}\nfmt.Println(c.Power, c.Count)\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-803d-a51a-ccf4462d19cb",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Interface Example:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-807a-97a2-d5272454e633",
            "type": "code",
            "richText": [
                [
                    "type Mover interface { Move() }\ntype Talker interface { Talk() }\n\ntype Robot interface {\n    Mover\n    Talker\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8051-8524-cad8ac6dac9b",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80c1-9672-f4a108646a7e",
            "type": "sub_header",
            "richText": [
                [
                    "Embedding ≠ Inheritance",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80b4-b707-edfc9ce77e55",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Key Differences:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8034-8b5d-cb20aa9a1c9b",
            "type": "table",
            "children": [
                {
                    "id": "24024eb1-ed54-80af-ac02-c9127f0290a2",
                    "type": "table_row",
                    "cells": {
                        "oF?n": [
                            [
                                "Aspect"
                            ]
                        ],
                        "=`Kv": [
                            [
                                "Embedding (Go)"
                            ]
                        ],
                        "?tBl": [
                            [
                                "Inheritance (OOP)"
                            ]
                        ]
                    }
                },
                {
                    "id": "24024eb1-ed54-8073-981c-dd6731a92f68",
                    "type": "table_row",
                    "cells": {
                        "oF?n": [
                            [
                                "Type hierarchy"
                            ]
                        ],
                        "=`Kv": [
                            [
                                "None"
                            ]
                        ],
                        "?tBl": [
                            [
                                "Subclass of parent"
                            ]
                        ]
                    }
                },
                {
                    "id": "24024eb1-ed54-8013-b870-e41f010b393d",
                    "type": "table_row",
                    "cells": {
                        "oF?n": [
                            [
                                "Reusability method"
                            ]
                        ],
                        "=`Kv": [
                            [
                                "Composition"
                            ]
                        ],
                        "?tBl": [
                            [
                                "Inheritance"
                            ]
                        ]
                    }
                },
                {
                    "id": "24024eb1-ed54-8031-8057-da44962c2001",
                    "type": "table_row",
                    "cells": {
                        "oF?n": [
                            [
                                "Multiple embedding"
                            ]
                        ],
                        "=`Kv": [
                            [
                                "Allowed"
                            ]
                        ],
                        "?tBl": [
                            [
                                "Often not allowed"
                            ]
                        ]
                    }
                },
                {
                    "id": "24024eb1-ed54-802d-9147-c935c15104e9",
                    "type": "table_row",
                    "cells": {
                        "oF?n": [
                            [
                                "Behavior extension"
                            ]
                        ],
                        "=`Kv": [
                            [
                                "Explicit (overriding optional)"
                            ]
                        ],
                        "?tBl": [
                            [
                                "Implicit (override often expected)"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "oF?n",
                "=`Kv",
                "?tBl"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24024eb1-ed54-800a-bf25-ebe16d3be47a",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-803c-963a-d85456aea563",
            "type": "code",
            "richText": [
                [
                    "type Animal struct{}\nfunc (a Animal) Move() {}\n\ntype Robot struct{}\nfunc (r Robot) Move() {}\n\ntype Cyborg struct {\n    Animal\n    Robot\n}\nc := Cyborg{}\nc.Animal.Move()\nc.Robot.Move()\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-804d-b767-c7769e0ae1ff",
            "type": "quote",
            "richText": [
                [
                    "Cyborg has both Animal and Robot abilities, but is not a subtype of either."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8077-802e-c58cb89c77e8",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80b7-b142-f98635f0dd0f",
            "type": "sub_header",
            "richText": [
                [
                    "Summary",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80ba-ba67-d7319aa2fc76",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "struct embedding",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " to reuse fields and methods without inheritance."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80d7-ba12-e54c90b12854",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "interface embedding",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " to build modular, composable interfaces."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8003-9106-ed60b072804f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Method and field "
                ],
                [
                    "promotion",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " makes embedded members accessible."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8087-b9e8-f83f264b7c6f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Name conflicts require "
                ],
                [
                    "qualified access",
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
            "id": "24024eb1-ed54-80c2-9ef9-e7ff00754959",
            "type": "bulleted_list",
            "richText": [
                [
                    "Embedding is "
                ],
                [
                    "composition",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not OOP inheritance."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8044-ac1f-eb918db7fae3",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80de-87f5-eb7cb6be63de",
            "type": "text"
        },
        {
            "id": "24024eb1-ed54-808f-b513-ff7431bfff47",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
