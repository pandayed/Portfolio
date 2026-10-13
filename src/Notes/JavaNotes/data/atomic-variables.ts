import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'atomic-variables',
    title: 'Atomic variables',
    summary: 'Update one shared integer atomically and understand which multi-step operations still need coordination.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [
        { title: 'Java 17: AtomicInteger', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html' },
    ],
    sections: [
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
    ],
};

export default note;
