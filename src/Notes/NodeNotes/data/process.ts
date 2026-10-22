import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'process',
    title: 'Arguments and environment variables',
    summary: 'Read program input and report failure to the terminal.',
    scope: 'nodejs',
    updatedOn: '2026-10-21',
    pointwise: true,
    inlineCode: true,
    exampleLayout: 'grouped',
    references: [
        { title: 'Node.js process', href: 'https://nodejs.org/api/process.html' },
    ],
    sections: [
        {
            id: 'arguments',
            title: 'Command-line arguments',
            bullets: [
                '`process` provides information about the running Node.js program.',
                '`process.argv` is an array of strings.',
                'Its first two entries identify Node.js and the script.',
                '`process.argv.slice(2)` returns the arguments passed after the script name.',
            ],
            examples: [{
                title: 'Greet a name from the terminal',
                description: [
                    'The code belongs in `greet.mjs` and requires Node.js.',
                    'The first command passes a name. The second command leaves it out.',
                ],
                language: 'javascript',
                runnable: false,
                code: `const [name] = process.argv.slice(2);

if (!name) {
    console.error('A name is required');
    process.exitCode = 1;
} else {
    console.log('Hello, ' + name);
}`,
                commands: 'node greet.mjs Mira\nnode greet.mjs',
                result: 'Hello, Mira\nA name is required',
                explanation: [
                    '`console.log` writes normal output. `console.error` writes error output.',
                    'The second command sets `process.exitCode` to `1` to report failure.',
                    'The program finishes normally after its remaining work completes.',
                ],
            }],
        },
        {
            id: 'environment',
            title: 'Environment variables',
            bullets: [
                'Environment variables are named settings passed to a program when it starts.',
                '`process.env` exposes those settings.',
                'An existing value is a string. A missing value is `undefined`.',
                '`process.env.APP_MODE ?? "development"` uses a default when `APP_MODE` is missing.',
                'An empty string is still a value. `??` does not replace it.',
                'A setting such as `"3000"` requires conversion and validation before use as a number.',
                'Secrets do not belong in source code or printed output.',
            ],
        },
        {
            id: 'exit-code',
            title: 'Exit codes',
            bullets: [
                'An exit code tells the calling terminal or program whether a command succeeded.',
                '`0` means success. A nonzero code means failure.',
                '`process.exitCode = 1` sets the eventual exit code without stopping immediately.',
                '`process.exit()` stops the process immediately. Pending output or other work can be lost.',
            ],
        },
    ],
};

export default note;
