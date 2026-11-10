import type { GoNote } from '../types';

const note = {
    notionId: 'go-gorm-pool',
    slug: 'gorm-pool',
    title: 'GORM: connection pool',
    updatedOn: '2026-11-09',
    blocks: [
        { id: 'gorm-pool-role', type: 'sub_header', richText: [['Pool and connections']] },
        { id: 'gorm-pool-definition', type: 'bulleted_list', richText: [['A connection pool keeps database connections available for reuse. An operation borrows a connection and returns it when finished.']] },
        { id: 'gorm-pool-handle', type: 'bulleted_list', richText: [['db.DB()', [['c']]], [' returns GORM’s underlying '], ['*sql.DB', [['c']]], [' pool. It is safe for concurrent goroutines. It does not represent one permanent connection.']] },
        { id: 'gorm-pool-driver', type: 'bulleted_list', richText: [['GORM’s PostgreSQL integration uses '], ['pgx', [['c']]], [' through '], ['database/sql', [['c']]], ['. Its usual pool is '], ['*sql.DB', [['c']]], [', not '], ['pgxpool.Pool', [['c']]], ['. No separate '], ['pgxpool', [['c']]], [' is needed.']] },

        { id: 'gorm-pool-settings', type: 'sub_header', richText: [['Pool settings']] },
        { id: 'gorm-pool-open', type: 'bulleted_list', richText: [['SetMaxOpenConns', [['c']]], [' caps all open connections, including idle ones. The default is '], ['0', [['c']]], [', which means unlimited. At the cap, operations wait for a free connection.']] },
        { id: 'gorm-pool-idle', type: 'bulleted_list', richText: [['SetMaxIdleConns', [['c']]], [' caps unused connections retained for reuse. The current default is '], ['2', [['c']]], ['. A nonpositive value retains none. This limit cannot exceed a positive open-connection cap.']] },
        { id: 'gorm-pool-idle-time', type: 'bulleted_list', richText: [['SetConnMaxIdleTime', [['c']]], [' limits time spent unused. '], ['SetConnMaxLifetime', [['c']]], [' limits total connection age. Both default to no time limit. Expired connections may close lazily before reuse.']] },
        { id: 'gorm-pool-timeouts', type: 'bulleted_list', richText: [['Connection lifetime settings do not set query deadlines. '], ['WithContext(ctx)', [['c']]], [' gives database work cancellation and a deadline, including time spent waiting for a connection.']] },
        {
            id: 'gorm-pool-example', type: 'example', example: {
                title: 'Configure an existing GORM pool',
                language: 'go', runnable: false,
                description: ['This helper belongs in an application that already opens PostgreSQL with GORM. It receives that existing `db` handle during startup, before requests begin.', 'The application already has `gorm.io/gorm` and `gorm.io/driver/postgres` installed. This helper is not a standalone program.', 'The numbers demonstrate the settings. They are not recommended values for every application.'],
                code: `package main

import (
    "database/sql"
    "time"

    "gorm.io/gorm"
)

func configurePool(db *gorm.DB) (*sql.DB, error) {
    sqlDB, err := db.DB()
    if err != nil {
        return nil, err
    }
    sqlDB.SetMaxOpenConns(10)
    sqlDB.SetMaxIdleConns(5)
    sqlDB.SetConnMaxIdleTime(5 * time.Minute)
    sqlDB.SetConnMaxLifetime(30 * time.Minute)
    return sqlDB, nil
}`,
                explanation: ['`configurePool(db)` returns the same underlying pool after setting its limits. The application retains it for monitoring and shutdown.', '`SetMaxOpenConns(10)` permits at most ten connections in this pool. At most five unused connections remain available for reuse.', 'The idle and lifetime limits retire connections over time. They do not pre-create connections or cancel a running query.', 'The startup code checks the returned error before accepting requests. The application closes the pool only when its database work has finished.'],
            },
        },

        { id: 'gorm-pool-sizing', type: 'sub_header', richText: [['Connection budget']] },
        { id: 'gorm-pool-replicas', type: 'bulleted_list', richText: [['Each application instance has its own pool. Ten instances with a cap of ten can use up to one hundred database connections.']] },
        { id: 'gorm-pool-reserve', type: 'bulleted_list', richText: [['The total budget includes other services, background jobs, migrations, administrative access, and extra instances during deployment. PostgreSQL’s connection limit is shared by these clients.']] },
        { id: 'gorm-pool-capacity', type: 'bulleted_list', richText: [['More connections can increase database contention. Pool sizing depends on query duration, concurrent work, database capacity, and measured waiting.']] },
        { id: 'gorm-pool-tx', type: 'bulleted_list', richText: [['A transaction keeps its connection until commit or rollback. Calling the outer database handle inside a transaction can wait for another connection when the pool is full.']] },

        { id: 'gorm-pool-observe', type: 'sub_header', richText: [['Pool statistics']] },
        { id: 'gorm-pool-stats', type: 'bulleted_list', richText: [['sqlDB.Stats()', [['c']]], [' reports '], ['OpenConnections', [['c']]], [', '], ['InUse', [['c']]], [', and '], ['Idle', [['c']]], ['. These describe the current pool state.']] },
        { id: 'gorm-pool-waits', type: 'bulleted_list', richText: [['WaitCount', [['c']]], [' and '], ['WaitDuration', [['c']]], [' accumulate connection waits and total wait time. Differences between samples show waiting during that interval.']] },
        { id: 'gorm-pool-diagnose', type: 'bulleted_list', richText: [['Growing waits can accompany slow queries, long transactions, unreleased connections, or an insufficient cap. Pool statistics alone do not identify which cause applies.']] },

        { id: 'gorm-pool-lifecycle', type: 'sub_header', richText: [['Startup and shutdown']] },
        { id: 'gorm-pool-startup', type: 'bulleted_list', richText: [['The application opens and configures a shared pool during startup. Handlers reuse it. Opening a new pool for each request prevents useful reuse.']] },
        { id: 'gorm-pool-cleanup', type: 'bulleted_list', richText: [['Shutdown stops new work, waits for active handlers and jobs, then calls '], ['sqlDB.Close()', [['c']]], ['. A request handler does not close the shared pool.']] },
        { id: 'gorm-pool-resource', type: 'bulleted_list', richText: [['Transactions must commit or roll back. Explicitly acquired connections and raw query rows must close when finished so the pool can reuse their connections.']] },

        { id: 'gorm-pool-references', type: 'sub_header', richText: [['References']] },
        { id: 'gorm-pool-go-docs', type: 'bulleted_list', richText: [['Go connection management', [['a', 'https://go.dev/doc/database/manage-connections']]]] },
        { id: 'gorm-pool-api-docs', type: 'bulleted_list', richText: [['Pool settings and statistics', [['a', 'https://pkg.go.dev/database/sql#DB']]]] },
        { id: 'gorm-pool-gorm-docs', type: 'bulleted_list', richText: [['GORM connection pool', [['a', 'https://gorm.io/docs/connecting_to_the_database.html#Connection-Pool']]]] },
    ],
} as const satisfies GoNote;

export default note;
