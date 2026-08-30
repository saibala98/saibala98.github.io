import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Ambient "code compiling" texture behind the Work section only. Several
// columns of fake code/terminal lines scroll upward at staggered speeds so
// they don't read as one synchronized block. Decorative only: aria-hidden,
// and z-indexed behind the section's real content (see #work > .container
// in styles.css).
const CODE_LINES = [
  'const build = async () => {',
  '  await compile(src);',
  '  return bundle;',
  '};',
  'npm run build',
  '> vite build',
  '✓ 460 modules transformed',
  'export default function App() {',
  '  return <Product />;',
  '}',
  'git commit -m "ship it"',
  '> deploying to production...',
  'status: 200 OK',
  'const cue = new Platform();',
  'cue.onboard(user);',
  '> build complete in 1.2s',
];

const COLUMNS = [
  { lines: CODE_LINES.slice(0, 6), duration: 26, left: '2%' },
  { lines: CODE_LINES.slice(3, 9), duration: 32, left: '22%' },
  { lines: CODE_LINES.slice(6, 12), duration: 22, left: '42%' },
  { lines: CODE_LINES.slice(9, 15), duration: 30, left: '62%' },
  { lines: CODE_LINES.slice(1, 7), duration: 24, left: '82%' },
];

function CodeColumn({ lines, duration, left, reduce }) {
  // Repeats its lines twice back-to-back so animating to y: '-50%' (exactly
  // one copy's height) loops seamlessly into the duplicate.
  const doubled = [...lines, ...lines];
  return (
    <motion.div
      className="work-bg__col"
      style={{ left }}
      animate={reduce ? undefined : { y: ['0%', '-50%'] }}
      transition={reduce ? undefined : { duration, repeat: Infinity, ease: 'linear' }}
    >
      {doubled.map((line, i) => (
        <div className="work-bg__line" key={i}>
          {line}
        </div>
      ))}
    </motion.div>
  );
}

// Glossy diagonal sweep, same technique as the hero photo's shine layer -
// an oversized band with a soft white gradient, mix-blend-mode: overlay so
// it reads as a reflection passing over glass rather than a flat highlight.
// repeatType: 'reverse' makes it glide left-to-right then right-to-left
// continuously, rather than resetting/pausing between one-directional passes.
function ShineSweep({ reduce }) {
  if (reduce) return null;
  return (
    <motion.div
      className="work-bg-shine"
      initial={{ x: '-140%' }}
      animate={{ x: '220%' }}
      transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      aria-hidden="true"
    />
  );
}

export default function WorkBackground() {
  const reduce = useReducedMotion();
  // Matches the site's 768px mobile breakpoint. Columns 2-4 and the shine
  // are also display:none at that width via CSS, but the shine's animation
  // loop would otherwise still tick in JS while invisible - skipping it
  // outright here is the point of the "no shine on phones" call: less
  // battery/CPU cost, not just a hidden layer.
  const [isMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches);
  const columns = isMobile ? COLUMNS.slice(0, 1) : COLUMNS;

  return (
    <>
      <div className="work-bg" aria-hidden="true">
        {columns.map((col, i) => (
          <CodeColumn key={i} {...col} reduce={reduce} />
        ))}
      </div>
      {!isMobile && <ShineSweep reduce={reduce} />}
    </>
  );
}
