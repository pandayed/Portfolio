/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24e24eb1-ed54-808d-a0bc-d85fd9588363",
    "slug": "date-time",
    "title": "Date & Time",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "date-time-01",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use the standard time package for dates, durations, time zones, and timers."
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
                                "A point in time, its display location, and sometimes a monotonic reading for elapsed time."
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
                                "An int64 count of nanoseconds. Use time.Second, time.Minute, or time.Hour as units."
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
                                "A time zone with rules for offset changes, including daylight saving."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Read time parts with Year, Month, Day, Hour, Minute, Second, and Nanosecond."
                ]
            ]
        },
        {
            "id": "date-time-06-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Weekday, YearDay, and Location give more date and zone details."
                ]
            ]
        },
        {
            "id": "date-time-06-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use these methods rather than depending on how time.Time stores data internally."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Sub gives the duration between two times you supply."
                ]
            ]
        },
        {
            "id": "date-time-11-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Since(start) measures from start to the actual current time."
                ]
            ]
        },
        {
            "id": "date-time-11-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A variable named now does not change what Since reads from the clock."
                ]
            ]
        },
        {
            "id": "date-time-11-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "d.Hours(), d.Minutes(), and d.Seconds() return decimal counts."
                ]
            ]
        },
        {
            "id": "date-time-11-read-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "A Duration holds about 290 years. Larger calculations can overflow."
                ]
            ]
        },
        {
            "id": "date-time-12",
            "type": "bulleted_list",
            "richText": [
                [
                    "The elapsed duration changes each time you run the code."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Expected output: true, then false."
                ]
            ]
        },
        {
            "id": "date-time-16-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Equal checks whether two values represent the same point in time, even in different zones."
                ]
            ]
        },
        {
            "id": "date-time-16-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "== also compares the location and any monotonic clock reading."
                ]
            ]
        },
        {
            "id": "date-time-16-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A monotonic reading measures elapsed time even if the system clock is changed."
                ]
            ]
        },
        {
            "id": "date-time-16-read-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Before and After check time order."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A layout shows how to write the reference date: Mon Jan 2 15:04:05 MST 2006."
                ]
            ]
        },
        {
            "id": "date-time-18-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Choose the date and time parts you need from that reference."
                ]
            ]
        },
        {
            "id": "date-time-18-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "YYYY and DD are not Go layout tokens."
                ]
            ]
        },
        {
            "id": "date-time-18-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use time.RFC3339 for a timestamp with a numeric zone offset."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "If the input has no time zone, Parse uses UTC."
                ]
            ]
        },
        {
            "id": "date-time-23-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "ParseInLocation uses the location you supply when the input has no zone."
                ]
            ]
        },
        {
            "id": "date-time-23-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "If the input has an offset or zone abbreviation, parsing uses that information."
                ]
            ]
        },
        {
            "id": "date-time-23-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Parse tries to match the zone against time.Local. ParseInLocation uses the supplied location instead."
                ]
            ]
        },
        {
            "id": "date-time-23-read-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "An unknown abbreviation can get a zero offset. Prefer a numeric offset or a known location."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Expected output when the zone data is available:"
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
            "type": "bulleted_list",
            "richText": [
                [
                    "LoadLocation can fail if it cannot find the zone data."
                ]
            ]
        },
        {
            "id": "date-time-27-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a named zone such as America/New_York when daylight-saving rules matter."
                ]
            ]
        },
        {
            "id": "date-time-27-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "FixedZone uses the same offset all year."
                ]
            ]
        },
        {
            "id": "date-time-27-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "In(loc), UTC(), and Local() change the display zone, not the point in time."
                ]
            ]
        },
        {
            "id": "date-time-27-read-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use UTC or explicit offsets when sending timestamps between systems. Convert to the display zone when needed."
                ]
            ]
        },
        {
            "id": "date-time-27-read-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Keep the named zone for future calendar schedules that depend on its rules."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Add adds a fixed duration."
                ]
            ]
        },
        {
            "id": "date-time-29-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "AddDate adds calendar years, months, and days in the time's location."
                ]
            ]
        },
        {
            "id": "date-time-29-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A day near a daylight-saving change can last 23 or 25 hours."
                ]
            ]
        },
        {
            "id": "date-time-29-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "AddDate normalizes an invalid date. It does not always choose the last day of the month."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Truncate rounds down the duration since the zero time, not the displayed local clock."
                ]
            ]
        },
        {
            "id": "date-time-32-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "For the +05:30 zone above, truncating to an hour leaves the displayed minute at 30."
                ]
            ]
        },
        {
            "id": "date-time-32-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "To find local midnight, create a time with the same date and location and set the clock parts to zero."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Unix gives seconds since 1970-01-01 UTC."
                ]
            ]
        },
        {
            "id": "date-time-34-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "UnixMilli gives milliseconds. UnixNano gives nanoseconds."
                ]
            ]
        },
        {
            "id": "date-time-34-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Changing the display zone does not change these numbers."
                ]
            ]
        },
        {
            "id": "date-time-34-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "UnixNano can represent dates only from about 1678 to 2262."
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
                                "A channel that sends a time once after the delay."
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
                                "A timer that fires once. Use Stop or Reset to control it. Wait by receiving from timer.C."
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
                                "Sends ticks repeatedly. Slow receivers can miss ticks. Stop when work ends."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "date-time-40",
            "type": "bulleted_list",
            "richText": [
                [
                    "A timer channel does not close after the timer fires."
                ]
            ]
        },
        {
            "id": "date-time-40-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Ticker.Stop stops ticks but does not close ticker.C."
                ]
            ]
        },
        {
            "id": "date-time-40-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Return from the loop or use a separate cancellation signal to exit."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Expected output: tick 1, tick 2, tick 3 on separate lines."
                ]
            ]
        },
        {
            "id": "date-time-42-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "The time between printed lines can vary."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Go 1.23 added new timer behavior."
                ]
            ]
        },
        {
            "id": "date-time-44-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "The garbage collector can free timers and tickers that are no longer reachable."
                ]
            ]
        },
        {
            "id": "date-time-44-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "With this behavior, Stop and Reset prevent later receives of old values from the previous timer setting."
                ]
            ]
        },
        {
            "id": "date-time-44-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The new behavior is the default when the main module declares go 1.23 or later."
                ]
            ]
        },
        {
            "id": "date-time-44-read-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "The asynctimerchan GODEBUG setting can select different behavior."
                ]
            ]
        },
        {
            "id": "date-time-45",
            "type": "bulleted_list",
            "richText": [
                [
                    "With older behavior, some timers stay in memory until they expire."
                ]
            ]
        },
        {
            "id": "date-time-45-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Unstopped tickers also stay in memory with the older behavior."
                ]
            ]
        },
        {
            "id": "date-time-45-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Before reusing a channel timer with older behavior, stop it and remove an unread expiry value when needed."
                ]
            ]
        },
        {
            "id": "date-time-45-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Then call Reset. Coordinate this with any other receiver."
                ]
            ]
        },
        {
            "id": "date-time-45-read-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not always drain the channel in Go 1.23 code. A receive can block when there is no value."
                ]
            ]
        },
        {
            "id": "date-time-45-read-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Stop is still useful when you want to prevent future timer or ticker work."
                ]
            ]
        },
        {
            "id": "date-time-46",
            "type": "bulleted_list",
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A timer can limit how long the caller waits."
                ]
            ]
        },
        {
            "id": "date-time-48-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "It does not stop other goroutines by itself."
                ]
            ]
        },
        {
            "id": "date-time-48-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The operation must check for cancellation and release its resources."
                ]
            ]
        },
        {
            "id": "date-time-49",
            "type": "bulleted_list",
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
            "type": "bulleted_list",
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
