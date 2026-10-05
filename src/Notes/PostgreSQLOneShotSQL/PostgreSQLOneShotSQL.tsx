import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import {
    POSTGRESQL_NOTES_ROUTE,
    POSTGRESQL_ONE_SHOT_SQL_ROUTE,
} from '../../routing/routes';
import { sections } from './sections';

const customersWithoutOrdersQuery = `SELECT c.customer_id, c.customer_name
FROM customers AS c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
)
ORDER BY c.customer_id;`;

const coalesceExample = `SELECT COALESCE(NULL, NULL, 'Hello', 'World');`;

const lengthExample = `SELECT LENGTH(customer_name) AS name_length
FROM customers;`;

const currentDateTimeExample = `SELECT CURRENT_DATE AS today,
       CURRENT_TIMESTAMP AS transaction_time,
       NOW() AS transaction_time_again;`;

const extractDateFieldsExample = `SELECT EXTRACT(YEAR FROM order_date) AS order_year,
       EXTRACT(MONTH FROM order_date) AS order_month
FROM orders;`;

const extractWeekdayExample = `SELECT EXTRACT(ISODOW FROM order_date) AS weekday_number
FROM orders;`;

const dateTruncExample = `SELECT DATE_TRUNC('month', created_at) AS month_start,
       COUNT(*) AS order_count
FROM orders
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month_start;`;

const recentOrdersExample = `SELECT order_id, created_at
FROM orders
WHERE created_at >= CURRENT_TIMESTAMP - INTERVAL '30 days';`;

const dateArithmeticExample = `SELECT order_date + 7 AS one_week_later,
       CURRENT_DATE - order_date AS days_since_order
FROM orders;`;

const timestampArithmeticExample = `SELECT created_at + INTERVAL '7 days' AS one_week_later
FROM orders;`;

const ageExample = `SELECT AGE(CURRENT_DATE, birth_date) AS age
FROM people;`;

const toCharDateExample = `SELECT TO_CHAR(order_date, 'Mon DD, YYYY') AS display_date
FROM orders;`;

const contactNumberQuery = `SELECT COALESCE(mobile_phone, home_phone, office_phone, 'No Phone') AS contact_number
FROM customers;`;

const cancelledRatioQuery = `SELECT
    (COUNT(*) FILTER (WHERE status = 'Cancelled'))::numeric
    / NULLIF(COUNT(*), 0) AS cancelled_ratio
FROM orders;`;

const conditionalCaseExample = `SELECT CASE
    WHEN score >= 60 THEN 'Pass'
    ELSE 'Fail'
END AS result
FROM exam_results;`;

const simpleCaseExample = `CASE status
    WHEN 'P' THEN 'Pending'
    WHEN 'S' THEN 'Shipped'
    ELSE 'Unknown'
END`;

const searchedCaseExample = `CASE
    WHEN score >= 80 THEN 'Distinction'
    WHEN score >= 60 THEN 'Pass'
    ELSE 'Fail'
END`;

const aggregateExample = `SELECT
    COUNT(*) AS row_count,
    COUNT(discount) AS non_null_discount_count,
    SUM(amount) AS total_amount
FROM orders;`;

const conditionalCountExample = `SELECT
    COUNT(*) FILTER (WHERE status = 'Cancelled') AS count_with_filter,
    SUM(CASE WHEN status = 'Cancelled' THEN 1 ELSE 0 END) AS count_with_case
FROM orders;`;

const scalarSubqueryExample = `SELECT employee_name
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);`;

const lateralExample = `SELECT c.customer_id, recent.order_id, recent.order_date
FROM customers AS c
LEFT JOIN LATERAL (
    SELECT o.order_id, o.order_date
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
    ORDER BY o.order_date DESC, o.order_id DESC
    LIMIT 1
) AS recent ON TRUE;`;

const limitExample = `SELECT order_id, order_date
FROM orders
ORDER BY order_date DESC, order_id DESC
LIMIT 10 OFFSET 20;`;

const cteExample = `WITH customer_totals AS (
    SELECT customer_id, SUM(amount) AS total_amount
    FROM orders
    GROUP BY customer_id
)
SELECT customer_id, total_amount
FROM customer_totals
WHERE total_amount > 1000;`;

