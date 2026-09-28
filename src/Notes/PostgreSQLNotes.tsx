import './Notes.css';

import Page from '../Page/Page';
import { NOTES_ROUTE, toHref } from '../routing/routes';
import NoteTree from './NoteTree';
import { postgresqlNotes } from './noteTreeData';

const PostgreSQLNotes = () => (
    <Page title="PostgreSQL notes">
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <p className="Notes__intro">{postgresqlNotes.summary}</p>
        <NoteTree nodes={postgresqlNotes.children} />
    </Page>
);

export default PostgreSQLNotes;
