import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'threads-and-concurrency',
    title: 'Threads, executors, and shared state',
    summary: 'Start and wait for tasks, avoid shared-state races, use executors and futures, and respond to interruption.',
    scope: 'java',
    updatedOn: '2026-10-05',
    sections: [
        {
            id: 'start-and-join',
            title: 'Start a thread and wait for it',
            paragraphs: [
                'A thread is a sequence of execution within a process. Threads can make progress during overlapping periods. Parallel execution means they run at the same time, which depends on scheduling and available processors.',
                'Thread.start asks the runtime to execute run on a new thread. Calling run directly is an ordinary method call on the current thread. join waits for another thread to finish.',
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
            paragraphs: [
                'count++ reads, adds, and writes. Two threads can read the same old value and lose an update. A race occurs when the result depends on uncoordinated access to shared state.',
                'AtomicInteger.incrementAndGet performs one atomic increment. The example waits for both workers before reading the final count. The order of individual increments can vary.',
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
                'volatile gives visibility and ordering guarantees for a field. It does not make count++ atomic.',
                'An atomic variable does not automatically protect a multi-step rule. A separate get followed by set can still race.',
            ],
        },
        {
            id: 'synchronized',
            title: 'Protect a multi-step rule with synchronized',
            paragraphs: [
                'A synchronized instance method acquires that object’s monitor. Only one thread can hold the same monitor at a time. Releasing and then acquiring that monitor also makes earlier writes visible to the next holder.',
                'All accesses to protected state must follow the same locking rule. Synchronizing methods on different objects does not provide mutual exclusion between those objects.',
            ],
            examples: [{
                title: 'Declare this class alongside Main',
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
                'Acquiring multiple locks in different orders can deadlock. Use a consistent order.',
                'Avoid holding a lock while doing slow file or network operations when the protected rule does not require it.',
            ],
        },
        {
            id: 'executors-and-futures',
            title: 'Submit tasks to an executor',
            paragraphs: [
                'ExecutorService manages task execution so code does not need to create a Thread for every task. A fixed thread pool reuses a limited number of worker threads. It does not place a fixed bound on its queued tasks.',
                'Runnable has no return value. Callable returns a value and can throw checked exceptions. submit returns a Future. Future.get waits for the result and reports a task failure as ExecutionException.',
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
                result: '42. get waits for this task; shutdown then stops accepting new tasks and lets submitted tasks finish.',
            }],
            bullets: [
                'shutdown does not wait for termination. Use awaitTermination when the caller must wait for the whole executor.',
                'get with a timeout limits how long the caller waits. A timeout does not automatically cancel the task.',
                'This example uses explicit shutdown for Java 17 compatibility. Java 17 ExecutorService does not support try-with-resources.',
            ],
        },
        {
            id: 'interruption',
            title: 'Treat interruption as a request to stop',
            paragraphs: [
                'Interruption is cooperative. It does not forcibly terminate a thread. Blocking methods such as sleep, join, and Future.get can throw InterruptedException. Throwing that exception clears the interrupted status.',
                'When a method cannot propagate InterruptedException, restore the status and leave the operation. Code that deliberately handles cancellation at its boundary may consume the interruption according to its contract.',
            ],
            examples: [{
                title: 'Method declaration inside a class',
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
                'Future.cancel(true) requests interruption of a running task. The task must cooperate; cancellation does not prove its code has stopped.',
                'Avoid shared mutable state when possible. Local values and immutable inputs need less coordination.',
            ],
        },
    ],
};

export default note;
