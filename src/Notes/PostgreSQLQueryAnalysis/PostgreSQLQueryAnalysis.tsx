import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import {
    POSTGRESQL_INDEXING_ROUTE,
    POSTGRESQL_JOINS_ROUTE,
    POSTGRESQL_NOTES_ROUTE,
    POSTGRESQL_QUERY_ANALYSIS_ROUTE,
    toHref,
} from '../../routing/routes';
import { sections } from './sections';

const sampleData = `CREATE TEMP TABLE orders_plan_demo (
    order_id integer PRIMARY KEY,
    customer_id integer NOT NULL,
    total numeric(10, 2) NOT NULL
);

INSERT INTO orders_plan_demo (order_id, customer_id, total)
SELECT n, n % 1000, ((n % 10000) + 100)::numeric / 100
FROM generate_series(1, 100000) AS sample(n);

ANALYZE orders_plan_demo;

SELECT order_id, total
FROM orders_plan_demo
WHERE customer_id = 42
ORDER BY order_id
LIMIT 2;`;

const explainQuery = `EXPLAIN
SELECT order_id, total
FROM orders_plan_demo
WHERE customer_id = 42;

EXPLAIN (ANALYZE, BUFFERS)
SELECT order_id, total
FROM orders_plan_demo
WHERE customer_id = 42;`;

const illustrativePlan = `Seq Scan on orders_plan_demo
  (cost=0.00..1800.00 rows=100 width=10)
  (actual time=0.010..8.000 rows=100 loops=1)
  Filter: (customer_id = 42)
  Rows Removed by Filter: 99900
  Buffers: local hit=550
Planning Time: 0.150 ms
Execution Time: 8.100 ms`;

const addIndex = `CREATE INDEX orders_plan_demo_customer_idx
    ON orders_plan_demo (customer_id);

EXPLAIN (ANALYZE, BUFFERS)
SELECT order_id, total
FROM orders_plan_demo
WHERE customer_id = 42;`;

