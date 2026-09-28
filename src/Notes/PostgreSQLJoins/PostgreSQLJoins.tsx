import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../../Blogs/ArticleLayout/ArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import { POSTGRESQL_JOINS_ROUTE, POSTGRESQL_NOTES_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const innerJoinExample = `SELECT c.customer_id, c.customer_name, o.order_id, o.order_date
FROM customers AS c
INNER JOIN orders AS o
    ON o.customer_id = c.customer_id
ORDER BY c.customer_id, o.order_date;`;

const leftJoinExample = `SELECT c.customer_id, c.customer_name, o.order_id
FROM customers AS c
LEFT OUTER JOIN orders AS o
    ON o.customer_id = c.customer_id
ORDER BY c.customer_id, o.order_id;`;

const rightJoinExample = `SELECT c.customer_id, c.customer_name, o.order_id
FROM customers AS c
RIGHT OUTER JOIN orders AS o
    ON o.customer_id = c.customer_id
ORDER BY o.order_id;`;

const fullJoinExample = `SELECT a.customer_id AS account_customer_id,
       l.customer_id AS loyalty_customer_id
FROM account_customers AS a
FULL OUTER JOIN loyalty_customers AS l
    ON l.customer_id = a.customer_id;`;

const filterInOnExample = `SELECT c.customer_id, o.order_id
FROM customers AS c
LEFT JOIN orders AS o
    ON o.customer_id = c.customer_id
   AND o.status = 'Shipped';`;

const filterInWhereExample = `SELECT c.customer_id, o.order_id
FROM customers AS c
LEFT JOIN orders AS o
    ON o.customer_id = c.customer_id
WHERE o.status = 'Shipped';`;

const usingExample = `SELECT customer_id, customer_name, order_id
FROM customers
JOIN orders USING (customer_id);`;

const antiJoinExample = `SELECT c.customer_id, c.customer_name
FROM customers AS c
LEFT JOIN orders AS o
    ON o.customer_id = c.customer_id
WHERE o.order_id IS NULL;`;

const notExistsExample = `SELECT c.customer_id, c.customer_name
FROM customers AS c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
);`;

const crossJoinExample = `SELECT c.customer_name, p.product_name
FROM customers AS c
CROSS JOIN products AS p;`;

const selfJoinExample = `SELECT e.employee_name AS employee,
       m.employee_name AS manager
FROM employees AS e
LEFT JOIN employees AS m
    ON m.employee_id = e.manager_id;`;

const fanoutExample = `SELECT c.customer_id,
       COUNT(o.order_id) AS order_count,
       SUM(p.amount) AS payment_total
FROM customers AS c
LEFT JOIN orders AS o
    ON o.customer_id = c.customer_id
LEFT JOIN payments AS p
    ON p.customer_id = c.customer_id
GROUP BY c.customer_id;`;

const aggregateBeforeJoinExample = `WITH order_totals AS (
    SELECT customer_id, COUNT(*) AS order_count
    FROM orders
    GROUP BY customer_id
), payment_totals AS (
    SELECT customer_id, SUM(amount) AS payment_total
    FROM payments
    GROUP BY customer_id
)
SELECT c.customer_id,
       COALESCE(o.order_count, 0) AS order_count,
       p.payment_total
FROM customers AS c
LEFT JOIN order_totals AS o USING (customer_id)
LEFT JOIN payment_totals AS p USING (customer_id);`;

const PostgreSQLJoins = () => (
    <ArticleLayout
        title="Joins in PostgreSQL"
        route={POSTGRESQL_JOINS_ROUTE}
        sections={sections}
        backRoute={POSTGRESQL_NOTES_ROUTE}
        backLabel="Back to PostgreSQL notes"
    >
        <section className="Article__section">
            <p>
                These examples use <code>customers(customer_id, customer_name)</code>,{' '}
                <code>orders(order_id, customer_id, order_date, status)</code>, and related tables.
                The ID columns identify rows. A customer's <code>customer_id</code> in{' '}
                <code>orders</code> refers to the matching customer.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="how-a-join-works">
            <h2 id="how-a-join-works" className="SectionTitle">
                How a join works
            </h2>
            <p>
                A join combines rows from two table expressions. The join condition decides which
                row pairs match. Each matching pair produces a result row.
            </p>
            <CodeBlock language="sql">{innerJoinExample}</CodeBlock>
            <p>
                <code>c</code> and <code>o</code> are table aliases. Prefix a column with its alias
                when both tables have a column with the same name or when you want to make its source
                clear. <code>JOIN</code> by itself means <code>INNER JOIN</code>.
            </p>
            <p>
                If one customer has three orders, that customer appears in three result rows. A join
                does not automatically reduce the result to one row per customer.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="inner-and-outer-joins">
            <h2 id="inner-and-outer-joins" className="SectionTitle">
                INNER JOIN and OUTER JOIN
            </h2>
            <p>
                There are two broad choices: an <code>INNER JOIN</code> returns matches only. An{' '}
                <code>OUTER JOIN</code> also keeps rows that have no match. PostgreSQL has three
                outer-join forms: <code>LEFT</code>, <code>RIGHT</code>, and <code>FULL</code>.
            </p>
            <h3 className="Article__subTitle">INNER JOIN: matching rows only</h3>
            <p>
                <code>INNER JOIN</code> returns only row pairs that satisfy the join condition. A
                customer with no order does not appear.
            </p>
            <CodeBlock language="sql">{innerJoinExample}</CodeBlock>
            <h3 className="Article__subTitle">LEFT OUTER JOIN: keep every left row</h3>
            <p>
                The left table is the one written before the join. <code>LEFT OUTER JOIN</code>
                keeps every row from that table. If there is no matching order, the customer still
                appears and the order columns are <code>NULL</code>. <code>LEFT JOIN</code> is the
                shorter form of <code>LEFT OUTER JOIN</code>; both mean the same thing.
            </p>
            <CodeBlock language="sql">{leftJoinExample}</CodeBlock>
            <h3 className="Article__subTitle">RIGHT OUTER JOIN: keep every right row</h3>
            <p>
                <code>RIGHT OUTER JOIN</code> keeps every row from the table written after the join.
                When there is no match, columns from the left table are <code>NULL</code>.{' '}
                <code>RIGHT JOIN</code> is its shorter form. You can get the same result by swapping
                the table order and using a <code>LEFT JOIN</code>.
            </p>
            <CodeBlock language="sql">{rightJoinExample}</CodeBlock>
            <h3 className="Article__subTitle">FULL OUTER JOIN: keep rows from both sides</h3>
            <p>
                <code>FULL OUTER JOIN</code> keeps matching pairs and every unmatched row from both
                tables. Columns from the missing side are <code>NULL</code>.
            </p>
            <CodeBlock language="sql">{fullJoinExample}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="on-and-where">
            <h2 id="on-and-where" className="SectionTitle">
                ON and WHERE
            </h2>
            <p>
                <code>ON</code> determines which rows match. With an outer join, it also determines
                which right-side rows count as matches while preserving unmatched left rows.
            </p>
            <p>This keeps every customer and attaches only shipped orders:</p>
            <CodeBlock language="sql">{filterInOnExample}</CodeBlock>
            <p>
                <code>WHERE</code> filters the result after the join. Here, unmatched customers have
                <code>NULL</code> for <code>o.status</code>, so the condition removes them. This
                behaves like an inner join for this filter:
            </p>
            <CodeBlock language="sql">{filterInWhereExample}</CodeBlock>
            <p>
                Put a condition in <code>ON</code> when it controls matching and unmatched left rows
                must remain. Put it in <code>WHERE</code> when it should filter the joined result.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="using-and-on">
            <h2 id="using-and-on" className="SectionTitle">
                USING and ON
            </h2>
            <p>
                Use <code>USING (column_name)</code> when the join column has the same name in both
                inputs. It compares those columns for equality and emits one copy of the join column
                in the joined output.
            </p>
            <CodeBlock language="sql">{usingExample}</CodeBlock>
            <p>
                Use <code>ON</code> when the column names differ, the condition needs more than a
                simple same-name equality, or you want to state the table aliases explicitly.
            </p>
            <CodeBlock language="sql">{innerJoinExample}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="find-unmatched-rows">
            <h2 id="find-unmatched-rows" className="SectionTitle">
                Find unmatched rows
            </h2>
            <p>
                To find customers with no orders, keep all customers in a <code>LEFT JOIN</code> and
                select rows where a non-nullable order key is missing:
            </p>
            <CodeBlock language="sql">{antiJoinExample}</CodeBlock>
            <p>
                <code>NOT EXISTS</code> expresses the same requirement directly. It avoids relying on a
                selected right-side column to identify a missing match:
            </p>
            <CodeBlock language="sql">{notExistsExample}</CodeBlock>
            <p>
                Use a right-side column that cannot be <code>NULL</code> in a real matched row, such
                as a primary key, for the <code>IS NULL</code> check.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="cross-and-self-joins">
            <h2 id="cross-and-self-joins" className="SectionTitle">
                CROSS and self joins
            </h2>
            <h3 className="Article__subTitle">CROSS JOIN</h3>
            <p>
                <code>CROSS JOIN</code> returns every combination of one row from each input. If
                there are 4 customers and 5 products, it returns 20 rows.
            </p>
            <CodeBlock language="sql">{crossJoinExample}</CodeBlock>
            <h3 className="Article__subTitle">Self join</h3>
            <p>
                A self join uses a table twice with different aliases. This example matches each
                employee to their manager in the same table. <code>LEFT JOIN</code> keeps employees
                without a manager, such as the top-level manager.
            </p>
            <CodeBlock language="sql">{selfJoinExample}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="row-multiplication">
            <h2 id="row-multiplication" className="SectionTitle">
                Row multiplication
            </h2>
            <p>
                Joining two one-to-many tables through the same parent can multiply rows. If a
                customer has 2 orders and 3 payments, joining both detail tables by customer produces
                6 rows for that customer. A direct <code>COUNT</code> or <code>SUM</code> can then
                overcount or repeat values.
            </p>
            <p>This query can overcount orders and repeat each payment total:</p>
            <CodeBlock language="sql">{fanoutExample}</CodeBlock>
            <p>
                Aggregate each detail table to one row per customer before joining the results:
            </p>
            <CodeBlock language="sql">{aggregateBeforeJoinExample}</CodeBlock>
        </section>
    </ArticleLayout>
);

export default PostgreSQLJoins;
