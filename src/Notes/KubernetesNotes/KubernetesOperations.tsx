import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { KUBERNETES_OPERATIONS_ROUTE, KUBERNETES_NOTES_ROUTE } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';

const sections: TocEntry[] = [
    { id: "kubernetes-probes", title: "Separate running from ready" },
    { id: "kubernetes-resources", title: "Set an initial resource budget and apply the change" },
    { id: "kubernetes-rollouts", title: "Scale the workload, then roll out a template change" },
    { id: "kubernetes-debugging", title: "Inspect the layer that can explain the failure" },
    { id: "kubernetes-cleanup", title: "Finish the local exercise deliberately" }
];

const KubernetesOperations = () => (<ArticleLayout title="4. Operate and troubleshoot the same website" route={KUBERNETES_OPERATIONS_ROUTE} sections={sections} backRoute={KUBERNETES_NOTES_ROUTE} backLabel="Back to Kubernetes lessons">
    <section className="Article__section">
        <p>
            Chapters 2 and 3 created the web Deployment, web Service, and web-content ConfigMap.
            Continue with that state and the same lesson folder. The next changes teach Kubernetes
            how to check this website, then show how to inspect what happened.
        </p>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-probes">
        <h2 id="kubernetes-probes" className="SectionTitle">Separate running from ready</h2>
        <p>
            A running process can still be unable to serve a request. A probe is a check the kubelet
            runs against a container. Each probe type has a different consequence, so choosing the
            check is an application decision.
        </p>
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
        <p>
            Begin with readiness for the static website. A request to its real home page is
            sufficient for this exercise. Complex applications often need a dedicated endpoint. A
            liveness check should detect a condition that a restart can fix; a temporary failure in
            another service does not necessarily meet that condition.
        </p>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-resources">
        <h2 id="kubernetes-resources" className="SectionTitle">Set an initial resource budget and apply the change</h2>
        <p>
            A CPU or memory request helps the scheduler choose a node with enough capacity. A limit
            constrains use while the container runs. CPU above its limit is throttled. Memory
            pressure beyond a memory limit can cause the container to be killed.
        </p>
        <LearningNoteExampleBlock example={{
            title: "Replace web.yaml with readiness and resource settings",
            description: [
                "Complete chapter 3 first. Keep web-content and service.yaml. Replace the full web.yaml file with this version.",
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
                "readinessProbe sends an HTTP request to / on the named http port every five seconds. nginx really serves this path; no invented health endpoint is required.",
                "Until the readiness check succeeds, the Pod is not ready to receive normal Service traffic. Running alone is not the same as ready.",
                "100m means 0.1 CPU. 500m means half a CPU. Mi means mebibytes, a binary memory unit.",
                "A high request can leave a Pod waiting for a node. A low memory limit can terminate a container. Measure application behavior before choosing production settings.",
                "Apply updates the existing Deployment. A template change rolls out replacement Pods. All earlier configuration mounts remain in this complete manifest."
            ],
            commands: `kubectl apply -n lessons -f web.yaml
kubectl rollout status -n lessons deployment/web --timeout=120s
kubectl get pods -n lessons -l app=web`
        }} />
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-rollouts">
        <h2 id="kubernetes-rollouts" className="SectionTitle">Scale the workload, then roll out a template change</h2>
        <p>
            Scaling changes how many copies should run. A rollout changes the Pod template used by
            those copies. A Deployment normally performs a rolling update: it gradually creates new
            Pods and removes old ones. A new template creates a new ReplicaSet.
        </p>
        <LearningNoteExampleBlock example={{
            title: "Increase the replica count through the saved manifest",
            description: [
                "Edit spec.replicas in web.yaml from 2 to 3. Leave the Pod template unchanged.",
                "Use the same file as the source of truth so a later apply does not silently revert a command-line scale."
            ],
            language: "text",
            code: `kubectl apply -n lessons -f web.yaml
kubectl rollout status -n lessons deployment/web --timeout=120s
kubectl get deployment -n lessons web
kubectl get pods -n lessons -l app=web`,
            explanation: [
                "Expect three ready Pods after the change completes, if the node has enough capacity. A replica-count change alone does not create a new Deployment template revision.",
                "kubectl scale is available for immediate changes, but it does not edit your local YAML. A later apply of a conflicting replicas value can overwrite that change.",
                "Automatic scaling through a HorizontalPodAutoscaler is a later topic. It requires appropriate metrics and should not compete with a fixed replica count in the manifest."
            ]
        }} />
        <LearningNoteExampleBlock example={{
            title: "Make a template change and inspect rollout history",
            description: [
                "In web.yaml, change the readiness periodSeconds from 5 to 10. Keep the three replicas and all other fields.",
                "This small template change demonstrates rollout behavior without depending on another image tag."
            ],
            language: "text",
            code: `kubectl apply -n lessons -f web.yaml
kubectl rollout status -n lessons deployment/web --timeout=120s
kubectl rollout history -n lessons deployment/web
kubectl get replicasets -n lessons -l app=web`,
            explanation: [
                "Changing the readiness interval changes the Pod template, so Kubernetes replaces the Pods. The website content remains supplied by web-content.",
                "History shows template revisions. ReplicaSet names and revision numbers depend on your earlier actions, including rollout restart.",
                "To restore the preceding template, kubectl rollout undo -n lessons deployment/web is available. Then wait for rollout status.",
                "If you use undo, also change the readiness interval in web.yaml back to 5 before the next apply. Undo changes the cluster, not your saved manifest.",
                "Deployment rollback does not restore ConfigMap contents, database state, or external changes. Restore those separately when needed."
            ]
        }} />
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-debugging">
        <h2 id="kubernetes-debugging" className="SectionTitle">Inspect the layer that can explain the failure</h2>
        <p>
            Start with the symptom and collect evidence before changing objects. A failed request
            does not tell you whether the problem is a container, a selector, or an external access
            path.
        </p>
        <LearningNoteExampleBlock example={{
            title: "Inspect the Deployment, Pods, logs, and selected backends",
            description: [
                "These commands inspect the application already running in lessons. They do not introduce a failure.",
                "When a command needs one particular Pod, copy its actual name from get pods into the shell variable shown below."
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
                "describe deployment shows replica and rollout conditions. describe pod includes scheduling, container status, readiness, and recent events.",
                "logs reads the current container output. Add --previous only when that container restarted and a previous instance’s logs are available.",
                "nginx access logs may include your HTTP and readiness requests. Missing log lines are not proof that the networking layer works or fails.",
                "Compare Service selectors, Pod labels, and EndpointSlice readiness when the Service has no working backends.",
                "An API object, a ready Pod, and a successful HTTP response are different evidence. Port forwarding also bypasses normal Service routing. Validate the actual access path when troubleshooting that path."
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
                        <td>The Pod has not completed setup. Read events for insufficient resources, storage binding, or scheduling constraints.
                        </td>
                    </tr>
                    <tr>
                        <td>ImagePullBackOff
                        </td>
                        <td>Pull retries are delayed. Read events for the image name, registry access, credentials, and network failures.
                        </td>
                    </tr>
                    <tr>
                        <td>CrashLoopBackOff
                        </td>
                        <td>A container repeatedly exits and restarts. Read logs, previous logs, exit reason, command, and configuration.
                        </td>
                    </tr>
                    <tr>
                        <td>OOMKilled
                        </td>
                        <td>The container was terminated for memory use. Compare the limit with workload behavior.
                        </td>
                    </tr>
                    <tr>
                        <td>Running but not ready
                        </td>
                        <td>The process exists, but readiness conditions have not passed. Inspect the readiness check and Pod conditions.
                        </td>
                    </tr>
                    <tr>
                        <td>No usable Service endpoints
                        </td>
                        <td>Compare the selector with Pod labels and readiness.
                        </td>
                    </tr>
                    <tr>
                        <td>Local forwarding stopped
                        </td>
                        <td>The selected Pod may have been replaced. Start forwarding again and inspect the new Pod.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>
            BackOff values shown by kubectl are useful status reasons, not all separate Pod phases.
            Do not diagnose a root cause from the status word alone.
        </p>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-cleanup">
        <h2 id="kubernetes-cleanup" className="SectionTitle">Finish the local exercise deliberately</h2>
        <p>
            Keep the lesson files so the cluster objects can be recreated. Remove the namespace only
            when you have finished using every object in it.
        </p>
        <LearningNoteExampleBlock example={{
            title: "Delete only this lesson’s objects",
            description: [
                "Stop any running port-forward command with Ctrl+C. Confirm the context is still minikube before deletion.",
                "Deleting the lessons namespace removes all objects in that namespace. Use it only for the dedicated namespace created in chapter 1."
            ],
            language: "text",
            code: `kubectl config current-context
kubectl delete namespace lessons
minikube stop`,
            explanation: [
                "Namespace deletion removes the web Deployment, Service, ConfigMap, and other objects you created there. It does not delete your local YAML files.",
                "minikube stop shuts down the local cluster while retaining its local state. minikube delete is a separate command that removes the cluster.",
                "If you later add persistent storage, check its reclaim behavior and backups before cleanup. Namespace deletion is not a safe way to preserve application data."
            ]
        }} />
        <p>Read alongside: <a className="Link" href="https://kubernetes.io/docs/concepts/workloads/pods/probes/" target="_blank" rel="noreferrer">probe behavior</a>, <a className="Link" href="https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/" target="_blank" rel="noreferrer">resource management</a>, <a className="Link" href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/" target="_blank" rel="noreferrer">rollouts</a>, <a className="Link" href="https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/" target="_blank" rel="noreferrer">debugging Pods</a>.
        </p>
    </section>
</ArticleLayout>);
export default KubernetesOperations;
