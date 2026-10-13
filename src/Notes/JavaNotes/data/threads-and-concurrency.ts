import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'threads-and-concurrency',
    title: 'Threads, executors, and shared state',
    summary: 'Start and wait for tasks, avoid shared-state races, use executors and futures, and respond to interruption.',
    scope: 'java',
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'start-and-join',
            title: 'Start a thread and wait for it',
            bullets: [
                'A thread executes a sequence of instructions within a process.',
                'Threads can make progress during overlapping periods. This is concurrency.',
                'Parallel execution means threads run at the same time.',
                'Parallel execution depends on when the runtime schedules threads and how many processors are available.',
                'Thread.start asks the runtime to call run on a new thread.',
                'Calling run directly calls the method on the current thread.',
                'join waits for another thread to finish.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> System.out.println("Worker done"));
        worker.start();
        worker.join();
        System.out.println("Main done");
    }
}`,
                result: 'Worker done, then Main done, on separate lines. join establishes this order.',
            }],
            pitfalls: [
                'A Thread can be started only once. A second start throws IllegalThreadStateException.',
                'Do not use sleep to prove another task finished. Use join, a Future, or a synchronization mechanism.',
            ],
        },
        {
            id: 'atomic-updates',
            title: 'Protect an update shared by threads',
            bullets: [
                'count++ reads the value, adds one, and writes the new value.',
                'Two threads can read the same old value. If both write the same new value, one update is lost.',
                'Shared state is data that multiple threads can access.',
                'A race occurs when the result depends on threads accessing shared state without coordination.',
                'AtomicInteger.incrementAndGet performs an atomic increment. Other threads observe it as one update.',
                'This example waits for both worker threads before reading the final count.',
                'The order of individual increments can vary.',
            ],
            examples: [{
                language: 'java',
                code: `import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        AtomicInteger count = new AtomicInteger();
        Runnable add = () -> {
            for (int i = 0; i < 1000; i++) {
                count.incrementAndGet();
            }
        };
        Thread first = new Thread(add);
        Thread second = new Thread(add);
        first.start();
        second.start();
        first.join();
        second.join();
        System.out.println(count.get());
    }
}`,
                result: '2000 after both workers finish.',
            }],
            pitfalls: [
                'volatile makes writes to a field visible to other threads and provides ordering guarantees.',
                'It does not make count++ atomic.',
                'An atomic variable does not automatically protect a multi-step rule. A separate get followed by set can still race.',
            ],
        },
        {
            id: 'synchronized',
            title: 'Protect a multi-step rule with synchronized',
            bullets: [
                'A synchronized instance method acquires the monitor of its object. A monitor is a lock associated with an object.',
                'Only one thread can hold the same monitor at a time.',
                'When a thread releases the monitor, its earlier writes become visible to a thread that later acquires that monitor.',
                'All accesses to the protected data must follow the same locking rule.',
                'Methods synchronized on different objects use different monitors. They do not prevent each other from running.',
            ],
            examples: [{
                title: 'Reserve stock with one shared lock',
                language: 'java',
                code: `class Stock {
    private int remaining = 1;

    synchronized boolean reserve() {
        if (remaining == 0) {
            return false;
        }
        remaining--;
        return true;
    }
}`,
                result: 'For two calls on the same Stock object, one returns true and the other false. Which thread succeeds can vary.',
            }],
            pitfalls: [
                'Acquiring multiple locks in different orders can cause deadlock.',
                'In a deadlock, threads wait for locks held by each other and cannot continue.',
                'Acquire locks in a consistent order.',
                'Release the lock before slow file or network operations if the protected rule allows it.',
            ],
        },
        {
            id: 'executors-and-futures',
            title: 'Submit tasks to an executor',
            bullets: [
                'ExecutorService manages task execution. Your code does not need to create a Thread for each task.',
                'A fixed thread pool reuses a limited number of worker threads.',
                'The pool does not set a fixed limit on the number of queued tasks.',
                'Runnable has no return value.',
                'Callable returns a value and can throw checked exceptions.',
                'submit returns a Future. A Future represents a task whose result may not be ready yet.',
                'Future.get waits for the result. If the task fails, get reports the failure as ExecutionException.',
                'shutdown does not wait for termination. Use awaitTermination when the caller must wait for the whole executor.',
                'get with a timeout limits how long the caller waits. A timeout does not automatically cancel the task.',
                'This example uses explicit shutdown for Java 17 compatibility. Java 17 ExecutorService does not support try-with-resources.',
            ],
            examples: [{
                language: 'java',
                code: `import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Main {
    public static void main(String[] args)
            throws InterruptedException, ExecutionException {
        ExecutorService pool = Executors.newFixedThreadPool(2);
        try {
            Future<Integer> total = pool.submit(() -> 20 + 22);
            System.out.println(total.get());
        } finally {
            pool.shutdown();
        }
    }
}`,
                result: 'Prints 42. get waits for this task. shutdown then stops accepting new tasks and lets submitted tasks finish.',
            }],
        },
        {
            id: 'interruption',
            title: 'Treat interruption as a request to stop',
            bullets: [
                'Interruption asks a thread to stop. The thread must respond to that request.',
                'Interruption does not force the thread to terminate.',
                'Blocking methods wait before returning. sleep, join, and Future.get can throw InterruptedException while waiting.',
                'Throwing InterruptedException clears the thread’s interrupted status. This status records whether the thread has received an interruption request.',
                'If a method cannot pass InterruptedException to its caller, restore the status and leave the operation.',
                'Code that handles cancellation at its boundary may consume the interruption if its contract allows it.',
            ],
            examples: [{
                title: 'Pause before retrying',
                language: 'java',
                code: `static void pauseBeforeRetry() {
    try {
        Thread.sleep(100);
    } catch (InterruptedException interrupted) {
        Thread.currentThread().interrupt();
        return;
    }
    System.out.println("Ready to retry");
}`,
                result: 'Prints Ready to retry after the pause if no interruption occurs. On interruption, returns with the interrupted status restored.',
            }],
            pitfalls: [
                'Future.cancel(true) requests interruption of a running task.',
                'The task must respond to interruption. Cancellation does not prove that its code has stopped.',
                'Avoid sharing data that threads can change when possible.',
                'Local values and inputs that cannot change need less coordination.',
            ],
        },
    ],
};

export default note;
