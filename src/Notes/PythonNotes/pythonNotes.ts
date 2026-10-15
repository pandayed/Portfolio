import fastmcpFirstServer from './data/fastmcp-first-server';
import fastmcpResourcesAndPrompts from './data/fastmcp-resources-and-prompts';
import fastmcpClientsAndTransports from './data/fastmcp-clients-and-transports';
import sets from './data/sets';
import comprehensions from './data/comprehensions';
import objectsAndMutability from './data/objects-and-mutability';
import functionArguments from './data/function-arguments';
import scopeAndClosures from './data/scope-and-closures';
import filesAndJson from './data/files-and-json';
import runtime from './data/runtime';
import languageFundamentals from './data/language-fundamentals';
import virtualEnvironments from './data/virtual-environments';
import variablesAndTypes from './data/variables-and-types';
import numbersAndConversion from './data/numbers-and-conversion';
import strings from './data/strings';
import conditionals from './data/conditionals';
import loops from './data/loops';
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
import dunderVariablesAndMain from './data/dunder-variables-and-main';
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
        title: '1. First steps',
        summary: 'Read Python syntax, comments, expressions, calls, and indentation.',
        notes: [languageFundamentals],
    },
    {
        title: '2. Variables and basic data types',
        summary: 'Names, assignment, numbers, conversion, strings, Booleans, and None.',
        notes: [variablesAndTypes, numbersAndConversion, strings],
    },
    {
        title: '3. Collections',
        summary: 'Lists, tuples, dictionaries, sets, stacks, queues, typed arrays, and shared references.',
        notes: [lists, tuplesAndUnpacking, dictionariesSetsGenerators, sets, stacksQueuesArrays, objectsAndMutability],
    },
    {
        title: '4. Conditions and loops',
        summary: 'Truth values, comparisons, branches, iteration, and comprehensions.',
        notes: [conditionals, loops, comprehensions],
    },
    {
        title: '5. Functions',
        summary: 'Definitions, return values, arguments, scope, closures, and decorators.',
        notes: [functionsAndScope, functionArguments, scopeAndClosures],
    },
    {
        title: '6. Modules and environments',
        summary: 'Organize code into modules and packages, then isolate installed dependencies.',
        notes: [modulesAndPackages, dunderVariablesAndMain, virtualEnvironments],
    },
    {
        title: '7. Files and errors',
        summary: 'Read and write files, save JSON, and handle exceptions.',
        notes: [filesAndJson, exceptions],
    },
    {
        title: '8. Classes and objects',
        summary: 'Instances, attributes, method forms, inheritance, and value comparison.',
        notes: [classesAndObjects, methodsAndAttributes, inheritanceAndMro, equalityAndHashing],
    },
    {
        title: '9. Iterators and resource management',
        summary: 'Lazy iteration, generator functions, and context manager protocols.',
        notes: [iterationAndGenerators, contextManagers],
    },
    {
        title: '10. Advanced object and runtime reference',
        summary: 'Properties, descriptors, class creation, imports, execution, and CPython memory.',
        notes: [descriptorsAndProperties, classAndInstanceCreation, importSystem, runtime, cpythonMemoryManagement],
    },
    {
        title: '11. Concurrency and networking',
        summary: 'Threads, processes, asyncio, TCP connections, and a client-server exercise.',
        notes: [concurrencyAndAsyncio, socketProgramming, railFenceClientServer],
    },
    {
        title: '12. FastAPI',
        summary: 'Apply Python to HTTP APIs with validation, dependencies, async operations, and routers.',
        notes: [fastapiFirstApp, fastapiPathAndQuery, pydantic, fastapiRequestBodies,
            fastapiResponsesAndErrors, fastapiDependencies, fastapiAsyncOperations,
            fastapiRouters, fastapiBackendService],
    },
    {
        title: '13. FastMCP',
        summary: 'MCP concepts, tool servers, resources, prompts, clients, and transports.',
        notes: [fastmcpFirstServer, fastmcpResourcesAndPrompts, fastmcpClientsAndTransports],
    },
    {
        title: '14. Tools and libraries reference',
        summary: 'Look up common tools, libraries, and frameworks after learning the language.',
        notes: [toolsAndLibraries],
    },
];

export const pythonNotes = pythonChapters.flatMap((chapter) => chapter.notes);
