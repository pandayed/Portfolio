import { PYTHON_NOTES_ROUTE, type Route } from '../../routing/routes';
import { pythonNotes } from './pythonNotes';

// Each lesson lists the concepts it uses, rather than every earlier chapter.
const dependencies: Record<string, readonly string[]> = {
    'language-fundamentals': [],
    'variables-and-types': ['language-fundamentals'],
    'numbers-and-conversion': ['variables-and-types'],
    strings: ['variables-and-types'],
    lists: ['variables-and-types'],
    'tuples-and-unpacking': ['lists'],
    'dictionaries-sets-and-generators': ['variables-and-types', 'lists'],
    sets: ['dictionaries-sets-and-generators'],
    'stacks-queues-and-arrays': ['lists', 'modules-and-packages'],
    'objects-and-mutability': ['lists', 'dictionaries-sets-and-generators'],
    conditionals: ['variables-and-types', 'numbers-and-conversion'],
    'loops-and-range': ['conditionals', 'lists'],
    comprehensions: ['loops-and-range', 'dictionaries-sets-and-generators'],
    'functions-and-scope': ['variables-and-types', 'conditionals'],
    'function-arguments': ['functions-and-scope', 'tuples-and-unpacking', 'dictionaries-sets-and-generators'],
    'scope-and-closures': ['functions-and-scope', 'function-arguments'],
    'modules-and-packages': ['functions-and-scope'],
    'dunder-variables-and-main': ['modules-and-packages'],
    'virtual-environments': ['modules-and-packages'],
    'files-and-json': ['strings', 'dictionaries-sets-and-generators', 'modules-and-packages'],
    exceptions: ['functions-and-scope', 'conditionals'],
    'classes-and-objects': ['functions-and-scope', 'objects-and-mutability'],
    'methods-and-attributes': ['classes-and-objects'],
    'inheritance-and-mro': ['methods-and-attributes'],
    'equality-and-hashing': ['classes-and-objects', 'sets', 'objects-and-mutability'],
    'iteration-and-generators': ['loops-and-range', 'functions-and-scope'],
    'context-managers': ['exceptions', 'classes-and-objects', 'iteration-and-generators'],
    'descriptors-and-properties': ['methods-and-attributes', 'inheritance-and-mro'],
    'class-and-instance-creation': ['inheritance-and-mro'],
    'import-system': ['modules-and-packages', 'dunder-variables-and-main'],
    'runtime-and-first-program': ['language-fundamentals', 'modules-and-packages'],
    'cpython-memory-management': ['runtime-and-first-program', 'objects-and-mutability', 'scope-and-closures'],
    'concurrency-and-asyncio': ['functions-and-scope', 'exceptions', 'modules-and-packages'],
    'socket-programming': ['strings', 'functions-and-scope', 'exceptions', 'modules-and-packages'],
    'rail-fence-client-server': ['socket-programming', 'loops-and-range', 'lists'],
    'fastapi-first-app': ['functions-and-scope', 'dictionaries-sets-and-generators', 'virtual-environments'],
    'fastapi-path-and-query': ['fastapi-first-app', 'function-arguments'],
    pydantic: ['classes-and-objects', 'virtual-environments', 'exceptions'],
    'fastapi-request-bodies': ['fastapi-path-and-query', 'pydantic'],
    'fastapi-responses-and-errors': ['fastapi-request-bodies', 'exceptions'],
    'fastapi-dependencies': ['fastapi-path-and-query', 'function-arguments'],
    'fastapi-async-operations': ['fastapi-first-app', 'concurrency-and-asyncio'],
    'fastapi-routers': ['fastapi-first-app', 'modules-and-packages', 'fastapi-dependencies'],
    'fastapi-backend-service': ['fastapi-request-bodies', 'fastapi-responses-and-errors', 'fastapi-dependencies', 'fastapi-async-operations', 'fastapi-routers'],
    'fastmcp-first-server': ['functions-and-scope', 'virtual-environments'],
    'fastmcp-resources-and-prompts': ['fastmcp-first-server'],
    'fastmcp-clients-and-transports': ['fastmcp-first-server', 'concurrency-and-asyncio'],
    'tools-and-libraries': ['modules-and-packages', 'virtual-environments'],
};

const prerequisite = (slug: string) => {
    const note = pythonNotes.find((entry) => entry.slug === slug);
    if (!note) throw new Error(`Missing Python prerequisite note: ${slug}`);
    return { title: note.title, route: `${PYTHON_NOTES_ROUTE}/${slug}` as Route };
};

export const pythonPrerequisites: ReadonlyMap<Route, readonly { title: string; route: Route }[]> = new Map([
    [PYTHON_NOTES_ROUTE, []],
    ...pythonNotes.map((note): [Route, ReturnType<typeof prerequisite>[]] => {
        const slugs = dependencies[note.slug];
        if (!slugs) throw new Error(`Missing Python prerequisites: ${note.slug}`);
        return [prerequisite(note.slug).route, slugs.map(prerequisite)];
    }),
]);
