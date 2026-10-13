import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'type-erasure',
    title: 'Type erasure',
    summary: 'Understand generic runtime checks, erased signatures, and generic construction restrictions.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'type-erasure',
            title: 'Type erasure and runtime checks',
            bullets: [
                'Type erasure replaces type parameters with their bounds or Object in compiled code.',
                'The compiler checks generic types before erasure and inserts casts where needed.',
                'A normal list object does not check String or Integer element types at runtime.',
                'An unchecked cast or raw collection can cause heap pollution: a value does not match the element type declared by the reference.',
                'A later read of that value may throw ClassCastException.',
                'instanceof List<?> checks whether a value is a List. It does not check the element type.',
                'instanceof List<String> cannot check an arbitrary Object value and does not compile in the example below.',
                'Generic declarations can retain type information for reflection. Reflection inspects declared types at runtime; it does not make a list enforce its element type.',
            ],
            examples: [{
                title: 'List type arguments do not produce different classes',
                language: 'java',
                code: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        List<Integer> counts = new ArrayList<>();
        System.out.println(names.getClass() == counts.getClass());

        Object value = names;
        System.out.println(value instanceof List<?>);
        // value instanceof List<String> // Compile error.
    }
}`,
                result: 'Prints true, then true. Both objects are ArrayList instances. The second check establishes that value is a List, without checking its element type.',
            }],
        },
        {
            id: 'generic-restrictions',
            title: 'Restrictions caused by type erasure',
            bullets: [
                'You cannot construct new T(). Pass a factory that creates a value of type T.',
                'You cannot construct new T[3] or new List<String>[3]. Use a list of lists when you need nested generic collections.',
                'Methods that differ only by List<String> versus List<Integer> have the same parameter type after erasure. They cannot be overloads of the same name.',
                'Give those operations different method names.',
                'A generic class cannot extend Throwable. A catch parameter cannot be a type parameter.',
            ],
        },
    ],
};

export default note;
