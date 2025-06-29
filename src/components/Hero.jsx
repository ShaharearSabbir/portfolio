import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import hero from "../assets/hero.jpg";
import Section from "./Section";
import Button from "./Button";
import { PiXLogoBold } from "react-icons/pi";
import { motion } from "motion/react";
import { container, heroWords, socialIcons } from "../Animation/animation";
import { FaWhatsapp } from "react-icons/fa";
import useIsMobile from "../Hooks/useIsMobile";

const Hero = () => {
  const isMobile = useIsMobile();

  // Fallback animation if disabled (no animation)
  const fallback = { initial: {}, animate: {} };

  const name = "Shaharear Rahman Sabbir";
  const nameArray = name.split("");
  console.log(nameArray);
  const delay = (second) => {
    return second / 23;
  };
  return (
    <Section>
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row -mt-4 justify-between items-center gap-4 lg:mt-30">
        <motion.div
          variants={isMobile ? fallback : container("LTR")}
          initial="initial"
          animate="animate"
          className="space-y-5 text-center lg:text-left"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tight font-bold">
            {nameArray.map((word, index) => (
              <motion.span
                variants={heroWords(0.3 * delay(index), delay(index))}
                initial="initial"
                whileInView="animate"
                key={index}
                className="text-primary inline-block"
              >
                {word === " " ? "\u00A0" : word}
              </motion.span>
            ))}
          </h1>
          <p className="max-w-lg text-justify">
            <span className="font-bold">MERN Stack Developer: </span>Crafting
            comprehensive, scalable web solutions from concept to deployment.
          </p>
          <div className="flex gap-4 justify-center lg:justify-start text-2xl">
            <motion.a
              variants={socialIcons()}
              initial="initial"
              whileHover="animate"
              whileTap="onClick"
              href="https://github.com/ShaharearSabbir"
              target="_blank"
            >
              <BsGithub />
            </motion.a>
            <motion.a
              variants={socialIcons()}
              initial="initial"
              whileHover="animate"
              whileTap="onClick"
              href="https://www.linkedin.com/in/shaharearrahmansabbir/"
              target="_blank"
            >
              <BsLinkedin color="#0077B5" />
            </motion.a>
            <motion.a
              variants={socialIcons()}
              initial="initial"
              whileHover="animate"
              whileTap="onClick"
              href="https://x.com/Shaharear_"
              target="_blank"
            >
              <PiXLogoBold />
            </motion.a>
            <motion.a
              variants={socialIcons()}
              initial="initial"
              whileHover="animate"
              whileTap="onClick"
              href="https://wa.me/8801609067955"
              target="_blank"
            >
              <FaWhatsapp color="#075e54" />
            </motion.a>
          </div>
          <Button>Resume</Button>
        </motion.div>
        <motion.div
          variants={isMobile ? fallback : container("RTL")}
          initial="initial"
          animate="animate"
        >
          <img src={hero} className="rounded w-98" alt="" />
        </motion.div>
      </div>
    </Section>
  );
};

export default Hero;
