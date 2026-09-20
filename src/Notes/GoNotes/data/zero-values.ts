/* Copied from the Zero Values page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24224eb1-ed54-80ac-8351-d559d45a4994",
    "slug": "zero-values",
    "title": "Zero Values",
    "updatedOn": "2025-08-08",
    "blocks": [
        {
            "id": "24224eb1-ed54-8057-b7ba-f16a4bdcb97d",
            "type": "text",
            "richText": [
                [
                    "In Go, "
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
                    " is the "
                ],
                [
                    "default value assigned to a variable when it's declared without an explicit initializer",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ". Every type has a specific zero value, which is guaranteed to be a valid value of that type (not nil for all types!)."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8015-8dc7-d27bfb1149fc",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8076-b1e0-d1ea88c20025",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Why zero values matter",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8037-9e8a-cfeb352ff855",
            "type": "bulleted_list",
            "richText": [
                [
                    "Prevents uninitialized variables."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8042-bec4-c1f2e2b0958e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Useful for default behavior in data structures."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8017-832e-ecaaeb89f081",
            "type": "bulleted_list",
            "richText": [
                [
                    "Plays a major role in structs, maps, slices, etc."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80e9-8cee-fb6ca884e27f",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8037-9e3a-ce008cfb450c",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Zero Values by Type",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80a9-84c1-f11e42f8df50",
            "type": "sub_sub_header",
            "richText": [
                [
                    "1. Numeric Types",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8052-988f-c79496c62013",
            "type": "table",
            "children": [
                {
                    "id": "24224eb1-ed54-80a4-bca7-cf1c8c689d62",
                    "type": "table_row",
                    "cells": {
                        "cifu": [
                            [
                                "Type"
                            ]
                        ],
                        "FRTY": [
                            [
                                "Zero Value"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-804b-ae67-c0c05766f352",
                    "type": "table_row",
                    "cells": {
                        "cifu": [
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
                                "int8",
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
                                "int16",
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
                                "int32",
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
                                "int64",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "FRTY": [
                            [
                                "0",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-80be-8ae5-fc8f501ce021",
                    "type": "table_row",
                    "cells": {
                        "cifu": [
                            [
                                "uint",
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
                                "uint8",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                ", etc."
                            ]
                        ],
                        "FRTY": [
                            [
                                "0",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-8046-82c7-f56b570e9120",
                    "type": "table_row",
                    "cells": {
                        "cifu": [
                            [
                                "float32",
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
                                "float64",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "FRTY": [
                            [
                                "0.0",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-8030-9b31-d4d462ebf46d",
                    "type": "table_row",
                    "cells": {
                        "cifu": [
                            [
                                "complex64",
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
                                "complex128",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "FRTY": [
                            [
                                "0 + 0i",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "cifu",
                "FRTY"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24224eb1-ed54-80b4-9b4a-da64f42345f8",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8061-929c-f38f2ce4ab94",
            "type": "sub_sub_header",
            "richText": [
                [
                    "2. Boolean",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8073-b71f-d4301a0501ee",
            "type": "table",
            "children": [
                {
                    "id": "24224eb1-ed54-8080-8862-c3302fbeba96",
                    "type": "table_row",
                    "cells": {
                        "\\_Sj": [
                            [
                                "Type"
                            ]
                        ],
                        "CBJl": [
                            [
                                "Zero Value"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-80be-8c3c-f0721571645c",
                    "type": "table_row",
                    "cells": {
                        "\\_Sj": [
                            [
                                "bool",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "CBJl": [
                            [
                                "false",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "\\_Sj",
                "CBJl"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24224eb1-ed54-80a8-afa1-cd1bf35cd25a",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80c7-be22-eb81cb51200f",
            "type": "sub_sub_header",
            "richText": [
                [
                    "3. String",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80ee-b902-ce6b8af68317",
            "type": "table",
            "children": [
                {
                    "id": "24224eb1-ed54-80c5-b0a9-d95bbeea3c62",
                    "type": "table_row",
                    "cells": {
                        "GHgw": [
                            [
                                "Type"
                            ]
                        ],
                        "FVbA": [
                            [
                                "Zero Value"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-8026-b9e3-c312153609c0",
                    "type": "table_row",
                    "cells": {
                        "GHgw": [
                            [
                                "string",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "FVbA": [
                            [
                                "\"\"",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " (empty string)"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "GHgw",
                "FVbA"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24224eb1-ed54-80ad-b858-daa66d5112f7",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-807b-8034-f185ec399bec",
            "type": "sub_sub_header",
            "richText": [
                [
                    "4. Pointers",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80ed-a4d0-cba9e384e5fa",
            "type": "table",
            "children": [
                {
                    "id": "24224eb1-ed54-80c5-ac20-df07152b2778",
                    "type": "table_row",
                    "cells": {
                        "pV~i": [
                            [
                                "Type"
                            ]
                        ],
                        "eu{r": [
                            [
                                "Zero Value"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-8029-bd5a-ef7f3f0ebfba",
                    "type": "table_row",
                    "cells": {
                        "pV~i": [
                            [
                                "*T",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "eu{r": [
                            [
                                "nil",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "pV~i",
                "eu{r"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24224eb1-ed54-806c-9b79-ff11d6987ac4",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80a5-9fe7-c53dae6ae2e5",
            "type": "sub_sub_header",
            "richText": [
                [
                    "5. Slices, Maps, Channels, Interfaces, Functions",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-807d-867f-fedf1fccc687",
            "type": "table",
            "children": [
                {
                    "id": "24224eb1-ed54-802d-b4fa-c016c3b1567b",
                    "type": "table_row",
                    "cells": {
                        "dMLI": [
                            [
                                "Type"
                            ]
                        ],
                        "bETL": [
                            [
                                "Zero Value"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-80e3-820e-ee4141bc5082",
                    "type": "table_row",
                    "cells": {
                        "dMLI": [
                            [
                                "[]T",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " (slice)"
                            ]
                        ],
                        "bETL": [
                            [
                                "nil",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-80a2-b5b0-eb6a07c402c0",
                    "type": "table_row",
                    "cells": {
                        "dMLI": [
                            [
                                "map[K]V",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "bETL": [
                            [
                                "nil",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-80ef-8ef7-d8828948d353",
                    "type": "table_row",
                    "cells": {
                        "dMLI": [
                            [
                                "chan T",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "bETL": [
                            [
                                "nil",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-80c0-b9b6-d99f907ff441",
                    "type": "table_row",
                    "cells": {
                        "dMLI": [
                            [
                                "interface{}",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "bETL": [
                            [
                                "nil",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-8001-80e2-eeaa41348ff3",
                    "type": "table_row",
                    "cells": {
                        "dMLI": [
                            [
                                "func",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "bETL": [
                            [
                                "nil",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "dMLI",
                "bETL"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24224eb1-ed54-80a8-9237-d9bb73680193",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8065-a5d5-e6a24f0bc9c4",
            "type": "sub_sub_header",
            "richText": [
                [
                    "6. Struct",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80ef-a3fc-e445c10842c7",
            "type": "table",
            "children": [
                {
                    "id": "24224eb1-ed54-8077-ba34-cb88ba78de22",
                    "type": "table_row",
                    "cells": {
                        "wONx": [
                            [
                                "Type"
                            ]
                        ],
                        "Ebvr": [
                            [
                                "Zero Value"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-8094-a352-e69860fa62d4",
                    "type": "table_row",
                    "cells": {
                        "wONx": [
                            [
                                "struct",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "Ebvr": [
                            [
                                "All fields zero-valued recursively"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "wONx",
                "Ebvr"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24224eb1-ed54-80cb-b6f6-ff0d6f5d9f4b",
            "type": "text",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80fe-a080-fb5370a6ff92",
            "type": "code",
            "richText": [
                [
                    "type Person struct {\n    Name string\n    Age  int\n}\n// Zero value: Person{\"\", 0}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80b7-91e3-f992828d42ae",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80c3-8f83-c57c10007660",
            "type": "sub_sub_header",
            "richText": [
                [
                    "7. Arrays",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8059-b348-f1a03bacf84a",
            "type": "table",
            "children": [
                {
                    "id": "24224eb1-ed54-809d-a782-cf2371b50e66",
                    "type": "table_row",
                    "cells": {
                        "S]PE": [
                            [
                                "Type"
                            ]
                        ],
                        "BiZZ": [
                            [
                                "Zero Value"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-80e3-b14a-cece05f4ab6d",
                    "type": "table_row",
                    "cells": {
                        "S]PE": [
                            [
                                "[N]T",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "BiZZ": [
                            [
                                "All N elements zero-valued"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "S]PE",
                "BiZZ"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24224eb1-ed54-807e-88fd-c9d6b2adca17",
            "type": "text",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-808d-93ea-ca462b132c9e",
            "type": "code",
            "richText": [
                [
                    "var arr [3]int // [0, 0, 0]\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80de-88e0-dce7efd7fff0",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80df-9a57-e7547527c7f5",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Special Notes",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8072-b632-dbb2bbd93d0d",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can use the "
                ],
                [
                    "new(T)",
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
                    " function to get a pointer to a zero value of type "
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
            "id": "24224eb1-ed54-806f-a8eb-de5cc9fe6e77",
            "type": "bulleted_list",
            "richText": [
                [
                    "Maps, slices, channels are "
                ],
                [
                    "nil by default",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " but still "
                ],
                [
                    "typed",
                    [
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    " (you can't use them without initializing)."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-801b-9a17-d7ce9cd36e91",
            "type": "bulleted_list",
            "richText": [
                [
                    "Struct fields and array elements are recursively zero-valued."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-800b-938c-f250b9a55dd6",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8034-b30e-c51d91ea8774",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
