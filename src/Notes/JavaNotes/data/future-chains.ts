import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'future-chains',
    title: 'Chaining CompletableFuture tasks',
    summary: 'Connect a dependent task with thenCompose and combine two independent task results with thenCombine.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    references: [{
        title: 'Java 17: CompletableFuture',
        href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/CompletableFuture.html',
    }],
    sections: [
        {
            id: 'then-compose',
            title: 'Connect a task that returns another future',
            bullets: [
                'Sometimes the next operation returns a CompletableFuture instead of a plain value.',
                'thenCompose passes the previous result to that operation and follows the future it returns.',
                'The final future gives the returned operation\'s result directly.',
                'Using thenApply for the same operation would give CompletableFuture<CompletableFuture<String>>. The caller would have a future containing another future.',
                'loadGreeting below receives a user ID and returns a future containing a greeting. It uses an already completed future to keep this example focused on the connection.',
            ],
            examples: [{
                title: 'Use a user ID to obtain the next result',
                language: 'java',
                code: `import java.util.concurrent.CompletableFuture;

public class Main {
    static CompletableFuture<String> loadGreeting(int userId) {
        return CompletableFuture.completedFuture("Hello user " + userId);
    }

    public static void main(String[] args) {
        CompletableFuture<Integer> userId =
                CompletableFuture.completedFuture(7);
        CompletableFuture<String> greeting =
                userId.thenCompose(id -> loadGreeting(id));

        System.out.println(greeting.join());
    }
}`,
                result: 'Hello user 7. One join() reads the String returned through loadGreeting\'s future.',
            }],
        },
        {
            id: 'then-combine',
            title: 'Combine two task results',
            bullets: [
                'thenCombine(otherFuture, callback) registers a combination and returns a new future. It does not wait on the calling thread.',
                'After both input futures complete successfully, the callback combines their results. join() waits for that combined result.',
                'The callback receives their two results and returns one combined value.',
                'The example starts price and delivery tasks before combining them. Neither task needs the other task\'s result.',
                'The lambda (left, right) -> expression receives two arguments and returns the expression.',
                '() -> expression is a Supplier lambda with no arguments. It returns the expression when get() runs.',
            ],
            examples: [{
                title: 'Add price and delivery',
                language: 'java',
                code: `import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(2);
        try {
            CompletableFuture<Integer> price =
                    CompletableFuture.supplyAsync(() -> 100, pool);
            CompletableFuture<Integer> delivery =
                    CompletableFuture.supplyAsync(() -> 20, pool);
            CompletableFuture<Integer> total = price.thenCombine(
                    delivery, (priceValue, deliveryValue) -> priceValue + deliveryValue);

            System.out.println(total.join());
        } finally {
            pool.shutdown();
        }
    }
}`,
                result: '120. () -> 100 and () -> 20 are Supplier lambdas with no arguments. The combined result becomes available after both tasks succeed.',
            }],
        },
    ],
};

export default note;
