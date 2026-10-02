import './SystemDesignEntry.css';
import 'katex/dist/katex.min.css';

import { useEffect, useState } from 'react';

import ArticleLayout from '../NoteArticleLayout';
import NoteTree from '../NoteTree';
import NoteReadingTime from '../NoteReadingTime';
import { getNodeReadingMinutes } from '../readingTime';
import { systemDesignNotes, type NoteGroup, type NoteNode } from '../noteTreeData';
import Page from '../../Page/Page';
import { SYSTEM_DESIGN_ROUTE, toHref, type SystemDesignEntryRoute } from '../../routing/routes';
import SystemDesignContent, { systemDesignSections } from './SystemDesignContent';
import { systemDesignPagesById, systemDesignPagesByRoute, systemDesignViewsByRoute } from './registry';
import type { SystemDesignDocument } from './types';

interface Props {
    route: SystemDesignEntryRoute;
}

const findGroup = (nodes: NoteNode[], route: string): NoteGroup | undefined => {
    for (const node of nodes) {
        if (node.type !== 'group') continue;
        if (node.route === route) return node;
        const child = findGroup(node.children, route);
        if (child) return child;
    }
    return undefined;
};

const SystemDesignEntry = ({ route }: Props) => {
    const page = systemDesignPagesByRoute.get(route);
    const [source, setSource] = useState<SystemDesignDocument | null>(null);
    const [loadFailed, setLoadFailed] = useState(false);
    useEffect(() => {
        let active = true;
        setSource(null);
        setLoadFailed(false);
        if (page) page.load().then((document) => {
            if (active) setSource(document);
        }).catch(() => {
            if (active) setLoadFailed(true);
        });
        return () => { active = false; };
    }, [page]);

    if (page) {
        return (
            <ArticleLayout
                title={page.title}
                route={route}
                sections={source ? systemDesignSections(source) : []}
                backRoute={SYSTEM_DESIGN_ROUTE}
                backLabel="Back to System Design notes"
            >
                {source ? <SystemDesignContent document={source} />
                    : <p>{loadFailed ? 'Could not load this note.' : 'Loading note…'}</p>}
            </ArticleLayout>
        );
    }

    const view = systemDesignViewsByRoute.get(route);
    const group = findGroup(systemDesignNotes.children, route);
    if (!view || !group) return null;
    const parent = systemDesignPagesById.get(view.parentId);

    return (
        <Page title={view.title}>
            <NoteReadingTime minutes={getNodeReadingMinutes(group)} total />
            <a
                href={toHref(parent?.route ?? SYSTEM_DESIGN_ROUTE)}
                className="Link Link--standalone Notes__back"
            >
                Back to {parent?.title ?? 'System Design'}
            </a>
            <NoteTree nodes={group.children} />
        </Page>
    );
};

export default SystemDesignEntry;
