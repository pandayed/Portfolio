export type LearningNoteScope =
    | 'dbms'
    | 'java'
    | 'javascript-typescript'
    | 'javascript'
    | 'typescript'
    | 'react';

export type LearningCodeLanguage =
    | 'sql'
    | 'java'
    | 'javascript'
    | 'jsx'
    | 'text'
    | 'tsx'
    | 'typescript';

export interface LearningNoteExample {
    title?: string;
    description?: readonly string[];
    language: LearningCodeLanguage;
    code: string;
    runnable?: boolean;
    commands?: string;
    result?: string;
    possibleOutput?: boolean;
    explanation?: readonly string[];
    typeCheck?: string;
}

export interface LearningNoteSection {
    id: string;
    title: string;
    paragraphs?: readonly string[];
    bullets?: readonly string[];
    table?: {
        columns: readonly string[];
        rows: readonly (readonly (string | { text: string; href: string })[])[];
    };
    examples?: readonly LearningNoteExample[];
    pitfalls?: readonly string[];
}

export interface LearningNote {
    slug: string;
    title: string;
    summary: string;
    scope: LearningNoteScope;
    updatedOn: string;
    pointwise?: boolean;
    exampleLayout?: 'grouped';
    references?: readonly { title: string; href: string }[];
    sections: readonly LearningNoteSection[];
}

export interface LearningChapter {
    id: string;
    title: string;
    summary: string;
    notes: readonly LearningNote[];
}
