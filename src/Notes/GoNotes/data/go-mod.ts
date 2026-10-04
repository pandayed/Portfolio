/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8060-8c25-fda6dee5d9bf",
    "slug": "go-mod",
    "title": "go.mod",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "go-mod-01",
            "type": "text",
            "richText": [
                [
                    "go.mod records the module path, Go language/toolchain requirements, and dependency requirements. It belongs at the module root."
                ]
            ]
        },
        {
            "id": "go-mod-02",
            "type": "sub_header",
            "richText": [
                [
                    "Directive reference"
                ]
            ]
        },
        {
            "id": "go-mod-03",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1"
            ],
            "hasColumnHeader": true,
            "children": [
                {
                    "id": "go-mod-03-row-0",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Directive"
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
                    "id": "go-mod-03-row-1",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "module"
                            ]
                        ],
                        "col-1": [
                            [
                                "Module path used as the prefix of its package import paths."
                            ]
                        ]
                    }
                },
                {
                    "id": "go-mod-03-row-2",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "go"
                            ]
                        ],
                        "col-1": [
                            [
                                "Minimum Go version and language semantics. Since Go 1.21 this is an enforced toolchain minimum."
                            ]
                        ]
                    }
                },
                {
                    "id": "go-mod-03-row-3",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "toolchain"
                            ]
                        ],
                        "col-1": [
                            [
                                "Suggested Go toolchain when this is a main module (Go 1.21+)."
                            ]
                        ]
                    }
                },
                {
                    "id": "go-mod-03-row-4",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "require"
                            ]
                        ],
                        "col-1": [
                            [
                                "Minimum required version of another module. // indirect means no package in the current module directly imports a package from it."
                            ]
                        ]
                    }
                },
                {
                    "id": "go-mod-03-row-5",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "replace"
                            ]
                        ],
                        "col-1": [
                            [
                                "Use another module version or local directory in place of a dependency."
                            ]
                        ]
                    }
                },
                {
                    "id": "go-mod-03-row-6",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "exclude"
                            ]
                        ],
                        "col-1": [
                            [
                                "Disallow a specific dependency version in the main module."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "go-mod-04",
            "type": "text",
            "richText": [
                [
                    "Illustrative manifest. example.com/lib is a placeholder dependency, not a command to download a real package:"
                ]
            ]
        },
        {
            "id": "go-mod-05",
            "type": "code",
            "richText": [
                [
                    "module example.com/shop\n\ngo 1.23.0\n\nrequire example.com/lib v1.2.3"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "go-mod-06",
            "type": "text",
            "richText": [
                [
                    "require is a minimum, not a lockfile pin. If another requirement needs v1.4.0 of that same module, version selection can choose v1.4.0. go.sum authenticates downloaded content; it does not select dependency versions."
                ]
            ]
        },
        {
            "id": "go-mod-07",
            "type": "text",
            "richText": [
                [
                    "Checksum entries are covered in "
                ],
                [
                    "go.sum",
                    [
                        [
                            "a",
                            "#/notes/go/go-sum"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "go-mod-08",
            "type": "sub_header",
            "richText": [
                [
                    "Commands"
                ]
            ]
        },
        {
            "id": "go-mod-09",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1"
            ],
            "hasColumnHeader": true,
            "children": [
                {
                    "id": "go-mod-09-row-0",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Command"
                            ]
                        ],
                        "col-1": [
                            [
                                "Effect"
                            ]
                        ]
                    }
                },
                {
                    "id": "go-mod-09-row-1",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "go mod init example.com/shop"
                            ]
                        ],
                        "col-1": [
                            [
                                "Create go.mod for the new module."
                            ]
                        ]
                    }
                },
                {
                    "id": "go-mod-09-row-2",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "go get module/path@version"
                            ]
                        ],
                        "col-1": [
                            [
                                "Add or change a dependency requirement. The path and version here are placeholders."
                            ]
                        ]
                    }
                },
                {
                    "id": "go-mod-09-row-3",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "go mod tidy"
                            ]
                        ],
                        "col-1": [
                            [
                                "Reconcile requirements and checksums with imports, including tests."
                            ]
                        ]
                    }
                },
                {
                    "id": "go-mod-09-row-4",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "go mod download"
                            ]
                        ],
                        "col-1": [
                            [
                                "Pre-fill the module cache with needed downloads."
                            ]
                        ]
                    }
                },
                {
                    "id": "go-mod-09-row-5",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "go mod verify"
                            ]
                        ],
                        "col-1": [
                            [
                                "Check that cached module archives and extracted files have not changed since download."
                            ]
                        ]
                    }
                },
                {
                    "id": "go-mod-09-row-6",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "go list -m all"
                            ]
                        ],
                        "col-1": [
                            [
                                "List selected modules in the build list."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "go-mod-10",
            "type": "text",
            "richText": [
                [
                    "Since Go 1.16, ordinary build commands default to avoiding changes to go.mod and report missing requirements. Use go get or go mod tidy to update dependencies deliberately. Downloading an already required module during a build is different from adding a requirement."
                ]
            ]
        },
        {
            "id": "go-mod-11",
            "type": "sub_header",
            "richText": [
                [
                    "Replacements and exclusions"
                ]
            ]
        },
        {
            "id": "go-mod-12",
            "type": "code",
            "richText": [
                [
                    "require example.com/lib v1.2.3\nreplace example.com/lib => ../lib\nexclude example.com/other v1.3.0"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "go-mod-13",
            "type": "text",
            "richText": [
                [
                    "A local replacement uses ../lib instead of downloading example.com/lib. The target needs an appropriate go.mod. replace alone does not add the module as a dependency. Replacements and exclusions in dependency modules do not override the main module's choices."
                ]
            ]
        },
        {
            "id": "go-mod-14",
            "type": "bulleted_list",
            "richText": [
                [
                    "Commit go.mod and go.sum when present. Review dependency-file changes after changing imports or running tidy."
                ]
            ]
        },
        {
            "id": "go-mod-15",
            "type": "bulleted_list",
            "richText": [
                [
                    "Avoid committing local replacements that other developers or release builds cannot resolve."
                ]
            ]
        },
        {
            "id": "go-mod-16",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "go.mod file reference",
                    [
                        [
                            "a",
                            "https://go.dev/doc/modules/gomod-ref"
                        ]
                    ]
                ],
                [
                    ""
                ]
            ]
        },
        {
            "id": "go-mod-17",
            "type": "text",
            "richText": [
                [
                    ""
                ],
                [
                    "Module command behavior",
                    [
                        [
                            "a",
                            "https://go.dev/ref/mod#go-mod-file"
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
