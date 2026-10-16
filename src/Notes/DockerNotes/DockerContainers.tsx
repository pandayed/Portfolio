import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { DOCKER_CONTAINERS_ROUTE, DOCKER_BUILD_RUN_ROUTE, DOCKER_NOTES_ROUTE, toHref } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';

const sections: TocEntry[] = [
    { id: 'docker-container', title: 'Processes and isolation' },
    { id: 'docker-image', title: 'Images and containers' },
    { id: 'docker-layers', title: 'Image layers and container files' },
    { id: 'docker-registry', title: 'Registries and image identity' },
];

const DockerContainers = () => (
    <ArticleLayout title="1. Containers, images, and registries" route={DOCKER_CONTAINERS_ROUTE} sections={sections}
        backRoute={DOCKER_NOTES_ROUTE} backLabel="Back to Docker lessons">
        <section className="Article__section" aria-labelledby="docker-container">
            <h2 id="docker-container" className="SectionTitle">1. A container isolates a process</h2>
            <ul className="Article__notes">
                <li>A container runs a process with its own filesystem view, process space, and network settings.</li>
                <li>Docker starts and manages containers.</li>
                <li>The Docker command-line client accepts commands.</li>
                <li>The client asks the Docker Engine to build images or run containers.</li>
                <li>The Engine must be running for these commands to work.</li>
                <li>The host is the machine running the Docker Engine.</li>
                <li>Linux containers share the kernel of their Linux host.</li>
                <li>Docker Desktop runs Linux containers through a Linux virtual machine on macOS and Windows.</li>
                <li>A container does not carry its own kernel.</li>
                <li>Isolation does not make untrusted programs harmless.</li>
                <li>Image source trust still matters.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="docker-image">
            <h2 id="docker-image" className="SectionTitle">2. An image supplies container files</h2>
            <ul className="Article__notes">
                <li>An image supplies the program and files used to create a container.</li>
                <li>The image stays unchanged when the container runs.</li>
                <li>Multiple containers can start from the same image and keep separate writable files.</li>
                <li>The examples require a running Docker Desktop installation, or Docker Engine on Linux.</li>
                <li>The first image download requires an internet connection.</li>
                <li>The commands in these lessons use a POSIX shell such as bash or zsh.</li>
                <li>A WSL terminal provides this shell environment on Windows.</li>
            </ul>
            <LearningNoteExampleBlock example={{
                title: "A web server container lifecycle",
                description: [
                    "The commands run in the order shown.",
                    <>The example requires Docker, <code>curl</code>, and an unused host port 8080.</>,
                    "Python runs inside the container.",
                    "The server initially lists files from its image.",
                    "Chapter 2 replaces that with our own lesson website.",
                ],
                language: "text",
                code: [
                    "docker version",
                    "docker run --name lesson-web --detach --user 10001:10001 --publish 127.0.0.1:8080:8000 python:3.13-alpine python -m http.server 8000 --bind 0.0.0.0",
                    "docker ps",
                    "curl http://127.0.0.1:8080/",
                    "docker logs lesson-web",
                    "docker stop lesson-web",
                    "docker ps --all",
                    "docker rm lesson-web",
                ].join('\n'),
                explanation: [
                    <><code>docker version</code> should show both Client and Server information.</>,
                    "A connection error means the client cannot reach the Engine.",
                    "The Engine must be running for subsequent commands.",
                    <><code>docker run</code> downloads the image if necessary, creates a container named <code>lesson-web</code>, and starts its main process.</>,
                    <><code>--detach</code> runs it in the background.</>,
                    <><code>--user</code> uses a non-root numeric user.</>,
                    <><code>python:3.13-alpine</code> contains Python.</>,
                    "The command after the image name starts its built-in HTTP server.",
                    <><code>--bind 0.0.0.0</code> makes the server accept connections through the container network interface.</>,
                    <>The published port forwards requests from your computer at <code>127.0.0.1:8080</code> to port 8000 in the container.</>,
                    <><code>curl</code> should receive an HTML directory listing.</>,
                    "A request can succeed after startup even if an earlier request failed.",
                    "IDs, timestamps, and listed files vary.",
                    <><code>docker logs</code> shows server messages, including the request.</>,
                    <><code>docker ps</code> lists running containers.</>,
                    <><code>--all</code> also includes stopped ones.</>,
                    "Stopping ends the main process but keeps the container.",
                    "Removing deletes that container and its writable files.",
                    "The downloaded image remains available for later runs.",
                    <>A busy port 8080 requires a different host port in both the publication and <code>curl</code> address.</>,
                    "An existing container name prevents a second container from using that name.",
                    <><code>docker ps --all</code> identifies the earlier container before its removal.</>,
                ],
            }} />

        </section>

        <section className="Article__section" aria-labelledby="docker-layers">
            <h2 id="docker-layers" className="SectionTitle">3. Image layers and container changes</h2>
            <ul className="Article__notes">
                <li>An image consists of read-only filesystem layers.</li>
                <li>A layer records filesystem changes from a build step.</li>
                <li>Docker can share these layers between images and reuse downloads.</li>
                <li>Each container adds its own writable layer.</li>
                <li>Files written there survive stopping and starting that same container.</li>
                <li>They disappear when the container is removed.</li>
                <li>Changing those files does not update the image.</li>
                <li>Chapter 2 explains how application files become part of an image.</li>
                <li>Chapter 3 explains storage outside the disposable container layer.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="docker-registry">
            <h2 id="docker-registry" className="SectionTitle">4. Registries store and identify images</h2>
            <ul className="Article__notes">
                <li>A registry stores images for download.</li>
                <li>A repository groups related images in that registry.</li>
                <li>Docker Hub is the default registry when an image name does not specify another one.</li>
                <li>A tag is a readable label after a colon.</li>
                <li>In <code>python:3.13-alpine</code>, the repository is <code>python</code> and the tag selects a Python 3.13 image based on Alpine Linux.</li>
                <li>Tags can point to new image content later.</li>
                <li>Even a version tag can receive updates.</li>
                <li>A digest identifies exact image content.</li>
                <li>A verified digest selects precisely the same artifact for a release.</li>
                <li>Images must also match the machine's operating system and processor architecture.</li>
                <li>Packaging does not remove these requirements.</li>
                <li>Sharing a local image requires a tag under a writable registry repository and authentication to that registry.</li>
                <li>A push uploads the image.</li>
                <li>Another machine can then pull it.</li>
                <li>Building an image locally does not publish it, and a registry account is not needed for these exercises.</li>
                <li>Further explanation appears in the official{' '} <a className="Link" href="https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/" target="_blank" rel="noreferrer">container tutorial</a>.</li>
                <li>The next chapter is <a className="Link" href={toHref(DOCKER_BUILD_RUN_ROUTE)}>Chapter 2: building and updating Docker images</a>.</li>
            </ul>
        </section>

    </ArticleLayout>
);

export default DockerContainers;
