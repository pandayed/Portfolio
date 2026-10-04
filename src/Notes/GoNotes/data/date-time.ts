/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24e24eb1-ed54-808d-a0bc-d85fd9588363",
    "slug": "date-time",
    "title": "Date & Time",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "date-time-01",
            "type": "text",
            "richText": [
                [
                    "The standard time package provides instants, durations, zones, formatting, and timers."
                ]
            ]
        },
        {
            "id": "date-time-02",
            "type": "sub_header",
            "richText": [
                [
                    "Types and current time"
                ]
            ]
        },
        {
            "id": "date-time-03",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1"
            ],
            "hasColumnHeader": true,
            "children": [
                {
                    "id": "date-time-03-row-0",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Type"
                            ]
                        ],
                        "col-1": [
                            [
                                "Purpose"
                            ]
                        ]
                    }
                },
                {
                    "id": "date-time-03-row-1",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "time.Time"
                            ]
                        ],
                        "col-1": [
                            [
                                "An instant with an associated location and optional monotonic clock reading."
                            ]
                        ]
                    }
                },
                {
                    "id": "date-time-03-row-2",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "time.Duration"
                            ]
                        ],
                        "col-1": [
                            [
                                "An int64 count of nanoseconds. Use units such as time.Second, time.Minute, and time.Hour."
                            ]
                        ]
                    }
                },
                {
                    "id": "date-time-03-row-3",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "*time.Location"
                            ]
                        ],
                        "col-1": [
                            [
                                "A time zone and its offset-transition rules, including daylight saving where applicable."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "date-time-05",
            "type": "code",
            "richText": [
                [
                    "now := time.Now()       // current time in time.Local\nutc := now.UTC()        // same instant displayed in UTC\nd := 2*time.Hour + 30*time.Minute\nlater := now.Add(d)\n_ = utc\n_ = later"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "date-time-06",
            "type": "text",
            "richText": [
                [
                    "Time accessors include Year, Month, Day, Hour, Minute, Second, Nanosecond, Weekday, YearDay, and Location. Do not assume time.Time is stored as a Unix timestamp internally; use its public methods."
                ]
            ]
        },
        {
            "id": "date-time-07",
            "type": "sub_header",
            "richText": [
                [
                    "Fixed times and duration arithmetic"
                ]
            ]
        },
        {
            "id": "date-time-08",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    zone := time.FixedZone(\"IST\", 5*3600+1800)\n    earlier := time.Date(2025, time.August, 13, 14, 30, 0, 0, zone)\n    later := time.Date(2025, time.August, 15, 15, 30, 0, 123456789, zone)\n    fmt.Println(later.Sub(earlier))\n    fmt.Println(earlier.Add(2*time.Hour).Format(\"15:04\"))\n    fmt.Println(earlier.Add(-2*time.Hour).Format(\"15:04\"))\n    fmt.Println(earlier.Before(later), earlier.After(later))\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "date-time-09",
            "type": "text",
            "richText": [
                [
                    "Expected output:"
                ]
            ]
        },
        {
            "id": "date-time-10",
            "type": "code",
            "richText": [
                [
                    "49h0m0.123456789s\n16:30\n12:30\ntrue false"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "date-time-11",
            "type": "text",
            "richText": [
                [
                    "Sub subtracts two supplied instants. Since(start) measures time from start to the actual current clock reading; its output cannot be fixed by declaring another variable named now. Duration conversions such as d.Hours(), d.Minutes(), and d.Seconds() return floating-point counts. Duration arithmetic can overflow its roughly 290-year range."
                ]
            ]
        },
        {
            "id": "date-time-12",
            "type": "text",
            "richText": [
                [
                    "The printed duration varies:"
                ]
            ]
        },
        {
            "id": "date-time-13",
            "type": "code",
            "richText": [
                [
                    "start := time.Now()\ntime.Sleep(10 * time.Millisecond)\nfmt.Println(time.Since(start))"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "date-time-14",
            "type": "sub_header",
            "richText": [
                [
                    "Comparing instants"
                ]
            ]
        },
        {
            "id": "date-time-15",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    utc := time.Date(2025, time.August, 13, 9, 0, 0, 0, time.UTC)\n    india := utc.In(time.FixedZone(\"IST\", 19800))\n    fmt.Println(utc.Equal(india))\n    fmt.Println(utc == india)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "date-time-16",
            "type": "text",
            "richText": [
                [
                    "Expected output: true, then false. Equal compares instants, including across locations. == also compares the location and any monotonic reading. Before and After compare order."
                ]
            ]
        },
        {
            "id": "date-time-17",
            "type": "sub_header",
            "richText": [
                [
                    "Formatting layouts"
                ]
            ]
        },
        {
            "id": "date-time-18",
            "type": "text",
            "richText": [
                [
                    "A layout shows how the reference date Mon Jan 2 15:04:05 MST 2006 should appear. Choose the components you need; YYYY and DD are not Go layout tokens. Use time.RFC3339 for timestamps with a numeric offset."
                ]
            ]
        },
        {
            "id": "date-time-19",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1"
            ],
            "hasColumnHeader": true,
            "children": [
                {
                    "id": "date-time-19-row-0",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Layout part"
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
                    "id": "date-time-19-row-1",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "2006 / 06"
                            ]
                        ],
                        "col-1": [
                            [
                                "Four-digit / two-digit year."
                            ]
                        ]
                    }
                },
                {
                    "id": "date-time-19-row-2",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "01 / Jan / January"
                            ]
                        ],
                        "col-1": [
                            [
                                "Numeric / short / full month."
                            ]
                        ]
                    }
                },
                {
                    "id": "date-time-19-row-3",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "02"
                            ]
                        ],
                        "col-1": [
                            [
                                "Two-digit day of month."
                            ]
                        ]
                    }
                },
                {
                    "id": "date-time-19-row-4",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Mon / Monday"
                            ]
                        ],
                        "col-1": [
                            [
                                "Short / full weekday."
                            ]
                        ]
                    }
                },
                {
                    "id": "date-time-19-row-5",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "15 / 03"
                            ]
                        ],
                        "col-1": [
                            [
                                "24-hour / 12-hour hour."
                            ]
                        ]
                    }
                },
                {
                    "id": "date-time-19-row-6",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "04 / 05"
                            ]
                        ],
                        "col-1": [
                            [
                                "Minute / second."
                            ]
                        ]
                    }
                },
                {
                    "id": "date-time-19-row-7",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "PM"
                            ]
                        ],
                        "col-1": [
                            [
                                "AM or PM marker."
                            ]
                        ]
                    }
                },
                {
                    "id": "date-time-19-row-8",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "MST / -0700 / -07:00"
                            ]
                        ],
                        "col-1": [
                            [
                                "Zone abbreviation / numeric offsets."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "date-time-21",
            "type": "code",
            "richText": [
                [
                    "t := time.Date(2025, time.August, 13, 14, 30, 0, 0, time.UTC)\nfmt.Println(t.Format(\"2006-01-02 15:04:05\"))\n// Expected: 2025-08-13 14:30:00"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "date-time-22",
            "type": "sub_header",
            "richText": [
                [
                    "Parsing and time zones"
                ]
            ]
        },
        {
            "id": "date-time-23",
            "type": "text",
            "richText": [
                [
                    "Without zone information, Parse interprets input as UTC and ParseInLocation uses the supplied location. With an explicit offset or abbreviation, parsing uses that information and attempts to match zone rules. Parse uses time.Local for matching; ParseInLocation uses the supplied location. Unknown abbreviations can receive a zero offset, so numeric offsets or a known location are safer."
                ]
            ]
        },
        {
            "id": "date-time-24",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"log\"\n    \"time\"\n)\n\nfunc main() {\n    loc, err := time.LoadLocation(\"Asia/Kolkata\")\n    if err != nil {\n        log.Fatal(err)\n    }\n    const layout = \"2006-01-02 15:04:05\"\n    utc, err := time.Parse(layout, \"2025-08-13 14:30:00\")\n    if err != nil {\n        log.Fatal(err)\n    }\n    india, err := time.ParseInLocation(layout, \"2025-08-13 14:30:00\", loc)\n    if err != nil {\n        log.Fatal(err)\n    }\n    day, err := time.ParseInLocation(\"2006-01-02\", \"2025-08-13\", loc)\n    if err != nil {\n        log.Fatal(err)\n    }\n    fmt.Println(utc.Format(time.RFC3339))\n    fmt.Println(india.UTC().Format(time.RFC3339))\n    fmt.Println(day.Format(time.RFC3339))\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "date-time-25",
            "type": "text",
            "richText": [
                [
                    "Expected output, when the zone data is available:"
                ]
            ]
        },
        {
            "id": "date-time-26",
            "type": "code",
            "richText": [
                [
                    "2025-08-13T14:30:00Z\n2025-08-13T09:00:00Z\n2025-08-13T00:00:00+05:30"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "date-time-27",
            "type": "text",
            "richText": [
                [
                    "LoadLocation needs zone data and can fail. Use named zones such as America/New_York when daylight-saving rules matter. FixedZone uses one offset throughout the year. In(loc), UTC(), and Local() change the display location while preserving the instant. Use UTC or explicit offsets when exchanging timestamps, then convert for display. Retain the named zone when future calendar schedules depend on its rules."
                ]
            ]
        },
        {
            "id": "date-time-28",
            "type": "sub_header",
            "richText": [
                [
                    "Calendar days and rounding"
                ]
            ]
        },
        {
            "id": "date-time-29",
            "type": "text",
            "richText": [
                [
                    "Add adds a fixed duration. AddDate adds calendar years, months, and days in the time's location. A calendar day around a daylight-saving transition may be 23 or 25 hours. AddDate normalizes invalid dates rather than clamping them to month end."
                ]
            ]
        },
        {
            "id": "date-time-31",
            "type": "code",
            "richText": [
                [
                    "t := time.Date(2025, time.August, 13, 14, 30, 0, 0, time.FixedZone(\"IST\", 19800))\nstartOfDay := time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location())\nfmt.Println(startOfDay.Format(\"2006-01-02 15:04\"))\nfmt.Println(t.Truncate(time.Hour).Format(\"15:04\"))\n// Expected: 2025-08-13 00:00\n// Expected: 14:30"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "date-time-32",
            "type": "text",
            "richText": [
                [
                    "Truncate rounds the absolute duration since the zero time. It does not round the displayed local clock. For a half-hour zone, truncating this instant to an hour leaves the displayed minute at 30. Construct local midnight explicitly as above."
                ]
            ]
        },
        {
            "id": "date-time-33",
            "type": "sub_header",
            "richText": [
                [
                    "Unix timestamps"
                ]
            ]
        },
        {
            "id": "date-time-34",
            "type": "text",
            "richText": [
                [
                    "Unix, UnixMilli, and UnixNano return counts since 1970-01-01 UTC in different units. The result is independent of display location. UnixNano only represents a limited date range, approximately 1678–2262."
                ]
            ]
        },
        {
            "id": "date-time-35",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    t := time.Date(2025, time.August, 13, 9, 0, 0, 0, time.UTC)\n    fmt.Println(t.Unix())\n    fmt.Println(t.UnixNano())\n    fmt.Println(time.Unix(t.Unix(), 0).UTC().Format(time.RFC3339))\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "date-time-36",
            "type": "text",
            "richText": [
                [
                    "Expected output:"
                ]
            ]
        },
        {
            "id": "date-time-37",
            "type": "code",
            "richText": [
                [
                    "1755075600\n1755075600000000000\n2025-08-13T09:00:00Z"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "date-time-38",
            "type": "sub_header",
            "richText": [
                [
                    "Sleep, timers, and tickers"
                ]
            ]
        },
        {
            "id": "date-time-39",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1"
            ],
            "hasColumnHeader": true,
            "children": [
                {
                    "id": "date-time-39-row-0",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Operation"
                            ]
                        ],
                        "col-1": [
                            [
                                "Use"
                            ]
                        ]
                    }
                },
                {
                    "id": "date-time-39-row-1",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "time.Sleep(d)"
                            ]
                        ],
                        "col-1": [
                            [
                                "Pause the current goroutine for at least d."
                            ]
                        ]
                    }
                },
                {
                    "id": "date-time-39-row-2",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "time.After(d)"
                            ]
                        ],
                        "col-1": [
                            [
                                "Receive a time after a delay; shorthand for a one-shot timer channel."
                            ]
                        ]
                    }
                },
                {
                    "id": "date-time-39-row-3",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "time.NewTimer(d)"
                            ]
                        ],
                        "col-1": [
                            [
                                "A one-shot timer with a handle for Stop or Reset. Receive from timer.C to wait."
                            ]
                        ]
                    }
                },
                {
                    "id": "date-time-39-row-4",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "time.NewTicker(d)"
                            ]
                        ],
                        "col-1": [
                            [
                                "Repeated notifications. Slow receivers can miss ticks. Stop when work ends."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "date-time-40",
            "type": "text",
            "richText": [
                [
                    "Timer channels do not close after firing. Ticker.Stop also does not close ticker.C. A loop must return or use a separate cancellation signal to exit."
                ]
            ]
        },
        {
            "id": "date-time-41",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    ticker := time.NewTicker(10 * time.Millisecond)\n    defer ticker.Stop()\n    for i := 0; i < 3; i++ {\n        <-ticker.C\n        fmt.Println(\"tick\", i+1)\n    }\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "date-time-42",
            "type": "text",
            "richText": [
                [
                    "Expected output: tick 1, tick 2, tick 3 on separate lines. Actual timing varies."
                ]
            ]
        },
        {
            "id": "date-time-43",
            "type": "sub_header",
            "richText": [
                [
                    "Timer behavior by Go version"
                ]
            ]
        },
        {
            "id": "date-time-44",
            "type": "text",
            "richText": [
                [
                    "With Go 1.23 timer semantics, unreachable timers and tickers can be collected, and Stop/Reset prevents later receives of stale values from the old timer configuration. These semantics apply by default when the main module declares go 1.23 or later; the asynctimerchan GODEBUG setting can change the behavior."
                ]
            ]
        },
        {
            "id": "date-time-45",
            "type": "text",
            "richText": [
                [
                    "Older semantics retain some timers until expiry and retain unstopped tickers. Reusing a channel timer then requires coordinating Stop and draining an unread expiry before Reset. Do not copy an unconditional drain into Go 1.23 code: it can block. Stop remains useful for preventing unwanted work regardless of collection behavior."
                ]
            ]
        },
        {
            "id": "date-time-46",
            "type": "text",
            "richText": [
                [
                    "Version details: "
                ],
                [
                    "Go 1.23 timer changes",
                    [
                        [
                            "a",
                            "https://go.dev/wiki/Go123Timer"
                        ]
                    ]
                ],
                [
                    ""
                ]
            ]
        },
        {
            "id": "date-time-47",
            "type": "sub_header",
            "richText": [
                [
                    "Timeouts and cancellation"
                ]
            ]
        },
        {
            "id": "date-time-48",
            "type": "text",
            "richText": [
                [
                    "A timer can limit how long a caller waits. It does not cancel other goroutines by itself. An operation must observe a cancellation signal and release its resources."
                ]
            ]
        },
        {
            "id": "date-time-49",
            "type": "text",
            "richText": [
                [
                    "See "
                ],
                [
                    "Context and Timeout",
                    [
                        [
                            "a",
                            "#/notes/go/context-and-timeout"
                        ]
                    ]
                ],
                [
                    " for cancellable operations and deadline handling."
                ]
            ]
        },
        {
            "id": "date-time-50",
            "type": "text",
            "richText": [
                [
                    "API reference: "
                ],
                [
                    "time package",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/time"
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
