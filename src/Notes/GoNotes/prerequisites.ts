import { GO_NOTES_ROUTE, type Route } from '../../routing/routes';
import { goNotes } from './goNotes';

// Each lesson lists the concepts it uses, rather than every earlier chapter.
const dependencies: Record<string, readonly string[]> = {
    'why-go': [],
    'code-to-execution': ['why-go'],
    'basic-commands': ['code-to-execution'],
    'constants-variables': ['basic-commands'],
    'const-iota': ['constants-variables'],
    'zero-values': ['constants-variables'],
    'if-else-switch': ['constants-variables'],
    'range-for-loops': ['if-else-switch'],
    'slices-arrays': ['constants-variables', 'range-for-loops'],
    maps: ['constants-variables', 'range-for-loops'],
    pointers: ['constants-variables', 'zero-values'],
    'defined-type-and-type-alias': ['constants-variables'],
    struct: ['pointers', 'defined-type-and-type-alias'],
    functions: ['constants-variables', 'if-else-switch'],
    'variadic-functions': ['functions', 'slices-arrays'],
    'anonymous-inline-functions': ['functions'],
    closures: ['anonymous-inline-functions'],
    methods: ['functions', 'struct'],
    interfaces: ['methods', 'zero-values'],
    embeddings: ['struct', 'interfaces'],
    generics: ['functions', 'interfaces'],
    'module-vs-package': ['basic-commands'],
    packages: ['module-vs-package', 'functions'],
    modules: ['module-vs-package', 'packages'],
    'go-mod': ['modules'],
    'go-sum': ['go-mod'],
    'init-function': ['packages', 'constants-variables'],
    defer: ['functions'],
    errors: ['functions', 'interfaces'],
    'panic-recover': ['errors', 'defer'],
    tests: ['functions', 'packages', 'errors'],
    goroutines: ['functions', 'anonymous-inline-functions'],
    workgroups: ['goroutines'],
    mutex: ['goroutines', 'pointers', 'defer'],
    channels: ['goroutines', 'range-for-loops'],
    'goroutines-channels-waitgroup': ['goroutines', 'channels', 'workgroups'],
    select: ['channels'],
    'context-and-timeout': ['select', 'errors', 'defer'],
    'goroutines-blocking-causes-recovery': ['channels', 'workgroups', 'mutex', 'context-and-timeout'],
    'gmp-model': ['goroutines', 'channels'],
    'date-time': ['functions', 'errors'],
    'cpp-vs-go': ['slices-arrays', 'struct', 'interfaces', 'errors'],
    'go-by-questions': ['interfaces', 'modules', 'panic-recover', 'context-and-timeout', 'generics'],
    gin: ['functions', 'struct', 'go-mod', 'errors'],
    'gin-routing': ['gin'],
    'gin-binding': ['gin-routing', 'struct', 'encoding-json'],
    'gin-responses': ['gin-routing', 'errors', 'encoding-json'],
    'gin-middleware': ['gin-routing', 'closures', 'errors'],
    'gin-context': ['gin', 'context-and-timeout', 'goroutines', 'mutex'],
    'gin-files': ['gin-routing', 'errors'],
    'gin-auth': ['gin-middleware'],
    'gin-server': ['gin', 'context-and-timeout', 'goroutines'],
    'encoding-json': ['struct', 'interfaces', 'errors', 'slices-arrays', 'maps'],
    bufio: ['functions', 'errors', 'defer'],
    gorm: ['struct', 'methods', 'go-mod', 'errors'],
};

const prerequisite = (slug: string) => {
    const note = goNotes.find((entry) => entry.slug === slug);
    if (!note) throw new Error(`Missing Go prerequisite note: ${slug}`);
    return { title: note.title, route: `${GO_NOTES_ROUTE}/${slug}` as Route };
};

export const goPrerequisites: ReadonlyMap<Route, readonly { title: string; route: Route }[]> = new Map([
    [GO_NOTES_ROUTE, []],
    ...goNotes.map((note): [Route, ReturnType<typeof prerequisite>[]] => {
        const slugs = dependencies[note.slug];
        if (!slugs) throw new Error(`Missing Go prerequisites: ${note.slug}`);
        return [prerequisite(note.slug).route, slugs.map(prerequisite)];
    }),
]);
