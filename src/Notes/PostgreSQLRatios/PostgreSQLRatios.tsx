import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import { POSTGRESQL_NOTES_ROUTE, POSTGRESQL_RATIOS_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const ratioQuery = `SELECT
    COUNT(*) FILTER (WHERE status = 'Cancelled')::numeric
    / NULLIF(COUNT(*), 0) AS cancellation_ratio
FROM orders;`;

const percentageQuery = `SELECT
    100.0 * COUNT(*) FILTER (WHERE status = 'Cancelled')
    / NULLIF(COUNT(*), 0) AS cancellation_percentage
FROM orders;`;

const premiumRatioQuery = `SELECT
    COUNT(*) FILTER (
        WHERE customer_type = 'Premium'
          AND status = 'Cancelled'
    )::numeric
    / NULLIF(
        COUNT(*) FILTER (WHERE customer_type = 'Premium'),
        0
    ) AS premium_cancellation_ratio
FROM orders;`;

const PostgreSQLRatios = () => (
    <ArticleLayout
        title="Ratios in PostgreSQL"
        route={POSTGRESQL_RATIOS_ROUTE}
        sections={sections}
        backRoute={POSTGRESQL_NOTES_ROUTE}
        backLabel="Back to PostgreSQL notes"
    >
        <section className="Article__section">
            <ul className="Article__notes">
                <li>A ratio is one amount divided by another amount.</li>
                <li>The numerator is the amount you divide.</li>
                <li>The denominator is the amount you divide by.</li>
                <li>Decide which rows belong in each count before writing the query.</li>
                <li>A cancellation ratio is cancelled orders divided by all orders.</li>
            </ul>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead>
                        <tr>
                            <th scope="col">order_id</th>
                            <th scope="col">status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><th scope="row">1</th><td>Completed</td></tr>
                        <tr><th scope="row">2</th><td>Cancelled</td></tr>
                        <tr><th scope="row">3</th><td>Completed</td></tr>
                        <tr><th scope="row">4</th><td>Cancelled</td></tr>
                        <tr><th scope="row">5</th><td>Completed</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="count-matching-rows">
            <h2 id="count-matching-rows" className="SectionTitle">
                Count matching rows
            </h2>
            <ul className="Article__notes">
                <li><code>COUNT(*)</code> counts rows.</li>
                <li><code>FILTER (WHERE ...)</code> passes only rows where the condition is true to the aggregate.</li>
            </ul>
            <CodeBlock language="sql">
                {`COUNT(*) FILTER (WHERE status = 'Cancelled')`}
            </CodeBlock>
            <ul className="Article__notes">
                <li><code>COUNT(expression)</code> counts every non-<code>NULL</code> result.</li>
                <li>A boolean comparison returns <code>TRUE</code>, <code>FALSE</code>, or <code>NULL</code>.</li>
                <li><code>COUNT</code> counts both <code>TRUE</code> and <code>FALSE</code>. This expression does not count only cancelled orders:</li>
            </ul>
            <CodeBlock language="sql">
                {`COUNT(status = 'Cancelled') -- Counts TRUE and FALSE results`}
            </CodeBlock>
            <ul className="Article__notes">
                <li>If <code>status</code> is <code>NULL</code>, the comparison returns <code>NULL</code>. <code>COUNT</code> skips that row.</li>
                <li><code>COUNT(CASE WHEN condition THEN 1 END)</code> also counts matching rows.</li>
                <li><code>CASE</code> returns <code>1</code> for a matching row and <code>NULL</code> for any other row.</li>
            </ul>
            <CodeBlock language="sql">
                {`COUNT(CASE WHEN status = 'Cancelled' THEN 1 END)`}
            </CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="calculate-a-ratio">
            <h2 id="calculate-a-ratio" className="SectionTitle">
                Calculate a ratio
            </h2>
            <ul className="Article__notes">
                <li>If both numbers are integers, division drops the fractional part.</li>
                <li>A cast changes a value's type. <code>value::numeric</code> converts it to <code>numeric</code>.</li>
                <li>Cast the numerator to <code>numeric</code> to keep the fractional part.</li>
                <li><code>NULLIF(value, 0)</code> returns <code>NULL</code> when the value is zero.</li>
                <li>If there are no orders, the query returns <code>NULL</code> instead of causing a division-by-zero error.</li>
            </ul>
            <CodeBlock language="sql">{ratioQuery}</CodeBlock>
            <ul className="Article__notes">
                <li>Two of the five orders are cancelled. The ratio is 2 / 5 = 0.4.</li>
            </ul>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead>
                        <tr><th scope="col">cancellation_ratio</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>0.4</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="use-a-filtered-denominator">
            <h2 id="use-a-filtered-denominator" className="SectionTitle">
                Use a filtered denominator
            </h2>
            <ul className="Article__notes">
                <li>Give the denominator its own filter when it should count only some rows.</li>
                <li>This query calculates the cancellation ratio for premium orders.</li>
            </ul>
            <CodeBlock language="sql">{premiumRatioQuery}</CodeBlock>
            <ul className="Article__notes">
                <li>The numerator counts cancelled premium orders.</li>
                <li>The denominator counts all premium orders.</li>
                <li>If there are no premium orders, the result is <code>NULL</code>.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="return-a-percentage">
            <h2 id="return-a-percentage" className="SectionTitle">
                Return a percentage
            </h2>
            <ul className="Article__notes">
                <li>Multiply the numerator by <code>100.0</code> before dividing to return a percentage.</li>
                <li>For the sample orders, the result is 40.</li>
            </ul>
            <CodeBlock language="sql">{percentageQuery}</CodeBlock>
            <ul className="Article__notes">
                <li>For a boolean column such as <code>delivered</code>, use <code>FILTER (WHERE delivered)</code> to count true values.</li>
                <li>PostgreSQL booleans use <code>TRUE</code> and <code>FALSE</code> rather than the numbers 1 and 0.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default PostgreSQLRatios;
