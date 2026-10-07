import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'performance-and-custom-hooks',
    title: 'Performance and custom Hooks',
    summary: 'Measure slow interactions before caching values. Reuse state logic with custom Hooks.',
    scope: 'react',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'render-first',
            title: 'Keep rendering correct before optimizing it',
            bullets: [
                'A component should show the correct UI before you add memoization.',
                'Memoization means caching a result so later calls can reuse it.',
                'Fix unnecessary Effects, state stored too far from its users, and updates that affect too many components before adding a cache.',
                'React controls rendering.',
                'JavaScript runs the calculations inside it.',
                'TypeScript checks calculation inputs and outputs.',
                'It does not make the calculation faster.',
                'Keep state close to the components that use it.',
                'Keep rendering pure: calculate JSX without changing data outside the calculation.',
                'Measure the slow interaction before and after an optimization.',
            ],
        },
        {
            id: 'use-memo',
            title: 'useMemo caches an expensive calculation',
            bullets: [
                'useMemo can reuse a calculated value while its dependencies stay the same.',
                'Dependencies are the inputs listed for that calculation.',
                'Use useMemo to improve measured performance.',
                'The component must still work if React calculates the value again.',
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
                'Do not add useMemo to every calculation.',
                'Most small calculations are fast, and memoization adds its own code and dependency checks.',
                'The component must work even if React discards the cached value.',
            ],
        },
        {
            id: 'stable-props',
            title: 'Stable values help only when something uses that stability',
            bullets: [
                'useCallback caches a function definition.',
                'memo can skip a component render when its props are unchanged.',
                'A stable identity means React receives the same function or object between renders.',
                'Use these tools when measurement shows that changing identity causes slow work to repeat.',
                'A new function or object on each render is not automatically a problem.',
                'One always-new prop can prevent a memoized child from skipping its render.',
            ],
        },
        {
            id: 'custom-hooks',
            title: 'A custom Hook shares stateful logic',
            bullets: [
                'A custom Hook is a function whose name starts with use followed by a capital letter.',
                'It calls one or more Hooks to reuse stateful logic, which is logic that keeps or responds to state.',
                'Each call has its own state.',
                'Reusing a custom Hook does not share one state value between components.',
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
            bullets: [
                'Name a custom Hook for the behavior it provides, such as useOnlineStatus.',
                'Avoid lifecycle names such as useMount.',
                'They do not explain what the Hook synchronizes or which values it depends on.',
                'Custom Hooks follow the same top-level calling rules as built-in Hooks.',
                'Custom Hook code runs again when the component using it renders.',
                'Outside event handlers and Effects, the Hook must not change data outside its calculation.',
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
