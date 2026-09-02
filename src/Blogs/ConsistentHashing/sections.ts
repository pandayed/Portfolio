import type { TocEntry } from '../ArticleLayout/types';

export const sections: TocEntry[] = [
    { id: 'rehashing-problem', title: 'Simple Hash Based Distribution (brief)' },
    { id: 'hash-space', title: 'The hash space' },
    { id: 'hash-ring', title: 'The hash ring' },
    { id: 'node-placement', title: 'Placing nodes on the ring' },
    { id: 'node-lookup', title: 'Finding the right server for a key' },
    { id: 'uneven-distribution', title: 'Uneven distribution problem' },
];
