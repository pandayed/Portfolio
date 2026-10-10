import type { LearningNote } from '../../LearningNotes/types';

export const foundationNotes: readonly LearningNote[] = [
    {
        slug: 'database-basics',
        title: 'Data, databases, and DBMS',
        summary: 'Distinguish data from information and understand what a DBMS manages.',
        scope: 'dbms',
        updatedOn: '2026-10-10',
        sections: [
            {
                id: 'data-and-information',
                title: 'Data and information',
                bullets: [
                    'Data consists of recorded facts, such as names, prices, dates, and measurements.',
                    'Quantitative data describes amounts, such as weight or cost.',
                    'Qualitative data describes qualities or categories, such as hair colour.',
                    'Information is data interpreted in a context to answer a question.',
                ],
                examples: [
                    {
                        language: 'text',
                        code: `Recorded ages: 17, 21, 65, 72
Question: How many people are at least 60?
Answer: 2`,
                        result: 'The individual ages are data. The count of two people answers the question and provides information.',
                    },
                ],
            },
            {
                id: 'database-and-dbms',
                title: 'Database and DBMS',
                bullets: [
                    'A database is an organised collection of related data.',
                    'A database management system, or DBMS, stores, reads, updates, and deletes database data.',
                    'The database is the stored data. The DBMS manages that data and controls access to it.',
                    'A DBMS checks constraints, which are rules that stored data must follow.',
                    'It also manages concurrent access, permissions, transactions, backups, and recovery.',
                    'A transaction groups operations into one unit. For example, a transfer must debit one account and credit another together.',
                ],
            },
            {
                id: 'file-processing-problems',
                title: 'Problems with separate files',
                bullets: [
                    'Redundancy means storing repeated facts. Inconsistency occurs when their copies disagree.',
                    'A new report may need a separate program to read the files.',
                    'Data isolation means related data is scattered across files with different formats.',
                    'Several programs must maintain the same integrity rules.',
                    'Atomicity means all parts of an operation succeed or none take effect. A failure between file writes can leave a partial transfer.',
                    'Concurrent access can lose an update when two programs read and change the same value.',
                    'Security becomes difficult when each program implements its own access rules.',
                    'A DBMS provides shared mechanisms for these problems. They still need correct configuration.',
                ],
            },
        ],
    },
    {
        slug: 'database-architecture',
        title: 'Database architecture',
        summary: 'Understand schemas, data independence, database languages, and application tiers.',
        scope: 'dbms',
        updatedOn: '2026-10-10',
        sections: [
            {
                id: 'three-schema-architecture',
                title: 'Three levels of data abstraction',
                bullets: [
                    'Data abstraction hides details that a user does not need.',
                    'The internal or physical schema describes files, indexes, storage allocation, and compression.',
                    'The conceptual or logical schema defines data, relationships, and constraints for the whole database.',
                    'An external or view schema describes the part a user group needs. Several views can exist.',
                    'A view can select columns or calculate results without copying every underlying row.',
                    'Views can support access control when permissions limit access to the underlying data.',
                ],
                examples: [
                    {
                        language: 'text',
                        code: `Physical:   Employee rows stored in pages, with an ID index
Logical:    Employee(employee_id, name, salary)
HR view:    employee_id, name, salary
Staff view: employee_id, name`,
                        result: 'Both user groups read the same underlying employees. Their external schemas expose different columns.',
                    },
                ],
            },
            {
                id: 'schemas-instances-independence',
                title: 'Schemas, instances, and data independence',
                bullets: [
                    'A schema is the design of the database. An instance is the data stored at a particular time.',
                    'Adding an employee changes the instance. Adding a column changes the schema.',
                    'Physical data independence allows storage changes without changing the logical schema or application queries. Adding an index is an example.',
                    'Logical data independence allows conceptual schema changes without changing existing views or applications. Suitable mappings must preserve their contracts.',
                    'A data model supplies concepts for describing structure, meaning, relationships, and constraints. ER and relational models are examples.',
                ],
            },
            {
                id: 'languages-and-administration',
                title: 'Languages, application access, and the DBA',
                bullets: [
                    'Data definition language, or DDL, defines schemas and constraints. CREATE TABLE is a DDL command.',
                    'Data manipulation language, or DML, reads or changes data. INSERT, UPDATE, and DELETE change rows.',
                    'A query requests data. SELECT is often described separately as data query language, or DQL.',
                    'SQL combines these kinds of commands in one language.',
                    'Applications send commands through drivers or APIs. JDBC serves Java applications. ODBC is another database access interface.',
                    'The database administrator, or DBA, manages schemas, storage, access methods, and authorisation.',
                    'The DBA also manages backups, recovery preparation, patches, and upgrades.',
                ],
            },
            {
                id: 'application-tiers',
                title: 'One, two, and three tiers',
                bullets: [
                    'One-tier architecture keeps the application and database on the same machine.',
                    'Two-tier architecture lets a client application call a database server directly through a driver.',
                    'Three-tier architecture places an application server between the client and database.',
                    'The application server runs business rules and database commands. The frontend sends requests to it.',
                    'Three tiers can support several application servers and central access checks. Correct validation and permissions are still required.',
                    'Tiers describe application responsibilities. The three schema levels describe views of data. They are separate concepts.',
                ],
                examples: [
                    {
                        language: 'text',
                        code: `Two tiers:   Desktop client → Database server
Three tiers: Browser → Application server → Database server`,
                        result: 'In the three-tier design, the browser asks the application server to perform an operation. It does not make direct database calls.',
                    },
                ],
            },
        ],
    },
    {
        slug: 'entity-relationship-model',
        title: 'Entity-relationship model',
        summary: 'Model entities, attributes, relationships, cardinality, weak entities, and extended ER features.',
        scope: 'dbms',
        updatedOn: '2026-10-10',
        sections: [
            {
                id: 'entities-and-attributes',
                title: 'Entities and attributes',
                bullets: [
                    'An entity is a distinguishable thing. It can be physical, such as a student, or abstract, such as a course.',
                    'An entity set groups entities of the same type. Student is an entity set. Student 42 is one entity.',
                    'An attribute describes an entity. Its domain is the set of allowed values.',
                    'A simple attribute has no smaller parts in the model. A composite attribute has parts, such as street and city in address.',
                    'A single-valued attribute has one value. A multivalued attribute can have several, such as phone numbers.',
                    'A derived attribute is calculated from other values. Age can be calculated from birth date and the current date.',
                    'NULL represents a missing value. It may mean unknown or not applicable. It is different from zero or empty text.',
                ],
            },
            {
                id: 'relationships-cardinality-participation',
                title: 'Relationships, cardinality, and participation',
                bullets: [
                    'A relationship associates entities. An enrolment associates a student with a course.',
                    'Relationship degree counts participating entity types or roles, rather than stored records.',
                    'A unary relationship relates entities of the same type, such as an employee managing another employee.',
                    'A binary relationship has two participating types. A ternary relationship records one association among three types.',
                    'Mapping cardinality limits how many entities can be related on each side.',
                    'One-to-one: each employee has at most one assigned locker. Each locker has at most one assigned employee.',
                    'One-to-many: a department has many employees. Each employee belongs to at most one department. The reverse is many-to-one.',
                    'Many-to-many: a student can attend many courses. A course can have many students.',
                    'Participation specifies the minimum. Total participation requires every entity to participate. Partial participation allows entities without that relationship.',
                    'If every loan needs a customer, loans have total participation. Customers who need no loans have partial participation.',
                ],
                examples: [
                    {
                        title: 'A ternary supply relationship',
                        language: 'text',
                        code: `Supply(supplier, part, project, quantity)
(S1, P7, Project-A, 50)
(S1, P7, Project-B, 20)`,
                        result: 'Quantity belongs to a particular supplier, part, and project together. Separate supplier–part and supplier–project relationships do not identify which part was supplied to each project.',
                    },
                ],
            },
            {
                id: 'weak-entities-and-notation',
                title: 'Weak entities and ER notation',
                bullets: [
                    'A strong entity has its own identifying key.',
                    'A weak entity depends on an owner entity for identification and existence.',
                    'A partial key identifies a weak entity within one owner. Combine it with the owner key for database-wide identification.',
                    'The identifying relationship connects the weak entity to its owner. The weak entity has total participation in that relationship.',
                    'In Chen notation, a rectangle represents an entity. A double rectangle represents a weak entity.',
                    'An oval represents an attribute. A double oval represents a multivalued attribute. A dashed oval represents a derived attribute.',
                    'Underline a key attribute. Use a dashed underline for a weak entity’s partial key.',
                    'A diamond represents a relationship. A double diamond represents an identifying relationship. A double connecting line marks total participation.',
                ],
                examples: [
                    {
                        language: 'text',
                        code: `Loan L1: Payment 1, Payment 2
Loan L2: Payment 1
Payment identity: (loan_id, payment_number)`,
                        result: 'Payment number 1 repeats across loans. The pair (L1, 1) identifies a different payment from (L2, 1).',
                    },
                ],
            },
            {
                id: 'extended-er-features',
                title: 'Extended ER features',
                bullets: [
                    'Specialisation starts with a general entity type and defines subtypes. Person can have Student and Employee subtypes.',
                    'Generalisation starts with types that share properties and defines a common supertype. Car and Bus can share Vehicle.',
                    'The subtype has an is-a relationship with its supertype. It inherits common attributes and applicable relationships.',
                    'A subtype adds its own attributes, such as Employee salary.',
                    'Disjoint subtypes do not overlap. Overlapping subtypes allow a person to be both Student and Employee.',
                    'Complete specialisation requires every supertype entity in a subtype. Partial specialisation allows entities in no subtype.',
                    'Aggregation treats a relationship and its entities as a unit that another relationship can reference.',
                    'For example, a manager monitors an employee’s assignment to a project. The monitored unit is that assignment, rather than the employee alone.',
                ],
            },
        ],
    },
    {
        slug: 'relational-model-and-er-mapping',
        title: 'Relational model and ER mapping',
        summary: 'Understand relations, keys, integrity rules, and how to turn an ER design into tables.',
        scope: 'dbms',
        updatedOn: '2026-10-10',
        sections: [
            {
                id: 'relations-and-keys',
                title: 'Relations and keys',
                bullets: [
                    'A relation organises data into tuples, or rows, and attributes, or columns. Its schema gives its name and attributes.',
                    'Each attribute has a domain. Each cell holds one value for that domain.',
                    'Relation degree counts attributes. Relation cardinality counts tuples. These differ from ER relationship degree and cardinality.',
                    'In the relational model, tuples are unique and their order has no meaning. SQL tables can contain duplicates unless constraints prevent them.',
                    'A superkey uniquely identifies a tuple. A candidate key is a superkey with no unnecessary attribute.',
                    'Choose one candidate key as the primary key. It need not have the fewest columns. The others are alternate keys.',
                    'A composite key contains several attributes. It can be a candidate key, primary key, or foreign key.',
                    'A foreign key references a key in another relation or the same relation. A suitable UNIQUE key can also be referenced.',
                    'A surrogate key is an artificial identifier, such as a generated ID. Business uniqueness still needs its own constraint.',
                    'Compound key is sometimes used for a composite key made from foreign keys. The term is not used consistently.',
                ],
                examples: [
                    {
                        language: 'text',
                        code: `Student(student_id, email, name)
Candidate keys: {student_id}, {email}
Primary key: {student_id}
Alternate key: {email}
Superkey: {student_id, name}`,
                        result: 'This assumes every student has a distinct, non-null email. The superkey includes name unnecessarily, so it is not a candidate key.',
                    },
                ],
            },
            {
                id: 'integrity-constraints',
                title: 'Integrity constraints',
                bullets: [
                    'Domain constraints restrict allowed values through types and rules, such as a non-negative price.',
                    'Entity integrity requires a primary key to identify each row uniquely. No part of a primary key can be NULL.',
                    'Referential integrity requires a non-null foreign key to match a referenced key. Nullable foreign keys allow optional relationships.',
                    'NOT NULL requires a value. UNIQUE prevents duplicate key values. NULL handling in UNIQUE constraints varies by database.',
                    'CHECK rejects rows whose condition is false. Use NOT NULL separately when missing values must also be rejected.',
                    'DEFAULT supplies a value when an insert omits the column. It does not by itself validate supplied values.',
                    'Foreign key actions can reject a referenced row’s deletion, cascade it, or set the reference to NULL.',
                ],
            },
            {
                id: 'map-entities-and-attributes',
                title: 'Map entities and attributes to tables',
                bullets: [
                    'Create a table for a strong entity. Map its simple attributes to columns and select its primary key.',
                    'Split composite attributes into needed parts, such as street and city.',
                    'Create a separate table for a multivalued attribute. Include the owner key and one attribute value per row.',
                    'Use the owner key and attribute value as a composite key when each value must be distinct for that owner.',
                    'A weak entity table uses the owner key as a foreign key. Its primary key combines that key and the partial key.',
                    'Usually calculate derived attributes when needed. Storing them requires a rule to keep them consistent with their source values.',
                ],
                examples: [
                    {
                        language: 'text',
                        code: `Customer(customer_id PK, name, street, city)
CustomerPhone(customer_id FK, phone_number)
  PK(customer_id, phone_number)
Loan(loan_id PK, customer_id FK)
Payment(loan_id FK, payment_number, amount)
  PK(loan_id, payment_number)`,
                        result: 'Each phone gets a separate row. Each payment uses its loan key and partial payment number. PK means primary key. FK means foreign key.',
                    },
                ],
            },
            {
                id: 'map-relationships-and-subtypes',
                title: 'Map relationships, subtypes, and aggregation',
                bullets: [
                    'For one-to-many, put the one-side key in the many-side table as a foreign key.',
                    'For one-to-one, use a foreign key with UNIQUE. Place it according to participation and lifecycle rules. NOT NULL requires participation.',
                    'For many-to-many, create a relationship table with foreign keys to both entities. Put relationship attributes in that table.',
                    'For a ternary relationship, create a table referencing all three entities. Choose its key from the actual cardinality rules.',
                    'For subtypes, store shared attributes in a supertype table. Each subtype table uses its key as primary key and foreign key.',
                    'Another option stores inherited attributes in each subtype table. The PDF uses this for disjoint, complete subtypes.',
                    'Subtype-only tables duplicate shared values when subtypes overlap. They cannot represent entities in no subtype.',
                    'For aggregation, first represent the underlying relationship. Let the higher-level relationship reference its identifying key.',
                ],
                examples: [
                    {
                        language: 'text',
                        code: `Department(department_id PK, name)
Employee(employee_id PK, department_id FK)
Course(course_id PK, title)
Enrolment(student_id FK, course_id FK, grade)
  PK(student_id, course_id)

Account(account_id PK, balance)
SavingsAccount(account_id PK and FK, interest_rate)
CurrentAccount(account_id PK and FK, overdraft_limit)`,
                        result: 'Employees reference one department. Enrolment records a student–course pair and its grade. Account stores shared values once. Subtype rows add account-specific attributes.',
                    },
                    {
                        language: 'text',
                        code: `Assignment(employee_id FK, project_id FK, hours)
  PK(employee_id, project_id)
Monitors(manager_id FK, employee_id, project_id)
  FK(employee_id, project_id) → Assignment
  PK(manager_id, employee_id, project_id)`,
                        result: 'A monitor row refers to an existing employee–project assignment. It cannot point at a pair that is absent from Assignment.',
                    },
                ],
            },
        ],
    },
];
