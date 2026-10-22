import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'records',
    title: 'Records',
    summary: 'Declare value components with generated methods, validate construction, and protect mutable component data.',
    scope: 'java',
    pointwise: true,
    inlineCode: true,
    exampleLayout: 'grouped',
    updatedOn: '2026-10-21',
    sections: [
        {
            id: 'record-basics',
            title: 'Record declarations',
            bullets: [
                '`record` is Java syntax. It does not require Spring, Spring Boot, Lombok, or an import.',
                'A record defines a class from named values called components.',
                'In `public record GreetingRequest(String name) {}`, `GreetingRequest` is the class name.',
                '`String name` declares one component named `name` with type `String`.',
                '`public` makes the record accessible outside its package.',
                'The empty body `{}` declares no extra members. Java still generates the record members.',
                'Records became a standard language feature in Java 16.',
                'Java generates a `private final` field and a public accessor for each component.',
                'The accessor for `name` is `name()`, not `getName()`.',
                'Java generates a canonical constructor that accepts one argument per component.',
                'Java also generates `equals`, `hashCode`, and `toString`. A record can declare allowed replacements.',
                'Generated `equals` compares the record type and every component.',
                'Array components use array identity in generated equality. Array contents are not compared deeply.',
                'A record is `final`. It can implement interfaces but cannot extend another class.',
                'A record cannot declare additional instance fields.',
            ],
            examples: [{
                title: 'Create and read a greeting request',
                description: [
                    'The two tabs contain all Java source files for this example.',
                    'Both files belong in the same directory. The example requires JDK 17 or later.',
                    'This program uses only Java. It has no Spring dependencies.',
                ],
                language: 'java',
                code: '',
                files: [
                    {
                        name: 'GreetingRequest.java',
                        language: 'java',
                        code: `public record GreetingRequest(String name) {}`,
                    },
                    {
                        name: 'Main.java',
                        language: 'java',
                        code: `public class Main {
    public static void main(String[] args) {
        GreetingRequest request = new GreetingRequest("Ada");
        GreetingRequest sameValue = new GreetingRequest("Ada");

        System.out.println(request.name());
        System.out.println(request.equals(sameValue));
        System.out.println(request);
    }
}`,
                    },
                ],
                commands: 'javac GreetingRequest.java Main.java\njava Main',
                result: 'Ada\ntrue\nGreetingRequest[name=Ada]',
                explanation: [
                    'Java generates the constructor `GreetingRequest(String name)`.',
                    '`new GreetingRequest("Ada")` stores `Ada` in the generated field.',
                    '`request.name()` reads that field through the generated accessor.',
                    'The objects are different instances, but generated `equals` considers their components equal.',
                    'Printing the record calls generated `toString`.',
                    'Java does not generate `setName`. A different name requires a new record object.',
                    'A name such as `GreetingRequest` does not make the record an HTTP request handler or a Spring bean.',
                ],
            }],
        },
        {
            id: 'record-validation',
            title: 'Validate record components',
            bullets: [
                'Generated constructors accept `null` and invalid numbers unless the record declares validation.',
                'A compact constructor uses the record name without a parameter list.',
                'Its body can validate or normalize the component parameters.',
                'After the body finishes, Java assigns those parameters to the component fields.',
            ],
            examples: [{
                title: 'Validate components in a compact constructor',
                description: [
                    'Reject an OrderLine with a missing or blank product, or a quantity that is zero or negative.',
                ],
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
                explanation: [
                    'Objects.requireNonNull throws NullPointerException for a null product.',
                    'The next check throws IllegalArgumentException for a blank product or a non-positive quantity.',
                    'Both constructed records pass validation and have the same components.',
                    'The accessors print Notebook and 2. Generated equals and matching hash codes produce the two true lines.',
                    'Generated toString prints OrderLine[product=Notebook, quantity=2].',
                ],
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
                description: [
                    'Compare a record that shares its input array with a record that copies the array.',
                ],
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
                explanation: [
                    'SharedNumbers stores input directly. Changing input[0] to 9 changes its values to [9, 2].',
                    'SnapshotNumbers clones input during construction, before that change. Its stored values remain [1, 2].',
                    'snapshot.values() returns another clone. Changing returned[1] to 8 does not change the stored array.',
                    'The last call to snapshot.values() therefore still prints [1, 2].',
                ],
            }],
        },
    ],
    references: [{ title: 'Java 17: record classes', href: 'https://docs.oracle.com/en/java/javase/17/language/records.html' }],
};

export default note;
