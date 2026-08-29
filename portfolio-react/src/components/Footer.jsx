import { Link } from 'react-router-dom';

// `home` mirrors the real difference between the two static footers: on
// index.html the ghost button is "View LinkedIn"; on case-study-cue.html
// it's "Back to portfolio" instead, and both pages' primary button target
// differs (same-page anchor vs. cross-page-then-anchor). Preserved exactly.
export default function Footer({ home = true }) {
  return (
    <footer className="footer-band">
      <div className="container">
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          AI PM roles in financial services and tech.
        </h2>
        <p className="footer-band__sub">
          I&apos;m looking at AI PM positions where product thinking and technical depth both matter. If
          that&apos;s you, let&apos;s talk.
        </p>
        <div className="footer-band__actions">
          <a href={home ? '#contact' : '/#contact'} className="btn btn-primary">
            Let&apos;s talk &rarr;
          </a>
          {home ? (
            <a
              href="https://linkedin.com/in/[your-linkedin-handle]"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              View LinkedIn
            </a>
          ) : (
            <Link to="/" className="btn btn-ghost">
              Back to portfolio
            </Link>
          )}
        </div>
        <div className="footer-bottom">
          <span>Sai Saiprasad &middot; 2026</span>
          <span>Currently open to PM roles</span>
        </div>
      </div>
    </footer>
  );
}
