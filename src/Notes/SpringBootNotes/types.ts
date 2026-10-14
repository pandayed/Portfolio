import type { SpringBootRoute } from '../../routing/routes';
import type { LearningNoteExample } from '../LearningNotes/types';

export type RichTextMark =
    | readonly ['b']
    | readonly ['i']
    | readonly ['c']
    | readonly ['a', string]
    | readonly ['p', string];

export type RichText = readonly (
    | readonly [string]
    | readonly [string, readonly RichTextMark[]]
)[];

export interface SpringBootBlock {
    id: string;
    type: 'text' | 'header' | 'sub_header' | 'sub_sub_header' |
        'bulleted_list' | 'numbered_list' | 'code' | 'divider' |
        'table' | 'table_row' | 'callout' | 'quote' | 'example';
    example?: LearningNoteExample;
    richText?: RichText;
    children?: readonly SpringBootBlock[];
    language?: string;
    columnOrder?: readonly string[];
    hasColumnHeader?: boolean;
    hasRowHeader?: boolean;
    cells?: Readonly<Record<string, RichText>>;
}

export interface SpringBootDocument {
    id: string;
    title: string;
    sourceUrl: string;
    summary?: string;
    updatedOn?: string;
    sources?: readonly { title: string; url: string }[];
    blocks: readonly SpringBootBlock[];
}

export interface SpringBootPage extends SpringBootDocument {
    route: SpringBootRoute;
    parentRoute?: SpringBootRoute;
}

export interface SpringBootOutlineNode {
    slug: string;
    title?: string;
    children?: readonly SpringBootOutlineNode[];
}

export interface SpringBootChapter {
    title: string;
    summary: string;
    children: readonly SpringBootOutlineNode[];
}
