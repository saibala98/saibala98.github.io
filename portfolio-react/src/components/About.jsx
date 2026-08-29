import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE, sectionReveal, viewportOnce } from '../motion.js';

// Counts from 0 up to `to` once the stat card scrolls into view, using
// Framer's imperative animate() driven by useInView — not a declarative
// variant, since it's animating a plain number rather than a transform.
function StatNumber({ to, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!isInView) return undefined;
    if (reduce) {
      setValue(to);
      return undefined;
    }
    const controls = animate(0, to, {
      duration: 0.8,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, to, reduce]);

  return (
    <div className="stat-card__value tnum" ref={ref}>
      {value}
      {suffix}
    </div>
  );
}

export default function About() {
  return (
    <motion.section
      className="section section--surface"
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={sectionReveal}
    >
      <div className="container">
        <div>
          <h2 className="section-title">Product thinker who ships.</h2>
        </div>

        <div className="about-grid">
          <div>
            <div className="about-bio lead">
              <p>
                I&apos;m a QA Lead and Delivery Coordinator at TCS, embedded at CIBC across core banking products:
                RRSP, TFSA, RESP, RDSP, GIC, and FHSA.
              </p>
              <p>
                After 4 years at the intersection of software quality and delivery coordination, I&apos;m moving
                into AI Product Management.
              </p>
              <p>
                I&apos;m completing my MMAI at Schulich, where I&apos;ve built ML models, ETL pipelines, and studied
                AI product strategy. I don&apos;t just think about products. I build them.
              </p>
            </div>

            <div className="about-stats">
              <div className="stat-card">
                <StatNumber to={4} suffix="+" />
                <div className="stat-card__label">Years in tech</div>
              </div>
              <div className="stat-card">
                <StatNumber to={2027} />
                <div className="stat-card__label">MMAI completion</div>
              </div>
            </div>
          </div>

          <div className="info-rows">
            <div className="info-row">
              <p className="info-row__label">Current</p>
              <p className="info-row__title">TCS Delivery Coordinator @ CIBC</p>
              <p className="info-row__sub">
                <span className="pill-list">
                  <span>RRSP</span>
                  <span>TFSA</span>
                  <span>RESP</span>
                  <span>GIC</span>
                  <span>FHSA</span>
                </span>
              </p>
            </div>
            <div className="info-row">
              <p className="info-row__label">Education</p>
              <p className="info-row__title">MMAI &middot; Schulich School of Business, York University</p>
              <p className="info-row__sub">Expected April 2027</p>
            </div>
            <div className="info-row">
              <p className="info-row__label">Targeting</p>
              <p className="info-row__title">AI PM roles in financial services and tech</p>
              <p className="info-row__sub">Startups to Fortune 500</p>
            </div>
            <div className="info-row">
              <p className="info-row__label">Building now</p>
              <p className="info-row__title">CUE platform &middot; v2026.1</p>
              <p className="info-row__sub">MVP1 complete &middot; MVP2 in progress</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
