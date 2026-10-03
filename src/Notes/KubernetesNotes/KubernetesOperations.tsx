import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { KUBERNETES_NOTES_ROUTE, KUBERNETES_OPERATIONS_ROUTE } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'kubernetes-probes', title: 'Startup, readiness, and liveness probes' },
    { id: 'kubernetes-resources', title: 'Resource requests and limits' },
    { id: 'kubernetes-rollouts', title: 'Rollouts, scaling, and rollback' },
    { id: 'kubernetes-debugging', title: 'Debug from controller to container' },
    { id: 'kubernetes-common-statuses', title: 'Common failure signals' },
];

const healthAndResources = [
    'containers:',
    '  - name: orders',
    '    image: registry.example.com/orders:1.4.2',
    '    ports:',
    '      - name: http',
    '        containerPort: 8080',
    '    startupProbe:',
    '      httpGet:',
    '        path: /health/startup',
    '        port: http',
    '      periodSeconds: 5',
    '      failureThreshold: 30',
    '    readinessProbe:',
    '      httpGet:',
    '        path: /health/ready',
    '        port: http',
    '      periodSeconds: 5',
    '    livenessProbe:',
    '      httpGet:',
    '        path: /health/live',
    '        port: http',
    '      periodSeconds: 10',
    '      failureThreshold: 3',
    '    resources:',
    '      requests:',
    '        cpu: 100m',
    '        memory: 128Mi',
    '      limits:',
    '        cpu: 500m',
    '        memory: 256Mi',
].join('\n');

const rolloutCommands = [
    'kubectl set image deployment/orders orders=registry.example.com/orders:1.4.3',
    'kubectl rollout status deployment/orders',
    'kubectl rollout history deployment/orders',
    'kubectl rollout undo deployment/orders',
    'kubectl scale deployment/orders --replicas=4',
].join('\n');

const debugCommands = [
    'kubectl get deployment,replicaset,pods',
    'kubectl describe deployment orders',
    'kubectl describe pod POD_NAME',
    'kubectl logs POD_NAME --all-containers --tail=100',
    'kubectl logs POD_NAME --previous --tail=100',
    'kubectl get events --sort-by=.lastTimestamp',
    'kubectl get endpointslices -l kubernetes.io/service-name=orders',
].join('\n');

const KubernetesOperations = () => (
    <ArticleLayout
        title="Health, resources, rollouts, and debugging"
        route={KUBERNETES_OPERATIONS_ROUTE}
        sections={sections}
        backRoute={KUBERNETES_NOTES_ROUTE}
        backLabel="Back to Kubernetes notes"
    >
        <section className="Article__section">
            <p>
                A workload is not healthy because its containers merely started. Define readiness,
                recovery, and resource boundaries. Then verify controller, Pod, container, Service,
                and application state separately.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-probes">
            <h2 id="kubernetes-probes" className="SectionTitle">Startup, readiness, and liveness probes</h2>
            <CodeBlock language="text">{healthAndResources}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Probe</th><th>Question</th><th>Failed result</th></tr></thead>
                    <tbody>
                        <tr><td>Startup</td><td>Has the application finished starting?</td><td>Readiness and liveness checks remain disabled; repeated failure restarts the container.</td></tr>
                        <tr><td>Readiness</td><td>Can this Pod serve traffic now?</td><td>The Pod is removed from matching Service endpoints.</td></tr>
                        <tr><td>Liveness</td><td>Is the process stuck and unable to recover?</td><td>The kubelet restarts the container after the configured failures.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                Keep liveness checks narrow. A failed dependency normally makes the application
                unready; it does not always mean restarting the container can fix the dependency.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-resources">
            <h2 id="kubernetes-resources" className="SectionTitle">Resource requests and limits</h2>
            <p>
                A request helps the scheduler reserve capacity. A limit constrains runtime use.
                CPU use above the limit is throttled. A container that exceeds its memory limit can
                be terminated.
            </p>
            <ul className="Article__notes">
                <li><code>100m</code> CPU means one tenth of a CPU.</li>
                <li><code>128Mi</code> uses the binary memory unit mebibyte.</li>
                <li>A request that is too high can leave a Pod unscheduled.</li>
                <li>A memory limit that is too low can cause repeated <code>OOMKilled</code> restarts.</li>
                <li>Choose values from observed workload behavior instead of copying an unrelated example.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-rollouts">
            <h2 id="kubernetes-rollouts" className="SectionTitle">Rollouts, scaling, and rollback</h2>
            <CodeBlock language="text">{rolloutCommands}</CodeBlock>
            <p>
                A Deployment rollout creates a new ReplicaSet and gradually replaces old Pods.
                <code> rollout status</code> waits for the controller to report success or failure.
                Rollback restores an earlier Pod template. It does not reverse a database migration,
                data write, or external service change.
            </p>
            <p>
                If a manifest declares <code>spec.replicas</code>, applying it later overwrites a
                manual scale value. When a HorizontalPodAutoscaler owns the replica count, do not
                make the manifest compete for the same field.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-debugging">
            <h2 id="kubernetes-debugging" className="SectionTitle">Debug from controller to container</h2>
            <CodeBlock language="text">{debugCommands}</CodeBlock>
            <ol className="Article__steps">
                <li>Check whether the controller has the desired replica count and a progressing rollout.</li>
                <li>Check Pod phase, readiness, restart count, and node placement.</li>
                <li>Describe the failing object and read recent events.</li>
                <li>Read current logs. Use <code>--previous</code> for a container that restarted.</li>
                <li>Trace Deployment labels to the Service selector and EndpointSlices.</li>
                <li>Check configuration, identity, storage, resources, and network rules where the evidence points.</li>
            </ol>
            <p>
                A successful <code>kubectl apply</code> proves only that the API accepted the
                object. A successful rollout proves that the Deployment met its rollout conditions.
                Neither result proves that a user-facing request works through every external layer.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-common-statuses">
            <h2 id="kubernetes-common-statuses" className="SectionTitle">Common failure signals</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Signal</th><th>Start by checking</th></tr></thead>
                    <tbody>
                        <tr><td><code>Pending</code></td><td>Scheduling events, resource requests, storage claims, node selectors, taints, and quotas.</td></tr>
                        <tr><td><code>ImagePullBackOff</code></td><td>Image reference, registry reachability, image pull credentials, and event details.</td></tr>
                        <tr><td><code>CrashLoopBackOff</code></td><td>Current and previous logs, exit code, command, configuration, and probes.</td></tr>
                        <tr><td><code>OOMKilled</code></td><td>Memory use, memory limit, leak behavior, and workload size.</td></tr>
                        <tr><td>Ready is false</td><td>Readiness probe response, application dependencies, and Pod conditions.</td></tr>
                        <tr><td>Service has no endpoints</td><td>Service selector, Pod labels, and Pod readiness.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                References: <a className="Link" href="https://kubernetes.io/docs/concepts/workloads/pods/probes/" target="_blank" rel="noreferrer">Probes</a>,{' '}
                <a className="Link" href="https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/" target="_blank" rel="noreferrer">Resource management</a>, and{' '}
                <a className="Link" href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/" target="_blank" rel="noreferrer">Deployments</a> in the official Kubernetes documentation.
            </p>
        </section>
    </ArticleLayout>
);

export default KubernetesOperations;
