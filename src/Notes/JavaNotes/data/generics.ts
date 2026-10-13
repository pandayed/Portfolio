import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'generics',
    title: 'Generics',
    summary: 'Define generic classes and methods, supply type arguments, and limit them with bounds.',
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
    ],
};

export default note;
