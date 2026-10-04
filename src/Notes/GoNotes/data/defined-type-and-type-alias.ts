/* Focused Go study notes, refined from the imported source. */

import type { GoNote } from '../types';

const note = {
    "notionId": "2ef24eb1-ed54-8042-8203-daa588d641d1",
    "slug": "defined-type-and-type-alias",
    "title": "Defined type and type alias",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "ab55fc54-cb7b-59de-bc5a-86e00a97acd2",
            "type": "text",
            "richText": [
                [
                    "A type definition creates a distinct type. A type alias adds another name for an existing type."
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
                                "MyInt is a distinct type with underlying type int."
                            ]
                        ],
                        "col-2": [
                            [
                                "Domain-specific values or methods."
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
                                "MyInt and int denote the same type."
                            ]
                        ],
                        "col-2": [
                            [
                                "Compatibility or renaming without changing identity."
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
            "type": "text",
            "richText": [
                [
                    "These examples are independent declaration fragments. The untyped constant "
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
                    " can initialize a MyInt when it fits. An int variable and a MyInt variable do not become interchangeable just because they have the same underlying type."
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
            "type": "text",
            "richText": [
                [
                    "Meter and Second both have underlying type int. They are distinct types. Explicit conversions are still possible, so the names help detect accidental mixing rather than validate units automatically."
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
            "type": "text",
            "richText": [
                [
                    "An alias adds no new type identity or independent method set. It is useful when an API keeps an older name while moving to a new name."
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
            "type": "text",
            "richText": [
                [
                    "Methods require an eligible receiver base type defined in the same package. A simple alias to such a local type may name the receiver; the method belongs to the original type. An alias to int or a type defined in another package does not grant permission to add methods."
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
            "type": "text",
            "richText": [
                [
                    "Receiver and method-set details are covered in "
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
                    ". The alias example above uses a non-generic local type."
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
            "type": "text",
            "richText": [
                [
                    "An explicit numeric conversion states the target type. It does not guarantee that data is preserved: converting to a narrower integer type can truncate the value."
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
