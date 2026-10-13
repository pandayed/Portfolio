import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'language-basics',
    title: 'Variables, final, constants, and data types',
    summary: 'Declare variables, compare data types, infer local types with var, and use final and constants.',
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
                    ['Class or interface type', 'Reference type for objects compatible with that type.'],
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
                'Name constants in uppercase with underscores, such as MAX_COUNT.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        final int MAX_COUNT = 10;
        final int count = 3;
        // count = 4; // A final variable cannot be assigned again.

        System.out.println(MAX_COUNT);
        System.out.println(count);
    }
}`,
                result: '10\n3',
            }],
        },
    ],
};

export default note;
