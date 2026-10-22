import './SpringBootNote.css';

import { Fragment, type ComponentProps, type ReactNode } from 'react';

import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { SPRING_BOOT_NOTES_ROUTE, toHref, type SpringBootRoute } from '../../routing/routes';
import NoteArticleLayout from '../NoteArticleLayout';
import { getSpringBootBlocks, springBootPages, springBootPagesByRoute } from './registry';
import { renderExampleText } from './renderExampleText';
import type { RichText, RichTextMark, SpringBootBlock } from './types';

interface SpringBootNoteProps {
    route: SpringBootRoute;
}

const blockId = (id: string) => `spring-boot-${id}`;
const normalizeId = (id: string) => id.replace(/-/g, '').toLowerCase();
const pageRoutesById = new Map(springBootPages.map((page) => [normalizeId(page.id), page.route]));
const plainText = (richText: RichText | undefined) =>
    richText?.map(([value]) => value).join('') ?? '';

const safeHref = (value: string): string | undefined => {
    const localRoute = value.startsWith('#/') ? value.slice(1) : value;
    const localPage = springBootPages.find((page) => page.route === localRoute);
    if (localPage) return toHref(localPage.route);
    try {
        const url = new URL(value, 'https://xpandeyed.notion.site');
        if (!['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) return undefined;
        if (url.origin === 'https://xpandeyed.notion.site') {
            const id = url.pathname.match(/([0-9a-f]{32}|[0-9a-f-]{36})$/i)?.[1];
            const route = id ? pageRoutesById.get(normalizeId(id)) : undefined;
            if (route && !url.hash) return toHref(route);
        }
        return url.href;
    } catch {
        return undefined;
    }
};

const withLineBreaks = (value: string, key: string): ReactNode =>
    value.split('\n').map((line, index) => (
        <Fragment key={`${key}-${index}`}>
            {index > 0 && <br />}
            {line}
        </Fragment>
    ));

const applyMark = (content: ReactNode, mark: RichTextMark, key: string): ReactNode => {
    switch (mark[0]) {
        case 'b': return <strong key={key}>{content}</strong>;
        case 'i': return <em key={key}>{content}</em>;
        case 'c': return <code key={key}>{content}</code>;
        case 'a': {
            const href = safeHref(mark[1]);
            return href ? <a key={key} href={href} className="Link">{content}</a> : content;
        }
        case 'p': {
            const id = normalizeId(mark[1]);
            const route = pageRoutesById.get(id);
            const href = route ? toHref(route) : safeHref(`https://xpandeyed.notion.site/${id}`);
            return href ? <a key={key} href={href} className="Link">{content}</a> : content;
        }
        default: return content;
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

const codeLanguage = (language?: string): ComponentProps<typeof CodeBlock>['language'] => {
    switch (language?.toLowerCase()) {
        case 'go': return 'go';
        case 'java': return 'java';
        case 'javascript': return 'javascript';
        case 'jsx': return 'jsx';
        case 'python': return 'python';
        case 'sql': return 'sql';
        case 'tsx': return 'tsx';
        case 'typescript': return 'typescript';
        default: return 'text';
    }
};

const renderTable = (block: SpringBootBlock) => (
    <div className="Article__tableWrap" key={block.id}>
        <table className="Article__table">
            <tbody>
                {block.children?.map((row, rowIndex) => (
                    <tr key={row.id}>
                        {block.columnOrder?.map((column, columnIndex) => {
                            const content = renderRichText(row.cells?.[column]);
                            if (block.hasColumnHeader && rowIndex === 0) {
                                return <th scope="col" key={column}>{content}</th>;
                            }
                            if (block.hasRowHeader && columnIndex === 0) {
                                return <th scope="row" key={column}>{content}</th>;
                            }
                            return <td key={column}>{content}</td>;
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const renderBlock = (block: SpringBootBlock): ReactNode => {
    const children = block.children?.length ? renderBlocks(block.children) : null;
    switch (block.type) {
        case 'example':
            return block.example ? <LearningNoteExampleBlock key={block.id} example={block.example} renderText={renderExampleText} /> : null;
        case 'text':
            return <Fragment key={block.id}>
                {plainText(block.richText) && <p>{renderRichText(block.richText)}</p>}
                {children}
            </Fragment>;
        case 'header':
            return <Fragment key={block.id}>
                <h2 id={blockId(block.id)} className="SectionTitle">{renderRichText(block.richText)}</h2>
                {children}
            </Fragment>;
        case 'sub_header':
            return <Fragment key={block.id}>
                <h2 id={blockId(block.id)} className="SectionTitle">{renderRichText(block.richText)}</h2>
                {children}
            </Fragment>;
        case 'sub_sub_header':
            return <Fragment key={block.id}>
                <h3 id={blockId(block.id)} className="Article__subTitle">{renderRichText(block.richText)}</h3>
                {children}
            </Fragment>;
        case 'code':
            return <Fragment key={block.id}>
                <CodeBlock language={codeLanguage(block.language)}>{plainText(block.richText)}</CodeBlock>
                {children}
            </Fragment>;
        case 'divider':
            return <hr className="SpringBootNote__divider" key={block.id} />;
        case 'table': return renderTable(block);
        case 'callout':
            return <aside className="SpringBootNote__callout" key={block.id}>
                {plainText(block.richText) && <p>{renderRichText(block.richText)}</p>}
                {children}
            </aside>;
        case 'quote':
            return <blockquote className="SpringBootNote__quote" key={block.id}>
                {plainText(block.richText) && <p>{renderRichText(block.richText)}</p>}
                {children}
            </blockquote>;
        case 'table_row':
        case 'bulleted_list':
        case 'numbered_list': return null;
        default:
            return <Fragment key={block.id}>
                {plainText(block.richText) && <p>{renderRichText(block.richText)}</p>}
                {children}
            </Fragment>;
    }
};

const renderBlocks = (blocks: readonly SpringBootBlock[]): ReactNode[] => {
    const rendered: ReactNode[] = [];
    for (let index = 0; index < blocks.length; index += 1) {
        const block = blocks[index];
        if (block.type !== 'bulleted_list' && block.type !== 'numbered_list') {
            rendered.push(renderBlock(block));
            continue;
        }
        const listType = block.type;
        const items: SpringBootBlock[] = [];
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
                        {!!item.children?.length && (
                            <div className="SpringBootNote__listChildren">{renderBlocks(item.children)}</div>
                        )}
                    </li>
                ))}
            </List>,
        );
    }
    return rendered;
};

const isHeading = (block: SpringBootBlock) =>
    block.type === 'header' || block.type === 'sub_header' || block.type === 'sub_sub_header';

const collectSections = (blocks: readonly SpringBootBlock[]): TocEntry[] =>
    blocks.flatMap((block) => [
        ...(isHeading(block) ? [{ id: blockId(block.id), title: plainText(block.richText) }] : []),
        ...collectSections(block.children ?? []),
    ]);

const renderSections = (blocks: readonly SpringBootBlock[]): ReactNode[] => {
    const sections: SpringBootBlock[][] = [];
    for (const block of blocks) {
        if (isHeading(block) || sections.length === 0) sections.push([]);
        sections[sections.length - 1].push(block);
    }
    return sections.map((section) => (
        <section
            className="Article__section SpringBootNote__section"
            key={section[0].id}
            aria-labelledby={isHeading(section[0]) ? blockId(section[0].id) : undefined}
        >
            {renderBlocks(section)}
        </section>
    ));
};

const SpringBootNote = ({ route }: SpringBootNoteProps) => {
    const page = springBootPagesByRoute.get(route);
    if (!page) return null;
    const blocks = getSpringBootBlocks(page);
    const parent = page.parentRoute ? springBootPagesByRoute.get(page.parentRoute) : undefined;
    const sourcesId = `spring-boot-${page.id}-sources`;
    const sections = collectSections(blocks);
    if (page.sources?.length) sections.push({ id: sourcesId, title: 'Sources and related lessons' });
    return (
        <NoteArticleLayout
            title={page.title}
            route={page.route}
            sections={sections}
            backRoute={parent?.route ?? SPRING_BOOT_NOTES_ROUTE}
            backLabel={parent ? `Back to ${parent.title}` : 'Back to Spring Boot notes'}
        >
            {renderSections(blocks)}
            {!!page.sources?.length && (
                <section className="Article__section" aria-labelledby={sourcesId}>
                    <h2 className="SectionTitle" id={sourcesId}>Sources and related lessons</h2>
                    <ul className="Article__notes">
                        {page.sources.map((source) => {
                            const href = safeHref(source.url);
                            return <li key={source.url}>{href
                                ? <a className="Link" href={href}>{source.title}</a>
                                : source.title}</li>;
                        })}
                    </ul>
                </section>
            )}
        </NoteArticleLayout>
    );
};

export default SpringBootNote;
