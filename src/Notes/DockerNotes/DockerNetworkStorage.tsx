import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { DOCKER_NETWORK_STORAGE_ROUTE, DOCKER_COMPOSE_ROUTE, DOCKER_NOTES_ROUTE, toHref } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';

const sections: TocEntry[] = [
    { id: 'docker-published-ports', title: 'Host and container addresses' },
    { id: 'docker-container-networks', title: 'Container networks' },
    { id: 'docker-storage-options', title: 'Host files and bind mounts' },
    { id: 'docker-storage-lifecycle', title: 'Named volumes and persistence' },
];

const DockerNetworkStorage = () => (
    <ArticleLayout title="3. Container networks and storage" route={DOCKER_NETWORK_STORAGE_ROUTE} sections={sections}
        backRoute={DOCKER_NOTES_ROUTE} backLabel="Back to Docker lessons">
        <section className="Article__section" aria-labelledby="docker-published-ports">
            <h2 id="docker-published-ports" className="SectionTitle">1. Host and container addresses differ</h2>
            <ul className="Article__notes">
                <li>Chapter 2 gave us an image containing our website.</li>
                <li>The next problem is reaching that website from different places.</li>
                <li>Your computer and each container have separate network views.</li>
                <li>Publishing forwards traffic from a host port to a container port.</li>
                <li>The order is host IP, host port, then container port.</li>
                <li>A request from your computer uses the published host address.</li>
                <li>A request from another container on the same user-defined network uses the server's container name and container port.</li>
                <li><code>localhost</code> means the machine or container where the requesting process runs.</li>
                <li>Inside a client container, it does not mean the server container.</li>
                <li>Only ports needed by host clients require publication.</li>
                <li>Omitting the host IP normally binds a published port to all host interfaces.</li>
                <li>The local exercises require an up-to-date Docker installation.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="docker-container-networks">
            <h2 id="docker-container-networks" className="SectionTitle">2. A shared network connects containers</h2>
            <ul className="Article__notes">
                <li>A user-defined bridge network connects containers on one Docker host.</li>
                <li>Docker provides name resolution on that network, so a client can use a container name instead of tracking a changing IP address.</li>
            </ul>
            <LearningNoteExampleBlock example={{
                title: "Host and container requests to one website",
                description: [
                    <>The example requires <code>lesson-site:v2</code> from Chapter 2.</>,
                    <>Port 8080 and the name <code>lesson-site</code> must be free.</>,
                    "The second container runs Python for one request and then exits.",
                    "It is a client, not another web server.",
                ],
                language: "text",
                code: [
                    "docker network create lesson-network",
                    "docker run --name lesson-site --detach --network lesson-network --publish 127.0.0.1:8080:8000 lesson-site:v2",
                    "curl http://127.0.0.1:8080/",
                    "docker run --rm --network lesson-network lesson-site:v2 python -c 'import urllib.request; print(urllib.request.urlopen(\"http://lesson-site:8000/\").read().decode())'",
                    "docker stop lesson-site",
                    "docker rm lesson-site",
                    "docker network rm lesson-network",
                ].join('\n'),
                explanation: [
                    <>The client command follows a successful host <code>curl</code> request.</>,
                    "Both requests should return the version-two HTML.",
                    <>The host uses <code>127.0.0.1:8080</code>.</>,
                    <>The client container uses <code>lesson-site:8000</code> because both containers joined <code>lesson-network</code>.</>,
                    <>The command after <code>lesson-site:v2</code> replaces the default server command for the client container.</>,
                    <><code>--rm</code> removes that client when it exits.</>,
                    "The client does not use the published host port.",
                    "Containers on this network can communicate even if the server has no published port.",
                    "The final commands stop and remove the server, then remove the now-unused network.",
                ],
            }} />

        </section>

        <section className="Article__section" aria-labelledby="docker-storage-options">
            <h2 id="docker-storage-options" className="SectionTitle">3. A bind mount exposes host files</h2>
            <ul className="Article__notes">
                <li>Networking connects processes.</li>
                <li>A mount connects a file or directory into a container's filesystem.</li>
                <li>The mounted content is separate from that container's writable layer.</li>
            </ul>
            <div className="Article__tableWrap"><table className="Article__table">
                <thead><tr><th>Storage</th><th>Where it comes from</th><th>Typical purpose</th></tr></thead>
                <tbody>
                    <tr><td>Container layer</td><td>Files unique to one container</td><td>Disposable working files</td></tr>
                    <tr><td>Bind mount</td><td>A specific host path</td><td>Editing local source or configuration</td></tr>
                    <tr><td>Named volume</td><td>Storage managed by Docker</td><td>Data that must outlive container replacement</td></tr>
                    <tr><td>tmpfs mount</td><td>Memory-backed temporary storage</td><td>Temporary files that need no persistence</td></tr>
                </tbody>
            </table></div>
            <ul className="Article__notes">
                <li>A bind mount lets a container read current host files.</li>
                <li>It does not copy edits into the image.</li>
                <li>The application must reread those files or provide its own reload behavior.</li>
            </ul>
            <LearningNoteExampleBlock example={{
                title: "Host edits through a bind mount",
                description: [
                    <>The working directory is <code>docker-lessons</code>.</>,
                    <>The <code>site</code> directory from Chapter 2 must exist.</>,
                    "The previous network exercise must be cleaned up.",
                    <>The quoted <code>$(pwd)</code> expands to the absolute path of your current directory in bash or zsh.</>,
                ],
                language: "text",
                code: [
                    "docker run --name lesson-site --detach --publish 127.0.0.1:8080:8000 --mount \"type=bind,source=$(pwd)/site,target=/site,readonly\" lesson-site:v2",
                    "printf '%s\\n' '<h1>Edited on the host</h1>' > site/index.html",
                    "curl http://127.0.0.1:8080/",
                    "docker stop lesson-site",
                    "docker rm lesson-site",
                ].join('\n'),
                explanation: [
                    <>The mount hides the image contents at <code>/site</code> and shows the host <code>site</code> directory there instead.</>,
                    <>The server rereads <code>index.html</code> on each request, so <code>curl</code> returns Edited on the host after it starts.</>,
                    "No image build is involved.",
                    <><code>readonly</code> prevents this container from editing the mounted host files.</>,
                    "Your host editor can still change them.",
                    <>Removing the container leaves <code>site/index.html</code> on your computer.</>,
                    "The image still contains its earlier version-two file.",
                ],
            }} />

        </section>

        <section className="Article__section" aria-labelledby="docker-storage-lifecycle">
            <h2 id="docker-storage-lifecycle" className="SectionTitle">4. Named volumes outlive containers</h2>
            <ul className="Article__notes">
                <li>A named volume has its own lifecycle.</li>
                <li>Stopping or removing a container does not remove that volume.</li>
                <li>Deleting the volume itself deletes its stored data.</li>
                <li>When an empty volume is first mounted over an image directory containing files, Docker normally copies those files into the volume.</li>
                <li>After that, the volume's existing content hides files at that image path, even if a later image has changed.</li>
            </ul>
            <LearningNoteExampleBlock example={{
                title: "One volume shared by two disposable containers",
                description: [
                    <>The example requires <code>lesson-site:v2</code> from Chapter 2.</>,
                    <>Its volume is named <code>lesson-content</code>.</>,
                    "An existing volume with that name retains its earlier content.",
                    "These are short-lived readers.",
                    "They do not start a web server or publish ports.",
                ],
                language: "text",
                code: [
                    "docker volume create lesson-content",
                    "docker run --rm --mount source=lesson-content,target=/site lesson-site:v2 cat /site/index.html",
                    "docker volume inspect lesson-content",
                    "docker run --rm --mount source=lesson-content,target=/site,readonly lesson-site:v2 cat /site/index.html",
                    "# Only after you no longer need this exercise data:",
                    "docker volume rm lesson-content",
                ].join('\n'),
                explanation: [
                    "On its first use, the empty volume receives the version-two HTML from the image.",
                    "It does not receive Edited on the host, because this run has no bind mount.",
                    <>Each <code>--rm</code> removes its container after <code>cat</code> finishes.</>,
                    "The second container can still read the same stored file from the named volume.",
                    <><code>docker volume inspect</code> shows that the volume exists independently.</>,
                    "Its host-side location depends on the Docker installation.",
                    "Direct edits to Docker-managed files can damage the stored data.",
                    "Applications that write lasting data need a writable mount and suitable file permissions for their runtime user.",
                    "A volume does not automatically grant write access.",
                    <>The final command deletes only <code>lesson-content</code>.</>,
                    "Deleting a volume containing real application data requires a suitable backup first.",
                ],
            }} />
            <ul className="Article__notes">
                <li>Further explanation appears in the official{' '} <a className="Link" href="https://docs.docker.com/engine/network/drivers/bridge/" target="_blank" rel="noreferrer">bridge network guide</a>.</li>
                <li>Mount details appear in Docker's{' '} <a className="Link" href="https://docs.docker.com/engine/storage/bind-mounts/" target="_blank" rel="noreferrer">bind mount guide</a> and{' '} <a className="Link" href="https://docs.docker.com/engine/storage/volumes/" target="_blank" rel="noreferrer">volume guide</a>.</li>
                <li>The next chapter is <a className="Link" href={toHref(DOCKER_COMPOSE_ROUTE)}>Chapter 4: project configuration with Docker Compose</a>.</li>
            </ul>
        </section>

    </ArticleLayout>
);

export default DockerNetworkStorage;
