import './ExperiencePage.css';
import { getFormattedDate } from '../Utils';
import { Technologies } from '../common';
import type { Experience as ExperienceModel } from '../types';
import { experiences } from './experiences';

interface ExperienceProps {
    experience: ExperienceModel;
}

const Experience = ({ experience }: ExperienceProps) => {
    return (
        <article className="Experience">
            {experience.companyLogo && (
                <div className="CompanyLogoWrapper">
                    <img
                        src={experience.companyLogo}
                        alt={`${experience.company} logo`}
                        className="CompanyLogo"
                    />
                </div>
            )}

            <div className="Experience__details">
                <div className="Experience__titles">
                    <h3 className="CompanyName">{experience.company}</h3>
                    <h4 className="Position">{experience.jobRole}</h4>
                </div>

                <div className="DateContainer">
                    <span>{getFormattedDate(experience.startDate)}</span>
                    <span className="DateSeparator">-</span>
                    {experience.endDate === null ? (
                        <span className="PresentDate">PRESENT</span>
                    ) : (
                        <span>{getFormattedDate(experience.endDate)}</span>
                    )}
                </div>

                <Technologies technologies={experience.tech} />

                <ul className="WorkDetailsList">
                    {experience.workDetails.map((workDetailsItem) => (
                        <li key={workDetailsItem} className="WorkDetailsItem">
                            {workDetailsItem}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
};

const ExperiencePage = () => {
    return (
        <section className="Section ExperienceSection">
            <h2 className="SectionTitle">Work Experience</h2>
            <div className="SectionInner ExperiencesList">
                {experiences.map((experience) => (
                    <Experience
                        key={`${experience.company}-${experience.startDate}`}
                        experience={experience}
                    />
                ))}
            </div>
        </section>
    );
};

export default ExperiencePage;
