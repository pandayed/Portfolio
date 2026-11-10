import type { GoNote } from '../types';

const note = {
    notionId: 'go-gorm-writes',
    slug: 'gorm-writes',
    title: 'GORM: create, update, and delete',
    updatedOn: '2026-11-09',
    blocks: [
        {"id": "gorm-write-heading", "type": "sub_header", "richText": [["Writing rows"]]},
        { id: 'gorm-create', type: 'bulleted_list', richText: [['Create(&book)', [['c']]], [" inserts a row and fills generated fields such as its "], ["ID",[["c"]]], [". The pointer lets GORM update the Go value."]] },
        { id: 'gorm-update', type: 'bulleted_list', richText: [['Model(&book).Update', [['c']]], [' changes one column. '], ['Updates', [['c']]], [" changes several columns. A model with a nonzero primary key supplies an "], ["ID",[["c"]]], [" condition."]] },
        { id: 'gorm-zero', type: 'bulleted_list', richText: [['Updates', [['c']]], [' with a struct skips zero values by default. A map or explicit '], ['Select', [['c']]], [" includes values such as 0, "], ["false",[["c"]]], [", and an empty "], ["string",[["c"]]], ["."]] },
        { id: 'gorm-save', type: 'bulleted_list', richText: [['Save', [['c']]], [' writes all fields and can insert when no row is updated. '], ['Updates', [['c']]], [' expresses an update without that insert fallback.']] },
        { id: 'gorm-delete', type: 'bulleted_list', richText: [['Delete(&book)', [['c']]], [' removes the row identified by its primary key. A model with '], ['gorm.DeletedAt', [['c']]], [' uses soft deletion: it records deletion time and ordinary queries hide the row.']] },
        { id: 'gorm-global', type: 'bulleted_list', richText: [['GORM normally rejects updates and deletes without conditions with '], ['ErrMissingWhereClause', [['c']]], ['. A condition can still match many rows, so its scope matters.']] },
        { id: 'gorm-input-model', type: 'bulleted_list', richText: [['Request input and database models serve different purposes. Copy allowed request fields into an update rather than accepting arbitrary column names or protected model fields.']] },

        {"id": "gorm-write-example", "type": "example", "example": {"title": "Include a zero stock value in an update", "description": ["This function belongs in a package importing `context` and `gorm.io/gorm`. It uses the `Book` model and an existing `books` table. The caller supplies an open connection and the target book ID."], "language": "go", "runnable": false, "code": "func SetStock(ctx context.Context, db *gorm.DB, id uint, stock int) error {\n    result := db.WithContext(ctx).Model(&Book{}).\n        Where(\"id = ?\", id).\n        Updates(map[string]any{\"stock\": stock})\n    return result.Error\n}", "explanation": ["The map includes `stock` even when its value is zero.", "The explicit ID condition limits the update. A successful query affecting zero rows does not produce `gorm.ErrRecordNotFound`."]}},
        {"id": "gorm-writes-reference", "type": "bulleted_list", "richText": [["Official documentation", [["a", "https://gorm.io/docs/update.html"]]]]},
    ],
} as const satisfies GoNote;

export default note;
