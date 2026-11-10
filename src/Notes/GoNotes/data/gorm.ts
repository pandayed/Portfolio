import type { GoNote } from '../types';

const note = {
    notionId: 'go-gorm',
    slug: 'gorm',
    title: 'GORM: getting started',
    updatedOn: '2026-11-09',
    blocks: [
        { id: 'gorm-role', type: 'sub_header', richText: [['GORM and PostgreSQL']] },
        { id: 'gorm-definition', type: 'bulleted_list', richText: [['GORM is an object-relational mapper (ORM). It maps Go structs to database tables and builds SQL for database operations.']] },
        { id: 'gorm-driver', type: 'bulleted_list', richText: [['These notes use PostgreSQL with '], ['gorm.io/driver/postgres', [['c']]], ['. This integration uses '], ['pgx', [['c']]], [' as its underlying PostgreSQL driver.']] },
        { id: 'gorm-driver-install', type: 'bulleted_list', richText: [['Installing '], ['gorm.io/driver/postgres', [['c']]], [' automatically downloads '], ['pgx', [['c']]], [' as a dependency. Ordinary GORM usage needs no separate installation or import of '], ['pgx', [['c']]], ['.']] },
        { id: 'gorm-core-driver', type: 'bulleted_list', richText: [['gorm.io/gorm', [['c']]], [' alone provides the ORM. The PostgreSQL integration is installed separately.']] },
        { id: 'gorm-flow', type: 'bulleted_list', richText: [['Go value → GORM operation → SQL → database → result or error. Database constraints and SQL behavior still apply.']] },
        { id: 'gorm-api', type: 'bulleted_list', richText: [['These notes use GORM’s traditional API. Its operations return a '], ['*gorm.DB', [['c']]], [' result with '], ['Error', [['c']]], [' and '], ['RowsAffected', [['c']]], [' fields.']] },

        {"id": "gorm-link-gorm-connection", "type": "bulleted_list", "richText": [["PostgreSQL connection", [["a", "/#/notes/go/gorm-connection"]]]]},
        {"id": "gorm-link-gorm-pool", "type": "bulleted_list", "richText": [["Connection pool", [["a", "/#/notes/go/gorm-pool"]]]]},
        {"id": "gorm-link-gorm-models", "type": "bulleted_list", "richText": [["Models and migrations", [["a", "/#/notes/go/gorm-models"]]]]},
        {"id": "gorm-link-gorm-queries", "type": "bulleted_list", "richText": [["Queries and errors", [["a", "/#/notes/go/gorm-queries"]]]]},
        {"id": "gorm-link-gorm-writes", "type": "bulleted_list", "richText": [["Create, update, and delete", [["a", "/#/notes/go/gorm-writes"]]]]},
        {"id": "gorm-link-gorm-transactions", "type": "bulleted_list", "richText": [["Transactions", [["a", "/#/notes/go/gorm-transactions"]]]]},
        {"id": "gorm-link-gorm-associations", "type": "bulleted_list", "richText": [["Associations", [["a", "/#/notes/go/gorm-associations"]]]]},
        {"id": "gorm-reference", "type": "bulleted_list", "richText": [["Official documentation", [["a", "https://gorm.io/docs/"]]]]},
    ],
} as const satisfies GoNote;

export default note;
