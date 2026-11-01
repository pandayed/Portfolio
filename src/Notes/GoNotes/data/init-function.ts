/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-805e-955e-f3e6320ff4ab",
    "slug": "init-function",
    "title": "init() Function",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "init-function-01",
            "type": "bulleted_list",
            "richText": [
                [
                    "init",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " runs package setup before "
                ],
                [
                    "main",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " starts."
                ]
            ]
        },
        {
            "id": "init-function-01-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "It has no parameters or return values."
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
                    "Imported packages initialize before the package that imports them."
                ]
            ]
        },
        {
            "id": "init-function-03-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each package initializes once per program, even if several packages import it."
                ]
            ]
        },
        {
            "id": "init-function-04",
            "type": "bulleted_list",
            "richText": [
                [
                    "Package variables initialize in declaration order when their dependencies are ready."
                ]
            ]
        },
        {
            "id": "init-function-04-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "If one variable needs another variable, that other variable initializes first."
                ]
            ]
        },
        {
            "id": "init-function-05",
            "type": "bulleted_list",
            "richText": [
                [
                    "All package variables initialize before "
                ],
                [
                    "init",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " functions run."
                ]
            ]
        },
        {
            "id": "init-function-05-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "init",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " functions run in the order they appear in the source."
                ]
            ]
        },
        {
            "id": "init-function-05-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A file or package can have several "
                ],
                [
                    "init",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " functions."
                ]
            ]
        },
        {
            "id": "init-function-06",
            "type": "bulleted_list",
            "richText": [
                [
                    "Across files, order depends on which file the compiler receives first."
                ]
            ]
        },
        {
            "id": "init-function-06-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Build tools are encouraged to send files in alphabetical file-name order."
                ]
            ]
        },
        {
            "id": "init-function-06-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Avoid making application behavior depend on file-name order."
                ]
            ]
        },
        {
            "id": "init-function-07",
            "type": "bulleted_list",
            "richText": [
                [
                    "After all packages initialize, Go calls "
                ],
                [
                    "func",
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
                    "main()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " in package "
                ],
                [
                    "main",
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
                    "You cannot call "
                ],
                [
                    "init",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " yourself or use it as a function value."
                ]
            ]
        },
        {
            "id": "init-function-10",
            "type": "bulleted_list",
            "richText": [
                [
                    "Keep "
                ],
                [
                    "init",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " small. Registering a package implementation is one use."
                ]
            ]
        },
        {
            "id": "init-function-11",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use variable initializers for simple package values."
                ]
            ]
        },
        {
            "id": "init-function-11-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use explicit setup functions for configuration, logging, or database connections."
                ]
            ]
        },
        {
            "id": "init-function-11-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Setup functions let the caller handle errors and decide when to start and stop resources."
                ]
            ]
        },
        {
            "id": "init-function-12",
            "type": "bulleted_list",
            "richText": [
                [
                    "Package initialization runs one step at a time in one goroutine."
                ]
            ]
        },
        {
            "id": "init-function-12-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "init",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can start other goroutines."
                ]
            ]
        },
        {
            "id": "init-function-12-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Returning from "
                ],
                [
                    "init",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " does not wait for those goroutines to finish."
                ]
            ]
        },
        {
            "id": "init-function-13",
            "type": "sub_header",
            "richText": [
                [
                    "Variables, multiple "
                ],
                [
                    "init",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " functions, and "
                ],
                [
                    "main",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "init-function-14",
            "type": "example",
            "example": {
                "title": "Variables, multiple `init` functions, and `main`",
                "language": "go",
                "description": [
                    "The example is saved as `main.go`. It uses only standard library packages."
                ],
                "code": "",
                "files": [
                    {
                        "name": "main.go",
                        "language": "go",
                        "code": "package main\n\nimport \"fmt\"\n\nvar ready = prepare()\n\nfunc prepare() bool {\n    fmt.Println(\"variables\")\n    return true\n}\n\nfunc init() {\n    fmt.Println(\"first init\", ready)\n}\n\nfunc init() {\n    fmt.Println(\"second init\")\n}\n\nfunc main() {\n    fmt.Println(\"main\")\n}"
                    }
                ],
                "commands": "go run main.go",
                "result": "variables\nfirst init true\nsecond init\nmain"
            }
        },


        {
            "id": "init-function-17",
            "type": "bulleted_list",
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
