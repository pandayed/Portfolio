import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import {
    DOCKER_BUILD_RUN_ROUTE,
    DOCKER_COMMANDS_ROUTE,
    DOCKER_COMPOSE_ROUTE,
    DOCKER_CONTAINERS_ROUTE,
    DOCKER_NETWORK_STORAGE_ROUTE,
    DOCKER_NOTES_ROUTE,
    toHref,
} from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';

const commandGroups = [
    {
        id: 'docker-image-commands',
        title: 'Images and builds',
        commands: [
            {
                command: 'docker build',
                href: toHref(DOCKER_BUILD_RUN_ROUTE),
                meaning: 'Builds an image from a Dockerfile and build context.',
            },
            {
                command: 'docker pull',
                href: 'https://docs.docker.com/reference/cli/docker/image/pull/',
                meaning: 'Downloads an image from a registry.',
            },
            {
                command: 'docker tag',
                href: 'https://docs.docker.com/reference/cli/docker/image/tag/',
                meaning: 'Adds another image reference to an existing local image without uploading it.',
            },
            {
                command: 'docker login',
                href: 'https://docs.docker.com/reference/cli/docker/login/',
                meaning: 'Authenticates the Docker client to a registry.',
            },
            {
                command: 'docker push',
                href: 'https://docs.docker.com/reference/cli/docker/image/push/',
                meaning: 'Uploads an image to a registry repository where the account has write access.',
            },
            {
                command: 'docker image ls',
                href: 'https://docs.docker.com/reference/cli/docker/image/ls/',
                meaning: 'Lists images stored locally.',
            },
            {
                command: 'docker image rm',
                href: 'https://docs.docker.com/reference/cli/docker/image/rm/',
                meaning: 'Removes local image references and, when unused, their image data.',
            },
        ],
    },
    {
        id: 'docker-container-commands',
        title: 'Containers and inspection',
        commands: [
            {
                command: 'docker version',
                href: toHref(DOCKER_CONTAINERS_ROUTE),
                meaning: 'Shows Docker client and, when reachable, Engine version information.',
            },
            {
                command: 'docker run',
                href: toHref(DOCKER_CONTAINERS_ROUTE),
                meaning: 'Creates a new container from an image and starts its main process.',
            },
            {
                command: 'docker start',
                href: 'https://docs.docker.com/reference/cli/docker/container/start/',
                meaning: 'Starts an existing stopped container without creating a replacement.',
            },
            {
                command: 'docker stop',
                href: toHref(DOCKER_CONTAINERS_ROUTE),
                meaning: 'Stops a running container while retaining its configuration and writable files.',
            },
            {
                command: 'docker restart',
                href: 'https://docs.docker.com/reference/cli/docker/container/restart/',
                meaning: 'Restarts an existing container without rebuilding its image or recreating it.',
            },
            {
                command: 'docker rm',
                href: toHref(DOCKER_CONTAINERS_ROUTE),
                meaning: 'Removes a container and its writable layer; a running container requires stopping or forced removal.',
            },
            {
                command: 'docker ps',
                href: toHref(DOCKER_CONTAINERS_ROUTE),
                meaning: <>Lists running containers; <code>--all</code> also includes stopped containers.</>,
            },
            {
                command: 'docker logs',
                href: toHref(DOCKER_CONTAINERS_ROUTE),
                meaning: <>Displays a container’s captured output; <code>--follow</code> streams new messages.</>,
            },
            {
                command: 'docker exec',
                href: 'https://docs.docker.com/reference/cli/docker/container/exec/',
                meaning: 'Runs an additional command inside a running container.',
            },
            {
                command: 'docker inspect',
                href: 'https://docs.docker.com/reference/cli/docker/inspect/',
                meaning: 'Displays detailed configuration and state for a Docker object, such as a container.',
            },
            {
                command: 'docker stats',
                href: 'https://docs.docker.com/reference/cli/docker/container/stats/',
                meaning: 'Streams container resource measurements such as CPU and memory usage.',
            },
            {
                command: 'docker port',
                href: 'https://docs.docker.com/reference/cli/docker/container/port/',
                meaning: 'Lists the host port mappings published for a container.',
            },
        ],
    },
    {
        id: 'docker-network-storage-commands',
        title: 'Networking and storage',
        commands: [
            {
                command: 'docker network create',
                href: toHref(DOCKER_NETWORK_STORAGE_ROUTE),
                meaning: 'Creates a network that containers can join.',
            },
            {
                command: 'docker network ls',
                href: 'https://docs.docker.com/reference/cli/docker/network/ls/',
                meaning: 'Lists networks known to the Docker Engine.',
            },
            {
                command: 'docker network rm',
                href: toHref(DOCKER_NETWORK_STORAGE_ROUTE),
                meaning: 'Removes a network after attached containers have been disconnected or removed.',
            },
            {
                command: 'docker volume create',
                href: toHref(DOCKER_NETWORK_STORAGE_ROUTE),
                meaning: 'Creates Docker-managed volume storage independently of a container.',
            },
            {
                command: 'docker volume inspect',
                href: toHref(DOCKER_NETWORK_STORAGE_ROUTE),
                meaning: 'Displays a volume’s configuration and storage details.',
            },
            {
                command: 'docker volume rm',
                href: toHref(DOCKER_NETWORK_STORAGE_ROUTE),
                meaning: 'Deletes a volume and its stored data when no container still uses it.',
            },
        ],
    },
    {
        id: 'docker-compose-commands',
        title: 'Docker Compose',
        commands: [
            {
                command: 'docker compose config',
                href: toHref(DOCKER_COMPOSE_ROUTE),
                meaning: 'Resolves and prints the Compose configuration without starting services.',
            },
            {
                command: 'docker compose build',
                href: 'https://docs.docker.com/reference/cli/docker/compose/build/',
                meaning: 'Builds images for services that define a build configuration without starting containers.',
            },
            {
                command: 'docker compose up',
                href: toHref(DOCKER_COMPOSE_ROUTE),
                meaning: <>Creates or updates service containers and starts them; <code>--detach</code> runs them in the background.</>,
            },
            {
                command: 'docker compose ps',
                href: toHref(DOCKER_COMPOSE_ROUTE),
                meaning: <>Lists the project’s running containers; <code>--all</code> also includes stopped containers.</>,
            },
            {
                command: 'docker compose logs',
                href: toHref(DOCKER_COMPOSE_ROUTE),
                meaning: <>Displays service output; a service name selects one service and <code>--follow</code> streams messages.</>,
            },
            {
                command: 'docker compose exec',
                href: 'https://docs.docker.com/reference/cli/docker/compose/exec/',
                meaning: 'Runs an additional command inside an existing running service container.',
            },
            {
                command: 'docker compose run',
                href: toHref(DOCKER_COMPOSE_ROUTE),
                meaning: <>Creates a new service container for a one-off command; <code>--rm</code> removes it after exit.</>,
            },
            {
                command: 'docker compose stop',
                href: toHref(DOCKER_COMPOSE_ROUTE),
                meaning: 'Stops service containers without removing them.',
            },
            {
                command: 'docker compose start',
                href: toHref(DOCKER_COMPOSE_ROUTE),
                meaning: 'Starts existing stopped service containers without rebuilding or recreating them.',
            },
            {
                command: 'docker compose down',
                href: toHref(DOCKER_COMPOSE_ROUTE),
                meaning: <>Removes project containers and networks; <code>--volumes</code> also deletes declared and anonymous volumes.</>,
            },
        ],
    },
];

const sections: TocEntry[] = commandGroups.map(({ id, title }) => ({ id, title }));

const DockerCommands = () => (
    <ArticleLayout
        title="Docker commands"
        route={DOCKER_COMMANDS_ROUTE}
        sections={sections}
        backRoute={DOCKER_NOTES_ROUTE}
        backLabel="Back to Docker lessons"
    >
        <section className="Article__section">
            <ul className="Article__notes">
                <li>Each command links to its explanation in a lesson or the official Docker command reference.</li>
                <li>Command names below identify operations; container names, image references, and other required arguments depend on the operation.</li>
            </ul>
        </section>
        {commandGroups.map(({ id, title, commands }) => (
            <section key={id} className="Article__section" aria-labelledby={id}>
                <h2 id={id} className="SectionTitle">{title}</h2>
                <div className="Article__tableWrap">
                    <table className="Article__table">
                        <thead><tr><th>Command</th><th>What it does</th></tr></thead>
                        <tbody>
                            {commands.map(({ command, href, meaning }) => (
                                <tr key={command}>
                                    <td><a className="Link" href={href}><code>{command}</code></a></td>
                                    <td>{meaning}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        ))}
    </ArticleLayout>
);

export default DockerCommands;
