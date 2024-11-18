import React from "react";
import './CertificationsPage.css';
import { getFormattedDate } from "../Utils";

const certificates = [
    // {
    //     title: "Android MVVM Architecture",
    //     completionDate: new Date("2023-07-01"),
    //     url: "https://drive.google.com/file/d/1pQNy6gR5VTu_r6dXZ-tG4m7PTX3mU3z1/view?usp=drive_link",
    //     source: "Udemy",
    // },
    {
        title: "Authorized Training Course for CCNA 2.1",
        completionDate: new Date("2024-08-23"),
        url: "https://drive.google.com/file/d/1C1f-FtQ8rAtAW_GF7t_BqsqEXCYgGlnU/view?usp=drive_link",
        source: "Cisco"
    }

]

const certificateDisplay = (certificate) => {
    return (
            <div className="Certificate">
                <div className="CertificateMainContent">
                <a href={certificate.url} target="_blank" className="CertificateTitle">
                    {certificate.title}
                </a>
                <p>by</p>
                <p className="CertificateSource">{certificate.source}</p>
                </div>

                <div className="CompletionData">
                    <p>Completed On:</p>
                    <p className="CompletionDate">{getFormattedDate(certificate.completionDate)}</p>
                </div>
            </div>
            
    );
}

export const CertificationsPage = () => {
    return (
        <div className="CertificationsPage">
            <div className="SectionTitle">Certifications</div>
            {
                certificates.map((certificate, index) => (
                    certificateDisplay(certificate)
                ))
            }

        </div>
    );
};