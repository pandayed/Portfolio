import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'npm',
    title: 'npm and project packages',
    summary: 'Define project commands, manage dependencies, and use a lockfile.',
    scope: 'nodejs',
    updatedOn: '2026-10-21',
    pointwise: true,
    inlineCode: true,
    exampleLayout: 'grouped',
    references: [
        { title: 'npm init', href: 'https://docs.npmjs.com/cli/v11/commands/npm-init/' },
        { title: 'package.json fields', href: 'https://docs.npmjs.com/cli/v11/configuring-npm/package-json/' },
        { title: 'npm install', href: 'https://docs.npmjs.com/cli/v11/commands/npm-install/' },
        { title: 'npm ci', href: 'https://docs.npmjs.com/cli/v11/commands/npm-ci/' },
    ],
    sections: [
        {
            id: 'project-files',
            title: 'Project files',
            bullets: [
                '`package.json` stores project information, scripts, and dependency requirements.',
                'A package is reusable code distributed with package metadata.',
                '`npm init -y` creates `package.json` using default answers.',
                '`node_modules` holds installed packages. It is usually excluded from version control.',
            ],
        },
        {
            id: 'scripts',
            title: 'Scripts',
            bullets: [
                'A script is a named command in the `scripts` field of `package.json`.',
                '`npm run` followed by the script name runs that command from the project folder.',
                '`npm start` is a shortcut for the `start` script.',
            ],
            examples: [{
                title: 'Run a local script through npm',
                description: [
                    'The example uses a new folder containing the two files below.',
                    '`npm init -y` can create the initial `package.json`. The shown file is its minimal replacement.',
                    'Node.js and npm are installed. No external package is required.',
                ],
                language: 'javascript',
                runnable: false,
                code: 'console.log("Node project ready");',
                files: [
                    { name: 'package.json', language: 'text', code: '{\n  "name": "node-basics",\n  "version": "1.0.0",\n  "private": true,\n  "scripts": {\n    "start": "node app.mjs"\n  }\n}' },
                    { name: 'app.mjs', language: 'javascript', code: 'console.log("Node project ready");' },
                ],
                commands: 'npm start',
                explanation: [
                    'npm prints script information, followed by `Node project ready`.',
                    '`start` runs `node app.mjs`.',
                    '`"private": true` prevents accidental publication through npm.',
                ],
            }],
        },
        {
            id: 'dependencies',
            title: 'Dependencies',
            bullets: [
                '`dependencies` lists packages the application needs when it runs.',
                '`devDependencies` lists packages used for development tasks such as formatting.',
                'A normal local `npm install` installs both groups. `npm install --omit=dev` omits development packages from disk.',
            ],
            examples: [{
                title: 'Add runtime and development packages',
                description: [
                    'These commands demonstrate dependency management in a separate project folder with `package.json`.',
                    'They require network access and change project files. They are not needed for the script example above.',
                ],
                language: 'text',
                runnable: false,
                code: 'npm install lodash\nnpm install --save-dev prettier',
                explanation: [
                    '`lodash` is recorded in `dependencies`.',
                    '`prettier` is recorded in `devDependencies`.',
                    'npm installs packages into `node_modules` and updates `package-lock.json`.',
                    'Installing a package does not call it or add an import to application code.',
                ],
            }],
        },
        {
            id: 'lockfile',
            title: 'Lockfile and repeat installs',
            table: {
                columns: ['Command', 'Use', 'Lockfile behavior'],
                rows: [
                    ['`npm install`', 'Install or change dependencies during development.', 'Can create or update the lockfile.'],
                    ['`npm ci`', 'Install a project from its committed lockfile, often in CI.', 'Requires a matching lockfile and does not update it.'],
                ],
            },
            bullets: [
                '`package-lock.json` records the resolved dependency tree and exact package versions.',
                'Application projects usually commit both `package.json` and `package-lock.json`.',
                '`npm ci` fails when the lockfile and `package.json` disagree.',
                '`npm ci` removes an existing `node_modules` folder before installing.',
            ],
        },
    ],
};

export default note;
