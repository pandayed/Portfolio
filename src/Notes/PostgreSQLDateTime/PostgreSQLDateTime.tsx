import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import {
    POSTGRESQL_DATE_TIME_ROUTE,
    POSTGRESQL_NOTES_ROUTE,
    POSTGRESQL_WINDOW_FUNCTIONS_ROUTE,
    toHref,
} from '../../routing/routes';
import { sections } from './sections';

const typedValuesQuery = `SELECT
    DATE '2026-03-15' AS calendar_date,
    TIME '14:30:00' AS wall_clock_time,
    TIMESTAMP '2026-03-15 14:30:00' AS local_timestamp,
    TIMESTAMPTZ '2026-03-15 14:30:00+05:30' AS instant,
    INTERVAL '2 days 3 hours' AS duration;`;

const makeValuesQuery = `SELECT
    make_date(2026, 3, 15) AS made_date,
    make_time(14, 30, 0) AS made_time,
    make_timestamp(2026, 3, 15, 14, 30, 0) AS made_timestamp,
    make_timestamptz(2026, 3, 15, 14, 30, 0, 'Asia/Kolkata') AS made_instant,
    make_interval(days => 2, hours => 3) AS made_interval;`;

const currentTimeQuery = `SELECT
    CURRENT_DATE,
    CURRENT_TIME,
    CURRENT_TIMESTAMP,
    LOCALTIME,
    LOCALTIMESTAMP,
    statement_timestamp(),
    clock_timestamp();`;

const extractQuery = `SELECT
    EXTRACT(YEAR FROM DATE '2026-03-15') AS year,
    EXTRACT(QUARTER FROM DATE '2026-03-15') AS quarter,
    EXTRACT(MONTH FROM DATE '2026-03-15') AS month,
    EXTRACT(DAY FROM DATE '2026-03-15') AS day,
    EXTRACT(ISODOW FROM DATE '2026-03-15') AS iso_weekday,
    EXTRACT(WEEK FROM DATE '2026-03-15') AS iso_week;`;

const truncateQuery = `SELECT
    date_trunc('day', TIMESTAMP '2026-03-15 14:37:52') AS day_start,
    date_trunc('week', TIMESTAMP '2026-03-15 14:37:52') AS week_start,
    date_trunc('month', TIMESTAMP '2026-03-15 14:37:52') AS month_start,
    date_trunc('quarter', TIMESTAMP '2026-03-15 14:37:52') AS quarter_start;`;

const groupByMonthQuery = `SELECT
    date_trunc('month', created_at) AS month_start,
    COUNT(*) AS order_count
FROM orders
GROUP BY date_trunc('month', created_at)
ORDER BY month_start;`;

const dateBinQuery = `SELECT date_bin(
    INTERVAL '15 minutes',
    TIMESTAMP '2026-03-15 14:37:52',
    TIMESTAMP '2000-01-01 00:00:00'
) AS bucket_start;`;

const arithmeticQuery = `SELECT
    DATE '2026-03-15' + 7 AS seven_days_later,
    DATE '2026-03-15' - DATE '2026-03-01' AS days_between,
    TIMESTAMP '2026-03-15 14:30:00' + INTERVAL '2 hours' AS two_hours_later,
    TIMESTAMP '2026-03-15 14:30:00' - TIMESTAMP '2026-03-14 12:00:00'
        AS elapsed_time;`;

const ageQuery = `SELECT
    AGE(DATE '2026-03-15', DATE '1995-11-20') AS calendar_age,
    EXTRACT(YEAR FROM AGE(DATE '2026-03-15', DATE '1995-11-20'))
        AS completed_years;`;

const monthBoundaryQuery = `SELECT
    date_trunc('month', DATE '2026-03-15')::date AS first_day,
    (
        date_trunc('month', DATE '2026-03-15')
        + INTERVAL '1 month - 1 day'
    )::date AS last_day;`;

const safeRangeQuery = `-- All rows in March 2026, including timestamps with fractional seconds.
WHERE created_at >= TIMESTAMP '2026-03-01 00:00:00'
  AND created_at <  TIMESTAMP '2026-04-01 00:00:00'`;

const recentRangeQuery = `-- A moving 30-day interval ending at the transaction start time.
WHERE created_at >= CURRENT_TIMESTAMP - INTERVAL '30 days'
  AND created_at <  CURRENT_TIMESTAMP`;

