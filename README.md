<p align="center">
  <img src="og-preview.png" alt="Austin Sonny Stethem, Strategic Pricing & Master Data Analyst" width="820">
</p>

<h1 align="center">Enterprise Pricing Architecture</h1>

<p align="center">
  <strong>One cost shock, followed end to end &mdash; from raw ERP extract to defended EBITDA.</strong>
</p>

<p align="center">
  <a href="https://austin-stethem.github.io">
    <img src="https://img.shields.io/badge/View_the_live_portfolio-e0913f?style=for-the-badge&labelColor=14171a" alt="View the live portfolio">
  </a>
</p>

<p align="center">
  <sub>
    Python · Pandas · NumPy · Scikit-learn
    &nbsp;&nbsp;•&nbsp;&nbsp; Anonymized proxy data
    &nbsp;&nbsp;•&nbsp;&nbsp; No build step
  </sub>
</p>

---

## The Problem This Portfolio Is About

A price ladder with eight tiers should produce eight prices for a part. I pulled the rolling twelve-month history for one high-volume item and found **400+ distinct prices**, from indexed 100 to indexed 204 &mdash; a 104% spread on an identical part, and a new distinct price roughly every twenty-one hours for a year.

Nobody decided that. Pricing structures fragment the way anything fragments without maintenance: a schedule built for the business as it was, a special arrangement for an important customer, discretion granted to the field to close a deal on a Friday, then twenty years of all three. Each step is defensible. Nobody signs off on four hundred prices.

What makes it expensive is the shape of the repair. A fragmented database can be normalised over a weekend. A fragmented price file cannot, because every anomalous price is attached to a person: a customer who has paid it for nine years, a manager who negotiated it, a rep whose relationship depends on it. **Prevention is a policy decision. Repair is a negotiation programme**, and its cost scales with headcount and tenure, not data volume.

Sixteen case studies across three tracks, built around that.

---

## The Three Tracks

Each track is a five-step chain, not a set of demos &mdash; every page picks up where the last one left off.

### Defense, holding margin when costs move

A 15% vendor cost spike hits the network. Five steps from mapping exposure to capturing the windfall.

| # | Case study | What it does |
| :--- | :--- | :--- |
| 1 | Predictive VIO Market Capture | K-Means branch tiering on revenue-decay profiles, with a derived confidence metric and a shape test that separates hub-stores from remote branches |
| 2 | Algorithmic Margin Defense | Deterministic cross-subsidization across an eight-tier ladder, protecting elastic items by loading inelastic ones |
| 3 | Stochastic Optimization | Monte Carlo price sweep with common random numbers for variance reduction, producing a risk cone instead of a point estimate |
| 4 | A/B Testing Framework | Two-proportion Z-test with power analysis, validating in market before anything reaches the ERP |
| 5 | FIFO Inventory Revaluation | Windfall cash-flow model measured against avoided cost, not the price increase |

### Attack, where growth comes from, cheapest first

Ordered by what each costs to execute: a building, a lost customer, a conversation, and finally nothing at all.

| # | Case study | What it does |
| :--- | :--- | :--- |
| 1 | Market Capture Engine | 3,768 competitor rooftops across ten brand families. Serves four functions off one map: rep deployment, promotional targeting, regional price positioning, and merger closure forecasting |
| 2 | Greenfield VIO Expansion | Drive-time coverage subtracted from vehicle density, tested against the cost of the building it would take |
| 3 | Lost Account Win-Back | Churn labels derived from revenue trend instead of collected, ranked by recoverable profit under recency decay |
| 4 | Wallet Share & Affinity | Association rule mining filtered on lift, not confidence, over a three-level per-account drill-down ranked by profit at every level |
| 5 | Contract Tier Clawbacks | Volume-tier entitlement auditing, with competitive exposure deciding which accounts are safe to reprice |

### Foundations, five ways a data system reports something confidently and wrong

