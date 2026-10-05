import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8009-a953-e20cad7e6a03",
    "slug": "errors",
    "title": "Errors",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "a11cfd1c-e41c-53d7-9085-1d20a6e1c266",
            "type": "bulleted_list",
            "richText": [
                [
                    "An error is a value returned for the caller to handle."
                ]
            ]
        },
        {
            "id": "a39e42ca-ec69-5617-bcac-3b4af1221c6b",
            "type": "bulleted_list",
            "richText": [
                [
                    "The built-in "
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
                    " interface requires one method: "
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
                    "."
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
            "id": "ff928875-1a91-519a-b239-4c551dcd18d4",
            "type": "bulleted_list",
            "richText": [
                [
                    "A type with an "
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
                    " method can be used as an error."
                ]
            ]
        },
        {
            "id": "7d36eef2-4d48-5a7d-bd67-0c08031a49a6",
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
                    " when there is no error."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-802f-9103-d722b2eb696a",
            "type": "text",
            "richText": [
                [
                    "Exceptional control flow: "
                ],
                [
                    "Panic & Recover",
                    [
                        [
                            "a",
                            "#/notes/go/panic-recover"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "edb14c2f-01af-5025-90be-aac021f10059",
            "type": "sub_header",
            "richText": [
                [
                    "Creating errors"
                ]
            ]
        },
        {
            "id": "b35bcbfe-b5fd-5c18-bed7-40977f3071f9",
            "type": "code",
            "richText": [
                [
                    "plain := errors.New(\"something went wrong\")\nformatted := fmt.Errorf(\"error code %d: %s\", 404, \"not found\")\nfmt.Println(plain)     // something went wrong\nfmt.Println(formatted) // error code 404: not found"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "abdfac89-1349-55b6-b0be-a5eebff23aba",
            "type": "sub_header",
            "richText": [
                [
                    "Returning and checking errors"
                ]
            ]
        },
        {
            "id": "69afc17a-da40-51cc-8e38-b4d9ca66e832",
            "type": "code",
            "richText": [
                [
                    "func divide(a, b int) (int, error) {\n    if b == 0 {\n        return 0, errors.New(\"division by zero\")\n    }\n    return a / b, nil\n}\n\nfunc divideExample() {\n    result, err := divide(10, 0)\n    if err != nil {\n        fmt.Println(\"Error:\", err) // Error: division by zero\n        return\n    }\n    fmt.Println(\"Result:\", result)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "98900669-8af6-5fe9-b89c-80b11e7b9986",
            "type": "sub_header",
            "richText": [
                [
                    "Custom error types"
                ]
            ]
        },
        {
            "id": "6763ee68-b124-5d58-bf2f-5762fa54cef5",
            "type": "bulleted_list",
            "richText": [
                [
                    "customFailure",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns a "
                ],
                [
                    "*MyError",
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
            "id": "fae41604-b470-5bea-962e-fdcf71e33ef5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Its "
                ],
                [
                    "Error",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " method uses a pointer receiver."
                ]
            ]
        },
        {
            "id": "5a405ad0-3c89-5a48-8314-bfd8cba6cc81",
            "type": "bulleted_list",
            "richText": [
                [
                    "The "
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
                    " call later searches for that same pointer type."
                ]
            ]
        },
        {
            "id": "ea3e4016-5e3c-5a3e-a3dc-e73e8326c066",
            "type": "code",
            "richText": [
                [
                    "type MyError struct {\n    Code int\n    Msg string\n}\n\nfunc (e *MyError) Error() string {\n    return fmt.Sprintf(\"Code %d: %s\", e.Code, e.Msg)\n}\n\nfunc customFailure() error {\n    return &MyError{Code: 404, Msg: \"not found\"}\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "fc4d21dd-de21-5d16-98d0-6709c74f72d9",
            "type": "sub_header",
            "richText": [
                [
                    "Sentinel errors"
                ]
            ]
        },
        {
            "id": "a0f14f03-9027-5bfa-9a45-cf229d958673",
            "type": "bulleted_list",
            "richText": [
                [
                    "A sentinel error is one predefined error value that callers can check for."
                ]
            ]
        },
        {
            "id": "6979b526-6a40-5a57-9960-f688681ad8fe",
            "type": "bulleted_list",
            "richText": [
                [
                    "ErrNotFound",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a sentinel error below."
                ]
            ]
        },
        {
            "id": "67aa779a-0f67-5143-a546-c0af093746ad",
            "type": "code",
            "richText": [
                [
                    "type Item struct { ID int }\n\nvar ErrNotFound = errors.New(\"item not found\")\n\nfunc getItem(id int) (Item, error) {\n    if id == 0 {\n        return Item{}, ErrNotFound\n    }\n    return Item{ID: id}, nil\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "081e890c-91d5-50e7-b5e7-e202d6dab4da",
            "type": "sub_header",
            "richText": [
                [
                    "Wrapping and matching errors (Go 1.13+)"
                ]
            ]
        },
        {
            "id": "0287041a-b702-5d38-a6d4-f48aa1e55698",
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
                    " adds a message around an error and keeps the original error inside it."
                ]
            ]
        },
        {
            "id": "ac772925-32a0-586a-9bd7-fe427f9c88ce",
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
                    " to find a sentinel even when it is wrapped."
                ]
            ]
        },
        {
            "id": "3d9b13c6-2ae0-5226-8e0e-e61c6fa8dab1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not decide which error occurred by comparing message strings."
                ]
            ]
        },
        {
            "id": "4e72ce85-b900-5e42-aef5-59c7f6b0e331",
            "type": "code",
            "richText": [
                [
                    "func loadItem(id int) (Item, error) {\n    item, err := getItem(id)\n    if err != nil {\n        return Item{}, fmt.Errorf(\"load item %d: %w\", id, err)\n    }\n    return item, nil\n}\n\nfunc matchSentinel() {\n    _, err := loadItem(0)\n    fmt.Println(errors.Is(err, ErrNotFound)) // true\n    fmt.Println(errors.Unwrap(err) == ErrNotFound) // true\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "42501033-5adf-528a-b182-33ed73e9591a",
            "type": "bulleted_list",
            "richText": [
                [
                    "errors.Unwrap",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " removes one wrapping layer by calling "
                ],
                [
                    "Unwrap() error",
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
            "id": "4421f0c8-2644-5260-b59e-a16407f85ea6",
            "type": "bulleted_list",
            "richText": [
                [
                    "It returns "
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
                    " if that method is missing."
                ]
            ]
        },
        {
            "id": "4413a3a7-811c-53ea-8040-4098deb270cd",
            "type": "bulleted_list",
            "richText": [
                [
                    "It does not call "
                ],
                [
                    "Unwrap() []error",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", which returns several wrapped errors."
                ]
            ]
        },
        {
            "id": "b5bececf-e8a7-53fc-b607-3c9295a0ef1c",
            "type": "bulleted_list",
            "richText": [
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
                    " can search through both kinds of wrapping."
                ]
            ]
        },
        {
            "id": "e9edf4a9-566b-5c5b-89db-0ff2ce6f202d",
            "type": "sub_header",
            "richText": [
                [
                    "Finding a custom error with errors.As"
                ]
            ]
        },
        {
            "id": "68ae1ecf-e1d2-5cef-8094-861854e5c4bf",
            "type": "bulleted_list",
            "richText": [
                [
                    "errors.As",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " searches through wrapped errors for a value that can be assigned to the target."
                ]
            ]
        },
        {
            "id": "e11eef01-bcc0-5299-9f55-38cb6b98d2c6",
            "type": "bulleted_list",
            "richText": [
                [
                    "It stores the found value in the target variable."
                ]
            ]
        },
        {
            "id": "bfeb88e6-fca4-52a9-b0e6-bcf8a938fb79",
            "type": "bulleted_list",
            "richText": [
                [
                    "A language type assertion checks only the interface value you apply it to. It does not search through wrappers."
                ]
            ]
        },
        {
            "id": "452c5d9b-7ab3-5b4c-8575-95e896a5061f",
            "type": "code",
            "richText": [
                [
                    "func inspectCustomError() {\n    err := fmt.Errorf(\"operation failed: %w\", customFailure())\n    var myErr *MyError\n    if errors.As(err, &myErr) {\n        fmt.Println(myErr.Code) // 404\n    }\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "f91dbcc6-5c48-5331-8c31-8beed0cfcbcf",
            "type": "bulleted_list",
            "richText": [
                [
                    "myErr",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a "
                ],
                [
                    "*MyError",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ". Passing "
                ],
                [
                    "&myErr",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " lets "
                ],
                [
                    "As",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " fill that variable."
                ]
            ]
        },
        {
            "id": "94398ad1-5ae1-5d8d-8585-c6c26ce5fced",
            "type": "bulleted_list",
            "richText": [
                [
                    "If "
                ],
                [
                    "Error",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " uses a value receiver and the returned error is a "
                ],
                [
                    "MyError",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " value, declare "
                ],
                [
                    "var myErr MyError",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " instead."
                ]
            ]
        },
        {
            "id": "2ada05bd-c60c-52c2-a9b0-623cbccf3d24",
            "type": "bulleted_list",
            "richText": [
                [
                    "Still pass "
                ],
                [
                    "&myErr",
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
                    "As",
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
            "id": "3ac4535a-c74c-5f49-a670-d3963f990d33",
            "type": "bulleted_list",
            "richText": [
                [
                    "MyError",
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
                    "*MyError",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " are different dynamic types. A value receiver does not make them interchangeable in "
                ],
                [
                    "As",
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
            "id": "41556061-9bef-5fd8-a344-53f8c517411b",
            "type": "sub_header",
            "richText": [
                [
                    "Error handling decisions"
                ]
            ]
        },
        {
            "id": "01943766-83e7-5d51-9a1c-8468be586162",
            "type": "bulleted_list",
            "richText": [
                [
                    "Handle an error or return it to the caller."
                ]
            ]
        },
        {
            "id": "02d1074e-82e7-567a-b9e4-80a13d04fe2c",
            "type": "bulleted_list",
            "richText": [
                [
                    "If you choose to ignore it, make that choice clear."
                ]
            ]
        },
        {
            "id": "6fffc7d4-f7d1-5bb9-ab2a-e0d826378adb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not ignore an error just to make the code compile."
                ]
            ]
        },
        {
            "id": "a777dea7-35d6-5158-8b3d-ffc5dd6d0c0f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "Is",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to check an error condition."
                ]
            ]
        },
        {
            "id": "7471f139-1158-58e6-933a-eaa03e66bb5a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "As",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to read fields from a particular error type."
                ]
            ]
        },
        {
            "id": "71e8532a-dfcc-5219-bd47-3ddbc115b699",
            "type": "bulleted_list",
            "richText": [
                [
                    "Wrapping lets callers inspect the original error. They may start depending on it as part of the API."
                ]
            ]
        },
        {
            "id": "ab3f666b-08e3-59ce-b7cc-f4d4381eccc1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go 1.13 added wrapping, "
                ],
                [
                    "Is",
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
                    "As",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to the standard library."
                ]
            ]
        },
        {
            "id": "7ea06e15-b287-58ec-bded-a81da0a85b81",
            "type": "bulleted_list",
            "richText": [
                [
                    "Older projects may use "
                ],
                [
                    "github.com/pkg/errors",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ". These notes use the standard library."
                ]
            ]
        },
        {
            "id": "8f487491-2fe3-5bf2-9a88-e3a3f7396de5",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "errors package: Is, As and Unwrap",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/errors"
                        ]
                    ]
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
