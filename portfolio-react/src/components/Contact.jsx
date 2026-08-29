import { motion } from 'framer-motion';
import { sectionReveal, viewportOnce } from '../motion.js';

export default function Contact() {
  return (
    <motion.section
      className="section contact"
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={sectionReveal}
    >
      <div className="container">
        <div>
          <h2 className="section-title">Let&apos;s talk about AI products.</h2>
          <p className="contact__body">
            I&apos;m looking at AI PM positions in financial services and tech. If you&apos;re building something
            that needs both product thinking and technical depth, reach out directly.
          </p>
        </div>

        <div className="contact-rows">
          <a href="https://linkedin.com/in/[your-linkedin-handle]" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/saibala98" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="mailto:[your-email]">Email</a>
        </div>

        <p className="contact__location">Kitchener, ON 🇨🇦 &middot; Remote or hybrid across Canada</p>
      </div>
    </motion.section>
  );
}
