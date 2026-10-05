import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'equality-and-records',
    title: 'Equality, immutable values, and records',
    summary: 'Compare identity and values correctly, pair equals with hashCode, and understand what records make immutable.',
    scope: 'java',
    updatedOn: '2026-10-05',
    sections: [
        {
            id: 'identity-and-value',
            title: 'Reference equality and value equality answer different questions',
            paragraphs: [
                'For reference operands, == checks whether both references identify the same object, or both are null. equals checks the equality rule implemented by the class. Object’s default equals uses identity. String overrides it to compare text.',
                'Each complete example is a separate Main.java file. Compile with javac Main.java and run with java Main on JDK 17 or later. Records became a standard language feature in Java 16.',
            ],
            examples: [{
                title: 'Compare two separate strings with the same text',
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
            }],
            pitfalls: [
                'String literals can share interned instances. A successful == comparison between literals does not make == a reliable text comparison.',
                'Calling missing.equals(...) throws NullPointerException when missing is null. Objects.equals handles null references.',
                'Primitive == compares primitive values. Wrapper-object == can compare references, so avoid using it for numeric value comparisons between wrappers.',
            ],
        },
        {
            id: 'equals-hashcode',
            title: 'Override equals and hashCode together',
            paragraphs: [
                'A value class can define equality using its fields. Equal objects must have equal hash codes. Unequal objects may still share a hash code. Hash-based collections use both methods to locate matching keys or elements.',
                'Equality must be reflexive, symmetric, transitive, and consistent while the compared data stays unchanged. A non-null object must compare unequal to null.',
            ],
            examples: [{
                title: 'Treat matching product codes as one set element',
                language: 'java',
                code: `import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

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
        Set<ProductCode> codes = new HashSet<>();
        codes.add(new ProductCode("P-10"));
        codes.add(new ProductCode("P-10"));
        System.out.println(codes.size());
        System.out.println(codes.contains(new ProductCode("P-10")));
    }
}`,
                result: '1\ntrue',
            }],
            pitfalls: [
                'equals(ProductCode other) overloads the method instead of overriding equals(Object other). @Override catches this mistake.',
                'Do not change fields used by equality while an object is a HashMap key or HashSet element. A changed hash can make lookups fail.',
            ],
        },
        {
            id: 'immutable-values',
            title: 'An immutable value cannot change after construction',
            paragraphs: [
                'An immutable object has no operation that changes its observable state. Keep fields private and final, validate construction, avoid mutable data escaping, and prevent subclasses from adding conflicting behavior when needed.',
                'Creating an updated value produces a new object. Other references to the old value continue to observe the old data.',
            ],
            examples: [{
                title: 'Return a new point when moving',
                language: 'java',
                code: `final class Point {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public Point move(int dx, int dy) {
        return new Point(x + dx, y + dy);
    }

    public String coordinates() {
        return x + "," + y;
    }
}

public class Main {
    public static void main(String[] args) {
        Point original = new Point(2, 3);
        Point moved = original.move(1, -1);
        System.out.println(original.coordinates());
        System.out.println(moved.coordinates());
    }
}`,
                result: '2,3\n3,2',
            }],
            pitfalls: [
                'final alone does not make an object immutable. A final list field can still refer to a mutable list.',
                'This Point example teaches state changes. It has not overridden equals or hashCode, so its equality still uses identity.',
            ],
        },
        {
            id: 'record-basics',
            title: 'A record declares a fixed set of value components',
            paragraphs: [
                'A record generates private final component fields, a canonical constructor, accessors, equals, hashCode, and toString unless you provide the applicable methods yourself. An accessor uses the component name, such as quantity(), rather than getQuantity().',
                'Generated equality compares the record type and each component. A record is final and can implement interfaces. It cannot extend another class or declare extra instance fields.',
            ],
            examples: [{
                title: 'Validate components in a compact constructor',
                language: 'java',
                code: `import java.util.Objects;

record OrderLine(String product, int quantity) {
    public OrderLine {
        Objects.requireNonNull(product);
        if (product.isBlank() || quantity <= 0) {
            throw new IllegalArgumentException("Invalid order line");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        OrderLine first = new OrderLine("Notebook", 2);
        OrderLine second = new OrderLine("Notebook", 2);
        System.out.println(first.product());
        System.out.println(first.quantity());
        System.out.println(first.equals(second));
        System.out.println(first.hashCode() == second.hashCode());
        System.out.println(first);
    }
}`,
                result: 'Notebook\n2\ntrue\ntrue\nOrderLine[product=Notebook, quantity=2]',
            }],
            pitfalls: [
                'A compact constructor omits the parameter list. The compiler assigns the validated parameters to component fields after its body finishes.',
                'Records do not automatically reject null or invalid numbers. Declare validation when the value’s contract requires it.',
                'Array components keep array equality, which uses identity. Generated record equality does not perform a deep comparison of array contents.',
            ],
        },
        {
            id: 'shallow-immutability',
            title: 'Record immutability is shallow',
            paragraphs: [
                'A record cannot replace its component references after construction. A mutable object held by a component can still change. Make defensive copies when the record must preserve a snapshot of incoming data.',
                'List.copyOf creates an unmodifiable list and rejects null elements. It copies the list contents, not the objects inside it. Strings are immutable, so a copied List<String> is enough for this example. Mutable elements would need their own handling.',
            ],
            examples: [{
                title: 'Compare a shared list with a copied list',
                language: 'java',
                code: `import java.util.ArrayList;
import java.util.List;

record SharedTags(List<String> tags) {}

record SnapshotTags(List<String> tags) {
    public SnapshotTags {
        tags = List.copyOf(tags);
    }
}

public class Main {
    public static void main(String[] args) {
        List<String> input = new ArrayList<>();
        input.add("java");
        SharedTags shared = new SharedTags(input);
        SnapshotTags snapshot = new SnapshotTags(input);

        input.add("notes");
        System.out.println(shared.tags());
        System.out.println(snapshot.tags());
        try {
            snapshot.tags().add("extra");
        } catch (UnsupportedOperationException exception) {
            System.out.println("Snapshot list cannot be changed");
        }
    }
}`,
                result: '[java, notes]\n[java]\nSnapshot list cannot be changed',
            }],
            pitfalls: [
                'An unmodifiable view of a mutable list can still reflect changes to its backing list. A snapshot copy avoids that shared backing list.',
                'A record with mutable components is risky as a hash key. Changes in those components can change the record’s equality and hash code.',
            ],
        },
    ],
};

export default note;
