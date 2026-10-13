import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'arrays',
    title: 'Arrays',
    summary: 'Create fixed-length arrays, access their elements, copy and compare arrays, and use nested arrays.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    exampleLayout: 'grouped',
    sections: [
        {
            id: 'array-basics',
            title: 'Arrays have a fixed length and zero-based positions',
            bullets: [
                'An array stores elements of one component type. The component type is the type declared for its elements.',
                'Declare an int array with int[] scores. new int[3] creates three elements. {8, 5, 9} creates an array with those values.',
                'Java fixes the length when it creates the array.',
                "An index is an element's position. Valid indices run from 0 to length - 1.",
                'Reading or writing outside that range throws ArrayIndexOutOfBoundsException.',
                'New int array elements start at 0. New boolean array elements start at false. New reference array elements start at null.',
                "An array's length is a field. Write values.length, without parentheses.",
                'Arrays.toString displays array elements. Import java.util.Arrays to use it.',
                'An enhanced for loop reads each element: for (int score : scores). Iterable objects also support this loop.',
                'Changing score in that loop does not replace an array element. Assign scores[index] = value to replace it.',
                'Use i < scores.length when a loop reads scores[i]. i <= scores.length includes one index outside the array.',
            ],
            examples: [{
                title: 'Fill an array and add its elements',
                description: [
                    'Create three scores, print their length and contents, and calculate their total.',
                ],
                language: 'java',
                code: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] scores = new int[3];
        scores[0] = 8;
        scores[1] = 5;
        scores[2] = 9;
        int total = 0;
        for (int score : scores) total += score;

        System.out.println(scores.length);
        System.out.println(Arrays.toString(scores));
        System.out.println(total);

        String[] names = new String[1];
        System.out.println(names[0] == null);
    }
}`,
                result: '3\n[8, 5, 9]\n22\ntrue',
                explanation: [
                    'scores contains 8, 5, and 9. Its length is 3.',
                    'The enhanced for loop reads each score and adds it to total, producing 22.',
                    'Arrays.toString prints the elements in brackets.',
                    'names contains one reference element. It starts as null, so names[0] == null prints true.',
                ],
            }],
        },
        {
            id: 'copying-values',
            title: 'Primitive values are copied independently',
            bullets: [
                'Assigning a primitive copies its value. Changing the copy does not change the original variable.',
            ],
            examples: [{
                title: 'Change a copied primitive value',
                description: [
                    'Copy an integer and change only the copy.',
                ],
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        int original = 10;
        int copy = original;
        copy = 20;

        System.out.println(original + " " + copy);
    }
}`,
                result: '10 20',
                explanation: [
                    'copy receives the value 10 from original.',
                    'Assigning 20 to copy leaves original at 10. Printing both values gives 10 20.',
                ],
            }],
        },
        {
            id: 'array-copy-and-equality',
            title: 'Assignment shares an array; copying creates another array',
            bullets: [
                'Assigning one array variable to another copies the reference. Both variables then share the same array.',
                'Arrays.copyOf creates a new array and copies the elements.',
                'For reference elements, the copied references still point to the same objects. Changing a shared mutable object can affect both arrays.',
                'This is a shallow copy. Java copies the array without copying each object.',
                'Arrays.equals compares the contents of one-dimensional arrays.',
                'Calling equals on an array, or using ==, checks whether the references point to the same array.',
                'Arrays.sort changes the supplied array.',
            ],
            examples: [{
                title: 'Compare a shared array with a separate copy',
                description: [
                    'Assign an array reference, copy its elements, and change the two arrays.',
                ],
                language: 'java',
                code: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] original = {3, 1, 2};
        int[] alias = original;
        int[] copy = Arrays.copyOf(original, original.length);
        alias[0] = 9;
        Arrays.sort(copy);

        System.out.println(Arrays.toString(original));
        System.out.println(Arrays.toString(copy));
        System.out.println(original == alias);
        System.out.println(Arrays.equals(copy, new int[] {1, 2, 3}));
    }
}`,
                result: '[9, 1, 2]\n[1, 2, 3]\ntrue\ntrue',
                explanation: [
                    'alias and original refer to the same array. Setting alias[0] to 9 changes original to [9, 1, 2].',
                    'Arrays.copyOf creates a separate array before that change. Sorting copy gives [1, 2, 3].',
                    'original == alias is true because both references identify the same array.',
                    'Arrays.equals checks the elements of copy against [1, 2, 3], so it prints true.',
                ],
            }],
        },
        {
            id: 'nested-arrays',
            title: 'A two-dimensional array is an array of arrays',
            bullets: [
                'A two-dimensional array is an array of arrays. int[][] holds references to int[] rows.',
                "Rows can have different lengths. This is called a ragged array. Read each row's length when looping through it.",
                'A row can be null if it has not been created.',
                'Use Arrays.deepToString to display nested arrays. Use Arrays.deepEquals to compare their nested contents.',
                'Copying only the outer array still shares its rows.',
                'new int[3][] creates three null row references. Create each row before accessing its elements.',
                'new int[3][2] creates three rows with two int elements in each row.',
            ],
            examples: [{
                title: 'Read rows with different lengths',
                description: [
                    'Print the length and sum of each row in a nested array.',
                ],
                language: 'java',
                code: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[][] rows = {{1, 2}, {3}, {4, 5, 6}};
        for (int[] row : rows) {
            int total = 0;
            for (int value : row) total += value;
            System.out.println("length=" + row.length + ", total=" + total);
        }
        System.out.println(Arrays.deepToString(rows));
    }
}`,
                result: 'length=2, total=3\nlength=1, total=3\nlength=3, total=15\n[[1, 2], [3], [4, 5, 6]]',
                explanation: [
                    'rows contains three arrays with lengths 2, 1, and 3.',
                    'The outer loop selects a row. The inner loop adds its values, producing totals 3, 3, and 15.',
                    'total starts at 0 for each row.',
                    'Arrays.deepToString prints all three rows and their elements.',
                ],
            }],
        },
    ],
};

export default note;
