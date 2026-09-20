/* Copied from the go.mod page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8060-8c25-fda6dee5d9bf",
    "slug": "go-mod",
    "title": "go.mod",
    "updatedOn": "2025-08-09",
    "blocks": [
        {
            "id": "24124eb1-ed54-8080-8e2c-cc4e09b2946c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Module definition file",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " in Go."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80eb-8903-e2cdf926a64c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Introduced with Go Modules (Go 1.11+)."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80e6-b8dc-d5eb629e7060",
            "type": "bulleted_list",
            "richText": [
                [
                    "Declares the current module's "
                ],
                [
                    "name",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Go version",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", and "
                ],
                [
                    "dependencies",
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
            "id": "24124eb1-ed54-8048-992b-e17807877282",
            "type": "bulleted_list",
            "richText": [
                [
                    "Located at the "
                ],
                [
                    "root of your module",
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
            "id": "24124eb1-ed54-8063-860d-c618d89d94e0",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80b5-8d83-f9fc035e9ca5",
            "type": "sub_header",
            "richText": [
                [
                    "Important Keywords",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80c0-96bf-e5afa89123b5",
            "type": "table",
            "children": [
                {
                    "id": "24124eb1-ed54-80c4-89af-d6f0c42c766c",
                    "type": "table_row",
                    "cells": {
                        "wb_V": [
                            [
                                "Keyword"
                            ]
                        ],
                        "{~_f": [
                            [
                                "Meaning"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8072-a919-f0f7e8e0e205",
                    "type": "table_row",
                    "cells": {
                        "wb_V": [
                            [
                                "module",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "{~_f": [
                            [
                                "Name/path of your module (usually your repo path)."
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-801f-8e92-f788881d3acf",
                    "type": "table_row",
                    "cells": {
                        "wb_V": [
                            [
                                "go",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "{~_f": [
                            [
                                "Go version used (minimum version)."
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-80f0-98bf-e0dc9591c1c2",
                    "type": "table_row",
                    "cells": {
                        "wb_V": [
                            [
                                "require",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "{~_f": [
                            [
                                "List of module dependencies and their versions."
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-80da-8e6c-f4a17cddb259",
                    "type": "table_row",
                    "cells": {
                        "wb_V": [
                            [
                                "replace",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "{~_f": [
                            [
                                "Override dependency source or version."
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-801f-8eb4-fc4cf543bf7f",
                    "type": "table_row",
                    "cells": {
                        "wb_V": [
                            [
                                "exclude",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "{~_f": [
                            [
                                "Prevent a specific version of a module from being used."
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "wb_V",
                "{~_f"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24124eb1-ed54-80ec-831f-e85091a981b4",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80b9-a183-c7521ba9d377",
            "type": "sub_header",
            "richText": [
                [
                    "Common Commands",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8013-8ed6-efb2710dbcab",
            "type": "table",
            "children": [
                {
                    "id": "24124eb1-ed54-800a-b63e-da97467c0b3a",
                    "type": "table_row",
                    "cells": {
                        "noc`": [
                            [
                                "Command"
                            ]
                        ],
                        "O~\\Y": [
                            [
                                "What it does"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8042-b419-e853d666c4dd",
                    "type": "table_row",
                    "cells": {
                        "noc`": [
                            [
                                "go mod init <module-path>",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "O~\\Y": [
                            [
                                "Creates a new "
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
                                "."
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8031-81b1-efb3ae997e5f",
                    "type": "table_row",
                    "cells": {
                        "noc`": [
                            [
                                "go mod tidy",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "O~\\Y": [
                            [
                                "Adds missing and removes unused modules."
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8015-96c7-df0c5a799f49",
                    "type": "table_row",
                    "cells": {
                        "noc`": [
                            [
                                "go mod download",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "O~\\Y": [
                            [
                                "Downloads all required modules to local cache."
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-80a6-aa43-e4541d5efabb",
                    "type": "table_row",
                    "cells": {
                        "noc`": [
                            [
                                "go mod verify",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "O~\\Y": [
                            [
                                "Verifies checksum of downloaded modules."
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-80b7-8d18-e72c14d2ed90",
                    "type": "table_row",
                    "cells": {
                        "noc`": [
                            [
                                "go list -m all",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "O~\\Y": [
                            [
                                "Lists all modules in use."
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "noc`",
                "O~\\Y"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24124eb1-ed54-80ad-8e60-c2fa8b7a0156",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80d7-876e-db70021c105c",
            "type": "sub_header",
            "richText": [
                [
                    "How Dependencies are Tracked",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8051-a036-cd7a35288ceb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Dependencies are added when:"
                ]
            ],
            "children": [
                {
                    "id": "24124eb1-ed54-8008-90d0-d77705b0aa21",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "You run "
                        ],
                        [
                            "go get <package>",
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
                    "id": "24124eb1-ed54-8084-add4-da18c96577cc",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "You import a new module/package and run "
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
                            " or "
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
                            "."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24124eb1-ed54-8043-9a03-e93c30c87ae5",
            "type": "bulleted_list",
            "richText": [
                [
                    "The required version is pinned in "
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
                    "."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8090-97e3-fc2df7f76276",
            "type": "bulleted_list",
            "richText": [
                [
                    "Exact module versions and checksums are stored in "
                ],
                [
                    "go.sum",
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
            "id": "24124eb1-ed54-8006-90f4-d6204c758b56",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-808f-a8f8-cd9bbbd32414",
            "type": "sub_header",
            "richText": [
                [
                    "replace and exclude – when and why",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-800b-86c7-c35d972350cf",
            "type": "sub_sub_header",
            "richText": [
                [
                    "replace",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8049-a69c-d9259fb18351",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use when:"
                ]
            ],
            "children": [
                {
                    "id": "24124eb1-ed54-80b9-bd17-f37345957545",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Using a "
                        ],
                        [
                            "local version",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            ":"
                        ]
                    ],
                    "children": [
                        {
                            "id": "24124eb1-ed54-80c4-b0b2-efa4ba2eb94b",
                            "type": "text",
                            "richText": [
                                [
                                    "replace my/module => ../local-module",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "24124eb1-ed54-80f1-8910-c450c96e6e5b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Pointing to a "
                        ],
                        [
                            "fork or fixed version",
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
                }
            ]
        },
        {
            "id": "24124eb1-ed54-807f-bccb-e70b88a3136d",
            "type": "sub_sub_header",
            "richText": [
                [
                    "exclude",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80ea-8fb6-ded6b7943679",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use to "
                ],
                [
                    "block bad or broken versions",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " from being used."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80a5-b828-c00dc6bb3d98",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80bc-98ab-fdd7b167d862",
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
            "id": "24124eb1-ed54-8044-8485-d44dd5a6c9e1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Commit both "
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
                    " and "
                ],
                [
                    "go.sum",
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
            "id": "24124eb1-ed54-8093-a8e0-c55f24e6cf7a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Run "
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
                    " often to keep it clean."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8098-a53c-f9d6ae19e35f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "replace",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " carefully; don't leave local paths in production code."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8046-bfe0-dcd8a68ffbfe",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8097-a8e6-d3c17fcc878f",
            "type": "sub_header",
            "richText": [
                [
                    "Summary"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80ec-994e-cc0621e8bcdf",
            "type": "text",
            "richText": [
                [
                    "go.mod",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is your Go project’s dependency manifest."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80d2-a597-f5f5838f1efe",
            "type": "text",
            "richText": [
                [
                    "It:"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80ea-8ec1-d337e4b59263",
            "type": "bulleted_list",
            "richText": [
                [
                    "Declares your module and Go version"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8088-92db-d3e6859d20fa",
            "type": "bulleted_list",
            "richText": [
                [
                    "Lists and locks down dependencies"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8060-b9eb-d0b52a4ce78e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Supports overrides ("
                ],
                [
                    "replace",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ") and exclusions ("
                ],
                [
                    "exclude",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ")"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-804f-8464-d6740e7790c5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Works with "
                ],
                [
                    "go.sum",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " for secure, reproducible builds"
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
