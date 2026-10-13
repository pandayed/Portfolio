import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'control-flow-and-methods',
    title: 'Methods',
    summary: 'Declare methods, return values, overload method names, use varargs, and pass arguments by value.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    exampleLayout: 'grouped',
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
                'A parameter is available only within its method. A local variable declared in a block is available only within that block.',
                'A non-void method must return a compatible value on every path that completes normally. Java does not automatically return the last expression.',
            ],
            examples: [{
                title: 'Add two numbers and print the total',
                description: [
                    'Call one method to calculate a total and another to print it.',
                ],
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
                explanation: [
                    'add receives 4 and 6 and returns their sum, 10.',
                    'main stores that return value in total and passes it to printTotal.',
                    'printTotal prints total=10 without returning a value.',
                    'Both helper methods are static, so main can call them directly. An instance method needs an object.',
                ],
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
                title: 'Choose an overload from the argument type',
                description: [
                    'Call the same method name with an integer and with text.',
                ],
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
                explanation: [
                    'label(7) calls the overload with an int parameter and returns int: 7.',
                    'label("seven") calls the overload with a String parameter and returns text: seven.',
                ],
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
                title: 'Count a variable number of arguments',
                description: [
                    'Call a varargs method with three values and with no values.',
                ],
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
                explanation: [
                    'count receives its arguments in the values array and returns its length.',
                    'count(2, 3, 4) receives three elements, so it returns 3.',
                    'count() receives an empty array, so it returns 0.',
                ],
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
                "Assigning another object to the parameter changes only the parameter. It does not replace the object in the caller's variable.",
            ],
            examples: [{
                title: 'Change an array through a copied reference',
                description: [
                    'Pass an integer and an array to a method, then print the caller\'s values.',
                ],
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
                explanation: [
                    'number receives a copy of 5. Setting the parameter to 99 does not change the variable in main.',
                    'values receives a copy of the array reference. Setting values[0] to 99 changes the array shared with main.',
                    'new int[] {100} creates another array. Assigning it to values changes only the parameter reference.',
                    'main still refers to the original array, so it prints 5 and then 99.',
                ],
            }],
        },
    ],
};

export default note;
