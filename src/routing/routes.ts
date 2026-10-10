/* Hash routing keeps deep links working on static hosts that cannot rewrite
   unknown paths back to index.html. */

import { javaLearningNotes } from '../Notes/JavaNotes/javaNotes';
import { dbmsLearningNotes } from '../Notes/DBMSNotes/dbmsNotes';
import { goNotes } from '../Notes/GoNotes/goNotes';
import { javascriptTypeScriptNotes } from '../Notes/JavaScriptTypeScriptNotes/javascriptTypeScriptNotes';
import { pythonNotes } from '../Notes/PythonNotes/pythonNotes';
import { reactNotes } from '../Notes/ReactNotes/reactNotes';
import { systemDesignEntryRoutes } from '../Notes/SystemDesign/registry';
import { SYSTEM_DESIGN_ROUTE, type SystemDesignEntryRoute } from '../Notes/SystemDesign/path';

export { SYSTEM_DESIGN_ROUTE };
export type { SystemDesignEntryRoute };

export const HOME_ROUTE = '/';
export const BLOGS_ROUTE = '/blogs';
export const NOTES_ROUTE = '/notes';
export const AWS_SERVICES_ROUTE = '/notes/aws-services';
export const POSTGRESQL_NOTES_ROUTE = '/notes/postgresql';
export const DBMS_NOTES_ROUTE = '/notes/dbms';
export const POSTGRESQL_ONE_SHOT_SQL_ROUTE = '/notes/postgresql/one-shot-sql';
export const GO_NOTES_ROUTE = '/notes/go';
export const PYTHON_NOTES_ROUTE = '/notes/python';
export const JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE = '/notes/javascript-typescript';
export const REACT_NOTES_ROUTE = '/notes/react';
export const CICD_NOTES_ROUTE = '/notes/ci-cd';
export const CICD_BASICS_ROUTE = '/notes/ci-cd/fundamentals';
export const GITHUB_ACTIONS_ROUTE = '/notes/ci-cd/github-actions';
export const JENKINS_ROUTE = '/notes/ci-cd/jenkins';
export const GITLAB_CICD_ROUTE = '/notes/ci-cd/gitlab-ci-cd';
export const ARGO_CD_ROUTE = '/notes/ci-cd/argo-cd';
export const DOCKER_NOTES_ROUTE = '/notes/docker';
export const DOCKER_CONTAINERS_ROUTE = '/notes/docker/containers-images-and-registries';
export const DOCKER_BUILD_RUN_ROUTE = '/notes/docker/build-and-run';
export const DOCKER_NETWORK_STORAGE_ROUTE = '/notes/docker/networking-and-storage';
export const DOCKER_COMPOSE_ROUTE = '/notes/docker/compose-and-workflow';
export const KUBERNETES_NOTES_ROUTE = '/notes/kubernetes';
export const KUBERNETES_CLUSTER_ROUTE = '/notes/kubernetes/cluster-nodes-and-pods';
export const KUBERNETES_DEPLOY_ROUTE = '/notes/kubernetes/deployments-and-services';
export const KUBERNETES_CONFIG_ROUTE = '/notes/kubernetes/configuration-and-storage';
export const KUBERNETES_OPERATIONS_ROUTE = '/notes/kubernetes/health-rollouts-and-debugging';
export const PROGRAMMING_DICTIONARY_ROUTE = '/notes/programming-dictionary';
export const JAVA_NOTES_ROUTE = '/notes/java';
export const JAVA_PROGRAM_EXECUTION_ROUTE = '/notes/java/program-execution';
export const SPRING_BOOT_NOTES_ROUTE = '/notes/spring-boot';
export const SPRING_BOOT_FIRST_APPLICATION_ROUTE = '/notes/spring-boot/first-application';
export const SPRING_BOOT_ANNOTATIONS_ROUTE = '/notes/spring-boot/annotations';
export const DRAFTS_ROUTE = '/blogs/drafts';
export const ARCHIVE_ROUTE = '/blogs/archive';
export const CPP_COMPLEXITY_ROUTE = '/blogs/cpp-complexity';
export const COMPLEXITY_CASES_ROUTE = '/blogs/complexity-cases';
export const SQL_VS_MYSQL_ROUTE = '/blogs/sql-vs-mysql';
export const SSL_TLS_ROUTE = '/blogs/ssl-tls';
export const AI_OBEDIENCE_ROUTE = '/blogs/ai-obedience';
export const SIEVE_OF_ERATOSTHENES_ROUTE = '/blogs/sieve-of-eratosthenes';
export const CONSISTENT_HASHING_ROUTE = '/blogs/consistent-hashing';
export const WHY_REACT_ROUTE = '/blogs/why-react';
export const CHAIN_OF_THOUGHT_ROUTE = '/blogs/chain-of-thought';
export const WRITING_BETTER_PLANS_AND_SKILLS_ROUTE = '/blogs/writing-better-plans-and-skills';
export const POSTGRESQL_GROUP_BY_ROUTE = '/notes/postgresql/group-by';
export const POSTGRESQL_JOINS_ROUTE = '/notes/postgresql/joins';
export const POSTGRESQL_RATIOS_ROUTE = '/notes/postgresql/ratios';
export const POSTGRESQL_WINDOW_FUNCTIONS_ROUTE = '/notes/postgresql/window-functions';
export const POSTGRESQL_MATHS_ROUTE = '/notes/postgresql/maths';
export const POSTGRESQL_STRINGS_ROUTE = '/notes/postgresql/strings';
export const POSTGRESQL_DATE_TIME_ROUTE = '/notes/postgresql/date-and-time';
export const POSTGRESQL_INDEXING_ROUTE = '/notes/postgresql/indexing';
export const POSTGRESQL_QUERY_ANALYSIS_ROUTE = '/notes/postgresql/query-analysis';
export const SCALAR_IN_POSTGRESQL_ROUTE = '/notes/postgresql/scalar';
export const API_COMMUNICATION_ROUTE = '/notes/api-communication';
export const JAVASCRIPT_ASYNC_ROUTE = '/notes/javascript-asynchronous-programming';
export const JAVASCRIPT_EVENT_LOOP_ROUTE = '/notes/javascript-event-loop';
export const PROJECTS_ROUTE = '/projects';
export const INSTEAD_PRIVACY_POLICY_ROUTE = '/instead/privacy-policy';
export const BOOKSHELF_ROUTE = '/bookshelf';
export const ABOUT_ROUTE = '/about';

