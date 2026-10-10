import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { CICD_BASICS_ROUTE, CICD_NOTES_ROUTE, DOCKER_NOTES_ROUTE, KUBERNETES_NOTES_ROUTE, toHref } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'ci-cd-meaning', title: 'CI, delivery, and deployment' },
    { id: 'ci-cd-pipeline', title: 'From a commit to a release' },
    { id: 'ci-cd-terms', title: 'The main terms' },
    { id: 'ci-cd-release', title: 'Release controls and rollback' },
    { id: 'ci-cd-tools', title: 'Where each tool fits' },
];

const CICDBasics = () => (
    <ArticleLayout title="CI/CD fundamentals" route={CICD_BASICS_ROUTE} sections={sections} backRoute={CICD_NOTES_ROUTE} backLabel="Back to CI/CD notes">
        <section className="Article__section" aria-labelledby="ci-cd-meaning">
            <h2 id="ci-cd-meaning" className="SectionTitle">CI, delivery, and deployment</h2>
            <ul className="Article__notes">
                <li><strong>Continuous integration (CI):</strong> developers merge small changes often. Automated builds and tests check those changes.</li>
                <li><strong>Continuous delivery:</strong> passing changes stay ready for release. A person can approve production deployment.</li>
                <li><strong>Continuous deployment:</strong> passing changes reach production automatically.</li>
                <li>CD can mean either delivery or deployment. State which meaning you use.</li>
                <li>A passing build proves that its configured commands succeeded. It does not prove that every feature works in production.</li>
            </ul>
            <p>Reference: <a className="Link" href="https://docs.gitlab.com/ci/" target="_blank" rel="noreferrer">GitLab CI/CD introduction</a>.</p>
        </section>

        <section className="Article__section" aria-labelledby="ci-cd-pipeline">
            <h2 id="ci-cd-pipeline" className="SectionTitle">From a commit to a release</h2>
            <ol className="Article__steps">
                <li>A push or pull request triggers the pipeline for a recorded commit.</li>
                <li>A worker checks out the code and installs dependencies from the lockfile.</li>
                <li>Configured checks run: type checking, linting, automated tests, and security checks.</li>
                <li>The build creates a versioned package. Save that package with its commit ID.</li>
                <li>Deploy the package to staging, an environment used to check a release before production.</li>
                <li>Approve the release when required. Deploy the same package to production.</li>
                <li>Check application behavior, errors, and service health after deployment.</li>
            </ol>
            <ul className="Article__notes">
                <li>Example: commit <code>abc1234</code> creates package <code>orders-abc1234</code>. Staging and production receive that exact package.</li>
                <li>Rebuilding separately for production can produce different files. Keep environment configuration separate from the package where possible.</li>
                <li>A failed required check should block the dependent release job. A skipped check supplies no evidence.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="ci-cd-terms">
            <h2 id="ci-cd-terms" className="SectionTitle">The main terms</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
                    <tbody>
                        <tr><td>Pipeline</td><td>The configured sequence and dependencies of automated work.</td></tr>
                        <tr><td>Job</td><td>A unit of work assigned to a worker.</td></tr>
                        <tr><td>Runner or agent</td><td>The worker that executes a job.</td></tr>
                        <tr><td>Artifact</td><td>A saved output, such as a package or test report.</td></tr>
                        <tr><td>Cache</td><td>Reusable files that reduce repeated downloads or calculations.</td></tr>
                        <tr><td>Environment</td><td>A deployment destination, such as staging or production.</td></tr>
                        <tr><td>Secret</td><td>A sensitive value supplied through a credential store.</td></tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>A missing cache should only slow the job. Required release files belong in artifacts or a package registry.</li>
                <li>A registry stores versioned packages or container images for later deployment.</li>
            </ul>
            <p>References: <a className="Link" href="https://docs.gitlab.com/ci/jobs/job_artifacts/" target="_blank" rel="noreferrer">job artifacts</a> and <a className="Link" href="https://docs.gitlab.com/ci/caching/" target="_blank" rel="noreferrer">caching</a>.</p>
        </section>

        <section className="Article__section" aria-labelledby="ci-cd-release">
            <h2 id="ci-cd-release" className="SectionTitle">Release controls and rollback</h2>
            <ul className="Article__notes">
                <li>Allow production deployment from reviewed code. Give the release job only the access it needs.</li>
                <li>Keep secrets out of source files and build artifacts. Untrusted pull-request code must not receive production credentials.</li>
                <li>Record the commit, package version, environment, and deployment result. They answer what was built and what is running.</li>
                <li>Rollback means deploying a previous known working version. Keep that package available.</li>
                <li>Database changes need their own recovery plan. Deploying older application code does not undo changed or deleted data.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="ci-cd-tools">
            <h2 id="ci-cd-tools" className="SectionTitle">Where each tool fits</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Tool</th><th>Main role</th><th>Configuration</th></tr></thead>
                    <tbody>
                        <tr><td>GitHub Actions</td><td>Run workflows from GitHub events.</td><td><code>.github/workflows/*.yml</code></td></tr>
                        <tr><td>Jenkins</td><td>Coordinate jobs on managed agents.</td><td><code>Jenkinsfile</code></td></tr>
                        <tr><td>GitLab CI/CD</td><td>Run GitLab pipelines on runners.</td><td><code>.gitlab-ci.yml</code></td></tr>
                        <tr><td>Argo CD</td><td>Reconcile Kubernetes applications with Git configuration.</td><td>An <code>Application</code> resource.</td></tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>CI tools can build, check, package, and deploy. Argo CD usually handles Kubernetes delivery after CI publishes an image.</li>
                <li><a className="Link" href={toHref(DOCKER_NOTES_ROUTE)}>Docker notes</a> explain images and containers. <a className="Link" href={toHref(KUBERNETES_NOTES_ROUTE)}>Kubernetes notes</a> explain the deployment platform.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default CICDBasics;
