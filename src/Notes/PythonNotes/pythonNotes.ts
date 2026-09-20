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
import socketProgramming from './data/socket-programming';
import railFenceClientServer from './data/rail-fence-client-server';
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
        summary: 'Functions, scope, exceptions, classes, and objects.',
        notes: [
            functionsAndScope,
            exceptions,
            classesAndObjects,
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
];

export const pythonNotes = pythonChapters.flatMap((chapter) => chapter.notes);
