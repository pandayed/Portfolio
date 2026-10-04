/* Chapters define both the Go index and the reading order. */

import type { GoChapter } from './types';

import goNote1 from './data/why-go';
import goNote3 from './data/cpp-vs-go';
import goNote4 from './data/basic-commands';
import goNote5 from './data/constants-variables';
import goNote6 from './data/zero-values';
import goNote7 from './data/if-else-switch';
import goNote8 from './data/slices-arrays';
import goNote9 from './data/maps';
import goNote10 from './data/range-for-loops';
import goNote11 from './data/functions';
import goNote12 from './data/methods';
import goNote13 from './data/variadic-functions';
import goNote14 from './data/anonymous-inline-functions';
import goNote15 from './data/closures';
import goNote16 from './data/defer';
import goNote17 from './data/init-function';
import goNote18 from './data/go-mod';
import goNote19 from './data/go-sum';
import goNote20 from './data/modules';
import goNote21 from './data/packages';
import goNote22 from './data/module-vs-package';
import goNote23 from './data/struct';
import goNote24 from './data/interfaces';
import goNote25 from './data/embeddings';
import goNote26 from './data/pointers';
import goNote27 from './data/errors';
import goNote28 from './data/panic-recover';
import goNote29 from './data/goroutines';
import goNote30 from './data/gmp-model';
import goNote31 from './data/channels';
import goNote32 from './data/workgroups';
import goNote33 from './data/goroutines-blocking-causes-recovery';
import goNote34 from './data/mutex';
import goNote35 from './data/rwmutex';
import goNote36 from './data/context-and-timeout';
import goNote37 from './data/generics';
import goNote38 from './data/date-time';
import goNote39 from './data/select';
import goNote40 from './data/const-iota';
import goNote41 from './data/defined-type-and-type-alias';
import goNote42 from './data/go-by-questions';

export const goChapters: readonly GoChapter[] = [
    {
        title: '1. Language fundamentals',
        summary: 'Running Go, declarations, constants, default values, and control flow.',
        notes: [goNote1, goNote4, goNote5, goNote40, goNote6, goNote7, goNote10],
    },
    {
        title: '2. Collections and types',
        summary: 'Arrays, slices, maps, pointers, defined types, aliases, and structs.',
        notes: [goNote8, goNote9, goNote26, goNote41, goNote23],
    },
    {
        title: '3. Functions and interfaces',
        summary: 'Function forms, captured state, methods, interfaces, embedding, and generics.',
        notes: [goNote11, goNote13, goNote14, goNote15, goNote12, goNote24, goNote25, goNote37],
    },
    {
        title: '4. Program structure and errors',
        summary: 'Packages, modules, dependency files, initialization, cleanup, and error handling.',
        notes: [goNote22, goNote21, goNote20, goNote18, goNote19, goNote17, goNote16, goNote27, goNote28],
    },
    {
        title: '5. Concurrency',
        summary: 'Goroutines, completion, shared state, channels, cancellation, and scheduling.',
        notes: [goNote29, goNote32, goNote34, goNote35, goNote31, goNote39, goNote36, goNote33, goNote30],
    },
    {
        title: '6. Reference and revision',
        summary: 'Date and time, C++ comparisons, and questions for reviewing Go concepts.',
        notes: [goNote38, goNote3, goNote42],
    },
];

export const goNotes = goChapters.flatMap((chapter) => chapter.notes);
