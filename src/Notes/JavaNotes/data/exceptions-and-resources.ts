import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'exceptions-and-resources',
    title: 'Exceptions and resource cleanup',
    summary: 'Catch specific failures, distinguish checked and unchecked exceptions, and close resources with try-with-resources.',
    scope: 'java',
    updatedOn: '2026-10-05',
    sections: [
        {
            id: 'exception-flow',
            title: 'Handle a failure with try and catch',
            paragraphs: [
                'An exception interrupts normal execution. Java looks for a matching catch block in the current method and then in its callers. If no handler is found, the thread terminates and its uncaught exception handler receives the exception.',
                'Put the operation that can fail inside try. Catch a specific exception when this part of the program can choose a useful response. Statements after the failing operation inside try do not run.',
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
            pitfalls: ['An empty catch block hides the failure. Either recover, report it at a suitable boundary, or propagate it.'],
        },
        {
            id: 'checked-and-unchecked',
            title: 'Distinguish checked and unchecked exceptions',
            paragraphs: [
                'Checked exceptions must be caught or declared with throws. IOException is a checked exception. RuntimeException and its subclasses are unchecked, so the compiler does not require a catch or throws declaration. NumberFormatException and IllegalArgumentException are examples.',
                'Error and its subclasses are also unchecked. They usually represent failures application code should not try to recover from, such as exhaustion of JVM memory. Checked does not mean recoverable, and unchecked does not mean harmless.',
            ],
            bullets: [
                'throw raises an exception object now.',
                'throws lists exception types a method may pass to its caller. It does not handle the failure.',
                'Catch more specific types before their parent type. A catch for Exception before IOException would make the IOException handler unreachable.',
            ],
            examples: [{
                title: 'Method declaration inside a class',
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
            paragraphs: [
                'Use an exception to report that a method cannot satisfy its contract. For an invalid argument, IllegalArgumentException communicates the problem directly. A custom exception can name a domain failure when callers need to distinguish it.',
                'When converting a lower-level failure into another exception, pass the original exception as its cause. The cause preserves the original stack trace for diagnosis.',
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
            paragraphs: [
                'A resource such as a reader may hold an operating-system handle. Try-with-resources closes AutoCloseable resources when the block finishes, including when the block throws. Multiple resources close in reverse declaration order.',
                'If both the body and close fail, the body exception remains the main exception. The close exception is recorded as a suppressed exception. This avoids replacing the original failure with a cleanup failure.',
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
                'Avoid return statements in finally. They can replace a pending return value or suppress an exception.',
                'Finally normally runs after try and catch, but it is not guaranteed after process termination or JVM failure.',
            ],
        },
    ],
};

export default note;
