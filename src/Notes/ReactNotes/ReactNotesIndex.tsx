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
        <p className="Notes__intro">
            React concepts use TypeScript examples. JavaScript and TypeScript language topics stay in
            their own shared collection.
        </p>
        <NoteTree nodes={reactNotes.children} />
    </Page>
);

export default ReactNotesIndex;
