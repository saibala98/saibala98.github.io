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
          Product roles in AI and financial services.
        </h2>
        <p className="footer-band__sub">
          I&apos;m looking at product positions where product thinking and technical depth both matter. If
          that&apos;s you, let&apos;s talk.
        </p>
        <div className="footer-band__actions">
          <a href={home ? '#contact' : '/#contact'} className="btn btn-primary">
            Let&apos;s talk &rarr;
          </a>
          {home ? (
            <a
              href="https://www.linkedin.com/in/sai-b-saiprasad"
              target="_blank"
              rel="noopener noreferrer"
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
        <div className="footer-band__emails">
          <a href="mailto:sai98bala@gmail.com">Personal: sai98bala@gmail.com</a>
          <a href="mailto:saiprasa@yorku.ca">School: saiprasa@yorku.ca</a>
        </div>
        <div className="footer-bottom">
          <span>Sai B Saiprasad &middot; 2026</span>
          <span>Currently open to product roles</span>
        </div>
      </div>
    </footer>
  );
}
