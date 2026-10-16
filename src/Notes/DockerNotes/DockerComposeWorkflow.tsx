import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { DOCKER_COMPOSE_ROUTE, DOCKER_NOTES_ROUTE } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';

const sections: TocEntry[] = [
    { id: 'compose-model', title: 'Configuration in Compose' },
    { id: 'compose-file', title: 'Services in compose.yaml' },
    { id: 'compose-commands', title: 'Project startup and updates' },
    { id: 'compose-debugging', title: 'Failures at different layers' },
    { id: 'compose-cleanup', title: 'Project cleanup and retained data' },
];

const DockerComposeWorkflow = () => (
    <ArticleLayout title="4. Project configuration with Docker Compose" route={DOCKER_COMPOSE_ROUTE} sections={sections}
        backRoute={DOCKER_NOTES_ROUTE} backLabel="Back to Docker lessons">
        <section className="Article__section" aria-labelledby="compose-model">
            <h2 id="compose-model" className="SectionTitle">1. Compose stores service configuration</h2>
            <ul className="Article__notes">
                <li>Chapter 3 connected our website to a client and mounted local files.</li>
                <li>Those options become difficult to remember as an application grows.</li>
                <li>Docker Compose stores the desired service configuration in a YAML file and creates the containers and networks from it.</li>
                <li>A service describes how to run one application component.</li>
                <li>An image supplies its files.</li>
                <li>A container is one instance running with that configuration.</li>
                <li>Compose can manage one service or several related services together.</li>
                <li>The Dockerfile still builds our image.</li>
                <li>Compose adds the runtime choices: which port to publish, which directory to mount, and which services share a network.</li>
                <li>It does not replace the Dockerfile.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="compose-file">
            <h2 id="compose-file" className="SectionTitle">2. Services describe the website and client</h2>
            <ul className="Article__notes">
                <li>Compose gives services a shared default network, and services can use each other's service names on it.</li>
            </ul>
            <LearningNoteExampleBlock example={{
                title: "compose.yaml in the existing project",
                description: [
                    <>The example uses <code>docker-lessons</code> with the <code>Dockerfile</code> and <code>site</code> directory from Chapters 2 and 3.</>,
                    <>The file below is <code>compose.yaml</code> beside <code>Dockerfile</code>.</>,
                    "Docker Compose must be installed.",
                    "Docker Desktop includes it.",
                    "An Engine-only Linux installation may need the Compose plugin.",
                    <><code>docker compose version</code> should report its version.</>,
                ],
                language: "text",
                code: [
                    "services:",
                    "  site:",
                    "    build: .",
                    "    ports:",
                    "      - \"127.0.0.1:8080:8000\"",
                    "    volumes:",
                    "      - type: bind",
                    "        source: ./site",
                    "        target: /site",
                    "        read_only: true",
                    "  client:",
                    "    image: python:3.13-alpine",
                    "    user: \"10001:10001\"",
                    "    profiles: [tools]",
                    "    command:",
                    "      - python",
                    "      - -c",
                    "      - 'import urllib.request; print(urllib.request.urlopen(\"http://site:8000/\").read().decode())'",
                    "",
                ].join('\n'),
                explanation: [
                    <><code>site</code> uses <code>build: .</code> to build our <code>Dockerfile</code>.</>,
                    <>Its port and read-only bind mount reproduce the earlier <code>docker run</code> setup.</>,
                    <>The relative source <code>./site</code> is resolved from the Compose file directory.</>,
                    "The Chapter 3 bind-mount example leaves Edited on the host in the mounted host file.",
                    <><code>client</code> requests <code>http://site:8000/</code> on the shared network.</>,
                    "It needs no published port.",
                    <><code>profiles: [tools]</code> keeps the <code>client</code> out of a normal startup.</>,
                    "A profile groups optional services.",
                    <>An explicit <code>client</code> run performs one request.</>,
                    <>The <code>client</code> has no <code>depends_on</code>.</>,
                    "Its command follows a successful server request.",
                    "Container startup alone would not prove application readiness.",
                ],
            }} />

        </section>

        <section className="Article__section" aria-labelledby="compose-commands">
            <h2 id="compose-commands" className="SectionTitle">3. Compose manages the website lifecycle</h2>
            <ul className="Article__notes">
                <li>Compose groups resources into a project.</li>
                <li>The directory name normally supplies the project name.</li>
                <li>Commands from the same project directory read the intended Compose file.</li>
            </ul>
            <LearningNoteExampleBlock example={{
                title: "Saved configuration and a website update",
                description: [
                    <>The working directory is <code>docker-lessons</code> containing <code>compose.yaml</code>.</>,
                    "Startup requires host port 8080 to be free.",
                    <>The <code>client</code> command follows a successful <code>curl</code> request.</>,
                    "A request during server startup may need another attempt.",
                ],
                language: "text",
                code: [
                    "docker compose version",
                    "docker compose config",
                    "docker compose up --detach --build site",
                    "docker compose ps",
                    "curl http://127.0.0.1:8080/",
                    "docker compose run --rm client",
                    "docker compose logs site",
                    "printf '%s\\n' '<h1>Running with Compose</h1>' > site/index.html",
                    "curl http://127.0.0.1:8080/",
                ].join('\n'),
                explanation: [
                    <><code>config</code> parses and prints the resolved Compose configuration without creating containers.</>,
                    "Its output allows configuration review before startup.",
                    <><code>up --detach --build site</code> builds the website image and starts its service in the background.</>,
                    "Compose manages the generated container name.",
                    <>Both the host request and the <code>client</code> should return the current HTML.</>,
                    <><code>run --rm</code> starts one disposable instance of <code>client</code> and removes it after the request.</>,
                    <><code>logs site</code> shows the server messages.</>,
                    <><code>--follow</code> streams later messages.</>,
                    <><code>Ctrl+C</code> stops following without stopping the detached service.</>,
                    <>The last edit is visible on the next request because <code>site</code> has a bind mount.</>,
                    <>A <code>Dockerfile</code> change instead needs another <code>up --detach --build site</code>.</>,
                    <><code>restart</code> alone does not apply an edited Compose configuration.</>,
                ],
            }} />

        </section>

        <section className="Article__section" aria-labelledby="compose-debugging">
            <h2 id="compose-debugging" className="SectionTitle">4. Different failures require different evidence</h2>
            <div className="Article__tableWrap"><table className="Article__table">
                <thead><tr><th>Observed symptom</th><th>Relevant evidence</th><th>What it can establish</th></tr></thead>
                <tbody>
                    <tr><td>Compose rejects the file</td><td><code>docker compose config</code></td><td>YAML and resolved configuration problems</td></tr>
                    <tr><td>Website does not respond</td><td><code>docker compose ps --all</code>, then <code>docker compose logs site</code></td><td>Whether the container exited and what the process reported</td></tr>
                    <tr><td>Host request fails but client works</td><td>Published ports and host port conflicts</td><td>Whether the host path is configured correctly</td></tr>
                    <tr><td>Client request fails but host works</td><td>Service name, container port, shared network</td><td>Whether the internal request uses the correct destination</td></tr>
                    <tr><td>Old HTML is displayed</td><td>Mount source and actual host file</td><td>Whether mounted content is hiding image files</td></tr>
                </tbody>
            </table></div>
            <ul className="Article__notes">
                <li>A running container only confirms that its main process is alive.</li>
                <li>An HTTP response confirms more, but still does not prove every application feature works.</li>
                <li>Larger applications need readiness checks and retry handling for dependencies.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="compose-cleanup">
            <h2 id="compose-cleanup" className="SectionTitle">5. Stopping and removing project resources</h2>
            <LearningNoteExampleBlock example={{
                title: "Service removal and retained project files",
                description: [
                    <>The working directory is <code>docker-lessons</code>.</>,
                    <>The optional <code>stop</code> and <code>start</code> pair retains the same containers.</>,
                ],
                language: "text",
                code: [
                    "docker compose stop",
                    "docker compose start site",
                    "docker compose down",
                ].join('\n'),
                explanation: [
                    <><code>stop</code> ends processes while retaining their containers.</>,
                    <><code>start</code> resumes existing containers.</>,
                    "It does not rebuild them.",
                    <><code>down</code> removes this project's service containers and default network.</>,
                    <>Your <code>Dockerfile</code>, <code>compose.yaml</code>, and bind-mounted <code>site</code> directory remain on your host.</>,
                    <>The earlier <code>lesson-content</code> named volume, if retained, is outside this Compose file and is not removed by <code>down</code>.</>,
                    <>For future projects declaring named volumes, normal <code>down</code> retains those volumes.</>,
                    <><code>down --volumes</code> also deletes the project's declared named volumes and attached anonymous volumes.</>,
                    "This option is appropriate only when that data may be deleted.",
                    "The built images remain available.",
                    "Broad system prune commands are unnecessary for this exercise and can affect unrelated projects.",
                ],
            }} />
            <ul className="Article__notes">
                <li>Further explanation appears in the official{' '} <a className="Link" href="https://docs.docker.com/compose/gettingstarted/" target="_blank" rel="noreferrer">Compose quickstart</a>.</li>
                <li>Further details: <a className="Link" href="https://docs.docker.com/compose/intro/compose-application-model/" target="_blank" rel="noreferrer">Compose's application model</a>,{' '} <a className="Link" href="https://docs.docker.com/reference/compose-file/profiles/" target="_blank" rel="noreferrer">optional service profiles</a>, and{' '} <a className="Link" href="https://docs.docker.com/reference/cli/docker/compose/down/" target="_blank" rel="noreferrer">down and volume removal</a>.</li>
            </ul>
        </section>

    </ArticleLayout>
);

export default DockerComposeWorkflow;
