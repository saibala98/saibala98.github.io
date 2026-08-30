import { useEffect, useRef, useState } from 'react';

const TYPE_SPEED_MS = 55;
const DELETE_SPEED_MS = 30;
const PAUSE_AFTER_TYPE_MS = 2000;
const PAUSE_AFTER_DELETE_MS = 300;

// Cycles through `phrases` forever: types each one out character by
// character, holds it, deletes it character by character, then moves on
// to the next phrase in order. A setTimeout chain (not setInterval) since
// each phase - typing, pausing, deleting - needs its own delay.
//
// `phrases` should be a module-level (stable) array reference; a new array
// literal on every render would restart the effect and reset the cycle.
export default function useTypewriter(phrases, { reduceMotion = false } = {}) {
  const [text, setText] = useState(reduceMotion ? phrases[0] : '');
  const phraseIndexRef = useRef(0);

  useEffect(() => {
    if (reduceMotion) {
      setText(phrases[0]);
      return undefined;
    }

    let charCount = 0;
    let phase = 'typing';
    let timeoutId;

    const tick = () => {
      const phrase = phrases[phraseIndexRef.current % phrases.length];

      if (phase === 'typing') {
        charCount += 1;
        setText(phrase.slice(0, charCount));
        if (charCount >= phrase.length) {
          phase = 'pausing';
          timeoutId = setTimeout(tick, PAUSE_AFTER_TYPE_MS);
        } else {
          timeoutId = setTimeout(tick, TYPE_SPEED_MS);
        }
        return;
      }

      if (phase === 'pausing') {
        phase = 'deleting';
        timeoutId = setTimeout(tick, DELETE_SPEED_MS);
        return;
      }

      // deleting
      charCount -= 1;
      setText(phrase.slice(0, charCount));
      if (charCount <= 0) {
        phraseIndexRef.current += 1;
        phase = 'typing';
        timeoutId = setTimeout(tick, PAUSE_AFTER_DELETE_MS);
      } else {
        timeoutId = setTimeout(tick, DELETE_SPEED_MS);
      }
    };

    timeoutId = setTimeout(tick, TYPE_SPEED_MS);
    return () => clearTimeout(timeoutId);
  }, [phrases, reduceMotion]);

  return text;
}
