import React from "react";
import './ExperiencePage.css';
import { getFormattedDate } from '../Utils.js';
import { Technologies } from  '../common.js';
import { useState } from "react";
import { useEffect } from "react";


// Import the logos
import CiscoLogo from '../assets/company_logos/ic_cisco.png';
import DefaultCompanyLogo from '../assets/company_logos/ic_default-company-logo.png';

const experiences = [
    {
        "companyLogo": CiscoLogo,  // Use imported logo
        "company": "Cisco",
        "jobRole": "Software Engineer",
        "startDate": "2024-08-01",
        "endDate": null,  // Use null instead of undefined
        "tech": ["Go", "JavaScript", "Java", "Python", "Power BI", "React", "Splunk", "Spring Boot"],
        "workDetails": [
            "Developing Cisco SEA",
        ]
    },
    {
        "companyLogo": CiscoLogo,  // Use imported logo
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
        "companyLogo": DefaultCompanyLogo,  // Use imported logo
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
        "companyLogo": DefaultCompanyLogo,  // Use imported logo
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
        "companyLogo": DefaultCompanyLogo,  // Use imported logo
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
  

const Experience = (props) => {
    return (
        <div className="Experience">
            <div className="CompanyLogoContainer">
                <div className="CompanyLogoWrapper">
                    <img 
                        src={props.experience.companyLogo} 
                        alt={`${props.experience.company} logo`} 
                        className="CompanyLogo" 
                    />
                </div>
            </div>

            <div className="CompanyDetails">
                <div className="Titles">
                    <div className="CompanyName">{props.experience.company}</div>
                    <div className="Position">{props.experience.jobRole}</div>
                </div>

                <div className="DateContainer">
                    <div className="StartEndDate">
                        {getFormattedDate(props.experience.startDate)}
                    </div>
                    <div className="DateSeparator">-</div>
                    {
                        props.experience.endDate === null ? (
                            <div className="PresentDate">PRESENT</div>
                        ) : (
                            <div className="StartEndDate">{getFormattedDate(props.experience.endDate)}</div>
                        )
                    }
                </div>

                <Technologies technologies={props.experience.tech} />
                
                <div className="WorkDetails">
                    <ul className="WorkDetailsList">
                        {props.experience.workDetails.map((workDetailsItem, index) => (
                            <li key={index} className="WorkDetailsItem">
                                {workDetailsItem}
                            </li>
                        ))}
                    </ul>
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
                    <Experience key={index} experience={experience} />
                ))}
            </div>
        </div>
    );
};

export default ExperiencePage;