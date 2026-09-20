/* Copied from the Struct page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-80a2-a695-ea95dbbf67c0",
    "slug": "struct",
    "title": "Struct",
    "updatedOn": "2025-08-09",
    "blocks": [
        {
            "id": "24024eb1-ed54-80ef-bb42-f05cef96d1ad",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go does not allow functions in struct."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8031-aa76-cb6354cb5f0c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Variable is data."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80c5-b16e-f382b38a3f4e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Function is behaviour."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-802d-9253-f893265876be",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-807d-a426-e9330fb41e79",
            "type": "code",
            "richText": [
                [
                    "type Person struct {\n    Name string\n    Age  int\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80d1-8d55-f11917069cb5",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80ce-a307-e34b0ddee81b",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Value struct (named fields)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8043-af1c-d251a0e4e5c5",
            "type": "code",
            "richText": [
                [
                    "p := Person{Name: \"Alice\", Age: 30}\nfmt.Println(p.Name)    // Acces"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-807d-80a2-f83549a0c4f8",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8071-8225-e58b2e3163a1",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Value struct (positional fields)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80a7-9fee-c5de7761f3f1",
            "type": "code",
            "richText": [
                [
                    "p := Person{\"Bob\", 25}\nfmt.Println(p.Name)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80ac-b67d-dc32bd7989e6",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80f7-bfa0-dff6b323de71",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Zero value with ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "var",
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
            "id": "24024eb1-ed54-8076-bd56-c3f46b1839cd",
            "type": "code",
            "richText": [
                [
                    "// this assigns some defaults to the variables\nvar p Person\nfmt.Println(p.Name) // prints \"\"\nfmt.Println(p.Age) // prints 0"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8084-81f4-f3d074a983e3",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80c5-b112-ec7e7409905e",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Pointer using address-of (",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "&",
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
                    ")",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8040-93a8-f786b9b94264",
            "type": "code",
            "richText": [
                [
                    "p := &Person{Name: \"Dana\", Age: 40}\nfmt.Println(p.Name)    // Go auto-dereferences\nfmt.Println((*p).Name) // Manual dereference"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8036-9a87-e3a98dd2e879",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8068-aa0e-f27c1f88aff3",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Pointer using ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "new()",
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
            "id": "24024eb1-ed54-8069-bfe7-fe31ba83bfbb",
            "type": "code",
            "richText": [
                [
                    "p := new(Person)\np.Name = \"Eve\"\nfmt.Println(p.Name)     // Auto-dereference\nfmt.Println((*p).Name)  // Manual dereference\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8073-b8b5-c1a0acac32d3",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80d5-bab8-cc0ff2ba3dd5",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Inside slices/arrays",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8013-a014-f70c736a1a93",
            "type": "code",
            "richText": [
                [
                    "people := []Person{{Name: \"Frank\", Age: 33}}\nfmt.Println(people[0].Name)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8029-a48a-d7c23e2ede6e",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80b7-81e6-d4b66988d0ca",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Summary Table"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80f0-b323-c8159ed5a073",
            "type": "table",
            "children": [
                {
                    "id": "24024eb1-ed54-8001-bde1-e74425d2441f",
                    "type": "table_row",
                    "cells": {
                        "OB`_": [
                            [
                                "Creation Method"
                            ]
                        ],
                        "zCzc": [
                            [
                                "Type"
                            ]
                        ],
                        "Xdl^": [
                            [
                                "Access Syntax"
                            ]
                        ]
                    }
                },
                {
                    "id": "24024eb1-ed54-8005-b5bd-fd7274ed3fad",
                    "type": "table_row",
                    "cells": {
                        "OB`_": [
                            [
                                "Person{...}",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "zCzc": [
                            [
                                "Value"
                            ]
                        ],
                        "Xdl^": [
                            [
                                "p.Name",
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
                    "id": "24024eb1-ed54-80df-8bd6-d65d0cc2073f",
                    "type": "table_row",
                    "cells": {
                        "OB`_": [
                            [
                                "var p Person",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "zCzc": [
                            [
                                "Value"
                            ]
                        ],
                        "Xdl^": [
                            [
                                "p.Name",
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
                    "id": "24024eb1-ed54-8034-8219-ff6db47481be",
                    "type": "table_row",
                    "cells": {
                        "OB`_": [
                            [
                                "&Person{...}",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "zCzc": [
                            [
                                "Pointer"
                            ]
                        ],
                        "Xdl^": [
                            [
                                "p.Name",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " or "
                            ],
                            [
                                "(*p).Name",
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
                    "id": "24024eb1-ed54-805f-b549-f7d7da917a7d",
                    "type": "table_row",
                    "cells": {
                        "OB`_": [
                            [
                                "new(Person)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "zCzc": [
                            [
                                "Pointer"
                            ]
                        ],
                        "Xdl^": [
                            [
                                "p.Name",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " or "
                            ],
                            [
                                "(*p).Name",
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
                    "id": "24024eb1-ed54-80ab-a093-e7c384234417",
                    "type": "table_row",
                    "cells": {
                        "OB`_": [
                            [
                                "In slices/arrays"
                            ]
                        ],
                        "zCzc": [
                            [
                                "Value"
                            ]
                        ],
                        "Xdl^": [
                            [
                                "slice[i].Name",
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
                "OB`_",
                "zCzc",
                "Xdl^"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24024eb1-ed54-8022-8a1b-eb31ccb04616",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8021-a6f5-eb79bb571693",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Accessing Struct Fields",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80cf-a251-d6e4e0593fb6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use dot notation: "
                ],
                [
                    "p.Name",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8008-8aa7-c24242b85292",
            "type": "bulleted_list",
            "richText": [
                [
                    "Works for both value and pointer structs"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80bd-9f71-debeff21cdc3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pointer auto-dereferencing:"
                ]
            ],
            "children": [
                {
                    "id": "24024eb1-ed54-8022-9c81-ef21aec355ab",
                    "type": "code",
                    "richText": [
                        [
                            "p := &Person{Name: \"Alice\"}\np.Name         // valid\n(*p).Name      // also valid"
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "24024eb1-ed54-8081-859c-cf45d3b7c622",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80f1-9e58-d6ba6909bb1d",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Struct Field Access – Summary",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80c2-be52-d64d0bb13bb3",
            "type": "table",
            "children": [
                {
                    "id": "24024eb1-ed54-80f0-b88a-fba4e9a4f42c",
                    "type": "table_row",
                    "cells": {
                        "~Hmm": [
                            [
                                "Struct Type"
                            ]
                        ],
                        "_lX;": [
                            [
                                "Access Syntax"
                            ]
                        ],
                        "nu~G": [
                            [
                                "Notes"
                            ]
                        ]
                    }
                },
                {
                    "id": "24024eb1-ed54-80c7-bcda-ea6e54f8412d",
                    "type": "table_row",
                    "cells": {
                        "~Hmm": [
                            [
                                "Value"
                            ]
                        ],
                        "_lX;": [
                            [
                                "p.Name",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "nu~G": [
                            [
                                "Direct field access"
                            ]
                        ]
                    }
                },
                {
                    "id": "24024eb1-ed54-8070-94ed-d83fe5df6ea7",
                    "type": "table_row",
                    "cells": {
                        "~Hmm": [
                            [
                                "Pointer"
                            ]
                        ],
                        "_lX;": [
                            [
                                "p.Name",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "nu~G": [
                            [
                                "Auto-dereferenced"
                            ]
                        ]
                    }
                },
                {
                    "id": "24024eb1-ed54-80a1-a13f-d36c9f9bbcbe",
                    "type": "table_row",
                    "cells": {
                        "~Hmm": [
                            [
                                "Pointer"
                            ]
                        ],
                        "_lX;": [
                            [
                                "(*p).Name",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "nu~G": [
                            [
                                "Manual dereference (optional)"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "~Hmm",
                "_lX;",
                "nu~G"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24024eb1-ed54-8072-8600-d3a9b32651c7",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8031-bc25-ecd949c8d97f",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Methods on Structs",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8053-b2bd-e15a848d6855",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Value Receiver:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80ce-a4b5-dce150921335",
            "type": "code",
            "richText": [
                [
                    "func (p Person) Greet() string {\n    return \"Hi \" + p.Name\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-804d-ae85-f98ae4a4a110",
            "type": "bulleted_list",
            "richText": [
                [
                    "p",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a copy of the struct"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8017-b819-d082d2335c48",
            "type": "bulleted_list",
            "richText": [
                [
                    "Does not modify",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " original"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8046-9841-faf5fb520eca",
            "type": "bulleted_list",
            "richText": [
                [
                    "Safe for read-only behavior"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-806c-a261-d857082219f6",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Pointer Receiver:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80b6-945c-d7daa1ee9d41",
            "type": "code",
            "richText": [
                [
                    "func (p *Person) HaveBirthday() {\n    p.Age += 1\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-800a-88f8-ff06afed0a14",
            "type": "bulleted_list",
            "richText": [
                [
                    "p",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a pointer"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80e8-9722-ec2cbd6852c7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Modifies",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " the original struct"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80e2-a662-d8df4d5c4aba",
            "type": "bulleted_list",
            "richText": [
                [
                    "Efficient for large structs"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-801f-877a-da65b92e25b1",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80a6-a8c3-c51127a6cb1c",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Calling Methods",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80a5-bcbc-cd6442e106a7",
            "type": "text",
            "richText": [
                [
                    "Go handles pointer vs value automatically:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80c3-8541-f88f51875ebc",
            "type": "code",
            "richText": [
                [
                    "p := Person{Name: \"Bob\", Age: 20}\np.HaveBirthday()   // OK even though method is on *Person"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80ea-ab20-d9180eba06e3",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80b9-a92b-f0dc4dbb5d4f",
            "type": "sub_sub_header",
            "richText": [
                [
                    "When to Use What",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8096-af69-f00b468623bf",
            "type": "table",
            "children": [
                {
                    "id": "24024eb1-ed54-80d7-b0de-e12132e16b70",
                    "type": "table_row",
                    "cells": {
                        "X|}g": [
                            [
                                "Receiver Type"
                            ]
                        ],
                        "Igqa": [
                            [
                                "Use When…"
                            ]
                        ]
                    }
                },
                {
                    "id": "24024eb1-ed54-8045-99f4-ef125b0dce6f",
                    "type": "table_row",
                    "cells": {
                        "X|}g": [
                            [
                                "Value"
                            ]
                        ],
                        "Igqa": [
                            [
                                "Method doesn’t modify struct, struct is small"
                            ]
                        ]
                    }
                },
                {
                    "id": "24024eb1-ed54-808e-bb64-e74ff47f8858",
                    "type": "table_row",
                    "cells": {
                        "X|}g": [
                            [
                                "Pointer"
                            ]
                        ],
                        "Igqa": [
                            [
                                "Method modifies struct, struct is large or for consistency"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "X|}g",
                "Igqa"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24024eb1-ed54-80e6-be40-d336318590da",
            "type": "callout",
            "children": [
                {
                    "id": "24024eb1-ed54-8072-abf3-ec92224079c3",
                    "type": "text",
                    "richText": [
                        [
                            "Rule of thumb:",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " Use "
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
                            " by default, unless you have a strong reason."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24024eb1-ed54-803c-b2eb-d3f1748d8563",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80cc-bb2e-f56c91be9816",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
