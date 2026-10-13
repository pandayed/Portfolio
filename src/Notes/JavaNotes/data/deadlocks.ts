import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'deadlocks',
    title: 'Deadlocks',
    summary: 'See how two threads can wait forever for each other, then acquire shared locks in one common order.',
    scope: 'java',
    pointwise: true,
    exampleLayout: 'grouped',
    updatedOn: '2026-10-13',
    references: [
        { title: 'Java Language Specification: locks and thread execution', href: 'https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html' },
    ],
    sections: [
        {
            id: 'deadlock',
            title: 'Two threads can each hold the lock the other needs',
            bullets: [
                'Suppose two threads both need the locks of two objects, first and second.',
                'Thread A acquires first, then tries to acquire second.',
                'Thread B acquires second, then tries to acquire first.',
                'If both threads acquire their first lock before either acquires its second lock, neither can continue.',
                'This is a deadlock: each thread waits for the other to release a lock.',
            ],
            table: {
                columns: ['Step', 'Thread A', 'Thread B'],
                rows: [
                    ['1', 'Acquires first.', '—'],
                    ['2', 'Still holds first.', 'Acquires second.'],
                    ['3', 'Waits to acquire second. Keeps first.', 'Still holds second.'],
                    ['4', 'Still waiting. Cannot leave its synchronized block.', 'Waits to acquire first. Keeps second.'],
                ],
            },
        },
        {
            id: 'circular-wait',
            title: 'Why neither lock is released',
            bullets: [
                'A releases first only after it finishes the protected code. It cannot finish while waiting for second.',
                'B has the same problem with the objects reversed.',
                'These waits form a cycle: A waits for B, and B waits for A.',
                'Reversing the lock order permits deadlock. It does not guarantee deadlock on every run.',
                'Interrupting a thread waiting to enter synchronized does not make it acquire or release that lock.',
            ],
        },
        {
            id: 'common-lock-order',
            title: 'Both threads acquire first before second',
            bullets: [
                'Use one common order whenever code needs the same two locks.',
                'Only one thread can acquire the first lock. The other waits for that lock without holding the second.',
                'The thread holding the first lock can acquire the second, finish, and release both locks. The other thread can then run.',
            ],
            examples: [{
                title: 'Acquire two shared locks in one common order',
                description: [
                    'Give both tasks the same two lock objects and have each acquire first before second.',
                ],
                language: 'java',
                code: `class UseBothLocks implements Runnable {
    private final Object first;
    private final Object second;

    UseBothLocks(Object first, Object second) {
        this.first = first;
        this.second = second;
    }

    @Override
    public void run() {
        synchronized (first) {
            synchronized (second) {
                System.out.println("Both locks acquired");
            }
        }
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Object first = new Object();
        Object second = new Object();
        Thread a = new Thread(new UseBothLocks(first, second));
        Thread b = new Thread(new UseBothLocks(first, second));
        a.start();
        b.start();
        a.join();
        b.join();
    }
}`,
                result: 'Both locks acquired\nBoth locks acquired',
                explanation: [
                    'UseBothLocks.first and second store the lock objects passed to its constructor.',
                    'Only one thread can acquire first. The other waits for first without holding second.',
                    'The thread holding first can acquire second, print, and release both locks. The other thread can then run.',
                    'main joins both workers. Each worker prints the same line once.',
                ],
            }],
        },
        {
            id: 'confirming-deadlock',
            title: 'A waiting thread alone does not prove deadlock',
            bullets: [
                'A thread dump is a snapshot of threads, their method calls, and the locks they hold or await.',
                'Use lock ownership and waiting information to check whether threads form a cycle.',
                'A thread in BLOCKED state may simply be waiting for another thread to finish normally. That state alone does not prove deadlock.',
            ],
        },
    ],
};

export default note;
