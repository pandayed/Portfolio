import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'lambdas-and-streams',
    title: 'Lambdas and method references',
    summary: 'Implement functional interfaces with lambdas, capture local variables, and refer to existing methods and constructors.',
    scope: 'java',
    exampleLayout: 'grouped',
    pointwise: true,
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'functional-interfaces',
            title: 'Functional interfaces and lambda syntax',
            bullets: [
                'A functional interface has one abstract method. An abstract method declares an operation without implementing it.',
                'Java includes inherited abstract methods in that check. Default methods, static methods, and methods matching public Object methods do not count.',
                'An annotation adds information to a declaration. @FunctionalInterface asks the compiler to check the interface has one abstract method.',
                'A lambda implements that abstract method. Its target interface supplies the parameter and return types.',
                'Use parameter -> expression for one parameter. Use (left, right) -> expression for multiple parameters.',
                'Use () -> expression when there are no parameters. Use -> { statements; } for a block body.',
                'An expression body returns its value when the interface requires a result. A block body uses return for that result.',
            ],
            table: {
                columns: ['Interface', 'Abstract method', 'Purpose'],
                rows: [
                    ['Predicate<T>', 'boolean test(T value)', 'Check a condition.'],
                    ['Function<T, R>', 'R apply(T value)', 'Transform a value.'],
                    ['Consumer<T>', 'void accept(T value)', 'Perform an action.'],
                    ['Supplier<T>', 'T get()', 'Produce a value without an input.'],
                ],
            },
            examples: [{
                title: 'Pass a pricing calculation',
                description: [
                    'Use lambdas to subtract a discount, check affordability, and calculate a name length.',
                ],
                language: 'java',
                code: `import java.util.function.Function;
import java.util.function.Predicate;

public class Main {
    @FunctionalInterface
    interface PriceRule {
        int apply(int price);
    }

    public static void main(String[] args) {
        PriceRule discount = price -> price - 10;
        Predicate<Integer> affordable = price -> price <= 100;
        Function<String, Integer> length = name -> name.length();
        System.out.println(discount.apply(90));
        System.out.println(affordable.test(80));
        System.out.println(length.apply("Java"));
    }
}`,
                result: '80\ntrue\n4',
                explanation: [
                    'discount implements PriceRule.apply and subtracts 10 from 90.',
                    'affordable implements Predicate.test. The value 80 meets the price <= 100 condition.',
                    'length implements Function.apply and returns 4, the number of characters in Java.',
                ],
            }],
        },
        {
            id: 'captured-variables',
            title: 'Local variables captured by lambdas',
            bullets: [
                'A lambda captures a local variable when it uses that variable from the surrounding method.',
                'A captured local variable must be final or effectively final. Effectively final means it is not reassigned after initialization.',
                'A captured reference can still point to a mutable object. The capture rule prevents reassignment of the reference, not changes to that object.',
            ],
            examples: [{
                title: 'Use a value from the surrounding method',
                description: [
                    'Check a price against a limit declared in the same method.',
                ],
                language: 'java',
                code: `import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        int limit = 100;
        Predicate<Integer> affordable = price -> price <= limit;
        System.out.println(affordable.test(80));
        // limit = 90; // Reassignment makes the lambda fail to compile.
    }
}`,
                result: 'true',
                explanation: [
                    'The lambda captures limit, whose value is 100. The price 80 is within that limit.',
                    'limit is effectively final because it is initialized once and never reassigned.',
                    'Uncommenting limit = 90 makes the lambda fail to compile.',
                ],
            }],
        },
        {
            id: 'method-references',
            title: 'Method references',
            bullets: [
                'A method reference names an existing method or constructor instead of writing a lambda that calls it.',
                'String::length calls length on the String passed as the function argument.',
                'Integer::parseInt refers to a static method. System.out::println calls a method on the existing System.out object.',
                'Type::new refers to a constructor. ArrayList::new can supply a new list.',
                'The target functional interface determines which overload fits, including its parameters and return type.',
                'The referenced method keeps its normal behavior. Integer.parseInt throws NumberFormatException for invalid numeric text.',
                'Use a lambda for extra arguments or a body with several statements.',
            ],
            examples: [{
                title: 'Refer to methods and a constructor',
                description: [
                    'Use method references to calculate a length, parse a number, and print results. Use a constructor reference to create a list.',
                ],
                language: 'java',
                code: `import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

public class Main {
    public static void main(String[] args) {
        Function<String, Integer> length = String::length;
        Function<String, Integer> parse = Integer::parseInt;
        Consumer<String> print = System.out::println;
        Supplier<List<String>> makeList = ArrayList::new;

        print.accept("Length: " + length.apply("Java"));
        print.accept("Number: " + parse.apply("42"));
        List<String> names = makeList.get();
        names.add("Asha");
        print.accept(names.toString());
    }
}`,
                result: 'Length: 4\nNumber: 42\n[Asha]',
                explanation: [
                    'String::length returns 4 for Java. Integer::parseInt converts the text 42 into an integer.',
                    'System.out::println supplies the printing action used by print.accept.',
                    'ArrayList::new creates a mutable list. Adding Asha produces [Asha].',
                ],
            }],
        },
    ],
};

export default note;
