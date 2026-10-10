import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { CICD_NOTES_ROUTE, GITLAB_CICD_ROUTE } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'gitlab-parts', title: 'Pipelines, jobs, and runners' },
    { id: 'gitlab-example', title: 'A Node application pipeline' },
    { id: 'gitlab-order', title: 'Stages, dependencies, and saved files' },
    { id: 'gitlab-release', title: 'Deployment and credentials' },
    { id: 'gitlab-debug', title: 'Read a failed pipeline' },
];

const pipeline = `workflow:
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '$CI_PIPELINE_SOURCE == "push" && $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'

default:
  image: node:24-bookworm-slim

stages: [build, verify]

build_app:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths: [dist/]
    expire_in: 7 days

verify_package:
  stage: verify
  needs:
    - job: build_app
      artifacts: true
  script:
    - test -s dist/index.html`;

const GitLabCICD = () => (
    <ArticleLayout title="GitLab CI/CD" route={GITLAB_CICD_ROUTE} sections={sections} backRoute={CICD_NOTES_ROUTE} backLabel="Back to CI/CD notes">
        <section className="Article__section" aria-labelledby="gitlab-parts">
            <h2 id="gitlab-parts" className="SectionTitle">Pipelines, jobs, and runners</h2>
            <ul className="Article__notes">
                <li>GitLab reads <code>.gitlab-ci.yml</code> from the repository to create a pipeline.</li>
                <li>A job defines commands in <code>script</code>. A GitLab Runner executes those commands.</li>
                <li>An executor determines how a runner runs a job. Docker executors use containers. Shell executors run directly on the worker.</li>
                <li>The <code>image</code> keyword needs an executor that supports container images. A shell executor does not use it.</li>
                <li>Runner tags select eligible workers. A job stays pending if no matching runner is available.</li>
            </ul>
            <p>Reference: <a className="Link" href="https://docs.gitlab.com/ci/runners/" target="_blank" rel="noreferrer">GitLab runners</a>.</p>
        </section>

        <section className="Article__section" aria-labelledby="gitlab-example">
            <h2 id="gitlab-example" className="SectionTitle">A Node application pipeline</h2>
            <ul className="Article__notes">
                <li>This example needs a container-capable runner, a committed <code>package-lock.json</code>, and a <code>build</code> script that creates <code>dist/index.html</code>.</li>
                <li><code>workflow.rules</code> allows merge-request pipelines and pushes to the default branch. Other events create no pipeline here.</li>
                <li><code>npm ci</code> installs locked dependencies. Add the project’s test command when it defines one.</li>
                <li>The image tag is readable but movable. Pin a reviewed image digest when an exact build environment is required.</li>
            </ul>
            <CodeBlock language="text">{pipeline}</CodeBlock>
            <ul className="Article__notes">
                <li><strong>Expected result:</strong> the build saves <code>dist/</code>. The second job downloads it and succeeds if <code>dist/index.html</code> exists and is nonempty.</li>
                <li>The file check verifies package structure. It does not test application behavior or deploy a site.</li>
            </ul>
            <p>Reference: <a className="Link" href="https://docs.gitlab.com/ci/jobs/job_rules/" target="_blank" rel="noreferrer">pipeline and job rules</a>.</p>
        </section>

        <section className="Article__section" aria-labelledby="gitlab-order">
            <h2 id="gitlab-order" className="SectionTitle">Stages, dependencies, and saved files</h2>
            <ul className="Article__notes">
                <li>Normally, jobs in one stage can run in parallel. Later stages wait for earlier stages to succeed.</li>
                <li><code>needs</code> lists specific prerequisites. A job can start when those jobs finish, without waiting for every earlier-stage job.</li>
                <li><code>artifacts: true</code> under a needed job downloads its saved files. Each job has its own workspace.</li>
                <li>Artifacts preserve outputs. A cache speeds repeated work and may be missing.</li>
                <li><code>expire_in</code> sets artifact retention. Instance settings can keep artifacts from the latest successful pipeline longer.</li>
            </ul>
            <p>References: <a className="Link" href="https://docs.gitlab.com/ci/yaml/" target="_blank" rel="noreferrer">YAML reference</a> and <a className="Link" href="https://docs.gitlab.com/ci/jobs/job_artifacts/" target="_blank" rel="noreferrer">artifact retention</a>.</p>
        </section>

        <section className="Article__section" aria-labelledby="gitlab-release">
            <h2 id="gitlab-release" className="SectionTitle">Deployment and credentials</h2>
            <ul className="Article__notes">
                <li>A deploy job needs a real deployment command and an environment such as <code>production</code>. An environment label alone deploys nothing.</li>
                <li>Use <code>when: manual</code> with <code>allow_failure: false</code> for a blocking manual job. Restrict it to reviewed release code.</li>
                <li>Store sensitive values in CI/CD variables or an external secret store. Mask values and protect access where supported.</li>
                <li>Masking limits accidental log exposure. Malicious job code can still read a secret it receives.</li>
                <li>Review merge-request changes to pipeline files before running them with privileged runners or protected variables.</li>
            </ul>
            <p>Reference: <a className="Link" href="https://docs.gitlab.com/ci/variables/" target="_blank" rel="noreferrer">CI/CD variable security</a>.</p>
        </section>

        <section className="Article__section" aria-labelledby="gitlab-debug">
            <h2 id="gitlab-debug" className="SectionTitle">Read a failed pipeline</h2>
            <ul className="Article__notes">
                <li>No pipeline: inspect <code>workflow.rules</code> and the event type. Invalid YAML: use GitLab’s CI Lint.</li>
                <li>Pending job: check runner availability and tags. Failed job: read the first failing command in its log.</li>
                <li>Missing files: check the artifact path, download dependency, and expiration.</li>
                <li>Check the commit and job list. Allowed failures and skipped jobs can appear in a pipeline that is considered successful.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default GitLabCICD;
