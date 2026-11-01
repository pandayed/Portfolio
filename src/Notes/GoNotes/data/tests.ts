import type { GoNote } from '../types';

const note = {
    notionId: 'go-tests',
    slug: 'tests',
    title: 'Tests',
    updatedOn: '2026-10-10',
    blocks: [
        {
            id: 'tests-naming',
            type: 'sub_header',
            richText: [['Test function names']],
        },
        {
            id: 'tests-prefix',
            type: 'bulleted_list',
            richText: [
                ['Start a test function name with '],
                ['Test', [['c']]],
                ['. Follow it with the test case name, starting with an uppercase letter: '],
                ['TestAdd', [['c']]],
                ['.'],
            ],
        },
        {
            id: 'tests-name-rule',
            type: 'bulleted_list',
            richText: [
                ['Go’s exact rule is that the character after '],
                ['Test', [['c']]],
                [' must not be lowercase. '],
                ['Testadd', [['c']]],
                [' is not discovered as a test.'],
            ],
        },
        {
            id: 'tests-file',
            type: 'bulleted_list',
            richText: [
                ['Put tests in a file ending in '],
                ['_test.go', [['c']]],
                [', such as '],
                ['add_test.go', [['c']]],
                ['.'],
            ],
        },
        {
            id: 'tests-parameter',
            type: 'sub_header',
            richText: [
                [
                    "The t "
                ],
                [
                    "*testing.T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " parameter"
                ]
            ],
        },
        {
            id: 'tests-signature',
            type: 'bulleted_list',
            richText: [
                ['An ordinary test function takes exactly one parameter, '],
                ['t *testing.T', [['c']]],
                [', and returns no value.'],
            ],
        },
        {
            id: 'tests-import',
            type: 'bulleted_list',
            richText: [
                [
                    "Import "
                ],
                [
                    "\"testing\"",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " from Go’s standard library. "
                ],
                [
                    "*testing.T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " means a pointer to the "
                ],
                [
                    "testing",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " package’s "
                ],
                [
                    "T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " type."
                ]
            ],
        },
        {
            id: 'tests-t',
            type: 'bulleted_list',
            richText: [
                ['Go passes this value to the test. Use it to report failures and log messages. '],
                ['t', [['c']]],
                [' is the usual parameter name.'],
            ],
        },

        {
            "id": "tests-example",
            "type": "example",
            "example": {
                "title": "Check an addition result",
                "language": "go",
                "description": [
                    "The file belongs to the calculator package in a Go module."
                ],
                "code": "",
                "files": [
                    {
                        "name": "add_test.go",
                        "language": "go",
                        "code": "package calculator\n\nimport \"testing\"\n\nfunc add(a, b int) int {\n    return a + b\n}\n\nfunc TestAdd(t *testing.T) {\n    got := add(2, 3)\n    want := 5\n\n    if got != want {\n        t.Errorf(\"add(2, 3) = %d; want %d\", got, want)\n    }\n}"
                    }
                ],
                "commands": "go test",
                "explanation": [
                    "The test passes because `add(2, 3)` returns 5."
                ]
            }
        },
        {
            id: 'tests-errorf',
            type: 'bulleted_list',
            richText: [
                ['t.Errorf', [['c']]],
                [' prints a formatted message and marks the test as failed. The test continues after this call. '],
                ['%d', [['c']]],
                [' inserts an integer into the message.'],
            ],
        },
        {
            id: 'tests-fatalf',
            type: 'bulleted_list',
            richText: [
                ['Use '],
                ['t.Fatalf', [['c']]],
                [' to report a failure and stop the current test immediately.'],
            ],
        },
        {
            id: 'tests-log',
            type: 'bulleted_list',
            richText: [
                ['t.Log("message")', [['c']]],
                [' records a message without failing the test. Logs appear when a test fails or when you run with '],
                ['go test -v', [['c']]],
                ['.'],
            ],
        },

        {
            id: 'tests-source',
            type: 'text',
            richText: [
                [
                    "Source: "
                ],
                [
                    "Go ",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/testing#pkg-overview"
                        ]
                    ]
                ],
                [
                    "testing",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/testing#pkg-overview"
                        ],
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " package",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/testing#pkg-overview"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ],
        },
    ],
} as const satisfies GoNote;

export default note;
