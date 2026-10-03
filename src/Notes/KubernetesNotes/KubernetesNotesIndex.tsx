import '../Notes.css';

import Page from '../../Page/Page';
import { NOTES_ROUTE, toHref } from '../../routing/routes';
import NoteReadingTime from '../NoteReadingTime';
import NoteTree from '../NoteTree';
import { getNodeReadingMinutes } from '../readingTime';
import { kubernetesNotes } from '../noteTreeData';

const KubernetesNotesIndex = () => (
    <Page title="Kubernetes notes">
        <NoteReadingTime minutes={getNodeReadingMinutes(kubernetesNotes)} total />
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <p className="Notes__intro">
            Start with the cluster and Pod model. Then deploy an application, provide configuration
            and storage, and operate the workload through rollouts and debugging.
        </p>
        <NoteTree nodes={kubernetesNotes.children} />
    </Page>
);

export default KubernetesNotesIndex;
