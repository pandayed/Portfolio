import {
    CICD_BASICS_ROUTE,
    GITHUB_ACTIONS_ROUTE,
    JENKINS_ROUTE,
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
]);
