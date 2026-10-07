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
        <ul className="Article__notes">
            <li>Shared pages explain what JavaScript does when it runs and what TypeScript checks before it runs.</li>
            <li>TypeScript-only pages explain types and type checking.</li>
        </ul>
        <NoteTree nodes={javascriptTypeScriptNotes.children} />
    </Page>
);

export default JavaScriptTypeScriptNotesIndex;
