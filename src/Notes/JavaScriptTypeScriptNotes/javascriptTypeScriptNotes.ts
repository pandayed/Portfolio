import runtimeAndTypesNote from './data/runtime-and-types';
import variablesValuesAndOperatorsNote from './data/variables-values-and-operators';
import primitiveValuesNote from './data/primitive-values';
import arithmeticAndConversionNote from './data/arithmetic-and-conversion';
import stringsNote from './data/strings';
import comparisonAndLogicNote from './data/comparison-and-logic';
import controlFlowNote from './data/control-flow';
import loopsNote from './data/loops';
import functionsAndScopeNote from './data/functions-and-scope';
import declarationScopeNote from './data/declaration-scope';
import arraysAndObjectsNote from './data/arrays-and-objects';
import functionValuesAndCallbacksNote from './data/function-values-and-callbacks';
import scopeAndClosuresNote from './data/scope-and-closures';
import objectsNote from './data/objects';
import destructuringAndSpreadNote from './data/destructuring-and-spread';
import arrayMethodsNote from './data/array-methods';
import mapAndSetNote from './data/map-and-set';
import thisAndFunctionCallsNote from './data/this-and-function-calls';
import classesPrototypesAndModulesNote from './data/classes-prototypes-and-modules';
import classesNote from './data/classes';
import modulesNote from './data/modules';
import errorsAndDebuggingNote from './data/errors-and-debugging';
import advancedErrorHandlingNote from './data/advanced-error-handling';
import debuggingNote from './data/debugging';
import jsonAndDataValidationNote from './data/json-and-data-validation';
import timersAndCallbacksNote from './data/timers-and-callbacks';
import promisesNote from './data/promises';
import asyncAwaitNote from './data/async-await';
import promiseCombinatorsNote from './data/promise-combinators';
import eventLoopNote from './data/event-loop';
import browserDomAndStorageNote from './data/browser-dom-and-storage';
import browserEventsNote from './data/browser-events';
import browserStorageNote from './data/browser-storage';
import browserSchedulingNote from './data/browser-scheduling';
import networkRequestsNote from './data/network-requests';
import requestCancellationNote from './data/request-cancellation';
import asyncRetriesNote from './data/async-retries';
import asyncConcurrencyNote from './data/async-concurrency';
import asyncIterationNote from './data/async-iteration';
import asyncCleanupNote from './data/async-cleanup';
import inferenceUnionsAndNarrowingNote from './data/inference-unions-and-narrowing';
import typescriptFunctionsAndCollectionsNote from './data/typescript-functions-and-collections';
import typeNote from './data/type';
import objectShapesNote from './data/object-shapes';
import interfaceNote from './data/interface';
import typeAndInterfacesNote from './data/type-and-interfaces';
import narrowingNote from './data/narrowing';
import runtimeValidationNote from './data/runtime-validation';
import typescriptClassesNote from './data/typescript-classes';
import genericsNote from './data/generics';
import typeOperatorsNote from './data/type-operators';
import utilityMappedAndConditionalTypesNote from './data/utility-mapped-and-conditional-types';
import mappedAndConditionalTypesNote from './data/mapped-and-conditional-types';
import typescriptModulesNote from './data/typescript-modules';
import tsconfigAndDeclarationFilesNote from './data/tsconfig-and-declaration-files';
import type { LearningChapter } from '../LearningNotes/types';

export const javascriptTypeScriptChapters: readonly LearningChapter[] = [
    {
        id: 'runtime-and-fundamentals',
        title: '1. JavaScript basics',
        summary: 'Run code, declare variables, then use operators, conditions, and loops.',
        notes: [
            runtimeAndTypesNote,
            variablesValuesAndOperatorsNote,
            primitiveValuesNote,
            arithmeticAndConversionNote,
            stringsNote,
            comparisonAndLogicNote,
            controlFlowNote,
            loopsNote,
        ],
    },
    {
        id: 'functions-and-data',
        title: '2. Functions, scope, and arrays',
        summary: 'Define functions, follow declaration scope, then pass functions and capture variables.',
        notes: [
            functionsAndScopeNote,
            declarationScopeNote,
            arraysAndObjectsNote,
            functionValuesAndCallbacksNote,
            scopeAndClosuresNote,
        ],
    },
    {
        id: 'objects-and-collections',
        title: '3. Objects and collections',
        summary: 'Group data in objects, copy and unpack it, then use collection methods and method calls.',
        notes: [
            objectsNote,
            destructuringAndSpreadNote,
            arrayMethodsNote,
            mapAndSetNote,
            thisAndFunctionCallsNote,
        ],
    },
    {
        id: 'objects-and-program-structure',
        title: '4. Program structure and errors',
        summary: 'Use prototypes, classes, and modules. Read JSON, handle errors, and debug code.',
        notes: [
            classesPrototypesAndModulesNote,
            classesNote,
            modulesNote,
            jsonAndDataValidationNote,
            errorsAndDebuggingNote,
            advancedErrorHandlingNote,
            debuggingNote,
        ],
    },
    {
        id: 'asynchronous-javascript',
        title: '5. Asynchronous JavaScript',
        summary: 'Start with timer callbacks, then Promise results, await, combinators, and scheduling.',
        notes: [
            timersAndCallbacksNote,
            promisesNote,
            asyncAwaitNote,
            promiseCombinatorsNote,
            eventLoopNote,
        ],
    },
    {
        id: 'browser-and-async',
        title: '6. Browser pages and requests',
        summary: 'Use the DOM, events, and storage before fetching data and coordinating asynchronous work.',
        notes: [
            browserDomAndStorageNote,
            browserEventsNote,
            browserStorageNote,
            browserSchedulingNote,
            networkRequestsNote,
            requestCancellationNote,
            asyncRetriesNote,
            asyncConcurrencyNote,
            asyncIterationNote,
            asyncCleanupNote,
        ],
    },
    {
        id: 'typescript-type-system',
        title: '7. TypeScript foundations',
        summary: 'Add type checks, type functions and data, then narrow values and validate external data.',
        notes: [
            inferenceUnionsAndNarrowingNote,
            typescriptFunctionsAndCollectionsNote,
            typeNote,
            objectShapesNote,
            interfaceNote,
            typeAndInterfacesNote,
            narrowingNote,
            runtimeValidationNote,
            typescriptClassesNote,
        ],
    },
    {
        id: 'typescript-type-transformations-and-configuration',
        title: '8. Reusable and derived types',
        summary: 'Connect input and output types with generics, then derive types from existing ones.',
        notes: [
            genericsNote,
            typeOperatorsNote,
            utilityMappedAndConditionalTypesNote,
            mappedAndConditionalTypesNote,
        ],
    },
    {
        id: 'typescript-projects',
        title: '9. TypeScript projects',
        summary: 'Configure checking, emitted files, and declaration files.',
        notes: [
            typescriptModulesNote,
            tsconfigAndDeclarationFilesNote,
        ],
    },
];

export const javascriptTypeScriptNotes = javascriptTypeScriptChapters.flatMap(
    (chapter) => chapter.notes,
);
