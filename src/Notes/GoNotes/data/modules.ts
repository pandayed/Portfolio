/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8002-a487-ee1362bdf312",
    "slug": "modules",
    "title": "Modules",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "modules-01",
            "type": "bulleted_list",
            "richText": [
                [
                    "A module groups packages under one module path and version."
                ]
            ]
        },
        {
            "id": "modules-01-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Its root directory contains go.mod."
                ]
            ]
        },
        {
            "id": "modules-01-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A directory with another go.mod starts a separate module. Packages inside it belong to that module."
                ]
            ]
        },
        {
            "id": "modules-02",
            "type": "bulleted_list",
            "richText": [
                [
                    "For the terminology comparison, see "
                ],
                [
                    "Module vs Package",
                    [
                        [
                            "a",
                            "#/notes/go/module-vs-package"
                        ]
                    ]
                ],
                [
                    ". Directive details are on the go.mod page."
                ]
            ]
        },
        {
            "id": "modules-03",
            "type": "sub_header",
            "richText": [
                [
                    "Module layout"
                ]
            ]
        },
        {
            "id": "modules-04",
            "type": "code",
            "richText": [
                [
                    "shop/\n  go.mod                  # module example.com/shop\n  cmd/shop/main.go        # executable package\n  pricing/pricing.go      # package example.com/shop/pricing"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "modules-05",
            "type": "bulleted_list",
            "richText": [
                [
                    "The module path is the first part of each package import path."
                ]
            ]
        },
        {
            "id": "modules-05-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Here, import the pricing package as example.com/shop/pricing."
                ]
            ]
        },
        {
            "id": "modules-05-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The local folder name does not change that import path."
                ]
            ]
        },
        {
            "id": "modules-06",
            "type": "sub_header",
            "richText": [
                [
                    "Versions and repository boundaries"
                ]
            ]
        },
        {
            "id": "modules-07",
            "type": "bulleted_list",
            "richText": [
                [
                    "A module releases its packages together."
                ]
            ]
        },
        {
            "id": "modules-07-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Release tags commonly use semantic versions such as v1.2.3: major, minor, and patch."
                ]
            ]
        },
        {
            "id": "modules-08",
            "type": "bulleted_list",
            "richText": [
                [
                    "For v2 and later, the module path normally ends in /v2, /v3, and so on."
                ]
            ]
        },
        {
            "id": "modules-08-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Different major versions use different import paths because they may have incompatible APIs."
                ]
            ]
        },
        {
            "id": "modules-09",
            "type": "bulleted_list",
            "richText": [
                [
                    "A repository can have one module or several."
                ]
            ]
        },
        {
            "id": "modules-09-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each module has its own go.mod and can release its own versions."
                ]
            ]
        },
        {
            "id": "modules-10",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use one module when the packages release together."
                ]
            ]
        },
        {
            "id": "modules-10-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use separate modules when parts need independent releases or separate dependencies."
                ]
            ]
        },
        {
            "id": "modules-10-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Several modules add maintenance work. Use packages to organize code within one module."
                ]
            ]
        },
        {
            "id": "modules-11",
            "type": "sub_header",
            "richText": [
                [
                    "Main module"
                ]
            ]
        },
        {
            "id": "modules-12",
            "type": "bulleted_list",
            "richText": [
                [
                    "The main module is the module where you run a Go command."
                ]
            ]
        },
        {
            "id": "modules-12-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go usually finds its go.mod in the current directory or a parent directory."
                ]
            ]
        },
        {
            "id": "modules-12-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A workspace can list several main modules in go.work."
                ]
            ]
        },
        {
            "id": "modules-13",
            "type": "bulleted_list",
            "richText": [
                [
                    "Manifest commands and dependency requirements are covered in "
                ],
                [
                    "go.mod",
                    [
                        [
                            "a",
                            "#/notes/go/go-mod"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "modules-14",
            "type": "bulleted_list",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Go Modules Reference",
                    [
                        [
                            "a",
                            "https://go.dev/ref/mod#modules-overview"
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
