import './Notes.css';

import Page from '../Page/Page';
import { NOTES_ROUTE, toHref } from '../routing/routes';
import NoteTree from './NoteTree';
import { mysqlNotes } from './noteTreeData';

const MysqlNotes = () => (
    <Page title="MySQL notes">
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <p className="Notes__intro">{mysqlNotes.summary}</p>
        <NoteTree nodes={mysqlNotes.children} />
    </Page>
);

export default MysqlNotes;
