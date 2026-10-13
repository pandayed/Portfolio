import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'language-basics',
    title: 'Language basics',
    summary: 'Read Java declarations, distinguish primitive values from references, and handle conversions and null.',
    scope: 'java',
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'declarations',
            title: 'Declare a type, a name, and a value',
            bullets: [
                'Java checks types at compile time, before the program runs.',
                'A declaration such as int count = 3 gives a variable a type, a name, and an initial value.',
                'Statements usually end with a semicolon. Braces group a class body, a method body, or a block of statements.',
                'The main method is the entry point where the program starts. System.out.println writes a line to standard output.',
                'var gets the type of a local variable from its initial value. available has type boolean and keeps that type.',
                'final prevents assigning a new value to a variable after initialization. It does not stop changes to an object that the variable refers to.',
                'Give a local variable a value before reading it. Fields and new array elements receive default values.',
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
            pitfalls: [
                'var needs an initial value. Java cannot work out a type from null alone.',
                'You cannot use var as a method parameter type or return type.',
            ],
        },
        {
            id: 'primitives-and-references',
            title: 'Primitive variables store values; reference variables refer to objects',
            bullets: [
                'A primitive variable stores a value. The eight primitive types are byte, short, int, long, float, double, char, and boolean.',
                'int is a 32-bit signed integer. long is a 64-bit signed integer. Signed integers can be positive, zero, or negative.',
                'double stores a binary floating-point number. It can represent fractional values, but some values are approximate.',
                'boolean holds true or false.',
                'A reference identifies an object. String, arrays, and instances of other classes are reference types.',
                'Assigning a primitive copies its value. Changing the copy does not change the original variable.',
                'Assigning a reference copies the reference. Both variables can then refer to the same object.',
                'A mutable object can change. A change through either reference affects the shared object.',
                'A char holds one UTF-16 code unit. A code unit is a 16-bit unit used to store text.',
                "Write a char literal with single quotes, such as 'A'.",
                'Some Unicode characters need two UTF-16 code units.',
                'Use an L suffix for a long literal, such as 3_000_000_000L. A literal is a value written directly in code.',
                'Decimal floating-point literals have type double by default. 1.5F has type float.',
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
        },
        {
            id: 'numeric-conversions',
            title: 'Choose the numeric type before calculating',
            bullets: [
                'Java can widen int to long without a cast. Widening changes a value to a type with a larger range.',
                'A cast requests a type conversion, such as (int) -3.9.',
                'A narrowing conversion, such as double to int, can lose information. Java requires a cast for this conversion.',
                'Casting a floating-point value to int removes its fractional part toward zero.',
                'Dividing two integers gives an integer result. Converting that result to double cannot restore the fraction.',
                'Convert an operand before division to get a floating-point result. An operand is a value that an operator uses.',
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
                'long result = 50_000 * 50_000 multiplies two ints before assignment. The result exceeds the int range and overflows. Make one operand a long before multiplying.',
                'Integer overflow does not automatically throw an exception. Use Math.addExact or Math.multiplyExact when you need to detect it.',
                'double cannot represent every decimal fraction exactly. Use BigDecimal with decimal-string inputs when you need exact decimal arithmetic.',
            ],
        },
        {
            id: 'wrappers-and-null',
            title: 'Wrapper types can hold null',
            bullets: [
                'Integer is a wrapper type. It stores an int value in an object. Other wrappers include Long, Double, Boolean, and Character.',
                'Boxing converts a primitive to a wrapper. Java can do this when you assign a primitive to a wrapper variable.',
                'Unboxing gets the primitive value from a wrapper. Java can do this when an operation needs a primitive.',
                'null means there is no referenced object. A reference variable can be null. A primitive cannot.',
                'Calling an instance method on null throws NullPointerException. Unboxing a null wrapper also throws NullPointerException.',
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
                'int count = missing fails when the program runs because missing is null. Check for null before unboxing when a value may be missing.',
                'Use equals for non-null wrapper objects. Use Objects.equals when either value may be null.',
                '== can compare whether two wrapper references point to the same object. It does not reliably compare their stored values.',
                'Integer.parseInt throws NumberFormatException for invalid text or a number outside the int range.',
            ],
        },
        {
            id: 'operators',
            title: 'Conditions use boolean values',
            bullets: [
                'Comparisons such as >= and == produce boolean values.',
                'Java does not use 0, an empty string, or an object as a boolean condition. Write an explicit comparison.',
                '&& checks the right operand only when the left operand is true.',
                '|| checks the right operand only when the left operand is false.',
                'This is called short-circuit evaluation. Java skips the right operand when the left operand already determines the result.',
                'The null check below prevents Java from calling isBlank on null.',
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
                '+ also concatenates strings, which means it joins text. "sum=" + 2 + 3 produces sum=23 because Java evaluates the operations from left to right.',
            ],
        },
        {
            id: 'packages-and-imports',
            title: 'Packages name classes; imports shorten names',
            bullets: [
                'A package gives a class a qualified name, such as study.Main. The name includes the package and the class.',
                'Write the package declaration before imports and class declarations.',
                'An import lets you use a short class name instead of its qualified name. It does not install a dependency.',
                'Save this example as src/study/Main.java. Run javac -d out src/study/Main.java from the directory containing src.',
                'Run java -cp out study.Main. The class path tells the launcher where to find compiled classes.',
                'Classes in java.lang, including String and System, need no explicit import.',
                'An import such as java.util.* imports accessible types from that package. It does not import types from subpackages.',
                'When you use javac, a public top-level class named Main belongs in Main.java.',
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
        },
    ],
};

export default note;
