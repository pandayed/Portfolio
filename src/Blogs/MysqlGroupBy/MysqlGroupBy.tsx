import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../ArticleLayout/ArticleLayout';
import { MYSQL_GROUP_BY_ROUTE, MYSQL_NOTES_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const groupedQuery = `SELECT *
FROM customers
GROUP BY city;`;

const groupByError = `ERROR 1055: Expression ... is not in GROUP BY clause`;

const saferQuery = `SELECT city, COUNT(*) AS customer_count
FROM customers
GROUP BY city;`;

const sqlModeQuery = `SELECT @@sql_mode;`;

interface Row {
    id: string;
    city: string;
    name: string;
}

const ResultTable = ({ rows }: { rows: Row[] }) => (
    <div className="Article__tableWrap">
        <table className="Article__table">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">city</th>
                    <th scope="col">name</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.id}>
                        <th scope="row">{row.id}</th>
                        <td>{row.city}</td>
                        <td>{row.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const MysqlGroupBy = () => {
    return (
        <ArticleLayout
            title="MySQL GROUP BY and Non-Aggregated Columns"
            route={MYSQL_GROUP_BY_ROUTE}
            sections={sections}
            backRoute={MYSQL_NOTES_ROUTE}
            backLabel="Back to MySQL notes"
        >
            <section className="Article__section">
                <pre className="Article__code">
                    <code>{groupedQuery}</code>
                </pre>
                <p>Suppose the table contains:</p>
                <ResultTable
                    rows={[
                        { id: '1', city: 'Delhi', name: 'John' },
                        { id: '2', city: 'Delhi', name: 'Mary' },
                        { id: '3', city: 'Mumbai', name: 'Alex' },
                    ]}
                />
                <p>
                    <code>city</code> is grouped, but <code>id</code> and <code>name</code> are
                    non-aggregated columns. MySQL does not know which Delhi row to return.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="the-default">
                <h2 id="the-default" className="SectionTitle">
                    The default
                </h2>
                <p>
                    From MySQL 5.7.5 onwards, <code>ONLY_FULL_GROUP_BY</code> is part of the default{' '}
                    <code>sql_mode</code>. So on a default MySQL 5.7.5 or later, the query above
                    returns an error. It does not return an arbitrary row.
                </p>
                <p>
                    Before 5.7.5 the mode was off by default, and MySQL returned an arbitrary row.
                    MariaDB also leaves the mode off by default, so it returns an arbitrary row.
                </p>
                <p>Check what the server is using:</p>
                <pre className="Article__code">
                    <code>{sqlModeQuery}</code>
                </pre>
                <p>
                    A managed database or an application framework can set its own{' '}
                    <code>sql_mode</code>, so read the value instead of assuming the default.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="only-full-group-by-enabled">
                <h2 id="only-full-group-by-enabled" className="SectionTitle">
                    If ONLY_FULL_GROUP_BY is enabled
                </h2>
                <p>The query produces an error:</p>
                <pre className="Article__code">
                    <code>{groupByError}</code>
                </pre>
            </section>

            <section className="Article__section" aria-labelledby="only-full-group-by-disabled">
                <h2 id="only-full-group-by-disabled" className="SectionTitle">
                    If ONLY_FULL_GROUP_BY is disabled
                </h2>
                <p>
                    The query may run, but MySQL chooses non-grouped column values unpredictably.
                    The result is not reliable. MySQL may choose any row. This need not to be random
                    or different each time. Maybe the same row each time or maybe different. I could not find a rule using which the user can know about this. And I did not choose to go down the rabbit hole to know about this.
                </p>
                <p>Result could be either of the following:</p>
                <ResultTable
                    rows={[
                        { id: '2', city: 'Delhi', name: 'Mary' },
                        { id: '3', city: 'Mumbai', name: 'Alex' },
                    ]}
                />
                <p>OR</p>
                <ResultTable
                    rows={[
                        { id: '1', city: 'Delhi', name: 'John' },
                        { id: '3', city: 'Mumbai', name: 'Alex' },
                    ]}
                />
            </section>

            <section className="Article__section" aria-labelledby="a-safer-query">
                <h2 id="a-safer-query" className="SectionTitle">
                    A safer query
                </h2>
                <p>A safer query is:</p>
                <pre className="Article__code">
                    <code>{saferQuery}</code>
                </pre>
                <p>For predictable result, each selected column must either:</p>
                <ul className="Article__notes">
                    <li>
                        appear in <code>GROUP BY</code>, or
                    </li>
                    <li>
                        be used with an aggregate function such as <code>COUNT()</code>,{' '}
                        <code>SUM()</code>, <code>MIN()</code>, or <code>MAX()</code>.
                    </li>
                </ul>
                <p>
                    <code>HAVING</code> is unrelated. It is used only to filter groups after
                    grouping.
                </p>
            </section>
        </ArticleLayout>
    );
};

export default MysqlGroupBy;
