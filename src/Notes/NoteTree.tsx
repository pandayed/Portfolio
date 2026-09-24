import { useMemo, useState } from 'react';

import { toHref, type Route } from '../routing/routes';
import type { NoteGroup, NoteNode } from './noteTreeData';

interface NoteTreeProps {
    nodes: NoteNode[];
    rootGroupChildLimit?: number;
}

interface NoteTreeListProps {
    nodes: NoteNode[];
    level: number;
    query: string;
    expandedGroups: Set<string>;
    onToggleGroup: (route: string) => void;
    rootGroupChildLimit?: number;
    viewAll?: {
        route: Route;
        title: string;
    };
}

const formatDate = (date: string) =>
    new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(new Date(`${date}T00:00:00`));

const normalise = (value: string) => value.trim().toLocaleLowerCase();

const nodeMatches = (node: NoteNode, query: string) => {
    if (!query) return true;

    return `${node.title} ${node.summary ?? ''}`.toLocaleLowerCase().includes(query);
};

const nodeOrChildMatches = (node: NoteNode, query: string): boolean =>
    nodeMatches(node, query) ||
    (node.type === 'group' && node.children.some((child) => nodeOrChildMatches(child, query)));

const filterNodes = (nodes: NoteNode[], query: string): NoteNode[] => {
    if (!query) return nodes;

    return nodes
        .filter((node) => nodeOrChildMatches(node, query))
        .map((node) => {
            if (node.type === 'page' || nodeMatches(node, query)) return node;

            return {
                ...node,
                children: filterNodes(node.children, query),
            } satisfies NoteGroup;
        });
};

const collectGroupRoutes = (nodes: NoteNode[]): string[] =>
    nodes.flatMap((node) =>
        node.type === 'group' ? [node.route, ...collectGroupRoutes(node.children)] : [],
    );

const NoteTreeList = ({
    nodes,
    level,
    query,
    expandedGroups,
    onToggleGroup,
    rootGroupChildLimit,
    viewAll,
}: NoteTreeListProps) => (
    <ul className={`Notes__list Notes__list--level${level}`}>
        {nodes.map((node) => {
            const isGroup = node.type === 'group';
            const isExpanded =
                isGroup &&
                (expandedGroups.has(node.route) ||
                    (query !== '' && nodeOrChildMatches(node, query)));
            const shouldLimitChildren =
                isGroup &&
                level === 1 &&
                query === '' &&
                rootGroupChildLimit !== undefined &&
                node.children.length > rootGroupChildLimit;

            return (
                <li className="Notes__item" key={node.route}>
                    <div className="Notes__heading">
                        {isGroup && (
                            <button
                                type="button"
                                className="Notes__toggle"
                                aria-expanded={isExpanded}
                                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${node.title}`}
                                onClick={() => onToggleGroup(node.route)}
                            >
                                <span aria-hidden="true">{isExpanded ? '−' : '+'}</span>
                            </button>
                        )}
                        <a href={toHref(node.route)} className="Link Link--standalone Notes__title">
                            {node.title}
                        </a>
                    </div>
                    {node.summary && <p className="Notes__summary">{node.summary}</p>}
                    {node.type === 'page' ? (
                        <p className="Notes__updated">
                            Updated <time dateTime={node.updatedOn}>{formatDate(node.updatedOn)}</time>
                        </p>
                    ) : (
                        isExpanded && (
                            <NoteTreeList
                                nodes={shouldLimitChildren
                                    ? node.children.slice(0, rootGroupChildLimit)
                                    : node.children}
                                level={level + 1}
                                query={query}
                                expandedGroups={expandedGroups}
                                onToggleGroup={onToggleGroup}
                                rootGroupChildLimit={rootGroupChildLimit}
                                viewAll={shouldLimitChildren
                                    ? { route: node.route, title: node.title }
                                    : undefined}
                            />
                        )
                    )}
                </li>
            );
        })}
        {viewAll && (
            <li className="Notes__item">
                <a
                    href={toHref(viewAll.route)}
                    className="Link Link--standalone Notes__title"
                    aria-label={`View all ${viewAll.title} notes`}
                >
                    View All
                </a>
            </li>
        )}
    </ul>
);

const NoteTree = ({ nodes, rootGroupChildLimit }: NoteTreeProps) => {
    const [query, setQuery] = useState('');
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => new Set());
    const normalizedQuery = normalise(query);
    const visibleNodes = useMemo(
        () => filterNodes(nodes, normalizedQuery),
        [nodes, normalizedQuery],
    );
    const groupRoutes = useMemo(() => collectGroupRoutes(nodes), [nodes]);

    const toggleGroup = (route: string) => {
        setExpandedGroups((current) => {
            const next = new Set(current);
            if (next.has(route)) {
                next.delete(route);
            } else {
                next.add(route);
            }
            return next;
        });
    };

    const setAllGroupsExpanded = (isExpanded: boolean) => {
        setExpandedGroups(isExpanded ? new Set(groupRoutes) : new Set());
    };

    return (
        <section className="Notes__browser" aria-label="Notes browser">
            <div className="Notes__controls">
                <label className="Notes__searchLabel" htmlFor="notes-search">
                    Search notes
                </label>
                <input
                    id="notes-search"
                    className="Notes__search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by title or summary"
                />
                <div className="Notes__actions" aria-label="Tree actions">
                    <button
                        type="button"
                        className="Notes__action"
                        onClick={() => setAllGroupsExpanded(true)}
                    >
                        Expand all
                    </button>
                    <button
                        type="button"
                        className="Notes__action"
                        onClick={() => setAllGroupsExpanded(false)}
                    >
                        Collapse all
                    </button>
                </div>
            </div>
            {normalizedQuery && (
                <p className="Notes__result" role="status">
                    {visibleNodes.length === 0 ? 'No notes match this search.' : 'Matching notes are shown below.'}
                </p>
            )}
            {visibleNodes.length > 0 ? (
                <NoteTreeList
                    nodes={visibleNodes}
                    level={1}
                    query={normalizedQuery}
                    expandedGroups={expandedGroups}
                    onToggleGroup={toggleGroup}
                    rootGroupChildLimit={rootGroupChildLimit}
                />
            ) : (
                <p className="Notes__empty">Try a different title or topic.</p>
            )}
        </section>
    );
};

export default NoteTree;
