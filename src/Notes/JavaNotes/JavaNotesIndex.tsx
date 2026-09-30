import '../Notes.css';

import Page from '../../Page/Page';
import { NOTES_ROUTE, toHref } from '../../routing/routes';
import NoteTree from '../NoteTree';
import { javaNotes } from '../noteTreeData';

const JavaNotesIndex = () => (
    <Page title="Java notes">
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <p className="Notes__intro">
            Java notes start with how a program is compiled and run. Later pages will build on
            those basics.
        </p>
        <NoteTree nodes={javaNotes.children} />
    </Page>
);

export default JavaNotesIndex;
