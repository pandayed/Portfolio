/* Focused Go study notes, refined from the imported source. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24224eb1-ed54-80ac-8351-d559d45a4994",
    "slug": "zero-values",
    "title": "Zero Values",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "e78bca00-8779-5cb3-8106-4ebf0b4e2f54",
            "type": "bulleted_list",
            "richText": [
                [
                    "If you declare a variable without an initial value, Go gives it the zero value for its type."
                ]
            ]
        },
        {
            "id": "7ce95c7e-5395-5197-ba57-bfe0bcfc8b01",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go also gives every struct field and array element its zero value. This includes fields and elements nested inside them."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8037-9e3a-ce008cfb450c",
            "type": "sub_header",
            "richText": [
                [
                    "Zero Values by Type"
                ]
            ]
        },
        {
            "id": "276924b6-0d42-55b6-a52b-d72abb9525d0",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "a21eadd8-ffb0-5fb7-bdb5-51f4d8f4902e",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Type"
                            ]
                        ],
                        "col-1": [
                            [
                                "Zero value"
                            ]
                        ]
                    }
                },
                {
                    "id": "f639b171-2f8d-5a98-9bf7-1d8eb05436e1",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Signed and unsigned integers, including byte and rune"
                            ]
                        ],
                        "col-1": [
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
                    "id": "a297a0f3-dc64-5e84-adf5-9abb91f49d76",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
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
                        "col-1": [
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
                    "id": "8f11188e-699c-5e20-872c-41e363477991",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
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
                        "col-1": [
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
                },
                {
                    "id": "92ea63c0-7374-56fc-b013-9ade2688df10",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "bool",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
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
                },
                {
                    "id": "a8c29c59-9961-5bfc-8705-ee299eb090f0",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "string",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "\"\"",
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
                    "id": "20e55008-de21-5cc2-b544-ba216bf2c7ce",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Pointers ("
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
                        ],
                        "col-1": [
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
                    "id": "b9eb96fb-d8ef-5424-96ca-c99726382a89",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Slices ("
                            ],
                            [
                                "[]T",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                "), maps ("
                            ],
                            [
                                "map[K]V",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                "), channels ("
                            ],
                            [
                                "chan T",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                ")"
                            ]
                        ],
                        "col-1": [
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
                    "id": "45729987-1a45-516f-8607-af6e3945f7f5",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Interfaces ("
                            ],
                            [
                                "interface{}",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                "), function types"
                            ]
                        ],
                        "col-1": [
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
                    "id": "58c3121a-4afe-50b8-a8c4-424ba94ecf56",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Structs"
                            ]
                        ],
                        "col-1": [
                            [
                                "Every field gets its type’s zero value."
                            ]
                        ]
                    }
                },
                {
                    "id": "2a245766-c7f2-5e66-b91a-b22f3bdde877",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Arrays ("
                            ],
                            [
                                "[N]T",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                ")"
                            ]
                        ],
                        "col-1": [
                            [
                                "Every element gets its type’s zero value."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "df7182a8-15f8-561c-89bd-d46fd008432e",
            "type": "sub_header",
            "richText": [
                [
                    "Structs and arrays"
                ]
            ]
        },
        {
            "id": "65b7d3b6-0a18-539d-b89d-30601e322b93",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\ntype Person struct {\n    Name string\n    Age int\n}\n\nfunc main() {\n    var person Person\n    var numbers [3]int\n    fmt.Printf(\"%q %d\\n\", person.Name, person.Age) // \"\" 0\n    fmt.Println(numbers)                       // [0 0 0]\n\n    p := new(Person) // *Person pointing to a zero-valued Person\n    fmt.Printf(\"%q %d\\n\", p.Name, p.Age)         // \"\" 0\n}"
                ]
            ]
        },
        {
            "id": "10fd0eaa-1933-5f9f-8709-87eee099e663",
            "type": "sub_header",
            "richText": [
                [
                    "Zero value and usable operations"
                ]
            ]
        },
        {
            "id": "4fa770df-87da-5b33-9ee6-65e80889efa5",
            "type": "bulleted_list",
            "richText": [
                [
                    "A zero value belongs to its type. Some operations on it can still fail."
                ]
            ]
        },
        {
            "id": "1b1302b3-54ba-515e-8c71-ca71e6b8bc8b",
            "type": "bulleted_list",
            "richText": [
                [
                    "A nil slice has length 0 and capacity 0."
                ]
            ]
        },
        {
            "id": "9ab49fcd-c4fd-553e-9c7f-9f2077e21191",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can iterate over a nil slice or append to it."
                ]
            ]
        },
        {
            "id": "b1549f67-ea39-582a-979f-2e9b6984b8d2",
            "type": "bulleted_list",
            "richText": [
                [
                    "You cannot read an element from a nil slice because it has no elements."
                ]
            ]
        },
        {
            "id": "04be4b3e-0768-5688-882f-8fa0dfa869f9",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can read from a nil map, check its length, iterate over it, or delete a key."
                ]
            ]
        },
        {
            "id": "cbcf4132-8552-5ac0-ae26-41b2e9d4fc8f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Adding or updating an entry in a nil map panics."
                ]
            ]
        },
        {
            "id": "71aef097-d210-5578-a38a-bccf291d9b0a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Sending to or receiving from a nil channel waits forever."
                ]
            ]
        },
        {
            "id": "a2552002-ed0e-5870-bba0-68dccf4b620a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Closing a nil channel panics."
                ]
            ]
        },
        {
            "id": "d8a838e8-9501-534f-b269-8af80c8ea85d",
            "type": "bulleted_list",
            "richText": [
                [
                    "You cannot dereference a nil pointer."
                ]
            ]
        },
        {
            "id": "449fdc2a-1112-5e75-8cf7-8a41c8127e25",
            "type": "bulleted_list",
            "richText": [
                [
                    "Calling a nil function panics."
                ]
            ]
        },
        {
            "id": "8d43b324-8045-5d9a-b49c-ea0df39d8a5c",
            "type": "text",
            "richText": [
                [
                    "Operation details: "
                ],
                [
                    "Slices & Arrays",
                    [
                        [
                            "a",
                            "#/notes/go/slices-arrays"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Maps",
                    [
                        [
                            "a",
                            "#/notes/go/maps"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "Channels",
                    [
                        [
                            "a",
                            "#/notes/go/channels"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "05c10439-8d30-5988-9110-aec8465c8101",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Go specification: initial values",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#The_zero_value"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        }
    ]
} satisfies GoNote;

export default note;