const runningTotalExample = `SELECT
    order_id,
    customer_id,
    amount,
    SUM(amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date, order_id
    ) AS running_total
FROM orders;`;

const rankingExample = `SELECT
    employee_id,
    score,
    ROW_NUMBER() OVER (ORDER BY score DESC, employee_id) AS row_number_value,
    RANK() OVER (ORDER BY score DESC) AS rank_value,
    DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rank_value
FROM results
ORDER BY score DESC, employee_id;`;

const selectDistinctExample = `SELECT DISTINCT city
FROM customers;`;

const joinExample = `SELECT c.customer_id, c.customer_name, o.order_id
FROM customers AS c
LEFT JOIN orders AS o
    ON o.customer_id = c.customer_id;`;

const usingExample = `SELECT customer_id, customer_name, order_id
FROM customers
JOIN orders USING (customer_id);`;

const filteringAndGroupingExample = `SELECT customer_id, COUNT(*) AS completed_order_count
FROM orders
WHERE status = 'Completed'
GROUP BY customer_id
HAVING COUNT(*) >= 3;`;

const namedWindowExample = `SELECT
    employee_id,
    department_id,
    salary,
    RANK() OVER department_salary AS salary_rank
FROM employees
WINDOW department_salary AS (
    PARTITION BY department_id
    ORDER BY salary DESC
);`;

const selectIntoTableExample = `SELECT id, data
INTO TEMP TABLE saved_test_data
FROM test_data
ORDER BY id
LIMIT 1;`;

const plpgsqlIntoExample = `SELECT id, data
INTO saved_id, saved_data
FROM test_data
ORDER BY id
LIMIT 1;`;

const copyExample = `COPY (
    SELECT id, data
    FROM test_data
    ORDER BY id
) TO '/var/lib/postgresql/export.csv'
WITH (FORMAT csv, HEADER);`;

const lockingReadExample = `START TRANSACTION;

SELECT order_id, status
FROM orders
WHERE order_id = 42
FOR UPDATE;

UPDATE orders
SET status = 'Processing'
WHERE order_id = 42;

COMMIT;`;

const setOperationsExample = `-- Rows from either query; duplicates are removed
SELECT customer_id FROM retail_customers
UNION
SELECT customer_id FROM wholesale_customers;

-- Rows present in both queries
SELECT customer_id FROM newsletter_subscribers
INTERSECT
SELECT customer_id FROM active_customers;

-- Rows in the first query but not the second
SELECT customer_id FROM customers
EXCEPT
SELECT customer_id FROM blocked_customers;`;

