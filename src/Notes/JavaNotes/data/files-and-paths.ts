import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'files-and-paths',
    title: 'Files, paths, and text input',
    summary: 'Represent paths, read and write UTF-8 text, process files incrementally, and handle file failures.',
    scope: 'java',
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'path-values',
            title: 'Represent a location with Path',
            bullets: [
                'Path represents a file-system location.',
                'Creating a Path does not create a file or prove that the location exists.',
                'Files provides operations to read, write, copy, and delete files at those locations.',
                'A relative path does not start from the file-system root. Java resolves it against the process working directory when used.',
                'resolve combines a directory path with another path.',
                'normalize removes unnecessary path parts such as . and .. without checking the file system.',
            ],
            examples: [{
                language: 'java',
                code: `import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        Path directory = Path.of("notes");
        Path file = directory.resolve("java.txt");
        System.out.println(file.getFileName());
        System.out.println(file.isAbsolute());
    }
}`,
                result: 'java.txt, then false, on separate lines. No file is created.',
            }],
            pitfalls: [
                'A symbolic link is a file-system entry that points to another location.',
                'toAbsolutePath and normalize do not resolve symbolic links.',
                'toRealPath checks the file system and resolves symbolic links by default. It may fail.',
            ],
        },
        {
            id: 'read-and-write',
            title: 'Read and write a small text file',
            bullets: [
                'Use readString for text that fits in memory.',
                'Specify UTF-8 when exchanging text. This makes the character encoding explicit.',
                'An encoding defines how bytes represent text characters.',
                'writeString without open options creates a missing file.',
                'If the file exists, writeString replaces its existing contents.',
                'This example creates a temporary file and deletes it afterward.',
                'readAllBytes reads binary content into a byte array. readString decodes bytes into text.',
                'To add text at the end of a file, use open options such as CREATE and APPEND.',
                'writeString does not create missing parent directories. Use createDirectories when required.',
            ],
            examples: [{
                language: 'java',
                code: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) throws IOException {
        Path file = Files.createTempFile("java-notes-", ".txt");
        try {
            Files.writeString(file, "Java notes", StandardCharsets.UTF_8);
            String text = Files.readString(file, StandardCharsets.UTF_8);
            System.out.println(text);
        } finally {
            Files.deleteIfExists(file);
        }
    }
}`,
                result: 'Java notes, if temporary-file operations succeed. IOException is propagated on a file failure.',
            }],
        },
        {
            id: 'incremental-reading',
            title: 'Read lines without loading the whole file',
            bullets: [
                'BufferedReader reads text in parts instead of loading the whole file at once.',
                'Call readLine in a loop to process one line at a time.',
                'readLine returns null at the end of the file.',
                'The returned string does not include the line-ending characters.',
                'Use the example inside a method that declares throws IOException.',
                'The Path variable named file must point to a readable UTF-8 text file.',
            ],
            examples: [{
                title: 'Count nonblank lines',
                language: 'java',
                code: `try (java.io.BufferedReader reader = java.nio.file.Files.newBufferedReader(
        file, java.nio.charset.StandardCharsets.UTF_8)) {
    String line;
    int count = 0;
    while ((line = reader.readLine()) != null) {
        if (!line.isBlank()) {
            count++;
        }
    }
    System.out.println(count);
}`,
                result: 'For a file containing "Java", an empty line, and "Streams" on three lines, prints 2.',
            }],
            pitfalls: [
                'Files.lines reads lines when the stream processes them. Its Stream keeps a file resource open.',
                'Close the stream with try-with-resources.',
                'readAllLines loads every line into a list. It is unsuitable when the whole file cannot fit in memory.',
            ],
        },
        {
            id: 'file-failures',
            title: 'Handle the operation that actually fails',
            bullets: [
                'A file may disappear after an existence check. Its permissions may also change before the read.',
                'Catch failures from the read operation itself.',
                'Catch a specific exception when you need a different response for a missing file.',
                'Files.exists returns false when the file is absent or Java cannot determine whether it exists.',
                'The example uses an existing Path variable named file.',
            ],
            examples: [{
                title: 'Handle missing files separately',
                language: 'java',
                code: `try {
    String content = java.nio.file.Files.readString(file);
    System.out.println(content);
} catch (java.nio.file.NoSuchFileException missing) {
    System.out.println("File not found");
} catch (java.io.IOException failure) {
    System.out.println("Could not read the file");
}`,
                result: 'Prints the content on success, File not found for a missing file, or the other message for a different IOException.',
            }],
        },
    ],
};

export default note;
