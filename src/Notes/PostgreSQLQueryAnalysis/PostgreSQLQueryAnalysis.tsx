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
            <p>
                An execution plan shows how PostgreSQL reads rows, joins tables, sorts, and computes
                aggregates. Use it to find where a query does work. An index recommendation becomes
                evidence only after you measure the query with representative data and parameters.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="query-analysis-sample">
            <h2 id="query-analysis-sample" className="SectionTitle">Create sample data</h2>
            <p>
                Run this in a practice session. The temporary table disappears when the session ends.
                It has 100,000 orders and 1,000 customer IDs. Each customer has 100 orders.
                Keep using the same session for the later examples.
            </p>
            <CodeBlock language="sql">{sampleData}</CodeBlock>
            <p>Expected result of the last SELECT, calculated from the sample formula:</p>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">order_id</th><th scope="col">total</th></tr></thead>
                    <tbody><tr><td>42</td><td>1.42</td></tr><tr><td>1042</td><td>11.42</td></tr></tbody>
                </table>
            </div>
            <p>
                The primary key already indexes <code>order_id</code>. It does not create an index
                on <code>customer_id</code>. This dataset is for learning plan fields. It does not
                model production concurrency or a production data distribution.
            </p>
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
            <p>
                These commands return a plan, rather than the selected order rows. A slow query still
                takes time to execute under <code>EXPLAIN ANALYZE</code>. It also adds measurement
                overhead. The default measurement excludes sending result rows over the network.
            </p>
            <p>
                <code>ANALYZE orders_plan_demo</code> collects planner statistics. The{' '}
                <code>ANALYZE</code> option inside <code>EXPLAIN</code> executes the query.
                They are different commands with different purposes.
            </p>
            <p>
                <code>EXPLAIN ANALYZE UPDATE ...</code> actually updates rows. Use plain{' '}
                <code>EXPLAIN</code> for an estimate or a disposable environment for measuring
                writes. A transaction rollback can undo transactional data changes, but it cannot
                undo every side effect, such as consumed{' '}
                <a className="Link" href="https://www.postgresql.org/docs/current/functions-sequence.html">sequence values</a>{' '}
                or external effects from
                functions. See the{' '}
                <a className="Link" href="https://www.postgresql.org/docs/current/sql-explain.html">EXPLAIN reference</a>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="read-plan-fields">
            <h2 id="read-plan-fields" className="SectionTitle">Read the plan fields</h2>
            <p>
                This is an illustrative plan with invented costs, timing, and buffer counts.
                It was not captured by running the sample. Your numbers and chosen nodes can differ.
            </p>
            <CodeBlock language="text">{illustrativePlan}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Field</th><th scope="col">Meaning in this example</th></tr></thead>
                    <tbody>
                        <tr><th scope="row"><code>cost=0.00..1800.00</code></th><td>Estimated startup and total cost in planner units, not milliseconds.</td></tr>
                        <tr><th scope="row"><code>rows=100</code></th><td>Estimated rows emitted by the node, not rows examined.</td></tr>
                        <tr><th scope="row"><code>width=10</code></th><td>Estimated average output row size in bytes.</td></tr>
                        <tr><th scope="row"><code>actual time=0.010..8.000</code></th><td>Measured time to first row and completion, in milliseconds.</td></tr>
                        <tr><th scope="row"><code>actual rows=100 loops=1</code></th><td>100 rows emitted in one execution of this node.</td></tr>
                        <tr><th scope="row"><code>Rows Removed by Filter: 99900</code></th><td>Rows examined here and rejected by the filter.</td></tr>
                        <tr><th scope="row"><code>Planning Time</code></th><td>Time spent planning.</td></tr>
                        <tr><th scope="row"><code>Execution Time</code></th><td>Overall executor time, including instrumentation.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                Indentation shows parent and child nodes. Start with the scans, then follow their
                rows into joins, sorts, and aggregates. Parent timing includes child work. Do not
                add all node times together.
            </p>
            <p>
                For a repeated node, actual rows and times are averages per loop.
                A node showing <code>rows=2 loops=500</code> emitted about 1,000 rows across its
                executions. Compare estimated and actual rows at the same node. Read the{' '}
                <a className="Link" href="https://www.postgresql.org/docs/current/using-explain.html">plan-reading guide</a>{' '}
                for the full field definitions.
            </p>
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
                        <tr><th scope="row">Hash Join</th><td>Builds a hash table from one input, then probes it with the other.</td></tr>
                        <tr><th scope="row">Merge Join</th><td>Combines inputs ordered by the join keys. Indexes or sorts can supply that order.</td></tr>
                        <tr><th scope="row">Sort / Aggregate</th><td>Orders rows or computes groups and aggregate results.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                <code>Index Cond</code> identifies an index search condition. A <code>Filter</code>
                rejects rows after retrieval at that node. A <code>Recheck Cond</code> is a condition
                checked again on table rows, for example with a lossy bitmap. Many removed rows
                suggest excess work, but they do not prove that an index will help.
            </p>
            <p>
                No join algorithm is always fastest. First confirm the expected result size.
                A one-to-many join can correctly produce many rows. See{' '}
                <a className="Link" href={toHref(POSTGRESQL_JOINS_ROUTE)}>joins in PostgreSQL</a>{' '}
                before treating row multiplication as a performance defect.
            </p>
            <p>
                PostgreSQL describes the scan and join choices in its{' '}
                <a className="Link" href="https://www.postgresql.org/docs/current/planner-optimizer.html">planner overview</a>.
                Read about{' '}
                <a className="Link" href="https://www.postgresql.org/docs/current/indexes-bitmap-scans.html">combining indexes with bitmaps</a>{' '}
                and{' '}
                <a className="Link" href="https://www.postgresql.org/docs/current/indexes-index-only-scans.html">index-only scans</a>{' '}
                for their specific limits.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="read-buffers">
            <h2 id="read-buffers" className="SectionTitle">Read buffer usage</h2>
            <ul className="Article__notes">
                <li><code>shared hit</code>: regular table or index blocks found in PostgreSQL's shared cache.</li>
                <li><code>shared read</code>: blocks loaded into that cache. The operating system may still have served them from its cache.</li>
                <li><code>local hit/read</code>: temporary table and index blocks. Our sample uses a temporary table.</li>
                <li><code>temp read/written</code>: temporary working files, such as a sort or hash that spills to disk.</li>
            </ul>
            <p>
                Counts represent block accesses, not distinct rows or a count of physical disk reads.
                A parent's counts include its children. Do not add parent and child counts together.
                Read the{' '}
                <a className="Link" href="https://www.postgresql.org/docs/current/sql-explain.html">BUFFERS definitions</a>{' '}
                alongside the node that reports them.
            </p>
            <p>
                A disk sort or a hash with multiple batches gives a specific memory-related lead.
                Check how many rows and columns enter that operation before changing memory settings.
                Repeated runs can be faster because pages are cached. Compare several runs under
                similar conditions.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="planner-statistics">
            <h2 id="planner-statistics" className="SectionTitle">Check planner statistics</h2>
            <p>
                The planner uses statistics about row counts and value distributions. If it expects
                10 rows but receives 50,000, its join or scan choice may be based on a poor estimate.
                Find the earliest large mismatch in the plan instead of blaming only the final node.
            </p>
            <CodeBlock language="sql">{'ANALYZE orders_plan_demo;'}</CodeBlock>
            <p>
                <code>ANALYZE</code> refreshes statistics. It does not create an index or rewrite a
                query. Autovacuum normally runs automatic analysis for regular tables. Temporary
                tables need manual analysis. Check again after a large data change.
                See the{' '}
                <a className="Link" href="https://www.postgresql.org/docs/current/sql-analyze.html">ANALYZE reference</a>.
            </p>
            <p>
                Fresh statistics do not guarantee correct estimates. Skewed values, correlated
                columns, expressions, and parameter-dependent plans can still matter. PostgreSQL
                can collect extended statistics for related columns. Consider them only when a
                measured estimate problem calls for them. See{' '}
                <a className="Link" href="https://www.postgresql.org/docs/current/planner-stats.html">planner statistics</a>.
            </p>
            <p>
                <code>VACUUM</code> handles dead row versions and visibility information.
                <code> VACUUM ANALYZE</code> also collects statistics. These are maintenance operations,
                rather than a guaranteed fix for every slow query. See the{' '}
                <a className="Link" href="https://www.postgresql.org/docs/current/sql-vacuum.html">VACUUM reference</a>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="compare-query-plans">
            <h2 id="compare-query-plans" className="SectionTitle">Compare before and after</h2>
            <p>
                Save the baseline plan for the customer lookup above. Then add one candidate index
                and measure the identical query:
            </p>
            <CodeBlock language="sql">{addIndex}</CodeBlock>
            <p>
                All 100 matching orders still belong in the result. The index changes how PostgreSQL
                can find them. For this query it may choose a bitmap scan or an index scan. This is
                a possible abbreviated shape, with measurements omitted:
            </p>
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
            <p>
                An index being used does not prove the query became faster. A sequential scan can
                remain the cheaper choice. See{' '}
                <a className="Link" href={toHref(POSTGRESQL_INDEXING_ROUTE)}>indexing in PostgreSQL</a>{' '}
                for choosing the columns, predicates, and index type.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="query-analysis-checklist">
            <h2 id="query-analysis-checklist" className="SectionTitle">Investigate a slow query</h2>
            <ol className="Article__steps">
                <li>Capture the exact SQL, parameter values, expected result, and relevant table sizes.</li>
                <li>Use EXPLAIN first. Measure a SELECT with ANALYZE and BUFFERS when executing it is appropriate.</li>
                <li>Find estimate mismatches, large repeated inner scans, excess filtering, and sorts or hashes that spill.</li>
                <li>Form one explanation tied to those fields. For example, a selective customer predicate has no matching index.</li>
                <li>Change one thing, preserve query semantics, and compare the same workload again.</li>
                <li>Include common, rare, and no-match parameter values. A fast result for one customer does not cover every customer.</li>
            </ol>
            <p>
                If database execution is fast but the application is slow, also measure connection
                waits, locks, network transfer, and application processing. A plan alone cannot
                establish the cause of the full request delay.
            </p>
        </section>
    </ArticleLayout>
);

export default PostgreSQLQueryAnalysis;
