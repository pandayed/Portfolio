import React from "react";
import { experiences } from '../Model/Experience';

const ExperiencePage = () => {
    return (
        <div>
            <p className="SectionTitle">Experience</p>
            {experiences.map((experience, index) => (
                <div key={index} className="Experience">
                    <div className="CompanyName">{experience.company}</div>
                    <div className="Position">{experience.jobRole}</div>
                    <div className="Duration">{experience.tech}</div>
                </div>
            ))}

        </div>
    );
};


export default ExperiencePage;