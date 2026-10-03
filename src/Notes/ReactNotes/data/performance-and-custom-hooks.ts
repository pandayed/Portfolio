import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'performance-and-custom-hooks',
    title: 'Performance and custom Hooks',
    summary: 'Measure a real slowdown before memoizing, and extract a custom Hook when components share stateful logic.',
    scope: 'react',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'render-first',
            title: 'Keep rendering correct before optimizing it',
            paragraphs: [
                'A component should produce the correct UI without memoization. Fix unnecessary Effects, misplaced state, and broad state updates before adding a cache.',
                'Rendering is React behavior. The calculations inside rendering are JavaScript. TypeScript checks their inputs and outputs but does not make them faster.',
            ],
            bullets: [
                'Keep state close to the components that use it.',
                'Keep rendering pure.',
                'Measure the slow interaction before and after an optimization.',
            ],
        },
        {
            id: 'use-memo',
            title: 'useMemo caches an expensive calculation',
            paragraphs: [
                'useMemo can reuse a calculated value while its dependencies stay the same. Use it only as a performance optimization. The component must still work if React recalculates the value.',
            ],
            examples: [{
                title: 'Cache a measured list calculation',
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
                'Do not add useMemo to every calculation. Most small calculations are fast, and memoization adds its own code and dependency checks.',
                'Do not use useMemo to make incorrect code work. Its cached value is not a semantic guarantee.',
            ],
        },
        {
            id: 'stable-props',
            title: 'Stable values help only when something uses that stability',
            paragraphs: [
                'useCallback caches a function definition. memo can skip rendering a component when its props are unchanged. These tools help only when a measured slow path depends on stable identity.',
            ],
            bullets: [
                'A new function or object on each render is not automatically a problem.',
                'One always-new prop can prevent a memoized child from skipping its render.',
                'Prefer clear code until measurement shows that identity changes cause useful work to repeat.',
            ],
        },
        {
            id: 'custom-hooks',
            title: 'A custom Hook shares stateful logic',
            paragraphs: [
                'A custom Hook is a function whose name starts with use and that calls one or more Hooks. Extract one when several components need the same stateful process.',
                'Each call gets its own state. A custom Hook shares logic, not one shared state value.',
            ],
            examples: [{
                title: 'Reuse online-status behavior',
                language: 'tsx',
                code: `import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
    window.addEventListener('online', callback);
    window.addEventListener('offline', callback);
    return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
    };
}

function getSnapshot() {
    return navigator.onLine;
}

function getServerSnapshot() {
    return true;
}

function useOnlineStatus() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function NetworkStatus() {
    const online = useOnlineStatus();
    return <p>{online ? 'Online' : 'Offline'}</p>;
}`,
                result: 'The paragraph changes between “Online” and “Offline” when the browser reports a connection change. The server snapshot avoids reading browser-only APIs during server rendering.',
            }],
        },
        {
            id: 'custom-hook-boundaries',
            title: 'Name a custom Hook by its purpose',
            paragraphs: [
                'A custom Hook should describe a specific behavior such as useOnlineStatus. Avoid lifecycle names such as useMount because they hide the real synchronization and its dependencies.',
            ],
            bullets: [
                'Custom Hooks follow the same top-level calling rules as built-in Hooks.',
                'Custom Hook code runs again when the component using it renders.',
                'Keep the Hook pure outside its event handlers and Effects.',
            ],
        },
        {
            id: 'optimization-checklist',
            title: 'Optimize from evidence',
            bullets: [
                'Find the slow user interaction.',
                'Use React profiling tools or timing measurements to locate repeated work.',
                'Make the smallest change that removes that work.',
                'Measure again to confirm the change helped.',
                'Remove memoization that does not improve the measured interaction.',
            ],
        },
    ],
};

export default note;
