import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'classes-and-objects',
    title: 'Classes and objects',
    summary: 'Create objects with valid state, control access to fields, and understand constructors, this, static, and final.',
    scope: 'java',
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'object-state',
            title: 'A class defines state and behavior',
            bullets: [
                'A class defines fields and methods. A field stores data. A method defines an operation.',
                'An object is an instance of a class. Each object has its own instance fields.',
                'A variable of a class type holds a reference to an object, or null.',
            ],
            examples: [{
                title: 'Two counters keep separate values',
                language: 'java',
                code: `class Counter {
    private int value;

    public void increment() {
        value++;
    }

    public int value() {
        return value;
    }
}

public class Main {
    public static void main(String[] args) {
        Counter first = new Counter();
        Counter second = new Counter();
        first.increment();
        first.increment();
        System.out.println(first.value());
        System.out.println(second.value());
    }
}`,
                result: '2\n0',
            }],
            pitfalls: [
                'Counter other = first copies the reference. It does not create a new counter. Both variables then refer to the same object.',
                'Instance fields receive default values such as 0, false, or null. Assign a value to a local variable before reading it.',
            ],
        },
        {
            id: 'constructors',
            title: 'Constructors establish valid initial state',
            bullets: [
                'A constructor initializes an object. It has the class name and no return type. new calls it.',
                'Use a constructor to check that the object starts with valid field values.',
                'this refers to the current object. Use this.name to distinguish the field from a parameter named name.',
                'Overloaded constructors have different parameter lists.',
                'In Java 17, this(...) calls another constructor in the same class. It must be the first statement in the constructor.',
            ],
            examples: [{
                title: 'Validate a name and reuse one constructor',
                language: 'java',
                code: `class User {
    private final String name;

    public User() {
        this("Guest");
    }

    public User(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
        this.name = name;
    }

    public String name() {
        return name;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new User().name());
        System.out.println(new User("Asha").name());
    }
}`,
                result: 'Guest\nAsha',
            }],
            pitfalls: [
                'The compiler adds a default no-argument constructor only when you declare no constructor.',
                'Adding User(String name) does not keep User() automatically. Declare User() if you still need it.',
                'void User() declares a method, not a constructor.',
            ],
        },
        {
            id: 'visibility',
            title: 'Visibility controls who can call or read a member',
            bullets: [
                'Visibility controls which code can access a member. A member is a field, method, or another declaration inside a class.',
                'private allows access within the enclosing top-level class and its nested classes. Use it for implementation details.',
                'No modifier means package-private. Code in the same package can access the member.',
                'protected allows access within the same package. Subclasses outside the package can access it under additional rules.',
                'public allows access when the containing type is accessible. Module exports can limit access further. An export makes a package available to other modules.',
                'An ordinary top-level class can be public or package-private. A public class named Main belongs in Main.java.',
            ],
            pitfalls: [
                'A subclass in another package cannot access a protected instance member through any arbitrary parent object. The object reference must satisfy the subclass access rules.',
                'A public method does not make a private field public. Callers use the method and follow its rules.',
            ],
        },
        {
            id: 'encapsulation',
            title: 'Encapsulation keeps state changes behind methods',
            bullets: [
                "Encapsulation controls access to an object's fields through methods.",
                "Keep fields private. Provide operations that enforce the object's rules.",
                'A method can reject an invalid change before changing a field.',
                'You do not need a getter and setter for every field. A getter reads a value. A setter assigns a value.',
            ],
            examples: [{
                title: 'Prevent a negative stock count',
                language: 'java',
                code: `class Stock {
    private int quantity;

    public Stock(int quantity) {
        if (quantity < 0) {
            throw new IllegalArgumentException("Negative quantity");
        }
        this.quantity = quantity;
    }

    public void reserve(int count) {
        if (count <= 0 || count > quantity) {
            throw new IllegalArgumentException("Invalid reservation");
        }
        quantity -= count;
    }

    public int available() {
        return quantity;
    }
}

public class Main {
    public static void main(String[] args) {
        Stock stock = new Stock(5);
        stock.reserve(2);
        System.out.println(stock.available());
        try {
            stock.reserve(4);
        } catch (IllegalArgumentException exception) {
            System.out.println(exception.getMessage());
        }
        System.out.println(stock.available());
    }
}`,
                result: '3\nInvalid reservation\n3',
            }],
            pitfalls: [
                "Returning an internal mutable list lets callers change it outside your methods. Return a suitable copy or an unmodifiable view when the object's rules require it.",
                'An unmodifiable view prevents changes through that view. It can still show changes made to the original list.',
            ],
        },
        {
            id: 'static-final',
            title: 'static belongs to the class; final prevents reassignment',
            bullets: [
                'An instance field belongs to an object. A static field belongs to the loaded class and is shared by its instances.',
                'A static method has no this reference. Call it through the class name.',
                'A final variable can be assigned only once.',
                'For a reference variable, final prevents replacing the reference. It does not stop changes to the referenced object.',
                'A final method cannot be overridden. A subclass cannot replace its implementation.',
                'A final class cannot be extended. It cannot have subclasses.',
            ],
            examples: [{
                title: 'A shared count and a final mutable list',
                language: 'java',
                code: `import java.util.ArrayList;
import java.util.List;

class Ticket {
    public static final int MAX_GUESTS = 4;
    private static int created;

    public Ticket() {
        created++;
    }

    public static int createdCount() {
        return created;
    }
}

public class Main {
    public static void main(String[] args) {
        new Ticket();
        new Ticket();
        final List<String> guests = new ArrayList<>();
        guests.add("Asha");
        System.out.println(Ticket.createdCount());
        System.out.println(Ticket.MAX_GUESTS);
        System.out.println(guests);
    }
}`,
                result: '2\n4\n[Asha]',
            }],
            pitfalls: [
                'The created++ example uses one thread. static does not make an update safe when several threads perform it at once.',
                'A static method cannot directly read an instance field. It needs an object reference.',
            ],
        },
    ],
};

export default note;
