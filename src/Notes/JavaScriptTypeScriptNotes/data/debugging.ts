import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "debugging",
    title: "Debugging with logs and breakpoints",
    summary: "Inspect the actual input, execution path, and result of a failing calculation.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Debugging_JavaScript"
        }
    ],
    sections: [
        {
            id: "debug-with-evidence",
            title: "Logs show values; breakpoints pause execution",
            bullets: [
                "A debugger pauses execution at a breakpoint so local variables and active calls can be inspected.",
                "The debugger statement requests a pause when a debugger is active. Step through one statement at a time to compare the actual values with the intended result.",
                "console.table displays rows. console.error displays an error message. Presentation depends on the console.",
                "console.assert logs a failed condition; it does not throw or stop the next statement.",
                "The call stack lists calls that have started and have not returned. Each stack frame identifies one active call.",
                "Logging an object may show later changes when its details are expanded. Log specific primitive properties when the value at that moment matters."
            ],
            examples: [
                {
                    title: "A small browser example with a wrong total",
                    language: "javascript",
                    code: "function total(price, quantity) {\n    console.log(\"quantity\", quantity, typeof quantity);\n    console.assert(typeof quantity === \"number\", \"quantity must be a number\");\n    debugger; // Pauses here when a debugger is active.\n    return price + quantity; // Intentional bug: total should multiply.\n}\nfunction checkout() {\n    const rows = [{ price: 10, quantity: \"2\" }];\n    console.table(rows);\n    const result = total(rows[0].price, rows[0].quantity);\n    console.error(\"Unexpected total\", result);\n}\ncheckout();",
                    result: "Table row: price 10, quantity \"2\"\nquantity 2 string\nAssertion failed: quantity must be a number\nUnexpected total 102",
                    description: [
                        "Use browser developer tools to inspect a quantity supplied as text."
                    ],
                    explanation: [
                        "The quantity log identifies a string. The assertion reports that mismatch but does not throw.",
                        "The + operation joins text, producing \"102\". The intended total requires multiplication.",
                        "With a debugger attached, inspect the total and checkout frames at debugger.",
                        "The table and assertion presentation can vary by console."
                    ],
                    possibleOutput: true
                },
                {
                    title: "The corrected calculation with the same input",
                    language: "javascript",
                    code: "function total(price, rawQuantity) {\n    const quantity = Number(rawQuantity);\n    if (!Number.isFinite(quantity)) {\n        throw new Error(\"quantity must be a finite number\");\n    }\n    return price * quantity;\n}\nconsole.log(total(10, \"2\")); // 20\n// total(10, \"two\"); // Would throw the Error created in the guard.\nconsole.assert(total(10, \"2\") === 20, \"wrong total\");\n// The assertion passes, so it logs nothing.",
                    result: "20",
                    description: [
                        "Convert numeric input explicitly and correct the total calculation."
                    ],
                    explanation: [
                        "Number converts the numeric text before multiplication. The finite check rejects NaN and infinity.",
                        "Uncommenting the call with \"two\" makes Number return NaN and causes the explicit Error before multiplication."
                    ]
                }
            ],
            pitfalls: [
                "For the failing example, reproduce checkout with quantity equal to \"2\". Inspect that value and its runtime type before changing the calculation.",
                "Start with a stack frame from the application, such as total. Step over its return to see which value reaches checkout.",
                "Keep a small reproduction such as total(10, \"2\") when investigating. Remove temporary logs and breakpoints after confirming the cause, as in the corrected version."
            ]
        }
    ]
};

export default note;
