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
- **Load-bearing.** `.theme-switch`, with its `.sw` `.track` `.sun` `.moon` children.
  The markup sits on all sixteen pages; the styling exists only here. Those child
  names are generic and live in a global namespace, so a `.track` added to
  `index.html` for anything else collides on contact.
- **A leak.** The prose emphasis underline (`p > strong` and friends) reaches
  landing-page copy, and `index.html` already carries two patches against it.
- **A near-miss.** `h2[id], h3[id], section[id], div[id] { scroll-margin-top: 64px }`
  also matches the landing page's `div.sec[id]`. That page's own rule wins by a single
  point of specificity and supplies the real offset, measured from the masthead at
  runtime. Weaken it and in-page jumps land underneath the sticky header.
- **Dormant.** `aside h3` matches nothing today but `index.html` has
  `<aside class="rail">`. Likewise every `input[type="range"]` rule, and
  `a/button/input:focus-visible`, which already outranks the landing page's own bare
  `:focus-visible`.

Before scoping or removing any unscoped selector in `portfolio.css`, grep
`index.html` for elements it would match and check whether the landing page is
relying on it. `body.doc` scoping is correct for new case-study rules; it is not a
blanket instruction for existing ones.

### Cascade order

Every page loads three stylesheets: the inline `<style id="boot">`, then
`portfolio.css`, then the page's own `<style>` block. The page block is last, so it
wins every specificity tie against the shared sheet. That is why `portfolio.css`
doubles two class names — `.doc-tagline.doc-tagline` and
`.next-step-box.next-step-box p` — instead of reaching for `!important`. Keep the
technique; both doubled rules are there because the single-class version lost.

The two systems also disagree about where mobile starts. The landing page breaks at
1080px and 760px, `portfolio.css` at 800px, so 760–800px is a band where one system's
mobile rules are live and the other's are not. The wide steps agree at 1340 and 1900;
1620 is case-study only.

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
- narrow and wide viewports — case studies break at 800, 1340, 1620 and 1900 px, the
  landing page at 760, 1080, 1340 and 1900
- if `portfolio.css` was touched at all, open `index.html` as well
- the guided walkthrough on the page still runs to its last step
- tags balanced, braces balanced, heading levels not skipped
- all eleven palettes still carry identical token sets

---

## Deploying

GitHub Pages from `main`, root. The stylesheet link carries a `?v=` query string;
bump it when `portfolio.css` changes or returning visitors keep the cached copy
against new markup. That string is written out in all sixteen pages and they have to
move together — a page left behind serves stale CSS against fresh markup, which is the
one failure that looks like a layout bug rather than a cache. After a push, re-run
LinkedIn's Post Inspector so the preview card re-scrapes.
