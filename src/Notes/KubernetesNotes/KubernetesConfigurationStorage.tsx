import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { KUBERNETES_CONFIG_ROUTE, KUBERNETES_OPERATIONS_ROUTE, KUBERNETES_NOTES_ROUTE, toHref } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';

const sections: TocEntry[] = [
    { id: "kubernetes-configmap", title: "Store the page as configuration" },
    { id: "kubernetes-config-mount", title: "Mount the file where nginx reads its page" },
    { id: "kubernetes-config-updates", title: "Change configuration deliberately" },
    { id: "kubernetes-secrets", title: "Separate non-secret configuration from credentials" },
    { id: "kubernetes-storage", title: "Choose storage by what must survive" }
];

const KubernetesConfigurationStorage = () => (<ArticleLayout title="3. Supply configuration and understand storage" route={KUBERNETES_CONFIG_ROUTE} sections={sections} backRoute={KUBERNETES_NOTES_ROUTE} backLabel="Back to Kubernetes lessons">
    <section className="Article__section">
        <p>
            Chapter 2 left two nginx Pods behind a Service. Keep that Deployment and Service. Now
            change the page they serve without building another image. This introduces configuration
            first, then the separate problem of preserving application data.
        </p>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-configmap">
        <h2 id="kubernetes-configmap" className="SectionTitle">Store the page as configuration</h2>
        <p>
            A ConfigMap stores small non-secret configuration values or file contents. A Pod can
            receive them as environment variables or mounted files. Use a mounted file when the
            application already reads a file. It avoids putting environment-specific content into
            the image.
        </p>
        <LearningNoteExampleBlock example={{
            title: "Create a ConfigMap containing index.html",
            description: [
                "Save this YAML as content.yaml in the same lesson folder. The lessons namespace and web Deployment from earlier chapters must exist."
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
                "The ConfigMap is named web-content. Its data key index.html will become a filename when mounted into a Pod.",
                "The YAML vertical bar keeps the following indented lines as multiline text. Here that text is a complete HTML page.",
                "Creating the ConfigMap alone does not change nginx. The Deployment must explicitly refer to it."
            ],
            commands: `kubectl apply -n lessons -f content.yaml`
        }} />
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-config-mount">
        <h2 id="kubernetes-config-mount" className="SectionTitle">Mount the file where nginx reads its page</h2>
        <p>
            A volume gives a Pod a source of files. A volume mount makes those files visible at a
            path inside a container. The source can be configuration, temporary storage, or
            persistent storage. These sources have different lifetimes.
        </p>
        <LearningNoteExampleBlock example={{
            title: "Replace web.yaml with the version that mounts the page",
            description: [
                "Replace the complete contents of web.yaml with this YAML. This is the same Deployment with a ConfigMap volume added.",
                "Keep service.yaml unchanged. content.yaml must have been applied first."
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
                "volumes declares a Pod volume named content. configMap chooses web-content as its file source.",
                "volumeMounts attaches that volume to the nginx document directory. The names content must match.",
                "The mount hides the image’s existing files at that directory. nginx now serves index.html from the ConfigMap.",
                "Changing the Pod template starts a rollout. The two replacement Pods receive the same file. readOnly prevents this container from writing to the mounted configuration.",
                "After rollout completes, restart terminal A’s port-forward command if it stopped. curl should now contain Hello from Kubernetes."
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
        <h2 id="kubernetes-config-updates" className="SectionTitle">Change configuration deliberately</h2>
        <p>
            Configuration has a lifecycle separate from the Deployment. Updating a ConfigMap does
            not itself create a new Deployment revision. Mounted ConfigMap files usually update
            after a delay. An application may still need to reload the file. Environment variables
            from a ConfigMap do not change in already running containers.
        </p>
        <LearningNoteExampleBlock example={{
            title: "Change the page and replace Pods predictably",
            description: [
                "Edit content.yaml so its heading reads Hello again from Kubernetes. Keep the same ConfigMap name and data key.",
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
                "Restart port forwarding in terminal A if it stops. Run curl in terminal B. Expect the updated heading.",
                "A rollback of the Deployment does not restore the old contents of this same-named ConfigMap. Keep configuration history too. Versioned ConfigMap names are one approach for production releases."
            ]
        }} />
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-secrets">
        <h2 id="kubernetes-secrets" className="SectionTitle">Separate non-secret configuration from credentials</h2>
        <p>
            A Secret is the Kubernetes object intended for sensitive values such as credentials. It
            can also be mounted as files or supplied as environment variables. Base64 encoding in a
            Secret manifest is not encryption. Cluster administrators must configure encryption at
            rest and restrict API access.
        </p>
        <ul className="Article__notes">
            <li>This website needs no credentials. Do not invent a password just to demonstrate a Secret.
            </li>
            <li>Do not commit real Secret values to source control or print them in logs. An external secret manager can supply values through an appropriate integration.
            </li>
            <li>Grant a workload access only to the secrets and API operations it needs. The website has no need to call the Kubernetes API.
            </li>
        </ul>
    </section>
    <section className="Article__section" aria-labelledby="kubernetes-storage">
        <h2 id="kubernetes-storage" className="SectionTitle">Choose storage by what must survive</h2>
        <p>
            The mounted HTML is configuration managed by you. Data written by an application is a
            different problem. A database record or uploaded file should not disappear just because
            its Pod is replaced.
        </p>
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
                        <td>Do not rely on it across container recreation.
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
        <p>
            A PersistentVolumeClaim (PVC) requests storage capacity and access behavior. A
            PersistentVolume (PV) represents the provided storage. A StorageClass describes how
            storage can be provisioned. An administrator can supply a PV, or a provisioner can
            create one dynamically.
        </p>
        <p>
            The static website does not write user data, so it needs no PVC. Do not mount a shared
            writable disk into two replicas merely to add storage. The application and storage
            provider must both support the required concurrent access. A StatefulSet helps manage
            stable Pod identity and per-Pod claims when the application needs them.
        </p>
        <ul className="Article__notes">
            <li>A claim may remain Pending when no suitable storage exists. Inspect the claim’s events and available StorageClasses.
            </li>
            <li>ReadWriteOnce generally means read-write mounting by one node, not necessarily one Pod. Access mode alone does not make concurrent writes safe.
            </li>
            <li>Deleting a claim may delete the underlying storage according to its reclaim policy. A persistent volume is not a backup.
            </li>
        </ul>
        <p>Read alongside: <a className="Link" href="https://kubernetes.io/docs/concepts/configuration/configmap/" target="_blank" rel="noreferrer">ConfigMaps</a>, <a className="Link" href="https://kubernetes.io/docs/concepts/configuration/secret/" target="_blank" rel="noreferrer">Secrets</a>, <a className="Link" href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/" target="_blank" rel="noreferrer">persistent storage</a>.
        </p>
    </section>
    <section className="Article__section">
        <p>The application now gets its page from a separate object, and storage choices have clear lifetimes. Continue with <a className="Link" href={toHref(KUBERNETES_OPERATIONS_ROUTE)}>chapter 4: check health, make changes, and diagnose failures</a>.
        </p>
    </section>
</ArticleLayout>);
export default KubernetesConfigurationStorage;
