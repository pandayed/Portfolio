import '../Notes.css';

import Page from '../../Page/Page';
import { NOTES_ROUTE, PROGRAMMING_DICTIONARY_ROUTE, toHref } from '../../routing/routes';
import NoteTree from '../NoteTree';
import { pythonNotes } from '../noteTreeData';
import NoteReadingTime from '../NoteReadingTime';
import { getNodeReadingMinutes } from '../readingTime';

const PythonNotesIndex = () => (
    <Page title="Python notes">
        <NoteReadingTime minutes={getNodeReadingMinutes(pythonNotes)} total />
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <p className="Notes__intro">
            Short notes adapted from the{' '}
            <a
                href="https://github.com/pandayed/PythonNotes"
                className="Link"
                target="_blank"
                rel="noreferrer"
            >
                PythonNotes reference repository
            </a>. The notes are grouped into chapters and use short examples to explain each topic.
        </p>
        <p className="Notes__intro">
            Find term definitions in the{' '}
            <a className="Link" href={toHref(PROGRAMMING_DICTIONARY_ROUTE)}>programming dictionary</a>.
        </p>
        <NoteTree nodes={pythonNotes.children} />
    </Page>
);

export default PythonNotesIndex;
