import type { SpringBootBlock, SpringBootChapter, SpringBootDocument, SpringBootOutlineNode, SpringBootPage } from './types';

const documents = import.meta.glob<SpringBootDocument>('./pages/**/*.json', {
    eager: true,
    import: 'default',
});

export const springBootChapters: readonly SpringBootChapter[] = [
    {
        "title": "1. Application foundations",
        "summary": "Create a project, then learn beans, dependencies, and startup.",
        "children": [
            {
                "slug": "first-application"
            },
            {
                "slug": "project-structure"
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
                "slug": "starter-projects-auto-configuration"
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
        "summary": "Set values, select profiles, then read settings in Java.",
        "children": [
            {
                "slug": "application-properties"
            },
            {
                "slug": "profiles-configuration-management"
            },
            {
                "slug": "configuration-binding"
            }
        ]
    },
    {
        "title": "3. REST APIs",
        "summary": "Handle a request, read its input, then control responses and failures.",
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
                "slug": "request-flow"
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
                "slug": "openapi"
            }
        ]
    },
    {
        "title": "4. Data access",
        "summary": "Connect to a database before mapping records and writing queries.",
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
            },
            {
                "title": "MongoDB",
                "slug": "mongodb",
                "children": [
                    {
                        "slug": "mongodb"
                    },
                    {
                        "slug": "mongodb/documents"
                    },
                    {
                        "slug": "mongodb/repositories"
                    },
                    {
                        "slug": "mongodb/queries"
                    },
                    {
                        "slug": "mongodb/indexes"
                    },
                    {
                        "slug": "mongodb/relationships"
                    },
                    {
                        "slug": "mongodb/transactions"
                    }
                ]
            }
        ]
    },
    {
        "title": "5. Security",
        "summary": "Identify users, apply access rules, then configure token or browser login.",
        "children": [
            {
                "slug": "security-basics"
            },
            {
                "slug": "security/authentication-authorization"
            },
            {
                "slug": "security/ownership"
            },
            {
                "slug": "security/browser-security"
            },
            {
                "slug": "security/jwt"
            },
            {
                "slug": "security/resource-server"
            },
            {
                "slug": "security/oauth2"
            },
            {
                "slug": "security/google-login"
            }
        ]
    },
    {
        "title": "6. Development and diagnostics",
        "summary": "Use logging, development tools, monitoring, and generated methods.",
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
        "summary": "Test Java behavior before adding Spring context and HTTP checks.",
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
        "summary": "Call services, schedule operations, cache data, and process events.",
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
        "summary": "Package a runnable application, then choose and configure its host.",
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
        "title": "10. Annotation reference",
        "summary": "Look up annotations after reading the lessons that introduce them.",
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
