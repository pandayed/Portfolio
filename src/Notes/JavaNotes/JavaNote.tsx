import { JAVA_NOTES_ROUTE, type JavaNoteRoute } from '../../routing/routes';
import LearningNotePage from '../LearningNotes/LearningNotePage';
import { javaLearningNotes } from './javaNotes';

interface JavaNoteProps {
    route: JavaNoteRoute;
}

const JavaNote = ({ route }: JavaNoteProps) => {
    const slug = route.slice(`${JAVA_NOTES_ROUTE}/`.length);
    const note = javaLearningNotes.find((entry) => entry.slug === slug);

    if (!note) return null;

    return (
        <LearningNotePage
            note={note}
            route={route}
            backRoute={JAVA_NOTES_ROUTE}
            backLabel="Back to Java notes"
        />
    );
};

export default JavaNote;
