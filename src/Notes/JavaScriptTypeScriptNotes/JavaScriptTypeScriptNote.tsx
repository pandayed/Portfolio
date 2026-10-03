import {
    JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE,
    type JavaScriptTypeScriptNoteRoute,
} from '../../routing/routes';
import LearningNotePage from '../LearningNotes/LearningNotePage';
import { javascriptTypeScriptNotes } from './javascriptTypeScriptNotes';

interface JavaScriptTypeScriptNoteProps {
    route: JavaScriptTypeScriptNoteRoute;
}

const JavaScriptTypeScriptNote = ({ route }: JavaScriptTypeScriptNoteProps) => {
    const slug = route.slice(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/`.length);
    const note = javascriptTypeScriptNotes.find((entry) => entry.slug === slug);

    if (!note) return null;

    return (
        <LearningNotePage
            note={note}
            route={route}
            backRoute={JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}
            backLabel="Back to JavaScript and TypeScript notes"
        />
    );
};

export default JavaScriptTypeScriptNote;
