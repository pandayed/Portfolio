import sourceWordCounts from 'virtual:note-word-counts';

import {
    JAVA_NOTES_ROUTE,
    GO_NOTES_ROUTE,
    JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE,
    PYTHON_NOTES_ROUTE,
    REACT_NOTES_ROUTE,
    type Route,
} from '../routing/routes';
import { javaLearningNotes } from './JavaNotes/javaNotes';
import { goNotes } from './GoNotes/goNotes';
import type { GoNoteBlock } from './GoNotes/types';
import { javascriptTypeScriptNotes } from './JavaScriptTypeScriptNotes/javascriptTypeScriptNotes';
import type { LearningNote } from './LearningNotes/types';
import { pythonNotes } from './PythonNotes/pythonNotes';
import type { PythonInlineContent } from './PythonNotes/types';
import { reactNotes } from './ReactNotes/reactNotes';
import { systemDesignPages } from './SystemDesign/registry';
import type { NoteNode } from './noteTreeData';

export const READING_WORDS_PER_MINUTE = 200;

const countWords = (text: string) =>
    text.match(/[\p{L}\p{N}_]+(?:['’-][\p{L}\p{N}_]+)*/gu)?.length ?? 0;

const inlineText = (content: PythonInlineContent): string =>
    typeof content === 'string'
        ? content
        : content.map((part) => typeof part === 'string' ? part : part.text).join('');

const goBlockText = (blocks: readonly GoNoteBlock[]): string =>
    blocks.map((block) => [
        block.richText?.map(([text]) => text).join('') ?? '',
        ...Object.values(block.cells ?? {}).map((cell) => cell.map(([text]) => text).join('')),
        goBlockText(block.children ?? []),
    ].join(' ')).join(' ');

const learningNoteText = (note: LearningNote): string => [
    note.title,
    note.summary,
    ...note.sections.flatMap((section) => [
        section.title,
        ...(section.paragraphs ?? []),
        ...(section.bullets ?? []),
        ...(section.examples ?? []).flatMap((example) => [
            example.title ?? '',
            example.code,
            example.result ?? '',
            example.typeCheck ?? '',
        ]),
        ...(section.pitfalls ?? []),
    ]),
].join(' ');

const pageWordCounts = new Map<string, number>(Object.entries(sourceWordCounts));

for (const note of pythonNotes) {
    const text = [note.title, ...note.sections.flatMap((section) => [
        section.title,
        ...(section.paragraphs ?? []).map(inlineText),
        ...(section.bullets ?? []).map(inlineText),
        ...(section.examples ?? []).flatMap((example) => [
            example.title ?? '', example.code, example.result ?? '',
        ]),
        ...(section.exceptions ?? []),
    ])].join(' ');
    const diagramWords = note.sections.reduce((total, section) =>
        total + (section.diagram ? sourceWordCounts[section.diagram] ?? 0 : 0), 0);
    pageWordCounts.set(`${PYTHON_NOTES_ROUTE}/${note.slug}`, countWords(text) + diagramWords);
}

for (const note of goNotes) {
    pageWordCounts.set(`${GO_NOTES_ROUTE}/${note.slug}`, countWords(`${note.title} ${goBlockText(note.blocks)}`));
}

for (const note of javascriptTypeScriptNotes) {
    pageWordCounts.set(
        `${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/${note.slug}`,
        countWords(learningNoteText(note)),
    );
}

for (const note of javaLearningNotes) {
    pageWordCounts.set(`${JAVA_NOTES_ROUTE}/${note.slug}`, countWords(learningNoteText(note)));
}

for (const note of reactNotes) {
    pageWordCounts.set(`${REACT_NOTES_ROUTE}/${note.slug}`, countWords(learningNoteText(note)));
}

for (const page of systemDesignPages) {
    pageWordCounts.set(page.route, sourceWordCounts[page.id] ?? 0);
}

export const getPageWordCount = (route: Route): number => pageWordCounts.get(route) ?? 0;

export const getPageReadingMinutes = (route: Route): number =>
    Math.max(1, Math.ceil(getPageWordCount(route) / READING_WORDS_PER_MINUTE));

// Add the displayed child minutes, rather than rounding their combined words again.
export const getNodeReadingMinutes = (node: NoteNode): number =>
    node.type === 'page'
        ? getPageReadingMinutes(node.route)
        : getTotalReadingMinutes(node.children);

export const getTotalReadingMinutes = (nodes: readonly NoteNode[]): number =>
    nodes.reduce((total, node) => total + getNodeReadingMinutes(node), 0);

export const readingTimeNodeKey = (node: NoteNode): string => `${node.type}:${node.route}`;

// Groups and pages can share a route. Preserve both values before tree filtering.
export const collectReadingMinutes = (nodes: readonly NoteNode[]): ReadonlyMap<string, number> => {
    const minutes = new Map<string, number>();
    const collect = (node: NoteNode): number => {
        const value = node.type === 'page'
            ? getPageReadingMinutes(node.route)
            : node.children.reduce((total, child) => total + collect(child), 0);
        minutes.set(readingTimeNodeKey(node), value);
        return value;
    };
    nodes.forEach(collect);
    return minutes;
};
