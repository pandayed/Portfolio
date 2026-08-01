import './ProjectsPage.css';
import '../CommonClasses/CommonClasses.css';
import { Technologies } from '../common';
import type { Project as ProjectModel } from '../types';
import GitHubIcon from '../assets/common-icons/ic_github.svg';
import { projects } from './projects';

interface RepoVisibilityProps {
    visibility: string;
}

const RepoVisibility = ({ visibility }: RepoVisibilityProps) => {
    return (
        <span className="RepoVisibility">
            <img src={GitHubIcon} alt="" className="VisibilityIcon" />
            {visibility}
        </span>
    );
};

interface ExternalLinkProps {
    href: string;
    text: string;
}

const ExternalLink = ({ href, text }: ExternalLinkProps) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="UnderlinedLink">
            {text}
        </a>
    );
};

interface ProjectProps {
    project: ProjectModel;
}

const Project = ({ project }: ProjectProps) => {
    return (
        <div className="Project">
            {project.projectImage && (
                <img
                    src={project.projectImage}
                    alt={`${project.title} project`}
                    className="ProjectImage ProjectImage--compact"
                />
            )}

            <div className="ProjectTextDetails">
                <div>
                    <p className="ProjectTitle">{project.title}</p>
                    <div className="VisibilityAndLinks">
                        <RepoVisibility visibility={project.visibility} />
                        <div className="ProjectLinks">
                            {project.github && (
                                <ExternalLink href={project.github} text="View Repo" />
                            )}
                            {project.deployment && (
                                <ExternalLink href={project.deployment} text="View Deployment" />
                            )}
                        </div>
                    </div>
                </div>

                <p className="ProjectDescription">{project.description}</p>

                <Technologies technologies={project.technologies} />
            </div>

            {project.projectImage && (
                <img
                    src={project.projectImage}
                    alt={`${project.title} project`}
                    className="ProjectImage ProjectImage--wide"
                />
            )}
        </div>
    );
};

export const ProjectsPage = () => {
    return (
        <section className="Section ProjectsPage">
            <div className="SectionInner">
                <h2 className="SectionTitle">Featured Projects</h2>
                <div className="ProjectsList">
                    {projects.map((project) => (
                        <Project key={project.title} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsPage;
