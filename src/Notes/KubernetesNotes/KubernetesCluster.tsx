import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { KUBERNETES_CLUSTER_ROUTE, KUBERNETES_DEPLOY_ROUTE, KUBERNETES_NOTES_ROUTE, DOCKER_NOTES_ROUTE, toHref } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';
import './KubernetesSystemDiagram.css';
const KubernetesSystemDiagram = () => (<figure className="KubernetesSystemDiagram">
    <figcaption className="KubernetesSystemDiagram__title">
        One typical Linux Kubernetes cluster with one worker node
    </figcaption>
    <div className="KubernetesSystemDiagram__cluster">
        <div className="KubernetesSystemDiagram__boundaryLabel">Kubernetes cluster
        </div>
        <section className="KubernetesSystemDiagram__controlPlane" aria-label="Control plane">
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
                    <span>Controllers keep actual state close to desired state</span>
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
        <section className="KubernetesSystemDiagram__node" aria-label="Worker node or host machine">
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
    <ul className="KubernetesSystemDiagram__note">
            <li>A real cluster can have many worker nodes and several control plane machines.</li>
            <li>A small learning cluster may place both roles on one machine.</li>
            <li>Each worker node still has its own operating system, kernel, runtime, and resources.</li>
        </ul>
</figure>);
const sections: TocEntry[] = [
    { id: "kubernetes-cluster", title: "Kubernetes maintains the requested application state" },
    { id: "kubernetes-pod", title: "The unit Kubernetes starts is a Pod" },
    { id: "kubernetes-running-system", title: "A request travels from kubectl to a node" },
    { id: "kubernetes-controllers", title: "Objects describe the desired state" },
    { id: "kubernetes-kubectl", title: "The local cluster and lesson namespace" }
];



