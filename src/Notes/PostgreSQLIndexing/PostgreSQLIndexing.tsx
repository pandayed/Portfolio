import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import {
    POSTGRESQL_INDEXING_ROUTE,
    POSTGRESQL_NOTES_ROUTE,
    POSTGRESQL_QUERY_ANALYSIS_ROUTE,
    toHref,
} from '../../routing/routes';
import { sections } from './sections';

const practiceTable = `CREATE TEMP TABLE orders_index_demo (
    order_id integer PRIMARY KEY,
    customer_id integer NOT NULL,
    customer_email text NOT NULL,
    status text NOT NULL,
    created_at date NOT NULL,
    amount numeric(10, 2) NOT NULL
);

INSERT INTO orders_index_demo VALUES
    (1, 10, 'Sam@example.com', 'shipped', '2026-09-28', 120.00),
    (2, 20, 'lee@example.com', 'open',    '2026-09-29',  80.00),
    (3, 10, 'sam@example.com', 'shipped', '2026-10-01',  45.00),
    (4, 30, 'pat@example.com', 'open',    '2026-10-01', 200.00),
    (5, 20, 'lee@example.com', 'shipped', '2026-10-02',  60.00),
    (6, 10, 'SAM@example.com', 'open',    '2026-10-02',  90.00);

SELECT order_id, created_at, amount
FROM orders_index_demo
WHERE customer_id = 10
ORDER BY created_at DESC, order_id DESC;`;

