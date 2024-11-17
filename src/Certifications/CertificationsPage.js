import React from "react";
import './CertificationsPage.css';

const certificates = [
    {
        title: "Android MVVM Architecture",
        url: "https://drive.google.com/file/d/1pQNy6gR5VTu_r6dXZ-tG4m7PTX3mU3z1/view?usp=drive_link",
        source: "Udemy"
    }
]

const certificateDisplay = (certificate) => {
    return (
        <div className="CertificateCard" key={certificate.url}>
            <a href={certificate.url} target="_blank">
                {certificate.title}
            </a>
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