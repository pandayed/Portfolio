import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "rendering-performance",
    title: "Rendering performance",
    summary: "Measure slow rendering before caching values, functions, or component output.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "render-first",
            title: "Measure the work that is slow",
            bullets: [
                "React renders a component to calculate its next UI. Keep that calculation pure and correct before optimizing it.",
                "Use React DevTools Profiler to identify expensive renders. Measure representative interactions with realistic data.",
                "Keep state near the components that use it. Avoid unnecessary Effects that trigger extra state updates.",
                "React can discard caches. Correct behavior must not depend on memoization."
            ]
        },
        {
            id: "use-memo",
            title: "Cache a measured expensive calculation",
            bullets: [
                "useMemo calculates a value during rendering and reuses it while its dependencies stay unchanged.",
                "Include every reactive value read by the calculation. React compares dependencies with Object.is.",
                "A cache does not speed up the first calculation. New dependency identities cause another calculation."
            ],
            examples: [
                {
                    title: "Reuse a filtered list while editing unrelated text",
                    description: [
                        "Assume products is a large, stable array whose items have id and name. Profile the real list before choosing this optimization."
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
                        "The filter runs again when products or query changes. The list can still render; useMemo caches the calculation, not the whole component."
                    ]
                }
            ]
        },
        {
            id: "stable-props",
            title: "Keep a callback stable when a consumer benefits",
            bullets: [
                "memo can skip a parent-triggered child render when its props compare equal. Child state or context updates can still render it.",
                "useCallback reuses a function identity while dependencies stay unchanged. It does not call the function or cache its result.",
                "A stable callback helps a memoized child only when its other props also stay equal."
            ],
            examples: [
                {
                    title: "Pass a stable selection callback",
                    description: [
                        "Use this pattern only if profiling shows an expensive picker. The short button here demonstrates the prop relationship."
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
                        "The stable state setter requires no changing dependency here. memo can skip the picker’s parent-triggered render. This small example alone does not justify optimization."
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
