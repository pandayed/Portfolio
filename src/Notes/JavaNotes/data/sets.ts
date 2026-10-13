import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'sets',
    title: 'Sets',
    summary: 'Store distinct elements and understand how equality and ordering determine uniqueness.',
    scope: 'java',
    exampleLayout: 'grouped',
    pointwise: true,
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'set-operations',
            title: 'Add and find distinct elements',
            bullets: [
                'A Set stores distinct elements rather than indexed positions.',
                'add returns true for a new element. It returns false when an equal element is already present.',
                'contains checks whether an equal element exists. remove deletes an equal element if it exists.',
                'HashSet has no guaranteed iteration order. LinkedHashSet preserves insertion order.',
                'An enhanced for loop reads each element. The implementation determines its iteration order.',
            ],
            examples: [{
                title: 'Keep each tag once',
                description: [
                    'Add two tags, then try to add java again.',
                ],
                language: 'java',
                code: `import java.util.LinkedHashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<String> tags = new LinkedHashSet<>();
        tags.add("java");
        tags.add("backend");
        System.out.println(tags.add("java"));
        System.out.println(tags);
        System.out.println(tags.contains("backend"));
    }
}`,
                result: 'false\n[java, backend]\ntrue',
                explanation: [
                    'The second java insertion returns false because java is already present.',
                    'LinkedHashSet prints the tags in insertion order.',
                    'contains("backend") returns true because backend is in the set.',
                ],
            }],
        },
        {
            id: 'set-equality',
            title: 'Equality determines uniqueness',
            bullets: [
                'HashSet uses equals and hashCode to identify equal elements.',
                'Do not change fields used by equals or hashCode while an object is in the set. Lookup may use a different hash from the one used at insertion.',
                'TreeSet uses natural order or a Comparator to compare elements. A comparison result of zero means the set treats the elements as equivalent.',
                'Make that comparison agree with equals when you need the normal Set equality rules.',
            ],
        },
        {
            id: 'set-factories',
            title: 'Create an unmodifiable set',
            bullets: [
                'Set.of(...) creates an unmodifiable set. Adding or removing elements throws UnsupportedOperationException.',
                'Set.of rejects null elements and duplicate arguments.',
                'Set.of does not guarantee argument order during iteration.',
                'The set can still contain mutable objects. Unmodifiable membership does not prevent those objects from changing.',
            ],
        },
    ],
};

export default note;
