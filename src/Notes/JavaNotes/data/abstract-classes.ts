import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'abstract-classes',
    title: 'Abstract classes',
    summary: 'Share fields and implemented methods while requiring subclasses to implement abstract methods.',
    scope: 'java',
    pointwise: true,
    exampleLayout: 'grouped',
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'abstract-classes',
            title: 'An abstract class can share state and require behavior',
            bullets: [
                'An abstract class cannot be instantiated directly.',
                'It can contain constructors, fields, implemented methods, and abstract methods.',
                'An abstract method declares an operation without a body.',
                'A concrete subclass can be instantiated. It must implement inherited abstract methods that still lack an implementation.',
                'An abstract class shares state or implementation among related classes.',
            ],
            examples: [{
                title: 'Share one description method across shapes',
                description: ['Let Shape provide a description while Square calculates its own area.'],
                language: 'java',
                code: `abstract class Shape {
    public abstract int area();

    public String description() {
        return "Area: " + area();
    }
}

class Square extends Shape {
    private final int side;

    public Square(int side) {
        this.side = side;
    }

    @Override
    public int area() {
        return side * side;
    }
}

public class Main {
    public static void main(String[] args) {
        Shape shape = new Square(4);
        System.out.println(shape.description());
    }
}`,
                result: 'Area: 16',
                explanation: [
                    'Shape declares area() without a body and provides description() with a body.',
                    'Square implements area() by multiplying side by itself.',
                    'new Square(4) sets side to 4. The Shape reference holds that Square object.',
                    'description() calls Square.area(), gets 16, and returns Area: 16.',
                ],
            }],

        },
    ],
};

export default note;
