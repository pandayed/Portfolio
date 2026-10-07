import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'react-rendering-and-jsx',
    title: 'React rendering and JSX',
    summary: 'Return JSX from a component, insert JavaScript values, and separate rendering from changes outside the component.',
    scope: 'react',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'components-describe-ui',
            title: 'Components describe the UI',
            bullets: [
                'A React component is a function that describes part of the UI (user interface).',
                'JSX is JavaScript syntax for writing HTML-like tags. It describes elements rather than changing the page itself.',
                'React calls the component to find what to display. This call is rendering.',
                'React then applies the needed changes to the DOM (Document Object Model), the browser objects that represent page elements. This step is the commit.',
                'Use a capital letter for a component name, such as Welcome. Lowercase names such as h1 refer to browser elements.',
                'export default makes App the main export of this file. A React project can import it and render <App />.',
                'The JSX examples use JavaScript in an existing React project. The TSX section adds TypeScript syntax separately.',
            ],
            examples: [
                {
                    title: 'Return and use a component',
                    language: 'jsx',
                    code: `function Welcome() {
    return <h1>Welcome to the notes</h1>;
}

export default function App() {
    return <Welcome />;
}`,
                    result: 'The page shows the heading “Welcome to the notes”. <Welcome /> asks React to render the Welcome component.',
                },
            ],
            pitfalls: [
                '<welcome /> uses a lowercase name. React treats it as a browser tag and does not call Welcome. Change that expression to <Welcome />.',
                'Use <Welcome /> rather than calling Welcome() yourself. React must control component calls and their state.',
            ],
        },
        {
            id: 'jsx-rules',
            title: 'JSX has stricter markup rules',
            bullets: [
                'Wrap adjacent JSX tags in one parent element or a Fragment. A Fragment groups elements without adding a DOM element.',
                'Write a Fragment as <>...</>. Components can also return other renderable values, such as text or null.',
                'Close every tag. Write <img /> for an element with no children and <li>Task</li> for an element with children.',
                'Use className to assign a CSS class. The example names a class but does not define its styling.',
                'Most React element properties use camelCase: the first word starts lowercase and later words start uppercase. Examples include tabIndex and onClick.',
                'Keep aria-* accessibility attributes and data-* custom attributes in their dashed form.',
            ],
            examples: [
                {
                    title: 'Group a heading and paragraph',
                    language: 'jsx',
                    code: `export default function Profile() {
    return (
        <>
            <h1 className="profile-title">Ada Lovelace</h1>
            <p>Mathematician and writer</p>
        </>
    );
}`,
                    result: 'The page shows a heading followed by a paragraph. The Fragment adds no wrapper element.',
                },
                {
                    title: 'Identify an adjacent-tag syntax error',
                    language: 'jsx',
                    code: `export default function Profile() {
    return (
        <h1>Ada Lovelace</h1>
        <p>Mathematician</p> // Error: second adjacent tag
    );
}`,
                    result: 'The JSX parser rejects the second tag because the return expression contains two adjacent JSX elements. Wrap both tags in <> and </>, as in the preceding example. The code cannot run until the syntax is fixed.',
                },
            ],
        },
        {
            id: 'javascript-expressions',
            title: 'Use braces for JavaScript expressions',
            bullets: [
                'An expression is code that produces a value, such as course.title or 2 + 3.',
                'Use {expression} inside JSX text or an attribute to insert that value.',
                'Write literal text directly between tags. Write a literal string attribute with quotes, such as title="Course".',
                'React renders strings and numbers as text. It displays no text for null, undefined, true, or false.',
                'A plain object is not display text. Read one of its properties before placing it between tags.',
            ],
            examples: [
                {
                    title: 'Insert values into text and an attribute',
                    language: 'jsx',
                    code: `const course = {
    title: "React basics",
    completedLessons: 3,
};

export default function CourseStatus() {
    return (
        <p title={course.title}>
            {course.title}: {course.completedLessons} lessons complete
        </p>
    );
}`,
                    result: 'The page shows “React basics: 3 lessons complete”. The paragraph title attribute contains “React basics”.',
                },
                {
                    title: 'Identify a value React cannot render',
                    language: 'jsx',
                    code: `const course = { title: "React basics" };

export default function CourseStatus() {
    return <p>{course}</p>; // Error: {course} is a plain object
}`,
                    result: 'React throws “Objects are not valid as a React child” when it renders {course}. Change this line to return <p>{course.title}</p>; to display “React basics”. TypeScript also rejects the object as a JSX child in a checked TSX file.',
                },
            ],
        },
        {
            id: 'tsx-checks-jsx',
            title: 'TSX adds type checks to JSX',
            bullets: [
                'TSX means TypeScript code that contains JSX. Use a .tsx file for this code.',
                'A type annotation after a variable name states its allowed type. In imageUrl: string, string means text.',
                'The project JSX setting controls how TypeScript handles JSX when producing JavaScript.',
                'TypeScript checks element properties before execution. React handles rendering when the JavaScript runs.',
                'TypeScript checks do not prove that a URL exists or that an image can load.',
            ],
            examples: [
                {
                    title: 'Pass strings to image properties',
                    language: 'tsx',
                    code: `const imageUrl: string = "/images/profile.png";
const description: string = "Profile portrait";

export default function Avatar() {
    return <img src={imageUrl} alt={description} />;
}`,
                    result: 'The page contains an image element with the supplied source and alternative text. The image appears only if /images/profile.png exists.',
                    typeCheck: 'Changing src={imageUrl} to src={42} produces a type error at src={42}: the img src property expects a string. Use a string URL. This is a source check, not a React exception.',
                },
            ],
        },
        {
            id: 'rendering-is-a-calculation',
            title: 'Keep rendering as a calculation',
            bullets: [
                'Render code should calculate what to display from its current inputs.',
                'Props are values a parent passes to a component. State is data React keeps between renders. Later pages explain each.',
                'A pure render gives the same output for the same inputs. It does not change variables or browser settings outside the component.',
                'A side effect changes something outside that calculation, such as the browser tab title or a server record.',
                'Run a user action in an event handler, a function React calls after that action. State and events explains handlers.',
                'An Effect runs code to keep a component in sync with an external system. Effects and cleanup explains when to use one.',
            ],
            examples: [
                {
                    title: 'Calculate display text without changing outside data',
                    language: 'jsx',
                    code: `export default function Price() {
    const amount = 19.5;
    const label = "USD " + amount.toFixed(2);
    return <span>{label}</span>;
}`,
                    result: 'The page shows “USD 19.50”. toFixed(2) returns text with two decimal places. The component calculates a label without changing outside data.',
                },
            ],
            pitfalls: [
                'Changing an outside variable with total += 1 inside the component is a side effect. Repeated renders could then produce different results for the same inputs.',
                'React may call a component again without committing its result. React Strict Mode is an optional development check that makes extra calls to detect impure rendering. Do not depend on one render call per visible update.',
            ],
        },
    ],
};

export default note;
