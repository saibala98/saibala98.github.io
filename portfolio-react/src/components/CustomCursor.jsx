import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Elements the cursor should react to. `button` already covers the work
// item accordion headers and the disabled "coming soon" buttons; `.card`
// covers the capability/lessons/persona cards elsewhere on the site.
const HOVER_SELECTOR = 'a, button, input, textarea, select, .card, [role="button"], .cursor-hover-target';

// Dot tracks the raw mouse position with no smoothing (useMotionValue).
// The ring follows via useSpring, which runs its own requestAnimationFrame
// physics loop under the hood - the same "interpolate toward the target
// each frame" behavior a hand-rolled rAF/lerp loop would give, just via
// the Framer Motion primitives already used throughout this app.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 300, damping: 30, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return undefined;

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-active');

    const handleMove = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    const handleOver = (e) => {
      if (e.target.closest?.(HOVER_SELECTOR)) setHovering(true);
    };
    const handleOut = (e) => {
      const target = e.target.closest?.(HOVER_SELECTOR);
      const next = e.relatedTarget?.closest?.(HOVER_SELECTOR);
      if (target && !next) setHovering(false);
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="custom-cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: hovering ? 0.7 : 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="custom-cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? 1.6 : 1,
          borderWidth: hovering ? 2 : 1.5,
          backgroundColor: hovering ? 'rgba(83, 58, 253, 0.1)' : 'rgba(83, 58, 253, 0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        aria-hidden="true"
      />
    </>
  );
}
