import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'numeric-conversions',
    title: 'Numeric conversions and arithmetic',
    summary: 'Convert numeric types, divide numbers, and understand integer overflow and decimal precision.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    exampleLayout: 'grouped',
    sections: [
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
                title: 'Widen an integer and truncate a fraction',
                description: [
                    'Assign an int to a long and cast a negative double to int.',
                ],
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
                explanation: [
                    'Assigning count to widened preserves the value 7.',
                    'Casting -3.9 to int removes the fractional part toward zero, producing -3.',
                ],
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
                title: 'Keep the fraction when calculating an average',
                description: [
                    'Divide 7 by 2 in two ways, then square 50,000 using long arithmetic.',
                ],
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
                explanation: [
                    'total / people uses integer division and produces 3. Assignment to double then gives 3.0.',
                    'Casting total before division makes the division use floating-point arithmetic and produces 3.5.',
                    'The L suffix on 50_000L makes the multiplication use long arithmetic. The product is 2500000000.',
                ],
            }],
        },
    ],
};

export default note;
