import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'futures',
    title: 'Futures',
    summary: 'Read task results, observe failures, limit the wait, and request cancellation through Future.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [
        { title: 'Java 17: Future', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/Future.html' },
    ],
    sections: [
        {
            id: 'submitted-results',
            title: 'Read results from submitted tasks',
            bullets: [
                'A Future represents a submitted task whose result may not be ready yet.',
                'get() waits for completion and returns the task result.',
                'Submitting a task and immediately calling get() for each task prevents overlap between those submissions.',
                "submit(Callable<T>) returns Future<T>. Its get() returns the value produced by call().",
                "submit(Runnable) returns Future<?>. Its get() method returns null when the task succeeds.",
                "submit(Runnable, value) returns a Future whose get() returns the supplied value when the task succeeds.",
            ],
            examples: [{
                language: 'java',
                code: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args)
            throws InterruptedException, ExecutionException {
        ExecutorService pool = Executors.newFixedThreadPool(2);
        try {
            Runnable task = () -> {};
            Callable<Integer> calculation = () -> 20 + 22;
            Future<?> completion = pool.submit(task);
            Future<Integer> answer = pool.submit(calculation);
            System.out.println(completion.get());
            System.out.println(answer.get());
        } finally {
            pool.shutdown();
        }
    }
}`,
                result: 'null\n42',
            }],
        },
        {
            id: 'future',
            title: 'Wait for results and observe task failures',
            bullets: [
                "ExecutionException reports task failure. Call getCause() to read the original exception.",
                "get() can throw InterruptedException if the waiting thread is interrupted.",
                "get(timeout, unit) limits how long the caller waits. TimeoutException does not cancel the task.",
            ],
            examples: [{
                title: 'Observe a task failure',
                language: 'java',
                code: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService pool = Executors.newSingleThreadExecutor();
        try {
            Future<Integer> result = pool.submit(() -> {
                throw new IllegalArgumentException("Invalid count");
            });
            try {
                System.out.println(result.get());
            } catch (ExecutionException failure) {
                System.out.println(failure.getCause().getMessage());
            }
        } finally {
            pool.shutdown();
        }
    }
}`,
                result: 'Invalid count',
            }],
        },
        {
            id: 'future-cancellation',
            title: 'Completion status and cancellation',
            bullets: [
                "isDone() returns true after success, failure, or cancellation. It does not mean the task succeeded.",
                "isCancelled() reports cancellation.",
                "cancel(true) attempts cancellation. If the task is running, successful cancellation attempts to interrupt it.",
                "cancel(false) does not request interruption of running code.",
                "After successful cancellation, get() throws CancellationException. This does not prove the task’s code has stopped.",
            ],
        },
    ],
};

export default note;
