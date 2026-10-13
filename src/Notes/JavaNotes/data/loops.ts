import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'loops',
    title: 'Loops',
    summary: 'Repeat statements with for, while, and do-while, and control iterations with break and continue.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    exampleLayout: 'grouped',
    sections: [
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
                title: 'Sum values, count down, and run one attempt',
                description: [
                    'Use for, while, and do-while to repeat three small tasks.',
                ],
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
                explanation: [
                    'The for loop adds 1, 2, and 3 to total, producing 6.',
                    'The while loop prints 2 and 1. Each iteration decreases remaining until the condition becomes false.',
                    'The do-while body increases attempts to 1 before checking attempts < 0. That condition is false, so the loop stops after one iteration.',
                ],
            }],
        },
    ],
};

export default note;
