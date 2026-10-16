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
        <p className="Notes__intro">
            Read these four chapters in order. First run a container, then build a small website
            image, connect a client, and keep files outside disposable containers. Finally, save
            the same setup in Docker Compose. Each chapter uses what the previous one created.
        </p>
        <NoteTree nodes={dockerNotes.children} />
    </Page>
);

export default DockerNotesIndex;
