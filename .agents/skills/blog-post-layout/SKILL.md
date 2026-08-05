---
name: blog-post-layout
description: Layout rules for a blog post page on this site. Use this skill when writing a new article, editing an existing one, or changing how an article page is arranged. It covers where the table of contents goes and which components an article is built from.
---

# Blog Post Layout

Every article page uses the same layout. Do not hand-roll a layout in the article file.

## Rules

1. The table of contents appears on the right side of the page.
2. An article is rendered with `ArticleLayout`. It supplies the title, the back link, the table of contents and the article body.
3. The table of contents is rendered by `TableOfContents`. Do not add a second one inside the article.
4. Every entry in the table of contents points at a section on the page. Give that section an `id` and set `aria-labelledby` to it.
5. The intro paragraph has no heading, so it gets no table of contents entry.

## Components

- `src/Blogs/ArticleLayout/ArticleLayout.tsx` - the page shell.
- `src/Blogs/ArticleLayout/TableOfContents.tsx` - the list of sections.
- `src/Blogs/ArticleLayout/types.ts` - `TocEntry`, one `{ id, title }` per section.

## Writing an article

```tsx
const sections: TocEntry[] = [
    { id: 'first-section', title: 'First section' },
    { id: 'second-section', title: 'Second section' },
];

const MyArticle = () => (
    <ArticleLayout title="My article" sections={sections}>
        <section className="MyArticle__section">
            <p>Intro paragraph. No heading, so it is not in the table of contents.</p>
        </section>

        <section className="MyArticle__section" aria-labelledby="first-section">
            <h2 id="first-section" className="MyArticle__sectionTitle">
                First section
            </h2>
            <p>Body text.</p>
        </section>
    </ArticleLayout>
);
```

## Placement of the table of contents

- On wide viewports the list sits in the right margin, beside the text column, and stays in place while the article scrolls.
- On narrow viewports there is no room beside the text, so the same list falls back to a row at the top of the article, above the body.
- Both cases render the same element. Do not duplicate the markup for the two cases.

## Section headings

- Section titles are `h2`. Structures or sub-items inside a section are `h3`.
- Section titles need `scroll-margin-top` so a scrolled-to heading does not sit under the sticky header.

## Check before you finish

- Does every `TocEntry` id match an `id` on the page?
- Is the article free of its own back link, its own table of contents and its own outer wrapper?
- Does the article still read top to bottom without the table of contents?
