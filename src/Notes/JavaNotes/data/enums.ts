import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'enums',
    title: 'Enums',
    summary: 'Declare a fixed set of named values and use them through an enum type.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    sections: [
        {
            id: 'enum-values',
            title: 'Declare an enum and use its values',
            bullets: [
                'An enum defines a type with a fixed set of named values.',
                'enum Status { NEW, PROCESSING, DONE } declares three values of type Status.',
                'Use the enum type and value name together, such as Status.PROCESSING.',
                'A Status variable can hold a Status value or null. It cannot hold an arbitrary string such as "waiting".',
                'Each enum value is one object. Use == to compare enum values.',
            ],
            examples: [{
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
            }],
        },
    ],
};

export default note;
