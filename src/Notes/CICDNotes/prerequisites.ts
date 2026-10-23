import {
    ARGO_CD_ROUTE,
    CICD_BASICS_ROUTE,
    DOCKER_CONTAINERS_ROUTE,
    GITHUB_ACTIONS_ROUTE,
    GITLAB_CICD_ROUTE,
    JENKINS_ROUTE,
    KUBERNETES_CONFIG_ROUTE,
    KUBERNETES_DEPLOY_ROUTE,
    NODE_NOTES_ROUTE,
    type Route,
} from '../../routing/routes';

interface Prerequisite {
    title: string;
    route: Route;
}

const fundamentals: Prerequisite = { title: 'CI/CD fundamentals', route: CICD_BASICS_ROUTE };
const npm: Prerequisite = { title: 'npm and project packages', route: `${NODE_NOTES_ROUTE}/npm` };

export const cicdPrerequisites: ReadonlyMap<Route, readonly Prerequisite[]> = new Map([
    [CICD_BASICS_ROUTE, []],
    [GITHUB_ACTIONS_ROUTE, [fundamentals, npm]],
    [JENKINS_ROUTE, [fundamentals, npm]],
    [GITLAB_CICD_ROUTE, [
        fundamentals,
        npm,
        { title: '1. Containers, images, and registries', route: DOCKER_CONTAINERS_ROUTE },
    ]],
    [ARGO_CD_ROUTE, [
        fundamentals,
        { title: '2. Deployments, Services, and local access', route: KUBERNETES_DEPLOY_ROUTE },
        { title: '3. Configuration and storage lifetimes', route: KUBERNETES_CONFIG_ROUTE },
    ]],
]);
