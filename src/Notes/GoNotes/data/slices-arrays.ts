/* Focused Go study notes, refined from the imported source. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-806b-a0c9-f216d2b44e7e",
    "slug": "slices-arrays",
    "title": "Slices & Arrays",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "990ab772-5824-5cb6-b8c0-83515954a3bd",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Go Slices: usage and internals",
                    [
                        [
                            "a",
                            "https://go.dev/blog/slices-intro"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "b9671871-f3c1-59f5-8763-e578bccad3f1",
            "type": "bulleted_list",
            "richText": [
                [
                    "An array holds a fixed number of elements."
                ]
            ]
        },
        {
            "id": "e6b0c67f-797e-583b-af46-61bcb8ae75ea",
            "type": "bulleted_list",
            "richText": [
                [
                    "A slice refers to part of an underlying array (its backing array). Its length can change while the program runs."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-8086-bd0e-da3f60b1edb1",
            "type": "sub_header",
            "richText": [
                [
                    "Arrays"
                ]
            ]
        },
        {
            "id": "c818d51f-10eb-5914-8e28-294d976083f6",
            "type": "bulleted_list",
            "richText": [
                [
                    "The length is part of the array type. "
                ],
                [
                    "[3]int",
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
                    "[4]int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " are different types."
                ]
            ]
        },
        {
            "id": "2d1a6fa7-210b-5950-b624-64d94559eeb8",
            "type": "bulleted_list",
            "richText": [
                [
                    "You cannot resize an array."
                ]
            ]
        },
        {
            "id": "edae60a7-6408-567b-9d31-3ad328d0f5d0",
            "type": "bulleted_list",
            "richText": [
                [
                    "The first element has index 0."
                ]
            ]
        },
        {
            "id": "9ac0de66-9993-5361-8dff-f617a707d34f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Assigning an array copies its elements into a separate array."
                ]
            ]
        },
        {
            "id": "d0eb40fd-b3ad-54c3-8ed7-039aecc1ebf8",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "var zeros [3]int\na := [...]int{1, 2, 3} // inferred type: [3]int\nb := a\nb[0] = 10\nfmt.Println(zeros) // [0 0 0]\nfmt.Println(a)     // [1 2 3]\nfmt.Println(b)     // [10 2 3]"
                ]
            ]
        },
        {
            "id": "2f257249-abbe-5193-a02c-1ccf9c87ad16",
            "type": "bulleted_list",
            "richText": [
                [
                    "Copying an array of pointers copies the pointers. It does not copy the objects they point to."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8007-a6a2-e8a793336e80",
            "type": "sub_header",
            "richText": [
                [
                    "Slices"
                ]
            ]
        },
        {
            "id": "382721db-ce92-57ac-869f-c68d8a9c988d",
            "type": "bulleted_list",
            "richText": [
                [
                    "A slice value has three parts: a reference to an array, a length, and a capacity."
                ]
            ]
        },
        {
            "id": "85dc6f0b-57a4-540b-8d6c-dcbbbc8d0106",
            "type": "bulleted_list",
            "richText": [
                [
                    "Assignment copies the slice value. Passing it to a function also copies the slice value."
                ]
            ]
        },
        {
            "id": "98306799-56af-52a7-a140-1cdbf68508f6",
            "type": "bulleted_list",
            "richText": [
                [
                    "These copies can still refer to the same array. Changing an element can affect both slices."
                ]
            ]
        },
        {
            "id": "b42b90c4-eb85-5c45-ad46-b351e6ba6ffa",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\nfunc change(s []int) {\n    s[0] = 99\n    s = s[:1] // changes only this function’s slice length\n}\n\nfunc main() {\n    a := []int{1, 2, 3}\n    b := a\n    b[1] = 77\n    change(a)\n    fmt.Println(a)      // [99 77 3]\n    fmt.Println(len(a)) // 3\n}"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8056-ab2f-ed831bcbb392",
            "type": "sub_header",
            "richText": [
                [
                    "Slice Creation"
                ]
            ]
        },
        {
            "id": "966c6c88-c401-563a-9a73-b0ae55feba4a",
            "type": "sub_sub_header",
            "richText": [
                [
                    "From an array or another slice"
                ]
            ]
        },
        {
            "id": "ce91370f-217d-5e90-b5a6-11a6e08f57b7",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "arr := [5]int{1, 2, 3, 4, 5}\ns := arr[1:4]\ns2 := s[1:2]\nfmt.Println(s)  // [2 3 4]\nfmt.Println(s2) // [3]"
                ]
            ]
        },
        {
            "id": "6fa50e27-7b29-5a36-ba3b-8ee92196d099",
            "type": "bulleted_list",
            "richText": [
                [
                    "arr[1:4]",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " includes index 1 and stops before index 4."
                ]
            ]
        },
        {
            "id": "8eea0b26-8e32-5d9f-8fa4-ec9c91f6e627",
            "type": "bulleted_list",
            "richText": [
                [
                    "The slices in this example refer to the same array. Changing an element can affect the other slices."
                ]
            ]
        },
        {
            "id": "e4411120-df52-5e43-a9f7-68eb92a354f6",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Using make"
                ]
            ]
        },
        {
            "id": "cac73ea7-1626-5fc9-87f5-a78b61db3c21",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "short := make([]int, 3)\nspare := make([]int, 2, 5)\nfmt.Println(short, len(short), cap(short)) // [0 0 0] 3 3\nfmt.Println(spare, len(spare), cap(spare)) // [0 0] 2 5"
                ]
            ]
        },
        {
            "id": "11cd24db-f8ec-5720-b699-c1c9823d4b18",
            "type": "sub_header",
            "richText": [
                [
                    "Length and capacity"
                ]
            ]
        },
        {
            "id": "1ea19a65-d888-54bd-bf03-eec0e52f385a",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "e6619ec5-3503-5357-ac58-81f4aad12728",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Expression"
                            ]
                        ],
                        "col-1": [
                            [
                                "Meaning"
                            ]
                        ]
                    }
                },
                {
                    "id": "ad1bb287-25da-5e51-98ba-42bdc5dedd53",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "len(s)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Number of elements that can currently be indexed."
                            ]
                        ]
                    }
                },
                {
                    "id": "4193c0c3-32ed-50f5-a4b6-6d1c73e9fc05",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "cap(s)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "How far the slice can grow within its current array."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "91b165c8-0949-5f40-a441-41c44db3902f",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can extend a slice up to its capacity by slicing it again."
                ]
            ]
        },
        {
            "id": "454d782d-8987-579d-8e37-8b27d04e437a",
            "type": "bulleted_list",
            "richText": [
                [
                    "To access an element, its index must be less than the slice’s current length."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80fc-9e17-e379ea016a4e",
            "type": "sub_header",
            "richText": [
                [
                    "Slice Append"
                ]
            ]
        },
        {
            "id": "681f173b-2476-5bb3-964a-4467dd486c1b",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "s := make([]int, 2, 4)\ns[0], s[1] = 1, 2\ns = append(s, 3, 4)\nfmt.Println(s) // [1 2 3 4]\ns = append(s, 5) // length 5 exceeds capacity 4\nfmt.Println(s) // [1 2 3 4 5]"
                ]
            ]
        },
        {
            "id": "cb2f7271-bf1c-5529-8770-d438c0f9637b",
            "type": "bulleted_list",
            "richText": [
                [
                    "append",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns the updated slice. Store the result, as in "
                ],
                [
                    "s = append(s, value)",
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
            "id": "b49f691f-acbb-567d-a084-ca75f00e0501",
            "type": "bulleted_list",
            "richText": [
                [
                    "If the slice has enough capacity, "
                ],
                [
                    "append",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " uses the same array."
                ]
            ]
        },
        {
            "id": "fdc643a5-c6d0-58d8-8664-bdb0591090e0",
            "type": "bulleted_list",
            "richText": [
                [
                    "If it needs more capacity, "
                ],
                [
                    "append",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " creates a larger array and copies the elements into it."
                ]
            ]
        },
        {
            "id": "dca050f3-2183-57aa-8928-ffa9c5c79eac",
            "type": "bulleted_list",
            "richText": [
                [
                    "Other slices keep their own lengths and still refer to their previous arrays."
                ]
            ]
        },
        {
            "id": "7043a8d6-566c-563b-a12d-b139b3b44417",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Append can affect another slice"
                ]
            ]
        },
        {
            "id": "94034cb6-a27a-5dec-a156-dbddb4507c6e",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "a := []int{1, 2, 3}\nb := a[:2]\nb = append(b, 9) // reuses a’s underlying array\nfmt.Println(a) // [1 2 9]\nfmt.Println(b) // [1 2 9]"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80c5-b327-df0cd1b89d8a",
            "type": "sub_header",
            "richText": [
                [
                    "Copying Slices"
                ]
            ]
        },
        {
            "id": "7f60b00a-5358-5fe1-a5aa-f79e34506d77",
            "type": "bulleted_list",
            "richText": [
                [
                    "copy",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " copies elements into a destination slice that already exists."
                ]
            ]
        },
        {
            "id": "4f691d56-c0fc-5479-9e30-6dd675286e9e",
            "type": "bulleted_list",
            "richText": [
                [
                    "It returns the number of elements copied: the smaller of the two slice lengths."
                ]
            ]
        },
        {
            "id": "4999ce25-65ba-5fcf-9608-b9ebd99dee41",
            "type": "bulleted_list",
            "richText": [
                [
                    "copy",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " does not create a new array."
                ]
            ]
        },
        {
            "id": "b0019c6f-a4b9-55c7-ac59-fdff5d37f96c",
            "type": "bulleted_list",
            "richText": [
                [
                    "If the slices share an array, "
                ],
                [
                    "copy",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " does not separate them."
                ]
            ]
        },
        {
            "id": "91de879d-fb0c-5a05-8870-6d8098352393",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "a := []int{1, 2, 3}\nb := make([]int, len(a)) // separate backing array\nn := copy(b, a)\nb[0] = 99\nfmt.Println(n) // 3\nfmt.Println(a) // [1 2 3]\nfmt.Println(b) // [99 2 3]"
                ]
            ]
        },
        {
            "id": "68fd8bc9-561c-55bf-a6c5-2df54372053c",
            "type": "bulleted_list",
            "richText": [
                [
                    "The source and destination can overlap in the same array."
                ]
            ]
        },
        {
            "id": "0568b63a-4044-5422-a0e6-d22d3a339acf",
            "type": "bulleted_list",
            "richText": [
                [
                    "If an element contains a reference, "
                ],
                [
                    "copy",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " copies that reference. It does not copy the object it refers to."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8039-8fec-e8adcfd2af47",
            "type": "sub_header",
            "richText": [
                [
                    "Nil and Empty Slices"
                ]
            ]
        },
        {
            "id": "55c59225-f243-53e7-a47e-70b7c6281791",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "var nilSlice []int\nempty := []int{}\nreserved := make([]int, 0, 5)\nfmt.Println(nilSlice == nil, len(nilSlice), cap(nilSlice)) // true 0 0\nfmt.Println(empty == nil, len(empty), cap(empty))          // false 0 0\nfmt.Println(reserved == nil, len(reserved), cap(reserved)) // false 0 5\nnilSlice = append(nilSlice, 1)\nfmt.Println(nilSlice) // [1]"
                ]
            ]
        },
        {
            "id": "08bf9fc9-3d11-5aa4-9821-67e667492486",
            "type": "bulleted_list",
            "richText": [
                [
                    "An empty slice has length 0. It can still have capacity greater than 0."
                ]
            ]
        },
        {
            "id": "8ac2d4c2-c95d-5f84-bb36-e96f8d0e9ebd",
            "type": "bulleted_list",
            "richText": [
                [
                    "An empty slice can be nil or non-nil."
                ]
            ]
        },
        {
            "id": "906ca3d6-af53-5595-a6d9-b559cd401a17",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can use "
                ],
                [
                    "len",
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
                    "cap",
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
                    "range",
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
                    "copy",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", and "
                ],
                [
                    "append",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " with a nil slice."
                ]
            ]
        },
        {
            "id": "de621ecb-c5e2-5583-a6a9-8fe99899bcbe",
            "type": "bulleted_list",
            "richText": [
                [
                    "You need an existing element before you can access it by index."
                ]
            ]
        },
        {
            "id": "f86dc108-921e-5419-af15-6df9350beb67",
            "type": "text",
            "richText": [
                [
                    "See "
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
                    " for defaults of other types."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8087-94f0-eab216fc592f",
            "type": "sub_header",
            "richText": [
                [
                    "Comparison"
                ]
            ]
        },
        {
            "id": "07cb6c88-acd2-50fd-89c6-27184c7a7811",
            "type": "bulleted_list",
            "richText": [
                [
                    "Two arrays of the same type can use "
                ],
                [
                    "==",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " if their elements can use "
                ],
                [
                    "==",
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
            "id": "3a85b721-6a6d-565f-a597-b5790a2aa5e7",
            "type": "bulleted_list",
            "richText": [
                [
                    "An array of slices cannot use "
                ],
                [
                    "==",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", because slices cannot be compared with each other that way."
                ]
            ]
        },
        {
            "id": "8bb3cea3-a526-5074-8c88-5518d83578be",
            "type": "bulleted_list",
            "richText": [
                [
                    "You cannot compare two slices with "
                ],
                [
                    "==",
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
            "id": "95daa5d6-a5c6-558c-9f75-3080abfd1ce2",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can compare a slice with "
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
            "id": "85aaa13d-bf04-531e-83d3-264a84a62c49",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "a := [2]int{1, 2}\nb := [2]int{1, 2}\nfmt.Println(a == b) // true\n\n// [1][]int{{1}} == [1][]int{{1}} // invalid: slice elements are not comparable"
                ]
            ]
        },
        {
            "id": "2340639a-d9b3-529b-ba8d-4bf5dd9bee04",
            "type": "bulleted_list",
            "richText": [
                [
                    "See "
                ],
                [
                    "Range & For Loops",
                    [
                        [
                            "a",
                            "#/notes/go/range-for-loops"
                        ]
                    ]
                ],
                [
                    " for iteration rules and index/value examples."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-802a-8541-d005a86d174c",
            "type": "sub_header",
            "richText": [
                [
                    "Multi-dimensional Arrays/Slices"
                ]
            ]
        },
        {
            "id": "e8bcd4f6-973b-5261-8bb6-c8b5ece35441",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "var fixed [2][3]int\nrows := [][]int{\n    {1, 2},\n    {3, 4, 5},\n}\nfmt.Println(fixed) // [[0 0 0] [0 0 0]]\nfmt.Println(rows)  // [[1 2] [3 4 5]]"
                ]
            ]
        },
        {
            "id": "10657370-5e6e-57bf-be24-29be5d36e878",
            "type": "bulleted_list",
            "richText": [
                [
                    "A multi-dimensional array has a fixed number of rows and columns."
                ]
            ]
        },
        {
            "id": "a323bd2f-97ce-5587-a584-55151b250608",
            "type": "bulleted_list",
            "richText": [
                [
                    "In a slice of slices, each row is a slice. The rows can have different lengths."
                ]
            ]
        },
        {
            "id": "86717fd7-8e9f-50fe-8145-a25f7e055d32",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Go specification: append and copy",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Appending_and_copying_slices"
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
