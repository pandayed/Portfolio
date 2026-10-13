import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'inheritance-and-interfaces',
    title: 'Inheritance and interfaces',
    summary: 'Use inheritance for compatible subtypes, interfaces for shared contracts, and composition for replaceable behavior.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'inheritance',
            title: 'A subclass extends one superclass',
            bullets: [
                'Inheritance creates a subclass from a superclass. extends names the superclass.',
                'A class extends at most one class.',
                'A subclass inherits accessible superclass members and can add its own members.',
                'A subclass cannot directly access a private superclass field. Use an accessible superclass method.',
                'protected members are accessible in the same package and in subclasses.',
                'Outside the package, a subclass can access a protected instance member through its own instance or a reference of that subclass type or a subtype.',
                'A final class cannot be extended.',
                'Constructors are not inherited. super(...) calls a superclass constructor.',
                'On Java 17, super(...) must be the first statement in the subclass constructor.',
                'If you omit a constructor call, the compiler inserts super(). The superclass must have an accessible no-argument constructor.',
                'Inheriting methods does not expose private state. The Employee constructor initializes its own private name field.',
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

        },
        {
            id: 'polymorphism',
            title: 'Overriding and polymorphism',
            bullets: [
                'Overriding gives an inherited instance method a new implementation in the subclass.',
                'An override uses the same method name and parameter types. Its return type must be compatible.',
                '@Override asks the compiler to check that the method overrides or implements an inherited method.',
                'An override cannot reduce access. A public superclass method must remain public.',
                'A final method cannot be overridden.',
                'A superclass reference can hold a subclass object.',
                'The reference type controls which members the compiler allows you to use.',
                'For an overridden instance method, Java selects the implementation from the actual object at runtime. This is polymorphism.',
                'Fields and static methods do not use this runtime selection. A subclass static method can hide a superclass static method.',
                'Overloading uses the same name with different parameter lists. The compiler chooses an overload from the types known at compile time.',
                'A constructor can call an overridden subclass method before the subclass fields are initialized.',
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

        },
        {
            id: 'abstract-classes',
            title: 'An abstract class can share state and require behavior',
            bullets: [
                'An abstract class cannot be instantiated directly.',
                'It can contain constructors, fields, implemented methods, and abstract methods.',
                'An abstract method declares an operation without a body.',
                'A concrete subclass can be instantiated. It must implement inherited abstract methods that still lack an implementation.',
                'An abstract class shares state or implementation among related classes.',
                'An interface defines operations that different classes can provide.',
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

        },
        {
            id: 'interfaces',
            title: 'An interface names a contract that classes implement',
            bullets: [
                'An interface declares a contract: the operations an implementing class provides.',
                'A class uses implements to name its interfaces. It can implement several interfaces.',
                'Unrelated classes can implement the same interface.',
                'An abstract interface method has no body. It is public, so the implementing method must be public.',
                'You cannot create an interface object with new Formatter(). Create an instance of an implementing class.',
                'An interface reference can hold any implementing object. Overridden instance methods follow the runtime object.',
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

        },
        {
            id: 'interface-members',
            title: 'Other interface members',
            bullets: [
                'A default method provides an instance method implementation in the interface.',
                'When unrelated interfaces provide conflicting default methods, the implementing class must override the method.',
                'An interface can declare static methods and private helper methods.',
                'Interface fields are public static final, even when those keywords are omitted.',
                'Interfaces do not provide mutable instance fields for each object.',
            ],
        },
        {
            id: 'composition',
            title: 'Composition keeps a collaborator in a field',
            bullets: [
                'Composition means one object holds another object in a field and calls its methods.',
                'Pass the held object through a constructor to choose the implementation.',
                'The Report example holds a Formatter. Report uses formatting without being a Formatter.',
                'Use inheritance when the subclass can keep the behavior promised by the superclass.',
                "Use composition to use another object's behavior without making the caller its subtype.",
                'Composition and inheritance can be used together.',
            ],
            examples: [{
                title: 'Pass formatting behavior to a report',
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

class Report {
    private final Formatter formatter;

    public Report(Formatter formatter) {
        this.formatter = formatter;
    }

    public String render(String title) {
        return formatter.format(title);
    }
}

public class Main {
    public static void main(String[] args) {
        Report plain = new Report(new PlainFormatter());
        Report marked = new Report(new BracketFormatter());
        System.out.println(plain.render("Stock"));
        System.out.println(marked.render("Stock"));
    }
}`,
                result: 'Stock\n[Stock]',
            }],

        },
    ],
};

export default note;
