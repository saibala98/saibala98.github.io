import { motion } from 'framer-motion';
import { popItem, staggerContainer, viewportRepeat } from '../motion.js';
import SectionTransition from './SectionTransition.jsx';

const TIMELINE = [
  {
    range: '2024-Present',
    role: 'QA Lead & Delivery Coordinator',
    company: 'Tata Consultancy Services @ CIBC',
    detail: 'Core banking: RRSP · TFSA · RESP · RDSP · GIC · FHSA',
  },
  {
    range: '2025-2027 (in progress)',
    role: 'Master of Management in AI (MMAI)',
    company: 'Schulich School of Business, York University',
    detail: 'Data science · ML · AI strategy · Project management',
  },
  {
    range: '2020-2024',
    role: 'QA Analyst',
    company: 'Tata Consultancy Services',
    detail: 'Python automation · Robot Framework · Selenium · Azure',
  },
];

const ROLES = ['Product Manager', 'Product Analyst', 'Product Owner', 'Business Analyst (Product)', 'Product Strategy', 'AI Product Roles'];

export default function About() {
  return (
    <SectionTransition className="section section--surface" id="about" ariaLabel="About">
      <div className="container">
        <div className="about-intro">
          <p className="eyebrow eyebrow--gold">About</p>
          <h2 className="section-title">From quality to product.</h2>
          <p className="lead about-lead">
            I&apos;ve spent 4 years embedded at CIBC through Tata Consultancy Services, working across the
            full lifecycle of core banking software - from test planning and automation to delivery
            coordination and stakeholder management. That foundation taught me how software actually ships
            inside a regulated financial institution: the constraints, the approvals, the cross-team
            dependencies, and what it takes to get something from concept to production.
          </p>
        </div>

        <div className="about-grid">
          <div>
            <div className="about-bio">
              <p>
                Now I&apos;m making the move into product. I&apos;m completing my Master of Management in AI
                at Schulich School of Business, where I&apos;ve built ML models, designed ETL pipelines,
                analyzed business cases, and studied how AI changes product strategy. More importantly,
                I&apos;ve been building: CUE is a real, working platform I designed and shipped myself, end to
                end.
              </p>
              <p>
                My background sits at an unusual intersection: I understand the QA mindset (what breaks and
                why), the delivery mindset (what it takes to actually ship), and the product mindset (what
                should be built and for whom). I&apos;m looking for product roles where that combination is
                useful, especially at the intersection of AI and financial services.
              </p>
            </div>

            <div className="about-open-to">
              <p className="eyebrow eyebrow--muted">Open to</p>
              <motion.div
                className="role-pills"
                initial="hidden"
                whileInView="visible"
                viewport={viewportRepeat}
                variants={staggerContainer(0.05)}
              >
                {ROLES.map((role) => (
                  <motion.span className="role-pill" key={role} variants={popItem}>
                    {role}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>

          <div>
            <p className="eyebrow eyebrow--muted">Experience</p>
            <div className="timeline">
              {TIMELINE.map((item) => (
                <div className="timeline-item" key={item.role}>
                  <p className="timeline-item__range tnum">{item.range}</p>
                  <p className="timeline-item__role">{item.role}</p>
                  <p className="timeline-item__company">{item.company}</p>
                  <p className="timeline-item__detail">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="about-building">
              <p className="eyebrow eyebrow--muted">Currently building</p>
              <div className="card about-building-card">
                <p className="about-building-card__title">CUE Platform</p>
                <p className="about-building-card__sub">AI Onboarding &amp; Knowledge Buddy</p>
                <span className="tag tag-status">MVP1 complete</span>
                <p className="about-building-card__line">A real product, not a case study.</p>
                <a href="#work" className="about-building-card__link">
                  View the work &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
