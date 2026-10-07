import componentsAndProps from './data/components-and-props';
import conditionalRenderingListsAndKeys from './data/conditional-rendering-lists-and-keys';
import dataFetchingAndAsyncUi from './data/data-fetching-and-async-ui';
import effectsAndCleanup from './data/effects-and-cleanup';
import formsAndControlledInputs from './data/forms-and-controlled-inputs';
import hooksAndRules from './data/hooks-and-rules';
import reactHooks from './data/react-hooks';
import performanceAndCustomHooks from './data/performance-and-custom-hooks';
import reactRenderingAndJsx from './data/react-rendering-and-jsx';
import refsContextAndReducers from './data/refs-context-and-reducers';
import stateAndEvents from './data/state-and-events';
import type { LearningChapter } from '../LearningNotes/types';

export const reactChapters: readonly LearningChapter[] = [
    {
        id: 'components-and-rendering',
        title: '1. Components and rendering',
        summary: 'Display a component, pass props, and render conditions and lists.',
        notes: [
            reactRenderingAndJsx,
            componentsAndProps,
            conditionalRenderingListsAndKeys,
        ],
    },
    {
        id: 'state-and-input',
        title: '2. State and user input',
        summary: 'Handle clicks, update state, and keep form inputs in state.',
        notes: [stateAndEvents, formsAndControlledInputs],
    },
    {
        id: 'hooks-and-application-state',
        title: '3. Hooks and application state',
        summary: 'Follow Hook rules. Then use Effects, refs, context, and reducers.',
        notes: [hooksAndRules, effectsAndCleanup, refsContextAndReducers],
    },
    {
        id: 'data-and-performance',
        title: '4. Data and performance',
        summary: 'Show request states, reuse Hook logic, and measure work before optimizing it.',
        notes: [dataFetchingAndAsyncUi, performanceAndCustomHooks],
    },
    {
        id: 'hook-reference',
        title: '5. Hook reference',
        summary: 'Look up individual Hooks after the focused lessons. React 19 APIs have separate version notes.',
        notes: [reactHooks],
    },
];

export const reactNotes = reactChapters.flatMap((chapter) => chapter.notes);
