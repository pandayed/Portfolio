import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'exceptions-and-resources',
    title: 'Exceptions and resource cleanup',
    summary: 'Catch specific failures, distinguish checked and unchecked exceptions, and close resources with try-with-resources.',
    scope: 'java',
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'exception-flow',
            title: 'Handle a failure with try and catch',
            bullets: [
                'An exception interrupts normal execution.',
                'Java looks for a matching catch block in the current method. If it finds none, it checks the methods that called it.',
                'If Java finds no catch block, the thread terminates. Its uncaught exception handler receives the exception.',
                'Put an operation that can fail inside try.',
                'Catch a specific exception when this part of the program can handle the failure.',
                'Statements after the failing operation inside try do not run.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        try {
            int count = Integer.parseInt("five");
            System.out.println(count);
        } catch (NumberFormatException failure) {
            System.out.println("Enter a whole number");
        }
        System.out.println("Done");
    }
}`,
                result: 'Two lines: Enter a whole number, then Done. The count print is skipped.',
            }],
            pitfalls: [
                'An empty catch block hides the failure.',
                'Handle the failure, report it where the program can respond, or pass it to the caller.',
            ],
        },
        {
            id: 'checked-and-unchecked',
            title: 'Distinguish checked and unchecked exceptions',
            bullets: [
                'You must catch a checked exception or declare it with throws. IOException is a checked exception.',
                'RuntimeException and its subclasses are unchecked. The compiler does not require you to catch or declare them.',
                'NumberFormatException and IllegalArgumentException are unchecked exceptions.',
                'Error and its subclasses are also unchecked.',
                'An Error usually reports a failure that application code should not try to recover from. Running out of JVM memory is one example.',
                'A checked exception may be impossible to recover from. An unchecked exception may still cause a serious failure.',
                'throw raises an exception object now.',
                'throws lists exception types a method may pass to its caller. It does not handle the failure.',
                'Catch more specific types before their parent type. A catch for Exception before IOException would make the IOException handler unreachable.',
            ],
            examples: [{
                title: 'Read a configuration file',
                language: 'java',
                code: `static String readConfig(java.nio.file.Path path)
        throws java.io.IOException {
    return java.nio.file.Files.readString(path);
}`,
                result: 'A caller must catch IOException or declare it. Reading a missing file propagates a file-related IOException.',
            }],
        },
        {
            id: 'validation-and-causes',
            title: 'Validate arguments and preserve the cause',
            bullets: [
                'Use an exception when a method cannot do what its contract promises.',
                'Use IllegalArgumentException for an invalid argument.',
                'A custom exception names a failure specific to the application. Use one when callers need to distinguish that failure.',
                'When you convert a failure into another exception, pass the original exception as its cause.',
                'The cause keeps the original stack trace. A stack trace lists the method calls that led to the failure.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    static int positiveCount(String input) {
        final int count;
        try {
            count = Integer.parseInt(input);
        } catch (NumberFormatException failure) {
            throw new IllegalArgumentException("Count must be an integer", failure);
        }
        if (count <= 0) {
            throw new IllegalArgumentException("Count must be positive");
        }
        return count;
    }

    public static void main(String[] args) {
        try {
            positiveCount("0");
        } catch (IllegalArgumentException failure) {
            System.out.println(failure.getMessage());
        }
    }
}`,
                result: 'Count must be positive. Input "many" instead raises the integer message with a NumberFormatException cause.',
            }],
        },
        {
            id: 'try-with-resources',
            title: 'Close resources with try-with-resources',
            bullets: [
                'A resource such as a file reader may keep an operating-system file handle open.',
                'AutoCloseable is an interface with a close method.',
                'Try-with-resources calls close on AutoCloseable resources when the block finishes.',
                'It also closes the resources when the block throws an exception.',
                'When you declare multiple resources, they close in reverse declaration order.',
                'If both the block and close fail, the block exception stays the main exception.',
                'Java records the close exception as a suppressed exception. You can inspect it without losing the original failure.',
            ],
            examples: [{
                title: 'Observe the close step without an external file',
                language: 'java',
                code: `public class Main {
    static class Resource implements AutoCloseable {
        @Override
        public void close() {
            System.out.println("Closed");
        }
    }

    public static void main(String[] args) {
        try (Resource resource = new Resource()) {
            System.out.println("Working");
        }
    }
}`,
                result: 'Working, then Closed, on separate lines.',
            }],
            pitfalls: [
                'Garbage collection does not provide prompt resource cleanup. Close file and network resources explicitly.',
                'Avoid return statements in finally. They can replace a pending return value or prevent an exception from reaching the caller.',
                'finally normally runs after try and catch.',
                'It may not run if the process terminates or the JVM fails.',
            ],
        },
    ],
};

export default note;
