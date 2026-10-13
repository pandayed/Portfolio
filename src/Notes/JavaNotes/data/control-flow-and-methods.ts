import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'control-flow-and-methods',
    title: 'Control flow and methods',
    summary: 'Choose branches, repeat work, define methods, and understand how Java passes arguments.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    sections: [
        {
            id: 'methods',
            title: 'Methods declare their inputs and result',
            bullets: [
                'A method is a named block of code. Call it to run its statements.',
                'A method declaration gives its return type, name, and parameters.',
                'A parameter is a named input in the declaration. An argument is a value supplied when you call the method.',
                'A non-void method uses return to send a value back to its caller. The value must match the declared return type.',
                'A void method runs without returning a value. return; can end it early.',
                'A static method belongs to the class. You can call it without creating an object.',
                'The methods below are static, so main can call them directly. An instance method needs an object.',
                'A parameter is available only within its method. A local variable declared in a block is available only within that block.',
                'A non-void method must return a compatible value on every path that completes normally. Java does not automatically return the last expression.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    static int add(int first, int second) {
        return first + second;
    }

    static void printTotal(int total) {
        System.out.println("total=" + total);
    }

    public static void main(String[] args) {
        int total = add(4, 6);
        printTotal(total);
    }
}`,
                result: 'total=10',
            }],
        },
        {
            id: 'branches',
            title: 'if chooses a branch',
            bullets: [
                'An if condition must produce a boolean. Its branch runs when the condition is true.',
                'else if checks another condition only when the earlier conditions were false.',
                'else runs when all earlier conditions were false.',
                'Use braces to group the statements in each branch.',
                'Java requires a boolean condition. if (score) does not compile. Write a comparison such as score > 0.',
                'The conditional operator condition ? first : second chooses one expression. It chooses first when the condition is true and second when it is false.',
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
        },
        {
            id: 'loops',
            title: 'Loops repeat statements',
            bullets: [
                'A loop repeats its body. Each repetition is an iteration.',
                'A for loop has an initial step, a condition, and an update. It checks the condition before each iteration and runs the update afterward.',
                'A while loop checks its condition before each iteration.',
                'A do-while loop checks its condition after each iteration. Its body runs at least once.',
                'break exits the nearest loop. continue skips the rest of the current iteration.',
                'In a for loop, continue still runs the update before Java checks the condition again.',
                'return exits the current method, even from inside a loop.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        int total = 0;
        for (int value = 1; value <= 3; value++) {
            total += value;
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
                result: '6\n2\n1\n1',
            }],
        },
        {
            id: 'switch-and-enums',
            title: 'Enums and switch expressions',
            bullets: [
                'An enum defines a fixed set of named values.',
                'A Status variable can hold a Status constant or null. It cannot hold an arbitrary string such as "waiting".',
                'A switch expression chooses a case and produces a value.',
                'Arrow cases do not fall through. Java does not continue into the next case after running the matched case.',
                'A block case uses yield to give the switch expression its result.',
                'Switch expressions are available from Java 14. This example works in Java 17 without preview features.',
                'A switch expression must cover every possible choice. This example covers all enum constants. Other selector types may need default.',
                'Traditional case labels use a colon. Execution can continue into the next case unless break, return, or another statement transfers control.',
                'In Java 17, switching on a null enum or String throws NullPointerException. Check for null first when it is possible.',
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
        },
        {
            id: 'overloading',
            title: 'Overloads have different parameter lists',
            bullets: [
                'Overloading gives several methods the same name with different parameter types or counts.',
                'The compiler chooses an applicable overload from the argument types.',
                'Changing only the return type does not create an overload.',
                'Overloads with unrelated reference parameter types can make a null argument ambiguous. The compiler cannot choose between them.',
            ],
            examples: [{
                language: 'java',
                code: String.raw`public class Main {
    static String label(int value) {
        return "int: " + value;
    }

    static String label(String value) {
        return "text: " + value;
    }

    public static void main(String[] args) {
        System.out.println(label(7));
        System.out.println(label("seven"));
    }
}`,
                result: 'int: 7\ntext: seven',
            }],
        },
        {
            id: 'varargs',
            title: 'Varargs accept a variable number of arguments',
            bullets: [
                'A varargs parameter accepts zero or more arguments. int... values receives them as an int array.',
                'The varargs parameter must be last. A method can have only one varargs parameter.',
                'Callers can pass separate values, an int array, or no values.',
                'An enhanced for loop, such as for (int value : values), reads one array element in each iteration.',
            ],
            examples: [{
                language: 'java',
                code: String.raw`public class Main {
    static int sum(int... values) {
        int total = 0;
        for (int value : values) {
            total += value;
        }
        return total;
    }

    public static void main(String[] args) {
        System.out.println(sum(2, 3, 4));
        System.out.println(sum());
    }
}`,
                result: '9\n0',
            }],
        },
        {
            id: 'pass-by-value',
            title: 'Java always passes arguments by value',
            bullets: [
                'A method receives a copy of each argument value. This is called pass by value.',
                'For a primitive, the copy is the primitive value.',
                'For an object or array, the copy is a reference to the same object.',
                'Changing the object through the copied reference can affect the caller.',
                'new int[] {100} creates a new int array containing 100. Assigning it to values replaces only that parameter reference.',
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
