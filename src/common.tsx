import './common.css';

interface TechItemProps {
    technology: string;
}

const TechItem = ({ technology }: TechItemProps) => {
    return <span className="TechItem">{technology}</span>;
};

interface TechnologiesProps {
    technologies: string[];
}

export const Technologies = ({ technologies }: TechnologiesProps) => {
    return (
        <div className="Technologies">
            {technologies.map((technology) => (
                <TechItem key={technology} technology={technology} />
            ))}
        </div>
    );
};
