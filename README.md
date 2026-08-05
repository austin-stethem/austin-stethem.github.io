# Enterprise Pricing Architecture

**One cost shock, followed end to end — from raw ERP extract to defended EBITDA.**

Most analytics portfolios are five unrelated demos. This one is a single continuous
scenario. A 15% vendor cost spike hits a parts distribution network, and each of the
five interactive dashboards picks up where the last one left off.

**1. Map the exposure** — A geospatial engine plots competitor density against the
Hub & Spoke network, then uses K-Means clustering on real distance-decay curves to
sort 80 branches into strategic pricing tiers. Rural monopolies can absorb increases.
Hyper-dense urban branches cannot.

**2. Defend the margin** — A deterministic cross-subsidization engine cascades the
cost deficit from the most elastic tier inward, so Key Value Items stay price-locked
while blind inventory carries the load. Includes the FIFO inventory shield.

**3. Stress-test the floor** — 5,000-path Monte Carlo random walk maps the cone of
risk across twelve months, then sweeps the full price band to find the point that
maximizes expected profit. That optimum is rarely the highest price; past a threshold,
elasticity destroys demand faster than margin accrues.

**4. Validate in market** — A randomized A/B test with a two-proportion Z-test, paired
with a minimum detectable effect calculation. The power analysis is the point: a
non-significant result is not proof of no impact, and pricing decisions worth defending
need to know the difference.

**5. Capture the windfall** — Cash-flow model quantifying what a physical inventory
buffer is worth when retail pricing is decoupled from the receiving dock.

Every panel is live and driven by adjustable inputs — no screenshots, no mock data
frozen in place.

---

### How it was built

The code was written by an LLM working from my direction. My contribution was the
specification and the review loop: defining what each engine had to do, supplying the
pricing and inventory logic it needed to encode, testing the output against expected
behavior, and iterating until the tool did what the strategy required.

I state that plainly rather than blur it, because the division of labor is the
interesting part. Generating a Monte Carlo simulation is now cheap. Knowing that a
70% price markup is not 70 margin points, that a non-significant A/B result needs a
power calculation before you act on it, or that a FIFO windfall has to be measured
against replacement cost rather than last quarter's price — that judgment is what
separates a script that runs from a model an executive can price against. It is also
the only part that does not come free with the tooling.

That workflow is the practical argument for this portfolio. It lets one analyst carry
a pricing model from a domain question to a deployed decision-support tool in days,
and put a working artifact in front of leadership instead of a slide describing one.

**What each layer does:**

- **SQL** — Targeted extraction of pricing, inventory, and POS transaction data from
  relational systems, including the sanitization pass that quarantines promotional
  spikes, bulk contracts, and M&A buyouts before they poison a model.
- **Python** — Dynamic financial modeling well past data cleaning: Monte Carlo
  simulation, K-Means clustering, elasticity stratification, landed-cost volatility.
- **BI & Geospatial** — Translating metrics into systems people act on. Mapping
  competitive density, flagging margin degradation the moment it appears.

### Stack

**Analysis & modeling**
`SQL` · `Python` · `Pandas` · `NumPy` · `Scikit-learn` · `SciPy / StatsModels` ·
`GeoPandas` · `Jupyter` · `Advanced Excel` · `Phocas BI`

**Methods**
`Monte Carlo simulation (Box-Muller)` · `K-Means clustering` · `Two-proportion Z-test` ·
`Power analysis / MDE` · `Elasticity stratification` · `Deterministic optimization` ·
`Distance-decay / gravity modeling` · `FIFO cash-flow modeling` · `ERP data stratification`

**Delivery & front end**
`JavaScript (ES6+)` · `HTML5` · `CSS3 (Grid, Flexbox, custom properties)` · `Chart.js` ·
`Leaflet.js + MarkerCluster` · `Tailwind CSS` · `Canvas API` · `SVG` ·
`Responsive & WCAG-conscious markup` · `Git / GitHub Pages`

**Workflow**
`LLM-directed development` · `Prompt engineering` · `Model validation & reconciliation`
