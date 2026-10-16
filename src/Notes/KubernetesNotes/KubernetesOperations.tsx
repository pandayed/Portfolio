import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { KUBERNETES_OPERATIONS_ROUTE, KUBERNETES_NOTES_ROUTE } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';

const sections: TocEntry[] = [
    { id: "kubernetes-probes", title: "Running and ready are different states" },
    { id: "kubernetes-resources", title: "Resource requests and limits" },
    { id: "kubernetes-rollouts", title: "Scaling and template rollouts" },
    { id: "kubernetes-debugging", title: "Failure evidence from different layers" },
    { id: "kubernetes-cleanup", title: "Lesson cleanup and retained files" }
];

const KubernetesOperations = () => (<ArticleLayout title="4. Website health, updates, and troubleshooting" route={KUBERNETES_OPERATIONS_ROUTE} sections={sections} backRoute={KUBERNETES_NOTES_ROUTE} backLabel="Back to Kubernetes lessons">
    <section className="Article__section">
        <ul className="Article__notes">
            <li>Chapters 2 and 3 created the web Deployment, web Service, and web-content ConfigMap.</li>
            <li>The following examples require that state and the same lesson folder.</li>
            <li>The next changes teach Kubernetes how to check this website, then show how to inspect what happened.</li>
        </ul>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-probes">
        <h2 id="kubernetes-probes" className="SectionTitle">Running and ready are different states</h2>
        <ul className="Article__notes">
            <li>A running process can still be unable to serve a request.</li>
            <li>A probe is a check the kubelet runs against a container.</li>
            <li>Each probe type has a different consequence, so choosing the check is an application decision.</li>
        </ul>
        <div className="Article__tableWrap">
            <table className="Article__table">
                <thead>
                    <tr>
                        <th>Probe
                        </th>
                        <th>What success means
                        </th>
                        <th>What repeated failure does
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Readiness
                        </td>
                        <td>The container can receive traffic now.
                        </td>
                        <td>Marks the Pod unready so matching Services normally stop sending it traffic. Does not restart the container.
                        </td>
                    </tr>
                    <tr>
                        <td>Liveness
                        </td>
                        <td>The container is still able to make progress.
                        </td>
                        <td>Restarts the container after its configured failure threshold.
                        </td>
                    </tr>
                    <tr>
                        <td>Startup
                        </td>
                        <td>Startup has completed.
                        </td>
                        <td>Restarts the container after its configured failure threshold. Other probes wait until startup succeeds.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ul className="Article__notes">
            <li>The static website example uses a readiness check.</li>
            <li>A request to its real home page is sufficient for this exercise.</li>
            <li>Complex applications often need a dedicated endpoint.</li>
            <li>A liveness check should detect a condition that a restart can fix.</li>
            <li>A temporary failure in another service does not necessarily meet that condition.</li>
        </ul>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-resources">
        <h2 id="kubernetes-resources" className="SectionTitle">Resource requests and limits</h2>
        <ul className="Article__notes">
            <li>A CPU or memory request helps the scheduler choose a node with enough capacity.</li>
            <li>A limit constrains use while the container runs.</li>
            <li>CPU above its limit is throttled.</li>
            <li>Memory pressure beyond a memory limit can cause the container to be killed.</li>
        </ul>
        <LearningNoteExampleBlock example={{
            title: "web.yaml includes readiness and resource settings",
            description: [
                "The example requires chapter 3’s web-content and service.yaml.",
                "This version replaces the full web.yaml file.",
                "These small resource values are starting points for a local static page, not recommendations for an unrelated application."
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
          readinessProbe:
            httpGet:
              path: /
              port: http
            periodSeconds: 5
          resources:
            requests:
              cpu: 100m
              memory: 32Mi
            limits:
              cpu: 500m
              memory: 128Mi
          volumeMounts:
            - name: content
              mountPath: /usr/share/nginx/html
              readOnly: true
      volumes:
        - name: content
          configMap:
            name: web-content`,
            explanation: [
                "readinessProbe sends an HTTP request to / on the named http port every five seconds.",
                "nginx serves this path.",
                "No separate health endpoint is required.",
                "Until the readiness check succeeds, the Pod is not ready to receive normal Service traffic.",
                "Running alone is not the same as ready.",
                "100m means 0.1 CPU. 500m means half a CPU.",
                "Mi means mebibytes, a binary memory unit.",
                "A high request can leave a Pod waiting for a node.",
                "A low memory limit can terminate a container.",
                "Production settings depend on measurements of application behavior.",
                "Apply updates the existing Deployment.",
                "A template change rolls out replacement Pods.",
                "All earlier configuration mounts remain in this complete manifest."
            ],
            commands: `kubectl apply -n lessons -f web.yaml
kubectl rollout status -n lessons deployment/web --timeout=120s
kubectl get pods -n lessons -l app=web`
        }} />
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-rollouts">
        <h2 id="kubernetes-rollouts" className="SectionTitle">Scaling and template rollouts</h2>
        <ul className="Article__notes">
            <li>Scaling changes how many copies should run.</li>
            <li>A rollout changes the Pod template used by those copies.</li>
            <li>A Deployment normally performs a rolling update: it gradually creates new Pods and removes old ones.</li>
            <li>A new template creates a new ReplicaSet.</li>
        </ul>
        <LearningNoteExampleBlock example={{
            title: "A saved manifest requests three replicas",
            description: [
                "In the updated web.yaml, spec.replicas changes from 2 to 3.",
                "The Pod template stays unchanged.",
                "The saved file remains the source of truth.",
                "This prevents a later apply from silently reverting a command-line scale."
            ],
            language: "text",
            code: `kubectl apply -n lessons -f web.yaml
kubectl rollout status -n lessons deployment/web --timeout=120s
kubectl get deployment -n lessons web
kubectl get pods -n lessons -l app=web`,
            explanation: [
                "Three ready Pods are expected after the change completes, if the node has enough capacity.",
                "A replica-count change alone does not create a new Deployment template revision.",
                "kubectl scale is available for immediate changes, but it does not edit your local YAML.",
                "A later apply of a conflicting replicas value can overwrite that change.",
                "Automatic scaling through a HorizontalPodAutoscaler is a later topic.",
                "It requires appropriate metrics and should not compete with a fixed replica count in the manifest."
            ]
        }} />
        <LearningNoteExampleBlock example={{
            title: "A template change creates rollout history",
            description: [
                "In the updated web.yaml, readiness periodSeconds changes from 5 to 10.",
                "The three replicas and all other fields stay unchanged.",
                "This small template change demonstrates rollout behavior without depending on another image tag."
            ],
            language: "text",
            code: `kubectl apply -n lessons -f web.yaml
kubectl rollout status -n lessons deployment/web --timeout=120s
kubectl rollout history -n lessons deployment/web
kubectl get replicasets -n lessons -l app=web`,
            explanation: [
                "Changing the readiness interval changes the Pod template, so Kubernetes replaces the Pods.",
                "The website content remains supplied by web-content.",
                "History shows template revisions.",
                "ReplicaSet names and revision numbers depend on your earlier actions, including rollout restart.",
                "kubectl rollout undo -n lessons deployment/web restores the preceding template.",
                "rollout status reports when the rollback completes.",
                "After undo, the saved web.yaml must also have a readiness interval of 5 before the next apply.",
                "Undo changes the cluster without editing the saved manifest.",
                "Deployment rollback does not restore ConfigMap contents, database state, or external changes.",
                "Those require separate restoration when needed."
            ]
        }} />
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-debugging">
        <h2 id="kubernetes-debugging" className="SectionTitle">Failure evidence from different layers</h2>
        <ul className="Article__notes">
            <li>A symptom identifies where evidence collection begins.</li>
            <li>Evidence helps identify the cause before objects change.</li>
            <li>A failed request does not tell you whether the problem is a container, a selector, or an external access path.</li>
        </ul>
        <LearningNoteExampleBlock example={{
            title: "Deployment, Pod, log, and backend inspection",
            description: [
                "These commands inspect the application already running in lessons.",
                "They do not introduce a failure.",
                "POD_NAME must contain an actual Pod name from get pods before the commands that refer to it."
            ],
            language: "text",
            code: `kubectl get deployment,replicaset,pods -n lessons
kubectl describe deployment -n lessons web
kubectl get pods -n lessons -l app=web
# Use one actual name from the preceding output.
POD_NAME=web-xxxxxxxxxx-aaaaa
kubectl describe pod -n lessons "$POD_NAME"
kubectl logs -n lessons "$POD_NAME" --tail=50
kubectl get events -n lessons --sort-by=.metadata.creationTimestamp
kubectl get endpointslices -n lessons -l kubernetes.io/service-name=web`,
            explanation: [
                "describe deployment shows replica and rollout conditions.",
                "describe pod includes scheduling, container status, readiness, and recent events.",
                "logs reads the current container output. --previous applies only when that container restarted and a previous instance’s logs are available.",
                "nginx access logs may include your HTTP and readiness requests.",
                "Missing log lines are not proof that the networking layer works or fails.",
                "Service selectors, Pod labels, and EndpointSlice readiness help explain a Service without working backends.",
                "An API object, a ready Pod, and a successful HTTP response are different evidence.",
                "Port forwarding also bypasses normal Service routing.",
                "Troubleshooting an access path requires evidence from that path."
            ]
        }} />
        <div className="Article__tableWrap">
            <table className="Article__table">
                <thead>
                    <tr>
                        <th>Observed signal
                        </th>
                        <th>Meaning and next evidence
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Pending
                        </td>
                        <td>The Pod has not completed setup. Events can identify insufficient resources, storage binding, or scheduling constraints.
                        </td>
                    </tr>
                    <tr>
                        <td>ImagePullBackOff
                        </td>
                        <td>Pull retries are delayed. Events can identify image names, registry access, credentials, and network failures.
                        </td>
                    </tr>
                    <tr>
                        <td>CrashLoopBackOff
                        </td>
                        <td>A container repeatedly exits and restarts. Logs, previous logs, exit reasons, commands, and configuration provide further evidence.
                        </td>
                    </tr>
                    <tr>
                        <td>OOMKilled
                        </td>
                        <td>The container was terminated for memory use. The limit and workload behavior help explain the termination.
                        </td>
                    </tr>
                    <tr>
                        <td>Running but not ready
                        </td>
                        <td>The process exists, but readiness conditions have not passed. The readiness check and Pod conditions provide further evidence.
                        </td>
                    </tr>
                    <tr>
                        <td>No usable Service endpoints
                        </td>
                        <td>The selector, Pod labels, and readiness determine the selected backends.
                        </td>
                    </tr>
                    <tr>
                        <td>Local forwarding stopped
                        </td>
                        <td>The selected Pod may have been replaced. Access requires renewed forwarding to an available Pod.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ul className="Article__notes">
            <li>BackOff values shown by kubectl are useful status reasons, not all separate Pod phases.</li>
            <li>The status word alone does not establish a root cause.</li>
        </ul>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-cleanup">
        <h2 id="kubernetes-cleanup" className="SectionTitle">Lesson cleanup and retained files</h2>
        <ul className="Article__notes">
            <li>The saved lesson files allow the cluster objects to be recreated.</li>
            <li>Namespace removal is appropriate only after every object in it is no longer needed.</li>
        </ul>
        <LearningNoteExampleBlock example={{
            title: "Deletion of the dedicated lesson namespace",
            description: [
                "Any running port-forward command must be stopped with Ctrl+C before cleanup.",
                "Deletion requires the current context to still be minikube.",
                "Deleting the lessons namespace removes all objects in that namespace.",
                "This deletion is intended only for the dedicated namespace created in chapter 1."
            ],
            language: "text",
            code: `kubectl config current-context
kubectl delete namespace lessons
minikube stop`,
            explanation: [
                "Namespace deletion removes the web Deployment, Service, ConfigMap, and other objects you created there.",
                "It does not delete your local YAML files.",
                "minikube stop shuts down the local cluster while retaining its local state.",
                "minikube delete is a separate command that removes the cluster.",
                "If persistent storage is added later, cleanup requires checking its reclaim behavior and backups first.",
                "Namespace deletion is not a safe way to preserve application data."
            ]
        }} />
        <ul className="Article__notes">
            <li>Related documentation: <a className="Link" href="https://kubernetes.io/docs/concepts/workloads/pods/probes/" target="_blank" rel="noreferrer">probe behavior</a>, <a className="Link" href="https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/" target="_blank" rel="noreferrer">resource management</a>, <a className="Link" href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/" target="_blank" rel="noreferrer">rollouts</a>, <a className="Link" href="https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/" target="_blank" rel="noreferrer">debugging Pods</a>.</li>
        </ul>
    </section>
</ArticleLayout>);
export default KubernetesOperations;
