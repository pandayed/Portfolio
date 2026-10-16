import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { KUBERNETES_DEPLOY_ROUTE, KUBERNETES_CONFIG_ROUTE, KUBERNETES_NOTES_ROUTE, toHref } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';

const sections: TocEntry[] = [
    { id: "kubernetes-deployment", title: "A manifest describes a Deployment" },
    { id: "kubernetes-labels", title: "Labels connect the objects" },
    { id: "kubernetes-service", title: "A Service gives replaceable Pods a stable address" },
    { id: "kubernetes-apply", title: "Local access through port forwarding" },
    { id: "kubernetes-service-types", title: "Access methods have different scopes" }
];

const KubernetesDeploymentsServices = () => (<ArticleLayout title="2. Deployments, Services, and local access" route={KUBERNETES_DEPLOY_ROUTE} sections={sections} backRoute={KUBERNETES_NOTES_ROUTE} backLabel="Back to Kubernetes lessons">
    <section className="Article__section">
        <ul className="Article__notes">
            <li>Chapter 1 created a cluster and the lessons namespace.</li>
            <li>The next example runs a small website using the public nginx image.</li>
            <li>Later chapters reuse these files and change this same application.</li>
        </ul>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-deployment">
        <h2 id="kubernetes-deployment" className="SectionTitle">A manifest describes a Deployment</h2>
        <ul className="Article__notes">
            <li>A manifest is a file describing Kubernetes objects.</li>
            <li>YAML uses indentation to show which fields belong together.</li>
            <li>YAML indentation requires spaces rather than tabs.</li>
            <li>The API version and kind identify the object type.</li>
            <li>metadata names the object.</li>
            <li>spec describes the requested behavior.</li>
        </ul>
        <LearningNoteExampleBlock example={{
            title: "web.yaml defines two nginx Pods",
            description: [
                "The example requires the cluster and namespace from chapter 1.",
                "Its lesson files share one local folder.",
                "The YAML belongs in web.yaml in that folder.",
                "The commands run from the same folder after the file is saved."
            ],
            language: "text",
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      automountServiceAccountToken: false
      containers:
        - name: web
          image: nginx:stable-alpine
          ports:
            - name: http
              containerPort: 80
`,
            explanation: [
                "apply -f sends the file to the API server.",
                "It creates a missing object or updates an existing one. -n lessons places it in the lesson namespace.",
                "replicas: 2 requests two Pods.",
                "The template defines the container to run in each one.",
                "nginx:stable-alpine is a public image tag suitable for this local exercise.",
                "A tag can change over time.",
                "Production releases should use reviewed image versions or digests.",
                "The container is named web so later commands can address it.",
                "containerPort documents port 80.",
                "It does not publish that port on the local computer.",
                "automountServiceAccountToken: false avoids mounting Kubernetes API credentials that this static website does not need.",
                "rollout status waits for the Deployment’s rollout conditions.",
                "get pods shows observed readiness.",
                "Generated Pod names, image versions, ages, and timings vary."
            ],
            commands: `kubectl apply -n lessons -f web.yaml
kubectl rollout status -n lessons deployment/web --timeout=120s
kubectl get pods -n lessons -l app=web`,
            result: `deployment.apps/web created
deployment "web" successfully rolled out
NAME                   READY   STATUS    RESTARTS   AGE
web-xxxxxxxxxx-aaaaa   1/1     Running   0          20s
web-xxxxxxxxxx-bbbbb   1/1     Running   0          20s`,
            possibleOutput: true
        }} />
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-labels">
        <h2 id="kubernetes-labels" className="SectionTitle">Labels connect the objects</h2>
        <ul className="Article__notes">
            <li>A label is a key and value attached to an object.</li>
            <li>A selector is a rule that matches labels.</li>
            <li>Names identify individual objects.</li>
            <li>Labels let Kubernetes select a group.</li>
        </ul>
        <div className="Article__tableWrap">
            <table className="Article__table">
                <thead>
                    <tr>
                        <th>Field
                        </th>
                        <th>Meaning
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Deployment selector: app: web
                        </td>
                        <td>This Deployment manages Pods with this label.
                        </td>
                    </tr>
                    <tr>
                        <td>Pod template label: app: web
                        </td>
                        <td>Every Pod created from the template receives this label.
                        </td>
                    </tr>
                    <tr>
                        <td>Service selector: app: web
                        </td>
                        <td>The Service sends traffic to matching ready Pods.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ul className="Article__notes">
            <li>The Deployment selector must match its Pod template labels.</li>
            <li>The selector is part of the object’s identity.</li>
            <li>Changing a Deployment selector requires recreating the Deployment.</li>
            <li>The Service added next uses the same label.</li>
        </ul>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-service">
        <h2 id="kubernetes-service" className="SectionTitle">A Service gives replaceable Pods a stable address</h2>
        <ul className="Article__notes">
            <li>A Service provides a stable name and virtual address for a changing group of Pods.</li>
            <li>Applications inside the same namespace can use the Service name.</li>
            <li>The Service keeps the address stable while Pods are replaced.</li>
        </ul>
        <LearningNoteExampleBlock example={{
            title: "service.yaml connects a Service to the web Pods",
            description: [
                "The example requires the running Deployment.",
                "This separate manifest belongs in service.yaml."
            ],
            language: "text",
            code: `apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: http`,
            explanation: [
                "The default type is ClusterIP.",
                "It gives cluster-internal access.",
                "It does not make the website public.",
                "port: 80 is the port clients use on the Service.",
                "targetPort: http refers to the named container port in web.yaml.",
                "EndpointSlices record the backends selected for the Service.",
                "The output includes addresses for ready web Pods.",
                "Their IP addresses vary.",
                "A Service with a selector that matches no ready Pods cannot deliver ordinary requests to this application."
            ],
            commands: `kubectl apply -n lessons -f service.yaml
kubectl get service -n lessons web
kubectl get endpointslices -n lessons -l kubernetes.io/service-name=web`
        }} />
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-apply">
        <h2 id="kubernetes-apply" className="SectionTitle">Local access through port forwarding</h2>
        <LearningNoteExampleBlock example={{
            title: "A local port forwards requests to the website",
            description: [
                "Local port 8080 must be free.",
                "The first command runs continuously in terminal A.",
                "The curl command runs in terminal B.",
                "A browser request to http://127.0.0.1:8080 is an alternative."
            ],
            language: "text",
            code: `# Terminal A
kubectl port-forward -n lessons service/web 8080:80
# Terminal B
curl http://127.0.0.1:8080`,
            explanation: [
                "Port forwarding gives your computer temporary access.",
                "It binds to local loopback by default.",
                "Ctrl+C stops it.",
                "The expected response is the nginx welcome page HTML.",
                "This request verifies that one selected Pod serves a page through the forwarding path.",
                "Forwarding a Service selects a backing Pod.",
                "It does not exercise the normal ClusterIP routing or prove load balancing across both Pods.",
                "If that Pod is replaced in a later exercise, forwarding can stop.",
                "Access then requires a new forwarding command after the rollout.",
                "A successful apply means the API accepted the object.",
                "It is the HTTP response that demonstrates this request worked."
            ],
            result: `<!DOCTYPE html>
<html>
...
<h1>Welcome to nginx!</h1>
...
</html>`,
            possibleOutput: true
        }} />
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-service-types">
        <h2 id="kubernetes-service-types" className="SectionTitle">Access methods have different scopes</h2>
        <div className="Article__tableWrap">
            <table className="Article__table">
                <thead>
                    <tr>
                        <th>Method
                        </th>
                        <th>Purpose
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ClusterIP Service
                        </td>
                        <td>Stable access within the cluster. Used in this lesson.
                        </td>
                    </tr>
                    <tr>
                        <td>Port forwarding
                        </td>
                        <td>Temporary local development and inspection. Used to reach the example.
                        </td>
                    </tr>
                    <tr>
                        <td>NodePort Service
                        </td>
                        <td>Exposes a port on node addresses. Reachability depends on node networking and firewall rules.
                        </td>
                    </tr>
                    <tr>
                        <td>LoadBalancer Service
                        </td>
                        <td>Requests a load balancer from supported infrastructure. A local cluster needs additional support.
                        </td>
                    </tr>
                    <tr>
                        <td>Ingress or Gateway
                        </td>
                        <td>Routes HTTP requests to Services. Requires an installed controller or implementation.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ul className="Article__notes">
            <li>Related documentation: <a className="Link" href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/" target="_blank" rel="noreferrer">Deployments</a>, <a className="Link" href="https://kubernetes.io/docs/concepts/services-networking/service/" target="_blank" rel="noreferrer">Services</a>.</li>
        </ul>
    </section>
    <section className="Article__section">
        <ul className="Article__notes">
            <li>The website now runs and responds, but its page still comes from the image.</li>
            <li>The next topic is <a className="Link" href={toHref(KUBERNETES_CONFIG_ROUTE)}>chapter 3: configuration and storage lifetimes</a>.</li>
        </ul>
    </section>
</ArticleLayout>);
export default KubernetesDeploymentsServices;
