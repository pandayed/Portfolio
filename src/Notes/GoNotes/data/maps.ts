/* Focused Go study notes, refined from the imported source. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8096-9741-edb8eca726fb",
    "slug": "maps",
    "title": "Maps",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "3130dc2a-e005-517a-8013-1ebd37ab9c43",
            "type": "bulleted_list",
            "richText": [
                [
                    "A map stores key-value pairs."
                ]
            ]
        },
        {
            "id": "698c596e-2fae-520c-8463-1959bb6891cb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Keys must be comparable. This means they support comparison with "
                ],
                [
                    "==",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ". Strings and integers can be keys."
                ]
            ]
        },
        {
            "id": "3e1754c8-3a97-5cc6-ad92-ff731eaf6aff",
            "type": "bulleted_list",
            "richText": [
                [
                    "Values can have any type."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8047-935c-cc5e36842afa",
            "type": "sub_header",
            "richText": [
                [
                    "Declaring Maps"
                ]
            ]
        },
        {
            "id": "6216d8f2-5878-5161-acdd-0d32a3b6bc7f",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "empty := make(map[string]int)\nfruit := map[string]int{\n    \"apple\": 5,\n    \"banana\": 10,\n}\nfmt.Println(empty == nil, len(empty)) // false 0\nfmt.Println(fruit[\"apple\"])           // 5"
                ]
            ]
        },
        {
            "id": "abb42931-40c5-58e8-96bd-147906204672",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "make",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " or a map literal to create a map you can write to."
                ]
            ]
        },
        {
            "id": "7dcb3d95-aae5-5fa9-8f36-faeabfc411a2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The number in "
                ],
                [
                    "make(map[string]int, 100)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a size hint."
                ]
            ]
        },
        {
            "id": "3d1ae801-2b93-5d86-9a10-a3f91155587b",
            "type": "bulleted_list",
            "richText": [
                [
                    "It does not add 100 entries or limit the map to 100 entries."
                ]
            ]
        },
        {
            "id": "5887e928-e395-5ab9-94ff-4e048a42216f",
            "type": "bulleted_list",
            "richText": [
                [
                    "The Go runtime decides how to allocate the map’s storage."
                ]
            ]
        },
        {
            "id": "12c727b1-4307-55e3-9436-1b26169a791f",
            "type": "sub_header",
            "richText": [
                [
                    "Nil versus empty maps"
                ]
            ]
        },
        {
            "id": "99f7cb88-f28a-5e5d-8a9d-baf0b7d60c01",
            "type": "bulleted_list",
            "richText": [
                [
                    "A map’s "
                ],
                [
                    "zero value",
                    [
                        [
                            "a",
                            "#/notes/go/zero-values"
                        ]
                    ]
                ],
                [
                    " is nil."
                ]
            ]
        },
        {
            "id": "fe5c86b5-9ffa-56ac-aed7-c04a0bb2f41c",
            "type": "bulleted_list",
            "richText": [
                [
                    "A nil map and an empty map both have length 0."
                ]
            ]
        },
        {
            "id": "ab72658f-5c3e-5385-9cda-33dff03fa764",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can add entries only after the map has been initialized."
                ]
            ]
        },
        {
            "id": "6c502c12-3699-5851-b1b5-3d46fed11b06",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1",
                "col-2"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "b8cbd12c-3442-5f02-9732-a6f19eed11c3",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Operation"
                            ]
                        ],
                        "col-1": [
                            [
                                "Nil map"
                            ]
                        ],
                        "col-2": [
                            [
                                "Initialized empty map"
                            ]
                        ]
                    }
                },
                {
                    "id": "d1e777cf-d486-564a-a1db-b2d4fe5c2c9a",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Lookup "
                            ],
                            [
                                "m[key]",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Returns the value type’s zero value."
                            ]
                        ],
                        "col-2": [
                            [
                                "Returns the value type’s zero value."
                            ]
                        ]
                    }
                },
                {
                    "id": "48a2284d-f7cb-51fe-bd8d-f62b1ac2fe79",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Lookup "
                            ],
                            [
                                "value, ok := m[key]",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Zero value and false."
                            ]
                        ],
                        "col-2": [
                            [
                                "Zero value and false."
                            ]
                        ]
                    }
                },
                {
                    "id": "8575f94b-da6c-5d3e-acfb-e6d9381ae093",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "len(m)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "0"
                            ]
                        ],
                        "col-2": [
                            [
                                "0"
                            ]
                        ]
                    }
                },
                {
                    "id": "fc150932-d45b-5cd8-99ec-9d5fec7e9ac6",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "range m",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "No iterations."
                            ]
                        ],
                        "col-2": [
                            [
                                "No iterations."
                            ]
                        ]
                    }
                },
                {
                    "id": "66e9525e-c811-59a2-9926-f11b3b980f84",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "delete(m, key)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "No effect."
                            ]
                        ],
                        "col-2": [
                            [
                                "No effect for a missing key."
                            ]
                        ]
                    }
                },
                {
                    "id": "c7bb9cc9-30ba-54de-abcc-1170947f5601",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "clear(m)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " (Go 1.21+)"
                            ]
                        ],
                        "col-1": [
                            [
                                "No effect."
                            ]
                        ],
                        "col-2": [
                            [
                                "Deletes any entries."
                            ]
                        ]
                    }
                },
                {
                    "id": "561d6a37-8615-5d5a-a6cb-7880173962b5",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "m[key] = value",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Panics."
                            ]
                        ],
                        "col-2": [
                            [
                                "Inserts the entry."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "604c0684-dec2-53d0-9ce8-897f1d40012a",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "var counts map[string]int\nif counts == nil {\n    counts = make(map[string]int)\n}\ncounts[\"a\"] = 1\nfmt.Println(counts[\"a\"]) // 1"
                ]
            ]
        },
        {
            "id": "686df60a-b123-5ec4-a8c0-d1972fb68fe4",
            "type": "bulleted_list",
            "richText": [
                [
                    "An API can use nil to mean that no map was provided."
                ]
            ]
        },
        {
            "id": "96ea7cb8-690f-5d6d-9875-e32873e4cae2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go does not require this meaning. The API decides how to treat nil and empty maps."
                ]
            ]
        },
        {
            "id": "b087747d-e007-5be3-b783-7d8d9f548e96",
            "type": "sub_header",
            "richText": [
                [
                    "Lookup, insertion, and update"
                ]
            ]
        },
        {
            "id": "ebcb2c5b-ac1c-5e94-bf1a-36e3f6c5afbe",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "fruit := map[string]int{\"apple\": 5}\nfruit[\"apple\"] = 10 // update\nfruit[\"banana\"] = 2 // insert\nfmt.Println(fruit[\"apple\"])  // 10\nfmt.Println(fruit[\"orange\"]) // 0\n\nvalue, ok := fruit[\"orange\"]\nfmt.Println(value, ok) // 0 false"
                ]
            ]
        },
        {
            "id": "9d8eb708-dd29-5063-9775-a65c450697d5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "value, ok := m[key]",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to check whether the key exists."
                ]
            ]
        },
        {
            "id": "def99714-be07-5186-8e04-de5debd31846",
            "type": "bulleted_list",
            "richText": [
                [
                    "A value of 0 alone does not tell you whether the key is missing."
                ]
            ]
        },
        {
            "id": "6e5521d2-3270-5977-ae47-2f84b880c89d",
            "type": "sub_header",
            "richText": [
                [
                    "Deleting entries and counting them"
                ]
            ]
        },
        {
            "id": "8e859594-e8a8-5f35-8cb6-1888e089c27e",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "fruit := map[string]int{\"apple\": 5, \"banana\": 10}\ndelete(fruit, \"apple\")\ndelete(fruit, \"missing\") // safe\nfmt.Println(len(fruit)) // 1\nclear(fruit)            // Go 1.21 or later\nfmt.Println(len(fruit)) // 0"
                ]
            ]
        },
        {
            "id": "da2d2223-0690-58b5-94e3-7eedc69680f3",
            "type": "sub_header",
            "richText": [
                [
                    "Iteration order"
                ]
            ]
        },
        {
            "id": "0bd9c8df-d934-525c-90a5-4d0fcc1879dc",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go does not guarantee the order of map iteration. The order can change each time."
                ]
            ]
        },
        {
            "id": "a031ff96-d180-5ccc-8adb-dd12db1b2de4",
            "type": "bulleted_list",
            "richText": [
                [
                    "If you need a fixed order, collect the keys in a slice and sort them."
                ]
            ]
        },
        {
            "id": "8957acde-df1d-5663-92fa-8aee0a72b17d",
            "type": "bulleted_list",
            "richText": [
                [
                    "See "
                ],
                [
                    "Range & For Loops",
                    [
                        [
                            "a",
                            "#/notes/go/range-for-loops"
                        ]
                    ]
                ],
                [
                    " for key/value iteration."
                ]
            ]
        },
        {
            "id": "59a974c2-1205-591f-9b6d-e0a9e7913e32",
            "type": "sub_header",
            "richText": [
                [
                    "Assignment and function arguments"
                ]
            ]
        },
        {
            "id": "e678b825-3dcc-585b-a232-a3b7a0ecce54",
            "type": "bulleted_list",
            "richText": [
                [
                    "Assignment copies the map value. Passing a map to a function also copies the map value."
                ]
            ]
        },
        {
            "id": "0f33d084-656b-5376-98ca-948300d51d98",
            "type": "bulleted_list",
            "richText": [
                [
                    "The copies refer to the same map data. Adding, changing, or deleting an entry affects the shared map."
                ]
            ]
        },
        {
            "id": "fcc3dee6-4efc-5840-8fd9-1f4a5d22b96a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Assigning a different map to a function parameter changes only that parameter. The caller’s variable still refers to its original map."
                ]
            ]
        },
        {
            "id": "596980d5-58cc-5aa4-9e19-9f824769d73e",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\nfunc change(m map[string]int) {\n    m[\"a\"] = 100\n    m = map[string]int{\"b\": 2} // replaces only the parameter\n}\n\nfunc main() {\n    m1 := map[string]int{\"a\": 1}\n    m2 := m1\n    m2[\"a\"] = 10\n    change(m1)\n    fmt.Println(m1[\"a\"]) // 100\n    _, ok := m1[\"b\"]\n    fmt.Println(ok)      // false\n}"
                ]
            ]
        },
        {
            "id": "12aacaf5-fef6-5bfd-807c-e251b26cafa3",
            "type": "sub_header",
            "richText": [
                [
                    "Comparison"
                ]
            ]
        },
        {
            "id": "3a454102-e37a-5f2b-9d3d-34ec8df552b5",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can compare a map with "
                ],
                [
                    "nil",
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
            "id": "19b1c7e5-25f3-558a-a9d1-842f9ead28c0",
            "type": "bulleted_list",
            "richText": [
                [
                    "You cannot compare two maps with "
                ],
                [
                    "==",
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
            "id": "fccda2fb-0637-501e-ba14-b60bf4fb5da8",
            "type": "bulleted_list",
            "richText": [
                [
                    "To check whether two maps have the same contents, compare their entries."
                ]
            ]
        },
        {
            "id": "56ffb695-5cb5-50ed-8f78-12d7bfcd5ed9",
            "type": "sub_header",
            "richText": [
                [
                    "Maps with slice or struct values"
                ]
            ]
        },
        {
            "id": "9ebc9515-5001-5757-9f6a-cbcc4474d4e8",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "groups := map[string][]int{\n    \"evens\": {2, 4},\n}\ngroups[\"evens\"] = append(groups[\"evens\"], 6)\nfmt.Println(groups[\"evens\"]) // [2 4 6]"
                ]
            ]
        },
        {
            "id": "411b20e4-d1f4-52f9-b12e-0790597add4c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Reading a struct from a map gives you a copy of that struct."
                ]
            ]
        },
        {
            "id": "49b7bbb6-2d53-5114-89f4-46bf7eaed7a8",
            "type": "bulleted_list",
            "richText": [
                [
                    "To change a field, change the copy and assign it back to the map."
                ]
            ]
        },
        {
            "id": "8d8610c1-bc33-503c-bd2a-40c84496c422",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "type Person struct {\n    Age int\n}\npeople := map[string]Person{\"Alice\": {Age: 30}}\nperson := people[\"Alice\"]\nperson.Age++\npeople[\"Alice\"] = person\nfmt.Println(people[\"Alice\"].Age) // 31"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80ee-b8ed-f2b48f88af65",
            "type": "sub_header",
            "richText": [
                [
                    "Concurrent Map Access"
                ]
            ]
        },
        {
            "id": "1f842927-aef4-540b-80ab-c5ff79cb8f0c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Multiple goroutines can read a map at the same time if none of them changes it."
                ]
            ]
        },
        {
            "id": "2e6927a8-d320-5dc1-98b5-ec29c4f93f37",
            "type": "bulleted_list",
            "richText": [
                [
                    "Reading while another goroutine writes requires synchronization, such as a lock."
                ]
            ]
        },
        {
            "id": "f44fb010-dfd8-5021-ae48-9f4dc6118260",
            "type": "bulleted_list",
            "richText": [
                [
                    "Writing from multiple goroutines also requires synchronization."
                ]
            ]
        },
        {
            "id": "9769ca9c-187b-5e8d-bfc2-efcbd039e949",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use the same lock for all related reads and writes."
                ]
            ]
        },
        {
            "id": "dcc92222-a42d-55f6-bdb2-62d89802ecd6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Another option is to let only one goroutine use the map."
                ]
            ]
        },
        {
            "id": "1e9c4282-3840-5e3d-bc38-53f34fd4ef90",
            "type": "text",
            "richText": [
                [
                    "See "
                ],
                [
                    "Mutex",
                    [
                        [
                            "a",
                            "#/notes/go/mutex"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "RWMutex",
                    [
                        [
                            "a",
                            "#/notes/go/rwmutex"
                        ]
                    ]
                ],
                [
                    " for locking examples."
                ]
            ]
        },
        {
            "id": "0f6d88f4-3c95-5419-a689-8d0755485dde",
            "type": "sub_sub_header",
            "richText": [
                [
                    "When to use sync.Map"
                ]
            ]
        },
        {
            "id": "bbd5a79d-afa9-5857-8a04-239df551e5ee",
            "type": "bulleted_list",
            "richText": [
                [
                    "sync.Map",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is useful for specific patterns of concurrent access."
                ]
            ]
        },
        {
            "id": "1dcaf843-cb2f-5d7c-b2cf-9832cd9632b7",
            "type": "bulleted_list",
            "richText": [
                [
                    "One pattern is writing each key once and reading it many times."
                ]
            ]
        },
        {
            "id": "d6f3b526-938e-5683-92bc-b9b19b551b9d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Another pattern is multiple goroutines working on separate sets of keys."
                ]
            ]
        },
        {
            "id": "6d140241-1a4c-536e-903c-ad55cb8c5d52",
            "type": "bulleted_list",
            "richText": [
                [
                    "A regular typed map with a lock is usually easier when map entries and other state must change together."
                ]
            ]
        },
        {
            "id": "7091275d-73bc-5317-a6f0-e68c7b409b07",
            "type": "bulleted_list",
            "richText": [
                [
                    "sync.Map",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is not always faster."
                ]
            ]
        },
        {
            "id": "af19adaa-d28e-590b-8c76-5b22413b4049",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "var shared sync.Map // zero value is ready for use\nshared.Store(\"a\", 1)\nvalue, ok := shared.Load(\"a\")\nfmt.Println(value, ok) // 1 true"
                ]
            ]
        },
        {
            "id": "e94927d5-07d7-5372-b078-ab1d1576d690",
            "type": "bulleted_list",
            "richText": [
                [
                    "Load",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns an interface value. You may need a type assertion to use it as a specific type."
                ]
            ]
        },
        {
            "id": "a11280cc-71ea-573c-97f3-ea6d1da26e20",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a checked type assertion if the stored type is uncertain."
                ]
            ]
        },
        {
            "id": "cb53997d-ecd8-55ae-929f-76ad1e8314cc",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not copy a "
                ],
                [
                    "sync.Map",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " after using it."
                ]
            ]
        },
        {
            "id": "6802ac53-d282-5d36-b50e-805f3356e5d2",
            "type": "text",
            "richText": [
                [
                    "References: "
                ],
                [
                    "Go maps in action",
                    [
                        [
                            "a",
                            "https://go.dev/blog/maps"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "sync.Map documentation",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/sync#Map"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        }
    ]
} satisfies GoNote;

export default note;
