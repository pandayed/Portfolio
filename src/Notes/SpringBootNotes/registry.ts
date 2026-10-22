import type { SpringBootBlock, SpringBootChapter, SpringBootDocument, SpringBootOutlineNode, SpringBootPage } from './types';

const documents = import.meta.glob<SpringBootDocument>('./pages/**/*.json', {
    eager: true,
    import: 'default',
});

export const springBootChapters: readonly SpringBootChapter[] = [
    {
        "title": "1. Application foundations",
        "summary": "Run the project, register objects with Spring, then follow injection and startup.",
        "children": [
            {
                "slug": "first-application"
            },
            {
                "slug": "project-structure"
            },
            {
                "slug": "starter-projects-auto-configuration"
            },
            {
                "slug": "maven-gradle"
            },
            {
                "slug": "beans"
            },
            {
                "slug": "dependency-injection"
            },
            {
                "slug": "spring-boot-application"
            },
            {
                "slug": "auto-configuration"
            },
            {
                "slug": "bean-lifecycle"
            }
        ]
    },
    {
        "title": "2. Configuration",
        "summary": "Read configuration values in Java, then select environment-specific settings.",
        "children": [
            {
                "slug": "application-properties"
            },
            {
                "slug": "configuration-binding"
            },
            {
                "slug": "profiles-configuration-management"
            }
        ]
    },
    {
        "title": "3. REST APIs",
        "summary": "Add controller mappings, bind inputs, and handle responses and failures.",
        "children": [
            {
                "slug": "restful-web-services"
            },
            {
                "slug": "http-methods"
            },
            {
                "slug": "rest/request-parameters"
            },
            {
                "slug": "request-response-body"
            },
            {
                "slug": "rest/responses"
            },
            {
                "slug": "rest-api-validation"
            },
            {
                "slug": "exception-handling"
            },
            {
                "slug": "request-flow"
            },
            {
                "slug": "openapi"
            }
        ]
    },
    {
        "title": "4. Data access",
        "summary": "Learn persistence with PostgreSQL and Spring Data JPA.",
        "children": [
            {
                "slug": "relational-databases"
            },
            {
                "slug": "entity-mapping"
            },
            {
                "slug": "spring-data-jpa"
            },
            {
                "slug": "jpa-queries"
            },
            {
                "slug": "jpa-transactions"
            },
            {
                "slug": "jpa-relationships"
            },
            {
                "slug": "jpa-fetching"
            }
        ]
    },
    {
        "title": "5. Security",
        "summary": "Configure the security chain before adding users, access rules, and token or browser login.",
        "children": [
            {
                "slug": "security-basics"
            },
            {
                "slug": "security/authentication-authorization"
            },
            {
                "slug": "security/browser-security"
            },
            {
                "slug": "security/ownership"
            },
            {
                "slug": "security/jwt"
            },
            {
                "slug": "security/oauth2"
            },
            {
                "slug": "security/resource-server"
            },
            {
                "slug": "security/google-login"
            }
        ]
    },
    {
        "title": "6. Development and diagnostics",
        "summary": "Configure diagnostics and development tools after the application behavior is understood.",
        "children": [
            {
                "slug": "logging"
            },
            {
                "slug": "devtools-actuator"
            },
            {
                "slug": "actuator"
            },
            {
                "slug": "lombok"
            }
        ]
    },
    {
        "title": "7. Testing and code quality",
        "summary": "Move from plain Java tests to MVC slices and a full Spring application context.",
        "children": [
            {
                "slug": "test-framework"
            },
            {
                "slug": "testing/junit"
            },
            {
                "slug": "testing/parameterized-tests"
            },
            {
                "slug": "testing/mockito"
            },
            {
                "slug": "testing/web-mvc"
            },
            {
                "slug": "testing/spring-boot"
            },
            {
                "slug": "code-quality"
            }
        ]
    },
    {
        "title": "8. Integrations and background work",
        "summary": "Add separate integrations after the core application. Each lesson names its setup.",
        "children": [
            {
                "slug": "integrations/external-apis"
            },
            {
                "slug": "integrations/text-to-speech"
            },
            {
                "slug": "integrations/email"
            },
            {
                "slug": "integrations/scheduling"
            },
            {
                "slug": "integrations/sentiment-summary"
            },
            {
                "slug": "redis"
            },
            {
                "slug": "kafka"
            },
            {
                "slug": "kafka/delivery-failures"
            }
        ]
    },
    {
        "title": "9. Packaging and deployment",
        "summary": "Build one executable artifact, then supply the settings and host it needs.",
        "children": [
            {
                "slug": "executable-jars-deployment"
            },
            {
                "slug": "deployment/cloud"
            },
            {
                "slug": "deployment/vps"
            },
            {
                "slug": "deployment/nginx-https"
            }
        ]
    },
    {
        "title": "10. Annotations at a glance",
        "summary": "Look up annotations after reading their main lessons.",
        "children": [
            {
                "slug": "annotations"
            }
        ]
    }
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
