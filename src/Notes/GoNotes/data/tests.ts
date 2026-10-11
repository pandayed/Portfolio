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
            richText: [['The t *testing.T parameter']],
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
                ['Import '],
                ['"testing"', [['c']]],
                [' from Go’s standard library. '],
                ['*testing.T', [['c']]],
                [' means a pointer to the testing package’s '],
                ['T', [['c']]],
                [' type.'],
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
            id: 'tests-example-file',
            type: 'text',
            richText: [['add_test.go', [['c']]]],
        },
        {
            id: 'tests-example',
            type: 'code',
            language: 'Go',
            richText: [[`package calculator

import "testing"

func add(a, b int) int {
    return a + b
}

func TestAdd(t *testing.T) {
    got := add(2, 3)
    want := 5

    if got != want {
        t.Errorf("add(2, 3) = %d; want %d", got, want)
    }
}`]],
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
            id: 'tests-run',
            type: 'bulleted_list',
            richText: [
                ['Run '],
                ['go test', [['c']]],
                [' from the package directory in your Go module. This example passes because '],
                ['add(2, 3)', [['c']]],
                [' returns '],
                ['5', [['c']]],
                ['.'],
            ],
        },
        {
            id: 'tests-source',
            type: 'text',
            richText: [
                ['Source: '],
                ['Go testing package', [['a', 'https://pkg.go.dev/testing#pkg-overview']]],
                ['.'],
            ],
        },
    ],
} as const satisfies GoNote;

export default note;
