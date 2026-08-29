import { motion } from 'framer-motion';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import {
  cardHover,
  fadeUpItem,
  sectionReveal,
  slideLeftItem,
  staggerContainer,
  viewportOnce,
} from '../motion.js';

// Same animation system as the homepage: sections reveal on scroll via
// motion.section + sectionReveal, card grids stagger in with a hover
// lift, numbered lists slide in from the left staggered, and tables/code
// blocks fade up as single units. See src/motion.js for the shared
// variants and main.jsx's <MotionConfig reducedMotion="user"> for how
// prefers-reduced-motion is handled globally.
//
// The three code blocks below use dangerouslySetInnerHTML: they contain
// literal `{curly braces}` (template placeholders like {lobName}, and
// real object-literal syntax like `{ where: { lobId } }`) which JSX would
// otherwise try to parse as JavaScript expressions. This content is 100%
// static and authored here, not user input, so there's no injection risk
// — it's the same rationale as any other static syntax-highlighted code
// snippet.
const SYSTEM_PROMPT_HTML = `<span class="tok-com">You are CUE's Knowledge Buddy, an onboarding assistant for {lobName}.</span>

<span class="tok-kw">Rules:</span>
- Answer <span class="tok-str">only</span> from the CONTEXT provided below. Never invent a policy,
  a contact name, or an approval chain that isn't in the context.
- If the context doesn't answer the question, say so plainly and suggest
  what the employee should ask instead, don't guess.
- When context comes from a document, cite the file name and section.
- When context comes from the knowledge map, name the go-to contact and
  approver exactly as given, don't paraphrase a person's title.
- Keep answers short. This is a chat assistant for someone mid-task,
  not a document generator.

<span class="tok-kw">CONTEXT:</span>
{retrieved_chunks_or_knowledge_map_row}

<span class="tok-kw">QUESTION:</span>
{employee_question}`;

const SQL_TRIGGER_HTML = `<span class="tok-kw">CREATE OR REPLACE FUNCTION</span> <span class="tok-fn">prevent_completion_modification</span>()
<span class="tok-kw">RETURNS TRIGGER AS</span> $$
<span class="tok-kw">BEGIN</span>
  <span class="tok-kw">RAISE EXCEPTION</span> <span class="tok-str">'Completion records are immutable. No updates or deletes allowed.'</span>;
<span class="tok-kw">END</span>;
$$ <span class="tok-kw">LANGUAGE plpgsql</span>;

<span class="tok-kw">CREATE TRIGGER</span> completion_immutability
<span class="tok-kw">BEFORE UPDATE OR DELETE ON</span> completion_records
<span class="tok-kw">FOR EACH ROW EXECUTE FUNCTION</span> <span class="tok-fn">prevent_completion_modification</span>();`;

const RETRIEVAL_SERVICE_HTML = `<span class="tok-com">/** Stand-in for real vector search, same interface a real</span>
<span class="tok-com"> *  semantic search would expose, so callers don't change later. */</span>
<span class="tok-kw">export async function</span> <span class="tok-fn">searchChunks</span>(lobId: <span class="tok-kw">string</span>, query: <span class="tok-kw">string</span>, limit = <span class="tok-str">5</span>) {
  <span class="tok-kw">const</span> terms = query.match(/[\\p{L}\\p{N}']+/gu) ?? [];
  <span class="tok-kw">const</span> chunks = <span class="tok-kw">await</span> chunkRepo().find({ where: { lobId }, relations: { document: <span class="tok-kw">true</span> } });

  <span class="tok-kw">const</span> scored = chunks
    .map((chunk) => ({ chunk, score: <span class="tok-fn">scoreOverlap</span>(terms, chunk.chunkText) }))
    .filter((entry) => entry.score > <span class="tok-str">0</span>)
    .sort((a, b) => b.score - a.score);

  <span class="tok-kw">return</span> scored.slice(<span class="tok-str">0</span>, limit).map(<span class="tok-fn">toRetrievedChunk</span>);
}`;

const MARKET_ROWS = [
  ['Qooper / Together', 'Mentor matching', 'No AI, no knowledge base'],
  ['Trainual / Guru', 'Document storage', 'No conversational Q&A'],
  ['Cornerstone LMS', 'Training delivery', 'No AI tutoring, no audit'],
  ['Glean / Copilot', 'AI search', 'No LOB context, no compliance'],
];

