import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'collections',
    title: 'Lists, sets, and maps',
    summary: 'Choose a collection by duplicates, ordering, and lookup needs. Read and update values safely, and understand mutability and hash-based equality.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'choose-collection',
            title: 'Collection interfaces',
            bullets: [
                'A collection stores a group of objects. The collection interfaces describe the operations available on that group.',
                'An implementation is a class that provides those operations, such as ArrayList for List.',
                'List stores elements in a sequence. Each element has an index. Duplicate elements are allowed.',
                'Set stores distinct elements. Adding an equal element does not create another entry.',
                'Map stores key-value pairs. Each distinct key maps to one value.',
                'Map belongs to the collections framework, but it does not extend Collection.',
                'Queue supports waiting elements. Deque supports adding and removing at both ends.',
                'List<String> uses a generic type argument to require String elements. Map<String, Integer> requires String keys and Integer values.',
                'Declare the variable with the interface when you need only its operations: List<String> names = new ArrayList<>();',
                'Null support depends on the implementation. List.of, Set.of, and Map.of reject null.',
                'List, Set, and Map do not guarantee thread safety. Shared mutable collections need coordination between threads.',
            ],
        },
        {
            id: 'collection-implementations',
            title: 'Collection implementations',
            bullets: [
                'Choose an implementation by the ordering and operations you need.',
                'Constant time means the number of steps does not grow with the collection size.',
                'Amortized constant time describes the average cost across many operations. Occasional resizing can take more work.',
                'Logarithmic time means doubling the collection size adds roughly a fixed number of steps.',
                'Natural order comes from the element type. A Comparator supplies a separate rule for comparing two values.',
                'LinkedHashMap can also use access order. Accessing an entry can change its position in that mode.',
            ],
            table: {
                columns: ['Implementation', 'Order and operations'],
                rows: [
                    ['ArrayList', 'Index order. Constant-time get and set. Amortized constant-time append. Middle insertions and removals shift later elements.'],
                    ['HashSet', 'Distinct elements. Uses hash codes for lookup. No guaranteed iteration order.'],
                    ['LinkedHashSet', 'Distinct elements in insertion order.'],
                    ['TreeSet', 'Elements in natural or Comparator order. Core lookup and update operations take logarithmic time.'],
                    ['HashMap', 'Key-value lookup using hash codes. No guaranteed iteration order.'],
                    ['LinkedHashMap', 'Key-value pairs in insertion order by default.'],
                    ['TreeMap', 'Keys in natural or Comparator order. Core lookup and update operations take logarithmic time.'],
                    ['ArrayDeque', 'Queue and stack operations at the ends. Avoids shifting elements when removing the first item.'],
                ],
            },
        },
        {
            id: 'list-operations',
            title: 'Read and update a list',
            bullets: [
                'List indexes start at zero. The last element has index size() - 1.',
                'get(index) reads an element. set(index, value) replaces an element.',
                'add(value) appends an element. add(index, value) inserts it at that position.',
                'ArrayList grows as you add elements.',
                'get, set, and remove(index) require an index from zero to size() - 1. Otherwise, they throw IndexOutOfBoundsException.',
                'For List<Integer>, remove(1) selects the index overload and removes the element at index 1.',
                'remove(Integer.valueOf(1)) selects the object overload and removes the first element equal to 1.',
            ],
            examples: [{
                title: 'Remove by position and by value',
                language: 'java',
                code: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(List.of(1, 2, 1, 3));
        System.out.println(numbers.get(0));
        numbers.remove(1);
        System.out.println(numbers);
        numbers.remove(Integer.valueOf(1));
        System.out.println(numbers);
        numbers.set(0, 9);
        numbers.add(5);
        System.out.println(numbers);
    }
}`,
                result: 'Prints 1, [1, 1, 3], [1, 3], and [9, 3, 5] on separate lines.',
            }],
        },
        {
            id: 'sets-and-maps',
            title: 'Add distinct values and look up keys',
            bullets: [
                'Set.add returns true for a new element. It returns false when an equal element is already present.',
                'Map.put adds a key-value pair. For an existing key, it replaces the previous value.',
                'Map.get reads the value for a key. It returns null when the key is absent or maps to null.',
                'containsKey distinguishes an absent key from a key whose value is null.',
                'getOrDefault returns the default only when the key is absent. It does not insert that default.',
                'A present key mapped to null still produces null from getOrDefault.',
                'entrySet provides entries with getKey() and getValue(). Use it to read each pair together.',
                'Reading a count and then writing its replacement are separate operations. Concurrent callers can lose updates without coordination.',
            ],
            examples: [{
                title: 'Ordered tags and a word count',
                language: 'java',
                code: `import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<String> tags = new LinkedHashSet<>();
        tags.add("java");
        tags.add("backend");
        System.out.println(tags.add("java"));
        System.out.println(tags);

        Map<String, Integer> counts = new LinkedHashMap<>();
        for (String word : List.of("java", "sql", "java")) {
            counts.put(word, counts.getOrDefault(word, 0) + 1);
        }
        for (Map.Entry<String, Integer> entry : counts.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        System.out.println(counts.getOrDefault("go", 0));
    }
}`,
                result: 'Prints false, [java, backend], java: 2, sql: 1, and 0 on separate lines. LinkedHashMap makes the printed key order predictable.',
            }],
        },
        {
            id: 'collection-iteration',
            title: 'Iterate and remove elements',
            bullets: [
                'An enhanced for loop reads each element without using an index.',
                'An Iterator tracks a position while traversing a collection. hasNext() checks for another element. next() returns it.',
                'An ArrayList iterator detects structural changes made outside that iterator and may throw ConcurrentModificationException.',
                'Use Iterator.remove() to remove the element most recently returned by next(). Call it at most once for each next().',
                'Iterator.remove() is optional. Unmodifiable collections reject it with UnsupportedOperationException.',
                'Do not add or remove ArrayList elements directly inside an enhanced for loop.',
                'After learning lambdas, use removeIf(predicate) to remove every matching element from a mutable collection.',
            ],
            examples: [{
                title: 'Remove entries while iterating',
                language: 'java',
                code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("Asha", "", "Dev"));
        Iterator<String> iterator = names.iterator();
        while (iterator.hasNext()) {
            if (iterator.next().isEmpty()) {
                iterator.remove();
            }
        }
        System.out.println(names);
    }
}`,
                result: 'Prints [Asha, Dev]. Removal uses the same iterator that reads the elements.',
            }],
        },
        {
            id: 'collection-mutability',
            title: 'Mutable lists, fixed size, views, and copies',
            bullets: [
                'A mutable collection allows changes. An unmodifiable collection rejects changes through its reference.',
                'new ArrayList<>(values) creates a mutable list with the same element references.',
                'List.of creates an unmodifiable list. List.copyOf creates an unmodifiable list whose membership does not follow later source changes.',
                'These operations copy or retain element references. They do not copy the objects stored in the list.',
                'An unmodifiable collection can contain mutable objects. Those objects can still change.',
                'Arrays.asList returns a fixed-size list backed by the original array. Changes to its elements also appear in that array.',
                'Arrays.asList allows set, but add and remove throw UnsupportedOperationException.',
                'Collections.unmodifiableList creates an unmodifiable view. Changes through the original list appear in the view.',
                'List.of and List.copyOf reject null elements. Set.of rejects duplicate elements. Map.of rejects duplicate keys.',
                'Set.of and Map.of do not guarantee the iteration order of their arguments.',
            ],
            examples: [{
                title: 'Compare a view and a copy',
                language: 'java',
                code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> fixedSize = Arrays.asList("draft", "review");
        fixedSize.set(0, "ready");
        System.out.println(fixedSize);

        List<String> source = new ArrayList<>(List.of("A"));
        List<String> view = Collections.unmodifiableList(source);
        List<String> copy = List.copyOf(source);
        source.add("B");
        System.out.println(view);
        System.out.println(copy);
        // view.add("C"); // Throws UnsupportedOperationException.
    }
}`,
                result: 'Prints [ready, review], [A, B], and [A] on separate lines. The copy keeps the original membership while the view reflects source changes.',
            }],
        },
        {
            id: 'equals-hashcode',
            title: 'Equality in sets and map keys',
            bullets: [
                'HashSet uses equals and hashCode to find equal elements. HashMap uses them to find equal keys.',
                'Do not change those fields while the object is a set element or map key. Lookup can use a different hash from the one used at insertion.',
                'A record supplies equals and hashCode using its components. A record with immutable components can serve as a value key.',
                'TreeSet and TreeMap use ordering comparisons. A comparison result of zero means equivalent elements or keys.',
                'Make that comparison agree with equals when you need the normal Set or Map equality rules.',
            ],
            examples: [{
                title: 'Two value keys identify one account',
                language: 'java',
                code: `import java.util.HashMap;
import java.util.Map;

public class Main {
    record AccountKey(String region, int id) {}

    public static void main(String[] args) {
        Map<AccountKey, String> owners = new HashMap<>();
        AccountKey first = new AccountKey("IN", 7);
        AccountKey sameValue = new AccountKey("IN", 7);
        owners.put(first, "Asha");
        System.out.println(first == sameValue);
        System.out.println(first.equals(sameValue));
        System.out.println(owners.get(sameValue));
    }
}`,
                result: 'Prints false, true, and Asha on separate lines. The keys are separate objects with equal component values.',
            }],
        },
    ],
};

export default note;
