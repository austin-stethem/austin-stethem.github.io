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

I wrote the SQL and Python logic locally in VS Code and used an LLM as a copilot for
the front-end deployment layer. Worth stating plainly, because the distinction matters
to anyone evaluating this: the financial models and data architecture are mine. The
JavaScript that renders them in a browser was accelerated.

That workflow is the actual point. It lets one analyst take a pricing model from
exploratory analysis to a deployed decision-support tool in days, and put a working
artifact in front of an executive instead of a slide describing one.

**What each layer does:**

- **SQL** — Targeted extraction of pricing, inventory, and POS transaction data from
  relational systems, including the sanitization pass that quarantines promotional
  spikes, bulk contracts, and M&A buyouts before they poison a model.
- **Python** — Dynamic financial modeling well past data cleaning: Monte Carlo
  simulation, K-Means clustering, elasticity stratification, landed-cost volatility.
- **BI & Geospatial** — Translating metrics into systems people act on. Mapping
  competitive density, flagging margin degradation the moment it appears.

### Stack

`SQL` · `Python (Pandas, Scikit-learn, GeoPandas)` · `Leaflet` · `Phocas BI` ·
`Advanced Excel` · `AI-assisted development`
