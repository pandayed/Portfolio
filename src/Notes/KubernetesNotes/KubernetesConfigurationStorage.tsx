import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { KUBERNETES_CONFIG_ROUTE, KUBERNETES_OPERATIONS_ROUTE, KUBERNETES_NOTES_ROUTE, toHref } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';

const sections: TocEntry[] = [
    { id: "kubernetes-configmap", title: "A ConfigMap stores page content" },
    { id: "kubernetes-config-mount", title: "A volume mount supplies the nginx page" },
    { id: "kubernetes-config-updates", title: "Configuration updates and Pod replacement" },
    { id: "kubernetes-secrets", title: "ConfigMaps and Secrets hold different values" },
    { id: "kubernetes-storage", title: "Storage sources have different lifetimes" }
];

const KubernetesConfigurationStorage = () => (<ArticleLayout title="3. Configuration and storage lifetimes" route={KUBERNETES_CONFIG_ROUTE} sections={sections} backRoute={KUBERNETES_NOTES_ROUTE} backLabel="Back to Kubernetes lessons">
    <section className="Article__section">
        <ul className="Article__notes">
            <li>Chapter 2 left two nginx Pods behind a Service.</li>
            <li>The next example reuses that Deployment and Service.</li>
            <li>A ConfigMap changes their page without another image build.</li>
            <li>This introduces configuration first, then the separate problem of preserving application data.</li>
        </ul>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-configmap">
        <h2 id="kubernetes-configmap" className="SectionTitle">A ConfigMap stores page content</h2>
        <ul className="Article__notes">
            <li>A ConfigMap stores small non-secret configuration values or file contents.</li>
            <li>A Pod can receive them as environment variables or mounted files.</li>
            <li>A mounted file supplies configuration to an application that already reads a file.</li>
            <li>It avoids putting environment-specific content into the image.</li>
        </ul>
        <LearningNoteExampleBlock example={{
            title: "A ConfigMap containing index.html",
            description: [
                "This YAML belongs in content.yaml in the same lesson folder.",
                "The lessons namespace and web Deployment from earlier chapters must exist."
            ],
            language: "text",
            code: `apiVersion: v1
kind: ConfigMap
metadata:
  name: web-content
data:
  index.html: |
    <!doctype html>
    <html lang="en">
      <head><title>Kubernetes lesson</title></head>
      <body><h1>Hello from Kubernetes</h1></body>
    </html>`,
            explanation: [
                "The ConfigMap is named web-content.",
                "Its data key index.html will become a filename when mounted into a Pod.",
                "The YAML vertical bar keeps the following indented lines as multiline text.",
                "Here that text is a complete HTML page.",
                "Creating the ConfigMap alone does not change nginx.",
                "The Deployment must explicitly refer to it."
            ],
            commands: `kubectl apply -n lessons -f content.yaml`
        }} />
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-config-mount">
        <h2 id="kubernetes-config-mount" className="SectionTitle">A volume mount supplies the nginx page</h2>
        <ul className="Article__notes">
            <li>A volume gives a Pod a source of files.</li>
            <li>A volume mount makes those files visible at a path inside a container.</li>
            <li>The source can be configuration, temporary storage, or persistent storage.</li>
            <li>These sources have different lifetimes.</li>
        </ul>
        <LearningNoteExampleBlock example={{
            title: "web.yaml mounts the page from a ConfigMap",
            description: [
                "This YAML replaces the complete contents of web.yaml.",
                "This is the same Deployment with a ConfigMap volume added.",
                "service.yaml stays unchanged.",
                "content.yaml must have been applied first."
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
          volumeMounts:
            - name: content
              mountPath: /usr/share/nginx/html
              readOnly: true
      volumes:
        - name: content
          configMap:
            name: web-content`,
            explanation: [
                "volumes declares a Pod volume named content.",
                "configMap chooses web-content as its file source.",
                "volumeMounts attaches that volume to the nginx document directory.",
                "The names content must match.",
                "The mount hides the image’s existing files at that directory.",
                "nginx now serves index.html from the ConfigMap.",
                "Changing the Pod template starts a rollout.",
                "The two replacement Pods receive the same file.",
                "readOnly prevents this container from writing to the mounted configuration.",
                "After rollout completes, a stopped port-forward command requires a restart in terminal A.",
                "The curl response should now contain Hello from Kubernetes."
            ],
            commands: `kubectl apply -n lessons -f web.yaml
kubectl rollout status -n lessons deployment/web --timeout=120s
# Terminal A: restart this if necessary
kubectl port-forward -n lessons service/web 8080:80
# Terminal B
curl http://127.0.0.1:8080`
        }} />
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-config-updates">
        <h2 id="kubernetes-config-updates" className="SectionTitle">Configuration updates and Pod replacement</h2>
        <ul className="Article__notes">
            <li>Configuration has a lifecycle separate from the Deployment.</li>
            <li>Updating a ConfigMap does not itself create a new Deployment revision.</li>
            <li>Mounted ConfigMap files usually update after a delay.</li>
            <li>An application may still need to reload the file.</li>
            <li>Environment variables from a ConfigMap do not change in already running containers.</li>
        </ul>
        <LearningNoteExampleBlock example={{
            title: "A page update followed by Pod replacement",
            description: [
                "The updated content.yaml has the heading Hello again from Kubernetes.",
                "Its ConfigMap name and data key stay the same.",
                "This example restarts the Pods to make the refresh predictable rather than waiting for volume propagation."
            ],
            language: "text",
            code: `kubectl apply -n lessons -f content.yaml
kubectl rollout restart -n lessons deployment/web
kubectl rollout status -n lessons deployment/web --timeout=120s
# Terminal A: restart forwarding if necessary
kubectl port-forward -n lessons service/web 8080:80
# Terminal B
curl http://127.0.0.1:8080`,
            explanation: [
                "rollout restart changes the Pod template annotation so Kubernetes creates replacement Pods using the updated ConfigMap.",
                "A stopped port-forward command requires a restart in terminal A.",
                "curl runs in terminal B.",
                "The expected response contains the updated heading.",
                "A rollback of the Deployment does not restore the old contents of this same-named ConfigMap.",
                "Configuration history must be stored separately.",
                "Versioned ConfigMap names are one approach for production releases."
            ]
        }} />
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-secrets">
        <h2 id="kubernetes-secrets" className="SectionTitle">ConfigMaps and Secrets hold different values</h2>
        <ul className="Article__notes">
            <li>A Secret is the Kubernetes object intended for sensitive values such as credentials.</li>
            <li>It can also be mounted as files or supplied as environment variables.</li>
            <li>Base64 encoding in a Secret manifest is not encryption.</li>
            <li>Cluster administrators must configure encryption at rest and restrict API access.</li>
        </ul>
        <ul className="Article__notes">
            <li>This website needs no credentials.</li>
            <li>The example therefore needs no Secret.</li>
            <li>Real Secret values must stay out of source control and logs.</li>
            <li>An external secret manager can supply values through an appropriate integration.</li>
            <li>A workload should have access only to the secrets and API operations it needs.</li>
            <li>The website has no need to call the Kubernetes API.</li>
        </ul>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-storage">
        <h2 id="kubernetes-storage" className="SectionTitle">Storage sources have different lifetimes</h2>
        <ul className="Article__notes">
            <li>The mounted HTML is configuration stored separately from the image.</li>
            <li>Data written by an application is a different problem.</li>
            <li>A database record or uploaded file should not disappear just because its Pod is replaced.</li>
        </ul>
        <div className="Article__tableWrap">
            <table className="Article__table">
                <thead>
                    <tr>
                        <th>Source
                        </th>
                        <th>Survives a container restart?
                        </th>
                        <th>Survives Pod replacement?
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Container writable layer
                        </td>
                        <td>Not guaranteed across container recreation.
                        </td>
                        <td>No.
                        </td>
                    </tr>
                    <tr>
                        <td>emptyDir volume
                        </td>
                        <td>Yes, while the same Pod remains.
                        </td>
                        <td>No.
                        </td>
                    </tr>
                    <tr>
                        <td>ConfigMap volume
                        </td>
                        <td>The source is a separate API object.
                        </td>
                        <td>A replacement can mount the same existing ConfigMap. It is not writable application storage.
                        </td>
                    </tr>
                    <tr>
                        <td>PersistentVolumeClaim
                        </td>
                        <td>Yes, subject to storage health.
                        </td>
                        <td>The claim can be mounted by a replacement, subject to access and scheduling constraints.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ul className="Article__notes">
            <li>A PersistentVolumeClaim (PVC) requests storage capacity and access behavior.</li>
            <li>A PersistentVolume (PV) represents the provided storage.</li>
            <li>A StorageClass describes how storage can be provisioned.</li>
            <li>An administrator can supply a PV, or a provisioner can create one dynamically.</li>
        </ul>
        <ul className="Article__notes">
            <li>The static website does not write user data, so it needs no PVC.</li>
            <li>A shared writable disk is not automatically suitable for two replicas.</li>
            <li>The application and storage provider must both support the required concurrent access.</li>
            <li>A StatefulSet helps manage stable Pod identity and per-Pod claims when the application needs them.</li>
        </ul>
        <ul className="Article__notes">
            <li>A claim may remain Pending when no suitable storage exists.</li>
            <li>The claim’s events and available StorageClasses provide evidence about the missing storage.</li>
            <li>ReadWriteOnce generally means read-write mounting by one node, not necessarily one Pod.</li>
            <li>Access mode alone does not make concurrent writes safe.</li>
            <li>Deleting a claim may delete the underlying storage according to its reclaim policy.</li>
            <li>A persistent volume is not a backup.</li>
        </ul>
        <ul className="Article__notes">
            <li>Related documentation: <a className="Link" href="https://kubernetes.io/docs/concepts/configuration/configmap/" target="_blank" rel="noreferrer">ConfigMaps</a>, <a className="Link" href="https://kubernetes.io/docs/concepts/configuration/secret/" target="_blank" rel="noreferrer">Secrets</a>, <a className="Link" href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/" target="_blank" rel="noreferrer">persistent storage</a>.</li>
        </ul>
    </section>
    <section className="Article__section">
        <ul className="Article__notes">
            <li>The application now gets its page from a separate object, and storage choices have clear lifetimes.</li>
            <li>The next topic is <a className="Link" href={toHref(KUBERNETES_OPERATIONS_ROUTE)}>chapter 4: website health, updates, and troubleshooting</a>.</li>
        </ul>
    </section>
</ArticleLayout>);
export default KubernetesConfigurationStorage;
