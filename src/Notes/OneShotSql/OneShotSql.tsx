import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../../Blogs/ArticleLayout/ArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import { MYSQL_NOTES_ROUTE, ONE_SHOT_SQL_ROUTE } from '../../routing/routes';
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

const contactNumberQuery = `SELECT COALESCE(mobile_phone, home_phone, office_phone, 'No Phone') AS contact_number
FROM customers;`;

const cancelledRatioQuery = `SELECT COUNT(CASE WHEN status = 'Cancelled' THEN 1 END) * 1.0
       / NULLIF(COUNT(*), 0)
FROM Orders;`;

const ifExample = `SELECT IF(score >= 60, 'Pass', 'Fail') AS result
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
    COUNT(CASE WHEN status = 'Cancelled' THEN 1 END) AS count_with_count,
    SUM(CASE WHEN status = 'Cancelled' THEN 1 ELSE 0 END) AS count_with_sum
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

const OneShotSql = () => (
    <ArticleLayout
        title="One Shot SQL"
        route={ONE_SHOT_SQL_ROUTE}
        sections={sections}
        backRoute={MYSQL_NOTES_ROUTE}
        backLabel="Back to MySQL notes"
    >
        <section className="Article__section">
            <p>These notes are in progress. More edge cases and details will be added gradually.</p>
        </section>

        <section className="Article__section" aria-labelledby="edge-cases">
            <h2 id="edge-cases" className="SectionTitle">
                Edge cases
            </h2>
            <ul className="Article__notes">
                <li>
                    Take care of <code>NULL</code>, empty (<code>''</code>), <code>0</code>,
                    duplicates, and no row in the result.
                </li>
                <li>
                    <code>NULL</code> means unknown.
                </li>
                <li>
                    Any arithmetic operation with <code>NULL</code> gives <code>NULL</code>:{' '}
                    <code>+</code>, <code>-</code>, <code>*</code>, and <code>/</code>.
                </li>
                <li>
                    <code>0 / NULL</code>, <code>NULL / 0</code>, and <code>0 * NULL</code> might be
                    confusing, but even these produce <code>NULL</code>.
                </li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="query-order">
            <h2 id="query-order" className="SectionTitle">
                Query order
            </h2>
            <h3 className="Article__subTitle">Written order</h3>
            <p>Smart Developers Find Work, Good Habits Win Over Laziness:</p>
            <p>
                <code>
                    SELECT → DISTINCT → FROM → WHERE → GROUP BY → HAVING → WINDOW → ORDER BY → LIMIT
                </code>
            </p>
            <h3 className="Article__subTitle">Logical processing order</h3>
            <p>Funny Wizards Gather Herbs While Sleepy Dragons Order Lunch:</p>
            <p>
                <code>
                    FROM (JOIN) → WHERE → GROUP BY → HAVING → WINDOW FUNCTIONS → SELECT → DISTINCT
                    → ORDER BY → LIMIT
                </code>
            </p>
        </section>

        <section className="Article__section" aria-labelledby="existence-checks">
            <h2 id="existence-checks" className="SectionTitle">
                Existence checks
            </h2>
            <p>
                <code>SELECT 1 FROM orders;</code> returns 1 for each row in <code>orders</code>. It is
                generally used as a subquery when you only want to know if the table has at least
                one row.
            </p>
            <CodeBlock language="sql">{customersWithoutOrdersQuery}</CodeBlock>
            <p>
                <code>NOT EXISTS</code> checks that the subquery returns no row.
            </p>
            <p>
                <code>EXISTS</code> and <code>NOT EXISTS</code> test whether the subquery returns at
                least one row. Use them when only existence matters. <code>COUNT(*)</code> computes an
                exact count. Depending on the execution plan, MySQL may stop after finding a match
                or transform the subquery using another optimization strategy.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="expressions-and-null-handling">
            <h2 id="expressions-and-null-handling" className="SectionTitle">
                Expressions and NULL handling
            </h2>
            <h3 className="Article__subTitle">IF()</h3>
            <p>
                <code>IF(condition, value_if_true, value_if_false)</code> returns the second value
                when the condition is nonzero and not <code>NULL</code>. A zero or <code>NULL</code>
                condition returns the third value.
            </p>
            <CodeBlock language="sql">{ifExample}</CodeBlock>
            <p>
                In MySQL, <code>IF()</code> is a function used inside an expression. The{' '}
                <code>IF ... THEN ... END IF</code> statement is different. It is available only in
                stored programs such as procedures, functions, and triggers.
            </p>
            <h3 className="Article__subTitle">CASE</h3>
            <p>
                <code>CASE</code> returns one value. The simple form compares one expression with
                each <code>WHEN</code> value:
            </p>
            <CodeBlock language="sql">{simpleCaseExample}</CodeBlock>
            <p>The searched form evaluates separate conditions in order:</p>
            <CodeBlock language="sql">{searchedCaseExample}</CodeBlock>
            <p>
                <code>CASE</code> returns the result from the first matching branch. If no branch
                matches, it returns the <code>ELSE</code> result. If <code>ELSE</code> is missing, it
                returns <code>NULL</code>.
            </p>
            <p>
                In the simple form, <code>WHEN NULL</code> does not match a <code>NULL</code> value.
                Use a searched condition such as <code>WHEN value IS NULL</code>.
            </p>
            <h3 className="Article__subTitle">COALESCE</h3>
            <p>
                <code>COALESCE</code> returns the first non-<code>NULL</code> value from the given
                choices.
            </p>
            <CodeBlock language="sql">{coalesceExample}</CodeBlock>
            <p>It returns Hello.</p>
            <p>
                Use it to replace <code>NULL</code> with something or to find the first non-
                <code>NULL</code> value.
            </p>
            <CodeBlock language="sql">{contactNumberQuery}</CodeBlock>
            <p>It returns the first available phone number while reading from left to right.</p>
            <h3 className="Article__subTitle">NULLIF</h3>
            <p>
                <code>NULLIF</code> returns <code>NULL</code> if two values are equal. Otherwise, it
                returns the first value.
            </p>
            <CodeBlock language="sql">numerator / NULLIF(denominator, 0)</CodeBlock>
            <p>Use NULLIF for denominators.</p>
        </section>

        <section className="Article__section" aria-labelledby="counting-ratios-and-ordering">
            <h2 id="counting-ratios-and-ordering" className="SectionTitle">
                Counting, ratios, and ordering
            </h2>
            <h3 className="Article__subTitle">COUNT vs SUM</h3>
            <CodeBlock language="sql">{aggregateExample}</CodeBlock>
            <ul className="Article__notes">
                <li>
                    <code>COUNT(*)</code> counts rows, including rows that contain <code>NULL</code>.
                </li>
                <li>
                    <code>COUNT(expression)</code> counts rows where the expression is not{' '}
                    <code>NULL</code>.
                </li>
                <li>
                    <code>COUNT(DISTINCT expression)</code> counts distinct non-<code>NULL</code>
                    values.
                </li>
                <li>
                    <code>SUM(expression)</code> adds the non-<code>NULL</code> values. It returns{' '}
                    <code>NULL</code> when there are no matching rows or every value is{' '}
                    <code>NULL</code>.
                </li>
                <li>
                    For no matching rows, <code>COUNT</code> returns <code>0</code>, while{' '}
                    <code>SUM</code> returns <code>NULL</code>.
                </li>
            </ul>
            <CodeBlock language="sql">{conditionalCountExample}</CodeBlock>
            <p>
                Both expressions count cancelled orders. Keep <code>ELSE 0</code> in the{' '}
                <code>SUM</code> form. Without it, <code>SUM</code> returns <code>NULL</code> when no
                row matches the condition. It still returns <code>NULL</code> when the input has no
                rows at all.
            </p>
            <p>
                An aggregate query without <code>GROUP BY</code> still returns one aggregate row for
                empty input. A grouped query returns no row when no group exists.
            </p>
            <h3 className="Article__subTitle">Finding ratios</h3>
            <CodeBlock language="sql">{cancelledRatioQuery}</CodeBlock>
            <p>
                The <code>CASE</code> returns <code>1</code> for a cancelled order and{' '}
                <code>NULL</code> for other orders. <code>COUNT</code> ignores those <code>NULL</code>
                values. <code>NULLIF(COUNT(*), 0)</code> changes a zero denominator to{' '}
                <code>NULL</code>, so the division returns <code>NULL</code> instead of dividing by
                zero.
            </p>
            <h3 className="Article__subTitle">ROUND</h3>
            <p>
                <code>ROUND(number, places)</code> rounds a number to the requested number of decimal
                places. A negative <code>places</code> value rounds digits to the left of the decimal
                point.
            </p>
            <h3 className="Article__subTitle">GROUP BY and selected columns</h3>
            <p>
                With <code>ONLY_FULL_GROUP_BY</code>, a selected non-aggregate column must appear in
                <code>GROUP BY</code>, be functionally dependent on the grouped columns, or be limited
                to one value by <code>WHERE</code>. When <code>WHERE</code> limits several such columns,
                those conditions must be joined with <code>AND</code>.
            </p>
            <h3 className="Article__subTitle">ORDER BY</h3>
            <ul className="Article__notes">
                <li>
                    Use <code>ORDER BY</code> to get sorted data with <code>ASC</code> or{' '}
                    <code>DESC</code>, or to get a deterministic order. MySQL does not guarantee the
                    order of output rows without it. For a fully deterministic order, the combined
                    sort columns must uniquely order the rows.
                </li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="results-and-terms">
            <h2 id="results-and-terms" className="SectionTitle">
                Results and terms
            </h2>
            <h3 className="Article__subTitle">Scalar subquery</h3>
            <p>
                A scalar subquery returns one column and at most one row, so it can be used where a
                single value is expected. No row becomes <code>NULL</code>. More than one row causes
                an error.
            </p>
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
                <li>
                    A <strong>clause</strong> is a part of a SQL statement that performs a specific
                    job. For example, <code>WHERE age &gt; 18</code> is the <code>WHERE</code> clause
                    that filters rows.
                </li>
                <li>A <strong>statement</strong> is the full SQL statement or query.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="more-sql-tools">
            <h2 id="more-sql-tools" className="SectionTitle">
                More SQL tools
            </h2>
            <h3 className="Article__subTitle">LATERAL</h3>
            <p>
                A normal derived table in <code>FROM</code> cannot refer to another table in the same
                <code>FROM</code> clause. <code>LATERAL</code> lets it refer to tables that appear
                before it. This is useful when the derived table must run once for each earlier row.
            </p>
            <CodeBlock language="sql">{lateralExample}</CodeBlock>
            <p>
                This returns the latest order for each customer. The second sort column makes the
                chosen order deterministic when two orders have the same date.
            </p>
            <h3 className="Article__subTitle">LIMIT</h3>
            <p>
                <code>LIMIT row_count</code> returns at most that many rows. Add an offset with{' '}
                <code>LIMIT row_count OFFSET offset</code> or <code>LIMIT offset, row_count</code>. The
                offset starts at 0.
            </p>
            <CodeBlock language="sql">{limitExample}</CodeBlock>
            <p>
                Use <code>ORDER BY</code> before <code>LIMIT</code> when the selected rows must be
                predictable. Add a unique tie-breaker when the main sort value can be equal.
            </p>
            <h3 className="Article__subTitle">Window functions and PARTITION BY</h3>
            <p>
                A window function calculates a value for each row without collapsing rows.{' '}
                <code>PARTITION BY</code> divides the result into groups and restarts the window
                calculation for each group. Without <code>PARTITION BY</code>, the whole result is one
                partition.
            </p>
            <CodeBlock language="sql">{runningTotalExample}</CodeBlock>
            <p>
                <code>ORDER BY</code> inside <code>OVER(...)</code> controls the order used by the
                window function. It does not guarantee the final output order. Use a query-level{' '}
                <code>ORDER BY</code> for that.
            </p>
            <p>
                MySQL allows window functions only in the select list and the query-level{' '}
                <code>ORDER BY</code> clause.
            </p>
            <h3 className="Article__subTitle">CTE vs subquery</h3>
            <p>
                A common table expression starts with <code>WITH</code>, gives a query result a name,
                and exists only for that statement. It can make a multi-step query easier to read,
                can be referenced more than once, and can be recursive.
            </p>
            <CodeBlock language="sql">{cteExample}</CodeBlock>
            <p>
                A subquery stays inline where it is used. It is often simpler when the result is
                needed once. A CTE is not automatically faster. MySQL may merge or materialize a CTE
                or a derived table, so choose the clearer form and inspect the execution plan when
                performance matters.
            </p>
            <h3 className="Article__subTitle">ROW_NUMBER vs RANK vs DENSE_RANK</h3>
            <ul className="Article__notes">
                <li>
                    <code>ROW_NUMBER()</code> gives every row a different sequential number. Equal
                    sort values do not share a number.
                </li>
                <li>
                    <code>RANK()</code> gives equal sort values the same rank and leaves gaps after
                    ties. Ranks can look like 1, 2, 2, 4.
                </li>
                <li>
                    <code>DENSE_RANK()</code> gives equal sort values the same rank without gaps.
                    Ranks can look like 1, 2, 2, 3.
                </li>
            </ul>
            <CodeBlock language="sql">{rankingExample}</CodeBlock>
            <p>
                The <code>employee_id</code> tie-breaker makes <code>ROW_NUMBER()</code> deterministic.
                It is omitted from the other two windows so equal scores still share a rank.
            </p>
        </section>
    </ArticleLayout>
);

export default OneShotSql;
