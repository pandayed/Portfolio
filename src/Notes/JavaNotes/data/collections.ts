import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'collections',
    title: 'Collections overview',
    summary: 'Compare collection interfaces, ordering, and implementation costs.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'choose-collection',
            title: 'Collection interfaces',
            bullets: [
                'A collection stores a group of objects. Its interface defines the available operations.',
                'An implementation is a class that provides those operations, such as ArrayList for List.',
                'List stores a sequence of elements with indexes. It allows duplicates.',
                'Set stores distinct elements. Map associates each distinct key with one value.',
                'Map belongs to the collections framework, but it does not extend Collection.',
                'Queue supports waiting elements. Deque supports adding and removing at both ends.',
                'Generic type arguments specify element types, or key and value types: List<String> and Map<String, Integer>.',
                'Declare a variable with the interface when you need only its operations: List<String> names = new ArrayList<>();',
                'Null support depends on the implementation.',
                'List, Set, and Map do not guarantee thread safety. Shared mutable collections need coordination between threads.',
            ],
        },
        {
            id: 'collection-implementations',
            title: 'Collection implementations',
            bullets: [
                'Choose an implementation by the ordering and operations you need.',
                'Constant time means the number of steps does not grow with the collection size.',
                'Amortized constant time describes the average cost across many operations. Occasional resizing can take more work.',
                'Logarithmic time means doubling the collection size adds roughly a fixed number of steps.',
                'Natural order comes from the element type. A Comparator supplies a separate rule for comparing two values.',
            ],
            table: {
                columns: ['Implementation', 'Order and operations'],
                rows: [
                    ['ArrayList', 'Index order. Constant-time get and set. Amortized constant-time append. Middle insertions and removals shift later elements.'],
                    ['HashSet', 'Distinct elements. Uses hash codes for lookup. No guaranteed iteration order.'],
                    ['LinkedHashSet', 'Distinct elements in insertion order.'],
                    ['TreeSet', 'Elements in natural or Comparator order. Core lookup and update operations take logarithmic time.'],
                    ['HashMap', 'Key-value lookup using hash codes. No guaranteed iteration order.'],
                    ['LinkedHashMap', 'Key-value pairs in insertion order by default.'],
                    ['TreeMap', 'Keys in natural or Comparator order. Core lookup and update operations take logarithmic time.'],
                    ['ArrayDeque', 'Queue and stack operations at the ends. Avoids shifting elements when removing the first item.'],
                ],
            },
        },
    ],
};

export default note;
