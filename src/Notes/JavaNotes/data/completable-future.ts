import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'completable-future',
    title: 'CompletableFuture',
    summary: 'Create asynchronous stages, chain dependent work, combine results, and handle stage failures.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [
        { title: 'Java 17: CompletableFuture', href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/CompletableFuture.html' },
    ],
    sections: [
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
