import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "context-and-providers",
    title: "Context and providers",
    summary: "Provide data to distant descendants and read the closest provider.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "context",
            title: "Provide a value without intermediate props",
            bullets: [
                "Context supplies a value to descendants without passing it through every intermediate component.",
                "createContext(defaultValue) creates a context object. Its default is a fixed fallback when there is no matching provider.",
                "useContext reads the closest matching provider above the calling component.",
                "Use props for nearby data. Try passing children before adding context just to avoid a few intermediate props."
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
            title: "Place the provider above the reader",
            bullets: [
                "A provider returned by a component does not affect useContext calls in that same component. It is below those calls.",
                "Changing the provided value re-renders components that read it. React compares values with Object.is.",
                "A newly created object value has a new identity even if its properties match. Measure before optimizing provider values.",
                "Context can supply reducer state and dispatch. The reducer still owns transitions; context supplies access.",
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
