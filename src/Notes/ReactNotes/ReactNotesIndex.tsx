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
                Start with <a href={toHref(`${REACT_NOTES_ROUTE}/react-rendering-and-jsx`)} className="Link">React rendering and JSX</a>.
                Read groups 1–4 in order. Group 5 is a Hook reference.
            </li>
            <li>
                Before React, learn <a href={toHref(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/functions-and-scope`)} className="Link">functions and scope</a>,
                <a href={toHref(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/arrays-and-objects`)} className="Link"> arrays and objects</a>,
                and <a href={toHref(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/classes-prototypes-and-modules`)} className="Link">imports and exports</a>.
            </li>
            <li>
                Typed examples use the TypeScript Basics sequence, starting with <a href={toHref(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/inference-unions-and-narrowing`)} className="Link">Annotations and inference</a>.
                It covers named types, narrowing, object shapes, interfaces, and generics before you use them in React.
            </li>
            <li>Component examples run inside an existing React app. JSX describes the elements to display. TSX is JSX in a TypeScript file.</li>
            <li>The main lessons use React 18 APIs. The reference marks APIs that require React 19.</li>
        </ul>
        <NoteTree nodes={reactNotes.children} />
    </Page>
);

export default ReactNotesIndex;
