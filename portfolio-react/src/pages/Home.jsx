import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import WorkSection from '../components/WorkSection.jsx';
import About from '../components/About.jsx';
import SkillsBanner from '../components/SkillsBanner.jsx';
import Skills from '../components/Skills.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import usePageMeta from '../usePageMeta.js';

// Mirrors index.html's section order. WorkSection folds what used to be
// two separate homepage sections (the CUE feature section and the More
// Work list) into one accordion, so it takes the place of both.
export default function Home() {
  usePageMeta({
    title: 'Sai B Saiprasad - Product & Strategy Professional · Kitchener, ON',
    description:
      'Product portfolio: CUE (AI onboarding platform), Smart Contribution Copilot. QA Lead at CIBC/TCS transitioning to product roles. MMAI Schulich 2027.',
    ogTitle: 'Sai B Saiprasad - Product & Strategy Professional',
    ogType: 'website',
  });

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <WorkSection />
        <About />
        <SkillsBanner />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