const calendarRangeQueries = `-- Today in the session time zone.
WHERE created_at >= CURRENT_DATE
  AND created_at <  CURRENT_DATE + 1

-- The current calendar month.
WHERE created_at >= date_trunc('month', CURRENT_DATE)
  AND created_at <  date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'

-- The previous calendar month.
WHERE created_at >= date_trunc('month', CURRENT_DATE) - INTERVAL '1 month'
  AND created_at <  date_trunc('month', CURRENT_DATE)`;

const timeZoneQuery = `SELECT
    TIMESTAMPTZ '2026-01-15 12:00:00+00'
        AT TIME ZONE 'Asia/Kolkata' AS kolkata_local_time,
    TIMESTAMPTZ '2026-01-15 12:00:00+00'
        AT TIME ZONE 'America/New_York' AS new_york_local_time;`;

const attachTimeZoneQuery = `-- Treat this zone-less value as a wall-clock time in Asia/Kolkata.
SELECT TIMESTAMP '2026-01-15 17:30:00'
       AT TIME ZONE 'Asia/Kolkata' AS instant;`;

const formatParseQuery = `SELECT
    TO_CHAR(TIMESTAMP '2026-03-15 14:30:00', 'YYYY-MM-DD HH24:MI')
        AS display_text,
    TO_DATE('15/03/2026', 'DD/MM/YYYY') AS parsed_date,
    TO_TIMESTAMP('15/03/2026 14:30', 'DD/MM/YYYY HH24:MI')
        AS parsed_timestamp;`;

const calendarQuery = `SELECT day::date
FROM generate_series(
    DATE '2026-03-01',
    DATE '2026-03-05',
    INTERVAL '1 day'
) AS days(day);`;

const fillMissingDatesQuery = `WITH calendar AS (
    SELECT day::date
    FROM generate_series(
        DATE '2026-03-01',
        DATE '2026-03-31',
        INTERVAL '1 day'
    ) AS days(day)
)
SELECT
    calendar.day,
    COUNT(orders.order_id) AS order_count
FROM calendar
LEFT JOIN orders ON orders.created_at >= calendar.day
                AND orders.created_at < calendar.day + 1
GROUP BY calendar.day
ORDER BY calendar.day;`;

const overlapQuery = `SELECT (
    TIMESTAMP '2026-03-15 09:00',
    TIMESTAMP '2026-03-15 11:00'
) OVERLAPS (
    TIMESTAMP '2026-03-15 10:30',
    TIMESTAMP '2026-03-15 12:00'
) AS periods_overlap;`;

const latestPerGroupQuery = `SELECT customer_id, order_id, created_at
FROM (
    SELECT
        customer_id,
        order_id,
        created_at,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id
            ORDER BY created_at DESC, order_id DESC
        ) AS position
    FROM orders
) AS ranked_orders
WHERE position = 1;`;

const firstLastQuery = `SELECT
    MIN(order_date) AS first_order_date,
    MAX(order_date) AS last_order_date
FROM orders;`;

const gapsQuery = `SELECT
    customer_id,
    created_at,
    created_at - LAG(created_at) OVER (
        PARTITION BY customer_id
        ORDER BY created_at
    ) AS time_since_previous_order
FROM orders;`;

const streaksQuery = `WITH distinct_days AS (
    SELECT DISTINCT user_id, activity_date
    FROM activity
), numbered AS (
    SELECT
        user_id,
        activity_date,
        activity_date - (
            ROW_NUMBER() OVER (
                PARTITION BY user_id ORDER BY activity_date
            )::integer
        ) AS streak_group
    FROM distinct_days
)
SELECT
    user_id,
    MIN(activity_date) AS streak_start,
    MAX(activity_date) AS streak_end,
    COUNT(*) AS streak_days
FROM numbered
GROUP BY user_id, streak_group
ORDER BY user_id, streak_start;`;

const monthOverMonthQuery = `WITH monthly AS (
    SELECT
        date_trunc('month', created_at)::date AS month,
        SUM(amount) AS total
    FROM orders
    GROUP BY date_trunc('month', created_at)::date
)
SELECT
    month,
    total,
    LAG(total) OVER (ORDER BY month) AS previous_total,
    total - LAG(total) OVER (ORDER BY month) AS absolute_change
FROM monthly
ORDER BY month;`;

