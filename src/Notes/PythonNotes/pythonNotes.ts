import runtime from './data/runtime';
import languageFundamentals from './data/language-fundamentals';
import virtualEnvironments from './data/virtual-environments';
import variablesAndTypes from './data/variables-and-types';
import numbersAndConversion from './data/numbers-and-conversion';
import strings from './data/strings';
import conditionals from './data/conditionals';
import loops from './data/loops';
import collectionsComparison from './data/collections-comparison';
import lists from './data/lists';
import tuplesAndUnpacking from './data/tuples-and-unpacking';
import dictionariesSetsGenerators from './data/dictionaries-sets-generators';
import iterationAndGenerators from './data/iteration-and-generators';
import stacksQueuesArrays from './data/stacks-queues-arrays';
import functionsAndScope from './data/functions-and-scope';
import exceptions from './data/exceptions';
import contextManagers from './data/context-managers';
import classesAndObjects from './data/classes-and-objects';
import methodsAndAttributes from './data/methods-and-attributes';
import inheritanceAndMro from './data/inheritance-and-mro';
import equalityAndHashing from './data/equality-and-hashing';
import descriptorsAndProperties from './data/descriptors-and-properties';
import classAndInstanceCreation from './data/class-and-instance-creation';
import modulesAndPackages from './data/modules-and-packages';
import importSystem from './data/import-system';
import cpythonMemoryManagement from './data/cpython-memory-management';
import concurrencyAndAsyncio from './data/concurrency-and-asyncio';
import socketProgramming from './data/socket-programming';
import railFenceClientServer from './data/rail-fence-client-server';
import fastapiFirstApp from './data/fastapi-first-app';
import fastapiPathAndQuery from './data/fastapi-path-and-query';
import pydantic from './data/pydantic';
import fastapiRequestBodies from './data/fastapi-request-bodies';
import fastapiResponsesAndErrors from './data/fastapi-responses-and-errors';
import fastapiDependencies from './data/fastapi-dependencies';
import fastapiAsyncOperations from './data/fastapi-async-operations';
import fastapiRouters from './data/fastapi-routers';
import fastapiBackendService from './data/fastapi-backend-service';
import toolsAndLibraries from './data/tools-and-libraries';
import type { PythonChapter } from './types';

export const pythonChapters: readonly PythonChapter[] = [
    {
        title: '1. Getting started with Python',
        summary: 'How Python runs a file, virtual environments, basic syntax, values, text, decisions, and iteration.',
        notes: [
            runtime,
            languageFundamentals,
            virtualEnvironments,
            variablesAndTypes,
            numbersAndConversion,
            strings,
            conditionals,
            loops,
        ],
    },
    {
        title: '2. Collections and data handling',
        summary: 'Lists, tuples, mappings, sets, generators, stacks, queues, and arrays.',
        notes: [
            collectionsComparison,
            lists,
            tuplesAndUnpacking,
            dictionariesSetsGenerators,
            iterationAndGenerators,
            stacksQueuesArrays,
        ],
    },
    {
        title: '3. Program structure',
        summary: 'Functions, scope, exceptions, context managers, modules, and imports.',
        notes: [
            functionsAndScope,
            exceptions,
            contextManagers,
            modulesAndPackages,
            importSystem,
        ],
    },
    {
        title: '4. Classes and object model',
        summary: 'Instances, methods, inheritance, hashing, descriptors, and metaclasses.',
        notes: [
            classesAndObjects,
            methodsAndAttributes,
            inheritanceAndMro,
            equalityAndHashing,
            descriptorsAndProperties,
            classAndInstanceCreation,
        ],
    },
    {
        title: '5. Runtime and concurrency',
        summary: 'CPython memory, the GIL, threads, processes, and asyncio.',
        notes: [
            cpythonMemoryManagement,
            concurrencyAndAsyncio,
        ],
    },
    {
        title: '6. Networking examples',
        summary: 'TCP client-server flow, message boundaries, and the rail fence exercise.',
        notes: [
            socketProgramming,
            railFenceClientServer,
        ],
    },
    {
        title: '7. FastAPI',
        summary: 'Build HTTP APIs with path operations, Pydantic models, dependencies, and routers.',
        notes: [
            fastapiFirstApp,
            fastapiPathAndQuery,
            pydantic,
            fastapiRequestBodies,
            fastapiResponsesAndErrors,
            fastapiDependencies,
            fastapiAsyncOperations,
            fastapiRouters,
            fastapiBackendService,
        ],
    },
    {
        title: '8. Tools and libraries',
        summary: 'Common Python tools, libraries, and frameworks in one line each.',
        notes: [toolsAndLibraries],
    },
];

export const pythonNotes = pythonChapters.flatMap((chapter) => chapter.notes);
