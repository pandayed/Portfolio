import './Notes.css';

import Page from '../Page/Page';
import NoteTree from './NoteTree';
import { noteTree } from './noteTreeData';
import NoteReadingTime from './NoteReadingTime';
import { getTotalReadingMinutes } from './readingTime';

const Notes = () => (
    <Page title="Notes">
        <NoteReadingTime minutes={getTotalReadingMinutes(noteTree)} total />
        <p className="Notes__intro">
            Short references grouped by subject. A subject can contain pages or more subjects.
        </p>
        <NoteTree nodes={noteTree} rootGroupChildLimit={4} />
    </Page>
);

export default Notes;
