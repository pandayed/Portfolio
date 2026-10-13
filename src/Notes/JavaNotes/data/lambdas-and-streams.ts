import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'lambdas-and-streams',
    title: 'Lambdas and streams',
    summary: 'Use lambdas and method references. Filter, transform, combine, and group data with streams.',
    scope: 'java',
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'functional-interfaces',
            title: 'A lambda implements a functional interface',
            bullets: [
                'A functional interface has one abstract method. An abstract method has no implementation.',
                'Java counts inherited methods when checking the interface. It does not count methods that match public methods on Object.',
                'Default and static methods do not count as abstract methods.',
                'A lambda supplies the implementation of the abstract method.',
                'The target interface gives the lambda its parameter and return types.',
                'Add @FunctionalInterface to your interface so the compiler checks that it is a functional interface.',
                'Predicate<T>: accepts T and returns boolean. Use for a condition.',
                'Function<T, R>: accepts T and returns R. Use for a transformation.',
                'Consumer<T>: accepts T and returns nothing. Use for an action.',
                'Supplier<T>: accepts no arguments and returns T. Use to produce a value.',
            ],
            examples: [{
                title: 'Pass a pricing calculation',
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
                'A lambda captures a local variable when it uses that variable from the surrounding method.',
                'A captured local variable must be final or effectively final.',
                'Effectively final means you never reassign the variable after initializing it.',
                'A final reference can still refer to a mutable object. Mutable means its contents can change.',
                'Capturing a list does not make it thread-safe.',
                'Thread-safe means an object behaves correctly when multiple threads use it at the same time.',
            ],
        },
        {
            id: 'method-references',
            title: 'Method references name existing behavior',
            bullets: [
                'A method reference names an existing method. Use it instead of a lambda that only calls a matching method.',
                'String::length calls length on the String passed to the function.',
                'Integer::parseInt refers to a static method.',
                'object::method calls a method on that object.',
                'Type::new refers to a constructor.',
                'The target functional interface determines which overload fits. Overloads have the same method name but different parameters.',
            ],
            examples: [{
                title: 'Refer to methods and a constructor',
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
                'Use a lambda when the operation needs extra arguments, validation, or several steps.',
            ],
        },
        {
            id: 'stream-pipelines',
            title: 'Filter and map build a lazy pipeline',
            bullets: [
                'A stream processes values from a source. It does not store another collection.',
                'A pipeline is a sequence of stream operations.',
                'Intermediate operations such as filter and map describe the steps. They do not start processing.',
                'A terminal operation such as toList, count, or forEach starts processing.',
                'filter keeps values that match a predicate. A predicate is a condition that returns true or false.',
                'map transforms each remaining value.',
                'This example leaves the original list unchanged.',
                'The result keeps encounter order. Here, that means the order of values in the original list.',
            ],
            examples: [{
                title: 'Calculate discounted qualifying prices',
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
                'Use a stream only once. Reusing it after a terminal operation may throw IllegalStateException.',
                'Create a new stream from the source for another calculation.',
                'A side effect changes something outside the operation, such as an external list.',
                'Do not depend on side effects in map, filter, or peek.',
                'The stream implementation may skip operations that do not affect the terminal result.',
            ],
        },
        {
            id: 'reduce-and-collect',
            title: 'Reduce to one value or collect into a container',
            bullets: [
                'reduce combines elements into one result.',
                'An identity is the starting value. Applying the operation to the identity and a value must leave that value unchanged.',
                'Use 0 as the identity for integer addition.',
                'The combining operation must be associative. Grouping the inputs differently must not change the result.',
                'collect builds a result such as a list or a map.',
                'groupingBy chooses a key for each element and groups elements with the same key.',
                'A downstream collector processes each group. For example, counting counts the elements in each group.',
            ],
            examples: [{
                title: 'A total and counts by word length',
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
                'Subtraction is not associative. Changing the grouping can change the answer.',
                'Do not use subtraction to combine values in reduce.',
                'Collectors.groupingBy without a map supplier does not promise a specific map type or key order.',
                'Collectors.toMap needs a merge function when different inputs can produce the same key.',
                'The merge function chooses which value to keep or how to combine the values.',
                'Without a merge function, duplicate keys cause IllegalStateException.',
            ],
        },
        {
            id: 'results-and-side-effects',
            title: 'Choose the result mutability explicitly',
            bullets: [
                'Stream.toList is available since Java 16. It returns an unmodifiable list, so you cannot add, remove, or replace its elements.',
                'Use Collectors.toCollection(ArrayList::new) when you need to change the result list.',
                'Collectors.toList does not guarantee a particular list implementation or whether you can change the list.',
                'Keep pipeline functions independent of shared values that can change.',
                'Use a collector to build a list. Avoid adding to an external list inside forEach.',
                'Parallel execution can process elements on different threads. You must account for ordering and access to shared data.',
                'Parallel execution is not always faster.',
            ],
            examples: [{
                title: 'Create a mutable list from nested lists',
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
                'Do not change the source collection while its stream processes elements.',
                'Streams from collections usually need no closing.',
                'Close streams that hold file resources, such as Files.lines, with try-with-resources.',
                'An unmodifiable result list does not make its elements immutable.',
                'An immutable object cannot change after creation.',
            ],
        },
    ],
};

export default note;
