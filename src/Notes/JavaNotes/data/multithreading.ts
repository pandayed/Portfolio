import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'multithreading',
    title: 'Java multithreading',
    summary: 'Thread creation and states, synchronized, deadlock, Callable, executors, Future, CompletableFuture, and volatile.',
    scope: 'java',
    updatedOn: '2026-10-13',
    references: [
        { title: 'Video: Java Multithreading in One Shot — The Curious Coder', href: 'https://youtu.be/cEhuoI9x7F4' },
        { title: 'Java 17: Thread and thread states', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Thread.html' },
        { title: 'Java 17: ExecutorService and Future', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/ExecutorService.html' },
        { title: 'Java 17: CompletableFuture', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/CompletableFuture.html' },
        { title: 'Java Language Specification: threads, locks, and visibility', href: 'https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html' },
    ],
    sections: [
        {
            id: 'thread-basics',
            title: '1. Threads, Runnable, start, and run',
            bullets: [
                "A process is a running program.",
                "A thread runs a sequence of instructions inside a process.",
                "Threads share objects. Each thread has its own call stack, which records its active method calls.",
                "Concurrency means tasks make progress during overlapping periods.",
                "Parallelism means tasks run at the same time on available processors. Starting two threads does not guarantee parallelism.",
                "Runnable describes a task through its void run() method. A lambda can implement Runnable.",
                "Pass a Runnable to a Thread to choose the task that the thread runs.",
                "You can also extend Thread and override run(). Call start() on that Thread object.",
                "start() schedules a new thread to execute run(). Calling run() directly runs the method on the calling thread.",
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Runnable work = () -> System.out.println(
                Thread.currentThread().getName());
        Thread worker = new Thread(work, "worker");

        worker.run();
        worker.start();
        worker.join();
        System.out.println("Done");
    }
}`,
                result: 'main\nworker\nDone',
            }],
            pitfalls: [
                'Creating a Thread object does not start it. A Thread object can be started only once, even after it terminates.',
                'Thread order and priority do not establish an output order. Coordinate tasks explicitly when order matters.',
            ],
        },
        {
            id: 'sleep-and-join',
            title: 'sleep pauses the caller; join waits for a worker',
            bullets: [
                "Thread.sleep(duration) pauses the calling thread. It does not wait for a task to finish.",
                "sleep() does not release a monitor lock. A monitor is the lock used by synchronized code.",
                "worker.join() makes the calling thread wait until worker finishes. A timed join may return before worker finishes.",
                "Interruption asks a thread to stop. The thread must respond to the request.",
                "sleep() and join() can throw InterruptedException when the waiting thread is interrupted.",
                "Let InterruptedException pass to the caller when the method allows it. If you catch it to stop work, restore the interrupt status before returning.",
                "Start both workers before calling join() to allow their work to overlap.",
                "If you start and join the first worker before starting the second, the workers run one after another.",
            ],
            examples: [{
                title: 'Odd and even tasks',
                language: 'java',
                code: `public class Main {
    static void printNumbers(int first) {
        for (int number = first; number <= 6; number += 2) {
            System.out.println(number);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Thread odd = new Thread(() -> printNumbers(1));
        Thread even = new Thread(() -> printNumbers(2));
        odd.start();
        even.start();
        odd.join();
        even.join();
        System.out.println("Finished");
    }
}`,
                result: 'Prints 1, 3, 5 and 2, 4, 6. The two sequences may interleave in any order. Finished is always last.',
            }],
            pitfalls: ['sleep does not guarantee alternating odd and even output. Strict alternation needs a shared condition and coordination.'],
        },
        {
            id: 'thread-states',
            title: '2. The six thread states',
            bullets: [
                "NEW: the Thread exists, but start() has not been called.",
                "RUNNABLE: the thread is running or eligible to run. Java has no separate RUNNING state.",
                "BLOCKED: the thread waits to acquire a monitor lock for synchronized code.",
                "WAITING: the thread waits without a time limit. Object.wait() and an untimed join() can cause this state.",
                "TIMED_WAITING: the wait has a time limit. sleep(), timed wait(), and timed join() can cause this state.",
                "TERMINATED: run() returned or ended with an uncaught exception. You cannot restart this Thread.",
                "A thread must hold an object’s monitor before calling Object.wait() on it.",
                "wait() releases that monitor while waiting. The thread must acquire the monitor again before wait() returns.",
                "getState() reports the state at that moment. The state can change immediately after the call.",
                "Use synchronization to coordinate work. Do not use getState() to decide when another thread can proceed.",
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {});
        System.out.println(worker.getState());
        worker.start();
        worker.join();
        System.out.println(worker.getState());
    }
}`,
                result: 'NEW\nTERMINATED',
            }],
            pitfalls: ['A sleeping thread is TIMED_WAITING, not BLOCKED. BLOCKED specifically describes monitor acquisition.'],
        },
        {
            id: 'synchronized',
            title: '3. Race conditions and synchronized',
            bullets: [
                "count++ reads a value, adds one, and writes the result.",
                "Two threads can read the same value and overwrite each other’s increment. This is a lost update.",
                "A race condition occurs when the result depends on how threads access shared state without coordination.",
                "A critical section is code that accesses shared state under a common lock.",
                "synchronized allows only one thread at a time to hold the same monitor lock.",
                "A synchronized instance method locks this. A static synchronized method locks the class’s Class object.",
                "A synchronized block locks the object supplied to it.",
                "When a thread releases a monitor, its earlier writes become visible to a thread that later acquires the same monitor.",
                "Every access to the protected state must follow the same locking rule.",
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    static class Counter {
        private int value;

        synchronized void increment() {
            value++;
        }

        synchronized int get() {
            return value;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();
        Runnable add = () -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        };
        Thread first = new Thread(add);
        Thread second = new Thread(add);
        first.start();
        second.start();
        first.join();
        second.join();
        System.out.println(counter.get());
    }
}`,
                result: '2000. Both workers update the same Counter under the same monitor.',
            }],
            pitfalls: [
                'Two different Counter objects have different monitors. Their synchronized instance methods can run simultaneously.',
                'AtomicInteger.incrementAndGet() can update one independent counter. A rule involving several operations still needs coordination across all its steps.',
            ],
        },
        {
            id: 'deadlock',
            title: '4. Deadlock and lock order',
            bullets: [
                "Deadlock occurs when threads wait for each other and none can proceed.",
                "Thread A holds the first lock and waits for the second. Thread B holds the second lock and waits for the first.",
                "Neither thread can reach the code that releases its lock.",
                "Deadlock requires exclusive ownership: only one thread can hold each resource at a time.",
                "A thread holds one resource while waiting for another. No other thread can force it to release the resource.",
                "The waits form a cycle: each thread waits for a resource held by another thread in that cycle.",
                "Acquire multiple locks in one consistent order. This prevents the circular wait in the two-lock example.",
                "A thread dump lists thread states and lock ownership. Use it to check whether the waits form a cycle.",
                "A BLOCKED state alone does not prove deadlock.",
            ],
            examples: [{
                title: 'Both workers use the same lock order',
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Object first = new Object();
        Object second = new Object();
        Runnable work = () -> {
            synchronized (first) {
                synchronized (second) {
                    System.out.println("Both locks acquired");
                }
            }
        };
        Thread a = new Thread(work);
        Thread b = new Thread(work);
        a.start();
        b.start();
        a.join();
        b.join();
    }
}`,
                result: 'Both locks acquired\nBoth locks acquired',
            }],
            pitfalls: [
                'Reversing the lock order for one worker permits deadlock. It does not guarantee deadlock on every run.',
                'Sleeping while holding a monitor does not release it. Interrupting a thread blocked on synchronized does not force it to acquire or release the monitor.',
            ],
        },
        {
            id: 'runnable-and-callable',
            title: '5. Runnable, Callable, and returned values',
            bullets: [
                "Runnable defines void run(). Use it when the task has no result.",
                "Runnable.run() cannot declare a checked exception. Java requires callers to catch or declare a checked exception.",
                "Callable<T> defines T call() throws Exception. Use it for a task that returns a value or can throw a checked exception.",
                "Neither interface starts work by itself. Calling run() or call() directly runs on the calling thread.",
                "Thread accepts Runnable. ExecutorService can submit Runnable or Callable tasks.",
                "submit(Callable<T>) returns Future<T>. A Future lets the caller check completion, wait for a result, or request cancellation.",
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
            id: 'executor-service',
            title: '6. ExecutorService, execute, and submit',
            bullets: [
                "An executor manages task execution. A thread pool reuses worker threads for tasks.",
                "newFixedThreadPool(2) uses up to two worker threads. Additional tasks wait in its queue.",
                "execute(Runnable) returns void. submit(Runnable or Callable) returns a Future.",
                "With the standard thread pool, an unchecked exception from execute reaches the worker’s uncaught exception handler.",
                "submit stores a task failure in its Future. Call get() to observe the failure.",
                "shutdown() rejects new tasks and lets submitted tasks finish. It returns without waiting for them.",
                "After requesting shutdown, use awaitTermination(timeout, unit) to wait for the executor to stop.",
                "shutdownNow() returns tasks that never started. It also attempts to interrupt active tasks.",
                "Active tasks must respond to interruption. shutdownNow() cannot force them to stop.",
                "Shut down an executor you own. Java 17 ExecutorService does not support try-with-resources.",
            ],
            pitfalls: [
                'A fixed worker count does not limit the queue size. Submitting tasks faster than workers finish them can exhaust memory.',
                'A task can wait for another task queued to the same pool. If all workers are waiting, no worker can run the queued task.',
            ],
        },
        {
            id: 'future',
            title: 'Future: completion, timeouts, and cancellation',
            bullets: [
                "get() blocks the calling thread until the result is ready.",
                "ExecutionException reports task failure. Call getCause() to read the original exception.",
                "get(timeout, unit) limits how long the caller waits. TimeoutException does not cancel the task.",
                "isDone() returns true after success, failure, or cancellation. It does not mean the task succeeded.",
                "isCancelled() reports cancellation.",
                "cancel(true) attempts cancellation. If the task is running, it requests interruption.",
                "cancel(false) does not request interruption of running code.",
                "After successful cancellation, get() throws CancellationException. This does not prove the task’s code has stopped.",
                "Submit independent tasks before waiting for their results.",
                "Submitting a task and immediately calling get() for each task prevents overlap between those submissions.",
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
            id: 'completable-future',
            title: '7. CompletableFuture: chain and combine tasks',
            bullets: [
                "Future lets a caller wait for a result. CompletableFuture also lets the caller attach steps to run when earlier work finishes.",
                "A stage is one step that produces a result or reports a failure.",
                "supplyAsync(Supplier) starts a task that returns a value. A Supplier provides that value when called.",
                "runAsync(Runnable) starts a task without a result.",
                "Calls without an executor normally use ForkJoinPool.commonPool(), a shared thread pool.",
                "thenApply changes a successful value and returns the changed value.",
                "thenAccept uses a successful value and returns a stage with no result.",
                "thenRun runs an action without receiving the previous value.",
                "thenCombine combines the successful results of two stages.",
                "thenCompose connects a dependent operation that returns another stage. It avoids a future that contains another future.",
                "exceptionally supplies a replacement value after failure.",
                "handle receives the result or failure and can change the outcome.",
                "whenComplete observes completion. It normally keeps the original result or failure.",
            ],
            examples: [{
                language: 'java',
                code: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(2);
        try {
            CompletableFuture<Integer> price =
                    CompletableFuture.supplyAsync(() -> 100, pool);
            CompletableFuture<Integer> delivery =
                    CompletableFuture.supplyAsync(() -> 20, pool);

            CompletableFuture<Void> finished = price
                    .thenCombine(delivery, Integer::sum)
                    .thenApply(total -> "Total: " + total)
                    .exceptionally(failure -> "Total unavailable")
                    .thenAccept(System.out::println);
            finished.join();
        } finally {
            pool.shutdown();
        }
    }
}`,
                result: 'Total: 120. If an earlier stage fails, exceptionally supplies Total unavailable instead.',
            }],
            pitfalls: [
                'A callback is code that runs when a stage completes. A method without Async may run it on the thread completing the previous stage or on the caller attaching it.',
                'Async methods use the default executor or the executor you supply. thenApplyAsync does not guarantee a new thread.',
                'CompletableFuture.join() waits and reports failure as unchecked CompletionException. get() can throw checked InterruptedException and ExecutionException. Both methods can block.',
                'CompletableFuture ignores mayInterruptIfRunning when cancelling. Its cancel(true) does not interrupt the supplier.',
            ],
        },
        {
            id: 'volatile',
            title: '8. volatile: visibility and ordering',
            bullets: [
                "Visibility means a thread can read values written by another thread.",
                "A shared field without coordination does not guarantee visibility.",
                "The Java Memory Model defines which writes a thread can observe and how operations are ordered.",
                "A write to a volatile field happens-before a later read of that field. Happens-before guarantees visibility and ordering.",
                "A thread can write other fields, then set a volatile flag to publish those values.",
                "When another thread reads the published flag value, it can also observe the writes made before that flag was set.",
                "volatile does not lock a critical section. It does not make count++ atomic.",
                "An atomic operation acts as one update that other threads cannot partly observe.",
                "Use synchronized to protect several operations that must run together. Use an atomic operation for one independent update.",
                "volatile does not require each access to bypass CPU caches. It also does not prevent every instruction reordering.",
            ],
            examples: [{
                title: 'Publish a value through a volatile flag',
                language: 'java',
                code: `public class Main {
    static class Result {
        int value;
        volatile boolean ready;
    }

    public static void main(String[] args) throws InterruptedException {
        Result result = new Result();
        Thread reader = new Thread(() -> {
            while (!result.ready) {
                Thread.onSpinWait();
            }
            System.out.println(result.value);
        });
        reader.start();
        result.value = 42;
        result.ready = true;
        reader.join();
    }
}`,
                result: '42. The reader sees ready = true, then reads value. The write to value happened before the write to ready.',
            }],
            pitfalls: [
                'The loop repeatedly checks ready while waiting. This uses CPU time.',
                'For longer waits, use a Future or a latch. A latch lets a thread wait until other tasks signal completion.',
                'Thread.onSpinWait() tells the runtime that the thread is checking a condition in a loop. The volatile field provides the visibility guarantee.',
                'A volatile reference does not make the fields of its object thread-safe for later mutation.',
            ],
        },
        {
            id: 'choose-a-tool',
            title: 'Choose a tool for the task',
            bullets: [
                "Use Runnable for a task with no result.",
                "Use Callable for a task that returns a value or throws a checked exception.",
                "Use ExecutorService to manage repeated task submissions. Use Future to observe one submitted task.",
                "Use CompletableFuture to chain dependent tasks or combine independent results.",
                "Use synchronized with a common monitor when several shared-state operations must run together.",
                "Use volatile to publish a flag or a value that stops changing after publication.",
                "Use AtomicInteger to increment one independent shared counter.",
                "Use join() to wait for a Thread to finish. Use sleep() to delay the calling thread.",
                "Neither join() nor sleep() replaces locks for shared state.",
            ],
        },
    ],
};

export default note;
