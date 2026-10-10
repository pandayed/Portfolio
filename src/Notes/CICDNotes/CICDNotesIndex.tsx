import '../Notes.css';

import Page from '../../Page/Page';
import { NOTES_ROUTE, toHref } from '../../routing/routes';
import NoteReadingTime from '../NoteReadingTime';
import NoteTree from '../NoteTree';
import { cicdNotes } from '../noteTreeData';
import { getNodeReadingMinutes } from '../readingTime';

const CICDNotesIndex = () => (
    <Page title="CI/CD notes">
        <NoteReadingTime minutes={getNodeReadingMinutes(cicdNotes)} total />
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">Back to notes</a>
        <p className="Notes__intro">Start with the release process. Then read one page each for GitHub Actions, Jenkins, GitLab CI/CD, and Argo CD.</p>
        <NoteTree nodes={cicdNotes.children} />
    </Page>
);

export default CICDNotesIndex;
