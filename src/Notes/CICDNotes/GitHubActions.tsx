import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { CICD_NOTES_ROUTE, GITHUB_ACTIONS_ROUTE } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'actions-parts', title: 'Workflow parts' },
    { id: 'actions-node-ci', title: 'A Node.js CI workflow' },
    { id: 'actions-jobs-files', title: 'Jobs, artifacts, and caches' },
    { id: 'actions-security', title: 'Permissions and secrets' },
    { id: 'actions-debugging', title: 'Read the result' },
    { id: 'actions-references', title: 'References' },
];

const nodeWorkflow = [
    '# .github/workflows/ci.yml',
    'name: Node CI',
    '',
    'on:',
    '  push:',
    '    branches: [main]',
    '  pull_request:',
    '',
    'permissions:',
    '  contents: read',
    '',
    'jobs:',
    '  build:',
    '    runs-on: ubuntu-latest',
    '    timeout-minutes: 10',
    '    steps:',
    '      - name: Get source code',
    '        uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1',
    '        with:',
    '          persist-credentials: false',
    '      - name: Set up Node.js',
    '        uses: actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1 # v7.1.0',
    '        with:',
    "          node-version: '24'",
    '          package-manager-cache: false',
    '      - name: Install dependencies',
    '        run: npm ci',
    '      - name: Build',
    '        run: npm run build',
].join('\n');

