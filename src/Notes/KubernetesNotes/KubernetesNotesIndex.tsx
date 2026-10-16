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
    <p className="Notes__intro">
        Read the chapters in order after learning Docker images and containers. Start a local
        cluster, run one nginx website, give it a stable Service, supply its page through a
        ConfigMap, and then manage its health and updates. Each chapter keeps the application
        and files from the preceding chapter.
    </p>
    <p className="Notes__intro">
        You need a running Docker installation, kubectl, minikube, internet access, and a terminal.
        The first chapter links the setup instructions. Keep the same lesson folder and cluster
        until the final cleanup. Storage and public routing are explained where they become relevant;
        the static website does not require a database or a public load balancer.
    </p>
    <NoteTree nodes={kubernetesNotes.children} />
</Page>);
export default KubernetesNotesIndex;
