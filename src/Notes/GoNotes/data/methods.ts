import type { GoNote } from '../types';

const note = {
    "notionId": "2f124eb1-ed54-807a-925e-faca53721562",
    "slug": "methods",
    "title": "Methods",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "13db468b-cded-5686-a3fb-8a75a8cba512",
            "type": "text",
            "richText": [
                [
                    "A method is a function declared with a receiver. The receiver associates the method with a type; ordinary parameters follow the method name."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-8051-b4d7-d924a3def698",
            "type": "text",
            "richText": [
                [
                    "Prerequisite: "
                ],
                [
                    "Defined Types & Aliases",
                    [
                        [
                            "a",
                            "#/notes/go/defined-type-and-type-alias"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "7e737a42-d916-56d6-8d39-045097c0cbe1",
            "type": "sub_header",
            "richText": [
                [
                    "Receiver syntax and calls"
                ]
            ]
        },
        {
            "id": "7d2cb407-8f77-514f-8b72-47f42758155c",
            "type": "text",
            "richText": [
                [
                    "Examples are declaration excerpts using fmt. Declarations appear at package scope; call statements below belong inside a function."
                ]
            ]
        },
        {
            "id": "622d4959-8e83-5854-b115-18cea4bd872d",
            "type": "code",
            "richText": [
                [
                    "type User struct { Name string }\n\nfunc (u User) Read() string {\n    return u.Name\n}\n\nfunc (u *User) Write(name string) {\n    u.Name = name\n}\n\nfunc useUser() {\n    u := User{Name: \"Bob\"}\n    u.Write(\"Alice\")\n    fmt.Println(u.Read()) // Alice\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "670e8395-9b3c-5929-948b-415e57ccd005",
            "type": "text",
            "richText": [
                [
                    "The receiver variable is local to the method body. It is written before the method name and enables "
                ],
                [
                    "u.Read()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ". A normal parameter is written after the name and passed by the caller."
                ]
            ]
        },
        {
            "id": "466f557a-2c66-5a93-9f68-dcb02e6f376a",
            "type": "sub_header",
            "richText": [
                [
                    "Value and pointer receivers"
                ]
            ]
        },
        {
            "id": "fdefff25-2d67-562c-9cb4-f870b70baf95",
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
                    "id": "6ecf1afb-6684-5538-b5d9-cd0a69408ca2",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Receiver"
                            ]
                        ],
                        "col-1": [
                            [
                                "What is copied"
                            ]
                        ],
                        "col-2": [
                            [
                                "Effect of assigning receiver fields"
                            ]
                        ]
                    }
                },
                {
                    "id": "edd93635-7f11-589e-9fb8-d77a5c1199ed",
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
                                "The value"
                            ]
                        ],
                        "col-2": [
                            [
                                "Changes the local copy"
                            ]
                        ]
                    }
                },
                {
                    "id": "19131dc8-ca27-5c48-b0ea-8a782288e42a",
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
                                "The pointer"
                            ]
                        ],
                        "col-2": [
                            [
                                "Changes the pointed-to value"
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "0cee72c4-7a28-5ed5-b832-f89e64d2e9af",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a value receiver for small values when copying matches the intended behavior. A copy can still contain pointers, slices or maps that refer to shared storage."
                ]
            ]
        },
        {
            "id": "473d4274-a16c-58fa-b622-7a9116d7a2f1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a pointer receiver to change the original value or avoid copying a large value. Keep receiver choices consistent when a type needs pointer methods."
                ]
            ]
        },
        {
            "id": "2f224eb1-ed54-80a4-870b-eec2f3045948",
            "type": "text",
            "richText": [
                [
                    "Pointer syntax: "
                ],
                [
                    "Pointers",
                    [
                        [
                            "a",
                            "#/notes/go/pointers"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "12f59cbb-b822-517d-9af0-394c12b21e02",
            "type": "sub_header",
            "richText": [
                [
                    "Method expressions"
                ]
            ]
        },
        {
            "id": "e899d365-bdf8-587b-8b6f-7df25e28bdef",
            "type": "text",
            "richText": [
                [
                    "Receiver passing can be explained as an extra argument, but "
                ],
                [
                    "Read(u)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is not a free function created by declaring the method. "
                ],
                [
                    "User.Read",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is the valid method expression."
                ]
            ]
        },
        {
            "id": "387fd577-84cc-525c-bcc8-68c9ac29d2b9",
            "type": "code",
            "richText": [
                [
                    "func callExpressions() {\n    u := User{Name: \"Bob\"}\n    read := User.Read          // func(User) string\n    write := (*User).Write     // func(*User, string)\n    write(&u, \"Alice\")\n    fmt.Println(read(u))       // Alice\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "ca7e98a9-6120-588f-a113-586cc1fae59e",
            "type": "sub_header",
            "richText": [
                [
                    "Method sets and interfaces"
                ]
            ]
        },
        {
            "id": "6357b24a-3902-5c8a-aa3f-26831179bd62",
            "type": "text",
            "richText": [
                [
                    "A method set is a property of a type. It determines interface satisfaction. For this non-embedded defined type:"
                ]
            ]
        },
        {
            "id": "d8157936-c3f8-5f63-88e1-84baf0424714",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "7d4bb9b7-74c9-56eb-9f02-31921407b9b1",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Type"
                            ]
                        ],
                        "col-1": [
                            [
                                "Methods in its method set"
                            ]
                        ]
                    }
                },
                {
                    "id": "f0cafc88-78ae-5b71-979f-61d2c9dad302",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "User",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Read() string",
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
                    "id": "dbea49b9-8420-5587-a861-120c3ccfd641",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "*User",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Read() string",
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
                                "Write(string)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "77cebf54-106d-5641-9568-155bc71a4408",
            "type": "code",
            "richText": [
                [
                    "type Writer interface {\n    Write(string)\n}\n\nvar _ Writer = (*User)(nil) // *User implements Writer\n// var _ Writer = User{}   // compile-time error: Write has a pointer receiver"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "3c1ed0cf-7251-5a77-9938-f414bb0abae4",
            "type": "text",
            "richText": [
                [
                    "Both the method names and signatures must match. Automatic address-taking for a method call does not add methods to "
                ],
                [
                    "User",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " or make it implement "
                ],
                [
                    "Writer",
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
            "id": "0e133b2f-8abc-5c41-8df6-e52c0f5e75a2",
            "type": "text",
            "richText": [
                [
                    "Interface values and assertions: "
                ],
                [
                    "Interfaces",
                    [
                        [
                            "a",
                            "#/notes/go/interfaces"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "54981e0f-31c4-50fb-b917-6f7c237a8f9b",
            "type": "sub_header",
            "richText": [
                [
                    "Addressable and non-addressable values"
                ]
            ]
        },
        {
            "id": "e411cf98-54c2-59ad-ba1c-8f1d76c88e67",
            "type": "text",
            "richText": [
                [
                    "Go can call a pointer-receiver method through an addressable value: "
                ],
                [
                    "u.Write(name)",
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
                    "(&u).Write(name)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ". Addressable cases include variables, fields of addressable structs, slice elements and elements of addressable arrays."
                ]
            ]
        },
        {
            "id": "65ae6bdb-0986-53a1-bec0-2e7e7e08ec12",
            "type": "code",
            "richText": [
                [
                    "func makeUser() User { return User{} }\n\nfunc addressableCalls() {\n    u := User{}\n    u.Write(\"Alice\")\n\n    users := []User{{}}\n    users[0].Write(\"Bob\")\n\n    m := map[string]User{\"a\": {}}\n    copyOfUser := m[\"a\"]\n    copyOfUser.Write(\"Carol\")\n    m[\"a\"] = copyOfUser // write the changed copy back\n\n    // User{}.Write(\"Alice\")  // error: literal is not addressable for this call\n    // makeUser().Write(\"Bob\") // error: function result is not addressable\n    // m[\"a\"].Write(\"Carol\")   // error: map index is not addressable\n\n    (&User{}).Write(\"Alice\") // explicit address of a composite literal is allowed\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "c087e69e-2acf-53d7-a56e-e56ba47fd8b6",
            "type": "text",
            "richText": [
                [
                    "Self-check: "
                ],
                [
                    "User{}.Write(\"x\")",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " fails because the call cannot automatically take that literal’s address. "
                ],
                [
                    "u := User{}; u.Write(\"x\")",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " works because "
                ],
                [
                    "u",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a variable."
                ]
            ]
        },
        {
            "id": "1c0db4ec-fc5b-5dcb-9912-e2c5d147d04f",
            "type": "sub_header",
            "richText": [
                [
                    "Nil receivers"
                ]
            ]
        },
        {
            "id": "9f361f24-4506-5002-a5d8-792908124ef6",
            "type": "text",
            "richText": [
                [
                    "A method with a pointer receiver may receive "
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
                    ". Its body must handle that case before accessing fields. A method body can also panic for reasons unrelated to the receiver."
                ]
            ]
        },
        {
            "id": "6b950c31-017e-5758-8a37-6452ee429266",
            "type": "code",
            "richText": [
                [
                    "func (u *User) DisplayName() string {\n    if u == nil {\n        return \"unknown\"\n    }\n    return u.Name\n}\n\nfunc nilReceiver() {\n    var u *User\n    fmt.Println(u.DisplayName()) // unknown\n    // u.Write(\"Alice\")          // panics when Write accesses u.Name\n    // u.Read()                  // panics: a User value cannot be obtained from nil\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "3610f38c-1b28-5462-b69d-74b963d1e586",
            "type": "sub_header",
            "richText": [
                [
                    "Eligible receiver types"
                ]
            ]
        },
        {
            "id": "73483e92-7934-53e0-8609-d268629db7ce",
            "type": "text",
            "richText": [
                [
                    "The receiver base type must be a defined type from the same package and cannot itself be a pointer or interface type. Declare methods outside the type declaration. Methods are associated with types; struct values do not store method declarations."
                ]
            ]
        },
        {
            "id": "ed4b0c55-93e4-561c-8d13-c47a5ab72e91",
            "type": "code",
            "richText": [
                [
                    "type UserID int\n\nfunc (id UserID) IsValid() bool {\n    return id > 0\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "bac530a5-f3b4-5dca-9afe-22b1a4cf7512",
            "type": "bulleted_list",
            "richText": [
                [
                    "You cannot attach methods directly to predeclared "
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
                    ", an unnamed struct, or a type defined in another package. A non-generic alias to an eligible local defined type, such as "
                ],
                [
                    "type Alias = User",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", may be used to declare a method on that same type. An alias does not create a new type; aliases to imported types are not eligible, and generic aliases have additional restrictions."
                ]
            ]
        },
        {
            "id": "c28f9cb1-f340-570f-803c-619a1456cf95",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Method declarations and method sets",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Method_declarations"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "41169578-9818-5e21-8d3e-8d82199a5273",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Method calls and address-taking",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Calls"
                        ]
                    ]
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
