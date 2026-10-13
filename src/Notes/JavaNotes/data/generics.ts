import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'generics',
    title: 'Generics and wildcards',
    summary: 'Write reusable classes and methods with checked types. Understand bounds, invariant lists, wildcard reads and writes, and type erasure.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'generic-class',
            title: 'Generic classes and type arguments',
            bullets: [
                'A generic class uses a type parameter to work with different reference types.',
                'In Box<T>, T is the type parameter. It names the type used inside the class.',
                'In Box<String>, String is the type argument. It supplies the type for T.',
                'Box<String> accepts and returns String values. The compiler rejects a different input type.',
                'You do not need a cast when reading the value. A cast asks Java to treat a value as another type.',
                'The diamond <> lets the compiler infer constructor type arguments from the surrounding code.',
                'Type arguments must be reference types. Use Box<Integer>, since Box<int> does not compile.',
                'Box<Integer> accepts an int through boxing, which converts the int to its wrapper object.',
                'A raw type omits the type argument, such as Box instead of Box<String>. Raw types weaken compile-time checks and can lead to unsafe casts.',
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
        },
        {
            id: 'generic-methods',
            title: 'Generic methods and bounds',
            bullets: [
                'A generic method declares its own type parameter before the return type: static <T> T first(T left, T right).',
                'The containing class does not need to be generic. The compiler can infer T from the method arguments.',
                'A bound limits the types allowed for a type parameter.',
                'T extends Number accepts Number or a subtype. The method can call methods declared by Number.',
                'In a type bound, extends also applies to interfaces.',
                'A Number bound does not enable arithmetic operators on T. Use methods such as doubleValue().',
                'A static member cannot use its class type parameter. A static generic method declares its own type parameter.',
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
        },
        {
            id: 'invariance',
            title: 'Invariant types and unknown elements',
            bullets: [
                'List<T> is a generic interface for a sequence of elements of type T. get(index) reads an element. add(value) appends one.',
                'List.of(...) creates an unmodifiable list from its arguments. The example reads these lists without changing them.',
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
                'ArrayList<T> implements List<T>. new ArrayList<>() creates an empty mutable list, which accepts additions.',
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
        {
            id: 'type-erasure',
            title: 'Type erasure and runtime checks',
            bullets: [
                'Type erasure replaces type parameters with their bounds or Object in compiled code.',
                'The compiler checks generic types before erasure and inserts casts where needed.',
                'A normal list object does not check String or Integer element types at runtime.',
                'An unchecked cast or raw collection can cause heap pollution: a value does not match the element type declared by the reference.',
                'A later read of that value may throw ClassCastException.',
                'instanceof List<?> checks whether a value is a List. It does not check the element type.',
                'instanceof List<String> cannot check an arbitrary Object value and does not compile in the example below.',
                'Generic declarations can retain type information for reflection. Reflection inspects declared types at runtime; it does not make a list enforce its element type.',
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
        },
        {
            id: 'generic-restrictions',
            title: 'Restrictions caused by type erasure',
            bullets: [
                'You cannot construct new T(). Pass a factory that creates a value of type T.',
                'You cannot construct new T[3] or new List<String>[3]. Use a list of lists when you need nested generic collections.',
                'Methods that differ only by List<String> versus List<Integer> have the same parameter type after erasure. They cannot be overloads of the same name.',
                'Give those operations different method names.',
                'A generic class cannot extend Throwable. A catch parameter cannot be a type parameter.',
            ],
        },
    ],
};

export default note;
