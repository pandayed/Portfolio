import './Projects.css';
import '../CommonClasses/CommonClasses.css';

import Page from '../Page/Page';
import { projects, type Project, type ProjectLink } from './projectList';

const ProjectLinkItem = ({ title, href, external }: ProjectLink) => {
    return (
        <a
            href={href}
            className="Link Link--standalone"
            {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        >
            {title}
        </a>
    );
};

const ProjectEntry = ({ name, summary, stack, links }: Project) => {
    return (
        <li className="Projects__item">
            <h2 className="SectionTitle">{name}</h2>
            <p className="Projects__summary">{summary}</p>
            <p className="Projects__stack">{stack.join(' · ')}</p>
            <div className="Projects__links">
                {links.map((link) => (
                    <ProjectLinkItem key={link.href} {...link} />
                ))}
            </div>
        </li>
    );
};

const Projects = () => {
    return (
        <Page title="Projects">
            <ul className="Projects__list">
                {projects.map((project) => (
                    <ProjectEntry key={project.name} {...project} />
                ))}
            </ul>
        </Page>
    );
};

export default Projects;
