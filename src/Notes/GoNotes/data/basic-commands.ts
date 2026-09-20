/* Copied from the Basic Commands page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24924eb1-ed54-8009-8e03-fdae5e42cfbd",
    "slug": "basic-commands",
    "title": "Basic Commands",
    "updatedOn": "2025-08-08",
    "blocks": [
        {
            "id": "24924eb1-ed54-801b-8242-f0038e05d6d8",
            "type": "text",
            "richText": [
                [
                    "Compiles and runs in one step, doesn’t leave a binary.\n"
                ],
                [
                    "go run file_name.go",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " "
                ]
            ]
        },
        {
            "id": "24924eb1-ed54-8092-a40c-c5171a806376",
            "type": "text"
        },
        {
            "id": "24924eb1-ed54-809f-8cf3-c95089326a3d",
            "type": "text",
            "richText": [
                [
                    "Builds binary\n"
                ],
                [
                    "go build file_name.go",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24924eb1-ed54-807e-8fcb-c2162f2c2709",
            "type": "text"
        },
        {
            "id": "24924eb1-ed54-805e-b83a-f369df7c4753",
            "type": "text",
            "richText": [
                [
                    "Runs binary (for Mac)\n"
                ],
                [
                    "./file_name",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24924eb1-ed54-80e4-ba4c-fb664cd3daa8",
            "type": "text",
            "richText": [
                [
                    "Runs binary (for Windows)"
                ]
            ]
        },
        {
            "id": "24924eb1-ed54-80e5-81fc-ea8b514c13e9",
            "type": "text",
            "richText": [
                [
                    "file_name.exe",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24924eb1-ed54-802e-b886-fbcb468a89ba",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
