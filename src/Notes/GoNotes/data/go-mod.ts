/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8060-8c25-fda6dee5d9bf",
    "slug": "go-mod",
    "title": "go.mod",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "go-mod-01",
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
                    " records the module path, required Go version, and dependencies."
                ]
            ]
        },
        {
            "id": "go-mod-01-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "It is in the module root directory."
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
                                "module",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "The first part of its package import paths."
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
                                "go",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Minimum Go version and language rules. Since Go 1.21, an older toolchain cannot use the module."
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
                                "toolchain",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Suggested version of the Go tools for a "
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
                                " module (Go 1.21+)."
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
                                "require",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Minimum version of another module. "
                            ],
                            [
                                "// indirect",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " means this module does not directly import a package from it."
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
                                "replace",
                                [
                                    [
                                        "c"
                                    ]
                                ]
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
                                "exclude",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Prevent the "
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
                                " module from using a specific dependency version."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "go-mod-04",
            "type": "bulleted_list",
            "richText": [
                [
                    "The module path here is "
                ],
                [
                    "example.com/shop",
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
            "id": "go-mod-05",
            "type": "example",
            "example": {
                "title": "Module file contents",
                "language": "text",
                "description": [
                    "This illustrative `go.mod` uses example module paths and versions. The dependencies and replacement directories must exist for a real build."
                ],
                "code": "",
                "files": [
                    {
                        "name": "go.mod",
                        "language": "text",
                        "code": "module example.com/shop\n\ngo 1.23.0\n\nrequire example.com/lib v1.2.3"
                    }
                ]
            }
        },
        {
            "id": "go-mod-06",
            "type": "bulleted_list",
            "richText": [
                [
                    "require",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " sets a minimum version. It does not lock the build to that version."
                ]
            ]
        },
        {
            "id": "go-mod-06-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Another dependency can require a newer version of the same module."
                ]
            ]
        },
        {
            "id": "go-mod-06-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "For example, a requirement for "
                ],
                [
                    "v1.4.0",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can raise the selected version from "
                ],
                [
                    "v1.2.3",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to "
                ],
                [
                    "v1.4.0",
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
            "id": "go-mod-06-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "go.sum",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " checks downloaded content. It does not choose versions."
                ]
            ]
        },
        {
            "id": "go-mod-07",
            "type": "bulleted_list",
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
                                "go mod init example.com/shop",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Create "
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
                                " for the new module."
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
                                "go get module/path@version",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Add or change the required version of a dependency."
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
                                "go mod tidy",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Add needed requirements and checksums. Remove unused ones. Includes test imports."
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
                                "go mod download",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Download needed modules into the local cache."
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
                                "go mod verify",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Check whether cached module archives or extracted files changed after download."
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
                                "go list -m all",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "List the modules and versions selected for the build."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "go-mod-10",
            "type": "bulleted_list",
            "richText": [
                [
                    "Since Go 1.16, build commands normally leave "
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
                    " unchanged and report missing requirements."
                ]
            ]
        },
        {
            "id": "go-mod-10-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "go get",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " or "
                ],
                [
                    "go mod tidy",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to update dependencies."
                ]
            ]
        },
        {
            "id": "go-mod-10-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A build can download a module already listed in "
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
                    ". That does not add a new requirement."
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
            "type": "example",
            "example": {
                "title": "Dependency directive fragment",
                "language": "text",
                "description": [
                    "This illustrative `go.mod` uses example module paths and versions. The dependencies and replacement directories must exist for a real build."
                ],
                "code": "",
                "files": [
                    {
                        "name": "go.mod",
                        "language": "text",
                        "code": "require example.com/lib v1.2.3\nreplace example.com/lib => ../lib\nexclude example.com/other v1.3.0"
                    }
                ]
            }
        },
        {
            "id": "go-mod-13",
            "type": "bulleted_list",
            "richText": [
                [
                    "The local replacement uses "
                ],
                [
                    "../lib",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " instead of downloading "
                ],
                [
                    "example.com/lib",
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
            "id": "go-mod-13-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "That directory needs the correct "
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
            "id": "go-mod-13-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "replace",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " alone does not add a dependency. The module must also be required."
                ]
            ]
        },
        {
            "id": "go-mod-13-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go ignores replacements and exclusions from dependency modules. The "
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
                    " module controls them."
                ]
            ]
        },
        {
            "id": "go-mod-14",
            "type": "bulleted_list",
            "richText": [
                [
                    "Commit "
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
                    " and "
                ],
                [
                    "go.sum",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " when present."
                ]
            ]
        },
        {
            "id": "go-mod-14-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Review their changes after updating imports or running "
                ],
                [
                    "go mod tidy",
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
            "id": "go-mod-15",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not commit local replacement paths that other developers or release builds cannot use."
                ]
            ]
        },
        {
            "id": "go-mod-16",
            "type": "bulleted_list",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "go.mod",
                    [
                        [
                            "a",
                            "https://go.dev/doc/modules/gomod-ref"
                        ],
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " file reference",
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
            "type": "bulleted_list",
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
