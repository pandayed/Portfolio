/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8092-97f6-e0dccdba5a19",
    "slug": "go-sum",
    "title": "go.sum",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "go-sum-01",
            "type": "bulleted_list",
            "richText": [
                [
                    "go.sum records checksums for downloaded module files and go.mod files."
                ]
            ]
        },
        {
            "id": "go-sum-01-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "A checksum is a hash used to check whether content has changed."
                ]
            ]
        },
        {
            "id": "go-sum-01-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go commands manage go.sum alongside go.mod."
                ]
            ]
        },
        {
            "id": "go-sum-02",
            "type": "sub_header",
            "richText": [
                [
                    "Read an entry"
                ]
            ]
        },
        {
            "id": "go-sum-03",
            "type": "bulleted_list",
            "richText": [
                [
                    "The sample hashes below are not real checksums."
                ]
            ]
        },
        {
            "id": "go-sum-04",
            "type": "code",
            "richText": [
                [
                    "example.com/lib v1.2.3 h1:<base64-content-hash>\nexample.com/lib v1.2.3/go.mod h1:<base64-manifest-hash>"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "go-sum-05",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1"
            ],
            "hasColumnHeader": true,
            "children": [
                {
                    "id": "go-sum-05-row-0",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Field"
                            ]
                        ],
                        "col-1": [
                            [
                                "Meaning"
                            ]
                        ]
                    }
                },
                {
                    "id": "go-sum-05-row-1",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "example.com/lib"
                            ]
                        ],
                        "col-1": [
                            [
                                "Module path."
                            ]
                        ]
                    }
                },
                {
                    "id": "go-sum-05-row-2",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "v1.2.3"
                            ]
                        ],
                        "col-1": [
                            [
                                "The version checked by this hash."
                            ]
                        ]
                    }
                },
                {
                    "id": "go-sum-05-row-3",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "v1.2.3/go.mod"
                            ]
                        ],
                        "col-1": [
                            [
                                "This hash checks only the go.mod file for that version."
                            ]
                        ]
                    }
                },
                {
                    "id": "go-sum-05-row-4",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "h1:..."
                            ]
                        ],
                        "col-1": [
                            [
                                "h1 means SHA-256. The rest is the hash written as base64 text."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "go-sum-06",
            "type": "sub_header",
            "richText": [
                [
                    "Checksums and dependency selection"
                ]
            ]
        },
        {
            "id": "go-sum-07",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go checks downloaded content against its recorded hash."
                ]
            ]
        },
        {
            "id": "go-sum-07-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "If the hashes differ, Go reports an error."
                ]
            ]
        },
        {
            "id": "go-sum-07-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "For public modules, Go can check a missing local hash against the checksum database."
                ]
            ]
        },
        {
            "id": "go-sum-08",
            "type": "bulleted_list",
            "richText": [
                [
                    "go.sum can contain several versions of one module."
                ]
            ]
        },
        {
            "id": "go-sum-08-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "It can record a go.mod hash without a hash for the rest of that module."
                ]
            ]
        },
        {
            "id": "go-sum-08-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "These entries do not say which versions the build selects."
                ]
            ]
        },
        {
            "id": "go-sum-09",
            "type": "bulleted_list",
            "richText": [
                [
                    "go mod tidy adds needed hashes and removes unused ones."
                ]
            ]
        },
        {
            "id": "go-sum-09-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Keep go.sum in version control. Let Go tools update its hashes."
                ]
            ]
        },
        {
            "id": "go-sum-10",
            "type": "bulleted_list",
            "richText": [
                [
                    "A module with no downloaded dependencies may have no go.sum."
                ]
            ]
        },
        {
            "id": "go-sum-10-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Modules replaced by local directories do not need download hashes."
                ]
            ]
        },
        {
            "id": "go-sum-11",
            "type": "bulleted_list",
            "richText": [
                [
                    "Version requirements and selection begin with "
                ],
                [
                    "go.mod",
                    [
                        [
                            "a",
                            "#/notes/go/go-mod"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "go-sum-12",
            "type": "bulleted_list",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "go.sum format and authentication",
                    [
                        [
                            "a",
                            "https://go.dev/ref/mod#go-sum-files"
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