export type JavaNoteRoute = `${typeof JAVA_NOTES_ROUTE}/${string}`;
export type DBMSNoteRoute = `${typeof DBMS_NOTES_ROUTE}/${string}`;
export type GoNoteRoute = `${typeof GO_NOTES_ROUTE}/${string}`;
export type JavaScriptTypeScriptNoteRoute = `${typeof JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/${string}`;
export type PythonNoteRoute = `${typeof PYTHON_NOTES_ROUTE}/${string}`;
export type ReactNoteRoute = `${typeof REACT_NOTES_ROUTE}/${string}`;

export type Route =
    | typeof HOME_ROUTE
    | typeof BLOGS_ROUTE
    | typeof NOTES_ROUTE
    | typeof AWS_SERVICES_ROUTE
    | typeof PROGRAMMING_DICTIONARY_ROUTE
    | typeof POSTGRESQL_NOTES_ROUTE
    | typeof DBMS_NOTES_ROUTE
    | DBMSNoteRoute
    | typeof POSTGRESQL_ONE_SHOT_SQL_ROUTE
    | typeof GO_NOTES_ROUTE
    | GoNoteRoute
    | typeof SYSTEM_DESIGN_ROUTE
    | SystemDesignEntryRoute
    | typeof PYTHON_NOTES_ROUTE
    | PythonNoteRoute
    | typeof JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE
    | JavaScriptTypeScriptNoteRoute
    | typeof REACT_NOTES_ROUTE
    | ReactNoteRoute
    | typeof CICD_NOTES_ROUTE
    | typeof CICD_BASICS_ROUTE
    | typeof GITHUB_ACTIONS_ROUTE
    | typeof JENKINS_ROUTE
    | typeof GITLAB_CICD_ROUTE
    | typeof ARGO_CD_ROUTE
    | typeof DOCKER_NOTES_ROUTE
    | typeof DOCKER_CONTAINERS_ROUTE
    | typeof DOCKER_BUILD_RUN_ROUTE
    | typeof DOCKER_NETWORK_STORAGE_ROUTE
    | typeof DOCKER_COMPOSE_ROUTE
    | typeof KUBERNETES_NOTES_ROUTE
    | typeof KUBERNETES_CLUSTER_ROUTE
    | typeof KUBERNETES_DEPLOY_ROUTE
    | typeof KUBERNETES_CONFIG_ROUTE
    | typeof KUBERNETES_OPERATIONS_ROUTE
    | typeof JAVA_NOTES_ROUTE
    | JavaNoteRoute
    | typeof JAVA_PROGRAM_EXECUTION_ROUTE
    | typeof SPRING_BOOT_NOTES_ROUTE
    | typeof SPRING_BOOT_FIRST_APPLICATION_ROUTE
    | typeof SPRING_BOOT_ANNOTATIONS_ROUTE
    | typeof DRAFTS_ROUTE
    | typeof ARCHIVE_ROUTE
    | typeof CPP_COMPLEXITY_ROUTE
    | typeof COMPLEXITY_CASES_ROUTE
    | typeof SQL_VS_MYSQL_ROUTE
    | typeof SSL_TLS_ROUTE
    | typeof AI_OBEDIENCE_ROUTE
    | typeof SIEVE_OF_ERATOSTHENES_ROUTE
    | typeof CONSISTENT_HASHING_ROUTE
    | typeof WHY_REACT_ROUTE
    | typeof CHAIN_OF_THOUGHT_ROUTE
    | typeof WRITING_BETTER_PLANS_AND_SKILLS_ROUTE
    | typeof POSTGRESQL_GROUP_BY_ROUTE
    | typeof POSTGRESQL_JOINS_ROUTE
    | typeof POSTGRESQL_RATIOS_ROUTE
    | typeof POSTGRESQL_WINDOW_FUNCTIONS_ROUTE
    | typeof POSTGRESQL_MATHS_ROUTE
    | typeof POSTGRESQL_STRINGS_ROUTE
    | typeof POSTGRESQL_DATE_TIME_ROUTE
    | typeof POSTGRESQL_INDEXING_ROUTE
    | typeof POSTGRESQL_QUERY_ANALYSIS_ROUTE
    | typeof SCALAR_IN_POSTGRESQL_ROUTE
    | typeof API_COMMUNICATION_ROUTE
    | typeof JAVASCRIPT_ASYNC_ROUTE
    | typeof JAVASCRIPT_EVENT_LOOP_ROUTE
    | typeof PROJECTS_ROUTE
    | typeof INSTEAD_PRIVACY_POLICY_ROUTE
    | typeof BOOKSHELF_ROUTE
    | typeof ABOUT_ROUTE;

