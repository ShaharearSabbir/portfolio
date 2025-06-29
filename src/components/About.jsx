import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import Section from "./Section";
import Lottie from "lottie-react";
import about from "../assets/about.json";
import { Element } from "react-scroll";
import { container, contentVariants } from "../Animation/animation";
import { AnimatePresence, motion } from "motion/react";
import useIsMobile from "../Hooks/useIsMobile";

const About = () => {
  const isMobile = useIsMobile();

  console.log(isMobile);

  // Fallback animation if disabled (no animation)
  const fallback = { initial: {}, animate: {} };
  const [readMore, setReadMore] = useState(false);
  return (
    <Element name="about">
      <Section>
        <div className="bg-base-200 py-12">
          <div className="container px-4 mx-auto">
            <SectionHeader>About Me</SectionHeader>
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              <motion.div
                variants={isMobile ? fallback : container("LTR")}
                initial="initial"
                whileInView="animate"
                className="flex-1"
              >
                <Lottie animationData={about} className="lg:w-3/4" />
              </motion.div>
              <motion.div
                variants={isMobile ? fallback : container("RTL")}
                initial="initial"
                whileInView="animate"
                className="text-justify flex-1"
              >
                <div className="about-me-section space-y-4">
                  <p>
                    My journey into software development began with a simple yet
                    powerful curiosity: the desire to build solutions that could
                    run anywhere, on any platform. This quest led me directly to{" "}
                    <strong>JavaScript</strong>, and soon after, to the
                    versatile <strong>MERN stack</strong>. I quickly realized
                    the immense potential of this ecosystem to bring ideas to
                    life, seamlessly connecting dynamic front-ends with robust
                    back-ends.
                  </p>

                  <AnimatePresence initial={false}>
                    {readMore && (
                      <motion.div
                        key="expanded-content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={contentVariants}
                        className="space-y-4"
                      >
                        <p>
                          What truly excites me about development goes beyond
                          just writing code. I thrive on the{" "}
                          <strong>problem-solving</strong> aspect, dissecting
                          complex challenges and architecting elegant solutions.
                          There's an incredible satisfaction in{" "}
                          <strong>seeing ideas materialize</strong> from concept
                          into a tangible, working application. I also genuinely
                          enjoy <strong>collaborating with others</strong>,
                          believing that the best solutions often emerge from
                          shared insights and teamwork.
                        </p>
                        <p>
                          I remember a particular moment that solidified my
                          passion and commitment: wrestling with{" "}
                          <strong>pagination and filtering</strong> for a
                          project. It seemed straightforward, but getting the
                          API calls just right and designing the backend for
                          optimal performance was a two-day challenge that
                          pushed my limits. The breakthrough, when it finally
                          clicked, was incredibly rewarding and reinforced my{" "}
                          <strong>resilience in problem-solving</strong>. It was
                          a clear demonstration of how persistence pays off in
                          development.
                        </p>
                        <p>
                          Ultimately, I'm driven to use my MERN stack skills to{" "}
                          <strong>build user-friendly tools</strong> that
                          simplify tasks and{" "}
                          <strong>solve real-world problems</strong>. I believe
                          technology should empower people, and I'm dedicated to
                          creating applications that make a positive impact. My
                          approach is rooted in{" "}
                          <strong>continuous learning</strong>, always exploring
                          new techniques and best practices to refine my craft,
                          coupled with that unwavering resilience to overcome
                          any technical hurdle.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    className="hover:text-teal-400 text-primary"
                    onClick={() => setReadMore((prev) => !prev)}
                  >
                    {!readMore ? "Learn More About Me" : "Hide Details"}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>
    </Element>
  );
};

export default About;
