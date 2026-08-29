import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import App from './App.jsx';
import './styles.css';

// reducedMotion="user" makes every transform-based variant animation
// (x/y/scale) app-wide skip straight to its end state when the OS-level
// prefers-reduced-motion is set, while still letting opacity fade
// normally — this is what "respect prefers-reduced-motion" is built on.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>,
);