const KubernetesCluster = () => (<ArticleLayout title="1. From containers to a Kubernetes cluster" route={KUBERNETES_CLUSTER_ROUTE} sections={sections} backRoute={KUBERNETES_NOTES_ROUTE} backLabel="Back to Kubernetes lessons">
    <section className="Article__section">
        <ul className="Article__notes">
            <li>An image supplies the files used to create a container.</li>
            <li>Kubernetes describes how an application should keep running across machines.</li>
            <li>The prerequisites are covered in the <a className="Link" href={toHref(DOCKER_NOTES_ROUTE)}>Docker lessons</a>.</li>
            <li>The image and container concepts carry over.</li>
        </ul>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-cluster">
        <h2 id="kubernetes-cluster" className="SectionTitle">Kubernetes maintains the requested application state</h2>
        <ul className="Article__notes">
            <li>A website may need two running copies.</li>
            <li>Starting two containers solves the immediate task.</li>
            <li>Those copies may need replacement after failures or during updates.</li>
            <li>Their network addresses can change when they are replaced.</li>
            <li>Kubernetes stores the requested state and repeatedly works toward it.</li>
        </ul>
        <ul className="Article__notes">
            <li>A cluster is a group of machines managed together.</li>
            <li>Each machine is a node.</li>
            <li>The control plane manages cluster state.</li>
            <li>Nodes run application containers.</li>
            <li>A local learning cluster can put both roles on one machine.</li>
        </ul>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-pod">
        <h2 id="kubernetes-pod" className="SectionTitle">The unit Kubernetes starts is a Pod</h2>
        <ul className="Article__notes">
            <li>A Pod is a group of one or more containers scheduled together on one node.</li>
            <li>These lessons use one application container per Pod.</li>
            <li>Two copies of an application normally mean two Pods, rather than two application containers inside one Pod.</li>
        </ul>
        <ul className="Article__notes">
            <li>Containers in one Pod share its network address and port space.</li>
            <li>They can reach each other through localhost.</li>
            <li>They share files only through volumes mounted into both containers.</li>
            <li>Different Pods normally have different IP addresses.</li>
            <li>A replacement Pod can receive a new name, address, and node.</li>
            <li>On a Linux node, container isolation still uses the node kernel.</li>
            <li>A Pod does not give each container a separate operating system.</li>
            <li>A sidecar is a helper container that belongs with an application container.</li>
            <li>The diagram includes sidecars to show sharing.</li>
            <li>The exercises use one container per Pod.</li>
        </ul>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-running-system">
        <h2 id="kubernetes-running-system" className="SectionTitle">A request travels from kubectl to a node</h2>
        <ul className="Article__notes">
            <li>kubectl sends requests to the cluster.</li>
            <li>The API server accepts a valid request and stores the object.</li>
            <li>A controller notices work to do.</li>
            <li>The scheduler assigns a new Pod to a suitable node.</li>
            <li>The node starts its containers.</li>
        </ul>
        <KubernetesSystemDiagram />
        <div className="Article__tableWrap">
            <table className="Article__table">
                <thead>
                    <tr>
                        <th>Part
                        </th>
                        <th>Job in that sequence
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>API server
                        </td>
                        <td>Receives cluster requests and checks access and object validity.
                        </td>
                    </tr>
                    <tr>
                        <td>etcd
                        </td>
                        <td>Stores the control plane’s API data. It is not your application database.
                        </td>
                    </tr>
                    <tr>
                        <td>Controllers
                        </td>
                        <td>Controllers compare requested and observed state and act on differences.
                        </td>
                    </tr>
                    <tr>
                        <td>Scheduler
                        </td>
                        <td>Chooses a suitable node for an unassigned Pod.
                        </td>
                    </tr>
                    <tr>
                        <td>kubelet
                        </td>
                        <td>Runs on the node. Asks the container runtime to run assigned containers and reports status.
                        </td>
                    </tr>
                    <tr>
                        <td>Container runtime
                        </td>
                        <td>Pulls images and starts containers. Kubernetes does not require Docker Engine on its nodes.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ul className="Article__notes">
            <li>The diagram’s Linux namespaces isolate operating-system views.</li>
            <li>A Kubernetes namespace, introduced below, groups API objects.</li>
            <li>They are different concepts.</li>
        </ul>
        <ul className="Article__notes">
            <li>Normal application traffic travels through the application network.</li>
            <li>It does not go through the scheduler or controller manager.</li>
            <li>The control plane manages the application.</li>
            <li>It does not serve the application’s web pages.</li>
        </ul>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-controllers">
        <h2 id="kubernetes-controllers" className="SectionTitle">Objects describe the desired state</h2>
        <ul className="Article__notes">
            <li>A Kubernetes object is a stored record with a type, a name, and configuration.</li>
            <li>A Deployment is an object for managing replaceable application Pods.</li>
            <li>Its desired state can request two copies.</li>
            <li>A controller keeps checking whether the requested copies exist.</li>
            <li>This repeated comparison and action is called reconciliation.</li>
        </ul>
        <ul className="Article__notes">
            <li>A Deployment manages ReplicaSets, and each ReplicaSet maintains a count of Pods.</li>
            <li>If a managed Pod disappears, a replacement can be created.</li>
            <li>A container restart within an existing Pod is different from creating a replacement Pod.</li>
            <li>Kubernetes does not move a running Pod to another node.</li>
        </ul>
        <ul className="Article__notes">
            <li>The website in these lessons uses a Deployment.</li>
            <li>A Job runs work to completion.</li>
            <li>A CronJob schedules Jobs.</li>
            <li>A DaemonSet places a Pod on selected nodes.</li>
            <li>A StatefulSet gives Pods stable identities.</li>
            <li>These are later topics.</li>
        </ul>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-kubectl">
        <h2 id="kubernetes-kubectl" className="SectionTitle">The local cluster and lesson namespace</h2>
        <LearningNoteExampleBlock example={{
            title: "A local cluster with a lesson namespace",
            description: [
                "The example requires Docker Engine or Docker Desktop, kubectl, and minikube, installed through their official instructions.",
                "Docker must be running before these commands.",
                "The machine requires at least 2 CPUs, 2 GB of free memory, 20 GB of free disk space, and internet access.",
                "Docker Desktop and the operating system require additional memory.",
                "The commands run in a terminal against a fresh local learning cluster.",
                "They are intended for a dedicated learning cluster, not a shared cluster."
            ],
            language: "text",
            code: `minikube start --driver=docker
kubectl config current-context
kubectl get nodes
kubectl create namespace lessons
kubectl get pods -n lessons`,
            explanation: [
                "minikube creates a local cluster.",
                "With the Docker driver, the node runs inside a Docker container.",
                "kubectl is the command-line client.",
                "Its context selects the cluster and credentials to use.",
                "The required context is minikube.",
                "A different context means these commands could affect another cluster and must not continue.",
                "The node must report Ready before the next chapter.",
                "The computer runs both the control plane and the node role for this exercise.",
                "A namespace groups API objects within a cluster.",
                "The lessons namespace keeps these exercises together.",
                "It is not a security boundary by itself.",
                "Every later kubectl command uses -n lessons explicitly.",
                "All four chapters use this same cluster and namespace.",
                "An existing lessons namespace requires inspection before reuse.",
                "An empty namespace reports no resources found."
            ],
            result: `minikube
NAME       STATUS   ROLES           AGE   VERSION
minikube   Ready    control-plane   1m    v1.x.y
namespace/lessons created
No resources found in lessons namespace.`,
            possibleOutput: true
        }} />
        <ul className="Article__notes">
            <li>Related documentation: <a className="Link" href="https://minikube.sigs.k8s.io/docs/start/" target="_blank" rel="noreferrer">minikube setup</a>, <a className="Link" href="https://kubernetes.io/docs/tutorials/kubernetes-basics/" target="_blank" rel="noreferrer">Kubernetes Basics tutorial</a>, <a className="Link" href="https://kubernetes.io/docs/concepts/overview/components/" target="_blank" rel="noreferrer">cluster components</a>.</li>
        </ul>
    </section>
    <section className="Article__section">
        <ul className="Article__notes">
            <li>The cluster is ready, but it has no lesson application yet.</li>
            <li>The next topic is <a className="Link" href={toHref(KUBERNETES_DEPLOY_ROUTE)}>chapter 2: Deployments, Services, and local access</a>.</li>
        </ul>
    </section>
</ArticleLayout>);
export default KubernetesCluster;
