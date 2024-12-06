import React from "react";
import { getFormattedDate } from '../Utils.js';

// Import the logos
import CiscoLogo from '../assets/company_logos/ic_cisco.png';
import DefaultCompanyLogo from '../assets/company_logos/ic_default-company-logo.png';

const experiences = [
    {
        "companyLogo": CiscoLogo,
        "company": "Cisco",
        "jobRole": "Software Engineer",
        "startDate": "2024-08-01",
        "endDate": null,
        "tech": ["Go", "JavaScript", "Java", "Python", "Power BI", "React", "Splunk", "Spring Boot"],
        "workDetails": [
            "Developing Cisco SEA",
        ]
    },
    {
        "companyLogo": CiscoLogo,
        "company": "Cisco",
        "jobRole": "Software Engineer Intern",
        "startDate": "2024-02-01",
        "endDate": "2024-06-30",
        "tech": ["Python", "Numpy", "Pandas", "Splunk"],
        "workDetails": [
            "Developed Anomaly Detector for Remote Sessions on IoT Devices using classical machine learning",
            "Developed Splunk Add-on and Analysis Apps for Remote Session and User Behaviour analysis"
        ]
    },
    {
        "companyLogo": DefaultCompanyLogo,
        "company": "Exatorial",
        "jobRole": "Software Engineer Intern",
        "startDate": "2023-07-01",
        "endDate": "2023-12-31",
        "tech": ["Android", "XML", "Kotlin", "Retrofit", "Java", "Android SDK"],
        "workDetails": [
            "Developed a comprehensive android application for Supply Chain Management Services",
            "Integrated external USB Camera and Barcode and RFID Scanner via Bluetooth in the application"
        ]
    },
    {
        "companyLogo": DefaultCompanyLogo,
        "company": "Checko",
        "jobRole": "Mobile Development Intern",
        "startDate": "2023-01-01",
        "endDate": "2023-04-30",
        "tech": ["Android", "XML", "Kotlin", "CameraX"],
        "workDetails": [
            "Unit and Instrumentation Testing",
            "Integrated Google Play Integrity API to protect the database from risky and fraudulent traffic."
        ]
    },
    {
        "companyLogo": DefaultCompanyLogo,
        "company": "Mugs",
        "jobRole": "Android Application Developer",
        "startDate": "2022-06-01",
        "endDate": "2022-07-31",
        "tech": ["Android", "XML", "Kotlin", "MVP Architecture", "Firebase"],
        "workDetails": [
            "Developed UI",
            "Integrated Google Authentication, Firebase Realtime Database, and libraries in a money management application."
        ]
    }
];

const Technologies = ({ technologies }) => {
    return (
        <div className="flex flex-wrap gap-2 font-['Source_Code_Pro'] mt-2">
            {technologies.map((tech, index) => (
                <span 
                    key={index} 
                    className="text-xs inline-flex items-center justify-center px-2.5 py-1 bg-white/10 rounded-md"
                >
                    {tech}
                </span>
            ))}
        </div>
    );
};

const Experience = ({ experience }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 bg-[#20262F]/50 rounded-lg">
            {/* Company Logo Container */}
            <div className="flex justify-center md:justify-start items-center">
                <div className="inline-flex p-3 bg-white/5 rounded-xl">
                    <img 
                        src={experience.companyLogo} 
                        alt={`${experience.company} logo`} 
                        className="w-24 h-24 object-contain bg-white rounded-lg"
                    />
                </div>
            </div>

            {/* Company Details */}
            <div className="flex flex-col gap-4 flex-grow">
                {/* Company Name and Position */}
                <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-white">
                        {experience.company}
                    </h3>
                    <h4 className="text-xl font-['Source_Code_Pro'] text-white/80">
                        {experience.jobRole}
                    </h4>
                </div>

                {/* Date Container */}
                <div className="flex items-center gap-2 text-base font-['Source_Code_Pro']">
                    <span>{getFormattedDate(experience.startDate)}</span>
                    <span className="mx-2">-</span>
                    {experience.endDate === null ? (
                        <span className="text-green-500 font-semibold">PRESENT</span>
                    ) : (
                        <span>{getFormattedDate(experience.endDate)}</span>
                    )}
                </div>

                {/* Technologies */}
                <Technologies technologies={experience.tech} />

                {/* Work Details */}
                <ul className="list-disc list-outside pl-5 text-white/80 space-y-2">
                    {experience.workDetails.map((workDetailsItem, index) => (
                        <li key={index} className="text-base">
                            {workDetailsItem}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const ExperiencePage = () => {
    return (
        <div className="bg-[#20262F] py-16 px-4 sm:px-8 md:px-16 lg:px-24">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
                Work Experience
            </h2>
            <div className="max-w-6xl mx-auto space-y-8">
                {experiences.map((experience, index) => (
                    <Experience key={index} experience={experience} />
                ))}
            </div>
        </div>
    );
};

export default ExperiencePage;