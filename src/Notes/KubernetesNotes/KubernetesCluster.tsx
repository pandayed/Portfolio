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
    <p className="KubernetesSystemDiagram__note">
        A real cluster can have many worker nodes and several control plane machines. A small
        learning cluster may place both roles on one machine. Each worker node still has its
        own operating system, kernel, runtime, and resources.
    </p>
</figure>);
const sections: TocEntry[] = [
    { id: "kubernetes-cluster", title: "Start with the work Kubernetes does" },
    { id: "kubernetes-pod", title: "The unit Kubernetes starts is a Pod" },
    { id: "kubernetes-running-system", title: "Follow the request from your terminal to a node" },
    { id: "kubernetes-controllers", title: "Describe the state you want to keep" },
    { id: "kubernetes-kubectl", title: "Prepare the cluster before creating an application" }
];



const KubernetesCluster = () => (<ArticleLayout title="1. From containers to a Kubernetes cluster" route={KUBERNETES_CLUSTER_ROUTE} sections={sections} backRoute={KUBERNETES_NOTES_ROUTE} backLabel="Back to Kubernetes lessons">
    <section className="Article__section">
        <p>You can already run a container from an image. Kubernetes adds a way to describe how that application should keep running across machines. Start here after the <a className="Link" href={toHref(DOCKER_NOTES_ROUTE)}>Docker lessons</a>. The image and container concepts carry over.
        </p>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-cluster">
        <h2 id="kubernetes-cluster" className="SectionTitle">Start with the work Kubernetes does</h2>
        <p>
            Suppose a website needs two running copies. Starting two containers solves the immediate
            task. Keeping two copies available after failures, replacing them during updates, and
            finding their current network addresses are further tasks. Kubernetes stores the
            requested state and repeatedly works toward it.
        </p>
        <p>
            A cluster is a group of machines managed together. Each machine is a node. The control
            plane manages cluster state. Nodes run application containers. A local learning cluster
            can put both roles on one machine.
        </p>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-pod">
        <h2 id="kubernetes-pod" className="SectionTitle">The unit Kubernetes starts is a Pod</h2>
        <p>
            A Pod is a group of one or more containers scheduled together on one node. Begin with
            one application container per Pod. Two copies of an application normally mean two Pods,
            rather than two application containers inside one Pod.
        </p>
        <ul className="Article__notes">
            <li>Containers in one Pod share its network address and port space. They can reach each other through localhost. They share files only through volumes mounted into both containers.
            </li>
            <li>Different Pods normally have different IP addresses. A replacement Pod can receive a new name, address, and node.
            </li>
            <li>On a Linux node, container isolation still uses the node kernel. A Pod does not give each container a separate operating system.
            </li>
            <li>A sidecar is a helper container that belongs with an application container. The diagram includes sidecars to show sharing; the exercises use one container per Pod.
            </li>
        </ul>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-running-system">
        <h2 id="kubernetes-running-system" className="SectionTitle">Follow the request from your terminal to a node</h2>
        <p>
            You send a request through kubectl. The API server accepts it and stores the object. A
            controller notices work to do. The scheduler assigns a new Pod to a suitable node. The
            node starts its containers.
        </p>
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
                        <td>Compare requested and observed state and act on differences.
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
        <p>
            The diagram’s Linux namespaces isolate operating-system views. A Kubernetes namespace,
            introduced below, groups API objects. They are different concepts.
        </p>
        <p>
            Normal application traffic travels through the application network. It does not go
            through the scheduler or controller manager. The control plane manages the application;
            it does not serve the application’s web pages.
        </p>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-controllers">
        <h2 id="kubernetes-controllers" className="SectionTitle">Describe the state you want to keep</h2>
        <p>
            A Kubernetes object is a stored record with a type, a name, and configuration. A
            Deployment is an object for managing replaceable application Pods. Its desired state can
            request two copies. A controller keeps checking whether the requested copies exist. This
            repeated comparison and action is called reconciliation.
        </p>
        <p>
            A Deployment manages ReplicaSets, and each ReplicaSet maintains a count of Pods. If a
            managed Pod disappears, a replacement can be created. A container restart within an
            existing Pod is different from creating a replacement Pod. Kubernetes does not move a
            running Pod to another node.
        </p>
        <p>
            Use a Deployment for the website in these lessons. Other workload types solve other
            needs: a Job runs work to completion, a CronJob schedules Jobs, a DaemonSet places a Pod
            on selected nodes, and a StatefulSet gives Pods stable identities. These are later
            topics.
        </p>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-kubectl">
        <h2 id="kubernetes-kubectl" className="SectionTitle">Prepare the cluster before creating an application</h2>
        <LearningNoteExampleBlock example={{
            title: "Start a local cluster and create a lesson namespace",
            description: [
                "Install Docker Engine or Docker Desktop, kubectl, and minikube using their official installation instructions. Start Docker before running these commands.",
                "Use a machine with at least 2 CPUs, 2 GB of free memory, 20 GB of free disk space, and internet access. Allow additional memory for Docker Desktop and your operating system.",
                "Run these commands in a terminal. Use a fresh local learning cluster rather than a shared cluster."
            ],
            language: "text",
            code: `minikube start --driver=docker
kubectl config current-context
kubectl get nodes
kubectl create namespace lessons
kubectl get pods -n lessons`,
            explanation: [
                "minikube creates a local cluster. With the Docker driver, the node runs inside a Docker container.",
                "kubectl is the command-line client. Its context selects the cluster and credentials to use. The current context should be minikube. Stop if it points elsewhere.",
                "Wait until the node reports Ready. Your computer now runs both the control plane and the node role for this exercise.",
                "A namespace groups API objects within a cluster. The lessons namespace keeps these exercises together. It is not a security boundary by itself.",
                "Every later kubectl command uses -n lessons explicitly. Keep this cluster and namespace for all four chapters.",
                "If the namespace already exists from an earlier attempt, inspect it before reusing it. The empty namespace should report no resources found."
            ],
            result: `minikube
NAME       STATUS   ROLES           AGE   VERSION
minikube   Ready    control-plane   1m    v1.x.y
namespace/lessons created
No resources found in lessons namespace.`,
            possibleOutput: true
        }} />
        <p>Read alongside: <a className="Link" href="https://minikube.sigs.k8s.io/docs/start/" target="_blank" rel="noreferrer">minikube setup</a>, <a className="Link" href="https://kubernetes.io/docs/tutorials/kubernetes-basics/" target="_blank" rel="noreferrer">Kubernetes Basics tutorial</a>, <a className="Link" href="https://kubernetes.io/docs/concepts/overview/components/" target="_blank" rel="noreferrer">cluster components</a>.
        </p>
    </section>
    <section className="Article__section">
        <p>The cluster is ready, but it has no lesson application yet. Continue with <a className="Link" href={toHref(KUBERNETES_DEPLOY_ROUTE)}>chapter 2: deploy a website and reach it</a>.
        </p>
    </section>
</ArticleLayout>);
export default KubernetesCluster;
