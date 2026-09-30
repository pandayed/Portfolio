import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'strings',
    title: 'Strings',
    summary: 'Index, slice, format, escape, and search immutable text.',
    updatedOn: '2026-09-20',
    sections: [
        {
            id: 'indexing-slicing',
            title: 'Indexing and slicing',
            bullets: [
                'Index 0 is the first character.',
                'A negative index counts from the end. -1 is the last character.',
                'The slice stop index is excluded.',
                'A slice can include a step. A step of -1 reverses the string.',
                'An index must point to a character in the string. Slices are clipped to the available characters.',
            ],
            examples: [{
                code: [
                    'name = "Lal Bihari Pandey"',
                    'print(name[0])  # L',
                    'print(name[-2])  # e',
                    'print(name[2:6])  # l Bi',
                    'print(name[::2])  # LlBhr ady',
                    'print(name[::-1])  # yednaP irahiB laL',
                ].join('\n'),
            }],
        },
        {
            id: 'literals-escapes',
            title: 'Literals and escape sequences',
            examples: [{
                code: [
                    'single = \'Python is "cool"\'',
                    'escaped = "A quote: \\" and a slash: \\\\"',
                    'multiline = """Line one',
                    'Line two"""',
                ].join('\n'),
            }],
        },
        {
            id: 'formatted-strings',
            title: 'Formatted strings',
            paragraphs: ['An f-string evaluates expressions inside braces and inserts their formatted values.'],
            examples: [{
                code: [
                    'first = "Lal"',
                    'middle = "Bihari"',
                    'full = f"{first} {middle}"',
                    'print(f"2 + 3 = {2 + 3}")  # 2 + 3 = 5',
                ].join('\n'),
            }],
        },
        {
            id: 'methods',
            title: 'Common string methods',
            examples: [{
                code: [
                    'name = "Lal Bihari Pandey"',
                    'print(name.upper())  # LAL BIHARI PANDEY',
                    'print(name.lower())  # lal bihari pandey',
                    'print(name.title())  # Lal Bihari Pandey',
                    '',
                    'padded = "  Word  "',
                    'print(padded.strip())  # Word',
                    'print(padded.find("rd"))  # 4',
                    'print(padded.replace("W", "L"))  # "  Lord  " (two spaces around Lord)',
                    'print("Lal" in name)  # True',
                ].join('\n'),
            }],
            bullets: ['Strings are immutable. Methods return new strings.', 'find returns -1 when text is absent. index raises ValueError instead.'],
        },
    ],
};

export default note;
