import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import {
    KUBERNETES_CLUSTER_ROUTE,
    KUBERNETES_COMMANDS_ROUTE,
    KUBERNETES_CONFIG_ROUTE,
    KUBERNETES_DEPLOY_ROUTE,
    KUBERNETES_NOTES_ROUTE,
    KUBERNETES_OPERATIONS_ROUTE,
    toHref,
} from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';

const commandGroups = [
    {
        id: 'kubernetes-context-discovery-commands',
        title: 'Contexts and discovery',
        commands: [
            {
                command: 'kubectl config current-context',
                href: toHref(KUBERNETES_CLUSTER_ROUTE),
                meaning: 'Shows the active kubeconfig context, which selects a cluster, credentials, and default namespace.',
            },
            {
                command: 'kubectl config get-contexts',
                href: 'https://kubernetes.io/docs/reference/kubectl/generated/kubectl_config/kubectl_config_get-contexts/',
                meaning: 'Lists configured contexts and marks the active context.',
            },
            {
                command: 'kubectl config use-context',
                href: 'https://kubernetes.io/docs/reference/kubectl/generated/kubectl_config/kubectl_config_use-context/',
                meaning: 'Switches the active kubeconfig context to the specified existing context.',
            },
            {
                command: 'kubectl version',
                href: 'https://kubernetes.io/docs/reference/kubectl/generated/kubectl_version/',
                meaning: <>Shows client and reachable server versions; <code>--client</code> shows only the client version.</>,
            },
            {
                command: 'kubectl cluster-info',
                href: 'https://kubernetes.io/docs/reference/kubectl/generated/kubectl_cluster-info/',
                meaning: 'Shows control-plane and labeled cluster-service addresses for the selected cluster.',
            },
            {
                command: 'kubectl api-resources',
                href: 'https://kubernetes.io/docs/reference/kubectl/generated/kubectl_api-resources/',
                meaning: 'Lists available API resource types, their short names, and whether they are namespaced.',
            },
            {
                command: 'kubectl explain',
                href: 'https://kubernetes.io/docs/reference/kubectl/generated/kubectl_explain/',
                meaning: 'Describes a resource type or field using the API schema.',
            },
        ],
    },
    {
        id: 'kubernetes-object-commands',
        title: 'Object management',
        commands: [
            {
                command: 'kubectl get',
                href: toHref(KUBERNETES_DEPLOY_ROUTE),
                meaning: <>Lists resources or retrieves one object; <code>-o yaml</code> shows its YAML representation.</>,
            },
            {
                command: 'kubectl apply',
                href: toHref(KUBERNETES_DEPLOY_ROUTE),
                meaning: <>Creates or updates resources from declarative configuration; <code>-f</code> selects a manifest file.</>,
            },
            {
                command: 'kubectl create namespace',
                href: toHref(KUBERNETES_CLUSTER_ROUTE),
                meaning: 'Creates a namespace with the specified name.',
            },
            {
                command: 'kubectl delete',
                href: toHref(KUBERNETES_OPERATIONS_ROUTE),
                meaning: 'Deletes selected resources; deleting a namespace also deletes its namespaced objects.',
            },
            {
                command: 'kubectl diff',
                href: 'https://kubernetes.io/docs/reference/kubectl/generated/kubectl_diff/',
                meaning: 'Shows differences between live resources and their proposed applied configuration without persisting changes.',
            },
            {
                command: 'kubectl edit',
                href: 'https://kubernetes.io/docs/reference/kubectl/generated/kubectl_edit/',
                meaning: 'Opens a live resource in an editor and submits the saved changes to the API server.',
            },
            {
                command: 'kubectl patch',
                href: 'https://kubernetes.io/docs/reference/kubectl/generated/kubectl_patch/',
                meaning: 'Updates specified fields of an existing resource using a patch.',
            },
            {
                command: 'kubectl label',
                href: 'https://kubernetes.io/docs/reference/kubectl/generated/kubectl_label/',
                meaning: <>Adds or removes resource labels; <code>--overwrite</code> allows changing an existing label value.</>,
            },
        ],
    },
    {
        id: 'kubernetes-troubleshooting-commands',
        title: 'Troubleshooting and access',
        commands: [
            {
                command: 'kubectl describe',
                href: toHref(KUBERNETES_OPERATIONS_ROUTE),
                meaning: 'Shows detailed resource state and related information, including events when available.',
            },
            {
                command: 'kubectl logs',
                href: toHref(KUBERNETES_OPERATIONS_ROUTE),
                meaning: <>Reads container output; <code>--follow</code> streams it and <code>--previous</code> selects the previous container instance.</>,
            },
            {
                command: 'kubectl get events',
                href: toHref(KUBERNETES_OPERATIONS_ROUTE),
                meaning: 'Lists retained cluster events in the selected namespace, including scheduling and container-start failures.',
            },
            {
                command: 'kubectl exec',
                href: 'https://kubernetes.io/docs/reference/kubectl/generated/kubectl_exec/',
                meaning: <>Runs a command inside a running container; <code>-c</code> selects a container in a multi-container Pod.</>,
            },
            {
                command: 'kubectl port-forward',
                href: toHref(KUBERNETES_DEPLOY_ROUTE),
                meaning: 'Forwards local ports to a selected Pod, including a backing Pod selected through a Service.',
            },
            {
                command: 'kubectl top pod',
                href: 'https://kubernetes.io/docs/reference/kubectl/generated/kubectl_top/kubectl_top_pod/',
                meaning: 'Shows recent Pod CPU and memory usage when the cluster Metrics API is available.',
            },
            {
                command: 'kubectl wait',
                href: 'https://kubernetes.io/docs/reference/kubectl/generated/kubectl_wait/',
                meaning: 'Waits for selected resources to meet a specified condition, exist, or be deleted.',
            },
        ],
    },
    {
        id: 'kubernetes-workload-update-commands',
        title: 'Workload updates',
        commands: [
            {
                command: 'kubectl scale',
                href: toHref(KUBERNETES_OPERATIONS_ROUTE),
                meaning: 'Changes the requested replica count of a supported workload without editing its local manifest.',
            },
            {
                command: 'kubectl set image',
                href: 'https://kubernetes.io/docs/reference/kubectl/generated/kubectl_set/kubectl_set_image/',
                meaning: 'Updates specified container image references in a supported resource.',
            },
            {
                command: 'kubectl rollout status',
                href: toHref(KUBERNETES_OPERATIONS_ROUTE),
                meaning: 'Reports rollout progress and watches for completion by default.',
            },
            {
                command: 'kubectl rollout history',
                href: toHref(KUBERNETES_OPERATIONS_ROUTE),
                meaning: 'Lists retained rollout revisions or shows details of a specified revision.',
            },
            {
                command: 'kubectl rollout undo',
                href: toHref(KUBERNETES_OPERATIONS_ROUTE),
                meaning: 'Restores an earlier workload template without restoring external configuration or application data.',
            },
            {
                command: 'kubectl rollout restart',
                href: toHref(KUBERNETES_CONFIG_ROUTE),
                meaning: 'Triggers replacement of workload Pods through a change to the Pod template.',
            },
        ],
    },
];

