import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'inheritance-and-interfaces',
    title: 'Inheritance and interfaces',
    summary: 'Use inheritance for compatible subtypes, interfaces for shared contracts, and composition for replaceable behavior.',
    scope: 'java',
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'inheritance',
            title: 'A subclass extends one superclass',
            bullets: [
                'extends declares a subclass, which is a class based on another class.',
                'The superclass is the parent class. The subclass inherits its accessible methods and can add methods.',
                'A subclass can override a method by providing its own implementation.',
                'Use inheritance when callers can use the subclass wherever they expect the superclass. The subclass must keep the behavior the superclass promises.',
                'Constructors are not inherited. super(...) calls a superclass constructor.',
                'On Java 17, super(...) must be the first statement in the subclass constructor.',
                'If you omit it, the compiler inserts super(). This requires an accessible superclass constructor with no arguments.',
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
                'A subclass cannot directly access a private superclass field. Use the superclass’s accessible methods.',
            ],
        },
        {
            id: 'polymorphism',
            title: 'An overridden instance method follows the runtime object',
            bullets: [
                'A superclass reference can hold a subclass object.',
                'The reference type controls which members the compiler allows you to use.',
                'For an overridden instance method, Java selects the implementation from the actual object at runtime. This is polymorphism.',
                '@Override tells the compiler to check that a method overrides a superclass method or implements an interface method.',
                'Use @Override to catch misspelled names or wrong parameter types.',
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
                'Overloading declares methods with the same name and different parameter lists. The compiler selects an overload using the types known at compile time.',
                'Fields and static methods do not follow the runtime object. A subclass static method can hide a superclass static method, but it cannot override it.',
                'An override cannot reduce access. A public superclass method must remain public in the subclass.',
            ],
        },
        {
            id: 'interfaces',
            title: 'An interface names a contract that classes implement',
            bullets: [
                'An interface declares operations that a class agrees to provide. This agreement is its contract.',
                'Unrelated classes can implement the same interface.',
                'A basic abstract interface method has no implementation. It is public, so the implementing method must be public too.',
                'A default method supplies an instance method implementation in the interface.',
                'An interface can also declare static methods and private helper methods.',
                'Interface fields are public static final even when you omit those keywords.',
                'An interface does not give each object mutable instance fields.',
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
                'You cannot create an interface object directly with new Formatter(). Create an object of a class that implements it.',
                'A functional interface has one abstract method. You can implement it with a lambda, which defines that method without declaring a class.',
                'If two unrelated interfaces supply conflicting default methods, the implementing class must override the method.',
            ],
        },
        {
            id: 'abstract-classes',
            title: 'An abstract class can share state and require behavior',
            bullets: [
                'You cannot create an abstract class object directly.',
                'An abstract class can have constructors, fields, implemented methods, and abstract methods.',
                'An abstract method declares behavior without providing an implementation.',
                'A concrete subclass is a subclass you can create objects from. It must implement any inherited abstract methods that still lack an implementation.',
                'Use an abstract class when related subclasses need common fields or method implementations.',
                'Use an interface when different classes need to provide the same operations.',
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
                'Avoid calling overridable methods from constructors. The subclass method can run before the subclass fields are initialized.',
                'This small area example uses int. Large side values can overflow when multiplied.',
            ],
        },
        {
            id: 'composition',
            title: 'Composition keeps a collaborator in a field',
            bullets: [
                'Composition means one object holds another object in a field and calls its methods.',
                'The held object is a collaborator. You can pass it through a constructor.',
                'This keeps the behavior separate from the class that uses it.',
                'A report uses a formatter. Extending a formatter would make the report a formatter, which does not match this relationship.',
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
                'Do not inherit only to reuse a few methods. If the subclass cannot keep the superclass’s contract, use a collaborator for those methods.',
                'Composition and inheritance can work together. Choose each relationship based on the behavior the class must provide.',
            ],
        },
    ],
};

export default note;
