import type { LearningChapter } from '../LearningNotes/types';
import { distributedDatabaseNotes } from './data/distributed-databases';
import { foundationNotes } from './data/foundations';
import { sqlAndDesignNotes } from './data/sql-and-design';
import { transactionAndIndexNotes } from './data/transactions-and-indexes';

export const dbmsChapters: readonly LearningChapter[] = [
    {
        id: 'foundations',
        title: '1. Databases and data models',
        summary: 'Database basics, architecture, ER diagrams, keys, and ER-to-table mapping.',
        notes: foundationNotes,
    },
    {
        id: 'sql-and-design',
        title: '2. SQL and database design',
        summary: 'SQL commands, queries, joins, views, dependencies, and normalisation.',
        notes: sqlAndDesignNotes,
    },
    {
        id: 'transactions-and-indexes',
        title: '3. Transactions, recovery, and indexes',
        summary: 'ACID, transaction states, recovery methods, and index structures.',
        notes: transactionAndIndexNotes,
    },
    {
        id: 'distributed-databases',
        title: '4. NoSQL and distributed databases',
        summary: 'Database types, replication, sharding, scaling patterns, and CAP.',
        notes: distributedDatabaseNotes,
    },
];

export const dbmsLearningNotes = dbmsChapters.flatMap((chapter) => chapter.notes);
