import type { GoNote } from '../types';

const note = {
    notionId: 'go-gorm-transactions',
    slug: 'gorm-transactions',
    title: 'GORM: transactions',
    updatedOn: '2026-11-09',
    blocks: [
        {"id": "gorm-tx-heading", "type": "sub_header", "richText": [["Transaction scope"]]},
        { id: 'gorm-tx-definition', type: 'bulleted_list', richText: [['A transaction groups database changes so they commit together or roll back together. '], ['db.Transaction', [['c']]], [' supplies a transaction handle to a callback.']] },
        { id: 'gorm-tx-result', type: 'bulleted_list', richText: [['Inside the callback, operations use '], ['tx', [['c']]], [' instead of '], ['db', [['c']]], [". Returning an error rolls back. Returning "], ["nil",[["c"]]], [" attempts a commit; the caller still checks the transaction’s returned error."]] },
        {"id": "gorm-tx-default", "type": "bulleted_list", "richText": [["GORM wraps each create, update, or delete operation in a transaction by default. A sequence of separate calls needs an explicit transaction to commit together."]]},
        {"id": "gorm-tx-short", "type": "bulleted_list", "richText": [["A transaction holds a connection until it ends. Network calls and other slow work inside it increase connection use and lock duration."]]},
        {"id": "gorm-tx-example", "type": "example", "example": {"title": "Create two books in one transaction", "description": ["This function belongs in a package importing `context` and `gorm.io/gorm`. It uses the `Book` model and an existing `books` table. It inserts two rows when the transaction commits."], "language": "go", "runnable": false, "code": "func CreateBooks(ctx context.Context, db *gorm.DB) error {\n    return db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {\n        if err := tx.Create(&Book{Title: \"Go\", Stock: 2}).Error; err != nil {\n            return err\n        }\n        return tx.Create(&Book{Title: \"PostgreSQL\", Stock: 3}).Error\n    })\n}", "explanation": ["Both inserts use `tx`. An insert error rolls back the transaction.", "Returning nil from the callback attempts the commit. `CreateBooks` returns a commit error if it fails."]}},
        {"id": "gorm-transactions-reference", "type": "bulleted_list", "richText": [["Official documentation", [["a", "https://gorm.io/docs/transactions.html"]]]]},
    ],
} as const satisfies GoNote;

export default note;
