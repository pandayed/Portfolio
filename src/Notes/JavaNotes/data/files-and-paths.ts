import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'files-and-paths',
    title: 'Files, paths, and text input',
    summary: 'Represent paths, read and write UTF-8 text, process files incrementally, and handle file failures.',
    scope: 'java',
    updatedOn: '2026-10-05',
    sections: [
        {
            id: 'path-values',
            title: 'Represent a location with Path',
            paragraphs: [
                'Path represents a file-system location. Creating a Path does not create a file or prove the location exists. Files contains operations that read, write, copy, and delete at those locations.',
                'A relative path is resolved against the process working directory when used. resolve combines a directory with another path. normalize removes redundant name elements such as dot segments without checking the file system.',
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
            pitfalls: ['Do not assume toAbsolutePath or normalize resolves symbolic links. toRealPath consults the file system and may fail.'],
        },
        {
            id: 'read-and-write',
            title: 'Read and write a small text file',
            paragraphs: [
                'Use readString for text that comfortably fits in memory. Specify UTF-8 when exchanging text so the encoding is clear. writeString without open options creates a missing file or truncates an existing file.',
                'This example uses a temporary file and deletes it afterward. It does not overwrite a file in your project.',
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
            bullets: [
                'readAllBytes reads binary content into a byte array. readString decodes bytes into text.',
                'For append behavior, choose explicit open options such as CREATE and APPEND.',
                'writeString does not create missing parent directories. Use createDirectories when required.',
            ],
        },
        {
            id: 'incremental-reading',
            title: 'Read lines without loading the whole file',
            paragraphs: [
                'BufferedReader reads text incrementally. A loop around readLine can process one line at a time. readLine returns null at the end of the file and leaves line-ending characters out of each returned string.',
                'The snippet belongs inside a method that declares throws IOException. It assumes java.nio.file.Path file already points to a readable UTF-8 text file.',
            ],
            examples: [{
                title: 'Method body with an existing file variable',
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
                'Files.lines also reads lazily, but its Stream holds a file resource. Close it with try-with-resources.',
                'readAllLines loads every line into a list. It is unsuitable when the whole file cannot fit in memory.',
            ],
        },
        {
            id: 'file-failures',
            title: 'Handle the operation that actually fails',
            paragraphs: [
                'A file may disappear or permissions may change between an existence check and a read. Catch the failure from the read itself. Use a specific exception when the response differs for a missing file.',
                'Files.exists returning false does not always mean the file is absent. It also returns false when existence cannot be determined.',
            ],
            examples: [{
                title: 'Method body using the same file variable',
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
