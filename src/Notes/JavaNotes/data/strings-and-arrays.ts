import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'strings-and-arrays',
    title: 'Strings and arrays',
    summary: 'Compare and transform text, build strings, and read, copy, and traverse fixed-length arrays.',
    scope: 'java',
    updatedOn: '2026-10-05',
    sections: [
        {
            id: 'string-values',
            title: 'Strings are immutable objects',
            paragraphs: [
                'A String object holds text that cannot change after creation. Methods such as strip, replace, and substring return a result without changing the original text. Store the returned value when you need it.',
                'Use equals to compare text contents. == compares whether two references refer to the same object. Some equal strings share an object through interning, so == can appear to work and still be the wrong comparison.',
            ],
            examples: [{
                title: 'Main.java',
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
            pitfalls: [
                'Calling equals on a null variable throws NullPointerException. "ready".equals(value) is safe for a possibly null value. Objects.equals(first, second) handles either operand being null.',
                'final String prevents reassigning the variable. String immutability comes from the String class, independently of final.',
            ],
        },
        {
            id: 'text-operations',
            title: 'String positions use UTF-16 indices',
            paragraphs: [
                'length() counts UTF-16 code units. charAt(index) reads one code unit. substring(start, end) includes start and excludes end. These indices do not always correspond to whole Unicode characters.',
                'indexOf returns the first matching position or -1 when it finds no match. split accepts a regular expression. Escape regex characters when you want a literal separator.',
            ],
            examples: [{
                title: 'Main.java',
                language: 'java',
                code: String.raw`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        String filename = "notes.java";
        System.out.println(filename.substring(0, 5));
        System.out.println(filename.indexOf(".java"));
        System.out.println(filename.indexOf(".txt"));
        System.out.println(Arrays.toString("a.b".split("\\.")));

        String symbol = "\uD83D\uDE00";
        System.out.println(symbol.length());
        System.out.println(symbol.codePointCount(0, symbol.length()));
    }
}`,
                result: 'notes\n5\n-1\n[a, b]\n2\n1',
            }],
            bullets: [
                'The symbol is one Unicode code point represented by two UTF-16 code units. User-perceived characters can be more complex and may contain several code points.',
                'split discards trailing empty fields by default. Use split(",", -1) when a final empty field must be preserved.',
            ],
            pitfalls: ['charAt(length()) is out of bounds. The last valid charAt index is length() - 1 for a nonempty string.'],
        },
        {
            id: 'string-builder',
            title: 'StringBuilder accumulates text',
            paragraphs: [
                'StringBuilder is mutable. append adds text to the same builder. toString returns a String containing its current contents. Use a builder when a loop assembles many pieces of text.',
                'Ordinary + concatenation is readable for a small expression. A builder makes repeated accumulation explicit. StringBuilder does not provide synchronization for concurrent mutation.',
            ],
            examples: [{
                title: 'Main.java',
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
            pitfalls: ['Keep mutable builders local to the operation when possible. The String already returned by toString does not change when the builder changes.'],
        },
        {
            id: 'array-basics',
            title: 'Arrays have a fixed length and zero-based positions',
            paragraphs: [
                'An array stores elements of one component type. Its length is fixed when the array is created. Valid indices run from 0 through length - 1. Reading or writing outside that range throws ArrayIndexOutOfBoundsException.',
                'New int array elements start at 0. New boolean array elements start at false. New reference array elements start at null. The array length is a field, so write values.length rather than values.length().',
            ],
            examples: [{
                title: 'Main.java',
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
            pitfalls: ['for (int i = 0; i <= scores.length; i++) attempts to access one position too far if the body reads scores[i]. Use i < scores.length.'],
        },
        {
            id: 'array-copy-and-equality',
            title: 'Assignment shares an array; copying creates another array',
            paragraphs: [
                'Assigning an array variable to another variable shares the same array. Arrays.copyOf creates a new array and copies the elements. For reference elements, those copied values still refer to the same objects. This is a shallow copy.',
                'Arrays.equals compares one-dimensional array contents. Array.equals and == compare array identity. Arrays.sort changes the supplied array in place.',
            ],
            examples: [{
                title: 'Main.java',
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
            pitfalls: ['Arrays.copyOf on an array of mutable objects does not copy each object. Mutating an element object may still be visible through both arrays.'],
        },
        {
            id: 'nested-arrays',
            title: 'A two-dimensional array is an array of arrays',
            paragraphs: [
                'int[][] holds references to int[] rows. Rows can have different lengths. A row can also be null if it has not been created. Read each row length when traversing a ragged array.',
                'Use Arrays.deepToString to display nested arrays and Arrays.deepEquals to compare their nested contents. Copying only the outer array still shares its rows.',
            ],
            examples: [{
                title: 'Main.java',
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
            pitfalls: ['new int[3][] creates three null row references. Create each row before indexing it. new int[3][2] creates three rows with two int elements each.'],
        },
    ],
};

export default note;
