import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'files-and-paths',
    title: 'Files, paths, and text input',
    summary: 'Create path values, read and write text, process lines, and handle Java file exceptions.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    references: [{
        title: 'Java 17 Files API',
        href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/nio/file/Files.html',
    }],
    sections: [
        {
            id: 'path-values',
            title: 'Path values',
            bullets: [
                'Path represents a file-system location. Path.of creates a Path from its name or path parts.',
                'Creating a Path does not create a file or check that the location exists.',
                'An absolute path starts from the file-system root. A relative path is resolved against the process working directory when used.',
                'resolve combines a directory path with another path. getFileName returns the final path part.',
                'Files is the Java utility class for reading, writing, copying, and deleting files at Path locations.',
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
                result: 'java.txt\nfalse',
            }],
        },
        {
            id: 'path-resolution',
            title: 'Normalize paths and resolve symbolic links',
            bullets: [
                'normalize removes unnecessary path parts such as . and .. without checking the file system.',
                'toAbsolutePath produces an absolute path. It does not check that the file exists.',
                'A symbolic link is a file-system entry pointing to another location.',
                'normalize and toAbsolutePath do not resolve symbolic links.',
                'toRealPath checks the file system and resolves symbolic links by default. It throws IOException if the path cannot be resolved.',
            ],
        },
        {
            id: 'read-and-write',
            title: 'Read and write text',
            bullets: [
                'A character encoding defines how bytes represent text. UTF-8 is one encoding.',
                'Files.readString decodes file bytes into a String. Files.readAllBytes returns the bytes without decoding them.',
                'readString and readAllBytes load the whole file into memory.',
                'Files.writeString encodes a String and writes it to a file.',
                'Without open options, writeString creates a missing file or replaces the existing file contents.',
                'readString and writeString use UTF-8 by default. Overloads accept an explicit character encoding.',
                'writeString does not create missing parent directories. Files.createDirectories creates them.',
                'The CREATE and APPEND open options create a missing file or add text at the end of an existing file.',
                'File operations can throw IOException. The method below declares it with throws.',
                'createTempFile creates a temporary file. deleteIfExists deletes it if it still exists.',
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
                result: 'Java notes, if the file operations succeed. A file failure propagates IOException.',
            }],
        },
        {
            id: 'incremental-reading',
            title: 'Read one line at a time',
            bullets: [
                'BufferedReader reads text in parts. Files.newBufferedReader opens one for a file.',
                'readLine returns one line without its line-ending characters. It returns null at the end of the file.',
                'BufferedReader implements AutoCloseable. Try-with-resources closes it when the block finishes.',
                'The method below receives a Path for an existing UTF-8 text file.',
            ],
            examples: [{
                title: 'Count nonblank lines',
                language: 'java',
                code: `static int countNonblankLines(java.nio.file.Path file)
        throws java.io.IOException {
    try (java.io.BufferedReader reader = java.nio.file.Files.newBufferedReader(
            file, java.nio.charset.StandardCharsets.UTF_8)) {
        String line;
        int count = 0;
        while ((line = reader.readLine()) != null) {
            if (!line.isBlank()) {
                count++;
            }
        }
        return count;
    }
}`,
                result: 'For a file with "Java", an empty line, and "Streams" on three lines, returns 2.',
            }],
        },
        {
            id: 'line-streams',
            title: 'Read lines as a stream',
            bullets: [
                'Files.lines returns a Stream of lines. It reads them as stream operations request them.',
                'The stream keeps a file resource open. Closing the stream releases that resource.',
                'Try-with-resources closes the stream after its terminal operation finishes.',
                'Files.readAllLines instead loads every line into a List before returning.',
                'Files.lines may throw IOException when opening the file. A failure while traversing its stream is wrapped in UncheckedIOException.',
            ],
            examples: [{
                language: 'java',
                code: `static long countNonblankLines(java.nio.file.Path file)
        throws java.io.IOException {
    try (java.util.stream.Stream<String> lines = java.nio.file.Files.lines(file)) {
        return lines.filter(line -> !line.isBlank()).count();
    }
}`,
                result: 'Returns the number of nonblank lines without collecting all lines into a list.',
            }],
        },
        {
            id: 'file-failures',
            title: 'Java file exceptions',
            bullets: [
                'NoSuchFileException is an IOException subclass for a missing file.',
                'A catch for NoSuchFileException must come before a catch for IOException.',
                'Files.exists returns false if the file is absent or its existence cannot be determined.',
                'An existence check does not guarantee that a later readString call will succeed.',
            ],
            examples: [{
                language: 'java',
                code: `static void printFile(java.nio.file.Path file) {
    try {
        System.out.println(java.nio.file.Files.readString(file));
    } catch (java.nio.file.NoSuchFileException missing) {
        System.out.println("File not found");
    } catch (java.io.IOException failure) {
        System.out.println("Could not read the file");
    }
}`,
                result: 'Prints the content on success, File not found for a missing file, or Could not read the file for another IOException.',
            }],
        },
    ],
};

export default note;
