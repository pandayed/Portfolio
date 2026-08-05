/* Which column to plan around. Rendered as the label on the reason row. */
export type ComplexityCase = 'Best' | 'Average' | 'Amortised' | 'Worst';

export interface Operation {
    /* The call as it is written in C++, so it is searchable on the page. */
    signature: string;
    best: string;
    average: string;
    /* An em dash where amortising changes nothing. */
    amortised: string;
    worst: string;
    matters: ComplexityCase;
    why: string;
}

export interface Structure {
    name: string;
    /* What it is built out of. The complexities below follow from this. */
    internals: string;
    operations: Operation[];
    notes?: string[];
}

export interface Section {
    id: string;
    title: string;
    structures: Structure[];
}
