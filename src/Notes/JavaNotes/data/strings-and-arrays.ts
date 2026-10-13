import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'strings-and-arrays',
    title: 'Strings and arrays',
    summary: 'Compare and transform text, build strings, and read, copy, and traverse fixed-length arrays.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    sections: [
        {
            id: 'string-values',
            title: 'Strings are immutable objects',
            bullets: [
                'A String object stores text. Write String name = "Ana" to create a reference to text.',
                'A String is immutable. Its text cannot change after creation.',
                'strip, replace, and substring return a result without changing the original text. Store the returned value when you need it.',
                'Use equals to compare text contents. == checks whether two references point to the same object.',
                'Interning lets equal strings share one object. This can make == appear to work for text comparison. Use equals even when some strings share an object.',
                'Calling equals on null throws NullPointerException. "ready".equals(value) is safe when value may be null.',
                'Objects.equals(first, second) handles either value being null.',
                'final prevents assigning another String to the variable. The String class makes the text immutable, independently of final.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        String raw = "  Java  ";
        String cleaned = raw.strip();
        String other = new String("Java");

        System.out.println("[" + raw + "]");
        System.out.println("[" + cleaned + "]");
        System.out.println(cleaned.equals(other));
        System.out.println(cleaned == other);
    }
}`,
                result: '[  Java  ]\n[Java]\ntrue\nfalse',
            }],
        },
        {
            id: 'text-operations',
            title: 'String positions and methods',
            bullets: [
                'An index is a position in the string. The first position is 0.',
                'length() returns the number of UTF-16 code units. For ordinary English letters, each letter uses one unit.',
                'charAt(index) reads one UTF-16 code unit at that position.',
                'For a nonempty string, the last valid index is length() - 1. charAt(length()) throws StringIndexOutOfBoundsException.',
                'substring(start, end) includes start and excludes end.',
                'indexOf returns the first matching position. It returns -1 when there is no match.',
            ],
            examples: [{
                language: 'java',
                code: String.raw`public class Main {
    public static void main(String[] args) {
        String filename = "notes.java";
        System.out.println(filename.length());
        System.out.println(filename.charAt(0));
        System.out.println(filename.substring(0, 5));
        System.out.println(filename.indexOf(".java"));
        System.out.println(filename.indexOf(".txt"));
    }
}`,
                result: '10\nn\nnotes\n5\n-1',
            }],
        },
        {
            id: 'unicode-text',
            title: 'Unicode code units and code points',
            bullets: [
                'UTF-16 stores text in 16-bit code units.',
                'A code point is the number Unicode assigns to a character. Some code points need two UTF-16 code units.',
                'length() counts code units. codePointCount(start, end) counts code points in that range.',
                'charAt can return only one part of a two-unit code point. Use codePointAt when you need the full code point at an index.',
                'A character that a reader sees may contain several code points.',
            ],
            examples: [{
                language: 'java',
                code: String.raw`public class Main {
    public static void main(String[] args) {
        String symbol = "\uD83D\uDE00";
        System.out.println(symbol.length());
        System.out.println(symbol.codePointCount(0, symbol.length()));
    }
}`,
                result: '2\n1',
            }],
        },
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
                'An enhanced for loop reads each element: for (int score : scores). Iterable objects also support this loop.',
                'Changing score in that loop does not replace an array element. Assign scores[index] = value to replace it.',
                'Use i < scores.length when a loop reads scores[i]. i <= scores.length includes one index outside the array.',
            ],
            examples: [{
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
            }],
        },
        {
            id: 'splitting-text',
            title: 'Split text into an array',
            bullets: [
                'split returns a String array. Each element contains one part of the text.',
                'split accepts a regular expression, which is a pattern for matching text.',
                'A dot matches any character in a regular expression. Escape it to split on a dot itself.',
                'Java also uses backslashes in strings. Write "\\\\." in Java source to pass the pattern \\. to split.',
                'split discards trailing empty fields by default. Use split(",", -1) to keep them.',
                'Arrays.toString displays the elements of an array.',
            ],
            examples: [{
                language: 'java',
                code: String.raw`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        System.out.println(Arrays.toString("a.b".split("\\.")));
        System.out.println("a,b,".split(",").length);
        System.out.println("a,b,".split(",", -1).length);
    }
}`,
                result: '[a, b]\n2\n3',
            }],
        },
        {
            id: 'string-builder',
            title: 'StringBuilder accumulates text',
            bullets: [
                'StringBuilder is mutable, so its contents can change. append adds text to the same builder.',
                "toString returns a String with the builder's current contents. Later changes to the builder do not change that String.",
                'Use a builder when a loop joins many pieces of text. Ordinary + concatenation is readable for a small expression.',
                'String.join joins array elements with a chosen separator when no extra processing is needed.',
                'StringBuilder does not synchronize changes from multiple threads. It does not coordinate their access to its contents.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        String[] names = {"Ana", "Bo", "Cy"};
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < names.length; i++) {
            if (i > 0) builder.append(", ");
            builder.append(names[i]);
        }
        String result = builder.toString();
        builder.append("!");
        System.out.println(result);
        System.out.println(builder);
        System.out.println(String.join(" / ", names));
    }
}`,
                result: 'Ana, Bo, Cy\nAna, Bo, Cy!\nAna / Bo / Cy',
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
            }],
        },
    ],
};

export default note;
