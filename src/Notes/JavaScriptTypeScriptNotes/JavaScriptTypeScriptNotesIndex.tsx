import '../Notes.css';

import Page from '../../Page/Page';
import { JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE, NOTES_ROUTE, REACT_NOTES_ROUTE, toHref } from '../../routing/routes';
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
            <li>
                Start with <a href={toHref(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/runtime-and-types`)} className="Link">Runtime and types</a>.
                Read groups 1–4 in order to learn JavaScript before the TypeScript type system.
            </li>
            <li>JavaScript examples show what runs. TypeScript examples show what the checker accepts or rejects.</li>
            <li>
                After JavaScript, read <a href={toHref(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/inference-unions-and-narrowing`)} className="Link">Inference, unions, and narrowing</a>,
                then object types and generics in group 5.
            </li>
            <li>Group 6 uses the types taught in group 5. Read it after those basics.</li>
            <li>
                The <a href={toHref(REACT_NOTES_ROUTE)} className="Link">React notes</a> use functions, arrays, objects, modules, and TypeScript object types from this collection.
            </li>
        </ul>
        <NoteTree nodes={javascriptTypeScriptNotes.children} />
    </Page>
);

export default JavaScriptTypeScriptNotesIndex;
