import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'wrapper-types',
    title: 'Wrapper types',
    summary: 'Box and unbox primitive values, handle null, compare wrapper values, and parse integer text.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    exampleLayout: 'grouped',
    sections: [
        {
            id: 'wrappers-and-null',
            title: 'Wrapper types, boxing, and null',
            bullets: [
                'Wrapper classes store primitive values in objects.',
                'Boxing converts a primitive to a wrapper. Java can do this when assigning a primitive to a wrapper variable.',
                'Unboxing gets the primitive value from a wrapper. Java can do this when an operation needs a primitive.',
                'A wrapper reference can hold null. Unboxing it then throws NullPointerException.',
                'Calling an instance method through a null reference also throws NullPointerException.',
            ],
            table: {
                columns: ['Primitive type', 'Wrapper class'],
                rows: [
                    ['byte', 'Byte'],
                    ['short', 'Short'],
                    ['int', 'Integer'],
                    ['long', 'Long'],
                    ['float', 'Float'],
                    ['double', 'Double'],
                    ['char', 'Character'],
                    ['boolean', 'Boolean'],
                ],
            },
            examples: [{
                title: 'Box a number and check a missing value',
                description: [
                    'Store 12 in an Integer, use it in arithmetic, and check a null wrapper.',
                ],
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
                explanation: [
                    'Assigning 12 to stored boxes the int value. stored + 1 unboxes it and produces 13.',
                    'missing == null checks the reference without unboxing it, so it prints true.',
                    'The commented assignment would unbox missing and throw NullPointerException.',
                ],
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
                title: 'Compare wrapper values and parse text',
                description: [
                    'Compare two Integer values and a missing reference, then parse "42".',
                ],
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
                explanation: [
                    'first.equals(second) compares their values, so it prints true.',
                    'Objects.equals(first, missing) safely compares a number with null and prints false.',
                    'Integer.parseInt("42") returns the int value 42.',
                ],
            }],
        },
    ],
};

export default note;
