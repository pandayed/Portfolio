import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import ts from 'typescript';
import type { Plugin, ViteDevServer } from 'vite';

const moduleId = 'virtual:note-word-counts';
const resolvedModuleId = `\0${moduleId}`;
const contentAttributes = new Set(['title', 'summary', 'caption', 'columns', 'rows', 'alt', 'description']);
const metadataProperties = new Set(['id', 'href', 'route', 'slug', 'updatedOn', 'language', 'className', 'x', 'y']);
const htmlEntities: Record<string, string> = {
    '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'",
};

const decodeEntities = (value: string) => value
    .replace(/&#(x[\da-f]+|\d+);/gi, (_, code: string) => {
        const point = code.startsWith('x') ? parseInt(code.slice(1), 16) : Number(code);
        return point <= 0x10ffff ? String.fromCodePoint(point) : ' ';
    })
    .replace(/&(?:nbsp|amp|lt|gt|quot|apos);/g, (entity) => htmlEntities[entity] ?? ' ');

const plainText = (value: string) => decodeEntities(value
    .replace(/<(?:br|\/p|\/div|\/li)\b[^>]*>/gi, ' ')
    .replace(/<[^>]*>/g, ''));

const words = (value: string) =>
    decodeEntities(value).match(/[\p{L}\p{N}_]+(?:['’-][\p{L}\p{N}_]+)*/gu)?.length ?? 0;

const parse = (path: string) => ts.createSourceFile(
    path, readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true,
    path.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
);

const filesUnder = (directory: string): string[] => readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => entry.isDirectory()
        ? filesUnder(join(directory, entry.name)) : [join(directory, entry.name)]);

const propertyName = (name: ts.PropertyName) =>
    ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : '';

// Only literal content is read. Imports, executable expressions and type syntax
// never become words, while code samples stored as strings remain content.
const literalWords = (node: ts.Node): number => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isNumericLiteral(node)) {
        return words(node.text);
    }
    if (ts.isTemplateExpression(node)) {
        return words(node.head.text + node.templateSpans.map((span) => span.literal.text).join(' '));
    }
    if (ts.isArrayLiteralExpression(node)) return node.elements.reduce((sum, item) => sum + literalWords(item), 0);
    if (ts.isObjectLiteralExpression(node)) return node.properties.reduce((sum, property) =>
        sum + (ts.isPropertyAssignment(property) && !metadataProperties.has(propertyName(property.name))
            ? literalWords(property.initializer) : 0), 0);
    if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node)) {
        return literalWords(node.expression);
    }
    if (ts.isConditionalExpression(node)) return literalWords(node.whenTrue) + literalWords(node.whenFalse);
    return 0;
};

const sourceWords = (source: ts.SourceFile): number => {
    let count = 0;
    const visit = (node: ts.Node) => {
        if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)
            || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) return;
        if (ts.isVariableDeclaration(node)) {
            if (ts.isIdentifier(node.name) && node.name.text === 'sections') return;
            if (node.initializer) count += literalWords(node.initializer);
        }
        if (ts.isJsxText(node)) count += words(node.text);
        if (ts.isJsxAttribute(node)) {
            if (contentAttributes.has(node.name.getText(source)) && node.initializer) {
                count += ts.isJsxExpression(node.initializer) && node.initializer.expression
                    ? literalWords(node.initializer.expression) : literalWords(node.initializer);
            }
            return;
        }
        if (ts.isJsxExpression(node) && node.expression) count += literalWords(node.expression);
        ts.forEachChild(node, visit);
    };
    visit(source);
    return count;
};

const articleRoute = (source: ts.SourceFile, routes: Map<string, string>): string | undefined => {
    let route: string | undefined;
    const visit = (node: ts.Node) => {
        if (ts.isJsxOpeningElement(node) && node.tagName.getText(source) === 'ArticleLayout') {
            const attribute = node.attributes.properties.find((property) =>
                ts.isJsxAttribute(property) && property.name.getText(source) === 'route');
            if (attribute && ts.isJsxAttribute(attribute) && attribute.initializer
                && ts.isJsxExpression(attribute.initializer) && attribute.initializer.expression
                && ts.isIdentifier(attribute.initializer.expression)) {
                route = routes.get(attribute.initializer.expression.text);
            }
        }
        ts.forEachChild(node, visit);
    };
    visit(source);
    return route;
};

interface DocumentBlock {
    id: string;
    type: string;
    html?: string;
    text?: string;
    tex?: string;
    title?: string;
    links?: { text: string }[];
    rows?: { html: string }[][];
    pageIds?: string[];
}
interface NoteDocument {
    id: string;
    title?: string;
    blocks: DocumentBlock[];
}

