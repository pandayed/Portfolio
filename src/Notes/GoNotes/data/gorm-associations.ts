import type { GoNote } from '../types';

const note = {
    notionId: 'go-gorm-associations',
    slug: 'gorm-associations',
    title: 'GORM: associations',
    updatedOn: '2026-11-09',
    blocks: [
        {"id": "gorm-assoc-heading", "type": "sub_header", "richText": [["Related records"]]},
        { id: 'gorm-relations', type: 'bulleted_list', richText: [["An association describes related models. A foreign key stores another row’s "], ["ID",[["c"]]], [". Relations include belongs-to, has-one, has-many, and many-to-many."]] },
        { id: 'gorm-preload', type: 'bulleted_list', richText: [['Preload("Books")', [['c']]], [' loads the Books association with separate queries. Reading the parent alone does not automatically load every association.']] },

        {"id": "gorm-assoc-fk", "type": "bulleted_list", "richText": [["A foreign-key constraint checks that a referenced row exists. An association in Go and a database constraint serve different roles."]]},
        {"id": "gorm-association-example", "type": "example", "example": {"title": "Define an author with books", "description": ["These models belong in the same package. They show a has-many association. Database queries require matching tables and foreign keys created by migrations."], "language": "go", "runnable": false, "code": "type Author struct {\n    ID    uint\n    Name  string\n    Books []Book\n}\n\ntype Book struct {\n    ID       uint\n    Title    string\n    Stock    int\n    AuthorID uint\n}", "explanation": ["`AuthorID` links a book to its author.", "This definition replaces the simpler `Book` model when learning associations.", "`db.Preload(\"Books\").First(&author, id)` loads the author and its books. The caller checks the returned `Error`."]}},
        {"id": "gorm-associations-reference", "type": "bulleted_list", "richText": [["Official documentation", [["a", "https://gorm.io/docs/has_many.html"]]]]},
    ],
} as const satisfies GoNote;

export default note;
