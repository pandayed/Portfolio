import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'maps',
    title: 'Maps',
    summary: 'Store key-value pairs, distinguish missing keys from null values, and use value objects as keys.',
    scope: 'java',
    exampleLayout: 'grouped',
    pointwise: true,
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'sets-and-maps',
            title: 'Store and find values by key',
            bullets: [
                'A Map associates each distinct key with one value. Different keys can share a value.',
                'put adds a key-value pair. For an existing key, it replaces the previous value.',
                'get reads the value for a key. It returns null when the key is absent or maps to null.',
                'containsKey distinguishes an absent key from a key whose value is null.',
                'getOrDefault returns the default only when the key is absent. It does not insert that default.',
                'A present key mapped to null still produces null from getOrDefault.',
                'entrySet provides entries with getKey() and getValue(). Use it to read each pair together.',
                'HashMap has no guaranteed iteration order. LinkedHashMap preserves insertion order by default.',
                'LinkedHashMap can also use access order. Accessing an entry can change its position in that mode.',
                'Reading a count and then writing its replacement are separate operations. Concurrent callers can lose updates without coordination.',
            ],
            examples: [{
                title: 'Count words by key',
                description: [
                    'Count java, sql, and java, then look up the count for go.',
                ],
                language: 'java',
                code: `import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
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
                result: 'java: 2\nsql: 1\n0',
                explanation: [
                    'getOrDefault supplies 0 for a word not yet in counts. Each occurrence adds one.',
                    'LinkedHashMap keeps the first insertion order, so java prints before sql.',
                    'go is absent. Its default count is printed without inserting go.',
                ],
            }],
        },
        {
            id: 'equals-hashcode',
            title: 'Equality determines key identity',
            bullets: [
                'HashMap uses equals and hashCode to identify equal keys.',
                'Do not change fields used by equals or hashCode while an object is a map key. Lookup may use a different hash from the one used at insertion.',
                'A record supplies equals and hashCode using its components. A record with immutable components can serve as a value key.',
                'TreeMap uses natural order or a Comparator to compare keys. A comparison result of zero means equivalent keys.',
                'Make that comparison agree with equals when you need the normal Map equality rules.',
            ],
            examples: [{
                title: 'Two value keys identify one account',
                description: [
                    'Store an account owner using one record key, then look it up using another record with the same values.',
                ],
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
                result: 'false\ntrue\nAsha',
                explanation: [
                    'first and sameValue are separate objects, so == returns false.',
                    'The record compares region and id in equals. Both keys contain IN and 7, so equals returns true.',
                    'HashMap finds Asha using the equal key.',
                ],
            }],
        },
        {
            id: 'map-factories',
            title: 'Create an unmodifiable map',
            bullets: [
                'Map.of(key, value, ...) creates an unmodifiable map. Adding, removing, and replacing entries throw UnsupportedOperationException.',
                'Map.of rejects null keys, null values, and duplicate keys.',
                'Map.of does not guarantee argument order during iteration.',
                'Unmodifiable entries can still contain mutable objects. Those objects can change.',
            ],
        },
    ],
};

export default note;
