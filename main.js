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

// ============ Reveal-on-scroll: .fade-up (legacy) + [data-animate] (reusable system) ============
// Re-triggers in both scroll directions: an element resets to hidden the
// moment it leaves the viewport (scrolling past it either way) and replays
// its staggered entrance animation the next time it scrolls back into view.
// [data-stagger-step] on an element overrides the 80ms default (used for
// dense groups like pills, so a 7-item row doesn't take forever).
const revealEls = Array.from(document.querySelectorAll('.fade-up, [data-animate]'));
const revealGroups = new Map();
revealEls.forEach((el) => {
  const parent = el.parentElement;
  if (!revealGroups.has(parent)) revealGroups.set(parent, []);
  revealGroups.get(parent).push(el);
});

if (prefersReducedMotion) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else if ('IntersectionObserver' in window) {
  const revealTimers = new WeakMap();
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const pendingTimer = revealTimers.get(el);
        if (entry.isIntersecting) {
          if (el.classList.contains('is-visible')) return;
          const siblings = revealGroups.get(el.parentElement) || [el];
          const index = siblings.indexOf(el);
          const step = Number(el.dataset.staggerStep) || 80;
          const delay = Math.max(index, 0) * step;
          revealTimers.set(
            el,
            setTimeout(() => el.classList.add('is-visible'), delay),
          );
        } else {
          if (pendingTimer) clearTimeout(pendingTimer);
          el.classList.remove('is-visible');
        }
      });
    },
    { threshold: 0.1 },
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// ============ MVP progress bars: animate width from 0 each time visible ============
const progressBars = document.querySelectorAll('.progress-bar[data-progress]');
progressBars.forEach((bar) => {
  bar.style.setProperty('--progress', `${bar.dataset.progress}%`);
});
if (prefersReducedMotion) {
  progressBars.forEach((bar) => bar.classList.add('is-visible'));
} else if ('IntersectionObserver' in window) {
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    },
    { threshold: 0.4 },
  );
  progressBars.forEach((bar) => progressObserver.observe(bar));
} else {
  progressBars.forEach((bar) => bar.classList.add('is-visible'));
}

// ============ Count-up stat numbers, replaying each time the About section is re-entered ============
const countEls = document.querySelectorAll('[data-count-to]');
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const easeOutQuad = (t) => t * (2 - t);
  const countFrames = new WeakMap();

  function animateCount(el) {
    const target = Number(el.dataset.countTo) || 0;
    const suffix = el.dataset.countSuffix || '';
    const duration = 800;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.round(target * easeOutQuad(progress));
      el.textContent = `${value}${suffix}`;
      if (progress < 1) {
        countFrames.set(el, requestAnimationFrame(tick));
      } else {
        el.textContent = `${target}${suffix}`;
        countFrames.delete(el);
      }
    }
    countFrames.set(el, requestAnimationFrame(tick));
  }

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          animateCount(el);
        } else {
          const frame = countFrames.get(el);
          if (frame) cancelAnimationFrame(frame);
          countFrames.delete(el);
          el.textContent = `0${el.dataset.countSuffix || ''}`;
        }
      });
    },
    { threshold: 0.4 },
  );
  countEls.forEach((el) => countObserver.observe(el));
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
