import './Notes.css';

import Page from '../Page/Page';
import { NOTES_ROUTE, toHref } from '../routing/routes';
import NoteTree from './NoteTree';
import { postgresqlNotes } from './noteTreeData';
import NoteReadingTime from './NoteReadingTime';
import { getNodeReadingMinutes } from './readingTime';

const PostgreSQLNotes = () => (
    <Page title="PostgreSQL notes">
        <NoteReadingTime minutes={getNodeReadingMinutes(postgresqlNotes)} total />
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <NoteTree nodes={postgresqlNotes.children} />
    </Page>
);

export default PostgreSQLNotes;
