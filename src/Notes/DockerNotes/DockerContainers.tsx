import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { DOCKER_CONTAINERS_ROUTE, DOCKER_BUILD_RUN_ROUTE, DOCKER_NOTES_ROUTE, toHref } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';

const sections: TocEntry[] = [
    { id: 'docker-container', title: 'Start with an isolated process' },
    { id: 'docker-image', title: 'Run your first container' },
    { id: 'docker-layers', title: 'Separate images and changed files' },
    { id: 'docker-registry', title: 'Find and identify images' },
];

const DockerContainers = () => (
    <ArticleLayout title="1. Run and understand a container" route={DOCKER_CONTAINERS_ROUTE} sections={sections}
        backRoute={DOCKER_NOTES_ROUTE} backLabel="Back to Docker lessons">
        <section className="Article__section" aria-labelledby="docker-container">
            <h2 id="docker-container" className="SectionTitle">1. Start with a process, then give it isolation</h2>
            <p>
                A web server is a program that waits for requests and sends responses. Normally it uses files
                and installed software on your computer. A container runs that program with its own filesystem
                view, process space, and network settings.
            </p>
            <p>
                Docker starts and manages containers. You type commands into the Docker command-line client. The
                client asks the Docker Engine to build images or run containers. The Engine must be running for
                these commands to work.
            </p>
            <ul className="Article__notes">
                <li>The host is the machine running the Docker Engine.</li>
                <li>
                    Linux containers share the kernel of their Linux host. A kernel is the part of an operating
                    system that manages processes and hardware.
                </li>
                <li>
                    Docker Desktop runs Linux containers through a Linux virtual machine on macOS and Windows. A
                    container does not carry its own kernel.
                </li>
                <li>Isolation does not make untrusted programs harmless. Run images from sources you trust.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="docker-image">
            <h2 id="docker-image" className="SectionTitle">2. Use an image to start a container</h2>
            <p>
                An image supplies the program and files used to create a container. The image stays unchanged
                when the container runs. Multiple containers can start from the same image and keep separate
                writable files.
            </p>
            <p>
                Before continuing, install Docker Desktop, or Docker Engine on Linux. Start it, open a terminal,
                and have an internet connection for the first image download. The commands in these lessons use
                a POSIX shell such as bash or zsh. On Windows, use a WSL terminal.
            </p>
            <LearningNoteExampleBlock example={{
                title: "Run a small web server, inspect it, and remove it",
                description: [
                    "Run these commands in order. You need Docker, curl, and an unused host port 8080. No Python installation on your host is needed.",
                    "The server initially lists files from its image. Chapter 2 replaces that with our own lesson website.",
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
                    "docker version should show both Client and Server information. A connection error means the client cannot reach the Engine. Start Docker before continuing.",
                    "docker run downloads the image if necessary, creates a container named lesson-web, and starts its main process. --detach runs it in the background. --user uses a non-root numeric user.",
                    "python:3.13-alpine contains Python. The command after the image name starts its built-in HTTP server. --bind 0.0.0.0 makes the server accept connections through the container network interface.",
                    "The published port forwards requests from your computer at 127.0.0.1:8080 to port 8000 in the container. curl should receive an HTML directory listing. If the first request arrives before the server starts, retry it. IDs, timestamps, and listed files vary.",
                    "docker logs shows server messages, including the request. docker ps lists running containers. --all also includes stopped ones.",
                    "Stopping ends the main process but keeps the container. Removing deletes that container and its writable files. The downloaded image remains available for later runs.",
                    "If port 8080 is busy, choose another host port and use it in curl too. If the name already exists from a previous attempt, inspect docker ps --all before removing that specific container.",
                ],
            }} />

        </section>

        <section className="Article__section" aria-labelledby="docker-layers">
            <h2 id="docker-layers" className="SectionTitle">3. Separate the image from changed files</h2>
            <p>
                An image consists of read-only filesystem layers. A layer records filesystem changes from a
                build step. Docker can share these layers between images and reuse downloads.
            </p>
            <p>
                Each container adds its own writable layer. Files written there survive stopping and starting
                that same container. They disappear when the container is removed. Changing those files does not
                update the image.
            </p>
            <p>
                This distinction gives us two separate tasks: build application files into an image, and store
                lasting application data outside the disposable container layer. Chapter 2 handles the first.
                Chapter 3 handles the second.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="docker-registry">
            <h2 id="docker-registry" className="SectionTitle">4. Know where the image came from</h2>
            <p>
                A registry stores images for download. A repository groups related images in that registry.
                Docker Hub is the default registry when an image name does not specify another one.
            </p>
            <ul className="Article__notes">
                <li>
                    A tag is a readable label after a colon. In <code>python:3.13-alpine</code>, the repository
                    is <code>python</code> and the tag selects a Python 3.13 image based on Alpine Linux.
                </li>
                <li>Tags can point to new image content later. Even a version tag can receive updates.</li>
                <li>
                    A digest identifies exact image content. Use a verified digest when a release must use
                    precisely the same artifact.
                </li>
                <li>
                    Images must also match the machine's operating system and processor architecture. Packaging
                    does not remove these requirements.
                </li>
            </ul>
            <p>
                To share an image you have built, give it a tag under a registry repository you can write to,
                sign in to that registry, and push the image. Another machine can then pull it. Building an
                image locally does not publish it, and a registry account is not needed for these exercises.
            </p>
            <p>
                Read alongside the official{' '}
                <a className="Link" href="https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/" target="_blank" rel="noreferrer">container
                tutorial</a>.
            </p>
            <p>
                Continue with <a className="Link" href={toHref(DOCKER_BUILD_RUN_ROUTE)}>Chapter 2: build our own
                website image</a>.
            </p>
        </section>

    </ArticleLayout>
);

export default DockerContainers;
