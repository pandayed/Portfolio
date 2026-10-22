import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "rendering-performance",
    title: "Rendering performance",
    summary: "Cached calculations and functions between renders.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "render-first",
            title: "Rendering measurements",
            bullets: [
                "The React DevTools Profiler measures component rendering time.",
                "These measurements identify where cached calculations or functions may help.",
                "React can discard cached values.",
                "The component must still work correctly when React calculates them again."
            ]
        },
        {
            id: "use-memo",
            title: "Cached calculations",
            bullets: [
                "`useMemo` calculates a value during rendering and reuses it while its dependencies stay unchanged.",
                "The dependencies must include every prop, state value, and variable or function declared in the component that the calculation reads.",
                "React compares each dependency with its previous value using `Object.is`.",
                "A newly created object, array, or function counts as changed.",
                "`useMemo` does not speed up the first calculation.",
                "React runs the calculation again when a dependency changes."
            ],
            examples: [
                {
                    title: "Cached product list",
                    description: [
                        "`products` is an array of items with `id` and `name`.",
                        "The filtered array can stay the same when only the Note field changes."
                    ],
                    language: "jsx",
                    code: `import { useMemo, useState } from 'react';

export default function ProductList({ products }) {
    const [query, setQuery] = useState('');
    const [note, setNote] = useState('');
    const visible = useMemo(() => products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    ), [products, query]);
    return <>
        <label>Search <input value={query} onChange={event => setQuery(event.target.value)} /></label>
        <label>Note <input value={note} onChange={event => setNote(event.target.value)} /></label>
        <ul>{visible.map(product => <li key={product.id}>{product.name}</li>)}</ul>
    </>;
}`,
                    result: "Search filters the list. Editing Note can reuse the previous filtered array.",
                    explanation: [
                        "The filter runs again when `products` or `query` changes.",
                        "The list can still render.",
                        "`useMemo` caches the calculation, not the whole component."
                    ]
                }
            ]
        },
        {
            id: "stable-props",
            title: "Cached functions",
            bullets: [
                "`useCallback` returns the same function between renders while its dependencies stay unchanged.",
                "It does not call the function or cache its result.",
                "The dependencies must include the component’s props, state values, variables, and functions that the callback reads.",
                "`memo` wraps a component so React can skip rendering it when its parent renders and its props have not changed.",
                "Passing the same function helps `memo` skip that render.",
                "The other props must also stay unchanged.",
                "Updates to the child’s own state or context can still make it render."
            ],
            examples: [
                {
                    title: "Stable selection callback",
                    description: [
                        "The `onSelect` function stays the same when Note changes.",
                        "This lets React skip rendering `Picker`."
                    ],
                    language: "jsx",
                    code: `import { memo, useCallback, useState } from 'react';

const Picker = memo(function Picker({ onSelect }) {
    return <button onClick={() => onSelect('10:00')}>Choose 10:00</button>;
});

export default function Booking() {
    const [time, setTime] = useState('Not selected');
    const [note, setNote] = useState('');
    const select = useCallback(nextTime => setTime(nextTime), []);
    return <>
        <label>Note <input value={note} onChange={event => setNote(event.target.value)} /></label>
        <Picker onSelect={select} />
        <p>Time: {time}</p>
    </>;
}`,
                    result: "Choosing the time updates the label. Editing Note supplies the same callback to Picker.",
                    explanation: [
                        "React returns the same `setTime` function on every render, so it does not need to be listed as a dependency.",
                        "The empty dependency list lets `useCallback` return the same `select` function.",
                        "`Picker` receives the same `onSelect` prop when Note changes.",
                        "`memo` lets React skip rendering `Picker` for that update."
                    ]
                }
            ]
        }
    ],
    references: [
        {
            title: "React: useMemo",
            href: "https://react.dev/reference/react/useMemo"
        },
        {
            title: "React: useCallback",
            href: "https://react.dev/reference/react/useCallback"
        },
        {
            title: "React: memo",
            href: "https://react.dev/reference/react/memo"
        }
    ]
};

export default note;
