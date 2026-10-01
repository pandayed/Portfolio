import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import {
    POSTGRESQL_NOTES_ROUTE,
    POSTGRESQL_WINDOW_FUNCTIONS_ROUTE,
} from '../../routing/routes';
import { sections } from './sections';

const sampleData = `CREATE TEMP TABLE sales (
    sale_id integer PRIMARY KEY,
    region text NOT NULL,
    person text NOT NULL,
    amount integer NOT NULL
);

INSERT INTO sales (sale_id, region, person, amount) VALUES
    (1, 'East', 'Ada', 100),
    (2, 'East', 'Ben', 150),
    (3, 'East', 'Cam', 150),
    (4, 'West', 'Dia', 80),
    (5, 'West', 'Eli', 120);`;

const partitionQuery = `SELECT
    sale_id, region, person, amount,
    SUM(amount) OVER (PARTITION BY region) AS region_total
FROM sales
ORDER BY region, sale_id;`;

const rankingQuery = `SELECT
    region, person, amount,
    ROW_NUMBER() OVER (
        PARTITION BY region ORDER BY amount DESC, sale_id
    ) AS row_number,
    RANK() OVER (
        PARTITION BY region ORDER BY amount DESC
    ) AS rank,
    DENSE_RANK() OVER (
        PARTITION BY region ORDER BY amount DESC
    ) AS dense_rank
FROM sales
ORDER BY region, amount DESC, sale_id;`;

const runningTotalQuery = `SELECT
    region, person, amount,
    SUM(amount) OVER (
        PARTITION BY region
        ORDER BY sale_id
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM sales
ORDER BY region, sale_id;`;

const peerFrameQuery = `SELECT
    person, amount,
    SUM(amount) OVER (ORDER BY amount) AS default_frame_total
FROM sales
WHERE region = 'East'
ORDER BY amount, sale_id;`;

const nearbyRowsQuery = `SELECT
    region, person, amount,
    LAG(amount) OVER (
        PARTITION BY region ORDER BY sale_id
    ) AS previous_amount,
    LEAD(amount) OVER (
        PARTITION BY region ORDER BY sale_id
    ) AS next_amount
FROM sales
ORDER BY region, sale_id;`;

const topSaleQuery = `SELECT region, person, amount
FROM (
    SELECT
        region, person, amount,
        ROW_NUMBER() OVER (
            PARTITION BY region ORDER BY amount DESC, sale_id
        ) AS position
    FROM sales
) AS ranked_sales
WHERE position = 1
ORDER BY region;`;

