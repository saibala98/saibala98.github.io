import { motion } from 'framer-motion';
import { fadeUpItem, rowHover, sectionReveal, staggerContainer, viewportOnce } from '../motion.js';

const PROJECTS = [
  {
    title: 'Smart Contribution Copilot',
    description:
      'AI-guided RRSP/TFSA/FHSA optimization for Smart Planner. Pitched to an internal panel with an interactive prototype, still in progress.',
    tags: ['React', 'AI/ML', 'Fintech', 'In progress'],
  },
];

export default function MoreWork() {
  return (
    <motion.section
      className="section"
      id="work"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={sectionReveal}
    >
      <div className="container">
        <div>
          <h2 className="section-title">More work</h2>
        </div>

        <motion.div variants={staggerContainer(0.08)}>
          {PROJECTS.map((project) => (
            <motion.div className="work-row" key={project.title} variants={fadeUpItem} whileHover={rowHover}>
              <div className="work-row__main">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
              </div>
              <div className="work-row__meta">
                <ul className="tag-list">
                  {project.tags.map((tag) => (
                    <li className="tag tag-tech" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
