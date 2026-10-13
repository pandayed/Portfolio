import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'classes-and-objects',
    title: 'Classes and objects',
    summary: 'Define classes, create objects, control field access, and use constructors and static members.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'object-state',
            title: 'A class defines state and behavior',
            bullets: [
                'A class defines a type. It contains fields and methods.',
                'A field stores data. A method defines an operation.',
                'An object is an instance of a class. Use new to create an object.',
                'Each object has its own instance fields.',
                'A variable of a class type holds a reference to an object, or null.',
                'Counter other = first copies the reference. Both variables then refer to the same object.',
                'Numeric fields default to zero. boolean fields default to false. char fields default to code unit 0.',
                'Reference fields default to null.',
                'Local variables do not receive these defaults. Assign a value before reading a local variable.',
            ],
            examples: [{
                title: 'Two counters keep separate values',
                language: 'java',
                code: `class Counter {
    int value;

    void increment() {
        value++;
    }

    int value() {
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

        },
        {
            id: 'visibility',
            title: 'Visibility controls who can call or read a member',
            bullets: [
                'An access modifier controls which code can use a class or its members.',
                'A member is a field, method, or another declaration inside a class.',
                'private permits access within the enclosing top-level class and its nested classes.',
                'No modifier means package-private. Code in the same package can access the member.',
                'public permits access when the containing type is accessible.',
                'protected permits access in the same package and in subclasses. Subclass access is explained with inheritance.',
                'An ordinary top-level class can be public or package-private.',
                'A public class named Main belongs in Main.java.',
                'A public method does not make a private field public. Callers access the field through the method.',
                'In a named module, package exports can further limit access from other modules.',
            ],

        },
        {
            id: 'constructors',
            title: 'Constructors and this',
            bullets: [
                'A constructor initializes a new object. new calls the constructor.',
                'A constructor has the class name and no return type.',
                'void User() declares a method, not a constructor.',
                'this refers to the current object. this.name selects its field when a parameter is also named name.',
                'The compiler adds a no-argument constructor only when the class declares no constructor.',
                'After declaring User(String name), declare User() separately if callers need it.',
                'Overloaded constructors have different parameter lists.',
                'this(...) calls another constructor in the same class.',
                'In Java 17, this(...) must be the first statement in the constructor.',
            ],
            examples: [{
                title: 'Initialize a name and reuse one constructor',
                language: 'java',
                code: `class User {
    private final String name;

    public User() {
        this("Guest");
    }

    public User(String name) {
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

        },
        {
            id: 'encapsulation',
            title: 'Encapsulation keeps state changes behind methods',
            bullets: [
                'Encapsulation keeps field access and state changes behind methods.',
                'A private field cannot be accessed directly by an unrelated class.',
                'Public methods provide the operations callers can use.',
                'A getter reads a value. A setter assigns a value. A class does not need both for every field.',
                'Counter exposes increment and value. Callers can increase or read its value but cannot assign the field directly.',
            ],
            examples: [{
                title: 'Change a private field through public methods',
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
        Counter counter = new Counter();
        counter.increment();
        counter.increment();
        System.out.println(counter.value());
        // counter.value = 10; // Compile error: value is private.
    }
}`,
                result: '2',
            }],
        },
        {
            id: 'static-final',
            title: 'Class fields and methods with static',
            bullets: [
                'An instance field belongs to one object. A static field belongs to the loaded class and is shared by its instances.',
                'A static method belongs to the class. Call it through the class name.',
                'A static method has no this reference. It needs an object reference to read an instance field.',
                'static final combines a class field with a value that cannot be reassigned.',
                'A field is a variable declared directly in a class. Use static final for a class constant.',
                'A compile-time constant is a final primitive or String variable initialized with a constant expression.',
                'A constant expression uses values that Java can calculate at compile time, such as 10 + 2.',
                'Not every final variable is a compile-time constant. A method result can be assigned once at runtime.',
                'For a final reference field, the reference cannot change. The referenced object can still change.',
                'The created++ example uses one thread. static does not make an update safe when several threads perform it at once.',
            ],
            examples: [{
                title: 'A shared count and a class constant',
                language: 'java',
                code: `class Ticket {
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
        System.out.println(Ticket.createdCount());
        System.out.println(Ticket.MAX_GUESTS);
    }
}`,
                result: '2\n4',
            }],

        },
    ],
};

export default note;
