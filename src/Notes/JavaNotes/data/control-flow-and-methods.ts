import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'control-flow-and-methods',
    title: 'Methods',
    summary: 'Declare methods, return values, overload method names, use varargs, and pass arguments by value.',
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
            ],
            examples: [{
                language: 'java',
                code: String.raw`public class Main {
    static int count(int... values) {
        return values.length;
    }

    public static void main(String[] args) {
        System.out.println(count(2, 3, 4));
        System.out.println(count());
    }
}`,
                result: '3\n0',
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
