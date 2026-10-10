import type { LearningNote } from '../../LearningNotes/types';

export const sqlAndDesignNotes: readonly LearningNote[] = [
    {
        slug: 'sql-basics-and-constraints',
        title: 'SQL basics and constraints',
        summary: 'SQL commands, PostgreSQL data types, schema changes, and safe row changes.',
        scope: 'dbms',
        updatedOn: '2026-10-10',
        sections: [
            {
                id: 'sql-command-groups',
                title: 'SQL and command groups',
                bullets: [
                    'SQL means Structured Query Language. It defines, reads, and changes relational data.',
                    'PostgreSQL is a relational database management system. Clients send SQL to its server.',
                    'Examples use PostgreSQL 18. Other databases can use different commands.',
                    'CRUD means create, read, update, and delete rows. Creating a row uses INSERT. CREATE TABLE creates its structure.',
                    'Data Definition Language (DDL) defines structures: CREATE, ALTER, DROP, and TRUNCATE. ALTER TABLE can rename a table.',
                    'Data Manipulation Language (DML) changes rows: INSERT, UPDATE, and DELETE.',
                    'SELECT reads rows. It is also called Data Query Language (DQL) or Data Retrieval Language (DRL).',
                    'Data Control Language (DCL) controls privileges. GRANT gives privileges. REVOKE removes them.',
                    'Transaction Control Language (TCL) controls transactions: START TRANSACTION, COMMIT, ROLLBACK, and SAVEPOINT.',
                    'A savepoint marks a position for a partial rollback.',
                    'PostgreSQL supports transactional table DDL, including CREATE TABLE, DROP TABLE, and TRUNCATE.',
                    'CREATE DATABASE and DROP DATABASE cannot run inside a transaction block.',
                    'CREATE DATABASE requires a superuser or a role with the CREATEDB privilege.',
                    'psql is a PostgreSQL command-line client. Commands starting with a backslash belong to psql, not SQL.',
                ],
                examples: [
                    {
                        language: 'text',
                        code: `-- In psql, outside a transaction block:
CREATE DATABASE dbms_notes;
\\connect dbms_notes
\\list
\\dt

-- Connect elsewhere before dropping the database.
\\connect postgres
DROP DATABASE IF EXISTS dbms_notes;`,
                        result: 'CREATE creates a new database and fails if it exists. The psql commands connect, list databases, and list tables visible in the schema search path. DROP removes the database after connecting elsewhere. Other sessions using it can prevent the drop.',
                    },
                ],
            },
            {
                id: 'postgresql-data-types',
                title: 'Choose a data type',
                bullets: [
                    'A data type limits column values.',
                    'CHAR(n) stores blank-padded text. VARCHAR(n) limits text to n characters. TEXT stores variable-length text without a declared length limit.',
                    'TEXT and VARCHAR have similar performance. CHAR does not provide a PostgreSQL performance advantage.',
                    'BYTEA stores binary data, such as file bytes.',
                    'SMALLINT ranges from -32768 to 32767. INTEGER, also called INT, ranges from -2147483648 to 2147483647.',
                    'BIGINT ranges from -9223372036854775808 to 9223372036854775807.',
                    'PostgreSQL has no built-in unsigned integer types. Use CHECK (value >= 0) when a signed column must reject negative values.',
                    'REAL and DOUBLE PRECISION store approximate numbers. They offer at least 6 and 15 decimal digits of precision respectively.',
                    'NUMERIC(p, s), also called DECIMAL, stores exact decimal values. For ordinary positive scales, p counts all digits and s counts fractional digits. Use it for money.',
                    'BOOLEAN stores true, false, or NULL. BIT(n) stores fixed-length bit strings. BIT VARYING stores variable-length bit strings.',
                    'DATE stores a date. TIME stores a time of day. INTERVAL stores a duration.',
                    'TIMESTAMP means timestamp without time zone. TIMESTAMPTZ stores an instant and displays it in the session time zone. It does not retain the original zone name.',
                    'Define an ENUM with CREATE TYPE before using it as a column type. Store multiple selections in related rows when they need separate keys or relationships.',
                ],
                examples: [
                    {
                        language: 'text',
                        code: `Type                  Use
VARCHAR(80)           A name limited to 80 characters
TEXT                  Text without a declared length limit
BYTEA                 Binary data
NUMERIC(6, 2)         An exact amount with four integer digits
TIMESTAMPTZ           An event instant
INTERVAL              A duration

NUMERIC(6, 2): 1234.50 is valid; 12345.67 exceeds the range.`,
                        result: 'Choose types by the values and rules they need to represent. NUMERIC(6, 2) leaves four digits before the decimal point. Extra fractional digits are rounded to two places.',
                    },
                ],
            },
            {
                id: 'sql-integrity-constraints',
                title: 'Constraints and foreign-key actions',
                bullets: [
                    'A constraint checks a rule when data changes.',
                    'PRIMARY KEY uniquely identifies each row and rejects NULL. One primary-key constraint can contain several columns.',
                    'UNIQUE rejects duplicate key values. PostgreSQL normally permits multiple NULL values. UNIQUE NULLS NOT DISTINCT treats NULL values as equal.',
                    'NOT NULL requires a value. DEFAULT supplies a value when an insert omits that column.',
                    'CHECK rejects a false condition. A condition that evaluates to unknown because of NULL passes, so add NOT NULL when required.',
                    'A FOREIGN KEY references a primary or unique key. Each non-NULL reference must match.',
                    'A column can be both a primary and foreign key. Tables can have several foreign keys.',
                    'ON UPDATE CASCADE changes child references when the referenced key changes.',
                    'ON DELETE CASCADE deletes matching child rows. ON DELETE SET NULL keeps child rows and clears their reference. SET NULL needs nullable columns.',
                ],
                examples: [
                    {
                        language: 'sql',
                        code: `CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(200) UNIQUE,
    age INT NOT NULL CHECK (age >= 0),
    country VARCHAR(40) NOT NULL DEFAULT 'India'
);
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    amount NUMERIC(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
        ON UPDATE CASCADE ON DELETE SET NULL
);`,
                        result: 'Duplicate customer IDs and negative ages fail. Orders may have no customer. Deleting a customer sets matching customer_id values to NULL.',
                    },
                ],
            },
            {
                id: 'alter-and-crud',
                title: 'Change structures and rows',
                bullets: [
                    'ALTER TABLE changes the schema. ADD COLUMN adds a column. ALTER COLUMN TYPE changes its type. RENAME COLUMN changes its name.',
                    'Use ALTER COLUMN SET NOT NULL or SET DEFAULT to change those rules. Type changes may need USING to convert existing values.',
                    'DROP COLUMN removes a column and its data. RENAME TO changes the table name.',
                    'UPDATE and DELETE affect every row when WHERE is absent. TRUNCATE removes all rows while keeping the table structure.',
                    'An upsert inserts a new row or updates a conflicting row. PostgreSQL uses INSERT ... ON CONFLICT ... DO UPDATE.',
                    'Choose the primary or unique key that defines the conflict. EXCLUDED contains the proposed insert values. Only the columns in SET change on an update.',
                    'ON CONFLICT DO UPDATE updates the existing row. DO NOTHING skips the conflicting insert.',
                ],
                examples: [
                    {
                        language: 'sql',
                        code: `ALTER TABLE customers ADD COLUMN nickname VARCHAR(30);
ALTER TABLE customers ALTER COLUMN nickname TYPE VARCHAR(60);
ALTER TABLE customers RENAME COLUMN nickname TO display_name;
ALTER TABLE customers DROP COLUMN display_name;
ALTER TABLE orders RENAME TO customer_orders;

INSERT INTO customers (id, name, age)
VALUES (1, 'Asha', 20), (2, 'Ravi', 22);
SELECT name FROM customers WHERE id = 1;
UPDATE customers SET age = 21 WHERE id = 1;
INSERT INTO customers (id, name, age) VALUES (2, 'Ravi', 23)
ON CONFLICT (id) DO UPDATE SET age = EXCLUDED.age;
DELETE FROM customers WHERE id = 2;`,
                        result: 'The schema adds, changes, renames, then removes the extra column. SELECT returns Asha. Her age becomes 21. The upsert changes Ravi’s age to 23 and keeps his other values. DELETE then removes his row.',
                    },
                ],
            },
        ],
    },
    {
        slug: 'sql-filtering-and-grouping',
        title: 'SQL filtering and grouping',
        summary: 'Row filters, NULL, patterns, aggregates, and the logical order of a query.',
        scope: 'dbms',
        updatedOn: '2026-10-10',
        sections: [
            {
                id: 'row-filters-and-null',
                title: 'Filter rows',
                bullets: [
                    'SELECT chooses output columns. FROM chooses the source. WHERE keeps rows whose condition is true.',
                    'PostgreSQL allows SELECT without FROM. SELECT 55 + 11 returns 66. No dummy table is needed.',
                    'BETWEEN includes both endpoints. IN checks membership in a list. AND, OR, and NOT combine conditions.',
                    'Use parentheses when combining AND and OR to show the intended condition.',
                    'NULL means a missing or unknown value. Use IS NULL or IS NOT NULL. Comparing with = NULL does not return true.',
                    'NOT IN can produce unknown when its list contains NULL. Use NOT EXISTS for an exclusion query when nullable values are possible.',
                    'LIKE uses % for zero or more characters and _ for exactly one character.',
                    'LIKE is normally case-sensitive. Its behavior can depend on the collation, which sets text comparison rules. ILIKE provides case-insensitive matching.',
                ],
                examples: [
                    {
                        language: 'sql',
                        code: `-- Sample columns: id, name, age, country, email
-- Rows: (1, 'Asha', 20, 'India', NULL),
--       (2, 'Ravi', 22, 'India', 'ravi@example.com'),
--       (3, 'Maya', 30, 'Nepal', NULL)
SELECT name FROM customers
WHERE age BETWEEN 20 AND 25
  AND country IN ('India', 'Nepal')
  AND name LIKE 'A%';

SELECT name FROM customers WHERE email IS NULL;`,
                        result: 'For these sample rows, the first query returns Asha. The NULL-email query returns Asha and Maya.',
                    },
                ],
            },
            {
                id: 'aggregate-and-having',
                title: 'Group rows and filter groups',
                bullets: [
                    'GROUP BY collects rows with the same grouping values.',
                    'COUNT(*) counts rows. COUNT(column) counts non-NULL values. SUM, AVG, MIN, and MAX ignore NULL inputs.',
                    'WHERE filters rows before grouping. HAVING filters the resulting groups.',
                    'Without GROUP BY, an aggregate query treats all selected rows as one group. HAVING can filter this group.',
                    'Selected nonaggregate columns normally belong in GROUP BY. PostgreSQL also allows a table’s other columns when GROUP BY includes that table’s primary key.',
                    'This PostgreSQL exception does not cover every logical functional dependency or every UNIQUE constraint.',
                    'DISTINCT removes duplicate output rows. It is not an aggregate function.',
                    'ORDER BY sorts results. ASC means ascending. DESC means descending. Without ORDER BY, row order is not guaranteed.',
                ],
                examples: [
                    {
                        language: 'sql',
                        code: `-- Customers: Asha / India / 20, Ravi / India / 22,
--            Maya / Nepal / 30
SELECT country, COUNT(*) AS people, AVG(age) AS average_age
FROM customers
WHERE age >= 18
GROUP BY country
HAVING COUNT(*) >= 2
ORDER BY people DESC, country ASC;

SELECT COUNT(*) AS people FROM customers HAVING COUNT(*) >= 3;
SELECT DISTINCT country FROM customers ORDER BY country;`,
                        result: 'The grouped query returns India, 2, 21. The ungrouped HAVING query returns 3. DISTINCT returns India and Nepal.',
                    },
                ],
            },
            {
                id: 'logical-query-order',
                title: 'Logical query order',
                bullets: [
                    'The logical order explains query meaning. It is not a fixed physical execution plan.',
                    'The optimizer can change the physical plan while preserving results. SQL does not execute right to left.',
                    'WHERE cannot use a SELECT alias. WHERE logically runs earlier.',
                    'LIMIT restricts the final result size. Use ORDER BY with a unique tie-breaker when the chosen rows must be predictable.',
                ],
                examples: [
                    {
                        language: 'text',
                        code: `FROM and JOIN → WHERE → GROUP BY → HAVING
→ SELECT → DISTINCT → ORDER BY → LIMIT`,
                        result: 'Rows are filtered before aggregates are calculated. Groups are filtered before the final result is sorted and limited.',
                    },
                ],
            },
        ],
    },
    {
        slug: 'joins-subqueries-and-views',
        title: 'Joins, subqueries, and views',
        summary: 'Combine tables, compare result sets, nest queries, and save view definitions.',
        scope: 'dbms',
        updatedOn: '2026-10-10',
        sections: [
            {
                id: 'join-types',
                title: 'Join tables',
                bullets: [
                    'A join combines rows using a condition. Joining does not require a declared foreign key.',
                    'An alias gives a table or column a temporary query name.',
                    'INNER JOIN returns matching row pairs. LEFT JOIN also keeps unmatched left rows with NULL right columns. RIGHT JOIN keeps unmatched right rows.',
                    'CROSS JOIN returns every pair. Two rows crossed with three rows produce six rows.',
                    'FULL OUTER JOIN keeps matches and unmatched rows from both sides. PostgreSQL supports it directly.',
                    'A self join reads the same table under different aliases. It can use an inner or outer join.',
                    'Comma-separated tables with a WHERE condition can express an inner join. Explicit JOIN shows the relationship clearly.',
                ],
                examples: [
                    {
                        language: 'sql',
                        code: `-- customers: (1, 'Asha'), (2, 'Ravi')
-- orders: (10, customer_id 1), (11, customer_id NULL)
SELECT c.name, o.id AS order_id
FROM customers AS c LEFT JOIN orders AS o ON o.customer_id = c.id;

-- employees: (1, 'Asha', NULL), (2, 'Ravi', manager_id 1)
SELECT e.name, m.name AS manager
FROM employees AS e LEFT JOIN employees AS m ON e.manager_id = m.id;`,
                        result: 'The first query returns Asha / 10 and Ravi / NULL. The self join returns Asha / NULL and Ravi / Asha.',
                    },
                    {
                        language: 'sql',
                        code: `SELECT c.id AS customer_id, o.id AS order_id
FROM customers AS c FULL OUTER JOIN orders AS o ON o.customer_id = c.id;`,
                        result: 'For the rows above, this returns (1, 10), (2, NULL), and (NULL, 11). It keeps both unmatched customers and unmatched orders.',
                    },
                ],
                pitfalls: [
                    'A WHERE condition on the nullable side of an outer join can remove unmatched rows. Put a match restriction in ON when those rows should remain.',
                    'Several matching rows produce several result rows. A join does not automatically remove duplicates.',
                ],
            },
            {
                id: 'sql-set-operations',
                title: 'Combine result sets',
                bullets: [
                    'Set operations combine result rows. Joins combine row pairs and their columns.',
                    'Both queries need the same number of output columns. Corresponding columns need compatible types.',
                    'UNION returns rows found in either result. INTERSECT returns rows found in both. EXCEPT returns first-result rows absent from the second.',
                    'These operators remove duplicates by default. ALL variants preserve multiplicities. UNION ALL retains every input row.',
                    'PostgreSQL supports all three operators directly. MINUS is another database’s name for difference. Use EXCEPT in PostgreSQL.',
                ],
                examples: [
                    {
                        language: 'sql',
                        code: `SELECT 1 AS id UNION SELECT 2 UNION SELECT 2;
SELECT 1 AS id UNION ALL SELECT 2 UNION ALL SELECT 2;
(SELECT 1 AS id UNION SELECT 2) INTERSECT SELECT 2;
(SELECT 1 AS id UNION SELECT 2) EXCEPT SELECT 2;`,
                        result: 'Ignoring row order, the results are {1, 2}, {1, 2, 2}, {2}, and {1}.',
                    },
                ],
            },
            {
                id: 'subquery-forms',
                title: 'Subqueries and correlation',
                bullets: [
                    'A subquery is a query inside another query. It can appear in WHERE, FROM, or SELECT.',
                    'A scalar subquery returns one column and at most one row. Zero rows produce NULL. More than one row causes an error.',
                    'IN accepts several values. EXISTS tests whether any matching row exists.',
                    'A subquery in FROM produces a derived table. Use an alias for clarity. PostgreSQL 16 and later also allow an omitted alias.',
                    'A correlated subquery refers to a row from the outer query. Its meaning depends on that row.',
                    'The optimizer can rewrite or materialize subqueries. Correlation does not prove a fixed number of physical executions.',
                    'Joins are not always faster than subqueries. Compare equivalent results and inspect the execution plan with EXPLAIN.',
                ],
                examples: [
                    {
                        language: 'sql',
                        code: `-- customers: Asha / 20, Ravi / 22, Maya / 30
SELECT name FROM customers
WHERE age > (SELECT AVG(age) FROM customers);

SELECT MAX(age) FROM (
    SELECT age FROM customers WHERE country = 'India'
) AS indian_customers;

SELECT c.name,
       (SELECT COUNT(*) FROM orders AS o
        WHERE o.customer_id = c.id) AS order_count
FROM customers AS c;`,
                        result: 'The first query returns Maya because 30 exceeds the average of 24. The derived-table query returns 22. With one Asha order and no other orders, the correlated counts are Asha / 1, Ravi / 0, and Maya / 0.',
                    },
                ],
            },
            {
                id: 'view-lifecycle',
                title: 'Create and change a view',
                bullets: [
                    'A view stores a query definition. A normal PostgreSQL view does not store a separate copy of its result rows.',
                    'Querying the view reads the current underlying data visible to that statement.',
                    'A view can select from tables, joins, or other views. Some views support writes. Aggregated views generally do not.',
                    'CREATE OR REPLACE VIEW changes the query definition. Existing output columns must keep their names, order, and types. New columns may be added at the end.',
                    'ALTER VIEW changes properties such as the name or owner. DROP VIEW removes the view, leaving its base tables.',
                    'A materialized view stores query results. REFRESH MATERIALIZED VIEW recomputes them. Base-table changes do not update the stored results automatically.',
                    'Import and export tools can move data through files such as CSV or JSON. A file’s values alone do not define keys or constraints.',
                ],
                examples: [
                    {
                        language: 'sql',
                        code: `CREATE VIEW adult_customers AS
SELECT id, name FROM customers WHERE age >= 18;
CREATE OR REPLACE VIEW adult_customers AS
SELECT id, name FROM customers WHERE age >= 21;
SELECT name FROM adult_customers;
DROP VIEW IF EXISTS adult_customers;`,
                        result: 'With ages 20, 22, and 30, the changed view returns Ravi and Maya. DROP removes the definition and keeps all customer rows.',
                    },
                ],
            },
        ],
    },
    {
        slug: 'functional-dependencies-and-normalisation',
        title: 'Functional dependencies and normalisation',
        summary: 'Use dependencies and candidate keys to remove repeated facts without losing data.',
        scope: 'dbms',
        updatedOn: '2026-10-10',
        sections: [
            {
                id: 'functional-dependency-rules',
                title: 'Functional dependencies',
                bullets: [
                    'A functional dependency X → Y means rows that agree on X must also agree on Y in every valid state of the relation.',
                    'X is the determinant. Y is the dependent attribute set. X need not be the primary key.',
                    'Use domain rules to establish dependencies. A dependency in today’s rows may not be a valid rule.',
                    'A dependency is trivial when Y is a subset of X. It is nontrivial otherwise. Nontrivial does not require disjoint attribute sets.',
                    'Armstrong’s reflexivity rule: if Y is a subset of X, then X → Y.',
                    'Augmentation: if X → Y, then XZ → YZ. Transitivity: if X → Y and Y → Z, then X → Z.',
                    'The attribute closure X+ contains everything X determines using these rules.',
                    'The dependency closure contains every functional dependency implied by the stated rules.',
                    'A superkey determines every attribute. A candidate key is a superkey with no removable attribute. A prime attribute belongs to at least one candidate key.',
                ],
                examples: [
                    {
                        language: 'text',
                        code: `Relation: R(A, B, C)
Rules: A → B and B → C

A+ starts with {A}.
A → B adds B.
B → C adds C.
A+ = {A, B, C}.`,
                        result: 'A is a candidate key. Transitivity gives A → C. Reflexivity gives AB → A. Augmentation of A → B gives AC → BC.',
                    },
                ],
            },
            {
                id: 'redundancy-and-anomalies',
                title: 'Repeated facts cause anomalies',
                bullets: [
                    'An update anomaly requires changing the same fact in several rows. Missing one row creates inconsistent values.',
                    'An insertion anomaly prevents storing one fact without another unrelated fact.',
                    'A deletion anomaly removes a fact unintentionally when another fact is deleted.',
                    'Normalisation separates facts according to dependencies. It reduces repeated data and these anomalies.',
                    'A decomposition splits one relation into several relations.',
                    'A lossless decomposition lets joins reconstruct the original relation without extra rows.',
                    'Dependency preservation lets the decomposed relations enforce the original dependencies without joining them.',
                    'Normalisation does not guarantee faster queries. More tables can require more joins.',
                ],
                examples: [
                    {
                        language: 'text',
                        code: `Enrollment(student_id, course_id, student_name, course_name)
1, DB, Asha, Databases
2, DB, Ravi, Databases`,
                        result: 'Renaming the course needs two updates. A new course cannot be stored without an enrollment under this design. Deleting both rows loses the course name.',
                    },
                ],
            },
            {
                id: 'first-and-second-normal-forms',
                title: '1NF and 2NF',
                bullets: [
                    'First normal form (1NF) requires one value from the defined domain in each cell. Do not store a list of phone numbers in one cell.',
                    'Store several phone numbers as separate rows keyed by person and phone number.',
                    'Second normal form (2NF) requires 1NF and no non-prime attribute dependent on a proper subset of any candidate key.',
                    'This partial-dependency check covers every candidate key, not just the chosen primary key.',
                    'If every candidate key has one attribute, there is no proper nonempty key subset to cause a partial dependency.',
                ],
                examples: [
                    {
                        language: 'text',
                        code: `Enrollment(student_id, course_id, student_name, course_name)
Candidate key: {student_id, course_id}
student_id → student_name
course_id → course_name

Decompose into:
Student(student_id, student_name)
Course(course_id, course_name)
Enrollment(student_id, course_id)`,
                        result: 'The original relation fails 2NF. Each name depends on only part of its candidate key. The three relations store each name once and preserve both dependencies. Joining on the IDs reconstructs the enrollment facts.',
                    },
                ],
            },
            {
                id: 'third-normal-form',
                title: '3NF',
                bullets: [
                    'Third normal form (3NF) requires, for each nontrivial dependency X → A in the dependency closure, that X is a superkey or A is prime.',
                    'Check one right-side attribute at a time. The prime-attribute exception matters when candidate keys overlap.',
                    'A common violation is a key determining a non-prime attribute that determines another non-prime attribute.',
                ],
                examples: [
                    {
                        language: 'text',
                        code: `Employee(employee_id, department_id, department_name)
employee_id → department_id
department_id → department_name
Candidate key: {employee_id}

Decompose into:
Employee(employee_id, department_id)
Department(department_id, department_name)`,
                        result: 'department_id is not a superkey in the original relation. department_name is not prime. The dependency violates 3NF. The decomposition preserves the dependencies and reconstructs employees through department_id.',
                    },
                ],
            },
            {
                id: 'boyce-codd-normal-form',
                title: 'BCNF and its tradeoff',
                bullets: [
                    'Boyce–Codd normal form (BCNF) requires every determinant of a nontrivial functional dependency to be a superkey.',
                    'BCNF is stricter than 3NF because it has no prime-attribute exception.',
                    'BCNF decomposition can be lossless while losing dependency preservation. Check both properties when choosing a design.',
                ],
                examples: [
                    {
                        language: 'text',
                        code: `Teaching(student, course, instructor)
Rules: student, course → instructor
       instructor → course
Candidate keys: {student, course}, {student, instructor}

Decompose into:
InstructorCourse(instructor, course)
StudentInstructor(student, instructor)`,
                        result: 'Every attribute is prime, so Teaching satisfies 3NF. instructor → course violates BCNF because instructor does not determine student. The decomposition is lossless and both relations satisfy BCNF. Enforcing one instructor per student/course now requires a cross-relation check.',
                    },
                ],
            },
        ],
    },
];
