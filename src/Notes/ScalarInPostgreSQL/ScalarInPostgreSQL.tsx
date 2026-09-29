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
                <p>In PostgreSQL, a scalar is one value.</p>
                <p>A scalar value is one individual value, such as:</p>
                <ul className="Article__notes">
                    <li>
                        <code>42</code>
                    </li>
                    <li>
                        <code>'Lal'</code>
                    </li>
                    <li>
                        <code>3.14</code>
                    </li>
                    <li>
                        <code>DATE '2026-09-20'</code>
                    </li>
                    <li>
                        <code>NULL</code>
                    </li>
                </ul>
            </section>

            <section className="Article__section" aria-labelledby="why-you-see-scalar-in-sql">
                <h2 id="why-you-see-scalar-in-sql" className="SectionTitle">
                    Why you see "scalar" in SQL
                </h2>
                <p>It is usually used to distinguish a single value from a set/table of values.</p>
                <p>For example:</p>
                <CodeBlock language="sql">{countQuery}</CodeBlock>
                <p>
                    <code>COUNT(*)</code> returns a scalar value:
                </p>
                <CodeBlock language="sql">{countResult}</CodeBlock>
                <p>It is just one value.</p>
                <p>Compare that with:</p>
                <CodeBlock language="sql">{namesQuery}</CodeBlock>
                <p>which might return:</p>
                <CodeBlock language="sql">{namesResult}</CodeBlock>
                <p>That's a set of values, not a scalar.</p>
            </section>

            <section className="Article__section" aria-labelledby="scalar-subquery">
                <h2 id="scalar-subquery" className="SectionTitle">
                    Scalar subquery
                </h2>
                <p>
                    A scalar subquery must return one column. At runtime, one row supplies the value,
                    no row produces <code>NULL</code>, and more than one row causes an error:
                </p>
                <CodeBlock language="sql">{subqueryExample}</CodeBlock>
                <p>Here:</p>
                <CodeBlock language="sql">SELECT AVG(salary) FROM employees</CodeBlock>
                <p>
                    is a scalar subquery because <code>AVG()</code> produces one aggregate row. Its
                    value could be <code>75000</code>. It is <code>NULL</code> when the input is empty.
                </p>
                <p>Scalar means one individual value rather than a set of values.</p>
            </section>
        </ArticleLayout>
    );
};

export default ScalarInPostgreSQL;
