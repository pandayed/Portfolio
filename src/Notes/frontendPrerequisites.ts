import {
    API_COMMUNICATION_ROUTE,
    getJavaScriptTypeScriptNoteRoute,
    REACT_NOTES_ROUTE,
    type Route,
} from '../routing/routes';
import { javascriptTypeScriptNotes } from './JavaScriptTypeScriptNotes/javascriptTypeScriptNotes';
import type { LearningNote } from './LearningNotes/types';
import { reactNotes } from './ReactNotes/reactNotes';

interface Prerequisite {
    title: string;
    route: Route;
}

const findNote = (notes: readonly LearningNote[], slug: string): LearningNote => {
    const note = notes.find((entry) => entry.slug === slug);
    if (!note) throw new Error(`Missing prerequisite note: ${slug}`);
    return note;
};

const js = (slug: string): Prerequisite => ({
    title: findNote(javascriptTypeScriptNotes, slug).title,
    route: getJavaScriptTypeScriptNoteRoute(slug),
});

const react = (slug: string): Prerequisite => ({
    title: findNote(reactNotes, slug).title,
    route: `${REACT_NOTES_ROUTE}/${slug}`,
});

// Direct dependencies are curated per lesson; reading order alone is not a prerequisite.
const javascriptDependencies: Record<string, readonly string[]> = {
    'runtime-and-types': [],
    'variables-values-and-operators': ['runtime-and-types'],
    'primitive-values': ['variables-values-and-operators'],
    'arithmetic-and-conversion': ['primitive-values'],
    'strings': ['primitive-values'],
    'comparison-and-logic': ['primitive-values'],
    'control-flow': ['comparison-and-logic'],
    'loops': ['control-flow', 'arithmetic-and-conversion'],
    'functions-and-scope': ['variables-values-and-operators'],
    'declaration-scope': ['functions-and-scope'],
    'arrays-and-objects': ['variables-values-and-operators'],
    'function-values-and-callbacks': ['functions-and-scope'],
    'scope-and-closures': ['declaration-scope', 'function-values-and-callbacks'],
    'objects': ['functions-and-scope'],
    'destructuring-and-spread': ['objects', 'arrays-and-objects'],
    'array-methods': ['arrays-and-objects', 'function-values-and-callbacks'],
    'map-and-set': ['objects', 'arrays-and-objects', 'loops'],
    'this-and-function-calls': ['objects', 'function-values-and-callbacks'],
    'classes-prototypes-and-modules': ['objects'],
    'classes': ['classes-prototypes-and-modules', 'this-and-function-calls'],
    'modules': ['functions-and-scope', 'objects'],
    'json-and-data-validation': ['objects', 'arrays-and-objects', 'control-flow'],
    'errors-and-debugging': ['functions-and-scope', 'control-flow'],
    'advanced-error-handling': ['errors-and-debugging'],
    'debugging': ['functions-and-scope', 'control-flow'],
    'timers-and-callbacks': ['function-values-and-callbacks', 'scope-and-closures'],
    'promises': ['function-values-and-callbacks', 'errors-and-debugging'],
    'async-await': ['promises'],
    'promise-combinators': ['promises', 'array-methods'],
    'event-loop': ['timers-and-callbacks', 'promises'],
    'browser-dom-and-storage': ['objects', 'functions-and-scope'],
    'browser-events': ['browser-dom-and-storage', 'function-values-and-callbacks'],
    'browser-storage': ['json-and-data-validation', 'errors-and-debugging'],
    'browser-scheduling': ['browser-dom-and-storage', 'event-loop', 'modules'],
    'network-requests': ['async-await', 'json-and-data-validation'],
    'request-cancellation': ['network-requests', 'scope-and-closures'],
    'async-retries': ['network-requests', 'timers-and-callbacks'],
    'async-concurrency': ['async-await', 'promise-combinators', 'loops'],
    'async-iteration': ['async-await', 'loops'],
    'async-cleanup': ['request-cancellation', 'timers-and-callbacks', 'browser-events'],
    'inference-unions-and-narrowing': ['primitive-values'],
    'typescript-functions-and-collections': ['inference-unions-and-narrowing', 'function-values-and-callbacks', 'arrays-and-objects'],
    'type': ['inference-unions-and-narrowing'],
    'object-shapes': ['type', 'objects'],
    'interface': ['object-shapes'],
    'type-and-interfaces': ['type', 'interface'],
    'narrowing': ['type', 'object-shapes', 'control-flow'],
    'runtime-validation': ['narrowing', 'json-and-data-validation'],
    'typescript-classes': ['classes', 'object-shapes'],
    'generics': ['typescript-functions-and-collections', 'object-shapes'],
    'type-operators': ['object-shapes'],
    'utility-mapped-and-conditional-types': ['generics', 'type-operators'],
    'mapped-and-conditional-types': ['generics', 'type-operators'],
    'typescript-modules': ['modules', 'type-and-interfaces'],
    'tsconfig-and-declaration-files': ['typescript-modules'],
};

