import './GoNote.css';

import { Fragment, type ReactNode } from 'react';

import ArticleLayout from '../../Blogs/ArticleLayout/ArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import {
    GO_NOTES_ROUTE,
    toHref,
    type GoNoteRoute,
} from '../../routing/routes';
import { goNotes } from './goNotes';
import type { GoNoteBlock, RichText, RichTextMark } from './types';

interface GoNoteProps {
    route: GoNoteRoute;
}

const blockId = (id: string) => `go-note-${id}`;

const goNoteRoutesByNotionId = new Map<string, GoNoteRoute>(
    goNotes.map(({ notionId, slug }) => [
        notionId,
        `${GO_NOTES_ROUTE}/${slug}` as GoNoteRoute,
    ]),
);

const plainText = (richText: RichText | undefined) =>
    richText?.map(([value]) => value).join('') ?? '';

const withLineBreaks = (value: string, key: string): ReactNode => {
    const lines = value.split('\n');

    return lines.map((line, index) => (
        <Fragment key={`${key}-${index}`}>
            {index > 0 && <br />}
            {line}
        </Fragment>
    ));
};

const applyMark = (content: ReactNode, mark: RichTextMark, key: string): ReactNode => {
    switch (mark[0]) {
        case 'b':
            return <strong key={key}>{content}</strong>;
        case 'i':
            return <em key={key}>{content}</em>;
        case 'c':
            return <code key={key}>{content}</code>;
        case 'a':
            return (
                <a key={key} href={mark[1]} className="Link">
                    {content}
                </a>
            );
        case 'p': {
            const route = goNoteRoutesByNotionId.get(mark[1]);
            return route ? (
                <a key={key} href={toHref(route)} className="Link">
                    {content}
                </a>
            ) : (
                content
            );
        }
    }
};

const renderRichText = (richText: RichText | undefined) =>
    richText?.map(([value, marks = []], index) => {
        const key = `rich-text-${index}`;
        return marks.reduce<ReactNode>(
            (content, mark, markIndex) => applyMark(content, mark, `${key}-${markIndex}`),
            withLineBreaks(value, key),
        );
    });

const renderTable = (block: GoNoteBlock) => {
    const rows = block.children ?? [];
    const columns = block.columnOrder ?? [];

    return (
        <div className="Article__tableWrap" key={block.id}>
            <table className="Article__table">
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={row.id}>
                            {columns.map((column, columnIndex) => {
                                const content = renderRichText(row.cells?.[column]);
                                if (block.hasColumnHeader && rowIndex === 0) {
                                    return (
                                        <th scope="col" key={column}>
                                            {content}
                                        </th>
                                    );
                                }

                                if (block.hasRowHeader && columnIndex === 0) {
                                    return (
                                        <th scope="row" key={column}>
                                            {content}
                                        </th>
                                    );
                                }

                                return <td key={column}>{content}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const renderBlock = (block: GoNoteBlock): ReactNode => {
    switch (block.type) {
        case 'text':
            return plainText(block.richText) ? (
                <p key={block.id}>{renderRichText(block.richText)}</p>
            ) : null;
        case 'header':
        case 'sub_header':
            return (
                <h2 id={blockId(block.id)} className="SectionTitle" key={block.id}>
                    {renderRichText(block.richText)}
                </h2>
            );
        case 'sub_sub_header':
            return (
                <h3 id={blockId(block.id)} className="Article__subTitle" key={block.id}>
                    {renderRichText(block.richText)}
                </h3>
            );
        case 'code':
            return (
                <CodeBlock language="go" key={block.id}>
                    {plainText(block.richText)}
                </CodeBlock>
            );
        case 'divider':
            return <hr className="GoNote__divider" key={block.id} />;
        case 'table':
            return renderTable(block);
        case 'callout':
            return (
                <aside className="GoNote__callout" key={block.id}>
                    {renderBlocks(block.children ?? [])}
                </aside>
            );
        case 'quote':
            return (
                <blockquote className="GoNote__quote" key={block.id}>
                    {renderRichText(block.richText)}
                </blockquote>
            );
        case 'table_row':
        case 'bulleted_list':
        case 'numbered_list':
            return null;
    }
};

const renderBlocks = (blocks: readonly GoNoteBlock[]): ReactNode[] => {
    const rendered: ReactNode[] = [];

    for (let index = 0; index < blocks.length; index += 1) {
        const block = blocks[index];
        if (block.type !== 'bulleted_list' && block.type !== 'numbered_list') {
            rendered.push(renderBlock(block));
            continue;
        }

        const listType = block.type;
        const items: GoNoteBlock[] = [];
        while (index < blocks.length && blocks[index].type === listType) {
            items.push(blocks[index]);
            index += 1;
        }
        index -= 1;

        const List = listType === 'bulleted_list' ? 'ul' : 'ol';
        const className = listType === 'bulleted_list' ? 'Article__notes' : 'Article__steps';
        rendered.push(
            <List className={className} key={items[0].id}>
                {items.map((item) => (
                    <li key={item.id}>
                        {renderRichText(item.richText)}
                        {item.children && item.children.length > 0 && (
                            <div className="GoNote__listChildren">
                                {renderBlocks(item.children)}
                            </div>
                        )}
                    </li>
                ))}
            </List>,
        );
    }

    return rendered;
};

const collectSections = (blocks: readonly GoNoteBlock[]): TocEntry[] =>
    blocks.flatMap((block) => [
        ...(block.type === 'header' ||
        block.type === 'sub_header' ||
        block.type === 'sub_sub_header'
            ? [{ id: blockId(block.id), title: plainText(block.richText) }]
            : []),
        ...collectSections(block.children ?? []),
    ]);

const GoNote = ({ route }: GoNoteProps) => {
    const slug = route.slice(`${GO_NOTES_ROUTE}/`.length);
    const note = goNotes.find((entry) => entry.slug === slug);

    if (!note) return null;

    return (
        <ArticleLayout
            title={note.title}
            route={route}
            sections={collectSections(note.blocks)}
            backRoute={GO_NOTES_ROUTE}
            backLabel="Back to Go notes"
        >
            <section className="Article__section">{renderBlocks(note.blocks)}</section>
        </ArticleLayout>
    );
};

export default GoNote;
