import DOMPurify from 'dompurify';
import katex from 'katex';
import { Fragment, type ReactNode } from 'react';

import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { toHref } from '../../routing/routes';
import { SYSTEM_DESIGN_ROUTE } from './path';
import { systemDesignPagesById, systemDesignViews } from './registry';
import sharedCallout from './shared/29e24eb1ed548009bd08cdb34353d01a.json';
import type { SystemDesignBlock, SystemDesignDocument } from './types';

const imageSources = import.meta.glob('./assets/*.webp', {
    query: '?url',
    import: 'default',
    eager: true,
}) as Record<string, string>;

interface BlockNode extends SystemDesignBlock {
    children: BlockNode[];
}

const buildTree = (blocks: SystemDesignBlock[]): BlockNode[] => {
    const nodes = blocks.map((block) => ({ ...block, children: [] as BlockNode[] }));
    const byId = new Map(nodes.map((node) => [node.id, node]));
    const roots: BlockNode[] = [];
    for (const node of nodes) {
        const parent = node.parent && node.parent !== node.id ? byId.get(node.parent) : undefined;
        if (parent) parent.children.push(node);
        else roots.push(node);
    }
    return roots;
};

const sharedTree = buildTree(sharedCallout.blocks as SystemDesignBlock[]);
const headingTypes = new Set(['header', 'sub_header', 'sub_sub_header']);

export const systemDesignSections = (document: SystemDesignDocument): TocEntry[] =>
    document.blocks.filter((block) => headingTypes.has(block.type)).map((block) => ({
        id: `system-design-${block.id}`,
        title: block.text || block.html?.replace(/<[^>]+>/g, '') || '',
    }));

const resolveHref = (href: string): string => {
    const url = new URL(href, 'https://xpandeyed.notion.site');
    if (url.origin !== 'https://xpandeyed.notion.site' || url.hash) return url.href;
    const id = url.pathname.match(/([0-9a-f]{32})$/)?.[1];
    if (!id) return url.href;
    const page = systemDesignPagesById.get(id);
    if (page) return toHref(page.route);
    const view = systemDesignViews.find((item) => item.id === id);
    if (view) return toHref(view.title
        ? view.route
        : systemDesignPagesById.get(view.parentId)?.route ?? SYSTEM_DESIGN_ROUTE);
    if (id === '24d24eb1ed54807d8f15d802353c44b3') return toHref(SYSTEM_DESIGN_ROUTE);
    return url.href;
};

const inlineHtml = (html: string): string => {
    const safe = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['a', 'span', 'strong', 'em', 'b', 'i', 'u', 's', 'sub', 'sup', 'br', 'code', 'mark'],
        ALLOWED_ATTR: ['href', 'title', 'style'],
    });
    const template = document.createElement('template');
    template.innerHTML = safe;
    template.content.querySelectorAll('a[href]').forEach((anchor) => {
        anchor.setAttribute('href', resolveHref(anchor.getAttribute('href') || ''));
        anchor.removeAttribute('style');
        anchor.classList.add('Link');
    });
    return template.innerHTML;
};

const Inline = ({ block }: { block: SystemDesignBlock }) =>
    block.html ? <span dangerouslySetInnerHTML={{ __html: inlineHtml(block.html) }} /> : <>{block.text}</>;

const renderList = (nodes: BlockNode[], ordered: boolean, sections: TocEntry[]): ReactNode => {
    const items = nodes.map((node) => (
        <li key={node.id}>
            <Inline block={node} />
            {renderBlocks(node.children, sections)}
        </li>
    ));
    return ordered ? <ol key={nodes[0].id}>{items}</ol> : <ul key={nodes[0].id}>{items}</ul>;
};

