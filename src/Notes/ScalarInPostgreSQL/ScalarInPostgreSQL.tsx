import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import { POSTGRESQL_NOTES_ROUTE, SCALAR_IN_POSTGRESQL_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const countQuery = `SELECT COUNT(*) FROM users;`;

const countResult = `150`;

const namesQuery = `SELECT name FROM users;`;

const namesResult = `Lal
Rahul
Amit
Priya
...`;

const subqueryExample = `SELECT name
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);`;

const ScalarInPostgreSQL = () => {
    return (
        <ArticleLayout
            title="Scalar in PostgreSQL"
            route={SCALAR_IN_POSTGRESQL_ROUTE}
            sections={sections}
            backRoute={POSTGRESQL_NOTES_ROUTE}
            backLabel="Back to PostgreSQL notes"
        >
            <section className="Article__section">
                <ul className="Article__notes">
                    <li>A scalar is one value.</li>
                    <li>Examples: <code>42</code>, <code>'Lal'</code>, <code>3.14</code>, <code>DATE '2026-09-20'</code>, and <code>NULL</code>.</li>
                </ul>
            </section>

            <section className="Article__section" aria-labelledby="why-you-see-scalar-in-sql">
                <h2 id="why-you-see-scalar-in-sql" className="SectionTitle">
                    Why you see "scalar" in SQL
                </h2>
                <ul className="Article__notes">
                    <li>A query result can contain one value or many rows and columns.</li>
                    <li><code>COUNT(*)</code> returns one count.</li>
                </ul>
                <CodeBlock language="sql">{countQuery}</CodeBlock>
                <p>Example result:</p>
                <CodeBlock language="sql">{countResult}</CodeBlock>
                <ul className="Article__notes">
                    <li><code>SELECT name</code> can return many rows.</li>
                </ul>
                <CodeBlock language="sql">{namesQuery}</CodeBlock>
                <p>Example result:</p>
                <CodeBlock language="sql">{namesResult}</CodeBlock>
            </section>

            <section className="Article__section" aria-labelledby="scalar-subquery">
                <h2 id="scalar-subquery" className="SectionTitle">
                    Scalar subquery
                </h2>
                <ul className="Article__notes">
                    <li>A subquery is a query inside another query.</li>
                    <li>A scalar subquery must return one column.</li>
                    <li>If it returns one row, PostgreSQL uses that value.</li>
                    <li>If it returns no rows, PostgreSQL uses <code>NULL</code>.</li>
                    <li>If it returns more than one row, PostgreSQL raises an error.</li>
                </ul>
                <CodeBlock language="sql">{subqueryExample}</CodeBlock>
                <ul className="Article__notes">
                    <li><code>SELECT AVG(salary) FROM employees</code> returns one row with the average salary.</li>
                    <li>The average could be <code>75000</code>. It is <code>NULL</code> when there are no input rows.</li>
                    <li>The outer query returns employees whose salary is above that average.</li>
                </ul>
            </section>
        </ArticleLayout>
    );
};

export default ScalarInPostgreSQL;
