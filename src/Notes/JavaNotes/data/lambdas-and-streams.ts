import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'lambdas-and-streams',
    title: 'Lambdas and streams',
    summary: 'Pass behavior with lambdas and method references. Build stream pipelines that filter, transform, reduce, and group data without hidden mutations.',
    scope: 'java',
    updatedOn: '2026-10-05',
    sections: [
        {
            id: 'functional-interfaces',
            title: 'A lambda implements a functional interface',
            paragraphs: [
                'A functional interface has one abstract method, after the language accounts for inherited methods and public Object methods. Default and static methods do not add abstract operations. A lambda supplies the implementation of that operation.',
                'The target interface gives the parameter and return types. Use @FunctionalInterface on your own interface to have the compiler check its shape.',
            ],
            bullets: [
                'Predicate<T>: accepts T and returns boolean. Use for a condition.',
                'Function<T, R>: accepts T and returns R. Use for a transformation.',
                'Consumer<T>: accepts T and returns nothing. Use for an action.',
                'Supplier<T>: accepts no arguments and returns T. Use to produce a value.',
            ],
            examples: [{
                title: 'Main.java: pass a pricing calculation',
                language: 'java',
                code: `import java.util.function.Function;
import java.util.function.Predicate;

public class Main {
    @FunctionalInterface
    interface PriceRule {
        int apply(int price);
    }

    public static void main(String[] args) {
        PriceRule discount = price -> price - 10;
        Predicate<Integer> affordable = price -> price <= 100;
        Function<String, Integer> length = name -> name.length();
        System.out.println(discount.apply(90));
        System.out.println(affordable.test(80));
        System.out.println(length.apply("Java"));
    }
}`,
                result: 'Prints 80, true, and 4 on separate lines.',
            }],
            pitfalls: [
                'Local variables captured by a lambda must be final or effectively final. Effectively final means you never reassign the variable after initializing it.',
                'A final reference can still refer to a mutable object. Capturing a list does not make the list thread-safe.',
            ],
        },
        {
            id: 'method-references',
            title: 'Method references name existing behavior',
            paragraphs: [
                'A method reference can replace a lambda that only calls a matching method. String::length means call length on the String supplied to the function. Integer::parseInt refers to a static method.',
                'object::method calls a method on a particular object. Type::new refers to a constructor. The target functional interface determines which overload fits.',
            ],
            examples: [{
                title: 'Main.java: refer to methods and a constructor',
                language: 'java',
                code: `import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

public class Main {
    public static void main(String[] args) {
        Function<String, Integer> length = String::length;
        Function<String, Integer> parse = Integer::parseInt;
        Consumer<String> print = System.out::println;
        Supplier<List<String>> makeList = ArrayList::new;

        print.accept("Length: " + length.apply("Java"));
        print.accept("Number: " + parse.apply("42"));
        List<String> names = makeList.get();
        names.add("Asha");
        print.accept(names.toString());
    }
}`,
                result: 'Prints Length: 4, Number: 42, and [Asha] on separate lines.',
            }],
            pitfalls: [
                'A method reference still follows ordinary method behavior. Integer.parseInt throws NumberFormatException for invalid numeric text.',
                'Prefer a lambda when the operation needs extra arguments, validation, or several steps. Shorter syntax is not a reason to hide the operation.',
            ],
        },
        {
            id: 'stream-pipelines',
            title: 'Filter and map build a lazy pipeline',
            paragraphs: [
                'A stream describes processing over a source. It does not store another collection. Intermediate operations such as filter and map describe steps. A terminal operation such as toList, count, or forEach starts processing.',
                'filter keeps values matching a predicate. map transforms each remaining value. Here the original list is unchanged and the result keeps its encounter order.',
            ],
            examples: [{
                title: 'Main.java: calculate discounted qualifying prices',
                language: 'java',
                code: `import java.util.List;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        List<Integer> prices = List.of(40, 120, 200);
        Stream<Integer> discounted = prices.stream()
            .filter(price -> price >= 100)
            .map(price -> price - 10);

        System.out.println("Pipeline created");
        List<Integer> result = discounted.toList();
        System.out.println(result);
        System.out.println(prices);
    }
}`,
                result: 'Prints Pipeline created, [110, 190], and [40, 120, 200] on separate lines. No elements are processed by this pipeline until toList starts.',
            }],
            pitfalls: [
                'Use a stream only once. After a terminal operation, create a new stream from the source for another calculation. Reusing it may throw IllegalStateException.',
                'Do not depend on side effects in map, filter, or peek. The implementation may skip stages that do not affect the terminal result.',
            ],
        },
        {
            id: 'reduce-and-collect',
            title: 'Reduce to one value or collect into a container',
            paragraphs: [
                'reduce combines elements into one result. An identity is the starting value and must be neutral for the operation. For integer addition, use 0. The combining operation must be associative, so regrouping inputs does not change the result.',
                'collect builds a result such as a list or grouped map. groupingBy chooses a key for each element. A downstream collector such as counting determines what each group contains.',
            ],
            examples: [{
                title: 'Main.java: a total and counts by word length',
                language: 'java',
                code: `import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        int total = List.of(2, 3, 5).stream()
            .reduce(0, Integer::sum);
        System.out.println(total);

        Map<Integer, Long> counts = List.of("java", "go", "sql", "ruby")
            .stream()
            .collect(Collectors.groupingBy(
                String::length,
                TreeMap::new,
                Collectors.counting()
            ));
        System.out.println(counts);
    }
}`,
                result: 'Prints 10, then {2=1, 3=1, 4=2}. TreeMap sorts the group keys. counting returns Long values.',
            }],
            pitfalls: [
                'Subtraction is not associative. Do not use it as a reduce accumulator when regrouping could change the answer.',
                'Collectors.groupingBy without a map supplier does not promise a specific map type or key order.',
                'Collectors.toMap needs a merge function if distinct inputs can produce the same key. Otherwise duplicate keys cause IllegalStateException.',
            ],
        },
        {
            id: 'results-and-side-effects',
            title: 'Choose the result mutability explicitly',
            paragraphs: [
                'Stream.toList is available since Java 16 and returns an unmodifiable list. When later edits are required, use Collectors.toCollection(ArrayList::new). Collectors.toList does not guarantee a particular implementation or mutability.',
                'Keep pipeline functions independent of shared changing state. Use collectors instead of appending to an external list inside forEach. Parallel execution adds ordering and coordination concerns and is not automatically faster.',
            ],
            examples: [{
                title: 'Main.java: request a mutable list and flatten nested lists',
                language: 'java',
                code: `import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<List<String>> groups = List.of(
            List.of("java", "sql"),
            List.of("go")
        );
        List<String> languages = groups.stream()
            .flatMap(List::stream)
            .collect(Collectors.toCollection(ArrayList::new));
        languages.add("python");
        System.out.println(languages);

        List<String> selected = languages.stream()
            .filter(name -> name.length() <= 3)
            .toList();
        System.out.println(selected);
        // selected.add("c"); // Throws UnsupportedOperationException.
    }
}`,
                result: 'Prints [java, sql, go, python], then [sql, go]. flatMap turns each inner list stream into elements of one stream.',
            }],
            pitfalls: [
                'Do not mutate the source collection during its stream traversal.',
                'Streams from collections usually need no closing. Close resource-backed streams such as Files.lines with try-with-resources.',
                'An unmodifiable result list does not make its element objects immutable.',
            ],
        },
    ],
};

export default note;
