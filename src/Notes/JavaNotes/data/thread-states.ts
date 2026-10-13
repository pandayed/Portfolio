import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'thread-states',
    title: 'Thread states',
    summary: 'Read the state of a thread after learning how threads start, wait, acquire locks, and finish.',
    scope: 'java',
    pointwise: true,
    exampleLayout: 'grouped',
    updatedOn: '2026-10-13',
    references: [{ title: 'Java 17 Thread.State', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Thread.State.html' }],
    sections: [
        {
            id: 'thread-states',
            title: 'A state describes what the thread is doing',
            bullets: [
                'Java records a lifecycle state for each Thread object.',
                'worker.getState() reads that state at the moment of the call.',
                'A thread can change state immediately after getState() returns.',
                'Use the state to understand the thread. It does not make the thread wait or guarantee what it will do next.',
            ],
            table: {
                columns: ['State', 'Meaning'],
                rows: [
                    ['NEW', 'The Thread object exists, but start() has not been called.'],
                    ['RUNNABLE', 'The thread is executing or ready to execute. Java has no separate RUNNING state.'],
                    ['BLOCKED', 'The thread is waiting to acquire an object monitor lock for synchronized code.'],
                    ['WAITING', 'The thread is waiting without a time limit, such as in join() or Object.wait().'],
                    ['TIMED_WAITING', 'The thread is waiting with a time limit, such as in sleep() or a timed join().'],
                    ['TERMINATED', 'run() has finished or ended with an uncaught exception. The same Thread cannot be started again.'],
                ],
            },
            examples: [{
                title: 'Read a worker’s state before starting and after joining',
                description: [
                    'Read the state at two points where the worker’s lifecycle is predictable.',
                ],
                language: 'java',
                code: `class PrintTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Task finished");
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(new PrintTask());
        System.out.println(worker.getState());
        worker.start();
        worker.join();
        System.out.println(worker.getState());
    }
}`,
                result: 'NEW\nTask finished\nTERMINATED',
                explanation: [
                    'The worker has not started at the first getState() call, so it prints NEW.',
                    'The worker prints Task finished from run().',
                    'join() waits for termination before the second getState() call, so that call prints TERMINATED.',
                    'Reading the state immediately after start() would depend on scheduling.',
                ],
            }],
        },
    ],
};

export default note;
