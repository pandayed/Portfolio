import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'threads-and-concurrency',
    title: 'Executors',
    summary: 'Define Runnable and Callable tasks, submit work to a thread pool, and shut down the executor.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [
        { title: 'Java 17: ExecutorService', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/ExecutorService.html' },
    ],
    sections: [
        {
            id: 'runnable-and-callable',
            title: 'Task contracts: Runnable and Callable',
            bullets: [
                "Runnable defines void run() for a task with no result. A Thread runs this task through start().",
                "Runnable.run() does not declare checked exceptions. Its implementation must catch a checked exception instead of adding it to run()'s declaration.",
                "Callable<T> defines T call() throws Exception. Use it for a task that returns a value or can throw a checked exception.",
                "Neither interface starts work by itself. Calling run() or call() directly runs on the calling thread.",
                "Thread accepts Runnable. It does not accept Callable directly.",
            ],
        },
        {
            id: 'executor-service',
            title: 'Run tasks with ExecutorService',
            bullets: [
                "An executor manages task execution. A thread pool reuses worker threads for tasks.",
                "newFixedThreadPool(2) uses up to two worker threads. Additional tasks wait in its queue.",
                "execute(Runnable) returns void. submit(Runnable or Callable) returns a Future.",
                "The returned Future represents the submitted task. Reading its result is covered in Futures.",
                "With the standard thread pool, an unchecked exception from execute reaches the worker’s uncaught exception handler.",
                "submit stores a task failure in its returned Future.",
                'A fixed worker count does not limit the queue size. Submitting tasks faster than workers finish them can exhaust memory.',
                'A task can wait for another task queued to the same pool. If all workers are waiting, no worker can run the queued task.',
            ],
        },
        {
            id: 'executor-shutdown',
            title: 'Shut down an executor',
            bullets: [
                "shutdown() rejects new tasks and lets submitted tasks finish. It returns without waiting for them.",
                "After requesting shutdown, use awaitTermination(timeout, unit) to wait for the executor to stop.",
                "shutdownNow() returns tasks that never started. It also attempts to interrupt active tasks.",
                "Active tasks must respond to interruption. shutdownNow() cannot force them to stop.",
                "Shut down an executor you own. Java 17 ExecutorService does not support try-with-resources.",
            ],
            examples: [{
                language: 'java',
                code: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService pool = Executors.newSingleThreadExecutor();
        try {
            pool.execute(() -> System.out.println("Task complete"));
        } finally {
            pool.shutdown();
        }
        boolean stopped = pool.awaitTermination(1, TimeUnit.MINUTES);
        System.out.println("Stopped: " + stopped);
    }
}`,
                result: 'Task complete, then Stopped: true if the task finishes within the one-minute wait. A timeout returns false and does not stop the worker.',
            }],
        },
    ],
};

export default note;
