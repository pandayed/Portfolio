import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'future-failures',
    title: 'CompletableFuture failures',
    summary: 'Replace a failed result, choose an outcome with handle, and observe completion with whenComplete.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [{
        title: 'Java 17: CompletableFuture',
        href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/CompletableFuture.html',
    }],
    sections: [
        {
            id: 'stage-failures',
            title: 'Replace a failed result with exceptionally',
            bullets: [
                'If a task or callback throws, its future completes with a failure.',
                'thenApply, thenCompose, thenCombine, thenAccept, and thenRun require successful inputs. They do not run their callbacks for failed inputs.',
                'exceptionally calls its callback when the previous stage fails. The callback returns a replacement result.',
                'If the previous stage succeeds, exceptionally keeps that successful result.',
                'The lambda block below throws instead of returning a price. The replacement callback returns 0.',
            ],
            examples: [{
                title: 'Use 0 when the price task fails',
                language: 'java',
                code: `import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(1);
        try {
            CompletableFuture<Integer> price =
                    CompletableFuture.supplyAsync(() -> {
                        throw new IllegalArgumentException("Price unavailable");
                    }, pool);
            CompletableFuture<Integer> recovered =
                    price.exceptionally(failure -> 0);

            System.out.println(recovered.join());
        } finally {
            pool.shutdown();
        }
    }
}`,
                result: '0. The replacement result is read from recovered, not from the failed price future.',
            }],
        },
        {
            id: 'observe-completion',
            title: 'Handle or observe either outcome',
            bullets: [
                'A completion callback can receive both a result and a failure.',
                'On success, failure is null. On failure, the result is unavailable and failure describes what went wrong.',
                'handle returns a new result for either outcome.',
                'whenComplete performs an action and normally keeps the previous result or failure.',
                'If a whenComplete action throws after a successful result, its returned future fails. If the previous stage already failed, that previous failure remains the main failure.',
            ],
            table: {
                columns: ['Operation', 'Use'],
                rows: [
                    ['exceptionally(failure -> replacement)', 'Replace a failed result.'],
                    ['handle((value, failure) -> newValue)', 'Choose a new result on success or failure.'],
                    ['whenComplete((value, failure) -> action)', 'Observe success or failure without normally replacing it.'],
                ],
            },
            examples: [{
                title: 'Choose text for either outcome',
                language: 'java',
                code: `import java.util.concurrent.CompletableFuture;

public class Main {
    public static void main(String[] args) {
        CompletableFuture<Integer> price =
                CompletableFuture.completedFuture(100);
        CompletableFuture<String> message = price.handle((value, failure) -> {
            if (failure != null) {
                return "Price unavailable";
            }
            return "Price: " + value;
        });
        System.out.println(message.join());
    }
}`,
                result: 'Price: 100. For a failed price stage, the same callback returns Price unavailable.',
            }],
        },
    ],
};

export default note;