const sections: TocEntry[] = commandGroups.map(({ id, title }) => ({ id, title }));

const KubernetesCommands = () => (
    <ArticleLayout
        title="Kubernetes commands"
        route={KUBERNETES_COMMANDS_ROUTE}
        sections={sections}
        backRoute={KUBERNETES_NOTES_ROUTE}
        backLabel="Back to Kubernetes lessons"
    >
        <section className="Article__section">
            <ul className="Article__notes">
                <li>Each command links to its explanation in a lesson or the official Kubernetes command reference.</li>
                <li>Command names identify operations; resource types, names, and other required arguments depend on the operation.</li>
                <li><code>--context</code> selects a context for one invocation; otherwise <code>kubectl</code> uses the active context.</li>
                <li><code>-n</code> selects a namespace for namespaced resources; otherwise the context’s namespace applies, or <code>default</code> when unset.</li>
                <li><code>--all-namespaces</code> lists namespaced resources across namespaces on commands that support it; nodes and namespaces themselves are cluster-scoped.</li>
            </ul>
        </section>
        {commandGroups.map(({ id, title, commands }) => (
            <section key={id} className="Article__section" aria-labelledby={id}>
                <h2 id={id} className="SectionTitle">{title}</h2>
                <div className="Article__tableWrap">
                    <table className="Article__table">
                        <thead><tr><th>Command</th><th>What it does</th></tr></thead>
                        <tbody>
                            {commands.map(({ command, href, meaning }) => (
                                <tr key={command}>
                                    <td><a className="Link" href={href}><code>{command}</code></a></td>
                                    <td>{meaning}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        ))}
    </ArticleLayout>
);

export default KubernetesCommands;
