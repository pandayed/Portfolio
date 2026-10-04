/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8002-a487-ee1362bdf312",
    "slug": "modules",
    "title": "Modules",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "modules-01",
            "type": "text",
            "richText": [
                [
                    "A module groups packages under one module path and release version. Its root contains go.mod. Packages below a nested go.mod belong to that nested module instead."
                ]
            ]
        },
        {
            "id": "modules-02",
            "type": "text",
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
            "type": "text",
            "richText": [
                [
                    "The module path prefixes its package import paths. The pricing directory above is imported as example.com/shop/pricing, regardless of the local checkout directory name."
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
                    "A module release versions its packages together. Releases commonly use semantic version tags such as v1.2.3."
                ]
            ]
        },
        {
            "id": "modules-08",
            "type": "bulleted_list",
            "richText": [
                [
                    "For module versions v2 and later, the module path normally ends in /v2, /v3, and so on. This lets incompatible major versions have different import paths."
                ]
            ]
        },
        {
            "id": "modules-09",
            "type": "bulleted_list",
            "richText": [
                [
                    "A repository can contain one module or several modules. Each module has its own go.mod and can have its own versioned release."
                ]
            ]
        },
        {
            "id": "modules-10",
            "type": "bulleted_list",
            "richText": [
                [
                    "Start with one module when packages share a release cycle. Separate modules when independent releases or dependency boundaries justify the extra maintenance. Multiple modules are not required merely to organize code."
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
            "type": "text",
            "richText": [
                [
                    "Main module is official Go terminology. In a single-module operation, it is the module being developed, usually found from go.mod in the current directory or a parent. A workspace can include several main modules through go.work."
                ]
            ]
        },
        {
            "id": "modules-13",
            "type": "text",
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
            "type": "text",
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
