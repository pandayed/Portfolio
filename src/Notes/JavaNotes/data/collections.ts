import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'collections',
    title: 'Lists, sets, and maps',
    summary: 'Choose a collection by duplicates, ordering, and lookup needs. Read and update values safely, and understand mutability and hash-based equality.',
    scope: 'java',
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'choose-collection',
            title: 'Choose by the operations you need',
            bullets: [
                'A List stores elements in a sequence. Each element has an index, and duplicate elements are allowed.',
                'A Set stores distinct elements.',
                'A Map associates each distinct key with one value.',
                'Map belongs to the collections framework, but it does not extend Collection.',
                'Declare a variable using the interface when callers only need its operations.',
                'Choose an implementation based on ordering and operation costs.',
                'ArrayList gives constant-time indexed access: the list size does not increase the number of steps.',
                'Adding at the end of an ArrayList takes amortized constant time. Occasional resizing adds work, but the average cost per addition stays constant.',
                'Inserting or removing in the middle of an ArrayList shifts later elements.',
                'HashSet and HashMap use hashing to find elements or keys from their hash codes. Their iteration order is not guaranteed.',
                'LinkedHashSet and a normal LinkedHashMap preserve insertion order.',
                'LinkedHashMap also supports access order, which changes the order when entries are accessed.',
                'TreeSet and TreeMap sort elements or keys. They use natural order or a Comparator, which defines how two values compare.',
                'Their core lookup and update operations take logarithmic time. Doubling the size adds a roughly fixed number of steps.',
                'ArrayDeque supports queue and stack operations. Use it instead of repeatedly removing the first element of an ArrayList.',
            ],
            pitfalls: [
                'List, Set, and Map do not guarantee thread safety. Decide how threads will coordinate access before sharing a mutable collection.',
                'Null support varies by implementation and factory. List.of, Set.of, and Map.of reject null.',
            ],
        },
        {
            id: 'list-operations',
            title: 'List indexes and the two remove overloads',
            bullets: [
                'List indexes start at zero.',
                'get reads an element. set replaces an element. add inserts or appends an element.',
                'ArrayList grows as you add elements.',
                'For List<Integer>, remove(1) removes the element at index 1.',
                'remove(Integer.valueOf(1)) removes the first element equal to the value 1.',
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
            pitfalls: [
                'get, set, and remove(index) need an index below size(). An empty list has no valid element index.',
                'Do not add or remove elements from an ArrayList inside an enhanced for loop. Use removeIf, or use an Iterator and its remove method.',
            ],
        },
        {
            id: 'sets-and-maps',
            title: 'Distinct values and lookup by key',
            bullets: [
                'Set.add returns false when the set already contains an equal element.',
                'Map.put replaces the existing value for the same key.',
                'entrySet lets you read each key and its value together.',
                'getOrDefault returns the default only when the map has no entry for that key.',
                'If the map allows null values and the key maps to null, getOrDefault returns null.',
                'containsKey tells you whether the key exists. Use it to distinguish a null value from a missing key.',
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
            pitfalls: [
                'getOrDefault does not insert the default into the map. put performs the update in this example.',
                'This count reads a value and then writes the new value. These steps are not one atomic update, so concurrent callers can lose updates.',
            ],
        },
        {
            id: 'collection-mutability',
            title: 'Mutable collections, fixed size, and unmodifiable views',
            bullets: [
                'A mutable collection allows changes. An unmodifiable collection rejects changes through its reference.',
                'new ArrayList<>(values) creates a mutable list and copies the element references.',
                'List.of creates an unmodifiable list. Neither operation copies the element objects.',
                'Arrays.asList returns a fixed-size list that uses the original array for its elements.',
                'You can use set on that list. You cannot add or remove elements.',
                'Collections.unmodifiableList creates an unmodifiable view of an existing list.',
                'A view uses the original list. Changes made through the original list also appear in the view.',
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
            pitfalls: [
                'An unmodifiable collection can still contain mutable objects. The contents of those objects can change.',
                'Set.of rejects duplicate arguments. Map.of rejects duplicate keys. Do not assume their iteration order matches argument order.',
            ],
        },
        {
            id: 'equals-hashcode',
            title: 'Hash-based collections need matching equality and hash codes',
            bullets: [
                'HashSet uses equals and hashCode to identify equal elements. HashMap uses them to identify equal keys.',
                'Override hashCode when you override equals. Use the same fields for both methods.',
                'A record supplies both methods using its components. Records with immutable components can serve as value keys.',
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
            pitfalls: [
                'Do not change fields used by equals or hashCode while an object is a set element or map key. Lookup may search using a different hash than the one used at insertion.',
                'TreeSet and TreeMap treat two values as equivalent when their ordering comparison returns zero. Make that result agree with equals when you need the normal Set or Map equality rules.',
            ],
        },
    ],
};

export default note;
