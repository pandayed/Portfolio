import type { GoNote } from '../types';

const note = {
    notionId: 'go-gorm',
    slug: 'gorm',
    title: 'GORM',
    updatedOn: '2026-10-18',
    blocks: [
        { id: 'gorm-role', type: 'sub_header', richText: [['GORM and relational databases']] },
        { id: 'gorm-definition', type: 'bulleted_list', richText: [['GORM is an object-relational mapper (ORM). It maps Go structs to database tables and builds SQL for database operations.']] },
        { id: 'gorm-driver', type: 'bulleted_list', richText: [['A database driver connects GORM to a database such as PostgreSQL, MySQL, or SQLite. The driver is a separate dependency.']] },
        { id: 'gorm-flow', type: 'bulleted_list', richText: [['Go value → GORM operation → SQL → database → result or error. Database constraints and SQL behavior still apply.']] },
        { id: 'gorm-api', type: 'bulleted_list', richText: [['These notes use GORM’s traditional API. Its operations return a '], ['*gorm.DB', [['c']]], [' result with '], ['Error', [['c']]], [' and '], ['RowsAffected', [['c']]], [' fields.']] },

        { id: 'gorm-models', type: 'sub_header', richText: [['Models and schema']] },
        { id: 'gorm-model', type: 'bulleted_list', richText: [['A model is a Go struct whose exported fields map to columns. By default, '], ['Book', [['c']]], [' maps to '], ['books', [['c']]], [' and '], ['AuthorID', [['c']]], [' maps to '], ['author_id', [['c']]], ['.']] },
        { id: 'gorm-key', type: 'bulleted_list', richText: [['ID', [['c']]], [' is the primary key by convention. A primary key uniquely identifies a row. Struct tags such as '], ['gorm:"primaryKey"', [['c']]], [' and '], ['gorm:"uniqueIndex"', [['c']]], [' change schema rules.']] },
        { id: 'gorm-null', type: 'bulleted_list', richText: [['A pointer field or a type such as '], ['sql.NullString', [['c']]], [' can represent SQL NULL. A plain string cannot distinguish NULL from an empty string.']] },
        { id: 'gorm-base', type: 'bulleted_list', richText: [['Embedding '], ['gorm.Model', [['c']]], [' adds ID, creation and update timestamps, and '], ['DeletedAt', [['c']]], ['. Embedding it is optional.']] },
        { id: 'gorm-migrate', type: 'bulleted_list', richText: [['AutoMigrate', [['c']]], [' creates missing tables, columns, indexes, and constraints from models. It can change some existing column types but does not remove unused columns.']] },
        { id: 'gorm-migration-history', type: 'bulleted_list', richText: [['Versioned migrations record explicit schema changes in order. They make renames, removals, and deployment review easier to control than automatic schema comparison.']] },

        { id: 'gorm-crud', type: 'sub_header', richText: [['Create, read, update, and delete']] },
        { id: 'gorm-create', type: 'bulleted_list', richText: [['Create(&book)', [['c']]], [' inserts a row and fills generated fields such as its ID. The pointer lets GORM update the Go value.']] },
        { id: 'gorm-read', type: 'bulleted_list', richText: [['Where', [['c']]], [' adds a condition. '], ['First', [['c']]], [' reads one row ordered by primary key. '], ['Find', [['c']]], [' reads matching rows into a slice.']] },
        { id: 'gorm-read-limit', type: 'bulleted_list', richText: [['Order', [['c']]], [', '], ['Limit', [['c']]], [', and '], ['Offset', [['c']]], [' control sorting and pagination. A stable order makes repeated pages predictable.']] },
        { id: 'gorm-errors', type: 'bulleted_list', richText: [['Check '], ['result.Error', [['c']]], [' after each operation. '], ['errors.Is(err, gorm.ErrRecordNotFound)', [['c']]], [' identifies a missing row from '], ['First', [['c']]], [', '], ['Take', [['c']]], [', or '], ['Last', [['c']]], ['.']] },
        { id: 'gorm-find-empty', type: 'bulleted_list', richText: [['Find', [['c']]], [' returns an empty slice without a not-found error when nothing matches. '], ['RowsAffected', [['c']]], [' reports the number of rows affected by the operation.']] },
        { id: 'gorm-update', type: 'bulleted_list', richText: [['Model(&book).Update', [['c']]], [' changes one column. '], ['Updates', [['c']]], [' changes several columns. A model with a nonzero primary key supplies an ID condition.']] },
        { id: 'gorm-zero', type: 'bulleted_list', richText: [['Updates', [['c']]], [' with a struct skips zero values by default. A map or explicit '], ['Select', [['c']]], [' includes values such as 0, false, and an empty string.']] },
        { id: 'gorm-save', type: 'bulleted_list', richText: [['Save', [['c']]], [' writes all fields and can insert when no row is updated. '], ['Updates', [['c']]], [' expresses an update without that insert fallback.']] },
        { id: 'gorm-delete', type: 'bulleted_list', richText: [['Delete(&book)', [['c']]], [' removes the row identified by its primary key. A model with '], ['gorm.DeletedAt', [['c']]], [' uses soft deletion: it records deletion time and ordinary queries hide the row.']] },
        {
            id: 'gorm-local-example', type: 'example', example: {
                title: 'A SQLite database stores and updates a book', language: 'go',
                description: ['The example creates an in-memory SQLite database. Its data disappears when the connection closes.', 'The SQLite driver requires CGO_ENABLED=1 and a working C compiler, such as GCC or Clang.', 'In a new directory, run go mod init example.com/gorm-notes, then go get gorm.io/gorm gorm.io/driver/sqlite. The selected releases must support the installed Go version.', 'Save the code as main.go. Run CGO_ENABLED=1 go run .'],
                code: `package main

import (
    "fmt"
    "log"

    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

type Book struct {
    ID    uint
    Title string
    Stock int
}

func main() {
    if err := run(); err != nil {
        log.Fatal(err)
    }
}

func run() error {
    db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
    if err != nil {
        return err
    }
    sqlDB, err := db.DB()
    if err != nil {
        return err
    }
    defer sqlDB.Close()
    sqlDB.SetMaxOpenConns(1)

    if err := db.AutoMigrate(&Book{}); err != nil {
        return err
    }
    book := Book{Title: "Go notes", Stock: 3}
    if err := db.Create(&book).Error; err != nil {
        return err
    }
    if err := db.Model(&book).Updates(map[string]any{"stock": 0}).Error; err != nil {
        return err
    }
    var found Book
    if err := db.Where("id = ?", book.ID).First(&found).Error; err != nil {
        return err
    }
    fmt.Printf("%s: stock=%d\\n", found.Title, found.Stock)

    if err := db.Delete(&found).Error; err != nil {
        return err
    }
    var remaining int64
    if err := db.Model(&Book{}).Count(&remaining).Error; err != nil {
        return err
    }
    fmt.Println("remaining:", remaining)
    return nil
}`,
                result: 'Go notes: stock=0\nremaining: 0',
                explanation: ['AutoMigrate creates books before the insert. Create writes the generated ID back into book.', 'The map includes zero, so the update changes stock from 3 to 0.', 'The query binds book.ID to the placeholder. It reads the saved row into found.', 'Book has no DeletedAt field, so Delete physically removes its row.', 'The one-connection limit keeps every operation on the same in-memory database. This setting is specific to this example.'],
            },
        },

        { id: 'gorm-query-safety', type: 'sub_header', richText: [['Query conditions and input safety']] },
        { id: 'gorm-placeholders', type: 'bulleted_list', richText: [['Where("title = ?", title)', [['c']]], [' binds title as a value. Concatenating external input into SQL can allow SQL injection.']] },
        { id: 'gorm-identifiers', type: 'bulleted_list', richText: [['Placeholders represent values, not column names or SQL syntax. External sort fields need an allowlist before use in '], ['Order', [['c']]], ['.']] },
        { id: 'gorm-zero-query', type: 'bulleted_list', richText: [['Struct conditions also skip zero values by default. Map conditions or explicit SQL conditions can match false, 0, or an empty string.']] },
        { id: 'gorm-global', type: 'bulleted_list', richText: [['GORM normally rejects updates and deletes without conditions with '], ['ErrMissingWhereClause', [['c']]], ['. A condition can still match many rows, so its scope matters.']] },
        { id: 'gorm-input-model', type: 'bulleted_list', richText: [['Request input and database models serve different purposes. Copy allowed request fields into an update rather than accepting arbitrary column names or protected model fields.']] },

        { id: 'gorm-transactions', type: 'sub_header', richText: [['Transactions and related records']] },
        { id: 'gorm-tx-definition', type: 'bulleted_list', richText: [['A transaction groups database changes so they commit together or roll back together. '], ['db.Transaction', [['c']]], [' supplies a transaction handle to a callback.']] },
        { id: 'gorm-tx-result', type: 'bulleted_list', richText: [['Inside the callback, operations use '], ['tx', [['c']]], [' instead of '], ['db', [['c']]], ['. Returning an error rolls back. Returning nil attempts a commit; the caller still checks the transaction’s returned error.']] },
        { id: 'gorm-relations', type: 'bulleted_list', richText: [['An association describes related models. A foreign key stores another row’s ID. Relations include belongs-to, has-one, has-many, and many-to-many.']] },
        { id: 'gorm-preload', type: 'bulleted_list', richText: [['Preload("Books")', [['c']]], [' loads the Books association with separate queries. Reading the parent alone does not automatically load every association.']] },

        { id: 'gorm-lifetime', type: 'sub_header', richText: [['Context and connection pool']] },
        { id: 'gorm-context', type: 'bulleted_list', richText: [['db.WithContext(ctx)', [['c']]], [' attaches cancellation and a deadline to operations. An HTTP handler can pass its request context to database work.']] },
        { id: 'gorm-pool', type: 'bulleted_list', richText: [['db.DB()', [['c']]], [' exposes the underlying '], ['*sql.DB', [['c']]], [' connection pool. A pool manages reusable connections rather than representing one permanent connection.']] },
        { id: 'gorm-pool-settings', type: 'bulleted_list', richText: [['SetMaxOpenConns', [['c']]], [', '], ['SetMaxIdleConns', [['c']]], [', and '], ['SetConnMaxLifetime', [['c']]], [' control pool size and connection reuse. Their values depend on database capacity and application load.']] },
        { id: 'gorm-close', type: 'bulleted_list', richText: [['The application usually opens its database handle during startup and closes the underlying pool during shutdown. Opening and closing it for every request prevents useful reuse.']] },

        { id: 'gorm-references', type: 'sub_header', richText: [['References']] },
        { id: 'gorm-docs', type: 'bulleted_list', richText: [['GORM guides', [['a', 'https://gorm.io/docs/']]]] },
        { id: 'gorm-update-docs', type: 'bulleted_list', richText: [['Updates and zero values', [['a', 'https://gorm.io/docs/update.html']]]] },
        { id: 'gorm-security-docs', type: 'bulleted_list', richText: [['Query security', [['a', 'https://gorm.io/docs/security.html']]]] },
        { id: 'gorm-sqlite-docs', type: 'bulleted_list', richText: [['SQLite driver and CGO requirements', [['a', 'https://github.com/mattn/go-sqlite3']]]] },
    ],
} as const satisfies GoNote;

export default note;
