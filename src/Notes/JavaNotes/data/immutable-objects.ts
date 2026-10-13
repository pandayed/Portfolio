import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'immutable-objects',
    title: 'Immutable objects',
    summary: 'Keep observable state unchanged after construction and return new objects for changed values.',
    scope: 'java',
    pointwise: true,
    exampleLayout: 'grouped',
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'immutable-values',
            title: 'An immutable value cannot change after construction',
            bullets: [
                'An immutable object cannot change its observable state after construction.',
                'Keep fields private and final. Do not provide methods that change the state.',
                'final prevents reassignment. A final reference can still point to a mutable object.',
                'Copy mutable input and avoid exposing mutable internal data to callers.',
                'Make the class final when subclasses could break its immutability.',
                'Create a new object to represent a changed value. The old object keeps its state.',
                'Immutability does not define equality.',
            ],
            examples: [{
                title: 'Return a new point when moving',
                description: [
                    'Move a point by creating a new Point while keeping the original coordinates.',
                ],
                language: 'java',
                code: `final class Point {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public Point move(int dx, int dy) {
        return new Point(x + dx, y + dy);
    }

    public String coordinates() {
        return x + "," + y;
    }
}

public class Main {
    public static void main(String[] args) {
        Point original = new Point(2, 3);
        Point moved = original.move(1, -1);
        System.out.println(original.coordinates());
        System.out.println(moved.coordinates());
    }
}`,
                result: '2,3\n3,2',
                explanation: [
                    'original starts at 2,3. move(1, -1) returns a new Point at 3,2.',
                    'move does not assign to the original fields, so the first line remains 2,3.',
                    'Point does not override equals. It still uses identity-based Object.equals.',
                ],
            }],

        },
    ],
};

export default note;
