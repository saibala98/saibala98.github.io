// Shared Framer Motion variants/helpers used across components.
//
// Reduced motion: the app is wrapped in <MotionConfig reducedMotion="user">
// (see main.jsx), which makes every transform-based variant animation
// below (x/y/scale) automatically skip straight to its end state when the
// OS-level prefers-reduced-motion is set, while still allowing opacity to
// fade normally. The two animations that don't go through declarative
// variants — the stat-number counter and the progress-bar width, both
// driven imperatively via Framer's animate() — check useReducedMotion()
// directly where they're defined (About.jsx, CueCaseStudy.jsx).

export const EASE = [0.16, 1, 0.3, 1];

export const viewportOnce = { once: true, amount: 0.2 };

// Wraps a whole section: fade + slide up as it enters the viewport.
export const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Orchestrates staggered children. Spread onto a parent motion element;
// children use one of the item variants below and inherit the
// hidden/visible state through Framer's variant propagation.
export function staggerContainer(staggerChildren = 0.08, delayChildren = 0) {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

export const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const slideLeftItem = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

export const popItem = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
};

export const cardHover = {
  y: -6,
  boxShadow: '0 12px 24px rgba(83, 58, 253, 0.14)',
  transition: { duration: 0.3, ease: EASE },
};

export const rowHover = {
  scale: 1.012,
  boxShadow: '0 10px 24px rgba(13, 37, 61, 0.08)',
  transition: { duration: 0.3, ease: EASE },
};
