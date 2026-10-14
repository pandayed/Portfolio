import '../Notes.css';

import Page from '../../Page/Page';
import { NOTES_ROUTE, toHref } from '../../routing/routes';
import NoteTree from '../NoteTree';
import { springBootNotes } from '../noteTreeData';
import NoteReadingTime from '../NoteReadingTime';
import { getNodeReadingMinutes } from '../readingTime';

const SpringBootNotesIndex = () => (
    <Page title="Spring Boot notes">
        <NoteReadingTime minutes={getNodeReadingMinutes(springBootNotes)} total />
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <p className="Notes__intro">
            Read the chapters in order: application foundations, configuration, REST APIs,
            data access, security, development tools, testing, integrations, and deployment.
            Use the annotation reference when you need to look up an annotation. The topic selection follows{' '}
            <a className="Link" href="https://www.youtube.com/playlist?list=PLA3GkZPtsafacdBLdd3p1DyRd5FGfr3Ue">
                Engineering Digest’s Spring Boot playlist
            </a>.
        </p>
        <NoteTree nodes={springBootNotes.children} />
    </Page>
);

export default SpringBootNotesIndex;
