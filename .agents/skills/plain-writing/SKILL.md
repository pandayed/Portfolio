---
name: plain-writing
description: Write or refine learning notes on any topic using short bullets, simple English, and clear explanations of technical terms. Also use for docs, articles, README files, commit messages, PR descriptions, code comments, UI copy, and chat replies that need plain language.
---

# Plain Writing

Write like a person taking notes. Do not write like a book.

## Rules

1. Say the thing directly. Put the main point in the first sentence.
2. Use short sentences. One idea per sentence.
3. Use common words. If a simple word works, use the simple word.
4. No idioms. No metaphors. No analogies. No similes.
5. No clever openings, no build-up, no twists, no punchlines.
6. No filler adjectives or hype words. Do not call things powerful, seamless, robust, elegant, or game-changing.
7. Do not use rhetorical questions.
8. Do not stack clauses with dashes and semicolons. Split into two sentences.
9. Use active voice. Say who does what.
10. Repeat the same word for the same thing. Do not switch to a synonym to sound varied.
11. It is fine to use more words if that makes the meaning clearer. Extra words that add no meaning are padding. Remove them.
12. State facts. If something is uncertain, say it is uncertain.
13. Say each thing once. Do not restate a point in new words later in the text.
14. The goal is to teach, not to sell. Do not persuade the reader that the topic matters. Explain it.

## Structure

- For learning notes, follow the notes rules below. Use bullets as the default.
- For other writing, use short paragraphs where connected prose helps.
- Use bullet lists for steps, options, and items.
- Use headings when the text has more than one topic.
- Put the conclusion first, then the details.

## Learning notes on any topic

- Write for someone learning the topic, including a tired reader or a reader with weak English.
- Use short bullets. Keep one main idea in each bullet. Use a short paragraph only when it makes an explanation easier to follow.
- Start with the actual topic, rule, or example. Do not add an introduction about what the notes will cover.
- Keep technical terms. Explain a new term in common words near its first use. Simple English must not remove the vocabulary the reader needs to learn.
- State what happens and when it happens. Avoid dense sentences that combine a rule, several conditions, and an exception.
- Keep conditions, exceptions, version limits, and other details that change the meaning. Give them separate bullets when needed.
- Place an example near the point it teaches. Keep meaningful outputs and explanations of what the example shows.
- Use tables when the reader needs to compare things. Keep table cells short and direct.
- Explain a shared concept in one main place. Link to that explanation from related topics. Keep a brief reminder when the reader needs it for the current example or question.
- Remove copied chat replies such as "Yes, you are correct," praise, offers to continue, and references to the conversation.
- Remove obvious instructions and labels such as "replace the placeholders," "Complete Program," and repeated notices about snippets or imports. Keep setup instructions when they explain a real requirement the reader needs.

### When refining existing notes

- Preserve the author's simple wording and bullet style wherever they already work. Fix the requested problems; do not rewrite every sentence to make the style uniform.
- Remove repeated explanations and filler. Do not remove a distinct case just because it uses the same technical term.
- Preserve accurate facts, useful examples, outputs, and links. Simplify the explanation without weakening its meaning.
- Keep existing topic boundaries, headings, IDs, and routes unless the task requires changing them.
- Do not turn a notes edit into a layout or code refactor.

### Notes example

Dense: "Cases do not fall through automatically, so a trailing break is unnecessary."

Simple:

- Go stops the switch after running the matched case.
- You do not need `break` at the end of that case.
- Use `fallthrough` to run the next case without checking its condition.

Use the same approach for other topics: keep the technical term and explain what it does in plain words.

## Keep it focused

- Decide one thing the reader should learn. Cut anything that does not serve it.
- No intro that explains what you are about to explain. Start with the content.
- No summary that repeats what the reader just read. End when the last point is made.
- Do not restate the same idea in the intro, the body, and the conclusion.
- Each section covers one point. If two sections say the same thing, merge them.
- One example per point is enough. Add a second only if it shows a different case.
- Do not add background the reader does not need for this topic. Link to it instead.
- Do not pad with history, motivation, or "why this matters" sections.
- Length follows the content. Do not stretch a short topic into a long article.

## Words to avoid

leverage, utilize, delve, embark, journey, landscape, realm, tapestry, navigate (unless it is about actual navigation), unlock, unleash, dive into, at the end of the day, needle in a haystack, moving the needle, low-hanging fruit.

Replace them:

- leverage, utilize -> use
- delve into -> look at
- in order to -> to
- a myriad of -> many
- it is worth noting that -> (delete it and state the fact)

## Examples

Bad: "Let's dive into the beating heart of the app and unlock the magic behind routing."

Good: "The router chooses which page to show based on the URL."

Bad: "Utilizing a caching layer can be a game-changer for performance."

Good: "A cache makes the page load faster. It stores the API response for five minutes, so repeat visits do not call the server again."

Bad: "The build was a rocky road, but we finally crossed the finish line."

Good: "The build failed three times. The cause was a missing environment variable. It is fixed now."

Bad: "In this article we will explore caching. Caching is a huge topic and every engineer should understand it. Let's begin."

Good: "A cache stores the API response for five minutes. Here is how to add one."

## Check before you finish

- Can a tired reader understand each sentence on the first read?
- For notes, did I use short bullets and preserve the existing simple style?
- Are technical terms explained without losing conditions, exceptions, or useful examples?
- Did I remove chat residue and unnecessary snippet or placeholder labels?
- Did I use any idiom or metaphor? Remove it.
- Did I use a fancy word where a plain word works? Replace it.
- Does the first sentence tell the reader the main point?
- Is any point made twice? Keep one.
- Would the article still teach the same thing if I deleted this paragraph? Then delete it.
- Does the reader need this section to understand the topic, or is it there to make the article longer?
