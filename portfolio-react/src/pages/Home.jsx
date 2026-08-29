import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import CueCaseStudy from '../components/CueCaseStudy.jsx';
import MoreWork from '../components/MoreWork.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import usePageMeta from '../usePageMeta.js';

// Mirrors index.html's section order. Note: CandidateBrief is not
// rendered here as a sibling — in the original static markup the brief
// card lives inside the hero section's own grid (right column), not as a
// separate section. Hero.jsx composes <CandidateBrief /> internally to
// preserve that exact DOM structure.
export default function Home() {
  usePageMeta({
    title: 'Sai Saiprasad - AI Product Manager · Kitchener, ON',
    description:
      'PM portfolio: CUE (AI onboarding platform), Smart Contribution Copilot. QA Lead at CIBC/TCS transitioning to AI PM. MMAI Schulich 2027.',
    ogTitle: 'Sai Saiprasad - AI Product Manager',
    ogType: 'website',
  });

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <CueCaseStudy />
        <MoreWork />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
