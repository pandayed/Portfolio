/* Copied from the Module vs Package page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8097-9e0c-d66ddacb377e",
    "slug": "module-vs-package",
    "title": "Module vs Package",
    "updatedOn": "2026-01-23",
    "blocks": [
        {
            "id": "24024eb1-ed54-80cd-a151-e969cd660c24",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Difference Between Module and Package"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8019-8332-f62b794d9e12",
            "type": "table",
            "children": [
                {
                    "id": "24024eb1-ed54-800a-80dc-c3f7155a797c",
                    "type": "table_row",
                    "cells": {
                        "Y[ay": [
                            [
                                "Concept"
                            ]
                        ],
                        "jbPs": [
                            [
                                "Module"
                            ]
                        ],
                        "gWUE": [
                            [
                                "Package"
                            ]
                        ]
                    }
                },
                {
                    "id": "24024eb1-ed54-8001-840a-d6710789cb53",
                    "type": "table_row",
                    "cells": {
                        "Y[ay": [
                            [
                                "Granularity"
                            ]
                        ],
                        "jbPs": [
                            [
                                "Coarse (repo-level)"
                            ]
                        ],
                        "gWUE": [
                            [
                                "Fine (directory-level)"
                            ]
                        ]
                    }
                },
                {
                    "id": "24024eb1-ed54-8003-9504-d420216d892f",
                    "type": "table_row",
                    "cells": {
                        "Y[ay": [
                            [
                                "Defined By"
                            ]
                        ],
                        "jbPs": [
                            [
                                "go.mod",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "gWUE": [
                            [
                                "package",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " keyword in "
                            ],
                            [
                                ".go",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " files"
                            ]
                        ]
                    }
                },
                {
                    "id": "24024eb1-ed54-800c-acfd-ced42e8f3c83",
                    "type": "table_row",
                    "cells": {
                        "Y[ay": [
                            [
                                "Purpose"
                            ]
                        ],
                        "jbPs": [
                            [
                                "Dependency/version management"
                            ]
                        ],
                        "gWUE": [
                            [
                                "Code organization"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "Y[ay",
                "jbPs",
                "gWUE"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "2f124eb1-ed54-8051-8837-c63fbffc561e",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Package"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80b2-af8a-edf41947ec09",
            "type": "bulleted_list",
            "richText": [
                [
                    "Smallest "
                ],
                [
                    "compilable unit",
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
            "id": "2f124eb1-ed54-807f-b135-ea173591f173",
            "type": "bulleted_list",
            "richText": [
                [
                    "Smallest "
                ],
                [
                    "executable unit",
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
            "id": "2f124eb1-ed54-8018-a8b0-e0d85a47c20c",
            "type": "bulleted_list",
            "richText": [
                [
                    "A runtime concept."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8067-90f5-ffca0f61acc4",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Module"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8019-973b-ffe782fb977d",
            "type": "bulleted_list",
            "richText": [
                [
                    "A "
                ],
                [
                    "dependency resolution unit",
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
            "id": "2f124eb1-ed54-806b-b2c9-c5f869210b81",
            "type": "bulleted_list",
            "richText": [
                [
                    "Exists only for Go tooling."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-806a-8b37-e1e41f289cdc",
            "type": "bulleted_list",
            "richText": [
                [
                    "A build-time concept."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80c7-8e00-fcd1227c9b7e",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8008-ac88-d5a4324ce1b3",
            "type": "sub_header",
            "richText": [
                [
                    "What “unit of execution” actually means"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-801c-97aa-fb204afdb00d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go executes "
                ],
                [
                    "exactly one package",
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
            "id": "2f124eb1-ed54-80e6-a06e-edd2d289a580",
            "type": "bulleted_list",
            "richText": [
                [
                    "That package must be:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80fa-9031-edca1546933e",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Named "
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
                    "id": "2f124eb1-ed54-80a4-b2c1-dfc92900a366",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Contain "
                        ],
                        [
                            "func main()",
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
            "id": "2f124eb1-ed54-80d5-9ff1-df6b73c6fe81",
            "type": "text",
            "richText": [
                [
                    "What execution means",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8048-8073-ced162a30e2f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Code that runs after the binary starts."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8099-8977-e1f930d48ace",
            "type": "bulleted_list",
            "richText": [
                [
                    "Only package-level code participates."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8021-aab3-dea96c9abd32",
            "type": "text",
            "richText": [
                [
                    "What does NOT execute",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-804b-88cf-fdef51b3e8a2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Module."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8021-83c0-f148cdadf4e9",
            "type": "bulleted_list",
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
                    "."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80a6-a674-d5817bd8b926",
            "type": "bulleted_list",
            "richText": [
                [
                    "Dependency graph."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80f7-a362-f0452561e57a",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8007-b86b-ee009ffed085",
            "type": "sub_header",
            "richText": [
                [
                    "Where the confusion comes from"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8069-aeb5-e87a125673ad",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Incorrect assumption"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8082-84d1-d1761bbf2ab8",
            "type": "bulleted_list",
            "richText": [
                [
                    "“If "
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
                    " is required, module must be part of execution.”"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-801f-afef-c23b70822d46",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Why this is wrong"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-800f-8509-d0a169f29089",
            "type": "bulleted_list",
            "richText": [
                [
                    "Requirement ≠ runtime participation."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-807f-8f93-e4c841c1f9d6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Modules are required by "
                ],
                [
                    "tools",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not by the "
                ],
                [
                    "program",
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
            "id": "2f124eb1-ed54-8065-aeff-cbcebb637ff5",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-800d-a9a0-f0c14138f701",
            "type": "sub_header",
            "richText": [
                [
                    "Build-time vs Runtime (critical distinction)"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80d1-aa8e-c65970e2a205",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Build-time phase"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8039-bc24-cbcf816d18a2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Tool: "
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
                    ", "
                ],
                [
                    "go run",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8069-93ec-d91a7e2aea33",
            "type": "bulleted_list",
            "richText": [
                [
                    "Responsibilities:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-805c-a9f5-db7dcba5bdf0",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Read "
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
                    "id": "2f124eb1-ed54-80f9-8a98-f4433e5556cf",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Resolve import paths."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-805d-bf7f-d20bed6a1be4",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Download dependencies."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8011-8e08-d0c0b0717d77",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Select versions."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8063-96c9-e4b9b9ed8aa2",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Compile packages."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-808b-b04f-c59f5d890bc1",
            "type": "text",
            "richText": [
                [
                    "Module exists only here.",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8047-8971-f2dd454f0ae8",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-80e0-93b2-f58bdf55dd1c",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Runtime phase"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80fd-8139-dcc8e98914fb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Tool: Operating system loader."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8069-ac65-cb487f97d3b6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Responsibilities:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80eb-bc89-edb7cf27355d",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Load binary."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-803c-8181-d8bfa76bf330",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Start execution."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-80d2-aa88-f55069476c51",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Call "
                        ],
                        [
                            "main.main",
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
            "id": "2f124eb1-ed54-80fa-a120-ea72c92106bf",
            "type": "text",
            "richText": [
                [
                    "Module does not exist here.",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8066-8c2b-d24c0c3a1e86",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-803c-8376-cbdc5c524363",
            "type": "sub_header",
            "richText": [
                [
                    "Proof: Module is not required for execution"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8081-89a3-df7667b9233c",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Minimal executable"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80e3-a1ad-d95479cada89",
            "type": "bulleted_list",
            "richText": [
                [
                    "Single file:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80f6-b45c-f27b93f96210",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "package main",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8048-b3b7-e6bde399c596",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "func main() {}",
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
            "id": "2f124eb1-ed54-8057-889e-c1e535d26692",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Execution"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8004-862f-f4f2d7c09a4b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Command:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-808d-adcc-e33ca63381ff",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "go run main.go",
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
            "id": "2f124eb1-ed54-8080-9582-db064fa5dc40",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Observations"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80bf-a2a2-e327f2391f25",
            "type": "bulleted_list",
            "richText": [
                [
                    "No "
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
            "id": "2f124eb1-ed54-805c-a1f1-ed7ece49c927",
            "type": "bulleted_list",
            "richText": [
                [
                    "No module."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8072-baed-ff8fb63eebdf",
            "type": "bulleted_list",
            "richText": [
                [
                    "Execution succeeds."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-802e-b348-ca96a7be676a",
            "type": "text",
            "richText": [
                [
                    "Conclusion",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-809a-b6de-f08aa9bf4c62",
            "type": "bulleted_list",
            "richText": [
                [
                    "Module is not required for execution."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8051-8d09-e93d6f1c73c1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Module is required only for import resolution."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80a8-815d-ec44c451f4a1",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-80a3-929f-e0a4a3287506",
            "type": "sub_header",
            "richText": [
                [
                    "Why modules feel “mandatory” today"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80be-9530-dc83cabf8191",
            "type": "bulleted_list",
            "richText": [
                [
                    "Modern Go defaults to module mode."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-803a-b1a2-fafa6631ac34",
            "type": "bulleted_list",
            "richText": [
                [
                    "Most real programs:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80bd-8d95-cedd9320f370",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Import standard library."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8028-8d13-ee5b20f910af",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Import external packages."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-802e-8625-ef8a1a79bc4a",
            "type": "text",
            "richText": [
                [
                    "So:"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8058-b7d6-e4ce9ef19755",
            "type": "bulleted_list",
            "richText": [
                [
                    "Tools auto-enable modules."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-802b-843b-e2ffa81feb11",
            "type": "bulleted_list",
            "richText": [
                [
                    "This creates the illusion of necessity."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80a8-ac14-d53b546091d1",
            "type": "text",
            "richText": [
                [
                    "But the "
                ],
                [
                    "language does not require modules",
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
            "id": "2f124eb1-ed54-80db-98ce-cb6e3590641c",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8033-a17d-c59757aabe82",
            "type": "sub_header",
            "richText": [
                [
                    "Dependency clarification (important)"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80d2-99bb-f7a425c70812",
            "type": "sub_sub_header",
            "richText": [
                [
                    "What a Go executable always depends on"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8033-8e53-eb6ff6b401d2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go runtime."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-805f-910a-c98cc512fd4d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Standard library packages."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-800a-861a-c44ad34a6bee",
            "type": "text",
            "richText": [
                [
                    "These are:"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8090-bec4-ebf6ba51fd50",
            "type": "bulleted_list",
            "richText": [
                [
                    "Implicit."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80a2-8b59-ece6cef1e0c5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Not module dependencies."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8042-8dcc-c5fc9b442b29",
            "type": "bulleted_list",
            "richText": [
                [
                    "Not versioned via "
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
            "id": "2f124eb1-ed54-8020-a4f5-ef2454c23450",
            "type": "sub_sub_header",
            "richText": [
                [
                    "What module dependencies are"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80d2-9805-c980c8e9f542",
            "type": "bulleted_list",
            "richText": [
                [
                    "External versioned packages."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-809b-ad08-eff8cc3b75f9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Managed via "
                ],
                [
                    "require",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " in "
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
            "id": "2f124eb1-ed54-8064-ae74-c404c31b8c19",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-80a5-8d4b-ddc2848a7871",
            "type": "sub_header",
            "richText": [
                [
                    "Correct dependency statements (precise)"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8000-b54d-e95d0861ba49",
            "type": "bulleted_list",
            "richText": [
                [
                    "A package:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8048-af87-dae387bcef48",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Can be compiled without a module."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-809e-9e7a-da081c7de131",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Can be executed without a module."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-80aa-a127-f11fc83af2b9",
            "type": "bulleted_list",
            "richText": [
                [
                    "A module:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80ea-b6e1-f9cc4b8a1192",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Cannot be executed."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-80fd-8f6b-ec45d54f65ec",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Has no runtime representation."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-80dc-9114-cfc9a4b1b7fa",
            "type": "bulleted_list",
            "richText": [
                [
                    "An executable Go program:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8037-95d1-c54f5700a5e1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Can have zero external module dependencies."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-80be-a022-c81902366fe4",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Can never have zero dependencies in absolute terms."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-80f2-b729-c6872fdd2889",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8065-9d00-c9cc4b8ec0b5",
            "type": "sub_header",
            "richText": [
                [
                    "Correct mental model (memorize this)"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-806d-bca9-ceb91c985a52",
            "type": "bulleted_list",
            "richText": [
                [
                    "Package",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80bc-9f94-d4ca411e5ad2",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Code organization."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-80bc-94dd-d7d6c8a93e0f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Compilation unit."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8070-9048-cc2053855785",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Execution unit."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-8066-a0a8-da750dca1644",
            "type": "bulleted_list",
            "richText": [
                [
                    "Module",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8063-b03d-ee6533baadbc",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Import resolution."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8087-b0e5-e675402d55ea",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Version selection."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-802a-9ec1-ed976ae5d061",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Tooling metadata."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-8056-86f0-da471055d88e",
            "type": "text",
            "richText": [
                [
                    "They live in "
                ],
                [
                    "different phases",
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
            "id": "2f124eb1-ed54-8061-9f32-dbbe47e39fbe",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-80e3-afee-cd5cb4c2eee0",
            "type": "sub_header",
            "richText": [
                [
                    "Common incorrect statements (and fixes)"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80f9-a8d8-fe852f938ac7",
            "type": "bulleted_list",
            "richText": [
                [
                    "“Module is required to run Go code”"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8050-8e0d-f8960b16e447",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Incorrect."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8047-8a66-da3d5db0bf35",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Module is required to "
                        ],
                        [
                            "resolve imports",
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
            "id": "2f124eb1-ed54-808c-a12b-c746d8f75c62",
            "type": "bulleted_list",
            "richText": [
                [
                    "“Package executes through module”"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-809e-8544-f9cce0282b6a",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Incorrect."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8033-a550-ed698fd067da",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Package executes "
                        ],
                        [
                            "directly",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " as a binary."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-8040-beb3-c2d9ddc34cf0",
            "type": "bulleted_list",
            "richText": [
                [
                    "“Module is higher-level package”"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-80ec-b047-ecdc87a1215c",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Incorrect."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-809c-a03b-ea7821cca7db",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Module is not a language construct."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-80bf-9a92-d5370b0f939f",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8089-b601-d6079acfde7a",
            "type": "sub_header",
            "richText": [
                [
                    "Final one-line takeaway"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80e7-9da5-e1b55581d17c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go "
                ],
                [
                    "runs packages",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", tools "
                ],
                [
                    "use modules",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", and these never overlap at runtime."
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
