import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'language-basics',
    title: 'Variables, final, constants, and data types',
    summary: 'Declare variables, choose data types, use final, and build expressions with operators.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    sections: [
        {
            id: 'declarations',
            title: 'Variables',
            bullets: [
                'A variable is a named place for a value. Its type determines which values it can hold.',
                'A declaration gives a variable a type and a name. int count = 3 also gives it an initial value.',
                'Use = to assign a value. Assigning again replaces the value held by the variable.',
                'Java checks types at compile time, before the program runs. An assigned value must be compatible with the variable type.',
                'A local variable is declared inside a method or a block. A block groups statements between braces.',
                'Give a local variable a value before reading it. Java does not give it a default value.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        int count = 3;
        count = 4;
        String unit = "books";

        System.out.println(count + " " + unit);
    }
}`,
                result: '4 books',
            }],
        },
        {
            id: 'primitives-and-references',
            title: 'Data types',
            bullets: [
                'Java has eight primitive types. A primitive variable holds its value directly.',
                'Reference types include strings, arrays, and classes. A reference identifies an object.',
                'An object is a value created from a class or an array type. Several references can identify the same object.',
                'null means that a reference does not identify an object. Primitive variables cannot hold null.',
            ],
            table: {
                columns: ['Data type', 'Info'],
                rows: [
                    ['byte', '8-bit signed integer. Range: -128 to 127.'],
                    ['short', '16-bit signed integer. Range: -32,768 to 32,767.'],
                    ['int', '32-bit signed integer. Range: -2,147,483,648 to 2,147,483,647.'],
                    ['long', '64-bit signed integer. Use an L suffix for a long value written in code, such as 3_000_000_000L.'],
                    ['float', '32-bit binary floating-point number. Some values are approximate. Use an F suffix for a float value written in code, such as 1.5F.'],
                    ['double', '64-bit binary floating-point number. Some values are approximate. A fractional number written in code has type double unless it has an F suffix.'],
                    ['char', 'One 16-bit UTF-16 code unit. Some Unicode characters need two code units.'],
                    ['boolean', 'Holds true or false.'],
                    ['String', 'Reference type for text. String objects are immutable: their text cannot change.'],
                    ['Array, such as int[]', 'Reference type for a fixed-length sequence. Its elements can change.'],
                    ['Class or interface type', 'Reference type for objects, such as a Counter instance or a List implementation.'],
                    ['Wrapper types', 'Byte, Short, Integer, Long, Float, Double, Character, and Boolean store primitive values in objects. They can hold null.'],
                ],
            },
        },
        {
            id: 'local-type-inference',
            title: 'Local type inference with var',
            bullets: [
                'var asks Java to infer a local variable type from its initial value.',
                'var available = true has type boolean. It does not let that variable change to another type later.',
                'var is available from Java 10. It needs an initial value, and that value cannot be null alone.',
                'You cannot use var as a method parameter type or return type.',
            ],
            examples: [{
                language: 'java',
                code: String.raw`public class Main {
    public static void main(String[] args) {
        var available = true;
        available = false;
        // available = "yes"; // String cannot be assigned to boolean.
        System.out.println(available);
    }
}`,
                result: 'false',
            }],
        },
        {
            id: 'constants',
            title: 'The final keyword and constants',
            bullets: [
                'The final keyword lets you assign a variable once. Java rejects a later assignment to that variable.',
                'A final variable can receive its value in its declaration or later. It must receive a value before it is read.',
                'A final reference cannot identify a different object after assignment. final does not prevent changes inside that object.',
                'A constant is a named fixed value.',
                'A field is a variable declared directly in a class. static makes that field belong to the class. Use static final for a class constant.',
                'Name constants in uppercase with underscores, such as MAX_COUNT.',
                'A compile-time constant is a final primitive or String variable initialized with a constant expression.',
                'A constant expression uses values that Java can calculate at compile time, such as 10 + 2.',
                'Not every final variable is a compile-time constant. A method result can be assigned once at runtime.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    static final int MAX_COUNT = 10;

    public static void main(String[] args) {
        final int count = 3;
        // count = 4; // A final variable cannot be assigned again.

        System.out.println(MAX_COUNT);
        System.out.println(count);
    }
}`,
                result: '10\n3',
            }],
        },
        {
            id: 'operators-and-conditions',
            title: 'Operators, expressions, and conditions',
            bullets: [
                'An operator performs an operation on values. Those values are its operands.',
                'An expression combines values and operators to produce a value, such as count + 1.',
                'A condition is an expression whose result is boolean: true or false.',
                '= assigns a value. == compares values. These operators have different jobs.',
                'Use parentheses to group an expression. Multiplication and division run before addition and subtraction.',
                'With a String operand, + joins text. Other + operations add numbers.',
                '&& and || use short-circuit evaluation. && skips the right side when the left side is false. || skips it when the left side is true.',
            ],
            table: {
                columns: ['Operator', 'Operation'],
                rows: [
                    ['+  -  *  /  %', 'Add, subtract, multiply, divide, and take the remainder.'],
                    ['==  !=  <  <=  >  >=', 'Compare values and return a boolean.'],
                    ['&&  ||  !', 'Boolean AND, OR, and NOT.'],
                    ['+=  -=  *=  /=  %=', 'Calculate and assign the result back to the variable.'],
                    ['++  --', 'Increase or decrease a variable by one. Prefix changes it before its expression value is used; postfix changes it afterward.'],
                ],
            },
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        int count = 3;
        count += 2;
        boolean enough = count >= 4;
        boolean even = count % 2 == 0;
        System.out.println(count);
        System.out.println(enough && !even);
        System.out.println("count=" + count);
    }
}`,
                result: '5\ntrue\ncount=5',
            }],
        },
        {
            id: 'numeric-conversions',
            title: 'Numeric conversions and casts',
            bullets: [
                'Java can widen int to long without a cast. Widening converts a value to a type that can represent a wider range.',
                'Some widening conversions can still lose precision, such as long to double.',
                'A cast requests a type conversion. (int) -3.9 converts a double to int.',
                'A narrowing conversion can lose information. Java requires a cast for double to int.',
                'Casting a floating-point value to int removes its fractional part toward zero.',
            ],
            examples: [{
                language: 'java',
                code: String.raw`public class Main {
    public static void main(String[] args) {
        int count = 7;
        long widened = count;
        int truncated = (int) -3.9;
        System.out.println(widened);
        System.out.println(truncated);
    }
}`,
                result: '7\n-3',
            }],
        },
        {
            id: 'numeric-arithmetic',
            title: 'Division, overflow, and decimal precision',
            bullets: [
                'Dividing two integers gives an integer result. Converting that result to double cannot restore the fraction.',
                'Convert an operand before division to get a floating-point result.',
                'long result = 50_000 * 50_000 multiplies two ints before assignment. The result exceeds the int range and overflows.',
                'A long operand makes that multiplication use long arithmetic.',
                'Integer overflow does not automatically throw an exception. Math.addExact and Math.multiplyExact throw ArithmeticException on overflow.',
                'double cannot represent every decimal fraction exactly. BigDecimal constructed from a decimal string represents that decimal value exactly.',
            ],
            examples: [{
                language: 'java',
                code: String.raw`public class Main {
    public static void main(String[] args) {
        int total = 7;
        int people = 2;
        double whole = total / people;
        double average = (double) total / people;
        long squared = 50_000L * 50_000;
        System.out.println(whole);
        System.out.println(average);
        System.out.println(squared);
    }
}`,
                result: '3.0\n3.5\n2500000000',
            }],
        },
        {
            id: 'copying-values',
            title: 'Copying primitive values and references',
            bullets: [
                'Assigning a primitive copies its value. Changing the copy does not change the original variable.',
                'Assigning a reference copies the reference. Both variables can then refer to the same object.',
                'An array is a fixed-length sequence. int[] declares an array of ints, and {10} creates one element.',
                'An array index is an element position. The first index is 0, so values[0] reads its first element.',
                'Changing a shared array through either reference changes the same array.',
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
            id: 'wrappers-and-null',
            title: 'Wrapper types, boxing, and null',
            bullets: [
                'Wrapper classes store primitive values in objects. Integer wraps int, and Boolean wraps boolean.',
                'Boxing converts a primitive to a wrapper. Java can do this when assigning a primitive to a wrapper variable.',
                'Unboxing gets the primitive value from a wrapper. Java can do this when an operation needs a primitive.',
                'A wrapper reference can hold null. Unboxing it then throws NullPointerException.',
                'Calling an instance method through a null reference also throws NullPointerException.',
            ],
            examples: [{
                language: 'java',
                code: String.raw`public class Main {
    public static void main(String[] args) {
        Integer stored = 12;       // boxing
        int next = stored + 1;     // unboxing
        Integer missing = null;
        System.out.println(next);
        System.out.println(missing == null);
        // int count = missing; // Unboxing null throws NullPointerException.
    }
}`,
                result: '13\ntrue',
            }],
        },
        {
            id: 'wrapper-comparison-and-parsing',
            title: 'Compare wrapper values and parse integer text',
            bullets: [
                'equals compares wrapper values. == between two wrapper references compares object identity.',
                'Objects.equals handles null references. Import java.util.Objects to use it.',
                'Integer.parseInt converts integer text to int.',
                'Invalid text or a number outside the int range throws NumberFormatException.',
            ],
            examples: [{
                language: 'java',
                code: String.raw`import java.util.Objects;

public class Main {
    public static void main(String[] args) {
        Integer first = 200;
        Integer second = 200;
        Integer missing = null;
        System.out.println(first.equals(second));
        System.out.println(Objects.equals(first, missing));
        System.out.println(Integer.parseInt("42"));
    }
}`,
                result: 'true\nfalse\n42',
            }],
        },
    ],
};

export default note;
