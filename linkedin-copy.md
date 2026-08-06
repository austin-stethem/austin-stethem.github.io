# LinkedIn Copy

Three versions, because "description" could mean any of them. All plain text —
**LinkedIn renders no markdown**, so no asterisks, no headers, no hyphen bullets that
turn into lists. Line breaks are the only formatting you get. Paste as-is.

---

## 0. Projects section entry — describes the portfolio itself

This is the one that sits *alongside* the link, so it describes the artifact rather than
your career. No "open to opportunities," no positioning — someone reads this to decide
whether to click. Limit is 2,000 characters; verified at 1,975.

**Project name:** `Enterprise Pricing Architecture — A Five-Panel Scenario`
**URL:** `https://austin-stethem.github.io`

```
A single cost shock, followed end to end: from raw ERP extract to defended EBITDA.

Most analytics portfolios are unrelated demos. This is one continuous scenario. A 15% vendor cost spike hits a parts distribution network, and five interactive dashboards each handle the next stage of the response.

1. Exposure. A geospatial engine maps competitor density against the Hub & Spoke network, then uses K-Means clustering on distance-decay curves to sort 80 branches into pricing tiers. A rural monopoly can absorb an increase. A hyper-dense urban branch cannot.

2. Defense. A deterministic cross-subsidization engine cascades the cost deficit from the most elastic tier inward, keeping Key Value Items price-locked while blind inventory carries the load. Includes the FIFO inventory shield.

3. Risk. A 5,000-path Monte Carlo maps the cone of profit risk across twelve months, then sweeps the price band for the point that maximizes expected profit. That optimum is rarely the highest price: past a threshold, elasticity destroys demand faster than margin accrues.

4. Validation. A randomized A/B test on a two-proportion Z-test, with a minimum detectable effect calculation. The power analysis is the point: a non-significant result is not proof of no impact, and a price increase worth defending needs to know the difference.

5. Capture. A cash-flow model quantifying what an inventory buffer is worth once retail pricing is decoupled from replacement cost.

Every panel is live: move the inputs and the models recalculate. Data is anonymized proxy throughout — the architecture and logic are production-grade, the numbers are not.

Construction: the code was written by an LLM working from my direction. I specified what each engine had to calculate, supplied the pricing and inventory logic, and validated the output until the behavior matched the strategy.

Stack: SQL, Python (Pandas, NumPy, Scikit-learn, SciPy, GeoPandas), JavaScript, Chart.js, Leaflet.js, Tailwind.
```

**Which one to use where:**

| Section | Purpose | Version |
|---|---|---|
| Projects | Describe the artifact | #0 above |
| About | Describe you | #1 below |
| Featured | One-line teaser under a link tile | #2 below |
| Feed post | Announce it | #3 below |

If you're using both Projects and About, they will be read together — so the AI-authorship
sentence appearing in both is intentional, not redundant. Changing the wording between them
is what would look evasive.

---

## 1. About section — revision of your existing text

Your version had better material than my earlier draft (the 80-branch scope, the MDM
angle, the specific focus areas), so this is a revision rather than a replacement. Three
structural changes, explained below the copy. 2,004 of 2,600 characters.

```
I co-manage cost architecture, master data, and pricing strategy for an 80-branch distribution network with a multi-million SKU catalog. In that business millions of dollars are won and lost in the margins, and most of them move before anyone runs a report.

My work sits between data governance and financial strategy, because you cannot build a predictive pricing model on a broken cost record. Before the modeling matters at all, landed costs have to be right, SKUs have to resolve, and POS history has to mean what it says it means.

What interests me is the shift from reporting what happened last month to modeling what happens next. In practice that has meant architecting geospatial radars that map market topography and expose delivery bleed, building Python risk models that stress-test price floors before they reach the ERP, and designing cross-subsidization logic that holds Key Value Items steady when a vendor cost spike lands.

On AI, since it comes up: I use LLMs to build the tooling, working from my own specifications, then validate the output against the business before it informs a decision. Generating a Monte Carlo simulation is cheap now. Knowing that a 70% markup is not 70 margin points, or that an inconclusive A/B test needs a power calculation before anyone acts on it, is not. That judgment is what I bring to it.

I published a working example rather than describing one — a single cost shock followed end to end across five live dashboards: austin-stethem.github.io

Core Focus Areas

• FP&A & Margin Strategy: EBITDA defense, variance analysis, KVI cross-subsidization, elasticity stratification

• Systems Architecture & MDM: ERP cost architecture, SKU lifecycle management, POS resolution, data governance

• Geospatial & Market Intelligence: whitespace expansion, competitor topography, fleet and route optimization

• Technical: Python (Pandas, NumPy, Scikit-learn, GeoPandas, SciPy, Flask), Jupyter, SQL, JavaScript, Leaflet.js, Phocas BI, LLM-directed development
```

### What changed and why

**The 80-branch scope moved to the first sentence.** It was at word 92 of 123 — past the
truncation point. On mobile a recruiter saw only "millions of dollars are won or lost in
the margins" plus "the exact intersection of FP&A..." before deciding whether to expand.
Leading with concrete scope is the single highest-value change here; everything else is
polish.

