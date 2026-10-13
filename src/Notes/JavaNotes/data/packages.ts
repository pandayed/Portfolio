import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'packages',
    title: 'Packages and imports',
    summary: 'Organize named types in packages, use imports, and compile and launch a packaged class.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    references: [
        { title: 'Java 17 javac command', href: 'https://docs.oracle.com/en/java/javase/17/docs/specs/man/javac.html' },
        { title: 'Java 17 java command', href: 'https://docs.oracle.com/en/java/javase/17/docs/specs/man/java.html' },
    ],
    sections: [
        {
            id: 'packages-and-imports',
            title: 'Package names and imports',
            bullets: [
                'A package groups named types. Main in package study has the qualified name study.Main.',
                'The package declaration comes before imports and class declarations.',
                'An import allows a short type name instead of its qualified name. It does not install a dependency.',
                'Types in java.lang, such as String and System, need no explicit import.',
                'import java.util.* imports accessible types from that package, not its subpackages.',
                'LocalDate is a standard-library type representing a date. LocalDate.of(year, month, day) creates one.',
                'Save this example as src/study/Main.java.',
            ],
            examples: [{
                language: 'java',
                code: `package study;

import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        System.out.println(LocalDate.of(2026, 10, 13));
    }
}`,
                result: '2026-10-13',
            }],
        },
        {
            id: 'compile-a-package',
            title: 'Compile and run a packaged class',
            bullets: [
                'Run these commands from the directory containing src.',
                '-d out writes compiled classes under out, using directories that match their package names.',
                '-cp out sets the class path: where the launcher looks for classes.',
                'Use the qualified class name study.Main when launching the program.',
            ],
            examples: [{
                language: 'text',
                code: `javac -d out src/study/Main.java
java -cp out study.Main`,
                result: '2026-10-13',
            }],
        },
    ],
};

export default note;