const renderBlock = (node: BlockNode, sections: TocEntry[]): ReactNode => {
    const children = renderBlocks(node.children, sections);
    switch (node.type) {
    case 'header':
        return <h2 id={`system-design-${node.id}`} className="SectionTitle"><Inline block={node} /></h2>;
    case 'sub_header':
        return <h3 id={`system-design-${node.id}`} className="Article__subTitle"><Inline block={node} /></h3>;
    case 'sub_sub_header':
        return <h4 id={`system-design-${node.id}`} className="Article__subTitle"><Inline block={node} /></h4>;
    case 'text':
        return <Fragment><p><Inline block={node} /></p>{children}</Fragment>;
    case 'quote':
        return <blockquote><Inline block={node} />{children}</blockquote>;
    case 'divider':
        return <hr />;
    case 'callout':
        return <aside><Inline block={node} />{children}</aside>;
    case 'toggle':
        return <details><summary><Inline block={node} /></summary>{children}</details>;
    case 'transclusion_container':
    case 'transclusion_reference':
        return <Fragment>{children}</Fragment>;
    case 'shared_ref':
        return <Fragment>{renderBlocks(sharedTree, sections)}</Fragment>;
    case 'equation':
        return <div className="SystemDesignNote__math" dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(katex.renderToString(node.tex || '', {
                displayMode: true,
                throwOnError: false,
            })),
        }} />;
    case 'code':
        return <pre className="Article__code"><code>{node.text}</code></pre>;
    case 'alias': {
        const link = node.links?.[0];
        return link ? <p><a className="Link" href={resolveHref(link.href)}>{link.text}</a></p> : null;
    }
    case 'table':
        return <div className="Article__tableWrap"><table className="Article__table"><tbody>
            {node.rows?.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) =>
                cell.header
                    ? <th key={cellIndex} scope="col" dangerouslySetInnerHTML={{ __html: inlineHtml(cell.html) }} />
                    : <td key={cellIndex} dangerouslySetInnerHTML={{ __html: inlineHtml(cell.html) }} />,
            )}</tr>)}
        </tbody></table></div>;
    case 'image': {
        const src = node.localImage
            ? imageSources[`./assets/${node.localImage}`]
            : new URL(node.src || '', 'https://xpandeyed.notion.site').href;
        return <img src={src} alt={node.alt || ''} loading="lazy" />;
    }
    case 'video':
        return node.src ? <div className="SystemDesignNote__video"><iframe
            src={node.src}
            title="Embedded video"
            loading="lazy"
            allowFullScreen
        /></div> : null;
    case 'collection_view':
        return <section className="SystemDesignNote__collection">
            {node.title && <h3 className="Article__subTitle">{node.title}</h3>}
            <ul>{node.pageIds?.map((id) => {
                const page = systemDesignPagesById.get(id);
                return page && <li key={id}><a className="Link" href={toHref(page.route)}>
                    {page.icon ? `${page.icon} ` : ''}{page.title}
                </a></li>;
            })}</ul>
        </section>;
    case 'table_of_contents':
        return <nav aria-label="On this page"><ul>{sections.map((section) =>
            <li key={section.id}><a className="Link" href={`#${section.id}`} onClick={(event) => {
                event.preventDefault();
                document.getElementById(section.id)?.scrollIntoView();
            }}>{section.title}</a></li>,
        )}</ul></nav>;
    default:
        return <Fragment><p><Inline block={node} /></p>{children}</Fragment>;
    }
};

const renderBlocks = (nodes: BlockNode[], sections: TocEntry[]): ReactNode[] => {
    const output: ReactNode[] = [];
    for (let index = 0; index < nodes.length;) {
        const node = nodes[index];
        if (node.type === 'bulleted_list' || node.type === 'numbered_list') {
            const end = nodes.findIndex((next, offset) => offset > index && next.type !== node.type);
            const stop = end === -1 ? nodes.length : end;
            output.push(renderList(nodes.slice(index, stop), node.type === 'numbered_list', sections));
            index = stop;
        } else {
            output.push(<Fragment key={node.id}>{renderBlock(node, sections)}</Fragment>);
            index += 1;
        }
    }
    return output;
};

const SystemDesignContent = ({ document }: { document: SystemDesignDocument }) => {
    const sections = systemDesignSections(document);
    return <section className="Article__section SystemDesignNote__content">
        {renderBlocks(buildTree(document.blocks), sections)}
    </section>;
};

export default SystemDesignContent;
