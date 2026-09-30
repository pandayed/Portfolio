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
            <p>
                A ratio is a numerator divided by a denominator. First decide which rows belong in
                each count. In PostgreSQL, add <code>FILTER (WHERE ...)</code> to an aggregate when
                only some rows should contribute to it.
            </p>
            <p>For example, a cancellation ratio is cancelled orders divided by all orders.</p>
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
            <p>
                <code>COUNT(*)</code> counts rows. A filter makes it count only rows for which its
                condition is true:
            </p>
            <CodeBlock language="sql">
                {`COUNT(*) FILTER (WHERE status = 'Cancelled')`}
            </CodeBlock>
            <p>
                <code>COUNT(expression)</code> counts every non-<code>NULL</code> result. A boolean
                comparison can be <code>TRUE</code> or <code>FALSE</code>, and both are non-
                <code>NULL</code>. So this is not a conditional count:
            </p>
            <CodeBlock language="sql">
                {`COUNT(status = 'Cancelled') -- Counts TRUE and FALSE results`}
            </CodeBlock>
            <p>
                If <code>status</code> is <code>NULL</code>, the comparison is also <code>NULL</code>,
                so <code>COUNT</code> skips that row. Use <code>FILTER</code> to state the condition
                directly.
            </p>
            <p>
                <code>COUNT(CASE WHEN condition THEN 1 END)</code> is another valid PostgreSQL
                conditional count. Non-matching rows produce <code>NULL</code>, which{' '}
                <code>COUNT</code> skips:
            </p>
            <CodeBlock language="sql">
                {`COUNT(CASE WHEN status = 'Cancelled' THEN 1 END)`}
            </CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="calculate-a-ratio">
            <h2 id="calculate-a-ratio" className="SectionTitle">
                Calculate a ratio
            </h2>
            <p>
                PostgreSQL uses integer division when both operands are integers. Cast the numerator
                to <code>numeric</code> to keep the fractional part. <code>NULLIF</code> makes the
                result <code>NULL</code> when there are no orders, instead of raising a division by
                zero error.
            </p>
            <CodeBlock language="sql">{ratioQuery}</CodeBlock>
            <p>There are two cancelled orders and five orders in total, so the result is 0.4.</p>
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
            <p>
                When the denominator is not all rows, give it its own filter. This example finds the
                cancellation ratio among premium customers:
            </p>
            <CodeBlock language="sql">{premiumRatioQuery}</CodeBlock>
            <p>
                The numerator counts premium orders that were cancelled. The denominator counts all
                premium orders. If there are no premium orders, the result is <code>NULL</code>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="return-a-percentage">
            <h2 id="return-a-percentage" className="SectionTitle">
                Return a percentage
            </h2>
            <p>
                Multiply the numerator by <code>100.0</code> before dividing to return a percentage.
                For the sample orders, the result is 40.
            </p>
            <CodeBlock language="sql">{percentageQuery}</CodeBlock>
            <p>
                For a boolean column such as <code>delivered</code>, use a boolean condition in the
                filter, for example <code>FILTER (WHERE delivered)</code>. PostgreSQL booleans use{' '}
                <code>TRUE</code> and <code>FALSE</code>, not numeric values such as 1 and 0.
            </p>
        </section>
    </ArticleLayout>
);

export default PostgreSQLRatios;
