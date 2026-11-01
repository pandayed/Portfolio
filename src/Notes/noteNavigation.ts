import { noteTree, type NoteGroup, type NoteNode } from './noteTreeData';

const findPath = (nodes: NoteNode[], route: string, ancestors: NoteGroup[] = []): NoteNode[] | undefined => {
    for (const node of nodes) {
        if (node.route === route) {
            // Some existing chapter links share the route of their first article.
            const articlePath = node.type === 'group' ? findPath(node.children, route, ancestors) : undefined;
            return articlePath ?? [...ancestors, node];
        }
        if (node.type === 'group') {
            const path = findPath(node.children, route, [...ancestors, node]);
            if (path) return path;
        }
    }
    return undefined;
};

export const getNotePath = (route: string): NoteNode[] => findPath(noteTree, route) ?? [];

export const getNoteParent = (route: string): NoteGroup | undefined => {
    const path = getNotePath(route);
    return path.slice(0, -1).reverse().find((node): node is NoteGroup =>
        node.type === 'group' && node.route !== route);
};

export const getNoteGroup = (route: string): NoteGroup | undefined => {
    const path = getNotePath(route);
    const node = path[path.length - 1];
    return node?.type === 'group' ? node : undefined;
};
