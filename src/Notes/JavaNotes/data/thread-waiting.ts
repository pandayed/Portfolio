import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'thread-waiting',
    title: 'Waiting for threads',
    summary: 'Wait for a task to finish with join, pause the current thread with sleep, and understand timed waits.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [{ title: 'Oracle tutorial: joins', href: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/join.html' }],
    sections: [
        {
            id: 'sleep-and-join',
            title: 'join() waits for a thread to finish',
            bullets: [
                'start() begins the worker’s task. It does not wait for that task to finish.',
                'worker.join() makes the calling thread wait until worker terminates.',
                'In this example, main calls join(). The main thread waits while the worker executes run().',
                'After join() returns, main executes its next statement.',
                'join() can throw InterruptedException if the waiting thread is interrupted. The throws declaration passes that exception out of main. The interruption lesson explains how to handle it.',
            ],
            examples: [{
                language: 'java',
                code: `class PrintTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Worker finished");
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(new PrintTask());
        worker.start();
        worker.join();
        System.out.println("Main continued");
    }
}`,
                result: 'Worker finished\nMain continued',
            }],
        },
        {
            id: 'wait-for-two-workers',
            title: 'Start both workers before waiting',
            bullets: [
                'Start each worker, then join each worker when main needs their completed results.',
                'Joining first before starting second makes main wait before second has any chance to begin.',
                'Joining both after starting them lets both tasks make progress before main reaches the final print.',
                'The two tasks below each print their own sequence in order. Lines from the two sequences can appear between each other.',
            ],
            examples: [{
                language: 'java',
                code: `class NumberTask implements Runnable {
    private final int first;

    NumberTask(int first) {
        this.first = first;
    }

    @Override
    public void run() {
        for (int number = first; number <= 6; number += 2) {
            System.out.println(number);
        }
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread odd = new Thread(new NumberTask(1));
        Thread even = new Thread(new NumberTask(2));
        odd.start();
        even.start();
        odd.join();
        even.join();
        System.out.println("Finished");
    }
}`,
                result: 'Prints 1, 3, 5 and 2, 4, 6. Their lines may mix. Finished is always last.',
            }],
        },
        {
            id: 'sleep',
            title: 'sleep() pauses the calling thread',
            bullets: [
                'Thread.sleep(milliseconds) pauses the thread executing that call.',
                'Thread.sleep(100) requests a pause of 100 milliseconds, which is one tenth of a second.',
                'In the example, main calls sleep(), so the main thread pauses.',
                'The thread can resume later than the requested duration because it must be scheduled again.',
                'sleep() can also throw InterruptedException.',
                'A pause does not prove that another task finished. join() waits for completion.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("Before pause");
        Thread.sleep(100);
        System.out.println("After pause");
    }
}`,
                result: 'Before pause\nAfter pause',
            }],
        },
        {
            id: 'timed-join',
            title: 'A timed join can finish waiting before the worker stops',
            bullets: [
                'worker.join(100) waits for the worker to terminate or for the requested wait time to pass.',
                'A normal return from a timed join does not prove the worker finished.',
                'worker.isAlive() checks whether the worker has started and has not yet terminated.',
                'Check isAlive() after a timed join when the next operation requires the worker to have finished.',
                'A timed join does not stop or interrupt the worker when the wait ends.',
            ],
        },
    ],
};

export default note;
