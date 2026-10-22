import type { LearningNote } from '../../LearningNotes/types';

const hook = (text: string, slug: string) => ({
    text: text === 'Custom Hooks' ? text : `\`${text}\``,
    href: `#/notes/react/${slug}`,
});
const advancedHook = (text: string) => hook(text, 'react-hooks');

const note: LearningNote = {
    slug: 'hooks-at-a-glance',
    title: 'Hook overview',
    summary: 'Brief descriptions of React Hooks, with links to their detailed lessons.',
    scope: 'react',
    updatedOn: '2026-10-14',
    inlineCode: true,
    sections: [
        {
            id: 'core-hooks',
            title: 'Core Hooks',
            table: {
                columns: ['Hook', 'Description'],
                rows: [
                    [hook('useState', 'state-and-events'), 'Stores component state. Updating it requests a new render.'],
                    [hook('useReducer', 'reducers-and-actions'), 'Stores state and updates it through a reducer function when you dispatch an action.'],
                    [hook('useContext', 'context-and-providers'), 'Reads a context value from the nearest provider and updates when that value changes.'],
                    [hook('useRef', 'refs-context-and-reducers'), 'Keeps a value between renders, such as a DOM element. Changing it does not request a render.'],
                    [hook('useEffect', 'effects-and-cleanup'), 'Synchronizes a component with an external system, such as a timer or connection, and cleans up when needed.'],
                    [hook('useMemo', 'rendering-performance'), 'Caches a calculation result between renders while its dependencies stay the same.'],
                    [hook('useCallback', 'rendering-performance'), 'Keeps the same function reference between renders while its dependencies stay the same.'],
                ],
            },
        },
        {
            id: 'other-hooks',
            title: 'Other built-in Hooks',
            table: {
                columns: ['Hook', 'Description'],
                rows: [
                    [advancedHook('useId'), 'Generates an ID for connecting elements, such as an input and its label.'],
                    [advancedHook('useTransition'), 'Marks state updates as non-blocking and reports whether a transition is pending.'],
                    [advancedHook('useDeferredValue'), 'Lets part of the UI use an older value while React prepares its next render.'],
                    [advancedHook('useSyncExternalStore'), 'Subscribes to a store outside React and reads its current snapshot.'],
                    [advancedHook('useLayoutEffect'), 'Runs an Effect before the browser paints, for work such as measuring layout.'],
                    [advancedHook('useImperativeHandle'), 'Controls which methods or values a component exposes through its ref.'],
                    [advancedHook('useDebugValue'), 'Adds a label for a custom Hook in React DevTools.'],
                    [advancedHook('useInsertionEffect'), 'Lets CSS libraries insert styles before layout Effects run.'],
                    [advancedHook('useActionState'), 'Stores the result of an Action and tracks whether it is pending. Requires React 19 or later.'],
                    [advancedHook('useOptimistic'), 'Shows temporary state while an Action is pending, such as a task marked complete before saving finishes. Requires React 19 or later.'],
                    [advancedHook('useEffectEvent'), 'Creates a function called from Effects that reads the latest committed props and state. Changes to those values do not restart the Effect. Requires React 19.2 or later.'],
                ],
            },
        },
        {
            id: 'react-dom-hooks',
            title: 'React DOM Hooks',
            table: {
                columns: ['Hook', 'Description'],
                rows: [
                    [advancedHook('useFormStatus'), 'Reads the submission status of a parent form, including whether it is pending. Imported from `react-dom`. Requires React 19 or later.'],
                ],
            },
        },
        {
            id: 'related-api-and-custom-hooks',
            title: 'Related API and custom Hooks',
            table: {
                columns: ['Name', 'Description'],
                rows: [
                    [advancedHook('use'), 'Reads a Promise or context during rendering. Unlike conventional Hooks, it can be called in conditions and loops. Requires React 19 or later.'],
                    [hook('Custom Hooks', 'performance-and-custom-hooks'), 'Functions that combine Hooks to reuse stateful logic between components. Their names start with `use`.'],
                ],
            },
        },
    ],
};

export default note;
