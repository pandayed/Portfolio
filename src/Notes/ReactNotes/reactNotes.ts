import componentsAndProps from './data/components-and-props';
import conditionalRenderingListsAndKeys from './data/conditional-rendering-lists-and-keys';
import contextAndProviders from './data/context-and-providers';
import dataFetchingAndAsyncUi from './data/data-fetching-and-async-ui';
import effectsAndCleanup from './data/effects-and-cleanup';
import eventsAndHandlers from './data/events-and-handlers';
import formsAndControlledInputs from './data/forms-and-controlled-inputs';
import hooksAndRules from './data/hooks-and-rules';
import hooksAtAGlance from './data/hooks-at-a-glance';
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
        title: '1. Components and rendering',
        summary: 'JSX, props, nested content, conditions, and lists.',
        notes: [reactRenderingAndJsx, componentsAndProps, conditionalRenderingListsAndKeys],
    },
    {
        id: 'state-and-input',
        title: '2. Events, state, and input',
        summary: 'Events, state, Hook rules, object updates, and forms.',
        notes: [eventsAndHandlers, stateAndEvents, hooksAndRules, objectsAndArraysInState,
            formsAndControlledInputs, sharingAndResettingState],
    },
    {
        id: 'hooks-and-application-state',
        title: '3. External systems and Effects',
        summary: 'DOM refs, Effects, requests, and cleanup.',
        notes: [refsAndDomAccess, effectsAndCleanup, dataFetchingAndAsyncUi],
    },
    {
        id: 'data-and-performance',
        title: '4. Shared logic and performance',
        summary: 'Reducers, context, custom Hooks, and rendering performance.',
        notes: [reducersAndActions, contextAndProviders, customHooks, renderingPerformance],
    },
    {
        id: 'typed-react',
        title: '5. React with TypeScript',
        summary: 'Types for props, state, handlers, refs, reducers, and context.',
        notes: [reactWithTypescript],
    },
    {
        id: 'hook-reference',
        title: '6. Hook reference',
        summary: 'Hook descriptions and links to detailed lessons. Later APIs state their version requirements.',
        notes: [hooksAtAGlance, reactHooks],
    },
];

export const reactNotes = reactChapters.flatMap((chapter) => chapter.notes);
