import React from "react";

const certificates = [
    {
        title: "Authorized Training Course for CCNA 2.1",
        completionDate: new Date("2024-08-23"),
        url: "https://drive.google.com/file/d/1C1f-FtQ8rAtAW_GF7t_BqsqEXCYgGlnU/view?usp=drive_link",
        source: "Cisco"
    }
];

// Inline date formatting function
const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const CertificateDisplay = ({ certificate }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:justify-between text-white text-xl py-4 border-gray-700">
            <div className="flex flex-col lg:flex-row gap-4">
                <a
                    id="certificate-title"
                    href={certificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-['Source_Code_Pro'] text-white border-b border-white pb-0.5 hover:italic self-start"
                >
                    {certificate.title}
                </a>
                <div className="flex gap-4">
                    <p>by</p>
                    <p className="font-bold">{certificate.source}</p>
                </div>

            </div>
            <div className="flex gap-4">
                <p>{formatDate(certificate.completionDate)}</p>
            </div>
        </div>
    );
};

export const CertificationsPage = () => {
    return (
        <div className="bg-[#1D222A] py-16 px-4 sm:px-8 md:px-16 lg:px-24">
            <div className="text-4xl font-bold text-white text-center mb-12">
                Certifications
            </div>
            <div className="space-y-4">
                {certificates.map((certificate, index) => (
                    <CertificateDisplay
                        key={index}
                        certificate={certificate}
                    />
                ))}
            </div>
        </div>
    );
};

export default CertificationsPage;