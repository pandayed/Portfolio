import './SystemDesignEntry.css';
import 'katex/dist/katex.min.css';

import { useEffect, useState } from 'react';

import ArticleLayout from '../NoteArticleLayout';
import NoteTree from '../NoteTree';
import NoteCollectionPage from '../NoteCollectionPage';
import { getNoteGroup } from '../noteNavigation';
import { SYSTEM_DESIGN_ROUTE, toHref, type SystemDesignEntryRoute } from '../../routing/routes';
import SystemDesignContent, { systemDesignSections } from './SystemDesignContent';
import { systemDesignPagesById, systemDesignPagesByRoute, systemDesignViewsByRoute } from './registry';
import { relatedSystemDesignNotes } from './relatedNotes';
import { outlinePageGroupIds } from './outline';
import type { SystemDesignDocument } from './types';

interface Props {
    route: SystemDesignEntryRoute;
}

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
        const group = outlinePageGroupIds.has(page.id) ? getNoteGroup(route) : undefined;
        const relatedPages = (relatedSystemDesignNotes.get(page.id) ?? []).map((id) => {
            const related = systemDesignPagesById.get(id);
            if (!related) throw new Error(`Missing related System Design note: ${id}`);
            return related;
        });
        const sections = [
            ...(source ? systemDesignSections(source) : []),
            ...(group ? [{ id: 'note-subpages', title: 'Subpages' }] : []),
            ...(relatedPages.length ? [{ id: 'note-related-topics', title: 'Related topics' }] : []),
        ];
        return (
            <ArticleLayout
                title={page.title}
                route={route}
                sections={sections}
                backRoute={SYSTEM_DESIGN_ROUTE}
                backLabel="Back to Software Architecture & System Design"
            >
                {source ? <SystemDesignContent document={source} />
                    : <p>{loadFailed ? 'Could not load this note.' : 'Loading note…'}</p>}
                {group && (
                    <section className="Article__section" aria-labelledby="note-subpages">
                        <h2 id="note-subpages" className="SectionTitle">Subpages</h2>
                        <NoteTree nodes={group.children} />
                    </section>
                )}
                {relatedPages.length > 0 && (
                    <section className="Article__section" aria-labelledby="note-related-topics">
                        <h2 id="note-related-topics" className="SectionTitle">Related topics</h2>
                        <ul className="Article__notes">
                            {relatedPages.map((related) => (
                                <li key={related.id}>
                                    <a href={toHref(related.route)} className="Link Link--standalone">{related.title}</a>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </ArticleLayout>
        );
    }

    return systemDesignViewsByRoute.has(route) ? <NoteCollectionPage route={route} /> : null;
};

export default SystemDesignEntry;
