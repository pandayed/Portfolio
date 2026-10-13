import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'equality-and-records',
    title: 'Equality, immutable values, and records',
    summary: 'Compare identity and values correctly, pair equals with hashCode, and understand what records make immutable.',
    scope: 'java',
    pointwise: true,
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
                'instanceof checks whether an object has a compatible class type. After that check, (ProductCode) other casts the reference to ProductCode.',
                'Objects.requireNonNull returns its argument or throws NullPointerException when that argument is null.',
            ],
            examples: [{
                title: 'Compare product values and their hash codes',
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
            }],

        },
        {
            id: 'immutable-values',
            title: 'An immutable value cannot change after construction',
            bullets: [
                'An immutable object cannot change its observable state after construction.',
                'Keep fields private and final. Do not provide methods that change the state.',
                'final prevents reassignment. A final reference can still point to a mutable object.',
                'Copy mutable input and avoid exposing mutable internal data to callers.',
                'Make the class final when subclasses could break its immutability.',
                'Create a new object to represent a changed value. The old object keeps its state.',
                'Immutability does not define equality. Point below still uses Object.equals because it does not override equals.',
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

        },
        {
            id: 'record-basics',
            title: 'A record declares a fixed set of value components',
            bullets: [
                'A record defines a class from named values called components.',
                'Records became a standard language feature in Java 16.',
                'Java generates a private final field and an accessor for each component.',
                'An accessor uses the component name, such as quantity(), rather than getQuantity().',
                'Java generates a canonical constructor that accepts one argument per component.',
                'Java also generates equals, hashCode, and toString. A record can declare allowed replacements.',
                'Generated equals compares the record type and every component.',
                'Array components use array identity in generated equality. Array contents are not compared deeply.',
                'A record is final. It can implement interfaces but cannot extend another class.',
                'A record cannot declare additional instance fields.',
            ],
            examples: [{
                title: 'Create a record and read its components',
                language: 'java',
                code: `record Coordinate(int x, int y) {}

public class Main {
    public static void main(String[] args) {
        Coordinate position = new Coordinate(2, 3);
        System.out.println(position.x());
        System.out.println(position.y());
        System.out.println(position);
    }
}`,
                result: '2\n3\nCoordinate[x=2, y=3]',
            }],
        },
        {
            id: 'record-validation',
            title: 'Validate record components',
            bullets: [
                'Generated constructors accept null and invalid numbers unless the record declares validation.',
                'A compact constructor uses the record name without a parameter list.',
                'Its body can validate or normalize the component parameters.',
                'After the body finishes, Java assigns those parameters to the component fields.',
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

        },
        {
            id: 'shallow-immutability',
            title: 'Record immutability is shallow',
            bullets: [
                'A record cannot reassign its component fields after construction.',
                'An object stored in a component can still change. This is shallow immutability.',
                'A defensive copy prevents later input changes from changing the stored value.',
                'An array clone creates a separate array containing the same elements.',
                'Cloning int[] copies primitive values. Cloning an object array copies references, not the referenced objects.',
                'Copy the array in the constructor to protect stored data from changes through the input.',
                'Return a copy from the accessor to protect stored data from changes through the returned array.',
                'Defensive copying does not change generated equality. Array components still use identity rather than array contents.',
            ],
            examples: [{
                title: 'Copy array input and accessor results',
                language: 'java',
                code: `import java.util.Arrays;

record SharedNumbers(int[] values) {}

record SnapshotNumbers(int[] values) {
    public SnapshotNumbers {
        values = values.clone();
    }

    public int[] values() {
        return values.clone();
    }
}

public class Main {
    public static void main(String[] args) {
        int[] input = {1, 2};
        SharedNumbers shared = new SharedNumbers(input);
        SnapshotNumbers snapshot = new SnapshotNumbers(input);

        input[0] = 9;
        System.out.println(Arrays.toString(shared.values()));
        System.out.println(Arrays.toString(snapshot.values()));

        int[] returned = snapshot.values();
        returned[1] = 8;
        System.out.println(Arrays.toString(snapshot.values()));
    }
}`,
                result: '[9, 2]\n[1, 2]\n[1, 2]',
            }],
        },
    ],
};

export default note;
