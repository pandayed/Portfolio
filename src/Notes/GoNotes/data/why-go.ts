/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-80f7-a283-c9ba635393a0",
    "slug": "why-go",
    "title": "Why Go?",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "why-go-01",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go is a compiled language. It checks types before the program runs."
                ]
            ]
        },
        {
            "id": "why-go-01-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use Go for services, command-line tools, and programs that do several tasks at once."
                ]
            ]
        },
        {
            "id": "why-go-02",
            "type": "sub_header",
            "richText": [
                [
                    "Common uses"
                ]
            ]
        },
        {
            "id": "why-go-03",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go has standard packages for HTTP APIs, networking, and converting data to formats such as JSON."
                ]
            ]
        },
        {
            "id": "why-go-04",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go tools build programs for supported operating systems and CPU types."
                ]
            ]
        },
        {
            "id": "why-go-05",
            "type": "bulleted_list",
            "richText": [
                [
                    "Cloud tools such as Kubernetes and Docker use Go."
                ]
            ]
        },
        {
            "id": "why-go-06",
            "type": "sub_header",
            "richText": [
                [
                    "Language and tooling choices"
                ]
            ]
        },
        {
            "id": "why-go-07",
            "type": "bulleted_list",
            "richText": [
                [
                    "Goroutines let a program do several tasks at once."
                ]
            ]
        },
        {
            "id": "why-go-07-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Channels let goroutines send values to each other."
                ]
            ]
        },
        {
            "id": "why-go-07-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The program still needs to protect shared data and stop work when needed."
                ]
            ]
        },
        {
            "id": "why-go-08",
            "type": "bulleted_list",
            "richText": [
                [
                    "Garbage collection frees Go memory that the program no longer needs."
                ]
            ]
        },
        {
            "id": "why-go-08-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Files and network connections still need cleanup, such as calling Close."
                ]
            ]
        },
        {
            "id": "why-go-09",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go tools can build programs, format code, run tests, and manage dependencies."
                ]
            ]
        },
        {
            "id": "why-go-10",
            "type": "sub_header",
            "richText": [
                [
                    "Compilation and runtime"
                ]
            ]
        },
        {
            "id": "why-go-11",
            "type": "code",
            "richText": [
                [
                    "Go source → compiler and linker → executable → program execution"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "why-go-12",
            "type": "bulleted_list",
            "richText": [
                [
                    "The standard Go compiler produces machine code for the target computer."
                ]
            ]
        },
        {
            "id": "why-go-12-read-1",
            "type": "bulleted_list",
            "richText": [
                [
                    "The Go runtime schedules goroutines and collects unused memory."
                ]
            ]
        },
        {
            "id": "why-go-12-read-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The runtime still uses CPU time and memory."
                ]
            ]
        },
        {
            "id": "why-go-12-read-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The cost depends on the program. Go is not always faster than other languages."
                ]
            ]
        },
        {
            "id": "why-go-13",
            "type": "bulleted_list",
            "richText": [
                [
                    "See "
                ],
                [
                    "Basic Commands",
                    [
                        [
                            "a",
                            "#/notes/go/basic-commands"
                        ]
                    ]
                ],
                [
                    " for the build-and-run workflow."
                ]
            ]
        },
        {
            "id": "why-go-14",
            "type": "bulleted_list",
            "richText": [
                [
                    "Sources: "
                ],
                [
                    "Go FAQ",
                    [
                        [
                            "a",
                            "https://go.dev/doc/faq"
                        ]
                    ]
                ],
                [
                    " and the use cases below."
                ]
            ]
        },
        {
            "id": "why-go-15",
            "type": "bulleted_list",
            "richText": [
                [
                    ""
                ],
                [
                    "Official Go use cases",
                    [
                        [
                            "a",
                            "https://go.dev/solutions/"
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
