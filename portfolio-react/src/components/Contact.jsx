import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { EASE, fadeUpItem, staggerContainer } from '../motion.js';
import { GitHubIcon, LinkedInIcon } from '../icons.jsx';
import SectionTransition from './SectionTransition.jsx';

const PERSONAL_EMAIL = 'sai98bala@gmail.com';
const SCHOOL_EMAIL = 'saiprasa@yorku.ca';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const TOPICS = [
  { value: 'product-role', label: 'Product / PM opportunity' },
  { value: 'collaboration', label: 'Collaboration or project' },
  { value: 'general', label: 'General inquiry' },
  { value: 'other', label: 'Other' },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_FORM = { name: '', email: '', topic: '', message: '' };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!form.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!form.topic) errors.topic = 'Please pick a topic.';
  if (!form.message.trim()) errors.message = 'Please enter a message.';
  return errors;
}

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (status === 'error') setStatus('idle');
  };

  const openForm = () => {
    setIsOpen(true);
    setStatus('idle');
  };

  // The Nav/Footer "Let's talk" CTAs link to #contact-open (rather than
  // plain #contact) so they can both scroll here AND expand the form. A
  // real anchor id="contact-open" doesn't exist, so the browser won't
  // auto-scroll for it - handled manually below, which also covers the
  // cross-page case (case-study page navigating to /#contact-open, where
  // this component isn't mounted until after the navigation completes).
  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash !== '#contact-open') return;
      setIsOpen(true);
      setStatus('idle');
      history.replaceState(null, '', '#contact');
      requestAnimationFrame(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  const closeForm = () => {
    setIsOpen(false);
    setStatus('idle');
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('sending');
    try {
      const topicLabel = TOPICS.find((t) => t.value === form.topic)?.label ?? form.topic;
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          message: form.message,
          // Sent under several common aliases since the actual EmailJS
          // template body dictates which placeholder name gets used -
          // whichever one the template's {{...}} content references is the
          // one that shows up. `reply_to` also has a special meaning to
          // EmailJS (it sets the email's Reply-To header even if the
          // template body never prints it), but if you want the address
          // VISIBLE in the email text, the body needs its own {{...}} tag
          // for one of these.
          reply_to: form.email,
          email: form.email,
          from_email: form.email,
          user_email: form.email,
          sender_email: form.email,
          topic: topicLabel,
          service: topicLabel,
          subject: topicLabel,
          interest: topicLabel,
        },
        { publicKey: PUBLIC_KEY },
      );
      setStatus('success');
      setForm(EMPTY_FORM);
      setErrors({});
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <SectionTransition className="section contact" id="contact" ariaLabel="Contact">
      <div className="container">
        <div>
          <p className="eyebrow eyebrow--gold">Contact</p>
          <h2 className="section-title">Let&apos;s talk.</h2>
          <p className="contact__body">
            Open to product roles and conversations about AI, fintech, and what you&apos;re building.
          </p>
        </div>

        {!isOpen && (
          <>
            <button type="button" className="btn btn-primary btn-large" onClick={openForm}>
              Send me a message &rarr;
            </button>

            <div className="contact-rows">
              <a href="https://www.linkedin.com/in/sai-b-saiprasad" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon /> LinkedIn
              </a>
              <a href="https://github.com/saibala98" target="_blank" rel="noopener noreferrer">
                <GitHubIcon /> GitHub
              </a>
            </div>
          </>
        )}

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -8 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -8 }}
              transition={{
                height: { duration: 0.4, ease: EASE },
                opacity: { duration: 0.25, delay: 0.1 },
              }}
              style={{ overflow: 'hidden' }}
            >
              <div className="contact-form-card">
                <p className="contact-form__heading">Send a message</p>
                <motion.form
                  className="contact-form"
                  onSubmit={handleSubmit}
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer(0.06)}
                  noValidate
                >
                  <motion.div className="form-field" variants={fadeUpItem}>
                    <label htmlFor="contact-name">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={updateField('name')}
                      placeholder="How should I address you?"
                    />
                    {errors.name && <p className="form-field__error">{errors.name}</p>}
                  </motion.div>

                  <motion.div className="form-field" variants={fadeUpItem}>
                    <label htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={updateField('email')}
                      placeholder="Where can I reply?"
                    />
                    {errors.email && <p className="form-field__error">{errors.email}</p>}
                  </motion.div>

                  <motion.div className="form-field" variants={fadeUpItem}>
                    <label htmlFor="contact-topic">What&apos;s this about?</label>
                    <select id="contact-topic" value={form.topic} onChange={updateField('topic')}>
                      <option value="" disabled>
                        Select a topic
                      </option>
                      {TOPICS.map((topic) => (
                        <option key={topic.value} value={topic.value}>
                          {topic.label}
                        </option>
                      ))}
                    </select>
                    {errors.topic && <p className="form-field__error">{errors.topic}</p>}
                  </motion.div>

                  <motion.div className="form-field" variants={fadeUpItem}>
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={form.message}
                      onChange={updateField('message')}
                      placeholder="What would you like to talk about?"
                    />
                    {errors.message && <p className="form-field__error">{errors.message}</p>}
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="btn btn-primary contact-form__submit"
                    variants={fadeUpItem}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending...' : <>Send message &rarr;</>}
                  </motion.button>

                  <AnimatePresence mode="wait">
                    {status === 'success' && (
                      <motion.p
                        key="success"
                        className="contact-form__status contact-form__status--success"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        &#10003; Message sent - I&apos;ll get back to you soon.
                      </motion.p>
                    )}
                    {status === 'error' && (
                      <motion.p
                        key="error"
                        className="contact-form__status contact-form__status--error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        Something went wrong sending that. Please try again, or email me directly below.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.form>

                <p className="contact-form__direct">
                  Or email directly:{' '}
                  <a href={`mailto:${PERSONAL_EMAIL}`}>Personal: {PERSONAL_EMAIL}</a>
                  {' · '}
                  <a href={`mailto:${SCHOOL_EMAIL}`}>School: {SCHOOL_EMAIL}</a>
                </p>

                <button type="button" className="btn btn-ghost btn-small contact-form__close" onClick={closeForm}>
                  &#10005; Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="contact__location">Kitchener, ON 🇨🇦 &middot; Remote or hybrid across Canada</p>
      </div>
    </SectionTransition>
  );
}
