import React from "react";
import { experiences } from '../Model/Experience';
import './ExperiencePage.css';

const Experience = (props) => {  // Use props instead of destructuring
    return (
        <div className="Experience">
            <div className="CompanyName">{props.experience.company}</div>
            <div className="Position">{props.experience.jobRole}</div>
            <div className="Technology">
                {
                    props.experience.tech.map((technology, index) => (
                        <div className="TechItem">
                            {technology}
                        </div>
                    )
                    )
                }
            </div>
            <div className="WorkDetails">
                {
                    props.experience.workDetails.map((workDetailsItem, index) => (
                        <div className="WorkDetailsIteam">
                            {workDetailsItem}
                        </div>
                    ))
                }</div>
        </div>
    );
}

const ExperiencePage = () => {
    return (
        <div className="ExperienceSection">
            <p className="SectionTitle">Experience</p>
            {experiences.map((experience, index) => (
                <Experience key={index} experience={experience} />  // Passing experience as a prop
            ))}
        </div>
    );
};

export default ExperiencePage;