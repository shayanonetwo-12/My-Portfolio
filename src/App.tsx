import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import GithubSection from './components/GithubSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <div
        className="relative min-h-screen bg-[var(--carbon-0)] transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <GithubSection />
          <Contact />
        </main>
        <Footer />
      </div>
      <ChatAssistant />
    </>
  );
}

export default App;
