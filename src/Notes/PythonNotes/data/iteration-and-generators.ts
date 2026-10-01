import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'iteration-and-generators',
    title: 'Iterables, iterators, and generators',
    summary: 'Use iter() and next(), understand yield, and choose between a list and a generator expression.',
    updatedOn: '2026-10-01',
    sections: [
        {
            id: 'iterables-and-iterators',
            title: 'Iterable versus iterator',
            paragraphs: [
                'An iterable can provide an iterator. Lists, strings, dictionaries, and range objects are iterables. An iterator keeps its position and provides the next value on request. Every iterator is also iterable, but a list is not itself an iterator.',
                'iter(iterable) gets an iterator. next(iterator) asks for one value and advances that iterator. When no values remain, next() raises StopIteration. A for loop calls iter() and next() for you and ends when it receives StopIteration.',
            ],
            examples: [{
                title: 'Get values one at a time',
                code: [
                    'numbers = [10, 20]',
                    'cursor = iter(numbers)',
                    'print(next(cursor))',
                    'print(next(cursor))',
                    '',
                    'try:',
                    '    next(cursor)',
                    'except StopIteration:',
                    '    print("No values left")',
                    '',
                    'print(list(iter(numbers)))',
                ].join('\n'),
                result: 'The lines print 10, 20, No values left, and [10, 20]. The final iter(numbers) makes a new iterator over the list. It does not reset the exhausted cursor.',
            }],
            bullets: [
                'Calling iter() on the same list again gives a new iterator. Calling iter() on an iterator returns that same iterator, with its current position.',
                'An iterator normally supports one pass. To repeat a pass, get a new iterator from a reusable iterable or recreate the source.',
            ],
        },
        {
            id: 'generator-functions',
            title: 'Generator functions and yield',
            paragraphs: [
                'A function containing yield is a generator function. Calling it returns a generator iterator without running its body yet. Each next() resumes the function until it yields a value. The generator keeps its local variables and position between yields.',
                'yield sends one value to the caller and pauses. return ends the function. In an ordinary function, return sends back the result of that call. In a generator, return ends iteration; a for loop then stops. A generator is exhausted after one pass.',
            ],
            examples: [{
                title: 'Execution pauses at yield',
                code: [
                    'def count_to_three():',
                    '    print("started")',
                    '    for number in range(1, 4):',
                    '        yield number',
                    '    print("done")',
                    '',
                    'numbers = count_to_three()',
                    'print("created")',
                    'print(next(numbers))',
                    'print(list(numbers))',
                    'print(list(numbers))',
                ].join('\n'),
                result: 'The lines print created, started, 1, done, [2, 3], and []. Creating numbers does not run the function body. The first next() reaches the first yield. The first list() consumes the remaining values. The second list() sees an exhausted generator.',
            }],
            bullets: [
                'Use a generator when values can be produced one at a time, such as processing a large file or a stream. It can avoid storing every produced value at once.',
                'A generator does not automatically make the whole program use constant memory. The input or the code collecting its output may still store all values.',
            ],
        },
        {
            id: 'list-versus-generator-expression',
            title: 'List comprehension versus generator expression',
            paragraphs: [
                'Square brackets build a list immediately. Parentheses create a generator expression that calculates each value when the iterator advances. Both expressions below would produce the same doubled values in the same order when fully consumed.',
            ],
            examples: [{
                title: 'The million-value case',
                code: [
                    'doubled_list = [x * 2 for x in range(1_000_000)]',
                    'doubled_generator = (x * 2 for x in range(1_000_000))',
                ].join('\n'),
                result: 'doubled_list holds one million computed integers. doubled_generator holds an iterator that has not computed those doubled integers yet. For this range-based example, the list uses memory that grows with the number of values; the generator uses a small amount of state while values are consumed one at a time.',
            }, {
                title: 'See when values are produced',
                code: [
                    'values = (x * 2 for x in range(3))',
                    'print(next(values))',
                    'print(list(values))',
                    'print(list(values))',
                    '',
                    'saved = [x * 2 for x in range(3)]',
                    'print(saved)',
                    'print(saved)',
                ].join('\n'),
                result: 'The lines print 0, [2, 4], [], [0, 2, 4], and [0, 2, 4]. The generator is consumed once; the list keeps its values for repeated use and supports indexing.',
            }],
            bullets: [
                'Choose a list when you need all results now, indexing, or repeated passes.',
                'Choose a generator expression when you can process values in one pass and want to avoid storing all computed results. Calling list() on it builds a list and uses memory for those results.',
            ],
        },
    ],
};

export default note;
