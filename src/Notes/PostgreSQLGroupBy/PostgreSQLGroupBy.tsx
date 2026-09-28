import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../../Blogs/ArticleLayout/ArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import { POSTGRESQL_GROUP_BY_ROUTE, POSTGRESQL_NOTES_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const invalidGroupedQuery = `SELECT *
FROM customers
GROUP BY city;`;

const groupByError = `ERROR: column "customers.id" must appear in the GROUP BY clause
or be used in an aggregate function`;

const aggregateByCityQuery = `SELECT city, COUNT(*) AS customer_count
FROM customers
GROUP BY city
ORDER BY city;`;

const groupByPrimaryKeyQuery = `SELECT id, city, name
FROM customers
GROUP BY id
ORDER BY id;`;

const oneRowPerCityQuery = `SELECT DISTINCT ON (city) id, city, name
FROM customers
ORDER BY city, id;`;

interface Row {
    id: string;
    city: string;
    name: string;
}

const ResultTable = ({ rows }: { rows: Row[] }) => (
    <div className="Article__tableWrap">
        <table className="Article__table">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">city</th>
                    <th scope="col">name</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.id}>
                        <th scope="row">{row.id}</th>
                        <td>{row.city}</td>
                        <td>{row.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const PostgreSQLGroupBy = () => (
    <ArticleLayout
        title="PostgreSQL GROUP BY and Non-Aggregated Columns"
        route={POSTGRESQL_GROUP_BY_ROUTE}
        sections={sections}
        backRoute={POSTGRESQL_NOTES_ROUTE}
        backLabel="Back to PostgreSQL notes"
    >
        <section className="Article__section">
            <CodeBlock language="sql">{invalidGroupedQuery}</CodeBlock>
            <p>Suppose the table contains:</p>
            <ResultTable
                rows={[
                    { id: '1', city: 'Delhi', name: 'John' },
                    { id: '2', city: 'Delhi', name: 'Mary' },
                    { id: '3', city: 'Mumbai', name: 'Alex' },
                ]}
            />
            <p>
                The query groups by <code>city</code>, but it also selects <code>id</code> and{' '}
                <code>name</code>. One Delhi group contains two different values for both columns.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="the-grouping-rule">
            <h2 id="the-grouping-rule" className="SectionTitle">
                The grouping rule
            </h2>
            <p>
                PostgreSQL rejects the query. Every selected expression must be grouped, aggregated,
                or functionally dependent on grouped columns.
            </p>
            <pre className="Article__code">
                <code>{groupByError}</code>
            </pre>
            <p>
                PostgreSQL does not have a mode that makes this query return an arbitrary row. The
                query must state how each group becomes one result row.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="primary-key-dependency">
            <h2 id="primary-key-dependency" className="SectionTitle">
                Primary-key dependency
            </h2>
            <p>
                PostgreSQL recognizes a functional dependency when a table's primary key is in the{' '}
                <code>GROUP BY</code> list. If <code>id</code> is the primary key, the other columns in
                that table have one value for each <code>id</code>, so this query is valid:
            </p>
            <CodeBlock language="sql">{groupByPrimaryKeyQuery}</CodeBlock>
            <p>
                PostgreSQL does not apply this shortcut to every unique constraint. Group by the
                required columns explicitly when the grouped columns are not the table's primary key.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="valid-aggregate-query">
            <h2 id="valid-aggregate-query" className="SectionTitle">
                A valid aggregate query
            </h2>
            <CodeBlock language="sql">{aggregateByCityQuery}</CodeBlock>
            <p>This query returns one row per city and counts the rows in each city.</p>
            <p>For a predictable grouped result, each selected expression must:</p>
            <ul className="Article__notes">
                <li>
                    appear in <code>GROUP BY</code>,
                </li>
                <li>
                    use an aggregate such as <code>COUNT()</code>, <code>SUM()</code>,{' '}
                    <code>MIN()</code>, or <code>MAX()</code>, or
                </li>
                <li>be functionally dependent on the grouped primary key.</li>
            </ul>
            <p>
                <code>HAVING</code> does not change this rule. It filters groups after grouping.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="one-row-per-group">
            <h2 id="one-row-per-group" className="SectionTitle">
                Choosing one row per group
            </h2>
            <p>
                Use PostgreSQL's <code>DISTINCT ON</code> when the requirement is to choose one full
                row for each city rather than calculate an aggregate:
            </p>
            <CodeBlock language="sql">{oneRowPerCityQuery}</CodeBlock>
            <p>
                The first <code>ORDER BY</code> expression matches <code>DISTINCT ON</code>. The second
                expression chooses the lowest <code>id</code> within each city. Without a complete{' '}
                <code>ORDER BY</code>, the chosen row is not predictable.
            </p>
        </section>
    </ArticleLayout>
);

export default PostgreSQLGroupBy;
