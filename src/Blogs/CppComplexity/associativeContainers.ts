import type { Section } from './types';

export const orderedContainers: Section = {
    id: 'ordered-containers',
    title: 'Ordered associative containers',
    structures: [
        {
            name: 'std::set<T> and std::map<K, V>',
            internals:
                'A red-black tree. Each node holds the key, a value for map, two child pointers, a parent pointer and a colour bit. The colouring rules keep the height under 2 log(n + 1), so no branch degenerates into a list.',
            operations: [
                {
                    signature: 'm.find(k), m.count(k), m.contains(k)',
                    best: 'O(1)',
                    average: 'O(log n)',
                    amortised: '—',
                    worst: 'O(log n)',
                    matters: 'Worst',
                    why: 'Compare from the root down; each comparison discards one subtree. The best case is a hit at the root, which you cannot rely on. Balancing is what makes the worst case log n rather than the n of an unbalanced tree, so worst and average agree here.',
                },
                {
                    signature: 'm.insert(x), m[k], m.emplace(...)',
                    best: 'O(log n)',
                    average: 'O(log n)',
                    amortised: 'O(1) with a correct hint',
                    worst: 'O(log n)',
                    matters: 'Worst',
                    why: 'Descend to the insertion point, add the node, rebalance upwards. Rebalancing is recolouring plus at most two rotations, all O(1), so the descent is the whole cost. Inserting with an accurate hint skips the descent, which is why building a map from sorted input is O(n).',
                },
                {
                    signature: 'm.erase(k)',
                    best: 'O(log n)',
                    average: 'O(log n)',
                    amortised: '—',
                    worst: 'O(log n)',
                    matters: 'Worst',
                    why: 'Find the node, unlink it, fix the colouring. Deletion needs at most three rotations, so again the search dominates.',
                },
                {
                    signature: 'm.erase(it)',
                    best: 'O(1)',
                    average: 'O(1)',
                    amortised: 'O(1)',
                    worst: 'O(log n)',
                    matters: 'Amortised',
                    why: 'The search is already done, so only the unlink and rebalance remain. A single call can climb the height, but erasing m elements one iterator at a time is O(m), not O(m log n).',
                },
                {
                    signature: 'm.lower_bound(k), m.upper_bound(k)',
                    best: 'O(1)',
                    average: 'O(log n)',
                    amortised: '—',
                    worst: 'O(log n)',
                    matters: 'Worst',
                    why: 'The same descent, keeping the last node not smaller than k. This is the operation you pay the tree for; a hash container cannot answer it at any cost.',
                },
                {
                    signature: '++it, --it',
                    best: 'O(1)',
                    average: 'O(1)',
                    amortised: 'O(1)',
                    worst: 'O(log n)',
                    matters: 'Amortised',
                    why: 'Moves to the in-order successor: the leftmost node of the right subtree, or the first ancestor reached from a left child. One step can climb the height, but a full traversal crosses each edge exactly twice, so a loop over the container stays O(n).',
                },
                {
                    signature: 'iterating the whole container',
                    best: 'O(n)',
                    average: 'O(n)',
                    amortised: '—',
                    worst: 'O(n)',
                    matters: 'Worst',
                    why: 'Sorted order, but a pointer chase per element instead of a linear scan, so the constant factor is far worse than a vector pass.',
                },
            ],
            notes: [
                'm[k] inserts a default-constructed value when k is missing, and does not compile on a const map. Use find or at to read.',
                'Insert and erase keep all other iterators and references valid.',
                'One allocation and three pointers per element, scattered in memory, so the constant factor is much worse than vector.',
            ],
        },
        {
            name: 'std::multiset<T> and std::multimap<K, V>',
            internals:
                'The same tree, with equal keys allowed to sit next to each other in the in-order sequence.',
            operations: [
                {
                    signature: 'm.count(k)',
                    best: 'O(log n)',
                    average: 'O(log n + k)',
                    amortised: '—',
                    worst: 'O(n)',
                    matters: 'Average',
                    why: 'One descent to the first match, then a walk over the k equal elements. On a set this is only ever 0 or 1, so the k term is the whole difference; if every key is equal, k is n.',
                },
                {
                    signature: 'm.equal_range(k)',
                    best: 'O(1)',
                    average: 'O(log n)',
                    amortised: '—',
                    worst: 'O(log n)',
                    matters: 'Worst',
                    why: 'lower_bound and upper_bound in one descent. Returning the pair does not depend on how many elements it spans; only walking the range does.',
                },
                {
                    signature: 'm.erase(k)',
                    best: 'O(log n)',
                    average: 'O(log n + k)',
                    amortised: '—',
                    worst: 'O(n)',
                    matters: 'Average',
                    why: 'It removes all k matching elements, not one. Pass an iterator when you mean to remove a single element.',
                },
            ],
        },
    ],
};

export const unorderedContainers: Section = {
    id: 'unordered-containers',
    title: 'Unordered associative containers',
    structures: [
        {
            name: 'std::unordered_set<T> and std::unordered_map<K, V>',
            internals:
                'An array of buckets, each bucket a linked list of the elements whose hash lands there. load_factor() is size() / bucket_count(), and the table rehashes when it passes max_load_factor(), 1.0 by default.',
            operations: [
                {
                    signature: 'm.find(k), m[k], m.erase(k)',
                    best: 'O(1)',
                    average: 'O(1)',
                    amortised: '—',
                    worst: 'O(n)',
                    matters: 'Average',
                    why: 'Hash the key, index the bucket array, scan that bucket. With a good hash the load factor keeps buckets about one element long, so average is the case you design for. The worst case is every key landing in one bucket, which turns the container into a linked list.',
                },
                {
                    signature: 'm.insert(x)',
                    best: 'O(1)',
                    average: 'O(1)',
                    amortised: 'O(1)',
                    worst: 'O(n)',
                    matters: 'Amortised',
                    why: 'Crossing max_load_factor allocates a larger bucket array and re-buckets every element. That is O(n) for the one call that triggers it, and constant spread over the inserts that led to it, exactly like vector growth.',
                },
                {
                    signature: 'm.reserve(n)',
                    best: 'O(1)',
                    average: 'O(n)',
                    amortised: '—',
                    worst: 'O(n)',
                    matters: 'Worst',
                    why: 'Sizes the bucket array up front so no rehash happens while filling. One deliberate O(n) instead of several accidental ones.',
                },
                {
                    signature: 'iterating the whole container',
                    best: 'O(n + bucket_count())',
                    average: 'O(n + bucket_count())',
                    amortised: '—',
                    worst: 'O(n + bucket_count())',
                    matters: 'Worst',
                    why: 'The iterator walks the bucket array, empty buckets included, and erase never shrinks it. A table that once held a million elements still iterates a million buckets when ten are left.',
                },
            ],
            notes: [
                'There is no lower_bound. Hashing removes ordering, so range and nearest-key queries are not available at any cost.',
                'Rehashing invalidates iterators but not references or pointers, because nodes are relinked rather than moved.',
                'Custom keys need std::hash and operator==. A weak hash makes every operation linear with no warning.',
                'log2(1000) is 10 comparisons, so map often wins at small n: no hashing and better locality.',
                'libstdc++ uses a prime bucket count, so every lookup pays an integer modulo.',
            ],
        },
    ],
};
