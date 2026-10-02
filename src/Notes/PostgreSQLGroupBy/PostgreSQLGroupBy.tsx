import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import {
    POSTGRESQL_GROUP_BY_ROUTE,
    POSTGRESQL_NOTES_ROUTE,
    POSTGRESQL_WINDOW_FUNCTIONS_ROUTE,
    toHref,
} from '../../routing/routes';
import { sections } from './sections';

const invalidGroupedQuery = `SELECT *
FROM customers
GROUP BY city;`;

const groupByError = `ERROR: column "customers.id" must appear in the GROUP BY clause
or be used in an aggregate function`;

const aggregateWithoutGroupByQuery = `SELECT city, COUNT(*) AS customer_count
FROM customers;`;

const aggregateWithoutGroupByError = `ERROR: column "customers.city" must appear in the GROUP BY clause
or be used in an aggregate function`;

const aggregateByCityQuery = `SELECT city, COUNT(*) AS customer_count
FROM customers
GROUP BY city
ORDER BY city;`;

const aggregateAllCustomersQuery = `SELECT COUNT(*) AS customer_count
FROM customers;`;

const customerCountWindowQuery = `SELECT
    id,
    city,
    name,
    COUNT(*) OVER () AS all_customers,
    COUNT(*) OVER (PARTITION BY city) AS customers_in_city
FROM customers
ORDER BY id;`;

const aggregateByRegionAndProduct = `SELECT region, product, SUM(amount) AS sales_total
FROM sales
GROUP BY region, product
ORDER BY region, product;`;

const groupingSetsExample = `SELECT region, product, SUM(amount) AS sales_total
FROM sales
GROUP BY GROUPING SETS (
    (region, product),
    (region),
    (product),
    ()
);`;

const rollupExample = `SELECT region,
       product,
       GROUPING(region, product) AS subtotal_level,
       SUM(amount) AS sales_total
FROM sales
GROUP BY ROLLUP (region, product)
ORDER BY region, product;`;

const whereAndHavingExample = `SELECT city, COUNT(*) AS customer_count
FROM customers
WHERE active = true
GROUP BY city
HAVING COUNT(*) >= 2
ORDER BY city;`;

const globalAggregateExample = `SELECT COUNT(*) AS customer_count,
       COUNT(city) AS customers_with_city
FROM customers
WHERE active = true;`;

const groupByPrimaryKeyQuery = `SELECT id, city, name
FROM customers
GROUP BY id
ORDER BY id;`;

const oneRowPerCityQuery = `SELECT DISTINCT ON (city) id, city, name
FROM customers
ORDER BY city, id;`;

