import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'exceptions-and-resources',
    title: 'Exceptions',
    summary: 'Follow exception flow, throw and declare failures, handle checked exceptions, and understand causes and finally.',
    scope: 'java',
    exampleLayout: 'grouped',
    updatedOn: '2026-10-13',
    pointwise: true,
    references: [{
        title: 'Java exception handling',
        href: 'https://dev.java/learn/exceptions/catching-handling/',
    }],
    sections: [
        {
            id: 'exception-flow',
            title: 'Exceptions, try, and catch',
            bullets: [
                'An exception is an object that reports a failure. Throwing it interrupts normal execution.',
                'A try block contains the operation. A catch block receives an exception of the specified type or one of its subclasses.',
                'Statements after the failing operation inside try do not run.',
                'Java runs the first matching catch block.',
                'If that catch completes normally, execution continues after the try-catch statement. A catch can also return or throw.',
                'If the current method has no matching catch, the exception passes to its caller. This continues through the calling methods.',
                'If no caller handles the exception, the executing thread terminates and its uncaught exception handler receives the exception.',
                'A catch for a parent type also matches its subclasses. Put the subclass catch first, or Java rejects it as unreachable.',
            ],
            examples: [{
                title: 'Handle text that is not a whole number',
                description: [
                    'Try to parse five as an integer and continue after handling the failure.',
                ],
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        try {
            int count = Integer.parseInt("five");
            System.out.println(count); // Skipped when parsing throws.
        } catch (NumberFormatException failure) {
            System.out.println("Enter a whole number");
        }
        System.out.println("Done");
    }
}`,
                result: 'Enter a whole number\nDone',
                explanation: [
                    'Integer.parseInt("five") throws NumberFormatException, so the count print inside try is skipped.',
                    'The matching catch prints Enter a whole number.',
                    'The catch completes normally, so execution continues and prints Done.',
                ],
            }],
        },
        {
            id: 'throw-an-exception',
            title: 'Throw an exception',
            bullets: [
                'throw raises an exception object at that point in the program.',
                'new IllegalArgumentException(message) creates an exception for an invalid method argument.',
                'getMessage returns the message stored in the exception.',
            ],
            examples: [{
                title: 'Reject a nonpositive count',
                description: [
                    'Pass 0 to a method that requires a positive count.',
                ],
                language: 'java',
                code: `public class Main {
    static int positiveCount(int count) {
        if (count <= 0) {
            throw new IllegalArgumentException("Count must be positive");
        }
        return count;
    }

    public static void main(String[] args) {
        try {
            System.out.println(positiveCount(0));
        } catch (IllegalArgumentException failure) {
            System.out.println(failure.getMessage());
        }
    }
}`,
                result: 'Count must be positive',
                explanation: [
                    'positiveCount throws IllegalArgumentException because 0 is not positive.',
                    'The catch reads the exception message with getMessage and prints it.',
                ],
            }],
        },
        {
            id: 'checked-and-unchecked',
            title: 'Checked exceptions and throws',
            bullets: [
                'Throwable is the parent type of Exception and Error.',
                'RuntimeException and its subclasses are unchecked. The compiler does not require catching or declaring them.',
                'NumberFormatException and IllegalArgumentException are RuntimeException subclasses.',
                'Error and its subclasses are also unchecked. OutOfMemoryError reports that the JVM cannot allocate an object because memory is unavailable.',
                'Other Exception subclasses are checked. IOException is one example.',
                'A method must catch a checked exception or list it in its throws declaration.',
                'throws names the exception types a method may pass to its caller. It does not throw or handle an exception by itself.',
                'The caller must also catch or declare a checked exception passed by the method.',
                'Checked and unchecked describe compiler requirements, not whether a failure is recoverable.',
            ],
            examples: [{
                title: 'Declare and handle a checked failure',
                description: [
                    'Call a method that declares a checked exception, then handle that exception in its caller.',
                ],
                language: 'java',
                code: `public class Main {
    static void fail() throws Exception {
        throw new Exception("Operation failed");
    }

    public static void main(String[] args) {
        try {
            fail();
        } catch (Exception failure) {
            System.out.println(failure.getMessage());
        }
    }
}`,
                result: 'Operation failed',
                explanation: [
                    'fail declares throws Exception and throws an Exception with the message Operation failed.',
                    'main catches the exception and prints its message.',
                ],
            }],
        },
        {
            id: 'validation-and-causes',
            title: 'Custom exceptions and causes',
            bullets: [
                'A custom exception is a class extending Exception or one of its subclasses.',
                'Extending Exception directly creates a checked exception. Extending RuntimeException creates an unchecked exception.',
                'A stack trace records the method calls at the point where an exception was created.',
                'An exception constructor can receive another exception as its cause. getCause retrieves that original exception.',
                'Wrapping an exception with its cause keeps the original failure and stack trace available.',
            ],
            examples: [{
                title: 'Keep the original parsing failure as a cause',
                description: [
                    'Parse many as a count and report the failure using a custom exception.',
                ],
                language: 'java',
                code: `public class Main {
    static class InvalidCountException extends RuntimeException {
        InvalidCountException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    static int parseCount(String input) {
        try {
            return Integer.parseInt(input);
        } catch (NumberFormatException failure) {
            throw new InvalidCountException("Count must be an integer", failure);
        }
    }

    public static void main(String[] args) {
        try {
            parseCount("many");
        } catch (InvalidCountException failure) {
            System.out.println(failure.getMessage());
            System.out.println(failure.getCause().getClass().getSimpleName());
        }
    }
}`,
                result: 'Count must be an integer\nNumberFormatException',
                explanation: [
                    'parseCount catches NumberFormatException and passes it as the cause of InvalidCountException.',
                    'The outer catch prints the custom message, then retrieves the cause and prints its class name.',
                ],
            }],
        },
        {
            id: 'finally',
            title: 'The finally block',
            bullets: [
                'finally runs when control leaves try or catch, including through a return or an exception.',
                'It may not run if the process terminates or the JVM fails.',
                'A return in finally replaces a pending return value or stops a pending exception from reaching the caller.',
                'An exception thrown by finally also replaces a pending exception unless the program preserves it separately.',
            ],
            examples: [{
                title: 'Run cleanup before returning a value',
                description: [
                    'Return 7 from a try block and print a message from finally.',
                ],
                language: 'java',
                code: `public class Main {
    static int value() {
        try {
            return 7;
        } finally {
            System.out.println("Leaving value");
        }
    }

    public static void main(String[] args) {
        System.out.println(value());
    }
}`,
                result: 'Leaving value\n7',
                explanation: [
                    'Java runs finally before value returns, so Leaving value prints first.',
                    'finally does not replace the return value. main receives 7 and prints it.',
                ],
            }],
        },
    ],
};

export default note;
