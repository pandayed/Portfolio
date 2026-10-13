import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'synchronization',
    title: 'Synchronization',
    summary: 'Protect shared state with one monitor lock, understand monitor waits, and avoid deadlock.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [
        { title: 'Java Language Specification: threads, locks, and visibility', href: 'https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html' },
    ],
    sections: [
        {
            id: 'shared-state',
            title: 'Shared state and lost updates',
            bullets: [
                "Shared state is data that multiple threads can access.",
                "count++ reads a value, adds one, and writes the result.",
                "Two threads can read the same value and overwrite each other’s increment. This is a lost update.",
                "A race condition occurs when the result depends on how threads access shared state without coordination.",
            ],
        },
        {
            id: 'synchronized',
            title: 'Protect shared state with synchronized',
            bullets: [
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
            id: 'monitor-waits',
            title: 'Monitor waits and sleeping',
            bullets: [
                'Object.wait() makes the calling thread wait on an object.',
                "A thread must hold an object’s monitor before calling Object.wait() on it.",
                "wait() releases that monitor while waiting. The thread must acquire the monitor again before wait() returns.",
                "sleep() keeps any monitor locks already held by the calling thread.",
                'Object.wait() can throw InterruptedException when the waiting thread is interrupted.',
            ],
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
