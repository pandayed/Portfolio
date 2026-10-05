/* Focused Go study notes, refined from the imported source. */

import type { GoNote } from '../types';

const note = {
    "notionId": "2ef24eb1-ed54-8042-8203-daa588d641d1",
    "slug": "defined-type-and-type-alias",
    "title": "Defined type and type alias",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "ab55fc54-cb7b-59de-bc5a-86e00a97acd2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A type definition creates a new type."
                ]
            ]
        },
        {
            "id": "2e3ebf16-d441-5523-bd3f-73cad2c7148c",
            "type": "bulleted_list",
            "richText": [
                [
                    "A type alias gives an existing type another name."
                ]
            ]
        },
        {
            "id": "3d309582-f0d6-5f8f-af2a-fd350e1a7f23",
            "type": "sub_header",
            "richText": [
                [
                    "Type identity"
                ]
            ]
        },
        {
            "id": "d2edb70c-58e0-5a1d-9a91-612f65f6b8e7",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1",
                "col-2"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "3c959512-433a-55ec-83ff-f203d1595377",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Declaration"
                            ]
                        ],
                        "col-1": [
                            [
                                "Identity"
                            ]
                        ],
                        "col-2": [
                            [
                                "Typical use"
                            ]
                        ]
                    }
                },
                {
                    "id": "87abbf85-c589-53a4-912c-cd4b5061264e",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "type MyInt int",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "MyInt is a new type. Its underlying type is int."
                            ]
                        ],
                        "col-2": [
                            [
                                "Values with a specific meaning, or types that need methods."
                            ]
                        ]
                    }
                },
                {
                    "id": "31194c18-3e44-5519-8f1d-0cc353851684",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "type MyInt = int",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "MyInt and int are the same type."
                            ]
                        ],
                        "col-2": [
                            [
                                "A new name for the same type."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "77dfcdec-4e4f-5430-8388-03126d89b2a7",
            "type": "sub_header",
            "richText": [
                [
                    "Defined type"
                ]
            ]
        },
        {
            "id": "a2868776-e4c6-5e39-8a61-b714f7ca5b06",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "type MyInt int\n\nvar a MyInt = 5\n// var b int = a // invalid: distinct named types\nvar b int = int(a) // explicit conversion"
                ]
            ]
        },
        {
            "id": "3250c673-f8b4-5b91-b93a-5499c22fea99",
            "type": "bulleted_list",
            "richText": [
                [
                    "The untyped constant "
                ],
                [
                    "5",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can be used as a "
                ],
                [
                    "MyInt",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " because the value fits."
                ]
            ]
        },
        {
            "id": "186854d9-4b6d-5288-b72a-e8df1b518126",
            "type": "bulleted_list",
            "richText": [
                [
                    "MyInt is based on "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", so "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is its underlying type. "
                ],
                [
                    "MyInt",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is still a separate type."
                ]
            ]
        },
        {
            "id": "feb47fdd-ae37-5545-95ef-cf72f423dc53",
            "type": "bulleted_list",
            "richText": [
                [
                    "To assign a "
                ],
                [
                    "MyInt",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " variable to an "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " variable, convert it to "
                ],
                [
                    "int",
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
            "id": "133c6f3a-e5b5-5a67-9558-e1fe854fe6da",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Domain-specific values"
                ]
            ]
        },
        {
            "id": "0918f20a-7ab4-58ee-bb54-f647b3fec5a1",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "type Meter int\ntype Second int\n\nfunc travel(distance Meter, duration Second) {}\n\nfunc example() {\n    var distance Meter = 10\n    var duration Second = 2\n    travel(distance, duration)\n    // travel(duration, distance) // invalid: wrong argument types\n    // _ = distance + duration   // invalid: different named types\n}"
                ]
            ]
        },
        {
            "id": "38fee8c2-1227-5565-8617-2b68fd4a32ce",
            "type": "bulleted_list",
            "richText": [
                [
                    "Meter",
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
                    "Second",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " both have the underlying type "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ". They are separate types."
                ]
            ]
        },
        {
            "id": "8724c762-7f6a-5901-9882-84ee40ca2846",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go catches accidental mixing, such as passing a "
                ],
                [
                    "Second",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " where a "
                ],
                [
                    "Meter",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is required."
                ]
            ]
        },
        {
            "id": "6e4ba762-e9f0-5ba0-8bbb-d2774ce6fb19",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can still convert between them. Go does not check whether that conversion makes sense for the units."
                ]
            ]
        },
        {
            "id": "77ab9831-114f-54c2-a38a-a0a3e297df8f",
            "type": "sub_header",
            "richText": [
                [
                    "Type alias"
                ]
            ]
        },
        {
            "id": "b2c87fb2-26f9-57e6-9789-e0ec82fa558c",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "type Count = int\n\nvar count Count = 5\nvar number int = count // no conversion needed"
                ]
            ]
        },
        {
            "id": "cff542e7-a2fd-5c15-b3c5-ac1cfd25c2b5",
            "type": "bulleted_list",
            "richText": [
                [
                    "An alias refers to the same type. It does not get a separate set of methods."
                ]
            ]
        },
        {
            "id": "781a62cd-fd1e-5f88-8b18-e52c32a0a937",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use an alias to keep an old API name while moving to a new name."
                ]
            ]
        },
        {
            "id": "53742e6b-d3e6-50a1-b4ec-34ab988cc073",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "type User struct {\n    Name string\n}\n\ntype Customer = User // existing callers may keep using Customer"
                ]
            ]
        },
        {
            "id": "53c16a92-3870-5f57-8270-9b62de69b6c0",
            "type": "sub_header",
            "richText": [
                [
                    "Methods and aliases"
                ]
            ]
        },
        {
            "id": "cf0025e7-625c-599f-abc8-47b539745337",
            "type": "bulleted_list",
            "richText": [
                [
                    "The receiver base type is the type you attach the method to."
                ]
            ]
        },
        {
            "id": "9bc52ae3-40f8-5400-96ca-b95dc53e35bb",
            "type": "bulleted_list",
            "richText": [
                [
                    "It must be a defined type in the same package and follow the receiver rules."
                ]
            ]
        },
        {
            "id": "ce4fe997-ca78-5132-b29e-68574068e49b",
            "type": "bulleted_list",
            "richText": [
                [
                    "A simple alias to an allowed local type can name the receiver."
                ]
            ]
        },
        {
            "id": "bce56eae-2c8e-50c6-9911-421c236bbcc6",
            "type": "bulleted_list",
            "richText": [
                [
                    "That method belongs to the original type."
                ]
            ]
        },
        {
            "id": "2fbc3b2c-2989-53a9-a008-8c666753bb15",
            "type": "bulleted_list",
            "richText": [
                [
                    "An alias to "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " or to a type from another package does not let you add methods."
                ]
            ]
        },
        {
            "id": "4b1cbc1b-6a6d-5b6f-a86f-98b0bb75c802",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "type Local int\ntype Alias = Local\n\nfunc (a Alias) Double() Local {\n    return a * 2\n}\n\n// Local and Alias share this method; Alias is not a separate type."
                ]
            ]
        },
        {
            "id": "138a2b2f-5ee3-56ce-914a-bace80d95671",
            "type": "bulleted_list",
            "richText": [
                [
                    "See "
                ],
                [
                    "Methods",
                    [
                        [
                            "a",
                            "#/notes/go/methods"
                        ]
                    ]
                ],
                [
                    " for receivers and method sets."
                ]
            ]
        },
        {
            "id": "b1a30435-a719-5750-a904-9e703a40a48e",
            "type": "bulleted_list",
            "richText": [
                [
                    "This example uses a local type without type parameters."
                ]
            ]
        },
        {
            "id": "5ab586aa-a77f-5af1-bae3-ebcd6cedeea5",
            "type": "sub_header",
            "richText": [
                [
                    "Numeric conversions"
                ]
            ]
        },
        {
            "id": "440379fe-8342-58be-b9f7-c0c09fa3a3bc",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "var small int32 = 10\n// var large int64 = small // invalid: conversion is required\nvar large int64 = int64(small)"
                ]
            ]
        },
        {
            "id": "61699374-ed8a-50a3-a0db-89c502021647",
            "type": "bulleted_list",
            "richText": [
                [
                    "A numeric conversion names the type you want."
                ]
            ]
        },
        {
            "id": "1431185c-5675-558d-9c8f-7ee489b45600",
            "type": "bulleted_list",
            "richText": [
                [
                    "A conversion can lose data. A smaller integer type may not keep the full value."
                ]
            ]
        },
        {
            "id": "04a2d5f6-3076-5db9-869f-dfcdf20997c6",
            "type": "text",
            "richText": [
                [
                    "References: "
                ],
                [
                    "Go specification: type declarations",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Type_declarations"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "method declarations",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Method_declarations"
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
