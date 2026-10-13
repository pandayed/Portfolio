import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'completable-future',
    title: 'CompletableFuture basics',
    summary: 'Start one task, transform its result, attach actions, and understand which thread runs a callback.',
    scope: 'java',
    pointwise: true,
    exampleLayout: 'grouped',
    updatedOn: '2026-10-13',
    references: [{
        title: 'Java 17: CompletableFuture',
        href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/CompletableFuture.html',
    }],
    sections: [
        {
            id: 'completable-future',
            title: 'Start one task and read its result',
            bullets: [
                'A Future lets you wait for a task result. CompletableFuture also lets you attach work to that result.',
                'CompletableFuture<Integer> represents an Integer result that may still be unavailable.',
                'Supplier<T> is an interface with a get() method that returns T. It receives no arguments.',
                'CompletableFuture.supplyAsync(supplier, pool) asks the pool to run supplier.get(). It returns a CompletableFuture for the result.',
                'join() waits for the result and returns it.',
                'If the task fails, join() throws the unchecked CompletionException. get() instead reports failure through checked ExecutionException.',
                'A stage is one step that produces a result or fails.',
            ],
            examples: [{
                title: 'A Supplier returns 100 from a worker',
                language: 'java',
                code: `import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Supplier;

class PriceSupplier implements Supplier<Integer> {
    @Override
    public Integer get() {
        return 100;
    }
}

public class Main {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(1);
        try {
            CompletableFuture<Integer> price =
                    CompletableFuture.supplyAsync(new PriceSupplier(), pool);
            System.out.println(price.join());
        } finally {
            pool.shutdown();
        }
    }
}`,
                description: [
                    'Run a PriceSupplier in a worker pool and read its result.',
                ],
                result: '100',
                explanation: [
                    'A worker calls PriceSupplier.get(), which returns 100.',
                    'price.join() waits for that result. main prints 100.',
                    'The finally block requests shutdown of the pool.',
                ],
            }],
        },
        {
            id: 'chain-and-combine',
            title: 'Transform one successful result with thenApply',
            bullets: [
                'A callback is a function given to an operation so it can call that function later.',
                'thenApply(callback) calls the callback with the previous successful result.',
                'The callback returns a new value. thenApply returns a new CompletableFuture holding that value.',
                'The previous result stays unchanged.',
                'In value -> expression, the lambda receives value and returns the expression. This is the lambda syntax from the Lambdas lesson.',
                'completedFuture(value) creates a CompletableFuture that already contains that value. It does not start a task.',
            ],
            examples: [{
                title: 'Turn a price into a discounted price',
                language: 'java',
                code: `import java.util.concurrent.CompletableFuture;

public class Main {
    public static void main(String[] args) {
        CompletableFuture<Integer> price =
                CompletableFuture.completedFuture(100);
        CompletableFuture<Integer> discounted =
                price.thenApply(value -> value - 10);

        System.out.println(price.join());
        System.out.println(discounted.join());
    }
}`,
                description: [
                    'Keep the original price and create a separate discounted result.',
                ],
                result: '100\n90',
                explanation: [
                    'completedFuture(100) supplies the original price without starting a task.',
                    'thenApply receives 100 and returns 90 after subtracting 10.',
                    'price still contains 100. discounted contains the new result 90.',
                    'The two join() calls read and print those values.',
                ],
            }],
        },
        {
            id: 'result-actions',
            title: 'Use a result without returning another value',
            bullets: [
                'An action performs work without returning a useful value.',
                '() -> expression is a lambda with no arguments. thenRun uses it to supply a Runnable action.',
                'thenAccept and thenRun return CompletableFuture<Void>. Void indicates that there is no useful result value.',
                'Calling join() on either returned future waits for the action and returns null.',
                'runAsync(Runnable, pool) starts a new action in the pool without waiting for a previous result.',
            ],
            table: {
                columns: ['Operation', 'Callback input', 'Callback result'],
                rows: [
                    ['thenApply', 'Previous successful value.', 'A new value.'],
                    ['thenAccept', 'Previous successful value.', 'No value.'],
                    ['thenRun', 'No input. Runs after previous success.', 'No value.'],
                ],
            },
            examples: [{
                title: 'Print a result, then print a completion message',
                language: 'java',
                code: `import java.util.concurrent.CompletableFuture;

public class Main {
    public static void main(String[] args) {
        CompletableFuture<Integer> price =
                CompletableFuture.completedFuture(100);
        CompletableFuture<Void> printed =
                price.thenAccept(value -> System.out.println(value));
        CompletableFuture<Void> finished =
                printed.thenRun(() -> System.out.println("Done"));
        finished.join();
    }
}`,
                description: [
                    'Print a price, then print a completion message after that action succeeds.',
                ],
                result: '100\nDone',
                explanation: [
                    'thenAccept receives the price 100 and prints it.',
                    'thenRun receives no argument. It prints Done after the first action succeeds.',
                    'finished.join() waits for both actions to finish.',
                ],
            }],
        },
        {
            id: 'stage-execution',
            title: 'Which thread runs a callback',
            bullets: [
                'A method without Async, such as thenApply, may run its callback on the thread completing the previous stage.',
                'If the previous stage is already complete, the caller attaching the callback may run it.',
                'thenApplyAsync(callback, pool) schedules the callback through the supplied pool.',
                'Async does not mean a new thread is created. A pool can reuse an existing worker.',
                'Without an explicit executor, supplyAsync and Async callbacks normally use ForkJoinPool.commonPool(), a shared worker pool.',
                'Both get() and join() can wait. get() declares InterruptedException and ExecutionException; join() reports task failure with unchecked CompletionException.',
                'Cancelling a CompletableFuture makes result-reading methods report cancellation. Its cancel(true) does not interrupt the Supplier task.',
            ],
        },
    ],
};

export default note;