| # | Case study | The failure |
| :--- | :--- | :--- |
| 1 | ERP Crisis Reconciliation | *The inventory is on the shelf.* It was under four feet of river. |
| 2 | Master Data Reconciliation | *These are two different customers.* Same entity, two spellings. |
| 3 | Logistics Spider-Mapping | *This is where the customer is.* That is a post office box. |
| 4 | Territory Balancer | *This account belongs to one rep.* Several are calling on it. |
| 5 | The Extract Layer | *This is what the item cost.* Cost is a convention, absent on a share of lines and silently treated as zero. |

---

## How It Was Built

> **The one measured outcome.** In the year a flood destroyed the primary warehouse, this network posted the only net-positive annual growth within its national alliance of independently owned distributors: a peer group that faced the same market and the same vendor pressure, but not the same river. Most of this portfolio carries no realised financial figure, because I do not sit in a function that sees realised profit and loss. Where a number would be invented instead of measured, there is none.

> **How these started.** Most of them were not assigned. The pricing dispersion was not on
> anyone's list because no report existed that would have shown it; the churn labels were not
> requested because nobody knew they were missing; the competitor dataset did not exist and no
> vendor was going to sell it at a price anyone would approve. I went looking, built the thing,
> and took it to whoever had to act on it &mdash; which is a different job from being handed a
> specification, and it is the job I want.

> **Where the work is.** Every engine here starts in the same place, and it is not the code. It is
> knowing which tables hold the truth and which hold something that only looks like it; which
> columns are populated consistently enough to average; how the tables join, and what a failed join
> silently deletes; which negative rows are customer credits, which are internal transfers and which
> are corrupt; which API will answer the question and how to get access to it. The SQL is mine &mdash; the
> extracts, the joins, the exclusion rules, the definitions of revenue and cost. The application
> layer around it I specified, directed and validated not hand-wrote, and I run the
> environment, the version control and the deploys. Generating a Monte Carlo simulation costs
> nothing now; knowing that every scenario has to be evaluated against the same random draws, and
> catching it when it is not, is the whole job; and that error is invisible in code that runs
> perfectly.

> **Who these were for.** None of this was built to be admired. Every model went to somebody
> who had to act on it: a pricing manager approving a floor, a sales director deciding whether a
> rebalance was worth the disruption, an operations manager who knew the delivery routes better
> than the model did, an executive signing off capital. That constrains what a tool is allowed to
> claim. One that overstates what it knows gets dismissed once, and takes the finding underneath it
> along &mdash; so most of the design decisions here are about staying inside what the data could support.

> **On the data.** Every figure in every dashboard is synthetic. Structures, ratios and failure modes are drawn from production systems; the numbers are proxies. Competitor brands, customer names and branch identifiers are fictional and consistent across pages, so an account appearing in one case study is the same account in the next.
>
> **On what is withheld.** The findings described in prose are real observations, but they are stated as ratios or rounded magnitudes, not exact figures. No price, cost, margin, discount divisor, customer name, account identifier or vendor term appears anywhere in this repository. The price-dispersion chart is indexed to its own lowest observed value: the shape of the distribution is the finding, and the dollar amounts underneath it belong to an employer, not to me.

---

## What Each Layer Does

| Layer | Role |
| :--- | :--- |
| **SQL** | Targeted extraction of pricing, inventory and transaction data, with the exclusion logic applied at the source, not downstream: dead accounts, non-transacting line types, labour and service product groups, and internal store-to-store transfers are filtered before a single row reaches Python. Gross profit is derived at extract time from store-intake cost, which is what ties the margin figures to the price ladder, not to list. |
| **Python** | Financial and spatial modelling well past data cleaning: Monte Carlo simulation, K-Means clustering with derived confidence scoring, association rule mining, haversine distance at scale, and the geocoding rescue pipeline behind the location census. |
| **Geospatial** | Rooftop-precision mapping of 3,768 competitor locations and roughly 32,000 customer delivery points across eight states, with a proximity shield bounding a geocoding input that cannot be fixed at source. |

---

## Repository Contents

