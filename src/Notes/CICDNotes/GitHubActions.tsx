import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { CICD_NOTES_ROUTE, GITHUB_ACTIONS_ROUTE } from '../../routing/routes';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';
import ArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'actions-parts', title: 'Repositories, workflows, and runners' },
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
                <li>A workflow defines which automated tasks run and which events, such as a push or pull request, start them. GitHub reads workflow files from the repository’s <code>.github/workflows/</code> directory.</li>
                <li>A workflow run is one execution of a workflow. A later matching event creates another run.</li>
                <li>A workflow contains jobs. Each job runs on a runner: a machine that executes the work. A GitHub-hosted runner is provided by GitHub; a self-hosted runner is managed by you or your organization.</li>
                <li>A job contains steps. A step either runs a shell command or calls an action, which is reusable automation written by someone else. A shell is the program that reads command text and starts programs such as npm.</li>
                <li>GitHub receives an event, selects matching workflows, and schedules their jobs. A runner executes the steps and sends status and logs back to GitHub.</li>
            </ul>
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
                    <>The workflow has one job with four steps. The explanation follows the file from top to bottom.</>,
                ],
                code: nodeWorkflow,
                explanation: [
                    <><code># .github/workflows/ci.yml</code> identifies the file’s location. A <code>#</code> starts a YAML comment, which GitHub ignores. The comment does not create the file; the file must actually be saved at this path. Blank lines only make the file easier to read.</>,
                    <><code>name: Node CI</code> gives the workflow its display label in GitHub’s Actions tab. The colon separates the key <code>name</code> from its value <code>Node CI</code>. GitHub defines the key; the author chooses the label.</>,
                    <><code>on:</code> introduces the events that start the workflow. <code>on</code> is a fixed GitHub Actions key. The indented lines below it belong to this setting. YAML uses spaces for indentation; tabs are not allowed for indentation.</>,
                    <><code>push:</code> selects GitHub’s push event. Its indentation places it under <code>on</code>. The next line is indented further because it configures this push trigger.</>,
                    <><code>branches: [main]</code> limits the push trigger to the <code>main</code> branch. <code>branches</code> is GitHub’s filter key; <code>main</code> is the branch name chosen for this project. Square brackets form a list, here containing one branch name.</>,
                    <><code>pull_request:</code> selects a second event. It aligns with <code>push</code>, so both belong to <code>on</code>. The <code>branches</code> filter above belongs only to <code>push</code>. No settings follow <code>pull_request</code>, so GitHub uses its defaults: run when a pull request is opened, reopened, or updated with new commits.</>,
                    <><code>permissions:</code> starts a separate workflow setting at the left margin. It controls <code>GITHUB_TOKEN</code>, the temporary credential GitHub supplies to a job for GitHub access.</>,
                    <><code>contents: read</code> allows that token to read repository contents, which checkout needs to retrieve the source files. GitHub defines both the permission category <code>contents</code> and the access level <code>read</code>. Other configurable permissions omitted from this list become <code>none</code>.</>,
                    <><code>jobs:</code> introduces the work to execute. <code>jobs</code> is a fixed GitHub Actions key. The job definitions are indented beneath it.</>,
                    <><code>build:</code> is the author-chosen identifier for this job. Unlike <code>jobs</code>, it is not a fixed keyword. Another valid identifier could be used. Calling the job <code>build</code> does not run a build; the steps below define its work.</>,
                    <><code>runs-on: ubuntu-latest</code> selects the machine for the job. <code>runs-on</code> is GitHub’s key and <code>ubuntu-latest</code> is a supported runner label. GitHub provides a fresh Ubuntu Linux machine for this job. The image behind this label can change over time.</>,
                    <><code>timeout-minutes: 10</code> limits the job to ten minutes of execution. <code>timeout-minutes</code> is GitHub’s key; <code>10</code> is a number chosen by the author. Exceeding the limit cancels the job.</>,
                    <><code>steps:</code> introduces an ordered list of tasks inside the job. These steps run on the same machine and share its workspace, so a later step can use files created by an earlier step.</>,
                    <><code>- name: Get source code</code> begins the first step. The dash starts a list item. <code>name</code> gives this step a display label, chosen by the author. The following <code>uses</code> and <code>with</code> keys are indented under this item, so they configure the same step.</>,
                    <><code>uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1</code> calls GitHub’s ready-made checkout action to retrieve the application source into the runner’s workspace. <code>uses</code> is GitHub’s key for calling an action.</>,
                    <><strong>The SHA after <code>actions/checkout@</code> selects the checkout tool’s code.</strong> This reference is configured once and reused on later runs. It does not need to change when application code changes.</>,
                    <><code>actions/checkout</code> identifies the action’s own GitHub repository: <code>actions</code> is the organization and <code>checkout</code> is the repository containing the reusable automation. GitHub loads the action code from there. The action then retrieves the application repository containing this workflow into the workspace.</>,
                    <><strong>The application commit to build comes from the event that started the run.</strong> This example supplies no checkout <code>ref</code> input, so checkout uses that event’s default reference. A push to <code>main</code> checks out the pushed revision. A pull request normally checks out GitHub’s test merge of the proposed changes with the target branch.</>,
                    <>For example, a first push to <code>main</code> starts a run that uses the pinned checkout tool to retrieve the first application revision. A second push starts another run using the same checkout tool to retrieve the second application revision. The workflow file and action SHA can stay unchanged across hundreds of application commits. Each matching event automatically repeats the configured steps for the relevant application code.</>,
                    <>Using GitHub Actions does not require personally writing or copying these references. An existing workflow may already contain them. Choosing a GitHub workflow template can prefill them, and a team can maintain a shared workflow that contains the checkout step. An application developer can push code and use the resulting runs without editing the workflow.</>,
                    <>The action reference can use a readable tag such as <code>actions/checkout@v7</code> or a full commit SHA as shown here. A workflow using a tag can run without its author ever looking up a SHA. For a tag reference, GitHub resolves the tag to the action commit when running it; the workflow text keeps the tag.</>,
                    <>A tag is a readable name pointing to a Git commit. Maintainers can move <code>v7</code> to newer releases in version 7, so the same workflow text can later run newer action code. A specific release tag such as <code>v7.0.1</code> names one release, but Git tags can also be moved.</>,
                    <>A commit records a version of the action’s source files. Git generates its SHA identifier from the commit’s contents and metadata. The full SHA here is the 40-character value <code>3d3c42e5aac5ba805825da76410c181273ba90b1</code>. The workflow author does not invent or memorize it.</>,
                    <>SHA pinning means writing that full commit identifier after <code>@</code> to select fixed action code. Moving a tag will not change the commit this workflow requests. This makes action updates explicit and limits the risk of a tag being redirected to different code. The selected action still needs to be trusted and reviewed.</>,
                    <>One way to configure this pin manually is to open the official <a className="Link" href="https://github.com/actions/checkout/releases/tag/v7.0.1" target="_blank" rel="noreferrer">checkout v7.0.1 release</a>, follow its commit link, and use <strong>Copy full SHA</strong> on the <a className="Link" href="https://github.com/actions/checkout/commit/3d3c42e5aac5ba805825da76410c181273ba90b1" target="_blank" rel="noreferrer">commit page</a>. The page may display a shortened identifier such as <code>3d3c42e</code>; the workflow uses the full value. Confirm the commit is in the action’s official repository. This is action-version configuration, performed when selecting or upgrading the tool.</>,
                    <><code># v7.0.1</code> records which release the copied SHA represents. GitHub ignores this comment and executes the commit after <code>@</code>. Changing only the comment does not update the action.</>,
                    <>An upgrade to checkout changes its action reference. A maintainer can update the SHA and release comment manually, or configured Dependabot version updates can propose an update in a pull request. Review the change and its workflow results before merging. A pin stays on the selected action revision until updated, so it does not automatically receive later fixes.</>,
                    <><code>with:</code> supplies inputs to the action named by <code>uses</code>. GitHub defines <code>with</code>, while the selected action defines which input names are accepted beneath it.</>,
                    <><code>persist-credentials: false</code> is an input defined by checkout. It prevents checkout from retaining authentication for later Git commands. The unquoted value <code>false</code> is a Boolean meaning disabled. Checkout can still authenticate while retrieving the source.</>,
                    <><code>- name: Set up Node.js</code> starts the second step. Its dash is aligned with the first step’s dash, making it another item in <code>steps</code>. The label describes its purpose; the next line selects the action that performs the setup.</>,
                    <><code>uses: actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1 # v7.1.0</code> calls the setup-node action using the same owner/repository and commit notation. This action prepares the requested Node.js version and its bundled npm for later steps. The comment names the setup action’s release, separate from the Node.js version it installs.</>,
                    <><code>with:</code> now supplies inputs to setup-node because it is inside the second step. The checkout inputs from the previous step do not carry over.</>,
                    <><code>node-version: '24'</code> is a setup-node input requesting Node.js major version <code>24</code>. The quotes make <code>'24'</code> a string. It selects a version in that release line rather than a fixed patch version. The setup log shows the resolved version.</>,
                    <><code>package-manager-cache: false</code> is another setup-node input. A package cache stores downloaded package data for reuse in later runs. This setting disables automatic package-manager caching; the following step still installs dependencies.</>,
                    <><code>- name: Install dependencies</code> starts the third step. The label is chosen by the author. This step executes a command directly rather than calling a reusable action.</>,
                    <><code>run: npm ci</code> uses GitHub’s <code>run</code> key to send a command to the runner’s shell. <code>npm</code> is the program and <code>ci</code> is its clean-install command. It installs dependencies from <code>package-lock.json</code> and fails if the lockfile disagrees with <code>package.json</code>. The command runs in the checked-out repository root.</>,
                    <><code>- name: Build</code> starts the fourth step. <code>Build</code> is its display label. It runs after the dependency installation step succeeds.</>,
                    <><code>run: npm run build</code> executes the <code>build</code> script defined in <code>package.json</code>. The first <code>run</code> is a GitHub workflow key; the second is an npm subcommand. The final <code>build</code> is the project’s script name. It is independent of the job identifier <code>build</code> above.</>,
                    <>A matching event starts a workflow run. The runner gets the source, prepares Node.js, installs dependencies, and builds the project in that order.</>,
                    <>The two event triggers work independently. A push to <code>main</code> matches the push trigger. Updating an open pull request matches the pull request trigger. One push can match both and create two runs. Fork contributions can require approval under repository policy.</>,
                    <>The job succeeds when all four steps succeed. A nonzero command exit code signals failure, and later ordinary steps are skipped. The build script determines the generated files and logs.</>,
                    <>This workflow retains no downloadable build output because it has no artifact upload step. It also has no separate test, publication, or deployment step. If the project defines a suitable test script, another step with <code>run: npm test</code> can run it before the build.</>,
                    <>Pinning the action fixes its selected source revision. The runner image and Node.js patch version can still change because <code>ubuntu-latest</code> and <code>'24'</code> allow updates.</>,
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
                <li><a className="Link" href="https://docs.github.com/en/actions/how-tos/write-workflows/use-workflow-templates" target="_blank" rel="noreferrer">Workflow templates</a> and <a className="Link" href="https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-version-updates" target="_blank" rel="noreferrer">Dependabot version updates</a>.</li>
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
