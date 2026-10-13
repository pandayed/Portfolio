import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'streams',
    title: 'Streams',
    summary: 'Build stream pipelines to filter, transform, reduce, group, and flatten values. Choose result collections and understand execution rules.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'stream-pipelines',
            title: 'Streams, filter, and map',
            bullets: [
                'A stream processes values from a source. It does not store another collection.',
                'A pipeline connects a source, intermediate operations, and a terminal operation.',
                'collection.stream() creates a sequential stream from a collection.',
                'filter keeps values that pass a Predicate. map transforms each remaining value using a Function.',
                'Intermediate operations describe the steps. They are lazy: creating the pipeline does not process the elements.',
                'A terminal operation, such as toList, count, or forEach, starts processing.',
                'This filter-and-map pipeline leaves the source list unchanged and keeps its encounter order, which is the original list order here.',
                'Use a stream only once. Reusing it after a terminal operation may throw IllegalStateException. Create a fresh stream for another calculation.',
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
        },
        {
            id: 'reduce-and-collect',
            title: 'Reduce elements to one value',
            bullets: [
                'reduce combines elements into one result.',
                'An identity is the starting value. Combining the identity with a value must leave that value unchanged.',
                'For integer addition, the identity is 0 and the operation is Integer::sum.',
                'The combining operation must be associative: regrouping inputs must not change the result.',
                'Subtraction is not associative. Do not use it to combine values in reduce.',
            ],
            examples: [{
                title: 'Calculate a total',
                language: 'java',
                code: `import java.util.List;

public class Main {
    public static void main(String[] args) {
        int total = List.of(2, 3, 5).stream()
            .reduce(0, Integer::sum);
        System.out.println(total);
    }
}`,
                result: 'Prints 10.',
            }],
        },
        {
            id: 'collect-and-group',
            title: 'Collect results and group elements',
            bullets: [
                'collect builds a result container using a Collector, such as a list or a map.',
                'Collectors supplies collector implementations. Pass one to collect to choose how to build the result.',
                'Collectors.groupingBy chooses a key for each element and groups elements with the same key.',
                'A downstream collector processes each group. Collectors.counting returns the number of elements as a Long.',
                'groupingBy without a map supplier does not guarantee a map type or key order.',
                'TreeMap::new supplies a map that sorts the group keys in this example.',
                'Collectors.toMap builds a map by choosing a key and a value for each element.',
                'Collectors.toMap throws IllegalStateException for duplicate keys unless you supply a merge function.',
                'The merge function chooses or combines values that map to the same key.',
            ],
            examples: [{
                title: 'Count words grouped by length',
                language: 'java',
                code: `import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
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
                result: 'Prints {2=1, 3=1, 4=2}. TreeMap sorts the keys. counting returns Long values.',
            }],
        },
        {
            id: 'results-and-side-effects',
            title: 'Choose the result collection',
            bullets: [
                'An unmodifiable list rejects adding, removing, and replacing elements.',
                'An unmodifiable list can still contain mutable objects. Those objects can change.',
            ],
            table: {
                columns: ['Operation', 'Result'],
                rows: [
                    ['stream.toList()', 'Unmodifiable list. Available since Java 16.'],
                    ['collect(Collectors.toList())', 'No guarantee of the list implementation or mutability.'],
                    ['collect(Collectors.toCollection(ArrayList::new))', 'Mutable ArrayList.'],
                ],
            },
        },
        {
            id: 'flatmap',
            title: 'Flatten nested values with flatMap',
            bullets: [
                'map produces one output value for each input. Mapping each list to a stream would produce a stream of streams.',
                'flatMap maps each input to a stream and combines the elements of those streams into one stream.',
                'List::stream turns each inner list into a stream in this example.',
                'Collect the flattened elements with toCollection(ArrayList::new) when you need a mutable list.',
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
        },
        {
            id: 'stream-execution',
            title: 'Source changes, side effects, and parallel streams',
            bullets: [
                'A side effect changes something outside an operation, such as adding to an external list.',
                'Do not depend on side effects in map, filter, or peek. Java may skip operations that do not affect the terminal result.',
                'Use a collector to build a result list instead of adding to an external list from forEach.',
                'Keep pipeline functions independent of shared mutable state. Capturing an object in a lambda does not make access to it thread-safe.',
                'Do not change the source collection while its stream processes elements.',
                'parallelStream() may process elements on multiple threads. Parallel execution needs suitable operations and does not guarantee faster processing.',
                'Parallel forEach does not guarantee encounter order. Use forEachOrdered when actions must follow that order.',
                'Streams from collections usually need no closing. Streams that hold file resources, such as Files.lines, need try-with-resources.',
            ],
        },
    ],
};

export default note;
