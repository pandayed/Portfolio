import React from "react";
import { Technologies } from "../common";
import PortfolioImage from '../assets/project-images/portfolio.png';
import GitHub from '../assets/common-icons/ic_github.svg';

const RepoVisibility = ({ visibility }) => {
    return (
        <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-lg text-xs px-2 py-1">
            <img src={GitHub} alt="GitHub icon" className="h-2.5 w-2.5" />
            <p className="m-0">{visibility}</p>
        </div>
    );
}

const Projects = [
    {
        title: "Portfolio",
        deployment: "https://pandayed.github.io/Portfolio/",
        github: "https://github.com/pandayed/Portfolio",
        technologies: [
            "React",
            "JavaScript"
        ],
        description: "An Open Source Portfolio built with React and JavaScript.",
        projectImage: PortfolioImage,
        visibility: "Public"
    }
]

const GitHubLink = ({ githubLink, text }) => {
    return (
        <a 
            href={githubLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex font-['Source_Code_Pro'] text-white items-center border-b border-white pb-0.5 hover:italic"
        >
            {text}
        </a>
    )
}

const Project = ({ project }) => {
    return (
        <a
            href={project.deployment || project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex text-white border border-white/10 rounded-lg bg-white/5 p-5 gap-5 hover:border-white/30 hover:bg-white/10 transition-all duration-300"
        >
            <div className="flex flex-col gap-5 flex-grow">
                <div>
                    <p className="m-0 font-['Source_Code_Pro'] text-2xl font-bold">
                        {project.title}
                    </p>
                    <div className="flex flex-row gap-5 mt-2 items-center">
                        <RepoVisibility visibility={project.visibility} />
                        <div className="flex gap-4">
                            {project.github && <GitHubLink githubLink={project.github} text="View Repo"/>}
                            {project.deployment && <GitHubLink githubLink={project.deployment} text="View Deployment"/>}
                        </div>
                    </div>
                </div>

                <p className="m-0 leading-5">
                    {project.description}
                </p>

                <Technologies technologies={project.technologies} />
            </div>

            {project.projectImage && (
                <img 
                    src={project.projectImage} 
                    alt={`${project.title} project`}
                    className="rounded-lg h-auto w-3/5 object-cover"
                />
            )}
        </a>
    );
};

export const ProjectsPage = () => {
    return (
        <div className="bg-[#1F242C] py-24 px-4 sm:px-8 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-white text-center mb-12">
                    Featured Projects
                </h2>
                <div className="space-y-5">
                    {Projects.map((project, index) => (
                        <Project key={index} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};