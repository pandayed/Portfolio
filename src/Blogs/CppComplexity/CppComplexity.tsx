import './CppComplexity.css';
import '../../CommonClasses/CommonClasses.css';

import Page from '../../Page/Page';
import { BLOGS_ROUTE, toHref } from '../../routing/routes';

import { sequenceContainers } from './sequenceContainers';
import { orderedContainers, unorderedContainers } from './associativeContainers';
import { adaptors, algorithms } from './adaptorsAndAlgorithms';
import type { Operation, Section, Structure } from './types';

const sections: Section[] = [
    sequenceContainers,
    orderedContainers,
    unorderedContainers,
    adaptors,
    algorithms,
];

/* Anchor hrefs would be swallowed by the hash router, so scroll directly. */
const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* Two rows per operation: the numbers, then the case that actually governs it. */
const OperationRows = ({
    signature,
    best,
    average,
    amortised,
    worst,
    matters,
    why,
}: Operation) => {
    return (
        <tbody className="CppComplexity__group">
            <tr>
                <th scope="row" className="CppComplexity__signature">
                    <code>{signature}</code>
                </th>
                <td>{best}</td>
                <td>{average}</td>
                <td>{amortised}</td>
                <td>{worst}</td>
            </tr>
            <tr>
                <td colSpan={5} className="CppComplexity__why">
                    <span className="CppComplexity__matters">{matters}</span>
                    {why}
                </td>
            </tr>
        </tbody>
    );
};

const StructureCard = ({ name, internals, operations, notes }: Structure) => {
    return (
        <article className="CppComplexity__structure">
            <h3 className="CppComplexity__structureName">{name}</h3>
            <p className="CppComplexity__internals">{internals}</p>

            <div className="CppComplexity__tableWrap">
                <table className="CppComplexity__table">
                    <thead>
                        <tr>
                            <th scope="col">Operation</th>
                            <th scope="col">Best</th>
                            <th scope="col">Average</th>
                            <th scope="col">Amortised</th>
                            <th scope="col">Worst</th>
                        </tr>
                    </thead>
                    {operations.map((operation) => (
                        <OperationRows key={operation.signature} {...operation} />
                    ))}
                </table>
            </div>

            {notes && (
                <ul className="CppComplexity__notes">
                    {notes.map((note) => (
                        <li key={note}>{note}</li>
                    ))}
                </ul>
            )}
        </article>
    );
};

const SectionBlock = ({ id, title, structures }: Section) => {
    return (
        <section className="CppComplexity__section" aria-labelledby={id}>
            <h2 id={id} className="CppComplexity__sectionTitle">
                {title}
            </h2>
            {structures.map((structure) => (
                <StructureCard key={structure.name} {...structure} />
            ))}
        </section>
    );
};

const CppComplexity = () => {
    return (
        <Page title="C++ containers and complexities">
            <div className="CppComplexity">
                <a href={toHref(BLOGS_ROUTE)} className="UnderlinedLink CppComplexity__back">
                    Back to blogs
                </a>

                <nav className="CppComplexity__toc" aria-label="Sections">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            type="button"
                            className="CppComplexity__tocLink"
                            onClick={() => scrollToSection(section.id)}
                        >
                            {section.title}
                        </button>
                    ))}
                </nav>

                <p className="CppComplexity__legend">
                    Every operation is listed under all four cases. The label on the row below it
                    marks the one that holds in practice: when working out the complexity of an
                    algorithm that uses the operation, that is the figure to carry through. </p>
                    
                    <p className="CppComplexity__legend">
                    An em
                    dash means amortising changes nothing for that operation. </p>
                    
                    <p className="CppComplexity__legend">
                    For example,{' '}
                    <code>v.push_back</code> is marked Amortised, so when considering a <code>v.push_back</code> operation do not consider the worst case complexity of it, instead consider the amortised one. So a loop that appends n elements
                    is O(n) overall, not the O(n&sup2;).
                </p>

                {sections.map((section) => (
                    <SectionBlock key={section.id} {...section} />
                ))}

                <section className="CppComplexity__section" aria-labelledby="caveats">
                    <h2 id="caveats" className="CppComplexity__sectionTitle">
                        Caveats
                    </h2>
                    <ul className="CppComplexity__notes">
                        <li>
                            Amortised is not guaranteed. push_back and unordered_map insert are
                            constant on average, but a single call can be linear.
                        </li>
                        <li>
                            Average is not worst case. Unordered containers degrade to O(n) under
                            a bad hash.
                        </li>
                        <li>
                            Asymptotics ignore the constant factor, which is mostly cache
                            behaviour. A linear scan over a vector can beat a log n walk over a
                            tree at small sizes.
                        </li>
                    </ul>
                </section>
            </div>
        </Page>
    );
};

export default CppComplexity;
