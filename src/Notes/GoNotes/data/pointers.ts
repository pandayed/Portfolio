/* Copied from the Pointers page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8046-a462-c0176675768d",
    "slug": "pointers",
    "title": "Pointers",
    "updatedOn": "2025-08-09",
    "blocks": [
        {
            "id": "24124eb1-ed54-803c-853f-fe644887f036",
            "type": "bulleted_list",
            "richText": [
                [
                    "A pointer stores the "
                ],
                [
                    "memory address",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " of a variable."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80bf-9fe5-c6a4c480d3ca",
            "type": "bulleted_list",
            "richText": [
                [
                    "Syntax: "
                ],
                [
                    "var ptr *int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " means "
                ],
                [
                    "ptr",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a pointer to an "
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
            "id": "24124eb1-ed54-80a3-9648-e1222cae2461",
            "type": "bulleted_list",
            "richText": [
                [
                    "You use "
                ],
                [
                    "&",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to get the address, and  to dereference (access the value at the address)."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8007-8580-c846df69fcfa",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8096-911f-ffb938570965",
            "type": "sub_header",
            "richText": [
                [
                    "Declaring and Using Pointers",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8028-921d-ce739abae8d6",
            "type": "code",
            "richText": [
                [
                    "var x int = 10\nvar p *int = &x   // p stores the address of x\nfmt.Println(*p)   // dereference: prints 10\n*p = 20           // updates x to 20\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-80b5-821a-c4347a348563",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8082-9a6a-e7ddc798f74a",
            "type": "sub_header",
            "richText": [
                [
                    "Zero Value of Pointers",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80a5-a2de-c6445e6a6d56",
            "type": "bulleted_list",
            "richText": [
                [
                    "The zero value of a pointer is "
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
            "id": "24124eb1-ed54-8009-8cd8-df48ea4e3577",
            "type": "code",
            "richText": [
                [
                    "var p *int\nfmt.Println(p)  // prints: <nil>\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-808d-b292-e5690e3a150a",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80a8-b8a7-e91fdfad2a46",
            "type": "sub_header",
            "richText": [
                [
                    "Short Declaration with Pointers",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80c8-a75e-c46acccd4def",
            "type": "code",
            "richText": [
                [
                    "x := 5\np := &x\nfmt.Println(*p)  // prints: 5\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-806c-82d3-de5c75204a01",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8084-bf70-ec9b3ec58dc8",
            "type": "sub_header",
            "richText": [
                [
                    "Pointer to a Pointer",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80b8-b5a6-eb0f47163631",
            "type": "code",
            "richText": [
                [
                    "x := 10\np := &x\npp := &p\nfmt.Println(**pp)  // prints: 10\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-80dc-8472-c96e88b88164",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8003-9a7c-c67fd920629f",
            "type": "sub_header",
            "richText": [
                [
                    "Passing Pointers to Functions",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8033-8035-ff7d2212ab95",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go passes everything by value, but you can pass a "
                ],
                [
                    "pointer",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " to modify the original value."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-808d-b6e7-f343d5454e8b",
            "type": "code",
            "richText": [
                [
                    "func increment(n *int) {\n    *n++\n}\n\nx := 5\nincrement(&x)\nfmt.Println(x) // prints: 6\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-80da-a21c-e1e594e564c6",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8091-a916-f173841a2caf",
            "type": "sub_header",
            "richText": [
                [
                    "Pointers with Structs",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-802a-add6-db1c5f2ddc15",
            "type": "code",
            "richText": [
                [
                    "type User struct {\n    name string\n}\n\nfunc changeName(u *User) {\n    u.name = \"Alice\"\n}\n\nuser := User{name: \"Bob\"}\nchangeName(&user)\nfmt.Println(user.name) // prints: Alice\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-80d1-9d46-e19bdf0a8bcb",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8081-851e-ddce35f18a54",
            "type": "sub_header",
            "richText": [
                [
                    "Using ",
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
                ],
                [
                    " Function",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80e7-a8cd-f17930fa5be0",
            "type": "bulleted_list",
            "richText": [
                [
                    "Allocates zeroed memory and returns a pointer."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-801d-921b-eb07c92eee67",
            "type": "code",
            "richText": [
                [
                    "p := new(int) // *int initialized to 0\n*p = 42\nfmt.Println(*p) // prints: 42\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-8063-9c8b-cb7f68ea8ac8",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80e6-9b6d-e1aa6eef9de7",
            "type": "sub_header",
            "richText": [
                [
                    "When to Use ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "new",
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
                    " vs ",
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
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-801b-a6ce-e5d0862450d5",
            "type": "bulleted_list",
            "richText": [
                [
                    "new(T)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " allocates memory for type "
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
                    " and returns "
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
                    " (zero value)."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8050-9bb3-c0ca9b077ca5",
            "type": "bulleted_list",
            "richText": [
                [
                    "&T{}",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " gives a pointer to a composite literal."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8010-869a-ded8c503e651",
            "type": "code",
            "richText": [
                [
                    "x := new(int)   // *int, initialized to 0\ny := &[]int{}   // *[]int, empty slice\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-8062-8938-ed52f797d48e",
            "type": "sub_header",
            "richText": [
                [
                    "Compare "
                ],
                [
                    "new(T)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " vs "
                ],
                [
                    "&T{}",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80f3-920c-cbab916b547e",
            "type": "text",
            "richText": [
                [
                    "Both gives us pointers, but they’re used differently."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8059-b2aa-c9dc91e9b4ce",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8025-978d-f43bc12252a6",
            "type": "sub_sub_header",
            "richText": [
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
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8032-96fa-d0b4fac4f525",
            "type": "bulleted_list",
            "richText": [
                [
                    "Allocates memory for type "
                ],
                [
                    "T",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80d0-9f84-ed50d560e8e2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Initializes it with "
                ],
                [
                    "zero value",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80f3-a7ca-fbb1b8d823dd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Returns a "
                ],
                [
                    "pointer to that zero value",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8098-8319-dcfbf320105a",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8094-9df8-fa1bc78dd9c0",
            "type": "code",
            "richText": [
                [
                    "x := new(int)     // *int, value = 0\nfmt.Println(*x)   // prints: 0\n*x = 42\nfmt.Println(*x)   // prints: 42\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-804d-9334-e4e9aedf6560",
            "type": "text",
            "richText": [
                [
                    "Key Point",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": You don’t initialize anything explicitly. It gives you "
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
                    " with default zero values."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-805b-99d2-c94b8e88ab60",
            "type": "sub_sub_header",
            "richText": [
                [
                    "&T{}",
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
            "id": "24124eb1-ed54-8071-93db-edcbfded63e8",
            "type": "bulleted_list",
            "richText": [
                [
                    "Used with "
                ],
                [
                    "composite types",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " like "
                ],
                [
                    "struct",
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
                    "slice",
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
                    "map",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", etc."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80e6-9d26-f5104dfa6fcf",
            "type": "bulleted_list",
            "richText": [
                [
                    "Initializes the value using a "
                ],
                [
                    "literal",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-803d-bf80-df902b617601",
            "type": "bulleted_list",
            "richText": [
                [
                    "Returns a "
                ],
                [
                    "pointer",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " to the initialized value"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8074-9f43-d6d38971957a",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example with struct:"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8060-b428-d83fbaa66a78",
            "type": "code",
            "richText": [
                [
                    "type Point struct {\n    X int\n    Y int\n}\n\np := &Point{X: 1, Y: 2}  // pointer to Point with values\nfmt.Println(p.X)         // prints: 1\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-8011-aa1b-dfa637df76b0",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example with slice:"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80f4-96bc-f996649c05ac",
            "type": "code",
            "richText": [
                [
                    "s := &[]int{1, 2, 3}     // pointer to a slice\nfmt.Println((*s)[0])     // prints: 1\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-800c-a91e-c61f3d54f579",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8029-8bb5-de2d86dc0091",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Summary Table"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80b5-95d9-df4055bd2d54",
            "type": "table",
            "children": [
                {
                    "id": "24124eb1-ed54-807f-82be-fc7ea4218c19",
                    "type": "table_row",
                    "cells": {
                        "aa:c": [
                            [
                                "Feature"
                            ]
                        ],
                        "dzmw": [
                            [
                                "new(T)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        ";nVF": [
                            [
                                "&T{}",
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
                    "id": "24124eb1-ed54-8025-ac7b-efa90013e85a",
                    "type": "table_row",
                    "cells": {
                        "aa:c": [
                            [
                                "Allocates memory"
                            ]
                        ],
                        "dzmw": [
                            [
                                "✅ Yes"
                            ]
                        ],
                        ";nVF": [
                            [
                                "✅ Yes"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8034-b56e-edb02692e2e9",
                    "type": "table_row",
                    "cells": {
                        "aa:c": [
                            [
                                "Initializes"
                            ]
                        ],
                        "dzmw": [
                            [
                                "❌ No (zero value)"
                            ]
                        ],
                        ";nVF": [
                            [
                                "✅ Yes (your values)"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-80fd-9780-daa88686940c",
                    "type": "table_row",
                    "cells": {
                        "aa:c": [
                            [
                                "Returns"
                            ]
                        ],
                        "dzmw": [
                            [
                                "*T",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        ";nVF": [
                            [
                                "*T",
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
                    "id": "24124eb1-ed54-80fc-bacb-e315bab4b005",
                    "type": "table_row",
                    "cells": {
                        "aa:c": [
                            [
                                "Usable with"
                            ]
                        ],
                        "dzmw": [
                            [
                                "Any type"
                            ]
                        ],
                        ";nVF": [
                            [
                                "Composite types only"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8049-8bb6-fcea37c75490",
                    "type": "table_row",
                    "cells": {
                        "aa:c": [
                            [
                                "Example"
                            ]
                        ],
                        "dzmw": [
                            [
                                "new(int)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        ";nVF": [
                            [
                                "&Point{X: 1}",
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
                "aa:c",
                "dzmw",
                ";nVF"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24124eb1-ed54-8034-9a9c-d1f2e82607d2",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8087-8a50-f9e4bb734706",
            "type": "sub_sub_header",
            "richText": [
                [
                    "When to Use"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8074-a8a6-ccba04793b30",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "new(T)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " when:"
                ]
            ],
            "children": [
                {
                    "id": "24124eb1-ed54-8053-98b5-f1db0afeaf81",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "You just want a zero-initialized value."
                        ]
                    ]
                },
                {
                    "id": "24124eb1-ed54-8095-a0a3-cd840ea6c9c1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "You don’t care about setting fields/specific values now."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24124eb1-ed54-8031-9744-e3af99eb3a18",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "&T{}",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " when:"
                ]
            ],
            "children": [
                {
                    "id": "24124eb1-ed54-807e-ae7b-e9648f1ad4fa",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "You want to "
                        ],
                        [
                            "set initial values",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " during allocation."
                        ]
                    ]
                },
                {
                    "id": "24124eb1-ed54-807c-b373-d74e56c9a4b6",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "You’re dealing with "
                        ],
                        [
                            "composite literals",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " (structs, slices, maps)."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24124eb1-ed54-80a2-8825-f90c83b7527a",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80de-971a-d071fc0f2658",
            "type": "sub_header",
            "richText": [
                [
                    "Arrays/Slices/Maps/Channels and Pointers",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-804b-b0d1-ebf7f42447c6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Slices, maps, and channels are "
                ],
                [
                    "reference types",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " already — passing them around is like passing pointers."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8043-a113-e62e29dc2630",
            "type": "bulleted_list",
            "richText": [
                [
                    "No need to use pointers for modifying these."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-806b-9f1b-f7dcdfae7acc",
            "type": "code",
            "richText": [
                [
                    "func add(s []int) {\n    s[0] = 100\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-80c4-b898-fe5ef531a108",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80fa-919e-ec1567d9fd09",
            "type": "sub_header",
            "richText": [
                [
                    "Go Does Not Support Pointer Arithmetic",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8002-942a-ce8f46f920c7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Unlike C/C++, Go does "
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
                    " allow pointer arithmetic ("
                ],
                [
                    "p++",
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
                    "p+1",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", etc.)."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-806c-a70e-cc3368f2a4df",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80a2-8277-c660d7597883",
            "type": "sub_header",
            "richText": [
                [
                    "Unsafe Pointers",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80d2-aec2-c234c7b5bda7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Using "
                ],
                [
                    "unsafe.Pointer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " allows converting between types at pointer level — "
                ],
                [
                    "use with caution",
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
            "id": "24124eb1-ed54-80e8-b966-c5ff56e56be1",
            "type": "code",
            "richText": [
                [
                    "import \"unsafe\"\nvar f float64 = 3.14\np := (*int)(unsafe.Pointer(&f))  // not recommended for general use\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-803c-bdbd-d63c87987682",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8099-a642-ce311ee5d85c",
            "type": "sub_header",
            "richText": [
                [
                    "Garbage Collection and Pointers",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80ca-b99c-ef220c088c75",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go has garbage collection; no need to manually free memory."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8008-b6ae-c0543070b972",
            "type": "bulleted_list",
            "richText": [
                [
                    "When nothing references a value anymore, Go GC reclaims it."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80f7-bb10-fd5a963a6286",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8021-93fa-e5de746a7d9d",
            "type": "sub_header",
            "richText": [
                [
                    "Common Use-Cases",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8053-bb18-cbb1237e5e6c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Mutating function parameters."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-804e-a03d-e1ac0004e3e3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Efficient passing of large structs."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8015-af3f-ed83dbcdd3d2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Shared state between functions."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-809e-ad9d-fcc21cac20fc",
            "type": "bulleted_list",
            "richText": [
                [
                    "Managing optional values ("
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
                    " as a signal)."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80bd-83b3-d0be68fb9bcf",
            "type": "bulleted_list",
            "richText": [
                [
                    "Dependency injection in applications."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-807d-b05f-db35d408b1be",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8098-bc9e-d0a1d6046cc4",
            "type": "sub_header",
            "richText": [
                [
                    "Best Practices",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80d4-92e1-c62d5cf3b36d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use pointers when you:"
                ]
            ],
            "children": [
                {
                    "id": "24124eb1-ed54-80e3-a27b-c48c4f10ce31",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Need to modify the original value."
                        ]
                    ]
                },
                {
                    "id": "24124eb1-ed54-8012-a0ef-f7d5c9cbe4ce",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Want to avoid copying large structs."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24124eb1-ed54-80e4-8299-feab45b8b74c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Avoid pointers to basic types unless necessary."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80d5-baf3-cab009153a5c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Don't overuse "
                ],
                [
                    "new()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " — "
                ],
                [
                    "&T{}",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is often simpler."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80e5-a9c6-d2d3fc1e6bc8",
            "type": "divider"
        }
    ]
} as const satisfies GoNote;

export default note;
