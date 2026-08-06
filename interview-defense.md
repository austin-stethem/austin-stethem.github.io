# Interview Defense — Three Attacks on AI-Directed Work

A note before the answers: the strongest version of each of these concedes something
real. A VP who opens with "I'm professionally skeptical of AI" is testing whether you
will oversell. If you answer as though the concern is unfounded, you lose — not because
the answer is wrong, but because you've shown you don't share their risk instinct.

---

## Q1 — The Audit Trail

> *"How do you mathematically guarantee the engine didn't screw up the Box-Muller
> transform or miscalculate the denominator in the standard error?"*

### The frame to establish first

"I don't audit generated code by reading it. Reading is the weakest possible control —
it's how a plausible-looking error survives. I audit it the way your team already
audits a vendor model or an analyst's spreadsheet: by testing behavior against
independent references and known-good answers. That's model risk management, and
finance solved this problem before LLMs existed."

That reframe matters. You are not asking them to trust AI. You are telling them the
code's provenance is irrelevant if the validation is real.

### The five controls, concretely

**1. Statistical properties, not source code.** I don't verify Box-Muller by reading it.
I draw a million samples and check the moments: mean converges to μ, standard deviation
to σ, skewness to 0, kurtosis to 3, and a Kolmogorov–Smirnov test against the normal CDF
fails to reject. A broken transform — a missing square root, the wrong trig function,
paired uniforms reused — breaks at least one of those immediately.

There's a specific trap here worth naming, because it shows I know where this
implementation bites. `Math.random()` can return exactly 0, and `Math.log(0)` is
`-Infinity`, which poisons the whole sample. The implementation draws `u = 1 -
Math.random()` precisely to move the zero to the open end of the interval. That's the
kind of detail that separates validated code from code that happened to run.

**2. A second oracle for anything statistical.** The Two-Proportion Z-Test is not
something to take on faith in JavaScript. I compute the same figure two other ways —
`statsmodels.stats.proportion.proportions_ztest` in Python, and `2*(1-NORM.S.DIST(z,
TRUE))` in Excel. Three independent implementations agreeing to four decimals is
evidence. One implementation looking correct is not.

On the denominator specifically: the pooled standard error is
`sqrt(p̂(1-p̂)·(1/nA + 1/nB))`. The code simplifies to `sqrt(p̂(1-p̂)·(2/n))`, which is
only valid because both arms are the same size. That simplification is a live
assumption. If we ever ran unequal arms, that line is wrong — so it's flagged, not
buried.

**3. Exhaustive input sweeps.** The cross-subsidization engine is deterministic, which
means it's fully enumerable. I ran all 5,184 combinations of the three inputs — 36
freight × 16 deflation × 9 inventory positions — and checked two things: that every
output stayed inside a plausible range, and that every state the model claims to have
was actually reachable. That second check is the one that matters, and I'll come back
to it.

**4. Reconciliation between independent derivations.** Any quantity computed two ways
must tie out. On the FIFO model, the headline windfall figure and the sum of the monthly
windfall bars are two separate calculations of the same number. If they disagree, one is
wrong, and you don't need to read a line of code to know it. That's a tie-out. Your team
does it every close.

**5. Parallel run before anything goes live.** No generated pricing engine ships against
live SKUs on my say-so. It runs in shadow against the current method, on real data, and
we reconcile the deltas SKU by SKU until we can explain every one. Disagreements are the
product of that phase, not a problem with it.

### The move that wins this question

Don't claim the models came out clean. Tell them what got through:

> "Three defects made it into the first working version. First, a 70% price markup was
> being credited as 70 margin points — but raising price 70% on an item at 48% margin
> yields 69.4%, a 21.4-point gain, not 70. Second, the FIFO windfall was measured against
> last quarter's price instead of replacement cost, which inflated it by 1/(1−margin) —
> about 1.54×. Third, and worst: because of that first error, Group C alone appeared able
> to absorb 35 points of deficit when the inputs could only ever generate 5.65. The
> cascade into Groups B and A was mathematically unreachable. The dashboard had a
> 'shield breached' state that could never fire."

Then the point:

> "Notice what those three have in common. Not one is a coding error. The syntax was
> fine, the code ran, the charts rendered, the numbers looked plausible. They were
> **domain errors** — a unit confusion, a wrong accounting baseline, and a capacity
> calculation that didn't survive contact with the business. No amount of code review by
> a strong engineer who didn't know pricing would have caught them. That is the entire
> argument for having me in the loop, and it's why I'd never put a generated model in
> front of you without the validation attached."

Note how that first defect is described: *a margin above 100% is impossible.* You are
citing an impossibility, not a computation. Keep it there. If they want the algebra,
point at the validation file rather than working it out aloud.

If they push on *who* caught them: be straight. Say the review process caught them and
that the models shipped wrong first. A candidate who says "my first version had three
math bugs and here's the process that surfaced them" is far more credible than one who
claims a clean first pass.

---

## Q2 — The Sandbox vs. The Swamp

