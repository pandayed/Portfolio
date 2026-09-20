/* Copied from the Why Go? page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-80f7-a283-c9ba635393a0",
    "slug": "why-go",
    "title": "Why Go?",
    "updatedOn": "2025-08-09",
    "blocks": [
        {
            "id": "24124eb1-ed54-8011-b6d8-f26d45c45c3a",
            "type": "table",
            "children": [
                {
                    "id": "24124eb1-ed54-80cd-a988-d1c183c06447",
                    "type": "table_row",
                    "cells": {
                        "OQvR": [
                            [
                                "Framework"
                            ]
                        ],
                        "{QLy": [
                            [
                                "RPS (Req/sec)"
                            ]
                        ],
                        "<l@X": [
                            [
                                "Avg Latency"
                            ]
                        ],
                        "==[?": [
                            [
                                "Memory Usage"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-80f4-8bff-eeab26ff0cbf",
                    "type": "table_row",
                    "cells": {
                        "OQvR": [
                            [
                                "Go (Fiber)",
                                [
                                    [
                                        "b"
                                    ]
                                ]
                            ]
                        ],
                        "{QLy": [
                            [
                                "338 096"
                            ]
                        ],
                        "<l@X": [
                            [
                                "~2.3 ms"
                            ]
                        ],
                        "==[?": [
                            [
                                "~12 MB"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8052-8e41-e58017f42a1e",
                    "type": "table_row",
                    "cells": {
                        "OQvR": [
                            [
                                "Spring Boot",
                                [
                                    [
                                        "b"
                                    ]
                                ]
                            ]
                        ],
                        "{QLy": [
                            [
                                "243 639"
                            ]
                        ],
                        "<l@X": [
                            [
                                "~7.4 ms"
                            ]
                        ],
                        "==[?": [
                            [
                                "~17.9 MB"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8033-ae1e-e3267e89166d",
                    "type": "table_row",
                    "cells": {
                        "OQvR": [
                            [
                                "Node.js (Fastify)",
                                [
                                    [
                                        "b"
                                    ]
                                ]
                            ]
                        ],
                        "{QLy": [
                            [
                                "78 136"
                            ]
                        ],
                        "<l@X": [
                            [
                                "~2.8 ms"
                            ]
                        ],
                        "==[?": [
                            [
                                "~20–30 MB"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-80a7-90af-e6b71128c82a",
                    "type": "table_row",
                    "cells": {
                        "OQvR": [
                            [
                                "Node.js (Express)",
                                [
                                    [
                                        "b"
                                    ]
                                ]
                            ]
                        ],
                        "{QLy": [
                            [
                                "42 443"
                            ]
                        ],
                        "<l@X": [
                            [
                                "~22 ms"
                            ]
                        ],
                        "==[?": [
                            [
                                "~9.3 MB"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8012-8eb9-e3bbe07f5907",
                    "type": "table_row",
                    "cells": {
                        "OQvR": [
                            [
                                "FastAPI (Python)",
                                [
                                    [
                                        "b"
                                    ]
                                ]
                            ]
                        ],
                        "{QLy": [
                            [
                                "19 263"
                            ]
                        ],
                        "<l@X": [
                            [
                                "~2.6 ms"
                            ]
                        ],
                        "==[?": [
                            [
                                "~100–150 MB"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-80d3-9586-df50eda74847",
                    "type": "table_row",
                    "cells": {
                        "OQvR": [
                            [
                                "Django (Python)",
                                [
                                    [
                                        "b"
                                    ]
                                ]
                            ]
                        ],
                        "{QLy": [
                            [
                                "32 651"
                            ]
                        ],
                        "<l@X": [
                            [
                                "~50–100 ms"
                            ]
                        ],
                        "==[?": [
                            [
                                "~150–400 MB"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "OQvR",
                "{QLy",
                "<l@X",
                "==[?"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24124eb1-ed54-8096-af7c-fb2f47bfc433",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80fe-971c-e1a42438fb46",
            "type": "callout",
            "children": [
                {
                    "id": "24124eb1-ed54-80cb-a346-facdf83a2eab",
                    "type": "text",
                    "richText": [
                        [
                            "1 Goroutine ~ 2KB & 1 Spring Boot thread ~ 1 MB"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24124eb1-ed54-8068-9857-ce71217d74e1",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8015-88f7-ddfe5631e286",
            "type": "numbered_list",
            "richText": [
                [
                    "Inbuilt concurrency: goroutines + channels = easy parallelism"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-808b-97bc-e6ffb8cf2a99",
            "type": "numbered_list",
            "richText": [
                [
                    "Compiles to single static binary—zero dependencies"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80ea-8c07-c34c03654542",
            "type": "numbered_list",
            "richText": [
                [
                    "Statically typed + compiled = fast and safe"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-800f-b6db-ce6f05af6b18",
            "type": "numbered_list",
            "richText": [
                [
                    "Fast compile times and instant startup—great dev speed"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8046-85a7-da752c9312e6",
            "type": "numbered_list",
            "richText": [
                [
                    "Simple, readable syntax—faster onboarding, fewer bugs"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80cc-9573-d134d4587bfd",
            "type": "numbered_list",
            "richText": [
                [
                    "Cloud-native: powers Kubernetes, Docker, Prometheus"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-807d-933b-c63348de3243",
            "type": "numbered_list",
            "richText": [
                [
                    "First-class tooling: "
                ],
                [
                    "go fmt",
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
                    "go test",
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
                    "go mod",
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
                    "pprof",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
