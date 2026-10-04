/* Go study note content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-80f7-a283-c9ba635393a0",
    "slug": "why-go",
    "title": "Why Go?",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "why-go-01",
            "type": "text",
            "richText": [
                [
                    "Go is a statically typed, compiled language for building services, command-line tools, and concurrent programs."
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
                    "HTTP APIs and network services: the standard library includes HTTP, networking, and encoding packages."
                ]
            ]
        },
        {
            "id": "why-go-04",
            "type": "bulleted_list",
            "richText": [
                [
                    "Command-line tools and automation: the toolchain builds executables for supported operating systems and architectures."
                ]
            ]
        },
        {
            "id": "why-go-05",
            "type": "bulleted_list",
            "richText": [
                [
                    "Cloud and infrastructure software: Go is used in projects such as Kubernetes and Docker."
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
                    "Goroutines and channels provide language support for concurrent work. Programs still need correct synchronization and cancellation."
                ]
            ]
        },
        {
            "id": "why-go-08",
            "type": "bulleted_list",
            "richText": [
                [
                    "Garbage collection manages Go memory. Files, sockets, and other resources still need explicit cleanup."
                ]
            ]
        },
        {
            "id": "why-go-09",
            "type": "bulleted_list",
            "richText": [
                [
                    "The toolchain includes build commands, formatting, testing, and module dependency management."
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
            "type": "text",
            "richText": [
                [
                    "The standard Go compiler produces machine code for the target platform. The program also uses a runtime for scheduling, garbage collection, and other services. Runtime work and memory use depend on the workload; Go does not guarantee negligible overhead or faster execution than every alternative."
                ]
            ]
        },
        {
            "id": "why-go-13",
            "type": "text",
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
            "type": "text",
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
            "type": "text",
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