**The AI paragraph now matches your portfolio.** Your draft said you leverage AI "as a
collaborative copilot for Exploratory Data Analysis." Your site and README say the code was
written by an LLM working from your direction. A recruiter who reads both finds two
different accounts of the same work, and the smaller claim is the one that looks like
hedging. Same wording in both places, once, stated plainly.

**Four phrases cut:**
- *"the exact intersection of"* — three-way intersections are a consulting cliché, and
  "exact" is doing no work.
- *"unassailable foundation"* — nobody's ERP is unassailable, and a Director of Pricing
  knows it. Replaced with the specific things that actually have to be true.
- *"raw operational chaos into actionable financial leverage"* — three buzzwords braced
  together. The concrete examples in the paragraph above already make the point.
- *"Early in my career, I realized..."* — framed an obvious truth as a personal epiphany.
  Now stated as the reason the work is structured the way it is.

**"AI-Accelerated Tech Stack" became "Technical."** The stack isn't AI-accelerated; the
workflow is, and that's already covered in its own paragraph. Also added SciPy, since the
A/B validation depends on it.

### Two things to check

**Flask — confirmed and restored.** Worth knowing the distinction, because a technical
interviewer will click the portfolio and find no server: the production engine ran as a
Flask app; the published dashboards are static reimplementations of the same logic with
proxy data. That's not a weakness, it's a stronger claim than the portfolio alone makes —
it means this ran for real. Have the one-liner ready:

> "The production version ran as a Flask app serving the model output internally. What's
> online is a static reimplementation of the same logic against proxy data, because I can't
> publish a server that touches the live ERP."

Without that sentence, "Flask" on your profile plus a static site looks like padding. With
it, it's evidence of a deployed internal tool.

**A number beyond 80 branches.** Any shareable figure — margin points defended, dollars of
FIFO windfall, SKUs repriced — belongs in the first paragraph and would outperform every
other sentence here.

## 2. Featured link description

If you're adding the portfolio to your Featured section, the blurb is short and gets
truncated hard. ~230 characters:

```
One cost shock followed end to end across five live dashboards: geospatial exposure mapping, cross-subsidization, Monte Carlo stress-testing, A/B validation with power analysis, and FIFO windfall capture. Interactive, not screenshots.
```

---

## 3. Announcement post

For actually putting it in the feed. First line is the scroll-stopper; LinkedIn truncates
around 210 characters, so the hook has to land before that.

```
Most analytics portfolios are five unrelated demos. I wanted to build the opposite: one cost shock, followed all the way through.

A 15% vendor cost spike hits a parts distribution network. Five interactive dashboards, each picking up where the last one left off.

Map the exposure. K-Means clustering on real distance-decay curves sorts 80 branches into pricing tiers. A rural monopoly can absorb an increase. A hyper-dense urban branch cannot.

Defend the margin. A deterministic engine cascades the deficit from the most elastic tier inward, so the items customers price-check us on stay locked.

Stress-test the floor. 5,000 Monte Carlo paths, then a sweep of the whole price band. The profit-maximizing price is almost never the highest one — past a threshold, elasticity destroys demand faster than margin accrues.

Validate in market. A two-proportion Z-test with a minimum detectable effect calculation. This one mattered most to me: at our sample size the test could only resolve a shift of about 1.7 points, and the drop we measured was half a point. "Not significant" meant "smaller than we can see," not "zero." That distinction is the difference between a defensible price increase and a slow leak.

Capture the windfall. What a physical inventory buffer is actually worth when pricing is decoupled from replacement cost.

Worth saying plainly: the code was written by an LLM under my direction. I specified the logic, supplied the pricing domain knowledge, and validated the output. The first working version had three math errors — all of them domain errors, not coding errors. Finding those is the job.

Proxy data throughout, real architecture.

austin-stethem.github.io
```

---

## Notes on the choices

**No emojis.** Your original had 🚀 and 🛠️. They're normal on LinkedIn, but your site is
navy-and-crimson restraint, and a recruiter who clicks through from an emoji-heavy post to
that site feels a mismatch. If you want one, put a single one at the top of the post and
nowhere else.

**Keyword coverage for recruiter search.** The About section deliberately contains: pricing
strategy, master data management, revenue management, EBITDA-adjacent language, blended
margin, elasticity, Monte Carlo, SQL, ERP, analytics. Those are the terms that surface you
in a search. Don't strip them for elegance.

**The AI paragraph stays in all three.** It's the same sentence across your site, README,
and profile, which is the point — a recruiter who checks two of the three finds one
consistent story. Inconsistency there is what creates doubt.

**The post admits the three bugs. The About section doesn't.** Deliberate. A post is a
place to be interesting and a little vulnerable; a profile is a place to be credible. Save
the bug story for conversation and the feed, where it reads as confidence rather than as a
disclaimer.

**One thing to add if you can.** Any real, shareable outcome number would outperform every
sentence here. "Protected X points of blended margin during a Y% cost spike" in the first
three lines of the About section would do more than the entire five-panel list.
