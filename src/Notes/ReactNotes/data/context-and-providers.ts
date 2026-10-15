import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "context-and-providers",
    title: "Context and providers",
    summary: "Read shared data with useContext without passing props through every component.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "context",
            title: "Read shared data with useContext",
            bullets: [
                "Context lets a component read data from a parent higher in the component tree, without passing that data through every component in between.",
                "createContext(defaultValue) creates a context object. A provider supplies its value to the components inside it.",
                "useContext(Context) reads the value from the closest provider for that context above the component. If there is no provider, it returns the default value."
            ],
            examples: [
                {
                    title: "Provide a selected theme",
                    description: [
                        "Let a nested component read a theme without Toolbar passing it as a prop. This provider syntax works in React 18 and later."
                    ],
                    language: "jsx",
                    code: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

function ThemeLabel() {
    const theme = useContext(ThemeContext);
    return <p>Theme: {theme}</p>;
}
function Toolbar() { return <ThemeLabel />; }

export default function Settings() {
    const [theme, setTheme] = useState('light');
    return <ThemeContext.Provider value={theme}>
        <button onClick={() => setTheme(current => current === 'light' ? 'dark' : 'light')}>
            Change theme
        </button>
        <Toolbar />
    </ThemeContext.Provider>;
}`,
                    result: "Clicking Change theme switches Theme: light and Theme: dark.",
                    explanation: [
                        "Settings owns the state. The provider supplies it. useContext in ThemeLabel reads that provider."
                    ]
                }
            ]
        },
        {
            id: "provider-position",
            title: "Provider placement and value changes",
            bullets: [
                "useContext cannot read a provider returned by the same component. The provider must wrap the component that calls useContext.",
                "Changing the provided value re-renders components that read it. React compares values with Object.is.",
                "If the provider receives a new object, components reading the context re-render even when the object contains the same values.",
                "A provider can also supply state and dispatch from useReducer. Nested components can read the state and dispatch actions through context.",
                "React 19 also supports <ThemeContext value={theme}>. Use .Provider when supporting React 18."
            ]
        }
    ],
    references: [
        {
            title: "React: Passing data deeply with context",
            href: "https://react.dev/learn/passing-data-deeply-with-context"
        },
        {
            title: "React: Combining reducers and context",
            href: "https://react.dev/learn/scaling-up-with-reducer-and-context"
        }
    ]
};

export default note;
