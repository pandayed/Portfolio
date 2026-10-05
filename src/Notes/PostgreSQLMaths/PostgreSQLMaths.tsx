import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import { POSTGRESQL_MATHS_ROUTE, POSTGRESQL_NOTES_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const arithmeticQuery = `SELECT
    7 + 3 AS addition,
    7 - 3 AS subtraction,
    7 * 3 AS multiplication,
    7 / 3 AS integer_division,
    7.0 / 3 AS decimal_division;`;

const modQuery = `SELECT
    MOD(17, 5) AS remainder,
    17 % 5 AS remainder_with_operator;`;

const aggregateQuery = `SELECT
    SUM(amount) AS total_amount,
    AVG(amount) AS average_amount
FROM payments;`;

const roundingQuery = `SELECT
    ROUND(23.456::numeric, 2) AS rounded,
    TRUNC(23.456::numeric, 2) AS truncated;`;

const otherFunctionsQuery = `SELECT
    ABS(-8) AS absolute_value,
    POWER(2, 3) AS power,
    SQRT(81) AS square_root,
    CEIL(4.2) AS rounded_up,
    FLOOR(4.8) AS rounded_down;`;

const PostgreSQLMaths = () => (
    <ArticleLayout
        title="Maths in PostgreSQL"
        route={POSTGRESQL_MATHS_ROUTE}
        sections={sections}
        backRoute={POSTGRESQL_NOTES_ROUTE}
        backLabel="Back to PostgreSQL notes"
    >
        <section className="Article__section">
            <ul className="Article__notes">
                <li>Arithmetic operators calculate with numbers.</li>
                <li>A math function returns a value from its inputs.</li>
                <li>An aggregate function calculates one result from many rows.</li>
                <li>PostgreSQL has integer, <code>numeric</code>, and floating-point number types.</li>
                <li>The examples use <code>numeric</code> when decimal precision matters.</li>
                <li>The type of a number can change the result of a calculation.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="arithmetic-operators">
            <h2 id="arithmetic-operators" className="SectionTitle">Arithmetic operators</h2>
            <ul className="Article__notes">
                <li>Use <code>+</code> to add and <code>-</code> to subtract.</li>
                <li>Use <code>*</code> to multiply and <code>/</code> to divide.</li>
                <li>If both sides of <code>/</code> are integers, PostgreSQL drops the fractional part.</li>
                <li>A cast changes a value's type. <code>value::numeric</code> converts it to <code>numeric</code>.</li>
                <li>Make one side a decimal or cast it to <code>numeric</code> to keep the fractional part.</li>
            </ul>
            <CodeBlock language="sql">{arithmeticQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead>
                        <tr>
                            <th scope="col">addition</th>
                            <th scope="col">subtraction</th>
                            <th scope="col">multiplication</th>
                            <th scope="col">integer_division</th>
                            <th scope="col">decimal_division</th>
                        </tr>
                    </thead>
                    <tbody><tr><td>10</td><td>4</td><td>21</td><td>2</td><td>2.333…</td></tr></tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="remainder-with-mod">
            <h2 id="remainder-with-mod" className="SectionTitle">Remainder with MOD</h2>
            <ul className="Article__notes">
                <li><code>MOD(dividend, divisor)</code> returns the remainder after division.</li>
                <li><code>%</code> does the same calculation.</li>
                <li>17 divided by 5 leaves a remainder of 2.</li>
            </ul>
            <CodeBlock language="sql">{modQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">remainder</th><th scope="col">remainder_with_operator</th></tr></thead>
                    <tbody><tr><td>2</td><td>2</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>A divisor of zero causes a division-by-zero error.</li>
                <li>Check for zero when the divisor comes from table data.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="aggregate-with-sum-and-avg">
            <h2 id="aggregate-with-sum-and-avg" className="SectionTitle">SUM and AVG across rows</h2>
            <ul className="Article__notes">
                <li><code>SUM</code> adds values from many rows.</li>
                <li><code>AVG</code> returns the arithmetic mean: the sum divided by the number of values.</li>
                <li>Both functions skip <code>NULL</code> values.</li>
            </ul>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">payment_id</th><th scope="col">amount</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">1</th><td>10</td></tr>
                        <tr><th scope="row">2</th><td>15</td></tr>
                        <tr><th scope="row">3</th><td>20</td></tr>
                        <tr><th scope="row">4</th><td>NULL</td></tr>
                    </tbody>
                </table>
            </div>
            <CodeBlock language="sql">{aggregateQuery}</CodeBlock>
            <ul className="Article__notes">
                <li>The sum is 45.</li>
                <li>The average is 15. PostgreSQL divides 45 by the three non-<code>NULL</code> amounts.</li>
            </ul>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">total_amount</th><th scope="col">average_amount</th></tr></thead>
                    <tbody><tr><td>45</td><td>15</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>If there are no non-<code>NULL</code> amounts, <code>SUM</code> and <code>AVG</code> return <code>NULL</code>.</li>
                <li>Use <code>GROUP BY</code> with an aggregate to calculate a separate result for each category.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="rounding-numbers">
            <h2 id="rounding-numbers" className="SectionTitle">Round or truncate a number</h2>
            <ul className="Article__notes">
                <li><code>ROUND(value, places)</code> rounds to the requested number of decimal places.</li>
                <li><code>TRUNC(value, places)</code> removes extra decimal places without rounding.</li>
                <li>Cast to <code>numeric</code> when you use the decimal-places argument.</li>
            </ul>
            <CodeBlock language="sql">{roundingQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">rounded</th><th scope="col">truncated</th></tr></thead>
                    <tbody><tr><td>23.46</td><td>23.45</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>ROUND(value)</code> rounds to a whole number.</li>
                <li>Rounding changes the number. Formatting produces display text.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="other-math-functions">
            <h2 id="other-math-functions" className="SectionTitle">Other math functions</h2>
            <ul className="Article__notes">
                <li>Use these functions in a <code>SELECT</code> expression or a larger calculation.</li>
            </ul>
            <CodeBlock language="sql">{otherFunctionsQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead>
                        <tr>
                            <th scope="col">absolute_value</th>
                            <th scope="col">power</th>
                            <th scope="col">square_root</th>
                            <th scope="col">rounded_up</th>
                            <th scope="col">rounded_down</th>
                        </tr>
                    </thead>
                    <tbody><tr><td>8</td><td>8</td><td>9</td><td>5</td><td>4</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>ABS</code> returns the absolute value: the number without its negative sign. <code>ABS(-8)</code> is 8.</li>
                <li><code>POWER</code> raises a number to an exponent. <code>POWER(2, 3)</code> is 2 × 2 × 2, or 8.</li>
                <li><code>SQRT</code> returns a square root. <code>SQRT(81)</code> is 9 because 9 × 9 is 81.</li>
                <li><code>CEIL</code> returns the nearest integer greater than or equal to the number.</li>
                <li><code>FLOOR</code> returns the nearest integer less than or equal to the number.</li>
                <li><code>CEIL(-4.2)</code> is -4. <code>FLOOR(-4.2)</code> is -5.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default PostgreSQLMaths;
