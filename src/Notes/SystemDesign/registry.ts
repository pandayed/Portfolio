import { SYSTEM_DESIGN_ROUTE, type SystemDesignEntryRoute } from './path';
import { pageManifest, pageViews, rootPageIds } from './manifest';
import type { SystemDesignDocument } from './types';

const pageSources = import.meta.glob('./pages/*.json') as Record<
    string,
    () => Promise<{ default: SystemDesignDocument }>
>;

const slug = (title: string) =>
    title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
        .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'page';

export interface SystemDesignPageData {
    id: string;
    title: string;
    icon?: string;
    status: string;
    parentId: string | null;
    route: SystemDesignEntryRoute;
    load: () => Promise<SystemDesignDocument>;
}

export interface SystemDesignViewData {
    id: string;
    title: string;
    parentId: string;
    pageIds: string[];
    route: SystemDesignEntryRoute;
}

export const systemDesignPages: SystemDesignPageData[] = pageManifest.map((entry) => {
    const loadSource = pageSources[entry.sourcePath];
    if (!loadSource) throw new Error(`Missing System Design page: ${entry.sourcePath}`);

    return {
        id: entry.id,
        title: entry.title,
        icon: 'icon' in entry ? entry.icon : undefined,
        status: entry.status,
        parentId: entry.parentId,
        route: `${SYSTEM_DESIGN_ROUTE}/${slug(entry.title)}-${entry.id.slice(0, 8)}` as SystemDesignEntryRoute,
        load: async () => (await loadSource()).default,
    };
});

export const systemDesignPagesById = new Map(systemDesignPages.map((page) => [page.id, page]));
export const systemDesignPagesByRoute = new Map(systemDesignPages.map((page) => [page.route, page]));

export const systemDesignViews: SystemDesignViewData[] = Object.entries(pageViews).flatMap(
    ([parentId, views]) => views.map((view) => ({
        id: view.id,
        title: view.title,
        parentId,
        pageIds: [...view.pageIds],
        route: `${SYSTEM_DESIGN_ROUTE}/group-${slug(view.title || systemDesignPagesById.get(parentId)?.title || 'notes')}-${view.id.slice(0, 8)}` as SystemDesignEntryRoute,
    })),
);

export const systemDesignViewsByRoute = new Map(
    systemDesignViews.filter((view) => view.title).map((view) => [view.route, view]),
);
export const systemDesignViewsByParentId = new Map<string, SystemDesignViewData[]>();
for (const view of systemDesignViews) {
    const siblings = systemDesignViewsByParentId.get(view.parentId) ?? [];
    siblings.push(view);
    systemDesignViewsByParentId.set(view.parentId, siblings);
}

export const systemDesignRootPages = rootPageIds.map((id) => {
    const page = systemDesignPagesById.get(id);
    if (!page) throw new Error(`Missing System Design root page: ${id}`);
    return page;
});

export const systemDesignEntryRoutes: SystemDesignEntryRoute[] = [
    ...systemDesignPages.map(({ route }) => route),
    ...systemDesignViews.filter((view) => view.title).map(({ route }) => route),
];
