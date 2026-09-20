/* Copied from the Slices & Arrays page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-806b-a0c9-f216d2b44e7e",
    "slug": "slices-arrays",
    "title": "Slices & Arrays",
    "updatedOn": "2025-08-09",
    "blocks": [
        {
            "id": "24a24eb1-ed54-8041-9ab9-c357ee8a9a3d",
            "type": "callout",
            "children": [
                {
                    "id": "24a24eb1-ed54-8079-9881-f08667074fc9",
                    "type": "text",
                    "richText": [
                        [
                            "https://go.dev/blog/slices-intro",
                            [
                                [
                                    "a",
                                    "https://go.dev/blog/slices-intro"
                                ]
                            ]
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24a24eb1-ed54-80cc-8f3e-fd18a78585f8",
            "type": "divider"
        },
        {
            "id": "24a24eb1-ed54-8086-bd0e-da3f60b1edb1",
            "type": "sub_header",
            "richText": [
                [
                    "Arrays",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80d1-aa28-c7eec9703977",
            "type": "bulleted_list",
            "richText": [
                [
                    "Fixed-length sequence of elements of the "
                ],
                [
                    "same type",
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
            "id": "24124eb1-ed54-803f-a563-e8f089a84970",
            "type": "bulleted_list",
            "richText": [
                [
                    "Stored "
                ],
                [
                    "contiguously",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " in memory."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8010-a5aa-c0601f35a0d7",
            "type": "code",
            "richText": [
                [
                    "var arr [3]int // array of 3 integers"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-806d-994a-e17e32e46fd3",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Key Properties",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8084-8942-f75ae91e45d3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Length is part of the type: "
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
                    " ≠ "
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
                    "."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-801f-8729-e2193eb11fd2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Cannot be resized."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8076-bae0-fcbb9efccfd2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Default zero values assigned on creation."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80a1-8017-cc271c0a7f4f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Index starts at 0."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8028-ab3a-c9f8c420b243",
            "type": "bulleted_list",
            "richText": [
                [
                    "Arrays are "
                ],
                [
                    "value types",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " — copied on assignment, and independent data is created."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80a0-b6fc-ddd42634fbf5",
            "type": "code",
            "richText": [
                [
                    "a := [3]int{1, 2, 3}\nb := a       // creates a copy\nb[0] = 10    // a[0] still 1"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-800c-a9d7-ecbc4256c34d",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Shorthand Declaration",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8063-89da-e5dd14a37946",
            "type": "code",
            "richText": [
                [
                    "arr := [...]int{1, 2, 3} // Compiler infers length"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-800d-996e-d0cee8ac95f9",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8007-a6a2-e8a793336e80",
            "type": "sub_header",
            "richText": [
                [
                    "Slices",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8053-968d-e2a4dde1e2a0",
            "type": "bulleted_list",
            "richText": [
                [
                    "A "
                ],
                [
                    "dynamic, flexible view",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " over an array."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-804e-bc71-e739bf97e762",
            "type": "bulleted_list",
            "richText": [
                [
                    "Internally: a struct with:"
                ]
            ],
            "children": [
                {
                    "id": "24124eb1-ed54-8052-a561-da421bb61740",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Pointer to array"
                        ]
                    ]
                },
                {
                    "id": "24124eb1-ed54-80b1-9a23-caf0892b3837",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Length"
                        ]
                    ]
                },
                {
                    "id": "24124eb1-ed54-80cc-a7c0-d5fbcde1e634",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Capacity"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24124eb1-ed54-80c5-a774-def2b69590cc",
            "type": "code",
            "richText": [
                [
                    "slice := []int{1, 2, 3}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-8078-8877-c5afbad04033",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Key Properties",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80fa-a678-ff55dbaa1481",
            "type": "bulleted_list",
            "richText": [
                [
                    "Variable length",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80ef-a9d8-f0878c8c1576",
            "type": "bulleted_list",
            "richText": [
                [
                    "Backed by an array"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8094-9508-fc82d975f6fa",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass by value (but refers to same underlying array)"
                ]
            ]
        },
        {
            "id": "24924eb1-ed54-803e-b0c0-f299d2ba788a",
            "type": "code",
            "richText": [
                [
                    "func change(s []int) {\n    s[0] = 99 // changes underlying array\n}\n\nfunc main() {\n    a := []int{1, 2, 3}\n    b := a         // copy of slice struct\n    b[1] = 77      // affects 'a' too\n    change(a)      // also affects 'a'\n    fmt.Println(a) // [99 77 3]\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24924eb1-ed54-80b8-9daf-d74c9c8e059f",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Important Note:"
                ]
            ]
        },
        {
            "id": "24924eb1-ed54-80df-a065-f6366494a25c",
            "type": "text",
            "richText": [
                [
                    "in Go, "
                ],
                [
                    "slices are not reference types",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", but they "
                ],
                [
                    "behave like",
                    [
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    " references because:"
                ]
            ]
        },
        {
            "id": "24924eb1-ed54-8007-aa67-ebe8d0207674",
            "type": "bulleted_list",
            "richText": [
                [
                    "A slice itself is a "
                ],
                [
                    "value type",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " (struct with pointer, length, capacity)."
                ]
            ]
        },
        {
            "id": "24924eb1-ed54-806b-a28b-c26e384a17da",
            "type": "bulleted_list",
            "richText": [
                [
                    "Copying a slice copies that struct, not the array."
                ]
            ]
        },
        {
            "id": "24924eb1-ed54-80ab-97c7-e100f48fb4c3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Both copies’ pointers can refer to the "
                ],
                [
                    "same underlying array",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", so changes to elements are visible across copies."
                ]
            ]
        },
        {
            "id": "24924eb1-ed54-806f-9d63-c78d0e688eaf",
            "type": "text",
            "richText": [
                [
                    "So:"
                ]
            ]
        },
        {
            "id": "24924eb1-ed54-8023-88de-fbf524d91498",
            "type": "bulleted_list",
            "richText": [
                [
                    "Technically:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " value type."
                ]
            ]
        },
        {
            "id": "24924eb1-ed54-8054-9480-c5190da6cc5d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Practically:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " acts like a reference to array data."
                ]
            ]
        },
        {
            "id": "24924eb1-ed54-80d7-b6ba-f2a17e591496",
            "type": "code",
            "richText": [
                [
                    "a := []int{1, 2, 3} // slice\nb := a              // copy of slice header\nb[0] = 10           // changes underlying array\n\nfmt.Println(a) // [10 2 3] — affected\nfmt.Println(b) // [10 2 3] — same underlying array\n// Refer to arrays, they have a different behaviour for same scenario."
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-80b5-a730-e1c88ffcc6f8",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8056-ab2f-ed831bcbb392",
            "type": "sub_header",
            "richText": [
                [
                    "Slice Creation",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8075-a05e-f27c9922c166",
            "type": "sub_sub_header",
            "richText": [
                [
                    "From Array",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80bd-8450-e69f938a0392",
            "type": "code",
            "richText": [
                [
                    "arr := [5]int{1, 2, 3, 4, 5}\ns := arr[1:4]  // elements 2, 3, 4"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-80d5-8606-e5bec63775f5",
            "type": "sub_sub_header",
            "richText": [
                [
                    "From Slice",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8051-a443-e1b75d010005",
            "type": "code",
            "richText": [
                [
                    "s2 := s[1:2] // further slicing allowed"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-80c7-a005-e8812b642459",
            "type": "sub_sub_header",
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
                    "make()",
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
                    ":"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-804b-9233-f00806a569ce",
            "type": "code",
            "richText": [
                [
                    "s := make([]int, 3) // length = 3, capacity = 3\ns := make([]int, 2, 5) // length = 2, capacity = 5"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-802d-8701-ca34c8218ab1",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80b3-ae5b-ff952924462b",
            "type": "sub_header",
            "richText": [
                [
                    "Slice Properties",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80f3-80c0-c096043d3819",
            "type": "bulleted_list",
            "richText": [
                [
                    "len(slice)",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " → number of accessible elements"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-808b-9678-c5431e390dd3",
            "type": "bulleted_list",
            "richText": [
                [
                    "cap(slice)",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " → max elements before reallocation"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8021-bcfb-c5c203cdae84",
            "type": "code",
            "richText": [
                [
                    "s := []int{1, 2, 3}\nlen(s) // 3\ncap(s) // 3"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-805f-b9ee-d2ab4bc11425",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80fc-9e17-e379ea016a4e",
            "type": "sub_header",
            "richText": [
                [
                    "Slice Append",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8041-b01d-d90f47fe45ff",
            "type": "code",
            "richText": [
                [
                    "s := []int{1, 2}\ns = append(s, 3, 4)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-808e-833c-d357dd512e98",
            "type": "bulleted_list",
            "richText": [
                [
                    "If capacity exceeded, new array is allocated."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8014-bcc6-e0be782e40a5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Old slice still points to old array, so do not forget to receive the updated slice."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80f7-8c25-c2348a559b6b",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80c5-b327-df0cd1b89d8a",
            "type": "sub_header",
            "richText": [
                [
                    "Copying Slices",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-804d-b3cd-f2200e411577",
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
                    " creates an independent copy."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80f5-bdb2-d8528010fb16",
            "type": "code",
            "richText": [
                [
                    "a := []int{1, 2, 3}\nb := make([]int, len(a))\ncopy(b, a) // b and a do not point to same array"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-80f6-8da9-c81806ae5e52",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8039-8fec-e8adcfd2af47",
            "type": "sub_header",
            "richText": [
                [
                    "Nil and Empty Slices",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80b3-b0d7-cee241d6ce2e",
            "type": "code",
            "richText": [
                [
                    "var a []int       // nil slice\nb := []int{}      // empty but non-nil"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-801b-9cb0-cabdd3eb0833",
            "type": "bulleted_list",
            "richText": [
                [
                    "nil",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " slice: "
                ],
                [
                    "len=0",
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
                    "cap=0",
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
                    "pointer=nil",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80dc-9eab-f4a5ca554dfd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Empty slice: "
                ],
                [
                    "len=0",
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
                    "cap=0",
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
                    "pointer≠nil",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-805d-827f-ca128f8a6129",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8087-94f0-eab216fc592f",
            "type": "sub_header",
            "richText": [
                [
                    "Comparison",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8014-8401-f0ff9696ae97",
            "type": "bulleted_list",
            "richText": [
                [
                    "Arrays: can compare with "
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
                    " if same length and type."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80c4-b121-cfa8dd241a11",
            "type": "bulleted_list",
            "richText": [
                [
                    "Slices: "
                ],
                [
                    "cannot",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " compare directly (except to "
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
                    ")."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8040-b559-d77c7328212f",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80c0-903d-fd94a3ecd03f",
            "type": "sub_header",
            "richText": [
                [
                    "For Loops",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80ae-b20e-e8c72e172e20",
            "type": "code",
            "richText": [
                [
                    "for i, v := range slice {\n    // use i and v\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-8075-a268-e074bb97aa79",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-802a-8541-d005a86d174c",
            "type": "sub_header",
            "richText": [
                [
                    "Multi-dimensional Arrays/Slices",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8038-bddc-f149208bbc4d",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Arrays",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8079-afba-eacebf236cc5",
            "type": "code",
            "richText": [
                [
                    "var matrix [2][3]int"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-8074-9dd6-cbfbc69e3237",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Slices",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8082-b427-e2660db7736d",
            "type": "code",
            "richText": [
                [
                    "matrix := [][]int{\n    {1, 2},\n    {3, 4},\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-8085-9ba0-d17eed4ddf01",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80fd-8237-f74a8b5d76c9",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
