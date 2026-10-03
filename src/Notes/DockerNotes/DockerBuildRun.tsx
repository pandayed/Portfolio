import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { DOCKER_BUILD_RUN_ROUTE, DOCKER_NOTES_ROUTE } from '../../routing/routes';
import NoteArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'dockerfile-instructions', title: 'Dockerfile instructions' },
    { id: 'docker-build-context', title: 'Build context and .dockerignore' },
    { id: 'docker-build-cache', title: 'Layer order and build cache' },
    { id: 'docker-build-run', title: 'Build and run' },
    { id: 'docker-build-practices', title: 'Build rules' },
];

const dockerfile = [
    'FROM node:22-alpine',
    '',
    'WORKDIR /app',
    '',
    'COPY package*.json ./',
    'RUN npm ci --omit=dev',
    '',
    'COPY --chown=node:node . .',
    '',
    'ENV NODE_ENV=production',
    'USER node',
    'EXPOSE 3000',
    'CMD ["node", "server.js"]',
].join('\n');

const dockerignore = ['node_modules', 'dist', '.git', '.env', 'npm-debug.log*'].join('\n');

const buildAndRun = [
    'docker build --tag orders-api:local .',
    'docker run --rm --name orders-api \\',
    '  --publish 127.0.0.1:3000:3000 \\',
    '  --env-file .env.local \\',
    '  orders-api:local',
].join('\n');

const DockerBuildRun = () => (
    <NoteArticleLayout
        title="Build and run an image"
        route={DOCKER_BUILD_RUN_ROUTE}
        sections={sections}
        backRoute={DOCKER_NOTES_ROUTE}
        backLabel="Back to Docker notes"
    >
        <section className="Article__section">
            <p>
                A Dockerfile describes how to build an image. The build context supplies its files.
                The resulting image should contain the runtime files, not local caches or secrets.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="dockerfile-instructions">
            <h2 id="dockerfile-instructions" className="SectionTitle">Dockerfile instructions</h2>
            <CodeBlock language="text">{dockerfile}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Instruction</th><th>Purpose</th></tr></thead>
                    <tbody>
                        <tr><td><code>FROM</code></td><td>Selects the base image.</td></tr>
                        <tr><td><code>WORKDIR</code></td><td>Sets the directory for later build steps and the default runtime directory.</td></tr>
                        <tr><td><code>COPY</code></td><td>Copies files from the build context into the image.</td></tr>
                        <tr><td><code>RUN</code></td><td>Executes a command while building the image.</td></tr>
                        <tr><td><code>ENV</code></td><td>Sets an image environment default.</td></tr>
                        <tr><td><code>USER</code></td><td>Selects the user for later build steps and container startup.</td></tr>
                        <tr><td><code>EXPOSE</code></td><td>Documents a container port. It does not publish the port.</td></tr>
                        <tr><td><code>CMD</code></td><td>Defines the default container command.</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="docker-build-context">
            <h2 id="docker-build-context" className="SectionTitle">Build context and .dockerignore</h2>
            <p>
                The final argument to <code>docker build</code> is the build context. A final dot
                means the current directory. A <code>COPY</code> instruction cannot read an
                arbitrary file outside that context.
            </p>
            <CodeBlock language="text">{dockerignore}</CodeBlock>
            <p>
                A <code>.dockerignore</code> file removes unnecessary or sensitive files from the
                context before the builder processes it. Do not send local dependencies, Git data,
                build output, or environment files unless the build needs them.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="docker-build-cache">
            <h2 id="docker-build-cache" className="SectionTitle">Layer order and build cache</h2>
            <p>
                Docker can reuse an unchanged build step. Once a layer changes, later layers usually
                need to run again. Copy dependency manifests and install dependencies before copying
                frequently changed source code. A source edit can then reuse the dependency layer.
            </p>
            <ul className="Article__notes">
                <li>A changed <code>RUN</code> command invalidates that build step.</li>
                <li>A changed file used by <code>COPY</code> or <code>ADD</code> invalidates that step.</li>
                <li>A changed base image can invalidate dependent layers.</li>
                <li><code>docker build --no-cache</code> skips cache reuse. It does not make an image automatically safer or smaller.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="docker-build-run">
            <h2 id="docker-build-run" className="SectionTitle">Build and run</h2>
            <CodeBlock language="text">{buildAndRun}</CodeBlock>
            <ul className="Article__notes">
                <li><code>--tag</code> gives the image a readable local name.</li>
                <li><code>--rm</code> removes the container after it stops.</li>
                <li><code>--env-file</code> supplies runtime configuration. It does not add that file to the image.</li>
                <li>Confirm that the application listens on <code>0.0.0.0</code> inside the container, not only on its internal loopback address.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="docker-build-practices">
            <h2 id="docker-build-practices" className="SectionTitle">Build rules</h2>
            <ul className="Article__notes">
                <li>Use a trusted base image and rebuild when its security fixes are published.</li>
                <li>Use a non-root runtime user when the application does not need root privileges.</li>
                <li>Do not put credentials in a Dockerfile, image layer, build argument, or committed environment file.</li>
                <li>Use multi-stage builds when build tools are not needed in the runtime image.</li>
                <li>Keep the runtime image focused. Debugging tools can be supplied separately when needed.</li>
            </ul>
            <p>
                References: <a className="Link" href="https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/" target="_blank" rel="noreferrer">Writing a Dockerfile</a> and{' '}
                <a className="Link" href="https://docs.docker.com/get-started/docker-concepts/building-images/using-the-build-cache/" target="_blank" rel="noreferrer">Using the build cache</a> in the official Docker documentation.
            </p>
        </section>
    </NoteArticleLayout>
);

export default DockerBuildRun;
