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
            ],
            examples: [{
                code: [
                    'name = "Lal Bihari Pandey"',
                    'print(name[0])',
                    'print(name[-2])',
                    'print(name[2:6])',
                    'print(name[::2])',
                    'print(name[::-1])',
                ].join('\n'),
            }],
            exceptions: ['An out-of-range index raises IndexError. An out-of-range slice is clipped and does not raise that error.'],
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
                    'print(f"2 + 3 = {2 + 3}")',
                ].join('\n'),
            }],
        },
        {
            id: 'methods',
            title: 'Common string methods',
            examples: [{
                code: [
                    'name = "Lal Bihari Pandey"',
                    'print(name.upper())',
                    'print(name.lower())',
                    'print(name.title())',
                    '',
                    'padded = "  Word  "',
                    'print(padded.strip())',
                    'print(padded.find("rd"))',
                    'print(padded.replace("W", "L"))',
                    'print("Lal" in name)',
                ].join('\n'),
            }],
            exceptions: [
                'Strings are immutable. Methods return new strings. find returns -1 when text is absent; index raises ValueError instead.',
            ],
        },
    ],
};

export default note;
