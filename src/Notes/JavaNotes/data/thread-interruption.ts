import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'thread-interruption',
    title: 'Interrupting a thread',
    summary: 'Request that a task stop, respond while waiting or calculating, and preserve interruption when passing control back.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [{ title: 'Oracle tutorial: interrupts', href: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/interrupt.html' }],
    sections: [
        {
            id: 'interruption',
            title: 'interrupt() sends a request',
            bullets: [
                'An interruption is a request for a thread to respond to another part of the program.',
                'The examples use that request to stop a task.',
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
                'Runnable.run() cannot add InterruptedException to its method declaration. The task below catches the exception inside run().',
                'Returning from run() finishes the task and terminates its thread.',
                'The main thread sends the request and joins the worker to wait for that response.',
            ],
            examples: [{
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
            }],
        },
        {
            id: 'check-interrupted-status',
            title: 'Check interruption when the task is not waiting',
            bullets: [
                'A task that keeps calculating may not call sleep() or another waiting method.',
                'Thread.currentThread().isInterrupted() checks the status of the executing thread without clearing it.',
                'The worker below checks that status before each loop iteration.',
                'After main requests interruption, the worker leaves its loop and returns from run().',
            ],
            examples: [{
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
                result: 'Worker stopped. The loop count is not fixed because scheduling determines how much work happens before the request.',
            }],
        },
        {
            id: 'preserve-interruption',
            title: 'Preserve the request when a helper cannot throw the exception',
            bullets: [
                'A helper method may need to pass InterruptedException back to its caller. It can declare throws InterruptedException.',
                'If the helper cannot throw it, it can restore the status by calling Thread.currentThread().interrupt().',
                'Restoring the status lets the calling code detect that interruption was requested.',
                'The helper below restores the status and returns false instead of continuing after an interrupted pause.',
                'The earlier task can consume the request because returning from run() is its response. A helper that returns to other code has not necessarily finished the task.',
                'Thread.interrupted() checks the calling thread and clears its status. isInterrupted() checks a Thread object without clearing its status.',
            ],
            examples: [{
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
                result: 'Returns true after a normal pause. Returns false with the status restored when the pause is interrupted.',
            }],
        },
    ],
};

export default note;
