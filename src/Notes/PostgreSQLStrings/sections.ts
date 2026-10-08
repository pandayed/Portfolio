import type { TocEntry } from '../../Blogs/ArticleLayout/types';

export const sections: TocEntry[] = [
    { id: 'text-values', title: 'Text values and quotes' },
    { id: 'concatenate-text', title: 'Join text and handle NULL' },
    { id: 'change-case', title: 'Change letter case' },
    { id: 'measure-text', title: 'Count characters and bytes' },
    { id: 'extract-text', title: 'Extract part of a string' },
    { id: 'trim-text', title: 'Trim spaces and handle empty text' },
    { id: 'find-replace-text', title: 'Find and replace text' },
    { id: 'split-text', title: 'Split text into parts' },
    { id: 'pad-repeat-text', title: 'Pad, repeat, and reverse text' },
    { id: 'match-patterns', title: 'Match with LIKE and ILIKE' },
    { id: 'regular-expressions', title: 'Match and replace with regex' },
    { id: 'format-text', title: 'Format display text' },
    { id: 'aggregate-text', title: 'Join rows with STRING_AGG' },
    { id: 'references', title: 'PostgreSQL references' },
];
