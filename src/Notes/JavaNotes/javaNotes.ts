import type { LearningChapter } from '../LearningNotes/types';
import languageBasics from './data/language-basics';
import operators from './data/operators';
import numericConversions from './data/numeric-conversions';
import wrapperTypes from './data/wrapper-types';
import methods from './data/control-flow-and-methods';
import enums from './data/enums';
import switches from './data/switches';
import conditions from './data/conditions';
import loops from './data/loops';
import strings from './data/strings-and-arrays';
import arrays from './data/arrays';
import stringBuilder from './data/string-builder';
import classesAndObjects from './data/classes-and-objects';
import packages from './data/packages';
import inheritanceAndInterfaces from './data/inheritance-and-interfaces';
import abstractClasses from './data/abstract-classes';
import interfaces from './data/interfaces';
import composition from './data/composition';
import equalityAndRecords from './data/equality-and-records';
import immutableObjects from './data/immutable-objects';
import records from './data/records';
import generics from './data/generics';
import wildcards from './data/wildcards';
import typeErasure from './data/type-erasure';
import collections from './data/collections';
import lists from './data/lists';
import sets from './data/sets';
import maps from './data/maps';
import lambdas from './data/lambdas-and-streams';
import streams from './data/streams';
import exceptions from './data/exceptions-and-resources';
import resourceCleanup from './data/resource-cleanup';
import filesAndPaths from './data/files-and-paths';
import paths from './data/paths';
import threadsAndConcurrency from './data/threads-and-concurrency';
import multithreading from './data/multithreading';
import threadWaiting from './data/thread-waiting';
import threadInterruption from './data/thread-interruption';
import threadCommunication from './data/thread-communication';
import threadStates from './data/thread-states';
import deadlocks from './data/deadlocks';
import synchronization from './data/synchronization';
import atomicVariables from './data/atomic-variables';
import volatile from './data/volatile';
import futures from './data/futures';
import completableFuture from './data/completable-future';
import futureChains from './data/future-chains';
import futureFailures from './data/future-failures';

export const javaChapters: readonly LearningChapter[] = [
    {
        id: 'language-fundamentals',
        title: '1. Language fundamentals',
        summary: 'Variables, data types, final, operators, arithmetic, conditions, loops, arrays, methods, and text.',
        notes: [languageBasics, operators, numericConversions, conditions, loops, arrays, methods, strings, stringBuilder],
    },
    {
        id: 'objects-and-contracts',
        title: '2. Classes and type contracts',
        summary: 'Classes, packages, enums, switch, inheritance, abstract classes, interfaces, and composition.',
        notes: [classesAndObjects, packages, enums, switches, inheritanceAndInterfaces, abstractClasses, interfaces, composition],
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
        summary: 'Wrapper types, identity, equals and hashCode, immutable objects, records, and defensive copies.',
        notes: [wrapperTypes, equalityAndRecords, immutableObjects, records],
    },
    {
        id: 'collections-and-transformations',
        title: '5. Generics, collections, and streams',
        summary: 'Generic types, lists, sets, maps, wildcards, type erasure, lambdas, and stream pipelines.',
        notes: [generics, collections, lists, sets, maps, wildcards, typeErasure, lambdas, streams],
    },
    {
        id: 'files-and-paths',
        title: '6. Files and text input',
        summary: 'Paths, character encoding, file operations, line readers, and file-backed streams.',
        notes: [paths, filesAndPaths],
    },
    {
        id: 'threads-and-tasks',
        title: '7. Multithreading',
        summary: 'Create threads, wait and interrupt, protect shared data, coordinate tasks, and read asynchronous results.',
        notes: [multithreading, threadWaiting, threadInterruption, synchronization, threadCommunication, threadStates, deadlocks, atomicVariables, volatile, threadsAndConcurrency, futures, completableFuture, futureChains, futureFailures],
    },
];

export const javaLearningNotes = javaChapters.flatMap((chapter) => chapter.notes);
