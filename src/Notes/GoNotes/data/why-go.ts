import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-80f7-a283-c9ba635393a0",
    "slug": "why-go",
    "title": "Why Go?",
    "updatedOn": "2026-10-02",
    "blocks": [
        {
            "id": "easy-compilation",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go compiles code into instructions the CPU can run directly. So, it is: Go Code -> Compiler -> Machine Code"
                ]
            ]
        },
        {
            "id": "type-checking",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go is designed to do most of the things at compile time. So, a little is left for the runtime. And runtime is fast."
                ]
            ]
        },
        {
            "id": "other-efficiencies",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go's runtime is made efficient with Goroutines and garbage collection. This allows concurrent execution and automatic memory management without significant performance overhead."
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
