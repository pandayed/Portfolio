import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'multithreading',
    title: 'Thread basics',
    summary: 'Start with the main thread, define a task with Runnable, and run that task on a new thread.',
    scope: 'java',
    pointwise: true,
    exampleLayout: 'grouped',
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
                'The thread executing main is called the main thread.',
                'Thread is a Java class. Thread.currentThread() returns the Thread object for the thread executing that line.',
                'getName() returns the name stored in that Thread object.',
            ],
            examples: [{
                title: 'Read the main thread’s name',
                description: [
                    'Run this program with java Main to read the thread executing main.',
                ],
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        Thread current = Thread.currentThread();
        System.out.println(current.getName());
    }
}`,
                result: 'main',
                explanation: [
                    'Thread.currentThread() returns the thread executing this statement.',
                    'getName() returns main for this launch. The program creates no other thread.',
                ],
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
                'Creating a Runnable object does not execute run() or create a thread.',
                'Calling run() directly executes the method on the calling thread.',
            ],
            examples: [{
                title: 'Call a Runnable task directly',
                description: [
                    'Define a task that prints a message and its executing thread’s name.',
                ],
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
                explanation: [
                    'new PrintTask() creates the task object. It does not execute run() or create a thread.',
                    'task.run() is a direct method call, so both lines print on the main thread.',
                ],
            }],
        },
        {
            id: 'create-a-thread',
            title: 'Run the task on a new thread',
            bullets: [
                'A Thread object can hold a Runnable task and a name.',
                'Calling start() starts a new thread. Java calls the task’s run() method on that thread.',
                'The calling thread continues after start(). start() does not wait for the task to finish.',
                'The task object holds the code. The Thread object manages the thread that executes that code.',
                'A Thread object can be started only once. Calling start() again throws IllegalThreadStateException, even if its task has finished.',
            ],
            examples: [{
                title: 'Execute a task on a worker thread',
                description: [
                    'Create a thread named worker and give it a PrintTask.',
                ],
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
                result: 'worker',
                explanation: [
                    'The task object holds the code. The Thread object manages the thread that executes it.',
                    'worker.start() starts a new thread that calls the task’s run() method.',
                    'The task reads its executing thread’s name and prints worker.',
                ],
            }],
        },
        {
            id: 'start-and-run',
            title: 'start() and run() do different things',
            bullets: [
                'Calling run() is a normal method call on the calling thread.',
                'Calling start() creates the new thread that calls the task.',
                'Calling run() first does not start the Thread object.',
            ],
            examples: [{
                title: 'Compare calling run() with calling start()',
                description: [
                    'Call run() directly, then start the same Thread object.',
                ],
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
                explanation: [
                    'worker.run() calls the task on the main thread and prints main.',
                    'Calling run() does not start the Thread object. The later start() is its first start.',
                    'worker.start() runs the task on the new worker thread and prints worker.',
                ],
            }],
        },
        {
            id: 'thread-output-order',
            title: 'Starting threads does not fix their output order',
            bullets: [
                'Each thread follows its own method statements in order.',
                'Scheduling is choosing when a ready thread gets to execute. Java and the operating system make that choice.',
                'Starting one thread before another does not guarantee their print order.',
                'Waiting for a thread to finish is a separate operation. The next lesson introduces join().',
            ],
            examples: [{
                title: 'Start two tasks without fixing their print order',
                description: [
                    'Start one task that prints A and another that prints B.',
                ],
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
                result: 'A\nB',
                possibleOutput: true,
                explanation: [
                    'main starts first before second, but that does not guarantee that first prints first.',
                    'A then B and B then A are both valid outputs. Each task prints exactly one line.',
                ],
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
                title: 'Start a Thread subclass',
                description: [
                    'Override run() in a class that extends Thread.',
                ],
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
                explanation: [
                    'new PrintThread() creates the Thread object.',
                    'start() starts a new thread that executes the overridden run() method and prints the message.',
                ],
            }],
        },
    ],
};

export default note;
