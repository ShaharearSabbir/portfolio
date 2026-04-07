"use client";

import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import * as m from "motion/react-client";
import { VscArrowUp } from "react-icons/vsc";
import { Button } from "@/components/ui/button";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 1. Handle visibility based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      /* Logic:
         - Mobile: Bottom Right (above the floating nav)
         - Desktop (lg): Bottom Left
      */
      className="fixed bottom-24 right-6 lg:bottom-10 lg:right-10 z-60"
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        variant="outline"
        className="h-12 w-12 rounded-full border-primary/20 bg-background/80 backdrop-blur-md text-primary shadow-lg hover:bg-primary hover:dark:text-primary hover:text-primary-foreground transition-all duration-300 group"
        aria-label="Back to top"
      >
        <m.div
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <VscArrowUp className="text-xl" />
        </m.div>
      </Button>
    </m.div>
  );
};

export default BackToTop;
