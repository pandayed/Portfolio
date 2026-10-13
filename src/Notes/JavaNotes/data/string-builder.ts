import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'string-builder',
    title: 'StringBuilder',
    summary: 'Append text to a mutable builder and create a String from its current contents.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    exampleLayout: 'grouped',
    sections: [
        {
            id: 'string-builder',
            title: 'StringBuilder accumulates text',
            bullets: [
                'StringBuilder is mutable, so its contents can change. append adds text to the same builder.',
                "toString returns a String with the builder's current contents. Later changes to the builder do not change that String.",
                'Use a builder when a loop joins many pieces of text. Ordinary + concatenation is readable for a small expression.',
                'String.join joins array elements with a chosen separator when no extra processing is needed.',
                'StringBuilder does not synchronize changes from multiple threads. It does not coordinate their access to its contents.',
            ],
            examples: [{
                title: 'Join names and keep a String snapshot',
                description: [
                    'Build a comma-separated list of names, then change the builder after creating a String.',
                ],
                language: 'java',
                code: `public class Main {
    public static void main(String[] args) {
        String[] names = {"Ana", "Bo", "Cy"};
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < names.length; i++) {
            if (i > 0) builder.append(", ");
            builder.append(names[i]);
        }
        String result = builder.toString();
        builder.append("!");
        System.out.println(result);
        System.out.println(builder);
        System.out.println(String.join(" / ", names));
    }
}`,
                result: 'Ana, Bo, Cy\nAna, Bo, Cy!\nAna / Bo / Cy',
                explanation: [
                    'The loop adds a comma and space before every name except the first. The builder contains Ana, Bo, Cy.',
                    'toString stores those contents in result. Appending ! changes the builder but leaves result unchanged.',
                    'String.join uses / with surrounding spaces as the separator, producing Ana / Bo / Cy.',
                ],
            }],
        },
    ],
};

export default note;
