import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'atomic-variables',
    title: 'Atomic variables',
    summary: 'Create a shared counter, read and replace its value, and increment it with one atomic operation.',
    scope: 'java',
    pointwise: true,
    exampleLayout: 'grouped',
    updatedOn: '2026-10-13',
    references: [
        { title: 'Java 17: AtomicInteger', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html' },
    ],
    sections: [
        {
            id: 'atomic-value',
            title: 'Create, read, and replace a counter value',
            bullets: [
                'A shared counter holds a count that several threads use.',
                'AtomicInteger is a class that holds one int value and provides atomic operations on it.',
                'Atomic means an operation takes effect as one indivisible step from the other threads\' point of view.',
                'Import java.util.concurrent.atomic.AtomicInteger to use the class.',
                'new AtomicInteger(0) creates a counter starting at 0. The no-argument constructor also starts at 0.',
                'get() reads the current value. set(value) replaces it with the supplied value.',
            ],
            examples: [{
                title: 'Read and replace the value',
                language: 'java',
                code: `import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) {
        AtomicInteger count = new AtomicInteger(0);
        System.out.println(count.get());
        count.set(5);
        System.out.println(count.get());
    }
}`,
                description: [
                    'Read a counter starting at zero, then replace its value with five.',
                ],
                result: '0\n5',
                explanation: [
                    'count.get() first reads the initial value 0.',
                    'set(5) replaces the stored value. It does not add 5 to the old value.',
                    'The second get() reads 5.',
                ],
            }],
        },
        {
            id: 'atomic-updates',
            title: 'Increment a counter shared by two threads',
            bullets: [
                'For an ordinary int field, count++ reads the value, adds 1, and writes the result.',
                'Two threads can read the same old value and write the same new value. One increment is then lost.',
                'synchronized protects those steps with a common lock. AtomicInteger offers incrementAndGet() for this single-value update.',
                'incrementAndGet() adds 1 atomically and returns the new value.',
            ],
            examples: [{
                title: 'Keep all 2000 increments',
                language: 'java',
                code: `import java.util.concurrent.atomic.AtomicInteger;

class IncrementTask implements Runnable {
    private final AtomicInteger count;

    IncrementTask(AtomicInteger count) {
        this.count = count;
    }

    @Override
    public void run() {
        for (int i = 0; i < 1000; i++) {
            count.incrementAndGet();
        }
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        AtomicInteger count = new AtomicInteger(0);
        Thread first = new Thread(new IncrementTask(count));
        Thread second = new Thread(new IncrementTask(count));
        first.start();
        second.start();
        first.join();
        second.join();
        System.out.println(count.get());
    }
}`,
                description: [
                    'Give two workers the same AtomicInteger and keep all their increments.',
                ],
                result: '2000',
                explanation: [
                    'Both workers receive the same AtomicInteger object. Each worker increments it 1000 times.',
                    'incrementAndGet() performs each increment atomically, so neither worker loses the other worker\'s increment.',
                    'main joins both workers before reading their completed count. The total is 2000.',
                ],
            }],
        },
        {
            id: 'atomic-limits',
            title: 'Separate operations still need coordination',
            bullets: [
                'count.set(count.get() + 1) makes separate read and write calls. It is not an atomic increment.',
                'Another thread can update the value between get() and set(). Use incrementAndGet() for an increment.',
                'Making two fields atomic does not make a rule involving both fields atomic.',
                'For a rule involving several shared fields, protect the whole operation with one common lock.',
                'All reads and writes that rely on that rule must use the same lock.',
            ],
        },
    ],
};

export default note;
