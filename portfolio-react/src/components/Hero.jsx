import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CandidateBrief from './CandidateBrief.jsx';
import { EASE, fadeUpItem, staggerContainer } from '../motion.js';

const wordContainer = staggerContainer(0.08);
const wordItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

// Hero is visible immediately at load, so it animates on mount
// (initial/animate) rather than on scroll into view. The headline
// reveals word-by-word via a nested stagger container; the rest of the
// hero content (eyebrow, role, thesis, actions) staggers in around it
// from one shared parent container, exactly as requested.
export default function Hero() {
  return (
    <>
      <section className="hero" id="top">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer(0.12, 0.1)}>
            <motion.p className="eyebrow eyebrow--gold" variants={fadeUpItem}>
              Candidate brief
            </motion.p>

            <motion.h1 className="hero-name" variants={wordContainer}>
              {'Sai Saiprasad'.split(' ').map((word) => (
                <motion.span key={word} variants={wordItem} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p className="hero__role" variants={fadeUpItem}>
              AI Product Manager
            </motion.p>
            <motion.p className="hero__thesis" variants={fadeUpItem}>
              4 years shipping software at CIBC. Now building AI products that work. MMAI at Schulich.
            </motion.p>
            <motion.div className="hero__actions" variants={fadeUpItem}>
              <Link to="/case-study" className="btn btn-primary">
                View CUE case study &rarr;
              </Link>
              <a href="/resume.pdf" className="btn btn-ghost">
                Download resume
              </a>
            </motion.div>
          </motion.div>

          <CandidateBrief />
        </div>
      </section>

      <div className="trust-bar">
        <div className="container">
          <div className="trust-strip">
            <span className="tnum">4+ yrs &middot; CIBC/TCS</span>
            <span>MMAI &middot; Schulich</span>
            <span>KW, ON</span>
          </div>
        </div>
      </div>
    </>
  );
}
