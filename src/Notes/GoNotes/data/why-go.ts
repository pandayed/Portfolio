import type { GoNote } from '../types';

const note = {
    notionId: '24024eb1-ed54-80f7-a283-c9ba635393a0',
    slug: 'why-go',
    title: 'Why Go?',
    updatedOn: '2026-10-12',
    blocks: [
        {
            id: 'why-go-01',
            type: 'bulleted_list',
            richText: [['Go can give performance close to C/C++ with much simpler development, and excellent tooling for backend services, concurrency, testing etc.']],
        },
        {
            id: 'why-go-workflow',
            type: 'bulleted_list',
            richText: [['Go’s compiler and build workflow are generally straightforward. Go compiles to native machine code: instructions that the CPU can run directly.']],
        },
        {
            id: 'why-go-executable',
            type: 'bulleted_list',
            richText: [['Go commonly produces a single executable containing the application, its compiled Go dependencies, and the Go runtime. This simplifies deployment, particularly in containers and minimal Linux images.']],
        },
        {
            id: 'why-go-check-timing',
            type: 'bulleted_list',
            richText: [['Go checks types and resolves imports during the build, before the program runs. Some languages do more of this work at runtime.']],
        },
        {
            id: 'why-go-runtime-work',
            type: 'bulleted_list',
            richText: [['Doing this work earlier reduces the work needed at runtime.']],
        },
        {
            id: 'why-not-go',
            type: 'sub_header',
            richText: [['Why not Go?']],
        },
        {
            id: 'why-not-go-ecosystem',
            type: 'bulleted_list',
            richText: [['Spring Boot and Python have large library ecosystems. Depending on the task, they may offer more ready-made libraries and integrations than Go.']],
        },
        {
            id: 'why-not-go-tooling',
            type: 'bulleted_list',
            richText: [['This is a limitation of the library ecosystem.']],
        },
        {
            id: 'why-go-flow-link',
            type: 'text',
            richText: [
                ['See '],
                ['From Go Code to Running Instructions', [['a', '#/notes/go/code-to-execution']]],
                [' for the build and execution steps.'],
            ],
        },
        {
            id: 'why-go-sources',
            type: 'text',
            richText: [
                ['Sources: '],
                ['Go FAQ', [['a', 'https://go.dev/doc/faq']]],
                [', '],
                ['Spring Boot features', [['a', 'https://spring.io/projects/spring-boot/']]],
                [', and '],
                ['Python applications and libraries', [['a', 'https://www.python.org/about/apps/']]],
                ['.'],
            ],
        },
    ],
} as const satisfies GoNote;

export default note;
