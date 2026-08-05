import type { TocEntry } from './types';

interface TableOfContentsProps {
    sections: TocEntry[];
}

/* Anchor hrefs would be swallowed by the hash router, so scroll directly. */
const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const TableOfContents = ({ sections }: TableOfContentsProps) => {
    return (
        <nav className="ArticleLayout__toc" aria-label="On this page">
            <p className="ArticleLayout__tocLabel">On this page</p>
            {sections.map((section) => (
                <button
                    key={section.id}
                    type="button"
                    className="ArticleLayout__tocLink"
                    onClick={() => scrollToSection(section.id)}
                >
                    {section.title}
                </button>
            ))}
        </nav>
    );
};

export default TableOfContents;
