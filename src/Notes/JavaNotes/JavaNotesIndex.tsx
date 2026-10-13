import '../Notes.css';

import Page from '../../Page/Page';
import { JAVA_PROGRAM_EXECUTION_ROUTE, NOTES_ROUTE, toHref } from '../../routing/routes';
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
        <ul className="Article__notes">
            <li>Examples use Java 17 or later. They do not use preview features.</li>
            <li>
                Start with <a className="Link" href={toHref(JAVA_PROGRAM_EXECUTION_ROUTE)}>program execution</a>,
                then follow the chapters in order.
            </li>
            <li>
                References:{' '}
                <a className="Link" href="https://dev.java/learn/" target="_blank" rel="noreferrer">official Java learning guide</a>{' '}
                and the{' '}
                <a className="Link" href="https://docs.oracle.com/en/java/javase/17/docs/api/index.html" target="_blank" rel="noreferrer">Java 17 API reference</a>.
            </li>
        </ul>
        <NoteTree nodes={javaNotes.children} />
    </Page>
);

export default JavaNotesIndex;
