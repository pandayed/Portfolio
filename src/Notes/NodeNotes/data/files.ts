import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'files',
    title: 'Files and paths',
    summary: 'Read text, write text, and understand file paths.',
    scope: 'nodejs',
    updatedOn: '2026-10-21',
    pointwise: true,
    inlineCode: true,
    exampleLayout: 'grouped',
    references: [
        { title: 'Node.js file system', href: 'https://nodejs.org/api/fs.html#promises-api' },
        { title: 'Node.js paths', href: 'https://nodejs.org/api/path.html#pathjoinpaths' },
    ],
    sections: [
        {
            id: 'text-files',
            title: 'Text files',
            bullets: [
                '`node:fs/promises` provides file operations that return promises.',
                '`await readFile(path, "utf8")` returns the file content as a string.',
                'Without an encoding, `readFile` returns a `Buffer`. A buffer holds bytes.',
                '`await writeFile(path, text, "utf8")` creates a file or replaces its existing content.',
                '`try` and `catch` handle failures such as a missing file or denied access.',
            ],
            examples: [{
                title: 'Write and read a temporary text file',
                description: [
                    'The example requires Node.js and uses no extra packages.',
                    'The code belongs in `files.mjs`.',
                    '`mkdtemp` creates a new directory in the system temporary directory.',
                ],
                language: 'javascript',
                runnable: false,
                code: `import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

let directory;

try {
    directory = await mkdtemp(join(tmpdir(), 'node-notes-'));
    const file = join(directory, 'message.txt');
    await writeFile(file, 'Hello from a file', 'utf8');
    const text = await readFile(file, 'utf8');
    console.log(text);
} catch (error) {
    console.error(error.message);
    process.exitCode = 1;
} finally {
    if (directory) {
        try {
            await rm(directory, { recursive: true });
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    }
}`,
                commands: 'node files.mjs',
                result: 'Hello from a file',
                explanation: [
                    '`await` makes the read wait for the write to finish.',
                    '`finally` removes only the temporary directory created by this run.',
                    'A file or cleanup failure prints its error message and sets a failure exit code.',
                ],
            }],
        },
        {
            id: 'paths',
            title: 'File paths',
            bullets: [
                'File operations resolve a relative path string from the current working directory.',
                '`process.cwd()` returns that directory. It may differ from the directory containing the script.',
                '`join` from `node:path` joins path parts using the operating system’s separators.',
                '`new URL("./message.txt", import.meta.url)` identifies a file beside the current ES module.',
                '`readFile` and `writeFile` accept a file URL as well as a path string.',
            ],
        },
    ],
};

export default note;