const ROADMAP_TABLE_ROWS = [
  ['Core schema and auth', 'MVP1', 'Complete'],
  ['Training and mentor workflow', 'MVP1', 'Complete'],
  ['Immutable audit log', 'MVP1', 'Complete'],
  ['Knowledge map and mock AI chat', 'MVP1', 'Complete'],
  ['Portfolio demo mode', 'MVP2', 'Complete'],
  ['Live Claude API integration', 'MVP2', 'In progress'],
];

const COST_ROWS = [
  ['100 queries', '~$2'],
  ['500 queries', '~$10'],
  ['Production (1000+)', '~$20'],
];

const PROBLEM_ITEMS = [
  'Training content lives in scattered PDFs and SharePoint folders with no search that actually understands a question.',
  '"Who approves X" or "who do I contact for Y" is unwritten institutional knowledge; new hires just have to ask around until they find the right person.',
  "Compliance teams need proof training happened and wasn't quietly edited after the fact, but most LMS completion records are just editable database rows.",
  'Mentor programs run on goodwill and a spreadsheet, so nobody has a real-time view of which pairings are falling behind.',
  "People leaders have no single dashboard showing who's overdue on what; they find out reactively, usually from an auditor.",
];

const NEXT_ITEMS = [
  'Wire the live Claude API in behind the existing retrieval interface, no changes needed above the service layer.',
  'Real document ingestion (PDF/DOCX parsing) instead of pre-chunked seed content.',
  'Usage-based cost monitoring dashboard for compliance admins running live Claude traffic.',
  'Pilot with a real financial-services LOB team to validate the knowledge map against actual tribal knowledge.',
];

const heroContainer = staggerContainer(0.1, 0.1);

