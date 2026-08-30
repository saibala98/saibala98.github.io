import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { EASE } from '../motion.js';

// Single accordion row for the Work section. Open/close state is owned by
// the parent (WorkSection) so only one item can be open at a time.
//
// Most items pass a single `status` string; CUE passes `statusBadges`
// (an array of {label, tone}) to show its two MVP badges side by side.
export default function WorkItem({ title, subtitle, tags, year, status, statusBadges, isOpen, onToggle, children }) {
  const badges =
    statusBadges ?? (status ? [{ label: status, tone: status === 'Complete' ? 'complete' : 'progress' }] : []);

  const bodyRef = useRef(null);

  // iOS Safari can leave this content fully in the DOM but unpainted after
  // the height:0 -> 'auto' expand finishes inside an overflow:hidden box -
  // confirmed by the fact that pinch-zooming (which forces a full repaint)
  // makes it reappear. Nudging a sub-pixel scale and back forces the same
  // kind of repaint programmatically, right when the expand animation ends,
  // instead of requiring the user to zoom manually.
  const forceRepaint = () => {
    const el = bodyRef.current;
    if (!el) return;
    el.style.webkitTransform = 'scale(0.9999)';
    requestAnimationFrame(() => {
      el.style.webkitTransform = 'scale(1)';
    });
  };

  return (
    <div className="work-item">
      <button type="button" className="work-item__header" onClick={onToggle} aria-expanded={isOpen}>
        <div className="work-item__main">
          <h3 className="work-item__title">{title}</h3>
          <p className="work-item__subtitle">{subtitle}</p>
          <ul className="tag-list">
            {tags.map((tag) => (
              <li className="tag tag-tech" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className="work-item__meta">
          <span className="work-item__year tnum">{year}</span>
          <div className="work-item__status-group">
            {badges.map((badge) => (
              <span key={badge.label} className={`work-item__status work-item__status--${badge.tone}`}>
                {badge.label}
              </span>
            ))}
          </div>
          <motion.span
            className="work-item__chevron"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            aria-hidden="true"
          >
            &rarr;
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: EASE },
              opacity: { duration: 0.25 },
            }}
            onAnimationComplete={forceRepaint}
            style={{
              overflow: 'hidden',
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="work-item__body" ref={bodyRef}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
