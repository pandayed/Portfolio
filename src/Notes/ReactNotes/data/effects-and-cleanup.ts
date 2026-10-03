import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'effects-and-cleanup',
    title: 'Effects and cleanup',
    summary: 'Use Effects to keep React state synchronized with systems outside React, then clean up that synchronization.',
    scope: 'react',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'external-synchronization',
            title: 'An Effect synchronizes with an external system',
            paragraphs: [
                'Rendering calculates JSX from props and state. An Effect runs after React updates the screen so the component can synchronize with something outside React.',
            ],
            bullets: [
                'Browser APIs, network connections, subscriptions, timers, and third-party widgets are external systems.',
                'A click-specific action belongs in the click handler.',
                'A value that can be calculated from props or state belongs in rendering, not in an Effect.',
            ],
        },
        {
            id: 'dependencies',
            title: 'Dependencies describe what the Effect reads',
            paragraphs: [
                'Every reactive value used by an Effect must be a dependency. Reactive values include props, state, and values calculated inside the component from them.',
                'State setter and reducer dispatch functions have stable identities. They may be omitted when the Hooks linter allows it. Values declared outside the component are not reactive because rendering cannot change them.',
                'You do not choose dependencies to control timing. Change the Effect code if it should depend on fewer values.',
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
                result: 'Typing changes the input and the browser tab title to the same text. The Effect synchronizes the title after a commit when title changes. Development Strict Mode may run one extra setup and cleanup cycle to find cleanup bugs.',
            }],
        },
        {
            id: 'cleanup',
            title: 'Cleanup stops the previous synchronization',
            paragraphs: [
                'Return a cleanup function when an Effect starts work that must be stopped. React runs cleanup before the Effect runs again and when the component is removed.',
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
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return <p>Window width: {width}px</p>;
}`,
                result: 'The paragraph shows the current window width and updates after the window is resized. Removing the component also removes its resize listener.',
            }],
            pitfalls: [
                'A cleanup function should undo the work started by that Effect. A subscription needs an unsubscribe. A timer needs clearTimeout or clearInterval.',
            ],
        },
        {
            id: 'request-races',
            title: 'Ignore stale request results',
            paragraphs: [
                'Requests can finish in a different order from the order in which they started. Cleanup can mark an earlier request as stale so it cannot replace newer data.',
            ],
            examples: [{
                title: 'Keep the latest profile selection visible',
                language: 'tsx',
                code: `import { useEffect, useState } from 'react';

type Profile = { id: string; name: string };
type ProfileState =
    | { userId: string; status: 'loading' }
    | { userId: string; status: 'success'; profile: Profile }
    | { userId: string; status: 'error' };

export function ProfileName({ userId }: { userId: string }) {
    const [state, setState] = useState<ProfileState>({ userId, status: 'loading' });

    useEffect(() => {
        let ignore = false;
        setState({ userId, status: 'loading' });

        async function loadProfile() {
            try {
                const response = await fetch('/api/users/' + userId);
                if (!response.ok) throw new Error('Request failed');
                const profile: Profile = await response.json();
                if (!ignore) setState({ userId, status: 'success', profile });
            } catch {
                if (!ignore) setState({ userId, status: 'error' });
            }
        }

        void loadProfile();
        return () => {
            ignore = true;
        };
    }, [userId]);

    if (state.userId !== userId || state.status === 'loading') return <p>Loading…</p>;
    if (state.status === 'error') return <p role="alert">Could not load profile.</p>;
    return <p>{state.profile.name}</p>;
}`,
                result: 'The paragraph shows “Loading…” for a new selection, then that user’s name or an error. A slower response for an earlier user cannot replace the latest selection.',
            }],
        },
        {
            id: 'when-not-to-use-effect',
            title: 'Do not use an Effect for derived UI',
            paragraphs: [
                'If a value follows directly from props or state, calculate it while rendering. This avoids an extra render with an outdated value.',
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
            paragraphs: [
                'JavaScript runs the setup and cleanup functions. TypeScript checks their values and return types. React decides when setup and cleanup run based on rendering and the dependency list.',
            ],
        },
    ],
};

export default note;
