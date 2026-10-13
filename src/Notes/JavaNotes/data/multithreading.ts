import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'multithreading',
    title: 'Threads',
    summary: 'Create and start threads, wait for completion, handle interruption, and read thread lifecycle states.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [
        { title: 'Java 17: Thread and thread states', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Thread.html' },
    ],
    sections: [
        {
            id: 'thread-basics',
            title: 'Processes and threads',
            bullets: [
                "A process is a running program.",
                "A thread runs a sequence of instructions inside a process.",
                "Threads share objects. Each thread has its own call stack, which records its active method calls.",
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
            id: 'thread-states',
            title: 'Thread lifecycle states',
            bullets: [
                "NEW: the Thread exists, but start() has not been called.",
                "RUNNABLE: the thread is running or eligible to run. Java has no separate RUNNING state.",
                "BLOCKED: the thread waits for an object lock used by synchronized code.",
                "WAITING: the thread waits without a time limit. An untimed join() can cause this state.",
                "TIMED_WAITING: the wait has a time limit. sleep() and a timed join() can cause this state.",
                "TERMINATED: run() returned or ended with an uncaught exception. You cannot restart this Thread.",
                "getState() reports the state at that moment. The state can change immediately after the call.",
                "Reading a state does not coordinate when another thread can proceed.",
                'A sleeping thread is TIMED_WAITING. BLOCKED describes waiting for an object lock.',
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
    ],
};

export default note;
