import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'switches',
    title: 'Switch statements and expressions',
    summary: 'Choose cases, return values from switch expressions, and understand case fall-through.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    sections: [
        {
            id: 'switch-statements',
            title: 'Switch statements choose a case',
            bullets: [
                'A switch statement checks a selector value and runs a matching case.',
                'A default case runs when no case matches.',
                'Traditional case labels use a colon. Execution can continue into the next case unless break, return, or another statement transfers control.',
                'break exits the switch statement. It does not exit a surrounding loop.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        int option = 2;
        switch (option) {
            case 1:
                System.out.println("Create");
                break;
            case 2:
                System.out.println("Open");
                break;
            default:
                System.out.println("Unknown option");
        }
    }
}`,
                result: 'Open',
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
