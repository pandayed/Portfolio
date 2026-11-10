import type { GoNote } from '../types';

const note = {
    notionId: 'go-gorm-connection',
    slug: 'gorm-connection',
    title: 'GORM: PostgreSQL connection',
    updatedOn: '2026-11-09',
    blocks: [
        {"id": "gorm-connection-heading", "type": "sub_header", "richText": [["PostgreSQL configuration"]]},
        {"id": "gorm-connection-dsn", "type": "bulleted_list", "richText": [["A DSN (data source name) holds connection settings: host, port, database, user, and authentication options."]]},
        {"id": "gorm-connection-env", "type": "bulleted_list", "richText": [["DATABASE_URL", [["c"]]], [" is the application environment variable used here. PostgreSQL does not create this variable automatically. Credentials stay outside source files and logs."]]},
        {"id": "gorm-connection-url", "type": "bulleted_list", "richText": [["A URL connection string needs URL encoding for reserved characters inside credentials, such as "], ["@", [["c"]]], [" and "], ["#", [["c"]]], ["."]]},
        {"id": "gorm-connection-tls", "type": "bulleted_list", "richText": [["sslmode=verify-full", [["c"]]], [" encrypts traffic and checks the certificate and hostname. The trusted CA configuration depends on the database provider. "], ["sslmode=disable", [["c"]]], [" is only suitable for trusted local development."]]},
        {"id": "gorm-connection-ping", "type": "bulleted_list", "richText": [["gorm.Open", [["c"]]], [" pings automatically unless "], ["DisableAutomaticPing", [["c"]]], [" is enabled. An explicit "], ["PingContext", [["c"]]], [" allows a startup deadline."]]},
        { id: 'gorm-connect-example', type: 'example', example: {
                title: 'Open and check a PostgreSQL connection', language: 'go', runnable: false,
                description: ['The example requires a running PostgreSQL server, an existing database, and a user allowed to connect. It changes no stored data.', 'The files are saved in a new directory. The installed Go version must support the selected dependency releases.', '`DATABASE_URL` must be supplied in the process environment with the server’s connection settings and TLS configuration.', '`go get` installs GORM and its PostgreSQL integration. The integration downloads `pgx` automatically.'],
                code: '',
                files: [{ name: 'main.go', language: 'go', code: `package main

import (
    "context"
    "fmt"
    "log"
    "os"
    "time"

    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

func main() {
    if err := run(); err != nil {
        log.Fatal(err)
    }
}

func run() error {
    dsn := os.Getenv("DATABASE_URL")
    if dsn == "" {
        return fmt.Errorf("DATABASE_URL is required")
    }
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
        DisableAutomaticPing: true,
    })
    if err != nil {
        return fmt.Errorf("database configuration failed")
    }
    sqlDB, err := db.DB()
    if err != nil {
        return err
    }
    defer sqlDB.Close()
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    if err := sqlDB.PingContext(ctx); err != nil {
        return fmt.Errorf("database connection check failed")
    }
    fmt.Println("PostgreSQL connected")
    return nil
}` },
                    { name: 'go.mod', language: 'text', code: 'module example.com/gorm-notes\n' },
                ],
                commands: 'go get gorm.io/gorm gorm.io/driver/postgres\ngo run .',
                result: 'PostgreSQL connected',
                explanation: ['`db.DB()` exposes the underlying connection pool. `PingContext` checks connectivity within five seconds.', '`run` returns before `log.Fatal` executes, so deferred cleanup runs on failure.', 'The output requires a successful connection. Configuration, TLS, network, and authentication failures produce an error instead.', 'A server retains the shared database handle after startup. It closes the pool during application shutdown rather than after each request.'],
            } },
        {"id": "gorm-connection-reference", "type": "bulleted_list", "richText": [["Official documentation", [["a", "https://gorm.io/docs/connecting_to_the_database.html#PostgreSQL"]]]]},
    ],
} as const satisfies GoNote;

export default note;
