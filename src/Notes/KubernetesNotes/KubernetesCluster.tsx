import './KubernetesSystemDiagram.css';

import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { KUBERNETES_CLUSTER_ROUTE, KUBERNETES_NOTES_ROUTE } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'kubernetes-cluster', title: 'Cluster parts' },
    { id: 'kubernetes-running-system', title: 'How a running system fits together' },
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

const KubernetesSystemDiagram = () => (
    <figure className="KubernetesSystemDiagram">
        <figcaption className="KubernetesSystemDiagram__title">
            One typical Linux Kubernetes cluster with one worker node
        </figcaption>

        <div className="KubernetesSystemDiagram__cluster">
            <div className="KubernetesSystemDiagram__boundaryLabel">Kubernetes cluster</div>

            <section
                className="KubernetesSystemDiagram__controlPlane"
                aria-label="Control plane"
            >
                <div className="KubernetesSystemDiagram__groupHeading">
                    <strong>Control plane (logical view)</strong>
                    <span>Runs on one or more machines and manages the cluster.</span>
                </div>

                <div className="KubernetesSystemDiagram__controlParts">
                    <div className="KubernetesSystemDiagram__part">
                        <strong>API server</strong>
                        <span>Receives and validates cluster requests</span>
                    </div>
                    <div className="KubernetesSystemDiagram__part">
                        <strong>Scheduler</strong>
                        <span>Selects a worker node for each new Pod</span>
                    </div>
                    <div className="KubernetesSystemDiagram__part">
                        <strong>Controllers</strong>
                        <span>Keep actual state close to desired state</span>
                    </div>
                    <div className="KubernetesSystemDiagram__part">
                        <strong>Cluster data</strong>
                        <span>Stores API objects and cluster state</span>
                    </div>
                </div>

                <div className="KubernetesSystemDiagram__controlHost">
                    <strong>Control-plane machine resources</strong>
                    <span>
                        These components also run on an operating system, kernel, CPU, and memory.
                        A managed Kubernetes provider may hide this machine layer.
                    </span>
                </div>
            </section>

            <div className="KubernetesSystemDiagram__connection" aria-label="Control plane and node communication">
                <span>Pod specifications and desired state ↓</span>
                <span className="KubernetesSystemDiagram__connectionLine" aria-hidden="true" />
                <span>↑ Node, Pod, and container status</span>
            </div>

            <section
                className="KubernetesSystemDiagram__node"
                aria-label="Worker node or host machine"
            >
                <div className="KubernetesSystemDiagram__groupHeading">
                    <strong>Worker node / host machine</strong>
                    <span>A physical machine or virtual machine that runs application Pods.</span>
                </div>

                <div className="KubernetesSystemDiagram__nodeServices">
                    <div className="KubernetesSystemDiagram__part">
                        <strong>kubelet</strong>
                        <span>Follows Pod specifications and reports status</span>
                    </div>
                    <div className="KubernetesSystemDiagram__part">
                        <strong>CRI-compatible runtime</strong>
                        <span>Starts and stops the Pod containers</span>
                    </div>
                    <div className="KubernetesSystemDiagram__part">
                        <strong>Node networking</strong>
                        <span>Connects Pod addresses to the cluster network</span>
                    </div>
                </div>

                <div className="KubernetesSystemDiagram__pods" aria-label="Pods running on the worker node">
                    <section className="KubernetesSystemDiagram__pod" aria-label="Pod web A">
                        <div className="KubernetesSystemDiagram__podHeading">
                            <strong>Pod: web-a</strong>
                            <span>Own Pod network namespace and IP</span>
                        </div>
                        <div className="KubernetesSystemDiagram__shared">
                            Shared inside this Pod: IP address, port space, and mounted volumes
                        </div>
                        <div className="KubernetesSystemDiagram__containers">
                            <div className="KubernetesSystemDiagram__container">
                                <strong>App container</strong>
                                <span>Own process and filesystem view</span>
                            </div>
                            <div className="KubernetesSystemDiagram__container">
                                <strong>Sidecar container</strong>
                                <span>Own process and filesystem view</span>
                            </div>
                        </div>
                    </section>

                    <section className="KubernetesSystemDiagram__pod" aria-label="Pod web B">
                        <div className="KubernetesSystemDiagram__podHeading">
                            <strong>Pod: web-b</strong>
                            <span>Different Pod network namespace and IP</span>
                        </div>
                        <div className="KubernetesSystemDiagram__shared">
                            Shared inside this Pod: IP address, port space, and mounted volumes
                        </div>
                        <div className="KubernetesSystemDiagram__containers">
                            <div className="KubernetesSystemDiagram__container">
                                <strong>App container</strong>
                                <span>Own process and filesystem view</span>
                            </div>
                            <div className="KubernetesSystemDiagram__container">
                                <strong>Sidecar container</strong>
                                <span>Own process and filesystem view</span>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="KubernetesSystemDiagram__kernel">
                    <strong>Host operating system and kernel</strong>
                    <span>
                        Shared by every Pod on this node. Namespaces isolate views. Control groups
                        account for and constrain resources.
                    </span>
                </div>

                <div className="KubernetesSystemDiagram__hardware">
                    <strong>Host resources</strong>
                    <span>CPU · memory · disks · network devices</span>
                </div>
            </section>
        </div>

        <p className="KubernetesSystemDiagram__note">
            A real cluster can have many worker nodes and several control plane machines. A small
            learning cluster may place both roles on one machine. Each worker node still has its
            own operating system, kernel, runtime, and resources.
        </p>
    </figure>
);

const KubernetesCluster = () => (
    <ArticleLayout
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

        <section className="Article__section" aria-labelledby="kubernetes-running-system">
            <h2 id="kubernetes-running-system" className="SectionTitle">
                How a running system fits together
            </h2>
            <p>
                This view uses one worker node so the sharing boundaries stay visible. The control
                plane stores and manages cluster state. The worker node runs the application Pods.
            </p>
            <KubernetesSystemDiagram />
            <h3 className="Article__subTitle">What is shared at each boundary</h3>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead>
                        <tr><th>Boundary</th><th>Shared</th><th>Separate by default</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Containers in one Pod</td>
                            <td>Pod IP, port space, <code>localhost</code>, node kernel, and volumes mounted into both containers.</td>
                            <td>Image, writable layer, environment, and process namespace.</td>
                        </tr>
                        <tr>
                            <td>Different Pods on one Linux node</td>
                            <td>Node kernel and underlying CPU, memory, disks, and network devices.</td>
                            <td>Pod IP, network namespace, <code>localhost</code>, and container filesystems.</td>
                        </tr>
                        <tr>
                            <td>Pods on different nodes</td>
                            <td>Cluster network reachability and Kubernetes API objects.</td>
                            <td>Kernel, node hardware, <code>localhost</code>, and node-local ephemeral storage.</td>
                        </tr>
                        <tr>
                            <td>Control plane and workers</td>
                            <td>Desired and current state exchanged through the API server.</td>
                            <td>Application processes, memory, filesystems, and network namespaces.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>The kubelet talks to the API server, asks the runtime to manage containers, and reports status back to the control plane.</li>
                <li>Normal application traffic uses the cluster network. It does not pass through the control plane.</li>
                <li>Namespaces isolate what processes can see. Control groups account for and constrain resource use on a Linux node.</li>
            </ul>
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
                <li>In the normal network model, each Pod receives its own Pod IP address on the cluster network.</li>
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
    </ArticleLayout>
);

export default KubernetesCluster;
