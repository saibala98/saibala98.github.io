import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPostgresql,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiPandas,
  SiScikitlearn,
  SiSelenium,
  SiVite,
  SiJira,
  SiJupyter,
  SiSqlite,
  SiRobotframework,
  SiGooglecloud,
} from 'react-icons/si';
import { TbBrandAws, TbBrandAzure } from 'react-icons/tb';
import { MdAccessibility } from 'react-icons/md';
import SectionTransition from './SectionTransition.jsx';

// react-icons/si (this installed version) has no Microsoft Azure or Amazon
// AWS glyph - Simple Icons excludes several major cloud-provider
// trademarks. Tabler Icons (also bundled in react-icons) has both as
// actual brand-shaped marks, so those are used instead of a generic
// fallback. WCAG 2.0 isn't a product logo, so it uses Material Design's
// universal accessibility icon instead.
const SKILLS = [
  { Icon: SiReact, label: 'React', color: '#61DAFB' },
  { Icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
  { Icon: SiNodedotjs, label: 'Node.js', color: '#339933' },
  { Icon: SiExpress, label: 'Express', color: '#000000' },
  { Icon: SiPython, label: 'Python', color: '#3776AB' },
  { Icon: SiPostgresql, label: 'PostgreSQL', color: '#4169E1' },
  { Icon: SiTailwindcss, label: 'Tailwind CSS', color: '#06B6D4' },
  { Icon: SiGit, label: 'Git', color: '#F05032' },
  { Icon: SiGithub, label: 'GitHub', color: '#181717' },
  { Icon: TbBrandAzure, label: 'Azure', color: '#0078D4' },
  { Icon: TbBrandAws, label: 'AWS', color: '#FF9900' },
  { Icon: SiGooglecloud, label: 'GCP', color: '#4285F4' },
  { Icon: SiPandas, label: 'Pandas', color: '#150458' },
  { Icon: SiScikitlearn, label: 'Scikit-learn', color: '#F7931E' },
  { Icon: SiSelenium, label: 'Selenium', color: '#43B02A' },
  { Icon: SiJupyter, label: 'Jupyter', color: '#F37626' },
  { Icon: SiVite, label: 'Vite', color: '#646CFF' },
  { Icon: SiJira, label: 'JIRA', color: '#0052CC' },
  { Icon: SiRobotframework, label: 'Robot Framework', color: '#000000' },
  { Icon: SiSqlite, label: 'SQL', color: '#003B57' },
  { Icon: MdAccessibility, label: 'WCAG 2.0', color: '#1976D2' },
];

function SkillChip({ Icon, label, color }) {
  return (
    <motion.div className="skill-chip" style={{ '--chip-brand': color }} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Icon className="skill-chip__icon" aria-hidden="true" />
      <span className="skill-chip__label">{label}</span>
    </motion.div>
  );
}

// CSS keyframe animation, not JS, drives the actual scroll - the track is
// the skills list duplicated twice, and translateX(-50%) (exactly one
// copy's width, since both copies together are 100%) resets seamlessly to
// translateX(0) at loop end. Reduced motion renders a single, non-doubled,
// horizontally scrollable row instead of an animated one.
function ConveyorTrack() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const items = reduce ? SKILLS : [...SKILLS, ...SKILLS];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const pause = (e) => {
    e.currentTarget.style.animationPlayState = 'paused';
  };
  const resume = (e) => {
    e.currentTarget.style.animationPlayState = 'running';
  };

  return (
    <div
      className="skills-banner__track"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}
      onMouseEnter={reduce ? undefined : pause}
      onMouseLeave={reduce ? undefined : resume}
    >
      {items.map((skill, i) => (
        <SkillChip key={`${skill.label}-${i}`} {...skill} />
      ))}
    </div>
  );
}

export default function SkillsBanner() {
  return (
    <SectionTransition className="skills-banner-section" ariaLabel="Tech stack">
      <div className="skills-banner">
        <div className="skills-banner__fade skills-banner__fade--left" aria-hidden="true" />
        <div className="skills-banner__fade skills-banner__fade--right" aria-hidden="true" />
        <ConveyorTrack />
      </div>
    </SectionTransition>
  );
}
