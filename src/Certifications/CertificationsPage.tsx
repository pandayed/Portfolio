import './CertificationsPage.css';
import '../CommonClasses/CommonClasses.css';
import type { Certificate } from '../types';

const certificates: Certificate[] = [
    {
        title: 'Authorized Training Course for CCNA 2.1',
        completionDate: new Date('2024-08-23'),
        url: 'https://drive.google.com/file/d/1C1f-FtQ8rAtAW_GF7t_BqsqEXCYgGlnU/view?usp=drive_link',
        source: 'Cisco',
    },
];

const formatCompletionDate = (date: Date): string =>
    date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

interface CertificateDisplayProps {
    certificate: Certificate;
}

const CertificateDisplay = ({ certificate }: CertificateDisplayProps) => {
    return (
        <div className="Certificate">
            <div className="CertificateMainContent">
                <a
                    href={certificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="UnderlinedLink"
                >
                    {certificate.title}
                </a>
                <div className="CertificateSource">
                    <span>by</span>
                    <span className="CertificateSource__name">{certificate.source}</span>
                </div>
            </div>
            <p className="CompletionDate">{formatCompletionDate(certificate.completionDate)}</p>
        </div>
    );
};

export const CertificationsPage = () => {
    return (
        <section className="Section CertificationsPage">
            <h2 className="SectionTitle">Certifications</h2>
            <div className="SectionInner CertificationsList">
                {certificates.map((certificate) => (
                    <CertificateDisplay key={certificate.title} certificate={certificate} />
                ))}
            </div>
        </section>
    );
};

export default CertificationsPage;
