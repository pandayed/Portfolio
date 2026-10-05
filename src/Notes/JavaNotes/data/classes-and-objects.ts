import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'classes-and-objects',
    title: 'Classes and objects',
    summary: 'Create objects with valid state, control access to fields, and understand constructors, this, static, and final.',
    scope: 'java',
    updatedOn: '2026-10-05',
    sections: [
        {
            id: 'object-state',
            title: 'A class defines state and behavior',
            paragraphs: [
                'A class defines fields and methods. An object is an instance of that class. Each object has its own instance fields. A variable of a class type holds a reference to an object, or null.',
                'Each complete example on this page is a separate Main.java file. Compile with javac Main.java and run with java Main using JDK 17 or later.',
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
                'Instance fields receive default values such as 0, false, or null. Local variables must be assigned before you read them.',
            ],
        },
        {
            id: 'constructors',
            title: 'Constructors establish valid initial state',
            paragraphs: [
                'A constructor has the class name and no return type. new invokes it to initialize an object. this refers to the current object. Use this.name to distinguish a field from a parameter named name.',
                'Overloaded constructors accept different parameter lists. On the Java 17 baseline, a this(...) call to another constructor must be the first statement.',
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
                'The compiler supplies a default no-argument constructor only when you declare no constructor. Adding User(String name) does not automatically retain User().',
                'void User() declares a method. It is not a constructor.',
            ],
        },
        {
            id: 'visibility',
            title: 'Visibility controls who can call or read a member',
            bullets: [
                'private: access stays within the enclosing top-level class and its nested classes. Use it for implementation details.',
                'No modifier, called package-private: access stays within the same package.',
                'protected: access is allowed within the same package and through subclass rules outside that package. It does not allow every caller to use the member.',
                'public: other code can access the member when the containing type is accessible. Module exports can further limit access.',
                'An ordinary top-level class can be public or package-private. A public class named Main belongs in Main.java.',
            ],
            pitfalls: [
                'protected access from a subclass in another package has receiver restrictions. A subclass cannot use it on any arbitrary instance of the parent class.',
                'A public method does not make a private field public. Callers use the method and its rules.',
            ],
        },
        {
            id: 'encapsulation',
            title: 'Encapsulation keeps state changes behind methods',
            paragraphs: [
                'Keep fields private and expose operations that enforce the object’s rules. A method can reject an invalid change before it alters state. Adding a getter and setter for every field is not required.',
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
                'Returning an internal mutable list lets callers change state outside your methods. Return a suitable copy or an unmodifiable view when that fits the contract.',
            ],
        },
        {
            id: 'static-final',
            title: 'static belongs to the class; final prevents reassignment',
            paragraphs: [
                'An instance field belongs to an object. A static field belongs to the loaded class and is shared by its instances. A static method has no this reference. Call it through the class name.',
                'A final variable can be assigned only once. For a reference, final prevents replacing the reference. It does not prevent changes to the referenced object. A final method cannot be overridden. A final class cannot be extended.',
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
                'The created++ example is for a single thread. static does not make an update safe when multiple threads perform it at once.',
                'A static method cannot directly read an instance field. It needs an object reference.',
            ],
        },
    ],
};

export default note;
