import '../../CommonClasses/CommonClasses.css';

import Accordion from '../../Accordion/Accordion';
import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import { POSTGRESQL_JOINS_ROUTE, POSTGRESQL_NOTES_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const innerJoinExample = `SELECT *
FROM customers AS c
INNER JOIN orders AS o
    ON o.customer_id = c.customer_id
ORDER BY c.customer_id, o.order_id;`;

const leftJoinExample = `SELECT *
FROM customers AS c
LEFT OUTER JOIN orders AS o
    ON o.customer_id = c.customer_id
ORDER BY c.customer_id, o.order_id;`;

const rightJoinExample = `SELECT *
FROM customers AS c
RIGHT OUTER JOIN orders AS o
    ON o.customer_id = c.customer_id
ORDER BY o.order_id;`;

const fullJoinExample = `SELECT *
FROM customers AS c
FULL OUTER JOIN orders AS o
    ON o.customer_id = c.customer_id
ORDER BY c.customer_id, o.order_id;`;

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

const usingExample = `SELECT *
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

const crossJoinAllColumnsExample = `SELECT *
FROM customers AS c
CROSS JOIN products AS p
ORDER BY c.customer_id, p.product_id;`;

const selfJoinExample = `SELECT e.employee_name AS employee,
       m.employee_name AS manager
FROM employees AS e
LEFT JOIN employees AS m
    ON m.employee_id = e.manager_id
ORDER BY e.employee_id;`;

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

const customers = [
    ['1', 'Ada'],
    ['2', 'Ben'],
];

const orders = [
    ['101', '1', '2026-09-01', 'Shipped'],
    ['102', '3', '2026-09-02', 'Pending'],
];

const products = [
    ['10', 'Book'],
    ['20', 'Pen'],
];

const employees = [
    ['1', 'Morgan', 'NULL'],
    ['2', 'Casey', '1'],
    ['3', 'Jordan', '1'],
];

interface DataTableProps {
    caption: string;
    columns: string[];
    rows: string[][];
}

const DataTable = ({ caption, columns, rows }: DataTableProps) => (
    <>
        <p><strong>{caption}</strong></p>
        <div className="Article__tableWrap">
            <table className="Article__table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th scope="col" key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={`${caption}-${rowIndex}`}>
                            {row.map((value, columnIndex) => (
                                columnIndex === 0 ? (
                                    <th scope="row" key={`${caption}-${rowIndex}-${columnIndex}`}>
                                        {value}
                                    </th>
                                ) : (
                                    <td key={`${caption}-${rowIndex}-${columnIndex}`}>{value}</td>
                                )
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
);

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
                These sample tables are used in the examples below. Both customers and orders have
                a <code>customer_id</code> column. Order 102 belongs to customer 3, who is not in
                the customers table.
            </p>
            <DataTable
                caption="customers"
                columns={['customer_id', 'customer_name']}
                rows={customers}
            />
            <DataTable
                caption="orders"
                columns={['order_id', 'customer_id', 'order_date', 'status']}
                rows={orders}
            />
            <DataTable
                caption="products"
                columns={['product_id', 'product_name']}
                rows={products}
            />
        </section>

        <section className="Article__section" aria-labelledby="how-a-join-works">
            <h2 id="how-a-join-works" className="SectionTitle">
                How a join works
            </h2>
            <p>
                A join combines rows from two table expressions. The join condition decides which
                row pairs match. Each matching pair produces a result row.
            </p>
            <p>
                <code>c</code> and <code>o</code> are table aliases. Prefix a column with its alias
                when both tables have a column with the same name or when you want to make its source
                clear. <code>JOIN</code> by itself means <code>INNER JOIN</code>.
            </p>
            <p>
                With <code>SELECT *</code> and a join condition written with <code>ON</code>, the
                output has all columns from both inputs. Here <code>customers</code> has 2 columns
                and <code>orders</code> has 4, so the result has 6 columns:{' '}
                <code>c.customer_id</code>, <code>c.customer_name</code>, <code>o.order_id</code>,{' '}
                <code>o.customer_id</code>, <code>o.order_date</code>, and <code>o.status</code>.
                Both <code>customer_id</code> columns remain, even though they have the same name.
                An outer join can fill columns from an unmatched side with <code>NULL</code>, but it
                does not remove those columns. The output tables below qualify duplicate headings
                with <code>c.</code> and <code>o.</code> to show where each value came from. The
                actual <code>SELECT *</code> result has two columns both named{' '}
                <code>customer_id</code>.
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
            <Accordion summary="INNER JOIN: matching rows only">
                <p>
                    Only the matching customer and order appear. The result has 6 columns. Both
                    copies of <code>customer_id</code> are present.
                </p>
                <CodeBlock language="sql">{innerJoinExample}</CodeBlock>
                <DataTable
                    caption="Output"
                    columns={[
                        'c.customer_id',
                        'c.customer_name',
                        'o.order_id',
                        'o.customer_id',
                        'o.order_date',
                        'o.status',
                    ]}
                    rows={[
                        ['1', 'Ada', '101', '1', '2026-09-01', 'Shipped'],
                    ]}
                />
            </Accordion>
            <Accordion summary="LEFT OUTER JOIN: keep every left row">
                <p>
                    Customers 1 and 2 appear. Customer 2 has <code>NULL</code> in the 4 order
                    columns. The unmatched order for customer 3 does not appear. The result still
                    has 6 columns. <code>LEFT JOIN</code> is shorthand for <code>LEFT OUTER JOIN</code>.
                </p>
                <CodeBlock language="sql">{leftJoinExample}</CodeBlock>
                <DataTable
                    caption="Output"
                    columns={[
                        'c.customer_id',
                        'c.customer_name',
                        'o.order_id',
                        'o.customer_id',
                        'o.order_date',
                        'o.status',
                    ]}
                    rows={[
                        ['1', 'Ada', '101', '1', '2026-09-01', 'Shipped'],
                        ['2', 'Ben', 'NULL', 'NULL', 'NULL', 'NULL'],
                    ]}
                />
            </Accordion>
            <Accordion summary="RIGHT OUTER JOIN: keep every right row">
                <p>
                    The matched order 101 appears. Order 102 also appears, with <code>NULL</code> in
                    the 2 customer columns. Its <code>orders.customer_id</code> value is still 3.
                    The result has 6 columns. Swapping the input order and using a{' '}
                    <code>LEFT JOIN</code> can express the same row preservation.
                </p>
                <CodeBlock language="sql">{rightJoinExample}</CodeBlock>
                <DataTable
                    caption="Output"
                    columns={[
                        'c.customer_id',
                        'c.customer_name',
                        'o.order_id',
                        'o.customer_id',
                        'o.order_date',
                        'o.status',
                    ]}
                    rows={[
                        ['1', 'Ada', '101', '1', '2026-09-01', 'Shipped'],
                        ['NULL', 'NULL', '102', '3', '2026-09-02', 'Pending'],
                    ]}
                />
            </Accordion>
            <Accordion summary="FULL OUTER JOIN: keep unmatched rows from both sides">
                <p>
                    The result includes the match, customer 2 without an order, and order 102
                    without a matching customer. Missing-side columns are <code>NULL</code>. Every
                    row has the same 6 output columns.
                </p>
                <CodeBlock language="sql">{fullJoinExample}</CodeBlock>
                <DataTable
                    caption="Output"
                    columns={[
                        'c.customer_id',
                        'c.customer_name',
                        'o.order_id',
                        'o.customer_id',
                        'o.order_date',
                        'o.status',
                    ]}
                    rows={[
                        ['1', 'Ada', '101', '1', '2026-09-01', 'Shipped'],
                        ['2', 'Ben', 'NULL', 'NULL', 'NULL', 'NULL'],
                        ['NULL', 'NULL', '102', '3', '2026-09-02', 'Pending'],
                    ]}
                />
            </Accordion>
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
                in the joined output. So <code>SELECT *</code> with these tables and{' '}
                <code>USING (customer_id)</code> returns 5 columns instead of the 6 columns from an
                <code>ON</code> join: <code>customer_id</code>, <code>customer_name</code>,{' '}
                <code>order_id</code>, <code>order_date</code>, and <code>status</code>.
            </p>
            <CodeBlock language="sql">{usingExample}</CodeBlock>
            <p>
                <code>NATURAL JOIN</code> also emits one copy of each shared column name. It uses
                every same-named column as a join condition, so adding a same-named column to either
                table can change which rows match.
            </p>
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
            <Accordion summary="CROSS JOIN: every combination">
                <p>
                    <code>CROSS JOIN</code> returns every combination of one row from each input.
                    With the shown columns, <code>SELECT *</code> returns 4 columns: 2 from{' '}
                    <code>customers</code> and 2 from <code>products</code>. If there are 4
                    customers and 5 products, it returns 20 rows.
                </p>
                <CodeBlock language="sql">{crossJoinAllColumnsExample}</CodeBlock>
                <DataTable
                    caption="Output"
                    columns={['c.customer_id', 'c.customer_name', 'p.product_id', 'p.product_name']}
                    rows={[
                        ['1', 'Ada', '10', 'Book'],
                        ['1', 'Ada', '20', 'Pen'],
                        ['2', 'Ben', '10', 'Book'],
                        ['2', 'Ben', '20', 'Pen'],
                    ]}
                />
            </Accordion>
            <Accordion summary="Self join: use one table twice">
                <p>
                    A self join is a pattern, not a separate join type. This example uses{' '}
                    <code>LEFT JOIN</code> to match each employee to their manager in the same table.
                    It selects 2 columns, so its result has 2 columns. With <code>SELECT *</code>,
                    both table instances' columns would appear, including repeated column names.
                </p>
                <CodeBlock language="sql">{selfJoinExample}</CodeBlock>
                <DataTable
                    caption="employees"
                    columns={['employee_id', 'employee_name', 'manager_id']}
                    rows={employees}
                />
                <DataTable
                    caption="Output"
                    columns={['employee', 'manager']}
                    rows={[
                        ['Morgan', 'NULL'],
                        ['Casey', 'Morgan'],
                        ['Jordan', 'Morgan'],
                    ]}
                />
            </Accordion>
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
