import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "modules",
    title: "JavaScript modules",
    summary: "Exports, imports, module paths, and live bindings.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"
        }
    ],
    sections: [
        {
            id: "exports-and-imports",
            title: "Named and default exports",
            bullets: [
                "An ECMAScript module uses `import` and `export` to share values between files.",
                "Each module has its own top-level scope.",
                "Top-level means outside any function or block.",
                "Named imports use braces and exported names.",
                "A default `import` uses no braces and chooses its own local name.",
                "Import syntax belongs at the top level.",
                "Imports are linked before the module body runs."
            ],
            examples: [
                {
                    title: "Utility module imports",
                    description: [
                        "The code uses two separate files, `math.js` and `main.js`, in the same folder.",
                        "An HTTP server serves the folder.",
                        "The page loads `main.js` with `<script type=\"module\" src=\"./main.js\"></script>`."
                    ],
                    language: "javascript",
                    code: "// math.js\nconst adjustment = 1;\nexport const taxRate = 0.1;\nexport function addTax(price) { return price * (1 + taxRate); }\nexport default function adjust(value) { return value + adjustment; }\n\n// main.js\nimport increase, { addTax, taxRate } from \"./math.js\";\nconsole.log(addTax(10));\nconsole.log(taxRate);\nconsole.log(increase(5));\n// adjustment; // Unavailable: it is local to math.js.\n// import { adjustment } from \"./math.js\"; // No matching export.",
                    result: "11\n0.1\n6",
                    explanation: [
                        "The default `import` uses the local name `increase`.",
                        "The unexported `adjustment` stays inside `math.js`.",
                        "The commented `import` would fail during module linking before `main.js` executes."
                    ]
                }
            ]
        },
        {
            id: "module-loading",
            title: "Module paths",
            bullets: [
                "A module specifier is the path or name written in an `import`.",
                "A browser resolves `./math.js` relative to the importing file’s URL.",
                "Browser modules normally need an HTTP server.",
                "Node.js treats `.mjs` files as ECMAScript modules.",
                "It also treats `.js` files as modules in packages with \"type\": \"module\".",
                "A build tool can resolve package imports and bundle modules before the browser loads them.",
                "Modules run in strict mode.",
                "Their top-level `this` is `undefined`."
            ],
            examples: [
                {
                    title: "Browser module URLs",
                    description: [
                        "The example loads `main.js` from the stated URL."
                    ],
                    language: "text",
                    code: "main.js URL:  https://example.com/app/main.js\nspecifier:    ./math.js\nresolved URL: https://example.com/app/math.js",
                    explanation: [
                        "The ./ path keeps the `import` in `main.js`’s folder."
                    ]
                }
            ]
        },
        {
            id: "live-bindings",
            title: "Live bindings",
            bullets: [
                "An imported name observes later changes made by the exporting module.",
                "The importer cannot assign another value directly to that imported binding."
            ],
            examples: [
                {
                    title: "Exported counter",
                    description: [
                        "The example uses separate `counter.js` and `main.js` modules.",
                        "The page loads `main.js` as in the first example."
                    ],
                    language: "javascript",
                    code: "// counter.js\nexport let count = 0;\nexport function increment() { count += 1; }\n\n// main.js\nimport { count, increment } from \"./counter.js\";\nconsole.log(count);\nincrement();\nconsole.log(count);\n// count = 10; // The importer cannot assign this binding.",
                    result: "0\n1",
                    explanation: [
                        "`increment` changes the counter module’s binding.",
                        "The imported `count` reflects its current value."
                    ]
                }
            ]
        }
    ]
};

export default note;