const PostgreSQLWindowFunctions = () => (
    <ArticleLayout
        title="Window functions in PostgreSQL"
        route={POSTGRESQL_WINDOW_FUNCTIONS_ROUTE}
        sections={sections}
        backRoute={POSTGRESQL_NOTES_ROUTE}
        backLabel="Back to PostgreSQL notes"
    >
        <section className="Article__section">
            <p>
                A window function calculates a value from related rows while keeping each input row
                in the result. An aggregate with <code>GROUP BY</code> returns one row per group;
                an aggregate with <code>OVER (...)</code> can return a value beside every row.
            </p>
            <p>Run this sample data once to try the queries below:</p>
            <CodeBlock language="sql">{sampleData}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="partition-rows">
            <h2 id="partition-rows" className="SectionTitle">Partition rows</h2>
            <p>
                <code>PARTITION BY region</code> starts a separate calculation for each region.
                Without <code>PARTITION BY</code>, all rows form one partition. This query repeats
                each region total beside its sales:
            </p>
            <CodeBlock language="sql">{partitionQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">sale_id</th><th scope="col">region</th><th scope="col">person</th><th scope="col">amount</th><th scope="col">region_total</th></tr></thead>
                    <tbody>
                        <tr><td>1</td><td>East</td><td>Ada</td><td>100</td><td>400</td></tr>
                        <tr><td>2</td><td>East</td><td>Ben</td><td>150</td><td>400</td></tr>
                        <tr><td>3</td><td>East</td><td>Cam</td><td>150</td><td>400</td></tr>
                        <tr><td>4</td><td>West</td><td>Dia</td><td>80</td><td>200</td></tr>
                        <tr><td>5</td><td>West</td><td>Eli</td><td>120</td><td>200</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="rank-rows">
            <h2 id="rank-rows" className="SectionTitle">Rank rows</h2>
            <p>
                <code>ORDER BY</code> inside <code>OVER (...)</code> sets the order used by a window
                function. It does not set the final display order. The query-level{' '}
                <code>ORDER BY</code> does that.
            </p>
            <CodeBlock language="sql">{rankingQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">region</th><th scope="col">person</th><th scope="col">amount</th><th scope="col">row_number</th><th scope="col">rank</th><th scope="col">dense_rank</th></tr></thead>
                    <tbody>
                        <tr><td>East</td><td>Ben</td><td>150</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>East</td><td>Cam</td><td>150</td><td>2</td><td>1</td><td>1</td></tr>
                        <tr><td>East</td><td>Ada</td><td>100</td><td>3</td><td>3</td><td>2</td></tr>
                        <tr><td>West</td><td>Eli</td><td>120</td><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>West</td><td>Dia</td><td>80</td><td>2</td><td>2</td><td>2</td></tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>ROW_NUMBER()</code> gives each row a different number. <code>sale_id</code> settles the tie between Ben and Cam.</li>
                <li><code>RANK()</code> gives tied amounts the same rank and leaves a gap after the tie.</li>
                <li><code>DENSE_RANK()</code> gives tied amounts the same rank without a gap.</li>
            </ul>
            <p>
                The rank windows sort only by amount, so Ben and Cam stay tied. Adding{' '}
                <code>sale_id</code> there would give them different ranks.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="totals-and-frames">
            <h2 id="totals-and-frames" className="SectionTitle">Totals and frames</h2>
            <p>
                A frame is the set of rows considered for a frame-sensitive function at the current
                row. The earlier total had no window <code>ORDER BY</code>, so <code>SUM</code> used the
                whole partition. This query gives a running total in sale order:
            </p>
            <CodeBlock language="sql">{runningTotalQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">region</th><th scope="col">person</th><th scope="col">amount</th><th scope="col">running_total</th></tr></thead>
                    <tbody>
                        <tr><td>East</td><td>Ada</td><td>100</td><td>100</td></tr>
                        <tr><td>East</td><td>Ben</td><td>150</td><td>250</td></tr>
                        <tr><td>East</td><td>Cam</td><td>150</td><td>400</td></tr>
                        <tr><td>West</td><td>Dia</td><td>80</td><td>80</td></tr>
                        <tr><td>West</td><td>Eli</td><td>120</td><td>200</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                The explicit <code>ROWS</code> frame includes rows from the start of each region
                through the current row. With a window <code>ORDER BY</code> and no explicit frame,
                PostgreSQL also includes later rows tied on the sort value. For East, both sales of
                150 enter the default frame together:
            </p>
            <CodeBlock language="sql">{peerFrameQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">person</th><th scope="col">amount</th><th scope="col">default_frame_total</th></tr></thead>
                    <tbody>
                        <tr><td>Ada</td><td>100</td><td>100</td></tr>
                        <tr><td>Ben</td><td>150</td><td>400</td></tr>
                        <tr><td>Cam</td><td>150</td><td>400</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="compare-nearby-rows">
            <h2 id="compare-nearby-rows" className="SectionTitle">Compare nearby rows</h2>
            <p>
                <code>LAG</code> reads an earlier row in the partition. <code>LEAD</code> reads a
                later row. Their default offset is one row, and they return <code>NULL</code> when
                that row does not exist.
            </p>
            <CodeBlock language="sql">{nearbyRowsQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">region</th><th scope="col">person</th><th scope="col">amount</th><th scope="col">previous_amount</th><th scope="col">next_amount</th></tr></thead>
                    <tbody>
                        <tr><td>East</td><td>Ada</td><td>100</td><td>NULL</td><td>150</td></tr>
                        <tr><td>East</td><td>Ben</td><td>150</td><td>100</td><td>150</td></tr>
                        <tr><td>East</td><td>Cam</td><td>150</td><td>150</td><td>NULL</td></tr>
                        <tr><td>West</td><td>Dia</td><td>80</td><td>NULL</td><td>120</td></tr>
                        <tr><td>West</td><td>Eli</td><td>120</td><td>80</td><td>NULL</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="Article__section" aria-labelledby="filter-window-results">
            <h2 id="filter-window-results" className="SectionTitle">Filter window results</h2>
            <p>
                PostgreSQL allows window functions in a query&apos;s <code>SELECT</code> list and
                query-level <code>ORDER BY</code>. To filter by a window result, calculate it in a
                subquery and filter in the outer query. This keeps one highest sale per region:
            </p>
            <CodeBlock language="sql">{topSaleQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">region</th><th scope="col">person</th><th scope="col">amount</th></tr></thead>
                    <tbody>
                        <tr><td>East</td><td>Ben</td><td>150</td></tr>
                        <tr><td>West</td><td>Eli</td><td>120</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                The <code>sale_id</code> tie-breaker chooses Ben before Cam. If tied top sales
                should all remain, use <code>RANK()</code> with <code>ORDER BY amount DESC</code>
                and filter for rank 1 instead.
            </p>
            <p>
                For more detail, see the{' '}
                <a className="Link" href="https://www.postgresql.org/docs/current/tutorial-window.html">
                    PostgreSQL window functions tutorial
                </a>
                {' '}and the{' '}
                <a className="Link" href="https://www.postgresql.org/docs/current/functions-window.html">
                    window function reference
                </a>.
            </p>
        </section>
    </ArticleLayout>
);

export default PostgreSQLWindowFunctions;
