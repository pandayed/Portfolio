import '../Notes.css';

import Page from '../../Page/Page';
import { NOTES_ROUTE, toHref } from '../../routing/routes';
import NoteReadingTime from '../NoteReadingTime';
import NoteTree from '../NoteTree';
import { getNodeReadingMinutes } from '../readingTime';
import { dockerNotes } from '../noteTreeData';

const DockerNotesIndex = () => (
    <Page title="Docker lessons">
        <NoteReadingTime minutes={getNodeReadingMinutes(dockerNotes)} total />
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <ul className="Notes__intro Article__notes">
            <li>The four chapters form one connected sequence.</li>
            <li>The sequence begins with a container and a small website image.</li>
            <li>Networking and storage add a client and files outside disposable containers.</li>
            <li>Docker Compose stores the same setup in a configuration file.</li>
            <li>Each chapter uses what the previous one created.</li>
        </ul>
        <NoteTree nodes={dockerNotes.children} />
    </Page>
);

export default DockerNotesIndex;
