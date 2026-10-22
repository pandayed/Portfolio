import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "debugging",
    title: "Debugging with logs and breakpoints",
    summary: "Logs and breakpoints show values and execution paths in a failing calculation.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    inlineCode: true,
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
            title: "Logs and breakpoints",
            bullets: [
                "A debugger pauses execution at a breakpoint so local variables and active calls can be inspected.",
                "The debugger statement requests a pause when a debugger is active.",
                "Stepping runs one statement at a time so the actual values can be compared with the intended result.",
                "`console.table` displays rows.",
                "`console.error` displays an error message.",
                "Presentation depends on the console.",
                "`console.assert` logs a failed condition.",
                "It does not throw or stop the next statement.",
                "The call stack lists calls that have started and have not returned.",
                "Each stack frame identifies one active call.",
                "Logging an object may show later changes when its details are expanded.",
                "Logging specific primitive properties records their values at that moment."
            ],
            examples: [
                {
                    title: "Incorrect total calculation",
                    language: "javascript",
                    code: "function total(price, quantity) {\n    console.log(\"quantity\", quantity, typeof quantity);\n    console.assert(typeof quantity === \"number\", \"quantity must be a number\");\n    debugger; // Pauses here when a debugger is active.\n    return price + quantity; // Intentional bug: total should multiply.\n}\nfunction checkout() {\n    const rows = [{ price: 10, quantity: \"2\" }];\n    console.table(rows);\n    const result = total(rows[0].price, rows[0].quantity);\n    console.error(\"Unexpected total\", result);\n}\ncheckout();",
                    result: "Table row: price 10, quantity \"2\"\nquantity 2 string\nAssertion failed: quantity must be a number\nUnexpected total 102",
                    description: [
                        "The browser example supplies the quantity as text."
                    ],
                    explanation: [
                        "The quantity log identifies a string.",
                        "The assertion reports that mismatch but does not throw.",
                        "The `+` operation joins text, producing \"102\".",
                        "The intended total requires multiplication.",
                        "An attached debugger pauses at `debugger` and exposes the `total` and `checkout` frames.",
                        "The table and assertion presentation can vary by console."
                    ],
                    possibleOutput: true
                },
                {
                    title: "Corrected total calculation",
                    language: "javascript",
                    code: "function total(price, rawQuantity) {\n    const quantity = Number(rawQuantity);\n    if (!Number.isFinite(quantity)) {\n        throw new Error(\"quantity must be a finite number\");\n    }\n    return price * quantity;\n}\nconsole.log(total(10, \"2\")); // 20\n// total(10, \"two\"); // Would throw the Error created in the guard.\nconsole.assert(total(10, \"2\") === 20, \"wrong total\");\n// The assertion passes, so it logs nothing.",
                    result: "20",
                    description: [
                        "The corrected calculation converts numeric input explicitly."
                    ],
                    explanation: [
                        "`Number` converts the numeric text before multiplication.",
                        "The finite check rejects `NaN` and infinity.",
                        "Uncommenting the call with \"two\" makes `Number` return `NaN` and causes the explicit `Error` before multiplication."
                    ]
                }
            ],
            pitfalls: [
                "The failing example calls `checkout` with `quantity` equal to `\"2\"`.",
                "The value and runtime type identify the input mismatch.",
                "The `total` frame shows the failing application calculation.",
                "Stepping over its `return` shows which value reaches `checkout`.",
                "A small reproduction such as `total(10, \"2\")` isolates the calculation.",
                "The corrected version removes temporary logs and breakpoints after the cause is confirmed."
            ]
        }
    ]
};

export default note;
