/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8092-97f6-e0dccdba5a19",
    "slug": "go-sum",
    "title": "go.sum",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "go-sum-01",
            "type": "text",
            "richText": [
                [
                    "go.sum records checksums for downloaded module content and module manifests. Go commands manage it alongside go.mod."
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
            "type": "text",
            "richText": [
                [
                    "Illustrative format. The hash values below are placeholders, not valid checksums to paste into a project:"
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
                                "Version whose module content was hashed."
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
                                "Hash covers only that version's go.mod."
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
                                "Algorithm identifier and base64-encoded hash. h1 uses SHA-256."
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
                    "Go checks downloaded content against recorded hashes and reports mismatches. For public modules, the checksum database can verify hashes that are missing locally."
                ]
            ]
        },
        {
            "id": "go-sum-08",
            "type": "bulleted_list",
            "richText": [
                [
                    "go.sum may contain several versions of one module or manifest hashes without a content hash. Its entries are not a list of the versions selected for the build."
                ]
            ]
        },
        {
            "id": "go-sum-09",
            "type": "bulleted_list",
            "richText": [
                [
                    "go mod tidy adds needed hashes and removes unnecessary ones. Keep the generated file in version control; do not invent or manually change hashes."
                ]
            ]
        },
        {
            "id": "go-sum-10",
            "type": "bulleted_list",
            "richText": [
                [
                    "A module with no downloaded dependencies can have no go.sum. Locally replaced modules do not need downloaded-content hashes."
                ]
            ]
        },
        {
            "id": "go-sum-11",
            "type": "text",
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
            "type": "text",
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
