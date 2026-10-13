import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'composition',
    title: 'Composition',
    summary: 'Hold another object in a field and use its behavior without becoming its subtype.',
    scope: 'java',
    pointwise: true,
    exampleLayout: 'grouped',
    updatedOn: '2026-10-13',
    sections: [
        {
            id: 'composition',
            title: 'Composition keeps a collaborator in a field',
            bullets: [
                'Composition means one object holds another object in a field and calls its methods.',
                'Pass the held object through a constructor to choose the implementation.',
                'Use inheritance when the subclass can keep the behavior promised by the superclass.',
                "Use composition to use another object's behavior without making the caller its subtype.",
                'Composition and inheritance can be used together.',
            ],
            examples: [{
                title: 'Pass formatting behavior to a report',
                description: ['Render the same report title with plain text and square brackets.'],
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

class Report {
    private final Formatter formatter;

    public Report(Formatter formatter) {
        this.formatter = formatter;
    }

    public String render(String title) {
        return formatter.format(title);
    }
}

public class Main {
    public static void main(String[] args) {
        Report plain = new Report(new PlainFormatter());
        Report marked = new Report(new BracketFormatter());
        System.out.println(plain.render("Stock"));
        System.out.println(marked.render("Stock"));
    }
}`,
                result: 'Stock\n[Stock]',
                explanation: [
                    'Each Report stores the Formatter passed to its constructor.',
                    'plain holds a PlainFormatter. marked holds a BracketFormatter.',
                    'render() passes the title to the held formatter and returns its result.',
                    'The two calls print Stock and [Stock]. Report uses a Formatter without being a Formatter.',
                ],
            }],

        },
    ],
};

export default note;
