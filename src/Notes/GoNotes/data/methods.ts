import type { GoNote } from '../types';

const note = {
    "notionId": "2f124eb1-ed54-807a-925e-faca53721562",
    "slug": "methods",
    "title": "Methods",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "13db468b-cded-5686-a3fb-8a75a8cba512",
            "type": "bulleted_list",
            "richText": [
                [
                    "A method is a function with a receiver."
                ]
            ]
        },
        {
            "id": "c6a97fdf-1faa-5903-92a6-e5d46548f67c",
            "type": "bulleted_list",
            "richText": [
                [
                    "The receiver tells Go which type the method belongs to."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Write the receiver before the method name."
                ]
            ]
        },
        {
            "id": "583203a0-6fed-5481-a91c-fc84d40b4e6d",
            "type": "bulleted_list",
            "richText": [
                [
                    "The receiver variable exists only inside the method."
                ]
            ]
        },
        {
            "id": "3c5ac859-b207-51d0-a1e3-e3f3755afcf8",
            "type": "bulleted_list",
            "richText": [
                [
                    "Call the method through a value, such as "
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
                    "."
                ]
            ]
        },
        {
            "id": "2f5c4d86-6dcd-53b2-a98d-ef91d4d31044",
            "type": "bulleted_list",
            "richText": [
                [
                    "Write normal parameters after the method name. The caller passes them in parentheses."
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
                                "When receiver fields change"
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
                    "Use a value receiver when the value is small and copying it gives the behavior you want."
                ]
            ]
        },
        {
            "id": "046459b5-b33e-501f-b6ca-46f64b19cf1d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Copying a value does not copy the data behind its pointers, slices or maps. That data can still be shared."
                ]
            ]
        },
        {
            "id": "473d4274-a16c-58fa-b622-7a9116d7a2f1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a pointer receiver to change the original value."
                ]
            ]
        },
        {
            "id": "88c2bbe9-0cb6-5a5a-ab19-22dd3c483470",
            "type": "bulleted_list",
            "richText": [
                [
                    "A pointer receiver also avoids copying a large value."
                ]
            ]
        },
        {
            "id": "6633df6c-11ff-517a-9d87-c9fbc60d5177",
            "type": "bulleted_list",
            "richText": [
                [
                    "Keep receiver choices consistent when the type needs pointer methods."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A receiver is passed to the method much like a normal argument."
                ]
            ]
        },
        {
            "id": "7eab31db-ab43-538d-b0db-05851e33206c",
            "type": "bulleted_list",
            "richText": [
                [
                    "User.Read",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a method expression. It lets you pass the receiver as an argument."
                ]
            ]
        },
        {
            "id": "cf5ec1f8-9e55-5ec5-b388-9e77d1286ea9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Declaring the method does not create a separate function named "
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
                    "."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A method set is the set of methods that belongs to a type."
                ]
            ]
        },
        {
            "id": "8e1216d1-c55d-5b1f-8fc2-fcf0a3fb9b26",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go uses it to decide whether the type implements an interface."
                ]
            ]
        },
        {
            "id": "5e5da881-d304-584e-a0f8-af7c3c5e1d91",
            "type": "bulleted_list",
            "richText": [
                [
                    "User",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " has no embedded types, so its method sets follow the table below."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Interface methods must match in name, parameter types and return types."
                ]
            ]
        },
        {
            "id": "7a89d1ea-c5d4-5c2b-9a3d-f8cfbf6d415d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go may take an address to call a method. This does not change the method set."
                ]
            ]
        },
        {
            "id": "3d5efc44-d5a6-55a8-95cf-e1504925a4b1",
            "type": "bulleted_list",
            "richText": [
                [
                    "User",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " still does not implement "
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
                    ". Its pointer type, "
                ],
                [
                    "*User",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", does."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "An addressable value is a value whose address Go can take."
                ]
            ]
        },
        {
            "id": "ca97f2d6-1ced-57d7-ade1-720dfc1ab345",
            "type": "bulleted_list",
            "richText": [
                [
                    "For an addressable "
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
                    ", Go treats "
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
                    " as "
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
                    "."
                ]
            ]
        },
        {
            "id": "71c5965d-6666-55ec-b389-3ab5e55d9a36",
            "type": "bulleted_list",
            "richText": [
                [
                    "Variables and slice elements are addressable."
                ]
            ]
        },
        {
            "id": "8d08ca6e-332d-5f7d-891d-79b24d13a8dc",
            "type": "bulleted_list",
            "richText": [
                [
                    "A field is addressable when its struct is addressable."
                ]
            ]
        },
        {
            "id": "d75c3904-00fa-536d-84e8-2d7458b8afeb",
            "type": "bulleted_list",
            "richText": [
                [
                    "An array element is addressable when its array is addressable."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "User{}.Write(\"x\")",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " fails. Go cannot automatically take the literal’s address for this call."
                ]
            ]
        },
        {
            "id": "5c12fe79-9268-5c72-a05a-de24967a3f43",
            "type": "bulleted_list",
            "richText": [
                [
                    "u := User{}",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " followed by "
                ],
                [
                    "u.Write(\"x\")",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " works. The variable "
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
                    " is addressable."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A pointer receiver can be "
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
            "id": "d615795e-dca5-5ad2-924f-e75d07401f57",
            "type": "bulleted_list",
            "richText": [
                [
                    "Check for "
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
                    " before reading or writing the receiver’s fields."
                ]
            ]
        },
        {
            "id": "636bfee0-fde8-5398-b400-13ce835df2da",
            "type": "bulleted_list",
            "richText": [
                [
                    "A method can also panic for reasons unrelated to its receiver."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The receiver base type is the type without the pointer. For "
                ],
                [
                    "(u *User)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", the base type is "
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
                    "."
                ]
            ]
        },
        {
            "id": "e9fba99d-c177-5d0a-b87d-e2086560ed7a",
            "type": "bulleted_list",
            "richText": [
                [
                    "The base type must be a defined type from the same package as the method."
                ]
            ]
        },
        {
            "id": "32cdc70e-fa74-586a-a7ee-d3636b1daf16",
            "type": "bulleted_list",
            "richText": [
                [
                    "The base type itself cannot be a pointer type or an interface type."
                ]
            ]
        },
        {
            "id": "97ea1704-bbc6-5fe6-9b7a-1720c5405ff5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Declare methods outside the type declaration."
                ]
            ]
        },
        {
            "id": "4ff5fd89-1228-5089-b243-d185e84daf51",
            "type": "bulleted_list",
            "richText": [
                [
                    "Methods belong to types. A struct value does not store method declarations."
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
                    "Do not declare methods directly on built-in "
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
                    ", an unnamed struct or a type from another package."
                ]
            ]
        },
        {
            "id": "5d736984-1cab-54fd-afdb-8d1a82e3728c",
            "type": "bulleted_list",
            "richText": [
                [
                    "An alias gives an existing type another name. It does not create a new type."
                ]
            ]
        },
        {
            "id": "518fa7e7-a6d8-58bc-ba2b-7582be545e05",
            "type": "bulleted_list",
            "richText": [
                [
                    "A simple local alias, such as "
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
                    ", can be used as a receiver for methods on "
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
                    "."
                ]
            ]
        },
        {
            "id": "894460aa-fd12-5314-ae3b-c1d5d7505e91",
            "type": "bulleted_list",
            "richText": [
                [
                    "An alias to a type from another package cannot be used for this."
                ]
            ]
        },
        {
            "id": "f40d14ad-35fa-53e6-b274-020e37227e13",
            "type": "bulleted_list",
            "richText": [
                [
                    "A receiver alias cannot be generic or refer to a type created by supplying generic type arguments."
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
