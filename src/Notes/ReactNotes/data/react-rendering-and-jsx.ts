import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'react-rendering-and-jsx',
    title: 'React rendering and JSX',
    summary: 'Describe UI with components and TSX, insert values with braces, and follow the JSX rules that differ from HTML.',
    scope: 'react',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'components-describe-ui',
            title: 'Components describe the UI',
            paragraphs: [
                'A React component is a function that returns a description of the UI. React calls the component and updates the page to match the returned JSX.',
                'Component names start with a capital letter. Lowercase JSX names refer to built-in browser elements such as div, button, and article.',
            ],
            examples: [{
                title: 'Render a component',
                language: 'tsx',
                code: [
                    'function Welcome() {',
                    '    return <h1>Welcome to the notes</h1>;',
                    '}',
                    '',
                    'export default function App() {',
                    '    return <Welcome />;',
                    '}',
                ].join('\n'),
                result: 'The page shows the heading “Welcome to the notes”.',
            }],
            pitfalls: [
                'Do not write <welcome /> for a custom component. React treats a lowercase name as a browser element.',
                'Use <Welcome /> in JSX. Do not call Welcome() yourself to render it.',
            ],
        },
        {
            id: 'jsx-rules',
            title: 'JSX has stricter markup rules',
            bullets: [
                'Return one root element. Use a Fragment when an extra DOM element is not needed.',
                'Close every tag. Write <img /> instead of <img> and include closing tags for list items.',
                'Use className instead of class. Most DOM properties use camelCase, such as onClick and tabIndex.',
                'Keep aria-* and data-* attributes in their dashed form.',
            ],
            examples: [{
                title: 'Group elements with a Fragment',
                language: 'tsx',
                code: [
                    'export default function Profile() {',
                    '    return (',
                    '        <>',
                    '            <h1 className="profile-title">Ada Lovelace</h1>',
                    '            <p>Mathematician and writer</p>',
                    '        </>',
                    '    );',
                    '}',
                ].join('\n'),
                result: 'The heading and paragraph both render without an extra wrapper element in the DOM.',
            }],
        },
        {
            id: 'javascript-expressions',
            title: 'Use braces for JavaScript expressions',
            paragraphs: [
                'Braces let JSX read a JavaScript value. Use them for text, attributes, and expressions that produce values.',
                'The expression is JavaScript. React only controls where its result appears in the JSX.',
            ],
            examples: [{
                title: 'Insert typed values',
                language: 'tsx',
                code: [
                    'const course = {',
                    '    title: "React basics",',
                    '    completedLessons: 3,',
                    '};',
                    '',
                    'export default function CourseStatus() {',
                    '    return (',
                    '        <p title={course.title}>',
                    '            {course.title}: {course.completedLessons} lessons complete',
                    '        </p>',
                    '    );',
                    '}',
                ].join('\n'),
                result: 'The page shows “React basics: 3 lessons complete”. The paragraph title is “React basics”.',
            }],
            pitfalls: [
                'Do not put an object directly in rendered text. Select a property or convert the value to text.',
                'Do not wrap plain JSX text in quotes. <p>Hello</p> already renders Hello.',
            ],
        },
        {
            id: 'tsx-checks-jsx',
            title: 'TSX checks JSX values',
            paragraphs: [
                'Use the .tsx file extension when a TypeScript file contains JSX. The project JSX setting controls how TypeScript transforms or preserves that syntax.',
                'TypeScript checks built-in element properties and typed component properties before the code runs. React still controls rendering at runtime.',
            ],
            examples: [{
                title: 'Match a DOM property type',
                language: 'tsx',
                code: [
                    'const imageUrl: string = "/images/profile.png";',
                    'const description: string = "Profile portrait";',
                    '',
                    'export default function Avatar() {',
                    '    return <img src={imageUrl} alt={description} />;',
                    '}',
                ].join('\n'),
                result: 'React renders an img element with the supplied source and alternative text. The browser shows the image when that source exists.',
                typeCheck: 'src and alt receive strings. A value with an incompatible type is reported before runtime.',
            }],
        },
        {
            id: 'rendering-is-a-calculation',
            title: 'Keep rendering as a calculation',
            paragraphs: [
                'A render reads props, state, and other inputs, then returns JSX. The same inputs should produce the same JSX.',
                'Do not change variables outside the component or start side effects while JSX is being calculated. Event handlers handle user actions. Effects synchronize with external systems when rendering requires that synchronization.',
            ],
            examples: [{
                title: 'Calculate display text during render',
                language: 'tsx',
                code: [
                    'type PriceProps = {',
                    '    amount: number;',
                    '    currency: string;',
                    '};',
                    '',
                    'function Price({ amount, currency }: PriceProps) {',
                    '    const label = `${currency} ${amount.toFixed(2)}`;',
                    '    return <span>{label}</span>;',
                    '}',
                    '',
                    'export default function App() {',
                    '    return <Price amount={19.5} currency="USD" />;',
                    '}',
                ].join('\n'),
                result: 'The page shows “USD 19.50”. Rendering does not change data outside the component.',
            }],
        },
    ],
};

export default note;
