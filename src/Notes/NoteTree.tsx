import { toHref } from '../routing/routes';
import type { NoteNode } from './noteTreeData';

interface NoteTreeProps {
    nodes: NoteNode[];
    level?: number;
}

const formatDate = (date: string) =>
    new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(new Date(`${date}T00:00:00`));

const NoteTree = ({ nodes, level = 1 }: NoteTreeProps) => (
    <ul className={`Notes__list Notes__list--level${level}`}>
        {nodes.map((node) => (
            <li className="Notes__item" key={node.route}>
                <a href={toHref(node.route)} className="Link Link--standalone Notes__title">
                    {node.title}
                </a>
                {node.summary && <p className="Notes__summary">{node.summary}</p>}
                {node.type === 'page' ? (
                    <p className="Notes__updated">
                        Updated <time dateTime={node.updatedOn}>{formatDate(node.updatedOn)}</time>
                    </p>
                ) : (
                    <NoteTree nodes={node.children} level={level + 1} />
                )}
            </li>
        ))}
    </ul>
);

export default NoteTree;
