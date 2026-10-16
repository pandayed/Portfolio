import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { DOCKER_BUILD_RUN_ROUTE, DOCKER_NETWORK_STORAGE_ROUTE, DOCKER_NOTES_ROUTE, toHref } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';

const sections: TocEntry[] = [
    { id: 'dockerfile-instructions', title: 'Dockerfile' },
    { id: 'docker-build-context', title: 'Builds and containers' },
    { id: 'docker-build-cache', title: 'Image updates and container replacement' },
    { id: 'docker-build-practices', title: 'Image contents and runtime settings' },
];

const DockerBuildRun = () => (
    <ArticleLayout title="2. Building and updating Docker images" route={DOCKER_BUILD_RUN_ROUTE} sections={sections}
        backRoute={DOCKER_NOTES_ROUTE} backLabel="Back to Docker lessons">
        <section className="Article__section" aria-labelledby="dockerfile-instructions">
            <h2 id="dockerfile-instructions" className="SectionTitle">Dockerfile</h2>
            <ul className="Article__notes">
                <li>A Dockerfile defines the instructions Docker follows to build a new image.</li>
                <li>These instructions specify the base image, application files, and settings needed by the container.</li>
                <li>Each instruction begins with a keyword such as <code>FROM</code> or <code>COPY</code>.</li>
                <li>Docker processes the instructions in order. Later instructions build on the earlier ones.</li>
            </ul>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Instruction</th><th>Role</th></tr></thead>
                    <tbody>
                        <tr><td><code>FROM</code></td><td>Selects the base image that provides the starting files and runtime.</td></tr>
                        <tr><td><code>WORKDIR</code></td><td>Sets a directory inside the image for later build commands and the container process. It does not select the Dockerfile on the host.</td></tr>
                        <tr><td><code>COPY</code></td><td>Adds project files to the image.</td></tr>
                        <tr><td><code>USER</code></td><td>Sets the operating-system user identity for later build commands and the container process.</td></tr>
                        <tr><td><code>EXPOSE</code></td><td>Documents the container port. It does not publish that port on the host.</td></tr>
                        <tr><td><code>CMD</code></td><td>Sets the default command for a container created from the image.</td></tr>
                    </tbody>
                </table>
            </div>
            <LearningNoteExampleBlock example={{
                title: "Website files and their Dockerfile",
                description: [
                    "This example packages a small website with Python's built-in HTTP server.",
                    <>The <code>Dockerfile</code> below combines the instructions above into one image definition.</>,
                    "The server is for local learning, not public production hosting.",
                    <>The commands create a directory named <code>docker-lessons</code> and every required file inside it.</>,
                    "Chapters 3 and 4 use the same directory.",
                    "Docker must be running.",
                    "Python runs inside the container.",
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
                    <><code>FROM</code> starts from an image that already contains Python.</>,
                    <><code>WORKDIR /site</code> selects <code>/site</code> inside the image, not the project directory on the host.</>,
                    <>Docker creates <code>/site</code> if it does not exist.</>,
                    <>In <code>COPY site/ ./</code>, the source <code>site/</code> comes from the host build context.</>,
                    <>The destination <code>./</code> is relative to <code>WORKDIR</code>, so the files are copied into <code>/site</code> inside the image.</>,
                    <>The container's default command also starts in <code>/site</code>, so the Python server serves the copied website files.</>,
                    <>Without <code>WORKDIR</code>, the base image's working directory applies, or <code>/</code> if none is set.</>,
                    <>The host directory containing <code>Dockerfile</code> does not become the container's working directory automatically.</>,
                    "It runs during the build.",
                    "It does not keep the host directory connected to the container.",
                    <><code>USER</code> sets the operating-system identity that runs the container process. It does not refer to a person using the website.</>,
                    <>In <code>USER 10001:10001</code>, the first number is the user ID (UID) and the second is the group ID (GID).</>,
                    "These IDs determine which files the process can access under Linux file permissions.",
                    <><code>10001</code> is an example choice, not a special Docker value. UID <code>0</code> identifies root, the privileged user.</>,
                    "This line makes the server run as a non-root identity, reducing its privileges.",
                    <><code>USER</code> selects an identity; it does not create a named account. This Linux example can run with numeric IDs without a username.</>,
                    "The copied website files are readable by this identity, and the server needs no write access to them.",
                    <><code>EXPOSE</code> documents the intended container port.</>,
                    "It does not make the server reachable from your computer.",
                    <><code>CMD</code> sets the default startup command.</>,
                    "Docker runs it when a container starts, rather than while building the image.",
                    <><code>.dockerignore</code> excludes matching local files from the build context.</>,
                    "Credentials should never be copied into images.",
                ],
            }} />

        </section>

        <section className="Article__section" aria-labelledby="docker-build-context">
            <h2 id="docker-build-context" className="SectionTitle">2. Builds and container startup</h2>
            <ul className="Article__notes">
                <li>The Dockerfile defines the image, but writing it does not build anything.</li>
                <li><code>docker build</code> reads the Dockerfile and executes its build instructions to create the image.</li>
                <li>The build context supplies the files available to instructions such as <code>COPY</code>.</li>
                <li>After the build, <code>docker run</code> creates a container from the image and starts its default command.</li>
            </ul>
            <LearningNoteExampleBlock example={{
                title: "An image build and website request",
                description: [
                    <>The working directory is <code>docker-lessons</code> with the files above.</>,
                    <>The example requires port 8080 to be free after removal of the Chapter 1 <code>lesson-web</code> container.</>,
                ],
                language: "text",
                code: [
                    "docker build --tag lesson-site:v1 .",
                    "docker run --name lesson-site --detach --publish 127.0.0.1:8080:8000 lesson-site:v1",
                    "curl http://127.0.0.1:8080/",
                    "docker logs lesson-site",
                ].join('\n'),
                explanation: [
                    <>In <code>docker build --tag lesson-site:v1 .</code>, the <code>.</code> after <code>lesson-site:v1</code> means the current host directory.</>,
                    "That directory is the build context: the files available to the builder.",
                    <>Docker automatically looks for <code>Dockerfile</code> at the root of that context unless a different file is selected with <code>-f</code>.</>,
                    <>That file lookup is separate from <code>WORKDIR</code>, which selects a directory inside the image.</>,
                    <><code>COPY</code> paths are relative to that context.</>,
                    <><code>--tag</code> names the resulting image <code>lesson-site:v1</code>.</>,
                    "This name is local.",
                    "Building does not upload anything to a registry.",
                    <><code>curl</code> should return the HTML file containing Hello from our container.</>,
                    "It can take a moment for the server to start.",
                    "An initial connection failure can occur before startup finishes.",
                    <>A browser at <code>http://127.0.0.1:8080/</code> renders the page.</>,
                    <><code>docker logs</code> shows the server request log.</>,
                ],
            }} />

        </section>

        <section className="Article__section" aria-labelledby="docker-build-cache">
            <h2 id="docker-build-cache" className="SectionTitle">3. Image updates and container replacement</h2>
            <ul className="Article__notes">
                <li>A running container uses the image it was created from.</li>
                <li>Editing a project file on the host does not change the copy already built into that image.</li>
                <li>A new build includes the edited file in a new image.</li>
                <li>The existing container still uses the original image, so the update requires a replacement container created from the new image.</li>
            </ul>
            <LearningNoteExampleBlock example={{
                title: "A second image version and replacement container",
                description: [
                    <>The working directory remains <code>docker-lessons</code>.</>,
                    "The first command replaces only the lesson HTML file.",
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
                    "The new image contains the edited HTML.",
                    "The old running container would still have served the original file until replaced.",
                    <>After the new server starts, <code>curl</code> returns Hello from version two inside an <code>h1</code> element.</>,
                    "Startup can delay the first successful request.",
                    "The final two commands remove this practice container and free port 8080.",
                    "The next chapter uses both images and the project files.",
                ],
            }} />

            <h3 className="Article__subTitle">The build cache reuses unchanged steps</h3>
            <ul className="Article__notes">
                <li>Rebuilding does not always repeat every build step. Docker's build cache can reuse unchanged results.</li>
                <li>A changed file used by <code>COPY</code> invalidates that step and dependent later steps.</li>
                <li>For applications with dependencies, installing them before copying frequently edited source files allows later builds to reuse that installation.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="docker-build-practices">
            <h2 id="docker-build-practices" className="SectionTitle">4. Image contents and runtime settings</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Instruction</th><th>When it acts</th><th>Purpose</th></tr></thead>
                    <tbody>
                        <tr><td><code>RUN</code></td><td>During the build</td><td>Installs dependencies or creates files in the image. It does not start a lasting service.</td></tr>
                        <tr><td><code>CMD</code></td><td>At container startup</td><td>Provides the default command or arguments. A command after the image name can replace it.</td></tr>
                        <tr><td><code>ENTRYPOINT</code></td><td>At container startup</td><td>Defines the executable. When present, <code>CMD</code> commonly supplies its default arguments.</td></tr>
                        <tr><td><code>ENV</code></td><td>Saved in the image</td><td>Sets environment defaults. Runtime settings can override them. Secrets in <code>ENV</code> remain in the image configuration.</td></tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>Our website needs no package installation, so its Dockerfile has no <code>RUN</code> step.</li>
                <li>It uses <code>CMD</code> without <code>ENTRYPOINT</code> so we can easily replace the server with a short client command in Chapter 3.</li>
                <li>Application code and required runtime files belong in the image.</li>
                <li>Deployment-specific settings can be supplied when containers are created.</li>
                <li>A runtime environment override affects the application only if it reads that variable.</li>
                <li>Passwords, private keys, and tokens in Dockerfiles, build arguments, or copied files can expose credentials.</li>
                <li>Applications that need credentials require a suitable secret mechanism.</li>
                <li>A larger application may use a multi-stage build: one stage compiles the program and another contains only its runtime files.</li>
                <li>Our static site needs no compilation stage.</li>
                <li>Rebuilding with trusted, updated base images incorporates their fixes.</li>
                <li>A tag helps select a version.</li>
                <li>A verified digest fixes exact content.</li>
                <li>Further explanation appears in the official{' '} <a className="Link" href="https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/" target="_blank" rel="noreferrer">Dockerfile tutorial</a>.</li>
                <li>The{' '} <a className="Link" href="https://docs.docker.com/build/cache/" target="_blank" rel="noreferrer">build cache guide</a> explains reuse in more detail.</li>
                <li>The next chapter is <a className="Link" href={toHref(DOCKER_NETWORK_STORAGE_ROUTE)}>Chapter 3: container networks and storage</a>.</li>
            </ul>
        </section>

    </ArticleLayout>
);

export default DockerBuildRun;
