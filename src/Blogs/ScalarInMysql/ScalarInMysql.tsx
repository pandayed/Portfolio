import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../ArticleLayout/ArticleLayout';
import CodeBlock from '../ArticleLayout/CodeBlock';
import { MYSQL_NOTES_ROUTE, SCALAR_IN_MYSQL_ROUTE } from '../../routing/routes';
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

const ScalarInMysql = () => {
    return (
        <ArticleLayout
            title="Scalar in MySQL"
            route={SCALAR_IN_MYSQL_ROUTE}
            sections={sections}
            backRoute={MYSQL_NOTES_ROUTE}
            backLabel="Back to MySQL notes"
        >
            <section className="Article__section">
                <p>In MySQL, scalar simply means a single value.</p>
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
                        <code>'2026-09-20'</code>
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
                    You'll also encounter scalar subquery, which means a subquery that returns
                    exactly one value:
                </p>
                <CodeBlock language="sql">{subqueryExample}</CodeBlock>
                <p>Here:</p>
                <CodeBlock language="sql">SELECT AVG(salary) FROM employees</CodeBlock>
                <p>
                    is a scalar subquery because <code>AVG()</code> produces one value, e.g.{' '}
                    <code>75000</code>.
                </p>
                <p>So the simplest definition to remember is:</p>
                <p>Scalar = one individual value, as opposed to a collection/set of values.</p>
            </section>
        </ArticleLayout>
    );
};

export default ScalarInMysql;
