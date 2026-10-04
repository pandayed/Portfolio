/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8094-af08-c4e58e8100d2",
    "slug": "packages",
    "title": "Packages",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "packages-01",
            "type": "text",
            "richText": [
                [
                    "A package groups Go source files and their declarations. With the Go toolchain, source files selected for a package normally share a directory and package name. External test files may use the separate name ending in _test."
                ]
            ]
        },
        {
            "id": "packages-02",
            "type": "text",
            "richText": [
                [
                    "For module layout and versioning, see "
                ],
                [
                    "Modules",
                    [
                        [
                            "a",
                            "#/notes/go/modules"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "packages-03",
            "type": "sub_header",
            "richText": [
                [
                    "Executable and library packages"
                ]
            ]
        },
        {
            "id": "packages-04",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1",
                "col-2"
            ],
            "hasColumnHeader": true,
            "children": [
                {
                    "id": "packages-04-row-0",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Package"
                            ]
                        ],
                        "col-1": [
                            [
                                "Purpose"
                            ]
                        ],
                        "col-2": [
                            [
                                "Entry point"
                            ]
                        ]
                    }
                },
                {
                    "id": "packages-04-row-1",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "main"
                            ]
                        ],
                        "col-1": [
                            [
                                "Build an executable program."
                            ]
                        ],
                        "col-2": [
                            [
                                "func main() with no parameters or results. It starts after program initialization."
                            ]
                        ]
                    }
                },
                {
                    "id": "packages-04-row-2",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Other names, such as pricing"
                            ]
                        ],
                        "col-1": [
                            [
                                "Provide code imported by another package."
                            ]
                        ],
                        "col-2": [
                            [
                                "No main function required."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "packages-05",
            "type": "text",
            "richText": [
                [
                    "A library-only repository needs no executable package. A repository can contain several executable directories, each declaring package main and its own main function."
                ]
            ]
        },
        {
            "id": "packages-06",
            "type": "sub_header",
            "richText": [
                [
                    "Imports and exported names"
                ]
            ]
        },
        {
            "id": "packages-07",
            "type": "text",
            "richText": [
                [
                    "An identifier beginning with an uppercase Unicode letter is exported when declared at package level or used as a field or method name. Other package-level identifiers are accessible within the same package. Imports are declared separately in each source file that uses them."
                ]
            ]
        },
        {
            "id": "packages-08",
            "type": "text",
            "richText": [
                [
                    "Example files in a module whose go.mod declares module example.com/shop:"
                ]
            ]
        },
        {
            "id": "packages-09",
            "type": "code",
            "richText": [
                [
                    "// pricing/pricing.go\npackage pricing\n\nconst defaultTax = 10 // available only within package pricing\n\nfunc Total(amount int) int {\n    return amount + defaultTax\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "packages-10",
            "type": "code",
            "richText": [
                [
                    "// cmd/shop/main.go\npackage main\n\nimport (\n    \"fmt\"\n    \"example.com/shop/pricing\"\n)\n\nfunc main() {\n    fmt.Println(pricing.Total(100))\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "packages-11",
            "type": "text",
            "richText": [
                [
                    "Expected output: 110. Code outside pricing cannot access pricing.defaultTax."
                ]
            ]
        },
        {
            "id": "packages-12",
            "type": "sub_header",
            "richText": [
                [
                    "Nested paths and import names"
                ]
            ]
        },
        {
            "id": "packages-13",
            "type": "text",
            "richText": [
                [
                    "A nested directory creates a separate package; it does not automatically share the parent package's declarations or imports. Code in example.com/shop/pricing must explicitly import example.com/shop/pricing/rules to use that package. Path rules such as internal restrict access, so import paths are not simply unrestricted flat names."
                ]
            ]
        },
        {
            "id": "packages-14",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1"
            ],
            "hasColumnHeader": true,
            "children": [
                {
                    "id": "packages-14-row-0",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Import form"
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
                    "id": "packages-14-row-1",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "import \"example.com/shop/pricing\""
                            ]
                        ],
                        "col-1": [
                            [
                                "Use the imported package name, usually pricing."
                            ]
                        ]
                    }
                },
                {
                    "id": "packages-14-row-2",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "import cost \"example.com/shop/pricing\""
                            ]
                        ],
                        "col-1": [
                            [
                                "Use the local alias cost, for example cost.Total(100)."
                            ]
                        ]
                    }
                },
                {
                    "id": "packages-14-row-3",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "import _ \"example.com/shop/pricing\""
                            ]
                        ],
                        "col-1": [
                            [
                                "Import only for initialization side effects."
                            ]
                        ]
                    }
                },
                {
                    "id": "packages-14-row-4",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "import . \"example.com/shop/pricing\""
                            ]
                        ],
                        "col-1": [
                            [
                                "Use exported names without a qualifier. This can obscure where names come from."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "packages-15",
            "type": "text",
            "richText": [
                [
                    "A package clause supplies the package name; its import path identifies the package location. The last path segment and the declared name can differ."
                ]
            ]
        },
        {
            "id": "packages-16",
            "type": "text",
            "richText": [
                [
                    "Initialization details are on "
                ],
                [
                    "init() Function",
                    [
                        [
                            "a",
                            "#/notes/go/init-function"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "packages-17",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Packages and imports",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Packages"
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
