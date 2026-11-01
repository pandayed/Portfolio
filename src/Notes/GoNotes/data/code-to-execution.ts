import type { GoNote } from '../types';

const note = {
    notionId: 'go-code-to-execution',
    slug: 'code-to-execution',
    title: 'From Go Code to Running Instructions',
    updatedOn: '2026-10-12',
    blocks: [
        {
            id: 'code-to-execution-flow',
            type: 'code',
            language: 'Plain Text',
            richText: [["Go source files\n    ↓\nFind imported packages → check syntax and types\n    ↓\nCompile → link → executable\n    ↓\nOperating system starts the process\n    ↓\nGo runtime starts → packages initialize → main() runs\n\nThe CPU executes machine instructions during startup and application execution."]],
        },
        {
            id: 'code-to-execution-sources',
            type: 'sub_header',
            richText: [['Sources']],
        },
        {
            id: 'code-to-execution-build-source',
            type: 'bulleted_list',
            richText: [
                ['Go command documentation', [['a', 'https://pkg.go.dev/cmd/go']]], [' and '],
                ['module reference', [['a', 'https://go.dev/ref/mod']]], [': builds and dependencies.'],
            ],
        },
        {
            id: 'code-to-execution-compile-source',
            type: 'bulleted_list',
            richText: [
                ['Compiler guide', [['a', 'https://go.dev/src/cmd/compile/README']]], [' and '],
                ['linker documentation', [['a', 'https://pkg.go.dev/cmd/link']]], [': machine code and executables.'],
            ],
        },
        {
            id: 'code-to-execution-runtime-source',
            type: 'bulleted_list',
            richText: [
                ['Go specification', [['a', 'https://go.dev/ref/spec#Program_initialization_and_execution']]], [' and '],
                ['runtime startup code', [['a', 'https://go.dev/src/runtime/proc.go']]], [": initialization and "], ["main()",[["c"]]], ["."],
            ],
        },
    ],
} as const satisfies GoNote;

export default note;
