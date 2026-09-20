/* Copied from the Date & Time page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24e24eb1-ed54-808d-a0bc-d85fd9588363",
    "slug": "date-time",
    "title": "Date & Time",
    "updatedOn": "2025-08-15",
    "blocks": [
        {
            "id": "24e24eb1-ed54-8058-9ad0-fff6c17ecb51",
            "type": "sub_header",
            "richText": [
                [
                    "Quick Reference Code"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-802a-8feb-caa035319629",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    // Simulated fixed current time: 2025-08-15 15:30:00 IST\n    now := time.Date(2025, time.August, 15, 15, 30, 0, 123456789, time.FixedZone(\"IST\", 5*3600+1800))\n    fmt.Println(\"Now:\", now)\n    // Output: Now: 2025-08-15 15:30:00.123456789 +0530 IST\n\n    loc, _ := time.LoadLocation(\"Asia/Kolkata\")\n    t := time.Date(2025, time.August, 13, 14, 30, 0, 0, loc)\n    fmt.Println(\"Custom:\", t)\n    // Output: Custom: 2025-08-13 14:30:00 +0530 IST\n\n    fmt.Println(\"Formatted:\", t.Format(\"2006-01-02 15:04:05\"))\n    // Output: Formatted: 2025-08-13 14:30:00\n\n    parsed, _ := time.ParseInLocation(\"2006-01-02\", \"2025-08-13\", loc)\n    fmt.Println(\"Parsed:\", parsed)\n    // Output: Parsed: 2025-08-13 00:00:00 +0530 IST\n\n    fmt.Println(\"In UTC:\", t.UTC())\n    // Output: In UTC: 2025-08-13 09:00:00 +0000 UTC\n\n    fmt.Println(\"Two hours later:\", t.Add(2*time.Hour))\n    // Output: Two hours later: 2025-08-13 16:30:00 +0530 IST\n\n    fmt.Println(\"Two hours earlier:\", t.Add(-2*time.Hour))\n    // Output: Two hours earlier: 2025-08-13 12:30:00 +0530 IST\n\n    fmt.Println(\"Diff from now:\", time.Since(t))\n    // Output: Diff from now: 47h0m0.123456789s\n\n    fmt.Println(\"Is t before now?:\", t.Before(now))\n    // Output: Is t before now?: true\n\n    fmt.Println(\"Is t after now?:\", t.After(now))\n    // Output: Is t after now?: false\n\n    fmt.Println(\"Unix seconds:\", t.Unix())\n    // Output: Unix seconds: 1755075600\n\n    fmt.Println(\"Unix nanoseconds:\", t.UnixNano())\n    // Output: Unix nanoseconds: 1755075600000000000\n\n    startOfDay := time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location())\n    fmt.Println(\"Start of day:\", startOfDay)\n    // Output: Start of day: 2025-08-13 00:00:00 +0530 IST\n\n    fmt.Println(\"Truncated to hour:\", t.Truncate(time.Hour))\n    // Output: Truncated to hour: 2025-08-13 14:00:00 +0530 IST\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-8056-b71e-f40e42abd44f",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-801e-b115-ed98eb0e82f1",
            "type": "text"
        },
        {
            "id": "24e24eb1-ed54-8018-bbba-cd0840b25bcb",
            "type": "sub_header",
            "richText": [
                [
                    "Overview"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80d3-8764-d14926999a08",
            "type": "text",
            "richText": [
                [
                    "Go provides the "
                ],
                [
                    "time",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " package for working with:"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-800e-9c92-d2ff4800f178",
            "type": "bulleted_list",
            "richText": [
                [
                    "Instants in time",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " ("
                ],
                [
                    "time.Time",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ")"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-808a-b539-e68641bbed77",
            "type": "bulleted_list",
            "richText": [
                [
                    "Durations",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " ("
                ],
                [
                    "time.Duration",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ")"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8029-b2d9-c7dc538790fd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Time zones",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " ("
                ],
                [
                    "Location",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ")"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80b1-a951-cc81904179ed",
            "type": "bulleted_list",
            "richText": [
                [
                    "Formatting & parsing",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80a4-b6bf-c637e04a2789",
            "type": "bulleted_list",
            "richText": [
                [
                    "Timers, tickers, deadlines",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80b6-93bb-c03c22e8db60",
            "type": "text",
            "richText": [
                [
                    "time",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a "
                ],
                [
                    "standard library package",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " — no third-party dependency is required."
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8055-bd32-d8fdf74a26b0",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-80f3-816f-db7e9927d8a3",
            "type": "sub_header",
            "richText": [
                [
                    "Core Types"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8009-9663-dce3f37cc6b8",
            "type": "sub_sub_header",
            "richText": [
                [
                    "time.Time",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-802a-9278-d45b5a9550fb",
            "type": "text",
            "richText": [
                [
                    "Represents a "
                ],
                [
                    "single point in time",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " with:"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-804b-b09d-e9c99f37d8f1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Nanosecond precision"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-800e-901a-dcdb7729b99e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Associated "
                ],
                [
                    "location",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " (time zone)"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-801d-a194-d4a585a8899c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Stored internally as seconds + nanoseconds since "
                ],
                [
                    "Unix epoch",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " (1970-01-01 UTC)"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-806d-bf38-ddd6e8166846",
            "type": "text",
            "richText": [
                [
                    "Key methods:"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-806d-98af-fc677dc9e591",
            "type": "bulleted_list",
            "richText": [
                [
                    "t.Year()",
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
                    "t.Month()",
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
                    "t.Day()",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-806d-b583-c212c8658edb",
            "type": "bulleted_list",
            "richText": [
                [
                    "t.Hour()",
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
                    "t.Minute()",
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
                    "t.Second()",
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
                    "t.Nanosecond()",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80a9-85a7-f956186d2f76",
            "type": "bulleted_list",
            "richText": [
                [
                    "t.Weekday()",
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
                    "t.YearDay()",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8095-a433-e1f4baaf2013",
            "type": "bulleted_list",
            "richText": [
                [
                    "t.Location()",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8060-9834-df731f8698b3",
            "type": "bulleted_list",
            "richText": [
                [
                    "t.Unix()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " (seconds since epoch), "
                ],
                [
                    "t.UnixMilli()",
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
                    "t.UnixNano()",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80e4-b289-d4c4b30300f9",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-80d0-9742-ddf938e155ab",
            "type": "sub_sub_header",
            "richText": [
                [
                    "time.Duration",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80ab-b386-f70a36512c4c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Represents a length of time as "
                ],
                [
                    "nanoseconds",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80a1-8ee7-d3db7b3b7daf",
            "type": "bulleted_list",
            "richText": [
                [
                    "Type",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": "
                ],
                [
                    "int64",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8072-b989-d30b265a13cd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Constants: "
                ],
                [
                    "time.Nanosecond",
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
                    "time.Microsecond",
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
                    "time.Millisecond",
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
                    "time.Second",
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
                    "time.Minute",
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
                    "time.Hour",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8029-ad1b-e89099e956c4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Arithmetic: add/subtract from "
                ],
                [
                    "time.Time",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", multiply/divide durations"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80d2-81b1-ccc405423464",
            "type": "text",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8057-ba05-c4cef475fe7f",
            "type": "code",
            "richText": [
                [
                    "d := 2 * time.Hour + 30*time.Minute // 2h30m\nt2 := t1.Add(d)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-8034-b29a-d13ff127d7b4",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-8077-b69c-f459027208b0",
            "type": "sub_sub_header",
            "richText": [
                [
                    "time.Location",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-808b-83ad-da6467dff2aa",
            "type": "bulleted_list",
            "richText": [
                [
                    "Represents a "
                ],
                [
                    "time zone",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8060-bc94-c6b9c081ebf5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Contains rules for daylight saving time (DST)"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-800a-ad2b-e256187d0d54",
            "type": "bulleted_list",
            "richText": [
                [
                    "Common values: "
                ],
                [
                    "time.UTC",
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
                    "time.Local",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80a7-9815-d38d5791bdb2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Load custom zones: "
                ],
                [
                    "time.LoadLocation(\"America/New_York\")",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80b3-8876-f8e6af5cc1a3",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-8059-8041-c8becefe3aa0",
            "type": "sub_header",
            "richText": [
                [
                    "Getting Current Time"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80b6-8310-cd31f3464704",
            "type": "code",
            "richText": [
                [
                    "now := time.Now()         // local time\nutc := time.Now().UTC()   // convert to UTC"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-80cd-a886-f6ec40675fa7",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-80eb-9f4c-c89babc721f2",
            "type": "sub_header",
            "richText": [
                [
                    "Creating Specific Times"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8076-96e8-dd16812284b5",
            "type": "code",
            "richText": [
                [
                    "// year, month, day, hour, min, sec, nsec, location\nt := time.Date(2025, time.August, 13, 14, 30, 0, 0, time.UTC)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-80e0-8fdf-e58922812e34",
            "type": "text",
            "richText": [
                [
                    "Months",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " are constants: "
                ],
                [
                    "time.January",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " … "
                ],
                [
                    "time.December",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8061-a680-d6c35485f6b4",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-80d7-9f82-c731cddd3399",
            "type": "sub_header",
            "richText": [
                [
                    "Time Arithmetic"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8043-892e-c52838ee1f73",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Adding & Subtracting"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-809b-b6a4-d0d8c0481cae",
            "type": "code",
            "richText": [
                [
                    "t2 := t1.Add(72 * time.Hour)       // Add duration\ndiff := t2.Sub(t1)                 // returns time.Duration\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-80a8-889a-c1f27714d909",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Comparing"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-808a-ba64-f8ef4cb6338a",
            "type": "code",
            "richText": [
                [
                    "t1.Before(t2)   // true/false\nt1.After(t2)\nt1.Equal(t2)    // also compares location\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-8094-8887-c7f3997f68bc",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-8035-b694-f334b66f473a",
            "type": "sub_header",
            "richText": [
                [
                    "Formatting Time"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-807f-b2d4-d1fe59c3439d",
            "type": "text",
            "richText": [
                [
                    "Go uses a "
                ],
                [
                    "reference layout",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " instead of placeholders:"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-805d-8e1e-d044806adc03",
            "type": "code",
            "richText": [
                [
                    "Mon Jan 2 15:04:05 MST 2006"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "24e24eb1-ed54-8026-ad00-d1086b44ec2f",
            "type": "bulleted_list",
            "richText": [
                [
                    "You must use this exact reference date in your layout."
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8096-80c8-d9e9b59bd0a7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each part maps to a time component."
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-808a-8787-d0e08c6a0d0e",
            "type": "text",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8076-95bf-ce2c268a516c",
            "type": "code",
            "richText": [
                [
                    "t.Format(\"2006-01-02 15:04:05\")   // \"2025-08-13 14:30:00\"\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-80fb-a894-f5884c5aea1d",
            "type": "text",
            "richText": [
                [
                    "Common layout tokens:"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-808b-9dcf-ce2638dcdd56",
            "type": "table",
            "children": [
                {
                    "id": "24e24eb1-ed54-80c5-b0bd-dacd85fe666d",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "Layout Part"
                            ]
                        ],
                        "VtEU": [
                            [
                                "Meaning"
                            ]
                        ]
                    }
                },
                {
                    "id": "24e24eb1-ed54-804b-a1a7-cc13c4418a9d",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "2006"
                            ]
                        ],
                        "VtEU": [
                            [
                                "Year"
                            ]
                        ]
                    }
                },
                {
                    "id": "24e24eb1-ed54-80cd-85b0-e6a889e0af40",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "06"
                            ]
                        ],
                        "VtEU": [
                            [
                                "Year (2 digits)"
                            ]
                        ]
                    }
                },
                {
                    "id": "24e24eb1-ed54-80d1-86f9-dc19f696649b",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "01"
                            ]
                        ],
                        "VtEU": [
                            [
                                "Month (2 digits)"
                            ]
                        ]
                    }
                },
                {
                    "id": "24e24eb1-ed54-80eb-a7c0-d0cc7fa1fb4d",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "Jan"
                            ]
                        ],
                        "VtEU": [
                            [
                                "Month (short)"
                            ]
                        ]
                    }
                },
                {
                    "id": "24e24eb1-ed54-8010-94ca-e47bfb53267e",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "January"
                            ]
                        ],
                        "VtEU": [
                            [
                                "Month (full)"
                            ]
                        ]
                    }
                },
                {
                    "id": "24e24eb1-ed54-8082-8097-f55751e61b9a",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "02"
                            ]
                        ],
                        "VtEU": [
                            [
                                "Day of month"
                            ]
                        ]
                    }
                },
                {
                    "id": "24e24eb1-ed54-80a0-a65e-d5d2c3b6a1ac",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "Mon"
                            ]
                        ],
                        "VtEU": [
                            [
                                "Day of week (short)"
                            ]
                        ]
                    }
                },
                {
                    "id": "24e24eb1-ed54-8063-b959-ece5f124648e",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "Monday"
                            ]
                        ],
                        "VtEU": [
                            [
                                "Day of week (full)"
                            ]
                        ]
                    }
                },
                {
                    "id": "24e24eb1-ed54-808f-88c5-ed665d2e2266",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "15"
                            ]
                        ],
                        "VtEU": [
                            [
                                "Hour (24h)"
                            ]
                        ]
                    }
                },
                {
                    "id": "24e24eb1-ed54-80a9-8c5a-c8f54d539c92",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "03"
                            ]
                        ],
                        "VtEU": [
                            [
                                "Hour (12h)"
                            ]
                        ]
                    }
                },
                {
                    "id": "24e24eb1-ed54-80ae-b0fb-d23577608d89",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "04"
                            ]
                        ],
                        "VtEU": [
                            [
                                "Minute"
                            ]
                        ]
                    }
                },
                {
                    "id": "24e24eb1-ed54-80ff-a200-e1da17d6a6de",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "05"
                            ]
                        ],
                        "VtEU": [
                            [
                                "Second"
                            ]
                        ]
                    }
                },
                {
                    "id": "24e24eb1-ed54-8008-bd91-f76d5f19f932",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "PM"
                            ]
                        ],
                        "VtEU": [
                            [
                                "AM/PM"
                            ]
                        ]
                    }
                },
                {
                    "id": "24e24eb1-ed54-80d7-b0a2-fa651be8366f",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "MST"
                            ]
                        ],
                        "VtEU": [
                            [
                                "Time zone abbrev."
                            ]
                        ]
                    }
                },
                {
                    "id": "24e24eb1-ed54-8097-9595-ccfdb4faae9d",
                    "type": "table_row",
                    "cells": {
                        ";QkQ": [
                            [
                                "-0700"
                            ]
                        ],
                        "VtEU": [
                            [
                                "Time zone offset"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                ";QkQ",
                "VtEU"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24e24eb1-ed54-8094-9f0b-cc83b1daac95",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-80ab-8182-eaf5d5f2e876",
            "type": "sub_header",
            "richText": [
                [
                    "Parsing Strings to Time"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80c7-9adc-dade5c159bd4",
            "type": "code",
            "richText": [
                [
                    "layout := \"2006-01-02 15:04:05\"\nt, err := time.Parse(layout, \"2025-08-13 14:30:00\") // in UTC\n\n// Parse with location\nloc, _ := time.LoadLocation(\"Asia/Kolkata\")\nt, err := time.ParseInLocation(layout, \"2025-08-13 14:30:00\", loc)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-8002-ab26-e2a46aee7c50",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-80e2-8e42-ceb224c9fdc7",
            "type": "sub_header",
            "richText": [
                [
                    "Working with Time Zones"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80e6-8300-f920c7ebe933",
            "type": "code",
            "richText": [
                [
                    "loc, _ := time.LoadLocation(\"America/New_York\")\ntInNY := t.In(loc)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-80e4-8f95-d0ed7af18d80",
            "type": "text",
            "richText": [
                [
                    "Note:"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8058-b8bf-ed65c12f9ae3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Parsing without location → UTC"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8023-87ff-e0d27db021b5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Parsing with location → specified zone rules apply"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-807f-80b0-de79f2d53466",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-80e0-b7d6-f808602aef1b",
            "type": "sub_header",
            "richText": [
                [
                    "Durations in Detail"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8004-9313-cd79e63dc539",
            "type": "bulleted_list",
            "richText": [
                [
                    "Arithmetic:"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80fe-8787-d02cb7b1df70",
            "type": "code",
            "richText": [
                [
                    "twoHours := 2 * time.Hour\nt.Add(twoHours)\nt.Add(-30 * time.Minute)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-8049-88c4-eb92a3154163",
            "type": "bulleted_list",
            "richText": [
                [
                    "Conversion:"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8007-9365-de534f433715",
            "type": "code",
            "richText": [
                [
                    "fmt.Println(d.Hours(), d.Minutes(), d.Seconds())"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-809d-a3e5-d6617294e084",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-80cf-ac42-e24639d467a3",
            "type": "sub_header",
            "richText": [
                [
                    "Sleep, Timers, and Tickers"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-807b-a0d9-e5911fee270a",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Sleep"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-806a-a25b-de626d2cc27b",
            "type": "code",
            "richText": [
                [
                    "time.Sleep(2 * time.Second)\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-80ec-9510-fa467e2f68a4",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Timer"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8025-b64f-f7e22e4d2a94",
            "type": "text",
            "richText": [
                [
                    "Executes once after a delay:"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-807a-adb8-f324e2842605",
            "type": "code",
            "richText": [
                [
                    "timer := time.NewTimer(5 * time.Second)\n<-timer.C  // blocks until fired\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-80e3-ac2d-e5cd502abe86",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Ticker"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8013-ae4c-cd9f8e9575eb",
            "type": "text",
            "richText": [
                [
                    "Executes repeatedly:"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-804a-8e16-d21ba10c2c0f",
            "type": "code",
            "richText": [
                [
                    "ticker := time.NewTicker(1 * time.Minute)\nfor t := range ticker.C {\n    fmt.Println(\"Tick at\", t)\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-807c-85d6-f1f0f767f007",
            "type": "text",
            "richText": [
                [
                    "Stop with "
                ],
                [
                    "ticker.Stop()",
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
            "id": "24e24eb1-ed54-8086-b78a-e71e93994c3d",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-802b-a63f-e8f5bfe70050",
            "type": "sub_header",
            "richText": [
                [
                    "Deadlines & Timeouts"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8028-8a90-e8e255c25ee0",
            "type": "sub_sub_header",
            "richText": [
                [
                    "With Channels"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-805d-bf88-f2eb71ff0073",
            "type": "code",
            "richText": [
                [
                    "select {\ncase <-ch:\ncase <-time.After(2 * time.Second):\n    fmt.Println(\"timeout\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-80c7-8c69-e3b403d69222",
            "type": "sub_sub_header",
            "richText": [
                [
                    "With Context"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80e6-bc9a-e082926611d5",
            "type": "code",
            "richText": [
                [
                    "ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)\ndefer cancel()\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-809f-8863-ea86faee8174",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-80e9-a74c-d8f88ad67c15",
            "type": "sub_header",
            "richText": [
                [
                    "UTC vs Local Pitfalls"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8005-98b0-d4639f44c29e",
            "type": "bulleted_list",
            "richText": [
                [
                    "time.Now()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → "
                ],
                [
                    "local time",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " by default."
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80b3-b6bb-f546e238a043",
            "type": "bulleted_list",
            "richText": [
                [
                    "If consistent cross-region results are needed, prefer "
                ],
                [
                    "UTC",
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
            "id": "24e24eb1-ed54-806a-a570-c2d4de439e78",
            "type": "bulleted_list",
            "richText": [
                [
                    "Conversions:"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-802a-bc36-dc7a05b8bf24",
            "type": "code",
            "richText": [
                [
                    "t.UTC()\nt.Local()"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24e24eb1-ed54-8072-b8e7-d03db7b31712",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-80ce-97e6-d6dff63c6de9",
            "type": "sub_header",
            "richText": [
                [
                    "Best Practices"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-804d-9d7d-d985b87543a7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Store timestamps in UTC in databases → convert to local only for display."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80cb-889d-ee6a61b52e78",
            "type": "bulleted_list",
            "richText": [
                [
                    "Always specify layouts explicitly when parsing."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80a4-9623-edf059ed560c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Avoid hardcoding offsets — use "
                ],
                [
                    "LoadLocation",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " for DST correctness."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80a0-99e4-c23b2f06375a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "time.Duration",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " constants for readability ("
                ],
                [
                    "time.Minute",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " not "
                ],
                [
                    "60*time.Second",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ")."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80f2-afad-d299801b8fdd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Be careful with equality checks — location matters."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80d7-b38b-e77b7d36f6be",
            "type": "bulleted_list",
            "richText": [
                [
                    "For measuring elapsed time, use "
                ],
                [
                    "time.Since(start)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " instead of subtracting manually."
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8081-9d21-c05e5a15b10c",
            "type": "divider"
        },
        {
            "id": "24e24eb1-ed54-806f-a9a7-f3246ec7fcdc",
            "type": "sub_header",
            "richText": [
                [
                    "Common Gotchas"
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-80b2-8c6b-cba36f7ddb17",
            "type": "bulleted_list",
            "richText": [
                [
                    "Layout must be "
                ],
                [
                    "\"2006-01-02 15:04:05\"",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", not "
                ],
                [
                    "\"YYYY-MM-DD HH:mm:ss\"",
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
            "id": "24e24eb1-ed54-809e-a356-e835e5894494",
            "type": "bulleted_list",
            "richText": [
                [
                    "Parse",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " ignores location — always use "
                ],
                [
                    "ParseInLocation",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " if needed."
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8003-b693-ce3c450292a9",
            "type": "bulleted_list",
            "richText": [
                [
                    "AddDate(years, months, days)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " handles month boundaries; "
                ],
                [
                    "Add()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " with duration doesn’t."
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8097-9de7-dc35273b6687",
            "type": "bulleted_list",
            "richText": [
                [
                    "Duration overflow is possible if calculations exceed "
                ],
                [
                    "int64",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " nanoseconds (~290 years)."
                ]
            ]
        },
        {
            "id": "24e24eb1-ed54-8076-838f-faa4aa526941",
            "type": "divider"
        }
    ]
} as const satisfies GoNote;

export default note;
