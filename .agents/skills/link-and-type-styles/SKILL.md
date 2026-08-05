---
name: link-and-type-styles
description: Link and typography rules for this site. Use this skill when adding or changing any link, heading, font size or colour, when writing a new component stylesheet, or when building a new page or article. It covers which link class to use, what the accent colour is allowed to mark, and the shared type scale.
---

# Link and Type Styles

The accent colour marks a link and nothing else. Text sizes come from tokens, not from numbers typed into a component stylesheet.

## Rules

1. Use `var(--color-accent)` only on links. Never on headings, labels, table cells or any other plain text.
2. Pick one of the three link classes below. Do not write a new link style in a component stylesheet.
3. Hover may change colour and underline thickness. It must never change `font-style`, `font-family`, `font-weight` or `font-size`, because those reflow the text.
4. Underlines come from `text-decoration`, never from `border-bottom`.
5. Never set `display: inline-flex` on a link that sits inside a sentence. It stops the link wrapping across lines.
6. Never hardcode a `font-size`. Use a token from the type scale.
7. Titles use the shared `PageTitle` and `SectionTitle` classes. Do not restate their size, weight and colour in a component stylesheet.
8. Non-link emphasis is carried by font family, weight and letter case. Not by colour.

## Link classes

All three live in `src/CommonClasses/CommonClasses.css`.

| Class | Use for | Resting | Hover |
| --- | --- | --- | --- |
| `Link` | a link inside a sentence | accent, underlined, inherits the font of the sentence | underline thickens |
| `Link Link--standalone` | a link that sits alone on a line: list titles, back links | accent, no underline | underline appears |
| `NavLink` | header, footer and table of contents | subtle grey sans, no underline | turns accent |

Prose links are always underlined. That is what separates them from body text, which is never accent coloured and never underlined.

Standalone links skip the underline because they already sit alone on a line, so the accent colour alone identifies them.

`NavLink` is for chrome, not content. Chrome stays quiet so it does not compete with links in the text.

## Using them

```tsx
// Inside a sentence.
<p>
    The rest is on the <a href={href} className="Link">container complexities</a> page.
</p>

// Alone on a line, as a list title or a back link.
<a href={href} className="Link Link--standalone Blogs__title">{title}</a>

// Header, footer, table of contents.
<a href={href} className="NavLink">Blogs</a>
```

A component class may set size or spacing alongside the link class. It must not set colour or text decoration.

```css
/* Correct. Size only. */
.Blogs__title {
    font-size: var(--text-body);
}
```

## Type scale

Declared in `src/styles/theme.css`. Use the token, not the number.

| Token | Size | Use for |
| --- | --- | --- |
| `--text-title` | 1.5rem | page and article titles |
| `--text-heading` | 1.25rem | section headings, `h2` |
| `--text-lead` | 1.125rem | the intro paragraph on the home page |
| `--text-subheading` | 1rem | sub-items inside a section, `h3` |
| `--text-body` | 1.0625rem | body text, list titles |
| `--text-secondary` | 0.9375rem | summaries, notes, table body text |
| `--text-small` | 0.875rem | chrome, legends, back links |
| `--text-fine` | 0.8125rem | code, table figures, table of contents entries |
| `--text-label` | 0.6875rem | uppercase labels and table column headings |

If a size you want is not in the scale, use the nearest token. Add a new token only when the design genuinely needs a step that does not exist, and add it to `theme.css` so every page can reach it.

Two things are not type scale steps and are allowed to set their own size:

- A ratio in `em` that has to track the text around it, such as `code { font-size: 0.875em }` in `src/index.css`.
- An icon glyph, such as `.ThemeToggle`.

## Titles

```tsx
<h1 className="PageTitle">Bookshelf</h1>
<h2 id="the-test" className="SectionTitle">The test</h2>
```

`SectionTitle` already carries `scroll-margin-top`, so a scrolled-to heading clears the sticky header. Do not add that again in the article stylesheet.

## Uppercase labels

Small uppercase labels are the standard way to mark something without colour. Keep them consistent:

```css
font-family: var(--font-sans);
font-size: var(--text-label);
font-weight: 600;
letter-spacing: 0.06em;
text-transform: uppercase;
```

## Colours

- `--color-text` for body text and headings.
- `--color-text-subtle` for secondary text, chrome and captions.
- `--color-accent` for links only.
- `--color-border` for rules and hairlines.

Every colour must be a token. A raw hex value in a component stylesheet breaks dark mode, because the tokens are what get swapped under `[data-theme='dark']`.

## Check before you finish

- Is every use of `--color-accent` on something clickable?
- Does every link use `Link`, `Link Link--standalone` or `NavLink`, with no bespoke link style beside it?
- Does any `:hover` rule change a font property? Remove it.
- Is there a hardcoded `font-size` or hex colour anywhere in the diff? Replace it with a token, unless it is one of the two exceptions above.
- Can a reader tell the link text from the text around it without hovering?
- Does the page still read correctly in dark mode?
