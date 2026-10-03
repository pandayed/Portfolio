import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'language-fundamentals',
    title: 'Language fundamentals',
    summary: 'Read basic Python code: comments, values, names, statements, print calls, and indentation.',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'first-lines',
            title: 'Read a small program',
            paragraphs: [
                'A Python program contains instructions written in a .py file. This example gives a name to some text, then displays that text.',
            ],
            examples: [{
                title: 'Python code',
                code: 'name = "Ada"\nprint(name)',
            }, {
                title: 'Output',
                language: 'text',
                code: 'Ada',
            }],
            bullets: [
                '"Ada" is a string: a value containing text. The quotes mark where the text starts and ends.',
                'name = "Ada" assigns that value to the variable name. = means assignment.',
                'print(name) calls the built-in print function to display the value assigned to name. A function is a named operation you can ask Python to perform.',
                'The quotes belong to the code. print displays the text without those surrounding quotes.',
            ],
        },
        {
            id: 'comments',
            title: 'Comments start with #',
            paragraphs: [
                'A comment is a note for the reader. Outside a string, # begins a comment that continues to the end of the line. Python does not execute the comment.',
            ],
            examples: [{
                code: [
                    '# Display a greeting.',
                    'print("Hello")  # A comment can follow code.',
                    'print("# is text here")',
                    '',
                    '# For a comment covering several lines,',
                    '# start each line with #.',
                ].join('\n'),
            }, {
                title: 'Output',
                language: 'text',
                code: 'Hello\n# is text here',
            }],
            exceptions: [
                'Triple quotes, such as """text""", create a string. They do not create a multiline comment. Use # on each line for comments.',
            ],
        },
        {
            id: 'statements-expressions',
            title: 'Statements, expressions, and order',
            paragraphs: [
                'An expression produces a value. For example, 2 + 3 produces 5. A statement is an instruction, such as assigning that value to a name.',
                'In a simple sequence, Python executes statements from top to bottom. Write one statement per line. A semicolon at the end is not required. Blank lines can separate related instructions.',
            ],
            examples: [{
                code: [
                    'total = 2 + 3',
                    'print(total)',
                    '',
                    'total = 10',
                    'print(total)',
                ].join('\n'),
            }, {
                title: 'Output',
                language: 'text',
                code: '5\n10',
            }],
            bullets: [
                'The first statement evaluates 2 + 3 and assigns its result to total.',
                'The next statement displays the current value. A later assignment changes the value used by the next print call.',
                'Writing 2 + 3 by itself in a .py file does not display 5. Use print(2 + 3) when you want to display the result.',
            ],
        },
        {
            id: 'values',
            title: 'Recognize basic values',
            paragraphs: [
                'A literal writes a value directly in the code. You will see these forms in the next notes.',
            ],
            bullets: [
                '10 is an integer (int): a whole number.',
                '3.5 is a floating-point number (float): a number written with a decimal point.',
                '"Hello" and \'Hello\' are strings (str). Both quote styles can enclose text.',
                'True and False are Boolean values (bool). Use their capital letters exactly as shown.',
                'None represents the absence of a value. It is different from zero or an empty string.',
                '"10" is text because it is quoted. 10 is a number.',
            ],
        },
        {
            id: 'names-and-text',
            title: 'Names are different from quoted text',
            paragraphs: [
                'A name without quotes asks Python to look up its value. Quoted text is used as written.',
            ],
            examples: [{
                code: 'name = "Ada"\nprint(name)\nprint("name")',
            }, {
                title: 'Output',
                language: 'text',
                code: 'Ada\nname',
            }],
            bullets: [
                'Use descriptive names such as student_name or total. In ordinary English names, use letters, digits, and underscores. The first character cannot be a digit.',
                'Names are case-sensitive: name and Name are different names.',
                'Words such as if, for, and class are keywords with a meaning in Python syntax. You cannot use these as variable names.',
            ],
            exceptions: [
                'If only name has been assigned, print(Name) raises NameError. Python cannot find a value for the differently capitalized name.',
            ],
        },
        {
            id: 'print',
            title: 'Function calls and print output',
            paragraphs: [
                'A function call writes a function name followed by parentheses. The values inside the parentheses are its arguments: the inputs passed to the function.',
                'print can take several arguments separated by commas. By default, it places a space between their displayed values and starts a new line after each call.',
            ],
            examples: [{
                code: 'print("Total:", 2 + 3)\nprint("Finished")',
            }, {
                title: 'Output',
                language: 'text',
                code: 'Total: 5\nFinished',
            }],
            exceptions: [
                'Close every opening parenthesis and string quote. For example, print("Hello") needs both its closing quote and its closing parenthesis.',
            ],
        },
        {
            id: 'indentation',
            title: 'Indentation groups a block of code',
            paragraphs: [
                'A block is a group of statements that belong together. Python uses indentation, the spaces at the beginning of a line, to mark a block.',
                'In this example, if checks a condition. True is always true, so Python runs the indented block. The colon at the end of if True: introduces that block.',
            ],
            examples: [{
                code: [
                    'if True:',
                    '    print("Inside the block")',
                    '    print("Still inside")',
                    '',
                    'print("After the block")',
                ].join('\n'),
            }, {
                title: 'Output',
                language: 'text',
                code: 'Inside the block\nStill inside\nAfter the block',
            }],
            bullets: [
                'Both indented print calls belong to the if block. They have the same indentation.',
                'The last print call returns to the previous indentation level, so it is outside the block.',
                'Use four spaces per indentation level. This is the standard Python style. Configure your editor to insert spaces and keep indentation consistent.',
            ],
            exceptions: [
                'A block cannot be left without an indented statement. Missing indentation after if True: raises IndentationError. Inconsistent mixing of tabs and spaces can raise TabError.',
            ],
        },
        {
            id: 'continued-lines',
            title: 'Split a long call across lines',
            paragraphs: [
                'Inside parentheses, one expression can continue over several lines. This example is one print call, even though it occupies four lines of code.',
            ],
            examples: [{
                code: 'print(\n    "Total:",\n    2 + 3,\n)',
            }, {
                title: 'Output',
                language: 'text',
                code: 'Total: 5',
            }],
            bullets: [
                'The indentation here makes the arguments easy to read. It does not create a block.',
                'The final comma is allowed. The closing parenthesis ends the call.',
            ],
        },
        {
            id: 'next-notes',
            title: 'Continue with the next notes',
            bullets: [
                [{ text: 'Variables and types', href: '#/notes/python/variables-and-types' }, ': how names refer to values and what a type means.'],
                [{ text: 'Numbers and conversion', href: '#/notes/python/numbers-and-conversion' }, ': arithmetic, input, and converting values.'],
                [{ text: 'Strings', href: '#/notes/python/strings' }, ': working with text.'],
                [{ text: 'Conditionals', href: '#/notes/python/conditionals' }, ': choosing which block runs.'],
                [{ text: 'Loops and range', href: '#/notes/python/loops-and-range' }, ': repeating instructions.'],
            ],
        },
        {
            id: 'references',
            title: 'References',
            bullets: [
                [{ text: 'Python tutorial: introduction', href: 'https://docs.python.org/3/tutorial/introduction.html' }, ': values, comments, and assignment.'],
                [{ text: 'Python language reference: lexical analysis', href: 'https://docs.python.org/3/reference/lexical_analysis.html' }, ': names, indentation, and continued lines.'],
                [{ text: 'Python documentation: print', href: 'https://docs.python.org/3/library/functions.html#print' }, ': arguments and default output formatting.'],
                [{ text: 'PEP 8: indentation', href: 'https://peps.python.org/pep-0008/#indentation' }, ': the four-space style convention.'],
            ],
        },
    ],
};

export default note;
