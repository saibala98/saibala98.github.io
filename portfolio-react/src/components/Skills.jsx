import { motion } from 'framer-motion';
import { fadeUpItem, popItem, staggerContainer } from '../motion.js';
import SectionTransition from './SectionTransition.jsx';

const CATEGORIES = [
  {
    label: 'Product management',
    items: [
      'PRD writing',
      'User story development',
      'RICE prioritization',
      'Sprint planning',
      'Stakeholder management',
      'Roadmapping',
    ],
  },
  {
    label: 'AI & data',
    items: [
      'Prompt engineering',
      'RAG architecture',
      'Claude API',
      'Python',
      'Scikit-learn',
      'ETL pipelines',
      'PostgreSQL',
    ],
  },
  {
    label: 'Technical',
    items: [
      'React + TypeScript',
      'Node.js + Express',
      'REST API design',
      'JWT auth',
      'Git/GitHub',
      'Robot Framework',
      'Selenium',
    ],
  },
  {
    label: 'Domain',
    items: ['Banking products', 'Compliance', 'Agile delivery', 'Core banking', 'Requirements grooming'],
  },
];

export default function Skills() {
  return (
    <SectionTransition className="section" id="skills" ariaLabel="Skills">
      <div className="container">
        <div>
          <h2 className="section-title">What I bring.</h2>
        </div>

        <motion.div className="skills-rows" variants={staggerContainer(0.1)}>
          {CATEGORIES.map((category) => (
            <motion.div className="skill-row" key={category.label} variants={fadeUpItem}>
              <p className="skill-row__cat">{category.label}</p>
              <motion.div className="skill-row__items" variants={staggerContainer(0.03)}>
                {category.items.map((item) => (
                  <motion.span key={item} variants={popItem}>
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionTransition>
  );
}
