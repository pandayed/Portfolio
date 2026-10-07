import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'effects-and-cleanup',
    title: 'Effects and cleanup',
    summary: 'Use Effects to keep React state synchronized with systems outside React, then clean up that synchronization.',
    scope: 'react',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'external-synchronization',
            title: 'An Effect synchronizes with an external system',
            bullets: [
                "An Effect runs work that keeps a component in sync with something outside React.",
                "Read State and events and Hooks and their rules before this page.",
                "Rendering calls your component to calculate JSX from props and state.",
                "A commit applies that result to the DOM, the browser objects for page elements.",
                "useEffect runs its setup function after a commit. It does not run during server rendering.",
                "Browser event listeners, timers, and network connections are external work.",
                "A click-specific action belongs in the click handler.",
                "A value calculated from props or state belongs in rendering. The full-name example below shows this case.",
            ],
        },
        {
            id: 'dependencies',
            title: 'Dependencies describe what the Effect reads',
            bullets: [
                "The dependency array tells React which values can require new setup.",
                "In the example, the setup reads title. The array therefore contains title.",
                "React compares each dependency with its previous value using Object.is. Objects match when they are the same object, not merely when their fields match.",
                "With [title], setup runs after the first commit and after commits where title changes.",
                "With [], setup runs when the component is added to the page. This is called mounting.",
                "With no array, setup runs after every commit of this component.",
                "List every reactive value read by setup. A reactive value is a prop, state value, or variable or function declared inside the component.",
                "A state setter keeps the same function between renders. It can be omitted when the Hooks linter accepts that omission.",
                "The Hooks linter checks calling rules and dependencies in source code. It does not run the Effect.",
                "Values outside the component do not become reactive dependencies. Changing an external variable alone does not tell React to render.",
            ],
            pitfalls: [
                "Changing [title] to [] leaves document.title at the initial title after typing. It does not throw an exception. Restore [title] so React runs setup for new title values.",
                "Do not remove a dependency to silence a linter warning. Move an object or helper inside setup when only the Effect needs it.",
            ],
            examples: [{
                title: 'Synchronize the browser tab title',
                language: 'tsx',
                code: `import { useEffect, useState } from 'react';

export function DraftTitle() {
    const [title, setTitle] = useState('New note');

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <input
            aria-label="Note title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
        />
    );
}`,
                result: 'Typing changes the input and the browser tab title to the same text. The Effect synchronizes the title after a commit when title changes. Changing unrelated state does not repeat this Effect when title stays the same.',
            }],
        },
        {
            id: 'cleanup',
            title: 'Cleanup stops the previous synchronization',
            bullets: [
                "Return a cleanup function when setup starts work that must stop.",
                "When dependencies change, React runs the old cleanup before the new setup.",
                "When React removes the component, called unmounting, it runs cleanup one final time.",
                "An event listener registers a function to call when a browser event occurs. Removing it stops those calls.",
                "In WindowWidth, updateWidth reads the width and stores it in state when resize fires.",
                "Use the same updateWidth function in addEventListener and removeEventListener.",
                "This example is for browser rendering. Its initial window.innerWidth read requires a browser.",
                "useState(() => window.innerWidth) supplies an initializer function. React calls it to get the initial state rather than reading width as the initial argument on every render.",
                "With React 18 development Strict Mode, initial setup is followed by cleanup and another setup. This checks whether cleanup correctly undoes setup.",
            ],
            examples: [{
                title: 'Subscribe to the browser window size',
                language: 'tsx',
                code: `import { useEffect, useState } from 'react';

export function WindowWidth() {
    const [width, setWidth] = useState(() => window.innerWidth);

    useEffect(() => {
        function updateWidth() {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', updateWidth);
        updateWidth();
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return <p>Window width: {width}px</p>;
}`,
                result: 'The paragraph shows the current window width and updates after the window is resized. Removing the component also removes its resize listener.',
            }],
            pitfalls: [
                "Removing return () => window.removeEventListener('resize', updateWidth) leaves the listener registered after unmounting. The unused listener remains registered. This does not necessarily throw an exception.",
                "Calling removeEventListener with a new function does not remove the original listener. Pass the same updateWidth function.",
                "For a timer, return cleanup that calls clearTimeout or clearInterval with the timer ID.",
            ],
        },
        {
            id: 'request-races',
            title: 'Cleanup marks an earlier request as outdated',
            bullets: [
                'Two requests can finish in a different order from the order they started.',
                'For example, selecting Mira starts request A. Selecting Dev starts request B. B can finish before A.',
                'A stale result belongs to a selection the component no longer needs.',
                'Give each Effect setup its own ignore variable. Cleanup changes that variable to true.',
                'Before updating state, check !ignore. The earlier request then cannot replace the latest selection.',
                'The request still runs. Ignoring its result does not cancel the network work.',
                'Data fetching and async UI contains the full request, loading, error, and cleanup example.',
            ],
            examples: [{
                title: 'Follow two request lifetimes',
                language: 'text',
                code: `Select Mira: setup A starts with ignore = false.
Select Dev: cleanup A sets ignore = true.
            setup B starts with its own ignore = false.
Dev response: B may update state.
Mira response: A must not update state.
Remove the component: cleanup B sets its ignore = true.`,
                result: 'Dev stays selected even when the older Mira response finishes last.',
            }],
        },
        {
            id: 'when-not-to-use-effect',
            title: 'Do not use an Effect for derived UI',
            bullets: [
                "A derived value is a value calculated from existing props or state.",
                "fullName is derived from firstName and lastName. Calculate it while rendering.",
                "If an Effect calls setFullName instead, React first renders with the old fullName. The Effect then requests another render.",
                "For firstName=\"Mira\" and lastName=\"Shah\", the example renders Mira Shah immediately.",
            ],
            examples: [{
                title: 'Calculate the full name during rendering',
                language: 'tsx',
                code: `type NameProps = {
    firstName: string;
    lastName: string;
};

export function FullName({ firstName, lastName }: NameProps) {
    const fullName = firstName + ' ' + lastName;
    return <p>{fullName}</p>;
}`,
                result: 'The paragraph always shows the full name from the current props. No Effect or extra state update is needed.',
            }],
        },
        {
            id: 'react-versus-language',
            title: 'React controls Effect timing',
            bullets: [
                'JavaScript runs Effect setup and cleanup functions.',
                'TypeScript checks their values and return types.',
                'React uses rendering and the dependency list to decide when setup and cleanup run.',
            ],
        },
    ],
};

export default note;
