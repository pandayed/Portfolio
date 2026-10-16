import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { DOCKER_NETWORK_STORAGE_ROUTE, DOCKER_COMPOSE_ROUTE, DOCKER_NOTES_ROUTE, toHref } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';

const sections: TocEntry[] = [
    { id: 'docker-published-ports', title: 'Choose the correct address' },
    { id: 'docker-container-networks', title: 'Connect a second container' },
    { id: 'docker-storage-options', title: 'Edit through a bind mount' },
    { id: 'docker-storage-lifecycle', title: 'Retain files in a volume' },
];

const DockerNetworkStorage = () => (
    <ArticleLayout title="3. Connect containers and keep files" route={DOCKER_NETWORK_STORAGE_ROUTE} sections={sections}
        backRoute={DOCKER_NOTES_ROUTE} backLabel="Back to Docker lessons">
        <section className="Article__section" aria-labelledby="docker-published-ports">
            <h2 id="docker-published-ports" className="SectionTitle">1. Distinguish the host address from the container address</h2>
            <p>
                Chapter 2 gave us an image containing our website. The next problem is reaching that website
                from different places. Your computer and each container have separate network views.
            </p>
            <p>
                A port identifies a listening application at an address. Publishing forwards traffic from a host
                port to a container port. The order is host IP, host port, then container port.
            </p>
            <ul className="Article__notes">
                <li>A request from your computer uses the published host address.</li>
                <li>
                    A request from another container on the same user-defined network uses the server's
                    container name and container port.
                </li>
                <li>
                    <code>localhost</code> means the machine or container where the requesting process runs.
                    Inside a client container, it does not mean the server container.
                </li>
                <li>
                    Publish only ports host clients need. Omitting the host IP normally binds a published port
                    to all host interfaces. Use an up-to-date Docker installation for local exercises.
                </li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="docker-container-networks">
            <h2 id="docker-container-networks" className="SectionTitle">2. Send a request from a second container</h2>
            <p>
                A user-defined bridge network connects containers on one Docker host. Docker provides name
                resolution on that network, so a client can use a container name instead of tracking a changing
                IP address.
            </p>
            <LearningNoteExampleBlock example={{
                title: "Reach the same website from the host and from another container",
                description: [
                    "Complete Chapter 2 first so lesson-site:v2 exists. Port 8080 and the name lesson-site should be free.",
                    "The second container runs Python for one request and then exits. It is a client, not another web server.",
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
                    "Wait until the host curl request succeeds before running the client. Both requests should return the version-two HTML.",
                    "The host uses 127.0.0.1:8080. The client container uses lesson-site:8000 because both containers joined lesson-network.",
                    "The command after lesson-site:v2 replaces the default server command for the client container. --rm removes that client when it exits.",
                    "The client does not use the published host port. Containers on this network can communicate even if the server has no published port.",
                    "The final commands stop and remove the server, then remove the now-unused network.",
                ],
            }} />

        </section>

        <section className="Article__section" aria-labelledby="docker-storage-options">
            <h2 id="docker-storage-options" className="SectionTitle">3. Connect host files with a bind mount</h2>
            <p>
                Networking connects processes. A mount connects a file or directory into a container's
                filesystem. The mounted content is separate from that container's writable layer.
            </p>
            <div className="Article__tableWrap"><table className="Article__table">
                <thead><tr><th>Storage</th><th>Where it comes from</th><th>Use it for</th></tr></thead>
                <tbody>
                    <tr><td>Container layer</td><td>Files unique to one container</td><td>Disposable working files</td></tr>
                    <tr><td>Bind mount</td><td>A specific host path</td><td>Editing local source or configuration</td></tr>
                    <tr><td>Named volume</td><td>Storage managed by Docker</td><td>Data that must outlive container replacement</td></tr>
                    <tr><td>tmpfs mount</td><td>Memory-backed temporary storage</td><td>Temporary files that need no persistence</td></tr>
                </tbody>
            </table></div>
            <p>
                A bind mount lets a container read current host files. It does not copy edits into the image.
                The application must reread those files or provide its own reload behavior.
            </p>
            <LearningNoteExampleBlock example={{
                title: "Edit the website without rebuilding the image",
                description: [
                    "Run from docker-lessons. The site directory created in Chapter 2 must exist. The previous network exercise must be cleaned up.",
                    "The quoted $(pwd) expands to the absolute path of your current directory in bash or zsh.",
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
                    "The mount hides the image contents at /site and shows the host site directory there instead.",
                    "The server rereads index.html on each request, so curl returns Edited on the host after it starts. No image build is involved.",
                    "readonly prevents this container from editing the mounted host files. Your host editor can still change them.",
                    "Removing the container leaves site/index.html on your computer. The image still contains its earlier version-two file.",
                ],
            }} />

        </section>

        <section className="Article__section" aria-labelledby="docker-storage-lifecycle">
            <h2 id="docker-storage-lifecycle" className="SectionTitle">4. Keep data when a container is replaced</h2>
            <p>
                A named volume has its own lifecycle. Stopping or removing a container does not remove that
                volume. Deleting the volume itself deletes its stored data.
            </p>
            <p>
                When an empty volume is first mounted over an image directory containing files, Docker normally
                copies those files into the volume. After that, the volume's existing content hides files at
                that image path, even if a later image has changed.
            </p>
            <LearningNoteExampleBlock example={{
                title: "Read the same volume from two disposable containers",
                description: [
                    "Use lesson-site:v2 from Chapter 2. This exercise uses the unique volume name lesson-content. If you have already run it, its existing content is intentionally retained.",
                    "These are short-lived readers. They do not start a web server or publish ports.",
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
                    "On its first use, the empty volume receives the version-two HTML from the image. It does not receive Edited on the host, because this run has no bind mount.",
                    "Each --rm removes its container after cat finishes. The second container can still read the same stored file from the named volume.",
                    "docker volume inspect shows that the volume exists independently. Its host-side location depends on the Docker installation; do not edit Docker-managed files directly.",
                    "Applications that write lasting data need a writable mount and suitable file permissions for their runtime user. A volume does not automatically grant write access.",
                    "The final command deletes only lesson-content. Back up real application data with a suitable backup process before deleting its volume.",
                ],
            }} />
            <p>
                Read alongside the official{' '}
                <a className="Link" href="https://docs.docker.com/engine/network/drivers/bridge/" target="_blank" rel="noreferrer">bridge
                network guide</a>.
            </p>
            <p>
                For mounts, see Docker's{' '}
                <a className="Link" href="https://docs.docker.com/engine/storage/bind-mounts/" target="_blank" rel="noreferrer">bind
                mount guide</a> and{' '}
                <a className="Link" href="https://docs.docker.com/engine/storage/volumes/" target="_blank" rel="noreferrer">volume
                guide</a>.
            </p>
            <p>
                Continue with <a className="Link" href={toHref(DOCKER_COMPOSE_ROUTE)}>Chapter 4: save the setup
                in Compose</a>.
            </p>
        </section>

    </ArticleLayout>
);

export default DockerNetworkStorage;
