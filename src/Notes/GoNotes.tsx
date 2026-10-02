import './Notes.css';

import Page from '../Page/Page';
import { NOTES_ROUTE, toHref } from '../routing/routes';
import NoteTree from './NoteTree';
import { goNotes } from './noteTreeData';
import NoteReadingTime from './NoteReadingTime';
import { getNodeReadingMinutes } from './readingTime';

const GoNotes = () => (
    <Page title="Go notes">
        <NoteReadingTime minutes={getNodeReadingMinutes(goNotes)} total />
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <NoteTree nodes={goNotes.children} />
    </Page>
);

export default GoNotes;
