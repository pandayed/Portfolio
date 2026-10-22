import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "network-requests",
    title: "Network requests with fetch",
    summary: "HTTP responses, request options, failure types, and browser storage.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN: using fetch",
            href: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"
        },
        {
            title: "MDN: Response.json",
            href: "https://developer.mozilla.org/en-US/docs/Web/API/Response/json"
        },
        {
            title: "MDN: CORS",
            href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS"
        }
    ],
    sections: [
        {
            id: "request-response",
            title: "HTTP requests and responses",
            bullets: [
                "HTTP is the request-and-response protocol used by web services.",
                "An endpoint is a URL that a service handles.",
                "`fetch` returns a Promise for a `Response`.",
                "The response provides a status, `headers`, and a `body`.",
                "A relative URL such as /api/preferences uses the current page’s origin.",
                "An origin is its scheme, host, and port.",
                "`response.ok` is `true` for HTTP status 200 through 299.",
                "`fetch` can fulfill for a failed HTTP status such as 404.",
                "`response.json` returns a separate Promise for the parsed `body`.",
                "A status check comes before reading data intended for a successful response."
            ],
            examples: [
                {
                    title: "Shared preferences request",
                    description: [
                        "Browser setup: a same-origin service handles GET /api/preferences and returns HTTP 200 with JSON {\"theme\":\"dark\"}."
                    ],
                    language: "javascript",
                    code: "async function loadSharedPreferences() {\n  const response = await fetch('/api/preferences');\n  if (!response.ok) throw new Error('HTTP ' + response.status);\n  const preferences = await response.json();\n  if (preferences === null || typeof preferences !== 'object'\n      || typeof preferences.theme !== 'string') {\n    throw new Error('Invalid preferences');\n  }\n  return preferences;\n}\nloadSharedPreferences()\n  .then((preferences) => console.log(preferences.theme))\n  .catch((error) => console.log(error.message));",
                    result: "dark",
                    explanation: [
                        "The result requires the stated service.",
                        "A missing endpoint or failed request follows the `catch` path.",
                        "Parsing JSON does not check the required theme property.",
                        "The explicit shape check does that."
                    ]
                }
            ]
        },
        {
            id: "failures",
            title: "Request failure types",
            bullets: [
                "A network or browser access failure rejects `fetch` before code receives a usable response.",
                "An unsuccessful HTTP status is a received response.",
                "Application code decides to reject it by checking `response.ok`.",
                "Invalid JSON rejects `response.json`.",
                "Valid JSON can still have the wrong fields or field types.",
                "A response `body` is normally read once.",
                "Cloning the `Response` before consuming it allows two independent body reads."
            ],
            examples: [
                {
                    title: "HTTP and JSON checks without a service",
                    description: [
                        "`Response` constructs local response objects in browsers and modern Node.js.",
                        "No network endpoint is needed."
                    ],
                    language: "javascript",
                    code: `// Browser or modern Node.js: no network service required here.
async function inspect() {
  const missing = new Response('Missing', { status: 404 });
  console.log(missing.ok, missing.status); // false 404
  try {
    await new Response('not JSON').json();
  } catch (error) { console.log(error.name); } // SyntaxError
  const wrongShape = await new Response('{"name":7}').json();
  console.log(typeof wrongShape.name); // number: valid JSON, wrong shape
}
inspect();`,
                    result: "false 404\nSyntaxError\nnumber",
                    explanation: [
                        "The 404 response exists successfully, but ok is `false`.",
                        "not JSON cannot be parsed.",
                        "The final `body` is valid JSON with a number where a user name would normally be a string."
                    ],
                    runnable: true
                }
            ],
            table: {
                columns: [
                    "Failure",
                    "Where it is detected",
                    "What it means"
                ],
                rows: [
                    [
                        "Network or access",
                        "`fetch` rejects",
                        "No usable response was received"
                    ],
                    [
                        "HTTP status",
                        "`response.ok` is `false`",
                        "The service returned an unsuccessful status"
                    ],
                    [
                        "Invalid JSON",
                        "`response.json` rejects",
                        "The `body` is not valid JSON"
                    ],
                    [
                        "Wrong data shape",
                        "Application validation",
                        "Parsed data does not satisfy the required fields"
                    ]
                ]
            }
        },
        {
            id: "request-options",
            title: "Request options",
            bullets: [
                "The default `method` is GET.",
                "Options can select another `method`, `headers`, and a `body`.",
                "`JSON.stringify` converts the `body` data to JSON text.",
                "`Content-Type`: application/json tells the service its format.",
                "`URLSearchParams` encodes query values.",
                "It keeps characters in an input value from being interpreted as another query parameter.",
                "For another origin, the browser applies Cross-Origin Resource Sharing rules.",
                "CORS is the server’s permission for browser code to read the response.",
                "CORS permission is separate from authorization.",
                "A server must still check which caller can access or change its data."
            ],
            examples: [
                {
                    title: "Search URL parameters",
                    description: [
                        "The code constructs a URL only.",
                        "It does not need a running service."
                    ],
                    language: "javascript",
                    code: "const query = new URLSearchParams({ q: 'tea & coffee' });\nconsole.log('/api/search?' + query.toString());",
                    result: "/api/search?q=tea+%26+coffee",
                    explanation: [
                        "The ampersand inside q is encoded as data rather than another parameter."
                    ],
                    runnable: true
                },
                {
                    title: "Preference update request",
                    description: [
                        "Browser setup: a same-origin service accepts PUT /api/preferences with a JSON `body`.",
                        "The service authorizes the request and returns HTTP 204 after saving."
                    ],
                    language: "javascript",
                    code: "async function savePreference() {\n  const response = await fetch('/api/preferences', {\n    method: 'PUT',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ theme: 'dark' }),\n  });\n  if (!response.ok) throw new Error('HTTP ' + response.status);\n  console.log('saved');\n}\nsavePreference().catch((error) => console.log(error.message));",
                    result: "saved",
                    explanation: [
                        "An HTTP 204 response has no JSON `body` to parse.",
                        "Authentication and request-forgery protection, when needed, belong to the stated service contract."
                    ]
                }
            ]
        },
        {
            id: "storage-boundary",
            title: "Browser storage and service data",
            bullets: [
                "`fetch` does not copy `localStorage`.",
                "The application must explicitly include stored data when it chooses to send that data.",
                "Shared preferences on another device come from the service’s stored data and access rules.",
                "The browser’s `localStorage` remains separate.",
                "Database queries, authorization, and backups depend on the service implementation.",
                "Calling `fetch` does not implement them."
            ]
        }
    ]
};

export default note;
