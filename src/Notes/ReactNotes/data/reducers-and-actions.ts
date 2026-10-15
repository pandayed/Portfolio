import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "reducers-and-actions",
    title: "Reducers and actions",
    summary: "Use useReducer to keep related state updates in one function.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "reducers",
            title: "Update state with useReducer",
            bullets: [
                "A reducer is a function that receives the current state and an action, then returns the next state.",
                "An action is an object that describes what happened, such as a guest being added.",
                "useReducer(reducer, initialState) returns the current state and a dispatch function. Call dispatch(action) to request an update using the reducer."
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
                        "Each button sends an action to the reducer. The reducer calculates the guest count and returns a new state object."
                    ]
                }
            ]
        },
        {
            id: "pure-reducers",
            title: "Rules for reducer functions",
            bullets: [
                "Return a new state object instead of changing the current one. Do not send requests, start timers, or change page elements in a reducer.",
                "A reducer must return the same result for the same state and action. React may call it twice in development Strict Mode to check for mistakes.",
                "Dispatch does not change variables in the current render. The next render receives the updated state.",
                "Each call to useReducer keeps its own state. Using the same reducer function in two components does not share their state."
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
