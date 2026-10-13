import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'multithreading',
    title: 'Java multithreading',
    summary: 'Create threads, wait for completion, handle interruption, and protect shared state with locks, atomic updates, and volatile.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [
        { title: 'Video: Java Multithreading in One Shot — The Curious Coder', href: 'https://youtu.be/cEhuoI9x7F4' },
        { title: 'Java 17: Thread and thread states', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Thread.html' },
        { title: 'Java Language Specification: threads, locks, and visibility', href: 'https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html' },
    ],
    sections: [
        {
            id: 'thread-basics',
            title: 'Processes and threads',
            bullets: [
                "A process is a running program.",
                "A thread runs a sequence of instructions inside a process.",
                "Threads share objects. Each thread has its own call stack, which records its active method calls.",
                "Concurrency means tasks make progress during overlapping periods.",
                "Parallelism means tasks run at the same time on available processors. Starting two threads does not guarantee parallelism.",
            ],
        },
        {
            id: 'create-a-thread',
            title: 'Create a task and start a thread',
            bullets: [
                "Runnable describes a task through its void run() method. A lambda can implement Runnable.",
                "Pass a Runnable to a Thread to choose the task that the thread runs.",
                "You can also extend Thread and override run(). Call start() on that Thread object.",
                "start() schedules a new thread to execute run(). Calling run() directly runs the method on the calling thread.",
                'Creating a Thread object does not start it. A Thread object can be started only once, even after it terminates.',
                'Thread.currentThread() returns the calling thread. getName() reads its name.',
                'Thread order and priority do not establish an output order. Coordinate tasks explicitly when order matters.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        Runnable work = () -> System.out.println(
                Thread.currentThread().getName());
        Thread worker = new Thread(work, "worker");

        worker.run();
        worker.start();
    }
}`,
                result: 'main\nworker',
            }],
        },
        {
            id: 'sleep-and-join',
            title: 'sleep pauses the caller; join waits for a worker',
            bullets: [
                "Thread.sleep(duration) pauses the calling thread. It does not wait for a task to finish.",
                "worker.join() makes the calling thread wait until worker finishes. A timed join may return before worker finishes.",
                "Start both workers before calling join() to allow their work to overlap.",
                "If you start and join the first worker before starting the second, the workers run one after another.",
                'sleep does not guarantee alternating odd and even output. Strict alternation needs a shared condition and coordination.',
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
        },
        {
            id: 'interruption',
            title: 'Treat interruption as a request to stop',
            bullets: [
                'worker.interrupt() requests interruption of worker. The thread must respond to that request.',
                'Interruption does not force the thread to terminate.',
                'Thread.sleep() and worker.join() can throw InterruptedException while waiting.',
                'When sleep() or join() throws InterruptedException, it clears the thread’s interrupted status. This status records an interruption request.',
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
        },
        {
            id: 'synchronized',
            title: 'Shared state and synchronized',
            bullets: [
                "Shared state is data that multiple threads can access.",
                "count++ reads a value, adds one, and writes the result.",
                "Two threads can read the same value and overwrite each other’s increment. This is a lost update.",
                "A race condition occurs when the result depends on how threads access shared state without coordination.",
                "A critical section is code that accesses shared state under a common lock.",
                "A monitor is a lock associated with an object.",
                "synchronized allows only one thread at a time to hold the same monitor lock.",
                "A synchronized instance method locks this. A static synchronized method locks the class’s Class object.",
                "A synchronized block locks the object supplied to it.",
                "When a thread releases a monitor, its earlier writes become visible to a thread that later acquires the same monitor.",
                "Every access to the protected state must follow the same locking rule.",
                'Two different Counter objects have different monitors. Their synchronized instance methods can run simultaneously.',
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
            }, {
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
        },
        {
            id: 'atomic-updates',
            title: 'Protect an update shared by threads',
            bullets: [
                'An atomic operation completes as one update that other threads cannot partly observe.',
                'AtomicInteger stores an int and provides atomic operations on that value.',
                'incrementAndGet() increments the value and returns the new value.',
                'get() reads the current value.',
                'The workers below share one AtomicInteger. join() waits for both workers before the final read.',
                'A separate get() followed by set() is not one atomic operation. Threads can change the value between those calls.',
                'An atomic variable does not automatically protect a rule involving several shared values.',
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
        },
        {
            id: 'volatile',
            title: 'Visibility and volatile',
            bullets: [
                "Visibility means a thread can read values written by another thread.",
                "A shared field without coordination does not guarantee visibility.",
                "The Java Memory Model defines which writes a thread can observe and how operations are ordered.",
                "A write to a volatile field happens-before a later read of that field. Happens-before guarantees visibility and ordering.",
                "A thread can write other fields, then set a volatile flag to publish those values.",
                "When another thread reads the published flag value, it can also observe the writes made before that flag was set.",
                "volatile does not lock a critical section. It does not make count++ atomic.",
                "volatile does not require each access to bypass CPU caches. It also does not prevent every instruction reordering.",
                'This loop illustrates visibility. It repeatedly checks ready and uses CPU time while waiting.',
                'Thread.onSpinWait() tells the runtime that the thread is checking a condition in a loop. The volatile field provides the visibility guarantee.',
                'A volatile reference does not make the fields of its object thread-safe for later mutation.',
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
        },
        {
            id: 'thread-states',
            title: 'Thread states and monitor waits',
            bullets: [
                "NEW: the Thread exists, but start() has not been called.",
                "RUNNABLE: the thread is running or eligible to run. Java has no separate RUNNING state.",
                "BLOCKED: the thread waits to acquire a monitor lock for synchronized code.",
                "WAITING: the thread waits without a time limit. Object.wait() and an untimed join() can cause this state.",
                "TIMED_WAITING: the wait has a time limit. sleep(), timed wait(), and timed join() can cause this state.",
                "TERMINATED: run() returned or ended with an uncaught exception. You cannot restart this Thread.",
                "A thread must hold an object’s monitor before calling Object.wait() on it.",
                "wait() releases that monitor while waiting. The thread must acquire the monitor again before wait() returns.",
                "sleep() keeps any monitor locks already held by the calling thread.",
                "getState() reports the state at that moment. The state can change immediately after the call.",
                "Reading a state does not coordinate when another thread can proceed.",
                'A sleeping thread is TIMED_WAITING, not BLOCKED. BLOCKED specifically describes monitor acquisition.',
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
        },
        {
            id: 'deadlock',
            title: 'Deadlock and lock order',
            bullets: [
                "Deadlock occurs when threads wait for each other and none can proceed.",
                "Thread A holds the first lock and waits for the second. Thread B holds the second lock and waits for the first.",
                "Neither thread can reach the code that releases its lock.",
                "Acquire multiple locks in one consistent order. This prevents the circular wait in the two-lock example.",
                "A thread dump lists thread states and lock ownership. Use it to check whether the waits form a cycle.",
                "A BLOCKED state alone does not prove deadlock.",
                'Reversing the lock order for one worker permits deadlock. It does not guarantee deadlock on every run.',
                'Interrupting a thread blocked on synchronized does not force it to acquire or release the monitor.',
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
        },
    ],
};

export default note;
