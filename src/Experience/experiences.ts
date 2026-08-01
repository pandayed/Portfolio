import type { Experience } from '../types';

import CiscoLogo from '../assets/company_logos/ic_cisco.png';

export const experiences: Experience[] = [
    {
        companyLogo: CiscoLogo,
        company: 'Cisco',
        jobRole: 'Software Engineer',
        startDate: '2024-08-01',
        endDate: null,
        tech: ['Go', 'JavaScript', 'Java', 'Python', 'Power BI', 'React', 'Splunk', 'Spring Boot'],
        workDetails: ['Developing Cisco SEA'],
    },
    {
        companyLogo: CiscoLogo,
        company: 'Cisco',
        jobRole: 'Software Engineer Intern',
        startDate: '2024-02-01',
        endDate: '2024-06-30',
        tech: ['Python', 'Numpy', 'Pandas', 'Splunk'],
        workDetails: [
            'Developed Anomaly Detector for Remote Sessions on IoT Devices using classical machine learning',
            'Developed Splunk Add-on and Analysis Apps for Remote Session and User Behaviour analysis',
        ],
    },
    {
        company: 'Exatorial',
        jobRole: 'Software Engineer Intern',
        startDate: '2023-07-01',
        endDate: '2023-12-31',
        tech: ['Android', 'XML', 'Kotlin', 'Retrofit', 'Java', 'Android SDK'],
        workDetails: [
            'Developed a comprehensive android application for Supply Chain Management Services',
            'Integrated external USB Camera and Barcode and RFID Scanner via Bluetooth in the application',
        ],
    },
    {
        company: 'Checko',
        jobRole: 'Mobile Development Intern',
        startDate: '2023-01-01',
        endDate: '2023-04-30',
        tech: ['Android', 'XML', 'Kotlin', 'CameraX'],
        workDetails: [
            'Unit and Instrumentation Testing',
            'Integrated Google Play Integrity API to protect the database from risky and fraudulent traffic.',
        ],
    },
    {
        company: 'Mugs',
        jobRole: 'Android Application Developer',
        startDate: '2022-06-01',
        endDate: '2022-07-31',
        tech: ['Android', 'XML', 'Kotlin', 'MVP Architecture', 'Firebase'],
        workDetails: [
            'Developed UI',
            'Integrated Google Authentication, Firebase Realtime Database, and libraries in a money management application.',
        ],
    },
];
