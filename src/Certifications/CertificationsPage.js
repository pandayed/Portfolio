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
        <div className="flex items-center justify-between text-white text-xl py-4 border-b border-gray-700">
            <div className="flex items-center gap-4">
                <a 
                    href={certificate.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:italic hover:border-b hover:border-white transition-all duration-300"
                >
                    {certificate.title}
                </a>
                <p>by</p>
                <p className="font-bold">{certificate.source}</p>
            </div>

            <div className="flex gap-4">
                <p>Completed On:</p>
                <p className="font-bold">{formatDate(certificate.completionDate)}</p>
            </div>
        </div>
    );
};

export const CertificationsPage = () => {
    return (
        <div className="bg-[#1D222A] p-6 md:p-12 lg:p-24">
            <div className="text-white text-3xl md:text-4xl lg:text-5xl mb-8 font-bold">
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