const reactDependencies: Record<string, readonly Prerequisite[]> = {
    'react-rendering-and-jsx': [js('functions-and-scope'), js('objects'), js('modules')],
    'components-and-props': [react('react-rendering-and-jsx'), js('destructuring-and-spread')],
    'conditional-rendering-lists-and-keys': [react('components-and-props'), js('comparison-and-logic'), js('array-methods')],
    'events-and-handlers': [react('components-and-props'), js('function-values-and-callbacks'), js('browser-events')],
    'state-and-events': [react('events-and-handlers')],
    'hooks-and-rules': [react('state-and-events')],
    'objects-and-arrays-in-state': [react('state-and-events'), js('destructuring-and-spread'), js('array-methods')],
    'forms-and-controlled-inputs': [react('state-and-events')],
    'sharing-and-resetting-state': [react('state-and-events'), react('components-and-props'), react('conditional-rendering-lists-and-keys')],
    'refs-context-and-reducers': [react('hooks-and-rules'), js('browser-dom-and-storage')],
    'effects-and-cleanup': [react('hooks-and-rules'), js('timers-and-callbacks'), js('browser-events')],
    'data-fetching-and-async-ui': [react('effects-and-cleanup'), react('conditional-rendering-lists-and-keys'), js('request-cancellation')],
    'reducers-and-actions': [react('objects-and-arrays-in-state'), react('hooks-and-rules')],
    'context-and-providers': [react('components-and-props'), react('hooks-and-rules')],
    'performance-and-custom-hooks': [react('effects-and-cleanup')],
    'rendering-performance': [react('hooks-and-rules'), react('components-and-props'), js('function-values-and-callbacks')],
    'react-with-typescript': [js('object-shapes'), js('type'), js('narrowing'), js('generics'), react('forms-and-controlled-inputs'), react('refs-context-and-reducers'), react('reducers-and-actions'), react('context-and-providers')],
    'hooks-at-a-glance': [react('hooks-and-rules')],
    'react-hooks': [react('hooks-and-rules'), react('forms-and-controlled-inputs'), react('effects-and-cleanup'), react('refs-context-and-reducers')],
};

export const frontendPrerequisites: ReadonlyMap<Route, readonly Prerequisite[]> = new Map([
    ...Object.entries(javascriptDependencies).map(([slug, dependencies]): [Route, Prerequisite[]] => [
        js(slug).route,
        dependencies.map(js),
    ]),
    ...Object.entries(reactDependencies).map(([slug, dependencies]): [Route, readonly Prerequisite[]] => [
        react(slug).route,
        dependencies,
    ]),
    [API_COMMUNICATION_ROUTE, [js('network-requests'), js('modules'), js('interface'), react('data-fetching-and-async-ui'), react('performance-and-custom-hooks')]],
]);