> *"These run on clean proxy data. Our ERP is a swamp. How does your workflow handle the
> daily grind of ETL and broken schemas?"*

**This is the strongest attack of the three. Concede it fast and completely.**

> "You're right, and I want to be precise about what those dashboards do and don't
> prove. They demonstrate that the *logic* is sound — the elasticity stratification, the
> decay curves, the subsidization cascade. They prove nothing whatsoever about pipeline
> resilience. Anyone claiming otherwise is selling you something. The proxy data exists
> because the real data is under NDA, not because the real data was clean."

That costs you nothing and buys the rest of the answer.

### Then show you've actually been in the swamp

The tell for real ERP experience isn't the tooling, it's the specifics. Talk about the
particular kinds of wrong you've had to handle:

- Legacy P-Tier codes that map to strategic groups inconsistently, where an unmapped
  tier has to default *somewhere* — and defaulting to the elastic tail is a deliberate
  choice, because being wrong in the direction of "we can move this price" is safer than
  wrongly locking an item.
- Missing landed costs that will silently produce a divide-by-zero or, worse, a
  plausible-looking margin computed from a null.
- Promotional spikes, bulk contract pricing, and M&A buyout volume that all look like
  demand signal to a decay curve and will happily corrupt an elasticity tier.
- Manual invoice overrides that break the relationship between list, net, and cost.
- Geocoding thousands of ship-to addresses where a meaningful fraction are PO boxes,
  freight terminals, or simply wrong.

### The insight to land

> "The hard part of messy data isn't writing the cleaner. It's deciding what 'wrong'
> means. Is a one-cent invoice line a data error or a warranty replacement? Is a
> negative-margin line a keying mistake or a deliberate loss leader on a national
> account? Is a 400-unit month a real trend or a single bulk order? Those aren't
> technical questions and there is no library for them. Get them wrong and you build a
> beautifully engineered pipeline that launders bad assumptions into confident numbers.
> **That is the actual failure mode of AI-accelerated development in a real ERP** — not
> that the code breaks, but that it doesn't, and nobody notices the assumption
> underneath."

### On schema breakage specifically

- Validate at ingest and **fail loudly**. A schema contract that throws on an unexpected
  column type is worth more than any downstream cleverness. Silent coercion is how you
  get a quarter of wrong prices.
- **Quarantine, don't drop.** Rows that fail validation go to a table someone reviews,
  with a count on a dashboard. Dropping rows to make a pipeline succeed is how data
  quietly disappears.
- **Tie out to a known total every run.** Extract revenue reconciles to the GL. If it
  doesn't, the run fails. This is the single highest-value control and it's cheap.
- **Monitor distributions, not just nulls.** A vendor changing cost basis mid-month
  won't produce a single null. It shifts a distribution. Alert on drift.

### Scope honestly, then ask them something

> "I want to be clear about where I'd own this and where I'd partner. I'd own the logic
> layer, the business rules, the validation, and the definition of correct. I'm not going
> to tell you I'd architect and maintain your ingestion infrastructure alone — that's a
> data engineering discipline and pretending otherwise would waste both our time.
>
> Which leads to a question for you: what's the current stack, and who owns the pipelines
> today? Because the honest answer to 'how would you handle it' depends entirely on
> whether I'm writing dbt models against a warehouse or pulling extracts out of the ERP
> by hand."

Asking that flips the dynamic and reads as seniority rather than deflection.

---

## Q3 — The Value Horizon

> *"What's your enduring value when the tooling catches up to the judgment?"*

**Do not get defensive. The premise is mostly right, and arguing with it looks naive.**

> "Some of what I do today will be automated, and I'd rather say that out loud than
> pretend otherwise. But I think the question contains an assumption worth pulling apart:
> that the judgment and the model are the same thing. They aren't."

### Four things that don't transfer to the tooling

**1. The objective function is a business decision, not a data one.** An AI reading our
ERP will optimize whatever it's pointed at. The single most important rule in that
cross-subsidization engine is that Group A stays price-locked — and the math *disagrees*
with that. Purely on the numbers, some of those items could carry an increase. We don't
raise them, because Key Value Items are how customers price-check us, and the cost of
losing that trust doesn't appear in any transaction table. That constraint came from
knowing the customers, not from reading the data.

**2. Someone has to be accountable.** A price change across millions of SKUs has a name
attached to it. When a national account calls the President, "the model recommended it"
is not an answer. Accountability isn't a task that gets automated; it's a person who can
explain the decision, defend the tradeoff, and own being wrong.

**3. Problem selection.** The tooling answers questions. It doesn't know which question
is worth asking. Nobody asked for the whitespace analysis — I built it because I could
see we were exposed in corridors where we had no hubs, and nobody had quantified it. The
value was in noticing the gap, not in the clustering algorithm.

**4. Institutional context that isn't written down.** The model doesn't know that a
particular customer is mid-renegotiation, that a branch manager will sandbag a rollout
he wasn't consulted on, or that the freight surcharge is politically untouchable this
quarter. That context lives in relationships and history, and it's the difference between
a correct recommendation and one that actually gets executed.

