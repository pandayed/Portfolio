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

export type GoNoteBlockType =
    | 'text'
    | 'header'
    | 'sub_header'
    | 'sub_sub_header'
    | 'bulleted_list'
    | 'numbered_list'
    | 'code'
    | 'divider'
    | 'table'
    | 'table_row'
    | 'callout'
    | 'quote';

export interface GoNoteBlock {
    id: string;
    type: GoNoteBlockType;
    richText?: RichText;
    children?: readonly GoNoteBlock[];
    language?: string;
    columnOrder?: readonly string[];
    hasColumnHeader?: boolean;
    hasRowHeader?: boolean;
    cells?: Readonly<Record<string, RichText>>;
}

export interface GoNote {
    notionId: string;
    slug: string;
    title: string;
    updatedOn: string;
    blocks: readonly GoNoteBlock[];
}
