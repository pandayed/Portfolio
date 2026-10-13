import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'threads-and-concurrency',
    title: 'Executors',
    summary: 'Give Runnable tasks to reusable worker threads, then close the pool and wait for its tasks to finish.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [{
        title: 'Java 17: ExecutorService',
        href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/ExecutorService.html',
    }],
    sections: [
        {
            id: 'runnable-and-callable',
            title: 'From a Thread to an executor',
            bullets: [
                'Runnable defines work in its run() method. It does not return a result.',
                'With new Thread(task).start(), your code creates a thread for that task.',
                'An executor accepts tasks and arranges for them to run.',
                'A thread pool is an executor that keeps worker threads and reuses them for later tasks.',
                'A worker thread calls the run() method of the task it receives.',
                'Runnable.run() cannot declare checked exceptions. Its implementation must handle them inside the method.',
            ],
        },
        {
            id: 'executor-service',
            title: 'Run Runnable tasks in a fixed pool',
            bullets: [
                'ExecutorService is the interface used to give tasks to a pool and control its lifetime.',
                'Executors.newFixedThreadPool(2) creates a pool that uses at most two worker threads.',
                'pool.execute(task) gives a Runnable to the pool. It returns without waiting for the task to finish.',
                'When both workers are busy, additional tasks wait in a queue: a list of tasks waiting for a worker.',
                'The same worker can run several tasks one after another.',
                'Call shutdown() when you will give the pool no more tasks. Already submitted tasks can still finish.',
            ],
            examples: [{
                title: 'Give three named tasks to two workers',
                language: 'java',
                code: `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

class PrintTask implements Runnable {
    private final String message;

    PrintTask(String message) {
        this.message = message;
    }

    @Override
    public void run() {
        System.out.println(message);
    }
}

public class Main {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(2);
        try {
            pool.execute(new PrintTask("First task"));
            pool.execute(new PrintTask("Second task"));
            pool.execute(new PrintTask("Third task"));
        } finally {
            pool.shutdown();
        }
    }
}`,
                result: 'Prints First task, Second task, and Third task once each. Their output order can vary. Two workers handle all three tasks.',
            }],
        },
        {
            id: 'executor-shutdown',
            title: 'Wait for the pool to stop',
            bullets: [
                'shutdown() rejects new tasks. It does not wait for the existing tasks to finish.',
                'awaitTermination(duration, unit) waits for the pool to stop after shutdown is requested.',
                'TimeUnit.SECONDS means the duration is measured in seconds.',
                'The method returns true if the pool stopped, or false if the wait ended first.',
                'A timeout does not stop the tasks. awaitTermination can throw InterruptedException if the waiting thread is interrupted.',
                'shutdownNow() attempts to interrupt running tasks and returns the queued tasks that never started.',
                'Running tasks must respond to interruption. shutdownNow() cannot force them to stop.',
                'Java 17 ExecutorService cannot be used in try-with-resources. Close a pool you own with shutdown().',
            ],
            examples: [{
                title: 'Print the completion message after the pool stops',
                language: 'java',
                code: `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

class PrintTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Task complete");
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService pool = Executors.newFixedThreadPool(1);
        try {
            pool.execute(new PrintTask());
        } finally {
            pool.shutdown();
        }
        boolean stopped = pool.awaitTermination(1, TimeUnit.SECONDS);
        System.out.println("Stopped: " + stopped);
    }
}`,
                result: 'When the task finishes within the wait: Task complete, then Stopped: true. If the wait expires, Stopped: false can print before the task finishes.',
            }],
        },
        {
            id: 'execute-and-submit',
            title: 'execute and submit',
            bullets: [
                'execute(Runnable) returns no value. Use it when the caller does not need a task result.',
                'submit(task) returns a Future: an object that lets the caller wait for that task and read its result or failure.',
                'The Futures lesson introduces tasks that return a value and shows how to read it.',
                'In the standard thread pool, an unchecked failure from execute reaches the worker thread\'s uncaught exception handler.',
                'submit records a task failure in the Future. Reading that Future reports the failure to the caller.',
                'A fixed number of workers does not limit the queue size. Too many waiting tasks can exhaust memory.',
                'If every worker waits for a task queued in the same pool, no worker remains available to run that task.',
            ],
        },
    ],
};

export default note;
