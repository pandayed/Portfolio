/* Copied from the init() Function page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-805e-955e-f3e6320ff4ab",
    "slug": "init-function",
    "title": "init() Function",
    "updatedOn": "2025-08-01",
    "blocks": [
        {
            "id": "24224eb1-ed54-8044-9dfd-cc1c2bd15c32",
            "type": "bulleted_list",
            "richText": [
                [
                    "Automatically executed "
                ],
                [
                    "before ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "main()",
                    [
                        [
                            "b"
                        ],
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
            "id": "24224eb1-ed54-8054-934b-c2b6c6378296",
            "type": "bulleted_list",
            "richText": [
                [
                    "Used to:"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-8043-81c7-f487c19319a4",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Initialize package-level variables."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-8010-a226-d8af51e89f22",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Perform setup logic (e.g., register plugins, config, logging)."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-8038-9f81-e74f2914f400",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80e2-bfab-e5c11e6dbd4c",
            "type": "sub_sub_header",
            "richText": [
                [
                    "When is it called?",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80ee-b83c-dd5cefb55774",
            "type": "bulleted_list",
            "richText": [
                [
                    "Called "
                ],
                [
                    "after all variable declarations",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " in the file are evaluated."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-803a-9f0c-d268c98ccd15",
            "type": "bulleted_list",
            "richText": [
                [
                    "Called "
                ],
                [
                    "once per package",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", even if imported multiple times."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8021-8353-d05c240a0e29",
            "type": "bulleted_list",
            "richText": [
                [
                    "Execution order",
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
                    "id": "24224eb1-ed54-80a0-92b9-c4fedf6142c9",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Imported packages' "
                        ],
                        [
                            "init()",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " functions first (in dependency order)."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-8032-826e-cb537785c7ec",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Then current package’s "
                        ],
                        [
                            "init()",
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
                }
            ]
        },
        {
            "id": "24224eb1-ed54-80fa-8b3a-da06a7c565b2",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80eb-925f-de55cb98b683",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Rules",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80c5-9d9f-d3a16242f660",
            "type": "bulleted_list",
            "richText": [
                [
                    "You "
                ],
                [
                    "cannot call ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "init()",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " manually",
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
            "id": "24224eb1-ed54-80f4-83b5-d3f67a4dad32",
            "type": "bulleted_list",
            "richText": [
                [
                    "A file/package can have "
                ],
                [
                    "multiple ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "init()",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " functions",
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
            "id": "24224eb1-ed54-804f-8143-c01c1f8a2fdc",
            "type": "bulleted_list",
            "richText": [
                [
                    "No parameters or return values allowed:"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-807b-8563-d33ea584b5d3",
                    "type": "code",
                    "richText": [
                        [
                            "func init() {\n    // setup code\n}"
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "24224eb1-ed54-804d-92cf-c59511c33825",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8083-a247-c6f4b0bb311c",
            "type": "sub_sub_header",
            "richText": [
                [
                    "init() vs main()",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-800c-8ce0-d10b821917fb",
            "type": "table",
            "children": [
                {
                    "id": "24224eb1-ed54-80da-b6e5-e15f8d8440d2",
                    "type": "table_row",
                    "cells": {
                        "Dcfd": [
                            [
                                "Feature"
                            ]
                        ],
                        "ztop": [
                            [
                                "init()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "zp<Q": [
                            [
                                "main()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-80e1-9541-c09efd9ed4d4",
                    "type": "table_row",
                    "cells": {
                        "Dcfd": [
                            [
                                "Called by"
                            ]
                        ],
                        "ztop": [
                            [
                                "Go runtime"
                            ]
                        ],
                        "zp<Q": [
                            [
                                "Go runtime"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-80a5-8069-d91a6b60b616",
                    "type": "table_row",
                    "cells": {
                        "Dcfd": [
                            [
                                "Used for"
                            ]
                        ],
                        "ztop": [
                            [
                                "Initialization"
                            ]
                        ],
                        "zp<Q": [
                            [
                                "Application logic"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-80b9-b5f2-f34d038ae821",
                    "type": "table_row",
                    "cells": {
                        "Dcfd": [
                            [
                                "Return type"
                            ]
                        ],
                        "ztop": [
                            [
                                "No return"
                            ]
                        ],
                        "zp<Q": [
                            [
                                "No return"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-807d-bf5d-e2a4f11b8b9c",
                    "type": "table_row",
                    "cells": {
                        "Dcfd": [
                            [
                                "Parameters"
                            ]
                        ],
                        "ztop": [
                            [
                                "None"
                            ]
                        ],
                        "zp<Q": [
                            [
                                "None"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-80c7-8dd8-c81aa82a7b75",
                    "type": "table_row",
                    "cells": {
                        "Dcfd": [
                            [
                                "Defined in"
                            ]
                        ],
                        "ztop": [
                            [
                                "Any package"
                            ]
                        ],
                        "zp<Q": [
                            [
                                "Only in package "
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
                    }
                },
                {
                    "id": "24224eb1-ed54-8058-a1c1-d370901cb5ac",
                    "type": "table_row",
                    "cells": {
                        "Dcfd": [
                            [
                                "Call order"
                            ]
                        ],
                        "ztop": [
                            [
                                "Before "
                            ],
                            [
                                "main()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "zp<Q": [
                            [
                                "After all "
                            ],
                            [
                                "init()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " functions"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "Dcfd",
                "ztop",
                "zp<Q"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24224eb1-ed54-80f4-8171-de66a5d56bb0",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80eb-9723-e461af218d08",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Use Cases",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-800a-9029-c08ad6f13b72",
            "type": "bulleted_list",
            "richText": [
                [
                    "Setting up:"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-8045-b195-e03c8f391374",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Configs"
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-80eb-b6d0-e80c62f53bf8",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Logging"
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-80e1-9564-f0bf9de57a9f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Database connections (initial client setup)"
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-805f-9fd2-c7f9f2e7f20a",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Registering dependencies"
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-8090-874b-ce12245df0ce",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Environment checks"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-8026-9b7a-f9e89cd69f77",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-802c-89a5-ea1dfcec0e18",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Bad Practices",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80f1-b2b7-edd855316285",
            "type": "bulleted_list",
            "richText": [
                [
                    "Avoid complex logic in "
                ],
                [
                    "init()",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-806c-9c78-d24cec822d86",
            "type": "bulleted_list",
            "richText": [
                [
                    "Don’t depend on execution order between files unless well controlled"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80ca-9678-d74185bcbe47",
            "type": "bulleted_list",
            "richText": [
                [
                    "Avoid panics or side-effects that make testing/debugging hard"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80ae-93f0-c7ee8c8f4560",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80db-a371-c78d3ed0263d",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8039-88cb-e6da89258a88",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\nfunc init() {\n    fmt.Println(\"Init function runs before main\")\n}\n\nfunc main() {\n    fmt.Println(\"Main function\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-801c-bc0b-cd395bad0e95",
            "type": "text",
            "richText": [
                [
                    "Output:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80c5-92e5-ca218c3651c6",
            "type": "code",
            "richText": [
                [
                    "Init function runs before main\nMain function"
                ]
            ],
            "language": "Plain Text"
        }
    ]
} as const satisfies GoNote;

export default note;