const PostgreSQLOneShotSQL = () => (
    <ArticleLayout
        title="PostgreSQL One Shot SQL"
        route={POSTGRESQL_ONE_SHOT_SQL_ROUTE}
        sections={sections}
        backRoute={POSTGRESQL_NOTES_ROUTE}
        backLabel="Back to PostgreSQL notes"
    >
        <section className="Article__section">
            <ul className="Article__notes">
                <li>These notes use PostgreSQL 18.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="edge-cases">
            <h2 id="edge-cases" className="SectionTitle">
                Edge cases
            </h2>
            <ul className="Article__notes">
                <li>
                    Check <code>NULL</code>, empty strings (<code>''</code>), <code>0</code>,
                    duplicate rows, and results with no rows.
                </li>
                <li><code>NULL</code> means unknown.</li>
                <li>
                    Arithmetic with <code>NULL</code> returns <code>NULL</code>. This includes{' '}
                    <code>+</code>, <code>-</code>, <code>*</code>, and <code>/</code>.
                </li>
                <li>
                    <code>0 / NULL</code>, <code>NULL / 0</code>, and <code>0 * NULL</code> also return{' '}
                    <code>NULL</code>.
                </li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="query-order">
            <h2 id="query-order" className="SectionTitle">
                Query order
            </h2>
            <h3 className="Article__subTitle">Common written order</h3>
            <p>
                <code>
                    WITH → SELECT → DISTINCT → FROM (JOIN ... ON/USING) → WHERE → GROUP BY → HAVING
                    → WINDOW → ORDER BY → LIMIT → OFFSET → FOR UPDATE/FOR SHARE
                </code>
            </p>
            <h3 className="Article__subTitle">Logical processing order</h3>
            <p>
                <code>
                    FROM (JOIN ... ON/USING) → WHERE → GROUP BY → HAVING → WINDOW FUNCTIONS → SELECT
                    → DISTINCT → ORDER BY → OFFSET → LIMIT
                </code>
            </p>
            <ul className="Article__notes">
                <li>
                    <code>LIMIT</code> and <code>OFFSET</code> are separate clauses.
                </li>
                <li>
                    PostgreSQL skips the offset rows before returning at most the requested row count.
                </li>
                <li>
                    <code>ON</code> or <code>USING</code> belongs to its <code>JOIN</code> inside{' '}
                    <code>FROM</code>.
                </li>
                <li>
                    <code>UNION</code>, <code>INTERSECT</code>, and <code>EXCEPT</code> combine complete
                    query blocks. They are not included in this list.
                </li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="core-select-clauses">
            <h2 id="core-select-clauses" className="SectionTitle">
                Core SELECT clauses
            </h2>
            <h3 className="Article__subTitle">SELECT and DISTINCT</h3>
            <ul className="Article__notes">
                <li><code>SELECT</code> chooses the expressions or columns to return.</li>
                <li>
                    Leave out <code>FROM</code> when no table is needed. For example,{' '}
                    <code>SELECT 1;</code> returns <code>1</code>.
                </li>
                <li><code>ALL</code> is the default. It keeps duplicate result rows.</li>
                <li>
                    <code>DISTINCT</code> removes duplicate result rows. It compares all selected
                    columns, not just the first column.
                </li>
                <li>
                    <code>DISTINCT ON</code> keeps the first row for each specified group of expressions.
                </li>
            </ul>
            <CodeBlock language="sql">{selectDistinctExample}</CodeBlock>
            <h3 className="Article__subTitle">FROM, JOIN, ON, and USING</h3>
            <ul className="Article__notes">
                <li>
                    <code>FROM</code> names the source tables or derived tables. A derived table is
                    a query result used as a table.
                </li>
                <li><code>JOIN</code> combines rows from those sources.</li>
                <li>
                    <code>ON</code> sets the join condition. It can compare columns with different
                    names or use a more complex expression.
                </li>
            </ul>
            <CodeBlock language="sql">{joinExample}</CodeBlock>
            <ul className="Article__notes">
                <li>
                    Use <code>USING(column_name)</code> when the join column has the same name in
                    both tables.
                </li>
                <li>Each column named in <code>USING</code> must exist in both tables.</li>
                <li>
                    An unqualified <code>SELECT *</code> returns one copy of each <code>USING</code>{' '}
                    column instead of one copy from each table.
                </li>
            </ul>
            <CodeBlock language="sql">{usingExample}</CodeBlock>
            <ul className="Article__notes">
                <li><code>LEFT JOIN</code> keeps every row from the left table.</li>
                <li>
                    If no right-table row matches, the right-table columns are <code>NULL</code>.
                </li>
                <li>Put a condition in <code>ON</code> when it controls matching.</li>
                <li>Put a condition in <code>WHERE</code> when it filters the joined result.</li>
            </ul>
            <h3 className="Article__subTitle">WHERE, GROUP BY, and HAVING</h3>
            <ul className="Article__notes">
                <li><code>WHERE</code> filters rows before grouping.</li>
                <li>
                    <code>GROUP BY</code> collects rows that share the grouping values. An aggregate
                    function calculates one result per group.
                </li>
                <li><code>HAVING</code> filters groups after aggregation.</li>
                <li>
                    Aggregate functions can appear in <code>HAVING</code>. They cannot appear in{' '}
                    <code>WHERE</code>.
                </li>
            </ul>
            <CodeBlock language="sql">{filteringAndGroupingExample}</CodeBlock>
            <h3 className="Article__subTitle">WINDOW and OVER</h3>
            <ul className="Article__notes">
                <li>
                    The optional <code>WINDOW</code> clause names a window specification so you can
                    use it more than once.
                </li>
                <li>
                    A window function uses that name or an inline specification with <code>OVER</code>.
                </li>
                <li>
                    <code>OVER</code> is part of the window-function expression. It is not a query clause.
                </li>
            </ul>
            <CodeBlock language="sql">{namedWindowExample}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="existence-checks">
            <h2 id="existence-checks" className="SectionTitle">
                Existence checks
            </h2>
            <ul className="Article__notes">
                <li><code>EXISTS</code> is true when a subquery returns at least one row.</li>
                <li><code>NOT EXISTS</code> is true when a subquery returns no rows.</li>
                <li>
                    <code>SELECT 1 FROM orders;</code> returns <code>1</code> for each row in{' '}
                    <code>orders</code>. Use it inside an existence check when the values do not matter.
                </li>
            </ul>
            <CodeBlock language="sql">{customersWithoutOrdersQuery}</CodeBlock>
            <ul className="Article__notes">
                <li>This query returns customers with no matching orders.</li>
                <li>
                    An existence check may stop after finding a matching row. <code>COUNT(*)</code>{' '}
                    calculates an exact count.
                </li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="expressions-and-null-handling">
            <h2 id="expressions-and-null-handling" className="SectionTitle">
                Expressions and NULL handling
            </h2>
            <h3 className="Article__subTitle">CASE</h3>
            <ul className="Article__notes">
                <li><code>CASE</code> chooses a value based on conditions.</li>
            </ul>
            <CodeBlock language="sql">{conditionalCaseExample}</CodeBlock>
            <ul className="Article__notes">
                <li>The simple form compares one expression with each <code>WHEN</code> value.</li>
            </ul>
            <CodeBlock language="sql">{simpleCaseExample}</CodeBlock>
            <ul className="Article__notes">
                <li>The searched form checks separate conditions in order.</li>
            </ul>
            <CodeBlock language="sql">{searchedCaseExample}</CodeBlock>
            <ul className="Article__notes">
                <li><code>CASE</code> returns the result from the first matching branch.</li>
                <li>If no branch matches, it returns the <code>ELSE</code> result.</li>
                <li>If <code>ELSE</code> is missing, it returns <code>NULL</code>.</li>
                <li>
                    In the simple form, <code>WHEN NULL</code> does not match <code>NULL</code>.
                    Use a searched condition such as <code>WHEN value IS NULL</code>.
                </li>
            </ul>
            <h3 className="Article__subTitle">COALESCE</h3>
            <ul className="Article__notes">
                <li><code>COALESCE</code> returns the first non-<code>NULL</code> value.</li>
            </ul>
            <CodeBlock language="sql">{coalesceExample}</CodeBlock>
            <ul className="Article__notes">
                <li>This expression returns <code>Hello</code>.</li>
            </ul>
            <CodeBlock language="sql">{contactNumberQuery}</CodeBlock>
            <ul className="Article__notes">
                <li>This query checks the phone columns from left to right.</li>
                <li>It returns <code>No Phone</code> if all three phone columns are <code>NULL</code>.</li>
            </ul>
            <h3 className="Article__subTitle">NULLIF</h3>
            <ul className="Article__notes">
                <li><code>NULLIF</code> returns <code>NULL</code> if its two values are equal.</li>
                <li>Otherwise, it returns the first value.</li>
            </ul>
            <CodeBlock language="sql">numerator / NULLIF(denominator, 0)</CodeBlock>
            <ul className="Article__notes">
                <li>
                    <code>NULLIF(denominator, 0)</code> changes a zero denominator to <code>NULL</code>.
                    The division then returns <code>NULL</code>.
                </li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="important-functions">
            <h2 id="important-functions" className="SectionTitle">
                Important functions
            </h2>
            <h3 className="Article__subTitle">LENGTH</h3>
            <ul className="Article__notes">
                <li>
                    <code>LENGTH(value)</code> returns the number of characters in a string,
                    including a <code>varchar</code> value.
                </li>
            </ul>
            <CodeBlock language="sql">{lengthExample}</CodeBlock>

            <ul className="Article__notes">
                <li>
                    The date examples use <code>order_date</code> and <code>birth_date</code> as{' '}
                    <code>date</code> columns.
                </li>
                <li><code>created_at</code> is a timestamp column.</li>
            </ul>
            <h3 className="Article__subTitle">Current date and time</h3>
            <ul className="Article__notes">
                <li><code>CURRENT_DATE</code> returns the current date.</li>
                <li><code>CURRENT_TIMESTAMP</code> and <code>NOW()</code> return the current date and time.</li>
                <li>These values use the start of the current transaction.</li>
                <li>They stay the same during that transaction.</li>
            </ul>
            <CodeBlock language="sql">{currentDateTimeExample}</CodeBlock>

            <h3 className="Article__subTitle">EXTRACT</h3>
            <ul className="Article__notes">
                <li>
                    <code>EXTRACT(field FROM value)</code> returns one part of a date or timestamp,
                    such as its year or month.
                </li>
                <li>Its result type is <code>numeric</code>.</li>
            </ul>
            <CodeBlock language="sql">{extractDateFieldsExample}</CodeBlock>
            <ul className="Article__notes">
                <li><code>ISODOW</code> numbers weekdays from Monday as 1 to Sunday as 7.</li>
                <li><code>DOW</code> numbers weekdays from Sunday as 0 to Saturday as 6.</li>
            </ul>
            <CodeBlock language="sql">{extractWeekdayExample}</CodeBlock>
            <ul className="Article__notes">
                <li><code>date_part('year', value)</code> also returns a date or timestamp field.</li>
                <li>
                    Prefer <code>EXTRACT</code> for a <code>numeric</code> result.{' '}
                    <code>date_part</code> returns <code>double precision</code>.
                </li>
            </ul>

            <h3 className="Article__subTitle">DATE_TRUNC</h3>
            <ul className="Article__notes">
                <li>
                    <code>DATE_TRUNC('month', timestamp)</code> sets the day and smaller parts to
                    the start of that month.
                </li>
                <li>Use it to group timestamps by month, quarter, or year.</li>
            </ul>
            <CodeBlock language="sql">{dateTruncExample}</CodeBlock>

            <h3 className="Article__subTitle">Date and time arithmetic</h3>
            <ul className="Article__notes">
                <li>Add an integer to a <code>date</code> to add that many days.</li>
                <li>Subtract two <code>date</code> values to get the number of days between them.</li>
            </ul>
            <CodeBlock language="sql">{dateArithmeticExample}</CodeBlock>
            <ul className="Article__notes">
                <li>Add an <code>INTERVAL</code> to a timestamp to add a time period.</li>
                <li>This query returns rows from the last 30 days.</li>
            </ul>
            <CodeBlock language="sql">{recentOrdersExample}</CodeBlock>
            <CodeBlock language="sql">{timestampArithmeticExample}</CodeBlock>
            <ul className="Article__notes">
                <li>A month is not a fixed number of days.</li>
                <li>Adding one month to January 31 gives the last valid day of February.</li>
                <li>This expression returns <code>2026-02-28 00:00:00</code>.</li>
            </ul>
            <CodeBlock language="sql">DATE '2026-01-31' + INTERVAL '1 month'</CodeBlock>

            <h3 className="Article__subTitle">AGE</h3>
            <ul className="Article__notes">
                <li>
                    <code>AGE(later_date, earlier_date)</code> returns an interval in years,
                    months, and days.
                </li>
                <li>Use it to calculate an age in calendar units.</li>
                <li>Use date subtraction to get the number of days between two <code>date</code> values.</li>
            </ul>
            <CodeBlock language="sql">{ageExample}</CodeBlock>

            <h3 className="Article__subTitle">TO_CHAR</h3>
            <ul className="Article__notes">
                <li><code>TO_CHAR(value, format)</code> returns a date or timestamp as formatted text.</li>
                <li>Use the text to display a date.</li>
                <li>Keep the original date or timestamp type for comparisons and sorting.</li>
            </ul>
            <CodeBlock language="sql">{toCharDateExample}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="counting-ratios-and-ordering">
            <h2 id="counting-ratios-and-ordering" className="SectionTitle">
                Counting, ratios, and ordering
            </h2>
            <h3 className="Article__subTitle">COUNT vs SUM</h3>
            <CodeBlock language="sql">{aggregateExample}</CodeBlock>
            <ul className="Article__notes">
                <li><code>COUNT(*)</code> counts rows, including rows that contain <code>NULL</code>.</li>
                <li><code>COUNT(expression)</code> counts rows where the expression is not <code>NULL</code>.</li>
                <li><code>COUNT(DISTINCT expression)</code> counts distinct non-<code>NULL</code> values.</li>
                <li><code>SUM(expression)</code> adds the non-<code>NULL</code> values.</li>
                <li><code>SUM</code> returns <code>NULL</code> if every value is <code>NULL</code>.</li>
                <li>
                    With no input rows, <code>COUNT</code> returns <code>0</code> and{' '}
                    <code>SUM</code> returns <code>NULL</code>.
                </li>
            </ul>
            <CodeBlock language="sql">{conditionalCountExample}</CodeBlock>
            <ul className="Article__notes">
                <li>Both expressions count cancelled orders.</li>
                <li><code>FILTER</code> selects the rows that the aggregate receives.</li>
                <li>
                    Keep <code>ELSE 0</code> in the <code>SUM</code> form. Without it,{' '}
                    <code>SUM</code> returns <code>NULL</code> when no row matches the condition.
                </li>
                <li><code>ELSE 0</code> does not change the result for input with no rows.</li>
                <li>
                    An aggregate query without <code>GROUP BY</code> returns one aggregate row
                    even when the input has no rows.
                </li>
                <li>A grouped query returns no row when no group exists.</li>
            </ul>
            <h3 className="Article__subTitle">Finding ratios</h3>
            <CodeBlock language="sql">{cancelledRatioQuery}</CodeBlock>
            <ul className="Article__notes">
                <li><code>FILTER</code> counts only cancelled orders.</li>
                <li>The <code>::numeric</code> cast avoids integer division.</li>
                <li>
                    <code>NULLIF(COUNT(*), 0)</code> prevents division by zero.
                    The ratio is <code>NULL</code> when there are no orders.
                </li>
            </ul>
            <h3 className="Article__subTitle">ROUND</h3>
            <ul className="Article__notes">
                <li><code>ROUND(value, places)</code> rounds a <code>numeric</code> value to that many decimal places.</li>
                <li>A negative <code>places</code> value rounds digits to the left of the decimal point.</li>
                <li>The <code>double precision</code> form accepts only one argument.</li>
                <li>Cast a <code>double precision</code> value to <code>numeric</code> to specify decimal places.</li>
            </ul>
            <h3 className="Article__subTitle">GROUP BY and selected columns</h3>
            <ul className="Article__notes">
                <li>
                    A selected column in a grouped query must be grouped or aggregated unless
                    it is functionally dependent on the grouped columns.
                </li>
                <li>
                    Functional dependence means the grouped columns determine one value for that column.
                </li>
                <li>
                    PostgreSQL recognizes this dependence when <code>GROUP BY</code> includes
                    the table's primary key.
                </li>
            </ul>
            <h3 className="Article__subTitle">ORDER BY</h3>
            <ul className="Article__notes">
                <li>Use <code>ORDER BY</code> to sort rows.</li>
                <li><code>ASC</code> sorts in ascending order. <code>DESC</code> sorts in descending order.</li>
                <li>PostgreSQL does not guarantee the output order without <code>ORDER BY</code>.</li>
                <li>The combined sort columns must uniquely order rows to guarantee the same order each time.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="results-and-terms">
            <h2 id="results-and-terms" className="SectionTitle">
                Results and terms
            </h2>
            <h3 className="Article__subTitle">Scalar subquery</h3>
            <ul className="Article__notes">
                <li>A scalar subquery returns one column and at most one row.</li>
                <li>Use it where the query expects a single value.</li>
                <li>No row gives <code>NULL</code>. More than one row causes an error.</li>
            </ul>
            <CodeBlock language="sql">{scalarSubqueryExample}</CodeBlock>
            <h3 className="Article__subTitle">Result shapes</h3>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead>
                        <tr>
                            <th scope="col">Shape</th>
                            <th scope="col">Rows and columns</th>
                            <th scope="col">Common use</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Scalar</th>
                            <td>Zero or one row and one column</td>
                            <td>Comparison with one value</td>
                        </tr>
                        <tr>
                            <th scope="row">Row</th>
                            <td>Zero or one row and two or more columns</td>
                            <td>Row comparison</td>
                        </tr>
                        <tr>
                            <th scope="row">Column</th>
                            <td>Zero or more rows and one column</td>
                            <td>
                                <code>IN</code>, <code>ANY</code>, or <code>ALL</code>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Table</th>
                            <td>Zero or more rows and one or more columns</td>
                            <td>Aliased derived table in the FROM clause</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 className="Article__subTitle">Clause and statement</h3>
            <ul className="Article__notes">
                <li>A <strong>clause</strong> is a part of a SQL statement.</li>
                <li>For example, <code>WHERE age &gt; 18</code> is a clause that filters rows.</li>
                <li>A <strong>statement</strong> is a complete SQL command or query.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="more-sql-tools">
            <h2 id="more-sql-tools" className="SectionTitle">
                More SQL tools
            </h2>
            <h3 className="Article__subTitle">LATERAL</h3>
            <ul className="Article__notes">
                <li>
                    A normal derived table in <code>FROM</code> cannot refer to another table
                    in the same <code>FROM</code> clause.
                </li>
                <li><code>LATERAL</code> lets it refer to tables that appear before it.</li>
                <li>Use this when the derived table depends on each earlier row.</li>
            </ul>
            <CodeBlock language="sql">{lateralExample}</CodeBlock>
            <ul className="Article__notes">
                <li>This query returns each customer's latest order.</li>
                <li>The second sort column chooses one order when two orders have the same date.</li>
            </ul>
            <h3 className="Article__subTitle">LIMIT</h3>
            <ul className="Article__notes">
                <li><code>LIMIT row_count</code> returns at most that many rows.</li>
                <li><code>OFFSET offset</code> skips that many rows. The offset starts at 0.</li>
                <li>PostgreSQL also supports <code>OFFSET ... ROWS FETCH FIRST ... ROWS ONLY</code>.</li>
            </ul>
            <CodeBlock language="sql">{limitExample}</CodeBlock>
            <ul className="Article__notes">
                <li>Use <code>ORDER BY</code> with <code>LIMIT</code> to choose predictable rows.</li>
                <li>Add a unique sort column when rows can share the main sort value.</li>
            </ul>
            <h3 className="Article__subTitle">Window functions and PARTITION BY</h3>
            <ul className="Article__notes">
                <li>A window function calculates a value for each row. It keeps the individual rows.</li>
                <li><code>PARTITION BY</code> divides the result into groups called partitions.</li>
                <li>The window calculation restarts for each partition.</li>
                <li>Without <code>PARTITION BY</code>, the whole result is one partition.</li>
            </ul>
            <CodeBlock language="sql">{runningTotalExample}</CodeBlock>
            <ul className="Article__notes">
                <li><code>ORDER BY</code> inside <code>OVER(...)</code> orders the window calculation.</li>
                <li>Use a query-level <code>ORDER BY</code> to order the final output.</li>
                <li>
                    Window functions can appear only in the select list and the query-level{' '}
                    <code>ORDER BY</code> clause.
                </li>
            </ul>
            <h3 className="Article__subTitle">CTE vs subquery</h3>
            <ul className="Article__notes">
                <li>
                    A common table expression (CTE) gives a query result a name.
                    Define it with <code>WITH</code> before the main <code>SELECT</code>.
                </li>
                <li>The CTE exists only for that statement.</li>
                <li>You can refer to a CTE more than once.</li>
                <li><code>WITH RECURSIVE</code> lets a CTE refer to its own results.</li>
                <li>A CTE can make a query with several steps easier to read.</li>
            </ul>
            <CodeBlock language="sql">{cteExample}</CodeBlock>
            <ul className="Article__notes">
                <li>A subquery appears where its result is used. It is often simpler when used once.</li>
                <li>A CTE is not automatically faster.</li>
                <li>
                    PostgreSQL normally combines a non-recursive CTE with the parent query when
                    the CTE has no side effects and is referenced once.
                </li>
                <li>
                    A CTE referenced more than once is normally materialized. PostgreSQL calculates
                    its result separately instead of combining it with the parent query.
                </li>
                <li><code>MATERIALIZED</code> and <code>NOT MATERIALIZED</code> can change that choice.</li>
                <li>Check the execution plan when performance matters.</li>
            </ul>
            <h3 className="Article__subTitle">SELECT INTO, PL/pgSQL, and COPY</h3>
            <ul className="Article__notes">
                <li>At the SQL level, <code>SELECT ... INTO</code> creates a table from query results.</li>
                <li>PostgreSQL recommends <code>CREATE TABLE ... AS</code> for new code.</li>
                <li>This example uses <code>SELECT ... INTO</code> to create a temporary table.</li>
            </ul>
            <CodeBlock language="sql">{selectIntoTableExample}</CodeBlock>
            <ul className="Article__notes">
                <li>
                    Inside PL/pgSQL, <code>SELECT ... INTO target</code> assigns a row to variables
                    or a record.
                </li>
                <li>Without <code>STRICT</code>, no row assigns null values.</li>
                <li>Without <code>STRICT</code>, extra rows are discarded.</li>
                <li>With <code>STRICT</code>, the query must return exactly one row.</li>
            </ul>
            <CodeBlock language="sql">{plpgsqlIntoExample}</CodeBlock>
            <ul className="Article__notes">
                <li><code>COPY</code> writes query results to a file on the server.</li>
                <li>The PostgreSQL server process needs permission to write to that path.</li>
                <li>The psql <code>\copy</code> command writes a file on the client.</li>
            </ul>
            <CodeBlock language="sql">{copyExample}</CodeBlock>
            <h3 className="Article__subTitle">FOR UPDATE and FOR SHARE</h3>
            <ul className="Article__notes">
                <li>These clauses take row-level locks.</li>
                <li><code>FOR UPDATE</code> blocks conflicting updates, deletes, and row locks.</li>
                <li><code>FOR SHARE</code> allows compatible shared locks.</li>
                <li><code>FOR SHARE</code> blocks updates, deletes, and stronger row locks.</li>
                <li>PostgreSQL also has <code>FOR NO KEY UPDATE</code> and <code>FOR KEY SHARE</code>.</li>
                <li>Use an explicit transaction when later statements depend on the lock.</li>
                <li><code>COMMIT</code> or <code>ROLLBACK</code> releases the lock.</li>
            </ul>
            <CodeBlock language="sql">{lockingReadExample}</CodeBlock>
            <ul className="Article__notes">
                <li><code>NOWAIT</code> returns an error immediately when a row is locked.</li>
                <li><code>SKIP LOCKED</code> leaves out locked rows. It can give an inconsistent view.</li>
                <li>Use <code>SKIP LOCKED</code> for queue access, not general transactional work.</li>
            </ul>
            <h3 className="Article__subTitle">UNION, INTERSECT, and EXCEPT</h3>
            <ul className="Article__notes">
                <li>These set operators combine results from query blocks.</li>
                <li><code>UNION</code> returns rows from either result.</li>
                <li><code>INTERSECT</code> returns rows present in both results.</li>
                <li><code>EXCEPT</code> returns rows in the first result that are absent from the second.</li>
                <li>These operators remove duplicates by default. Add <code>ALL</code> to keep duplicates.</li>
                <li>Each query block must return the same number of columns.</li>
                <li>Corresponding columns must have compatible result types.</li>
            </ul>
            <CodeBlock language="sql">{setOperationsExample}</CodeBlock>
            <ul className="Article__notes">
                <li><code>INTERSECT</code> takes precedence over <code>UNION</code> and <code>EXCEPT</code>.</li>
                <li>Use parentheses to make the intended grouping clear.</li>
            </ul>
            <h3 className="Article__subTitle">ROW_NUMBER vs RANK vs DENSE_RANK</h3>
            <ul className="Article__notes">
                <li><code>ROW_NUMBER()</code> gives every row a different sequential number.</li>
                <li><code>RANK()</code> gives equal sort values the same rank. It leaves gaps after ties.</li>
                <li><code>RANK()</code> can return ranks such as 1, 2, 2, 4.</li>
                <li><code>DENSE_RANK()</code> gives equal sort values the same rank without gaps.</li>
                <li><code>DENSE_RANK()</code> can return ranks such as 1, 2, 2, 3.</li>
            </ul>
            <CodeBlock language="sql">{rankingExample}</CodeBlock>
            <ul className="Article__notes">
                <li>The <code>employee_id</code> sort column makes <code>ROW_NUMBER()</code> deterministic.
                    It gives tied scores a fixed order.</li>
                <li>The other two windows leave it out so equal scores still share a rank.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default PostgreSQLOneShotSQL;
