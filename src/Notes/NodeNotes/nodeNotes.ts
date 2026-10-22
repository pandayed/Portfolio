import type { LearningChapter } from '../LearningNotes/types';
import runtime from './data/runtime';
import modules from './data/modules';
import npm from './data/npm';
import files from './data/files';
import process from './data/process';
import http from './data/http';

export const nodeChapters: readonly LearningChapter[] = [
    {
        id: 'programs-and-packages',
        title: '1. Programs and packages',
        summary: 'Run JavaScript outside the browser, split code into modules, and manage a project with npm.',
        notes: [runtime, modules, npm],
    },
    {
        id: 'system-and-server',
        title: '2. Files, process settings, and HTTP',
        summary: 'Read and write files, accept program settings, and serve a local HTTP response.',
        notes: [files, process, http],
    },
];

export const nodeLearningNotes = nodeChapters.flatMap((chapter) => chapter.notes);
