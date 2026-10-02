export interface ProgrammingTerm {
    id: string;
    term: string;
    aliases?: readonly string[];
    definition: string;
    category: 'Running a program' | 'Values and collections' | 'Program structure' | 'Python-specific terms';
}

// Both the inline explanations and the dictionary page read these definitions.
export const programmingTerms: readonly ProgrammingTerm[] = [
    { id: 'runtime', term: 'Runtime', definition: 'The period when a program is running. A runtime error happens during execution.', category: 'Running a program' },
    { id: 'runtime-environment', term: 'Runtime environment', definition: 'The software, settings, and system resources available to a program while it runs. These can include libraries, a virtual machine or interpreter, and operating system services.', category: 'Running a program' },
    { id: 'source-code', term: 'Source code', definition: 'Program instructions written in a programming language in a form people can read and edit.', category: 'Running a program' },
    { id: 'source-file', term: 'Source file', aliases: ['source files'], definition: 'A file containing source code. Its format and file extension depend on the language and tools.', category: 'Running a program' },
    { id: 'interpreter', term: 'Interpreter', aliases: ['interpreters'], definition: 'Software that executes instructions expressed as source code or an intermediate form of code.', category: 'Running a program' },
    { id: 'compiler', term: 'Compiler', aliases: ['compilers'], definition: 'Software that translates code into another form, such as machine code, bytecode, or another programming language.', category: 'Running a program' },
    { id: 'bytecode', term: 'Bytecode', definition: 'An intermediate instruction format designed for a virtual machine. The runtime can interpret it or compile it into native machine code.', category: 'Running a program' },
    { id: 'implementation', term: 'Implementation', aliases: ['implementations'], definition: 'Concrete code or software that provides the behavior described by a design, interface, or specification.', category: 'Running a program' },
    { id: 'cache', term: 'Cache', aliases: ['cached', 'caches'], definition: 'Stored data or results kept for reuse, so a program can avoid repeating a calculation or fetching the same data again.', category: 'Running a program' },
    { id: 'disassembly', term: 'Disassembly', definition: 'A readable representation of compiled instructions, such as machine code or bytecode.', category: 'Running a program' },
    { id: 'object', term: 'Object', aliases: ['objects'], definition: 'An entity in a program that holds data and may provide operations on that data. The exact meaning depends on the programming language.', category: 'Values and collections' },
    { id: 'json-object', term: 'JSON object', aliases: ['JSON objects'], definition: 'A JSON value containing name-value pairs inside braces. Each name is a string, and each value can be any JSON value.', category: 'Values and collections' },
    { id: 'string', term: 'String', aliases: ['strings'], definition: 'A sequence used to represent text. Its character encoding and whether it can change depend on the language and string type.', category: 'Values and collections' },
    { id: 'mutable', term: 'Mutable', definition: 'Able to change in place after creation. The existing value or object is modified rather than replaced.', category: 'Values and collections' },
    { id: 'immutable', term: 'Immutable', definition: 'Unable to change in place after creation. An operation that changes its contents must produce a different value or object.', category: 'Values and collections' },
    { id: 'iterable', term: 'Iterable', aliases: ['iterables'], definition: 'A value whose items can be visited through iteration, usually by providing an iterator.', category: 'Values and collections' },
    { id: 'iterator', term: 'Iterator', aliases: ['iterators'], definition: 'A mechanism for visiting items in sequence and tracking the current position. How it advances and signals the end depends on the language or library.', category: 'Values and collections' },
    { id: 'mapping', term: 'Mapping', aliases: ['mappings'], definition: 'A collection that associates keys with values and lets a program look up a value by its key.', category: 'Values and collections' },
    { id: 'hashable', term: 'Hashable', definition: 'Able to supply a hash value consistent with equality: equal values must have equal hashes. Keys in a hash-based collection must keep their hash and equality behavior stable while stored.', category: 'Values and collections' },
    { id: 'comment', term: 'Comment', aliases: ['comments'], definition: 'Text in source code intended for readers rather than as executable instructions. The syntax for comments depends on the language.', category: 'Program structure' },
    { id: 'module', term: 'Module', aliases: ['modules'], definition: 'A unit of code that groups related definitions and exposes functionality for other code to use. Its structure depends on the language and module system.', category: 'Program structure' },
    { id: 'namespace', term: 'Namespace', aliases: ['namespaces'], definition: 'A context that groups names and distinguishes them from names in other contexts. It helps avoid naming conflicts.', category: 'Program structure' },
    { id: 'scope', term: 'Scope', aliases: ['scopes'], definition: 'The region of a program where a name is visible and can be used. The language determines the rules for finding that name.', category: 'Program structure' },
    { id: 'callable', term: 'Callable', aliases: ['callables'], definition: 'A value that can be invoked with arguments to perform an operation, such as a function. Which values can be called depends on the language.', category: 'Program structure' },
    { id: 'type-hint', term: 'Type annotation', aliases: ['type annotations', 'type hint', 'type hints'], definition: 'An annotation describing the expected type of a value, parameter, or result. How it is checked depends on the language and tools.', category: 'Program structure' },
    { id: 'cpython', term: 'CPython', definition: 'The reference implementation of Python, written mainly in C. The Python downloads from python.org normally use CPython.', category: 'Python-specific terms' },
];
