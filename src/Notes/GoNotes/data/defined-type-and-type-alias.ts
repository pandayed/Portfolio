/* Copied from the Defined type and type alias page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "2ef24eb1-ed54-8042-8203-daa588d641d1",
    "slug": "defined-type-and-type-alias",
    "title": "Defined type and type alias",
    "updatedOn": "2026-01-21",
    "blocks": [
        {
            "id": "2ef24eb1-ed54-8009-b302-d0922aeaf724",
            "type": "sub_header",
            "richText": [
                [
                    "1. Defined type"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8063-b037-e78033f7e554",
            "type": "code",
            "richText": [
                [
                    "type MyInt int\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2ef24eb1-ed54-8042-9ba1-e8a5d233b21a",
            "type": "text",
            "richText": [
                [
                    "What this actually does",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-800b-aace-dbfd3e7a0c3b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Creates a "
                ],
                [
                    "new type",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8042-ab67-df7c8dc56608",
            "type": "bulleted_list",
            "richText": [
                [
                    "Underlying representation is "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80f8-bdda-e4e627225338",
            "type": "bulleted_list",
            "richText": [
                [
                    "Type identity is "
                ],
                [
                    "not ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "int",
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
            "id": "2ef24eb1-ed54-8058-9c45-e7c5fa7939ce",
            "type": "text",
            "richText": [
                [
                    "Consequences (very important)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8067-bc17-dd12080bfc8a",
            "type": "bulleted_list",
            "richText": [
                [
                    "MyInt",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " ≠ "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8065-b5aa-cf210082eb8f",
            "type": "bulleted_list",
            "richText": [
                [
                    "You cannot assign one to the other without conversion"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8021-afa8-e88f616e961f",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can define methods on "
                ],
                [
                    "MyInt",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8078-b9af-f4a9a357ca02",
            "type": "text",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80e9-addf-c48636ad564a",
            "type": "code",
            "richText": [
                [
                    "var a MyInt = 5\nvar b int = a      // ❌ compile error\nvar c int = int(a) // ✅ explicit conversion\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2ef24eb1-ed54-8098-9944-c3aea96e6ece",
            "type": "text",
            "richText": [
                [
                    "Why this exists",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80e3-baaf-e685969c2c40",
            "type": "bulleted_list",
            "richText": [
                [
                    "To create "
                ],
                [
                    "strongly-typed domains",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8082-b0cb-d4fc33072930",
            "type": "bulleted_list",
            "richText": [
                [
                    "To prevent accidental misuse of values"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8086-9b7a-de8df62fb7b6",
            "type": "text",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8026-bb74-de9bcd0d609b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Age vs Price vs Count"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-802d-bcdf-dd2942f5176e",
            "type": "bulleted_list",
            "richText": [
                [
                    "All are "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80bf-9f41-ec682c73c04d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Mixing them is a bug"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80ee-813f-c3e5fc793865",
            "type": "bulleted_list",
            "richText": [
                [
                    "Defined types stop that bug at compile time"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-806e-871c-f8fd7f1e7c39",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-80d6-bcc4-c9e6595943e0",
            "type": "sub_header",
            "richText": [
                [
                    "2. Type alias"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8017-ba5e-d4827152c6ac",
            "type": "code",
            "richText": [
                [
                    "type MyInt = int\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2ef24eb1-ed54-802c-964f-dda36383f455",
            "type": "text",
            "richText": [
                [
                    "What this actually does",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80a6-9d5f-f6af491654f7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Creates a "
                ],
                [
                    "new name",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8033-8bbf-d334e76a701d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Does NOT create a new type"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80a1-a390-ed83a766fd13",
            "type": "bulleted_list",
            "richText": [
                [
                    "MyInt",
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
                    "int",
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
                    "identical",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80b4-b3ef-d297c322fdcb",
            "type": "text",
            "richText": [
                [
                    "Consequences",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-803e-9516-d91648484fa3",
            "type": "bulleted_list",
            "richText": [
                [
                    "No conversion needed"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-807d-a708-c87355469c11",
            "type": "bulleted_list",
            "richText": [
                [
                    "No type safety added"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80e8-acad-cf44a25ba06a",
            "type": "bulleted_list",
            "richText": [
                [
                    "No methods can be added"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-809e-b6b8-d0c9c6a361cd",
            "type": "text",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80fa-83db-f7e495e98ce7",
            "type": "code",
            "richText": [
                [
                    "var a MyInt = 5\nvar b int = a // ✅ allowed\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2ef24eb1-ed54-8095-8be0-daf79d1ad513",
            "type": "text",
            "richText": [
                [
                    "Why this exists",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8051-8c09-f90f8fb6e0a4",
            "type": "bulleted_list",
            "richText": [
                [
                    "For "
                ],
                [
                    "code evolution",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80ce-bed6-df74f30fca42",
            "type": "bulleted_list",
            "richText": [
                [
                    "For "
                ],
                [
                    "readability",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-801c-b45b-cb734542b2fc",
            "type": "bulleted_list",
            "richText": [
                [
                    "For "
                ],
                [
                    "backward compatibility",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8034-8fbf-e0d2d6720994",
            "type": "text",
            "richText": [
                [
                    "Real use:"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8050-9401-fbec3d600723",
            "type": "bulleted_list",
            "richText": [
                [
                    "Renaming a type without breaking users"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8046-b4f2-eeea68634dac",
            "type": "bulleted_list",
            "richText": [
                [
                    "Gradual refactors"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80a7-a83c-ff3833c783ab",
            "type": "bulleted_list",
            "richText": [
                [
                    "Public API cleanup"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-809a-9a78-fd8e26e46e58",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-803f-b5b4-ceab37cbd9be",
            "type": "sub_header",
            "richText": [
                [
                    "3. Conversions in Go (critical concept)"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8012-836f-f0a974e97de2",
            "type": "text",
            "richText": [
                [
                    "Go rule",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-809b-8298-d37b52ebc88c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go does "
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
                    " do implicit conversions"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8040-a45e-f4dc9c4fd2ff",
            "type": "bulleted_list",
            "richText": [
                [
                    "Even if types have the same underlying representation"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80ae-8ceb-f62bdb532ba5",
            "type": "text",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80bc-901c-cdb86d281321",
            "type": "code",
            "richText": [
                [
                    "var a int32 = 10\nvar b int64 = a // ❌\nvar c int64 = int64(a) // ✅\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2ef24eb1-ed54-803a-9953-f180fb00bc2e",
            "type": "text",
            "richText": [
                [
                    "Why Go enforces this",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8099-bf9d-d04aeef8e0ad",
            "type": "bulleted_list",
            "richText": [
                [
                    "Prevents silent data loss"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8052-981f-d01dc88d6953",
            "type": "bulleted_list",
            "richText": [
                [
                    "Makes intent explicit"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80ed-bb36-f976790a6ed7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Eliminates hidden bugs"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80d8-b7ad-c4c3bc09b768",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-80c7-9063-fef1b8eccb96",
            "type": "sub_header",
            "richText": [
                [
                    "How defined types interact with conversion"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80ea-b5de-ec321fd5e095",
            "type": "code",
            "richText": [
                [
                    "type Meter int\ntype Second int\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2ef24eb1-ed54-806c-819f-e1a2b15e7d4c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Meter",
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
                    "Second",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " are both "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-801a-9454-eeff974ecde9",
            "type": "bulleted_list",
            "richText": [
                [
                    "They are "
                ],
                [
                    "not assignable",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8089-acbf-cf2dcbec62df",
            "type": "bulleted_list",
            "richText": [
                [
                    "You must convert explicitly"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80ad-a18f-c4301c808c91",
            "type": "text",
            "richText": [
                [
                    "This prevents:"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80fe-9766-da3f2c85fa66",
            "type": "bulleted_list",
            "richText": [
                [
                    "Adding seconds to meters"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80d7-8f61-e31c34f6637c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Passing wrong values to functions"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-808e-a92a-ceb5c3b25ade",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-807b-a0fa-f53b69d1f969",
            "type": "sub_header",
            "richText": [
                [
                    "Are they related?"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8045-adde-cbd761585a1f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Both use "
                ],
                [
                    "type",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8079-bfe6-dcc8abf0df95",
            "type": "bulleted_list",
            "richText": [
                [
                    "They do "
                ],
                [
                    "very different things",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80e3-9c98-e6b6996bf2c9",
            "type": "text",
            "richText": [
                [
                    "Precise relationship:"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8084-b7b8-f4899ed3d9f6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Defined type → new identity"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80c4-adb1-d011f7dbbaac",
            "type": "bulleted_list",
            "richText": [
                [
                    "Type alias → new name only"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8055-a249-e2c033e1d3a9",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-8049-80f2-d556afc16a0e",
            "type": "sub_header",
            "richText": [
                [
                    "When to use what (clear rules)"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80f4-b247-ea78b6d59064",
            "type": "text",
            "richText": [
                [
                    "Use defined type when",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8035-bd8f-fe1f12926ac9",
            "type": "bulleted_list",
            "richText": [
                [
                    "You want safety"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80ad-a479-fce8469922f1",
            "type": "bulleted_list",
            "richText": [
                [
                    "You want domain meaning"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-807e-8a0b-c753326eec2e",
            "type": "bulleted_list",
            "richText": [
                [
                    "You want methods"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80d5-9384-c2a8ddadd194",
            "type": "text",
            "richText": [
                [
                    "Use type alias when",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-801f-aa91-f6225c423530",
            "type": "bulleted_list",
            "richText": [
                [
                    "You want compatibility"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80a4-9af3-f3eb37a4963e",
            "type": "bulleted_list",
            "richText": [
                [
                    "You want rename-only behavior"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80ae-8880-d14eabff798f",
            "type": "bulleted_list",
            "richText": [
                [
                    "You want zero behavior change"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8000-b860-f93901f11acb",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-808d-8778-fe3ee0d8d8ad",
            "type": "sub_header",
            "richText": [
                [
                    "Common beginner confusion (important)"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-804a-94e3-ce3b1c948728",
            "type": "text",
            "richText": [
                [
                    "Wrong belief",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80b3-85b9-c641b56ba513",
            "type": "bulleted_list",
            "richText": [
                [
                    "“Alias is a lighter version of defined type”"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-801f-b317-c0c7e6401679",
            "type": "text",
            "richText": [
                [
                    "Correction",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-806e-b713-f73ea7185318",
            "type": "bulleted_list",
            "richText": [
                [
                    "Alias does "
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
                    " create a type at all"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80fb-a11a-cd0efabaeea8",
            "type": "bulleted_list",
            "richText": [
                [
                    "It is purely a naming mechanism"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8087-840f-cb23b5bab2cc",
            "type": "divider"
        },
        {
            "id": "2ef24eb1-ed54-80dc-ba39-c984ba33a455",
            "type": "sub_header",
            "richText": [
                [
                    "Final mental model"
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-802e-a7f6-d0529b7f8f52",
            "type": "bulleted_list",
            "richText": [
                [
                    "Defined type → "
                ],
                [
                    "new box",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80c5-8563-ee38d5b6309b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Alias → "
                ],
                [
                    "new label on the same box",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80b3-82af-c1559b565719",
            "type": "bulleted_list",
            "richText": [
                [
                    "Conversion → "
                ],
                [
                    "explicit permission to change boxes",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
