import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'performance-and-custom-hooks',
    title: 'Custom Hooks and performance',
    summary: 'Measure slow interactions before caching values. Reuse state logic with custom Hooks.',
    scope: 'react',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'custom-hooks',
            title: 'A custom Hook shares stateful logic',
            bullets: [
                "A custom Hook is a function that calls Hooks to provide reusable state logic.",
                "Read State and events and Hooks and their rules before extracting this behavior.",
                "Its name starts with use followed by a capital letter, such as useCounter.",
                "The example moves count state and its increment handler into useCounter.",
                "Counters calls useCounter twice. Each call keeps independent state in that component.",
                "The returned object provides values and handlers for the component's JSX.",
            ],
            examples: [{
                title: 'Reuse a counter with independent state',
                language: 'tsx',
                code: `import { useState } from 'react';

function useCounter() {
    const [count, setCount] = useState(0);
    function increment() {
        setCount((previous) => previous + 1);
    }
    return { count, increment };
}

export function Counters() {
    const first = useCounter();
    const second = useCounter();

    return (
        <>
            <button onClick={first.increment}>First: {first.count}</button>
            <button onClick={second.increment}>Second: {second.count}</button>
        </>
    );
}`,
                result: 'Both buttons start at 0. Clicking First twice shows First: 2 and Second: 0. Clicking Second once shows First: 2 and Second: 1.',
            }],
        },
        {
            id: 'custom-hook-boundaries',
            title: 'Name a custom Hook by its purpose',
            bullets: [
                "Call a custom Hook at the top level, before conditional returns. Its internal Hooks still need the same call order on every render.",
                "const first = useCounter() belongs in the component body. Do not move that call into a click handler.",
                "Call the returned first.increment in the handler. That function updates existing state without calling another Hook.",
                "Use a custom Hook for behavior that calls Hooks, such as state plus timer cleanup. Use an ordinary function for a plain calculation.",
                "A store holds data outside an individual component. Two Hook calls that read the same store can see the same data. That shared data comes from the store.",
                "The Hooks reference shows useDebouncedValue for delayed input and useSyncExternalStore for browser status. Read their prerequisites before using them.",
            ],
        },
        {
            id: 'render-first',
            title: 'Keep rendering correct before optimizing it',
            bullets: [
                "A component must display the correct result before you try to reduce its rendering work.",
                "Read State and events and Effects and cleanup before this page.",
                "Memoization means keeping a calculated result so later renders can reuse it.",
                "A cache stores that result. It does not fix an incorrect calculation or a missing dependency.",
                "Keep state close to the components that display it. Avoid Effects that store values already calculated from props or state.",
                "Pure rendering calculates JSX without changing objects outside the calculation or starting requests.",
                "Measure the slow interaction before and after changing it. A longer component is not automatically slower.",
            ],
        },
        {
            id: 'use-memo',
            title: 'useMemo caches an expensive calculation',
            bullets: [
                "useMemo calculates a value during rendering and can reuse it while dependencies stay the same.",
                "The example filters products using query. Its dependencies are therefore [products, query].",
                "filter returns a new array of matching products. includes checks whether the name contains the query.",
                "With names Tea and Coffee and query te, the list contains Tea. Converting both strings to lowercase makes the match ignore case.",
                "A parent update with the same products array and query can reuse the previous filtered array.",
                "React compares dependencies by Object.is. Mutating an existing products array does not give it a new object identity.",
                "This example shows the syntax. It does not prove that this particular list is slow enough to need a cache.",
            ],
            examples: [{
                title: 'Cache a filtered product list',
                language: 'tsx',
                code: `import { useMemo } from 'react';

type Product = { id: string; name: string };

export function ProductList({
    products,
    query,
}: {
    products: Product[];
    query: string;
}) {
    const visibleProducts = useMemo(() => {
        const normalizedQuery = query.toLowerCase();
        return products.filter((product) =>
            product.name.toLowerCase().includes(normalizedQuery),
        );
    }, [products, query]);

    return (
        <ul>
            {visibleProducts.map((product) => <li key={product.id}>{product.name}</li>)}
        </ul>
    );
}`,
                result: 'The list shows only matching products. React can reuse the filtered array while products and query have not changed.',
            }],
            pitfalls: [
                "Changing [products, query] to [products] can show old matches after the query changes. It does not throw. Keep query in the dependency list.",
                "Changing a product in the existing products array can leave the cached result outdated. Pass a new array when its data changes.",
                "Most small calculations are fast. Add useMemo only when measured work is slow or another optimization needs the same object.",
                "React may discard the cached value. Keep the calculation pure and correct when repeated.",
            ],
        },
        {
            id: 'stable-props',
            title: 'Stable values help only when something uses that stability',
            bullets: [
                "An object or function has identity: two separately created functions or objects are different values.",
                "memo wraps a component and can skip a parent-triggered render when its props stay the same.",
                "useCallback keeps a function value between renders while its dependencies stay the same. It does not call the function.",
                "If a parent creates a new onSelect function every render, a child wrapped in memo sees a changed prop.",
                "Using useCallback for that prop can let the child skip unrelated parent updates. The Hooks reference has a full AppointmentPicker example.",
                "A child still renders for changes to its own state or context. memo does not prevent those updates.",
                "Creating a function each render is usually fine. Use stable props to fix measured repeated work.",
            ],
            examples: [{
                title: 'Compare two function values',
                language: 'javascript',
                code: `const first = () => '10:00';
const second = () => '10:00';
const same = first;

console.log(Object.is(first, second)); // false
console.log(Object.is(first, same));   // true`,
                result: 'Two functions can return the same text and still have different identities. The same function reference compares equal.',
            }],
        },
        {
            id: 'optimization-checklist',
            title: 'Optimize from evidence',
            bullets: [
                "Choose one slow interaction, such as typing in a large product list.",
                "Use React DevTools Profiler to record which components render and how long that work takes.",
                "A profiler is a tool that records execution time. JavaScript timing measurements can also identify a slow calculation.",
                "Check performance in a production build on a device similar to the reader's target device. Development checks can add extra work.",
                "Change the repeated work you measured, then record the same interaction again.",
                "Remove a cache if it adds complexity without improving that interaction.",
            ],
        },
    ],
};

export default note;
