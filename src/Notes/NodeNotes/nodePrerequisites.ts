import { getJavaScriptTypeScriptNoteRoute, NODE_NOTES_ROUTE, type Route } from '../../routing/routes';
import { javascriptTypeScriptNotes } from '../JavaScriptTypeScriptNotes/javascriptTypeScriptNotes';
import { nodeLearningNotes } from './nodeNotes';

interface Prerequisite {
    title: string;
    route: Route;
}

const js = (slug: string): Prerequisite => {
    const note = javascriptTypeScriptNotes.find((entry) => entry.slug === slug);
    if (!note) throw new Error(`Missing JavaScript prerequisite: ${slug}`);
    return { title: note.title, route: getJavaScriptTypeScriptNoteRoute(slug) };
};

const node = (slug: string): Prerequisite => {
    const note = nodeLearningNotes.find((entry) => entry.slug === slug);
    if (!note) throw new Error(`Missing Node.js prerequisite: ${slug}`);
    return { title: note.title, route: `${NODE_NOTES_ROUTE}/${slug}` };
};

export const nodePrerequisites: ReadonlyMap<Route, readonly Prerequisite[]> = new Map([
    [node('runtime').route, [js('runtime-and-types'), js('functions-and-scope')]],
    [node('modules').route, [node('runtime'), js('modules')]],
    [node('npm').route, [node('modules'), js('json-and-data-validation')]],
    [node('files').route, [node('modules'), js('async-await'), js('errors-and-debugging')]],
    [node('process').route, [node('runtime'), js('arrays-and-objects'), js('objects')]],
    [node('http').route, [node('modules'), js('function-values-and-callbacks'), js('json-and-data-validation')]],
]);
