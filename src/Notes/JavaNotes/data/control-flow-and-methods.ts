import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'control-flow-and-methods',
    title: 'Control flow and methods',
    summary: 'Choose branches, repeat work, define methods, and understand how Java passes arguments.',
    scope: 'java',
    updatedOn: '2026-10-05',
    sections: [
        {
            id: 'branches',
            title: 'if chooses a branch',
            paragraphs: [
                'An if condition must produce a boolean. else if checks another condition only when the earlier condition was false. else handles the remaining case. Use braces so the statements belonging to each branch are clear.',
                'The conditional operator condition ? first : second chooses one expression. Use it for a small value choice, not a long sequence of actions.',
            ],
            examples: [{
                title: 'Main.java',
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        int score = 72;
        if (score >= 90) {
            System.out.println("excellent");
        } else if (score >= 60) {
            System.out.println("pass");
        } else {
            System.out.println("retry");
        }
        String parity = score % 2 == 0 ? "even" : "odd";
        System.out.println(parity);
    }
}`,
                result: 'pass\neven',
            }],
            pitfalls: ['if (score) does not compile. Write the intended comparison, such as score > 0.'],
        },
        {
            id: 'switch-and-enums',
            title: 'Use switch for named choices',
            paragraphs: [
                'An enum defines a fixed set of named values. A Status variable can hold a Status constant or null. It cannot hold an arbitrary string such as "waiting".',
                'A switch expression produces a value. Arrow cases do not fall through. A block case uses yield to provide its result. These forms work in Java 17 without preview features.',
            ],
            examples: [{
                title: 'Main.java',
                language: 'java',
                code: `public class Main {
    enum Status { NEW, PROCESSING, DONE }

    public static void main(String[] args) {
        Status status = Status.PROCESSING;
        String message = switch (status) {
            case NEW -> "queued";
            case PROCESSING -> {
                String action = "working";
                yield action;
            }
            case DONE -> "complete";
        };
        System.out.println(message);
    }
}`,
                result: 'working',
            }],
            pitfalls: [
                'A switch expression must cover every possible choice. This example covers all enum constants. Other selectors may need default.',
                'Traditional case labels followed by a colon can fall through unless execution ends with break, return, or another transfer of control.',
                'In Java 17, switching on a null enum or String throws NullPointerException. Check for null before switching when it is possible.',
            ],
        },
        {
            id: 'loops',
            title: 'Choose a loop from its stopping condition',
            paragraphs: [
                'A for loop has initialization, a condition, and an update. A while loop checks its condition before each iteration. A do-while loop checks afterward, so its body runs at least once.',
                'An enhanced for loop reads each element from an array or Iterable. Use an index loop when the position matters or when you need to replace array elements.',
            ],
            examples: [{
                title: 'Main.java',
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        int[] scores = {3, 5, 7};
        int total = 0;
        for (int score : scores) {
            total += score;
        }
        System.out.println(total);

        int remaining = 2;
        while (remaining > 0) {
            System.out.println(remaining);
            remaining--;
        }

        int attempts = 0;
        do {
            attempts++;
        } while (attempts < 0);
        System.out.println(attempts);
    }
}`,
                result: '15\n2\n1\n1',
            }],
            bullets: [
                'break exits the nearest loop. continue skips the rest of its current iteration. In a for loop, continue still runs the update expression before the next condition check.',
                'return exits the current method, even when it appears inside a loop.',
            ],
            pitfalls: ['Changing the loop variable in for (int score : scores) does not replace the array element. Write scores[index] = value to update the array.'],
        },
        {
            id: 'methods',
            title: 'Methods declare their inputs and result',
            paragraphs: [
                'A method declaration names a return type, a method name, and typed parameters. Calling the method supplies arguments. A non-void method returns a value of its declared type. A void method performs work without returning a value.',
                'static methods belong to the class and can be called without an instance. The helper below is static so main can call it directly. Instance methods need an object.',
            ],
            examples: [{
                title: 'Main.java',
                language: 'java',
                code: `public class Main {
    static int sum(int[] values) {
        int total = 0;
        for (int value : values) {
            total += value;
        }
        return total;
    }

    static void printTotal(int[] values) {
        System.out.println("total=" + sum(values));
    }

    public static void main(String[] args) {
        printTotal(new int[] {4, 6, 8});
    }
}`,
                result: 'total=18',
            }],
            pitfalls: [
                'A parameter exists only within the method. A local variable declared in a block exists only within that block.',
                'A non-void method must return a compatible value on every path that completes normally. Java does not return the last expression automatically.',
            ],
        },
        {
            id: 'overloading',
            title: 'Overloads have different parameter lists',
            paragraphs: [
                'Overloading gives several methods the same name with different parameter types or counts. The compiler chooses an applicable overload using the argument types. Changing only the return type cannot create an overload.',
                'A varargs parameter such as int... values receives an array. It must be the last parameter. Callers can supply separate values, an int array, or no values.',
            ],
            examples: [{
                title: 'Main.java',
                language: 'java',
                code: `public class Main {
    static String label(int value) {
        return "int: " + value;
    }

    static String label(String value) {
        return "text: " + value;
    }

    static int sum(int... values) {
        int total = 0;
        for (int value : values) total += value;
        return total;
    }

    public static void main(String[] args) {
        System.out.println(label(7));
        System.out.println(label("seven"));
        System.out.println(sum(2, 3, 4));
        System.out.println(sum());
    }
}`,
                result: 'int: 7\ntext: seven\n9\n0',
            }],
            pitfalls: ['Overloads with unrelated reference parameters can make a null argument ambiguous. Prefer method names that make the intended operation clear.'],
        },
        {
            id: 'pass-by-value',
            title: 'Java always passes arguments by value',
            paragraphs: [
                'A method receives a copy of each argument value. For a primitive, that copy is the primitive value. For an object or array, that copy is a reference to the same object.',
                'Changing an object through the copied reference can affect the caller. Assigning a different object to the parameter only changes the local parameter. It cannot replace the caller\'s variable.',
            ],
            examples: [{
                title: 'Main.java',
                language: 'java',
                code: `public class Main {
    static void change(int number, int[] values) {
        number = 99;
        values[0] = 99;
        values = new int[] {100};
    }

    public static void main(String[] args) {
        int number = 5;
        int[] values = {5};
        change(number, values);
        System.out.println(number);
        System.out.println(values[0]);
    }
}`,
                result: '5\n99',
            }],
            pitfalls: ['Calling this "pass by reference" is incorrect. The method copies the reference value, and rebinding its parameter does not rebind the caller variable.'],
        },
    ],
};

export default note;
