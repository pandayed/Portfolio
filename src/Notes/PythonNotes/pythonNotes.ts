import runtime from './data/runtime';
import variablesAndTypes from './data/variables-and-types';
import numbersAndConversion from './data/numbers-and-conversion';
import strings from './data/strings';
import conditionals from './data/conditionals';
import loops from './data/loops';
import lists from './data/lists';
import tuplesAndUnpacking from './data/tuples-and-unpacking';
import dictionariesSetsGenerators from './data/dictionaries-sets-generators';
import stacksQueuesArrays from './data/stacks-queues-arrays';
import functionsAndScope from './data/functions-and-scope';
import exceptions from './data/exceptions';
import classesAndObjects from './data/classes-and-objects';
import modulesAndPackages from './data/modules-and-packages';
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
import toolsAndLibraries from './data/tools-and-libraries';
import type { PythonChapter } from './types';

export const pythonChapters: readonly PythonChapter[] = [
    {
        title: '1. Language fundamentals',
        summary: 'Runtime, values, text, decisions, and iteration.',
        notes: [
            runtime,
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
            lists,
            tuplesAndUnpacking,
            dictionariesSetsGenerators,
            stacksQueuesArrays,
        ],
    },
    {
        title: '3. Program structure',
        summary: 'Functions, scope, exceptions, classes, objects, modules, and packages.',
        notes: [
            functionsAndScope,
            exceptions,
            classesAndObjects,
            modulesAndPackages,
        ],
    },
    {
        title: '4. Networking examples',
        summary: 'TCP client-server flow, message boundaries, and the rail fence exercise.',
        notes: [
            socketProgramming,
            railFenceClientServer,
        ],
    },
    {
        title: '5. FastAPI',
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
        ],
    },
    {
        title: '6. Tools and libraries',
        summary: 'Common Python tools, libraries, and frameworks in one line each.',
        notes: [toolsAndLibraries],
    },
];

export const pythonNotes = pythonChapters.flatMap((chapter) => chapter.notes);
