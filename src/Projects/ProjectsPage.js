import React from "react"; 
import './ProjectsPage.css';
import { Technologies } from "../common";

const Projects = [
    {
        title: "Portfolio",
        url: "https://pandayed.github.io/Portfolio/",
        technologies: [
            "React",
            "JavaScript"
        ]
    },
    // {
    //     title: "EdPub",
    //     url: "https://www.linkedin.com/in/pandayed/",
    //     technologies: [
    //         "Kotlin",
    //         "Android",
    //         "Firebase"
    //     ]
    // },
    // {
    //     title: "Epione",
    //     url: "",
    //     technologies: [
    //         "Flutter",
    //         "Android",
    //         "Firebase"
    //     ]
    // }
]

const Project = (props) => {
    const { project } = props;

    return (
        <a
            href={project.url} // Link to the project's URL
            target="_blank" // Opens the link in a new tab
            rel="noopener noreferrer" // Adds security by preventing access to `window.opener`
            className="ProjectLink"
        >
            <div className="Project">
                <p className="ProjectTitle">{project.title}</p>
                <Technologies technologies={project.technologies} />
            </div>
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