const PostgreSQLDateTime = () => (
    <ArticleLayout
        title="Date and time in PostgreSQL"
        route={POSTGRESQL_DATE_TIME_ROUTE}
        sections={sections}
        backRoute={POSTGRESQL_NOTES_ROUTE}
        backLabel="Back to PostgreSQL notes"
    >
        <section className="Article__section">
            <p>
                PostgreSQL uses typed date, time, timestamp, and interval values. Keep values in
                those types while filtering, sorting, joining, and calculating. Convert them to
                text only when the result is ready for display.
            </p>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead>
                        <tr><th scope="col">Task</th><th scope="col">Main tool</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Current date or time</td><td><code>CURRENT_DATE</code>, <code>CURRENT_TIMESTAMP</code>, <code>clock_timestamp()</code></td></tr>
                        <tr><td>Get year, month, weekday, or epoch</td><td><code>EXTRACT</code></td></tr>
                        <tr><td>Group by hour, day, month, or quarter</td><td><code>date_trunc</code></td></tr>
                        <tr><td>Group into a custom time width</td><td><code>date_bin</code></td></tr>
                        <tr><td>Add or subtract time</td><td><code>+</code>, <code>-</code>, <code>INTERVAL</code></td></tr>
                        <tr><td>Calendar-style age</td><td><code>AGE</code></td></tr>
                        <tr><td>Convert a time zone</td><td><code>AT TIME ZONE</code></td></tr>
                        <tr><td>Format for display</td><td><code>TO_CHAR</code></td></tr>
                        <tr><td>Parse non-standard text</td><td><code>TO_DATE</code>, <code>TO_TIMESTAMP</code></td></tr>
                        <tr><td>Create calendar rows</td><td><code>generate_series</code></td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                Reference: the official PostgreSQL documentation for{' '}
                <a className="Link" href="https://www.postgresql.org/docs/current/functions-datetime.html" target="_blank" rel="noreferrer">
                    date and time functions
                </a>{' '}
                and{' '}
                <a className="Link" href="https://www.postgresql.org/docs/current/datatype-datetime.html" target="_blank" rel="noreferrer">
                    date and time types
                </a>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="choose-a-type">
            <h2 id="choose-a-type" className="SectionTitle">Choose a date or time type</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead>
                        <tr><th scope="col">Type</th><th scope="col">Stores</th><th scope="col">Common use</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code>date</code></td><td>Calendar date</td><td>Birthday, due date, business day</td></tr>
                        <tr><td><code>time</code></td><td>Time of day without a date</td><td>Daily opening time</td></tr>
                        <tr><td><code>timestamp</code></td><td>Date and time without a time zone</td><td>A local wall-clock value whose zone is stored elsewhere or does not apply</td></tr>
                        <tr><td><code>timestamptz</code></td><td>An instant in time</td><td>Created-at, updated-at, logs, scheduled events</td></tr>
                        <tr><td><code>interval</code></td><td>A length of time</td><td>Seven days, three months, two hours</td></tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>timestamp</code> means <code>timestamp without time zone</code>.</li>
                <li><code>timestamptz</code> means <code>timestamp with time zone</code>. PostgreSQL stores the instant and displays it in the session time zone. It does not keep the original zone name.</li>
                <li><code>time with time zone</code> has no date for daylight-saving rules. It is rarely the right application type.</li>
                <li>Use ISO input such as <code>YYYY-MM-DD</code>. Values such as <code>01/02/2026</code> depend on the <code>DateStyle</code> setting.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="create-values">
            <h2 id="create-values" className="SectionTitle">Create date and time values</h2>
            <p>
                Typed literals make the intended type clear. A time-zone offset belongs on a
                <code>timestamptz</code> value, not on a plain <code>timestamp</code> value.
            </p>
            <CodeBlock language="sql">{typedValuesQuery}</CodeBlock>
            <p>
                Use constructor functions when the fields come from separate values. Invalid fields,
                such as month 13, raise an error instead of being silently normalized.
            </p>
            <CodeBlock language="sql">{makeValuesQuery}</CodeBlock>
            <p>
                Standard ISO text can be cast directly, for example{' '}
                <code>'2026-03-15'::date</code>. Use parsing functions only when the input format is
                not a standard date or timestamp format.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="current-date-time">
            <h2 id="current-date-time" className="SectionTitle">Get the current date and time</h2>
            <CodeBlock language="sql">{currentTimeQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead>
                        <tr><th scope="col">Expression</th><th scope="col">Meaning</th><th scope="col">Time zone</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code>CURRENT_DATE</code></td><td>Transaction start date</td><td>Session zone decides the date</td></tr>
                        <tr><td><code>CURRENT_TIMESTAMP</code> / <code>NOW()</code></td><td>Transaction start instant</td><td>With time zone</td></tr>
                        <tr><td><code>CURRENT_TIME</code></td><td>Transaction start time</td><td>With time zone</td></tr>
                        <tr><td><code>LOCALTIME</code></td><td>Transaction start time</td><td>Without time zone</td></tr>
                        <tr><td><code>LOCALTIMESTAMP</code></td><td>Transaction start date and time</td><td>Without time zone</td></tr>
                        <tr><td><code>statement_timestamp()</code></td><td>Start of the current statement</td><td>With time zone</td></tr>
                        <tr><td><code>clock_timestamp()</code></td><td>Actual clock time at the call</td><td>With time zone</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                <code>CURRENT_TIMESTAMP</code> and <code>NOW()</code> stay fixed during a transaction.
                Use <code>clock_timestamp()</code> only when the value must advance during a statement
                or transaction. Do not use <code>TIMESTAMP 'now'</code> in a column default because it
                can be converted when the definition is parsed. Use <code>DEFAULT CURRENT_TIMESTAMP</code>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="extract-parts">
            <h2 id="extract-parts" className="SectionTitle">Extract date and time parts</h2>
            <p>
                <code>EXTRACT(field FROM value)</code> returns a <code>numeric</code> value. Common
                fields are <code>year</code>, <code>quarter</code>, <code>month</code>, <code>day</code>,
                <code>hour</code>, <code>minute</code>, <code>second</code>, <code>week</code>,{' '}
                <code>isodow</code>, <code>doy</code>, and <code>epoch</code>.
            </p>
            <CodeBlock language="sql">{extractQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">year</th><th scope="col">quarter</th><th scope="col">month</th><th scope="col">day</th><th scope="col">iso_weekday</th><th scope="col">iso_week</th></tr></thead>
                    <tbody><tr><td>2026</td><td>1</td><td>3</td><td>15</td><td>7</td><td>11</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>ISODOW</code> uses Monday 1 through Sunday 7. <code>DOW</code> uses Sunday 0 through Saturday 6.</li>
                <li>ISO week numbers can belong to a different year near New Year. Select <code>ISOYEAR</code> with <code>WEEK</code>.</li>
                <li><code>EXTRACT(EPOCH FROM timestamptz)</code> returns seconds from 1970-01-01 00:00:00 UTC. Convert epoch seconds back with <code>TO_TIMESTAMP(seconds)</code>.</li>
                <li><code>date_part</code> is similar, but it returns <code>double precision</code>. Prefer <code>EXTRACT</code>.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="truncate-and-bucket">
            <h2 id="truncate-and-bucket" className="SectionTitle">Truncate and bucket time</h2>
            <p>
                <code>date_trunc</code> moves a value to the start of a named unit. A PostgreSQL week
                starts on Monday.
            </p>
            <CodeBlock language="sql">{truncateQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">day_start</th><th scope="col">week_start</th><th scope="col">month_start</th><th scope="col">quarter_start</th></tr></thead>
                    <tbody><tr><td>2026-03-15 00:00</td><td>2026-03-09 00:00</td><td>2026-03-01 00:00</td><td>2026-01-01 00:00</td></tr></tbody>
                </table>
            </div>
            <p>Use the same expression in <code>SELECT</code>, <code>GROUP BY</code>, and <code>ORDER BY</code> when grouping rows:</p>
            <CodeBlock language="sql">{groupByMonthQuery}</CodeBlock>
            <p>
                <code>date_bin</code> creates fixed-width buckets such as 15 minutes. The origin
                aligns the bucket boundaries. Its stride cannot contain a month or a larger unit.
            </p>
            <CodeBlock language="sql">{dateBinQuery}</CodeBlock>
            <p>The bucket starts at <code>2026-03-15 14:30:00</code>.</p>
        </section>

        <section className="Article__section" aria-labelledby="date-arithmetic">
            <h2 id="date-arithmetic" className="SectionTitle">Add, subtract, and measure</h2>
            <p>
                Add an integer to a <code>date</code> to add days. Add an <code>interval</code> to a
                timestamp to add calendar or clock units.
            </p>
            <CodeBlock language="sql">{arithmeticQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">seven_days_later</th><th scope="col">days_between</th><th scope="col">two_hours_later</th><th scope="col">elapsed_time</th></tr></thead>
                    <tbody><tr><td>2026-03-22</td><td>14</td><td>2026-03-15 16:30</td><td>1 day 02:30</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>date - date</code> returns an integer number of days.</li>
                <li><code>timestamp - timestamp</code> returns an interval.</li>
                <li><code>INTERVAL '1 month'</code> is a calendar month, not 30 days. Month-end calculations can move to the last valid day of the target month.</li>
                <li>Across daylight-saving changes, <code>INTERVAL '1 day'</code> and <code>INTERVAL '24 hours'</code> can produce different local clock times for <code>timestamptz</code>.</li>
            </ul>
            <h3 className="Article__subTitle">Calendar age</h3>
            <p>
                <code>AGE(later, earlier)</code> returns years, months, and days. Extract its year
                field when an interview question asks for completed age in years. Use subtraction
                instead when the question asks for an exact number of days or an elapsed interval.
            </p>
            <CodeBlock language="sql">{ageQuery}</CodeBlock>
            <h3 className="Article__subTitle">First and last day of a month</h3>
            <CodeBlock language="sql">{monthBoundaryQuery}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="filter-ranges">
            <h2 id="filter-ranges" className="SectionTitle">Filter date and time ranges</h2>
            <p>
                Use a half-open range: include the start and exclude the next boundary. This works
                for values with hours, seconds, and fractional seconds.
            </p>
            <CodeBlock language="sql">{safeRangeQuery}</CodeBlock>
            <p>
                Avoid <code>BETWEEN '2026-03-01' AND '2026-03-31'</code> for timestamp columns. The
                upper value means midnight at the start of March 31, so most of that day is missing.
                A made-up end such as <code>23:59:59</code> can still miss fractional seconds.
            </p>
            <CodeBlock language="sql">{recentRangeQuery}</CodeBlock>
            <p>
                Calendar periods use calendar boundaries instead of a fixed number of elapsed days:
            </p>
            <CodeBlock language="sql">{calendarRangeQueries}</CodeBlock>
            <ul className="Article__notes">
                <li>“Last 30 days” is a moving 30-day interval. “This calendar month” uses month boundaries. They are different questions.</li>
                <li>Keep the indexed column bare in the filter. Prefer <code>created_at &gt;= ... AND created_at &lt; ...</code> over <code>created_at::date = ...</code> or <code>date_trunc(..., created_at) = ...</code>.</li>
                <li>Compare compatible types. A <code>date</code> compared with a <code>timestamptz</code> becomes midnight in the session time zone.</li>
                <li>For weekdays, use <code>EXTRACT(ISODOW FROM work_date) BETWEEN 1 AND 5</code>. This excludes weekends, not public holidays.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="time-zones">
            <h2 id="time-zones" className="SectionTitle">Work with time zones</h2>
            <p>
                Use <code>timestamptz</code> for an event that happened at one instant. Use an IANA
                zone such as <code>Asia/Kolkata</code> or <code>America/New_York</code> when daylight-
                saving rules matter.
            </p>
            <CodeBlock language="sql">{timeZoneQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">kolkata_local_time</th><th scope="col">new_york_local_time</th></tr></thead>
                    <tbody><tr><td>2026-01-15 17:30:00</td><td>2026-01-15 07:00:00</td></tr></tbody>
                </table>
            </div>
            <p>
                A <code>timestamptz AT TIME ZONE zone</code> expression returns the wall-clock
                <code>timestamp</code> in that zone. Going the other direction attaches a zone to a
                wall-clock value and returns a <code>timestamptz</code> instant:
            </p>
            <CodeBlock language="sql">{attachTimeZoneQuery}</CodeBlock>
            <ul className="Article__notes">
                <li><code>SET TIME ZONE 'UTC'</code> changes how the session displays <code>timestamptz</code> values. It does not rewrite stored instants.</li>
                <li>Zone names include historical and daylight-saving rules. A fixed offset such as <code>+05:30</code> does not.</li>
                <li>A local time can be missing or occur twice during a daylight-saving change. Define how the application handles those cases.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="format-and-parse">
            <h2 id="format-and-parse" className="SectionTitle">Format and parse values</h2>
            <CodeBlock language="sql">{formatParseQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">display_text</th><th scope="col">parsed_date</th></tr></thead>
                    <tbody><tr><td>2026-03-15 14:30</td><td>2026-03-15</td></tr></tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li><code>TO_CHAR</code> returns text. Do not use formatted text for date sorting, range filters, or date arithmetic.</li>
                <li><code>TO_DATE</code> returns a <code>date</code>. <code>TO_TIMESTAMP(text, format)</code> returns <code>timestamptz</code>.</li>
                <li>For ISO input, prefer a typed literal or cast. Use parsing functions for formats such as <code>DD/MM/YYYY</code>.</li>
                <li>Common output fields include <code>YYYY</code>, <code>MM</code>, <code>DD</code>, <code>HH24</code>, <code>MI</code>, <code>SS</code>, <code>Mon</code>, and <code>Day</code>.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="calendar-rows">
            <h2 id="calendar-rows" className="SectionTitle">Build calendar rows</h2>
            <p><code>generate_series</code> can return one row for each date or time step.</p>
            <CodeBlock language="sql">{calendarQuery}</CodeBlock>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">day</th></tr></thead>
                    <tbody>
                        <tr><td>2026-03-01</td></tr>
                        <tr><td>2026-03-02</td></tr>
                        <tr><td>2026-03-03</td></tr>
                        <tr><td>2026-03-04</td></tr>
                        <tr><td>2026-03-05</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                Start from the calendar and left join facts to show dates that have no matching
                rows. Count a nullable fact-table key, not <code>COUNT(*)</code>, so an unmatched
                calendar day returns zero.
            </p>
            <CodeBlock language="sql">{fillMissingDatesQuery}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="interview-patterns">
            <h2 id="interview-patterns" className="SectionTitle">Common interview patterns</h2>
            <h3 className="Article__subTitle">Check whether two periods overlap</h3>
            <p>
                <code>OVERLAPS</code> treats normal periods as half-open. Periods that only touch at
                one endpoint do not overlap.
            </p>
            <CodeBlock language="sql">{overlapQuery}</CodeBlock>
            <p>The result is <code>true</code>.</p>

            <h3 className="Article__subTitle">Find the latest row per group</h3>
            <p>
                Rank rows newest first inside each customer. Add a unique tie-breaker so equal
                timestamps always choose the same row.
            </p>
            <CodeBlock language="sql">{latestPerGroupQuery}</CodeBlock>
            <p>
                See the{' '}
                <a className="Link" href={toHref(POSTGRESQL_WINDOW_FUNCTIONS_ROUTE)}>
                    window functions note
                </a>{' '}
                for ranking rules and result shapes.
            </p>

            <h3 className="Article__subTitle">Find the earliest and latest date</h3>
            <p>
                <code>MIN</code> and <code>MAX</code> return the earliest and latest non-
                <code>NULL</code> value. They return the date, not the rest of the row that contains it.
            </p>
            <CodeBlock language="sql">{firstLastQuery}</CodeBlock>

            <h3 className="Article__subTitle">Measure the gap from the previous event</h3>
            <CodeBlock language="sql">{gapsQuery}</CodeBlock>
            <p>
                The first row for each customer has no previous row, so its gap is <code>NULL</code>.
            </p>

            <h3 className="Article__subTitle">Group consecutive dates into streaks</h3>
            <p>
                Consecutive dates share the same value after subtracting their row number. Remove
                duplicate user-date pairs first so two events on one day do not break the pattern.
            </p>
            <CodeBlock language="sql">{streaksQuery}</CodeBlock>

            <h3 className="Article__subTitle">Compare one month with the previous month</h3>
            <p>
                Aggregate to one row per month first. Then use <code>LAG</code> to read the previous
                month's value. Missing months remain missing unless a generated calendar supplies them.
            </p>
            <CodeBlock language="sql">{monthOverMonthQuery}</CodeBlock>

            <h3 className="Article__subTitle">Remember date edge cases</h3>
            <ul className="Article__notes">
                <li>Leap years make February 29 valid only in the correct years. Invalid typed dates raise an error.</li>
                <li>Months have different lengths. Adding one month to a month-end date can move to the last valid day of the target month.</li>
                <li>ISO week 1 can start in December, and early January can belong to the previous ISO year.</li>
                <li><code>NULL</code> dates do not match ordinary comparisons. Handle them explicitly when “no date” has business meaning.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default PostgreSQLDateTime;
