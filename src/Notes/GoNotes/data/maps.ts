/* Copied from the Maps page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8096-9741-edb8eca726fb",
    "slug": "maps",
    "title": "Maps",
    "updatedOn": "2026-01-23",
    "blocks": [
        {
            "id": "24224eb1-ed54-809a-8afc-d252bad6d1e1",
            "type": "bulleted_list",
            "richText": [
                [
                    "An unordered collection of key-value pairs",
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
            "id": "24224eb1-ed54-80aa-9a27-f31ced372a98",
            "type": "bulleted_list",
            "richText": [
                [
                    "Keys must be "
                ],
                [
                    "comparable",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " (e.g., strings, ints, not slices or maps)."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8006-b0fc-ee79ea55bcb1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Values can be of any type."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8041-8d3d-f2b128ebe60e",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8047-935c-cc5e36842afa",
            "type": "sub_header",
            "richText": [
                [
                    "Declaring Maps",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8068-9086-da8212a6c8fa",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Using ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "make()",
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
            "id": "24224eb1-ed54-8082-92e3-d702b85848b2",
            "type": "code",
            "richText": [
                [
                    "m := make(map[string]int) // m is not nil"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8041-adf2-f5d1b19e2d6f",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Using Literal Syntax",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80e0-a40d-f003e4774458",
            "type": "code",
            "richText": [
                [
                    "m := map[string]int{\n    \"apple\":  5,\n    \"banana\": 10,\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8013-ba4d-d6615b553578",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Nil Map (Read-Only, Will Panic on Write)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80f8-9067-f0276480e983",
            "type": "code",
            "richText": [
                [
                    "var m map[string]int // nil map"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2f124eb1-ed54-805a-bcf5-dd1087f16dd1",
            "type": "bulleted_list",
            "richText": [
                [
                    "A nil map is intentionally usable only in read-like contexts.",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80ae-9faf-d817545446d2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Primary purpose of a nil map"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80d0-ba13-ded2b1126b92",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Represents "
                        ],
                        [
                            "“no map provided”",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " or "
                        ],
                        [
                            "“map absent”",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            ", not “empty but usable”."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-803a-ab7b-c031cd096734",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Saves allocation when no writes are needed."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-80bc-9ce3-c895645edb63",
            "type": "bulleted_list",
            "richText": [
                [
                    "Valid uses of a nil map"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80e6-8d89-de34f96f00b1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "As a default zero value for function parameters and struct fields."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8024-bf08-dc569ec303b9",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Safe to:"
                        ]
                    ],
                    "children": [
                        {
                            "id": "2f124eb1-ed54-80ff-b28f-f2f29f647a3a",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Read: "
                                ],
                                [
                                    "v := m[k]",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ]
                            ]
                        },
                        {
                            "id": "2f124eb1-ed54-80f0-90a7-d8a96b8d3e20",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Check length: "
                                ],
                                [
                                    "len(m)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ]
                            ]
                        },
                        {
                            "id": "2f124eb1-ed54-8098-86d7-e5ee68a38ee1",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Iterate: "
                                ],
                                [
                                    "for k, v := range m",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ]
                            ]
                        },
                        {
                            "id": "2f124eb1-ed54-8006-8c0b-f28c23e888b2",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Delete: "
                                ],
                                [
                                    "delete(m, k)",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " (no-op)"
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-801f-9e99-d09958852894",
            "type": "bulleted_list",
            "richText": [
                [
                    "Why writes are disallowed"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8071-8f03-ede6dd3870ee",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Writing requires allocating internal buckets."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8073-a540-fd17c10882ff",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Go does "
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
                            " auto-initialize maps on write."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8061-82dc-f1c6351f12f3",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "This avoids hidden allocations and keeps behavior explicit."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-80af-bbde-fbf99e5e641b",
            "type": "bulleted_list",
            "richText": [
                [
                    "How you "
                ],
                [
                    "actually",
                    [
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    " use a nil map when writes may happen"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-806d-9a48-ee37a16459d0",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Pattern:"
                        ]
                    ],
                    "children": [
                        {
                            "id": "2f124eb1-ed54-8015-8d15-f3e1c92d46c4",
                            "type": "code",
                            "richText": [
                                [
                                    "if m == nil {\n    m = make(map[string]int)\n}\nm[\"a\"] = 1"
                                ]
                            ],
                            "language": "Go"
                        }
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8018-aec1-d9b4ca47467f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "This makes allocation "
                        ],
                        [
                            "explicit and predictable",
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
            "id": "2f124eb1-ed54-8062-998b-c0d7c3254591",
            "type": "bulleted_list",
            "richText": [
                [
                    "Design intent (important)"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8021-a467-cae85a8901eb",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Nil map ≠ empty map."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-80fb-b6eb-ed03a7f42315",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Nil map means “absence”."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-80c0-9ffa-c6b12333f39f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Empty-but-writable map means “present but currently empty”."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-8035-ae61-fa259a5627fb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Bottom line"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80ec-a0b0-c6e384129e08",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "You "
                        ],
                        [
                            "do not write to a nil map",
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
                    "id": "2f124eb1-ed54-8080-a7bd-d6c485b27170",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "You "
                        ],
                        [
                            "either treat it as read-only",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            ", or "
                        ],
                        [
                            "initialize it before first write",
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
            "id": "2f124eb1-ed54-80fe-888b-fd58be40fb33",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8096-8f5e-df3bed74dad5",
            "type": "sub_header",
            "richText": [
                [
                    "nil",
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
                    "non-nil",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " for map"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8099-af60-ca1623bb2406",
            "type": "bulleted_list",
            "richText": [
                [
                    "What "
                ],
                [
                    "nil",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " means for a map"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80fc-bfd4-dbd900889d9a",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "nil",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " means "
                        ],
                        [
                            "no map value exists at all",
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
                    "id": "2f124eb1-ed54-80c3-bbf0-e4c54a09c6c3",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "The map header pointer is "
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
                            "."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8059-8593-f11e3329806a",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "There is "
                        ],
                        [
                            "no internal structure",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " allocated."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-80c6-84fc-df2122d9b9c8",
            "type": "bulleted_list",
            "richText": [
                [
                    "What "
                ],
                [
                    "make(map[string]int)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " does"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8087-a950-e51f2806a3aa",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Allocates a "
                        ],
                        [
                            "map header",
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
                    "id": "2f124eb1-ed54-807e-a3d8-cf8c2599da83",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Initializes internal bookkeeping so the map can accept inserts."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8005-a4f9-c00d0b4eabd8",
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
                            " insert any key–value pairs."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-80c5-b367-e8f7c4ff5595",
            "type": "bulleted_list",
            "richText": [
                [
                    "Resulting state"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-801f-b5b1-c8115f46e41b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Map is "
                        ],
                        [
                            "empty",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            ": it contains zero key–value pairs."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-803a-8d91-e32005f052b3",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Map is "
                        ],
                        [
                            "not nil",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            ": it points to a valid, initialized map structure."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-802c-8ded-d5cb9c3ac94f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Precise distinction"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80bd-8244-cfb01113cc1d",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "len(m) == 0",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " → map has no entries."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8044-aade-d8498a7dd178",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "m == nil",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " → map does not exist."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8039-a4f5-edfefb446e9c",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "With "
                        ],
                        [
                            "make",
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
                            "len(m) == 0",
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
                            "m != nil",
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
            "id": "2f124eb1-ed54-804c-b22b-f52f19524af8",
            "type": "bulleted_list",
            "richText": [
                [
                    "Concrete contrast"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-805c-807b-efc827c9aa2d",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "var m map[string]int",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2f124eb1-ed54-8086-89da-d0164ea440b3",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "No allocation."
                                ]
                            ]
                        },
                        {
                            "id": "2f124eb1-ed54-80b4-afa6-e7d524f487d3",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "m == nil",
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
                    "id": "2f124eb1-ed54-805b-bdfc-e903ceaab8b6",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "m := make(map[string]int)",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2f124eb1-ed54-8032-9009-facd1753bafc",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Allocation happened."
                                ]
                            ]
                        },
                        {
                            "id": "2f124eb1-ed54-804e-9984-c3e159877863",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "m != nil",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    ", even though no values are stored."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-804d-a3fa-f92c32b3c646",
            "type": "text"
        },
        {
            "id": "24224eb1-ed54-8090-ab9f-f3a429b22fe2",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8060-a63c-ff74aaba395f",
            "type": "sub_header",
            "richText": [
                [
                    "Inserting & Updating Elements",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8026-8920-ccdccce3a0c9",
            "type": "code",
            "richText": [
                [
                    "m[\"apple\"] = 10      // insert or update"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8057-a8e3-cb5b9f0cbe7e",
            "type": "bulleted_list",
            "richText": [
                [
                    "If the key exists, it updates the value."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8074-a730-ebfa7b61ebf1",
            "type": "bulleted_list",
            "richText": [
                [
                    "If not, it adds a new key-value pair."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80b2-9dd5-fdee985437f8",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80c6-bd2c-f684b14cf516",
            "type": "sub_header",
            "richText": [
                [
                    "Accessing Values",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80be-8e63-dec81210b084",
            "type": "code",
            "richText": [
                [
                    "val := m[\"apple\"]"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80cf-9e24-e2aedd7ab21d",
            "type": "bulleted_list",
            "richText": [
                [
                    "If key doesn’t exist: returns "
                ],
                [
                    "zero value",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " of value type ("
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
                    ", "
                ],
                [
                    "\"\"",
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
                    "nil",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", etc.)"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8071-9d50-fb0e9638565a",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Check if Key Exists:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-803f-8de3-ccb9e7ad376a",
            "type": "code",
            "richText": [
                [
                    "val, ok := m[\"apple\"]\nif ok {\n    // key exists\n} else {\n    // key not found\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80e9-b4eb-e4918b183082",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80fc-8e81-e786f621e214",
            "type": "sub_header",
            "richText": [
                [
                    "Deleting Keys",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80ce-b746-f01a5da99702",
            "type": "code",
            "richText": [
                [
                    "delete(m, \"apple\")"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-804a-a1a5-cda518efda84",
            "type": "bulleted_list",
            "richText": [
                [
                    "Safe even if key doesn’t exist (no panic)."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-80ce-8503-cb6174cc8896",
            "type": "divider"
        },
        {
            "id": "24a24eb1-ed54-807e-9232-df6978bb5c87",
            "type": "sub_header",
            "richText": [
                [
                    "Deleting all Key Value Pairs of the Map"
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-804f-8836-c74b7bb170d2",
            "type": "code",
            "richText": [
                [
                    "clear(m)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8092-b4fa-e31898453e97",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8084-9ddc-f79ea11bd419",
            "type": "sub_header",
            "richText": [
                [
                    "Length of a Map",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80bb-8fc1-de1323cf0983",
            "type": "code",
            "richText": [
                [
                    "len(m)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8012-959d-e969b32fac0c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Returns the number of key-value pairs."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8035-b74f-cf86a64d7be3",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80b8-b1c2-f394d8f2667e",
            "type": "sub_header",
            "richText": [
                [
                    "Iterating Over a Map",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8004-ac2a-d450070aaf9d",
            "type": "code",
            "richText": [
                [
                    "for k, v := range m {\n    fmt.Println(k, v)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8034-9829-f94351b0d8ac",
            "type": "bulleted_list",
            "richText": [
                [
                    "Order is "
                ],
                [
                    "not guaranteed",
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
            "id": "24224eb1-ed54-80cd-bbf2-e1ded1774ee6",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can get just keys: "
                ],
                [
                    "for k := range m",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8034-ba17-d50aefcc4e88",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80ab-99bd-d93414d8b6be",
            "type": "sub_header",
            "richText": [
                [
                    "Maps are Reference Types",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8039-88cd-ff5072dcfd23",
            "type": "code",
            "richText": [
                [
                    "m1 := map[string]int{\"a\": 1}\nm2 := m1\nm2[\"a\"] = 100\nfmt.Println(m1[\"a\"]) // 100"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80ad-a645-e6d2490ef8cf",
            "type": "bulleted_list",
            "richText": [
                [
                    "Both "
                ],
                [
                    "m1",
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
                    "m2",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " point to the "
                ],
                [
                    "same underlying map",
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
            "id": "24224eb1-ed54-8065-a744-c8461842f563",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-807d-b191-c9dc9ff3c2e9",
            "type": "sub_header",
            "richText": [
                [
                    "Maps Cannot Be Compared",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80e2-8e69-e9908aaeaa36",
            "type": "bulleted_list",
            "richText": [
                [
                    "Only "
                ],
                [
                    "== nil",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " comparison is allowed."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8038-9f76-d4ba97ad2875",
            "type": "bulleted_list",
            "richText": [
                [
                    "You cannot do "
                ],
                [
                    "m1 == m2",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " (invalid)."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80fb-89eb-e5962c184a53",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80f0-8b67-cfe66aa3f3af",
            "type": "sub_header",
            "richText": [
                [
                    "Maps in Functions",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8095-a3e2-eda92337055d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Passing maps to functions "
                ],
                [
                    "passes the reference",
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
            "id": "24224eb1-ed54-80c3-83f3-e5d2030a72d1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Changes inside the function affect the original map."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8065-8ee2-d475e2d06526",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80c9-bc7d-eabd26a8defe",
            "type": "sub_header",
            "richText": [
                [
                    "Zero Value of Map",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-806f-b7af-d1d54e503c44",
            "type": "bulleted_list",
            "richText": [
                [
                    "The zero value of a map is "
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
                    "."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8067-84eb-db7f11993d7c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Reading from nil map is safe, writing causes panic."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8046-adcd-efd438700058",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80fd-9063-d8aa29dc6b03",
            "type": "sub_header",
            "richText": [
                [
                    "Map of Slices or Structs",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8098-978a-cc20c9c9ab17",
            "type": "code",
            "richText": [
                [
                    "m := map[string][]int{\n    \"evens\": {2, 4},\n}\nm[\"evens\"] = append(m[\"evens\"], 6)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8029-94c9-f232be05cce5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Common in complex data structures."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-806a-91ff-da44684f53b9",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80ee-b8ed-f2b48f88af65",
            "type": "sub_header",
            "richText": [
                [
                    "Concurrent Map Access",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80bc-90c7-d17a75775797",
            "type": "bulleted_list",
            "richText": [
                [
                    "NOT safe for concurrent writes.",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-805a-a8e7-f41bcaaa1826",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "sync.Mutex",
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
                    "sync.RWMutex",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", or "
                ],
                [
                    "sync.Map",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " if needed."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8082-9ed2-da293eaa30a4",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-809d-94c9-c6edbd5dd982",
            "type": "sub_header",
            "richText": [
                [
                    "When to Use ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "sync.Map",
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
            "id": "24224eb1-ed54-8008-9f6e-c4cbed087c3f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "sync.Map",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " when:"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-80b5-b296-c643e818235b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "You need concurrent access."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-8012-9419-f4e6ca0fa705",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Keys are mostly read, rarely written."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-8017-8376-c04127c3bf35",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Performance is critical."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-8022-ae98-f374bae3f07a",
            "type": "code",
            "richText": [
                [
                    "var m sync.Map\nm.Store(\"a\", 1)\nval, ok := m.Load(\"a\")"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80dc-93a5-f745266b601b",
            "type": "divider"
        }
    ]
} as const satisfies GoNote;

export default note;
