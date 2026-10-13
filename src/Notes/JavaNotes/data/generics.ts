import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'generics',
    title: 'Generics and wildcards',
    summary: 'Write reusable classes and methods with checked types. Understand bounds, invariant lists, wildcard reads and writes, and type erasure.',
    scope: 'java',
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'generic-class',
            title: 'A type parameter keeps input and output related',
            bullets: [
                'A generic class uses a type parameter to work with different types.',
                'In Box<T>, T is the type parameter. It names the type used by the class.',
                'In Box<String>, String is the type argument. It supplies the type for T.',
                'Box<String> accepts and returns a String without a cast. A cast tells Java to treat a value as another type.',
            ],
            examples: [{
                title: 'Store a value with its type',
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
                'Type arguments must be reference types, so use Box<Integer> instead of Box<int>. Boxing converts the int value 3 to an Integer here.',
                'Avoid raw types such as Box without <T>. They weaken compile-time checks and can require unsafe casts later.',
            ],
        },
        {
            id: 'generic-methods',
            title: 'Generic methods and upper bounds',
            bullets: [
                'A generic method declares its own type parameter. Put <T> before the return type.',
                'The containing class does not need to be generic.',
                'A bound limits the types allowed for a type parameter.',
                'T extends Number accepts Number or a subtype. It lets the method call Number methods.',
                'In a type bound, extends also applies to interfaces.',
            ],
            examples: [{
                title: 'Infer method types and restrict numeric input',
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
                'A bound does not make arithmetic operators work on T. Use methods such as doubleValue(), or pass code that performs the arithmetic.',
                'Class type parameters are unavailable in static members. A static generic method must declare its own parameter.',
            ],
        },
        {
            id: 'invariance',
            title: 'List<Integer> is not List<Number>',
            bullets: [
                'Integer extends Number, but List<Integer> is not a subtype of List<Number>. This rule is called invariance.',
                'If that assignment were allowed, code using List<Number> could add a Double to a list that requires Integer values.',
                'List<?> uses a wildcard: ? means one unknown element type.',
                'Reading through List<?> gives Object.',
                'List<Object> has a known element type. It allows any Object value.',
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
            pitfalls: [
                'You cannot add an arbitrary non-null value through List<?>. The actual element type is unknown.',
                'The printFirst method needs a nonempty list. A wildcard does not guarantee size or mutability.',
            ],
        },
        {
            id: 'extends-super',
            title: 'Use extends for reading and super for writing',
            bullets: [
                'List<? extends Number> accepts a list whose element type is Number or a Number subtype.',
                'You can read values as Number.',
                'You cannot add a new Integer or Double through that reference. The actual element type might be another Number subtype.',
                'List<? super Integer> accepts a list whose element type is Integer or a supertype such as Number or Object.',
                'You can add Integer values through that reference. Reading gives only Object.',
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
            pitfalls: [
                'An extends wildcard does not make the underlying list unmodifiable. Other references may mutate it, and operations such as clear() are still available.',
                'Use a named T when multiple parameters or a return value must share one type. Use a wildcard when only the allowed read or write direction matters.',
            ],
        },
        {
            id: 'type-erasure',
            title: 'Type erasure limits runtime checks',
            bullets: [
                'Type erasure replaces type parameters with their bounds or Object in compiled code.',
                'The compiler checks generic types before erasure. It inserts casts where needed.',
                'Generic type information can remain available through reflection. Reflection lets code inspect types at runtime.',
                'A normal list object does not enforce a String or Integer element type at runtime.',
                'You cannot construct new T() or new T[3]. Pass a factory, which is code that creates a value of type T.',
                'You cannot create new List<String>[3]. A list of lists is usually simpler.',
                'Overloads taking List<String> and List<Integer> have the same parameter types after erasure. This gives them the same erased signature, so give the operations different names.',
                'A generic class cannot extend Throwable. A catch parameter cannot be a type parameter.',
            ],
            examples: [{
                title: 'List type arguments do not produce different classes',
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
            pitfalls: [
                'Unchecked casts and raw collections can cause heap pollution. The collection contains a value that does not match the reference’s element type. A later read may throw ClassCastException.',
            ],
        },
    ],
};

export default note;