const PostgreSQLQueryAnalysis = () => (
    <ArticleLayout
        title="Query analysis in PostgreSQL"
        route={POSTGRESQL_QUERY_ANALYSIS_ROUTE}
        sections={sections}
        backRoute={POSTGRESQL_NOTES_ROUTE}
        backLabel="Back to PostgreSQL notes"
    >
        <section className="Article__section">
            <ul className="Article__notes">
                <li>An execution plan shows how PostgreSQL reads rows, joins tables, sorts, and computes aggregates.</li>
                <li>Use the plan to find where a query does work.</li>
                <li>Measure the query with data and parameter values that match actual use before deciding whether an index helps.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="query-analysis-sample">
            <h2 id="query-analysis-sample" className="SectionTitle">Create sample data</h2>
            <ul className="Article__notes">
                <li>Run this setup in a practice session.</li>
                <li>The temporary table disappears when the session ends.</li>
                <li>The table has 100,000 orders and 1,000 customer IDs.</li>
                <li>Each customer has 100 orders.</li>
                <li>Run the later examples in the same session.</li>
            </ul>
            <CodeBlock language="sql">{sampleData}</CodeBlock>
            <ul className="Article__notes">
                <li>The table below shows the expected result of the last <code>SELECT</code>.</li>
                <li>These values are calculated from the sample formula.</li>
            </ul>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">order_id</th><th scope="col">total</th></tr></thead>
                    <tbody><tr><td>42</td><td>1.42</td></tr><tr><td>1042</td><td>11.42</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>The primary key already indexes <code>order_id</code>.</li>
                <li>It does not create an index on <code>customer_id</code>.</li>
                <li>This dataset is for learning plan fields.</li>
                <li>It does not represent concurrent production queries or the distribution of values in production data.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="explain-and-analyze">
            <h2 id="explain-and-analyze" className="SectionTitle">EXPLAIN and EXPLAIN ANALYZE</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Command</th><th scope="col">Executes the query?</th><th scope="col">Shows</th></tr></thead>
                    <tbody>
                        <tr><th scope="row"><code>EXPLAIN</code></th><td>No</td><td>Chosen plan and estimates.</td></tr>
                        <tr><th scope="row"><code>EXPLAIN ANALYZE</code></th><td>Yes</td><td>Estimates plus measured rows and timing.</td></tr>
                        <tr><th scope="row"><code>EXPLAIN (ANALYZE, BUFFERS)</code></th><td>Yes</td><td>Also includes buffer activity.</td></tr>
                    </tbody>
                </table>
            </div>
            <CodeBlock language="sql">{explainQuery}</CodeBlock>
            <ul className="Article__notes">
                <li>These commands return a plan instead of the selected order rows.</li>
                <li>A slow query still takes time to execute under <code>EXPLAIN ANALYZE</code>.</li>
                <li><code>EXPLAIN ANALYZE</code> adds instrumentation: work needed to measure the query.</li>
                <li>The default measurement excludes sending result rows over the network.</li>
            </ul>
            <ul className="Article__notes">
                <li><code>ANALYZE orders_plan_demo</code> collects planner statistics.</li>
                <li>The <code>ANALYZE</code> option inside <code>EXPLAIN</code> executes the query.</li>
            </ul>
            <ul className="Article__notes">
                <li><code>EXPLAIN ANALYZE UPDATE ...</code> updates rows.</li>
                <li>Use plain <code>EXPLAIN</code> for an estimate.</li>
                <li>Use a disposable environment to measure writes.</li>
                <li>A transaction rollback can undo transactional data changes.</li>
                <li>A rollback cannot undo every side effect. Examples include consumed <a href="https://www.postgresql.org/docs/current/functions-sequence.html" className="Link">sequence values</a> and external effects from functions.</li>
                <li>See the <a href="https://www.postgresql.org/docs/current/sql-explain.html" className="Link">EXPLAIN reference</a>.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="read-plan-fields">
            <h2 id="read-plan-fields" className="SectionTitle">Read the plan fields</h2>
            <ul className="Article__notes">
                <li>This illustrative plan uses invented costs, timing, and buffer counts.</li>
                <li>It was not captured by running the sample.</li>
                <li>Your numbers and chosen nodes can differ.</li>
            </ul>
            <CodeBlock language="text">{illustrativePlan}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Field</th><th scope="col">Meaning in this example</th></tr></thead>
                    <tbody>
                        <tr><th scope="row"><code>cost=0.00..1800.00</code></th><td>Estimated startup and total cost in planner units, not milliseconds.</td></tr>
                        <tr><th scope="row"><code>rows=100</code></th><td>Estimated rows returned by the node, not rows examined.</td></tr>
                        <tr><th scope="row"><code>width=10</code></th><td>Estimated average output row size in bytes.</td></tr>
                        <tr><th scope="row"><code>actual time=0.010..8.000</code></th><td>Measured time to first row and completion, in milliseconds.</td></tr>
                        <tr><th scope="row"><code>actual rows=100 loops=1</code></th><td>100 rows returned in one execution of this node.</td></tr>
                        <tr><th scope="row"><code>Rows Removed by Filter: 99900</code></th><td>Rows examined here and rejected by the filter.</td></tr>
                        <tr><th scope="row"><code>Planning Time</code></th><td>Time spent planning.</td></tr>
                        <tr><th scope="row"><code>Execution Time</code></th><td>Total executor time, including instrumentation.</td></tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>Each node describes one operation in the plan.</li>
                <li>Indentation shows parent and child nodes.</li>
                <li>Start with the scans. Then follow their rows into joins, sorts, and aggregates.</li>
                <li>Parent timing includes child work. Do not add all node times together.</li>
            </ul>
            <ul className="Article__notes">
                <li>For a repeated node, actual rows and times are averages per loop.</li>
                <li>A node showing <code>rows=2 loops=500</code> returned about 1,000 rows across its executions.</li>
                <li>Compare estimated and actual rows at the same node.</li>
                <li>Read the <a href="https://www.postgresql.org/docs/current/using-explain.html" className="Link">plan-reading guide</a> for the full field definitions.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="scans-and-joins">
            <h2 id="scans-and-joins" className="SectionTitle">Recognise scans and joins</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Node</th><th scope="col">Work it does</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">Seq Scan</th><td>Reads table rows and applies any filter. Often suitable for small tables or queries needing much of a table.</td></tr>
                        <tr><th scope="row">Index Scan</th><td>Finds entries through an index and fetches table rows.</td></tr>
                        <tr><th scope="row">Index Only Scan</th><td>Can return values from the index. Visibility checks can still require heap fetches.</td></tr>
                        <tr><th scope="row">Bitmap Index / Heap Scan</th><td>Finds row locations, then visits table pages. Can combine multiple indexes.</td></tr>
                        <tr><th scope="row">Nested Loop</th><td>Uses each outer row to run the inner input. Check inner loops and work per loop.</td></tr>
                        <tr><th scope="row">Hash Join</th><td>Builds a hash table from one input. Looks up matching rows using the other input.</td></tr>
                        <tr><th scope="row">Merge Join</th><td>Combines inputs ordered by the join keys. Indexes or sorts can supply that order.</td></tr>
                        <tr><th scope="row">Sort / Aggregate</th><td>Orders rows or computes groups and aggregate results.</td></tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>Index Cond</code> identifies an index search condition.</li>
                <li>A <code>Filter</code> rejects rows after that node retrieves them.</li>
                <li>A <code>Recheck Cond</code> is a condition checked again on table rows.</li>
                <li>For example, a lossy bitmap records matching pages instead of exact row locations. PostgreSQL must check the rows on those pages again.</li>
                <li>Many removed rows suggest excess work. They do not prove that an index will help.</li>
            </ul>
            <ul className="Article__notes">
                <li>No join algorithm is always fastest.</li>
                <li>Confirm the expected result size before treating extra rows as a performance defect.</li>
                <li>A one-to-many join can correctly produce many rows. See <a href={toHref(POSTGRESQL_JOINS_ROUTE)} className="Link">joins in PostgreSQL</a>.</li>
            </ul>
            <ul className="Article__notes">
                <li>See the <a href="https://www.postgresql.org/docs/current/planner-optimizer.html" className="Link">planner overview</a> for scan and join choices.</li>
                <li>See <a href="https://www.postgresql.org/docs/current/indexes-bitmap-scans.html" className="Link">combining indexes with bitmaps</a> and <a href="https://www.postgresql.org/docs/current/indexes-index-only-scans.html" className="Link">index-only scans</a> for their limits.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="read-buffers">
            <h2 id="read-buffers" className="SectionTitle">Read buffer usage</h2>
            <ul className="Article__notes">
                <li><code>shared hit</code>: regular table or index blocks found in PostgreSQL's shared cache.</li>
                <li><code>shared read</code>: blocks loaded into that cache. The operating system may still have served them from its cache.</li>
                <li><code>local hit/read</code>: temporary table and index blocks. This sample uses a temporary table.</li>
                <li><code>temp read/written</code>: temporary working files. A sort or hash can spill to disk when its data does not fit in memory.</li>
            </ul>
            <ul className="Article__notes">
                <li>Counts represent block accesses, not distinct rows or physical disk reads.</li>
                <li>A parent&apos;s counts include its children. Do not add parent and child counts together.</li>
                <li>Read the <a href="https://www.postgresql.org/docs/current/sql-explain.html" className="Link">BUFFERS definitions</a> with the node that reports them.</li>
            </ul>
            <ul className="Article__notes">
                <li>A disk sort or a hash with multiple batches can indicate that the operation did not fit in memory.</li>
                <li>Check how many rows and columns enter that operation before changing memory settings.</li>
                <li>Repeated runs can be faster because PostgreSQL or the operating system has cached the pages.</li>
                <li>Compare several runs under similar conditions.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="planner-statistics">
            <h2 id="planner-statistics" className="SectionTitle">Check planner statistics</h2>
            <ul className="Article__notes">
                <li>The planner uses statistics about row counts and how values are distributed.</li>
                <li>If it expects 10 rows but receives 50,000, it may choose a scan or join based on a poor estimate.</li>
                <li>Find the earliest large mismatch in the plan. The final node may receive rows from an earlier poor estimate.</li>
            </ul>
            <CodeBlock language="sql">{'ANALYZE orders_plan_demo;'}</CodeBlock>
            <ul className="Article__notes">
                <li><code>ANALYZE</code> refreshes statistics.</li>
                <li>It does not create an index or rewrite a query.</li>
                <li>Autovacuum normally runs automatic analysis for regular tables.</li>
                <li>Temporary tables need manual analysis.</li>
                <li>Check statistics again after a large data change.</li>
                <li>See the <a href="https://www.postgresql.org/docs/current/sql-analyze.html" className="Link">ANALYZE reference</a>.</li>
            </ul>
            <ul className="Article__notes">
                <li>Fresh statistics do not guarantee correct estimates.</li>
                <li>Skewed values are values that appear much more often than others. They can affect estimates.</li>
                <li>Correlated columns have related values. They can affect estimates too.</li>
                <li>Expressions and plans that depend on parameter values can also affect estimates.</li>
                <li>PostgreSQL can collect extended statistics for related columns.</li>
                <li>Consider extended statistics when measurements show an estimate problem that they can address.</li>
                <li>See <a href="https://www.postgresql.org/docs/current/planner-stats.html" className="Link">planner statistics</a>.</li>
            </ul>
            <ul className="Article__notes">
                <li><code>VACUUM</code> handles dead row versions and visibility information.</li>
                <li><code>VACUUM ANALYZE</code> also collects statistics.</li>
                <li>These maintenance operations do not guarantee a fix for every slow query.</li>
                <li>See the <a href="https://www.postgresql.org/docs/current/sql-vacuum.html" className="Link">VACUUM reference</a>.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="compare-query-plans">
            <h2 id="compare-query-plans" className="SectionTitle">Compare before and after</h2>
            <ul className="Article__notes">
                <li>Save the original plan for the customer lookup above.</li>
                <li>Add one candidate index and measure the same query.</li>
            </ul>
            <CodeBlock language="sql">{addIndex}</CodeBlock>
            <ul className="Article__notes">
                <li>All 100 matching orders still belong in the result.</li>
                <li>The index changes how PostgreSQL can find them.</li>
                <li>For this query, PostgreSQL may choose a bitmap scan or an index scan.</li>
                <li>The plan below shows one possible set of nodes. It omits measurements.</li>
            </ul>
            <CodeBlock language="text">{`Bitmap Heap Scan on orders_plan_demo
  Recheck Cond: (customer_id = 42)
  -> Bitmap Index Scan on orders_plan_demo_customer_idx
       Index Cond: (customer_id = 42)`}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Compare</th><th scope="col">Evidence to collect</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">Correctness</th><td>Same rows and values. Preserve ORDER BY if ordering is required.</td></tr>
                        <tr><th scope="row">Estimates</th><td>Estimated versus actual rows at scans and joins.</td></tr>
                        <tr><th scope="row">Work</th><td>Rows filtered, loops, buffer accesses, heap fetches, and spills.</td></tr>
                        <tr><th scope="row">Timing</th><td>Planning and execution time over several comparable runs.</td></tr>
                        <tr><th scope="row">Tradeoffs</th><td>Index size, build cost, and additional write work.</td></tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>Using an index does not prove that the query became faster.</li>
                <li>A sequential scan can still cost less.</li>
                <li>See <a href={toHref(POSTGRESQL_INDEXING_ROUTE)} className="Link">indexing in PostgreSQL</a> to choose columns, conditions, and an index type.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="query-analysis-checklist">
            <h2 id="query-analysis-checklist" className="SectionTitle">Investigate a slow query</h2>
            <ol className="Article__steps">
                <li>Record the exact SQL, parameter values, expected result, and relevant table sizes.</li>
                <li>Use <code>EXPLAIN</code> first. Measure a SELECT with <code>ANALYZE</code> and <code>BUFFERS</code> when executing it is appropriate.</li>
                <li>Find estimate mismatches, large repeated inner scans, excess filtering, and sorts or hashes that spill to disk.</li>
                <li>Use those fields to form one explanation. For example, a selective predicate (a condition that matches few rows) has no matching index.</li>
                <li>Change one thing without changing the query&apos;s meaning. Compare the same queries and parameter values again.</li>
                <li>Include common, rare, and no-match parameter values. A fast result for one customer does not cover every customer.</li>
            </ol>
            <ul className="Article__notes">
                <li>If database execution is fast but the application is slow, measure connection waits, locks, network transfer, and application processing.</li>
                <li>A plan alone cannot establish the cause of the full request delay.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default PostgreSQLQueryAnalysis;
