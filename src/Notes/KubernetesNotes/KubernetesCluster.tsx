import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { KUBERNETES_CLUSTER_ROUTE, KUBERNETES_NOTES_ROUTE } from '../../routing/routes';
import NoteArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'kubernetes-cluster', title: 'Cluster parts' },
    { id: 'kubernetes-pod', title: 'Pod model' },
    { id: 'kubernetes-controllers', title: 'Desired state and controllers' },
    { id: 'kubernetes-scheduling', title: 'Scheduling and replacement' },
    { id: 'kubernetes-kubectl', title: 'kubectl and API objects' },
];

const inspectCommands = [
    'kubectl config current-context',
    'kubectl cluster-info',
    'kubectl get nodes',
    'kubectl get pods --all-namespaces',
    'kubectl api-resources',
].join('\n');

const podManifest = [
    'apiVersion: v1',
    'kind: Pod',
    'metadata:',
    '  name: web',
    '  labels:',
    '    app: web',
    'spec:',
    '  containers:',
    '    - name: nginx',
    '      image: nginx:1.27-alpine',
    '      ports:',
    '        - name: http',
    '          containerPort: 80',
].join('\n');

const KubernetesCluster = () => (
    <NoteArticleLayout
        title="Clusters, nodes, Pods, and controllers"
        route={KUBERNETES_CLUSTER_ROUTE}
        sections={sections}
        backRoute={KUBERNETES_NOTES_ROUTE}
        backLabel="Back to Kubernetes notes"
    >
        <section className="Article__section">
            <p>
                Kubernetes stores desired state as API objects. The control plane schedules work and
                runs controllers. Nodes run the Pods that contain application containers.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-cluster">
            <h2 id="kubernetes-cluster" className="SectionTitle">Cluster parts</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Part</th><th>Responsibility</th></tr></thead>
                    <tbody>
                        <tr><td>API server</td><td>Accepts and validates requests from clients and cluster components.</td></tr>
                        <tr><td>etcd</td><td>Stores cluster API data for the control plane.</td></tr>
                        <tr><td>Scheduler</td><td>Selects a suitable node for each unscheduled Pod.</td></tr>
                        <tr><td>Controller manager</td><td>Runs controllers that reconcile object state.</td></tr>
                        <tr><td>Node</td><td>Provides compute, networking, and a container runtime for Pods.</td></tr>
                        <tr><td>kubelet</td><td>Runs on a node and works to keep assigned Pods and containers running.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                Kubernetes uses a CRI-compatible container runtime on nodes. Kubernetes does not
                require Docker Engine, and it does not build container images.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-pod">
            <h2 id="kubernetes-pod" className="SectionTitle">Pod model</h2>
            <p>
                A Pod is the smallest deployable Kubernetes unit. Its containers share a network
                namespace and can share mounted volumes. They are scheduled together on one node.
            </p>
            <CodeBlock language="text">{podManifest}</CodeBlock>
            <ul className="Article__notes">
                <li>Containers in one Pod can connect to each other through <code>localhost</code>.</li>
                <li>Each Pod receives its own cluster IP address.</li>
                <li>A Pod is replaceable. Its name, IP, and writable container files should not be treated as durable application state.</li>
                <li>Use multiple containers in one Pod only when their lifecycle and resources are tightly coupled.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-controllers">
            <h2 id="kubernetes-controllers" className="SectionTitle">Desired state and controllers</h2>
            <p>
                A controller watches Kubernetes objects and compares their declared state with the
                current state. It then creates, updates, or removes objects to reduce the difference.
                This repeated process is reconciliation.
            </p>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Controller object</th><th>Workload</th></tr></thead>
                    <tbody>
                        <tr><td>Deployment</td><td>Interchangeable stateless Pods and rolling updates.</td></tr>
                        <tr><td>StatefulSet</td><td>Pods that need stable identity or ordered lifecycle.</td></tr>
                        <tr><td>DaemonSet</td><td>One Pod on every selected node.</td></tr>
                        <tr><td>Job</td><td>Finite work that completes successfully.</td></tr>
                        <tr><td>CronJob</td><td>Jobs created on a schedule.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                A Deployment normally creates ReplicaSets, which create Pods. Change the Deployment
                template instead of editing one managed Pod. The controller can replace that Pod at
                any time.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-scheduling">
            <h2 id="kubernetes-scheduling" className="SectionTitle">Scheduling and replacement</h2>
            <p>
                The scheduler considers requested resources, node constraints, affinity rules,
                taints, tolerations, and other policies. It records a node assignment. The kubelet
                on that node then asks the runtime to start the containers.
            </p>
            <p>
                If a managed Pod disappears, its controller can create a replacement. That
                replacement may have a new name, IP, and node. A Service and persistent storage
                exist to provide stable boundaries outside individual Pods.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-kubectl">
            <h2 id="kubernetes-kubectl" className="SectionTitle">kubectl and API objects</h2>
            <CodeBlock language="text">{inspectCommands}</CodeBlock>
            <p>
                <code>kubectl</code> sends requests to the API server using the active kubeconfig
                context. Check the context and namespace before a write or delete. A successful
                API response proves that the request was accepted. It does not prove that a workload
                became ready.
            </p>
            <p>
                Reference: <a className="Link" href="https://kubernetes.io/docs/concepts/" target="_blank" rel="noreferrer">Kubernetes concepts</a> and{' '}
                <a className="Link" href="https://kubernetes.io/docs/concepts/workloads/pods/" target="_blank" rel="noreferrer">Pods</a> in the official Kubernetes documentation.
            </p>
        </section>
    </NoteArticleLayout>
);

export default KubernetesCluster;
