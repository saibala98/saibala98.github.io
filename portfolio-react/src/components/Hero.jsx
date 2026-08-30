import {
  motion,
  useAnimation,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import useTypewriter from '../useTypewriter.js';
import { EASE, fadeUpItem, slotItem, staggerContainer } from '../motion.js';

// Max rotation in either axis, degrees.
const MAX_TILT = 14;

// Base delay approximates when this list would have appeared in the outer
// hero stagger chain (eyebrow, name, role, thesis all play before it).
const BRING_BASE_DELAY = 0.6;
const BRING_STAGGER = 0.18;

// Position/blur settle via a slow-ish spring; color gets its own longer
// plain tween so the purple-to-muted fade is clearly visible after the
// line has already landed, not lost inside the quicker spring settle.
function reelTransition(delay = 0) {
  return {
    default: { type: 'spring', stiffness: 180, damping: 20, mass: 0.9, delay },
    color: { duration: 1.1, ease: 'easeOut', delay },
    fontWeight: { duration: 1.1, ease: 'easeOut', delay },
  };
}

// Plays the slide-in-and-settle reveal on mount (staggered by index), and
// replays the exact same animation from scratch every time the item is
// hovered - each point "rolls" again as the cursor moves from one to the
// next, rather than only playing once.
function BringItem({ index, children }) {
  const controls = useAnimation();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      controls.set('visible');
      return;
    }
    controls.set('hidden');
    controls.start('visible', reelTransition(BRING_BASE_DELAY + index * BRING_STAGGER));
  }, [controls, reduce, index]);

  const replay = () => {
    if (reduce) return;
    controls.set('hidden');
    controls.start('visible', reelTransition());
  };

  return (
    <motion.li variants={slotItem} animate={controls} onHoverStart={replay}>
      {children}
    </motion.li>
  );
}

const wordContainer = staggerContainer(0.08);
const wordItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

const ROLE_PHRASES = ['QA → Product → AI Product', 'Product & Strategy Professional'];

const WHAT_I_BRING = [
  '4 years delivering banking software at CIBC',
  'AI product strategy from Schulich MMAI',
  'Built CUE: a working AI onboarding platform',
  'QA → delivery → product: full software lifecycle',
];

// Entry animation (float in + scale) plus a subtle infinite idle float,
// both driven via imperative animate/initial props rather than variants,
// so they check useReducedMotion() directly (see motion.js's note on why
// the imperative animations in this app do that instead of relying on
// MotionConfig's automatic variant handling).
function HeroPhoto() {
  const reduce = useReducedMotion();
  const shineControls = useAnimation();
  const [isTouch] = useState(() => window.matchMedia('(pointer: coarse)').matches);
  const tiltDisabled = reduce || isTouch;

  // Raw values follow the cursor exactly; springs smooth them so the tilt
  // settles rather than snapping frame-to-frame. Shadow is derived from the
  // same springed rotation and offset in the opposite direction, so the
  // "light source" reads as fixed while the photo tilts under it.
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 15, mass: 0.5 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 15, mass: 0.5 });
  const shadowX = useTransform(springRotateY, [-MAX_TILT, MAX_TILT], [18, -18]);
  const shadowY = useTransform(springRotateX, [-MAX_TILT, MAX_TILT], [-18, 18]);
  const tiltShadow = useMotionTemplate`0 0 0 1px rgba(83, 58, 253, 0.2), 0 24px 48px rgba(83, 58, 253, 0.32), ${shadowX}px ${shadowY}px 40px rgba(13, 37, 61, 0.22), 0 20px 48px rgba(13, 37, 61, 0.16), 0 4px 12px rgba(13, 37, 61, 0.08)`;

  const handleTiltMove = (e) => {
    if (tiltDisabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    rotateY.set((offsetX / (rect.width / 2)) * MAX_TILT);
    rotateX.set((offsetY / (rect.height / 2)) * -MAX_TILT);
  };

  const handleTiltLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  // One-shot glare sweep replayed on every hover, independent of the
  // always-on looping sweep (a separate overlay layer, driven by CSS).
  const playShine = () => {
    if (reduce) return;
    shineControls.set({ x: '-120%', opacity: 0 });
    shineControls.start({
      x: '220%',
      opacity: [0, 1, 1, 0],
      transition: { duration: 0.9, ease: 'easeInOut', times: [0, 0.15, 0.7, 1] },
    });
  };

  return (
    <motion.div
      className="hero-photo"
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 480 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reduce ? 0.4 : 1.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <motion.div
        className="hero-photo__ring"
        animate={reduce ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
        whileHover={{ scale: 1.03 }}
        onHoverStart={playShine}
        onMouseMove={handleTiltMove}
        onMouseLeave={handleTiltLeave}
        style={
          tiltDisabled
            ? undefined
            : { transformPerspective: 1000, rotateX: springRotateX, rotateY: springRotateY, boxShadow: tiltShadow }
        }
      >
        <img src="/sai-photo.jpg" alt="Sai B Saiprasad" className="hero-photo__img" />
        {!reduce && <span className="hero-photo__shine hero-photo__shine--loop" aria-hidden="true" />}
        {!reduce && (
          <motion.span
            className="hero-photo__shine"
            initial={{ x: '-120%', opacity: 0 }}
            animate={shineControls}
            aria-hidden="true"
          />
        )}
      </motion.div>

      <div className="trust-strip hero-photo__stats">
        <span className="tnum">4+ Years</span>
        <span aria-hidden="true">&middot;</span>
        <span className="tnum">MMAI 2027</span>
        <span aria-hidden="true">&middot;</span>
        <span className="tnum">CIBC/TCS</span>
      </div>
    </motion.div>
  );
}

// Hero is visible immediately at load, so it animates on mount
// (initial/animate) rather than on scroll into view. The headline
// reveals word-by-word via a nested stagger container; the rest of the
// hero content (eyebrow, role, thesis, what-I-bring, actions) staggers in
// around it from one shared parent container.
export default function Hero() {
  const reduce = useReducedMotion();
  const roleText = useTypewriter(ROLE_PHRASES, { reduceMotion: reduce });

  return (
    <>
      <section className="hero" id="top">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer(0.12, 0.1)}>
            <motion.p className="eyebrow eyebrow--gold" variants={fadeUpItem}>
              Candidate brief
            </motion.p>

            <motion.h1 className="hero-name" variants={wordContainer}>
              {'Sai B Saiprasad'.split(' ').map((word, i) => (
                <motion.span key={`${word}-${i}`} variants={wordItem} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p className="hero__role" variants={fadeUpItem}>
              <span className="sr-only">Product &amp; Strategy Professional</span>
              <span aria-hidden="true">
                {roleText}
                {!reduce && <span className="hero__role-cursor" />}
              </span>
            </motion.p>
            <motion.p className="hero__thesis" variants={fadeUpItem}>
              4 years shipping software at CIBC. Now building AI products that work. MMAI at Schulich.
            </motion.p>

            <ul className="dash-list hero__bring">
              {WHAT_I_BRING.map((item, index) => (
                <BringItem key={item} index={index}>
                  {item}
                </BringItem>
              ))}
            </ul>

            <motion.div className="hero__actions" variants={fadeUpItem}>
              <a href="#work" className="btn btn-primary">
                View my work &rarr;
              </a>
              <a href="/resume.pdf" className="btn btn-ghost">
                Download resume
              </a>
            </motion.div>
          </motion.div>

          <div className="hero-photo-col">
            <HeroPhoto />
          </div>
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
