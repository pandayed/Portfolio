import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'futures',
    title: 'Futures',
    summary: 'Define a task that returns a value, read its Future result, then handle failures, waiting, and cancellation.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [{
        title: 'Java 17: Future',
        href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/Future.html',
    }],
    sections: [
        {
            id: 'submitted-results',
            title: 'Callable returns a task result',
            bullets: [
                'Runnable.run() returns void. Use Callable when a task must return a value.',
                'Callable<T> is an interface with a call() method that returns T.',
                'Callable<Integer> means call() returns an Integer. Returning an int boxes it into Integer.',
                'call() can declare checked exceptions. Thread does not accept Callable directly, but ExecutorService.submit does.',
                'pool.submit(task) schedules the Callable and returns a Future for its result.',
                'Future<Integer> means get() returns the Integer produced by that task.',
                'get() waits if the task has not finished. Submitting the task does not mean its result is ready.',
                'get() declares InterruptedException for an interrupted wait and ExecutionException for a failed task. The first example declares both on main.',
            ],
            examples: [{
                title: 'Return 42 from a worker and read it in main',
                language: 'java',
                code: `import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

class AddTask implements Callable<Integer> {
    @Override
    public Integer call() {
        return 20 + 22;
    }
}

public class Main {
    public static void main(String[] args)
            throws InterruptedException, ExecutionException {
        ExecutorService pool = Executors.newFixedThreadPool(1);
        try {
            Future<Integer> answer = pool.submit(new AddTask());
            Integer value = answer.get();
            System.out.println(value);
        } finally {
            pool.shutdown();
        }
    }
}`,
                result: '42. A worker runs call(). main waits in get() until it can read that return value.',
            }],
        },
        {
            id: 'submission-results',
            title: 'What each submit overload returns',
            bullets: [
                'An overload is a method with the same name but a different parameter list.',
                'A Callable supplies its own result. A Runnable supplies no result through run().',
                'Calling run() or call() directly executes on the calling thread. Neither interface starts a thread by itself.',
                'To let several tasks run before waiting, submit them first and then read their Futures.',
                'Submitting one task and immediately waiting in get() before submitting the next makes those tasks run one after another.',
            ],
            table: {
                columns: ['Submission', 'Result after successful completion'],
                rows: [
                    ['submit(Callable<T>)', 'Future<T>. get() returns the value from call().'],
                    ['submit(Runnable)', 'Future<?>. get() returns null.'],
                    ['submit(Runnable, value)', 'Future<T>. get() returns the supplied value.'],
                ],
            },
        },
        {
            id: 'future',
            title: 'Read a task failure',
            bullets: [
                'When call() throws, the task has failed instead of returning a result.',
                'get() reports that failure by throwing ExecutionException.',
                'getCause() on that ExecutionException returns the exception thrown by the task.',
                'The caller can handle the task failure separately from interruption of its own wait.',
            ],
            examples: [{
                title: 'Read the exception thrown by call()',
                language: 'java',
                code: `import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

class CountTask implements Callable<Integer> {
    @Override
    public Integer call() {
        throw new IllegalArgumentException("Invalid count");
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService pool = Executors.newFixedThreadPool(1);
        try {
            Future<Integer> answer = pool.submit(new CountTask());
            try {
                System.out.println(answer.get());
            } catch (ExecutionException failure) {
                System.out.println(failure.getCause().getMessage());
            }
        } finally {
            pool.shutdown();
        }
    }
}`,
                result: 'Invalid count. The worker throws IllegalArgumentException. main receives ExecutionException and reads its cause.',
            }],
        },
        {
            id: 'future-timeout',
            title: 'Limit the time spent waiting',
            bullets: [
                'get(duration, unit) waits at most that long for a result.',
                'If the result is still unavailable, get throws TimeoutException.',
                'A timeout ends this wait. It does not cancel or stop the task.',
                'This example calls Thread.sleep inside call() to delay the task. call() declares InterruptedException because the sleep can be interrupted.',
            ],
            examples: [{
                title: 'Wait up to one millisecond',
                language: 'java',
                code: `import java.util.concurrent.*;

class SlowTask implements Callable<Integer> {
    @Override
    public Integer call() throws InterruptedException {
        Thread.sleep(100);
        return 42;
    }
}

public class Main {
    public static void main(String[] args)
            throws InterruptedException, ExecutionException {
        ExecutorService pool = Executors.newFixedThreadPool(1);
        try {
            Future<Integer> answer = pool.submit(new SlowTask());
            try {
                System.out.println(answer.get(1, TimeUnit.MILLISECONDS));
            } catch (TimeoutException timeout) {
                System.out.println("Result not ready yet");
            }
        } finally {
            pool.shutdown();
        }
    }
}`,
                result: 'Prints Result not ready yet if the task is unfinished when the one-millisecond wait expires. If it has already finished, prints 42. shutdown still lets the submitted task finish.',
            }],
        },
        {
            id: 'future-cancellation',
            title: 'Check status and request cancellation',
            bullets: [
                'isDone() reports whether the Future is finished. Success, failure, and cancellation all count as finished.',
                'isCancelled() reports whether cancellation succeeded.',
                'cancel(true) requests cancellation and permits interruption of a running task.',
                'cancel(false) requests cancellation without interrupting running code.',
                'cancel returns true when it succeeds. It can return false if the task has already completed.',
                'After successful cancellation, get() throws CancellationException instead of returning a result.',
                'The task must respond to interruption. A cancelled Future does not prove its code has stopped.',
            ],
            examples: [{
                title: 'Use the Future returned by submit',
                language: 'java',
                code: `static void cancelTask(java.util.concurrent.Future<Integer> answer) {
    boolean cancelled = answer.cancel(true);
    System.out.println("Cancellation accepted: " + cancelled);
    System.out.println("Cancelled: " + answer.isCancelled());
    System.out.println("Finished: " + answer.isDone());
}`,
                result: 'For successful cancellation, prints true for all three checks. The method receives an already submitted task\'s Future. It does not create another task.',
            }],
        },
    ],
};

export default note;
