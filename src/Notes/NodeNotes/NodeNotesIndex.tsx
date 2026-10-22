import '../Notes.css';

import Page from '../../Page/Page';
import { NOTES_ROUTE, toHref } from '../../routing/routes';
import NoteReadingTime from '../NoteReadingTime';
import NoteTree from '../NoteTree';
import { nodeNotes } from '../noteTreeData';
import { getNodeReadingMinutes } from '../readingTime';

const NodeNotesIndex = () => (
    <Page title="Node.js notes">
        <NoteReadingTime minutes={getNodeReadingMinutes(nodeNotes)} total />
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <NoteTree nodes={nodeNotes.children} />
    </Page>
);

export default NodeNotesIndex;
