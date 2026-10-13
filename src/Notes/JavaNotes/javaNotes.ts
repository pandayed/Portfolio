import type { LearningChapter } from '../LearningNotes/types';
import languageBasics from './data/language-basics';
import methods from './data/control-flow-and-methods';
import enums from './data/enums';
import conditions from './data/conditions';
import loops from './data/loops';
import strings from './data/strings-and-arrays';
import arrays from './data/arrays';
import classesAndObjects from './data/classes-and-objects';
import inheritanceAndInterfaces from './data/inheritance-and-interfaces';
import equalityAndRecords from './data/equality-and-records';
import generics from './data/generics';
import collections from './data/collections';
import lists from './data/lists';
import sets from './data/sets';
import maps from './data/maps';
import lambdas from './data/lambdas-and-streams';
import streams from './data/streams';
import exceptions from './data/exceptions-and-resources';
import resourceCleanup from './data/resource-cleanup';
import filesAndPaths from './data/files-and-paths';
import threadsAndConcurrency from './data/threads-and-concurrency';
import multithreading from './data/multithreading';

export const javaChapters: readonly LearningChapter[] = [
    {
        id: 'language-fundamentals',
        title: '1. Language fundamentals',
        summary: 'Variables, data types, final, operators, enums, conditions, loops, arrays, methods, and strings.',
        notes: [languageBasics, enums, conditions, loops, arrays, methods, strings],
    },
    {
        id: 'objects-and-contracts',
        title: '2. Classes and inheritance',
        summary: 'Objects, fields, constructors, encapsulation, overriding, and interface contracts.',
        notes: [classesAndObjects, inheritanceAndInterfaces],
    },
    {
        id: 'exceptions-and-resources',
        title: '3. Exceptions and resources',
        summary: 'Exception flow, checked exceptions, causes, finally, and automatic resource cleanup.',
        notes: [exceptions, resourceCleanup],
    },
    {
        id: 'equality-and-records',
        title: '4. Equality and value objects',
        summary: 'Identity, equals and hashCode, immutable objects, records, and defensive copies.',
        notes: [equalityAndRecords],
    },
    {
        id: 'collections-and-transformations',
        title: '5. Generics, collections, and streams',
        summary: 'Generic types, lists, sets, maps, lambdas, and stream pipelines.',
        notes: [generics, collections, lists, sets, maps, lambdas, streams],
    },
    {
        id: 'files-and-paths',
        title: '6. Files and text input',
        summary: 'Paths, character encoding, file operations, line readers, and file-backed streams.',
        notes: [filesAndPaths],
    },
    {
        id: 'threads-and-tasks',
        title: '7. Threads and asynchronous tasks',
        summary: 'Thread lifecycle, interruption, shared state, executors, futures, and task chains.',
        notes: [multithreading, threadsAndConcurrency],
    },
];

export const javaLearningNotes = javaChapters.flatMap((chapter) => chapter.notes);
