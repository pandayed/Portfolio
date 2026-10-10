import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import {
    POSTGRESQL_GROUP_BY_ROUTE,
    POSTGRESQL_NOTES_ROUTE,
    POSTGRESQL_QUERY_RESULTS_ROUTE,
    SCALAR_IN_POSTGRESQL_ROUTE,
    toHref,
} from '../../routing/routes';
import { sections } from './sections';

const selectWithoutFrom = `SELECT 5 * 10;`;

const selectTable = `?column?
--------
      50`;

const readColumn = `SELECT customer_id
FROM delivery;`;

const missingRelation = `WITH a AS (
    SELECT 5 AS x
)
SELECT a.x;`;

const includeRelation = `WITH a AS (
    SELECT 5 AS x
)
SELECT a.x
FROM a;`;

const aggregateQuery = `SELECT COUNT(*) AS delivery_count
FROM delivery;`;

const groupedAggregate = `SELECT customer_id, COUNT(*) AS delivery_count
FROM delivery
GROUP BY customer_id;`;

const scalarSubquery = `SELECT (SELECT COUNT(*) FROM delivery) AS delivery_count;`;

const combinedCtes = `WITH a AS (
    SELECT 5 AS x
),
b AS (
    SELECT 10 AS y
)
SELECT a.x * 100.0 / b.y AS result
FROM a
CROSS JOIN b;`;

const PostgreSQLQueryResults = () => (
    <ArticleLayout
        title="Query results: values and relations"
        route={POSTGRESQL_QUERY_RESULTS_ROUTE}
        sections={sections}
        backRoute={POSTGRESQL_NOTES_ROUTE}
        backLabel="Back to PostgreSQL notes"
    >
        <section className="Article__section">
            <ul className="Article__notes">
                <li>A PostgreSQL <code>SELECT</code> returns rows and columns.</li>
                <li>A result with one row and one column still has a query-result shape.</li>
                <li>A scalar is one value used in an expression.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="select-results">
            <h2 id="select-results" className="SectionTitle">A SELECT result has rows and columns</h2>
            <ul className="Article__notes">
                <li>PostgreSQL can evaluate expressions without reading a table.</li>
            </ul>
            <CodeBlock language="sql">{selectWithoutFrom}</CodeBlock>
            <CodeBlock language="text">{selectTable}</CodeBlock>
            <ul className="Article__notes">
                <li>The query returns one row and one column. The expression <code>5 * 10</code> evaluates to <code>50</code>.</li>
                <li>To read a table column, name its table in <code>FROM</code>.</li>
            </ul>
            <CodeBlock language="sql">{readColumn}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="relations-and-from">
            <h2 id="relations-and-from" className="SectionTitle">Relations and FROM</h2>
            <ul className="Article__notes">
                <li>A table and a common table expression (CTE) are relations. A relation supplies rows and columns to a query.</li>
                <li><code>WITH</code> gives a name to a query result. It does not create a scalar variable.</li>
                <li>A column reference such as <code>a.x</code> needs the relation <code>a</code> in the query's <code>FROM</code> clause.</li>
            </ul>
            <CodeBlock language="sql">{missingRelation}</CodeBlock>
            <ul className="Article__notes">
                <li>This query fails because <code>a</code> is not in <code>FROM</code>.</li>
            </ul>
            <CodeBlock language="sql">{includeRelation}</CodeBlock>
            <ul className="Article__notes">
                <li>Now <code>FROM a</code> makes the CTE's row available to the outer query.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="aggregates-and-groups">
            <h2 id="aggregates-and-groups" className="SectionTitle">Aggregates and groups</h2>
            <ul className="Article__notes">
                <li>An aggregate query without <code>GROUP BY</code> produces one result row, even when the input has no rows.</li>
                <li><code>COUNT(*)</code> returns <code>0</code> for empty input. Other aggregates such as <code>SUM</code> return <code>NULL</code> when there are no non-<code>NULL</code> input values.</li>
                <li>A <code>HAVING</code> condition can remove that aggregate row.</li>
            </ul>
            <CodeBlock language="sql">{aggregateQuery}</CodeBlock>
            <ul className="Article__notes">
                <li>Adding <code>GROUP BY</code> returns one row per group instead.</li>
            </ul>
            <CodeBlock language="sql">{groupedAggregate}</CodeBlock>
            <ul className="Article__notes">
                <li>If the input has no rows, there are no groups, so this query returns zero rows.</li>
                <li>See <a className="Link" href={toHref(POSTGRESQL_GROUP_BY_ROUTE)}>GROUP BY in PostgreSQL</a> for more grouping examples.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="scalar-subqueries">
            <h2 id="scalar-subqueries" className="SectionTitle">Use a query result as a value</h2>
            <ul className="Article__notes">
                <li>A scalar subquery puts a query where an expression can use one value.</li>
                <li>The outer query does not need <code>FROM</code> when it uses only scalar expressions.</li>
            </ul>
            <CodeBlock language="sql">{scalarSubquery}</CodeBlock>
            <ul className="Article__notes">
                <li>The inner <code>COUNT(*)</code> query returns one row and one column. PostgreSQL uses that value for <code>delivery_count</code>.</li>
                <li>See <a className="Link" href={toHref(SCALAR_IN_POSTGRESQL_ROUTE)}>Scalar in PostgreSQL</a> for the one-column and at-most-one-row rules.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="combine-cte-results">
            <h2 id="combine-cte-results" className="SectionTitle">Combine CTE results</h2>
            <ul className="Article__notes">
                <li>To use columns from two CTEs in one query, put both relations in <code>FROM</code>.</li>
                <li><code>CROSS JOIN</code> pairs every row from the first relation with every row from the second.</li>
            </ul>
            <CodeBlock language="sql">{combinedCtes}</CodeBlock>
            <ul className="Article__notes">
                <li>Each CTE has one row, so the cross join produces one row. The result is <code>50</code>.</li>
                <li>If the first CTE has two rows and the second has three, the cross join produces six rows.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="choose-a-query-shape">
            <h2 id="choose-a-query-shape" className="SectionTitle">Choose the query shape</h2>
            <ul className="Article__notes">
                <li>Use <code>SELECT</code> without <code>FROM</code> for a constant or expression that needs no table columns.</li>
                <li>Use <code>FROM</code> to read columns from a table or CTE. Add a join when the query needs multiple relations.</li>
                <li>Use a scalar subquery when an expression needs one value from another query.</li>
                <li>Use <code>GROUP BY</code> when the result needs one row per group.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default PostgreSQLQueryResults;
