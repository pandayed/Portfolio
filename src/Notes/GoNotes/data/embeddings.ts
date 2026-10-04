import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-805c-8026-c2b48701fc5e",
    "slug": "embeddings",
    "title": "Embeddings",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "c1822212-0876-5940-be61-785d9b063eba",
            "type": "text",
            "richText": [
                [
                    "Embedding includes a type as a field without an explicit field name. Selectors can expose its fields and methods through promotion. The outer value still contains an inner value; it does not become a subtype of it."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80de-87f5-eb7cb6be63de",
            "type": "text",
            "richText": [
                [
                    "Prerequisite: "
                ],
                [
                    "Methods",
                    [
                        [
                            "a",
                            "#/notes/go/methods"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2fc11663-3631-5721-9a4e-2845ce7457f1",
            "type": "sub_header",
            "richText": [
                [
                    "Struct embedding and promoted fields"
                ]
            ]
        },
        {
            "id": "db17e381-bdb8-56f5-88f6-05829985827d",
            "type": "code",
            "richText": [
                [
                    "type A struct { FieldA int }\ntype B struct {\n    A\n    FieldB int\n}\n\nfunc fields() {\n    b := B{A: A{FieldA: 10}, FieldB: 20}\n    fmt.Println(b.FieldA)   // 10: promoted selector\n    fmt.Println(b.A.FieldA) // 10: explicit selector\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "a9b989f9-c4c4-5d94-b2f9-848315e249ca",
            "type": "text",
            "richText": [
                [
                    "Promotion requires a valid, unambiguous selector and respects package accessibility. Initialize embedded fields explicitly, as shown; this form works across Go versions."
                ]
            ]
        },
        {
            "id": "dd235f92-7306-5470-a2ce-c2a1c31a382f",
            "type": "sub_header",
            "richText": [
                [
                    "Shadowing an embedded method"
                ]
            ]
        },
        {
            "id": "5f8a898a-d03f-5416-9f1a-3bad7b011503",
            "type": "text",
            "richText": [
                [
                    "An outer method with the same name takes precedence for the outer selector. This is selector shadowing, not inheritance or virtual overriding. The embedded method remains available explicitly."
                ]
            ]
        },
        {
            "id": "b3b4999d-4caa-5d10-a20b-92288ea8b4bf",
            "type": "code",
            "richText": [
                [
                    "type Animal struct{}\nfunc (Animal) Speak() { fmt.Println(\"Animal speaks\") }\n\ntype Dog struct { Animal }\nfunc (Dog) Speak() { fmt.Println(\"Dog barks\") }\n\nfunc speak() {\n    d := Dog{}\n    d.Speak()        // Dog barks\n    d.Animal.Speak() // Animal speaks\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "a8beb2d6-3773-5ef9-96e2-ed332730c375",
            "type": "sub_header",
            "richText": [
                [
                    "Promoted method sets"
                ]
            ]
        },
        {
            "id": "96ba73d8-ddef-58a1-aa80-243c0d2e4b5c",
            "type": "text",
            "richText": [
                [
                    "For an outer struct S embedding a defined non-pointer type T, the receiver types determine which promoted methods belong to S and *S:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8034-8b5d-cb20aa9a1c9b",
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
                    "id": "9cc237ff-36ec-5886-9556-8c2175416233",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Embedded field"
                            ]
                        ],
                        "col-1": [
                            [
                                "Method set of S includes"
                            ]
                        ],
                        "col-2": [
                            [
                                "Method set of *S includes"
                            ]
                        ]
                    }
                },
                {
                    "id": "df61f62c-2617-50c7-9d70-8dc2d1c4ed9c",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "T",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Methods with receiver T"
                            ]
                        ],
                        "col-2": [
                            [
                                "Methods with receiver T or *T"
                            ]
                        ]
                    }
                },
                {
                    "id": "91635802-1a2b-5883-896b-3f830578bf4e",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "*T",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Methods with receiver T or *T"
                            ]
                        ],
                        "col-2": [
                            [
                                "Methods with receiver T or *T"
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "2feb8613-23a7-533e-8af4-75a309a6a47c",
            "type": "text",
            "richText": [
                [
                    "These rules assume no selector ambiguity or shadowing prevents promotion. An addressable S value can also call a promoted pointer method through automatic address-taking."
                ]
            ]
        },
        {
            "id": "949838d7-47a1-578e-b3b9-c470d7b8b4fc",
            "type": "code",
            "richText": [
                [
                    "type Inner struct { Count int }\nfunc (i *Inner) Add() { i.Count++ }\n\ntype ValueOuter struct { Inner }\ntype PointerOuter struct { *Inner }\ntype Adder interface { Add() }\n\nvar _ Adder = (*ValueOuter)(nil)\nvar _ Adder = PointerOuter{}\n// var _ Adder = ValueOuter{} // error: value method set lacks Add\n\nfunc promotedCalls() {\n    v := ValueOuter{}\n    v.Add() // valid: v is addressable, even though ValueOuter lacks Add\n    fmt.Println(v.Count) // 1\n\n    p := PointerOuter{Inner: &Inner{}}\n    p.Add()\n    fmt.Println(p.Count) // 1\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "47c0a54c-d43f-5832-bc0c-54d0b61f76ca",
            "type": "text",
            "richText": [
                [
                    "The zero value of PointerOuter has a nil embedded pointer. Calling Add through that value panics when Add accesses Count. Interface satisfaction alone does not make the receiver safe to use."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-808f-b513-ff7431bfff47",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Struct promotion rules",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Struct_types"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "36ae7411-adbc-5848-9a15-cbbfd046279a",
            "type": "sub_header",
            "richText": [
                [
                    "Ambiguity and outer fields"
                ]
            ]
        },
        {
            "id": "8fded7e0-268f-5a90-b987-d9579159b797",
            "type": "text",
            "richText": [
                [
                    "Two members with the same name at the same shallowest depth make the outer selector ambiguous. A directly declared outer member takes precedence; use a qualified selector to access the embedded member."
                ]
            ]
        },
        {
            "id": "02056562-243e-5a4b-b5ed-6b9ef71a6b38",
            "type": "code",
            "richText": [
                [
                    "type NamedA struct { Name string }\ntype NamedB struct { Name string }\ntype C struct {\n    NamedA\n    NamedB\n}\ntype D struct {\n    NamedA\n    Name string\n}\n\nfunc names() {\n    c := C{}\n    c.NamedA.Name = \"One\"\n    c.NamedB.Name = \"Two\"\n    // fmt.Println(c.Name) // compile-time error: ambiguous selector\n\n    d := D{NamedA: NamedA{Name: \"Inner\"}, Name: \"Outer\"}\n    fmt.Println(d.Name)        // Outer\n    fmt.Println(d.NamedA.Name) // Inner\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "1fd545b8-df8e-5618-aada-ceb6e4c59819",
            "type": "sub_header",
            "richText": [
                [
                    "Multiple embedded types"
                ]
            ]
        },
        {
            "id": "ac0ff688-22a3-5eb7-92eb-0c0b83091134",
            "type": "code",
            "richText": [
                [
                    "type Engine struct { Power int }\ntype Wheels struct { Count int }\ntype Car struct {\n    Engine\n    Wheels\n}\n\nfunc car() {\n    c := Car{Engine: Engine{Power: 120}, Wheels: Wheels{Count: 4}}\n    fmt.Println(c.Power, c.Count) // 120 4\n    // var e Engine = c          // error: Car is not Engine\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "a17a0577-b8af-5957-b3b9-2c98b5de6f01",
            "type": "text",
            "richText": [
                [
                    "Methods from two embedded types can also have conflicting names. Call them through the embedded field when the promoted selector is ambiguous."
                ]
            ]
        },
        {
            "id": "88c08531-4862-5d6d-897a-76f338cb7a9d",
            "type": "sub_header",
            "richText": [
                [
                    "Interface embedding"
                ]
            ]
        },
        {
            "id": "8875f025-ed6f-5437-b280-3f2561f86297",
            "type": "text",
            "richText": [
                [
                    "Embedding interfaces combines required methods rather than storing an implementation. See Interfaces for a composed-interface use case and a Reader/Writer example."
                ]
            ]
        },
        {
            "id": "f793861b-cbab-5f8b-8688-db024a85b80e",
            "type": "text",
            "richText": [
                [
                    "Details: "
                ],
                [
                    "Interfaces: composition and satisfaction",
                    [
                        [
                            "a",
                            "#/notes/go/interfaces"
                        ]
                    ]
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
