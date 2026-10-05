/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8097-9e0c-d66ddacb377e",
    "slug": "module-vs-package",
    "title": "Module vs Package",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "module-vs-package-01",
            "type": "bulleted_list",
            "richText": [
                [
                    "A package organizes code."
                ]
            ]
        },
        {
            "id": "module-vs-package-01-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "A module groups packages under one version and records the modules they depend on."
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
                                "The go.mod directory and its subdirectories, except separate nested modules."
                            ]
                        ],
                        "col-2": [
                            [
                                "Source files compiled together, normally in one directory."
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
                                "Manage dependencies and release versions."
                            ]
                        ],
                        "col-2": [
                            [
                                "Group declared names and compile source files together."
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
                                "package main with func main() starts the program after initialization."
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
                    "The go command uses module requirements to find the versions needed by imports."
                ]
            ]
        },
        {
            "id": "module-vs-package-05-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "It compiles packages and links them into an executable."
                ]
            ]
        },
        {
            "id": "module-vs-package-06",
            "type": "bulleted_list",
            "richText": [
                [
                    "The operating system starts the executable."
                ]
            ]
        },
        {
            "id": "module-vs-package-06-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go initializes imported packages first, then the main package."
                ]
            ]
        },
        {
            "id": "module-vs-package-06-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go then calls main.main."
                ]
            ]
        },
        {
            "id": "module-vs-package-07",
            "type": "bulleted_list",
            "richText": [
                [
                    "Imported package code can run during initialization or when another function calls it."
                ]
            ]
        },
        {
            "id": "module-vs-package-08",
            "type": "bulleted_list",
            "richText": [
                [
                    "go.mod is a file used during the build. It is not executable code."
                ]
            ]
        },
        {
            "id": "module-vs-package-08-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "A built program can start without reading its source go.mod."
                ]
            ]
        },
        {
            "id": "module-vs-package-08-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A binary can contain module build information. The program can read that information while running."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The commands select the executable package."
                ]
            ]
        },
        {
            "id": "module-vs-package-12-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "The module supplies import paths and dependencies for the build."
                ]
            ]
        },
        {
            "id": "module-vs-package-12-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A simple file using only the standard library can run with go run main.go without a local go.mod."
                ]
            ]
        },
        {
            "id": "module-vs-package-12-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use modules to manage dependencies in a project."
                ]
            ]
        },
        {
            "id": "module-vs-package-13",
            "type": "bulleted_list",
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
            "type": "bulleted_list",
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
            "type": "bulleted_list",
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
            "type": "bulleted_list",
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
