import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "reducers-and-actions",
    title: "Reducers and actions",
    summary: "Group related state transitions in a pure reducer and dispatch named actions.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "reducers",
            title: "Describe changes with actions",
            bullets: [
                "A reducer calculates next state from current state and an action. An action describes what happened.",
                "useReducer(reducer, initialState) returns current state and dispatch. Dispatch queues an action for the reducer.",
                "Use a reducer when several handlers need related state transitions. A small independent value can stay in useState."
            ],
            examples: [
                {
                    title: "Group booking updates",
                    description: [
                        "Keep related guest-count and reset rules in one reducer."
                    ],
                    language: "jsx",
                    code: `import { useReducer } from 'react';

function bookingReducer(state, action) {
    switch (action.type) {
        case 'guestAdded': return { ...state, guests: state.guests + 1 };
        case 'guestRemoved': return { ...state, guests: Math.max(1, state.guests - 1) };
        case 'reset': return { guests: 1 };
        default: throw new Error('Unknown action: ' + action.type);
    }
}

export default function Booking() {
    const [booking, dispatch] = useReducer(bookingReducer, { guests: 1 });
    return <>
        <p>Guests: {booking.guests}</p>
        <button onClick={() => dispatch({ type: 'guestAdded' })}>Add guest</button>
        <button onClick={() => dispatch({ type: 'guestRemoved' })}>Remove guest</button>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>;
}`,
                    result: "Add guest increases the count. Remove guest keeps at least one guest. Reset returns to one.",
                    explanation: [
                        "Handlers report an action. The reducer owns the update rule and returns a new state object."
                    ]
                }
            ]
        },
        {
            id: "pure-reducers",
            title: "Keep reducers pure",
            bullets: [
                "Return the next state without mutating the old state. Do not send requests, start timers, or change the DOM in a reducer.",
                "Reducers and updater functions can be called again by React, including extra development calls in Strict Mode.",
                "Dispatch does not change variables in the current render. The next render receives the updated state.",
                "A reducer organizes transitions. It does not automatically share state with other component instances."
            ]
        }
    ],
    references: [
        {
            title: "React: Extracting state logic into a reducer",
            href: "https://react.dev/learn/extracting-state-logic-into-a-reducer"
        }
    ]
};

export default note;
