import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'enums',
    title: 'Enums',
    summary: 'Declare a fixed set of named values and use them through an enum type.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    exampleLayout: 'grouped',
    sections: [
        {
            id: 'enum-values',
            title: 'Declare an enum and use its values',
            bullets: [
                'An enum defines a type with a fixed set of named values.',
                'Declare named values inside the enum body.',
                'Use the enum type and value name together.',
                'An enum variable can hold a value of that enum type or null. It cannot hold an arbitrary string.',
                'Each enum value is one object. Use == to compare enum values.',
            ],
            examples: [{
                title: 'Change and compare a status value',
                description: ['Represent a status using the fixed values NEW, PROCESSING, and DONE.'],
                language: 'java',
                code: `public class Main {
    enum Status { NEW, PROCESSING, DONE }

    public static void main(String[] args) {
        Status status = Status.NEW;
        status = Status.PROCESSING;
        System.out.println(status);
        System.out.println(status == Status.PROCESSING);
    }
}`,
                result: 'PROCESSING\ntrue',
                explanation: [
                    'Status declares three named values. status starts as Status.NEW.',
                    'The assignment changes status to Status.PROCESSING, so the first print shows PROCESSING.',
                    'The comparison with Status.PROCESSING is true because status holds that enum value.',
                ],
            }],
        },
    ],
};

export default note;
