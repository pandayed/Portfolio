import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'modules',
    title: 'Modules and imports',
    summary: 'Share code between files and recognize Node.js module formats.',
    scope: 'nodejs',
    updatedOn: '2026-10-21',
    pointwise: true,
    inlineCode: true,
    exampleLayout: 'grouped',
    references: [
        { title: 'Node.js ECMAScript modules', href: 'https://nodejs.org/api/esm.html' },
        { title: 'Node.js CommonJS modules', href: 'https://nodejs.org/api/modules.html' },
    ],
    sections: [
        {
            id: 'es-modules',
            title: 'ECMAScript modules',
            bullets: [
                'A module groups related code in a file.',
                '`export` makes a value available to other modules. `import` loads an exported value.',
                'Node.js treats `.mjs` files as ECMAScript modules, also called ES modules.',
                'A relative import starts with `./` or `../`. In Node.js ES modules, the path includes the file extension.',
                'A project can also mark `.js` files as ES modules with `"type": "module"` in `package.json`.',
            ],
            examples: [{
                title: 'Import a function from another file',
                description: ['Both files are in the same folder. The terminal is open in that folder.'],
                language: 'javascript',
                runnable: false,
                code: 'import { greet } from "./greeting.mjs";\n\nconsole.log(greet("Mira"));',
                files: [
                    { name: 'greeting.mjs', language: 'javascript', code: 'export function greet(name) {\n  return `Hello, ${name}!`;\n}' },
                    { name: 'app.mjs', language: 'javascript', code: 'import { greet } from "./greeting.mjs";\n\nconsole.log(greet("Mira"));' },
                ],
                commands: 'node app.mjs',
                result: 'Hello, Mira!',
                explanation: ['`greeting.mjs` exports the named function `greet`.', '`app.mjs` imports that name from `./greeting.mjs` and calls it.'],
            }],
        },
        {
            id: 'built-in-modules',
            title: 'Built-in modules',
            bullets: [
                'Built-in modules ship with Node.js. They need no npm installation.',
                'The `node:` prefix identifies a built-in module.',
            ],
            examples: [{
                title: 'Read a filename extension',
                description: ['The file is named `extension.mjs`. The example works without creating `report.txt`.'],
                language: 'javascript',
                runnable: false,
                code: 'import { extname } from "node:path";\n\nconsole.log(extname("report.txt"));',
                commands: 'node extension.mjs',
                result: '.txt',
                explanation: ['`node:path` provides functions that work with path strings.', '`extname` returns the extension. It does not read the file.'],
            }],
        },
        {
            id: 'commonjs',
            title: 'CommonJS',
            bullets: [
                'CommonJS is another module format used by Node.js projects.',
                'Node.js treats `.cjs` files as CommonJS modules.',
                '`module.exports` supplies the exported value. `require` loads it.',
                'ES module files do not provide CommonJS variables such as `require` and `module.exports`.',
            ],
            examples: [{
                title: 'Share a function with CommonJS',
                description: ['This is a separate CommonJS example. Both `.cjs` files are in one folder.'],
                language: 'javascript',
                runnable: false,
                code: 'const greet = require("./greeting.cjs");\n\nconsole.log(greet("Mira"));',
                files: [
                    { name: 'greeting.cjs', language: 'javascript', code: 'function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nmodule.exports = greet;' },
                    { name: 'app.cjs', language: 'javascript', code: 'const greet = require("./greeting.cjs");\n\nconsole.log(greet("Mira"));' },
                ],
                commands: 'node app.cjs',
                result: 'Hello, Mira!',
                explanation: ['`require` returns the function assigned to `module.exports`.', 'The example keeps both files in the CommonJS format.'],
            }],
        },
    ],
};

export default note;
