import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'generics',
    title: 'Generics and wildcards',
    summary: 'Write reusable classes and methods with checked types. Understand bounds, invariant lists, wildcard reads and writes, and type erasure.',
    scope: 'java',
    updatedOn: '2026-10-05',
    sections: [
        {
            id: 'generic-class',
            title: 'A type parameter keeps input and output related',
            paragraphs: [
                'A generic class takes a type argument such as String. In Box<T>, T names that type throughout the class. Box<String> accepts a String and returns a String without a cast.',
                'Save each complete example as Main.java. The examples use Java 17 or later and do not need preview features.',
            ],
            examples: [{
                title: 'Main.java: store a value with its type',
                language: 'java',
                code: `public class Main {
    static class Box<T> {
        private final T value;

        Box(T value) { this.value = value; }
        T get() { return value; }
    }

    public static void main(String[] args) {
        Box<String> label = new Box<>("Paid");
        String text = label.get();
        Box<Integer> quantity = new Box<>(3);
        System.out.println(text);
        System.out.println(quantity.get() + 1);
    }
}`,
                result: 'Prints Paid, then 4 on a new line. The diamond <> lets the compiler infer each constructor type argument.',
            }],
            pitfalls: [
                'Use Box<Integer>, not Box<int>. Type arguments are reference types. Boxing converts the literal 3 to an Integer here.',
                'Avoid raw types such as Box without <T>. They weaken compile-time checks and can require unsafe casts later.',
            ],
        },
        {
            id: 'generic-methods',
            title: 'Generic methods and upper bounds',
            paragraphs: [
                'A method can declare its own type parameter. Put <T> before the return type. This works even when the containing class is not generic.',
                'A bound such as T extends Number allows the method to call Number methods. In a type bound, extends also applies to interfaces.',
            ],
            examples: [{
                title: 'Main.java: infer method types and restrict numeric input',
                language: 'java',
                code: `public class Main {
    static <T> T first(T left, T right) {
        return left;
    }

    static <T extends Number> double twice(T value) {
        return value.doubleValue() * 2;
    }

    public static void main(String[] args) {
        String name = first("Asha", "Dev");
        System.out.println(name);
        System.out.println(twice(6));
        System.out.println(twice(2.5));
        // twice("6"); // Compile error: String is not a Number.
    }
}`,
                result: 'Prints Asha, 12.0, and 5.0 on separate lines.',
            }],
            pitfalls: [
                'A bound does not make arithmetic operators work on T. Use methods such as doubleValue(), or a separate arithmetic strategy.',
                'Class type parameters are unavailable in static members. A static generic method must declare its own parameter.',
            ],
        },
        {
            id: 'invariance',
            title: 'List<Integer> is not List<Number>',
            paragraphs: [
                'Integer extends Number, but List<Integer> does not extend List<Number>. This rule is called invariance. Otherwise, code receiving a List<Number> could add a Double into a list promised to contain only Integer values.',
                'List<?> means a list of one unknown element type. Reading gives Object. It is different from List<Object>, which explicitly permits any Object value.',
            ],
            examples: [{
                title: 'Main.java: accept unknown list types for reading',
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
            pitfalls: [
                'You cannot add an arbitrary non-null value through List<?>. The actual element type is unknown.',
                'The printFirst method needs a nonempty list. A wildcard does not guarantee size or mutability.',
            ],
        },
        {
            id: 'extends-super',
            title: 'Use extends for reading and super for writing',
            paragraphs: [
                'List<? extends Number> accepts a list of Number or any Number subtype. Values can be read as Number. You cannot safely add a new Integer or Double because the actual type might be different.',
                'List<? super Integer> accepts a list of Integer or a supertype such as Number or Object. You can add Integer values. Reading through that reference gives only Object.',
            ],
            examples: [{
                title: 'Main.java: copy integers into a list of numbers',
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
            pitfalls: [
                'An extends wildcard does not make the underlying list unmodifiable. Other references may mutate it, and operations such as clear() are still available.',
                'Use a named T when multiple parameters or a return value must share one type. Use a wildcard when only the allowed read or write direction matters.',
            ],
        },
        {
            id: 'type-erasure',
            title: 'Type erasure limits runtime checks',
            paragraphs: [
                'The compiler checks generic types, then erases type parameters to their bounds or Object in compiled code. It inserts casts where needed. Generic metadata can remain available to reflection, but a normal list object does not carry an enforced String or Integer element type.',
            ],
            examples: [{
                title: 'Main.java: list type arguments do not produce different classes',
                language: 'java',
                code: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        List<Integer> counts = new ArrayList<>();
        System.out.println(names.getClass() == counts.getClass());

        Object value = names;
        System.out.println(value instanceof List<?>);
        // value instanceof List<String> // Compile error.
    }
}`,
                result: 'Prints true, then true. Both objects are ArrayList instances. The second check establishes that value is a List, without checking its element type.',
            }],
            bullets: [
                'You cannot construct new T() or new T[3]. Pass a factory when a method needs to create a T.',
                'You cannot create new List<String>[3]. A list of lists is usually simpler.',
                'Overloads taking List<String> and List<Integer> have the same erased signature. Give the operations different names.',
                'A generic class cannot extend Throwable. A catch parameter cannot be a type parameter.',
            ],
            pitfalls: [
                'Unchecked casts and raw collections can cause heap pollution: a reference promises one element type but contains another. A later read may throw ClassCastException.',
            ],
        },
    ],
};

export default note;
