import '../Notes.css';

import Page from '../../Page/Page';
import { NOTES_ROUTE, toHref } from '../../routing/routes';
import NoteReadingTime from '../NoteReadingTime';
import NoteTree from '../NoteTree';
import { javascriptTypeScriptNotes } from '../noteTreeData';
import { getNodeReadingMinutes } from '../readingTime';

const JavaScriptTypeScriptNotesIndex = () => (
    <Page title="JavaScript and TypeScript notes">
        <NoteReadingTime minutes={getNodeReadingMinutes(javascriptTypeScriptNotes)} total />
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <NoteTree nodes={javascriptTypeScriptNotes.children} />
    </Page>
);

export default JavaScriptTypeScriptNotesIndex;
