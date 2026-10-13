import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'thread-communication',
    title: 'Thread communication',
    summary: 'Wait for a shared message, notify waiting threads, and check the condition again after waking.',
    scope: 'java',
    pointwise: true,
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
                'Suppose one thread wants to print a message that another thread has not supplied yet.',
                'A lock protects the message from overlapping access. It does not tell the reader when the message is ready.',
                'Use a shared boolean field, ready, to record whether the message has been supplied.',
                'ready is a condition flag. It records whether the reader can proceed.',
                'The reader must wait while ready is false. The sender sets it to true after storing the message.',
            ],
        },
        {
            id: 'monitor-waits',
            title: 'wait releases the object lock while waiting',
            bullets: [
                'wait and notifyAll are methods inherited from Object. Every Java object has them.',
                'Calling wait on an object suspends the current thread and releases that object\'s monitor lock.',
                'Releasing the lock lets the sender acquire it and store the message.',
                'The waiting thread must acquire the same lock again before wait returns.',
                'The caller must hold the object\'s lock before calling wait, notify, or notifyAll. Otherwise Java throws IllegalMonitorStateException.',
                'wait releases only the lock of the object on which it is called. It does not release other locks held by that thread.',
                'Thread.sleep pauses a thread for time. It keeps the locks held by that thread and does not wait for a message condition.',
            ],
        },
        {
            id: 'notifications',
            title: 'notifyAll tells waiting threads to check again',
            bullets: [
                'After changing ready, the sender calls notifyAll on the same object used for wait.',
                'notifyAll wakes all threads waiting on that object. notify wakes one of them, chosen by Java.',
                'A notification does not release the sender\'s lock. The sender must leave the synchronized code before another thread can acquire it.',
                'Waking does not guarantee that the condition is true. Check it again with while, not only if.',
                'Java permits a waiting thread to wake without a notification. This is called a spurious wakeup.',
                'Another thread can also change the condition before the awakened thread acquires the lock.',
            ],
        },
        {
            id: 'one-message',
            title: 'Send and receive one message',
            bullets: [
                'MessageBox stores one message. This example sends once and reads once.',
                'message starts as null. ready starts as false.',
                'receive holds the MessageBox lock while checking ready. It calls wait only while ready is false.',
                'send holds the same lock, stores the text, sets ready, and calls notifyAll.',
                'Both methods are synchronized. wait() and notifyAll() therefore operate on this: the same MessageBox object.',
                'ReadMessage.box stores the shared MessageBox passed to its constructor. run receives the text and prints it.',
                'main starts the reader, sends Hello, and joins the reader.',
                'If the reader arrives first, it waits for send. If send finishes first, ready is already true and the reader does not wait.',
            ],
            examples: [{
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
            }],
        },
        {
            id: 'message-order',
            title: 'What happens when the reader arrives first',
            table: {
                columns: ['Step', 'Reader thread', 'Main thread'],
                rows: [
                    ['1', 'Acquires the MessageBox lock and reads ready == false.', '—'],
                    ['2', 'Calls wait, releases the lock, and waits.', '—'],
                    ['3', 'Waiting.', 'Acquires the lock, stores Hello, and sets ready = true.'],
                    ['4', 'Awakened, but cannot yet acquire the lock.', 'Calls notifyAll while still holding the lock.'],
                    ['5', 'Acquires the released lock and returns from wait.', 'Leaves send and releases the lock.'],
                    ['6', 'Checks ready again, returns the message, and prints Hello.', 'join waits for the reader to finish.'],
                ],
            },
            bullets: [
                'A notification is not saved for a future waiter. The stored ready value lets a later reader see that the message is available.',
            ],
        },
        {
            id: 'interrupted-wait',
            title: 'An interrupted wait throws InterruptedException',
            bullets: [
                'wait can throw InterruptedException when the thread is interrupted.',
                'The thread reacquires the object lock before wait throws. The interrupted status is cleared when this exception is thrown.',
                'receive declares the exception with throws. ReadMessage.run catches it because Runnable.run cannot declare this checked exception.',
                'The catch restores the interrupted status and lets run end. It does not read an unavailable message.',
                'The normal Hello output above assumes no thread interrupts the reader.',
            ],
        },
    ],
};

export default note;
