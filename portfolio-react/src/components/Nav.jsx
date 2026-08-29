import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

// `home` controls the two real differences between the static site's two
// navs: on index.html, nav links are same-page anchors and there's an
// "Open to work" status pill; on case-study-cue.html, links point back to
// index.html's anchors (cross-page) and the status pill is absent. Both
// are preserved exactly as they exist today.
//
// Mobile toggle + Escape-to-close + focus trap are ported since they're
// existing accessibility behavior, not decorative animation.
export default function Nav({ home = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinksRef = useRef(null);
  const toggleRef = useRef(null);

  const linkHref = (hash) => (home ? `#${hash}` : `/#${hash}`);

  // Fades in a blurred background over the first 80px of scroll. Not
  // gated behind prefers-reduced-motion: it's a value continuously tied
  // to scroll position, not an autoplaying transform, so it doesn't
  // trigger the vestibular concerns that setting exists for.
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.9]);
  const blur = useTransform(scrollY, [0, 80], [0, 12]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const background = useMotionTemplate`rgba(255, 255, 255, ${bgOpacity})`;
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;
  const borderColor = useMotionTemplate`rgba(227, 232, 238, ${borderOpacity})`;

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeydown(e) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !navLinksRef.current) return;
      const focusable = Array.from(navLinksRef.current.querySelectorAll('a'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isOpen]);

  return (
    <motion.header
      className="site-header"
      id="siteHeader"
      style={{
        background,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        borderBottomColor: borderColor,
      }}
    >
      <nav className="nav" aria-label="Primary">
        <a href={home ? '#top' : '/#top'} className="nav__brand">
          <span className="nav__brand-name">SAI SAIPRASAD</span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="navLinks"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav__links${isOpen ? ' is-open' : ''}`} id="navLinks" ref={navLinksRef}>
          <li>
            <a href={linkHref('cue')} data-nav={home || undefined} onClick={() => setIsOpen(false)}>
              CUE
            </a>
          </li>
          <li>
            <a href={linkHref('work')} data-nav={home || undefined} onClick={() => setIsOpen(false)}>
              Work
            </a>
          </li>
          <li>
            <a href={linkHref('about')} data-nav={home || undefined} onClick={() => setIsOpen(false)}>
              About
            </a>
          </li>
          <li>
            <a href={linkHref('contact')} data-nav={home || undefined} onClick={() => setIsOpen(false)}>
              Contact
            </a>
          </li>
        </ul>

        <div className="nav__actions">
          {home && (
            <span className="nav__status">
              <span className="status-dot status-dot--pulse"></span>
              Open to work
            </span>
          )}
          <a href={linkHref('contact')} className="btn btn-primary btn-small">
            Let&apos;s talk &rarr;
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
