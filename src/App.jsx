import { useEffect } from "react";
import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { motion } from "motion/react";
import { container, socialIcons } from "./Animation/animation";
import useIsMobile from "./Hooks/useIsMobile";
import { BiUpArrowCircle } from "react-icons/bi";
import { animateScroll } from "react-scroll";

function App() {
  const isMobile = useIsMobile();
  const fallback = { initial: {}, animate: {} };

  const options = {
    duration: 500,
    smooth: true,
  };

  const handleGoUp = () => {
    animateScroll.scrollToTop(options);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="fixed overflow-hidden top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Navbar />
      </motion.div>
      <Hero />
      <About />
      <motion.div
        variants={isMobile ? fallback : container("BTT")}
        initial="initial"
        whileInView="animate"
      >
        <Skills />
      </motion.div>
      <motion.div
        variants={isMobile ? fallback : container("BTT")}
        initial="initial"
        whileInView="animate"
      >
        <Projects />
      </motion.div>
      <Contact />

      <motion.div
        variants={socialIcons()}
        onClick={handleGoUp}
        initial="initial"
        whileHover="animate"
        whileTap="onClick"
        className="bg-primary fixed p-1 rounded-full bottom-4 right-4 lg:bottom-8 lg:right-8"
      >
        <BiUpArrowCircle size={32} />
      </motion.div>
      <div className="bg-base-200 text-primary text-center py-1">
        <p>All Rights Reserved © 2025</p>
      </div>
    </>
  );
}

export default App;
