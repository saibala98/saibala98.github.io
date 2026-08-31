import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import WorkItem from './WorkItem.jsx';
import { cardHover, fadeUpItem, staggerContainer } from '../motion.js';
import SectionTransition from './SectionTransition.jsx';
import WorkBackground from './WorkBackground.jsx';

// Content revealed by expanding the accordion (not by scrolling) should
// animate in on mount, not via whileInView - it mounts inside an
// AnimatePresence container whose height is still animating from 0, so
// IntersectionObserver-based triggers can end up permanently "not
// intersecting" (the element it's watching has ~zero size at the moment
// it starts observing) and the content is left stuck at opacity 0 forever.
// This showed up specifically on mobile taps, where there's no hover/resize
// repaint to accidentally re-trigger the observer.

const DEMO_DESIGN_WIDTH = 1280;

// Static mono glyph bar (filled vs. empty blocks out of 10) rather than an
// animated width bar - simple, legible at a glance in the product brief.
function ProgressGlyph({ filled, total = 10 }) {
  return (
    <span className="mvp-glyph">
      <span className="mvp-glyph__filled">{'■'.repeat(filled)}</span>
      <span className="mvp-glyph__empty">{'░'.repeat(total - filled)}</span>
    </span>
  );
}

function ComingSoonButton({ variant, children }) {
  return (
    <span className="btn-tooltip-wrap" title="Coming soon">
      <button type="button" className={`btn ${variant}`} disabled>
        {children}
      </button>
    </span>
  );
}

function CueWorkContent() {
  const viewportRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const frame = frameRef.current;
    if (!viewport || !frame) return undefined;

    const resize = () => {
      const scale = viewport.clientWidth / DEMO_DESIGN_WIDTH;
      frame.style.setProperty('--demo-scale', scale.toFixed(4));
    };
    resize();

    if (!('ResizeObserver' in window)) return undefined;
    const observer = new ResizeObserver(resize);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <p className="cue-desc">
        A B2B platform that replaces fragmented onboarding stacks with a single LOB-aware AI assistant.
        Compliance audit logs, mentor tracking, and a knowledge buddy trained on your company&apos;s docs.
      </p>

      <div className="cue-grid">
        <div className="brief-card">
          <div className="brief-card__header">
            <span>Product brief</span>
            <span>v2026.1</span>
          </div>
          <hr className="brief-card__rule" />
          <dl>
            <div className="brief-row">
              <dt>Product</dt>
              <dd>CUE - AI onboarding &amp; knowledge buddy</dd>
            </div>
            <div className="brief-row">
              <dt>Type</dt>
              <dd>B2B SaaS &middot; Enterprise AI</dd>
            </div>
            <div className="brief-row">
              <dt>Stack</dt>
              <dd>React &middot; Node.js &middot; Claude</dd>
            </div>
            <div className="brief-row brief-row--spaced">
              <dt>Problem</dt>
              <dd>Employees drown in scattered onboarding docs</dd>
            </div>
            <div className="brief-row">
              <dt>Solution</dt>
              <dd>Unified AI platform with LOB-aware knowledge buddy</dd>
            </div>
            <div className="brief-row brief-row--spaced">
              <dt>MVP1</dt>
              <dd>
                <ProgressGlyph filled={8} />
                <span className="mvp-progress__label">Complete</span>
              </dd>
            </div>
            <div className="brief-row">
              <dt>MVP2</dt>
              <dd>
                <ProgressGlyph filled={2} />
                <span className="mvp-progress__label">In Progress</span>
              </dd>
            </div>
          </dl>
        </div>

        <motion.div className="capability-grid" initial="hidden" animate="visible" variants={staggerContainer(0.1)}>
          <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
            <h4>AI Knowledge Buddy</h4>
            <p>RAG-powered Q&amp;A over company docs.</p>
          </motion.div>
          <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
            <h4>Compliance Audit</h4>
            <p>Immutable INSERT-only records.</p>
          </motion.div>
          <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
            <h4>Mentor Workflow</h4>
            <p>6-session collaboration checklist.</p>
          </motion.div>
          <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
            <h4>Leader Dashboard</h4>
            <p>Completions, overdue, CSV export.</p>
          </motion.div>
        </motion.div>
      </div>

      <div className="cue-demo">
        <div className="cue-demo-viewport" ref={viewportRef}>
          <iframe
            ref={frameRef}
            className="cue-demo__frame"
            src="/demo/app.html"
            title="Live preview of the CUE platform"
          ></iframe>
        </div>
        <a className="cue-demo__badge" href="/demo/app.html" target="_blank" rel="noreferrer">
          Try live demo &rarr;
        </a>
      </div>

      <div className="cue-actions">
        <Link to="/case-study" className="btn btn-primary">
          View case study &rarr;
        </Link>
        <a href="/demo/app.html" target="_blank" rel="noreferrer" className="btn btn-secondary">
          Try live demo
        </a>
        <a href="https://github.com/saibala98/cue-platform" target="_blank" rel="noreferrer" className="btn btn-ghost">
          GitHub
        </a>
      </div>
    </>
  );
}

