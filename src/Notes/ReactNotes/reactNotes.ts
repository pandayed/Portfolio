import componentsAndProps from './data/components-and-props';
import conditionalRenderingListsAndKeys from './data/conditional-rendering-lists-and-keys';
import dataFetchingAndAsyncUi from './data/data-fetching-and-async-ui';
import effectsAndCleanup from './data/effects-and-cleanup';
import formsAndControlledInputs from './data/forms-and-controlled-inputs';
import hooksAndRules from './data/hooks-and-rules';
import performanceAndCustomHooks from './data/performance-and-custom-hooks';
import reactRenderingAndJsx from './data/react-rendering-and-jsx';
import refsContextAndReducers from './data/refs-context-and-reducers';
import stateAndEvents from './data/state-and-events';
import type { LearningChapter } from '../LearningNotes/types';

export const reactChapters: readonly LearningChapter[] = [
    {
        id: 'components-and-rendering',
        title: '1. Components and rendering',
        summary: 'React rendering, JSX, components, props, conditional output, lists, and keys.',
        notes: [
            reactRenderingAndJsx,
            componentsAndProps,
            conditionalRenderingListsAndKeys,
        ],
    },
    {
        id: 'state-and-input',
        title: '2. State and user input',
        summary: 'State, events, forms, and controlled inputs.',
        notes: [stateAndEvents, formsAndControlledInputs],
    },
    {
        id: 'hooks-and-application-state',
        title: '3. Hooks and application state',
        summary: 'Hook rules, Effects, refs, context, and reducers.',
        notes: [hooksAndRules, effectsAndCleanup, refsContextAndReducers],
    },
    {
        id: 'data-and-performance',
        title: '4. Data and performance',
        summary: 'Asynchronous UI, data fetching, custom Hooks, and measured performance work.',
        notes: [dataFetchingAndAsyncUi, performanceAndCustomHooks],
    },
];

export const reactNotes = reactChapters.flatMap((chapter) => chapter.notes);
