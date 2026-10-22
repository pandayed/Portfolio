import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'runtime',
    title: 'Node.js runtime and first script',
    summary: 'Run JavaScript outside the browser and understand the Node.js environment.',
    scope: 'nodejs',
    updatedOn: '2026-10-21',
    pointwise: true,
    inlineCode: true,
    exampleLayout: 'grouped',
    references: [
        { title: 'Node.js introduction', href: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs' },
        { title: 'Node.js releases and LTS support', href: 'https://nodejs.org/en/about/previous-releases' },
        { title: 'Blocking and non-blocking work', href: 'https://nodejs.org/en/learn/asynchronous-work/overview-of-blocking-vs-non-blocking' },
        { title: 'JavaScript: async and await', href: '#/notes/javascript-typescript/async-await' },
    ],
    sections: [
        {
            id: 'runtime',
            title: 'Runtime',
            bullets: [
                'Node.js is a runtime that executes JavaScript outside a browser.',
                'JavaScript is the language. Node.js supplies APIs for files, network connections, and operating-system information.',
                'Node.js runs command-line tools, servers, and background tasks.',
                'Browser APIs such as `document` and `window` are not available in Node.js.',
                'Language features such as arrays, functions, and promises work in both environments.',
            ],
        },
        {
            id: 'installation',
            title: 'Installation',
            bullets: [
                'A supported LTS release is suitable for learning and production use. LTS means long-term support.',
                'The official Node.js download page provides installation options. A version manager can keep multiple Node.js versions on one computer.',
                'npm is a package manager commonly installed with Node.js. It manages project dependencies and commands.',
            ],
            examples: [{
                title: 'Check the installed commands',
                description: ['The terminal has Node.js and npm available on its command search path.'],
                language: 'text',
                runnable: false,
                code: 'node --version\nnpm --version',
                explanation: [
                    '`node --version` prints the installed Node.js version.',
                    '`npm --version` prints the installed npm version.',
                    'The version numbers depend on the installation.',
                    'A command-not-found error means the command is unavailable in the current terminal.',
                ],
            }],
        },
        {
            id: 'first-script',
            title: 'First script',
            bullets: [
                'The `node` command executes a JavaScript file.',
                'The `.mjs` extension explicitly marks a file as an ECMAScript module. These notes use it to keep the module format clear.',
            ],
            examples: [{
                title: 'Run a greeting from a file',
                description: ['The file is named `hello.mjs`. The terminal is open in the folder containing it.'],
                language: 'javascript',
                runnable: false,
                code: 'const name = "Reader";\nconsole.log(`Hello, ${name}!`);',
                commands: 'node hello.mjs',
                result: 'Hello, Reader!',
                explanation: ['`console.log` prints to the terminal.', 'The process ends when no work remains to keep it running.'],
            }],
        },
        {
            id: 'async-work',
            title: 'Asynchronous work',
            bullets: [
                'Input/output, or I/O, includes reading a file and receiving network data.',
                'Asynchronous I/O lets Node.js run other JavaScript while it waits for the operation to finish.',
                'The event loop schedules callbacks when work is ready to continue.',
                'A synchronous operation blocks the JavaScript thread until it finishes.',
                'A long calculation also blocks that thread. Adding `async` to a function does not move the calculation to another thread.',
                '`await` pauses the current asynchronous function until its promise settles. It does not block all other JavaScript.',
            ],
        },
    ],
};

export default note;