const oneRowPerCityWindowQuery = `SELECT id, city, name
FROM (
    SELECT id,
           city,
           name,
           ROW_NUMBER() OVER (PARTITION BY city ORDER BY id) AS row_number
    FROM customers
) AS ranked_customers
WHERE row_number = 1
ORDER BY city;`;

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
        title="GROUP BY in PostgreSQL"
        route={POSTGRESQL_GROUP_BY_ROUTE}
        sections={sections}
        backRoute={POSTGRESQL_NOTES_ROUTE}
        backLabel="Back to PostgreSQL notes"
    >
        <section className="Article__section">
            <p>
                Start with the result shape. Use <code>GROUP BY</code> when the result should contain
                one row per group. Use a window function when every original row must remain.
            </p>
            <p>Suppose the table contains:</p>
            <ResultTable
                rows={[
                    { id: '1', city: 'Delhi', name: 'John' },
                    { id: '2', city: 'Delhi', name: 'Mary' },
                    { id: '3', city: 'Mumbai', name: 'Alex' },
                ]}
            />
            <p>Now consider this query:</p>
            <CodeBlock language="sql">{invalidGroupedQuery}</CodeBlock>
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
            <h3 className="Article__subTitle">Removing GROUP BY does not fix the query</h3>
            <CodeBlock language="sql">{aggregateWithoutGroupByQuery}</CodeBlock>
            <pre className="Article__code">
                <code>{aggregateWithoutGroupByError}</code>
            </pre>
            <p>
                Without <code>GROUP BY</code>, <code>COUNT(*)</code> produces one result for the whole
                table. The input contains both Delhi and Mumbai, so PostgreSQL cannot choose one{' '}
                <code>city</code> for that result. This is the same reason a selected{' '}
                <code>query_name</code> becomes invalid after <code>GROUP BY query_name</code> is
                removed.
            </p>
            <p>
                An aggregate function does not require <code>GROUP BY</code> by itself. The error
                occurs because the query also selects a value that has no single answer for the
                aggregate result.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="valid-aggregate-query">
            <h2 id="valid-aggregate-query" className="SectionTitle">
                Choose the result shape
            </h2>
            <h3 className="Article__subTitle">One row per city</h3>
            <CodeBlock language="sql">{aggregateByCityQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead>
                        <tr><th scope="col">city</th><th scope="col">customer_count</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Delhi</td><td>2</td></tr>
                        <tr><td>Mumbai</td><td>1</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                Three input rows become two result rows because there are two city groups. This is
                the correct shape when the requirement is one count per city.
            </p>

            <h3 className="Article__subTitle">One row for the whole table</h3>
            <CodeBlock language="sql">{aggregateAllCustomersQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">customer_count</th></tr></thead>
                    <tbody><tr><td>3</td></tr></tbody>
                </table>
            </div>
            <p>
                This query needs no <code>GROUP BY</code> because it selects only the aggregate.
                Every input row contributes to one result row.
            </p>

            <h3 className="Article__subTitle">Keep every customer row</h3>
            <CodeBlock language="sql">{customerCountWindowQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead>
                        <tr>
                            <th scope="col">id</th><th scope="col">city</th><th scope="col">name</th>
                            <th scope="col">all_customers</th><th scope="col">customers_in_city</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1</td><td>Delhi</td><td>John</td><td>3</td><td>2</td></tr>
                        <tr><td>2</td><td>Delhi</td><td>Mary</td><td>3</td><td>2</td></tr>
                        <tr><td>3</td><td>Mumbai</td><td>Alex</td><td>3</td><td>1</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                <code>OVER ()</code> calculates across all rows.{' '}
                <code>OVER (PARTITION BY city)</code> calculates separately for each city. Both keep
                the three original rows.
            </p>

            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead>
                        <tr><th scope="col">Required result</th><th scope="col">Query form</th><th scope="col">Rows here</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>One overall count</td><td>Aggregate without GROUP BY</td><td>1</td></tr>
                        <tr><td>One count per city</td><td>GROUP BY city</td><td>2</td></tr>
                        <tr><td>Every row plus the overall count</td><td>OVER ()</td><td>3</td></tr>
                        <tr><td>Every row plus its city count</td><td>OVER (PARTITION BY city)</td><td>3</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                <code>GROUP BY</code> returns one row per group. <code>PARTITION BY</code> defines
                groups for a calculation but keeps one result row per input row. Continue with the{' '}
                <a className="Link" href={toHref(POSTGRESQL_WINDOW_FUNCTIONS_ROUTE)}>
                    window functions note
                </a>{' '}
                for ranking, running totals, and window frames.
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

        <section className="Article__section" aria-labelledby="grouping-by-multiple-columns">
            <h2 id="grouping-by-multiple-columns" className="SectionTitle">
                Grouping by multiple columns
            </h2>
            <p>
                Put a comma-separated list in <code>GROUP BY</code> to group by a combination of
                values. The example returns one row for each region and product pair found in the
                filtered <code>sales</code> rows:
            </p>
            <CodeBlock language="sql">{aggregateByRegionAndProduct}</CodeBlock>
            <p>
                A pair such as <code>(North, Tea)</code> is one group.{' '}
                <code>(North, Coffee)</code> is a different group. Grouping by both columns does not
                calculate separate totals for each region and each product. Use{' '}
                <code>GROUPING SETS</code> when one query needs detail rows plus specific subtotal
                levels:
            </p>
            <CodeBlock language="sql">{groupingSetsExample}</CodeBlock>
            <p>
                <code>GROUP BY</code> does not sort the output. Add <code>ORDER BY</code> when the
                result needs a specific order.
            </p>
            <p>
                <code>GROUP BY ROLLUP (region, product)</code> is shorthand for hierarchical
                grouping sets: detail rows by region and product, a subtotal for each region, and
                a grand total. <code>GROUPING</code> marks which columns were omitted to make a
                subtotal. This matters when a real{' '}
                <code>region</code> or <code>product</code> value can itself be <code>NULL</code>:
            </p>
            <CodeBlock language="sql">{rollupExample}</CodeBlock>
            <p>
                In this example, <code>GROUPING(region, product)</code> is <code>0</code> for a
                detail row, <code>1</code> for a region subtotal, and <code>3</code> for the grand
                total. The subtotal rows use <code>NULL</code> for columns omitted at that level.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="filtering-rows-and-groups">
            <h2 id="filtering-rows-and-groups" className="SectionTitle">
                Filtering rows and groups
            </h2>
            <p>
                <code>WHERE</code> removes input rows before PostgreSQL forms groups.{' '}
                <code>HAVING</code> removes groups after aggregates are calculated. Use{' '}
                <code>WHERE</code> for row conditions and <code>HAVING</code> for aggregate
                conditions:
            </p>
            <CodeBlock language="sql">{whereAndHavingExample}</CodeBlock>
            <p>
                A query with aggregate functions and no <code>GROUP BY</code> calculates one result
                for all qualifying input rows. It still returns one row when no rows qualify.{' '}
                <code>COUNT</code> returns <code>0</code> in that case, while <code>SUM</code> and
                most other aggregates return <code>NULL</code>:
            </p>
            <CodeBlock language="sql">{globalAggregateExample}</CodeBlock>
            <p>
                With ordinary grouping columns, an empty input produces no groups, so the query
                returns no rows. A grouping set that includes <code>()</code>, such as the grand
                total from <code>ROLLUP</code>, can still produce one aggregate row. Also,{' '}
                <code>COUNT(*)</code> counts rows, while{' '}
                <code>COUNT(city)</code> counts only rows where <code>city</code> is not{' '}
                <code>NULL</code>. Rows whose grouping columns are <code>NULL</code> are grouped
                together.
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
            <p>
                A window function is another option when the query needs to rank rows before
                keeping one. <code>ROW_NUMBER</code> assigns a number within each city, and the
                outer query keeps the first one:
            </p>
            <CodeBlock language="sql">{oneRowPerCityWindowQuery}</CodeBlock>
        </section>
    </ArticleLayout>
);

export default PostgreSQLGroupBy;