| File | What it is |
| :--- | :--- |
| `index.html` | Landing page and project index |
| `predictive-vio-market-capture.html` | Defense 1, geospatial exposure, K-Means tiering |
| `algorithmic-margin-defense.html` | Defense 2 &mdash; cross-subsidization engine |
| `stochastic-margin-optimization.html` | Defense 3 &mdash; Monte Carlo risk cone |
| `ab-testing-framework.html` | Defense 4 &mdash; two-proportion Z-test |
| `fifo-inventory-revaluation.html` | Defense 5, FIFO windfall model |
| `market-capture-engine.html` | Attack 1, competitor census, merger modelling |
| `greenfield-vio-expansion.html` | Attack 2, whitespace to capex payback |
| `win-back-engine.html` | Attack 3, churn classification and recovery ranking |
| `wallet-share-affinity.html` | Attack 4, association rules, support and lift |
| `contract-tier-clawbacks.html` | Attack 5, entitlement audit |
| `erp-reconciliation-engine.html` | Foundations 1, disaster recovery and phantom fulfilment |
| `legacy-silo-resolution.html` | Foundations 2 &mdash; entity resolution |
| `logistics-spider-mapping.html` | Foundations 3, route overlap and bounded error |
| `territory-balancer.html` | Foundations 4 &mdash; workload distribution and coverage capacity |
| `extract-layer.html` | Foundations 5 &mdash; margin definition and exclusion governance |
| `portfolio.css` | Shared token sheet. **Dual mode**, Amber in light, Nocturne in dark |
| `portfolio-*.css` | Ten single-mode palette alternatives; rename one to `portfolio.css` to switch |
| `og-preview.png` | 1200×630 link-preview image referenced by the Open Graph tags |
| `Stethem_Austin_Resume.pdf` | Linked from the home page rail and footer |

---

## Theming

Colour is defined once. Every page resolves its palette through 36 CSS custom properties
in `portfolio.css`, so changing that one file re-themes all sixteen pages: the light
chrome, the dark instrument panels and the chart series together.

**The live sheet is dual mode.** Amber in light, Nocturne in dark, resolved in this order:

1. an explicit choice the visitor made, stored and applied as `data-theme`
2. Otherwise the operating system preference, via `prefers-color-scheme`
3. Otherwise light

A switch sits in the header of every page. A small script in `<head>` applies any stored
choice before first paint, so a visitor who prefers dark never sees a flash of light.

**Ten single-mode alternatives** ship alongside it &mdash; Blueprint, Moss, Nocturne Cyan,
Monochrome, Indigo, Oxblood, Amber, Plum, Brass and a dark Nocturne. Rename any of them to
`portfolio.css` to switch. All eleven define the same token set and all clear WCAG AA on
body text, muted text, the signal colour, button labels, table headers and panel text.

Two conventions the palettes hold to. **Data-series colours keep their meaning** &mdash; green
favourable, red adverse, in every variant, because swapping those breaks chart
readability even where it would look better. And **the signal colour is never reused as a
data colour**; each palette carries a separate gold for chart highlights, so an accent that
identifies chrome cannot be mistaken for one that identifies a series.

---

---

## Running It Locally

No build step and no package manager. Open `index.html` directly, or serve the folder if you want relative paths and Open Graph tags to resolve exactly as they do in production:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Charting and mapping libraries load from cdnjs, so the dashboards need a network connection. If a library fails to load, each page degrades deliberately instead of breaking: the written analysis renders as normal and the interactive panel is replaced with a short notice.

---

## A Note on the Data

Every figure in these dashboards is generated from an anonymized proxy dataset. Branch coordinates, landed costs, POS revenue, and margin targets are randomized. The architecture, the elasticity logic, and the statistical methods are the production ones; the numbers are not real, and no client or employer data appears anywhere in this repository.

---

<p align="center">
  <strong>Austin Sonny Stethem</strong><br>
  Strategic Pricing &amp; Master Data Analyst<br>
  <a href="https://www.linkedin.com/in/austin-stethem-4503b4197/">LinkedIn</a> ·
  <a href="mailto:austinstethem1976@gmail.com">austinstethem1976@gmail.com</a>
</p>
