import '../Notes.css';

import Page from '../../Page/Page';
import { NOTES_ROUTE, toHref } from '../../routing/routes';
import NoteReadingTime from '../NoteReadingTime';
import NoteTree from '../NoteTree';
import { reactNotes } from '../noteTreeData';
import { getNodeReadingMinutes } from '../readingTime';

const ReactNotesIndex = () => (
    <Page title="React notes">
        <NoteReadingTime minutes={getNodeReadingMinutes(reactNotes)} total />
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <ul className="Article__notes">
            <li>The core examples support React 18 and later. Advanced APIs state their React 19 version requirements.</li>
        </ul>
        <NoteTree nodes={reactNotes.children} />
    </Page>
);

export default ReactNotesIndex;
