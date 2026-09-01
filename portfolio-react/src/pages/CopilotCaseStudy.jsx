import { motion } from 'framer-motion';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import usePageMeta from '../usePageMeta.js';
import {
  cardHover,
  fadeUpItem,
  sectionReveal,
  slideLeftItem,
  staggerContainer,
  viewportOnce,
} from '../motion.js';

// Same case-study template as CUE's (see pages/CaseStudy.jsx): sections
// reveal on scroll via motion.section + sectionReveal, grids stagger in
// with a hover lift, numbered lists slide in from the left.
//
// Content here is adapted from a case pitch originally written for a
// specific bank's mobile app - deliberately reframed as a generic banking
// concept (no employer named) since this is presented as personal product
// work, not proprietary material.

const PROBLEM_ITEMS = [
  "Contribution room for RRSP, TFSA, RESP, and RDSP accounts isn't visible inside the app - customers still have to look it up themselves before any planning tool can even track it as a goal.",
  'Once a customer decides to contribute, most planning tools stop at the insight; they still have to leave the recommendation and transfer funds or open a product separately.',
  'Contribution amounts get suggested off account balance alone, ignoring income, day-to-day spending, and upcoming bills - the things that actually determine what’s safe to contribute.',
  "Deadlines (the RRSP contribution deadline, year-end TFSA room) are easy to miss without a nudge timed to when the decision actually matters.",
  '"How much room do I have" is still a routine call or branch-visit question during contribution season, not something the app answers on its own.',
];

const EPICS = [
  {
    epic: 'Epic 1',
    name: 'Room Visibility',
    stories: [
      "See RRSP, TFSA, RESP & RDSP room in one view, without visiting a branch or a separate tax-authority site.",
      'Enter a Notice-of-Assessment RRSP limit manually, so room stays accurate.',
    ],
  },
  {
    epic: 'Epic 2',
    name: 'Smart Recommendations',
    stories: [
      '(2a – Now) A rule-based suggested contribution amount from income, spending & bills, so customers contribute without overextending.',
      '(2b – Next) A precise, tax-bracket-aware refund estimate before committing.',
      '(2c – Later) A continuously-optimized plan across all goals & accounts, via an ML-driven engine.',
    ],
  },
  {
    epic: 'Epic 3',
    name: 'Seamless Action & Cross-Sell',
    stories: [
      'One-tap transfer into RRSP/TFSA, so contributing is frictionless.',
      'Open a GIC inside an RRSP directly from the recommendation screen.',
    ],
  },
  {
    epic: 'Epic 4',
    name: 'Proactive Alerts',
    stories: [
      "A reminder as the RRSP deadline approaches, so it isn't missed.",
      'A year-end nudge on unused TFSA room, to plan ahead.',
    ],
  },
  {
    epic: 'Epic 5',
    name: 'Compliance & Trust',
    stories: [
      'Every recommendation logged and auditable, to meet record-keeping requirements.',
      'A clear disclaimer that this is guidance, not personalized advice.',
    ],
  },
];

const RICE_ROWS = [
  ['2a — Smart Recommendation', '9', '9', '8', '5', '130', 'Now'],
  ['4 — Proactive Alerts', '9', '6', '9', '2', '243', 'Now'],
  ['1 — Room Visibility', '9', '8', '8', '5', '115', 'Now'],
  ['3a — One-Tap Transfer', '8', '8', '7', '4', '112', 'Now'],
  ['5 — Compliance & Trust', '—', '—', '—', '—', 'Gate', 'Now'],
  ['2b — Tax Refund Estimator', '7', '7', '7', '4', '86', 'Next'],
  ['3c — Recurring Contributions', '6', '5', '7', '3', '70', 'Next'],
  ['3b — GIC Cross-Sell Flow', '6', '7', '6', '5', '50', 'Next'],
  ['2c — Full Recommendation Engine', '7', '9', '6', '8', '47', 'Later'],
];

const METRIC_ITEMS = [
  'Percent of registered-account holders who make a contribution via the app (adoption).',
  'Incremental assets under administration contributed through the feature vs. a prior-year baseline.',
  'Percent deflection of seasonal contribution-room contact-centre volume.',
  'Client satisfaction / NPS on the money-management experience.',
];

const ASK_ITEMS = [
  'Approve discovery: validate data feasibility and current contribution-room contact volume.',
  'Scope MVP1 for delivery ahead of the next RRSP season.',
  'Confirm the compliance sign-off path early, given the guardrail dependency.',
];

const NEXT_ITEMS = [
  "Build the interactive prototype so the room-visibility → recommendation → one-tap flow is clickable, not just wireframed.",
  'Replace the rule-based recommendation (2a) with the tax-bracket-aware refund estimator (2b), behind the same interface.',
  'Wire proactive alerts to a real scheduling/notification layer.',
  'Validate the opportunity-sizing assumptions against real usage data once a pilot is feasible.',
];

