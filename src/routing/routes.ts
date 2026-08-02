/* Hash routing keeps deep links working on static hosts that cannot rewrite
   unknown paths back to index.html. */

export const HOME_ROUTE = '/';
export const BOOKSHELF_ROUTE = '/bookshelf';

export type Route = typeof HOME_ROUTE | typeof BOOKSHELF_ROUTE;

export const toHref = (route: Route): string => `#${route}`;

export const parseRoute = (hash: string): Route => {
    const path = hash.replace(/^#/, '');
    return path === BOOKSHELF_ROUTE ? BOOKSHELF_ROUTE : HOME_ROUTE;
};
