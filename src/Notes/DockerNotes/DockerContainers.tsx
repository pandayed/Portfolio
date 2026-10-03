import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { DOCKER_CONTAINERS_ROUTE, DOCKER_NOTES_ROUTE } from '../../routing/routes';
import NoteArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'docker-container', title: 'A container is an isolated process' },
    { id: 'docker-image', title: 'An image is the package' },
    { id: 'docker-layers', title: 'Layers and the writable container layer' },
    { id: 'docker-registry', title: 'Names, tags, digests, and registries' },
];

const firstContainer = [
    'docker run --name local-nginx --detach --publish 127.0.0.1:8080:80 nginx:alpine',
    'docker ps',
    'curl http://127.0.0.1:8080',
    'docker stop local-nginx',
    'docker rm local-nginx',
].join('\n');

const imageCommands = [
    'docker pull nginx:alpine',
    'docker image ls',
    'docker image inspect nginx:alpine',
    'docker image history nginx:alpine',
].join('\n');

const DockerContainers = () => (
    <NoteArticleLayout
        title="Containers, images, and registries"
        route={DOCKER_CONTAINERS_ROUTE}
        sections={sections}
        backRoute={DOCKER_NOTES_ROUTE}
        backLabel="Back to Docker notes"
    >
        <section className="Article__section">
            <p>
                An image is an immutable package. A container is a running or stopped instance of
                that image. A registry stores images so other machines can pull them.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="docker-container">
            <h2 id="docker-container" className="SectionTitle">A container is an isolated process</h2>
            <p>
                A container has its own process, filesystem view, environment, and network settings.
                It still uses the host kernel. This makes a container different from a virtual
                machine, which normally includes a guest operating system and its own kernel.
            </p>
            <CodeBlock language="text">{firstContainer}</CodeBlock>
            <ul className="Article__notes">
                <li><code>--name</code> assigns a stable local name.</li>
                <li><code>--detach</code> runs the process in the background.</li>
                <li><code>--publish 127.0.0.1:8080:80</code> forwards host port 8080 to container port 80 and binds it only to the local host.</li>
                <li>The expected result is an Nginx response at <code>http://127.0.0.1:8080</code>.</li>
            </ul>
            <p>
                A container stays running only while its main process stays running. Stopping or
                removing the container does not remove the image used to create it.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="docker-image">
            <h2 id="docker-image" className="SectionTitle">An image is the package</h2>
            <p>
                An image contains the files, libraries, runtime, application code, and default
                configuration needed to start a container. Images are immutable. A changed
                application produces a new image instead of modifying the existing image.
            </p>
            <CodeBlock language="text">{imageCommands}</CodeBlock>
            <p>
                <code>docker run</code> pulls the requested image when it is not already available
                locally. <code>docker image inspect</code> shows image metadata and configured
                defaults. <code>docker image history</code> shows the instructions that produced
                its visible layers.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="docker-layers">
            <h2 id="docker-layers" className="SectionTitle">Layers and the writable container layer</h2>
            <p>
                Image layers record filesystem changes. Images can share unchanged layers, which
                reduces repeated downloads and storage. When a container starts, Docker adds a
                writable layer above the read-only image layers.
            </p>
            <ul className="Article__notes">
                <li>Changing a file inside a container changes only that container layer.</li>
                <li>Starting another container from the same image does not include those changes.</li>
                <li>Removing the container removes its writable layer.</li>
                <li>Persistent application data belongs in a volume or an external data service.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="docker-registry">
            <h2 id="docker-registry" className="SectionTitle">Names, tags, digests, and registries</h2>
            <p>
                A full image reference follows the shape
                <code> registry/namespace/repository:tag</code>. For example,
                <code> ghcr.io/acme/orders:1.4.2</code> selects a tagged image in GitHub Container
                Registry. Docker Hub is the default registry when the reference omits one.
            </p>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Identifier</th><th>Behavior</th><th>Use</th></tr></thead>
                    <tbody>
                        <tr><td>Tag</td><td>A readable label that can be moved to another image.</td><td>Development and release names.</td></tr>
                        <tr><td>Digest</td><td>A content-based immutable image identifier.</td><td>An exact deployment artifact.</td></tr>
                        <tr><td>Image ID</td><td>A local identifier for image content.</td><td>Local inspection and cleanup.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                Avoid depending on a moving <code>latest</code> tag for a repeatable deployment.
                Use a release tag, and use a digest where one exact artifact is required.
            </p>
            <p>
                References: <a className="Link" href="https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/" target="_blank" rel="noreferrer">What is a container?</a> and{' '}
                <a className="Link" href="https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/" target="_blank" rel="noreferrer">What is an image?</a> in the official Docker documentation.
            </p>
        </section>
    </NoteArticleLayout>
);

export default DockerContainers;
