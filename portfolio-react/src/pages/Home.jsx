import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import CueCaseStudy from '../components/CueCaseStudy.jsx';
import MoreWork from '../components/MoreWork.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';

// Placeholder assembly for Stage 1 — mirrors index.html's section order.
// Note: CandidateBrief is not rendered here as a sibling — in the current
// static markup the brief card lives inside the hero section's own grid
// (right column), not as a separate section. Hero.jsx composes
// <CandidateBrief /> internally to preserve that exact DOM structure.
// Content migration (real copy, links, markup) happens in Stage 2.
export default function Home() {
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
