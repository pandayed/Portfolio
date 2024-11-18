import React from "react";
import './CertificationsPage.css';

const certificates = [
    // {
    //     title: "Android MVVM Architecture",
    //     completionDate: new Date("2023-07-01"),
    //     url: "https://drive.google.com/file/d/1pQNy6gR5VTu_r6dXZ-tG4m7PTX3mU3z1/view?usp=drive_link",
    //     source: "Udemy",
    // },
    {
        title: "Implemeting and Administering Cisco Solutions (CCNA) 2.1",
        completionDate: new Date("2024-08-23"),
        url: "https://drive.google.com/file/d/1C1f-FtQ8rAtAW_GF7t_BqsqEXCYgGlnU/view?usp=drive_link",
        source: "Cisco"
    }

]

const certificateDisplay = (certificate) => {
    return (
            <div className="Certificate">
                <a href={certificate.url} target="_blank" className="CertificateTitle">
                    {certificate.title}
                </a>
                <p>by</p>
                <p className="CertificateSource">{certificate.source}</p>
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