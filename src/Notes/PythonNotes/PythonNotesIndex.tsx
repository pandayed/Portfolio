import '../Notes.css';

import Page from '../../Page/Page';
import { NOTES_ROUTE, toHref } from '../../routing/routes';
import NoteTree from '../NoteTree';
import { pythonNotes } from '../noteTreeData';

const PythonNotesIndex = () => (
    <Page title="Python notes">
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
            </a>
            . The examples are grouped into chapters, and incorrect or incomplete claims are
            called out on the relevant page.
        </p>
        <NoteTree nodes={pythonNotes.children} />
    </Page>
);

export default PythonNotesIndex;
