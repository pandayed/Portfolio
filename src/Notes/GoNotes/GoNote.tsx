import './GoNote.css';

import { Fragment, type ComponentProps, type ReactNode } from 'react';

import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';
import { renderInlineCode } from '../LearningNotes/renderInlineCode';
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

const withLineBreaks = (value: string, key: string, inlineCode = true): ReactNode => {
    const lines = value.split('\n');

    return lines.map((line, index) => (
        <Fragment key={`${key}-${index}`}>
            {index > 0 && <br />}
            {inlineCode ? renderInlineCode(line, `${key}-line-${index}`) : line}
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
                <a
                    key={key}
                    href={mark[1]}
                    className="Link"
                    onClick={mark[1].startsWith('#go-note-') ? (event) => {
                        event.preventDefault();
                        document.getElementById(mark[1].slice(1))?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    } : undefined}
                >
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
            withLineBreaks(value, key, !marks.some(([kind]) => kind === 'c')),
        );
    });

const codeLanguage = (language?: string): ComponentProps<typeof CodeBlock>['language'] => {
    switch (language?.toLowerCase() ?? 'go') {
        case 'go': return 'go';
        default: return 'text';
    }
};

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
        case 'example':
            return block.example ? <LearningNoteExampleBlock key={block.id} example={block.example} renderText={renderInlineCode} /> : null;
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
                <CodeBlock language={codeLanguage(block.language)} key={block.id}>
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

const renderSections = (blocks: readonly GoNoteBlock[]): ReactNode[] => {
    const sections: GoNoteBlock[][] = [];

    for (const block of blocks) {
        const isHeading = block.type === 'header' ||
            block.type === 'sub_header' || block.type === 'sub_sub_header';
        if (isHeading || sections.length === 0) sections.push([]);
        sections[sections.length - 1].push(block);
    }

    return sections.map((section) => {
        const first = section[0];
        const heading = first.type === 'header' || first.type === 'sub_header' ||
            first.type === 'sub_sub_header';

        return (
            <section
                className="Article__section GoNote__section"
                key={first.id}
                aria-labelledby={heading ? blockId(first.id) : undefined}
            >
                {renderBlocks(section)}
            </section>
        );
    });
};

// Keep imported source lists after the lesson, including sources stored inline.
const orderNoteBlocks = (blocks: readonly GoNoteBlock[]): GoNoteBlock[] => {
    const content: GoNoteBlock[] = [];
    const references: GoNoteBlock[] = [];
    let referenceHeading: GoNoteBlock | undefined;
    let inReferences = false;

    for (const block of blocks) {
        const text = plainText(block.richText).trim();
        const isHeading = block.type === 'header' || block.type === 'sub_header' ||
            block.type === 'sub_sub_header';
        const isReferenceHeading = isHeading &&
            /^(?:(?:Go )?(?:sources|references)|related notes and (?:sources|references))$/i.test(text);

        if (isHeading) inReferences = isReferenceHeading;
        if (isReferenceHeading) {
            referenceHeading ??= { ...block, richText: [['References']] };
            continue;
        }

        if (/^(?:sources|references):\s*/i.test(text) &&
            (block.type === 'text' || block.type === 'bulleted_list')) {
            const links = block.richText?.filter(([, marks]) =>
                marks?.some(([kind]) => kind === 'a' || kind === 'p')) ?? [];
            if (links.length > 0) {
                references.push(...links.map((link, index): GoNoteBlock => ({
                    id: `${block.id}-reference-${index}`,
                    type: 'bulleted_list',
                    richText: [link],
                })));
                continue;
            }
        }

        if (inReferences) {
            references.push(block.type === 'text' || block.type === 'numbered_list'
                ? { ...block, type: 'bulleted_list' } : block);
        } else {
            content.push(block);
        }
    }

    if (references.length === 0) return content;

    return [
        ...content,
        referenceHeading ?? { id: 'references', type: 'sub_header', richText: [['References']] },
        ...references,
    ];
};

const GoNote = ({ route }: GoNoteProps) => {
    const slug = route.slice(`${GO_NOTES_ROUTE}/`.length);
    const note = goNotes.find((entry) => entry.slug === slug);

    if (!note) return null;

    const blocks = orderNoteBlocks(note.blocks);

    return (
        <ArticleLayout
            title={note.title}
            route={route}
            sections={collectSections(blocks)}
            backRoute={GO_NOTES_ROUTE}
            backLabel="Back to Go notes"
        >
            {renderSections(blocks)}
        </ArticleLayout>
    );
};

export default GoNote;
