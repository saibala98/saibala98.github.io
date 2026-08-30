import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../motion.js';

// Single accordion row for the Work section. Open/close state is owned by
// the parent (WorkSection) so only one item can be open at a time.
//
// Most items pass a single `status` string; CUE passes `statusBadges`
// (an array of {label, tone}) to show its two MVP badges side by side.
//
// Deliberately NOT animating height:0 -> 'auto' here (an earlier version
// did). That measurement trick is a known source of iOS Safari bugs -
// content mounting during the reflow can end up with a badly-miscalculated
// box height, leaving a large blank gap in the page that only "resolves"
// much further down. A plain opacity/slide fade with no height animation
// sidesteps the whole class of bug: the browser just reflows normally.
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
            className="work-item__body"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
