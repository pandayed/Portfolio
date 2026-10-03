import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { KUBERNETES_CONFIG_ROUTE, KUBERNETES_NOTES_ROUTE } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'kubernetes-configmap', title: 'ConfigMaps' },
    { id: 'kubernetes-secret', title: 'Secrets' },
    { id: 'kubernetes-config-consumption', title: 'Environment values and mounted files' },
    { id: 'kubernetes-volumes', title: 'Pod volumes' },
    { id: 'kubernetes-persistent-storage', title: 'Persistent storage' },
];

const configuration = [
    'apiVersion: v1',
    'kind: ConfigMap',
    'metadata:',
    '  name: orders-config',
    'data:',
    '  LOG_LEVEL: info',
    '  PAYMENT_TIMEOUT_SECONDS: "10"',
    '---',
    'apiVersion: v1',
    'kind: Secret',
    'metadata:',
    '  name: orders-secret',
    'type: Opaque',
    'stringData:',
    '  DATABASE_PASSWORD: replace-outside-source-control',
].join('\n');

const configurationUse = [
    'containers:',
    '  - name: orders',
    '    image: registry.example.com/orders:1.4.2',
    '    envFrom:',
    '      - configMapRef:',
    '          name: orders-config',
    '      - secretRef:',
    '          name: orders-secret',
].join('\n');

const persistentStorage = [
    'apiVersion: v1',
    'kind: PersistentVolumeClaim',
    'metadata:',
    '  name: app-data',
    'spec:',
    '  accessModes:',
    '    - ReadWriteOnce',
    '  resources:',
    '    requests:',
    '      storage: 5Gi',
    '---',
    'apiVersion: v1',
    'kind: Pod',
    'metadata:',
    '  name: writer',
    'spec:',
    '  containers:',
    '    - name: app',
    '      image: example/app:1.0.0',
    '      volumeMounts:',
    '        - name: data',
    '          mountPath: /var/lib/app',
    '  volumes:',
    '    - name: data',
    '      persistentVolumeClaim:',
    '        claimName: app-data',
].join('\n');

const KubernetesConfigurationStorage = () => (
    <ArticleLayout
        title="Configuration and storage"
        route={KUBERNETES_CONFIG_ROUTE}
        sections={sections}
        backRoute={KUBERNETES_NOTES_ROUTE}
        backLabel="Back to Kubernetes notes"
    >
        <section className="Article__section">
            <p>
                Keep environment-specific configuration and durable data outside the container
                image. ConfigMaps and Secrets provide configuration. Volumes provide files with a
                lifecycle and storage source defined by the Pod.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-configmap">
            <h2 id="kubernetes-configmap" className="SectionTitle">ConfigMaps</h2>
            <p>
                A ConfigMap stores non-confidential key-value data. A Pod can read it through
                environment variables, command arguments, or mounted files. The same image can then
                run with different configuration in different environments.
            </p>
            <CodeBlock language="text">{configuration}</CodeBlock>
            <p>
                ConfigMap values are strings. The value <code>"10"</code> is quoted because the
                application, not Kubernetes, decides whether to parse it as a number.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-secret">
            <h2 id="kubernetes-secret" className="SectionTitle">Secrets</h2>
            <p>
                A Secret is intended for confidential data such as a password, token, or key.
                <code> stringData</code> accepts plain strings when the object is submitted.
                Kubernetes converts them to the Secret data representation.
            </p>
            <ul className="Article__notes">
                <li>Base64 encoding is not encryption.</li>
                <li>Do not commit real Secret values to source control.</li>
                <li>Limit who and what can read Secrets through Kubernetes authorization.</li>
                <li>Enable and manage encryption at rest according to the cluster platform.</li>
                <li>Use an external secret-management process when the environment requires it.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-config-consumption">
            <h2 id="kubernetes-config-consumption" className="SectionTitle">Environment values and mounted files</h2>
            <CodeBlock language="text">{configurationUse}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Method</th><th>Behavior</th></tr></thead>
                    <tbody>
                        <tr><td>Environment variable</td><td>Fixed when the container starts. Restart or roll out Pods to receive a changed value.</td></tr>
                        <tr><td>Mounted file</td><td>Kubernetes can update projected files. The application must reread them.</td></tr>
                        <tr><td>Command argument</td><td>Calculated at container start and remains part of the running process arguments.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                A Pod may remain pending or fail to start when it requires a missing ConfigMap,
                Secret, key, or volume. Describe the Pod and read its events to find the exact
                missing reference.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-volumes">
            <h2 id="kubernetes-volumes" className="SectionTitle">Pod volumes</h2>
            <p>
                A volume belongs to a Pod specification. Containers mount that volume at selected
                paths. Several containers in the same Pod can share it when their lifecycle requires
                the same files.
            </p>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Volume source</th><th>Use</th><th>Lifecycle</th></tr></thead>
                    <tbody>
                        <tr><td><code>emptyDir</code></td><td>Scratch space or files shared by containers in one Pod.</td><td>Exists for the Pod lifetime.</td></tr>
                        <tr><td>ConfigMap / Secret</td><td>Projected configuration files.</td><td>Backed by the referenced API object.</td></tr>
                        <tr><td>PersistentVolumeClaim</td><td>Storage whose lifecycle is independent from one Pod.</td><td>Controlled by the claim, volume, and storage policy.</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="kubernetes-persistent-storage">
            <h2 id="kubernetes-persistent-storage" className="SectionTitle">Persistent storage</h2>
            <CodeBlock language="text">{persistentStorage}</CodeBlock>
            <p>
                A PersistentVolumeClaim requests storage. A matching PersistentVolume can be created
                dynamically by a StorageClass or supplied by an administrator. The Pod mounts the
                claim without needing to know the infrastructure-specific disk identifier.
            </p>
            <ul className="Article__notes">
                <li>An access mode describes how the volume can be mounted. It does not guarantee that an application can safely handle concurrent writers.</li>
                <li>A StatefulSet can provide stable Pod identity and per-Pod claims, but the storage system still controls volume behavior.</li>
                <li>Deleting a claim may delete or retain the underlying volume according to the storage reclaim policy.</li>
                <li>A persistent volume is not a backup. Test a separate backup and restore process.</li>
            </ul>
            <p>
                References: <a className="Link" href="https://kubernetes.io/docs/concepts/configuration/" target="_blank" rel="noreferrer">Configuration</a>,{' '}
                <a className="Link" href="https://kubernetes.io/docs/concepts/configuration/secret/" target="_blank" rel="noreferrer">Secrets</a>, and{' '}
                <a className="Link" href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/" target="_blank" rel="noreferrer">Persistent Volumes</a> in the official Kubernetes documentation.
            </p>
        </section>
    </ArticleLayout>
);

export default KubernetesConfigurationStorage;
