import '../Notes.css';

import Page from '../../Page/Page';
import { NOTES_ROUTE, toHref } from '../../routing/routes';
import NoteTree from '../NoteTree';
import { javaNotes } from '../noteTreeData';
import NoteReadingTime from '../NoteReadingTime';
import { getNodeReadingMinutes } from '../readingTime';

const JavaNotesIndex = () => (
    <Page title="Java notes">
        <NoteReadingTime minutes={getNodeReadingMinutes(javaNotes)} total />
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <p className="Notes__intro">
            Start with compilation and the JVM, then learn the language, object design,
            collections, streams, files, and concurrency. Examples use Java 17 or later
            without preview features.
        </p>
        <p className="Notes__intro">
            Save a complete example with a public Main class as Main.java, then run
            <code> javac Main.java</code> and <code>java Main</code> in its directory.
            Examples labeled as method bodies or declarations need the surrounding class.
            For further reading, use the{' '}
            <a className="Link" href="https://dev.java/learn/" target="_blank" rel="noreferrer">official Java learning guide</a>{' '}
            and the{' '}
            <a className="Link" href="https://docs.oracle.com/en/java/javase/17/docs/api/index.html" target="_blank" rel="noreferrer">Java 17 API reference</a>.
        </p>
        <NoteTree nodes={javaNotes.children} />
    </Page>
);

export default JavaNotesIndex;
