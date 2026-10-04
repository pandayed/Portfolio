import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8009-a953-e20cad7e6a03",
    "slug": "errors",
    "title": "Errors",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "a11cfd1c-e41c-53d7-9085-1d20a6e1c266",
            "type": "text",
            "richText": [
                [
                    "Errors are values returned to callers for handling. The built-in error interface requires one method:"
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
            "type": "text",
            "richText": [
                [
                    "A value whose type implements Error() string can be used as an error. Return nil to indicate success."
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
            "id": "6f1588a0-de4e-5efe-8e71-09d43f4618bd",
            "type": "text",
            "richText": [
                [
                    "Function-body excerpt using errors and fmt:"
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
            "type": "text",
            "richText": [
                [
                    "This example constructs a *MyError value and uses a pointer receiver consistently. The As example below searches for that same type."
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
            "type": "text",
            "richText": [
                [
                    "A sentinel is a predefined error value callers may match. This example declares the Item type rather than relying on an omitted application type."
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
            "type": "text",
            "richText": [
                [
                    "The %w verb adds context while retaining the error for inspection. Use errors.Is to match a sentinel through wrapping, rather than comparing message strings."
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
            "type": "text",
            "richText": [
                [
                    "errors.Unwrap removes one Unwrap() error layer. It returns nil if that method is absent and does not unwrap Unwrap() []error. Is and As search wrapped error trees, including multi-error wrappers."
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
            "type": "text",
            "richText": [
                [
                    "As searches wrapped errors for an assignable type and fills a target variable. It is not a language type assertion, which checks only the interface value being asserted."
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
            "type": "text",
            "richText": [
                [
                    "Here myErr has type *MyError, and &myErr is the pointer As fills. If Error used a value receiver and the function returned MyError instead, use "
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
                    " and pass "
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
                    ". Value and pointer dynamic types are distinct; a value receiver does not make them interchangeable for As."
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
                    "Handle, return or deliberately document an ignored error. Do not ignore errors just to make a call compile."
                ]
            ]
        },
        {
            "id": "a777dea7-35d6-5158-8b3d-ffc5dd6d0c0f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use Is for an error condition and As for type-specific fields. Wrapping can expose an underlying error as part of the API, so wrap deliberately."
                ]
            ]
        },
        {
            "id": "ab3f666b-08e3-59ce-b7cc-f4d4381eccc1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go 1.13 added standard-library wrapping, Is and As. Older projects may use github.com/pkg/errors; current notes use the standard library."
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
