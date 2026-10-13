import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'control-flow-and-methods',
    title: 'Control flow and methods',
    summary: 'Choose branches, repeat work, define methods, and understand how Java passes arguments.',
    scope: 'java',
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'branches',
            title: 'if chooses a branch',
            bullets: [
                'An if condition must produce a boolean. Its branch runs when the condition is true.',
                'else if checks another condition only when the earlier conditions were false.',
                'else runs when all earlier conditions were false.',
                'Use braces to group the statements in each branch.',
                'The conditional operator condition ? first : second chooses one expression. It chooses first when the condition is true and second when it is false.',
                'Use the conditional operator for a small value choice. Use if for a sequence of actions.',
            ],
            examples: [{
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
            bullets: [
                'An enum defines a fixed set of named values.',
                'A Status variable can hold a Status constant or null. It cannot hold an arbitrary string such as "waiting".',
                'A switch expression chooses a case and produces a value.',
                'Arrow cases do not fall through. Java does not continue into the next case after running the matched case.',
                'A block case uses yield to give the switch expression its result.',
                'These switch forms work in Java 17 without preview features. Preview features need explicit compiler and runtime options.',
            ],
            examples: [{
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
                'A switch expression must cover every possible choice. This example covers all enum constants. Other selector types may need default.',
                'Traditional case labels use a colon. Execution can continue into the next case unless break, return, or another statement transfers control.',
                'In Java 17, switching on a null enum or String throws NullPointerException. Check for null first when it is possible.',
            ],
        },
        {
            id: 'loops',
            title: 'Choose a loop from its stopping condition',
            bullets: [
                'A loop repeats its body. Each repetition is an iteration.',
                'A for loop has an initial step, a condition, and an update. It checks the condition before each iteration and runs the update afterward.',
                'A while loop checks its condition before each iteration.',
                'A do-while loop checks its condition after each iteration. Its body runs at least once.',
                'An enhanced for loop reads each element from an array or Iterable. Iterable is an interface for objects whose elements a loop can read.',
                'Use an index loop when you need the position or need to replace array elements.',
                'break exits the nearest loop. continue skips the rest of the current iteration.',
                'In a for loop, continue still runs the update before Java checks the condition again.',
                'return exits the current method, even from inside a loop.',
            ],
            examples: [{
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
            pitfalls: [
                'Changing score in for (int score : scores) does not replace an array element. Use scores[index] = value to update the array.',
            ],
        },
        {
            id: 'methods',
            title: 'Methods declare their inputs and result',
            bullets: [
                'A method declaration gives the return type, method name, and parameter types.',
                'A parameter is a named input in the declaration. An argument is a value supplied when you call the method.',
                'A non-void method returns a value compatible with its declared return type.',
                'A void method does work without returning a value.',
                'A static method belongs to the class. You can call it without creating an object.',
                'The helper methods below are static, so main can call them directly.',
                'An instance method needs an object. An instance is an object created from a class.',
            ],
            examples: [{
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
                'A parameter is available only within its method. A local variable declared in a block is available only within that block.',
                'A non-void method must return a compatible value on every path that completes normally. Java does not automatically return the last expression.',
            ],
        },
        {
            id: 'overloading',
            title: 'Overloads have different parameter lists',
            bullets: [
                'Overloading gives several methods the same name with different parameter types or counts.',
                'The compiler chooses an applicable overload from the argument types.',
                'Changing only the return type does not create an overload.',
                'A varargs parameter accepts a variable number of arguments. int... values receives them as an int array.',
                'The varargs parameter must be last. Callers can pass separate values, an int array, or no values.',
            ],
            examples: [{
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
            pitfalls: [
                'Overloads with unrelated reference parameter types can make a null argument ambiguous. The compiler cannot choose between them.',
                'Use different method names when the names can make the intended operation clear.',
            ],
        },
        {
            id: 'pass-by-value',
            title: 'Java always passes arguments by value',
            bullets: [
                'A method receives a copy of each argument value. This is called pass by value.',
                'For a primitive, the copy is the primitive value.',
                'For an object or array, the copy is a reference to the same object.',
                'Changing the object through the copied reference can affect the caller.',
                "Assigning another object to the parameter changes only the parameter. It does not replace the object in the caller's variable.",
            ],
            examples: [{
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
        },
    ],
};

export default note;
