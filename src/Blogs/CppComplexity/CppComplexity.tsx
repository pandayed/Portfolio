import './CppComplexity.css';
import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../ArticleLayout/ArticleLayout';
import type { TocEntry } from '../ArticleLayout/types';
import { COMPLEXITY_CASES_ROUTE, CPP_COMPLEXITY_ROUTE, toHref } from '../../routing/routes';

import { sequenceContainers } from './sequenceContainers';
import { orderedContainers, unorderedContainers } from './associativeContainers';
import { adaptors, algorithms } from './adaptorsAndAlgorithms';
import type { Operation, Section, Structure } from './types';

const CAVEATS_ID = 'caveats';

const sections: Section[] = [
    sequenceContainers,
    orderedContainers,
    unorderedContainers,
    adaptors,
    algorithms,
];

const tocEntries: TocEntry[] = [
    ...sections.map(({ id, title }) => ({ id, title })),
    { id: CAVEATS_ID, title: 'Caveats' },
];

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
            <h2 id={id} className="SectionTitle">
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
        <ArticleLayout
            title="C++ containers and complexities"
            route={CPP_COMPLEXITY_ROUTE}
            sections={tocEntries}
        >
            <section className="CppComplexity__section">
                <p className="CppComplexity__legend">
                    Every operation is listed under all four cases. The label on the row below it
                    marks the one that holds in practice: when working out the complexity of an
                    algorithm that uses the operation, that is the figure to carry through.
                </p>

                <p className="CppComplexity__legend">
                    An em dash means amortising changes nothing for that operation. Why average and
                    amortised are not interchangeable is covered{' '}
                    <a href={toHref(COMPLEXITY_CASES_ROUTE)} className="Link">
                        here
                    </a>
                    .
                </p>

                <p className="CppComplexity__legend">
                    For example, <code>v.push_back</code> is marked Amortised, so when considering a{' '}
                    <code>v.push_back</code> operation do not consider the worst case complexity of
                    it, instead consider the amortised one. So a loop that appends n elements is
                    O(n) overall, not the O(n&sup2;).
                </p>
            </section>

            {sections.map((section) => (
                <SectionBlock key={section.id} {...section} />
            ))}

            <section className="CppComplexity__section" aria-labelledby={CAVEATS_ID}>
                <h2 id={CAVEATS_ID} className="SectionTitle">
                    Caveats
                </h2>
                <ul className="CppComplexity__notes">
                    <li>
                        Amortised is not guaranteed. push_back and unordered_map insert are
                        constant on average, but a single call can be linear.
                    </li>
                    <li>
                        Average is not worst case. Unordered containers degrade to O(n) under a bad
                        hash.
                    </li>
                    <li>
                        Asymptotics ignore the constant factor, which is mostly cache behaviour. A
                        linear scan over a vector can beat a log n walk over a tree at small sizes.
                    </li>
                </ul>
            </section>
        </ArticleLayout>
    );
};

export default CppComplexity;
