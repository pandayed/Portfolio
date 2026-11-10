import type { GoNote } from '../types';

const note = {
    notionId: 'go-gorm-queries',
    slug: 'gorm-queries',
    title: 'GORM: queries and errors',
    updatedOn: '2026-11-09',
    blocks: [
        {"id": "gorm-read-heading", "type": "sub_header", "richText": [["Reading rows"]]},
        { id: 'gorm-read', type: 'bulleted_list', richText: [['Where', [['c']]], [' adds a condition. '], ['First', [['c']]], [' reads one row ordered by primary key. '], ['Find', [['c']]], [' reads matching rows into a slice.']] },
        { id: 'gorm-read-limit', type: 'bulleted_list', richText: [['Order', [['c']]], [', '], ['Limit', [['c']]], [', and '], ['Offset', [['c']]], [' control sorting and pagination. A stable order makes repeated pages predictable.']] },
        { id: 'gorm-errors', type: 'bulleted_list', richText: [['Check '], ['result.Error', [['c']]], [' after each operation. '], ['errors.Is(err, gorm.ErrRecordNotFound)', [['c']]], [' identifies a missing row from '], ['First', [['c']]], [', '], ['Take', [['c']]], [', or '], ['Last', [['c']]], ['.']] },
        { id: 'gorm-find-empty', type: 'bulleted_list', richText: [['Find', [['c']]], [' returns an empty slice without a not-found error when nothing matches. '], ['RowsAffected', [['c']]], [' reports the number of rows affected by the operation.']] },
        { id: 'gorm-query-safety', type: 'sub_header', richText: [['Query conditions and input safety']] },
        { id: 'gorm-placeholders', type: 'bulleted_list', richText: [['Where("title = ?", title)', [['c']]], [' binds title as a value. Concatenating external input into SQL can allow SQL injection.']] },
        { id: 'gorm-identifiers', type: 'bulleted_list', richText: [['Placeholders represent values, not column names or SQL syntax. External sort fields need an allowlist before use in '], ['Order', [['c']]], ['.']] },
        { id: 'gorm-zero-query', type: 'bulleted_list', richText: [["Struct conditions also skip zero values by default. Map conditions or explicit SQL conditions can match "], ["false",[["c"]]], [", 0, or an empty "], ["string",[["c"]]], ["."]] },
        {"id": "gorm-query-example", "type": "example", "example": {"title": "Find a book by ID", "description": ["This function belongs in a package importing `context` and `gorm.io/gorm`. It uses the `Book` model from the models lesson and an open GORM connection. The `books` table must already exist."], "language": "go", "runnable": false, "code": "func FindBook(ctx context.Context, db *gorm.DB, id uint) (Book, error) {\n    var book Book\n    err := db.WithContext(ctx).Where(\"id = ?\", id).First(&book).Error\n    return book, err\n}", "explanation": ["GORM converts the `?` value placeholder to PostgreSQL\u2019s parameter syntax.", "The caller checks the returned error, including `gorm.ErrRecordNotFound`."]}},
        {"id": "gorm-queries-reference", "type": "bulleted_list", "richText": [["Official documentation", [["a", "https://gorm.io/docs/query.html"]]]]},
    ],
} as const satisfies GoNote;

export default note;