function CopilotWorkContent() {
  return (
    <div className="copilot-grid">
      <div>
        <p className="heading-lg" style={{ fontWeight: 300 }}>
          Banking customers consistently struggle to decide how much to contribute to registered savings
          accounts - RRSP, TFSA, and FHSA - and when. The idea is simple: an AI-guided module embedded
          within a banking app&apos;s financial planning experience that removes the guesswork.
        </p>
        <p className="cue-desc">
          A concept for any banking application looking to deepen its financial planning capabilities. The
          module analyzes a customer&apos;s income, goals, tax situation, and current savings to recommend
          optimized contribution amounts across registered accounts, and explains the reasoning in plain
          language.
        </p>
        <ul className="dash-list">
          <li>Personalized RRSP/TFSA/FHSA contribution recommendations</li>
          <li>Tax optimization logic (deduction limits vs. flexibility)</li>
          <li>FHSA first-home buyer guidance and eligibility checks</li>
          <li>Plain-language explanations for every recommendation</li>
          <li>Interactive prototype for stakeholder demos</li>
        </ul>
        <div className="concept-note">
          💡 Concept stage - the product thinking and UX flow are mapped out. Engineering implementation is
          next.
        </div>
      </div>

      <div>
        <div className="about-stats">
          <div className="stat-card">
            <div className="stat-card__value tnum">3</div>
            <div className="stat-card__label">Registered accounts</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">💡</div>
            <div className="stat-card__label">Concept stage</div>
          </div>
        </div>
        <ul className="tag-list copilot-tags">
          {['React', 'AI/ML', 'Banking', 'UX Research', 'Fintech'].map((tag) => (
            <li className="tag tag-tech" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
        <div className="cue-actions">
          <ComingSoonButton variant="btn-primary">View pitch deck</ComingSoonButton>
          <ComingSoonButton variant="btn-secondary">Interactive prototype</ComingSoonButton>
        </div>
      </div>
    </div>
  );
}

export default function WorkSection() {
  const [openItem, setOpenItem] = useState(null);
  const toggle = (key) => setOpenItem((current) => (current === key ? null : key));

  return (
    <SectionTransition className="section section--warm" id="work" ariaLabel="Work">
      <WorkBackground />
      <div className="container">
        <div>
          <p className="eyebrow eyebrow--gold">Work</p>
          <h2 className="section-title">What I&apos;ve Built</h2>
        </div>

        <div className="work-list">
          <WorkItem
            title="CUE - AI Onboarding & Knowledge Buddy"
            subtitle="B2B SaaS platform for enterprise onboarding"
            tags={['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Claude API', 'RAG']}
            year="2026"
            statusBadges={[
              { label: 'MVP1 Complete', tone: 'complete' },
              { label: 'MVP2 In Progress', tone: 'progress' },
            ]}
            isOpen={openItem === 'cue'}
            onToggle={() => toggle('cue')}
          >
            <CueWorkContent />
          </WorkItem>

          <WorkItem
            title="Smart Contribution Copilot"
            subtitle="AI-guided registered savings optimization - banking feature concept"
            tags={['React', 'AI/ML', 'Banking', 'UX Research', 'Fintech']}
            year="2026"
            status="In Progress"
            isOpen={openItem === 'copilot'}
            onToggle={() => toggle('copilot')}
          >
            <CopilotWorkContent />
          </WorkItem>
        </div>
      </div>
    </SectionTransition>
  );
}
