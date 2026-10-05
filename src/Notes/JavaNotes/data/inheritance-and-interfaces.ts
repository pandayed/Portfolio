import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'inheritance-and-interfaces',
    title: 'Inheritance and interfaces',
    summary: 'Use inheritance for compatible subtypes, interfaces for shared contracts, and composition for replaceable behavior.',
    scope: 'java',
    updatedOn: '2026-10-05',
    sections: [
        {
            id: 'inheritance',
            title: 'A subclass extends one superclass',
            paragraphs: [
                'extends declares a subclass. It inherits accessible behavior and can add or override methods. Use inheritance when callers can use the child wherever the parent is expected without breaking the parent’s contract.',
                'Constructors are not inherited. super(...) calls a parent constructor. On Java 17, it must be the first statement in the child constructor. If you omit it, the compiler inserts super(), which requires an accessible no-argument parent constructor.',
                'Each complete example is a separate Main.java file. Compile with javac Main.java and run with java Main on JDK 17 or later.',
            ],
            examples: [{
                title: 'Initialize inherited state through a constructor',
                language: 'java',
                code: `class Employee {
    private final String name;

    public Employee(String name) {
        this.name = name;
    }

    public String name() {
        return name;
    }
}

class Developer extends Employee {
    public Developer(String name) {
        super(name);
    }

    public String role() {
        return "Developer";
    }
}

public class Main {
    public static void main(String[] args) {
        Developer developer = new Developer("Asha");
        System.out.println(developer.name());
        System.out.println(developer.role());
    }
}`,
                result: 'Asha\nDeveloper',
            }],
            pitfalls: [
                'A class extends at most one class. It can implement several interfaces.',
                'A child cannot directly access a private parent field. Use the parent’s accessible methods.',
            ],
        },
        {
            id: 'polymorphism',
            title: 'An overridden instance method follows the runtime object',
            paragraphs: [
                'A parent reference can hold a child object. The reference type controls which members the compiler allows. For an overridden instance method, the runtime object selects the implementation. This is polymorphism.',
                '@Override asks the compiler to check that the method overrides a superclass method or implements an interface method. Keep it on those methods to catch misspelled names or wrong parameter types.',
            ],
            examples: [{
                title: 'Call child behavior through a parent reference',
                language: 'java',
                code: `class Message {
    public String text() {
        return "General message";
    }
}

class Warning extends Message {
    @Override
    public String text() {
        return "Low battery";
    }
}

public class Main {
    public static void main(String[] args) {
        Message message = new Warning();
        System.out.println(message.text());
    }
}`,
                result: 'Low battery',
            }],
            pitfalls: [
                'Overloading uses a different parameter list. The compiler chooses an overload from compile-time types. It is different from overriding.',
                'Fields and static methods do not use this instance-method dispatch rule. Static methods can be hidden, not overridden.',
                'An override cannot reduce access. A public parent method must remain public in the child.',
            ],
        },
        {
            id: 'interfaces',
            title: 'An interface names a contract that classes implement',
            paragraphs: [
                'An interface lets callers depend on a set of operations. Unrelated classes can implement the same interface. A basic abstract interface method is public, so its implementation must be public too.',
                'An interface can also declare default methods with instance behavior, static methods, and private helper methods. Its fields are implicitly public static final. It does not give each object mutable instance fields.',
            ],
            examples: [{
                title: 'Use two implementations through one interface',
                language: 'java',
                code: `interface Formatter {
    String format(String value);
}

class PlainFormatter implements Formatter {
    @Override
    public String format(String value) {
        return value;
    }
}

class BracketFormatter implements Formatter {
    @Override
    public String format(String value) {
        return "[" + value + "]";
    }
}

public class Main {
    public static void main(String[] args) {
        Formatter[] formatters = {
            new PlainFormatter(), new BracketFormatter()
        };
        for (Formatter formatter : formatters) {
            System.out.println(formatter.format("Ready"));
        }
    }
}`,
                result: 'Ready\n[Ready]',
            }],
            pitfalls: [
                'You cannot instantiate an interface directly with new Formatter(). Create an implementing class or another supported implementation such as a lambda for a functional interface.',
                'If two unrelated interfaces supply conflicting default methods, the implementing class must resolve the conflict with an override.',
            ],
        },
        {
            id: 'abstract-classes',
            title: 'An abstract class can share state and require behavior',
            paragraphs: [
                'An abstract class cannot be instantiated directly. It can have constructors, fields, implemented methods, and abstract methods. A concrete subclass must implement its inherited abstract methods.',
                'Use an abstract class when related subtypes need common state or implementation. Use an interface when callers mainly need a common contract across different classes.',
            ],
            examples: [{
                title: 'Share one description method across shapes',
                language: 'java',
                code: `abstract class Shape {
    public abstract int area();

    public String description() {
        return "Area: " + area();
    }
}

class Square extends Shape {
    private final int side;

    public Square(int side) {
        if (side < 0) {
            throw new IllegalArgumentException("Negative side");
        }
        this.side = side;
    }

    @Override
    public int area() {
        return side * side;
    }
}

public class Main {
    public static void main(String[] args) {
        Shape shape = new Square(4);
        System.out.println(shape.description());
    }
}`,
                result: 'Area: 16',
            }],
            pitfalls: [
                'Avoid calling overridable methods from constructors. The child implementation can run before the child’s fields are initialized.',
                'This small area example uses int. Large side values can overflow when multiplied.',
            ],
        },
        {
            id: 'composition',
            title: 'Composition keeps a collaborator in a field',
            paragraphs: [
                'With composition, one object holds another object and delegates work to it. You can choose the collaborator through a constructor. This keeps a behavior separate from the class that uses it.',
                'A report uses a formatter. A report is not a formatter, so extending a formatter would express the wrong relationship.',
            ],
            examples: [{
                title: 'Pass formatting behavior to a report',
                language: 'java',
                code: `import java.util.Objects;

interface Formatter {
    String format(String value);
}

class Report {
    private final Formatter formatter;

    public Report(Formatter formatter) {
        this.formatter = Objects.requireNonNull(formatter);
    }

    public String render(String title) {
        return formatter.format(title);
    }
}

public class Main {
    public static void main(String[] args) {
        Report plain = new Report(value -> value);
        Report marked = new Report(value -> "[" + value + "]");
        System.out.println(plain.render("Stock"));
        System.out.println(marked.render("Stock"));
    }
}`,
                result: 'Stock\n[Stock]',
            }],
            pitfalls: [
                'Do not inherit only to reuse a few methods. If the child cannot honor the parent’s contract, keep the reusable behavior in a collaborator.',
                'Composition and inheritance can work together. Choose each relationship based on the contract, rather than applying one rule to every class.',
            ],
        },
    ],
};

export default note;
