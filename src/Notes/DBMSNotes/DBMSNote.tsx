import { DBMS_NOTES_ROUTE, type DBMSNoteRoute } from '../../routing/routes';
import LearningNotePage from '../LearningNotes/LearningNotePage';
import { dbmsLearningNotes } from './dbmsNotes';

interface DBMSNoteProps {
    route: DBMSNoteRoute;
}

const DBMSNote = ({ route }: DBMSNoteProps) => {
    const slug = route.slice(`${DBMS_NOTES_ROUTE}/`.length);
    const note = dbmsLearningNotes.find((entry) => entry.slug === slug);

    if (!note) return null;

    return (
        <LearningNotePage
            note={note}
            route={route}
            backRoute={DBMS_NOTES_ROUTE}
            backLabel="Back to DBMS notes"
        />
    );
};

export default DBMSNote;