export default function noteWordCounts(): Plugin {
    let root = '';
    let trackedFiles = new Set<string>();

    const collect = () => {
        const result: Record<string, number> = {};
        const notesDirectory = join(root, 'src/Notes');
        const routesFile = join(root, 'src/routing/routes.ts');
        const routes = new Map<string, string>();
        const visitRoute = (node: ts.Node) => {
            if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)
                && node.initializer && ts.isStringLiteral(node.initializer)) {
                routes.set(node.name.text, node.initializer.text);
            }
            ts.forEachChild(node, visitRoute);
        };
        visitRoute(parse(routesFile));
        trackedFiles = new Set([routesFile]);
        const allFiles = filesUnder(notesDirectory);
        for (const file of allFiles.filter((entry) => entry.endsWith('.tsx'))) {
            const source = parse(file);
            const route = articleRoute(source, routes);
            const diagram = file === join(notesDirectory, 'PythonNotes/PythonRunSequence.tsx');
            if (!route && !diagram) continue;
            trackedFiles.add(file);
            result[route ?? 'python-run-sequence'] = sourceWords(source);
            if (route && route === routes.get('PROGRAMMING_DICTIONARY_ROUTE')) {
                const termsFile = join(notesDirectory, 'ProgrammingDictionary/terms.ts');
                trackedFiles.add(termsFile);
                const visitTerm = (node: ts.Node) => {
                    if (ts.isPropertyAssignment(node) && ['term', 'definition'].includes(propertyName(node.name))) {
                        result[route] += literalWords(node.initializer);
                        return;
                    }
                    ts.forEachChild(node, visitTerm);
                };
                visitTerm(parse(termsFile));
            }
        }
        const documents = new Map<string, NoteDocument>();
        const shared = new Map<string, NoteDocument>();
        for (const file of allFiles.filter((entry) => /SystemDesign\/(?:pages|shared)\/.*\.json$/.test(entry))) {
            trackedFiles.add(file);
            const document = JSON.parse(readFileSync(file, 'utf8')) as NoteDocument;
            (file.includes('/shared/') ? shared : documents).set(document.id, document);
        }
        const blockWords = (blocks: DocumentBlock[], seen = new Set<string>()): number => blocks.reduce((sum, block) => {
            if (block.type === 'shared_ref') {
                const document = shared.get(block.id);
                return sum + (document && !seen.has(block.id)
                    ? blockWords(document.blocks, new Set([...seen, block.id])) : 0);
            }
            if (block.type === 'alias') return sum + words(block.links?.[0]?.text ?? '');
            if (block.type === 'equation') return sum + words(block.tex ?? '');
            if (block.type === 'table') return sum + (block.rows ?? []).flat()
                .reduce((total, cell) => total + words(plainText(cell.html)), 0);
            if (block.type === 'collection_view') return sum + words(block.title ?? '')
                + (block.pageIds ?? []).reduce((total, id) => total + words(documents.get(id)?.title ?? ''), 0);
            return sum + words(block.html !== undefined ? plainText(block.html) : block.text ?? '');
        }, 0);
        for (const document of documents.values()) {
            result[document.id] = words(document.title ?? '') + blockWords(document.blocks);
        }
        return result;
    };

    const invalidate = (server: ViteDevServer) => {
        const module = server.moduleGraph.getModuleById(resolvedModuleId);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: 'full-reload' });
    };

    return {
        name: 'note-word-counts',
        configResolved(config) { root = config.root; },
        resolveId(id) { if (id === moduleId) return resolvedModuleId; },
        load(id) {
            if (id !== resolvedModuleId) return;
            const counts = collect();
            for (const file of trackedFiles) this.addWatchFile(file);
            return `export default ${JSON.stringify(counts)};`;
        },
        handleHotUpdate(context) {
            if (!trackedFiles.has(context.file)) return;
            invalidate(context.server);
        },
        configureServer(server) {
            const onFileInventoryChange = (file: string) => {
                const path = relative(root, file).replace(/\\/g, '/');
                if (path.startsWith('src/Notes/') && (path.endsWith('.tsx')
                    || /^src\/Notes\/SystemDesign\/(?:pages|shared)\/.*\.json$/.test(path))) {
                    invalidate(server);
                }
            };
            server.watcher.on('add', onFileInventoryChange);
            server.watcher.on('unlink', onFileInventoryChange);
        },
    };
}
