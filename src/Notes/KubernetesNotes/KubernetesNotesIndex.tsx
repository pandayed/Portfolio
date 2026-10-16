import '../Notes.css';
import Page from '../../Page/Page';
import { NOTES_ROUTE, toHref } from '../../routing/routes';
import NoteReadingTime from '../NoteReadingTime';
import NoteTree from '../NoteTree';
import { getNodeReadingMinutes } from '../readingTime';
import { kubernetesNotes } from '../noteTreeData';
const KubernetesNotesIndex = () => (<Page title="Kubernetes lessons">
    <NoteReadingTime minutes={getNodeReadingMinutes(kubernetesNotes)} total />
    <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
        Back to notes
    </a>
    <ul className="Article__notes">
        <li>Docker images and containers are prerequisites for these chapters.</li>
        <li>The chapters follow one nginx website from a local cluster to a Service, configuration, health checks, and updates.</li>
        <li>Each chapter reuses the application and files from the preceding chapter.</li>
        <li>The examples require running Docker, kubectl, minikube, internet access, and a terminal.</li>
        <li>Chapter 1 links the setup instructions.</li>
        <li>The same lesson folder and cluster are required until final cleanup.</li>
        <li>Storage and public routing appear where they become relevant.</li>
        <li>The static website requires no database or public load balancer.</li>
    </ul>
    <NoteTree nodes={kubernetesNotes.children} />
</Page>);
export default KubernetesNotesIndex;
