import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'cpython-memory-management',
    title: 'CPython memory management',
    summary: 'See how references keep objects alive and how CPython collects unreachable cycles.',
    updatedOn: '2026-10-01',
    sections: [
        {
            id: 'references',
            title: 'References keep objects alive',
            paragraphs: [
                'A Python name refers to an object. Other objects can also hold references to it. In the usual CPython build, a reference count records how many strong references an object has. When its last strong reference is released, CPython can deallocate the object.',
                'Deleting one name does not necessarily remove the object. Other names or containers may still refer to it.',
            ],
            examples: [{
                title: 'One list, two names',
                code: [
                    'items = [1, 2]',
                    'also_items = items',
                    'del items',
                    'print(also_items)  # [1, 2]',
                ].join('\n'),
                result: 'The list remains available through also_items. del removed the name items, not the list itself.',
            }],
            bullets: [
                'A container, a function closure, a global name, or a loaded module can hold a reference you did not notice.',
                'The exact reference count is a CPython implementation detail. Do not use it as a portable measure of application memory.',
            ],
        },
        {
            id: 'cycles',
            title: 'Cyclic garbage collection',
            paragraphs: [
                'Reference counting alone cannot free an unreachable cycle: objects in the cycle still refer to one another. CPython also has a cyclic garbage collector. It finds and clears cycles that the program can no longer reach.',
                'A cycle can remain in memory for a while after its last outside reference disappears. The collector runs later unless you request a collection.',
            ],
            examples: [{
                title: 'A list referring to itself',
                code: [
                    'import gc',
                    '',
                    'cycle = []',
                    'cycle.append(cycle)',
                    'del cycle',
                    'gc.collect()',
                ].join('\n'),
                result: 'The list has no outside reference after del. gc.collect() requests a full collection; it can reclaim this unreachable cycle. This example prints nothing.',
            }],
        },
        {
            id: 'gc-module',
            title: 'What the gc module does',
            paragraphs: [
                'The gc standard library module exposes controls and information for CPython’s cyclic collector. gc.collect() requests a collection. gc.isenabled() reports whether automatic cyclic collection is enabled.',
                'The collector supplements reference counting. Disabling automatic cyclic collection does not disable reference counting. Most programs should leave automatic collection enabled.',
            ],
            examples: [{
                title: 'Check and request collection',
                code: [
                    'import gc',
                    '',
                    'print(gc.isenabled())  # True in a normal interpreter session; it can be disabled',
                    'collected = gc.collect()',
                    'print(type(collected))  # <class \'int\'>',
                ].join('\n'),
                result: 'gc.collect() returns a count. Its exact value depends on the objects in that process, so do not expect a fixed number.',
            }],
        },
        {
            id: 'still-in-memory',
            title: 'Why an object or its memory can remain',
            bullets: [
                'The object may still be reachable through another reference. Removing a local name is not proof that every reference is gone.',
                'An unreachable reference cycle can remain until cyclic garbage collection runs.',
                'Some extension objects may be uncollectable. The gc module exposes gc.garbage for such cases and for debugging modes that save unreachable objects.',
                'Even after an object is deallocated, CPython may retain the freed memory for reuse. A process memory reading need not drop immediately.',
            ],
            paragraphs: [[
                'See the ',
                { text: 'Python data model', href: 'https://docs.python.org/3/reference/datamodel.html#objects-values-and-types' },
                ', ',
                { text: 'gc documentation', href: 'https://docs.python.org/3/library/gc.html' },
                ', and ',
                { text: 'CPython memory management documentation', href: 'https://docs.python.org/3/c-api/memory.html' },
                ' for implementation details.',
            ]],
        },
    ],
};

export default note;
