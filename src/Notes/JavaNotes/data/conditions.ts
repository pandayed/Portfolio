import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'conditions',
    title: 'Conditions',
    summary: 'Choose a branch with if and else, or choose a value with the conditional operator.',
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
    ],
};

export default note;
