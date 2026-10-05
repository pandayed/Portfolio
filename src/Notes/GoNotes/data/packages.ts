/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8094-af08-c4e58e8100d2",
    "slug": "packages",
    "title": "Packages",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "packages-01",
            "type": "bulleted_list",
            "richText": [
                [
                    "A package groups Go source files and the names they declare."
                ]
            ]
        },
        {
            "id": "packages-01-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Files compiled as one package normally share a directory and package name."
                ]
            ]
        },
        {
            "id": "packages-01-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "External test files can use a separate package name ending in _test."
                ]
            ]
        },
        {
            "id": "packages-02",
            "type": "bulleted_list",
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
                                "func main() with no parameters or return values. Runs after package initialization."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A library-only repository does not need package main."
                ]
            ]
        },
        {
            "id": "packages-05-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "A repository can have several executable directories."
                ]
            ]
        },
        {
            "id": "packages-05-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each executable directory has its own package main and main function."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Exported names are available to other packages."
                ]
            ]
        },
        {
            "id": "packages-07-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "A name starts with an uppercase Unicode letter to be exported."
                ]
            ]
        },
        {
            "id": "packages-07-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "This rule applies to package-level names, fields, and methods."
                ]
            ]
        },
        {
            "id": "packages-07-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Other package-level names are available only inside that package."
                ]
            ]
        },
        {
            "id": "packages-07-read-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each file declares the imports that it uses."
                ]
            ]
        },
        {
            "id": "packages-08",
            "type": "bulleted_list",
            "richText": [
                [
                    "go.mod declares module example.com/shop."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Expected output: 110."
                ]
            ]
        },
        {
            "id": "packages-11-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Code outside pricing cannot access pricing.defaultTax."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A nested directory is a separate package."
                ]
            ]
        },
        {
            "id": "packages-13-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "It does not share the parent package's names or imports automatically."
                ]
            ]
        },
        {
            "id": "packages-13-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "To use example.com/shop/pricing/rules, the pricing package must import it."
                ]
            ]
        },
        {
            "id": "packages-13-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "An internal directory also limits which code can import its packages. Import paths have access rules."
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
                                "Use the local name cost, such as cost.Total(100)."
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
                                "Run package initialization without using its exported names."
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
                                "Use exported names without the package name. This can make their source hard to see."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "packages-15",
            "type": "bulleted_list",
            "richText": [
                [
                    "The package declaration gives the package its name."
                ]
            ]
        },
        {
            "id": "packages-15-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "The import path identifies where the package is found."
                ]
            ]
        },
        {
            "id": "packages-15-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The package name can differ from the last part of the import path."
                ]
            ]
        },
        {
            "id": "packages-16",
            "type": "bulleted_list",
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
            "type": "bulleted_list",
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
