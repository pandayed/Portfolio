/* Focused Go study notes, refined from the imported source. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-80a2-a695-ea95dbbf67c0",
    "slug": "struct",
    "title": "Struct",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "bcf81806-866f-599c-b98d-11677e479cd4",
            "type": "text",
            "richText": [
                [
                    "A struct groups named fields. Fields can have any type, including function types. Methods are declared separately with a receiver."
                ]
            ]
        },
        {
            "id": "1d9f51ec-0643-5c68-8415-2beec28177a7",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "type Person struct {\n    Name string\n    Age int\n}"
                ]
            ]
        },
        {
            "id": "63779fa3-7e1d-5911-8d86-39b8508247f1",
            "type": "sub_header",
            "richText": [
                [
                    "Creating struct values"
                ]
            ]
        },
        {
            "id": "6b773571-cd33-53e2-8bbe-4959a4ba96f1",
            "type": "text",
            "richText": [
                [
                    "These function-body fragments use the Person declaration above and import "
                ],
                [
                    "fmt",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " when printing. Each creation form is independent:"
                ]
            ]
        },
        {
            "id": "b0090981-b73b-5e74-a691-a15514f3deb7",
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
                    "id": "51bde10c-bc47-52f0-81d4-8c7aba83e0ac",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Creation form"
                            ]
                        ],
                        "col-1": [
                            [
                                "Type"
                            ]
                        ],
                        "col-2": [
                            [
                                "Initial value"
                            ]
                        ]
                    }
                },
                {
                    "id": "25724505-95dd-5805-bdca-e30e397534eb",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Person{Name: \"Alice\", Age: 30}",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Person"
                            ]
                        ],
                        "col-2": [
                            [
                                "Named fields; omitted fields use zero values."
                            ]
                        ]
                    }
                },
                {
                    "id": "617a73ea-c8e3-52f1-ad79-aff5a60da4bd",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Person{\"Bob\", 25}",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Person"
                            ]
                        ],
                        "col-2": [
                            [
                                "Positional fields in declaration order."
                            ]
                        ]
                    }
                },
                {
                    "id": "ca43fd87-279a-5af5-9943-a3d27fd5188d",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "var p Person",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Person"
                            ]
                        ],
                        "col-2": [
                            [
                                "All fields have their zero values."
                            ]
                        ]
                    }
                },
                {
                    "id": "66861253-e35a-505c-b409-39decb0826fa",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "&Person{Name: \"Dana\", Age: 40}",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "*Person"
                            ]
                        ],
                        "col-2": [
                            [
                                "Pointer to the initialized struct."
                            ]
                        ]
                    }
                },
                {
                    "id": "6d57fff8-5eda-5ba8-820a-9d5bb661de25",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "new(Person)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "*Person"
                            ]
                        ],
                        "col-2": [
                            [
                                "Pointer to a zero-valued struct."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "562b5025-f9ad-59d5-9d04-82f964542850",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "p := Person{Name: \"Alice\", Age: 30}\nfmt.Println(p.Name, p.Age) // Alice 30"
                ]
            ]
        },
        {
            "id": "feb8166d-6f55-5c62-ba30-1c672515e714",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "p := new(Person)\np.Name = \"Eve\"\nfmt.Println(p.Name, p.Age) // Eve 0"
                ]
            ]
        },
        {
            "id": "52cc9775-6c8f-5c9a-94db-f03f9ca0bc21",
            "type": "text",
            "richText": [
                [
                    "Named fields make the selected fields explicit. Positional literals depend on field order and must provide each field. Prefer named fields when using another package’s struct type."
                ]
            ]
        },
        {
            "id": "cdd2e5c1-ac21-5c35-86a1-febcf9c1f8cd",
            "type": "text",
            "richText": [
                [
                    "Default field values are covered in "
                ],
                [
                    "Zero Values",
                    [
                        [
                            "a",
                            "#/notes/go/zero-values"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8021-a6f5-eb79bb571693",
            "type": "sub_header",
            "richText": [
                [
                    "Accessing Struct Fields"
                ]
            ]
        },
        {
            "id": "00b8af66-6aad-5781-a868-4b9d66c884bf",
            "type": "text",
            "richText": [
                [
                    "Dot notation accesses fields of both a struct value and a pointer to that struct. For a pointer p, "
                ],
                [
                    "p.Name",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is shorthand for "
                ],
                [
                    "(*p).Name",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ". This requires a non-nil pointer."
                ]
            ]
        },
        {
            "id": "15aff848-229a-5d61-bb0d-72524087452c",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "p := &Person{Name: \"Dana\", Age: 40}\nfmt.Println(p.Name)    // Dana\nfmt.Println((*p).Name) // Dana\np.Age++\nfmt.Println(p.Age)     // 41"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80d5-bab8-cc0ff2ba3dd5",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Inside slices/arrays"
                ]
            ]
        },
        {
            "id": "fd43bfae-264c-5dee-addf-cef7f24c7ea4",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "people := []Person{{Name: \"Frank\", Age: 33}}\nfmt.Println(people[0].Name) // Frank"
                ]
            ]
        },
        {
            "id": "79f9445f-aa79-51e6-8baf-add8baf9719f",
            "type": "sub_header",
            "richText": [
                [
                    "Function-valued fields"
                ]
            ]
        },
        {
            "id": "e4c74e9a-1691-500e-b076-0b0a3bb8dd80",
            "type": "text",
            "richText": [
                [
                    "A function field stores a function value. It is called through the field and is different from a method declared on the struct type."
                ]
            ]
        },
        {
            "id": "6270a0b2-fc96-5cc0-8164-7916aeaa28ad",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "type Formatter struct {\n    Format func(string) string\n}\n\n// Inside a function:\nf := Formatter{\n    Format: func(name string) string {\n        return \"Hi \" + name\n    },\n}\nfmt.Println(f.Format(\"Alice\")) // Hi Alice"
                ]
            ]
        },
        {
            "id": "dd39e09c-f043-5639-99b3-1883969d9244",
            "type": "text",
            "richText": [
                [
                    "A function field’s zero value is nil. Calling it before assigning a function panics."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8031-bc25-ecd949c8d97f",
            "type": "sub_header",
            "richText": [
                [
                    "Methods on Structs"
                ]
            ]
        },
        {
            "id": "14ae6679-9f45-5d89-a009-d8430ab4f5ca",
            "type": "text",
            "richText": [
                [
                    "This complete program uses one read-only value method and one pointer method that updates a field:"
                ]
            ]
        },
        {
            "id": "ec035d97-3d59-5f17-92c6-1e381f42d874",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\ntype Person struct {\n    Name string\n    Age int\n}\n\nfunc (p Person) Greet() string {\n    return \"Hi \" + p.Name\n}\n\nfunc (p *Person) HaveBirthday() {\n    p.Age++\n}\n\nfunc main() {\n    p := Person{Name: \"Bob\", Age: 20}\n    p.HaveBirthday() // p is addressable, so this can use &p\n    fmt.Println(p.Greet(), p.Age) // Hi Bob 21\n}"
                ]
            ]
        },
        {
            "id": "324809c0-cfa0-5a17-8f31-209ab56a5848",
            "type": "text",
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
                    " for receiver choices, copying, method sets, interface satisfaction, and addressability. Those rules apply to eligible defined types, not only structs."
                ]
            ]
        },
        {
            "id": "e12c4d8c-1ae3-51d8-aca4-5a8c28f4ba3c",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Go specification: struct types",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Struct_types"
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
