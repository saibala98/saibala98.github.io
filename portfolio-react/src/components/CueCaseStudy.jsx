import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE, cardHover, fadeUpItem, popItem, sectionReveal, staggerContainer, viewportOnce } from '../motion.js';

const DEMO_DESIGN_WIDTH = 1280;

// The MVP progress bar grows its width via Framer's declarative animate
// prop, driven by useInView — not part of the variant-propagation tree
// below since it animates a layout property (width), not a transform.
function ProgressBar({ progress }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  return (
    <div className="progress-bar" ref={ref}>
      <motion.div
        className="progress-bar__fill"
        initial={{ width: 0 }}
        animate={{ width: isInView ? `${progress}%` : 0 }}
        transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
      />
    </div>
  );
}

export default function CueCaseStudy() {
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
    <motion.section
      className="section section--warm"
      id="cue"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={sectionReveal}
    >
      <div className="container">
        <div>
          <h2 className="section-title" style={{ marginBottom: 8 }}>
            CUE
          </h2>
          <p className="heading-lg" style={{ color: 'var(--muted)', fontWeight: 300 }}>
            AI Onboarding &amp; Knowledge Buddy
          </p>
          <p className="cue-desc">
            A B2B platform that replaces fragmented onboarding stacks with a single LOB-aware AI assistant.
            Compliance audit logs, mentor tracking, and a knowledge buddy trained on your company&apos;s docs.
          </p>
        </div>

        <div className="cue-grid">
          <div className="brief-card">
            <div className="brief-card__header">
              <span>Product brief</span>
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
                <dd>New employees drown in scattered onboarding docs</dd>
              </div>
              <div className="brief-row">
                <dt>Solution</dt>
                <dd>Unified AI platform with LOB-aware knowledge buddy</dd>
              </div>
              <div className="brief-row brief-row--spaced">
                <dt>MVP1</dt>
                <dd>
                  <ProgressBar progress={80} />
                  <span className="mvp-progress__label">Complete</span>
                </dd>
              </div>
              <div className="brief-row">
                <dt>MVP2</dt>
                <dd>
                  <ProgressBar progress={20} />
                  <span className="mvp-progress__label">In progress</span>
                </dd>
              </div>
            </dl>
          </div>

          <motion.div
            className="capability-grid"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
          >
            <motion.div className="card" variants={fadeUpItem} whileHover={cardHover}>
              <h4>AI Knowledge Buddy</h4>
              <p>RAG Q&amp;A over LOB documents.</p>
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
            View CUE case study &rarr;
          </Link>
          <a href="https://github.com/saibala98/cue-platform" target="_blank" rel="noreferrer" className="btn btn-ghost">
            GitHub code
          </a>
        </div>

        <motion.ul
          className="tag-list cue-tags"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.05)}
        >
          {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Claude API'].map((tech) => (
            <motion.li className="tag tag-tech" key={tech} variants={popItem}>
              {tech}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
