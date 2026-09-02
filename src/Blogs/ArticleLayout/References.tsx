export const REFERENCES_ID = 'references';

/* One external source cited by an article. */
export interface ReferenceEntry {
    title: string;
    href: string;
}

interface ReferencesProps {
    references: ReferenceEntry[];
}

/* Added by ArticleLayout at the end of the body, after the article's own
   content and before Comments. Renders nothing when an article cites no
   external sources. */
const References = ({ references }: ReferencesProps) => {
    if (references.length === 0) {
        return null;
    }

    return (
        <section className="Article__section" aria-labelledby={REFERENCES_ID}>
            <h2 id={REFERENCES_ID} className="SectionTitle">
                References
            </h2>
            <ul className="Article__notes">
                {references.map(({ title, href }) => (
                    <li key={href}>
                        <a href={href} className="Link" target="_blank" rel="noreferrer">
                            {title}
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default References;
