import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { DOCKER_INSTRUCTIONS_ROUTE, DOCKER_NOTES_ROUTE } from '../../routing/routes';
import ArticleLayout from '../NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'image-build', title: 'Image build' },
    { id: 'image-settings', title: 'Image settings' },
    { id: 'container-startup', title: 'Container startup' },
];

const groups = [
    {
        id: 'image-build',
        title: 'Image build',
        items: [
            ['FROM', 'Starts a build stage from a base image.'],
            ['WORKDIR', 'Sets the working directory inside the image and container.'],
            ['COPY', 'Copies files from the build context or another stage.'],
            ['ADD', 'Adds files, with additional archive and remote-source handling.'],
            ['RUN', 'Executes a command during the image build.'],
            ['ARG', 'Declares a build-time variable.'],
            ['ONBUILD', 'Registers instructions for builds that use this image as their base.'],
        ],
    },
    {
        id: 'image-settings',
        title: 'Image settings',
        items: [
            ['ENV', 'Sets environment defaults retained in the image.'],
            ['USER', 'Selects the identity for subsequent build commands and container processes.'],
            ['EXPOSE', 'Documents container ports without publishing them on the host.'],
            ['VOLUME', 'Declares a mount point for storage outside the writable layer.'],
            ['LABEL', 'Adds key-value metadata to the image.'],
        ],
    },
    {
        id: 'container-startup',
        title: 'Container startup',
        items: [
            ['CMD', 'Sets the default container command or arguments.'],
            ['ENTRYPOINT', 'Sets the container executable, commonly combined with CMD arguments.'],
            ['HEALTHCHECK', 'Defines a command that checks container health.'],
            ['STOPSIGNAL', 'Selects the signal sent when stopping the container.'],
            ['SHELL', 'Selects the shell for subsequent shell-form instructions.'],
        ],
    },
];

const DockerInstructions = () => (
    <ArticleLayout
        title="Dockerfile instructions"
        route={DOCKER_INSTRUCTIONS_ROUTE}
        sections={sections}
        backRoute={DOCKER_NOTES_ROUTE}
        backLabel="Back to Docker lessons"
    >
        <section className="Article__section">
            <ul className="Article__notes">
                <li>Each instruction links to its detailed explanation in Docker's official reference.</li>
            </ul>
        </section>
        {groups.map((group) => (
            <section className="Article__section" aria-labelledby={group.id} key={group.id}>
                <h2 id={group.id} className="SectionTitle">{group.title}</h2>
                <div className="Article__tableWrap">
                    <table className="Article__table">
                        <thead><tr><th>Instruction</th><th>Purpose</th></tr></thead>
                        <tbody>
                            {group.items.map(([instruction, explanation]) => (
                                <tr key={instruction}>
                                    <td>
                                        <a className="Link" href={`https://docs.docker.com/reference/dockerfile/#${instruction.toLowerCase()}`}>
                                            <code>{instruction}</code>
                                        </a>
                                    </td>
                                    <td>{explanation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        ))}
    </ArticleLayout>
);

export default DockerInstructions;
