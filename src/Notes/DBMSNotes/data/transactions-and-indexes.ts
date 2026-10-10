import type { LearningNote } from '../../LearningNotes/types';

export const transactionAndIndexNotes: readonly LearningNote[] = [
    {
        slug: 'transactions-and-acid',
        title: 'Transactions and ACID',
        summary: 'Group related operations into one transaction. Explain ACID, isolation, and transaction states.',
        scope: 'dbms',
        updatedOn: '2026-10-10',
        sections: [
            {
                id: 'transaction',
                title: 'A transaction is one logical unit of work',
                bullets: [
                    'A transaction groups one or more database operations that belong to one task.',
                    'Read a balance before calculating its new value. Operation order matters.',
                    'COMMIT completes a successful transaction. ROLLBACK cancels its uncommitted database changes.',
                    'A money transfer needs both a debit and a credit. Committing only one operation gives an incorrect result.',
                ],
                examples: [{
                    title: 'Transfer 100 from account A to account B',
                    language: 'text',
                    code: `Before: A = 1000, B = 500
Start transaction
Subtract 100 from A
Add 100 to B
Commit
After:  A = 900, B = 600`,
                    result: 'The total stays 1500. If the transaction fails after the debit, rollback removes the debit and keeps the original balances.',
                }],
            },
            {
                id: 'acid',
                title: 'ACID describes four transaction properties',
                bullets: [
                    'Atomicity: commit all transaction changes or none. Recovery removes partial changes after failure.',
                    'Consistency: a correct transaction preserves database rules. Primary keys, foreign keys, and CHECK constraints enforce declared rules.',
                    'The application must also implement business rules correctly. A transaction cannot correct wrong transfer logic.',
                    'Isolation: control how concurrent transactions affect each other. Concurrent means their execution overlaps.',
                    'Serial execution runs transactions one at a time. Serializable isolation gives committed results equivalent to some serial order.',
                    'Serializable transactions can overlap internally. The DBMS may block operations or abort a transaction that must be retried.',
                    'Weaker isolation levels allow some effects of concurrent transactions. Do not assume every transaction behaves as if it ran alone.',
                    'Durability: once a durable commit succeeds, changes survive a later system crash.',
                    'Durability depends on reliable storage and commit settings.',
                ],
            },
            {
                id: 'transaction-states',
                title: 'Transaction states show progress and failure',
                bullets: [
                    'Active: the transaction reads data, calculates values, and changes data.',
                    'Partially committed: its final operation has finished. Commit work can still fail.',
                    'Committed: the DBMS has completed commit and made the changes durable under its configured guarantees.',
                    'A durable log can preserve committed changes before every changed data page reaches disk.',
                    'Failed: an error or crash prevents the transaction from continuing normally.',
                    'Aborted: rollback has removed its changes. Other transactions can keep their own committed changes.',
                    'Terminated: processing ends after commit or abort.',
                    'After abort, the application may restart the whole transaction. Retry temporary errors. Correct permanent input errors.',
                    'After commit, ordinary rollback cannot cancel that transaction. A new transaction can apply a compensating change.',
                ],
                examples: [{
                    title: 'Successful and failed paths',
                    language: 'text',
                    code: `Success:
Active -> Partially committed -> Committed -> Terminated

Failure during execution:
Active -> Failed -> Aborted -> Terminated

Failure during commit work:
Partially committed -> Failed -> Aborted -> Terminated`,
                    result: 'Finishing the last statement does not complete commit. Commit work can still fail.',
                }],
            },
        ],
    },
    {
        slug: 'recovery-and-indexing',
        title: 'Recovery and indexing',
        summary: 'Recover transaction changes after failure. Use ordered indexes to locate rows with fewer data reads.',
        scope: 'dbms',
        updatedOn: '2026-10-10',
        sections: [
            {
                id: 'recovery-log',
                title: 'A recovery log supports atomicity and durability',
                bullets: [
                    'Recovery restores a valid database state after a transaction failure or system crash.',
                    'A log stores recovery records. A simple update record contains the transaction ID, changed item, old value, and new value.',
                    'UNDO restores old values for changes that must be cancelled. REDO reapplies changes that must survive.',
                    'Write-ahead logging, or WAL, makes the required log records durable before the corresponding changed data pages reach persistent storage.',
                    'For a durable logged commit, the required log records and commit record must survive the crash before success is reported.',
                    'Stable storage means reliable storage in the recovery model. Real storage can still fail.',
                    'A checkpoint records recovery progress. It limits how much earlier work recovery must examine.',
                    'A checkpoint is not an independent backup. A backup and retained recovery logs can restore data after storage loss.',
                ],
            },
            {
                id: 'deferred-immediate-updates',
                title: 'Deferred and immediate updates need different recovery work',
                bullets: [
                    'Deferred update postpones writing a transaction\'s changes to the stored database until commit.',
                    'In the basic deferred-update model, uncommitted changes never reach stored data. Recovery ignores incomplete transactions and may REDO committed changes.',
                    'Immediate update allows changed data pages to reach storage before commit. The log must reach reliable storage first.',
                    'In a basic immediate-update model, recovery may UNDO uncommitted changes and REDO committed changes missing from stored data.',
                    'Recovery work depends on the storage and logging design. These models do not describe every engine.',
                ],
                examples: [{
                    title: 'Read an update record after a crash',
                    language: 'text',
                    code: `Initial balance: 1000
Log: T1 changes balance from 1000 to 900

No durable commit for T1:
  UNDO 900 -> 1000 if its change reached stored data

Durable commit for T1:
  REDO 1000 -> 900 if its change did not reach stored data`,
                    result: 'The commit record decides whether T1 must survive. The recovery model decides which actions are needed.',
                }],
            },
            {
                id: 'shadow-copy',
                title: 'Shadow copies commit by changing a durable pointer',
                bullets: [
                    'The simple shadow-copy scheme assumes one active transaction. A durable pointer identifies the current database copy.',
                    'Make a new copy and apply changes there. Keep the original copy unchanged.',
                    'Before commit, write the new copy completely to persistent storage.',
                    'Then atomically replace the durable pointer so it identifies the new copy. Atomic means recovery sees either the old pointer or the new pointer.',
                    'A crash before the pointer switch leaves the original copy current. A crash after the durable switch leaves the new copy current.',
                    'After commit, reclaim the old copy safely. On abort, discard the new copy.',
                    'Copying the whole database for each transaction is expensive.',
                    'Shadow paging reduces copying. It copies changed pages and builds a new page table, which maps logical pages to stored pages.',
                    'Write those new pages and the new page table before switching the durable root pointer. Shared unchanged pages must remain available.',
                    'The scheme needs a reliable atomic pointer update. Do not assume any ordinary file write provides that guarantee.',
                ],
            },
            {
                id: 'index-basics',
                title: 'An index maps search values to data',
                bullets: [
                    'An index is a data structure that helps find rows without reading every data block.',
                    'A search key is the column or group of columns used for lookup. It need not be a primary key or contain unique values.',
                    'An index entry stores a search value and a data reference. The reference identifies a row, block, or group of matching rows.',
                    'An ordered index keeps search values in order. Not all index types are ordered. A hash index uses a hash function to choose a location.',
                ],
            },
            {
                id: 'dense-sparse',
                title: 'Dense and sparse indexes store different numbers of entries',
                bullets: [
                    'A dense ordered index covers every search-key value. Duplicate values may use a list of row references.',
                    'A sparse index stores only selected search values. A common design stores the first search value in each data block.',
                    'This sparse lookup requires data ordered by the same search key. Find the closest indexed value at or below the target, then scan forward.',
                    'Sparse indexes use less space but may need more data scanning.',
                ],
                examples: [{
                    title: 'Find employee 35 with a sparse index',
                    language: 'text',
                    code: `Block 1: IDs 10, 15, 20
Block 2: IDs 30, 35, 40

Sparse entries: 10 -> Block 1, 30 -> Block 2
Search for 35: use entry 30, then scan Block 2`,
                    result: 'The index has two entries for six rows. It does not need a separate entry for ID 35.',
                }],
            },
            {
                id: 'primary-secondary-indexes',
                title: 'Primary and secondary describe the index relation to data order',
                bullets: [
                    'In textbook terminology, a primary or clustering index uses the search key that orders the data file.',
                    'That search key can be a unique ID or a non-unique department. Primary index does not always mean an index on a primary key.',
                    'Data ordered by ID can use one sparse entry per block. Data grouped by department can use an entry for each department value.',
                    'A secondary or non-clustering index uses a different search key from the data file order.',
                    'A secondary index can exist on an already ordered file. The file does not have to be unsorted or have another index.',
                    'These secondary indexes are dense. Repeated search values need references to all matching rows.',
                    'PostgreSQL normally stores table rows in a heap, separate from its indexes. A heap does not maintain a sorted row order.',
                    'A PostgreSQL primary key creates a unique index. It does not keep table rows physically ordered.',
                    'PostgreSQL CLUSTER reorders a table using an index once. Later inserts and updates do not automatically preserve that order.',
                ],
            },
            {
                id: 'multilevel-indexes',
                title: 'Multiple index levels reduce the search work',
                bullets: [
                    'A large index can need several disk reads. Add a smaller index over its blocks, then add more levels if needed.',
                    'A B+ tree is a balanced multilevel ordered index. Internal nodes direct searches. Leaf nodes hold entries for data lookup.',
                    'All root-to-leaf paths have the same length. Linked leaves support reading a range of search values.',
                    'Indexes can reduce reads for selective filters, joins, and ordered access. A selective filter matches a small part of the table.',
                    'Indexes also use storage and require maintenance during inserts, deletes, and relevant updates.',
                    'An index does not guarantee a faster query. The optimizer may choose a table scan when many rows match.',
                ],
            },
        ],
    },
];
