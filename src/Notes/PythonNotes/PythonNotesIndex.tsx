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
        <section className="Article__section" aria-labelledby="python-index-prerequisites">
            <h2 id="python-index-prerequisites" className="SectionTitle">Prerequisites</h2>
            <p>No prior notes required.</p>
        </section>
        <p className="Notes__intro">
            Find term definitions in the{' '}
            <a className="Link" href={toHref(PROGRAMMING_DICTIONARY_ROUTE)}>programming dictionary</a>.
        </p>
        <NoteTree nodes={pythonNotes.children} />
        <section className="Article__section" aria-labelledby="python-index-references">
            <h2 id="python-index-references" className="SectionTitle">References</h2>
            <ul className="Article__notes">
                <li><a href="https://docs.python.org/3/tutorial/" className="Link">Official Python Tutorial</a></li>
                <li><a href="https://github.com/pandayed/PythonNotes" className="Link">PythonNotes reference repository</a></li>
            </ul>
        </section>
    </Page>
);

export default PythonNotesIndex;
