<p align="center"> <img src="og-preview.png" alt="Austin Sonny Stethem — Strategic Pricing & Master Data Analyst" width="820"> </p> <h1 align="center">Enterprise Pricing Architecture</h1> <p align="center"> <strong>One cost shock, followed end to end — from raw ERP extract to defended EBITDA.</strong> </p> <p align="center"> <a href="https://austin-stethem.github.io"> <img src="https://img.shields.io/badge/View_the_live_portfolio-b32525?style=for-the-badge" alt="View the live portfolio"> </a> </p> <p align="center"> <img src="https://img.shields.io/badge/Python-Pandas_·_NumPy_·_Scikit--learn-1a2433?style=flat-square" alt="Python"> <img src="https://img.shields.io/badge/Data-Anonymized_proxy-64748b?style=flat-square" alt="Anonymized proxy data"> <img src="https://img.shields.io/badge/Build-No_dependencies-64748b?style=flat-square" alt="No build step"> </p>
The scenario

Most analytics portfolios are five unrelated demos. This one is a single continuous scenario. A 15% vendor cost spike hits a parts distribution network, and each of the five interactive dashboards picks up where the last one left off.

01  Map the exposure

A geospatial engine plots competitor density against the Hub & Spoke network, then uses K-Means clustering on real distance-decay curves to sort 80 branches into strategic pricing tiers. Rural monopolies can absorb increases. Hyper-dense urban branches cannot.

02  Defend the margin

A deterministic cross-subsidization engine cascades the cost deficit from the most elastic tier inward, so Key Value Items stay price-locked while blind inventory carries the load. Includes the FIFO inventory shield.

03  Stress-test the floor

A 5,000-path Monte Carlo random walk maps the cone of risk across twelve months, then sweeps the full price band to find the point that maximizes expected profit. That optimum is rarely the highest price; past a threshold, elasticity destroys demand faster than margin accrues.

04  Validate in market

A randomized A/B test with a two-proportion Z-test, paired with a minimum detectable effect calculation. The power analysis is the point: a non-significant result is not proof of no impact, and pricing decisions worth defending need to know the difference.

05  Capture the windfall

A cash-flow model quantifying what a physical inventory buffer is worth when retail pricing is decoupled from the receiving dock.

Every panel is live and driven by adjustable inputs — no screenshots, no mock data frozen in place.

How it was built

The code was written by an LLM working from my direction. My contribution was the specification and the review loop: defining what each engine had to do, supplying the pricing and inventory logic it needed to encode, testing the output against expected behavior, and iterating until the tool did what the strategy required.

I state that plainly rather than blur it, because the division of labor is the interesting part. Generating a Monte Carlo simulation is now cheap. Knowing that a 70% price markup is not 70 margin points, that a non-significant A/B result needs a power calculation before you act on it, or that a FIFO windfall has to be measured against replacement cost rather than last quarter's price — that judgment is what separates a script that runs from a model an executive can price against. It is also the only part that does not come free with the tooling.

That workflow is the practical argument for this portfolio. It lets one analyst carry a pricing model from a domain question to a deployed decision-support tool in days, and put a working artifact in front of leadership instead of a slide describing one.

On what you're looking at. The production versions of these engines ran as a Flask application serving model output internally, against live ERP data. What's published here is a static reimplementation of the same logic against an anonymized proxy dataset — a server wired to a live cost table isn't something I can put on the public internet.

What each layer does

Layer	Role
SQL	Targeted extraction of pricing, inventory, and POS transaction data from relational systems, including the sanitization pass that quarantines promotional spikes, bulk contracts, and M&A buyouts before they poison a model.
Python	Dynamic financial modeling well past data cleaning: Monte Carlo simulation, K-Means clustering, elasticity stratification, landed-cost volatility.
BI & Geospatial	Translating metrics into systems people act on. Mapping competitive density, flagging margin degradation the moment it appears.
Stack

Analysis & modeling SQL · Python · Pandas · NumPy · Scikit-learn · SciPy / StatsModels · GeoPandas · Flask · Jupyter · Advanced Excel · Phocas BI

Methods Monte Carlo simulation (Box-Muller) · K-Means clustering · Two-proportion Z-test · Power analysis / MDE · Elasticity stratification · Deterministic optimization · Distance-decay / gravity modeling · FIFO cash-flow modeling · ERP data stratification

Delivery & front end JavaScript (ES6+) · HTML5 · CSS3 (Grid, Flexbox, custom properties) · Chart.js · Leaflet.js + MarkerCluster · Tailwind CSS · Canvas API · SVG · Responsive & WCAG-conscious markup · Git / GitHub Pages

Workflow LLM-directed development · Prompt engineering · Model validation & reconciliation

Repository contents
File	What it is
index.html	Landing page and project index
predictive-vio-market-capture.html	01 Geospatial exposure mapping, K-Means tiering
algorithmic-margin-defense.html	02 Deterministic cross-subsidization engine
stochastic-margin-optimization.html	03 Monte Carlo risk cone and price sweep
ab-testing-framework.html	04 Two-proportion Z-test with power analysis
fifo-inventory-revaluation.html	05 FIFO windfall cash-flow model
portfolio.css	Shared brand layer — tokens, typography, tooltips, navigation, print rules
og-preview.png	1200×630 link-preview image referenced by the Open Graph tags

Each dashboard is a single self-contained HTML file: markup, page-specific CSS, and the model logic in one place. portfolio.css is the only shared dependency and must sit in the same directory as the HTML files, since every page links it with a relative path.

Running it locally

No build step and no package manager. Open index.html directly, or serve the folder if you want relative paths and Open Graph tags to resolve exactly as they do in production:

bash
python3 -m http.server 8000
# http://localhost:8000

Charting and mapping libraries load from cdnjs, so the dashboards need a network connection. If a library fails to load, each page degrades deliberately rather than breaking — the written analysis renders as normal and the interactive panel is replaced with a short notice.

A note on the data

Every figure in these dashboards is generated from an anonymized proxy dataset. Branch coordinates, landed costs, POS revenue, and margin targets are randomized. The architecture, the elasticity logic, and the statistical methods are the production ones; the numbers are not real, and no client or employer data appears anywhere in this repository.

<p align="center"> <strong>Austin Sonny Stethem</strong><br> Strategic Pricing &amp; Master Data Analyst<br> <a href="https://www.linkedin.com/in/austin-stethem-4503b4197/">LinkedIn</a> · <a href="mailto:austinstethem1976@gmail.com">austinstethem1976@gmail.com</a> </p>
