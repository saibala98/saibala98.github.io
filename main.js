// ============ Sticky nav: border/background on scroll ============
const header = document.getElementById('siteHeader');
function updateHeaderScrollState() {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 8);
}
updateHeaderScrollState();
window.addEventListener('scroll', updateHeaderScrollState, { passive: true });

// ============ Mobile nav toggle ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============ Smooth scroll for in-page anchor links ============
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', targetId);
  });
});

// ============ Scroll-triggered fade-up animations ============
const fadeEls = document.querySelectorAll('.fade-up');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );
  fadeEls.forEach((el) => observer.observe(el));
} else {
  fadeEls.forEach((el) => el.classList.add('is-visible'));
}

// ============ Active nav link highlighting on scroll ============
const navAnchors = document.querySelectorAll('a[data-nav]');
const sections = Array.from(navAnchors)
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

function updateActiveNavLink() {
  if (sections.length === 0) return;
  const scrollPos = window.scrollY + 120;
  let currentId = sections[0].id;
  for (const section of sections) {
    if (section.offsetTop <= scrollPos) currentId = section.id;
  }
  navAnchors.forEach((a) => {
    a.classList.toggle('is-active', a.getAttribute('href') === `#${currentId}`);
  });
}
updateActiveNavLink();
window.addEventListener('scroll', updateActiveNavLink, { passive: true });

// ============ Contact form validation (no real submission) ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const statusEl = document.getElementById('contactFormStatus');

  function setFieldError(fieldId, hasError) {
    const field = document.getElementById(fieldId);
    if (field) field.classList.toggle('has-error', hasError);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = /** @type {HTMLInputElement} */ (document.getElementById('cf-name'));
    const email = /** @type {HTMLInputElement} */ (document.getElementById('cf-email'));
    const message = /** @type {HTMLTextAreaElement} */ (document.getElementById('cf-message'));

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameValid = name.value.trim().length > 0;
    const emailValid = emailPattern.test(email.value.trim());
    const messageValid = message.value.trim().length > 0;

    setFieldError('fieldName', !nameValid);
    setFieldError('fieldEmail', !emailValid);
    setFieldError('fieldMessage', !messageValid);

    if (!nameValid || !emailValid || !messageValid) {
      if (statusEl) {
        statusEl.textContent = 'Please fix the highlighted fields above.';
        statusEl.style.color = 'var(--danger)';
      }
      return;
    }

    // This portfolio's contact form is presentational — no backend is wired
    // up to receive submissions. Reach out via the direct links instead.
    if (statusEl) {
      statusEl.textContent = "Thanks! This demo form doesn't send yet — please reach out directly via email or LinkedIn instead.";
      statusEl.style.color = 'var(--success)';
    }
    contactForm.reset();
  });
}

// ============ Footer year (kept in sync automatically) ============
const yearEls = document.querySelectorAll('[data-year]');
yearEls.forEach((el) => (el.textContent = String(new Date().getFullYear())));
