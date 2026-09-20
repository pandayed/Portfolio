/* Copied from the Errors page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8009-a953-e20cad7e6a03",
    "slug": "errors",
    "title": "Errors",
    "updatedOn": "2025-08-09",
    "blocks": [
        {
            "id": "24024eb1-ed54-8024-95d9-f8e95dbf09da",
            "type": "bulleted_list",
            "richText": [
                [
                    "In Go, errors are "
                ],
                [
                    "values",
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
            "id": "24024eb1-ed54-8014-a9ee-e36b076bc254",
            "type": "bulleted_list",
            "richText": [
                [
                    "Represented using the built-in "
                ],
                [
                    "error",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " "
                ],
                [
                    "interface",
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
            "id": "24a24eb1-ed54-8006-972c-f25075814c96",
            "type": "code",
            "richText": [
                [
                    "type error interface {\n    Error() string\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8076-93e1-ca3ec256eb51",
            "type": "bulleted_list",
            "richText": [
                [
                    "Any type implementing the "
                ],
                [
                    "Error() string",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " method becomes an "
                ],
                [
                    "error",
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
            "id": "24024eb1-ed54-80ce-af88-d55bd06df73f",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-804e-b1f6-ecc072ebc410",
            "type": "sub_header",
            "richText": [
                [
                    "Creating an Error",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-801c-980d-d46371b76673",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Using "
                ],
                [
                    "errors.New",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8056-86f1-c093ee27d7af",
            "type": "code",
            "richText": [
                [
                    "import \"errors\"\n\nerr := errors.New(\"something went wrong\")\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80f9-8bbe-fea21b908f78",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Using "
                ],
                [
                    "fmt.Errorf",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " (for formatted errors)"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-802b-842e-c60a0073ff7d",
            "type": "code",
            "richText": [
                [
                    "import \"fmt\"\n\nerr := fmt.Errorf(\"error code %d: %s\", 404, \"not found\")\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8008-8b5a-f02367db75c5",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80b4-977b-e726a3acc2ff",
            "type": "sub_header",
            "richText": [
                [
                    "Returning Errors From Functions",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80be-b4be-e6d698683752",
            "type": "code",
            "richText": [
                [
                    "func divide(a, b int) (int, error) {\n    if b == 0 {\n        return 0, errors.New(\"division by zero\")\n    }\n    return a / b, nil\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80fd-b9f1-e84a71bf972d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Caller must check:"
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-80a0-b27f-dad7c9bf3b2b",
            "type": "code",
            "richText": [
                [
                    "result, err := divide(10, 0)\nif err != nil {\n    fmt.Println(\"Error:\", err)\n} else {\n    fmt.Println(\"Result:\", result)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8078-bfa6-ec1900e501e7",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80d8-9ac1-d42cab8eb166",
            "type": "sub_header",
            "richText": [
                [
                    "Custom Error Types",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80a6-bc32-ff88cf59fd4a",
            "type": "code",
            "richText": [
                [
                    "type MyError struct {\n    Code int\n    Msg  string\n}\n\nfunc (e MyError) Error() string {\n    return fmt.Sprintf(\"Code %d: %s\", e.Code, e.Msg)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8033-bca4-dbb737cb4e45",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80c9-b280-ff24fb3d1162",
            "type": "sub_header",
            "richText": [
                [
                    "Sentinel Errors (Predefined Errors)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8047-a237-d23cf19511fe",
            "type": "text",
            "richText": [
                [
                    "Predefine common errors as package-level variables:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80d6-836e-e14de80650ed",
            "type": "code",
            "richText": [
                [
                    "var ErrNotFound = errors.New(\"item not found\")\n\nfunc getItem(id int) (Item, error) {\n    if id == 0 {\n        return Item{}, ErrNotFound\n    }\n    return Item{}, nil\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80c7-82d7-ca24a0e86ff9",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-804c-8a39-dc12f2b7267a",
            "type": "sub_header",
            "richText": [
                [
                    "Error Wrapping (Go 1.13+)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-803f-9e53-ec138128bc97",
            "type": "text",
            "richText": [
                [
                    "Add context to errors:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80a4-b10b-d5093c0b14a4",
            "type": "code",
            "richText": [
                [
                    "import \"fmt\"\n\nerr := someFunc()\nif err != nil {\n    return fmt.Errorf(\"operation failed: %w\", err)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-800e-944d-f26280c5131d",
            "type": "bulleted_list",
            "richText": [
                [
                    "%w",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " wraps the original error for later unwrapping."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-809c-9e83-c15841b78c53",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80ef-8502-c97aa8064f81",
            "type": "sub_header",
            "richText": [
                [
                    "Unwrapping Errors",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-802a-a712-ce48a1e8adea",
            "type": "code",
            "richText": [
                [
                    "import \"errors\"\n\nif errors.Is(err, ErrNotFound) {\n    // check if err is or wraps ErrNotFound\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80b3-baf0-dd05ae50a204",
            "type": "bulleted_list",
            "richText": [
                [
                    "Or extract inner error:"
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-80d7-8508-ebaf0d43ce30",
            "type": "code",
            "richText": [
                [
                    "unwrapped := errors.Unwrap(err)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80ba-9e0b-e37b7fef93af",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8019-bb7d-fb86d47c2dd3",
            "type": "sub_header",
            "richText": [
                [
                    "Type Assertion on Errors",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-805c-8391-e6a00f2c7b23",
            "type": "text",
            "richText": [
                [
                    "Use this to get custom fields:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80a4-be7c-c1dd26838ffb",
            "type": "code",
            "richText": [
                [
                    "var myErr *MyError\nif errors.As(err, &myErr) {\n    fmt.Println(myErr.Code)\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80d2-83a4-c7cc916d0b33",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-802e-8e38-d68296059765",
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
            "id": "24024eb1-ed54-80cf-bdd2-c2490b9ed68f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Return "
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
                    " when no error."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8068-b5c1-c259bd71739d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Don’t ignore errors ("
                ],
                [
                    "_ = f()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is bad)."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-802c-b253-e15bebaf9530",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "errors.Is",
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
                    "errors.As",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " for checks, not string comparisons."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8081-8a41-dedd076608ed",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "fmt.Errorf",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " with "
                ],
                [
                    "%w",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " for wrapping errors with context."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8054-9acd-d00b16f6ec0e",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8038-85f4-ff9d765eb43b",
            "type": "sub_header",
            "richText": [
                [
                    "Third-Party Packages",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80e1-b6bd-fc66444ece32",
            "type": "bulleted_list",
            "richText": [
                [
                    "github.com/pkg/errors",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/github.com/pkg/errors"
                        ],
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ": earlier Go versions used this for wrapping."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80d6-a941-fa18a2c0c223",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go 1.13+ features made it mostly obsolete."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8085-8d60-f6f910bb85a3",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-802f-9103-d722b2eb696a",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
