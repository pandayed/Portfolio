import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'multithreading',
    title: 'Thread basics',
    summary: 'Start with the main thread, define a task with Runnable, and run that task on a new thread.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [
        { title: 'Oracle tutorial: defining and starting a thread', href: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/runthread.html' },
        { title: 'Java 17 Thread API', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Thread.html' },
    ],
    sections: [
        {
            id: 'thread-basics',
            title: 'The main thread',
            bullets: [
                'A process is a running program. A Java process can contain several threads.',
                'A thread executes the statements in a method. It follows those statements in their execution order.',
                'The thread executing main is called the main thread in these examples.',
                'Thread is a Java class. Thread.currentThread() returns the Thread object for the thread executing that line.',
                'getName() returns the name stored in that Thread object.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        Thread current = Thread.currentThread();
        System.out.println(current.getName());
    }
}`,
                result: 'main when launched with java Main. This program has not created another thread.',
            }],
        },
        {
            id: 'runnable-task',
            title: 'Define the task with Runnable',
            bullets: [
                'A task is the code you want a thread to execute.',
                'Runnable is a Java interface. It requires a public void run() method.',
                'A class that implements Runnable supplies that run() method.',
                '@Override asks the compiler to check that run() matches the method required by the interface.',
                'Put the task statements inside run(). The method returns no value.',
                'new PrintTask() creates the task object. Creating it does not execute run() or create a thread.',
                'Calling task.run() directly executes the method on the calling thread.',
            ],
            examples: [{
                language: 'java',
                code: `class PrintTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Task body");
        System.out.println(Thread.currentThread().getName());
    }
}

public class Main {
    public static void main(String[] args) {
        PrintTask task = new PrintTask();
        task.run();
    }
}`,
                result: 'Task body\nmain',
            }],
        },
        {
            id: 'create-a-thread',
            title: 'Run the task on a new thread',
            bullets: [
                'new Thread(task, "worker") creates a Thread object with a task and a name.',
                'worker.start() starts a new thread. Java calls the task’s run() method on that thread.',
                'The main thread continues after start(). start() does not wait for the task to finish.',
                'The task object holds the code. The Thread object manages the thread that executes that code.',
                'A Thread object can be started only once. Calling start() again throws IllegalThreadStateException, even if its task has finished.',
            ],
            examples: [{
                language: 'java',
                code: `class PrintTask implements Runnable {
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName());
    }
}

public class Main {
    public static void main(String[] args) {
        PrintTask task = new PrintTask();
        Thread worker = new Thread(task, "worker");
        worker.start();
    }
}`,
                result: 'worker. The run() method is now executing on the thread named worker.',
            }],
        },
        {
            id: 'start-and-run',
            title: 'start() and run() do different things',
            bullets: [
                'worker.run() is a normal method call. For the Thread created below, it calls the task on the main thread.',
                'worker.start() creates the new thread that calls the task.',
                'Calling run() first does not start the Thread object. The later start() is still its first start.',
            ],
            examples: [{
                language: 'java',
                code: `class PrintTask implements Runnable {
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName());
    }
}

public class Main {
    public static void main(String[] args) {
        Thread worker = new Thread(new PrintTask(), "worker");
        worker.run();
        worker.start();
    }
}`,
                result: 'main\nworker',
            }],
        },
        {
            id: 'thread-output-order',
            title: 'Starting threads does not fix their output order',
            bullets: [
                'Each thread follows its own method statements in order.',
                'Scheduling is choosing when a ready thread gets to execute. Java and the operating system make that choice.',
                'Starting first before second does not guarantee that first prints before second.',
                'The example can print A then B, or B then A. Both results are valid.',
                'Waiting for a thread to finish is a separate operation. The next lesson introduces join().',
            ],
            examples: [{
                language: 'java',
                code: `class PrintTask implements Runnable {
    private final String message;

    PrintTask(String message) {
        this.message = message;
    }

    @Override
    public void run() {
        System.out.println(message);
    }
}

public class Main {
    public static void main(String[] args) {
        Thread first = new Thread(new PrintTask("A"));
        Thread second = new Thread(new PrintTask("B"));
        first.start();
        second.start();
    }
}`,
                result: 'One line contains A and one contains B. Their order is not fixed.',
            }],
        },
        {
            id: 'extend-thread',
            title: 'Another way: extend Thread',
            bullets: [
                'A class can also extend Thread and override run().',
                'Call start() on its object to execute the overridden method on a new thread.',
                'A Java class can extend only one class. A class extending Thread cannot also extend another class.',
                'The earlier Runnable approach keeps the task in a separate object. That task can also be passed to an executor in a later lesson.',
            ],
            examples: [{
                language: 'java',
                code: `class PrintThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread task");
    }
}

public class Main {
    public static void main(String[] args) {
        PrintThread worker = new PrintThread();
        worker.start();
    }
}`,
                result: 'Thread task',
            }],
        },
    ],
};

export default note;
