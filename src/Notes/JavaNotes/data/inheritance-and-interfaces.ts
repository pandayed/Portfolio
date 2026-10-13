import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'inheritance-and-interfaces',
    title: 'Inheritance',
    summary: 'Extend a superclass, initialize inherited state, and override instance methods with runtime polymorphism.',
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
    ],
};

export default note;