export default function CaseStudy() {
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
              <motion.h1 variants={fadeUpItem}>CUE</motion.h1>
              <motion.p className="cs-hero__sub" variants={fadeUpItem}>
                AI Onboarding &amp; Knowledge Buddy
              </motion.p>
              <motion.p className="text-small" style={{ marginTop: 8 }} variants={fadeUpItem}>
                Role: Product Manager &amp; Developer &middot; 2026
              </motion.p>
              <motion.div className="cs-hero__actions" variants={fadeUpItem}>
                <a href="/demo/app.html" target="_blank" rel="noreferrer" className="btn btn-primary">
                  Try live demo
                </a>
                <a
                  href="https://github.com/saibala98/cue-platform"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  GitHub code
                </a>
                <a href="#prd" className="btn btn-ghost">
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
                  New employees at financial institutions are onboarded through a patchwork of PDFs, shared drives,
                  spreadsheets, and whoever happens to answer Slack first. Nothing is AI-searchable, nothing tracks
                  who actually completed mandatory compliance training, and &quot;who approves this&quot; lives
                  entirely in people&apos;s heads, which is a real problem the day that person is on vacation, or
                  leaves.
                </p>
                <p>
                  CUE is a B2B platform that replaces that patchwork with one LOB-aware system: structured training
                  modules with quizzes, a mentor collaboration checklist, an AI assistant grounded in a
                  company&apos;s own documents and tribal-knowledge map, a people-leader completion dashboard, and a
                  compliance audit log built to be genuinely immutable at the database level, not just &quot;we
                  promise not to edit it.&quot;
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
                <h4>Scope shipped</h4>
                <p>4 user roles, 9 database entities, full CRUD admin panels, working AI chat, live demo mode</p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>Build approach</h4>
                <p>
                  Solo product and full-stack build across 9 structured feature passes, each spec&apos;d, built, and
                  verified live
                </p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>Current status</h4>
                <p>MVP1 (operational foundation) complete. MVP2 (real Claude API integration) in progress</p>
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
                <p>
                  Talk to anyone who has onboarded into a large financial institution and the same complaints
                  surface every time:
                </p>
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

            <div className="cs-prose" style={{ marginTop: 28 }}>
              <h3>Why now?</h3>
              <p>
                Two things converged: LLMs got cheap and good enough that a real conversational Q&amp;A layer over
                internal documents is now a weekend-scale build rather than a research project, and financial
                institutions are under increasing regulatory pressure to prove, not just claim, that mandatory
                training was completed and hasn&apos;t been tampered with. A platform that&apos;s AI-native{' '}
                <em>and</em> compliance-grade from day one is the gap.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ============ MARKET ANALYSIS ============ */}
        <motion.section
          className="cs-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <div>
              <h2 className="section-title">Market analysis</h2>
              <div className="cs-prose">
                <p>
                  The closest existing tools each solve one slice of this. None combine AI-native Q&amp;A with
                  compliance-grade audit logging in one LOB-aware platform.
                </p>
              </div>
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
                    <th>Tool</th>
                    <th>What it does</th>
                    <th>Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {MARKET_ROWS.map(([tool, does, gap]) => (
                    <tr key={tool}>
                      <td>{tool}</td>
                      <td>{does}</td>
                      <td>{gap}</td>
                    </tr>
                  ))}
                  <tr className="is-highlight">
                    <td>CUE (ours)</td>
                    <td>All of the above</td>
                    <td>Unified, AI-native</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
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
              <h2 className="section-title">Solution &amp; PRD</h2>
              <div className="cs-prose">
                <p>Five core capabilities define the product, each mapped to one of the problems above:</p>
              </div>
            </div>

            <motion.ol
              className="numbered-list"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.08)}
            >
              <motion.li variants={slideLeftItem}>
                <strong>AI Knowledge Buddy</strong>: RAG-powered Q&amp;A grounded in a LOB&apos;s own documents, so
                answers cite an actual source instead of guessing.
              </motion.li>
              <motion.li variants={slideLeftItem}>
                <strong>LOB-Specific Training Delivery</strong>: versioned modules with lessons and quizzes, scoped
                to the employee&apos;s line of business.
              </motion.li>
              <motion.li variants={slideLeftItem}>
                <strong>Compliance Audit Logging</strong>: an append-only completion record enforced by a database
                trigger, not just an app-layer convention.
              </motion.li>
              <motion.li variants={slideLeftItem}>
                <strong>Mentor Workflow</strong>: a structured 6-session collaboration checklist shared between
                mentor and mentee, with real progress tracking.
              </motion.li>
              <motion.li variants={slideLeftItem}>
                <strong>Leader Dashboard</strong>: one view of completions, overdue items, and active mentor
                assignments across a people leader&apos;s whole team.
              </motion.li>
            </motion.ol>
          </div>
        </motion.section>

        {/* ============ USER PERSONAS ============ */}
        <motion.section
          className="cs-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <h2 className="section-title">User personas</h2>

            <motion.div
              className="persona-grid"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
            >
              <motion.div className="card persona-card" variants={fadeUpItem} whileHover={cardHover}>
                <span className="persona-card__name">Alex</span>
                <span className="persona-card__role">26 &middot; New joinee, GIC Operations Analyst</span>
                <dl>
                  <div>
                    <dt>Goals</dt>
                    <dd>Get productive fast without bothering colleagues for every basic question.</dd>
                  </div>
                  <div>
                    <dt>Pain points</dt>
                    <dd>Doesn&apos;t know who to ask, doesn&apos;t want to look slow by asking twice.</dd>
                  </div>
                  <div>
                    <dt>Uses in CUE</dt>
                    <dd>Training modules, Knowledge Buddy chat, mentor checklist with Sarah.</dd>
                  </div>
                </dl>
              </motion.div>

              <motion.div className="card persona-card" variants={fadeUpItem} whileHover={cardHover}>
                <span className="persona-card__name">Michael</span>
                <span className="persona-card__role">42 &middot; People leader, VP Operations</span>
                <dl>
                  <div>
                    <dt>Goals</dt>
                    <dd>Know exactly who&apos;s on track and who&apos;s falling behind, without chasing status updates.</dd>
                  </div>
                  <div>
                    <dt>Pain points</dt>
                    <dd>Finds out about overdue training reactively, usually too late to fix it quietly.</dd>
                  </div>
                  <div>
                    <dt>Uses in CUE</dt>
                    <dd>Leader dashboard, mentor assignment, knowledge map admin.</dd>
                  </div>
                </dl>
              </motion.div>

              <motion.div className="card persona-card" variants={fadeUpItem} whileHover={cardHover}>
                <span className="persona-card__name">Jennifer</span>
                <span className="persona-card__role">38 &middot; Compliance admin, L&amp;D Manager</span>
                <dl>
                  <div>
                    <dt>Goals</dt>
                    <dd>Produce audit-proof evidence that mandatory training happened, on demand.</dd>
                  </div>
                  <div>
                    <dt>Pain points</dt>
                    <dd>Editable completion records are a real audit risk; she needs records nobody can quietly alter.</dd>
                  </div>
                  <div>
                    <dt>Uses in CUE</dt>
                    <dd>Immutable audit log, CSV export, module version history.</dd>
                  </div>
                </dl>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ============ MVP ROADMAP ============ */}
        <motion.section
          className="cs-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <h2 className="section-title">MVP roadmap</h2>

            <motion.div
              className="roadmap-grid"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
            >
              <motion.div className="card roadmap-card" variants={fadeUpItem} whileHover={cardHover}>
                <span className="tag tag-status">MVP1 &middot; Weeks 1-8</span>
                <h3 style={{ marginTop: 14 }}>Operational foundation</h3>
                <ul>
                  <li>Auth, roles, and LOB structure</li>
                  <li>Training modules with lessons and quizzes</li>
                  <li>Mentor collaboration checklist (6 sessions)</li>
                  <li>Leader dashboard and completion tracking</li>
                  <li>Immutable compliance audit log and CSV export</li>
                  <li>Knowledge map admin (structured tribal knowledge)</li>
                </ul>
              </motion.div>
              <motion.div className="card roadmap-card" variants={fadeUpItem} whileHover={cardHover}>
                <span className="tag tag-status is-progress">MVP2 &middot; Weeks 9-12</span>
                <h3 style={{ marginTop: 14 }}>Intelligence and compliance layer</h3>
                <ul>
                  <li>Real Claude API integration, replacing the mock RAG layer</li>
                  <li>Document ingestion pipeline for uploaded LOB SOPs</li>
                  <li>Module version history and re-certification flows</li>
                  <li>Demo mode for portfolio and stakeholder walkthroughs</li>
                  <li>Cost monitoring on live Claude usage</li>
                </ul>
              </motion.div>
            </motion.div>

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
                    <th>Milestone</th>
                    <th>Phase</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ROADMAP_TABLE_ROWS.map(([milestone, phase, status]) => (
                    <tr key={milestone}>
                      <td>{milestone}</td>
                      <td>{phase}</td>
                      <td>{status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </motion.section>

        {/* ============ TECHNICAL ARCHITECTURE ============ */}
        <motion.section
          className="cs-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <h2 className="section-title">Technical architecture</h2>

            <motion.div
              className="arch-grid"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
            >
              <motion.div className="card arch-card" variants={fadeUpItem} whileHover={cardHover}>
                <span className="arch-card__label">Frontend</span>
                <p>
                  React + TypeScript + Tailwind CSS, built with Vite. One typed API client per resource, shared
                  types between every page and its data layer.
                </p>
              </motion.div>
              <motion.div className="card arch-card" variants={fadeUpItem} whileHover={cardHover}>
                <span className="arch-card__label">Backend</span>
                <p>
                  Node.js + Express + TypeORM. Every async route wrapped in a shared error handler; role-based
                  middleware guards every non-public endpoint.
                </p>
              </motion.div>
              <motion.div className="card arch-card" variants={fadeUpItem} whileHover={cardHover}>
                <span className="arch-card__label">Database</span>
                <p>
                  PostgreSQL, with migration-based schema history and a database-level trigger enforcing
                  immutability on completion records, not just an app-layer rule.
                </p>
              </motion.div>
              <motion.div className="card arch-card" variants={fadeUpItem} whileHover={cardHover}>
                <span className="arch-card__label">AI</span>
                <p>
                  Claude API (Anthropic), RAG-style: retrieval against LOB documents and the knowledge map first,
                  generation grounded in what&apos;s retrieved.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ============ AI STRATEGY ============ */}
        <motion.section
          className="cs-section"
          id="ai-strategy"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <div>
              <h2 className="section-title">AI strategy</h2>
              <div className="cs-prose">
                <p>How the Knowledge Buddy actually works, end to end:</p>
              </div>
            </div>

            <motion.div
              className="rag-steps"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.08)}
            >
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                1. Documents are uploaded per line-of-business and chunked into searchable sections.
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                2. An incoming question is scored against those chunks (and the knowledge map) for relevance.
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                3. The top-matching chunk becomes grounding context: the thing the answer actually has to be true to.
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                4. Claude answers using that context, with the source cited back to the user, not invented from
                general knowledge.
              </motion.div>
            </motion.div>

            <div>
              <h3>System prompt design (MVP2)</h3>
              <div className="cs-prose">
                <p>
                  MVP1 ships this retrieval step wired to a deterministic keyword-matching mock instead of a live
                  model call, intentionally, so the retrieval architecture could be validated end-to-end before
                  spending on API calls. The system prompt below is the one designed for the MVP2 swap-in:
                </p>
              </div>
            </div>
            <motion.div
              className="code-block"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUpItem}
            >
              <span className="code-block__label">system prompt - knowledge buddy (MVP2)</span>
              <pre dangerouslySetInnerHTML={{ __html: SYSTEM_PROMPT_HTML }} />
            </motion.div>

            <h3 style={{ marginTop: 40 }}>Three answer types</h3>
            <motion.div
              className="answer-types"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
            >
              <motion.div className="card answer-type" variants={fadeUpItem} whileHover={cardHover}>
                <span className="answer-type__num">Type 1</span>
                <h4>Document Q&amp;A</h4>
                <p>Answers grounded in an uploaded LOB document, with the source file and section cited alongside the answer.</p>
              </motion.div>
              <motion.div className="card answer-type" variants={fadeUpItem} whileHover={cardHover}>
                <span className="answer-type__num">Type 2</span>
                <h4>Knowledge map lookup</h4>
                <p>&quot;Who approves X&quot; or &quot;who do I contact for Y&quot;, resolved from the structured knowledge map, not free text.</p>
              </motion.div>
              <motion.div className="card answer-type" variants={fadeUpItem} whileHover={cardHover}>
                <span className="answer-type__num">Type 3</span>
                <h4>Course tutoring</h4>
                <p>Stuck on a quiz question: the assistant points back to the exact lesson content instead of just giving the answer.</p>
              </motion.div>
            </motion.div>

            <h3 style={{ marginTop: 40 }}>Cost analysis</h3>
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
                    <th>Usage</th>
                    <th>Monthly cost</th>
                  </tr>
                </thead>
                <tbody>
                  {COST_ROWS.map(([usage, cost]) => (
                    <tr key={usage}>
                      <td>{usage}</td>
                      <td>{cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </motion.section>

        {/* ============ WHAT I BUILT ============ */}
        <motion.section
          className="cs-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <div>
              <h2 className="section-title">What I built</h2>
              <div className="cs-prose">
                <p>A few of the more deliberate decisions, with the actual code behind them:</p>
              </div>
            </div>

            <div>
              <h3>Immutable audit log trigger (SQL)</h3>
              <div className="cs-prose">
                <p>
                  Compliance completion records can&apos;t be &quot;probably&quot; immutable; an app-layer rule is
                  one bug away from a regulator finding an edited row. This is enforced at the database level: any{' '}
                  <code>UPDATE</code> or <code>DELETE</code> on <code>completion_records</code> is rejected by
                  Postgres itself, before it ever reaches the application.
                </p>
              </div>
            </div>
            <motion.div
              className="code-block"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUpItem}
            >
              <span className="code-block__label">migration - completion_immutability trigger</span>
              <pre dangerouslySetInnerHTML={{ __html: SQL_TRIGGER_HTML }} />
            </motion.div>

            <div>
              <h3 style={{ marginTop: 40 }}>RAG retrieval function (TypeScript)</h3>
              <div className="cs-prose">
                <p>
                  The retrieval layer is written to the same interface a real vector-similarity search would
                  expose, so swapping keyword-overlap scoring for real embeddings later is a drop-in change, not a
                  rewrite of every caller.
                </p>
              </div>
            </div>
            <motion.div
              className="code-block"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUpItem}
            >
              <span className="code-block__label">retrievalService.ts</span>
              <pre dangerouslySetInnerHTML={{ __html: RETRIEVAL_SERVICE_HTML }} />
            </motion.div>

            <p className="text-small" style={{ marginTop: 24 }}>
              Full source:{' '}
              <a
                href="https://github.com/saibala98/cue-platform"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--primary)' }}
              >
                github.com/saibala98/cue-platform
              </a>
            </p>
          </div>
        </motion.section>

        {/* ============ LESSONS LEARNED ============ */}
        <motion.section
          className="cs-section"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionReveal}
        >
          <div className="container">
            <h2 className="section-title">Lessons learned</h2>
            <motion.div
              className="lessons-grid"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
            >
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>Ship the retrieval architecture before the model call</h4>
                <p>
                  Building the mock RAG layer first, same interface, no live API, let me validate the whole product
                  loop (chunking, scoring, citation) without spending on tokens or waiting on rate limits.
                </p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>Compliance requirements shape the schema, not just the UI</h4>
                <p>
                  &quot;Make the audit log immutable&quot; isn&apos;t a frontend feature; it changed how I designed
                  the database migration from the very first pass.
                </p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>A demo mode is a product decision, not an afterthought</h4>
                <p>
                  Deciding early that CUE needed a backend-free, mock-data demo mode for stakeholder walkthroughs
                  shaped the API layer to be cleanly swappable from day one.
                </p>
              </motion.div>
              <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
                <h4>Personas keep scope honest</h4>
                <p>
                  Every feature I built maps back to something Alex, Michael, or Jennifer specifically needed; that
                  discipline is what kept a 9-entity platform from sprawling into a features junk drawer.
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
