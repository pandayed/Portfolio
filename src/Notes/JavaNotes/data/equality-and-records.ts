import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'equality-and-records',
    title: 'Equality and hash codes',
    summary: 'Compare reference identity and values, then implement the equals and hashCode contracts together.',
    scope: 'java',
    pointwise: true,
    exampleLayout: 'grouped',
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'identity-and-value',
            title: 'Reference equality and value equality answer different questions',
            bullets: [
                'For object references, == checks identity: both references point to the same object, or both are null.',
                'equals(Object other) uses the equality rule defined by the class.',
                'Object provides identity-based equals by default. String overrides it to compare text.',
                'Use String.equals to compare text. Java may reuse String objects, so == can sometimes be true even when the code creates separate references.',
                'Calling equals on a null reference throws NullPointerException.',
                'Objects.equals(a, b) handles null. It returns true for two null references and otherwise uses equals.',
                'Primitive == compares values. Between wrapper references such as two Integer variables, == compares identity.',
                'Use equals to compare values of wrappers of the same type.',
            ],
            examples: [{
                title: 'Compare two separate strings with the same text',
                description: [
                    'Compare separate String objects, a shared reference, and null references.',
                ],
                language: 'java',
                code: `import java.util.Objects;

public class Main {
    public static void main(String[] args) {
        String first = new String("Java");
        String second = new String("Java");
        String same = first;
        String missing = null;

        System.out.println(first == second);
        System.out.println(first.equals(second));
        System.out.println(first == same);
        System.out.println(Objects.equals(missing, "Java"));
        System.out.println(Objects.equals(null, null));
    }
}`,
                result: 'false\ntrue\ntrue\nfalse\ntrue',
                explanation: [
                    'first and second are separate objects, so first == second is false.',
                    'Their text matches, so first.equals(second) is true.',
                    'same points to first, so first == same is true.',
                    'Objects.equals returns false for null versus "Java", and true for two null references.',
                ],
            }],

        },
        {
            id: 'equals-hashcode',
            title: 'Override equals and hashCode together',
            bullets: [
                'A value class defines equality from its fields by overriding equals(Object other).',
                'equals(ProductCode other) is an overload. It does not override equals(Object other). Use @Override to catch a wrong signature.',
                'Equality must be reflexive: an object equals itself.',
                'Equality must be symmetric: if a equals b, b equals a.',
                'Equality must be transitive: if a equals b and b equals c, a equals c.',
                'Repeated comparisons must agree while the compared data stays unchanged.',
                'A non-null object must compare unequal to null.',
                'Override hashCode whenever you override equals.',
                'A hash code is an integer used by collections such as HashMap and HashSet to locate matching objects.',
                'Equal objects must have equal hash codes. Unequal objects can have the same hash code.',
                'instanceof checks whether an object has a compatible class type.',
                'Objects.requireNonNull returns its argument or throws NullPointerException when that argument is null.',
            ],
            examples: [{
                title: 'Compare product values and their hash codes',
                description: [
                    'Treat ProductCode objects with the same value as equal, with matching hash codes.',
                ],
                language: 'java',
                code: `import java.util.Objects;

final class ProductCode {
    private final String value;

    public ProductCode(String value) {
        this.value = Objects.requireNonNull(value);
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) {
            return true;
        }
        if (!(other instanceof ProductCode)) {
            return false;
        }
        ProductCode code = (ProductCode) other;
        return value.equals(code.value);
    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }
}

public class Main {
    public static void main(String[] args) {
        ProductCode first = new ProductCode("P-10");
        ProductCode second = new ProductCode("P-10");
        System.out.println(first == second);
        System.out.println(first.equals(second));
        System.out.println(first.hashCode() == second.hashCode());
    }
}`,
                result: 'false\ntrue\ntrue',
                explanation: [
                    'The constructor uses Objects.requireNonNull to reject a null value.',
                    'equals first checks identity, then uses instanceof to reject other types and null.',
                    'After the type check, the cast lets equals read the other ProductCode value.',
                    'first and second are separate objects, so == prints false. Their matching values make equals print true.',
                    'hashCode uses the same value field as equals, so the two hash codes match.',
                ],
            }],

        },
    ],
};

export default note;
