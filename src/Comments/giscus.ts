/* Giscus stores every comment as a GitHub Discussion in this repository, so
   the comments are public data and these identifiers are public too. giscus
   embeds them in the page for anyone to read, so there is nothing here that an
   environment variable would protect. They are checked in instead, which keeps
   the gh-pages build reproducible without a build-time secret.

   Regenerate them at https://giscus.app after enabling Discussions on the
   repository. */

export const GISCUS_REPO = 'pandayed/Portfolio';
export const GISCUS_REPO_ID = 'R_kgDOGcq7-A';
export const GISCUS_CATEGORY = 'Comments';
export const GISCUS_CATEGORY_ID = 'REPLACE_WITH_CATEGORY_ID';

export const GISCUS_SCRIPT_SRC = 'https://giscus.app/client.js';
export const GISCUS_ORIGIN = 'https://giscus.app';

/* The site is served under a hash router, so every article shares one
   pathname and giscus cannot derive a distinct discussion from the URL. The
   route is passed explicitly instead, which also survives a future move off
   hash routing. */
export const toDiscussionTerm = (route: string): string => `blog:${route}`;

export const isConfigured = (): boolean =>
    GISCUS_CATEGORY_ID !== 'REPLACE_WITH_CATEGORY_ID';
