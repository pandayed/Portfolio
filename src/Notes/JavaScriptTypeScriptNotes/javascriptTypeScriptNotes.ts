import arraysAndObjects from './data/arrays-and-objects';
import browserDomAndStorage from './data/browser-dom-and-storage';
import classesPrototypesAndModules from './data/classes-prototypes-and-modules';
import controlFlow from './data/control-flow';
import errorsAndDebugging from './data/errors-and-debugging';
import functionsAndScope from './data/functions-and-scope';
import generics from './data/generics';
import annotationsAndInference from './data/inference-unions-and-narrowing';
import interfaceNote from './data/interface';
import narrowing from './data/narrowing';
import objectShapes from './data/object-shapes';
import runtimeAndTypes from './data/runtime-and-types';
import tsconfigAndDeclarationFiles from './data/tsconfig-and-declaration-files';
import typeNote from './data/type';
import typeAndInterfaces from './data/type-and-interfaces';
import utilityMappedAndConditionalTypes from './data/utility-mapped-and-conditional-types';
import variablesValuesAndOperators from './data/variables-values-and-operators';
import type { LearningChapter } from '../LearningNotes/types';

export const javascriptTypeScriptChapters: readonly LearningChapter[] = [
    {
        id: 'runtime-and-fundamentals',
        title: '1. JavaScript basics',
        summary: 'Start with values and variables. Then use conditions and loops.',
        notes: [runtimeAndTypes, variablesValuesAndOperators, controlFlow],
    },
    {
        id: 'functions-and-data',
        title: '2. Functions and data',
        summary: 'Call functions, read variables from their scope, and work with arrays and objects.',
        notes: [functionsAndScope, arraysAndObjects],
    },
    {
        id: 'objects-and-program-structure',
        title: '3. Objects and program structure',
        summary: 'Use classes and modules. Then trace errors to the expression that failed.',
        notes: [classesPrototypesAndModules, errorsAndDebugging],
    },
    {
        id: 'browser-and-async',
        title: '4. Browser and asynchronous programming',
        summary: 'Change a browser page, store values, and handle Promise results. Then study callback order.',
        notes: [browserDomAndStorage],
    },
    {
        id: 'typescript-type-system',
        title: '5. TypeScript basics',
        summary: 'Infer and annotate values, name types, narrow values, apply object rules, define interfaces, compare declarations, then connect types with generics.',
        notes: [
            annotationsAndInference,
            typeNote,
            narrowing,
            objectShapes,
            interfaceNote,
            typeAndInterfaces,
            generics,
        ],
    },
    {
        id: 'typescript-type-transformations-and-configuration',
        title: '6. TypeScript derived types and configuration',
        summary: 'Build types from existing types. Then configure checking, output, and declaration files.',
        notes: [
            utilityMappedAndConditionalTypes,
            tsconfigAndDeclarationFiles,
        ],
    },
];

export const javascriptTypeScriptNotes = javascriptTypeScriptChapters.flatMap(
    (chapter) => chapter.notes,
);
