# System Design notes import: phases and progress

Last checked: 2026-10-02

Source: [public Notion System Design database](https://xpandeyed.notion.site/24d24eb1ed54807d8f15d802353c44b3?v=24d24eb1ed548053ada6000cbce89d84). Use the published pages without browser login. The ZIP export is not the source for this work.

## Rules for every phase

- Preserve every statement as written, including statements that may be incorrect. Do not edit the wording, examples, or code to improve them.
- Preserve page order, nested pages, tables, toggles, links, media, and shared content. Keep one source page in one separate data file.
- Change only confirmed import or rendering defects. Leave unrelated Portfolio code and notes untouched.
- Do not add, change, or run tests until the owner has manually reviewed the implementation and explicitly requests test work.

## Current position

| Area | Confirmed progress | Remaining work |
| --- | --- | --- |
| Source inventory | 119 public pages identified: 72 top-level and 47 nested. | Check each rendered page against its public source. |
| Modular import | 119 separate page files under `src/Notes/SystemDesign/pages/`; routes, note tree, index, and shared renderer are connected. | Fix only differences found during the fidelity review. |
| Structured content | 15 tables, 36 code blocks, 19 toggles, and one shared callout source referenced from three pages are represented in the import. | Review their rendered content and behavior across all affected pages. |
| Media | Seven images are represented; five are local assets and two DNS images still use their public Notion URLs. One video embed is represented. | Check the two remote images and video behavior; resolve any broken media. |
| Verification | The build passed. A field-level comparison of captured browser content against generated page files found no missing block IDs or text, HTML, or code field mismatches. Selected pages and navigation were checked in a local browser. | Complete the page-by-page visual review. The field comparison does not prove that every source page was captured or rendered perfectly. |

**Progress interpretation:** All 119 identified pages are in the website, but the import is not accepted as complete until the fidelity and media checks below are finished. No tests, commit, push, or deployment are part of the completed work.

## Phase 1 — Source inventory and capture · Complete

**Scope:** Read the public Notion database and its published pages; identify top-level rows, nested pages, block order, and database views.

**Exit evidence, checked 2026-10-02:**

- The public database capture has 72 top-level rows, 47 nested page links, and 12 database views under nine parent pages. The published table's opening and ending rows were checked again in Chrome without logging in.
- The 119 captured page IDs are unique and match the 119 manifest entries and 119 separate page files exactly. No page file is missing or orphaned.
- The 72 top-level IDs retain the database row order. All 47 nested pages have a valid parent; their captured parent titles match the manifest parent titles. All 47 nested IDs appear in the captured database-view relationships.
- The source capture has 29 pages with no body blocks. The public GraphQL and Builder pages were checked in Chrome and also showed no body. The remaining empty pages still need individual confirmation during Phases 3 and 4; this does not change the inventory count.
- Some nested database links show an icon before the title. The manifest uses the page's actual title, which matches its captured page heading. The ZIP was excluded.

## Phase 2 — Modular website import · Complete and verified

**Scope:** Store each page separately, preserve shared content through a shared source, render Notion block types, and connect the System Design collection to Portfolio Notes routes and navigation.

**Exit evidence, checked 2026-10-02:**

- All 119 page IDs have separate files and unique routes. All 47 nested pages appear under their declared parents. The eight named database views have group routes; four unnamed views remain on their parent pages and no longer register blank direct routes.
- The renderer handles all 21 block types found in the imported files. Three shared references use one shared callout source. The index, a nested note, and a named group page opened in the local browser.
- Inline Notion links keep their destinations while using the site's visible link style. A rendered mention was checked for its local route, accent colour, and underline.
- Parent notes that contain nested views are included in previous/next note navigation. This was checked on The 23 Design Patterns page.
- `npm run build` passed after the Phase 2 fixes. No tests were added, modified, or run. Complete source-to-site wording and media checks remain in Phases 3–5.

## Phase 3 — Top-level page fidelity · Pending

**Scope:** Compare all 72 top-level website pages with their public Notion pages in database order. Work in three checkpoints of 24 pages so progress can be reported without treating a partial audit as complete.

**For each page:** Compare title, status, visible statements, block order, headings, lists, callouts, code, equations, tables, toggles, links, and media where present. Record a page as reviewed only after inspecting its complete content. Correct only a confirmed mismatch.

**Exit criterion:** 72/72 top-level pages reviewed; every found mismatch either fixed or recorded with a concrete blocker.

| Checkpoint | Pages in database order | Reviewed |
| --- | ---: | ---: |
| 3A | 1–24 | 0/24 |
| 3B | 25–48 | 0/24 |
| 3C | 49–72 | 0/24 |

## Phase 4 — Nested page fidelity · Pending

**Scope:** Compare all 47 nested pages with their public Notion pages and verify that each appears under the correct parent or database view. Work in three checkpoints.

**For each page:** Apply the same content comparison as Phase 3, then check its parent group and navigation path. Correct only a confirmed mismatch.

**Exit criterion:** 47/47 nested pages reviewed; parent relationships and links to nested pages verified.

| Checkpoint | Nested pages in manifest order | Reviewed |
| --- | ---: | ---: |
| 4A | 1–16 | 0/16 |
| 4B | 17–32 | 0/16 |
| 4C | 33–47 | 0/15 |

## Phase 5 — Shared content, links, and media · Pending

**Scope:** Review cross-page behavior after individual pages have been checked.

- Verify that the three references to the shared callout display the same source content.
- Check all 15 tables and 36 code blocks for complete rows, formatting, and readable overflow.
- Follow imported page links and verify that links to pages outside this collection still open their original Notion destinations.
- Check all seven images. Five are local; two DNS images currently depend on public Notion URLs. Keep their source content intact while resolving any broken image.
- Check the video embed in the browser. Its playback has not been verified.
- Check collection views, group nesting, and navigation back to the System Design index.

**Exit criterion:** Shared content, media, links, and navigation work in the local browser, or each remaining limitation is documented precisely for the owner.

## Phase 6 — Owner review and handoff · Pending

**Scope:** Present the completed import for manual review, fix confirmed feedback within this import, and rerun the build after final changes. Report any remaining external media dependency or inaccessible public page.

**Exit criterion:** The owner has reviewed the result and either accepted it or identified specific changes. Tests are a separate later step only if explicitly requested after manual review. Commit, push, and deployment remain with the owner unless separately requested.

## Progress log

Update this table at the end of each checkpoint. Keep counts tied to pages actually reviewed against the public source.

| Date | Checkpoint | Result | Open items |
| --- | --- | --- | --- |
| 2026-10-02 | Phase 1 verification | 119 unique public page IDs reconciled with 119 files; root order, nested parents, and database-view membership checked. | Confirm the remaining empty page bodies during Phases 3–4. |
| 2026-10-02 | Phase 2 verification | 119 page routes and eight named group routes reconciled; blank unnamed routes and inline link styling fixed; build and selected browser checks passed. | Phases 3–6. |
