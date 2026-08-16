import './SqlVsMySql.css';
import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../ArticleLayout/ArticleLayout';
import { SQL_VS_MYSQL_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const syntaxExample = `-- PostgreSQL and MySQL
SELECT * FROM films ORDER BY id LIMIT 10 OFFSET 20;

-- SQL Server
SELECT TOP 10 * FROM films ORDER BY id;

-- Oracle (12c and later) and PostgreSQL (SQL:2008 form)
SELECT * FROM films ORDER BY id
    OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY;`;

const SqlVsMySql = () => {
    return (
        <ArticleLayout
            title="SQL vs PostgreSQL, MySQL, SQL Server and Oracle"
            route={SQL_VS_MYSQL_ROUTE}
            sections={sections}
        >
            <section className="SqlVsMySql__section">
                <p>
                    SQL is a language. PostgreSQL, MySQL, SQL Server and Oracle are programs that
                    implement it. Once that distinction is clear, the syntax differences between
                    them stop looking random.
                </p>
            </section>

            <section className="SqlVsMySql__section" aria-labelledby="language-vs-database">
                <h2 id="language-vs-database" className="SectionTitle">
                    SQL is a language, not a database
                </h2>
                <p>
                    SQL is a specification. It defines how to ask a relational database for data:
                    SELECT, WHERE, JOIN, GROUP BY, and the rest. PostgreSQL, MySQL, SQL Server and
                    Oracle are separate programs that read SQL text and act on it.
                </p>
                <p>
                    Each program stores data on disk in its own format, plans queries with its own
                    optimizer, and enforces its own rules for locking and transactions. SQL is the
                    interface. The database is what sits behind it.
                </p>
            </section>

            <section className="SqlVsMySql__section" aria-labelledby="standardized">
                <h2 id="standardized" className="SectionTitle">
                    SQL is standardized
                </h2>
                <p>
                    ANSI and ISO publish the SQL standard. It has gone through several revisions:
                    SQL-92, SQL:1999, SQL:2003, SQL:2008, SQL:2011, SQL:2016, and SQL:2023. Each
                    revision adds syntax for something the earlier version did not cover.
                </p>
                <p>
                    No database implements the whole standard. No two databases implement the same
                    subset of it. That gap is where the visible differences between databases come
                    from.
                </p>
            </section>

            <section className="SqlVsMySql__section" aria-labelledby="what-implementation-means">
                <h2 id="what-implementation-means" className="SectionTitle">
                    What implementation means
                </h2>
                <p>
                    Installing PostgreSQL gives you three things at once: the part of the SQL
                    standard PostgreSQL implements, features PostgreSQL adds that the standard does
                    not define, and PostgreSQL's own storage engine and transaction handling.
                </p>
                <p>
                    MySQL, SQL Server and Oracle each give you the same three things, but the
                    middle one is different every time. That is why &quot;PostgreSQL&quot; means SQL
                    plus a specific, non-transferable body of extra material.
                </p>
            </section>

            <section className="SqlVsMySql__section" aria-labelledby="limit-vs-top">
                <h2 id="limit-vs-top" className="SectionTitle">
                    LIMIT vs TOP
                </h2>
                <p>
                    Restricting a query to its first few rows is a good example of a gap the
                    standard left open for years. PostgreSQL and MySQL use LIMIT and OFFSET. SQL
                    Server uses TOP. Oracle traditionally used the ROWNUM pseudo-column.
                </p>
                <pre className="SqlVsMySql__code">
                    <code>{syntaxExample}</code>
                </pre>
                <p>
                    SQL:2008 closed the gap by defining OFFSET ... FETCH FIRST/NEXT ... ROWS ONLY.
                    PostgreSQL, DB2, SQL Server (2012 and later) and Oracle (12c and later) all
                    support this standard form today. MySQL does not. A request to add it,{' '}
                    <a
                        href="https://bugs.mysql.com/bug.php?id=78929"
                        className="Link"
                        target="_blank"
                        rel="noreferrer"
                    >
                        bug #78929
                    </a>
                    , has been open since 2015 and is marked Verified, not Fixed.
                </p>
                <div className="SqlVsMySql__tableWrap">
                    <table className="SqlVsMySql__table">
                        <thead>
                            <tr>
                                <th scope="col">Database</th>
                                <th scope="col">Row-limiting syntax</th>
                                <th scope="col">Standard OFFSET/FETCH</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">PostgreSQL</th>
                                <td>LIMIT / OFFSET</td>
                                <td>Supported</td>
                            </tr>
                            <tr>
                                <th scope="row">MySQL</th>
                                <td>LIMIT / OFFSET</td>
                                <td>Not supported</td>
                            </tr>
                            <tr>
                                <th scope="row">SQL Server</th>
                                <td>TOP</td>
                                <td>Supported since 2012</td>
                            </tr>
                            <tr>
                                <th scope="row">Oracle</th>
                                <td>ROWNUM</td>
                                <td>Supported since 12c</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="SqlVsMySql__section" aria-labelledby="why-old-syntax-stays">
                <h2 id="why-old-syntax-stays" className="SectionTitle">
                    Why old syntax stays
                </h2>
                <p>
                    Adding standard syntax does not mean removing the old syntax. PostgreSQL's own
                    documentation states that it supports OFFSET/FETCH as well as LIMIT/OFFSET, and
                    it keeps both because existing queries depend on LIMIT.
                </p>
                <p>
                    MySQL is the reverse case. It has not added FETCH FIRST after almost a decade,
                    because LIMIT already does the job its users need. Adding the standard syntax
                    would not fix a problem anyone using MySQL currently has.
                </p>
            </section>

            <section className="SqlVsMySql__section" aria-labelledby="extensions">
                <h2 id="extensions" className="SectionTitle">
                    Extensions beyond the standard
                </h2>
                <p>
                    Databases also add features the standard does not define at all. PostgreSQL's
                    own documentation lists DISTINCT ON, ROWS FROM(), and the MATERIALIZED and NOT
                    MATERIALIZED options on WITH queries as extensions of the SQL standard.
                </p>
                <p>
                    A query built with these features has no direct equivalent in another database.
                    Moving it means rewriting logic, not just changing keywords.
                </p>
            </section>

            <section className="SqlVsMySql__section" aria-labelledby="learning-sql">
                <h2 id="learning-sql" className="SectionTitle">
                    What this means when you learn SQL
                </h2>
                <p>
                    Learning SQL gives you SELECT, WHERE, JOIN, GROUP BY, and the rest of the
                    standard core. That core works, with minor variation, in every relational
                    database.
                </p>
                <p>
                    Learning a specific database on top of that means learning three more things:
                    which part of the standard it implements, which old syntax it keeps around for
                    compatibility, and which features exist only there. That is why moving from
                    PostgreSQL to MySQL, or the reverse, still takes real learning even though both
                    speak SQL.
                </p>
            </section>
        </ArticleLayout>
    );
};

export default SqlVsMySql;
