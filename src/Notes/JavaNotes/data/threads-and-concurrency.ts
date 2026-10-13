import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'threads-and-concurrency',
    title: 'Executors, Future, and CompletableFuture',
    summary: 'Submit tasks, read results and failures, request cancellation, and chain or combine asynchronous work.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [
        { title: 'Java 17: ExecutorService', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/ExecutorService.html' },
        { title: 'Java 17: Future', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/Future.html' },
        { title: 'Java 17: CompletableFuture', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/CompletableFuture.html' },
    ],
    sections: [
        {
            id: 'runnable-and-callable',
            title: 'Task contracts: Runnable and Callable',
            bullets: [
                "Runnable defines void run() for a task with no result. A Thread runs this task through start().",
                "Runnable.run() does not declare checked exceptions. Its implementation must catch a checked exception instead of adding it to run()'s declaration.",
                "Callable<T> defines T call() throws Exception. Use it for a task that returns a value or can throw a checked exception.",
                "Neither interface starts work by itself. Calling run() or call() directly runs on the calling thread.",
                "Thread accepts Runnable. It does not accept Callable directly.",
            ],
        },
        {
            id: 'executor-service',
            title: 'Run tasks with ExecutorService',
            bullets: [
                "An executor manages task execution. A thread pool reuses worker threads for tasks.",
                "newFixedThreadPool(2) uses up to two worker threads. Additional tasks wait in its queue.",
                "execute(Runnable) returns void. submit(Runnable or Callable) returns a Future.",
                "A Future represents a submitted task. It lets the caller wait for a result or request cancellation.",
                "submit(Callable<T>) returns Future<T>. Its get() returns the value produced by call().",
                "submit(Runnable) returns Future<?>. Its get() method returns null when the task succeeds.",
                "submit(Runnable, value) returns a Future whose get() returns the supplied value when the task succeeds.",
                "With the standard thread pool, an unchecked exception from execute reaches the worker’s uncaught exception handler.",
                "submit stores a task failure in its Future. Call get() to observe the failure.",
                'A fixed worker count does not limit the queue size. Submitting tasks faster than workers finish them can exhaust memory.',
                'A task can wait for another task queued to the same pool. If all workers are waiting, no worker can run the queued task.',
            ],
        },
        {
            id: 'executor-shutdown',
            title: 'Shut down an executor',
            bullets: [
                "shutdown() rejects new tasks and lets submitted tasks finish. It returns without waiting for them.",
                "After requesting shutdown, use awaitTermination(timeout, unit) to wait for the executor to stop.",
                "shutdownNow() returns tasks that never started. It also attempts to interrupt active tasks.",
                "Active tasks must respond to interruption. shutdownNow() cannot force them to stop.",
                "Shut down an executor you own. Java 17 ExecutorService does not support try-with-resources.",
            ],
            examples: [{
                language: 'java',
                code: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args)
            throws InterruptedException, ExecutionException {
        ExecutorService pool = Executors.newFixedThreadPool(2);
        try {
            Runnable task = () -> {};
            Callable<Integer> calculation = () -> 20 + 22;
            Future<?> completion = pool.submit(task);
            Future<Integer> answer = pool.submit(calculation);
            System.out.println(completion.get());
            System.out.println(answer.get());
        } finally {
            pool.shutdown();
        }
    }
}`,
                result: 'null\n42',
            }],
        },
        {
            id: 'future',
            title: 'Future: completion, timeouts, and cancellation',
            bullets: [
                "get() blocks the calling thread until the result is ready.",
                "ExecutionException reports task failure. Call getCause() to read the original exception.",
                "get() can throw InterruptedException if the waiting thread is interrupted.",
                "get(timeout, unit) limits how long the caller waits. TimeoutException does not cancel the task.",
                "isDone() returns true after success, failure, or cancellation. It does not mean the task succeeded.",
                "isCancelled() reports cancellation.",
                "cancel(true) attempts cancellation. If the task is running, successful cancellation attempts to interrupt it.",
                "cancel(false) does not request interruption of running code.",
                "After successful cancellation, get() throws CancellationException. This does not prove the task’s code has stopped.",
                "Submitting a task and immediately calling get() for each task prevents overlap between those submissions.",
            ],
            examples: [{
                title: 'Observe a task failure',
                language: 'java',
                code: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService pool = Executors.newSingleThreadExecutor();
        try {
            Future<Integer> result = pool.submit(() -> {
                throw new IllegalArgumentException("Invalid count");
            });
            try {
                System.out.println(result.get());
            } catch (ExecutionException failure) {
                System.out.println(failure.getCause().getMessage());
            }
        } finally {
            pool.shutdown();
        }
    }
}`,
                result: 'Invalid count',
            }],
        },
        {
            id: 'completable-future',
            title: 'Start a CompletableFuture',
            bullets: [
                'CompletableFuture represents a result and lets you attach work that runs after completion.',
                'A stage is one step that produces a result or reports a failure.',
                'supplyAsync(Supplier) starts a task that returns a value. A Supplier provides a value when called.',
                'runAsync(Runnable) starts a task without a result.',
                'Overloads with an executor run the task using that executor.',
                'Calls without an executor normally use ForkJoinPool.commonPool(), a shared thread pool.',
                'join() waits for completion and returns the result. Failure is reported as unchecked CompletionException.',
            ],
        },
        {
            id: 'chain-and-combine',
            title: 'Chain dependent steps and combine results',
            bullets: [
                'thenApply changes a successful value and returns the changed value.',
                'thenAccept uses a successful value and returns a stage with no result.',
                'thenRun runs an action without receiving the previous value.',
                'thenCompose connects a dependent operation that returns another stage. It avoids a future containing another future.',
                'thenCombine combines the successful results of two stages.',
            ],
        },
        {
            id: 'stage-failures',
            title: 'Handle stage failure',
            bullets: [
                'A failed stage skips dependent steps that require a successful value.',
                'exceptionally supplies a replacement value after failure.',
                'handle receives the result or failure and can change the outcome.',
                'whenComplete observes completion. It normally keeps the original result or failure.',
                'If a whenComplete action throws, it can make an otherwise successful stage fail.',
                'The example starts price and delivery independently, combines their values, and replaces a failed calculation with a message.',
            ],
            examples: [{
                language: 'java',
                code: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(2);
        try {
            CompletableFuture<Integer> price =
                    CompletableFuture.supplyAsync(() -> 100, pool);
            CompletableFuture<Integer> delivery =
                    CompletableFuture.supplyAsync(() -> 20, pool);

            CompletableFuture<Void> finished = price
                    .thenCombine(delivery, Integer::sum)
                    .thenApply(total -> "Total: " + total)
                    .exceptionally(failure -> "Total unavailable")
                    .thenAccept(System.out::println);
            finished.join();
        } finally {
            pool.shutdown();
        }
    }
}`,
                result: 'Total: 120. If an earlier stage fails, exceptionally supplies Total unavailable instead.',
            }],
        },
        {
            id: 'stage-execution',
            title: 'Callback threads, waiting, and cancellation',
            bullets: [
                'A callback is code that runs when a stage completes.',
                'A method without Async may run its callback on the thread completing the previous stage or on the caller attaching it.',
                'Async methods use the default executor or the executor you supply. thenApplyAsync does not guarantee a new thread.',
                'get() can throw checked InterruptedException and ExecutionException. Both get() and join() can block.',
                'CompletableFuture ignores mayInterruptIfRunning when cancelling. Its cancel(true) does not interrupt the supplier.',
            ],
        },
    ],
};

export default note;
