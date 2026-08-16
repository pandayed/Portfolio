---
name: blog-post-layout
description: Layout rules for a blog post page on this site. Use this skill when writing a new article, editing an existing one, or changing how an article page is arranged. It covers where the table of contents goes and which components an article is built from.
---

# Blog Post Layout

Every article page uses the same layout. Do not hand-roll a layout in the article file.

## Rules

1. The table of contents appears on the right side of the page.
2. An article is rendered with `ArticleLayout`. It supplies the title, the back link, the table of contents, the article body and the comments.
3. The table of contents is rendered by `TableOfContents`. Do not add a second one inside the article.
4. Every entry in the table of contents points at a section on the page. Give that section an `id` and set `aria-labelledby` to it.
5. The intro paragraph has no heading, so it gets no table of contents entry.
6. `ArticleLayout` takes the article's own `route`. It keys the comment thread, so it must never change once a post is live.
7. The comments section and its table of contents entry are added by `ArticleLayout`. Do not add either inside the article.

## Components

- `src/Blogs/ArticleLayout/ArticleLayout.tsx` - the page shell.
- `src/Blogs/ArticleLayout/TableOfContents.tsx` - the list of sections.
- `src/Blogs/ArticleLayout/types.ts` - `TocEntry`, one `{ id, title }` per section.
- `src/Comments/Comments.tsx` - the giscus comment thread at the end of the body.

## Writing an article

```tsx
const sections: TocEntry[] = [
    { id: 'first-section', title: 'First section' },
    { id: 'second-section', title: 'Second section' },
];

const MyArticle = () => (
    <ArticleLayout title="My article" route={MY_ARTICLE_ROUTE} sections={sections}>
        <section className="MyArticle__section">
            <p>Intro paragraph. No heading, so it is not in the table of contents.</p>
        </section>

        <section className="MyArticle__section" aria-labelledby="first-section">
            <h2 id="first-section" className="SectionTitle">
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

- Section titles are `h2` and use the shared `SectionTitle` class. Structures or sub-items inside a section are `h3`.
- `SectionTitle` already carries `scroll-margin-top`, so a scrolled-to heading clears the sticky header. Do not restate its size, weight or colour in the article stylesheet.

## Links and text inside an article

Follow the `link-and-type-styles` skill. In short: a link inside a sentence uses `Link`, the accent colour marks links only, and font sizes come from the tokens in `src/styles/theme.css`.

## Check before you finish

- Does every `TocEntry` id match an `id` on the page?
- Is the article free of its own back link, its own table of contents, its own comments section and its own outer wrapper?
- Does `route` match the route the article is registered under in `src/routing/routes.ts`?
- Does the article still read top to bottom without the table of contents?
