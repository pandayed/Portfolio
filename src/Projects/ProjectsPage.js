import React from "react"; 
import './ProjectsPage.css';
import { Technologies } from "../common";
import PortfolioImage from '../assets/project-images/portfolio.png';
import GitHub from '../assets/common-icons/ic_github.svg';

const RepoVisibility = (props) => {
    return (
        <div className="RepoVisibility">
            <img src={GitHub} className="VisibilityIcon"/>
            <p className="VisibilityText">{props.visibility}</p>
        </div>
    );
}

const Projects = [
    {
        title: "Portfolio",
        url: "https://pandayed.github.io/Portfolio/",
        technologies: [
            "React",
            "JavaScript"
        ],
        description: "An Open Source Portfolio built with React and JavaScript.",
        projectImage: PortfolioImage,
        visibility: "Public"
    },
    {
        title: "EdPub",
        url: "https://www.linkedin.com/in/pandayed/",
        technologies: [
            "Kotlin",
            "Android",
            "Firebase"
        ],
        visibility: "Private"
    },
    {
        title: "Epione",
        url: "",
        technologies: [
            "Flutter",
            "Android",
            "Firebase"
        ],
        visibility: "Private"
    }
]

const Project = (props) => {
    const { project } = props;

    return (
        <a
            href={project.url} // Link to the project's URL
            target="_blank" // Opens the link in a new tab
            rel="noopener noreferrer" // Adds security by preventing access to `window.opener`
            className="Project"
        >
            <div className="ProjectTextDetails">
                <p className="ProjectTitle">{project.title} </p>
                <RepoVisibility visibility={project.visibility} />
                <p className="ProjectDescription">{project.description}</p>
                <Technologies technologies={project.technologies} />
            </div>
            {project.projectImage && <img src={project.projectImage} className="ProjectImage"/>}
        </a>
    );
};

export const ProjectsPage = () => {
    return (
        <div className="ProjectsPage">
            <div className="SectionTitle">Featured Projects</div>
            <div className="ProjectsList">
                {
                    Projects.map((project, index)=>(
                        <Project project={project}/>
                    ))
                }
            </div>

        </div>
    );
};