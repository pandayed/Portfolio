/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-805e-955e-f3e6320ff4ab",
    "slug": "init-function",
    "title": "init() Function",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "init-function-01",
            "type": "text",
            "richText": [
                [
                    "An init function performs package setup after package-level variables are initialized and before main starts. It has no parameters or results."
                ]
            ]
        },
        {
            "id": "init-function-02",
            "type": "sub_header",
            "richText": [
                [
                    "Initialization order"
                ]
            ]
        },
        {
            "id": "init-function-03",
            "type": "bulleted_list",
            "richText": [
                [
                    "Imported packages initialize before the importing package. A package initializes once per program, even when several packages import it."
                ]
            ]
        },
        {
            "id": "init-function-04",
            "type": "bulleted_list",
            "richText": [
                [
                    "Within a package, variable initialization follows declaration order subject to dependencies on other package variables."
                ]
            ]
        },
        {
            "id": "init-function-05",
            "type": "bulleted_list",
            "richText": [
                [
                    "After all package variables initialize, each init function runs in source order. A file or package can declare several init functions."
                ]
            ]
        },
        {
            "id": "init-function-06",
            "type": "bulleted_list",
            "richText": [
                [
                    "Across files, declaration order follows the order files are presented to the compiler. Build systems are encouraged to use lexical file-name order. Avoid using file names as an application dependency mechanism."
                ]
            ]
        },
        {
            "id": "init-function-07",
            "type": "bulleted_list",
            "richText": [
                [
                    "After program initialization completes, execution calls func main() in package main."
                ]
            ]
        },
        {
            "id": "init-function-08",
            "type": "sub_header",
            "richText": [
                [
                    "Rules and use cases"
                ]
            ]
        },
        {
            "id": "init-function-09",
            "type": "bulleted_list",
            "richText": [
                [
                    "You cannot call init directly or refer to it as an ordinary function value."
                ]
            ]
        },
        {
            "id": "init-function-10",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use small, predictable setup operations, such as registering an implementation with another package."
                ]
            ]
        },
        {
            "id": "init-function-11",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use variable initializers for simple package values. Prefer explicit setup functions for configuration, logging, database connections, or work that can fail, so callers can handle errors and control lifetime."
                ]
            ]
        },
        {
            "id": "init-function-12",
            "type": "bulleted_list",
            "richText": [
                [
                    "Initialization runs sequentially in one goroutine. An init function can start other goroutines, but returning from init does not wait for those goroutines to finish."
                ]
            ]
        },
        {
            "id": "init-function-13",
            "type": "sub_header",
            "richText": [
                [
                    "Variables, multiple init functions, and main"
                ]
            ]
        },
        {
            "id": "init-function-14",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\nvar ready = prepare()\n\nfunc prepare() bool {\n    fmt.Println(\"variables\")\n    return true\n}\n\nfunc init() {\n    fmt.Println(\"first init\", ready)\n}\n\nfunc init() {\n    fmt.Println(\"second init\")\n}\n\nfunc main() {\n    fmt.Println(\"main\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "init-function-15",
            "type": "text",
            "richText": [
                [
                    "Expected output:"
                ]
            ]
        },
        {
            "id": "init-function-16",
            "type": "code",
            "richText": [
                [
                    "variables\nfirst init true\nsecond init\nmain"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "init-function-17",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Package initialization",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Package_initialization"
                        ]
                    ]
                ],
                [
                    ""
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