const javaNoteRoutes: JavaNoteRoute[] = javaLearningNotes.map(
    ({ slug }) => `${JAVA_NOTES_ROUTE}/${slug}` as JavaNoteRoute,
);

const dbmsNoteRoutes: DBMSNoteRoute[] = dbmsLearningNotes.map(
    ({ slug }) => `${DBMS_NOTES_ROUTE}/${slug}` as DBMSNoteRoute,
);

const goNoteRoutes: GoNoteRoute[] = goNotes.map(
    ({ slug }) => `${GO_NOTES_ROUTE}/${slug}` as GoNoteRoute,
);

const pythonNoteRoutes: PythonNoteRoute[] = pythonNotes.map(
    ({ slug }) => `${PYTHON_NOTES_ROUTE}/${slug}` as PythonNoteRoute,
);

const javascriptTypeScriptNoteRoutes: JavaScriptTypeScriptNoteRoute[] = javascriptTypeScriptNotes.map(
    ({ slug }) => `${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/${slug}` as JavaScriptTypeScriptNoteRoute,
);

const reactNoteRoutes: ReactNoteRoute[] = reactNotes.map(
    ({ slug }) => `${REACT_NOTES_ROUTE}/${slug}` as ReactNoteRoute,
);

const routes: Route[] = [
    BLOGS_ROUTE,
    NOTES_ROUTE,
    AWS_SERVICES_ROUTE,
    POSTGRESQL_NOTES_ROUTE,
    DBMS_NOTES_ROUTE,
    ...dbmsNoteRoutes,
    POSTGRESQL_ONE_SHOT_SQL_ROUTE,
    GO_NOTES_ROUTE,
    ...goNoteRoutes,
    SYSTEM_DESIGN_ROUTE,
    ...systemDesignEntryRoutes,
    PYTHON_NOTES_ROUTE,
    PROGRAMMING_DICTIONARY_ROUTE,
    ...pythonNoteRoutes,
    JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE,
    ...javascriptTypeScriptNoteRoutes,
    REACT_NOTES_ROUTE,
    ...reactNoteRoutes,
    CICD_NOTES_ROUTE,
    CICD_BASICS_ROUTE,
    GITHUB_ACTIONS_ROUTE,
    JENKINS_ROUTE,
    GITLAB_CICD_ROUTE,
    ARGO_CD_ROUTE,
    DOCKER_NOTES_ROUTE,
    DOCKER_CONTAINERS_ROUTE,
    DOCKER_BUILD_RUN_ROUTE,
    DOCKER_NETWORK_STORAGE_ROUTE,
    DOCKER_COMPOSE_ROUTE,
    KUBERNETES_NOTES_ROUTE,
    KUBERNETES_CLUSTER_ROUTE,
    KUBERNETES_DEPLOY_ROUTE,
    KUBERNETES_CONFIG_ROUTE,
    KUBERNETES_OPERATIONS_ROUTE,
    JAVA_NOTES_ROUTE,
    JAVA_PROGRAM_EXECUTION_ROUTE,
    ...javaNoteRoutes,
    SPRING_BOOT_NOTES_ROUTE,
    SPRING_BOOT_FIRST_APPLICATION_ROUTE,
    SPRING_BOOT_ANNOTATIONS_ROUTE,
    DRAFTS_ROUTE,
    ARCHIVE_ROUTE,
    CPP_COMPLEXITY_ROUTE,
    COMPLEXITY_CASES_ROUTE,
    SQL_VS_MYSQL_ROUTE,
    SSL_TLS_ROUTE,
    AI_OBEDIENCE_ROUTE,
    SIEVE_OF_ERATOSTHENES_ROUTE,
    CONSISTENT_HASHING_ROUTE,
    WHY_REACT_ROUTE,
    CHAIN_OF_THOUGHT_ROUTE,
    WRITING_BETTER_PLANS_AND_SKILLS_ROUTE,
    POSTGRESQL_GROUP_BY_ROUTE,
    POSTGRESQL_JOINS_ROUTE,
    POSTGRESQL_RATIOS_ROUTE,
    POSTGRESQL_WINDOW_FUNCTIONS_ROUTE,
    POSTGRESQL_MATHS_ROUTE,
    POSTGRESQL_STRINGS_ROUTE,
    POSTGRESQL_DATE_TIME_ROUTE,
    POSTGRESQL_INDEXING_ROUTE,
    POSTGRESQL_QUERY_ANALYSIS_ROUTE,
    SCALAR_IN_POSTGRESQL_ROUTE,
    API_COMMUNICATION_ROUTE,
    JAVASCRIPT_ASYNC_ROUTE,
    JAVASCRIPT_EVENT_LOOP_ROUTE,
    PROJECTS_ROUTE,
    INSTEAD_PRIVACY_POLICY_ROUTE,
    BOOKSHELF_ROUTE,
    ABOUT_ROUTE,
];

export const toHref = (route: Route): string => `#${route}`;

export const parseRoute = (hash: string): Route => {
    const rawPath = hash.replace(/^#/, '');
    const dictionaryPath = rawPath.split('?')[0];
    const path = dictionaryPath === PROGRAMMING_DICTIONARY_ROUTE || dictionaryPath === '/notes/python/dictionary'
        ? PROGRAMMING_DICTIONARY_ROUTE
        : rawPath;
    return routes.find((route) => route === path) ?? HOME_ROUTE;
};
