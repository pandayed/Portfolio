import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'collections',
    title: 'Lists, sets, and maps',
    summary: 'Choose a collection by duplicates, ordering, and lookup needs. Read and update values safely, and understand mutability and hash-based equality.',
    scope: 'java',
    updatedOn: '2026-10-05',
    sections: [
        {
            id: 'choose-collection',
            title: 'Choose by the operations you need',
            paragraphs: [
                'List stores a sequence with indexes and permits duplicates. Set stores distinct elements. Map associates each distinct key with one value. Map is part of the collections framework, but does not extend Collection.',
                'Declare the variable with the interface when callers only need its contract. Choose the implementation to control ordering and operation costs.',
            ],
            bullets: [
                'ArrayList: a common list choice. Indexed access is constant time. Adding at the end is amortized constant time. Inserting or removing in the middle shifts later elements.',
                'HashSet and HashMap: use hashing for membership and key lookup. Do not rely on their iteration order.',
                'LinkedHashSet and a normal LinkedHashMap: preserve insertion order. LinkedHashMap also has an optional access-order mode.',
                'TreeSet and TreeMap: keep elements or keys sorted by natural order or a Comparator. Core lookup and update operations take logarithmic time.',
                'ArrayDeque: use for a queue or stack rather than removing from the front of an ArrayList.',
            ],
            pitfalls: [
                'List, Set, and Map interfaces do not imply thread safety. Choose a concurrency approach before sharing mutable collections across threads.',
                'Null support varies by implementation and factory. List.of, Set.of, and Map.of reject null.',
            ],
        },
        {
            id: 'list-operations',
            title: 'List indexes and the two remove overloads',
            paragraphs: [
                'List indexes start at zero. get reads an element, set replaces it, and add inserts or appends it. ArrayList grows as elements are added.',
                'For List<Integer>, remove(1) removes the element at index 1. remove(Integer.valueOf(1)) removes the first element equal to the value 1.',
            ],
            examples: [{
                title: 'Main.java: remove by position and by value',
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
            pitfalls: [
                'get, set, and remove(index) need an index below size(). An empty list has no valid element index.',
                'Do not structurally modify an ArrayList inside an enhanced for loop. Use removeIf, or an Iterator and its remove method when appropriate.',
            ],
        },
        {
            id: 'sets-and-maps',
            title: 'Distinct values and lookup by key',
            paragraphs: [
                'Set.add returns false when an equal element is already present. Map.put replaces an existing value for the same key. Iterating entrySet gives both the key and its value.',
                'getOrDefault returns the default only when there is no mapping. If a map permits null and maps the key to null, getOrDefault returns null. containsKey distinguishes that case from a missing key.',
            ],
            examples: [{
                title: 'Main.java: ordered tags and a word count',
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
            pitfalls: [
                'getOrDefault does not insert the default into the map. put performs the update in this example.',
                'The read-then-write count is suitable for this single-threaded example. It is not an atomic update for concurrent callers.',
            ],
        },
        {
            id: 'collection-mutability',
            title: 'Mutable collections, fixed size, and unmodifiable views',
            paragraphs: [
                'new ArrayList<>(values) creates a mutable list with copied element references. List.of creates an unmodifiable list. Neither deep-copies the objects inside it.',
                'Arrays.asList returns a fixed-size list backed by the array. set is allowed, but add and remove are not. Collections.unmodifiableList wraps a list with an unmodifiable view. Changes through the original list are still visible through that view.',
            ],
            examples: [{
                title: 'Main.java: compare a view and a copy',
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
            pitfalls: [
                'Unmodifiable means collection operations cannot change membership through that reference. Mutable element objects can still change.',
                'Set.of rejects duplicate arguments. Map.of rejects duplicate keys. Do not assume their iteration order matches argument order.',
            ],
        },
        {
            id: 'equals-hashcode',
            title: 'Hash-based collections need matching equality and hash codes',
            paragraphs: [
                'HashSet uses equals and hashCode to identify equal elements. HashMap does the same for keys. Equal objects must have equal hash codes. Different objects may have the same hash code, so equality checks still matter.',
                'If you override equals in a class, implement hashCode from the same fields. A record supplies both methods using its components, which fits simple value keys.',
            ],
            examples: [{
                title: 'Main.java: two value keys identify one account',
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
            pitfalls: [
                'Do not change fields used by equals or hashCode while an object is a set element or map key. Lookup may search using a different hash than the one used at insertion.',
                'TreeSet and TreeMap use ordering comparisons to identify equivalent elements or keys. Keep the comparator consistent with equals when you need normal Set or Map equality behavior.',
            ],
        },
    ],
};

export default note;
