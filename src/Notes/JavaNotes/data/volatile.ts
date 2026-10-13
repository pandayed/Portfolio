import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'volatile',
    title: 'Volatile',
    summary: 'Make shared field writes visible and publish a value through a volatile flag without treating updates as atomic.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [
        { title: 'Java Language Specification: threads, locks, and visibility', href: 'https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html' },
    ],
    sections: [
        {
            id: 'volatile',
            title: 'Visibility and volatile',
            bullets: [
                "Visibility means a thread can read values written by another thread.",
                "A shared field without coordination does not guarantee visibility.",
                "The Java Memory Model defines which writes a thread can observe and how operations are ordered.",
                "A write to a volatile field happens-before a later read of that field. Happens-before guarantees visibility and ordering.",
            ],
        },
        {
            id: 'volatile-publication',
            title: 'Publish a value through a volatile flag',
            bullets: [
                "A thread can write other fields, then set a volatile flag to publish those values.",
                "When another thread reads the published flag value, it can also observe the writes made before that flag was set.",
                'This loop illustrates visibility. It repeatedly checks ready and uses CPU time while waiting.',
                'Thread.onSpinWait() tells the runtime that the thread is checking a condition in a loop. The volatile field provides the visibility guarantee.',
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
            id: 'volatile-limits',
            title: 'What volatile does not protect',
            bullets: [
                "volatile does not lock a critical section. It does not make count++ atomic.",
                "volatile does not require each access to bypass CPU caches. It also does not prevent every instruction reordering.",
                'A volatile reference does not make the fields of its object thread-safe for later mutation.',
            ],
        },
    ],
};

export default note;
