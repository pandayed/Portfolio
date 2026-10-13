---
name: code-examples
description: Write or revise code examples in this site's learning notes and articles using the shared collapsible example block. Apply only to code examples, not non-code examples, diagrams, or general conceptual explanations.
---

# Code Examples

Every code example must use the shared example block and be fully contained in it.

## Keep the whole example together

- Put the problem statement, description, required setup or input, code, output, and explanation inside the same block.
- Keep every detail specific to that program inside the block, including assumptions, execution steps, output variations, and limitations.
- Do not introduce the example outside the block or leave its explanation in surrounding paragraphs, bullets, or a separate section.
- General concepts may appear before the block. If a statement describes the particular example or helps the reader follow its code, it belongs inside the block.
- Keep descriptions and explanations pointwise. Introduce the problem before showing the code.

## Use the existing component

- Reuse [LearningNoteExampleBlock](../../../src/Notes/LearningNotes/LearningNoteExampleBlock.tsx) and its stylesheet. Preserve its rounded border, collapse control, dividers, spacing, animation, and reduced-motion support.
- For pages rendered by [LearningNotePage](../../../src/Notes/LearningNotes/LearningNotePage.tsx), set `exampleLayout: 'grouped'` on the note and store code examples in `section.examples`.
- Follow [LearningNoteExample](../../../src/Notes/LearningNotes/types.ts): use `title` for the descriptive collapse heading, `description` for introductory bullets, `code` and `language` for the code, `result` for output, and `explanation` for the walkthrough.
- Order the contents as description, divider, code, divider, output when applicable, divider, explanation. Do not invent output for code that has none.
- Avoid redundant visible headings such as "Example", "Title", "Description", "Output", and "Explanation".
- If output can vary, set `possibleOutput: true` and explain the other valid results inside the block.

## Scope

- This format applies only to code examples. Do not wrap conceptual notes, non-code examples, diagrams, comparisons, or isolated inline identifiers in example blocks.
- Apply it to the examples requested for the current task. Do not migrate unrelated pages.
- Before finishing, check that collapsing each block hides all of its example-specific content except its descriptive heading.
