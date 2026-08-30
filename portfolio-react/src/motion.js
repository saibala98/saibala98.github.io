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

// Scroll reveals that should replay both scrolling down AND scrolling back
// up (most section-level content).
//
// Previously also had `amount: 0.2` and a `margin: '-80px'` shrink on the
// trigger area. That combination reliably broke on mobile Safari for tall
// sections (About in particular): the toolbar collapsing/expanding as you
// scroll resizes the visual viewport out from under IntersectionObserver,
// and a fixed 20%-of-target visibility threshold could then just never be
// satisfied - leaving the whole section permanently stuck at its hidden
// (opacity: 0) state, with no error, on load, independent of anything
// else on the page. `amount: 'some'` fires as soon as any part of the
// element is visible at all, which is far more forgiving and avoids that
// failure mode entirely.
export const viewportRepeat = { once: false, amount: 'some' };

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

// Slot-machine style reveal: slides in from above with a slight blur,
// settling with a spring that has a touch of overshoot - like a reel
// rolling to a stop rather than a plain fade-up. Text also flashes brand
// purple while rolling and cools back to the normal muted reading color as
// it settles - literal hex, not var(--primary)/var(--muted), since Framer
// can't smoothly interpolate CSS custom properties as color values.
//
// Color gets its own slower, plain-tween "default" transition instead of
// following the position spring: the spring settles in a few hundred ms,
// which was too quick for the purple-to-muted fade to actually read as a
// color change before the item had already fully landed.
export const slotItem = {
  hidden: { opacity: 0, y: -32, filter: 'blur(4px)', color: '#533afd', fontWeight: 700 },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    color: '#64748d',
    fontWeight: 400,
    transition: {
      default: { type: 'spring', stiffness: 300, damping: 18, mass: 0.6 },
      color: { duration: 1.1, ease: 'easeOut' },
      fontWeight: { duration: 1.1, ease: 'easeOut' },
    },
  },
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
