/* Copied from the Packages page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8094-af08-c4e58e8100d2",
    "slug": "packages",
    "title": "Packages",
    "updatedOn": "2026-01-23",
    "blocks": [
        {
            "id": "2f024eb1-ed54-80bd-9860-ef901c7877fb",
            "type": "bulleted_list",
            "richText": [
                [
                    "A "
                ],
                [
                    "package",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " is the unit of compilation and namespace in Go."
                ]
            ]
        },
        {
            "id": "2f024eb1-ed54-80f8-b411-cc010cc45dff",
            "type": "bulleted_list",
            "richText": [
                [
                    "A runnable program must have:"
                ]
            ],
            "children": [
                {
                    "id": "2f024eb1-ed54-802c-894c-e355a6390e22",
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
                    "id": "2f024eb1-ed54-803d-b108-e50201b76169",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "A "
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
                            " entry point (no parameters, no return values)."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24024eb1-ed54-80e2-ab1f-d206c7f0c7b8",
            "type": "bulleted_list",
            "richText": [
                [
                    "A group of "
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
                    " files in the same directory with the same "
                ],
                [
                    "package",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " declaration."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8095-9f0c-dbf8002b1385",
            "type": "bulleted_list",
            "richText": [
                [
                    "Used to organize and reuse code."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8098-ac12-fbe1b3691c8d",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8051-9c37-fe01737a77db",
            "type": "bulleted_list",
            "richText": [
                [
                    "package main",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ": Used to build executables. Must have "
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
        },
        {
            "id": "24024eb1-ed54-80a8-8d7d-e27b1419ef5c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Other packages (e.g., "
                ],
                [
                    "fmt",
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
                    "math",
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
                    "utils",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ") are libraries meant to be imported."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-807d-9efa-ec57f56bfa43",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80a7-9e87-da74e4e94154",
            "type": "bulleted_list",
            "richText": [
                [
                    "Identifiers starting with "
                ],
                [
                    "capital letters",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " are exported (public)."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80e2-8e83-d7cb6257e725",
            "type": "bulleted_list",
            "richText": [
                [
                    "Lowercase names are unexported (private to the package)."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8001-b93b-cd836157fe4c",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80fe-851c-fca287f5c4bb",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Directory  Package",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80eb-9398-fb8827d045f7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each directory "
                ],
                [
                    "typically",
                    [
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    " contains one package."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80a8-be0a-ed3ac0dace18",
            "type": "bulleted_list",
            "richText": [
                [
                    "A repo can have multiple directories → multiple packages."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8080-97ae-c42081f236f3",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-809c-802a-e3dfb922a342",
            "type": "sub_sub_header",
            "richText": [
                [
                    "package main",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80a1-83b6-e71815c2f08b",
            "type": "bulleted_list",
            "richText": [
                [
                    "When a project runs, the main function from the main package is executed, and hence is the starting point of the execution."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-802c-a406-edb6f6cf0a33",
            "type": "bulleted_list",
            "richText": [
                [
                    "Must have if you are building an executable go repo."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8004-b6d2-decdb8e3f82f",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8047-b974-cc186db59501",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Does Every Repo Need ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "package main",
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
                    "?",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80bd-a5d9-f8b2279d0533",
            "type": "bulleted_list",
            "richText": [
                [
                    "No",
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
            "id": "24024eb1-ed54-8031-a195-ed5621b5a426",
            "type": "bulleted_list",
            "richText": [
                [
                    "Only needed if you want to build an executable."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-809a-a764-d32e959f4f2b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Library-only repos can skip it."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80ff-8a99-f025aa178029",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8024-902b-f61dc8cd1ab0",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Can a Repo Have Multiple Packages?",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80b4-8c89-dbbd146de6c7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Yes",
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
            "id": "24024eb1-ed54-80cf-af4c-f2d39e7774cf",
            "type": "bulleted_list",
            "richText": [
                [
                    "Technically: each subdirectory can define its own package, and must do so for separation of concerns and logical segregation."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8049-8572-e9f70fe09a77",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-807f-a90f-c62c17111275",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Subpackages"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8053-a8a1-ded4ea6f639c",
            "type": "bulleted_list"
        },
        {
            "id": "2f124eb1-ed54-8077-955b-e1288b232f55",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go has no subpackages."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-807b-89e3-f7a751c46bd7",
            "type": "bulleted_list",
            "richText": [
                [
                    "A directory structure like "
                ],
                [
                    "package1/package2",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " does "
                ],
                [
                    "not",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " imply containment."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80b4-b553-e531530b8103",
            "type": "bulleted_list",
            "richText": [
                [
                    "package1",
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
                    "package2",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " are "
                ],
                [
                    "two independent packages",
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
            "id": "2f124eb1-ed54-8053-b61a-c81c3ad221e4",
            "type": "bulleted_list",
            "richText": [
                [
                    "package1",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " must explicitly import "
                ],
                [
                    "package2",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to use it."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-806a-bd9b-fa7ddeb4d2f1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go does not treat import paths as hierarchical relationships."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80df-b488-ff15f8047377",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go treats the full import path as a "
                ],
                [
                    "flat identifier",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not a hierarchy."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80b2-96c6-d2b7b0252af3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The module root only defines the "
                ],
                [
                    "prefix",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " for import paths."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8008-9457-ec8ac715d762",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each package is identified solely by its "
                ],
                [
                    "full import path",
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
            "id": "2f124eb1-ed54-8011-8547-d4b1696d3feb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Any code that needs both packages must import both explicitly."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8006-a49b-df4fcde6baa3",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
