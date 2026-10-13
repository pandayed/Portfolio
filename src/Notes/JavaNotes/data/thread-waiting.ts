import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'thread-waiting',
    title: 'Waiting for threads',
    summary: 'Wait for a task to finish with join, pause the current thread with sleep, and understand timed waits.',
    scope: 'java',
    pointwise: true,
    exampleLayout: 'grouped',
    updatedOn: '2026-10-13',
    references: [{ title: 'Oracle tutorial: joins', href: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/join.html' }],
    sections: [
        {
            id: 'sleep-and-join',
            title: 'join() waits for a thread to finish',
            bullets: [
                'start() begins a thread’s task. It does not wait for that task to finish.',
                'Calling join() on a Thread object makes the calling thread wait until that thread terminates.',
                'After join() returns, the calling thread executes its next statement.',
                'join() can throw InterruptedException if the waiting thread is interrupted. The interruption lesson explains how to handle it.',
            ],
            examples: [{
                title: 'Wait for a worker before continuing',
                description: [
                    'Start a worker and wait for it before main prints its next message.',
                ],
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
                explanation: [
                    'main calls join(), so the main thread waits while the worker executes run().',
                    'The worker prints Worker finished and terminates.',
                    'join() then returns, and main prints Main continued.',
                    'The throws declaration passes InterruptedException out of main if the wait is interrupted.',
                ],
            }],
        },
        {
            id: 'wait-for-two-workers',
            title: 'Start both workers before waiting',
            bullets: [
                'Start each worker, then join each worker when the caller needs their completed results.',
                'Joining one worker before starting another makes the caller wait before the second task can begin.',
                'Joining both after starting them lets both tasks make progress before the caller continues.',
            ],
            examples: [{
                title: 'Wait for odd and even number tasks',
                description: [
                    'Start both number tasks before joining either one.',
                ],
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
                result: '1\n2\n3\n4\n5\n6\nFinished',
                possibleOutput: true,
                explanation: [
                    'NumberTask(1) prints 1, 3, 5. NumberTask(2) prints 2, 4, 6.',
                    'Each task prints its own sequence in order. Lines from the two sequences can appear between each other.',
                    'Both joins finish before main prints Finished, so that line is always last.',
                ],
            }],
        },
        {
            id: 'sleep',
            title: 'sleep() pauses the calling thread',
            bullets: [
                'Thread.sleep(milliseconds) pauses the thread executing that call.',
                'Thread.sleep(100) requests a pause of 100 milliseconds, which is one tenth of a second.',
                'The thread can resume later than the requested duration because it must be scheduled again.',
                'sleep() can also throw InterruptedException.',
                'A pause does not prove that another task finished. join() waits for completion.',
            ],
            examples: [{
                title: 'Pause the main thread',
                description: [
                    'Print a message before and after a requested 100-millisecond pause.',
                ],
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("Before pause");
        Thread.sleep(100);
        System.out.println("After pause");
    }
}`,
                result: 'Before pause\nAfter pause',
                explanation: [
                    'main calls sleep(), so the main thread pauses.',
                    'The pause requests one tenth of a second. Scheduling can delay the second line beyond that time.',
                    'The throws declaration passes InterruptedException out of main if the pause is interrupted.',
                ],
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
