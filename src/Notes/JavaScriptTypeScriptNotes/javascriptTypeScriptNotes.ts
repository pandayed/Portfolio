import arraysAndObjects from './data/arrays-and-objects';
import browserDomAndStorage from './data/browser-dom-and-storage';
import classesPrototypesAndModules from './data/classes-prototypes-and-modules';
import controlFlow from './data/control-flow';
import errorsAndDebugging from './data/errors-and-debugging';
import functionsAndScope from './data/functions-and-scope';
import generics from './data/generics';
import inferenceUnionsAndNarrowing from './data/inference-unions-and-narrowing';
import objectTypesAndInterfaces from './data/object-types-and-interfaces';
import runtimeAndTypes from './data/runtime-and-types';
import tsconfigAndDeclarationFiles from './data/tsconfig-and-declaration-files';
import utilityMappedAndConditionalTypes from './data/utility-mapped-and-conditional-types';
import variablesValuesAndOperators from './data/variables-values-and-operators';
import type { LearningChapter } from '../LearningNotes/types';

export const javascriptTypeScriptChapters: readonly LearningChapter[] = [
    {
        id: 'runtime-and-fundamentals',
        title: '1. Runtime and language fundamentals',
        summary: 'How JavaScript runs and what TypeScript checks before the code runs.',
        notes: [runtimeAndTypes, variablesValuesAndOperators, controlFlow],
    },
    {
        id: 'functions-and-data',
        title: '2. Functions and data',
        summary: 'Functions, scope, arrays, objects, closures, and this.',
        notes: [functionsAndScope, arraysAndObjects],
    },
    {
        id: 'objects-and-program-structure',
        title: '3. Objects and program structure',
        summary: 'Prototypes, classes, modules, errors, and debugging.',
        notes: [classesPrototypesAndModules, errorsAndDebugging],
    },
    {
        id: 'browser-and-async',
        title: '4. Browser and asynchronous programming',
        summary: 'The DOM, browser storage, Promises, tasks, and asynchronous control flow.',
        notes: [browserDomAndStorage],
    },
    {
        id: 'typescript-type-system',
        title: '5. TypeScript type system',
        summary: 'Inference, narrowing, object types, generics, type transformations, and configuration.',
        notes: [
            inferenceUnionsAndNarrowing,
            objectTypesAndInterfaces,
            generics,
            utilityMappedAndConditionalTypes,
            tsconfigAndDeclarationFiles,
        ],
    },
];

export const javascriptTypeScriptNotes = javascriptTypeScriptChapters.flatMap(
    (chapter) => chapter.notes,
);
