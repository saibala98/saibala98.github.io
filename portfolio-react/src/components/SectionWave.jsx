import { motion, useReducedMotion } from 'framer-motion';

const FLAT = 'M0,20 L1200,20 L1200,40 L0,40 Z';
const WAVE_A = 'M0,20 C150,36 350,4 600,20 C850,36 1050,4 1200,20 L1200,40 L0,40 Z';
const WAVE_B = 'M0,20 C150,4 350,36 600,20 C850,4 1050,36 1200,20 L1200,40 L0,40 Z';

// Decorative "elastic band" divider along a section's bottom edge - a
// slow, gentle undulation rather than anything tied to live scroll
// velocity (see SectionTransition.jsx for why: a literal scroll-velocity
// stretch needs scroll-hijacking to feel right, which is a much bigger,
// riskier change than this site's normal free-scroll UX calls for).
export default function SectionWave() {
  const reduce = useReducedMotion();

  return (
    <div className="section-wave" aria-hidden="true">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
        <motion.path
          fill="currentColor"
          initial={false}
          animate={reduce ? { d: FLAT } : { d: [WAVE_A, WAVE_B, WAVE_A] }}
          transition={reduce ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}
