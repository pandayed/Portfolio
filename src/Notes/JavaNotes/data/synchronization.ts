import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'synchronization',
    title: 'Synchronization',
    summary: 'See how threads lose counter updates, then protect the counter with synchronized methods and blocks.',
    scope: 'java',
    pointwise: true,
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
                'Suppose two threads use the same Counter object. Its value field starts at 0.',
                'Each thread calls increment once. We expect the final value to be 2.',
                'value++ has three steps: read value, add 1, and write the result.',
                'The steps from the two calls can overlap. Another thread can read the field before the first thread writes its new value.'
            ],
            examples: [{
                language: 'java',
                code: `class Counter {
    private int value = 0;

    void increment() {
        value++;
    }
}`,
            }],
        },
        {
            id: 'lost-update',
            title: 'Why the result is 1 instead of 2',
            bullets: [
                'The table shows one possible order for the two increments.',
                'Both threads calculated from the same old value, 0.',
                'The second write replaced 1 with 1. One increment was lost.',
                'This is a lost update. A race condition occurs when the result depends on the order of uncoordinated access to shared data.',
                'A different order can produce 2. An incorrect counter does not fail on every run.',
                'Java does not make value++ one indivisible operation. A thread can run between its steps.',
            ],
            table: {
                columns: ['Step', 'Thread A', 'Thread B', 'Shared value'],
                rows: [
                    ['1', 'Reads 0', '—', '0'],
                    ['2', '—', 'Reads 0', '0'],
                    ['3', 'Calculates 0 + 1', '—', '0'],
                    ['4', '—', 'Calculates 0 + 1', '0'],
                    ['5', 'Writes 1', '—', '1'],
                    ['6', '—', 'Writes 1', '1'],
                ],
            },
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
                'Add synchronized to increment to protect its whole body.',
                'A synchronized instance method locks this: the object on which the method was called.',
                'Both tasks below receive the same Counter object. Both increment methods therefore use the same lock.',
                'Counter.value stores the total. increment adds 1, and get reads the total.',
                'AddToCounter.counter stores the Counter passed to its constructor. final keeps that reference fixed. It does not prevent updates to the counter.',
                'AddToCounter.run calls increment 1,000 times. main starts two tasks and joins both before printing.',
                'The output is 2000. The common lock prevents overlapping increments from losing an update.',
            ],
            examples: [{
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
            }],
        },
        {
            id: 'synchronized-blocks',
            title: 'A synchronized block locks a chosen object',
            bullets: [
                'A synchronized block protects the code between its braces.',
                'The expression in parentheses chooses the object whose lock to acquire.',
                'The Counter below creates one private lock object. Both increment and get use that same object.',
                'Replace the Counter class in the preceding program with this class. The tasks and main stay the same.',
            ],
            examples: [{
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
                result: 'The preceding program still prints 2000. Both counter methods use lock instead of the Counter object itself.',
            }],
        },
        {
            id: 'check-and-update',
            title: 'Protect a check and its update together',
            bullets: [
                'A method may need to check a value before changing it.',
                'If the check releases the lock before the update, another thread can change the value in between.',
                'This method belongs in the first Counter class. It keeps the limit check and increment inside one synchronized method.',
            ],
            examples: [{
                language: 'java',
                code: `synchronized boolean incrementBelow(int limit) {
    if (value >= limit) {
        return false;
    }
    value++;
    return true;
}`,
                result: 'For a counter starting at 0, two calls with limit 1 return true and false. The final value is 1. Which thread succeeds can vary.',
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
