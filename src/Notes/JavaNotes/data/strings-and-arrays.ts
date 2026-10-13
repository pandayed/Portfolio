import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'strings-and-arrays',
    title: 'Strings',
    summary: 'Compare text, read string positions, understand Unicode, and split text.',
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
            id: 'splitting-text',
            title: 'Split text into an array',
            bullets: [
                'split returns String[], a sequence of strings. Each element contains one part of the text.',
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
    ],
};

export default note;
