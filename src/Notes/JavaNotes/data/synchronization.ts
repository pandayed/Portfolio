import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'synchronization',
    title: 'Synchronization',
    summary: 'See how threads lose counter updates, then protect the counter with synchronized methods and blocks.',
    scope: 'java',
    pointwise: true,
    exampleLayout: 'grouped',
    updatedOn: '2026-10-13',
    references: [
        { title: 'Java synchronized methods', href: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/syncmeth.html' },
        { title: 'Java Language Specification: locks and visibility', href: 'https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html' },
    ],
    sections: [
        {
            id: 'shared-state',
            title: 'Two threads can lose a counter update',
            bullets: [
                'Shared data is data that more than one thread can access.',
                'An increment reads a value, adds 1, and writes the result.',
                'The steps from different threads can overlap. One thread can read a field before another writes its new value.',
            ],
            examples: [{
                title: 'A counter can lose an increment',
                description: [
                    'This Counter class has no lock around increment().',
                    'Consider two threads calling increment() once on the same Counter starting at 0.',
                ],
                language: 'java',
                code: `class Counter {
    private int value = 0;

    void increment() {
        value++;
    }
}`,
                explanation: [
                    'Each value++ reads the current value, adds one, and writes the result.',
                    'Both threads can read 0 before either writes. Both then calculate 1 and write 1.',
                    'The second write replaces 1 with 1, so one increment is lost.',
                    'If one increment finishes before the other reads, the final value is 2. The failure does not happen on every run.',
                    'This class has no main method or print statement.',
                ],
            }],
        },
        {
            id: 'lost-update',
            title: 'Lost updates and race conditions',
            bullets: [
                'A lost update occurs when one update overwrites another without preserving its change.',
                'A race condition occurs when the result depends on the order of uncoordinated access to shared data.',
                'Java does not make an increment one indivisible operation. A thread can run between its steps.',
            ],
        },
        {
            id: 'object-locks',
            title: 'An object lock lets one thread enter at a time',
            bullets: [
                'Every Java object has an associated monitor. The monitor provides a lock for that object.',
                'A thread acquires the lock before entering code protected by it.',
                'Only one thread can hold that lock at a time. Another thread trying to acquire it waits until it is released.',
                'Code protected by a lock is called a critical section.',
                'synchronized acquires a lock before its protected code runs. Java releases the lock when that code ends, including when it throws an exception.',
                'If the whole read-add-write operation holds one lock, another thread using that lock cannot enter halfway through it.',
            ],
        },
        {
            id: 'synchronized',
            title: 'A synchronized instance method locks its object',
            bullets: [
                'A synchronized instance method protects its whole body.',
                'It locks this: the object on which the method was called.',
            ],
            examples: [{
                title: 'Protect a shared counter with synchronized methods',
                description: [
                    'Give two tasks the same Counter and have each increment it 1,000 times.',
                ],
                language: 'java',
                code: `class Counter {
    private int value = 0;

    synchronized void increment() {
        value++;
    }

    synchronized int get() {
        return value;
    }
}

class AddToCounter implements Runnable {
    private final Counter counter;

    AddToCounter(Counter counter) {
        this.counter = counter;
    }

    @Override
    public void run() {
        for (int i = 0; i < 1000; i++) {
            counter.increment();
        }
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();
        Thread first = new Thread(new AddToCounter(counter));
        Thread second = new Thread(new AddToCounter(counter));
        first.start();
        second.start();
        first.join();
        second.join();
        System.out.println(counter.get());
    }
}`,
                result: '2000',
                explanation: [
                    'Counter.value stores the total. increment adds 1, and get reads the total.',
                    'Both tasks receive the same Counter object. Its synchronized methods therefore acquire the same lock.',
                    'AddToCounter.counter stores the supplied reference. final keeps that reference fixed but permits updates to the counter.',
                    'main starts both tasks and joins both before reading the total.',
                    'The common lock keeps each complete increment together, so no update is lost.',
                ],
            }],
        },
        {
            id: 'synchronized-blocks',
            title: 'A synchronized block locks a chosen object',
            bullets: [
                'A synchronized block protects the code between its braces.',
                'The expression in parentheses chooses the object whose lock to acquire.',
            ],
            examples: [{
                title: 'Protect counter methods with a private lock',
                description: [
                    'This Counter variant uses a private lock object instead of locking the Counter itself.',
                    'Use this class with two tasks that each call increment() 1,000 times. Join both tasks before reading get().',
                ],
                language: 'java',
                code: `class Counter {
    private final Object lock = new Object();
    private int value = 0;

    void increment() {
        synchronized (lock) {
            value++;
        }
    }

    int get() {
        synchronized (lock) {
            return value;
        }
    }
}`,
                explanation: [
                    'Both increment() and get() acquire the same private lock.',
                    'increment() holds the lock for the complete read, add, and write operation.',
                    'The class does not print anything on its own. The two tasks keep all 2,000 increments because both methods use the same lock.',
                ],
            }],
        },
        {
            id: 'check-and-update',
            title: 'Protect a check and its update together',
            bullets: [
                'A method may need to check a value before changing it.',
                'If the check releases the lock before the update, another thread can change the value in between.',
            ],
            examples: [{
                title: 'Keep a limit check and increment together',
                description: [
                    'Place this method inside a Counter class with an int value field initialized to 0.',
                    'Consider two calls with limit 1 on the same counter starting at 0.',
                ],
                language: 'java',
                code: `synchronized boolean incrementBelow(int limit) {
    if (value >= limit) {
        return false;
    }
    value++;
    return true;
}`,
                explanation: [
                    'The method holds the counter’s lock while checking value and incrementing it.',
                    'The first call returns true and changes value to 1. The next call returns false without changing it.',
                    'Which thread succeeds can vary, but the final value is 1.',
                    'The method returns a boolean. It does not print anything.',
                ],
            }],
        },
        {
            id: 'same-lock',
            title: 'The same lock protects access and visibility',
            bullets: [
                'Releasing a lock makes earlier writes visible to a thread that next acquires that same lock.',
                'Use the same locking rule for every concurrent read and write of the protected field.',
                'A synchronized writer does not make an unsynchronized reader acquire its lock.',
                'Two different Counter objects have different locks. Their synchronized instance methods can run at the same time.',
                'Java lets a thread acquire a lock it already holds. This is called reentrant locking.',
            ],
        },
        {
            id: 'static-locks',
            title: 'Static methods use the class lock',
            bullets: [
                'A static synchronized method locks the Class object for its declaring class.',
                'Counter.class refers to the Class object representing Counter. It is different from a Counter instance.',
                'A static synchronized method and a synchronized instance method use different locks.',
            ],
            table: {
                columns: ['Code', 'Object whose lock is acquired'],
                rows: [
                    ['synchronized void increment()', 'The Counter instance on which increment was called.'],
                    ['synchronized (lock) { ... }', 'The object referenced by lock.'],
                    ['static synchronized void increment()', 'Counter.class, when the method is declared in Counter.'],
                ],
            },
        },
    ],
};

export default note;
