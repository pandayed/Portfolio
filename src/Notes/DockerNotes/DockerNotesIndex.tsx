import '../Notes.css';

import Page from '../../Page/Page';
import { NOTES_ROUTE, toHref } from '../../routing/routes';
import NoteReadingTime from '../NoteReadingTime';
import NoteTree from '../NoteTree';
import { getNodeReadingMinutes } from '../readingTime';
import { dockerNotes } from '../noteTreeData';

const DockerNotesIndex = () => (
    <Page title="Docker notes">
        <NoteReadingTime minutes={getNodeReadingMinutes(dockerNotes)} total />
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <p className="Notes__intro">
            Start with images and containers. Then build an image, connect services, persist data,
            and use Compose for a local application stack.
        </p>
        <NoteTree nodes={dockerNotes.children} />
    </Page>
);

export default DockerNotesIndex;