const PostgreSQLIndexing = () => (
    <ArticleLayout
        title="Indexing in PostgreSQL"
        route={POSTGRESQL_INDEXING_ROUTE}
        sections={sections}
        backRoute={POSTGRESQL_NOTES_ROUTE}
        backLabel="Back to PostgreSQL notes"
    >
        <section className="Article__section">
            <p>
                An index stores searchable values separately from a table and helps PostgreSQL find
                matching rows. The query planner chooses whether to use it. Creating an index does
                not change a query&apos;s result or guarantee a faster query.
            </p>
            <p>
                Use these notes to match an index to a query. Use the{' '}
                <a href={toHref(POSTGRESQL_QUERY_ANALYSIS_ROUTE)} className="Link">
                    query analysis notes
                </a>{' '}
                to read the plan and measure the result.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="index-costs">
            <h2 id="index-costs" className="SectionTitle">What an index costs</h2>
            <ul className="Article__notes">
                <li>An index uses disk space and competes with table data for memory.</li>
                <li>Inserts and relevant updates maintain index entries. Deletes also leave index cleanup work.</li>
                <li>Building an index reads table data and uses CPU and I/O.</li>
                <li>Several similar indexes can add write costs without improving the queries you run.</li>
            </ul>
            <p>
                An index often helps when a query selects a small share of a large table. A sequential
                scan can be cheaper for a small table or a query that needs many rows. A scan reads
                the table directly instead of finding entries and then fetching many table rows.
                See PostgreSQL&apos;s{' '}
                <a href="https://www.postgresql.org/docs/current/indexes-intro.html" className="Link">
                    introduction to indexes
                </a>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="index-practice-table">
            <h2 id="index-practice-table" className="SectionTitle">A practice table</h2>
            <p>
                Run this setup once in a PostgreSQL session. The temporary table disappears when
                that session ends. The later examples use this table in the same session.
            </p>
            <CodeBlock language="sql">{practiceTable}</CodeBlock>
            <p>
                Expected SELECT result calculated from the inserted rows, ordered newest first.
                Six rows demonstrate syntax and results. Use a larger dataset to measure performance.
            </p>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead>
                        <tr><th scope="col">order_id</th><th scope="col">created_at</th><th scope="col">amount</th></tr>
                    </thead>
                    <tbody>
                        <tr><th scope="row">6</th><td>2026-10-02</td><td>90.00</td></tr>
                        <tr><th scope="row">3</th><td>2026-10-01</td><td>45.00</td></tr>
                        <tr><th scope="row">1</th><td>2026-09-28</td><td>120.00</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="create-and-inspect-indexes">
            <h2 id="create-and-inspect-indexes" className="SectionTitle">Create and inspect indexes</h2>
            <p>
                <code>CREATE INDEX</code> uses B-tree by default. This index is a candidate for the
                practice query&apos;s <code>customer_id = 10</code> condition. It does not provide the
                requested date ordering.
            </p>
            <CodeBlock language="sql">{`CREATE INDEX orders_index_demo_customer_idx
ON orders_index_demo (customer_id);

SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'orders_index_demo'
  AND schemaname = pg_my_temp_schema()::regnamespace::text
ORDER BY indexname;

-- Remove only the index created above. The table remains.
DROP INDEX orders_index_demo_customer_idx;`}</CodeBlock>
            <p>
                Before the drop, the list includes <code>orders_index_demo_customer_idx</code> and{' '}
                <code>orders_index_demo_pkey</code>. PostgreSQL created the second index for the
                primary key. The <code>indexdef</code> column shows each index&apos;s definition.
                See the{' '}
                <a href="https://www.postgresql.org/docs/current/view-pg-indexes.html" className="Link">
                    pg_indexes view
                </a>.
            </p>
            <p>
                Primary key and unique constraints create unique B-tree indexes automatically. Do
                not add a duplicate index for the same purpose. A foreign key does not automatically
                create an index on its referencing columns. Consider one for joins and checks when
                referenced rows are deleted or updated. See{' '}
                <a href="https://www.postgresql.org/docs/current/ddl-constraints.html" className="Link">
                    PostgreSQL constraints
                </a>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="composite-indexes">
            <h2 id="composite-indexes" className="SectionTitle">Composite indexes</h2>
            <p>
                A composite index has more than one key column. Choose the order from the query&apos;s
                conditions and ordering. For a B-tree, equality conditions on leading columns and a
                range condition on the next column can restrict the part of the index scanned.
            </p>
            <CodeBlock language="sql">{`CREATE INDEX orders_index_demo_customer_date_idx
ON orders_index_demo (customer_id, created_at);

SELECT order_id, created_at
FROM orders_index_demo
WHERE customer_id = 10
  AND created_at >= DATE '2026-10-01'
ORDER BY created_at DESC;`}</CodeBlock>
            <p>Expected result: order 6 on 2026-10-02, then order 3 on 2026-10-01.</p>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Query condition</th><th scope="col">Fit for (customer_id, created_at)</th></tr></thead>
                    <tbody>
                        <tr><th scope="row"><code>customer_id = 10</code></th><td>Uses the leading key to find this customer&apos;s entries.</td></tr>
                        <tr><th scope="row">Customer equality plus date range</th><td>Restricts the customer&apos;s entries further by date.</td></tr>
                        <tr><th scope="row">Date condition alone</th><td>May need a broad scan. A date-first index can fit this workload better.</td></tr>
                        <tr><th scope="row">Customer equality plus date ordering</th><td>Can return that customer&apos;s entries in date order, including a backward scan for descending dates.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                Do not read the leading-column rule as “later columns can never use the index.”
                PostgreSQL 18 can use B-tree skip scans when repeating searches over distinct
                leading values is worthwhile. The chosen plan depends on data and server version.
                See{' '}
                <a href="https://www.postgresql.org/docs/current/indexes-multicolumn.html" className="Link">
                    multicolumn indexes
                </a>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="partial-and-expression-indexes">
            <h2 id="partial-and-expression-indexes" className="SectionTitle">Partial and expression indexes</h2>
            <h3 className="Article__subTitle">Partial: index only the rows a query needs</h3>
            <p>
                A partial index contains rows that satisfy its <code>WHERE</code> condition. If open
                orders are a small, frequently queried part of a larger table, this index can be
                smaller than an index covering every order.
            </p>
            <CodeBlock language="sql">{`CREATE INDEX orders_index_demo_open_customer_idx
ON orders_index_demo (customer_id)
WHERE status = 'open';

SELECT order_id
FROM orders_index_demo
WHERE customer_id = 10 AND status = 'open'
ORDER BY order_id;`}</CodeBlock>
            <p>
                Expected result: order 6. The planner must prove that the query&apos;s condition
                implies <code>status = &apos;open&apos;</code>. A query for all this customer&apos;s
                orders cannot use this partial index to find every row. A generic prepared plan with
                <code> status = $1</code> cannot assume that the parameter always means open.
                See{' '}
                <a href="https://www.postgresql.org/docs/current/indexes-partial.html" className="Link">
                    partial indexes
                </a>.
            </p>
            <h3 className="Article__subTitle">Expression: index the value used in the condition</h3>
            <CodeBlock language="sql">{`CREATE INDEX orders_index_demo_lower_email_idx
ON orders_index_demo (lower(customer_email));

SELECT order_id
FROM orders_index_demo
WHERE lower(customer_email) = 'sam@example.com'
ORDER BY order_id;`}</CodeBlock>
            <p>
                Expected result: orders 1, 3 and 6. The index stores the lowercase expression used in
                the query. An ordinary index on <code>customer_email</code> does not provide the
                same searchable key for this condition. Computing the expression adds write work.
                See{' '}
                <a href="https://www.postgresql.org/docs/current/indexes-expressional.html" className="Link">
                    indexes on expressions
                </a>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="covering-indexes">
            <h2 id="covering-indexes" className="SectionTitle">INCLUDE and index-only scans</h2>
            <p>
                <code>INCLUDE</code> stores extra result columns in the index. These columns are
                payload, not search or ordering keys. A covering index contains all columns needed
                by a particular query.
            </p>
            <CodeBlock language="sql">{`-- An alternative to the customer/date index above.
CREATE INDEX orders_index_demo_customer_date_cover_idx
ON orders_index_demo (customer_id, created_at)
INCLUDE (amount);

SELECT created_at, amount
FROM orders_index_demo
WHERE customer_id = 10
ORDER BY created_at DESC;`}</CodeBlock>
            <p>
                Expected result: 2026-10-02 / 90.00, 2026-10-01 / 45.00, 2026-09-28 / 120.00.
                The key columns find and order rows. The included amount can supply the selected
                value. Selecting <code>customer_email</code> would require a value absent from this index.
            </p>
            <p>
                An index-only scan still checks whether each row is visible to the query. It avoids
                a table visit only when the table page&apos;s visibility map marks all its rows as
                visible. Recent changes can require heap fetches even with a covering index. Extra
                payload also increases index size. See{' '}
                <a href="https://www.postgresql.org/docs/current/indexes-index-only-scans.html" className="Link">
                    index-only scans and covering indexes
                </a>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="index-types">
            <h2 id="index-types" className="SectionTitle">Index types at a glance</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Type</th><th scope="col">Common fit</th><th scope="col">Limit or tradeoff</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">B-tree</th><td>Equality, ranges and sorted results.</td><td>Default. Check column order and supported operators.</td></tr>
                        <tr><th scope="row">Hash</th><td>Simple equality comparisons.</td><td>Does not support ranges or sorted output.</td></tr>
                        <tr><th scope="row">GIN</th><td>Arrays, <a href="https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING" className="Link">JSONB containment</a> and <a href="https://www.postgresql.org/docs/current/textsearch-indexes.html" className="Link">full-text search</a>.</td><td>Supported queries depend on the operator class. Writes maintain many entries.</td></tr>
                        <tr><th scope="row">GiST</th><td>Ranges, geometric searches and some nearest-neighbor queries.</td><td>Supported operators depend on the operator class.</td></tr>
                        <tr><th scope="row">SP-GiST</th><td>Partitioned search structures for supported data such as points.</td><td>Choose a supported operator class for the query.</td></tr>
                        <tr><th scope="row">BRIN</th><td>Large tables where values follow physical row order, such as time-ordered data.</td><td>Stores <a href="https://www.postgresql.org/docs/current/brin.html" className="Link">block-range summaries</a>. Candidate table rows need rechecking.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                An operator class defines which operations an index supports for a data type.
                Choosing an index type alone does not make every condition searchable. See{' '}
                <a href="https://www.postgresql.org/docs/current/indexes-types.html" className="Link">
                    PostgreSQL index types
                </a>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="choose-and-check-indexes">
            <h2 id="choose-and-check-indexes" className="SectionTitle">Choose and check an index</h2>
            <ol className="Article__steps">
                <li>Start with a frequent or slow query. Record its filters, joins, ordering and selected columns.</li>
                <li>Inspect existing indexes before adding a candidate. Treat the examples above as options, not a list to add to every table.</li>
                <li>Use representative data and current statistics. Compare plans, execution time and buffer use before and after.</li>
                <li>Check write costs and other important queries. Keep the index only if the measured benefit fits the workload.</li>
            </ol>
            <CodeBlock language="sql">{`ANALYZE orders_index_demo;

EXPLAIN (ANALYZE, BUFFERS)
SELECT order_id, created_at, amount
FROM orders_index_demo
WHERE customer_id = 10
ORDER BY created_at DESC, order_id DESC;`}</CodeBlock>
            <p>
                <code>EXPLAIN ANALYZE</code> executes this SELECT. A sequential scan is a reasonable
                outcome for the tiny fixture. Actual plans and timings depend on your database.
                Follow the{' '}
                <a href={toHref(POSTGRESQL_QUERY_ANALYSIS_ROUTE)} className="Link">
                    query analysis workflow
                </a>{' '}
                to interpret the output.
            </p>
            <h3 className="Article__subTitle">Creating indexes on a live table</h3>
            <p>
                A normal index build blocks writes to that table while it builds. For a permanent
                table, <code>CREATE INDEX CONCURRENTLY</code> allows writes to continue but does
                more work and can wait for transactions. It cannot run inside a transaction block.
                A failed concurrent build can leave an invalid index that needs cleanup. Temporary
                tables use a non-concurrent build. See the{' '}
                <a href="https://www.postgresql.org/docs/current/sql-createindex.html" className="Link">
                    CREATE INDEX concurrency rules
                </a>.
            </p>
        </section>
    </ArticleLayout>
);

export default PostgreSQLIndexing;
