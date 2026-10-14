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
                Start with <a href={toHref(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/runtime-and-types`)} className="Link">Running JavaScript, comments, and console</a>.
                Follow the lessons in the displayed order. Each page’s Next link opens the following lesson.
            </li>
            <li>
                <a href={toHref(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/variables-values-and-operators`)} className="Link">var, let, and const</a> have one dedicated lesson.
                Operators, functions, arrays, and objects each follow on their own pages.
            </li>
            <li>
                After the JavaScript lessons, start TypeScript with <a href={toHref(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/inference-unions-and-narrowing`)} className="Link">Type annotations and inference</a>.
                TypeScript adds checks to the JavaScript you have already learned.
            </li>
            <li>
                The <a href={toHref(REACT_NOTES_ROUTE)} className="Link">React lessons</a> use JavaScript first.
                Their TypeScript lesson follows the core React topics.
            </li>
        </ul>
        <NoteTree nodes={javascriptTypeScriptNotes.children} />
    </Page>
);

export default JavaScriptTypeScriptNotesIndex;
