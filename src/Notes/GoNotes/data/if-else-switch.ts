/* Copied from the If, else & switch page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24924eb1-ed54-805c-8a49-e5cca2e4740b",
    "slug": "if-else-switch",
    "title": "If, else & switch",
    "updatedOn": "2025-08-08",
    "blocks": [
        {
            "id": "24924eb1-ed54-8044-8463-c61baa625579",
            "type": "code",
            "richText": [
                [
                    "if x > 0 {\n    fmt.Println(\"Positive\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24924eb1-ed54-8040-97f3-cd063a8e4fab",
            "type": "code",
            "richText": [
                [
                    "if x > 0 {\n    fmt.Println(\"Positive\")\n} else {\n    fmt.Println(\"Non-positive\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24924eb1-ed54-807e-8eec-ca91d860fcdf",
            "type": "code",
            "richText": [
                [
                    "if x > 0 {\n    fmt.Println(\"Positive\")\n} else if x < 0 {\n    fmt.Println(\"Negative\")\n} else {\n    fmt.Println(\"Zero\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24924eb1-ed54-800b-a4df-f2b5c10efa8f",
            "type": "divider"
        },
        {
            "id": "24924eb1-ed54-80b5-853d-c59aef7c6a59",
            "type": "bulleted_list",
            "richText": [
                [
                    "Unlike C++, switch in go does not need a "
                ],
                [
                    "break",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24924eb1-ed54-801b-b040-cb7917402451",
            "type": "code",
            "richText": [
                [
                    "switch day {\ncase \"Mon\":\n    fmt.Println(\"Monday\")\ncase \"Tue\":\n    fmt.Println(\"Tuesday\")\ndefault:\n    fmt.Println(\"Other day\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24924eb1-ed54-8061-8fc6-d1e04bf96555",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
