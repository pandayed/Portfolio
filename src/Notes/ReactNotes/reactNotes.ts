import componentsAndProps from './data/components-and-props';
import conditionalRenderingListsAndKeys from './data/conditional-rendering-lists-and-keys';
import contextAndProviders from './data/context-and-providers';
import dataFetchingAndAsyncUi from './data/data-fetching-and-async-ui';
import effectsAndCleanup from './data/effects-and-cleanup';
import eventsAndHandlers from './data/events-and-handlers';
import formsAndControlledInputs from './data/forms-and-controlled-inputs';
import hooksAndRules from './data/hooks-and-rules';
import objectsAndArraysInState from './data/objects-and-arrays-in-state';
import customHooks from './data/performance-and-custom-hooks';
import reactHooks from './data/react-hooks';
import reactRenderingAndJsx from './data/react-rendering-and-jsx';
import reactWithTypescript from './data/react-with-typescript';
import reducersAndActions from './data/reducers-and-actions';
import refsAndDomAccess from './data/refs-context-and-reducers';
import renderingPerformance from './data/rendering-performance';
import sharingAndResettingState from './data/sharing-and-resetting-state';
import stateAndEvents from './data/state-and-events';
import type { LearningChapter } from '../LearningNotes/types';

export const reactChapters: readonly LearningChapter[] = [
    {
        id: 'components-and-rendering',
        title: '1. Describe the UI',
        summary: 'Write JSX, pass props, compose content, and display conditions and lists.',
        notes: [reactRenderingAndJsx, componentsAndProps, conditionalRenderingListsAndKeys],
    },
    {
        id: 'state-and-input',
        title: '2. Respond to the user',
        summary: 'Handle events before introducing state, Hook rules, object updates, and forms.',
        notes: [eventsAndHandlers, stateAndEvents, hooksAndRules, objectsAndArraysInState,
            formsAndControlledInputs, sharingAndResettingState],
    },
    {
        id: 'hooks-and-application-state',
        title: '3. Work with external systems',
        summary: 'Access DOM elements with refs, synchronize with Effects, and handle requests and cleanup.',
        notes: [refsAndDomAccess, effectsAndCleanup, dataFetchingAndAsyncUi],
    },
    {
        id: 'data-and-performance',
        title: '4. Organize and reuse logic',
        summary: 'Group transitions in reducers, share data with context, extract custom Hooks, and measure performance.',
        notes: [reducersAndActions, contextAndProviders, customHooks, renderingPerformance],
    },
    {
        id: 'typed-react',
        title: '5. Add TypeScript',
        summary: 'Type the props, state, handlers, refs, reducers, and context already learned in JavaScript.',
        notes: [reactWithTypescript],
    },
    {
        id: 'hook-reference',
        title: '6. Advanced Hook reference',
        summary: 'Look up later APIs after the lessons. Each React 19 API states its version requirement.',
        notes: [reactHooks],
    },
];

export const reactNotes = reactChapters.flatMap((chapter) => chapter.notes);
