import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'lists',
    title: 'Lists',
    summary: 'Create lists, read and update indexes, remove elements, and compare views with copies.',
    scope: 'java',
    exampleLayout: 'grouped',
    pointwise: true,
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'list-creation',
            title: 'Create a list',
            bullets: [
                'A List stores elements in index order and allows duplicate values.',
                'List.of(...) creates an unmodifiable list from its arguments. It rejects null elements.',
                'new ArrayList<>(values) creates a mutable list with the same element references. new ArrayList<>() creates an empty mutable list.',
            ],
        },
        {
            id: 'list-operations',
            title: 'Read and update a list',
            bullets: [
                'size() returns the number of elements. List indexes start at zero. The last element has index size() - 1.',
                'get(index) reads an element. set(index, value) replaces an element.',
                'add(value) appends an element. add(index, value) inserts it at that position.',
                'ArrayList grows as you add elements.',
                'get, set, and remove(index) require an index from zero to size() - 1. Otherwise, they throw IndexOutOfBoundsException.',
                'For List<Integer>, remove(1) selects the index overload and removes the element at index 1.',
                'remove(Integer.valueOf(1)) selects the object overload and removes the first element equal to 1.',
            ],
            examples: [{
                title: 'Remove by position and by value',
                description: [
                    'Copy the values 1, 2, 1, and 3 into a mutable ArrayList, then remove and replace elements.',
                ],
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
                result: '1\n[1, 1, 3]\n[1, 3]\n[9, 3, 5]',
                explanation: [
                    'get(0) reads the first element, 1.',
                    'remove(1) removes the element at index 1, which is 2.',
                    'remove(Integer.valueOf(1)) removes the first element equal to 1.',
                    'set(0, 9) replaces the remaining 1. add(5) appends 5.',
                ],
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
                description: [
                    'Remove empty names from a mutable list while reading its elements.',
                ],
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
                result: '[Asha, Dev]',
                explanation: [
                    'next() returns each name. isEmpty() matches the empty string.',
                    'remove() deletes that name through the same iterator that reads the list.',
                ],
            }],
        },
        {
            id: 'collection-mutability',
            title: 'Mutable lists, fixed size, views, and copies',
            bullets: [
                'An unmodifiable list rejects adding, removing, and replacing elements through its reference.',
                'List.copyOf creates an unmodifiable list whose membership does not follow later changes to the source list. It rejects null elements.',
                'Copying a list copies its element references. It does not copy the objects stored in the list.',
                'An unmodifiable list can contain mutable objects. Those objects can still change.',
                'Arrays.asList returns a fixed-size list backed by the original array. Changes to its elements also appear in that array.',
                'Arrays.asList allows set, but add and remove throw UnsupportedOperationException.',
                'Collections.unmodifiableList creates an unmodifiable view. Changes through the original list appear in the view.',
            ],
            examples: [{
                title: 'Compare a view and a copy',
                description: [
                    'Replace an element in a fixed-size list, then compare an unmodifiable view with an unmodifiable copy.',
                ],
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
                result: '[ready, review]\n[A, B]\n[A]',
                explanation: [
                    'fixedSize.set changes draft to ready without changing the list size.',
                    'source.add("B") changes the original list. view reflects that change.',
                    'copy keeps the original membership, so it still contains only A.',
                    'The commented view.add call would throw UnsupportedOperationException.',
                ],
            }],
        },
    ],
};

export default note;
