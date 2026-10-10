import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { CICD_NOTES_ROUTE, JENKINS_ROUTE } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'jenkins-parts', title: 'Controller, agent, and build' },
    { id: 'jenkins-setup', title: 'Repository and agent setup' },
    { id: 'jenkinsfile', title: 'A small Jenkinsfile' },
    { id: 'jenkins-failures', title: 'Failures and reports' },
    { id: 'jenkins-credentials', title: 'Credentials and pull requests' },
    { id: 'jenkins-references', title: 'Official references' },
];

const jenkinsfile = [
    'pipeline {',
    "    agent { label 'linux-node' }",
    '',
    '    stages {',
    "        stage('Install') {",
    '            steps {',
    "                sh 'npm ci'",
    '            }',
    '        }',
    "        stage('Build') {",
    '            steps {',
    "                sh 'npm run build'",
    "                archiveArtifacts artifacts: 'dist/**'",
    '            }',
    '        }',
    '    }',
    '',
    '    post {',
    "        failure { echo 'Build failed. Check Console Output.' }",
    "        always { echo 'Pipeline finished.' }",
    '    }',
    '}',
].join('\n');

const Jenkins = () => (
    <ArticleLayout
        title="Jenkins"
        route={JENKINS_ROUTE}
        sections={sections}
        backRoute={CICD_NOTES_ROUTE}
        backLabel="Back to CI/CD notes"
    >
        <section className="Article__section">
            <p>Jenkins runs build, test, and deployment commands. A Jenkinsfile stores those commands in the repository so changes can be reviewed with the application code.</p>
        </section>

        <section className="Article__section" aria-labelledby="jenkins-parts">
            <h2 id="jenkins-parts" className="SectionTitle">Controller, agent, and build</h2>
            <ul className="Article__notes">
                <li>The <strong>controller</strong> manages configuration, the build queue, and results.</li>
                <li>An <strong>agent</strong> provides a machine and workspace for build commands. An executor is a slot that runs work on that machine.</li>
                <li>A <strong>job</strong> defines work. A <strong>build</strong> is one run of that job.</li>
                <li>A <strong>trigger</strong> requests a run. Examples include a manual action, a schedule, or a repository webhook. A webhook sends an event from the repository service to Jenkins.</li>
                <li>A trigger does not supply a worker. The build can wait in the queue until a matching agent has a free executor.</li>
                <li>Run application builds on agents. Keep the controller's built-in node out of build execution to protect its files.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="jenkins-setup">
            <h2 id="jenkins-setup" className="SectionTitle">Repository and agent setup</h2>
            <ul className="Article__notes">
                <li>Install the Pipeline plugins, including Pipeline: Declarative, and the Git plugin for a Git repository.</li>
                <li>Create a Pipeline job with <strong>Pipeline script from SCM</strong>. SCM means source control. Set the repository, branch, and script path to <code>Jenkinsfile</code>.</li>
                <li>The example needs a Linux agent labelled <code>linux-node</code> with Git, Node.js, and npm available. A label selects an agent. It does not install tools.</li>
                <li>The repository needs <code>package-lock.json</code> and a build script that writes files to <code>dist</code>. Use a Node.js version supported by the application.</li>
                <li>A Multibranch Pipeline discovers branches containing a Jenkinsfile. GitHub pull-request discovery needs GitHub Branch Source and configured discovery rules. Configure webhooks or scanning to detect new changes.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="jenkinsfile">
            <h2 id="jenkinsfile" className="SectionTitle">A small Jenkinsfile</h2>
            <CodeBlock language="text">{jenkinsfile}</CodeBlock>
            <ul className="Article__notes">
                <li>Declarative Pipeline uses a <code>pipeline</code> block. A <code>stage</code> names a phase. Its <code>steps</code> list the commands.</li>
                <li>With the SCM setup above, Declarative Pipeline checks out the source into the agent's workspace automatically.</li>
                <li><code>npm ci</code> installs dependencies from the lockfile. <code>npm run build</code> runs the application's build script.</li>
                <li>Expected result: successful Install and Build stages, archived <code>dist</code> files on the build page, and a “Pipeline finished” message. Archiving saves files for retrieval. It does not deploy them.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="jenkins-failures">
            <h2 id="jenkins-failures" className="SectionTitle">Failures and reports</h2>
            <ul className="Article__notes">
                <li>By default, a nonzero exit code from <code>sh</code> fails the run and skips later stages. Avoid hiding failures with <code>|| true</code>.</li>
                <li><code>post</code> runs actions after execution. <code>failure</code> handles failed runs. <code>always</code> runs regardless of the result.</li>
                <li>Check the first failing command in Console Output. For a queued build, check the agent label and availability. For checkout errors, check repository access.</li>
                <li>Tests must produce report files before Jenkins can publish them. The <code>junit</code> step needs the JUnit plugin and a matching XML path. A successful build alone does not prove tests ran.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="jenkins-credentials">
            <h2 id="jenkins-credentials" className="SectionTitle">Credentials and pull requests</h2>
            <ul className="Article__notes">
                <li>Store secrets in Jenkins credentials. Reference their IDs instead of putting secret values in the Jenkinsfile.</li>
                <li><code>withCredentials</code>, from Credentials Binding, exposes a credential only inside its block. Use single-quoted Groovy shell strings so the shell expands secret environment variables.</li>
                <li>Give credentials only the permissions the job needs. Log masking reduces accidental exposure. It does not stop build code from stealing a secret.</li>
                <li>Run untrusted pull requests without deployment secrets on isolated agents. Do not share their execution environment with jobs that use secrets.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="jenkins-references">
            <h2 id="jenkins-references" className="SectionTitle">Official references</h2>
            <ul className="Article__notes">
                <li><a className="Link" href="https://www.jenkins.io/doc/book/glossary/">Jenkins terms</a> and <a className="Link" href="https://www.jenkins.io/doc/book/security/controller-isolation/">controller isolation</a>.</li>
                <li><a className="Link" href="https://www.jenkins.io/doc/book/pipeline/jenkinsfile/">Using a Jenkinsfile</a> and <a className="Link" href="https://www.jenkins.io/doc/book/pipeline/syntax/">Declarative Pipeline syntax</a>.</li>
                <li><a className="Link" href="https://www.jenkins.io/doc/book/pipeline/multibranch/">Branches and pull requests</a> and <a className="Link" href="https://www.jenkins.io/doc/pipeline/steps/credentials-binding/">Credentials Binding</a>.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default Jenkins;
