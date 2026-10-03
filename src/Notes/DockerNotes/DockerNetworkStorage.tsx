import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { DOCKER_NETWORK_STORAGE_ROUTE, DOCKER_NOTES_ROUTE } from '../../routing/routes';
import NoteArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'docker-published-ports', title: 'Published ports' },
    { id: 'docker-container-networks', title: 'Container networks' },
    { id: 'docker-storage-options', title: 'Volumes and bind mounts' },
    { id: 'docker-storage-lifecycle', title: 'Storage lifecycle' },
];

const portExample = [
    'docker run --name web --detach \\',
    '  --publish 127.0.0.1:8080:80 \\',
    '  nginx:alpine',
    '',
    'docker port web',
].join('\n');

const networkExample = [
    'docker network create app-network',
    'docker run --name cache --network app-network --detach redis:7-alpine',
    'docker run --rm --network app-network redis:7-alpine redis-cli -h cache ping',
    '',
    '# Expected output:',
    'PONG',
].join('\n');

const volumeExample = [
    'docker volume create postgres-data',
    'docker run --name local-db --detach \\',
    '  --env POSTGRES_PASSWORD=local-only \\',
    '  --mount source=postgres-data,target=/var/lib/postgresql/data \\',
    '  postgres:17-alpine',
].join('\n');

const DockerNetworkStorage = () => (
    <NoteArticleLayout
        title="Ports, networks, and storage"
        route={DOCKER_NETWORK_STORAGE_ROUTE}
        sections={sections}
        backRoute={DOCKER_NOTES_ROUTE}
        backLabel="Back to Docker notes"
    >
        <section className="Article__section">
            <p>
                Container isolation affects both networking and files. Publish only the ports that
                host clients need. Put persistent data in storage whose lifecycle is separate from
                the container.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="docker-published-ports">
            <h2 id="docker-published-ports" className="SectionTitle">Published ports</h2>
            <CodeBlock language="text">{portExample}</CodeBlock>
            <p>
                The format is <code>HOST_IP:HOST_PORT:CONTAINER_PORT</code>. Traffic sent to
                <code> 127.0.0.1:8080</code> is forwarded to port 80 inside the container.
                Binding to <code>127.0.0.1</code> keeps the port local to the host.
            </p>
            <ul className="Article__notes">
                <li>Omitting the host IP usually publishes on all host interfaces.</li>
                <li><code>EXPOSE 80</code> in a Dockerfile documents port 80 but does not publish it.</li>
                <li>Publishing a database or administration port can expose it beyond the intended boundary.</li>
                <li>A host port can be assigned to only one listener at a time.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="docker-container-networks">
            <h2 id="docker-container-networks" className="SectionTitle">Container networks</h2>
            <p>
                <code>localhost</code> inside a container points back to that container. To connect
                two containers, attach them to the same user-defined network and use the other
                container name or a network alias.
            </p>
            <CodeBlock language="text">{networkExample}</CodeBlock>
            <p>
                The Redis client resolves <code>cache</code> through Docker network DNS. It does not
                need a published Redis port because both containers are on the same network.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="docker-storage-options">
            <h2 id="docker-storage-options" className="SectionTitle">Volumes and bind mounts</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Storage</th><th>Owner</th><th>Use</th></tr></thead>
                    <tbody>
                        <tr><td>Container layer</td><td>The container</td><td>Temporary files that may disappear with the container.</td></tr>
                        <tr><td>Named volume</td><td>Docker</td><td>Persistent application data such as a local database.</td></tr>
                        <tr><td>Bind mount</td><td>The host path</td><td>Source code or configuration shared directly with the host.</td></tr>
                        <tr><td>tmpfs</td><td>Host memory</td><td>Temporary data that should not be written to disk.</td></tr>
                    </tbody>
                </table>
            </div>
            <CodeBlock language="text">{volumeExample}</CodeBlock>
            <p>
                The volume is mounted at the directory where PostgreSQL stores its database files.
                A bind mount would use a host path such as
                <code> --mount type=bind,source=./config,target=/app/config,readonly</code>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="docker-storage-lifecycle">
            <h2 id="docker-storage-lifecycle" className="SectionTitle">Storage lifecycle</h2>
            <ul className="Article__notes">
                <li>Removing a container removes its writable layer.</li>
                <li>Removing a container does not remove a named volume unless the command explicitly targets that volume.</li>
                <li>A bind mount writes directly to the host path, subject to host permissions.</li>
                <li>Mounting over a non-empty container directory hides the image files at that path while the mount exists.</li>
                <li>Back up important volume data through a tested application or storage-specific process.</li>
            </ul>
            <p>
                Inspect the exact target before running volume or prune cleanup commands. Deleting a
                volume deletes the data stored in it.
            </p>
            <p>
                References: <a className="Link" href="https://docs.docker.com/get-started/docker-concepts/running-containers/publishing-ports/" target="_blank" rel="noreferrer">Publishing ports</a>,{' '}
                <a className="Link" href="https://docs.docker.com/engine/network/" target="_blank" rel="noreferrer">Docker networking</a>, and{' '}
                <a className="Link" href="https://docs.docker.com/engine/storage/volumes/" target="_blank" rel="noreferrer">Volumes</a> in the official Docker documentation.
            </p>
        </section>
    </NoteArticleLayout>
);

export default DockerNetworkStorage;