const heroContainer = staggerContainer(0.1, 0.1);

export default function CopilotCaseStudy() {
  usePageMeta({
    title: 'Smart Contribution Copilot Case Study - Sai B Saiprasad, Product & Strategy Professional',
    description:
      'Full case study: an AI-guided registered-savings module concept, from opportunity sizing to a RICE-prioritized delivery roadmap.',
    ogTitle: 'Smart Contribution Copilot Case Study - Sai B Saiprasad',
    ogType: 'article',
  });

  return (
    <>
      <Nav home={false} />
      <main id="main">
        {/* ============ HERO ============ */}
        <header className="cs-hero">
          <div className="container">
            <a href="/" className="cs-hero__back">
              &larr; Back to portfolio
            </a>
            <motion.div initial="hidden" animate="visible" variants={heroContainer}>
              <motion.p className="eyebrow eyebrow--gold" variants={fadeUpItem}>
                Case study
              </motion.p>
              <motion.h1 variants={fadeUpItem}>Smart Contribution Copilot</motion.h1>
              <motion.p className="cs-hero__sub" variants={fadeUpItem}>
                A registered-savings module concept for a banking app&apos;s financial planning experience
              </motion.p>
              <motion.p className="text-small" style={{ marginTop: 8 }} variants={fadeUpItem}>
                Role: Product concept, opportunity sizing &amp; delivery plan &middot; 2026
              </motion.p>
              <motion.div className="cs-hero__actions" variants={fadeUpItem}>
                <a href="#prd" className="btn btn-primary">
                  Full PRD
                </a>
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* ============ EXECUTIVE SUMMARY ============ */}
        <motion.section
          className="cs-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <div>
              <h2 className="section-title">Executive summary</h2>
              <div className="cs-prose">
                <p>
                  Banking apps increasingly track goals, budgets, and everyday spending, but almost all of them
                  stop short of registered accounts. Customers still have to look up their own RRSP, TFSA, RESP,
                  or RDSP contribution room elsewhere before a planning tool can even treat it as a goal, and once
                  they decide to contribute, they usually have to leave the insight entirely and transfer funds or
                  open a product separately.
                </p>
                <p>
                  Smart Contribution Copilot is a concept module that closes that loop: one consolidated view of
                  registered-account room, a recommendation that reasons across income, spending, and upcoming
                  bills (not just account balance), a one-tap way to act on it, and proactive alerts timed to real
                  deadlines - scoped, prioritized, and sequenced into a shippable roadmap.
                </p>
              </div>
            </div>

            <motion.div
              className="cs-summary-grid"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
            >
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>Opportunity</h4>
                <p>
                  2M+ registered-account holders estimated to be under-contributing in a given year (illustrative
                  estimate, used for case framing)
                </p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>Scope defined</h4>
                <p>4 connected capabilities, 5 delivery epics, a RICE-scored Now / Next / Later roadmap</p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>Current status</h4>
                <p>Concept and PRD complete. Interactive prototype in progress</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ============ THE PROBLEM ============ */}
        <motion.section
          className="cs-section"
          id="problem"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <div>
              <h2 className="section-title">The problem</h2>
              <div className="cs-prose">
                <p>Most banking apps&apos; AI-driven advice reaches everyday spending and goal tracking, but stops right at the registered-account door:</p>
              </div>
            </div>

            <motion.ol
              className="numbered-list"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.08)}
            >
              {PROBLEM_ITEMS.map((item) => (
                <motion.li key={item} variants={slideLeftItem}>
                  {item}
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </motion.section>

        {/* ============ SOLUTION & PRD ============ */}
        <motion.section
          className="cs-section"
          id="prd"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <div>
              <h2 className="section-title">The solution</h2>
              <div className="cs-prose">
                <p>One connected experience, four capabilities:</p>
              </div>
            </div>

            <motion.div
              className="capability-grid"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
            >
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>Room Visibility</h4>
                <p>One consolidated view of RRSP, TFSA, RESP &amp; RDSP contribution room - no separate tax-authority login required.</p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>Smart Recommendations</h4>
                <p>Synthesizes income, spending &amp; bills into a safe amount, shows the tax impact, and offers a lump-sum vs. monthly alternative.</p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>One-Tap Action</h4>
                <p>Contribute, or open a GIC, inside the same investment account - no separate transfer flow.</p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>Proactive Alerts</h4>
                <p>Deadline reminders and year-end nudges, timed to when the decision actually matters.</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ============ THE EXPERIENCE ============ */}
        <motion.section
          className="cs-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <div>
              <h2 className="section-title">The experience</h2>
              <div className="cs-prose">
                <p>From a data point to a conversation:</p>
              </div>
            </div>

            <motion.div
              className="card"
              style={{ maxWidth: '520px', fontStyle: 'italic', color: 'var(--muted)' }}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUpItem}
            >
              &quot;Hi Sai, based on your income, spending, and upcoming bills, you can safely contribute $4,200 to
              your RRSP today. That&apos;s an estimated tax reduction of about $1,180. Too much? $350/month gets
              you nearly the same benefit before next year&apos;s deadline.&quot;
            </motion.div>

            <motion.div
              className="rag-steps"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.08)}
            >
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                1. Reasons across signals: combines income, day-to-day spending, and known upcoming bills - not
                just account balance - before suggesting a number.
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                2. Quantifies the benefit: every recommendation comes with a concrete outcome (estimated
                tax-refund impact in dollars), not just &quot;room used.&quot;
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                3. Offers a real choice: shows a lump-sum path and a monthly path to nearly the same benefit, so
                the customer decides what fits their cash flow.
              </motion.div>
            </motion.div>

            <div className="cs-prose">
              <p>
                The numbers come from a deterministic, auditable affordability engine (the Epic 5 guardrail) - the
                assistant explains them, it doesn&apos;t invent them.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ============ HOW IT WORKS ============ */}
        <motion.section
          className="cs-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <h2 className="section-title">How it works</h2>
            <div className="cs-prose">
              <p>From unused room to a confident contribution, in four steps:</p>
            </div>

            <motion.div
              className="capability-grid"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
            >
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>1. Connect</h4>
                <p>Customer links accounts, or enters their Notice-of-Assessment room.</p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>2. See &amp; Decide</h4>
                <p>The app surfaces room plus a personalized contribution recommendation.</p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>3. Act</h4>
                <p>One-tap contribution or GIC purchase, in-app.</p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>4. Stay on Track</h4>
                <p>Alerts before deadlines; progress tracked year-round.</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ============ BUSINESS IMPACT ============ */}
        <motion.section
          className="cs-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <div>
              <h2 className="section-title">Business impact</h2>
              <div className="cs-prose">
                <p>One capability, two levers - sized with stated, checkable assumptions:</p>
              </div>
            </div>

            <motion.div
              className="arch-grid"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
            >
              <motion.div className="card arch-card" variants={fadeUpItem} whileHover={cardHover}>
                <span className="arch-card__label">Revenue growth</span>
                <p style={{ marginTop: 8 }}>Converts unused RRSP/TFSA room into incremental deposits &amp; GIC balances.</p>
                <ul style={{ marginTop: 12, paddingLeft: 18, color: 'var(--muted)', fontSize: '0.85rem' }}>
                  <li>Segment: ~2M holders under-contributing</li>
                  <li>Adoption: ~15% take-up in Year 1</li>
                  <li>Avg lift: ~$800 per adopter</li>
                  <li>Margin: ~50bps on new balances</li>
                </ul>
                <p style={{ marginTop: 12, fontWeight: 500, color: 'var(--ink)' }}>Directional estimate: ~$1.0-1.5M / year</p>
              </motion.div>
              <motion.div className="card arch-card" variants={fadeUpItem} whileHover={cardHover}>
                <span className="arch-card__label">Cost reduction</span>
                <p style={{ marginTop: 8 }}>Deflects routine contribution-room calls &amp; branch visits during RRSP season.</p>
                <ul style={{ marginTop: 12, paddingLeft: 18, color: 'var(--muted)', fontSize: '0.85rem' }}>
                  <li>Segment: seasonal contribution-room contacts</li>
                  <li>Deflection: ~15-20% handled by the app</li>
                  <li>Cost/contact: ~$8-$12 average</li>
                </ul>
                <p style={{ marginTop: 12, fontWeight: 500, color: 'var(--ink)' }}>Directional estimate: ~$1.0-1.5M / year</p>
              </motion.div>
            </motion.div>

            <div className="cs-prose" style={{ marginTop: 20 }}>
              <p>
                These figures are working assumptions built for case discussion, not real bank data. Each input
                (segment, adoption, lift, margin, deflection) would be validated against real account and
                contact-centre data before sizing an actual business case.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ============ DELIVERY SCOPE ============ */}
        <motion.section
          className="cs-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <h2 className="section-title">Delivery scope</h2>
            <div className="cs-prose">
              <p>Five epics, broken down to shippable user stories:</p>
            </div>

            <motion.div
              className="table-wrap"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUpItem}
            >
              <table>
                <thead>
                  <tr>
                    <th>Epic</th>
                    <th>Representative user stories</th>
                  </tr>
                </thead>
                <tbody>
                  {EPICS.map(({ epic, name, stories }) => (
                    <tr key={epic}>
                      <td>
                        <strong style={{ color: 'var(--ink)' }}>{epic}</strong>
                        <br />
                        {name}
                      </td>
                      <td>
                        <ul style={{ margin: 0, paddingLeft: 18 }}>
                          {stories.map((story) => (
                            <li key={story} style={{ marginBottom: 4 }}>
                              {story}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </motion.section>

        {/* ============ PRIORITIZATION ============ */}
        <motion.section
          className="cs-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <h2 className="section-title">Prioritization</h2>
            <div className="cs-prose">
              <p>
                RICE-scored (Reach &times; Impact &times; Confidence &divide; Effort, each 1-10) and sequenced into
                Now / Next / Later. Epic 5 is a non-negotiable compliance guardrail shipped alongside MVP1.
              </p>
            </div>

            <motion.div
              className="table-wrap"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUpItem}
            >
              <table>
                <thead>
                  <tr>
                    <th>Epic</th>
                    <th>Reach</th>
                    <th>Impact</th>
                    <th>Confid.</th>
                    <th>Effort</th>
                    <th>RICE</th>
                    <th>Phase</th>
                  </tr>
                </thead>
                <tbody>
                  {RICE_ROWS.map(([epic, reach, impact, confidence, effort, rice, phase]) => (
                    <tr key={epic}>
                      <td>{epic}</td>
                      <td>{reach}</td>
                      <td>{impact}</td>
                      <td>{confidence}</td>
                      <td>{effort}</td>
                      <td>{rice}</td>
                      <td>{phase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <motion.div
              className="answer-types"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
            >
              <motion.div className="card answer-type" variants={fadeUpItem} whileHover={cardHover}>
                <span className="answer-type__num">Now &middot; MVP1</span>
                <h4>Operational foundation</h4>
                <p>Smart recommendation (rule-based), room visibility, alerts, one-tap transfer, compliance guardrails.</p>
              </motion.div>
              <motion.div className="card answer-type" variants={fadeUpItem} whileHover={cardHover}>
                <span className="answer-type__num">Next &middot; MVP2</span>
                <h4>Precision and cross-sell</h4>
                <p>Tax-refund estimator, recurring contributions, GIC cross-sell.</p>
              </motion.div>
              <motion.div className="card answer-type" variants={fadeUpItem} whileHover={cardHover}>
                <span className="answer-type__num">Later</span>
                <h4>Full optimization</h4>
                <p>Full ML-driven recommendation engine, with cross-account optimization.</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ============ SUCCESS METRICS & NEXT STEPS ============ */}
        <motion.section
          className="cs-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <h2 className="section-title">Success metrics &amp; the ask</h2>

            <h3>How we&apos;ll know it&apos;s working</h3>
            <motion.ol
              className="numbered-list"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.08)}
            >
              {METRIC_ITEMS.map((item) => (
                <motion.li key={item} variants={slideLeftItem}>
                  {item}
                </motion.li>
              ))}
            </motion.ol>

            <h3>The ask</h3>
            <motion.ol
              className="numbered-list"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.08)}
            >
              {ASK_ITEMS.map((item) => (
                <motion.li key={item} variants={slideLeftItem}>
                  {item}
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </motion.section>

        {/* ============ WHAT THIS SHARPENED ============ */}
        <motion.section
          className="cs-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <h2 className="section-title">What this sharpened</h2>
            <motion.div
              className="lessons-grid"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
            >
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>Guardrails before intelligence</h4>
                <p>
                  Compliance and audit logging (Epic 5) is scored as a non-negotiable gate shipped alongside MVP1,
                  not bolted on once the &quot;smart&quot; part works.
                </p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>RICE scoring keeps sequencing honest</h4>
                <p>
                  A low-effort, high-reach feature like proactive alerts can out-rank the flashier ML-driven
                  recommendation engine - the roadmap should reflect that, not vanity.
                </p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>Size the opportunity, but label the guess</h4>
                <p>
                  Every revenue and cost estimate here is a stated, checkable assumption, not real data - useful
                  for prioritization conversations, not a forecast.
                </p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>A recommendation is only trustworthy if it&apos;s explainable</h4>
                <p>
                  The assistant explains numbers produced by a deterministic, auditable engine - it doesn&apos;t
                  generate them itself.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ============ WHAT'S NEXT ============ */}
        <motion.section
          className="cs-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <h2 className="section-title">What&apos;s next</h2>
            <motion.ol
              className="numbered-list"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.08)}
            >
              {NEXT_ITEMS.map((item) => (
                <motion.li key={item} variants={slideLeftItem}>
                  {item}
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </motion.section>
      </main>
      <Footer home={false} />
    </>
  );
}
