import type { GoNote } from '../types';

const note = {
    "notionId": "24a24eb1-ed54-8030-b2e0-e5685daa55e6",
    "slug": "variadic-functions",
    "title": "Variadic Functions",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "507f2a4c-0d76-5136-97ab-6d729df21546",
            "type": "text",
            "richText": [
                [
                    "A variadic function accepts zero or more arguments for its final parameter. Declare it with ...T; inside the function that parameter has type []T."
                ]
            ]
        },
        {
            "id": "6c467ad7-4654-5037-a37e-7c1c46e117ee",
            "type": "sub_header",
            "richText": [
                [
                    "Declaration and calls"
                ]
            ]
        },
        {
            "id": "21d5a2a2-0ac9-5119-bd88-e0df6ffaac02",
            "type": "text",
            "richText": [
                [
                    "Declarations and call boundary, using fmt:"
                ]
            ]
        },
        {
            "id": "0426c50f-0b95-5f3d-a23d-c7444f31bf09",
            "type": "code",
            "richText": [
                [
                    "func sum(nums ...int) int {\n    total := 0\n    for _, n := range nums {\n        total += n\n    }\n    return total\n}\n\nfunc sumExample() {\n    fmt.Println(sum(1, 2, 3)) // 6\n    fmt.Println(sum())        // 0\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "3b54d64b-c1c6-57a3-b8d3-f9d130634594",
            "type": "bulleted_list",
            "richText": [
                [
                    "Only one parameter can be variadic, and it must be last. With no trailing arguments, the variadic slice is nil."
                ]
            ]
        },
        {
            "id": "f4dc6048-6d62-5ff3-a470-882a1d78d029",
            "type": "sub_header",
            "richText": [
                [
                    "Passing an existing slice"
                ]
            ]
        },
        {
            "id": "53eb9c6f-ebde-5f17-857a-67f1f7bf8f3b",
            "type": "text",
            "richText": [
                [
                    "Function-body excerpt using sum above: append ... to the slice argument."
                ]
            ]
        },
        {
            "id": "a7c6e939-1d8a-5294-a902-f2e12b8781e9",
            "type": "code",
            "richText": [
                [
                    "nums := []int{1, 2, 3}\nfmt.Println(sum(nums...)) // 6"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "bc57401a-252f-5ab7-9527-9de700118f1f",
            "type": "text",
            "richText": [
                [
                    "The slice is passed as the variadic slice value; it is not copied into a new backing array. A function that changes its elements can change the caller’s elements."
                ]
            ]
        },
        {
            "id": "d341bfa7-ee9f-5f18-8c5f-904916d21730",
            "type": "sub_header",
            "richText": [
                [
                    "Fixed and variadic parameters"
                ]
            ]
        },
        {
            "id": "25b305c2-620a-5757-a6d8-31767ace24e8",
            "type": "code",
            "richText": [
                [
                    "func greet(prefix string, names ...string) {\n    for _, n := range names {\n        fmt.Println(prefix, n)\n    }\n}\n\nfunc greetingExample() {\n    greet(\"Hello\", \"Alice\", \"Bob\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "127bca8c-e68b-55a6-99ba-089e1ec7cb89",
            "type": "text",
            "richText": [
                [
                    "Expected output:"
                ]
            ]
        },
        {
            "id": "5fcabe06-ecf3-575a-96f7-2e67adde74b1",
            "type": "code",
            "richText": [
                [
                    "Hello Alice\nHello Bob"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "a1156031-e1c2-538c-ab07-82e28f34fe87",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Passing arguments to variadic parameters",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Passing_arguments_to_..._parameters"
                        ]
                    ]
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
