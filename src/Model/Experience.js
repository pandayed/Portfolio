import React from "react";
import Cisco from '../assets/company_logos/ic_cisco.png';
import DefaultCompanyLogo from '../assets/company_logos/ic_default-company-logo.png';



// ---------------- class defintion ------------------- //

class Experience {
    constructor(companyLogo, company, jobRole, startDate, endDate, tech, workDetails) {
        this.companyLogo = companyLogo
        this.company = company;
        this.jobRole = jobRole;
        this.startDate = startDate;
        this.endDate = endDate;
        this.tech = tech;
        this.workDetails = workDetails;
    }
}


export default Experience;


export const experiences = [
    new Experience(
        Cisco,
        "Cisco",
        "Software Engineer",
        new Date("2024-08-01"),
        undefined,
        ["Python", "Splunk", "JavaScript", "React"],
        ["Developing UI for Cisco SEA", "Enhancing analytical capabilites using Splunk"]
    ),
    new Experience(
        Cisco,
        "Cisco",
        "Software Engineer Intern",
        new Date("2024-02-01"),  // Assuming start date
        new Date("2024-06-30"),  // Assuming end date
        ["Python", "Numpy", "Pandas", "Splunk"],
        [
            "Developed Anomaly Detector for Remote Sessions on IoT Devices using classical machine learning",
            "Developed Splunk Add-on and Analysis Apps for Remote Session and User Behaviour analysis"
        ],

    ),
    new Experience(
        DefaultCompanyLogo,
        "Exatorial",
        "Software Engineer Intern",
        new Date("2023-07-01"),  // Assuming start date
        new Date("2023-12-31"),  // Assuming end date
        ["Android", "XML", "Kotlin", "Retrofit", "Java", "Android SDK"],
        [
            "Developed a comprehensive android application for Supply Chain Management Services",
            "Integrated external USB Camera and Barcode and RFID Scanner via Bluetooth in the application"
        ],

    ),
    new Experience(
        DefaultCompanyLogo,
        "Checko",
        "Mobile Development Intern",
        new Date("2023-01-01"),  // Assuming start date
        new Date("2023-04-30"),  // Assuming end date
        ["Android", "XML", "Kotlin", "CameraX"],
        [
            "Unit and Instrumentation Testing",
            "Integrated Google Play Integrity API to protect the database from risky and fraudulent traffic."
        ],

    ),
    new Experience(
        DefaultCompanyLogo,
        "Mugs",
        "Android Application Developer",
        new Date("2022-06-01"),  // Assuming start date
        new Date("2022-07-31"),  // Assuming end date
        ["Android", "XML", "Kotlin", "MVP Architecture", "Firebase"],
        [
            "Developed UI",
            "Integrated Google Authentication, Firebase Realtime Database, and libraries in a money management application."
        ],

    )
];