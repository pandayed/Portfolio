import type { LearningChapter } from '../LearningNotes/types';
import languageBasics from './data/language-basics';
import controlFlowAndMethods from './data/control-flow-and-methods';
import stringsAndArrays from './data/strings-and-arrays';
import classesAndObjects from './data/classes-and-objects';
import inheritanceAndInterfaces from './data/inheritance-and-interfaces';
import equalityAndRecords from './data/equality-and-records';
import generics from './data/generics';
import collections from './data/collections';
import lambdasAndStreams from './data/lambdas-and-streams';
import exceptionsAndResources from './data/exceptions-and-resources';
import filesAndPaths from './data/files-and-paths';
import threadsAndConcurrency from './data/threads-and-concurrency';
import multithreading from './data/multithreading';

export const javaChapters: readonly LearningChapter[] = [
    {
        id: 'language-fundamentals',
        title: '1. Language fundamentals',
        summary: 'Variables, data types, final, operators, methods, control flow, strings, and arrays.',
        notes: [languageBasics, controlFlowAndMethods, stringsAndArrays],
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
        notes: [exceptionsAndResources],
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
        notes: [generics, collections, lambdasAndStreams],
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
