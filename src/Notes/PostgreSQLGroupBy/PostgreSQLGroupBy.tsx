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
            <ul>
                <li>Use <code>GROUP BY</code> to return one row per group.</li>
                <li>Use a window function when every original row must remain.</li>
            </ul>
            <p><strong>customers</strong></p>
            <ResultTable
                rows={[
                    { id: '1', city: 'Delhi', name: 'John' },
                    { id: '2', city: 'Delhi', name: 'Mary' },
                    { id: '3', city: 'Mumbai', name: 'Alex' },
                ]}
            />
            <CodeBlock language="sql">{invalidGroupedQuery}</CodeBlock>
            <ul>
                <li>The query groups by <code>city</code> but also selects <code>id</code> and <code>name</code>.</li>
                <li>The Delhi group contains two different values for both columns.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="the-grouping-rule">
            <h2 id="the-grouping-rule" className="SectionTitle">
                The grouping rule
            </h2>
            <ul>
                <li>PostgreSQL rejects the query.</li>
                <li>Each selected expression must be grouped, aggregated, or functionally dependent on the grouped columns.</li>
                <li>An aggregate function, such as <code>COUNT</code>, calculates one result from several rows.</li>
                <li>A functional dependency means the grouped values determine one value for another column.</li>
            </ul>
            <pre className="Article__code">
                <code>{groupByError}</code>
            </pre>
            <ul>
                <li>PostgreSQL has no mode that makes this query return an arbitrary row.</li>
                <li>The query must state how each group becomes one result row.</li>
            </ul>
            <h3 className="Article__subTitle">Removing GROUP BY does not fix the query</h3>
            <CodeBlock language="sql">{aggregateWithoutGroupByQuery}</CodeBlock>
            <pre className="Article__code">
                <code>{aggregateWithoutGroupByError}</code>
            </pre>
            <ul>
                <li>Without <code>GROUP BY</code>, <code>COUNT(*)</code> produces one result for the whole table.</li>
                <li>The table contains both Delhi and Mumbai. PostgreSQL cannot choose one <code>city</code> for that result.</li>
                <li>An aggregate function can be used without <code>GROUP BY</code>.</li>
                <li>This query fails because it also selects <code>city</code>, which has more than one possible value.</li>
            </ul>
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
            <ul>
                <li>Three input rows become two result rows. Each city has one count.</li>
            </ul>

            <h3 className="Article__subTitle">One row for the whole table</h3>
            <CodeBlock language="sql">{aggregateAllCustomersQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">customer_count</th></tr></thead>
                    <tbody><tr><td>3</td></tr></tbody>
                </table>
            </div>
            <ul>
                <li>This query selects only the aggregate, so it needs no <code>GROUP BY</code>.</li>
                <li>Every input row contributes to the count.</li>
            </ul>

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
            <ul>
                <li><code>OVER ()</code> calculates across all rows.</li>
                <li><code>OVER (PARTITION BY city)</code> calculates separately for each city.</li>
                <li>Both calculations keep the three original rows.</li>
            </ul>

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
            <ul>
                <li>See the <a className="Link" href={toHref(POSTGRESQL_WINDOW_FUNCTIONS_ROUTE)}>window functions note</a> for ranking, running totals, and window frames.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="primary-key-dependency">
            <h2 id="primary-key-dependency" className="SectionTitle">
                Primary-key dependency
            </h2>
            <ul>
                <li>PostgreSQL recognizes a functional dependency when a table's primary key is in the <code>GROUP BY</code> list.</li>
                <li>If <code>id</code> is the primary key, each <code>id</code> determines one value for every other column in that table.</li>
                <li>That makes this query valid:</li>
            </ul>
            <CodeBlock language="sql">{groupByPrimaryKeyQuery}</CodeBlock>
            <ul>
                <li>PostgreSQL does not apply this rule to every unique constraint.</li>
                <li>Group by the required columns explicitly when the grouped columns are not the table's primary key.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="grouping-by-multiple-columns">
            <h2 id="grouping-by-multiple-columns" className="SectionTitle">
                Grouping by multiple columns
            </h2>
            <ul>
                <li>Separate columns with commas in <code>GROUP BY</code> to group by a combination of values.</li>
                <li>This example returns one row for each region and product pair in <code>sales</code>:</li>
            </ul>
            <CodeBlock language="sql">{aggregateByRegionAndProduct}</CodeBlock>
            <ul>
                <li><code>(North, Tea)</code> and <code>(North, Coffee)</code> are different groups.</li>
                <li>Grouping by both columns does not calculate separate totals for each region and each product.</li>
                <li>Use <code>GROUPING SETS</code> to include detail rows and selected subtotals in one query.</li>
                <li>A subtotal combines several detail groups. An empty grouping set, <code>()</code>, calculates the total across all rows:</li>
            </ul>
            <CodeBlock language="sql">{groupingSetsExample}</CodeBlock>
            <ul>
                <li><code>GROUP BY</code> does not sort the output.</li>
                <li>Add <code>ORDER BY</code> when the result needs a specific order.</li>
                <li><code>ROLLUP (region, product)</code> returns detail rows for each region and product pair.</li>
                <li>It also returns a subtotal for each region and a grand total.</li>
                <li><code>GROUPING</code> identifies which columns were left out to make a subtotal.</li>
                <li>Use it to tell subtotal rows apart from rows with a real <code>NULL</code> region or product:</li>
            </ul>
            <CodeBlock language="sql">{rollupExample}</CodeBlock>
            <ul>
                <li><code>GROUPING(region, product)</code> returns <code>0</code> for a detail row.</li>
                <li>It returns <code>1</code> for a region subtotal and <code>3</code> for the grand total.</li>
                <li>Subtotal rows contain <code>NULL</code> in columns left out at that level.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="filtering-rows-and-groups">
            <h2 id="filtering-rows-and-groups" className="SectionTitle">
                Filtering rows and groups
            </h2>
            <ul>
                <li><code>WHERE</code> removes input rows before PostgreSQL forms groups.</li>
                <li><code>HAVING</code> removes groups after PostgreSQL calculates aggregates.</li>
                <li>Use <code>WHERE</code> for row conditions and <code>HAVING</code> for aggregate conditions:</li>
            </ul>
            <CodeBlock language="sql">{whereAndHavingExample}</CodeBlock>
            <ul>
                <li>An aggregate query without <code>GROUP BY</code> calculates one result for all rows that pass <code>WHERE</code>.</li>
                <li>It still returns one row when no rows pass the condition.</li>
                <li>With no input rows, <code>COUNT</code> returns <code>0</code>.</li>
                <li><code>SUM</code> and most other aggregates return <code>NULL</code> with no input rows:</li>
            </ul>
            <CodeBlock language="sql">{globalAggregateExample}</CodeBlock>
            <ul>
                <li>With ordinary grouping columns, empty input produces no groups. The query returns no rows.</li>
                <li>A grouping set that includes <code>()</code> can still produce one aggregate row. The grand total from <code>ROLLUP</code> is one example.</li>
                <li><code>COUNT(*)</code> counts rows.</li>
                <li><code>COUNT(city)</code> counts only rows where <code>city</code> is not <code>NULL</code>.</li>
                <li>Rows with <code>NULL</code> in the grouping columns are grouped together.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="one-row-per-group">
            <h2 id="one-row-per-group" className="SectionTitle">
                Choosing one row per group
            </h2>
            <ul>
                <li>Use PostgreSQL's <code>DISTINCT ON</code> to choose one full row for each city:</li>
            </ul>
            <CodeBlock language="sql">{oneRowPerCityQuery}</CodeBlock>
            <ul>
                <li>The first <code>ORDER BY</code> expression matches <code>DISTINCT ON</code>.</li>
                <li>The second expression chooses the lowest <code>id</code> within each city.</li>
                <li>Without an <code>ORDER BY</code> that fully determines the order, the chosen row is not predictable.</li>
                <li>You can also rank rows with a window function before keeping one.</li>
                <li><code>ROW_NUMBER</code> numbers the rows within each city.</li>
                <li>The outer query keeps the row numbered <code>1</code>:</li>
            </ul>
            <CodeBlock language="sql">{oneRowPerCityWindowQuery}</CodeBlock>
        </section>
    </ArticleLayout>
);

export default PostgreSQLGroupBy;
