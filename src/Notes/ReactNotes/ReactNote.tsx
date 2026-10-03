import { REACT_NOTES_ROUTE, type ReactNoteRoute } from '../../routing/routes';
import LearningNotePage from '../LearningNotes/LearningNotePage';
import { reactNotes } from './reactNotes';

interface ReactNoteProps {
    route: ReactNoteRoute;
}

const ReactNote = ({ route }: ReactNoteProps) => {
    const slug = route.slice(`${REACT_NOTES_ROUTE}/`.length);
    const note = reactNotes.find((entry) => entry.slug === slug);

    if (!note) return null;

    return (
        <LearningNotePage
            note={note}
            route={route}
            backRoute={REACT_NOTES_ROUTE}
            backLabel="Back to React notes"
        />
    );
};

export default ReactNote;
