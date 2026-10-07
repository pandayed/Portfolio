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
            <li>React examples use TypeScript.</li>
            <li>JavaScript and TypeScript language topics have a separate notes collection.</li>
        </ul>
        <NoteTree nodes={reactNotes.children} />
    </Page>
);

export default ReactNotesIndex;
