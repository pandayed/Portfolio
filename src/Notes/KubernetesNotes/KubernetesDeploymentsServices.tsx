import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { KUBERNETES_DEPLOY_ROUTE, KUBERNETES_NOTES_ROUTE } from '../../routing/routes';
import NoteArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'kubernetes-deployment', title: 'Deployment manifest' },
    { id: 'kubernetes-labels', title: 'Labels and selectors' },
    { id: 'kubernetes-service', title: 'Stable access through a Service' },
    { id: 'kubernetes-apply', title: 'Apply and verify' },
    { id: 'kubernetes-service-types', title: 'Service exposure choices' },
];

const applicationManifest = [
    'apiVersion: apps/v1',
    'kind: Deployment',
    'metadata:',
    '  name: web',
    'spec:',
    '  replicas: 2',
    '  selector:',
    '    matchLabels:',
    '      app: web',
    '  template:',
    '    metadata:',
    '      labels:',
    '        app: web',
    '    spec:',
    '      containers:',
    '        - name: web',
    '          image: nginx:1.27-alpine',
    '          ports:',
    '            - name: http',
    '              containerPort: 80',
    '---',
    'apiVersion: v1',
    'kind: Service',
    'metadata:',
    '  name: web',
    'spec:',
    '  selector:',
    '    app: web',
    '  ports:',
    '    - name: http',
    '      port: 80',
    '      targetPort: http',
].join('\n');

const applyCommands = [
    'kubectl apply -f web.yaml',
    'kubectl rollout status deployment/web',
    'kubectl get pods -l app=web',
    'kubectl get service web',
    'kubectl get endpointslices -l kubernetes.io/service-name=web',
    'kubectl port-forward service/web 8080:80',
    '',
    '# In another terminal:',
    'curl http://127.0.0.1:8080',
].join('\n');

const KubernetesDeploymentsServices = () => (
    <NoteArticleLayout
        title="Deployments and Services"
        route={KUBERNETES_DEPLOY_ROUTE}
        sections={sections}
        backRoute={KUBERNETES_NOTES_ROUTE}
        backLabel="Back to Kubernetes notes"
    >
        <section className="Article__section">
            <p>
                A Deployment manages interchangeable application Pods. A Service selects those Pods
                and provides a stable network endpoint while the Pods are created and replaced.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-deployment">
            <h2 id="kubernetes-deployment" className="SectionTitle">Deployment manifest</h2>
            <CodeBlock language="text">{applicationManifest}</CodeBlock>
            <p>
                Every object declares an <code>apiVersion</code>, <code>kind</code>,
                <code> metadata</code>, and object-specific <code>spec</code>. The Deployment Pod
                template has the Pod specification nested under <code>spec.template</code>.
            </p>
            <p>
                The Deployment requests two Pods. The controller creates a ReplicaSet, and the
                ReplicaSet creates Pods from the template. If one Pod disappears, the controller
                creates another to restore the replica count.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-labels">
            <h2 id="kubernetes-labels" className="SectionTitle">Labels and selectors</h2>
            <p>
                Labels attach identity to objects. Selectors find objects with matching labels. The
                Deployment selector must match the Pod template labels. The Service selector must
                match the Pods that should receive traffic.
            </p>
            <ul className="Article__notes">
                <li><code>spec.selector.matchLabels.app</code> is <code>web</code>.</li>
                <li><code>spec.template.metadata.labels.app</code> is also <code>web</code>.</li>
                <li>The Service selects <code>app: web</code>.</li>
                <li>A selector mismatch can produce running Pods with no Service endpoints.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-service">
            <h2 id="kubernetes-service" className="SectionTitle">Stable access through a Service</h2>
            <p>
                Pod IP addresses change as Pods are replaced. A Service provides a stable name and
                virtual address for a logical group of Pods. The Service directs traffic only to
                matching ready endpoints.
            </p>
            <p>
                <code>port: 80</code> is the Service port. <code>targetPort: http</code> refers to
                the named container port. A named target avoids repeating the numeric container port
                in the Service.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-apply">
            <h2 id="kubernetes-apply" className="SectionTitle">Apply and verify</h2>
            <CodeBlock language="text">{applyCommands}</CodeBlock>
            <ol className="Article__steps">
                <li>Apply the desired state.</li>
                <li>Wait for the Deployment rollout.</li>
                <li>Check that the requested Pods exist and are ready.</li>
                <li>Check the Service and its EndpointSlices.</li>
                <li>Use port forwarding for temporary local access.</li>
            </ol>
            <p>
                Port forwarding is a debugging and development path. It is not a permanent
                application exposure method.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-service-types">
            <h2 id="kubernetes-service-types" className="SectionTitle">Service exposure choices</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Type</th><th>Use</th></tr></thead>
                    <tbody>
                        <tr><td>ClusterIP</td><td>Cluster-internal access. This is the default.</td></tr>
                        <tr><td>NodePort</td><td>Exposes a port on each node. It is often a building block, not the final public interface.</td></tr>
                        <tr><td>LoadBalancer</td><td>Requests an external load balancer from supported infrastructure.</td></tr>
                        <tr><td>ExternalName</td><td>Returns a configured DNS name instead of selecting Pods.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                HTTP routing across multiple Services is normally handled by an Ingress or Gateway
                implementation. Installing and configuring that controller is separate from creating
                the application Service.
            </p>
            <p>
                References: <a className="Link" href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/" target="_blank" rel="noreferrer">Deployments</a> and{' '}
                <a className="Link" href="https://kubernetes.io/docs/concepts/services-networking/service/" target="_blank" rel="noreferrer">Services</a> in the official Kubernetes documentation.
            </p>
        </section>
    </NoteArticleLayout>
);

export default KubernetesDeploymentsServices;
