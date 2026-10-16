import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { DOCKER_BUILD_RUN_ROUTE, DOCKER_NETWORK_STORAGE_ROUTE, DOCKER_NOTES_ROUTE, toHref } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';

const sections: TocEntry[] = [
    { id: 'dockerfile-instructions', title: 'Create the project' },
    { id: 'docker-build-context', title: 'Build and run' },
    { id: 'docker-build-cache', title: 'Update and replace' },
    { id: 'docker-build-practices', title: 'Choose image contents' },
];

const DockerBuildRun = () => (
    <ArticleLayout title="2. Build and update our website image" route={DOCKER_BUILD_RUN_ROUTE} sections={sections}
        backRoute={DOCKER_NOTES_ROUTE} backLabel="Back to Docker lessons">
        <section className="Article__section" aria-labelledby="dockerfile-instructions">
            <h2 id="dockerfile-instructions" className="SectionTitle">1. Put our website in an image</h2>
            <p>
                Chapter 1 ran software from a published image. Now we will add our own files. A Dockerfile is a
                text file of build instructions. Docker reads it to produce a new image.
            </p>
            <p>
                We will keep one small website through the remaining chapters. It uses Python's built-in HTTP
                server so that no package installation, application framework, or database is required. This
                server is for local learning, not public production hosting.
            </p>
            <LearningNoteExampleBlock example={{
                title: "Create the lesson website and its Dockerfile",
                description: [
                    "Create a new directory named docker-lessons and work inside it. The shell commands below create every required file.",
                    "Keep this directory for Chapters 3 and 4. Docker must be running. The commands do not require Python on your host.",
                ],
                language: "text",
                code: [
                    "mkdir docker-lessons",
                    "cd docker-lessons",
                    "mkdir site",
                    "cat > site/index.html <<'EOF'",
                    "<!doctype html>",
                    "<html lang=\"en\">",
                    "<head><meta charset=\"utf-8\"><title>Container lessons</title></head>",
                    "<body><h1>Hello from our container</h1></body>",
                    "</html>",
                    "EOF",
                    "cat > Dockerfile <<'EOF'",
                    "FROM python:3.13-alpine",
                    "WORKDIR /site",
                    "COPY site/ ./",
                    "USER 10001:10001",
                    "EXPOSE 8000",
                    "CMD [\"python\", \"-m\", \"http.server\", \"8000\", \"--bind\", \"0.0.0.0\"]",
                    "EOF",
                    "cat > .dockerignore <<'EOF'",
                    ".git",
                    ".env",
                    ".env.*",
                    "*.log",
                    "EOF",
                ].join('\n'),
                explanation: [
                    "FROM starts from an image that already contains Python. WORKDIR sets /site as the working directory inside the image.",
                    "COPY places the host site directory contents into /site. It runs during the build. It does not keep the host directory connected to the container.",
                    "USER selects a non-root user for the server. The website files are readable by that user; the server does not need to write them.",
                    "EXPOSE documents the intended container port. It does not make the server reachable from your computer.",
                    "CMD sets the default startup command. Docker runs it when a container starts, rather than while building the image.",
                    ".dockerignore excludes matching local files from the build context. Credentials should never be copied into images.",
                ],
            }} />

        </section>

        <section className="Article__section" aria-labelledby="docker-build-context">
            <h2 id="docker-build-context" className="SectionTitle">2. Build first, then run</h2>
            <p>
                A build creates an image. A run creates a container from an image. These are separate actions:
                finishing a build does not start a server.
            </p>
            <LearningNoteExampleBlock example={{
                title: "Build the image and open our website",
                description: [
                    "Run from docker-lessons after creating the files above. Chapter 1 should have removed its lesson-web container, leaving port 8080 available.",
                ],
                language: "text",
                code: [
                    "docker build --tag lesson-site:v1 .",
                    "docker run --name lesson-site --detach --publish 127.0.0.1:8080:8000 lesson-site:v1",
                    "curl http://127.0.0.1:8080/",
                    "docker logs lesson-site",
                ].join('\n'),
                explanation: [
                    "The final dot passes the current directory as the build context: the files the builder may use. COPY paths are relative to that context.",
                    "--tag names the resulting image lesson-site:v1. This name is local. Building does not upload anything to a registry.",
                    "curl should return the HTML file containing Hello from our container. It can take a moment for the server to start. Retry the request if it initially cannot connect.",
                    "To see the rendered page, open http://127.0.0.1:8080/ in a browser. docker logs shows the server request log.",
                ],
            }} />

        </section>

        <section className="Article__section" aria-labelledby="docker-build-cache">
            <h2 id="docker-build-cache" className="SectionTitle">3. Change the source and replace the container</h2>
            <p>
                A running container uses the image it was created from. Editing a host file does not change that
                image. Rebuilding a tag also does not switch an existing container to the rebuilt image.
            </p>
            <p>
                Docker's build cache reuses unchanged work. When copied files change, that copy step and
                dependent later steps need fresh results. For applications with dependencies, copy the
                dependency list and install dependencies before copying frequently edited source files.
            </p>
            <LearningNoteExampleBlock example={{
                title: "Make a second version without editing the running container",
                description: [
                    "Continue in docker-lessons. The first command deliberately replaces only our small lesson HTML file.",
                ],
                language: "text",
                code: [
                    "printf '%s\\n' '<h1>Hello from version two</h1>' > site/index.html",
                    "docker build --tag lesson-site:v2 .",
                    "docker stop lesson-site",
                    "docker rm lesson-site",
                    "docker run --name lesson-site --detach --publish 127.0.0.1:8080:8000 lesson-site:v2",
                    "curl http://127.0.0.1:8080/",
                    "docker stop lesson-site",
                    "docker rm lesson-site",
                ].join('\n'),
                explanation: [
                    "The new image contains the edited HTML. The old running container would still have served the original file until replaced.",
                    "After the new server starts, curl returns Hello from version two inside an h1 element. Retry if startup is still in progress.",
                    "The final two commands remove this practice container and free port 8080. Keep both images and the project files for the next chapter.",
                ],
            }} />

        </section>

        <section className="Article__section" aria-labelledby="docker-build-practices">
            <h2 id="docker-build-practices" className="SectionTitle">4. Decide what belongs in the image</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Instruction</th><th>When it acts</th><th>Purpose</th></tr></thead>
                    <tbody>
                        <tr><td><code>RUN</code></td><td>During the build</td><td>Installs dependencies or creates files in the image. It does not start a lasting service.</td></tr>
                        <tr><td><code>CMD</code></td><td>At container startup</td><td>Provides the default command or arguments. A command after the image name can replace it.</td></tr>
                        <tr><td><code>ENTRYPOINT</code></td><td>At container startup</td><td>Defines the executable. When present, CMD commonly supplies its default arguments.</td></tr>
                        <tr><td><code>ENV</code></td><td>Saved in the image</td><td>Sets environment defaults. Runtime settings can override them. Do not store secrets here.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                Our website needs no package installation, so its Dockerfile has no RUN step. It uses CMD
                without ENTRYPOINT so we can easily replace the server with a short client command in Chapter 3.
            </p>
            <ul className="Article__notes">
                <li>Put application code and required runtime files in the image.</li>
                <li>
                    Supply deployment-specific settings when creating containers. An environment variable is a
                    named value passed to the process. Changing it only helps if the application actually reads
                    it.
                </li>
                <li>
                    Keep passwords, private keys, and tokens out of Dockerfiles, build arguments, and copied
                    files. Use a suitable secret mechanism when an application needs credentials.
                </li>
                <li>
                    A larger application may use a multi-stage build: one stage compiles the program and another
                    contains only its runtime files. Our static site needs no compilation stage.
                </li>
                <li>
                    Rebuild with trusted, updated base images. A tag helps select a version; a verified digest
                    fixes exact content.
                </li>
            </ul>
            <p>
                Read alongside the official{' '}
                <a className="Link" href="https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/" target="_blank" rel="noreferrer">Dockerfile
                tutorial</a>.
            </p>
            <p>
                The{' '}
                <a className="Link" href="https://docs.docker.com/build/cache/" target="_blank" rel="noreferrer">build
                cache guide</a> explains reuse in more detail.
            </p>
            <p>
                Continue with <a className="Link" href={toHref(DOCKER_NETWORK_STORAGE_ROUTE)}>Chapter 3: connect
                containers and keep files</a>.
            </p>
        </section>

    </ArticleLayout>
);

export default DockerBuildRun;