const GitHubActions = () => (
    <ArticleLayout
        title="GitHub Actions"
        route={GITHUB_ACTIONS_ROUTE}
        sections={sections}
        backRoute={CICD_NOTES_ROUTE}
        backLabel="Back to CI/CD notes"
    >
        <section className="Article__section">
            <p>GitHub Actions runs repository automation, including builds, checks, and deployments.</p>
        </section>

        <section className="Article__section" aria-labelledby="actions-parts">
            <h2 id="actions-parts" className="SectionTitle">Workflow parts</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
                    <tbody>
                        <tr><td>Event</td><td>Something that starts a run, such as a push or pull request.</td></tr>
                        <tr><td>Workflow</td><td>A YAML file in <code>.github/workflows/</code> that defines the automation.</td></tr>
                        <tr><td>Job</td><td>A group of steps assigned to a runner.</td></tr>
                        <tr><td>Step</td><td>A command or action inside a job. Steps normally run in order.</td></tr>
                        <tr><td>Action</td><td>A reusable task called with <code>uses</code>. Shell commands use <code>run</code>.</td></tr>
                        <tr><td>Runner</td><td>The machine that executes a job. GitHub can supply it, or you can manage one.</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="actions-node-ci">
            <h2 id="actions-node-ci" className="SectionTitle">A Node.js CI workflow</h2>
            <ul className="Article__notes">
                <li>This example needs a committed <code>package-lock.json</code> and a <code>build</code> script in <code>package.json</code>.</li>
                <li>Save it as <code>.github/workflows/ci.yml</code>. Use the branch name and Node.js version your project supports.</li>
            </ul>
            <CodeBlock language="text">{nodeWorkflow}</CodeBlock>
            <ul className="Article__notes">
                <li>A push to <code>main</code> or a pull request update starts the build job.</li>
                <li><a className="Link" href="https://docs.npmjs.com/cli/v11/commands/npm-ci/" target="_blank" rel="noreferrer"><code>npm ci</code></a> installs from the lockfile. It fails when the lockfile and package manifest disagree.</li>
                <li>Add <code>run: npm test</code> before Build only when the project defines a suitable test script.</li>
                <li>Expected result: the job passes when installation and the build succeed. This example does not publish or deploy the output.</li>
                <li>The actions use verified release commit IDs. A full commit SHA fixes the action code to that commit. Review and update these pins for later fixes.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="actions-jobs-files">
            <h2 id="actions-jobs-files" className="SectionTitle">Jobs, artifacts, and caches</h2>
            <ul className="Article__notes">
                <li>Independent jobs can run in parallel when runners are available.</li>
                <li><code>needs: build</code> makes another job wait for the build job to succeed. A failed or skipped dependency normally skips that job.</li>
                <li>A GitHub-hosted Ubuntu job starts on a clean runner. Another job does not automatically receive its installed packages or output files.</li>
                <li>An artifact saves output, such as a build package or report. Upload it in one job and download it in the job that needs it.</li>
                <li>A cache reuses files across runs to save time. It can be missing. The job must still work without it.</li>
                <li>For npm, <code>cache: npm</code> in setup-node caches downloaded packages, not <code>node_modules</code>. Keep <code>npm ci</code>.</li>
                <li>Keep secrets out of caches and artifacts. Treat files from untrusted runs as untrusted input.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="actions-security">
            <h2 id="actions-security" className="SectionTitle">Permissions and secrets</h2>
            <ul className="Article__notes">
                <li><code>GITHUB_TOKEN</code> is the job's GitHub access token. Grant only the permissions needed. This build uses <code>contents: read</code>.</li>
                <li>Store credentials as GitHub secrets. Never commit them or print them. Log masking does not guarantee that every transformed secret stays hidden.</li>
                <li>For cloud deployment, OpenID Connect (OIDC) lets a trusted job obtain short-lived credentials. Restrict the cloud trust policy to the intended repository, branch, or environment.</li>
                <li>Pull request code can execute during installation and builds. Keep those checks separate from deployment credentials and privileged runners.</li>
                <li>Do not check out and execute untrusted code in privileged <code>pull_request_target</code> or <code>workflow_run</code> jobs.</li>
                <li>Review action code and workflow changes. Major version tags can move. Full commit pins make updates explicit.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="actions-debugging">
            <h2 id="actions-debugging" className="SectionTitle">Read the result</h2>
            <ul className="Article__notes">
                <li>Open the repository's Actions tab. Select the run, job, and first failing step.</li>
                <li>Check the triggering event, commit, command, and exit code before changing the workflow.</li>
                <li>A queued job is waiting to run. A skipped job may have a false condition or a failed dependency. Neither proves the checks passed.</li>
                <li>Compare the runner's Node.js version, working directory, environment, and lockfile with your local setup.</li>
                <li>A green build proves the configured build completed. It does not prove tests ran or a deployment is healthy.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="actions-references">
            <h2 id="actions-references" className="SectionTitle">References</h2>
            <ul className="Article__notes">
                <li><a className="Link" href="https://docs.github.com/en/actions/get-started/understand-github-actions" target="_blank" rel="noreferrer">GitHub Actions concepts</a> and <a className="Link" href="https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax" target="_blank" rel="noreferrer">workflow syntax</a>.</li>
                <li><a className="Link" href="https://github.com/actions/checkout/releases/tag/v7.0.1" target="_blank" rel="noreferrer">checkout v7.0.1</a> and <a className="Link" href="https://github.com/actions/setup-node/releases/tag/v7.1.0" target="_blank" rel="noreferrer">setup-node v7.1.0</a>: the releases pinned in the example.</li>
                <li><a className="Link" href="https://docs.github.com/en/actions/concepts/workflows-and-actions/dependency-caching" target="_blank" rel="noreferrer">Artifacts and caches</a> and <a className="Link" href="https://github.com/actions/setup-node#caching-global-packages-data" target="_blank" rel="noreferrer">npm caching in setup-node</a>.</li>
                <li><a className="Link" href="https://docs.github.com/en/actions/reference/security/secure-use" target="_blank" rel="noreferrer">Secure workflow use</a> and <a className="Link" href="https://docs.github.com/en/actions/concepts/security/openid-connect" target="_blank" rel="noreferrer">OpenID Connect</a>.</li>
                <li><a className="Link" href="https://docs.github.com/en/actions/how-tos/monitor-workflows/use-workflow-run-logs" target="_blank" rel="noreferrer">Workflow run logs</a>.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default GitHubActions;
