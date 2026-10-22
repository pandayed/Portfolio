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
        <ul className="Article__notes">
            <li>Java and general web concepts are prerequisites. The application lessons start with no Spring knowledge.</li>
            <li>The data-access lessons use PostgreSQL and Spring Data JPA.</li>
            <li>Integrations and deployment follow the core application lessons. Annotations at a glance is a lookup page.</li>
            <li>The sources include the <a className="Link" href="https://www.youtube.com/playlist?list=PLA3GkZPtsafacdBLdd3p1DyRd5FGfr3Ue">Engineering Digest playlist</a> and the official Spring guides linked within each lesson.</li>
        </ul>
        <NoteTree nodes={springBootNotes.children} />
    </Page>
);

export default SpringBootNotesIndex;
