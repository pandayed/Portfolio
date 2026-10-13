import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'volatile',
    title: 'Volatile',
    summary: 'Share a stop flag between threads, then publish other data through a volatile flag.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [
        { title: 'Java Language Specification: threads, locks, and visibility', href: 'https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html' },
    ],
    sections: [
        {
            id: 'volatile',
            title: 'Make a stop request visible to a worker',
            bullets: [
                'A stop flag is a boolean field. One thread sets it to true to ask another thread to finish.',
                'The worker reads the flag repeatedly. The main thread writes it when requesting a stop.',
                'Visibility means the worker can observe the flag value written by the main thread.',
                'Without coordination, an ordinary shared boolean does not guarantee that the worker observes the change.',
                'That worker might stop, or it might keep reading false. There is no fixed failing output to expect.',
                'Declare the field volatile so writes to it are visible to subsequent reads of that field.',
                'The loop below repeatedly checks the flag and uses CPU time while waiting.',
                'Setting the flag requests a stop. It does not interrupt the worker or force an immediate exit.',
            ],
            examples: [{
                title: 'Request a stop and wait for the worker',
                language: 'java',
                code: `class StopTask implements Runnable {
    private volatile boolean stopRequested;

    public void requestStop() {
        stopRequested = true;
    }

    @Override
    public void run() {
        while (!stopRequested) {
            // Keep checking until a stop is requested.
        }
        System.out.println("Worker stopped");
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        StopTask task = new StopTask();
        Thread worker = new Thread(task);
        worker.start();
        task.requestStop();
        worker.join();
        System.out.println("Main finished");
    }
}`,
                result: 'Prints Worker stopped, then Main finished when the worker gets time to run and finishes. The worker may see the request before its first loop check. join() waits for its termination; it does not send the stop request.',
            }],
        },
        {
            id: 'volatile-publication',
            title: 'Publish other data through a flag',
            bullets: [
                'Publishing data means making prepared values available for another thread to read.',
                'Write the data first, then set a volatile ready flag to true.',
                'A reader first checks ready. After reading true, it can read the data written before that flag was set.',
                'Happens-before names this ordering guarantee: the earlier writes are visible to the later reads.',
                'A volatile write happens-before a subsequent read of that same volatile field.',
                'Here the reader observes ready = true before reading value, so it sees value = 42.',
            ],
            examples: [{
                title: 'Prepare a value before announcing it is ready',
                language: 'java',
                code: `class Result {
    int value;
    volatile boolean ready;
}

class ReadResultTask implements Runnable {
    private final Result result;

    ReadResultTask(Result result) {
        this.result = result;
    }

    @Override
    public void run() {
        while (!result.ready) {
            // Wait for the prepared value.
        }
        System.out.println(result.value);
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Result result = new Result();
        Thread reader = new Thread(new ReadResultTask(result));
        reader.start();
        result.value = 42;
        result.ready = true;
        reader.join();
    }
}`,
                result: 'Prints 42 when the reader finishes. Reading ready as true makes the earlier value write visible. value does not need volatile for this one-time publication.',
            }],
        },
        {
            id: 'volatile-limits',
            title: 'Visibility does not protect a multi-step update',
            bullets: [
                'volatile does not acquire a lock. Another thread can act between separate reads and writes.',
                'volatile int count does not make count++ atomic. Its read, addition, and write remain separate steps.',
                'Use AtomicInteger for an atomic counter update, or synchronized to protect the complete operation.',
                'A volatile reference makes writes to that reference visible. It does not make later changes to the referenced object\'s fields safe.',
                'The publication example protects reads of the prepared value. Later changes to value need their own coordination.',
            ],
        },
    ],
};

export default note;
