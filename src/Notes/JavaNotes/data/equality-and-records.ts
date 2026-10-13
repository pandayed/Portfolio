import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'equality-and-records',
    title: 'Equality, immutable values, and records',
    summary: 'Compare identity and values correctly, pair equals with hashCode, and understand what records make immutable.',
    scope: 'java',
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'identity-and-value',
            title: 'Reference equality and value equality answer different questions',
            bullets: [
                'For object references, == returns true when both refer to the same object or both are null. This is reference equality, also called identity.',
                'equals uses the equality rule defined by the class.',
                'Object uses identity for its default equals implementation.',
                'String overrides equals to compare text. This is value equality.',
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
                'String literals can share one object through interning. Use equals to compare text even when == happens to return true for literals.',
                'Calling missing.equals(...) throws NullPointerException when missing is null. Objects.equals handles null references.',
                'Primitive == compares values. For wrapper objects such as Integer, == can compare references. Use equals to compare values between wrappers.',
            ],
        },
        {
            id: 'equals-hashcode',
            title: 'Override equals and hashCode together',
            bullets: [
                'A value class defines equality using its fields.',
                'A hash code is an integer used to locate objects in hash-based collections such as HashMap and HashSet.',
                'Equal objects must have equal hash codes. Unequal objects may share a hash code.',
                'Hash-based collections use hashCode and equals to find matching keys or elements.',
                'Equality must be reflexive: an object equals itself.',
                'Equality must be symmetric: if a equals b, b must equal a.',
                'Equality must be transitive: if a equals b and b equals c, a must equal c.',
                'Equality must be consistent: repeated comparisons give the same result while the compared data stays unchanged.',
                'A non-null object must compare unequal to null.',
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
            bullets: [
                'An immutable object cannot change its observable state after construction.',
                'Keep fields private and final. Validate values in the constructor.',
                'Do not expose mutable data that callers can change.',
                'Prevent subclasses from changing the behavior when that is needed to keep the object immutable.',
                'To change a value, create a new object. References to the old object still see the old data.',
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
            bullets: [
                'A record declares named values called components.',
                'Records became a standard language feature in Java 16.',
                'Java generates private final fields for the components.',
                'Java also generates a canonical constructor, accessors, equals, hashCode, and toString unless you declare the allowed replacements.',
                'The canonical constructor accepts one argument for each component.',
                'An accessor returns a component value. Its name matches the component, such as quantity(), rather than getQuantity().',
                'Generated equality compares the record type and every component.',
                'A record is final, so another class cannot extend it. It can implement interfaces.',
                'A record cannot extend another class or declare extra instance fields.',
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
            bullets: [
                'A record cannot replace its component references after construction.',
                'A mutable object stored in a component can still change. This is shallow immutability.',
                'A defensive copy stores separate data. Use it when later changes to the input must not change the record.',
                'List.copyOf creates an unmodifiable list. You cannot change the list through that reference.',
                'List.copyOf rejects null elements and copies element references. It does not copy the element objects.',
                'Strings are immutable, so a copied List<String> is enough for this example. Mutable elements need separate handling.',
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
                'An unmodifiable view still uses the original list. Changes to that list appear in the view. A copied list avoids this shared list.',
                'Changing mutable record components can change the record’s equality and hash code. Avoid those changes while the record is a hash key.',
            ],
        },
    ],
};

export default note;
