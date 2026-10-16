import './Notes.css';

import Page from '../Page/Page';
import { NOTES_ROUTE, toHref } from '../routing/routes';
import NoteReadingTime from './NoteReadingTime';
import NoteTree from './NoteTree';
import { frontendNotes } from './noteTreeData';
import { getTotalReadingMinutes } from './readingTime';

const FrontendNotes = () => (
    <Page title="Frontend notes">
        <NoteReadingTime minutes={getTotalReadingMinutes(frontendNotes.children)} total />
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <NoteTree nodes={frontendNotes.children} />
    </Page>
);

export default FrontendNotes;
