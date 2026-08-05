/* Hash routing keeps deep links working on static hosts that cannot rewrite
   unknown paths back to index.html. */

export const HOME_ROUTE = '/';
export const BLOGS_ROUTE = '/blogs';
export const CPP_COMPLEXITY_ROUTE = '/blogs/cpp-complexity';
export const PROJECTS_ROUTE = '/projects';
export const BOOKSHELF_ROUTE = '/bookshelf';
export const ABOUT_ROUTE = '/about';

export type Route =
    | typeof HOME_ROUTE
    | typeof BLOGS_ROUTE
    | typeof CPP_COMPLEXITY_ROUTE
    | typeof PROJECTS_ROUTE
    | typeof BOOKSHELF_ROUTE
    | typeof ABOUT_ROUTE;

const routes: Route[] = [
    BLOGS_ROUTE,
    CPP_COMPLEXITY_ROUTE,
    PROJECTS_ROUTE,
    BOOKSHELF_ROUTE,
    ABOUT_ROUTE,
];

export const toHref = (route: Route): string => `#${route}`;

export const parseRoute = (hash: string): Route => {
    const path = hash.replace(/^#/, '');
    return routes.find((route) => route === path) ?? HOME_ROUTE;
};
