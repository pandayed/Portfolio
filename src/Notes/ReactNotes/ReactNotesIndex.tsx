import '../Notes.css';

import Page from '../../Page/Page';
import { JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE, NOTES_ROUTE, REACT_NOTES_ROUTE, toHref } from '../../routing/routes';
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
            <li>
                Start with <a href={toHref(`${REACT_NOTES_ROUTE}/react-rendering-and-jsx`)} className="Link">Components and JSX</a>.
                Read the lessons in order. The final group is an advanced Hook reference.
            </li>
            <li>
                Before React, learn JavaScript <a href={toHref(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/functions-and-scope`)} className="Link">functions</a>,
                <a href={toHref(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/function-values-and-callbacks`)} className="Link"> callbacks</a>,
                <a href={toHref(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/arrays-and-objects`)} className="Link"> arrays</a>,
                <a href={toHref(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/objects`)} className="Link"> objects</a>,
                <a href={toHref(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/destructuring-and-spread`)} className="Link"> destructuring</a>,
                and <a href={toHref(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/modules`)} className="Link"> modules</a>.
                Basic HTML is also required.
            </li>
            <li>
                The core lessons use JavaScript and JSX in an existing React app.
                Read JavaScript promises and async/await before the data-fetching lesson.
            </li>
            <li>
                TypeScript comes after the core sequence in <a href={toHref(`${REACT_NOTES_ROUTE}/react-with-typescript`)} className="Link">React with TypeScript</a>.
                Read the TypeScript object-type, union, and generic lessons before that page.
            </li>
            <li>The core examples support React 18 and later. Advanced APIs state their React 19 version requirements.</li>
        </ul>
        <NoteTree nodes={reactNotes.children} />
    </Page>
);

export default ReactNotesIndex;
