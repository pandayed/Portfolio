import '../Notes.css';

import Page from '../../Page/Page';
import { NOTES_ROUTE, toHref } from '../../routing/routes';
import NoteTree from '../NoteTree';
import { springBootNotes } from '../noteTreeData';

const SpringBootNotesIndex = () => (
    <Page title="Spring Boot notes">
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <p className="Notes__intro">
            These notes assume the Java basics and explain how Spring Boot starts an application
            and handles web requests.
        </p>
        <NoteTree nodes={springBootNotes.children} />
    </Page>
);

export default SpringBootNotesIndex;
