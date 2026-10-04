/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8097-9e0c-d66ddacb377e",
    "slug": "module-vs-package",
    "title": "Module vs Package",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "module-vs-package-01",
            "type": "text",
            "richText": [
                [
                    "A package organizes source code. A module versions a collection of packages and describes its dependencies for Go tooling."
                ]
            ]
        },
        {
            "id": "module-vs-package-02",
            "type": "sub_header",
            "richText": [
                [
                    "Comparison"
                ]
            ]
        },
        {
            "id": "module-vs-package-03",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1",
                "col-2"
            ],
            "hasColumnHeader": true,
            "children": [
                {
                    "id": "module-vs-package-03-row-0",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Concern"
                            ]
                        ],
                        "col-1": [
                            [
                                "Module"
                            ]
                        ],
                        "col-2": [
                            [
                                "Package"
                            ]
                        ]
                    }
                },
                {
                    "id": "module-vs-package-03-row-1",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Boundary"
                            ]
                        ],
                        "col-1": [
                            [
                                "A directory tree rooted at go.mod, excluding nested modules."
                            ]
                        ],
                        "col-2": [
                            [
                                "Source files selected together, normally in one directory."
                            ]
                        ]
                    }
                },
                {
                    "id": "module-vs-package-03-row-2",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Identity"
                            ]
                        ],
                        "col-1": [
                            [
                                "Module path and module version."
                            ]
                        ],
                        "col-2": [
                            [
                                "Import path and package name."
                            ]
                        ]
                    }
                },
                {
                    "id": "module-vs-package-03-row-3",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Role"
                            ]
                        ],
                        "col-1": [
                            [
                                "Dependency management and release versioning."
                            ]
                        ],
                        "col-2": [
                            [
                                "Declarations, imports, and compilation."
                            ]
                        ]
                    }
                },
                {
                    "id": "module-vs-package-03-row-4",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Executable"
                            ]
                        ],
                        "col-1": [
                            [
                                "Can contain library and executable packages."
                            ]
                        ],
                        "col-2": [
                            [
                                "package main with func main() supplies a program entry point."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "module-vs-package-04",
            "type": "sub_header",
            "richText": [
                [
                    "From build to execution"
                ]
            ]
        },
        {
            "id": "module-vs-package-05",
            "type": "bulleted_list",
            "richText": [
                [
                    "The go command uses module requirements to resolve versioned imports. It compiles the selected packages and links an executable."
                ]
            ]
        },
        {
            "id": "module-vs-package-06",
            "type": "bulleted_list",
            "richText": [
                [
                    "The operating system starts the executable. Go startup initializes imported packages, then the main package, and invokes main.main."
                ]
            ]
        },
        {
            "id": "module-vs-package-07",
            "type": "bulleted_list",
            "richText": [
                [
                    "Code from imported packages can run during initialization and when called later. The program does not execute only the main package."
                ]
            ]
        },
        {
            "id": "module-vs-package-08",
            "type": "text",
            "richText": [
                [
                    "go.mod is build metadata, not an executable. An already built program does not need to read the source go.mod to start. Module build information can be embedded in a binary and read at runtime, so saying modules have no runtime representation at all is too broad."
                ]
            ]
        },
        {
            "id": "module-vs-package-09",
            "type": "sub_header",
            "richText": [
                [
                    "One module, two packages"
                ]
            ]
        },
        {
            "id": "module-vs-package-10",
            "type": "code",
            "richText": [
                [
                    "shop/\n  go.mod                  # module example.com/shop\n  pricing/pricing.go      # package pricing\n  cmd/shop/main.go        # package main imports example.com/shop/pricing"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "module-vs-package-11",
            "type": "code",
            "richText": [
                [
                    "go run ./cmd/shop\ngo build -o shop ./cmd/shop"
                ]
            ],
            "language": "Shell"
        },
        {
            "id": "module-vs-package-12",
            "type": "text",
            "richText": [
                [
                    "These commands select the executable package. The module supplies import paths and dependencies for its build. A simple named-file program using only the standard library can also run with go run main.go without a local go.mod; that does not replace module management for projects."
                ]
            ]
        },
        {
            "id": "module-vs-package-13",
            "type": "text",
            "richText": [
                [
                    "Continue with "
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
                    " for layout and versioning."
                ]
            ]
        },
        {
            "id": "module-vs-package-14",
            "type": "text",
            "richText": [
                [
                    "See "
                ],
                [
                    "Packages",
                    [
                        [
                            "a",
                            "#/notes/go/packages"
                        ]
                    ]
                ],
                [
                    " for imports and exported names."
                ]
            ]
        },
        {
            "id": "module-vs-package-15",
            "type": "text",
            "richText": [
                [
                    "Sources: "
                ],
                [
                    "Program execution",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Program_execution"
                        ]
                    ]
                ],
                [
                    ""
                ]
            ]
        },
        {
            "id": "module-vs-package-16",
            "type": "text",
            "richText": [
                [
                    ""
                ],
                [
                    "Module build information",
                    [
                        [
                            "a",
                            "https://go.dev/ref/mod#go-version-m"
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
