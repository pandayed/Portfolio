import Page from '../../Page/Page';
import { NOTES_ROUTE, toHref } from '../../routing/routes';
import NoteTree from '../NoteTree';
import { systemDesignNotes } from '../noteTreeData';
import NoteReadingTime from '../NoteReadingTime';
import { getNodeReadingMinutes } from '../readingTime';

const SystemDesignNotes = () => (
    <Page title="System Design">
        <NoteReadingTime minutes={getNodeReadingMinutes(systemDesignNotes)} total />
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <NoteTree nodes={systemDesignNotes.children} />
    </Page>
);

export default SystemDesignNotes;
