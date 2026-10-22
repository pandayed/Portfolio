import { NODE_NOTES_ROUTE, type NodeNoteRoute } from '../../routing/routes';
import LearningNotePage from '../LearningNotes/LearningNotePage';
import { nodeLearningNotes } from './nodeNotes';

const NodeNote = ({ route }: { route: NodeNoteRoute }) => {
    const slug = route.slice(`${NODE_NOTES_ROUTE}/`.length);
    const note = nodeLearningNotes.find((entry) => entry.slug === slug);
    if (!note) return null;

    return (
        <LearningNotePage
            note={note}
            route={route}
            backRoute={NODE_NOTES_ROUTE}
            backLabel="Back to Node.js notes"
        />
    );
};

export default NodeNote;
