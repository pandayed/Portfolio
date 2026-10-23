import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { CICD_NOTES_ROUTE, GITHUB_ACTIONS_ROUTE } from '../../routing/routes';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';
import ArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'actions-parts', title: 'Repositories, workflows, and runners' },
    { id: 'actions-yaml', title: 'Reading YAML and workflow names' },
    { id: 'actions-node-ci', title: 'A Node.js CI workflow, line by line' },
    { id: 'actions-debugging', title: 'Following a run and reading failures' },
    { id: 'actions-jobs-files', title: 'More jobs, artifacts, and caches' },
    { id: 'actions-security', title: 'Credentials and deployment access' },
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
        <section className="Article__section" aria-labelledby="actions-parts">
            <h2 id="actions-parts" className="SectionTitle">Repositories, workflows, and runners</h2>
            <ul className="Article__notes">
                <li>GitHub Actions runs automated work for a project stored on GitHub. That work can install dependencies, build the project, run tests, or deploy an application.</li>
                <li>A repository stores the project files and their Git history. A commit records a version of those files. A branch, such as <code>main</code>, tracks a line of commits.</li>
                <li>A push sends local commits to GitHub. A pull request proposes merging changes from one branch into another. These are different events that can start automated work.</li>
                <li>A workflow is the configuration for that automated work. GitHub reads workflow files from the repository’s <code>.github/workflows/</code> directory.</li>
                <li>A workflow run is one execution of a workflow. A later matching event creates another run.</li>
                <li>A workflow contains jobs. Each job runs on a runner: a machine that executes the work. A GitHub-hosted runner is provided by GitHub; a self-hosted runner is managed by you or your organization.</li>
                <li>A job contains steps. A step either runs a shell command or calls an action, which is reusable automation written by someone else. A shell is the program that reads command text and starts programs such as npm.</li>
                <li>GitHub receives an event, selects matching workflows, and schedules their jobs. A runner executes the steps and sends status and logs back to GitHub.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="actions-yaml">
            <h2 id="actions-yaml" className="SectionTitle">Reading YAML and workflow names</h2>
            <ul className="Article__notes">
                <li>YAML is a text format for structured data. A workflow file describes settings and tasks; it is not a JavaScript program.</li>
                <li>In <code>name: Node CI</code>, the colon separates a key, <code>name</code>, from its value, <code>Node CI</code>.</li>
                <li>Indentation shows which settings belong together. Indented lines belong to the key above them. Lines at the same indentation are siblings. Use spaces, not tabs.</li>
                <li>A dash starts a list item. Under <code>steps</code>, each dash begins a new step. The other keys indented beneath that item configure the same step.</li>
                <li>Square brackets describe a list on one line. <code>[main]</code> is a list containing one branch name. A <code>#</code> outside quotes starts a comment; blank lines only separate text for readability.</li>
                <li>Quoted values such as <code>'24'</code> are strings. <code>false</code> without quotes is a Boolean value. Different settings accept different kinds of values.</li>
                <li>YAML supplies the structure. GitHub Actions defines the workflow keys and their meanings. An action separately defines the input names accepted under <code>with</code>.</li>
            </ul>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Kind of name</th><th>Who defines it?</th><th>How to recognize it</th></tr></thead>
                    <tbody>
                        <tr><td>Workflow key</td><td>GitHub Actions</td><td><code>jobs</code>, <code>runs-on</code>, <code>steps</code>, <code>uses</code>, and <code>run</code> have fixed meanings in their allowed positions.</td></tr>
                        <tr><td>Event name</td><td>GitHub Actions</td><td><code>push</code> and <code>pull_request</code> select supported events under <code>on</code>.</td></tr>
                        <tr><td>Job identifier</td><td>The workflow author</td><td>The key immediately under <code>jobs</code>, such as <code>build</code>, names a job. It can be another valid identifier.</td></tr>
                        <tr><td>Display label</td><td>The workflow author</td><td>Values of <code>name</code>, such as <code>Node CI</code>, label a workflow or step. They do not execute commands.</td></tr>
                        <tr><td>Action input</td><td>The selected action</td><td><code>node-version</code> is an input to <code>actions/setup-node</code>. It is not a general workflow key.</td></tr>
                        <tr><td>Command and its arguments</td><td>The program being called</td><td>In <code>run: npm ci</code>, <code>run</code> is the workflow key. The shell executes <code>npm ci</code>.</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="actions-node-ci">
            <h2 id="actions-node-ci" className="SectionTitle">A Node.js CI workflow, line by line</h2>
            <LearningNoteExampleBlock example={{
                title: 'Build a Node.js project with .github/workflows/ci.yml',
                language: 'text',
                description: [
                    <>The goal is to install dependencies and build an existing Node.js project whenever selected GitHub events occur.</>,
                    <>The repository has Actions enabled, a branch named <code>main</code>, and a project compatible with Node.js <code>24</code>. The project files are in the repository root.</>,
                    <>The repository includes <code>package.json</code>, <code>package-lock.json</code>, and the application source. The <code>scripts</code> object in <code>package.json</code> defines a working <code>build</code> command. The npm prerequisite explains scripts and lockfiles.</>,
                    <>The file is saved at <code>.github/workflows/ci.yml</code> relative to the repository root and committed to Git. The directory is required; <code>ci</code> is a chosen filename. Both <code>.yml</code> and <code>.yaml</code> are supported extensions.</>,
                    <>The workflow has one job with four steps: get the source files, prepare Node.js, install packages, and build. The explanation below follows every nonblank line in file order.</>,
                ],
                code: nodeWorkflow,
                explanation: [
                    <><code># .github/workflows/ci.yml</code> is a comment identifying the file’s location. It does not create that directory or file. The actual location in the repository is what GitHub uses.</>,
                    <><code>name: Node CI</code> uses the fixed key <code>name</code> to give the workflow the display label <code>Node CI</code>. That label appears in GitHub’s Actions tab and can be changed.</>,
                    <><code>on:</code> is the fixed key for the events that trigger this workflow. The indented lines beneath it describe two separate triggers; they do not run as steps.</>,
                    <><code>push:</code> is GitHub’s event name for pushed changes. It is nested under <code>on</code>. The next line limits which branch pushes match.</>,
                    <><code>branches: [main]</code> filters that <code>push</code> trigger. <code>branches</code> is a fixed filter key; <code>main</code> is the repository’s chosen branch name. A push to a different branch does not match this trigger.</>,
                    <><code>pull_request:</code> is the second trigger and is aligned with <code>push</code>. No indented settings follow it, so GitHub uses the event’s defaults. It runs when a pull request is opened, reopened, or its source branch receives new commits. The <code>main</code> filter belongs only to <code>push</code>; it does not limit this pull request trigger.</>,
                    <><code>permissions:</code> returns to the left margin, so it is a workflow setting rather than part of <code>on</code>. It controls the permissions of <code>GITHUB_TOKEN</code>, the temporary GitHub access credential supplied to a job.</>,
                    <><code>contents: read</code> grants that token read access to repository contents, which checkout uses to retrieve source. <code>contents</code> is a permission category; <code>read</code> is a supported permission value. Other configurable permissions are set to <code>none</code> when they are not listed. Reading code does not require write access.</>,
                    <><code>jobs:</code> begins the workflow’s job definitions. It is a fixed GitHub Actions key at the top level.</>,
                    <><code>build:</code> defines one job with the author-chosen identifier <code>build</code>. It is not a reserved job type and does not automatically build anything. Its steps define the actual work.</>,
                    <><code>runs-on: ubuntu-latest</code> selects a GitHub-hosted Ubuntu Linux runner for this job. <code>runs-on</code> is the fixed key; <code>ubuntu-latest</code> is a supported runner label. GitHub can update the Ubuntu image behind that label. The commands execute on that machine.</>,
                    <><code>timeout-minutes: 10</code> sets a ten-minute execution limit for the job. <code>timeout-minutes</code> is the fixed key and <code>10</code> is an author-chosen number. GitHub cancels the job if it exceeds that limit.</>,
                    <><code>steps:</code> starts the ordered list of work inside <code>build</code>. The steps use the same runner and working directory, so later steps can use files created by earlier ones.</>,
                    <><code>- name: Get source code</code> starts the first step. The dash starts a list item, <code>name</code> is a fixed step key, and <code>Get source code</code> is its chosen display label. The runner needs the project files before it can build them.</>,
                    <><code>uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1</code> calls a reusable action. <code>uses</code> is the fixed key. <code>actions</code> is the GitHub owner, <code>checkout</code> is the action repository, and the text after <code>@</code> is the selected Git commit SHA: an identifier for a specific version of the action code. This action retrieves the application source into the runner’s workspace.</>,
                    <>The trailing <code># v7.0.1</code> on that same line is a release label for the reader. The SHA selects the code; changing only the comment does not update the action. A full SHA keeps the selected action code fixed until the workflow is edited.</>,
                    <><code>with:</code> introduces inputs for the checkout action in the same step. <code>with</code> is a fixed workflow key, but the input names below it come from checkout’s documentation.</>,
                    <><code>persist-credentials: false</code> is checkout’s input. It prevents checkout from leaving its authentication credentials configured for later Git commands. <code>false</code> is a Boolean value. Checkout can still authenticate while retrieving the source.</>,
                    <><code>- name: Set up Node.js</code> starts the second step. Its label is chosen by the author. It runs after checkout and prepares the runtime needed by the following npm commands.</>,
                    <><code>uses: actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1 # v7.1.0</code> calls the setup-node action at another fixed commit. It makes the requested Node.js version and its bundled npm available to later steps. This selects the project’s runtime even if the runner already has a different version installed. <code>actions/setup-node</code> names the action, not the application’s npm package.</>,
                    <>The trailing <code># v7.1.0</code> is a comment identifying that action release. This version of the setup action is separate from the Node.js version it prepares.</>,
                    <><code>with:</code> now belongs to setup-node because it is inside the second step. Its inputs configure setup-node, not checkout.</>,
                    <><code>node-version: '24'</code> requests a Node.js version in the <code>24</code> major release line. <code>node-version</code> is a setup-node input and <code>'24'</code> is a string value. It does not fix an exact patch version; the resolved version appears in the setup log.</>,
                    <><code>package-manager-cache: false</code> is another setup-node input. It disables automatic package-manager caching for this example. It does not skip package installation; <code>npm ci</code> still runs in the next step.</>,
                    <><code>- name: Install dependencies</code> starts the third step with another chosen display label. This step uses a shell command rather than a reusable action.</>,
                    <><code>run: npm ci</code> tells the runner’s shell to execute npm’s clean-install command in the repository root. It installs dependencies using <code>package-lock.json</code> and fails if that lockfile disagrees with <code>package.json</code>. <code>ci</code> here is an npm command, not a workflow identifier.</>,
                    <><code>- name: Build</code> starts the fourth step. <code>Build</code> is just its display label. Under normal success conditions, it starts only after dependency installation succeeds.</>,
                    <><code>run: npm run build</code> executes the project’s <code>build</code> script from <code>package.json</code>. The first <code>run</code> is a workflow key; the second is an npm subcommand. <code>build</code> here is the script name, independent of the job identifier <code>build</code> above.</>,
                    <>The runner performs checkout → Node.js setup → dependency installation → build. There is no <code>needs</code> setting because these are steps in one job, not separate jobs.</>,
                    <>A push to <code>main</code> starts a run. A push to another branch starts a run through <code>pull_request</code> if it updates an open pull request. A push that matches both events can create two runs. Fork contributions can require approval under repository policy.</>,
                    <>For a pull request, checkout normally retrieves GitHub’s test merge of the proposed changes with the target branch. This checks their combination before the pull request is merged.</>,
                    <>Expected result: the job succeeds when all four steps succeed. A nonzero command exit code signals failure; later ordinary steps are skipped. The ten-minute limit can cancel a long-running job.</>,
                    <>The build command determines its output directory and logs. This workflow has no separate test command, artifact upload, publication, or deployment step. Generated files remain on the temporary runner and are not retained as downloadable build output.</>,
                    <>If this project defines a suitable test script, an additional step with <code>run: npm test</code> can run it before the build. Calling a workflow CI does not make tests run automatically.</>,
                    <>The workflow fixes the action commits, but <code>ubuntu-latest</code> and Node.js <code>'24'</code> can resolve to newer images or patch releases. A fixed action commit does not freeze the whole build environment.</>,
                ],
            }} />
        </section>

        <section className="Article__section" aria-labelledby="actions-debugging">
            <h2 id="actions-debugging" className="SectionTitle">Following a run and reading failures</h2>
            <ul className="Article__notes">
                <li>The repository’s <strong>Actions</strong> tab lists workflow runs. A run shows its event, branch, commit, and jobs. Selecting a job opens its steps and logs.</li>
                <li>A queued job is waiting for a runner. An in-progress job is executing. A skipped step did not execute; it is not a passed check.</li>
                <li>A failed step’s log shows the command or action that failed and its error. The first failure usually explains why later ordinary steps did not run.</li>
                <li>An npm installation error can mean a missing lockfile, inconsistent dependency files, or an unavailable package. A missing build script is a project configuration error. These require different fixes.</li>
                <li>If a command works locally, compare the Node.js version, npm version, working directory, environment variables, and committed files with the runner. Local files absent from Git are absent from checkout.</li>
                <li>If no run appears, check the workflow’s file location, YAML validity, event filters, and whether Actions is enabled or requires approval.</li>
                <li>A successful run means its configured work succeeded. Whether tests ran or an application was deployed depends on the steps that were actually configured.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="actions-jobs-files">
            <h2 id="actions-jobs-files" className="SectionTitle">More jobs, artifacts, and caches</h2>
            <ul className="Article__notes">
                <li>Steps divide work on one runner. Separate jobs allow different runner types or independent work. Jobs without dependencies can run in parallel when runners are available.</li>
                <li>The fixed job key <code>needs</code> names jobs that must finish successfully first. In another job, <code>needs: build</code> refers to the author-chosen job identifier <code>build</code>. A failed or skipped dependency normally skips the dependent job.</li>
                <li>Each GitHub-hosted Ubuntu job gets a fresh runner. Waiting for another job does not copy its files or installed dependencies.</li>
                <li>An artifact is a saved output, such as a build package or report. An upload step retains it after the job ends. A download step retrieves it for another job.</li>
                <li>A cache stores reusable files to reduce repeated work. It can be missing or outdated; the job must still work without it. It serves a different purpose from retaining a build artifact.</li>
                <li>For npm, the setup-node input <code>cache: npm</code> enables caching of downloaded package data. It does not cache <code>node_modules</code> or replace <code>npm ci</code>.</li>
                <li>Secrets do not belong in artifacts or caches. Files produced by untrusted code need review before a privileged job uses them.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="actions-security">
            <h2 id="actions-security" className="SectionTitle">Credentials and deployment access</h2>
            <ul className="Article__notes">
                <li>A credential grants access to another system. GitHub’s job token grants GitHub access; a deployment may need separate cloud or server access. Each job should receive only the access its work requires.</li>
                <li>GitHub secrets store sensitive values supplied to workflows, such as deployment credentials. They are configured in GitHub rather than committed in source files. Printing a secret can expose it; log masking does not protect every transformed value.</li>
                <li>Dependency installation and builds can execute code from the proposed change. Pull request checks should not receive production credentials or access to privileged self-hosted machines.</li>
                <li><code>pull_request_target</code> and <code>workflow_run</code> are other trigger names with different execution and access rules. They are not interchangeable with <code>pull_request</code>. Executing untrusted checked-out code in a privileged run can expose credentials.</li>
                <li>OpenID Connect (OIDC) is an identity mechanism for cloud deployment. A cloud provider can trust a specific GitHub job identity and issue temporary credentials. The trust policy must restrict the intended repository, branch, or environment.</li>
                <li>Reusable actions execute code too. Review their source and workflow changes. A full commit SHA selects fixed code; a release tag can move. Pinned commits still need reviewed updates for later fixes.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="actions-references">
            <h2 id="actions-references" className="SectionTitle">References</h2>
            <ul className="Article__notes">
                <li><a className="Link" href="https://docs.github.com/en/actions/get-started/understand-github-actions" target="_blank" rel="noreferrer">GitHub Actions concepts</a> and <a className="Link" href="https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax" target="_blank" rel="noreferrer">workflow syntax</a>.</li>
                <li><a className="Link" href="https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows" target="_blank" rel="noreferrer">Workflow events and pull request triggers</a>.</li>
                <li><a className="Link" href="https://github.com/actions/checkout/releases/tag/v7.0.1" target="_blank" rel="noreferrer">checkout v7.0.1</a> and <a className="Link" href="https://github.com/actions/setup-node/releases/tag/v7.1.0" target="_blank" rel="noreferrer">setup-node v7.1.0</a>: the releases pinned in the example.</li>
                <li><a className="Link" href="https://github.com/actions/checkout/tree/3d3c42e5aac5ba805825da76410c181273ba90b1" target="_blank" rel="noreferrer">Checkout behavior and inputs</a> and <a className="Link" href="https://github.com/actions/setup-node/tree/949feb2413d6458794dcd2491c4babbbce0c15c1" target="_blank" rel="noreferrer">Node.js setup and inputs</a>.</li>
                <li><a className="Link" href="https://docs.npmjs.com/cli/v11/commands/npm-ci/" target="_blank" rel="noreferrer">npm ci</a> and <a className="Link" href="https://docs.npmjs.com/cli/v11/commands/npm-run/" target="_blank" rel="noreferrer">npm run</a>.</li>
                <li><a className="Link" href="https://docs.github.com/en/actions/concepts/workflows-and-actions/dependency-caching" target="_blank" rel="noreferrer">Artifacts and caches</a> and <a className="Link" href="https://github.com/actions/setup-node#caching-global-packages-data" target="_blank" rel="noreferrer">npm caching in setup-node</a>.</li>
                <li><a className="Link" href="https://docs.github.com/en/actions/reference/security/secure-use" target="_blank" rel="noreferrer">Secure workflow use</a> and <a className="Link" href="https://docs.github.com/en/actions/concepts/security/openid-connect" target="_blank" rel="noreferrer">OpenID Connect</a>.</li>
                <li><a className="Link" href="https://docs.github.com/en/actions/how-tos/monitor-workflows/use-workflow-run-logs" target="_blank" rel="noreferrer">Workflow run logs</a>.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default GitHubActions;
