import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'switches',
    title: 'Switch statements and expressions',
    summary: 'Choose cases, return values from switch expressions, and understand case fall-through.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    exampleLayout: 'grouped',
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
                title: 'Choose an action from a menu option',
                description: ['Use option 2 to select the Open action.'],
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
                explanation: [
                    'option holds 2, so the switch runs case 2 and prints Open.',
                    'break exits the switch before the default case.',
                    'Option 1 would print Create. Any other value would print Unknown option.',
                ],
            }],
        },
        {
            id: 'switch-and-enums',
            title: 'Switch expressions',
            bullets: [
                'A switch expression chooses a case and produces a value.',
                'Arrow cases do not fall through. Java does not continue into the next case after running the matched case.',
                'A block case uses yield to give the switch expression its result.',
                'Switch expressions are available from Java 14.',
                'A switch expression must cover every possible choice. Covering all enum constants is sufficient. Other selector types may need default.',
                'In Java 17, switching on a null enum or String throws NullPointerException. Check for null first when it is possible.',
            ],
            examples: [{
                title: 'Choose a message from an enum status',
                description: [
                    'Return a message for each value of the Status enum.',
                    'This program works in Java 17 without preview features.',
                ],
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
                explanation: [
                    'status holds Status.PROCESSING, so the switch selects that case.',
                    'The case block sets action to working. yield makes working the value of the switch expression.',
                    'message receives that value and is printed.',
                    'All three Status constants have a case, so this switch needs no default.',
                ],
            }],
        },
    ],
};

export default note;
