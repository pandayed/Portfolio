import type { SpringBootBlock, SpringBootChapter, SpringBootDocument, SpringBootOutlineNode, SpringBootPage } from './types';

const documents = import.meta.glob<SpringBootDocument>('./pages/**/*.json', {
    eager: true,
    import: 'default',
});

export const springBootChapters: readonly SpringBootChapter[] = [
    {
        title: '1. Setup and application startup',
        summary: 'Create a project, understand its structure, and follow how Spring creates beans.',
        children: [
            { slug: 'first-application' },
            { slug: 'project-structure' },
            { slug: 'starter-projects-auto-configuration' },
            { slug: 'spring-boot-application' },
            { slug: 'dependency-injection' },
            { slug: 'bean-lifecycle' },
            { slug: 'annotations' },
        ],
    },
    {
        title: '2. REST APIs',
        summary: 'Map requests, return useful status codes, validate input, and document endpoints.',
        children: [
            { slug: 'restful-web-services' },
            { slug: 'http-methods' },
            { slug: 'request-response-body' },
            { slug: 'rest/responses' },
            { slug: 'rest-api-validation' },
            { slug: 'exception-handling' },
            { slug: 'openapi' },
        ],
    },
    {
        title: '3. Configuration and development tools',
        summary: 'Manage environments, bind settings, reduce repetitive code, and inspect application behavior.',
        children: [
            { slug: 'application-properties' },
            { slug: 'profiles-configuration-management' },
            { slug: 'lombok' },
            { slug: 'logging' },
            { slug: 'devtools-actuator' },
        ],
    },
    {
        title: '4. Data access',
        summary: 'Use MongoDB documents and queries, then compare them with JPA and relational mappings.',
        children: [
            { slug: 'mongodb', title: 'MongoDB', children: [
                { slug: 'mongodb' },
                { slug: 'mongodb/repositories' },
                { slug: 'mongodb/relationships' },
                { slug: 'mongodb/transactions' },
                { slug: 'mongodb/queries' },
            ] },
            { slug: 'spring-data-jpa' },
            { slug: 'entity-mapping' },
            { slug: 'relational-databases' },
        ],
    },
    {
        title: '5. Security',
        summary: 'Distinguish login, permissions, and record ownership before adding JWT or Google login.',
        children: [{ slug: 'security-basics', title: 'Spring Security', children: [
            { slug: 'security-basics' },
            { slug: 'security/authentication-authorization' },
            { slug: 'security/jwt' },
            { slug: 'security/oauth2' },
        ] }],
    },
    {
        title: '6. Testing and code quality',
        summary: 'Choose focused unit tests, Spring integration checks, and static analysis for different questions.',
        children: [
            { slug: 'test-framework', title: 'Testing', children: [
                { slug: 'test-framework' },
                { slug: 'testing/junit' },
                { slug: 'testing/mockito' },
            ] },
            { slug: 'code-quality' },
        ],
    },
    {
        title: '7. Integrations and background work',
        summary: 'Call external APIs, send email, schedule work, cache results, and publish events.',
        children: [
            { slug: 'integrations/external-apis', title: 'External APIs', children: [
                { slug: 'integrations/external-apis' },
                { slug: 'integrations/text-to-speech' },
            ] },
            { slug: 'integrations/email' },
            { slug: 'integrations/scheduling' },
            { slug: 'redis' },
            { slug: 'kafka', title: 'Kafka', children: [
                { slug: 'kafka' },
                { slug: 'kafka/delivery-failures' },
            ] },
        ],
    },
    {
        title: '8. Building and deployment',
        summary: 'Package the application and understand managed hosting and a Linux server deployment.',
        children: [
            { slug: 'maven-gradle' },
            { slug: 'executable-jars-deployment', title: 'Deployment', children: [
                { slug: 'executable-jars-deployment' },
                { slug: 'deployment/cloud' },
                { slug: 'deployment/vps' },
            ] },
        ],
    },
];

const outlinePages = (nodes: readonly SpringBootOutlineNode[], parentSlug?: string): { slug: string; parentSlug?: string }[] =>
    nodes.flatMap((node) => node.children
        ? outlinePages(node.children, node.slug)
        : [{ slug: node.slug, parentSlug: parentSlug === node.slug ? undefined : parentSlug }]);

const entries = springBootChapters.flatMap((chapter) => outlinePages(chapter.children));

export const springBootPages: readonly SpringBootPage[] = entries
    .filter(({ slug }) => slug !== 'first-application' && slug !== 'annotations')
    .map(({ slug, parentSlug }) => ({
    ...documents[`./pages/${slug}.json`],
    route: `/notes/spring-boot/${slug}`,
    ...(parentSlug ? { parentRoute: `/notes/spring-boot/${parentSlug}` as const } : {}),
}));

export const springBootRoutes = springBootPages.map((page) => page.route);
export const springBootPagesByRoute = new Map(springBootPages.map((page) => [page.route, page]));

export const getSpringBootBlocks = (page: SpringBootPage): readonly SpringBootBlock[] => page.blocks;
