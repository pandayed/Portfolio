import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'interfaces',
    title: 'Interfaces',
    summary: 'Define contracts that classes implement, then use default methods and other interface members.',
    scope: 'java',
    pointwise: true,
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'interfaces',
            title: 'An interface names a contract that classes implement',
            bullets: [
                'An interface declares a contract: the operations an implementing class provides.',
                'A class uses implements to name its interfaces. It can implement several interfaces.',
                'Unrelated classes can implement the same interface.',
                'An abstract interface method has no body. It is public, so the implementing method must be public.',
                'You cannot create an interface object with new Formatter(). Create an instance of an implementing class.',
                'An interface reference can hold any implementing object. Overridden instance methods follow the runtime object.',
            ],
            examples: [{
                title: 'Use two implementations through one interface',
                language: 'java',
                code: `interface Formatter {
    String format(String value);
}

class PlainFormatter implements Formatter {
    @Override
    public String format(String value) {
        return value;
    }
}

class BracketFormatter implements Formatter {
    @Override
    public String format(String value) {
        return "[" + value + "]";
    }
}

public class Main {
    public static void main(String[] args) {
        Formatter[] formatters = {
            new PlainFormatter(), new BracketFormatter()
        };
        for (Formatter formatter : formatters) {
            System.out.println(formatter.format("Ready"));
        }
    }
}`,
                result: 'Ready\n[Ready]',
            }],

        },
        {
            id: 'interface-members',
            title: 'Other interface members',
            bullets: [
                'A default method provides an instance method implementation in the interface.',
                'When unrelated interfaces provide conflicting default methods, the implementing class must override the method.',
                'An interface can declare static methods and private helper methods.',
                'Interface fields are public static final, even when those keywords are omitted.',
                'Interfaces do not provide mutable instance fields for each object.',
            ],
        },
    ],
};

export default note;
