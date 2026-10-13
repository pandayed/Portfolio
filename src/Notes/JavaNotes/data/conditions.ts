import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'conditions',
    title: 'Conditions',
    summary: 'Choose a branch with if and else, choose a value with the conditional operator, and use switch expressions.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    sections: [
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
            id: 'switch-and-enums',
            title: 'Switch expressions',
            bullets: [
                'A switch expression chooses a case and produces a value.',
                'The Status enum below supplies the named values checked by this switch.',
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
    ],
};

export default note;
