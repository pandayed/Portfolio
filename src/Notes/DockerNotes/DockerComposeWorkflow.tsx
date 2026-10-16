import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { DOCKER_COMPOSE_ROUTE, DOCKER_NOTES_ROUTE } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';

const sections: TocEntry[] = [
    { id: 'compose-model', title: 'Move commands into configuration' },
    { id: 'compose-file', title: 'Define the services' },
    { id: 'compose-commands', title: 'Run and change the project' },
    { id: 'compose-debugging', title: 'Check failures in order' },
    { id: 'compose-cleanup', title: 'Stop and remove the project' },
];

const DockerComposeWorkflow = () => (
    <ArticleLayout title="4. Run the project with Docker Compose" route={DOCKER_COMPOSE_ROUTE} sections={sections}
        backRoute={DOCKER_NOTES_ROUTE} backLabel="Back to Docker lessons">
        <section className="Article__section" aria-labelledby="compose-model">
            <h2 id="compose-model" className="SectionTitle">1. Save the configuration instead of retyping commands</h2>
            <p>
                Chapter 3 connected our website to a client and mounted local files. Those options become
                difficult to remember as an application grows. Docker Compose stores the desired service
                configuration in a YAML file and creates the containers and networks from it.
            </p>
            <p>
                A service describes how to run one application component. An image supplies its files. A
                container is one instance running with that configuration. Compose can manage one service or
                several related services together.
            </p>
            <p>
                The Dockerfile still builds our image. Compose adds the runtime choices: which port to publish,
                which directory to mount, and which services share a network. It does not replace the
                Dockerfile.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="compose-file">
            <h2 id="compose-file" className="SectionTitle">2. Describe our website and a request client</h2>
            <p>
                YAML uses indentation to group settings. Use spaces rather than tabs. Compose gives services a
                shared default network, and services can use each other's service names on it.
            </p>
            <LearningNoteExampleBlock example={{
                title: "Create compose.yaml in the existing project",
                description: [
                    "Continue in docker-lessons with the Dockerfile and site directory from Chapters 2 and 3. Save the following file as compose.yaml beside Dockerfile.",
                    "Docker Compose must be installed. Docker Desktop includes it; an Engine-only Linux installation may need the Compose plugin. docker compose version should report its version.",
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
                    "site uses build: . to build our Dockerfile. Its port and read-only bind mount reproduce the earlier docker run setup.",
                    "The relative source ./site is resolved from the Compose file directory. The mounted host file currently says Edited on the host if you followed Chapter 3.",
                    "client requests http://site:8000/ on the shared network. It needs no published port.",
                    "profiles: [tools] keeps the client out of a normal startup. A profile groups optional services. We will explicitly run client only when we want one request.",
                    "The client has no depends_on because we run it after checking that the server is ready. Container startup alone would not prove application readiness.",
                ],
            }} />

        </section>

        <section className="Article__section" aria-labelledby="compose-commands">
            <h2 id="compose-commands" className="SectionTitle">3. Start, inspect, and change the website</h2>
            <p>
                Compose groups resources into a project. The directory name normally supplies the project name.
                Use commands from the same project directory so Compose reads the intended file.
            </p>
            <LearningNoteExampleBlock example={{
                title: "Run the saved configuration and make one change",
                description: [
                    "Run from docker-lessons after saving compose.yaml. Stop any earlier container using host port 8080 before starting.",
                    "If the server is still starting, retry curl until it succeeds before running client.",
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
                    "config parses and prints the resolved Compose configuration without creating containers. Inspect it before startup.",
                    "up --detach --build site builds the website image and starts its service in the background. Compose manages the container name, so do not rely on a fixed generated name.",
                    "Both the host request and the client should return the current HTML. run --rm starts one disposable instance of client and removes it after the request.",
                    "logs site shows the server messages. Add --follow to stream later messages; press Ctrl+C to stop following without stopping the detached service.",
                    "The last edit is visible on the next request because site has a bind mount. A Dockerfile change instead needs another up --detach --build site. restart alone does not apply an edited Compose configuration.",
                ],
            }} />

        </section>

        <section className="Article__section" aria-labelledby="compose-debugging">
            <h2 id="compose-debugging" className="SectionTitle">4. Check the failed layer before changing configuration</h2>
            <div className="Article__tableWrap"><table className="Article__table">
                <thead><tr><th>What you observe</th><th>What to inspect next</th><th>What it can establish</th></tr></thead>
                <tbody>
                    <tr><td>Compose rejects the file</td><td><code>docker compose config</code></td><td>YAML and resolved configuration problems</td></tr>
                    <tr><td>Website does not respond</td><td><code>docker compose ps --all</code>, then <code>docker compose logs site</code></td><td>Whether the container exited and what the process reported</td></tr>
                    <tr><td>Host request fails but client works</td><td>Published ports and host port conflicts</td><td>Whether the host path is configured correctly</td></tr>
                    <tr><td>Client request fails but host works</td><td>Service name, container port, shared network</td><td>Whether the internal request uses the correct destination</td></tr>
                    <tr><td>Old HTML is displayed</td><td>Mount source and actual host file</td><td>Whether mounted content is hiding image files</td></tr>
                </tbody>
            </table></div>
            <p>
                A running container only confirms that its main process is alive. An HTTP response confirms
                more, but still does not prove every application feature works. Larger applications need
                readiness checks and retry handling for dependencies.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="compose-cleanup">
            <h2 id="compose-cleanup" className="SectionTitle">5. Stop this project and decide what to keep</h2>
            <LearningNoteExampleBlock example={{
                title: "Remove the practice services without deleting project files",
                description: [
                    "Run these commands from docker-lessons. The optional stop and start pair demonstrates keeping the same containers.",
                ],
                language: "text",
                code: [
                    "docker compose stop",
                    "docker compose start site",
                    "docker compose down",
                ].join('\n'),
                explanation: [
                    "stop ends processes while retaining their containers. start resumes existing containers; it does not rebuild them.",
                    "down removes this project's service containers and default network. Your Dockerfile, compose.yaml, and bind-mounted site directory remain on your host.",
                    "The earlier lesson-content named volume, if retained, is outside this Compose file and is not removed by down.",
                    "For future projects declaring named volumes, normal down retains those volumes. down --volumes also deletes the project's declared named volumes and attached anonymous volumes. Use it only when that data may be deleted.",
                    "The built images remain available. Broad system prune commands are unnecessary for this exercise and can affect unrelated projects.",
                ],
            }} />
            <p>
                You can now build a website image, run it, connect a client, choose storage, and reproduce the
                setup from a file. Kubernetes builds on these concepts when containers need to be managed as
                workloads across a cluster of machines.
            </p>
            <p>
                Read alongside the official{' '}
                <a className="Link" href="https://docs.docker.com/compose/gettingstarted/" target="_blank" rel="noreferrer">Compose
                quickstart</a>.
            </p>
            <p>
                Further details: <a className="Link" href="https://docs.docker.com/compose/intro/compose-application-model/" target="_blank" rel="noreferrer">Compose's application model</a>,{' '}
                <a className="Link" href="https://docs.docker.com/reference/compose-file/profiles/" target="_blank" rel="noreferrer">optional service profiles</a>, and{' '}
                <a className="Link" href="https://docs.docker.com/reference/cli/docker/compose/down/" target="_blank" rel="noreferrer">down and volume removal</a>.
            </p>
        </section>

    </ArticleLayout>
);

export default DockerComposeWorkflow;
