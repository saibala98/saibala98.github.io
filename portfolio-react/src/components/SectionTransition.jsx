import { motion, useReducedMotion } from 'framer-motion';
import { viewportRepeat } from '../motion.js';
import SectionWave from './SectionWave.jsx';

// Shared wrapper for top-level page sections: a gentle "slot machine
// settle" - spring with a touch of overshoot, same flavor as the hero's
// what-I-bring list - as the section scrolls into view, plus a decorative
// wavy divider along its bottom edge.
//
// Deliberately NOT scroll-snapping or hijacking the scroll position, and
// NOT morphing the wave off live scroll velocity - both would need a
// heavier tool (GSAP ScrollTrigger) and fundamentally change how the whole
// site scrolls, which is a much bigger, riskier trade for a portfolio site
// than the visual payoff justifies. This keeps normal free scroll intact.
//
// The reveal deliberately does NOT start from opacity: 0 - a full
// invisible-to-visible pop reads as "a new slide has arrived," which is
// exactly the slideshow feeling this is meant to avoid now that sections
// sit flush against each other. A shallow partial fade + small y-settle
// keeps a bit of motion without that block-reveal cue.
const settleVariants = {
  hidden: { opacity: 0.55, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 150, damping: 18, mass: 0.9 },
  },
};

export default function SectionTransition({ className = '', id, ariaLabel, showWave = true, children }) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className={`section-transition ${className}`}
      id={id}
      aria-label={ariaLabel}
      initial={reduce ? undefined : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={viewportRepeat}
      variants={reduce ? undefined : settleVariants}
    >
      {children}
      {showWave && <SectionWave />}
    </motion.section>
  );
}
