import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import CustomCursor from './components/CustomCursor.jsx';

// The /demo app under public/demo/app.html is a separately built React app
// (vendored from cue-platform), not part of this router — it's reached via
// full-page links and an <iframe>, never client-side navigation, so it
// needs no Route here. See STAGE1-NOTES.md for the reasoning.
export default function App() {
  return (
    <>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study" element={<CaseStudy />} />
      </Routes>
    </>
  );
}
