/* Copied from the Modules page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8002-a487-ee1362bdf312",
    "slug": "modules",
    "title": "Modules",
    "updatedOn": "2025-07-31",
    "blocks": [
        {
            "id": "24024eb1-ed54-80d9-801a-f7ea986c4878",
            "type": "text",
            "richText": [
                [
                    "A "
                ],
                [
                    "module",
                    [
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    " is a collection of Go packages defined by a "
                ],
                [
                    "go.mod",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " file at its root. It’s the unit of versioning and dependency management in Go."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-807b-a763-f480d19a21f5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Tracks dependencies."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8011-8714-e2f0da1cfd8a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Enables reproducible builds and caching."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-802c-8863-c6e29b561aeb",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-804f-b736-e9025cf3bec0",
            "type": "sub_sub_header",
            "richText": [
                [
                    "How Many Modules Can a Repo Have?"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8040-8f50-c7a03a41a4d7",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Technically:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-801f-87c7-f029b6dfe8d0",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can have "
                ],
                [
                    "multiple modules",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " in a single repo."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80a1-9dcf-f67614f5de6f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each module must have its own "
                ],
                [
                    "go.mod",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " file."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8058-8151-f48c0144c49b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go treats them as "
                ],
                [
                    "independent units",
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
            "id": "24024eb1-ed54-8014-8aaf-e17ef64b7f03",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Best Practice:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8052-96a6-fcf82e8d2458",
            "type": "bulleted_list",
            "richText": [
                [
                    "One module per repo",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " is the most common and recommended approach."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80de-9082-c9af5cb31892",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "multiple packages inside one module",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " for logical separation."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80cb-843e-c8f922b3fc80",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-803b-9bf0-d9f29da28ac5",
            "type": "sub_sub_header",
            "richText": [
                [
                    "When to Use Multiple Modules"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80c8-94be-f0c0c46d5591",
            "type": "text",
            "richText": [
                [
                    "Only when:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8056-8121-d2a8fddaf2fd",
            "type": "bulleted_list",
            "richText": [
                [
                    "You want "
                ],
                [
                    "independent versioning",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " for separate parts."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8093-b1dd-c9c466096d78",
            "type": "bulleted_list",
            "richText": [
                [
                    "You’re building "
                ],
                [
                    "tools, libraries, or CLIs",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " that can live separately."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8017-be3f-db6242f8231b",
            "type": "text",
            "richText": [
                [
                    "But be careful:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80ef-a520-dda56e8b30cf",
            "type": "bulleted_list",
            "richText": [
                [
                    "It "
                ],
                [
                    "increases complexity",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": dependency management, testing, tooling."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80af-ace5-c79b6fac607e",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-801d-8257-d42c47dd7d53",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Is There a \"Main Module\"?"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80e3-91eb-d3938e711e22",
            "type": "bulleted_list",
            "richText": [
                [
                    "Not officially",
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
            "id": "24024eb1-ed54-809f-8a29-c1cde698ed4f",
            "type": "bulleted_list",
            "richText": [
                [
                    "But the module where you run "
                ],
                [
                    "go run",
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
                    "go build",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", or "
                ],
                [
                    "go mod tidy",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is considered the "
                ],
                [
                    "main/root module",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " "
                ],
                [
                    "for that operation",
                    [
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80d5-9115-d78084346b49",
            "type": "bulleted_list",
            "richText": [
                [
                    "It’s the one with the "
                ],
                [
                    "go.mod",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " file in the current directory or parent dirs."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8073-a2e7-fe2cabfb1802",
            "type": "divider"
        }
    ]
} as const satisfies GoNote;

export default note;
