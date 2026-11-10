import type { GoNote } from '../types';

const note = {
    notionId: 'go-gorm-models',
    slug: 'gorm-models',
    title: 'GORM: models and migrations',
    updatedOn: '2026-11-09',
    blocks: [
        { id: 'gorm-models', type: 'sub_header', richText: [['Models and schema']] },
        { id: 'gorm-model', type: 'bulleted_list', richText: [['A model is a Go struct whose exported fields map to columns. By default, '], ['Book', [['c']]], [' maps to '], ['books', [['c']]], [' and '], ['AuthorID', [['c']]], [' maps to '], ['author_id', [['c']]], ['.']] },
        { id: 'gorm-key', type: 'bulleted_list', richText: [['ID', [['c']]], [' is the primary key by convention. A primary key uniquely identifies a row. Struct tags such as '], ['gorm:"primaryKey"', [['c']]], [' and '], ['gorm:"uniqueIndex"', [['c']]], [' change schema rules.']] },
        { id: 'gorm-null', type: 'bulleted_list', richText: [['A pointer field or a type such as '], ['sql.NullString', [['c']]], [" can represent SQL NULL. A plain "], ["string",[["c"]]], [" cannot distinguish NULL from an empty "], ["string",[["c"]]], ["."]] },
        { id: 'gorm-base', type: 'bulleted_list', richText: [['Embedding '], ['gorm.Model', [['c']]], [" adds "], ["ID",[["c"]]], [", creation and update timestamps, and "], ['DeletedAt', [['c']]], ['. Embedding it is optional.']] },
        { id: 'gorm-migrate', type: 'bulleted_list', richText: [['AutoMigrate', [['c']]], [' creates missing tables, columns, indexes, and constraints from models. It can change some existing column types but does not remove unused columns.']] },
        { id: 'gorm-migration-history', type: 'bulleted_list', richText: [['Versioned migrations record explicit schema changes in order. They make renames, removals, and deployment review easier to control than automatic schema comparison.']] },

        {"id": "gorm-migrate-existing", "type": "bulleted_list", "richText": [["AutoMigrate", [["c"]]], [" requires schema permissions. In production, schema changes can run as a separate deployment step with a migration user."]]},
        {"id": "gorm-model-example", "type": "example", "example": {"title": "Define a PostgreSQL book model", "description": ["This model belongs in the same Go package as the database code. It defines the fields used in the query and write lessons."], "language": "go", "runnable": false, "code": "type Book struct {\n    ID    uint   `gorm:\"primaryKey\"`\n    Title string `gorm:\"not null\"`\n    Stock int\n}", "explanation": ["`ID` uses GORM\u2019s primary-key convention. PostgreSQL generates its value when a row is inserted.", "`not null` rejects SQL NULL for the title. It does not reject an empty string."]}},
        {"id": "gorm-models-reference", "type": "bulleted_list", "richText": [["Official documentation", [["a", "https://gorm.io/docs/models.html"]]]]},
    ],
} as const satisfies GoNote;

export default note;
