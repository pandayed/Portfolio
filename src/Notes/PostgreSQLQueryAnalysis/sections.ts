import type { TocEntry } from '../../Blogs/ArticleLayout/types';

export const sections: TocEntry[] = [
    { id: 'query-analysis-sample', title: 'Create sample data' },
    { id: 'explain-and-analyze', title: 'EXPLAIN and EXPLAIN ANALYZE' },
    { id: 'read-plan-fields', title: 'Read the plan fields' },
    { id: 'scans-and-joins', title: 'Recognise scans and joins' },
    { id: 'read-buffers', title: 'Read buffer usage' },
    { id: 'planner-statistics', title: 'Check planner statistics' },
    { id: 'compare-query-plans', title: 'Compare before and after' },
    { id: 'query-analysis-checklist', title: 'Investigate a slow query' },
];
