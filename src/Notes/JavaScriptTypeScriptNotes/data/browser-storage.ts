import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "browser-storage",
    title: "localStorage and sessionStorage",
    summary: "Store small browser preferences and understand their lifetime and access boundaries.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API"
        }
    ],
    sections: [
        {
            id: "web-storage",
            title: "Web Storage stores strings, not objects",
            bullets: [
                "Web Storage stores string values under string keys. setItem writes, getItem reads, and removeItem deletes an entry.",
                "getItem returns null when the key is absent. Other supplied values are converted to strings.",
                "Serialize objects with JSON.stringify and parse them with JSON.parse. Check the parsed shape as covered in JSON and runtime data checks.",
                "Storage calls are synchronous: each finishes or throws before the next statement runs.",
                "Browser policy can deny access with SecurityError. A write can exceed available storage and throw QuotaExceededError."
            ],
            examples: [
                {
                    title: "String values and removal",
                    language: "javascript",
                    code: "// Run on an HTTP(S) page where storage is permitted.\nlocalStorage.setItem('notes-count', 3);\nconsole.log(localStorage.getItem('notes-count')); // \"3\"\nconsole.log(typeof localStorage.getItem('notes-count')); // string\nlocalStorage.removeItem('notes-count');\nconsole.log(localStorage.getItem('notes-count')); // null\n\nconst preferences = { theme: 'dark', compact: true };\nlocalStorage.setItem('notes-preferences', JSON.stringify(preferences));\nconst saved = localStorage.getItem('notes-preferences');\nif (saved !== null) {\n  console.log(JSON.parse(saved).theme); // dark\n}\nlocalStorage.removeItem('notes-preferences');",
                    result: "3\nstring\nnull\ndark",
                    description: [
                        "Run on an HTTP(S) page where browser storage is permitted.",
                        "Save a number as a string and serialize a preference object."
                    ],
                    explanation: [
                        "The count is stored as text. JSON serialization preserves the demonstrated preference fields.",
                        "Both demo entries are removed at the end. Storage access is assumed permitted."
                    ]
                },
                {
                    title: "Storage completion and possible failure",
                    language: "javascript",
                    code: "try {\n  console.log('before write');\n  localStorage.setItem('notes-probe', 'ready'); // possible failure here\n  console.log(localStorage.getItem('notes-probe')); // ready\n  localStorage.removeItem('notes-probe');\n} catch (error) {\n  console.log('storage failed:', error.name);\n}\nconsole.log('after storage');",
                    result: "before write\nready\nafter storage",
                    possibleOutput: true,
                    description: [
                        "Run on an HTTP(S) page where browser storage is permitted.",
                        "Attempt a small write and handle storage denial or quota failure."
                    ],
                    explanation: [
                        "The stated output assumes storage is permitted and has space.",
                        "If access or the write fails, catch logs storage failed and the error name. The remaining statements inside try are skipped.",
                        "The after storage message still runs."
                    ]
                }
            ],
            pitfalls: [
                "Catch storage failures when saved state is optional. Check parsed values before using their properties, as the examples do."
            ]
        },
        {
            id: "storage-lifecycle",
            title: "Storage lifetime and access depend on the origin",
            bullets: [
                "An origin consists of scheme, host, and port. The path does not change the origin. Different origins have separate Web Storage.",
                "localStorage normally survives reloads and browser restarts. Same-origin tabs can share it.",
                "sessionStorage survives reloads in one tab’s page session and normally ends when that tab closes.",
                "A new tab normally has separate sessionStorage. A same-origin tab with an opener can receive an initial copy; later changes stay separate.",
                "Storage belongs to the browser profile. It is not automatically copied to another device.",
                "The user or browser can clear stored entries. Private browsing, restoration, and policy can affect retention."
            ],
            examples: [
                {
                    title: "Same origin and different origins",
                    language: "javascript",
                    code: "console.log(new URL('https://example.com:443/a').origin);\n// https://example.com\nconsole.log(new URL('https://example.com/b').origin);\n// https://example.com: same origin despite different path\nconsole.log(new URL('http://example.com/a').origin);\n// http://example.com: different scheme\nconsole.log(new URL('https://example.com:8443/a').origin);\n// https://example.com:8443: different port",
                    result: "https://example.com\nhttps://example.com\nhttp://example.com\nhttps://example.com:8443",
                    description: [
                        "Run on an HTTP(S) page where browser storage is permitted.",
                        "Compare URL origins while changing the path, scheme, and port."
                    ],
                    explanation: [
                        "The first two URLs have the same origin despite different paths.",
                        "Changing scheme or port creates a different origin."
                    ]
                },
                {
                    title: "Run once, then reload and run the read step",
                    language: "javascript",
                    code: "// Step 1, on an HTTP(S) page where storage is available:\nglobalThis.notesMemory = 'memory';\nsessionStorage.setItem('notes-session', 'draft');\nlocalStorage.setItem('notes-local', 'dark');\n\n// Step 2: reload this same tab, then run these lines separately:\nconsole.log(globalThis.notesMemory); // undefined\nconsole.log(sessionStorage.getItem('notes-session')); // draft\nconsole.log(localStorage.getItem('notes-local')); // dark\n\n// A separately opened same-origin tab can read notes-local.\n// Its notes-session is null unless it received an opener copy.\n// If a copied tab changes notes-session, the original is unchanged.\n// In another browser profile or device, neither value is copied.\n\n// Clean up in each tab used for the demonstration:\nsessionStorage.removeItem('notes-session');\nlocalStorage.removeItem('notes-local');",
                    result: "undefined\ndraft\ndark",
                    possibleOutput: true,
                    description: [
                        "Run on an HTTP(S) page where browser storage is permitted.",
                        "Run Step 1, reload the same tab, then run Step 2 separately before cleanup."
                    ],
                    explanation: [
                        "Reloading resets the page variable and retains both storage entries in the stated normal session.",
                        "Private browsing, session restoration, clearing data, and browser policy can change retention.",
                        "Step 1 and Step 2 must run on opposite sides of the reload. Running the whole block at once does not perform that comparison."
                    ]
                },
                {
                    title: "A tab opened by another tab receives a separate copy",
                    language: "javascript",
                    code: "// Original tab, same-origin HTTP(S) page; popup opening must be allowed:\nsessionStorage.setItem('notes-copy', 'original');\nwindow.open(location.href, '_blank'); // opens a tab with this tab as opener\n\n// In the new tab console, run these lines separately:\nconsole.log(sessionStorage.getItem('notes-copy')); // original: initial copy\nsessionStorage.setItem('notes-copy', 'child');\nconsole.log(sessionStorage.getItem('notes-copy')); // child\n\n// Back in the original tab console:\nconsole.log(sessionStorage.getItem('notes-copy')); // original: unchanged\nsessionStorage.removeItem('notes-copy');\n// Also remove notes-copy in the child tab after the demonstration.\n// A tab opened without an opener does not receive this copy.",
                    result: "New tab: original\nNew tab after change: child\nOriginal tab: original",
                    possibleOutput: true,
                    description: [
                        "Use same-origin pages with storage and popup access permitted. Run each fragment in its named tab."
                    ],
                    explanation: [
                        "An opener-connected same-origin tab starts with a copy, if the browser permits the opening and access.",
                        "After the copy, each tab changes its own sessionStorage separately. A tab without an opener has no such initial copy."
                    ]
                }
            ],
            pitfalls: [
                "Use variables for temporary execution state, sessionStorage for a tab draft, and localStorage for small persistent preferences."
            ]
        },
        {
            id: "storage-access",
            title: "Scripts in the same page can read the same storage",
            bullets: [
                "Storage does not grant separate permissions to each script running in the page.",
                "Do not store secrets that must be hidden from page scripts.",
                "Browser storage does not create server persistence, backups, or cross-device sharing. Those require an explicit service."
            ],
            examples: [
                {
                    title: "Read a preference from another script",
                    description: [
                        "Run on an HTTP(S) page where browser storage is permitted.",
                        "Both script fragments run in the same page with storage permitted."
                    ],
                    language: "javascript",
                    code: "// Script A\nlocalStorage.setItem(\"notes-demo-theme\", \"dark\");\n\n// Script B\nconsole.log(localStorage.getItem(\"notes-demo-theme\"));\nlocalStorage.removeItem(\"notes-demo-theme\");",
                    result: "dark",
                    explanation: [
                        "The browser exposes the same origin’s localStorage to both fragments."
                    ]
                }
            ]
        }
    ]
};

export default note;
