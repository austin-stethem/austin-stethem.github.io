# Working notes for this repository

Read this before changing anything. It records decisions that are not obvious from
the code and that have already been got wrong once.

This file is public. It states rules without restating the figures they protect.

---

## What this is

A portfolio site for a pricing and master-data analyst applying to Project Manager,
BSA, Product Owner, Pricing and FP&A roles. One landing page plus fifteen case
studies in three tracks of five: Defense, Attack, Foundations.

`index.html` carries its own complete layout in an inline `<style>` block. The
fifteen case studies share `portfolio.css`. **These are two separate layout systems**,
and `index.html` loads `portfolio.css` too.

So an unscoped element selector in `portfolio.css` reaches the landing page. Some of
that is a leak and some of it is load-bearing, and you have to tell which before
touching it:

- **Load-bearing.** `h2, h3 { text-align: center }` is what centres the landing
  page's section headings. `index.html` sets font, size, weight and colour on `h2`
  but deliberately not alignment. Scoping that rule to `body.doc` would left-align
  four landing-page headings.
- **A leak.** The prose emphasis underline (`p > strong` and friends) reaches
  landing-page copy, and `index.html` already carries two patches against it.
- **Dormant.** `aside h3` matches nothing today but `index.html` has
  `<aside class="rail">`.

Before scoping or removing any unscoped selector in `portfolio.css`, grep
`index.html` for elements it would match and check whether the landing page is
relying on it. `body.doc` scoping is correct for new case-study rules; it is not a
blanket instruction for existing ones.

---

## Colour tokens

31+ tokens, defined identically across eleven palettes. `portfolio.css` is the live
one; the `portfolio-*.css` files are alternates and must stay in sync.

Two families, and the distinction matters:

| Family | Means | Behaviour |
|---|---|---|
| `--surface-*` | a card | **inverts** with the theme |
| `--panel-*` | an instrument panel | **dark in both themes, always** |

The case-study dashboards are `--panel-*` and must stay dark. Their Chart.js grid
colours, the Leaflet basemap and the syntax-highlighted code blocks are all built for
a dark ground; inverting the panel breaks all three.

Because of that split there are two ambers:

- `--signal` — the one accent, for normal inverting grounds. Light `#9a5b00`, dark `#eca457`.
- `--panel-signal` — `#f2c14e` in both modes, **only** on the permanently-dark panels.

A light-mode value tuned for a white card will fail on a dark panel and vice versa.
Check the ground before picking the token.

### Rules

- Never hardcode a colour. Not in CSS, not in an inline `style`, not in a Tailwind
  arbitrary value, not in an SVG `fill`/`stroke` attribute, not in a `@keyframes`
  block, not in a JS colour assignment, not in a URL query string. Every one of
  those has hidden a stale colour at some point.
- Verify contrast on the **actual** background, both modes. Text needs 4.5:1; large
  text and graphical elements need 3:1.
- Every page has an inline `<style id="boot">` declaring the paint-critical tokens
  ahead of the stylesheet link. If a token used before paint changes, change it there
  too, or the first frame flashes the wrong colour.

---

## Voice

Four things belong in any claim about the work:

1. the decision made
2. the alternative rejected, and why
3. who consumes the output and what they do differently
4. what it costs when it is wrong

Avoid: `we must`, `let's`, `utilize`, `leverage` as a verb, `seamless`,
`production-grade`, `world-class`, `robust`, `moves the needle`. Avoid asserting
hand-written code — the application layer was specified and directed, the SQL was
not. Do not disparage colleagues or the employer; problems here were **invisible**,
not ignored, and each mention should say why they could not be seen.

Prose is left-aligned at a readable measure. Headings centre, except in the sequence
section where they share the entries' left axis. Data rows stay label-left,
figure-right so the figures column up.

---

## Disclosure

**No price, cost, margin, discount divisor, customer name, account identifier or
vendor term appears anywhere in this repository.** Findings are stated as ratios or
rounded magnitudes. Dashboard figures are synthetic; the structures and failure
modes are real.

Several private working documents hold the unrounded figures for interview use.
`.gitignore` lists them by name. Do not commit them, do not quote from them into a
tracked file, and do not add a file that restates a figure they contain.

---

## Verification

Automated checks on this project have repeatedly reported clean while real problems
persisted. Regex sweeps missed colours inside keyframes, inside URLs, and inside a
second `<style>` block. A brace-balance check passed a mangled selector group. A
grammar check missed nine broken sentences because tag-stripping created false
positives that masked them.

So: after any bulk edit, **read a sample of the rendered output by eye.** That has
caught more than the checkers have.

One failure mode worth naming: a block of mobile rules once sat outside its
`@media` query and fired at every width, hiding table headers and stacking rows on
desktop across ten pages. It survived a long time because every individual rule was
correct and nothing was unbalanced. When you touch a media query, check the closing
brace lands where you think it does.

Before considering a change done:

- both themes
- narrow and wide viewports (breakpoints at 1340, 1620, 1900 px)
- the guided walkthrough on the page still runs to its last step
- tags balanced, braces balanced, heading levels not skipped
- all eleven palettes still carry identical token sets

---

## Deploying

GitHub Pages from `main`, root. The stylesheet link carries a `?v=` query string;
bump it when `portfolio.css` changes or returning visitors keep the cached copy
against new markup. After a push, re-run LinkedIn's Post Inspector so the preview
card re-scrapes.
