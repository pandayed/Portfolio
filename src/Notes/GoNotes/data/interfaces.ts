/* Copied from the Interfaces page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-80f1-9158-f4bcf0b5ae56",
    "slug": "interfaces",
    "title": "Interfaces",
    "updatedOn": "2026-01-26",
    "blocks": [
        {
            "id": "24024eb1-ed54-803b-b640-fdd60b17ade9",
            "type": "bulleted_list",
            "richText": [
                [
                    "A type that specifies "
                ],
                [
                    "a set of method signatures",
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
            "id": "24024eb1-ed54-8011-8fcf-cd8817ebf91f",
            "type": "bulleted_list",
            "richText": [
                [
                    "It lets different types be used "
                ],
                [
                    "interchangeably",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", if they implement those methods."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-808a-9a52-c6144d8aa183",
            "type": "bulleted_list",
            "richText": [
                [
                    "Interfaces trade:"
                ]
            ],
            "children": [
                {
                    "id": "2f324eb1-ed54-80c6-9b6e-fe5a573f5777",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "A tiny performance cost"
                        ]
                    ]
                },
                {
                    "id": "2f324eb1-ed54-8028-9185-f0211aad6a26",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "For flexibility, testability, and correctness"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f324eb1-ed54-80c0-bdf9-c957593c3ea7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Interfaces are a "
                ],
                [
                    "design tool",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not an optimization."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-80da-bac1-ff17ad625794",
            "type": "divider"
        },
        {
            "id": "24a24eb1-ed54-8098-bb20-e3e60a23d202",
            "type": "sub_header",
            "richText": [
                [
                    "Key Properties",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8038-8cfe-e5159afc37dd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Implicit implementation",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": A type "
                ],
                [
                    "automatically implements",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " an interface if it has all the methods."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-807c-8882-d2b1d51e2040",
            "type": "bulleted_list",
            "richText": [
                [
                    "No keyword like ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "implements",
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
                    " or ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "extends",
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
                    " is needed."
                ]
            ]
        },
        {
            "id": "2a424eb1-ed54-80e1-b178-e75cb7946747",
            "type": "text",
            "richText": [
                [
                    "In Go, a type "
                ],
                [
                    "implements an interface implicitly",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not explicitly."
                ]
            ]
        },
        {
            "id": "2a424eb1-ed54-807f-95b6-e129a2715b13",
            "type": "text",
            "richText": [
                [
                    "That means:"
                ]
            ]
        },
        {
            "id": "2a424eb1-ed54-8054-bc76-ed0fd8f90a5d",
            "type": "bulleted_list",
            "richText": [
                [
                    "A struct "
                ],
                [
                    "doesn’t have to implement all interface methods",
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
                    "unless",
                    [
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    " you are "
                ],
                [
                    "assigning the struct to a variable of that interface type",
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
            "id": "24024eb1-ed54-80c7-ac9d-de0da61e3e7d",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80f0-89e2-d927e96e3495",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Syntax",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-809a-889d-e9960f057ee0",
            "type": "code",
            "richText": [
                [
                    "type InterfaceName interface {\n    Method1()\n    Method2() string\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8041-8d18-e804934781ea",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-808d-a128-c1fffd59124b",
            "type": "code",
            "richText": [
                [
                    "type Speaker interface {\n    Speak() string\n}\n\ntype Dog struct{}\n\nfunc (d Dog) Speak() string {\n    return \"Woof\"\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80a9-ac5c-f31677b24ca5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Dog",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " implements "
                ],
                [
                    "Speaker",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " because it has the "
                ],
                [
                    "Speak()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " method."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-805a-b1e9-de6425509951",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8078-8f28-f02d0ff8c227",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Using Interface Values",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8054-90a0-ed3b27eeca7e",
            "type": "code",
            "richText": [
                [
                    "func makeItSpeak(s Speaker) {\n    fmt.Println(s.Speak())\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8039-ac42-d31046a0cc37",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can pass any value that implements "
                ],
                [
                    "Speaker",
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
            "id": "24024eb1-ed54-807c-881e-e1a94f1b9709",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8042-af9b-d49ca3a0b021",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Multiple Types Implementing Same Interface",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80ec-a76f-d7f3cf5ba32a",
            "type": "code",
            "richText": [
                [
                    "type Cat struct{}\nfunc (c Cat) Speak() string {\n    return \"Meow\"\n}\n\nd := Dog{}\nc := Cat{}\nmakeItSpeak(d) // Woof\nmakeItSpeak(c) // Meow\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-806d-9852-d12c5f306364",
            "type": "bulleted_list",
            "richText": [
                [
                    "Interfaces allow "
                ],
                [
                    "polymorphism",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " in Go (functions work with many types via interface)."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8008-8317-e977414fb8fb",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80af-a32c-c13523bd91f9",
            "type": "text",
            "richText": [
                [
                    "In Go, "
                ],
                [
                    "a type must implement ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "all",
                    [
                        [
                            "b"
                        ],
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    " methods of an interface",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " to satisfy it."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-804c-9876-cd22cd2e0c6b",
            "type": "text",
            "richText": [
                [
                    "There is "
                ],
                [
                    "no partial implementation",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "—unlike some languages, Go does "
                ],
                [
                    "not support abstract base classes or partial interfaces",
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
            "id": "24024eb1-ed54-80e0-8bca-f32ea909611c",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-802e-9ccd-fa19969540f9",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8029-bfcf-d074040b7e81",
            "type": "code",
            "richText": [
                [
                    "type ReaderWriter interface {\n\tRead() string\n\tWrite(data string)\n}\n\ntype MyStruct struct{}\n\nfunc (m MyStruct) Read() string {\n\treturn \"reading\"\n}\n\n// Only Read is implemented, Write is missing\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80ab-9526-ec82da5e59a0",
            "type": "text",
            "richText": [
                [
                    "This will cause a "
                ],
                [
                    "compile-time error",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " if you try to assign "
                ],
                [
                    "MyStruct",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to "
                ],
                [
                    "ReaderWriter",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80bf-8bf1-efb4564c90f4",
            "type": "code",
            "richText": [
                [
                    "var rw ReaderWriter = MyStruct{} // ❌ Compile-time error\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80f2-a657-d9651fc86fe2",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Key Point:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-808a-9274-e7fe7d8e1e01",
            "type": "bulleted_list",
            "richText": [
                [
                    "All methods",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " must be implemented."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-807e-90aa-fee581005f38",
            "type": "bulleted_list",
            "richText": [
                [
                    "If even "
                ],
                [
                    "one method is missing",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", the type "
                ],
                [
                    "does not",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " implement the interface."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80c4-a04b-fd6e1dd72d99",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80dd-871c-deb7d4863284",
            "type": "text",
            "richText": [
                [
                    "Go allows you to "
                ],
                [
                    "compose interfaces",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " by combining smaller interfaces. This promotes "
                ],
                [
                    "separation of concerns",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "flexibility",
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
            "id": "24024eb1-ed54-80aa-9a0b-cbc490604ced",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8051-b5fe-d43208546ba4",
            "type": "code",
            "richText": [
                [
                    "type Reader interface {\n\tRead() string\n}\n\ntype Writer interface {\n\tWrite(data string)\n}\n\n// Composite interface\ntype ReaderWriter interface {\n\tReader\n\tWriter\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8002-967f-c1834677a723",
            "type": "text",
            "richText": [
                [
                    "Here:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8066-ac04-d1b88f376a1e",
            "type": "bulleted_list",
            "richText": [
                [
                    "ReaderWriter",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " includes all methods from both "
                ],
                [
                    "Reader",
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
            "id": "24024eb1-ed54-804e-ab9d-e86cd8435663",
            "type": "bulleted_list",
            "richText": [
                [
                    "Any type that implements "
                ],
                [
                    "both",
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
                    "Read()",
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
                    "Write(data string)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " will satisfy "
                ],
                [
                    "ReaderWriter",
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
            "id": "24024eb1-ed54-80bb-9963-e30433ad0378",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Why is this useful?"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8074-bb15-f51c40afb7ee",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can write generic code that only depends on "
                ],
                [
                    "what it needs",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ],
            "children": [
                {
                    "id": "24024eb1-ed54-804b-a983-f455497b256e",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Use "
                        ],
                        [
                            "Reader",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " if you only need to read."
                        ]
                    ]
                },
                {
                    "id": "24024eb1-ed54-80f6-b61b-c2faa5d6553e",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Use "
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
                            " if you only need to write."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24024eb1-ed54-805a-8551-f28e280596be",
            "type": "bulleted_list",
            "richText": [
                [
                    "Then combine them when needed for full behavior."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8020-ab14-ca746244c91b",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8085-88e9-c15541d8ae7f",
            "type": "sub_header",
            "richText": [
                [
                    "Empty Interface (",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "interface{}",
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
            "id": "24024eb1-ed54-80f3-b2d5-e35956838834",
            "type": "bulleted_list",
            "richText": [
                [
                    "Definition",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": An interface with "
                ],
                [
                    "no methods",
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
            "id": "24024eb1-ed54-80bd-a551-c1c60b51aafe",
            "type": "bulleted_list",
            "richText": [
                [
                    "All types implement it",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " (because it requires nothing)."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8021-b95e-c85a778e6ebc",
            "type": "bulleted_list",
            "richText": [
                [
                    "Used for",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ],
            "children": [
                {
                    "id": "24024eb1-ed54-80bb-bb83-d06ff5794cc2",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Generic data containers (pre-generics)"
                        ]
                    ]
                },
                {
                    "id": "24024eb1-ed54-8057-a03c-c2857017550a",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Accepting any type in a function"
                        ]
                    ]
                },
                {
                    "id": "24024eb1-ed54-80eb-a5fa-f2294741e225",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Decoding unknown JSON structure"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24024eb1-ed54-8034-98ff-f1068e8f5797",
            "type": "code",
            "richText": [
                [
                    "func PrintAny(val interface{}) {\n\tfmt.Println(val)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-809e-a625-ce0d2b8e5a4e",
            "type": "text",
            "richText": [
                [
                    "Limitation",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": You lose type safety and must use "
                ],
                [
                    "type assertion",
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
                    "type switch",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " to recover the concrete type."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80b8-a6d0-c5d5a63b2f88",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80d8-b97b-c4ca965efadb",
            "type": "sub_header",
            "richText": [
                [
                    "Type Assertion",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80c7-9513-cc4c5423f8c2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Used to get the "
                ],
                [
                    "concrete value",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " out of an interface."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8087-b77f-f79405487f9c",
            "type": "code",
            "richText": [
                [
                    "var x interface{} = 10\nv := x.(int) // v == 10"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2f424eb1-ed54-8071-9870-f65da3e3a705",
            "type": "text",
            "richText": [
                [
                    "This syntax is called a "
                ],
                [
                    "type assertion",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " in Go."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80da-bd75-e8a563e9e49c",
            "type": "bulleted_list",
            "richText": [
                [
                    "It is "
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
                    " a function call"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-806b-aa3c-f4921614614f",
            "type": "bulleted_list",
            "richText": [
                [
                    "It is "
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
                    " type casting"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8065-b00a-e314f3c150f0",
            "type": "bulleted_list",
            "richText": [
                [
                    "It is a "
                ],
                [
                    "language-level operation",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8002-af95-fd29a89f5444",
            "type": "text",
            "richText": [
                [
                    "What it applies to"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8058-8eb0-c7ef4d995a7e",
            "type": "text",
            "richText": [
                [
                    "• "
                ],
                [
                    "x",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " must be of "
                ],
                [
                    "interface type",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8028-953c-c036820a5895",
            "type": "text",
            "richText": [
                [
                    "• Example: "
                ],
                [
                    "var x interface{} = 10",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8069-8bcf-e0d0ab9c2c87",
            "type": "text",
            "richText": [
                [
                    "What "
                ],
                [
                    "x.(int)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " means"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-800c-b573-d04a3dc66922",
            "type": "text",
            "richText": [
                [
                    "• Ask the runtime: “Does the dynamic value inside "
                ],
                [
                    "x",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " have concrete type "
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
                    "?”"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-805b-94b0-cd21064fa883",
            "type": "text",
            "richText": [
                [
                    "• If yes → extract the value as "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8053-b78d-fb9550bbdbd9",
            "type": "text",
            "richText": [
                [
                    "• If no → runtime panic (unless using the "
                ],
                [
                    "comma ok",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " form)"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-800a-9c21-ef60690483c4",
            "type": "text",
            "richText": [
                [
                    "What happens step-by-step"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80c6-b38e-c291a72046b2",
            "type": "text",
            "richText": [
                [
                    "• "
                ],
                [
                    "x",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " stores two things internally"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80b4-b902-d3ec96a233cf",
            "type": "text",
            "richText": [
                [
                    "– concrete value: "
                ],
                [
                    "10",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8015-b30c-c3fb53ee1af7",
            "type": "text",
            "richText": [
                [
                    "– concrete type: "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-808a-894e-f62aec65d386",
            "type": "text",
            "richText": [
                [
                    "• "
                ],
                [
                    ".(int)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " checks the stored concrete type"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80ea-8c5e-d9eb6ec26f1a",
            "type": "text",
            "richText": [
                [
                    "• If it matches "
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
                    ", the value is copied into "
                ],
                [
                    "v",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8027-9986-f9f329a21ba5",
            "type": "text",
            "richText": [
                [
                    "Why this is not casting"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8099-82fb-e1dd08826ae0",
            "type": "text",
            "richText": [
                [
                    "• Casting changes representation at compile time"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-801f-8b7e-c477433e25c8",
            "type": "text",
            "richText": [
                [
                    "• Type assertion "
                ],
                [
                    "checks",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "extracts",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " at runtime"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8040-83eb-c23f06e74944",
            "type": "text",
            "richText": [
                [
                    "• You cannot assert non-interface values"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80b7-b782-c528f32f7c3a",
            "type": "text",
            "richText": [
                [
                    "Safe form (no panic)"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-808e-aef6-dd2adfcccdeb",
            "type": "text",
            "richText": [
                [
                    "• "
                ],
                [
                    "v, ok := x.(int)",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8051-be82-f8d62c68edaf",
            "type": "text",
            "richText": [
                [
                    "• "
                ],
                [
                    "ok == true",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → assertion succeeded"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80a9-9c3d-c4452fddfb32",
            "type": "text",
            "richText": [
                [
                    "• "
                ],
                [
                    "ok == false",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → assertion failed, "
                ],
                [
                    "v",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is zero value of "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-804f-bf11-ef4b679f71ec",
            "type": "text",
            "richText": [
                [
                    "What you missed (important)"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-803f-97bb-e05abcbd5dcf",
            "type": "text",
            "richText": [
                [
                    "• "
                ],
                [
                    "x.(int)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is only legal when "
                ],
                [
                    "x",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is an interface"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80cf-8176-e13546a2cd4b",
            "type": "text",
            "richText": [
                [
                    "• Writing "
                ],
                [
                    "y.(int)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " where "
                ],
                [
                    "y",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is already an "
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
                    " is a compile-time error"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8039-a492-f2a175465d81",
            "type": "text",
            "richText": [
                [
                    "One-line definition"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80ca-9d57-e69029a71721",
            "type": "text",
            "richText": [
                [
                    "• Type assertion = runtime extraction of a concrete value from an interface based on its dynamic type"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-807e-9838-da2b2c453f98",
            "type": "bulleted_list",
            "richText": [
                [
                    "If the type doesn't match, it "
                ],
                [
                    "panics",
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
            "id": "24024eb1-ed54-807d-9710-cba5012ed075",
            "type": "bulleted_list",
            "richText": [
                [
                    "Safe version (comma-ok idiom):"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8038-a08f-eba1d649fa86",
            "type": "code",
            "richText": [
                [
                    "v, ok := x.(string)\nif ok {\n\tfmt.Println(\"It's a string:\", v)\n} else {\n\tfmt.Println(\"Not a string\")\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80f1-a19e-c75529d46d73",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80a9-a4f0-ee097748eefb",
            "type": "sub_header",
            "richText": [
                [
                    "Type Switch",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8031-9091-d13b82232a5c",
            "type": "bulleted_list",
            "richText": [
                [
                    "A safer way to handle "
                ],
                [
                    "multiple possible types",
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
            "id": "24024eb1-ed54-80d7-b2c5-e38d367263f2",
            "type": "code",
            "richText": [
                [
                    "func PrintType(val interface{}) {\n\tswitch v := val.(type) {\n\tcase int:\n\t\tfmt.Println(\"int:\", v)\n\tcase string:\n\t\tfmt.Println(\"string:\", v)\n\tdefault:\n\t\tfmt.Println(\"unknown type\")\n\t}\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-808a-b6b1-f721b1928fb1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Useful when dealing with "
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
                    " or unknown interface values."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8055-b2d0-c99c7e347758",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-808b-ac3e-f774cb8036b4",
            "type": "sub_header",
            "richText": [
                [
                    "Nil Interface Pitfalls",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-800b-8470-fe3671e834c2",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Problem:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80d7-b785-c796e6fd9c1f",
            "type": "code",
            "richText": [
                [
                    "var err error = nil           // interface is nil\nfmt.Println(err == nil)       // true\n\nvar e *MyError = nil\nvar err2 error = e            // err2 is not nil!\nfmt.Println(err2 == nil)      // false ❌\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80e1-b707-fa3214e0f0e2",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Why?"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8040-a433-d330b373c072",
            "type": "bulleted_list",
            "richText": [
                [
                    "An interface is "
                ],
                [
                    "only nil",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " if "
                ],
                [
                    "both",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ],
            "children": [
                {
                    "id": "24024eb1-ed54-8071-922d-db7e7fad8e32",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Its "
                        ],
                        [
                            "dynamic type",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " is nil"
                        ]
                    ]
                },
                {
                    "id": "24024eb1-ed54-8005-a6b5-fcff9a632cd1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Its "
                        ],
                        [
                            "dynamic value",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " is nil"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24024eb1-ed54-8015-b443-ce2552957dd7",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8075-8517-f30220ab3b8e",
            "type": "sub_header",
            "richText": [
                [
                    "Interface Values: Dynamic Type + Dynamic Value",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-800d-8c63-fdfdb609b3b1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Interface variables hold "
                ],
                [
                    "two components",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ],
            "children": [
                {
                    "id": "24024eb1-ed54-8034-9fbb-f086d1ce3021",
                    "type": "numbered_list",
                    "richText": [
                        [
                            "Dynamic type",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            ": the real underlying type"
                        ]
                    ]
                },
                {
                    "id": "24024eb1-ed54-80b3-a59c-d87c9057cce1",
                    "type": "numbered_list",
                    "richText": [
                        [
                            "Dynamic value",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            ": the actual value"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24024eb1-ed54-80b4-b857-e710c9e959db",
            "type": "text",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80ec-afc8-cedc5ee88096",
            "type": "code",
            "richText": [
                [
                    "var r Reader = FileReader{}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-809a-b942-fc9e86aeba23",
            "type": "bulleted_list",
            "richText": [
                [
                    "r",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " has:"
                ]
            ],
            "children": [
                {
                    "id": "24024eb1-ed54-80cc-a5d5-dbcff22776b6",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "dynamic type = "
                        ],
                        [
                            "FileReader",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ]
                    ]
                },
                {
                    "id": "24024eb1-ed54-8078-875f-fc7fb0b7b2ae",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "dynamic value = value of the "
                        ],
                        [
                            "FileReader",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " object"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24024eb1-ed54-80e5-8667-ee71587998b6",
            "type": "text",
            "richText": [
                [
                    "This is why you need to be careful with "
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
                    "—the interface might still "
                ],
                [
                    "hold a non-nil type",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " with a "
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
                    " value."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80c5-a032-d1e46de9c955",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8067-ae89-cf24ba1fc72a",
            "type": "sub_header",
            "richText": [
                [
                    "Practical Usage: Writing Polymorphic Code",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-803d-83a7-f8507ab56107",
            "type": "text",
            "richText": [
                [
                    "Interfaces are used to write "
                ],
                [
                    "generic, flexible",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " code:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8005-b1be-f7a45cac1d8d",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Examples:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80ad-be38-c295dba67d11",
            "type": "bulleted_list",
            "richText": [
                [
                    "Dependency injection",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": Pass in interfaces to decouple components."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8002-97fb-e81efedc47d3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Testing",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": Replace real objects with mock implementations."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80ad-8ac6-c919c6c50798",
            "type": "bulleted_list",
            "richText": [
                [
                    "Plugins",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": Allow user-defined types to implement required behavior."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8090-96c8-d8f6ae9eb578",
            "type": "code",
            "richText": [
                [
                    "type Storage interface {\n\tSave(data string)\n}\n\nfunc Process(s Storage) {\n\ts.Save(\"some data\")\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80ae-9b6e-d0e92e1e7240",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-801c-830a-c73c67eee269",
            "type": "sub_header",
            "richText": [
                [
                    "Interface Best Practices",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80c2-8ffe-d44616e5b474",
            "type": "bulleted_list",
            "richText": [
                [
                    "Keep interfaces small",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": Prefer 1–2 methods (e.g., "
                ],
                [
                    "io.Reader",
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
                    "fmt.Stringer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ")."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80ae-a227-c220666b91fe",
            "type": "bulleted_list",
            "richText": [
                [
                    "Define interfaces in the consumer package",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not the implementation."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8018-971b-ea4dc059fc36",
            "type": "bulleted_list",
            "richText": [
                [
                    "Avoid ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "interface{}",
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
                    " unless truly necessary—prefer concrete types or generics."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80cb-bb96-cd370f7b7659",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8000-96de-f8eccd81dee1",
            "type": "text"
        },
        {
            "id": "2f324eb1-ed54-802d-946b-ed9b0b013743",
            "type": "sub_header",
            "richText": [
                [
                    "Interface Method Resolution"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80f5-907e-dc59f0a49e1f",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Compile-time behavior"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8085-b03f-f2ff75793c5a",
            "type": "bulleted_list",
            "richText": [
                [
                    "The compiler checks:"
                ]
            ],
            "children": [
                {
                    "id": "2f324eb1-ed54-807d-a44e-c1dda652d109",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "The interface method set is valid."
                        ]
                    ]
                },
                {
                    "id": "2f324eb1-ed54-80f2-b48d-ffda8700e8da",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "The function only calls methods declared in the interface."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f324eb1-ed54-8029-8842-fbf472e62a98",
            "type": "bulleted_list",
            "richText": [
                [
                    "The compiler "
                ],
                [
                    "does not choose",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " which concrete method implementation will run."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8017-8647-e9dfbde8f908",
            "type": "bulleted_list",
            "richText": [
                [
                    "The compiler "
                ],
                [
                    "cannot assume",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " a specific concrete type."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-806e-b71c-f199cf93c8ae",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Runtime behavior"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-809a-a107-dd76008f575d",
            "type": "bulleted_list",
            "richText": [
                [
                    "An interface value contains:"
                ]
            ],
            "children": [
                {
                    "id": "2f324eb1-ed54-8023-9ba5-c97238cb95f6",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "The concrete type"
                        ]
                    ]
                },
                {
                    "id": "2f324eb1-ed54-8091-8ba6-c3423177d75f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "A pointer to that type’s method table"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f324eb1-ed54-80bc-a68e-cc1406d8ef15",
            "type": "bulleted_list",
            "richText": [
                [
                    "When calling "
                ],
                [
                    "iface.method()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ],
            "children": [
                {
                    "id": "2f324eb1-ed54-8030-82c3-d588e82cd55d",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Go performs a method table lookup"
                        ]
                    ]
                },
                {
                    "id": "2f324eb1-ed54-8074-a803-db11b9fceff3",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "The concrete method is invoked"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f324eb1-ed54-8048-b55d-dcd956f11168",
            "type": "bulleted_list",
            "richText": [
                [
                    "This is "
                ],
                [
                    "dynamic dispatch",
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
            "id": "2f324eb1-ed54-80ae-9b53-d6a9b133cce8",
            "type": "bulleted_list",
            "richText": [
                [
                    "Resolution happens "
                ],
                [
                    "at runtime",
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
            "id": "2f324eb1-ed54-800a-aa27-dd62474914e4",
            "type": "divider"
        },
        {
            "id": "2f324eb1-ed54-805f-8a11-ca19504db314",
            "type": "sub_header",
            "richText": [
                [
                    "Performance Characteristics"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80d8-ba76-f37cf8964d9c",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Cost of interface calls"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80ed-87db-c7108acc9f0b",
            "type": "bulleted_list",
            "richText": [
                [
                    "One extra indirection:"
                ]
            ],
            "children": [
                {
                    "id": "2f324eb1-ed54-80ed-a2b4-ebc6f00805ec",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Pointer to method table"
                        ]
                    ]
                },
                {
                    "id": "2f324eb1-ed54-8082-8f40-e7498ec8e3d4",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Function call through that pointer"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f324eb1-ed54-8067-8039-c782814a824e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Slightly slower than direct method calls."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8016-b5f6-e586eec3dfba",
            "type": "bulleted_list",
            "richText": [
                [
                    "Measurable only in tight loops or benchmarks."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8092-a9ec-cba7eb157d66",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Important clarification"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80cd-8cf1-e7c23a1cd623",
            "type": "bulleted_list",
            "richText": [
                [
                    "Interfaces are "
                ],
                [
                    "not generics",
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
            "id": "2f324eb1-ed54-80d6-aac0-f480c6ffe3a6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Interfaces use runtime dispatch."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80c1-aae3-fcfa43f958e6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Generics (Go 1.18+) are resolved at compile time."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-804b-88f6-c443e179b447",
            "type": "divider"
        },
        {
            "id": "2f324eb1-ed54-80df-b56b-f61336cb4631",
            "type": "sub_header",
            "richText": [
                [
                    "Direct Method Calls vs Interfaces"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8050-a7d5-e38807c25157",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Direct method calls"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8099-a961-f6b4064b13f1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Compile-time binding."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80bf-b38c-f9f2bba49c16",
            "type": "bulleted_list",
            "richText": [
                [
                    "Zero indirection."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8074-b70e-c2d300075398",
            "type": "bulleted_list",
            "richText": [
                [
                    "Maximum performance."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8024-af54-e2be4b67ab1c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Hard dependency on concrete type."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80a9-bd99-f134d2d1ab4f",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Limitations of direct calls"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-800f-897a-e89857479dc1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Cannot substitute implementations without changing function signatures."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-805a-96e8-ecf4809b40cc",
            "type": "bulleted_list",
            "richText": [
                [
                    "Strong coupling between components."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8067-84b2-ef22f69b26d6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Harder to test in isolation."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8098-a30f-e8204dd5c52c",
            "type": "divider"
        },
        {
            "id": "2f324eb1-ed54-808c-ad9d-cacebab8e4f9",
            "type": "sub_header",
            "richText": [
                [
                    "Why Interfaces Exist (Core Reasons)"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8028-8688-ee40db9891ab",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Decoupling"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8067-95cc-de90c5b5af8c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Code depends on "
                ],
                [
                    "behavior",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not concrete types."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80d0-9dca-eecda90f687b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Callers do not need to know implementations."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8005-a4d6-f161c6abf2c9",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Substitutability"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-800b-8f81-ed641f14cb33",
            "type": "bulleted_list",
            "richText": [
                [
                    "Any type satisfying the interface can be used."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80ad-bf69-cd7d66f29dd0",
            "type": "bulleted_list",
            "richText": [
                [
                    "Existing code does not change."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-803c-8cfd-f0d8ba5eacf6",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Extensibility"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80d5-a9a0-fef0302c42df",
            "type": "bulleted_list",
            "richText": [
                [
                    "New implementations can be added."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-807b-bf48-c371af00b018",
            "type": "bulleted_list",
            "richText": [
                [
                    "Existing functions remain untouched."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-807e-8474-f2140e026360",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Testability"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80ee-80ab-e551fab6941e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Interfaces allow:"
                ]
            ],
            "children": [
                {
                    "id": "2f324eb1-ed54-80dd-85cf-eb1478cd3cd8",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Mocks"
                        ]
                    ]
                },
                {
                    "id": "2f324eb1-ed54-80a7-a15b-d9b2d7173c33",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Fakes"
                        ]
                    ]
                },
                {
                    "id": "2f324eb1-ed54-80f3-bb04-dc8230490a90",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Stubs"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f324eb1-ed54-809c-8771-e96e8162e63b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Logic can be tested without real external systems."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8040-b32b-d0659e2176b3",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Correctness at scale"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8058-ac72-f8fe280ae9d6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Interfaces act as "
                ],
                [
                    "contracts",
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
            "id": "2f324eb1-ed54-80c8-82bc-f5ab89cec1cb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Compiler enforces method availability."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80ce-aa7e-ee6c4b42f341",
            "type": "divider"
        },
        {
            "id": "2f324eb1-ed54-80c9-b6e8-f80ecb1586bb",
            "type": "sub_header",
            "richText": [
                [
                    "Are Interfaces Over-Engineering?"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8083-9f4c-c799e6822c94",
            "type": "sub_sub_header",
            "richText": [
                [
                    "When interfaces are justified"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8003-ba7c-c5d1ff7e4eaa",
            "type": "bulleted_list",
            "richText": [
                [
                    "Multiple implementations already exist."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80f7-abda-dcd72dab1250",
            "type": "bulleted_list",
            "richText": [
                [
                    "Substitution is required (real vs mock)."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80c5-bc6a-ebb6c04d21be",
            "type": "bulleted_list",
            "richText": [
                [
                    "Clear package boundaries exist."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8000-a194-d87743477c76",
            "type": "bulleted_list",
            "richText": [
                [
                    "Long-term maintainability matters."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-803a-91db-d9654c0c023f",
            "type": "sub_sub_header",
            "richText": [
                [
                    "When interfaces are NOT justified"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8056-a67a-ee1106ed1584",
            "type": "bulleted_list",
            "richText": [
                [
                    "Only one implementation will ever exist."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8095-b85e-deef44ddb19b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Code is performance-critical and in hot paths."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8098-b61d-fe26605cd831",
            "type": "bulleted_list",
            "richText": [
                [
                    "No need for substitution or testing isolation."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-807e-a26b-e0d727052e29",
            "type": "divider"
        },
        {
            "id": "2f324eb1-ed54-8080-9082-fea80aaf40bc",
            "type": "sub_header",
            "richText": [
                [
                    "Go-Specific Interface Philosophy"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80bb-9828-c9b78d9d13da",
            "type": "bulleted_list",
            "richText": [
                [
                    "Interfaces should be:"
                ]
            ],
            "children": [
                {
                    "id": "2f324eb1-ed54-8023-8db2-f1b14e00b910",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Small"
                        ]
                    ]
                },
                {
                    "id": "2f324eb1-ed54-80c5-8371-d9d6774e6532",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Behavior-focused"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f324eb1-ed54-804e-8478-f61344babe98",
            "type": "bulleted_list",
            "richText": [
                [
                    "Usually defined by the "
                ],
                [
                    "consumer",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not the producer."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8076-8449-ecc00eba3317",
            "type": "bulleted_list",
            "richText": [
                [
                    "Encourages minimal coupling."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8004-8e6c-eebbeaef159a",
            "type": "divider"
        },
        {
            "id": "2f324eb1-ed54-8075-b532-cda9faf6adf2",
            "type": "sub_header",
            "richText": [
                [
                    "Rule of Thumb (Important)"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80e6-aaa8-e4940a140f56",
            "type": "bulleted_list",
            "richText": [
                [
                    "Accept concrete types as parameters."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-802c-ab55-e6e0359792f6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Return interfaces from functions."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8000-b332-ea37050e9276",
            "type": "bulleted_list",
            "richText": [
                [
                    "Introduce interfaces at package boundaries."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-803e-992e-fc8ce7450c3e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not introduce interfaces “just in case”."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-8065-a23b-c611162bbfb7",
            "type": "divider"
        },
        {
            "id": "2f324eb1-ed54-805f-9761-ce741af3c5f1",
            "type": "sub_header",
            "richText": [
                [
                    "Final Summary"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80a4-8bc2-df48e1635d62",
            "type": "bulleted_list",
            "richText": [
                [
                    "Interface method resolution:"
                ]
            ],
            "children": [
                {
                    "id": "2f324eb1-ed54-8077-98c2-f412b24a6cbf",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Type safety: compile time"
                        ]
                    ]
                },
                {
                    "id": "2f324eb1-ed54-8058-be6c-e077201b1bbd",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Method selection: runtime"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f324eb1-ed54-8080-85a6-f11621db4227",
            "type": "text"
        },
        {
            "id": "2f324eb1-ed54-80d9-97a3-c890879e74bf",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
