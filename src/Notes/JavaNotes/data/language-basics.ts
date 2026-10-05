import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'language-basics',
    title: 'Language basics',
    summary: 'Read Java declarations, distinguish primitive values from references, and handle conversions and null.',
    scope: 'java',
    updatedOn: '2026-10-05',
    sections: [
        {
            id: 'declarations',
            title: 'Declare a type, a name, and a value',
            paragraphs: [
                'Java checks types at compile time. A declaration such as int count = 3 gives the variable a type, a name, and an initial value. Statements usually end with a semicolon. Braces group a class body, a method body, or a block.',
                'Every complete example on this page can be saved separately as Main.java. Run javac Main.java and then java Main with a Java 17 or newer JDK. The main method is the entry point. System.out.println writes a line to standard output.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        int count = 3;
        count = count + 1;
        final String unit = "books";
        var available = true;
        System.out.println(count + " " + unit);
        System.out.println(available);
    }
}`,
                result: '4 books\ntrue',
            }],
            bullets: [
                'var infers a local variable type from its initializer. It does not make the variable dynamically typed. available remains a boolean.',
                'final prevents assigning a new value to that variable after initialization. It does not make the referenced object immutable.',
                'Local variables need a value before they are read. Fields and new array elements receive default values instead.',
            ],
            pitfalls: ['var needs an initializer and cannot infer a type from null alone. It cannot replace a method parameter type or return type.'],
        },
        {
            id: 'primitives-and-references',
            title: 'Primitive variables store values; reference variables refer to objects',
            paragraphs: [
                'The eight primitive types are byte, short, int, long, float, double, char, and boolean. int is a 32-bit signed integer. long is a 64-bit signed integer. double stores a binary floating-point number. boolean holds true or false.',
                'String, arrays, and instances of other classes are reference types. Assigning a primitive copies its value. Assigning a reference copies the reference, so both variables can refer to the same mutable object.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        int original = 10;
        int copy = original;
        copy = 20;

        int[] first = {10};
        int[] second = first;
        second[0] = 20;

        System.out.println(original + " " + copy);
        System.out.println(first[0]);
    }
}`,
                result: '10 20\n20',
            }],
            bullets: [
                "A char holds one UTF-16 code unit, written with single quotes such as 'A'. Some Unicode characters require two code units.",
                'Use an L suffix for a long literal, such as 3_000_000_000L. Decimal floating-point literals are double by default; 1.5F is a float.',
            ],
        },
        {
            id: 'numeric-conversions',
            title: 'Choose the numeric type before calculating',
            paragraphs: [
                'Java can widen int to long without a cast. A narrowing conversion such as double to int needs a cast and can lose information. A floating-point value cast to int drops its fractional part toward zero.',
                'Two integer operands produce an integer quotient. Converting that quotient to double afterward cannot restore the fraction. Convert an operand before division instead.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        int total = 7;
        int people = 2;
        double whole = total / people;
        double average = (double) total / people;
        int truncated = (int) -3.9;
        long squared = 50_000L * 50_000;

        System.out.println(whole);
        System.out.println(average);
        System.out.println(truncated);
        System.out.println(squared);
    }
}`,
                result: '3.0\n3.5\n-3\n2500000000',
            }],
            pitfalls: [
                'long result = 50_000 * 50_000 still multiplies two ints first. That multiplication overflows before assignment. Give an operand type long before the operation.',
                'Integer overflow does not automatically throw an exception. Math.addExact and Math.multiplyExact can detect overflow when that is required.',
                'double cannot represent every decimal fraction exactly. Use BigDecimal with decimal-string inputs when exact decimal arithmetic is required.',
            ],
        },
        {
            id: 'wrappers-and-null',
            title: 'Wrapper types can hold null',
            paragraphs: [
                'Integer wraps an int value in an object. Java boxes a primitive when assigning it to a wrapper and unboxes a wrapper when a primitive is required. Other wrappers include Long, Double, Boolean, and Character.',
                'null means there is no referenced object. A reference variable can be null; a primitive cannot. Calling an instance method on null or unboxing a null wrapper throws NullPointerException.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        Integer stored = 12;       // boxing
        int next = stored + 1;     // unboxing
        Integer missing = null;
        int count = missing == null ? 0 : missing;
        int parsed = Integer.parseInt("42");

        System.out.println(next);
        System.out.println(count);
        System.out.println(parsed);
    }
}`,
                result: '13\n0\n42',
            }],
            pitfalls: [
                'int count = missing would fail at runtime because missing is null. Check whether a missing value is allowed before unboxing.',
                'Do not use == to compare the contents of two wrapper objects. It can compare object identity. Use equals for non-null objects or Objects.equals when either value may be null.',
                'Integer.parseInt throws NumberFormatException for invalid text or a number outside the int range.',
            ],
        },
        {
            id: 'operators',
            title: 'Conditions use boolean values',
            paragraphs: [
                'Comparisons such as >= and == produce booleans. Java does not treat 0, an empty string, or an object as a boolean condition. Use an explicit comparison.',
                '&& evaluates the right operand only when the left operand is true. || evaluates it only when the left operand is false. This short-circuit behavior can make a null check safe.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        String name = null;
        boolean hasName = name != null && !name.isBlank();
        int count = 4;
        String label = count == 1 ? "item" : "items";

        System.out.println(hasName);
        System.out.println(count + " " + label);
        System.out.println("sum=" + (2 + 3));
    }
}`,
                result: 'false\n4 items\nsum=5',
            }],
            pitfalls: [
                'Use = for assignment and == for equality. Use String.equals to compare text contents.',
                'The + operator also concatenates strings. "sum=" + 2 + 3 produces sum=23 because the operations group from left to right.',
            ],
        },
        {
            id: 'packages-and-imports',
            title: 'Packages name classes; imports shorten names',
            paragraphs: [
                'A package gives a class a qualified name. The package declaration comes before imports and class declarations. An import lets you write a short class name instead of its qualified name. It does not install a dependency.',
                'Save the example as src/study/Main.java. From the directory containing src, run javac -d out src/study/Main.java, then java -cp out study.Main. The class path tells the launcher where to find compiled classes.',
            ],
            examples: [{
                title: 'src/study/Main.java',
                language: 'java',
                code: `package study;

import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] counts = {2, 4, 6};
        System.out.println(Arrays.toString(counts));
    }
}`,
                result: '[2, 4, 6]',
            }],
            bullets: [
                'Classes in java.lang, including String and System, are available without explicit imports.',
                'An import such as java.util.* imports accessible types from that package. It does not import types from subpackages.',
                'A public top-level class named Main belongs in Main.java when using javac.',
            ],
        },
    ],
};

export default note;
