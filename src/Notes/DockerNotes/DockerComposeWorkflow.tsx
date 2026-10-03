import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { DOCKER_COMPOSE_ROUTE, DOCKER_NOTES_ROUTE } from '../../routing/routes';
import NoteArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'compose-model', title: 'Compose application model' },
    { id: 'compose-file', title: 'A two-service application' },
    { id: 'compose-commands', title: 'Daily commands' },
    { id: 'compose-debugging', title: 'Debug a Compose stack' },
    { id: 'compose-cleanup', title: 'Cleanup boundaries' },
];

const composeFile = [
    'services:',
    '  api:',
    '    build: .',
    '    ports:',
    '      - "127.0.0.1:3000:3000"',
    '    environment:',
    '      DATABASE_URL: postgres://app:local-only@db:5432/app',
    '    depends_on:',
    '      db:',
    '        condition: service_healthy',
    '',
    '  db:',
    '    image: postgres:17-alpine',
    '    environment:',
    '      POSTGRES_DB: app',
    '      POSTGRES_USER: app',
    '      POSTGRES_PASSWORD: local-only',
    '    volumes:',
    '      - db-data:/var/lib/postgresql/data',
    '    healthcheck:',
    '      test: ["CMD-SHELL", "pg_isready -U app -d app"]',
    '      interval: 5s',
    '      timeout: 3s',
    '      retries: 10',
    '',
    'volumes:',
    '  db-data:',
].join('\n');

const dailyCommands = [
    'docker compose config',
    'docker compose up --detach --build',
    'docker compose ps',
    'docker compose logs --follow api',
    'docker compose exec api sh',
    'docker compose down',
].join('\n');

const DockerComposeWorkflow = () => (
    <NoteArticleLayout
        title="Docker Compose and daily workflow"
        route={DOCKER_COMPOSE_ROUTE}
        sections={sections}
        backRoute={DOCKER_NOTES_ROUTE}
        backLabel="Back to Docker notes"
    >
        <section className="Article__section">
            <p>
                Docker Compose defines a multi-container application in one YAML file. A Dockerfile
                builds an image. A Compose file defines how services run together.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="compose-model">
            <h2 id="compose-model" className="SectionTitle">Compose application model</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Element</th><th>Meaning</th></tr></thead>
                    <tbody>
                        <tr><td>Service</td><td>A container configuration built from an image plus runtime settings.</td></tr>
                        <tr><td>Network</td><td>Connectivity and name resolution between attached services.</td></tr>
                        <tr><td>Volume</td><td>Persistent data mounted into one or more services.</td></tr>
                        <tr><td>Config or secret</td><td>Configuration supplied independently from an image.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                Compose creates a default network when the file does not define one. Each service
                joins it and can be resolved by its service name. The application code should
                connect to <code>db</code>, not <code>localhost</code>, for the database below.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="compose-file">
            <h2 id="compose-file" className="SectionTitle">A two-service application</h2>
            <CodeBlock language="text">{composeFile}</CodeBlock>
            <ul className="Article__notes">
                <li>The API image is built from the Dockerfile in the current directory.</li>
                <li>The database uses a published PostgreSQL image.</li>
                <li>The database port is not published because only the API needs it.</li>
                <li>The named volume preserves database files across container replacement.</li>
                <li>The health condition prevents Compose from starting the API before the database health check succeeds. The API still needs normal retry and error handling.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="compose-commands">
            <h2 id="compose-commands" className="SectionTitle">Daily commands</h2>
            <CodeBlock language="text">{dailyCommands}</CodeBlock>
            <p>
                <code>docker compose config</code> resolves variables, file merges, networks, and
                volumes without starting the application. <code>up --detach --build</code> rebuilds
                changed images and reconciles the running services in the background.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="compose-debugging">
            <h2 id="compose-debugging" className="SectionTitle">Debug a Compose stack</h2>
            <ol className="Article__steps">
                <li>Run <code>docker compose config</code> and confirm the resolved values.</li>
                <li>Run <code>docker compose ps --all</code> and check state, exit codes, health, and published ports.</li>
                <li>Read <code>docker compose logs service-name</code> for the failed service.</li>
                <li>Use <code>docker compose exec service-name command</code> only when the service is running.</li>
                <li>Check that service-to-service URLs use service names and container ports.</li>
                <li>Inspect the network and mounts when the configuration looks correct but connectivity or files are wrong.</li>
            </ol>
        </section>

        <section className="Article__section" aria-labelledby="compose-cleanup">
            <h2 id="compose-cleanup" className="SectionTitle">Cleanup boundaries</h2>
            <ul className="Article__notes">
                <li><code>docker compose stop</code> stops containers without removing them.</li>
                <li><code>docker compose down</code> removes the application containers and default network.</li>
                <li><code>docker compose down --volumes</code> also removes declared named volumes and their data.</li>
                <li>Image and system prune commands can affect resources outside the current Compose project.</li>
            </ul>
            <p>
                References: <a className="Link" href="https://docs.docker.com/compose/intro/compose-application-model/" target="_blank" rel="noreferrer">How Compose works</a> and{' '}
                <a className="Link" href="https://docs.docker.com/compose/gettingstarted/" target="_blank" rel="noreferrer">Docker Compose Quickstart</a> in the official Docker documentation.
            </p>
        </section>
    </NoteArticleLayout>
);

export default DockerComposeWorkflow;
