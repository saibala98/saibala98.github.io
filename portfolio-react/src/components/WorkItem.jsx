import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../motion.js';

// Single accordion row for the Work section. Open/close state is owned by
// the parent (WorkSection) so only one item can be open at a time.
//
// Most items pass a single `status` string; CUE passes `statusBadges`
// (an array of {label, tone}) to show its two MVP badges side by side.
export default function WorkItem({ title, subtitle, tags, year, status, statusBadges, isOpen, onToggle, children }) {
  const badges =
    statusBadges ?? (status ? [{ label: status, tone: status === 'Complete' ? 'complete' : 'progress' }] : []);

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
            // Forces this box onto its own GPU compositing layer. Mobile
            // Safari has a known bug where content inside an
            // overflow:hidden box that was just animated from height:0 to
            // height:'auto' can go stale - fully present in the DOM, just
            // never repainted - until something (pinch-zoom, rotation)
            // forces a full repaint. translateZ(0)/backface-visibility
            // give WebKit a stable layer to paint into instead of
            // dropping/never-repainting the content after the animation.
            style={{
              overflow: 'hidden',
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="work-item__body">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
