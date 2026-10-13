import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'packages',
    title: 'Packages and imports',
    summary: 'Organize named types in packages, use imports, and compile and launch a packaged class.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    exampleLayout: 'grouped',
    references: [
        { title: 'Java 17 javac command', href: 'https://docs.oracle.com/en/java/javase/17/docs/specs/man/javac.html' },
        { title: 'Java 17 java command', href: 'https://docs.oracle.com/en/java/javase/17/docs/specs/man/java.html' },
    ],
    sections: [
        {
            id: 'packages-and-imports',
            title: 'Package names and imports',
            bullets: [
                'A package groups named types. A qualified name includes the package name and type name.',
                'The package declaration comes before imports and class declarations.',
                'An import allows a short type name instead of its qualified name. It does not install a dependency.',
                'Types in java.lang, such as String and System, need no explicit import.',
                'import java.util.* imports accessible types from that package, not its subpackages.',
            ],
            examples: [{
                title: 'Print a date from a packaged class',
                description: [
                    'Save this program as src/study/Main.java.',
                    'Print October 13, 2026 using LocalDate, a standard-library type representing a date.',
                    'Run the commands below from the directory containing src with the JDK installed.',
                ],
                language: 'java',
                code: `package study;

import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        System.out.println(LocalDate.of(2026, 10, 13));
    }
}`,
                commands: `javac -d out src/study/Main.java
java -cp out study.Main`,
                result: '2026-10-13',
                explanation: [
                    'package study gives Main the qualified name study.Main.',
                    'The import lets the program use LocalDate instead of java.time.LocalDate.',
                    'LocalDate.of(2026, 10, 13) creates the date. Printing it produces the year-month-day form.',
                    'javac writes the compiled class to out/study/Main.class. A successful compilation produces no output.',
                    'java searches out for classes and launches study.Main, which prints the date.',
                ],
            }],
        },
        {
            id: 'compile-a-package',
            title: 'Compile and run a packaged class',
            bullets: [
                'javac compiles Java source files. java launches a compiled class.',
                '-d selects the output directory for compiled classes. Package names determine the directories inside it.',
                '-cp sets the class path: where the launcher looks for classes.',
                'Launch a packaged class using its qualified name.',
            ],
        },
    ],
};

export default note;
