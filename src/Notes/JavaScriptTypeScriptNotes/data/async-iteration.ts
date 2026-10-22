import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "async-iteration",
    title: "Asynchronous iteration",
    summary: "Async iteration requests results one at a time.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN: async function*",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function*"
        },
        {
            title: "MDN: for await...of",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of"
        }
    ],
    sections: [
        {
            id: "generator",
            title: "Generators and yield",
            bullets: [
                "A generator supplies a sequence one value at a time.",
                "`function*` declares one, and `yield` supplies a value before pausing.",
                "Calling a generator returns an iterator.",
                "Its `next` method requests another value rather than running the entire sequence immediately.",
                "Each `next` result has `value` and `done` properties.",
                "`done` becomes `true` when the generator has finished."
            ],
            examples: [
                {
                    title: "Generator requests",
                    description: [
                        "Each next call requests one name.",
                        "The final check reports whether the sequence has ended."
                    ],
                    language: "javascript",
                    code: "function* names() {\n  yield 'Ava';\n  yield 'Ben';\n}\nconst iterator = names();\nconsole.log(iterator.next().value);\nconsole.log(iterator.next().value);\nconsole.log(iterator.next().done);",
                    result: "Ava\nBen\ntrue",
                    explanation: [
                        "The first and second `next` calls each resume the generator through one `yield`.",
                        "The third call reaches the end, so `done` is `true`."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "async-generator",
            title: "Async generators",
            bullets: [
                "`async function*` declares an `async` generator.",
                "It can `await` work before yielding each value.",
                "An `async` iterator’s next method returns a `Promise` for its next result.",
                "An `async` iterable provides that iterator.",
                "`for await...of` waits for each next result, runs the loop body, and then asks again."
            ],
            examples: [
                {
                    title: "Async page iteration",
                    description: [
                        "Each yielded value is an array of names.",
                        "The consumer handles one array before requesting the next."
                    ],
                    language: "javascript",
                    code: `async function* pages() {
  yield await Promise.resolve(['Ava', 'Ben']);
  yield await Promise.resolve(['Cam']);
}
async function consume() {
  for await (const users of pages()) {
    console.log(users.join(','));
  }
}
consume();
// Ava,Ben
// Cam`,
                    result: "Ava,Ben\nCam",
                    explanation: [
                        "Pages returns an `async` iterator.",
                        "The generator pauses at each `yield` until the loop asks for its next value."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "pagination",
            title: "On-demand pagination",
            bullets: [
                "A paginated service returns part of a result and information about the next page.",
                "The generator yields the current page before requesting another.",
                "The consumer determines when the next page is requested.",
                "This is backpressure: the producer waits for the consumer to request more data.",
                "A handler around the consuming loop receives its failures.",
                "A cancellation signal lets the owner stop a pending request."
            ],
            examples: [
                {
                    title: "Two-page service responses",
                    description: [
                        "Browser setup: `GET /api/users` returns {users:[{name:\"Ava\"}], `nextPage`:\"/api/users?page=2\"}.",
                        "The second page returns {users:[{name:\"Ben\"}], `nextPage`:`null`}.",
                        "This sample assumes that exact service shape and same-origin next-page URLs."
                    ],
                    language: "javascript",
                    code: `async function* paginatedUsers() {
  let nextPage = '/api/users';
  while (nextPage) {
    const response = await fetch(nextPage);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const page = await response.json();
    yield page.users;
    nextPage = page.nextPage;
  }
}
(async () => {
  try {
    for await (const users of paginatedUsers()) {
      console.log(users.map((user) => user.name).join(','));
    }
  } catch (error) { console.log(error.message); }
})();`,
                    result: "Ava\nBen",
                    explanation: [
                        "The first `yield` pauses before the second fetch.",
                        "The loop asks for the next page after handling Ava.",
                        "A `null` `nextPage` ends the sequence.",
                        "The consuming `catch` handles request, HTTP-status, or JSON-reading failure."
                    ]
                }
            ]
        }
    ]
};

export default note;
