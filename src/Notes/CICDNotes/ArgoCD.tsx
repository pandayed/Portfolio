import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { ARGO_CD_ROUTE, CICD_NOTES_ROUTE, KUBERNETES_NOTES_ROUTE, toHref } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'argo-gitops', title: 'GitOps and the delivery role' },
    { id: 'argo-application', title: 'An Application selects source and destination' },
    { id: 'argo-sync', title: 'Sync, pruning, and self-healing' },
    { id: 'argo-health', title: 'Sync status and application health' },
    { id: 'argo-recovery', title: 'Access and recovery' },
];

const application = `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: orders-staging
  namespace: argocd
spec:
  project: orders
  source:
    repoURL: https://github.com/example/orders-config.git
    targetRevision: main
    path: environments/staging
  destination:
    server: https://kubernetes.default.svc
    namespace: orders-staging
  syncPolicy: {}`;

const ArgoCD = () => (
    <ArticleLayout title="Argo CD" route={ARGO_CD_ROUTE} sections={sections} backRoute={CICD_NOTES_ROUTE} backLabel="Back to CI/CD notes">
        <section className="Article__section" aria-labelledby="argo-gitops">
            <h2 id="argo-gitops" className="SectionTitle">GitOps and the delivery role</h2>
            <ul className="Article__notes">
                <li>GitOps stores desired deployment configuration in Git. A controller compares that configuration with the running system and applies approved changes.</li>
                <li>Argo CD performs this work for Kubernetes applications. Read the <a className="Link" href={toHref(KUBERNETES_NOTES_ROUTE)}>Kubernetes notes</a> first if cluster objects are unfamiliar.</li>
                <li>CI builds, checks, and publishes an image. A configuration change records the new image digest in Git.</li>
                <li>Argo CD reads the configuration and deploys it. It does not compile application source or replace the CI test pipeline.</li>
                <li>The desired state is the Git configuration. The live state is what currently exists in the cluster.</li>
            </ul>
            <p>Reference: <a className="Link" href="https://argo-cd.readthedocs.io/en/stable/" target="_blank" rel="noreferrer">Argo CD overview</a>.</p>
        </section>

        <section className="Article__section" aria-labelledby="argo-application">
            <h2 id="argo-application" className="SectionTitle">An Application selects source and destination</h2>
            <ul className="Article__notes">
                <li>An <code>Application</code> tells Argo CD which repository, revision, and directory to read, and which cluster and namespace to manage.</li>
                <li>This example assumes Argo CD is installed in <code>argocd</code>. The configuration repository is illustrative.</li>
                <li>Create the <code>orders</code> AppProject with that repository and destination allowed. The destination namespace must already exist. Configure repository access if it is private.</li>
                <li>An AppProject groups applications and restricts permitted sources, destinations, and resource types.</li>
            </ul>
            <CodeBlock language="text">{application}</CodeBlock>
            <ul className="Article__notes">
                <li><strong>Expected result:</strong> after registering this resource, Argo CD compares the staging manifests with the cluster. An authorized manual sync applies them.</li>
                <li><code>syncPolicy: {'{}'}</code> leaves automatic sync disabled. Tracking <code>main</code> allows later commits to become the desired state.</li>
            </ul>
            <p>Reference: <a className="Link" href="https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/" target="_blank" rel="noreferrer">Applications and AppProjects</a>.</p>
        </section>

        <section className="Article__section" aria-labelledby="argo-sync">
            <h2 id="argo-sync" className="SectionTitle">Sync, pruning, and self-healing</h2>
            <ul className="Article__notes">
                <li><strong>Sync:</strong> apply the desired configuration to the cluster.</li>
                <li><strong>Automatic sync:</strong> apply detected Git changes without a separate manual sync.</li>
                <li><strong>Pruning:</strong> delete managed resources that are no longer in the desired configuration. Automatic pruning is off by default.</li>
                <li><strong>Self-healing:</strong> correct live changes that differ from Git when automatic sync and <code>selfHeal</code> are enabled.</li>
                <li>Review deletion effects before enabling <code>prune</code>. Self-healing can undo manual cluster edits.</li>
            </ul>
            <p>Reference: <a className="Link" href="https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/" target="_blank" rel="noreferrer">automated sync policy</a>.</p>
        </section>

        <section className="Article__section" aria-labelledby="argo-health">
            <h2 id="argo-health" className="SectionTitle">Sync status and application health</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Status</th><th>What it tells you</th></tr></thead>
                    <tbody>
                        <tr><td>Synced</td><td>The compared resources match the desired configuration.</td></tr>
                        <tr><td>OutOfSync</td><td>The compared resources differ from the desired configuration.</td></tr>
                        <tr><td>Healthy</td><td>Assessed resources meet their configured health criteria.</td></tr>
                        <tr><td>Progressing or Degraded</td><td>Resources are still becoming ready or have a reported problem.</td></tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>A deployment can be Synced while its Pods fail to start. Check health, resource events, and application logs.</li>
                <li>Healthy resources do not prove that a user request works. Check the application after rollout.</li>
            </ul>
            <p>Reference: <a className="Link" href="https://argo-cd.readthedocs.io/en/stable/operator-manual/health/" target="_blank" rel="noreferrer">resource health assessment</a>.</p>
        </section>

        <section className="Article__section" aria-labelledby="argo-recovery">
            <h2 id="argo-recovery" className="SectionTitle">Access and recovery</h2>
            <ul className="Article__notes">
                <li>Review configuration changes and restrict who can sync production applications.</li>
                <li>Keep plaintext credentials out of Git. Use an approved secret-management integration for deployment secrets.</li>
                <li>For recovery, revert the deployment configuration to a known working image digest, then sync and check health.</li>
                <li>A direct live rollback can be overwritten by reconciliation. Record the desired recovery state in Git.</li>
                <li>Application rollback does not restore database data. Plan compatible schema changes separately.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default ArgoCD;
