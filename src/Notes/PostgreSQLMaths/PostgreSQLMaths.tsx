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
            <p>
                PostgreSQL supports arithmetic operators, single-value math functions, and aggregate
                functions that calculate a result from many rows. This page groups these number-related
                tools together. They do not belong to one SQL clause.
            </p>
            <p>
                The examples use <code>numeric</code> values when decimal precision matters. PostgreSQL
                also has integer and floating-point number types. The type of an expression can affect
                its result.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="arithmetic-operators">
            <h2 id="arithmetic-operators" className="SectionTitle">Arithmetic operators</h2>
            <p>
                Use <code>+</code> to add, <code>-</code> to subtract, <code>*</code> to multiply, and{' '}
                <code>/</code> to divide. If both sides of <code>/</code> are integers, PostgreSQL
                drops the fractional part. Make one side a decimal or cast it to <code>numeric</code>
                when you need a fractional result.
            </p>
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
            <p>
                <code>MOD(dividend, divisor)</code> returns the remainder after division. PostgreSQL
                also provides the <code>%</code> operator for the same calculation. Here, 17 divided
                by 5 leaves a remainder of 2.
            </p>
            <CodeBlock language="sql">{modQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">remainder</th><th scope="col">remainder_with_operator</th></tr></thead>
                    <tbody><tr><td>2</td><td>2</td></tr></tbody>
                </table>
            </div>
            <p>
                A divisor of zero causes a division-by-zero error. Check or prevent zero when the
                divisor comes from table data.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="aggregate-with-sum-and-avg">
            <h2 id="aggregate-with-sum-and-avg" className="SectionTitle">SUM and AVG across rows</h2>
            <p>
                <code>SUM</code> adds the non-<code>NULL</code> values in a column. <code>AVG</code>{' '}
                returns their arithmetic mean. Unlike the <code>+</code> operator, these aggregate
                functions can combine values from many table rows.
            </p>
            <p>For these rows, both functions skip the missing amount:</p>
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
            <p>The sum is 45. The average is 15 because PostgreSQL divides 45 by the three non-NULL amounts.</p>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">total_amount</th><th scope="col">average_amount</th></tr></thead>
                    <tbody><tr><td>45</td><td>15</td></tr></tbody>
                </table>
            </div>
            <p>
                If there are no non-<code>NULL</code> amounts, <code>SUM</code> and <code>AVG</code>{' '}
                return <code>NULL</code>. To calculate separate totals per category, combine an
                aggregate with <code>GROUP BY</code>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="rounding-numbers">
            <h2 id="rounding-numbers" className="SectionTitle">Round or truncate a number</h2>
            <p>
                <code>ROUND(value, places)</code> rounds to the requested number of decimal places.
                <code>TRUNC(value, places)</code> removes extra decimal places without rounding.
                Cast to <code>numeric</code> when you use the decimal-places argument.
            </p>
            <CodeBlock language="sql">{roundingQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">rounded</th><th scope="col">truncated</th></tr></thead>
                    <tbody><tr><td>23.46</td><td>23.45</td></tr></tbody>
                </table>
            </div>
            <p>
                <code>ROUND(value)</code> rounds to a whole number. Rounding is different from
                formatting a number as display text.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="other-math-functions">
            <h2 id="other-math-functions" className="SectionTitle">Other math functions</h2>
            <p>
                These functions each take a value and return a value. They can be used in a
                <code>SELECT</code> expression or as part of a larger calculation.
            </p>
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
            <p>
                <code>ABS</code> returns the distance from zero, <code>POWER</code> raises a value
                to an exponent, and <code>SQRT</code> returns a square root. <code>CEIL</code>{' '}
                rounds toward positive infinity, while <code>FLOOR</code> rounds toward negative
                infinity. For example, <code>CEIL(-4.2)</code> is -4 and <code>FLOOR(-4.2)</code> is -5.
            </p>
        </section>
    </ArticleLayout>
);

export default PostgreSQLMaths;
