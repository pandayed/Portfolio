import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { KUBERNETES_DEPLOY_ROUTE, KUBERNETES_CONFIG_ROUTE, KUBERNETES_NOTES_ROUTE, toHref } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';

const sections: TocEntry[] = [
    { id: "kubernetes-deployment", title: "Give Kubernetes a Deployment manifest" },
    { id: "kubernetes-labels", title: "Labels connect the objects" },
    { id: "kubernetes-service", title: "Give replaceable Pods a stable Service" },
    { id: "kubernetes-apply", title: "Make one request from your computer" },
    { id: "kubernetes-service-types", title: "Know where this access method ends" }
];

const KubernetesDeploymentsServices = () => (<ArticleLayout title="2. Deploy a website and reach it" route={KUBERNETES_DEPLOY_ROUTE} sections={sections} backRoute={KUBERNETES_NOTES_ROUTE} backLabel="Back to Kubernetes lessons">
    <section className="Article__section">
        <p>
            Chapter 1 created a cluster and the lessons namespace. Now run a small website using the
            public nginx image. Keep the files from this chapter. Later chapters change this same
            application.
        </p>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-deployment">
        <h2 id="kubernetes-deployment" className="SectionTitle">Give Kubernetes a Deployment manifest</h2>
        <p>
            A manifest is a file describing Kubernetes objects. YAML uses indentation to show which
            fields belong together. Use spaces rather than tabs. The API version and kind identify
            the object type; metadata names it; spec describes the requested behavior.
        </p>
        <LearningNoteExampleBlock example={{
            title: "Save web.yaml and start two nginx Pods",
            description: [
                "Complete chapter 1 first. Create a local folder for these lesson files.",
                "Save the YAML below as web.yaml in that folder, then run the commands there."
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
                "apply -f sends the file to the API server. It creates a missing object or updates an existing one. -n lessons places it in the lesson namespace.",
                "replicas: 2 requests two Pods. The template defines the container to run in each one.",
                "nginx:stable-alpine is a public image tag suitable for this local exercise. A tag can change over time. Production releases should use reviewed image versions or digests.",
                "The container is named web so later commands can address it. containerPort documents port 80; it does not publish that port on your laptop.",
                "automountServiceAccountToken: false avoids mounting Kubernetes API credentials that this static website does not need.",
                "rollout status waits for the Deployment’s rollout conditions. get pods shows observed readiness. Generated Pod names, image versions, ages, and timings vary."
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
        <p>
            A label is a key and value attached to an object. A selector is a rule that matches
            labels. Names identify individual objects; labels let Kubernetes select a group.
        </p>
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
        <p>
            The Deployment selector must match its Pod template labels. Treat the selector as part
            of the object’s identity; changing a Deployment selector requires recreating the
            Deployment. The Service added next uses the same label.
        </p>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-service">
        <h2 id="kubernetes-service" className="SectionTitle">Give replaceable Pods a stable Service</h2>
        <p>
            A Service provides a stable name and virtual address for a changing group of Pods.
            Applications inside the same namespace can use the Service name. The Service keeps the
            address stable while Pods are replaced.
        </p>
        <LearningNoteExampleBlock example={{
            title: "Save service.yaml and connect it to the web Pods",
            description: [
                "Keep the Deployment running. Save this separate file as service.yaml."
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
                "The default type is ClusterIP. It gives cluster-internal access; it does not make the website public.",
                "port: 80 is the port clients use on the Service. targetPort: http refers to the named container port in web.yaml.",
                "EndpointSlices record the backends selected for the Service. Expect addresses for the ready web Pods; their IP addresses vary.",
                "A Service with a selector that matches no ready Pods cannot deliver ordinary requests to this application."
            ],
            commands: `kubectl apply -n lessons -f service.yaml
kubectl get service -n lessons web
kubectl get endpointslices -n lessons -l kubernetes.io/service-name=web`
        }} />
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-apply">
        <h2 id="kubernetes-apply" className="SectionTitle">Make one request from your computer</h2>
        <LearningNoteExampleBlock example={{
            title: "Temporarily forward a local port to the website",
            description: [
                "Use a free local port 8080. Run the first command in terminal A and keep it running.",
                "Run curl in terminal B, or open http://127.0.0.1:8080 in a browser."
            ],
            language: "text",
            code: `# Terminal A
kubectl port-forward -n lessons service/web 8080:80
# Terminal B
curl http://127.0.0.1:8080`,
            explanation: [
                "Port forwarding gives your computer temporary access. It binds to local loopback by default. Stop it with Ctrl+C.",
                "Expect the nginx welcome page HTML. This request verifies that one selected Pod serves a page through the forwarding path.",
                "Forwarding a Service selects a backing Pod. It does not exercise the normal ClusterIP routing or prove load balancing across both Pods.",
                "If that Pod is replaced in a later exercise, forwarding can stop. Start the command again after the rollout.",
                "A successful apply means the API accepted the object. It is the HTTP response that demonstrates this request worked."
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
        <h2 id="kubernetes-service-types" className="SectionTitle">Know where this access method ends</h2>
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
        <p>Read alongside: <a className="Link" href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/" target="_blank" rel="noreferrer">Deployments</a>, <a className="Link" href="https://kubernetes.io/docs/concepts/services-networking/service/" target="_blank" rel="noreferrer">Services</a>.
        </p>
    </section>
    <section className="Article__section">
        <p>The website now runs and responds, but its page still comes from the image. Continue with <a className="Link" href={toHref(KUBERNETES_CONFIG_ROUTE)}>chapter 3: supply a page without rebuilding the image</a>.
        </p>
    </section>
</ArticleLayout>);
export default KubernetesDeploymentsServices;
