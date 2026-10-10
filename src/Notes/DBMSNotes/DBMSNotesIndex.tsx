import '../Notes.css';

import Page from '../../Page/Page';
import { DBMS_NOTES_ROUTE, NOTES_ROUTE, POSTGRESQL_NOTES_ROUTE, toHref } from '../../routing/routes';
import NoteReadingTime from '../NoteReadingTime';
import NoteTree from '../NoteTree';
import { dbmsNotes } from '../noteTreeData';
import { getNodeReadingMinutes } from '../readingTime';

const references = [
    ['PostgreSQL SELECT, grouping, and set operations', 'https://www.postgresql.org/docs/current/sql-select.html'],
    ['PostgreSQL data types', 'https://www.postgresql.org/docs/current/datatype.html'],
    ['PostgreSQL constraints', 'https://www.postgresql.org/docs/current/ddl-constraints.html'],
    ['PostgreSQL CREATE DATABASE', 'https://www.postgresql.org/docs/current/sql-createdatabase.html'],
    ['PostgreSQL psql commands', 'https://www.postgresql.org/docs/current/app-psql.html'],
    ['PostgreSQL ALTER TABLE', 'https://www.postgresql.org/docs/current/sql-altertable.html'],
    ['PostgreSQL INSERT and ON CONFLICT', 'https://www.postgresql.org/docs/current/sql-insert.html'],
    ['PostgreSQL views', 'https://www.postgresql.org/docs/current/sql-createview.html'],
    ['PostgreSQL indexes', 'https://www.postgresql.org/docs/current/indexes.html'],
    ['PostgreSQL CLUSTER', 'https://www.postgresql.org/docs/current/sql-cluster.html'],
    ['PostgreSQL transaction isolation', 'https://www.postgresql.org/docs/current/transaction-iso.html'],
    ['PostgreSQL write-ahead logging', 'https://www.postgresql.org/docs/current/wal-intro.html'],
    ['Database System Concepts: indexing', 'https://www.db-book.com/slides-dir/PDF-dir/ch14.pdf'],
    ['MongoDB schema validation', 'https://www.mongodb.com/docs/manual/core/schema-validation/'],
    ['MongoDB transactions', 'https://www.mongodb.com/docs/manual/core/transactions/'],
    ['Cassandra architecture', 'https://cassandra.apache.org/doc/latest/cassandra/architecture/overview.html'],
    ['Amazon Redshift columnar storage', 'https://docs.aws.amazon.com/redshift/latest/dg/c_columnar_storage_disk_mem_mgmnt.html'],
    ['PostgreSQL table partitioning', 'https://www.postgresql.org/docs/current/ddl-partitioning.html'],
    ['Microsoft CQRS pattern', 'https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs'],
    ['Gilbert and Lynch: Perspectives on the CAP Theorem', 'https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer2.pdf'],
] as const;

const DBMSNotesIndex = () => (
    <Page title="DBMS notes">
        <NoteReadingTime minutes={getNodeReadingMinutes(dbmsNotes)} total />
        <a href={toHref(NOTES_ROUTE)} className="Link Link--standalone Notes__back">
            Back to notes
        </a>
        <ul className="Article__notes">
            <li>A database management system, or DBMS, is software that stores, queries, and manages a database.</li>
            <li>
                Start with <a href={toHref(`${DBMS_NOTES_ROUTE}/database-basics`)} className="Link">database basics</a>.
                Read the four groups in order.
            </li>
            <li>SQL examples use PostgreSQL. Examples that use psql commands identify them separately from SQL.</li>
            <li>
                For more PostgreSQL query examples, use the <a href={toHref(POSTGRESQL_NOTES_ROUTE)} className="Link">PostgreSQL notes</a>.
            </li>
        </ul>
        <NoteTree nodes={dbmsNotes.children} />
        <section className="Article__section" aria-labelledby="dbms-source">
            <h2 id="dbms-source" className="SectionTitle">Source and coverage</h2>
            <ul className="Article__notes">
                <li>Adapted from CodeHelp’s DBMS_Full_Notes.pdf. SQL examples use PostgreSQL syntax and behaviour. Repeated explanations are combined. Technical errors and broad claims are corrected.</li>
                <li>Group 1 uses pages 1–13. It covers lectures 1–4, 7, and 8.</li>
                <li>Group 2 uses pages 14–23. It covers lectures 9 and 11.</li>
                <li>Group 3 uses pages 24–28. It covers lectures 12–14.</li>
                <li>Group 4 uses pages 29–49. It covers lectures 15–18, the scaling slides, and lectures 20–21.</li>
                <li>The supplied PDF skips lecture numbers 5, 6, and 10. The scaling slides occupy pages 36–47.</li>
            </ul>
            <h3 className="Article__subTitle">References for corrected details</h3>
            <ul className="Article__notes">
                {references.map(([title, href]) => (
                    <li key={href}><a href={href} className="Link">{title}</a></li>
                ))}
            </ul>
        </section>
    </Page>
);

export default DBMSNotesIndex;
