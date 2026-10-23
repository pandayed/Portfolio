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
        <section className="Article__section" aria-labelledby="cicd-index-prerequisites">
            <h2 id="cicd-index-prerequisites" className="SectionTitle">Prerequisites</h2>
            <p>No prior notes required.</p>
        </section>
        <p className="Notes__intro">Start with the release process. Then read one page each for GitHub Actions, Jenkins, GitLab CI/CD, and Argo CD.</p>
        <NoteTree nodes={cicdNotes.children} />
        <section className="Article__section" aria-labelledby="cicd-index-references">
            <h2 id="cicd-index-references" className="SectionTitle">References</h2>
            <ul className="Article__notes">
                <li><a href="https://docs.github.com/en/actions" className="Link">GitHub Actions documentation</a></li>
                <li><a href="https://www.jenkins.io/doc/book/pipeline/" className="Link">Jenkins Pipeline documentation</a></li>
                <li><a href="https://docs.gitlab.com/ci/" className="Link">GitLab CI/CD documentation</a></li>
                <li><a href="https://argo-cd.readthedocs.io/en/stable/" className="Link">Argo CD documentation</a></li>
            </ul>
        </section>
    </Page>
);

export default CICDNotesIndex;
