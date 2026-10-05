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
        <ul className="Article__notes">
            <li><strong>{caption}</strong></li>
        </ul>
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
            <ul>
                <li>Both <code>customers</code> and <code>orders</code> have a <code>customer_id</code> column.</li>
                <li>Order 102 belongs to customer 3. Customer 3 is not in the <code>customers</code> table.</li>
            </ul>
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
            <ul>
                <li>A join combines rows from two table expressions.</li>
                <li>The join condition decides which row pairs match.</li>
                <li>Each matching pair produces a result row.</li>
                <li><code>c</code> and <code>o</code> are table aliases. An alias is a short name used in the query.</li>
                <li>Prefix a column with its alias when both tables have a column with the same name.</li>
                <li>You can also use the alias to show which table supplies the column.</li>
                <li><code>JOIN</code> by itself means <code>INNER JOIN</code>.</li>
                <li>With <code>SELECT *</code> and an <code>ON</code> condition, the result has all columns from both inputs.</li>
                <li>Here, <code>customers</code> has 2 columns and <code>orders</code> has 4. The result has 6 columns.</li>
                <li>The columns are <code>c.customer_id</code>, <code>c.customer_name</code>, <code>o.order_id</code>, <code>o.customer_id</code>, <code>o.order_date</code>, and <code>o.status</code>.</li>
                <li>Both <code>customer_id</code> columns remain. The actual result has two columns named <code>customer_id</code>.</li>
                <li>An outer join fills columns from an unmatched side with <code>NULL</code>. Those columns still appear in the result.</li>
                <li>The output tables below use <code>c.</code> and <code>o.</code> in the headings to show each column's source.</li>
                <li>If one customer matches four orders, a <code>LEFT JOIN</code> returns four rows for that customer. Each row contains one order.</li>
            </ul>
            <DataTable
                caption="Output when customer 1 matches four orders"
                columns={['c.customer_id', 'c.customer_name', 'o.order_id']}
                rows={[
                    ['1', 'Ada', '101'],
                    ['1', 'Ada', '102'],
                    ['1', 'Ada', '103'],
                    ['1', 'Ada', '104'],
                ]}
            />
            <ul>
                <li>A join does not automatically reduce the result to one row per customer.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="inner-and-outer-joins">
            <h2 id="inner-and-outer-joins" className="SectionTitle">
                INNER JOIN and OUTER JOIN
            </h2>
            <ul>
                <li>An <code>INNER JOIN</code> returns matches only.</li>
                <li>An <code>OUTER JOIN</code> also keeps unmatched rows from one or both inputs.</li>
                <li>PostgreSQL has three outer join forms: <code>LEFT</code>, <code>RIGHT</code>, and <code>FULL</code>.</li>
            </ul>
            <Accordion summary="INNER JOIN: matching rows only">
                <ul>
                    <li>Only the matching customer and order appear.</li>
                </ul>
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
                <ul>
                    <li>Customers 1 and 2 appear.</li>
                    <li>Customer 2 has no matching order. Its 4 order columns contain <code>NULL</code>.</li>
                    <li>The unmatched order for customer 3 does not appear.</li>
                    <li><code>LEFT JOIN</code> is short for <code>LEFT OUTER JOIN</code>.</li>
                </ul>
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
                <ul>
                    <li>Orders 101 and 102 appear.</li>
                    <li>Order 102 has no matching customer. Its 2 customer columns contain <code>NULL</code>.</li>
                    <li>Its <code>orders.customer_id</code> value is still 3.</li>
                    <li>Swap the input order and use <code>LEFT JOIN</code> to keep the same rows.</li>
                </ul>
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
                <ul>
                    <li>The result includes the matching customer and order.</li>
                    <li>It also includes customer 2 without an order and order 102 without a matching customer.</li>
                    <li>Columns from the unmatched side contain <code>NULL</code>.</li>
                </ul>
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
            <ul>
                <li><code>ON</code> decides which rows match.</li>
                <li>In this <code>LEFT JOIN</code>, the status condition limits which orders match. Unmatched customers still appear.</li>
                <li>This query keeps every customer and includes only shipped orders:</li>
            </ul>
            <CodeBlock language="sql">{filterInOnExample}</CodeBlock>
            <ul>
                <li><code>WHERE</code> filters the result after the join.</li>
                <li>Unmatched customers have <code>NULL</code> for <code>o.status</code>. The status condition removes them.</li>
                <li>This query returns the same rows as an inner join with this filter:</li>
            </ul>
            <CodeBlock language="sql">{filterInWhereExample}</CodeBlock>
            <ul>
                <li>Put a condition in <code>ON</code> when it controls matching and unmatched left rows must remain.</li>
                <li>Put it in <code>WHERE</code> when it should filter the joined result.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="using-and-on">
            <h2 id="using-and-on" className="SectionTitle">
                USING and ON
            </h2>
            <ul>
                <li>Use <code>USING (column_name)</code> when the join column has the same name in both inputs.</li>
                <li><code>USING</code> compares those columns for equality.</li>
                <li>The result contains one copy of the join column.</li>
                <li>Here, <code>SELECT *</code> with <code>USING (customer_id)</code> returns 5 columns instead of 6.</li>
                <li>The columns are <code>customer_id</code>, <code>customer_name</code>, <code>order_id</code>, <code>order_date</code>, and <code>status</code>.</li>
            </ul>
            <CodeBlock language="sql">{usingExample}</CodeBlock>
            <ul>
                <li><code>NATURAL JOIN</code> uses every column name shared by both inputs as a join condition.</li>
                <li>The result contains one copy of each shared column.</li>
                <li>Adding a column whose name exists in the other table can change which rows match.</li>
                <li>Use <code>ON</code> when the column names differ.</li>
                <li>Use it when the condition needs more than equality between columns with the same name.</li>
                <li>Use it to state the table aliases explicitly.</li>
            </ul>
            <CodeBlock language="sql">{innerJoinExample}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="find-unmatched-rows">
            <h2 id="find-unmatched-rows" className="SectionTitle">
                Find unmatched rows
            </h2>
            <ul>
                <li>To find customers with no orders, keep all customers in a <code>LEFT JOIN</code>.</li>
                <li>Select rows where an order key is <code>NULL</code>.</li>
                <li>Check a column that cannot be <code>NULL</code> in a matched order, such as its primary key:</li>
            </ul>
            <CodeBlock language="sql">{antiJoinExample}</CodeBlock>
            <ul>
                <li><code>NOT EXISTS</code> checks that no matching order exists.</li>
                <li>It does not need a right-side column to identify a missing match:</li>
            </ul>
            <CodeBlock language="sql">{notExistsExample}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="cross-and-self-joins">
            <h2 id="cross-and-self-joins" className="SectionTitle">
                CROSS and self joins
            </h2>
            <Accordion summary="CROSS JOIN: every combination">
                <ul>
                    <li><code>CROSS JOIN</code> returns every combination of one row from each input.</li>
                    <li>Here, <code>SELECT *</code> returns 4 columns: 2 from <code>customers</code> and 2 from <code>products</code>.</li>
                    <li>With 4 customers and 5 products, it returns 20 rows.</li>
                </ul>
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
                <ul>
                    <li>A self join uses the same table twice. It is a pattern, not a separate join type.</li>
                    <li>This example uses <code>LEFT JOIN</code> to match each employee to their manager.</li>
                    <li>It selects 2 columns, so the result has 2 columns.</li>
                    <li>With <code>SELECT *</code>, columns from both table instances appear. This includes repeated column names.</li>
                </ul>
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
            <ul>
                <li>Joining two one-to-many tables through the same parent can multiply rows.</li>
                <li>A one-to-many relationship means one parent can have several detail rows.</li>
                <li>If a customer has 2 orders and 3 payments, joining both detail tables by customer produces 6 rows.</li>
                <li>A direct <code>COUNT</code> can overcount orders. A direct <code>SUM</code> can repeat payment amounts:</li>
            </ul>
            <CodeBlock language="sql">{fanoutExample}</CodeBlock>
            <ul>
                <li>Aggregate each detail table to one row per customer before joining the results:</li>
            </ul>
            <CodeBlock language="sql">{aggregateBeforeJoinExample}</CodeBlock>
        </section>
    </ArticleLayout>
);

export default PostgreSQLJoins;
