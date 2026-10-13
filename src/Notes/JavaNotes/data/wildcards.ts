import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'wildcards',
    title: 'Wildcards',
    summary: 'Use unknown type arguments and bounded wildcards to control reads and writes.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'invariance',
            title: 'Invariant types and unknown elements',
            bullets: [
                'Integer extends Number, but List<Integer> is not a subtype of List<Number>. This rule is called invariance.',
                'If that assignment were allowed, a List<Number> reference could add a Double to a list that requires Integer elements.',
                'A wildcard ? means an unknown type argument. List<?> can refer to a list of any element type.',
                'Reading an element through List<?> gives Object.',
                'You cannot add a non-null value through List<?>. Java does not know which element type that list accepts.',
                'List<Object> has a known element type and accepts any Object value. It differs from List<?>.',
            ],
            examples: [{
                title: 'Accept unknown list types for reading',
                language: 'java',
                code: `import java.util.List;

public class Main {
    static void printFirst(List<?> values) {
        Object first = values.get(0);
        System.out.println(first);
    }

    public static void main(String[] args) {
        List<Integer> counts = List.of(10, 20);
        // List<Number> numbers = counts; // Compile error.
        printFirst(counts);
        printFirst(List.of("ready", "done"));
    }
}`,
                result: 'Prints 10, then ready on a new line.',
            }],
        },
        {
            id: 'extends-super',
            title: 'Bounded wildcards for reading and writing',
            bullets: [
                'List<? extends Number> accepts a list of Number or any Number subtype.',
                'You can read its values as Number. You cannot add Integer or Double values through that reference because its exact element type is unknown.',
                'List<? super Integer> accepts a list of Integer or an Integer supertype, such as Number or Object.',
                'You can add Integer values through that reference. Reading gives Object because the declared element type could be a supertype.',
                'Use extends when a parameter supplies values. Use super when it receives values.',
                'Use a named type parameter T when parameters or a return value must share a type. The copy method below relates its source and destination using T.',
                'An extends wildcard does not make the list unmodifiable. clear() remains available, and another reference can change the list.',
            ],
            examples: [{
                title: 'Copy integers into a list of numbers',
                language: 'java',
                code: `import java.util.ArrayList;
import java.util.List;

public class Main {
    static <T> void copy(List<? extends T> source,
                         List<? super T> destination) {
        for (T value : source) {
            destination.add(value);
        }
    }

    public static void main(String[] args) {
        List<Integer> counts = List.of(2, 4);
        List<Number> numbers = new ArrayList<>();
        numbers.add(1.5);
        copy(counts, numbers);
        System.out.println(numbers);
    }
}`,
                result: 'Prints [1.5, 2, 4]. The source produces values of T. The destination accepts values of T.',
            }],
        },
    ],
};

export default note;
