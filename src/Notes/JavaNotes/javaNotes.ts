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

export const javaChapters: readonly LearningChapter[] = [
    {
        id: 'language-fundamentals',
        title: '1. Language fundamentals',
        summary: 'Types, operators, control flow, methods, strings, and arrays.',
        notes: [languageBasics, controlFlowAndMethods, stringsAndArrays],
    },
    {
        id: 'objects-and-contracts',
        title: '2. Objects and contracts',
        summary: 'Classes, constructors, encapsulation, interfaces, equality, and records.',
        notes: [classesAndObjects, inheritanceAndInterfaces, equalityAndRecords],
    },
    {
        id: 'collections-and-transformations',
        title: '3. Collections and transformations',
        summary: 'Generic types, lists, sets, maps, lambdas, and stream pipelines.',
        notes: [generics, collections, lambdasAndStreams],
    },
    {
        id: 'errors-files-and-concurrency',
        title: '4. Errors, files, and concurrency',
        summary: 'Exceptions, resource cleanup, file operations, threads, and executors.',
        notes: [exceptionsAndResources, filesAndPaths, threadsAndConcurrency],
    },
];

export const javaLearningNotes = javaChapters.flatMap((chapter) => chapter.notes);
