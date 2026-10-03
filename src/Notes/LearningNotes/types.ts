export type LearningNoteScope =
    | 'javascript-typescript'
    | 'javascript'
    | 'typescript'
    | 'react';

export type LearningCodeLanguage =
    | 'javascript'
    | 'jsx'
    | 'text'
    | 'tsx'
    | 'typescript';

export interface LearningNoteExample {
    title?: string;
    language: LearningCodeLanguage;
    code: string;
    result?: string;
    typeCheck?: string;
}

export interface LearningNoteSection {
    id: string;
    title: string;
    paragraphs?: readonly string[];
    bullets?: readonly string[];
    examples?: readonly LearningNoteExample[];
    pitfalls?: readonly string[];
}

export interface LearningNote {
    slug: string;
    title: string;
    summary: string;
    scope: LearningNoteScope;
    updatedOn: string;
    sections: readonly LearningNoteSection[];
}

export interface LearningChapter {
    id: string;
    title: string;
    summary: string;
    notes: readonly LearningNote[];
}
