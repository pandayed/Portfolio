import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'paths',
    title: 'Paths',
    summary: 'Represent file-system locations, combine paths, and resolve symbolic links.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    references: [{
        title: 'Java 17 Path API',
        href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/nio/file/Path.html',
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
    ],
};

export default note;
