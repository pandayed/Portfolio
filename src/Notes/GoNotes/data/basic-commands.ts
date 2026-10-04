/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24924eb1-ed54-8009-8e03-fdae5e42cfbd",
    "slug": "basic-commands",
    "title": "Basic Commands",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "basic-commands-01",
            "type": "text",
            "richText": [
                [
                    "Run these commands from the directory containing the executable package. The package must declare package main and func main()."
                ]
            ]
        },
        {
            "id": "basic-commands-02",
            "type": "sub_header",
            "richText": [
                [
                    "Run during development"
                ]
            ]
        },
        {
            "id": "basic-commands-03",
            "type": "code",
            "richText": [
                [
                    "go run ."
                ]
            ],
            "language": "Shell"
        },
        {
            "id": "basic-commands-04",
            "type": "text",
            "richText": [
                [
                    "Compiles and runs the current package using a temporary executable. It does not leave a named executable in the current directory."
                ]
            ]
        },
        {
            "id": "basic-commands-05",
            "type": "code",
            "richText": [
                [
                    "go run main.go"
                ]
            ],
            "language": "Shell"
        },
        {
            "id": "basic-commands-06",
            "type": "text",
            "richText": [
                [
                    "Runs the listed Go file. Use go run . when the package has multiple source files so they are included together."
                ]
            ]
        },
        {
            "id": "basic-commands-07",
            "type": "sub_header",
            "richText": [
                [
                    "Build an executable"
                ]
            ]
        },
        {
            "id": "basic-commands-08",
            "type": "code",
            "richText": [
                [
                    "go build -o app ."
                ]
            ],
            "language": "Shell"
        },
        {
            "id": "basic-commands-09",
            "type": "text",
            "richText": [
                [
                    "Builds the current main package as app. Building a library package checks and caches compilation; it does not create a runnable application."
                ]
            ]
        },
        {
            "id": "basic-commands-10",
            "type": "sub_header",
            "richText": [
                [
                    "Run the built executable"
                ]
            ]
        },
        {
            "id": "basic-commands-11",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1",
                "col-2"
            ],
            "hasColumnHeader": true,
            "children": [
                {
                    "id": "basic-commands-11-row-0",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Platform"
                            ]
                        ],
                        "col-1": [
                            [
                                "Build"
                            ]
                        ],
                        "col-2": [
                            [
                                "Run"
                            ]
                        ]
                    }
                },
                {
                    "id": "basic-commands-11-row-1",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "macOS / Linux"
                            ]
                        ],
                        "col-1": [
                            [
                                "go build -o app ."
                            ]
                        ],
                        "col-2": [
                            [
                                "./app"
                            ]
                        ]
                    }
                },
                {
                    "id": "basic-commands-11-row-2",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Windows PowerShell"
                            ]
                        ],
                        "col-1": [
                            [
                                "go build -o app.exe ."
                            ]
                        ],
                        "col-2": [
                            [
                                ".\\app.exe"
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "basic-commands-12",
            "type": "text",
            "richText": [
                [
                    "See "
                ],
                [
                    "Packages",
                    [
                        [
                            "a",
                            "#/notes/go/packages"
                        ]
                    ]
                ],
                [
                    " for executable versus library packages."
                ]
            ]
        },
        {
            "id": "basic-commands-13",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Go command reference",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/cmd/go"
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
