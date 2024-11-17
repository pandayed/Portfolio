import React from "react";
import { experiences } from '../Model/Experience';
import './ExperiencePage.css';
import { getFormattedDate } from '../Utils.js';
import { Technologies } from  '../common.js';

const Experience = (props) => {  // Use props instead of destructuring
    return (
        <div className="Experience">
            <div className="CompanyLogoContainer">
                <div className="CompanyLogoWrapper">
                    <img src={props.experience.companyLogo} alt="Cisco" className="CompanyLogo">
                    </img>
                </div>
            </div>

            <div className="CompanyDetails">
                <div className="CompanyName">{props.experience.company}</div>
                <div className="Position">{props.experience.jobRole}</div>
                <div className="DateContainer">
                    <div className="StartEndDate">
                        {getFormattedDate(props.experience.startDate)}
                    </div>
                    <div className="DateSeparator">
                        -
                    </div>
                    {
                        props.experience.endDate === undefined ? (
                            <div className="PresentDate">PRESENT</div>
                        ) : (
                            <div className="StartEndDate">{getFormattedDate(props.experience.endDate)}</div>
                        )
                    }

                </div>
                <Technologies technologies={props.experience.tech} />
                <div className="WorkDetails">
                    {
                        <ul className="WorkDetailsList">
                            {props.experience.workDetails.map((workDetailsItem, index) => (
                                <li className="WorkDetailsItem">
                                    {workDetailsItem}
                                </li>
                            ))}
                        </ul>
                    }
                </div>
            </div>




        </div>
    );
}

const ExperiencePage = () => {
    return (
        <div className="ExperienceSection">
            <div className="SectionTitle">Work Experience</div>
            <div className="ExperiencesList">
                {experiences.map((experience, index) => (
                    <Experience key={index} experience={experience} />  // Passing experience as a prop
                ))}
            </div>

        </div>
    );
};

export default ExperiencePage;