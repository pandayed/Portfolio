import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'thread-communication',
    title: 'Thread communication',
    summary: 'Wait for a shared message, notify waiting threads, and check the condition again after waking.',
    scope: 'java',
    pointwise: true,
    exampleLayout: 'grouped',
    updatedOn: '2026-10-13',
    references: [
        { title: 'Java guarded blocks', href: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/guardmeth.html' },
        { title: 'Java 17 Object: wait, notify, and notifyAll', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html' },
    ],
    sections: [
        {
            id: 'waiting-for-data',
            title: 'Wait until another thread supplies a message',
            bullets: [
                'A thread may need to wait until shared data is ready.',
                'A lock protects shared data from overlapping access. It does not tell a waiting thread when the data is ready.',
                'A condition flag records whether the waiting thread can proceed.',
                'The waiting thread checks the condition. The thread preparing the data changes that condition when the data is ready.',
            ],
        },
        {
            id: 'monitor-waits',
            title: 'wait releases the object lock while waiting',
            bullets: [
                'wait and notifyAll are methods inherited from Object. Every Java object has them.',
                'Calling wait on an object suspends the current thread and releases that object\'s monitor lock.',
                'Releasing the lock lets another thread acquire it and change the shared data.',
                'The waiting thread must acquire the same lock again before wait returns.',
                'The caller must hold the object\'s lock before calling wait, notify, or notifyAll. Otherwise Java throws IllegalMonitorStateException.',
                'wait releases only the lock of the object on which it is called. It does not release other locks held by that thread.',
                'Thread.sleep pauses a thread for time. It keeps the locks held by that thread and does not wait for a data condition.',
            ],
        },
        {
            id: 'notifications',
            title: 'notifyAll tells waiting threads to check again',
            bullets: [
                'After changing the condition, notifyAll can tell threads waiting on the same object to check again.',
                'notifyAll wakes all threads waiting on that object. notify wakes one of them, chosen by Java.',
                'A notification does not release the notifying thread\'s lock. It must leave the synchronized code before another thread can acquire it.',
                'Waking does not guarantee that the condition is true. Check it again with while, not only if.',
                'Java permits a waiting thread to wake without a notification. This is called a spurious wakeup.',
                'Another thread can also change the condition before the awakened thread acquires the lock.',
                'A notification is not saved for a future waiter. The stored condition lets a later thread check whether it can proceed.',
            ],
            examples: [{
                title: 'Send one message to a waiting reader',
                description: [
                    'Share one MessageBox between main and a reader thread. Send Hello once and read it once.',
                    'The normal output assumes no thread interrupts the reader.',
                ],
                language: 'java',
                code: `class MessageBox {
    private String message;
    private boolean ready = false;

    synchronized String receive() throws InterruptedException {
        while (!ready) {
            wait();
        }
        return message;
    }

    synchronized void send(String text) {
        message = text;
        ready = true;
        notifyAll();
    }
}

class ReadMessage implements Runnable {
    private final MessageBox box;

    ReadMessage(MessageBox box) {
        this.box = box;
    }

    @Override
    public void run() {
        try {
            String text = box.receive();
            System.out.println(text);
        } catch (InterruptedException failure) {
            Thread.currentThread().interrupt();
        }
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        MessageBox box = new MessageBox();
        Thread reader = new Thread(new ReadMessage(box));
        reader.start();
        box.send("Hello");
        reader.join();
    }
}`,
                result: 'Hello',
                explanation: [
                    'message starts as null. ready starts as false.',
                    'receive() holds the MessageBox lock while checking ready. It calls wait() only while ready is false.',
                    'If the reader arrives first, wait() releases the lock so main can enter send().',
                    'send() stores Hello, sets ready to true, and calls notifyAll() while still holding the lock.',
                    'The reader acquires the lock again after send() releases it. It checks ready again, returns the message, and prints Hello.',
                    'If send() finishes first, ready is already true and the reader does not wait.',
                    'Both methods use the same MessageBox lock. Their wait() and notifyAll() calls operate on this object.',
                    'ReadMessage.box stores that shared object. main joins the reader after sending.',
                    'receive() declares InterruptedException. ReadMessage.run() catches it because Runnable.run() cannot declare this checked exception.',
                    'The catch restores interrupted status and lets run() end without reading an unavailable message.',
                ],
            }],
        },
        {
            id: 'interrupted-wait',
            title: 'An interrupted wait throws InterruptedException',
            bullets: [
                'wait can throw InterruptedException when the thread is interrupted.',
                'The thread reacquires the object lock before wait throws. The interrupted status is cleared when this exception is thrown.',
            ],
        },
    ],
};

export default note;