### The turn

> "If the tooling gets as good as you're describing, the bottleneck moves entirely to
> judgment, objective-setting, and accountability. That's not a threat to what I do —
> it's a description of the job I'm asking you for. The risk isn't that AI gets better.
> The risk is that I stop being the person who understands the P&L well enough to know
> when the output is wrong. So the honest answer is that my value is conditional: it
> depends on me staying closest to the business, not closest to the code. That's where
> I'm choosing to invest."

### If they push on the two-year horizon

> "I'd be bluffing if I gave you a confident forecast about two years. Nobody knows. What
> I can tell you is which side of it I want to be on, and that I'd rather be the person
> directing the tool than the person it replaced — and that means continuing to know the
> business well enough to spot when the output is wrong."

---

## What you must be able to explain — in words, not numbers

You do not need to derive anything live. No one interviewing for a pricing role will
hand you a marker and ask you to compute a logarithm. What they will test is whether you
understand the *mechanism* and can spot when an output is wrong. Every one of the five
errors below is catchable by reasoning, not arithmetic — which is exactly how they should
be described.

**If someone does ask you to derive a formula on the spot, don't attempt it.** Say: "The
derivation's in the validation file, let me pull it up — what I can tell you from memory
is why it works." Reaching for the artifact reads as rigour. Fumbling arithmetic in front
of a VP of Finance reads as the thing they were already worried about.

### 1. Why a markup isn't a margin point

> "Margin is a share of the selling price. When I raise the price, my cost doesn't move —
> so profit per unit goes up, but the number I'm dividing by went up too. The percentage
> climbs, just not one-for-one. Raise a 48%-margin item by 70% and you land near 69%
> margin, not 118%."

**The tell, and this is the part to lead with:** 48 plus 70 is 118, and a margin above
100% is impossible. You cannot keep more than the whole selling price. So the moment the
model credited a 70% markup as 70 margin points, the arithmetic was announcing itself as
wrong without anyone needing to check it. That's the kind of error a domain person
catches by reflex and a code reviewer misses entirely.

### 2. Why the FIFO windfall is measured against replacement cost

> "There are two ways to ask what the inventory buffer was worth, and only one is honest.
> Measured against last quarter's price, you're crediting the buffer with the price
> increase — but we were taking that price increase regardless, buffer or no buffer. What
> the buffer actually bought us is the cost we didn't have to pay. So the comparison is
> against replacement cost, not against the old price."

**The tell:** the headline number and the sum of the monthly bars are two calculations of
the same quantity. They disagreed. You don't need to know which one is right to know that
one of them is wrong — that's a tie-out, and it's the same instinct as a trial balance
that doesn't balance.

### 3. Why an inconclusive A/B test is not a clean bill of health

> "Every test has a resolution — a smallest effect it's capable of seeing. With 5,000
> quotes per arm, ours is a bit under two percentage points. The drop we observed was half
> a point. So 'not statistically significant' here means 'smaller than this test can
> measure,' not 'zero.' Treating those as the same thing is how people talk themselves
> into a price increase that's quietly bleeding volume."

**The tell:** if you can't state what the test *could* have detected, you can't interpret
a null result. That's a question you ask, not a number you compute.

### 4. Why the power calculation is what justified holding the price

> "The p-value told us we couldn't prove a drop. That's not enough to act on. What made
> the decision defensible was sizing the test to detect the smallest volume loss that
> would have made the price increase EBITDA-negative. We could rule out a loss big enough
> to matter. That's a different and much stronger claim than 'we saw nothing.'"

### 5. Why the subsidization cascade was broken

> "The elastic tier appeared able to absorb far more cost deficit than the inputs could
> ever produce, so the deficit never reached the other two tiers. The dashboard had states
> — 'max elasticity tapped,' 'shield breached' — that would not fire no matter where I put
> the sliders."

**The tell, and it's purely behavioural:** a model with unreachable states is broken. You
find that by working every control to its limits and noticing that a branch of the logic
never lights up. No arithmetic involved — it's QA discipline, and it's how the bug was
actually found.

---

## The honest positioning

Your check on this work is **reconciliation and business plausibility**, not hand
derivation. That's a legitimate and senior control — it's what an auditor does, what a
controller does, and what model validation functions do. Say it that way:

> "I'm not the person who re-derives the standard error by hand. I'm the person who knows
> that a margin can't exceed 100%, that two calculations of the same figure have to tie,
> that a model with states that never fire is broken, and that an inconclusive test needs
> a power number before anyone acts on it. Those are the checks that caught the errors in
> this build."

That is true, it's the actual role, and it doesn't require you to be good at arithmetic.

**What to change in the written materials:** nothing needs cutting. The site note claims
you recognise when output is wrong — which the five tells above substantiate. But avoid
volunteering formulas in conversation. Describe mechanisms and tells; let the validation
file carry the algebra.

