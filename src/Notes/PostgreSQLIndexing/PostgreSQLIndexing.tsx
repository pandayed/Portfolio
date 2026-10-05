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
            <ul className="Article__notes">
                <li>An index stores searchable values separately from a table.</li>
                <li>PostgreSQL can use the index to find matching rows.</li>
                <li>The query planner chooses whether to use the index.</li>
                <li>Creating an index does not change a query&apos;s result.</li>
                <li>An index does not guarantee a faster query.</li>
            </ul>
            <ul className="Article__notes">
                <li>Use the <a href={toHref(POSTGRESQL_QUERY_ANALYSIS_ROUTE)} className="Link">query analysis notes</a> to read the plan and measure the query.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="index-costs">
            <h2 id="index-costs" className="SectionTitle">What an index costs</h2>
            <ul className="Article__notes">
                <li>An index uses disk space and competes with table data for memory.</li>
                <li>Inserts and relevant updates maintain index entries.</li>
                <li>Deletes leave index cleanup work.</li>
                <li>Building an index reads table data and uses CPU and I/O.</li>
                <li>Several similar indexes can add write costs without improving the queries you run.</li>
            </ul>
            <ul className="Article__notes">
                <li>An index often helps when a query selects a small part of a large table.</li>
                <li>A sequential scan reads the table directly.</li>
                <li>A sequential scan can cost less for a small table or a query that needs many rows.</li>
                <li>Using an index can cost more when PostgreSQL must fetch many table rows.</li>
                <li>See PostgreSQL&apos;s <a href="https://www.postgresql.org/docs/current/indexes-intro.html" className="Link">introduction to indexes</a>.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="index-practice-table">
            <h2 id="index-practice-table" className="SectionTitle">A practice table</h2>
            <ul className="Article__notes">
                <li>Run this setup once in a PostgreSQL session.</li>
                <li>The temporary table disappears when that session ends.</li>
                <li>Run the later examples in the same session.</li>
            </ul>
            <CodeBlock language="sql">{practiceTable}</CodeBlock>
            <ul className="Article__notes">
                <li>The expected SELECT result below is calculated from the inserted rows.</li>
                <li>The query orders the rows by date, newest first.</li>
                <li>Six rows show the syntax and results. Use a larger dataset to measure performance.</li>
            </ul>
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
            <ul className="Article__notes">
                <li><code>CREATE INDEX</code> uses B-tree by default.</li>
                <li>PostgreSQL may use this index for <code>customer_id = 10</code>.</li>
                <li>This index does not provide the requested date ordering.</li>
            </ul>
            <CodeBlock language="sql">{`CREATE INDEX orders_index_demo_customer_idx
ON orders_index_demo (customer_id);

SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'orders_index_demo'
  AND schemaname = pg_my_temp_schema()::regnamespace::text
ORDER BY indexname;

-- Remove only the index created above. The table remains.
DROP INDEX orders_index_demo_customer_idx;`}</CodeBlock>
            <ul className="Article__notes">
                <li>Before <code>DROP INDEX</code>, the list includes <code>orders_index_demo_customer_idx</code> and <code>orders_index_demo_pkey</code>.</li>
                <li>PostgreSQL created <code>orders_index_demo_pkey</code> for the primary key.</li>
                <li>The <code>indexdef</code> column shows each index&apos;s definition.</li>
                <li>See the <a href="https://www.postgresql.org/docs/current/view-pg-indexes.html" className="Link">pg_indexes view</a>.</li>
            </ul>
            <ul className="Article__notes">
                <li>Primary key and unique constraints create unique B-tree indexes automatically.</li>
                <li>Do not add a duplicate index for the same purpose.</li>
                <li>A foreign key does not automatically create an index on its referencing columns.</li>
                <li>Consider an index on those columns for joins and checks when referenced rows are deleted or updated.</li>
                <li>See <a href="https://www.postgresql.org/docs/current/ddl-constraints.html" className="Link">PostgreSQL constraints</a>.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="composite-indexes">
            <h2 id="composite-indexes" className="SectionTitle">Composite indexes</h2>
            <ul className="Article__notes">
                <li>A composite index has more than one key column.</li>
                <li>Choose the column order from the query&apos;s conditions and ordering.</li>
                <li>Leading columns are the first columns in the index definition.</li>
                <li>In a B-tree, equality conditions on leading columns can limit the part of the index scanned.</li>
                <li>A range condition on the next column can limit that scan further.</li>
            </ul>
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
                        <tr><th scope="row">Customer equality plus date ordering</th><td>Can return that customer&apos;s entries in date order. A backward scan provides descending dates.</td></tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>A condition on a later column can still use the index.</li>
                <li>PostgreSQL 18 can use B-tree skip scans. These repeat searches over distinct values in the first columns.</li>
                <li>The planner chooses a skip scan only when it expects the repeated searches to be worthwhile.</li>
                <li>The chosen plan depends on the data and server version.</li>
                <li>See <a href="https://www.postgresql.org/docs/current/indexes-multicolumn.html" className="Link">multicolumn indexes</a>.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="partial-and-expression-indexes">
            <h2 id="partial-and-expression-indexes" className="SectionTitle">Partial and expression indexes</h2>
            <h3 className="Article__subTitle">Partial: index only the rows a query needs</h3>
            <ul className="Article__notes">
                <li>A partial index contains only rows that meet its <code>WHERE</code> condition.</li>
                <li>Suppose open orders are a small part of a large table and queries often need them.</li>
                <li>An index for open orders can be smaller than an index for every order.</li>
            </ul>
            <CodeBlock language="sql">{`CREATE INDEX orders_index_demo_open_customer_idx
ON orders_index_demo (customer_id)
WHERE status = 'open';

SELECT order_id
FROM orders_index_demo
WHERE customer_id = 10 AND status = 'open'
ORDER BY order_id;`}</CodeBlock>
            <ul className="Article__notes">
                <li>Expected result: order 6.</li>
                <li>The planner must prove that the query&apos;s condition requires <code>status = &apos;open&apos;</code>.</li>
                <li>A query for all this customer&apos;s orders cannot use this partial index to find every row.</li>
                <li>A generic prepared plan with <code>status = $1</code> cannot assume that the parameter always means open.</li>
                <li>See <a href="https://www.postgresql.org/docs/current/indexes-partial.html" className="Link">partial indexes</a>.</li>
            </ul>
            <h3 className="Article__subTitle">Expression: index the value used in the condition</h3>
            <CodeBlock language="sql">{`CREATE INDEX orders_index_demo_lower_email_idx
ON orders_index_demo (lower(customer_email));

SELECT order_id
FROM orders_index_demo
WHERE lower(customer_email) = 'sam@example.com'
ORDER BY order_id;`}</CodeBlock>
            <ul className="Article__notes">
                <li>Expected result: orders 1, 3 and 6.</li>
                <li>The index stores the lowercase expression used in the query.</li>
                <li>An ordinary index on <code>customer_email</code> does not store the same searchable value.</li>
                <li>Computing the expression adds work when PostgreSQL writes index entries.</li>
                <li>See <a href="https://www.postgresql.org/docs/current/indexes-expressional.html" className="Link">indexes on expressions</a>.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="covering-indexes">
            <h2 id="covering-indexes" className="SectionTitle">INCLUDE and index-only scans</h2>
            <ul className="Article__notes">
                <li><code>INCLUDE</code> stores extra result columns in the index.</li>
                <li>These columns are payload: stored values that are not search or ordering keys.</li>
                <li>A covering index contains all columns needed by a particular query.</li>
            </ul>
            <CodeBlock language="sql">{`-- An alternative to the customer/date index above.
CREATE INDEX orders_index_demo_customer_date_cover_idx
ON orders_index_demo (customer_id, created_at)
INCLUDE (amount);

SELECT created_at, amount
FROM orders_index_demo
WHERE customer_id = 10
ORDER BY created_at DESC;`}</CodeBlock>
            <ul className="Article__notes">
                <li>Expected result: 2026-10-02 / 90.00, 2026-10-01 / 45.00, 2026-09-28 / 120.00.</li>
                <li>The key columns find and order rows.</li>
                <li>The included <code>amount</code> can supply the selected value.</li>
                <li>Selecting <code>customer_email</code> would require a value absent from this index.</li>
            </ul>
            <ul className="Article__notes">
                <li>An index-only scan still checks whether each row is visible to the query.</li>
                <li>The visibility map records which table pages have only rows visible to all transactions.</li>
                <li>The scan avoids a table visit only when the visibility map marks that page this way.</li>
                <li>Recent changes can require heap fetches, or table-row reads, even with a covering index.</li>
                <li>Extra payload also increases index size.</li>
                <li>See <a href="https://www.postgresql.org/docs/current/indexes-index-only-scans.html" className="Link">index-only scans and covering indexes</a>.</li>
            </ul>
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
            <ul className="Article__notes">
                <li>An operator class defines which operations an index supports for a data type.</li>
                <li>Choosing an index type alone does not make every condition searchable.</li>
                <li>See <a href="https://www.postgresql.org/docs/current/indexes-types.html" className="Link">PostgreSQL index types</a>.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="choose-and-check-indexes">
            <h2 id="choose-and-check-indexes" className="SectionTitle">Choose and check an index</h2>
            <ol className="Article__steps">
                <li>Choose a frequent or slow query. Record its filters, joins, ordering and selected columns.</li>
                <li>Inspect existing indexes before adding one. Choose from the examples above based on your query.</li>
                <li>Use data that matches actual use and current statistics. Compare plans, execution time and buffer use before and after.</li>
                <li>Check write costs and other important queries. Keep the index only if the measured benefit fits how you use the database.</li>
            </ol>
            <CodeBlock language="sql">{`ANALYZE orders_index_demo;

EXPLAIN (ANALYZE, BUFFERS)
SELECT order_id, created_at, amount
FROM orders_index_demo
WHERE customer_id = 10
ORDER BY created_at DESC, order_id DESC;`}</CodeBlock>
            <ul className="Article__notes">
                <li><code>EXPLAIN ANALYZE</code> executes this SELECT.</li>
                <li>A sequential scan is a reasonable result for this six-row table.</li>
                <li>Actual plans and timings depend on your database.</li>
                <li>Use the <a href={toHref(POSTGRESQL_QUERY_ANALYSIS_ROUTE)} className="Link">query analysis workflow</a> to read the output.</li>
            </ul>
            <h3 className="Article__subTitle">Creating indexes on a live table</h3>
            <ul className="Article__notes">
                <li>A normal index build blocks writes to that table while it builds.</li>
                <li>For a permanent table, <code>CREATE INDEX CONCURRENTLY</code> allows writes to continue.</li>
                <li>A concurrent build does more work and can wait for transactions.</li>
                <li>It cannot run inside a transaction block.</li>
                <li>A failed concurrent build can leave an invalid index that needs cleanup.</li>
                <li>Temporary tables use a non-concurrent build.</li>
                <li>See the <a href="https://www.postgresql.org/docs/current/sql-createindex.html" className="Link">CREATE INDEX concurrency rules</a>.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default PostgreSQLIndexing;
