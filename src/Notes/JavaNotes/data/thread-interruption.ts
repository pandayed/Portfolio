import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'thread-interruption',
    title: 'Interrupting a thread',
    summary: 'Request that a task stop, respond while waiting or calculating, and preserve interruption when passing control back.',
    scope: 'java',
    pointwise: true,
    exampleLayout: 'grouped',
    updatedOn: '2026-10-13',
    references: [{ title: 'Oracle tutorial: interrupts', href: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/interrupt.html' }],
    sections: [
        {
            id: 'interruption',
            title: 'interrupt() sends a request',
            bullets: [
                'An interruption is a request for a thread to respond to another part of the program.',
                'A task can use that request to stop.',
                'Each thread has an interrupted status: a true-or-false flag recording this request.',
                'worker.interrupt() requests interruption of worker. It does not force run() to return.',
                'The worker must check its status or handle InterruptedException from a waiting operation.',
            ],
        },
        {
            id: 'interrupt-a-wait',
            title: 'Handle interruption during sleep',
            bullets: [
                'sleep() and join() can throw InterruptedException while a thread is waiting.',
                'Throwing that exception clears the interrupted status.',
                'Runnable.run() cannot add InterruptedException to its method declaration.',
                'Returning from run() finishes the task and terminates its thread.',
            ],
            examples: [{
                title: 'Stop a sleeping worker',
                description: [
                    'Request that a worker stop, then wait for its response.',
                ],
                language: 'java',
                code: `class WaitingTask implements Runnable {
    @Override
    public void run() {
        try {
            while (true) {
                Thread.sleep(1000);
            }
        } catch (InterruptedException interrupted) {
            System.out.println("Worker stopped");
            return;
        }
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(new WaitingTask());
        worker.start();
        worker.interrupt();
        worker.join();
        System.out.println("Main finished");
    }
}`,
                result: 'Worker stopped\nMain finished',
                explanation: [
                    'WaitingTask repeatedly calls sleep() inside run().',
                    'Runnable.run() cannot declare InterruptedException, so this task catches it inside run().',
                    'The interrupt request makes sleep() throw, including if the request arrives before the first sleep call.',
                    'The catch prints Worker stopped and returns from run().',
                    'main joins the worker before printing Main finished.',
                ],
            }],
        },
        {
            id: 'check-interrupted-status',
            title: 'Check interruption when the task is not waiting',
            bullets: [
                'A task that keeps calculating may not call sleep() or another waiting method.',
                'Thread.currentThread().isInterrupted() checks the status of the executing thread without clearing it.',
            ],
            examples: [{
                title: 'Stop a task by checking interrupted status',
                description: [
                    'Request that a worker stop a loop that does not call a waiting method.',
                ],
                language: 'java',
                code: `class CheckingTask implements Runnable {
    @Override
    public void run() {
        Thread current = Thread.currentThread();
        long count = 0;
        while (!current.isInterrupted()) {
            count++;
        }
        System.out.println("Worker stopped");
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(new CheckingTask());
        worker.start();
        worker.interrupt();
        worker.join();
    }
}`,
                result: 'Worker stopped',
                explanation: [
                    'The worker checks its interrupted status before each iteration.',
                    'After main requests interruption, the worker leaves its loop and prints Worker stopped.',
                    'The count is not printed. Scheduling determines how many iterations run before the request is observed.',
                ],
            }],
        },
        {
            id: 'preserve-interruption',
            title: 'Preserve the request when a helper cannot throw the exception',
            bullets: [
                'A helper method may need to pass InterruptedException back to its caller. It can declare throws InterruptedException.',
                'If the helper cannot throw it, it can restore the status by calling Thread.currentThread().interrupt().',
                'Restoring the status lets the calling code detect that interruption was requested.',
                'A task can consume the request if ending run() is its response. A helper returning to other code has not necessarily finished the task.',
                'Thread.interrupted() checks the calling thread and clears its status. isInterrupted() checks a Thread object without clearing its status.',
            ],
            examples: [{
                title: 'Restore interruption in a pause helper',
                description: [
                    'Place this static helper inside a class. It reports whether its pause completed normally.',
                ],
                language: 'java',
                code: `static boolean pause() {
    try {
        Thread.sleep(100);
        return true;
    } catch (InterruptedException interrupted) {
        Thread.currentThread().interrupt();
        return false;
    }
}`,
                explanation: [
                    'The helper returns true after a normal pause.',
                    'If sleep() throws InterruptedException, the catch restores the calling thread’s interrupted status and returns false.',
                    'Restoring the status lets the caller respond to the request after the helper returns.',
                    'The helper does not print anything.',
                ],
            }],
        },
    ],
};

export default note;
