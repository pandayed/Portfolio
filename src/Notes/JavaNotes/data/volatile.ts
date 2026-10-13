import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'volatile',
    title: 'Volatile',
    summary: 'Declare a volatile field, share a flag between threads, and distinguish visibility from atomic updates.',
    scope: 'java',
    pointwise: true,
    exampleLayout: 'grouped',
    updatedOn: '2026-10-13',
    references: [
        { title: 'GeeksforGeeks: volatile keyword in Java', href: 'https://www.geeksforgeeks.org/java/volatile-keyword-in-java/' },
        { title: 'Java Language Specification 17: threads and locks', href: 'https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html' },
    ],
    sections: [
        {
            id: 'volatile',
            title: 'What volatile means',
            bullets: [
                'volatile is a Java keyword used on a field accessed by different threads.',
                'When one thread changes a volatile field, later reads of that field by other threads see the change.',
                'Without volatile or a common lock, Java does not guarantee that another thread will see a field\'s changed value.',
                'Write volatile before the field type: volatile boolean fieldName;',
                'volatile applies to instance and static fields. It cannot be used on a local variable.',
            ],
            examples: [{
                title: 'Tell a worker that work is ready',
                description: [
                    'A flag is a boolean field that records a condition, such as whether work is ready.',
                    'One thread can change a volatile flag while another thread checks it.',
                ],
                language: 'java',
                code: `class ReadyTask implements Runnable {
    volatile boolean ready = false;

    @Override
    public void run() {
        while (!ready) {
            // Check again until the flag changes.
        }
        System.out.println("Ready");
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        ReadyTask task = new ReadyTask();
        Thread worker = new Thread(task);
        worker.start();
        task.ready = true;
        worker.join();
    }
}`,
                result: 'Ready',
                explanation: [
                    'main and the worker use the same ReadyTask object. ready starts as false.',
                    'The worker checks ready in its loop. main sets ready to true after starting the worker.',
                    'Because ready is volatile, a subsequent read observes the true value. The worker leaves the loop and prints Ready.',
                    'The worker may see true on its first check. The program does not require it to enter the loop first.',
                    'join() waits for the worker to finish. It does not make the flag visible to the worker.',
                    'The loop repeatedly checks the field and uses CPU time while waiting. volatile does not pause a thread or decide when it runs.',
                ],
            }],
        },
        {
            id: 'volatile-use-cases',
            title: 'When to use volatile',
            bullets: [
                'Use volatile for a ready flag, a stop request, or a status value shared between threads.',
                'A single writer with other threads reading is a common use.',
                'Use it when each update replaces one value without depending on a previous read.',
                'Choose a lock or an atomic operation when a read and its update must stay together.',
            ],
        },
        {
            id: 'volatile-limits',
            title: 'volatile does not make an increment atomic',
            bullets: [
                'An atomic operation takes effect as one indivisible step from other threads\' point of view.',
                'An increment reads a value, adds one, and writes the result. These are separate steps.',
                'volatile makes the reads and writes visible. It does not combine them into one atomic increment.',
            ],
            examples: [{
                title: 'Two visible writes can still lose an increment',
                language: 'java',
                code: `class Counter {
    volatile int count = 0;
}

class IncrementTask implements Runnable {
    private final Counter counter;

    IncrementTask(Counter counter) {
        this.counter = counter;
    }

    @Override
    public void run() {
        counter.count++;
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();
        Thread first = new Thread(new IncrementTask(counter));
        Thread second = new Thread(new IncrementTask(counter));
        first.start();
        second.start();
        first.join();
        second.join();
        System.out.println(counter.count);
    }
}`,
                result: '1',
                possibleOutput: true,
                explanation: [
                    'Both tasks share one Counter. Each task executes count++ exactly once.',
                    'Both threads can read 0 before either writes. Each then adds one and writes 1. That order produces the shown output.',
                    'If one increment finishes before the other reads, the output is 2. Both 1 and 2 are valid results.',
                    'main joins both workers before printing, so the output reflects their completed writes.',
                    'volatile protects visibility of count. It does not prevent another thread from acting between the read and write in count++.',
                    'Use AtomicInteger.incrementAndGet(), or protect the complete increment with one common synchronized lock, to keep both increments.',
                ],
            }],
        },
        {
            id: 'volatile-and-synchronized',
            title: 'volatile and synchronized',
            bullets: [
                'volatile does not acquire a lock.',
                'synchronized protects a method or block using an object lock.',
                'All threads must use the same lock to protect the same shared operation.',
            ],
            table: {
                columns: ['Rule', 'volatile', 'synchronized'],
                rows: [
                    ['Visibility', 'Writes are visible to subsequent reads of the same field.', 'Writes before releasing a lock are visible after another thread acquires that same lock.'],
                    ['Access', 'Does not stop other threads from accessing the field.', 'Only one thread holds the chosen lock at a time.'],
                    ['Multi-step update', 'Does not protect a read followed by an update.', 'Protects the whole operation when every participating access uses the same lock.'],
                    ['Use', 'Shared flags and independent value replacements.', 'Checks and updates that must stay together.'],
                ],
            },
        },
        {
            id: 'volatile-publication',
            title: 'Visibility of other prepared data',
            bullets: [
                'A writer can prepare other data before setting a volatile flag.',
                'After a reader observes that flag update, it can also observe the earlier data writes.',
                'Later changes to that data need their own coordination.',
                'A volatile reference does not make later changes to its object\'s fields safe.',
            ],
        },
    ],
};

export default note;
