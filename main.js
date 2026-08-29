// ============ Reduced motion check ============
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============ Sticky nav border on scroll (IntersectionObserver, no scroll listener) ============
const header = document.getElementById('siteHeader');
const scrollSentinel = document.getElementById('scrollSentinel');
if (header && scrollSentinel && 'IntersectionObserver' in window) {
  const sentinelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        header.classList.toggle('is-scrolled', !entry.isIntersecting);
      });
    },
    { threshold: 0 },
  );
  sentinelObserver.observe(scrollSentinel);
}

// ============ Mobile nav toggle with ESC close + focus trap ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  const closeNav = () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };
  const openNav = () => {
    navLinks.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
  };

  navToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('is-open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !navLinks.classList.contains('is-open')) return;
    closeNav();
    navToggle.focus();
  });

  navLinks.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !navLinks.classList.contains('is-open')) return;
    const focusable = Array.from(navLinks.querySelectorAll('a'));
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
  });
}

// ============ Smooth scroll for in-page anchor links (60px offset, no scroll listener) ============
const NAV_OFFSET = 60;
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
    window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    history.pushState(null, '', targetId);
  });
});

// ============ Scroll-triggered fade-up animations, staggered per parent ============
const fadeGroups = new Map();
document.querySelectorAll('.fade-up').forEach((el) => {
  const parent = el.parentElement;
  if (!fadeGroups.has(parent)) fadeGroups.set(parent, []);
  fadeGroups.get(parent).push(el);
});

if (prefersReducedMotion) {
  document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('is-visible'));
} else if ('IntersectionObserver' in window) {
  const fadeObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const siblings = fadeGroups.get(entry.target.parentElement) || [entry.target];
        const index = siblings.indexOf(entry.target);
        const delay = Math.max(index, 0) * 80;
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll('.fade-up').forEach((el) => fadeObserver.observe(el));
} else {
  document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('is-visible'));
}

// ============ Scale the embedded live-demo iframe to fit its preview box ============
// The demo is a real desktop-width app; without this it would render at 1:1
// scale and only show a cropped fragment inside the small hero preview.
const demoViewport = document.querySelector('.cue-demo-viewport');
const demoFrame = document.querySelector('.cue-demo__frame');
if (demoViewport && demoFrame) {
  const DEMO_DESIGN_WIDTH = 1280;
  const resizeDemo = () => {
    const scale = demoViewport.clientWidth / DEMO_DESIGN_WIDTH;
    demoFrame.style.setProperty('--demo-scale', scale.toFixed(4));
  };
  if ('ResizeObserver' in window) {
    new ResizeObserver(resizeDemo).observe(demoViewport);
  }
  resizeDemo();
}

// ============ Active nav link highlighting (IntersectionObserver, no scroll listener) ============
const navAnchors = document.querySelectorAll('a[data-nav]');
if (navAnchors.length && 'IntersectionObserver' in window) {
  const sectionMap = new Map();
  navAnchors.forEach((a) => {
    const section = document.querySelector(a.getAttribute('href'));
    if (section) sectionMap.set(section, a);
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = sectionMap.get(entry.target);
        if (!link) return;
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => a.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
  );

  sectionMap.forEach((_, section) => sectionObserver.observe(section));
}
