import { motion } from 'framer-motion';
import { slideLeftItem, staggerContainer, viewportOnce } from '../motion.js';

// Used both in the hero (visible immediately at load) and in the CUE
// section's product brief (scroll-triggered) — whileInView handles both
// correctly, since above-the-fold content just crosses the viewport
// threshold on the very first paint.
export default function CandidateBrief() {
  return (
    <div className="brief-card">
      <div className="brief-card__header">
        <span>Candidate brief</span>
      </div>
      <hr className="brief-card__rule" />
      <motion.dl
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.06)}
      >
        <motion.div className="brief-row" variants={slideLeftItem}>
          <dt>Name</dt>
          <dd>Sai B Saiprasad</dd>
        </motion.div>
        <motion.div className="brief-row" variants={slideLeftItem}>
          <dt>Track</dt>
          <dd>QA Delivery &rarr; AI Product</dd>
        </motion.div>
        <motion.div className="brief-row" variants={slideLeftItem}>
          <dt>Program</dt>
          <dd className="tnum">MMAI &middot; Schulich &middot; 2027</dd>
        </motion.div>
        <motion.div className="brief-row" variants={slideLeftItem}>
          <dt>Embedded</dt>
          <dd>TCS @ CIBC Banking</dd>
        </motion.div>
        <motion.div className="brief-row brief-row--spaced" variants={slideLeftItem}>
          <dt>Problem</dt>
          <dd>Enterprise AI needs PMs who can actually build</dd>
        </motion.div>
        <motion.div className="brief-row" variants={slideLeftItem}>
          <dt>Solution</dt>
          <dd>Domain depth + MMAI + CUE platform shipped</dd>
        </motion.div>
        <motion.div className="brief-row brief-row--spaced" variants={slideLeftItem}>
          <dt>Status</dt>
          <dd className="brief-status">
            <span className="status-dot status-dot--pulse"></span>
            Available &middot; KW, ON 🇨🇦
          </dd>
        </motion.div>
      </motion.dl>
    </div>
  );
}
