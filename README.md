<p align="center">
  <img src="og-preview.png" alt="Austin Sonny Stethem — Strategic Pricing & Master Data Analyst" width="820">
</p>

<h1 align="center">Enterprise Data & Pricing Architecture</h1>

<p align="center">
  <strong>A three-track operational ecosystem spanning EBITDA Defense, Market Capture, and Data Governance.</strong>
</p>

<p align="center">
  <a href="https://austin-stethem.github.io">
    <img src="https://img.shields.io/badge/View_the_live_portfolio-b32525?style=for-the-badge" alt="View the live portfolio">
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

## The Tech Tree Architecture

Most analytics portfolios are unrelated demos. This is a comprehensive, interconnected architecture covering the entire operational lifecycle of a distribution network, divided into three distinct tech trees: **Defense**, **Attack**, and **Specialty**.

### 🛡️ Column 1: DEFENSE (Margin & Risk Architecture)
*The objective: Protect the baseline against supply chain shocks and margin erosion.*
* **01. Predictive VIO Market Capture:** Geospatial mapping and K-Means clustering to expose territorial vulnerabilities.
* **02. Algorithmic Margin Defense:** A deterministic cross-subsidization engine cascading the cost deficit to protect Key Value Items.
* **03. Stochastic Margin Optimization:** A 5,000-path Monte Carlo price sweep to stress-test the floor and maximize expected profit.
* **04. A/B Testing Validation:** A randomized Z-test proving the price increase isn't quietly bleeding volume.
* **05. FIFO Inventory Revaluation:** A cash-flow model capturing the immediate EBITDA windfall of legacy stock.

### ⚔️ Column 2: ATTACK (Market & Revenue Capture)
*The objective: Expand the footprint, hunt competitors, and extract uncaptured revenue.*
* **01. M&A Market Capture Engine:** 1,021 competitor rooftops harvested and verified. A merger model predicting overlapping store closures, turning raw proximity into a ranked sales hitlist.
* **02. Greenfield VIO Targeting** `[Blueprint Phase]`: Mapping "whitespace" VIO deserts to mathematically justify new branch deployments.
* **03. Wallet Share Affinity Engine** `[Blueprint Phase]`: Mining POS data to identify linked category gaps (e.g., buying brake pads but no rotors) for targeted cross-selling.
* **04. Tier Clawbacks** `[Blueprint Phase]`: Identifying contract leakage where accounts retain elite pricing without meeting volume thresholds.

### ⚙️ Column 3: SPECIALTY (Data Governance & Operations)
*The objective: Untangle legacy structural damage and survive "Black Swan" events.*
* **01. ERP Crisis Reconciliation:** A flood destroyed the warehouse; the ERP kept promising the inventory. Severing the phantom fulfillment loop by hand, and architecting an automated IoT kill-switch.
* **02. Legacy Silo Resolution (MDM)** `[Blueprint Phase]`: An Entity Resolution engine using fuzzy-matching and geocoding to fuse duplicated legacy accounts into single "Golden Records."
* **03. Route Spider-Mapping** `[Blueprint Phase]`: Plotting Hub-to-Customer vectors to eliminate overlapping delivery routes and cannibalized freight costs.

---

## How It Was Built

The code was written by an LLM working from my direction. My contribution was the specification and the review loop: defining what each engine had to do, supplying the pricing and inventory logic it needed to encode, testing the output against expected behavior, and iterating until the tool did what the strategy required.

Generating a Monte Carlo simulation is now cheap. Knowing that a 70% price markup is not 70 margin points, that a non-significant A/B result needs a power calculation before you act on it, or that a FIFO windfall has to be measured against replacement cost rather than last quarter's price — **that judgment is what separates a script that runs from a model an executive can price against.** 

> **On what you're looking at:** The production versions of these engines ran as a Flask application serving model output internally, against live ERP data. What's published here is a static reimplementation of the same logic against an anonymized proxy dataset.

---

## Running It Locally

No build step and no package manager. Open `index.html` directly, or serve the folder if you want relative paths and Open Graph tags to resolve exactly as they do in production:

```bash
python3 -m http.server 8000
# http://localhost:8000
