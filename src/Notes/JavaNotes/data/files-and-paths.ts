import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'files-and-paths',
    title: 'File input and output',
    summary: 'Read and write text at a Path, process lines, and handle Java file exceptions.',
    scope: 'java',
    exampleLayout: 'grouped',
    updatedOn: '2026-10-13',
    pointwise: true,
    references: [{
        title: 'Java 17 Files API',
        href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/nio/file/Files.html',
    }],
    sections: [
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
                'File operations can throw IOException. A method must catch it or declare it with throws.',
                'createTempFile creates a temporary file. deleteIfExists deletes it if it still exists.',
            ],
            examples: [{
                title: 'Write and read a temporary text file',
                description: [
                    'Create a temporary file, write Java notes in UTF-8, and read it back.',
                ],
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
                result: 'Java notes',
                explanation: [
                    'If the file operations succeed, readString returns the text written by writeString.',
                    'finally deletes the temporary file when control leaves the try block.',
                    'main declares throws IOException. A file failure propagates to its caller.',
                ],
            }],
        },
        {
            id: 'incremental-reading',
            title: 'Read one line at a time',
            bullets: [
                'BufferedReader reads text in parts. Files.newBufferedReader opens one for a file.',
                'readLine returns one line without its line-ending characters. It returns null at the end of the file.',
                'BufferedReader implements AutoCloseable. Try-with-resources closes it when the block finishes.',
            ],
            examples: [{
                title: 'Count nonblank lines',
                description: [
                    'Place this method inside a class. A caller must catch or declare IOException.',
                    'Call this method with a Path for an existing UTF-8 file.',
                    'For this input, the file has Java on its first line, an empty second line, and Streams on its third line.',
                ],
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
                explanation: [
                    'readLine returns each line until it returns null at the end of the file.',
                    'The method counts Java and Streams and skips the empty line, so it returns 2.',
                    'The method does not print the return value. Try-with-resources closes the reader.',
                ],
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
                title: 'Count nonblank lines with a file stream',
                description: [
                    'Place this method inside a class. A caller must catch or declare IOException.',
                    'Call this method with a Path for an existing UTF-8 text file.',
                ],
                language: 'java',
                code: `static long countNonblankLines(java.nio.file.Path file)
        throws java.io.IOException {
    try (java.util.stream.Stream<String> lines = java.nio.file.Files.lines(file)) {
        return lines.filter(line -> !line.isBlank()).count();
    }
}`,
                explanation: [
                    'filter keeps lines for which isBlank returns false. count returns the number of remaining lines.',
                    'The method returns the count without printing it or collecting all lines into a list.',
                    'Try-with-resources closes the stream after counting finishes.',
                ],
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
                title: 'Handle a missing file while printing its contents',
                description: [
                    'Place this method inside a class.',
                    'Call printFile with a Path. The shown output is for a missing file.',
                ],
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
                result: 'File not found',
                possibleOutput: true,
                explanation: [
                    'For a readable file, the method prints its contents.',
                    'For a missing file, the NoSuchFileException catch prints File not found.',
                    'For another IOException, the second catch prints Could not read the file.',
                ],
            }],
        },
    ],
};

export default note;
