import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import { MdHtml } from "react-icons/md";
import { FaCss3, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import { SiDaisyui, SiExpress } from "react-icons/si";
import { DiFirebase, DiMongodb } from "react-icons/di";
import { TbBrandFramerMotion } from "react-icons/tb";
import { BsGit } from "react-icons/bs";
import { CgVercel } from "react-icons/cg";
import Marquee from "react-fast-marquee";
import { Element } from "react-scroll";
import { RiFirebaseLine, RiTailwindCssLine } from "react-icons/ri";
import { container, socialIcons } from "../Animation/animation";
import { motion } from "motion/react";

const Skills = () => {
  return (
    <Element name="skills">
      <Section>
        <SectionHeader>My Skills</SectionHeader>
        <div className="container mx-auto p-4 md:p-8">
          <motion.p
            className="lg:text-center text-justify px-4"
            variants={container("BTT")}
            initial="initial"
            whileInView="animate"
          >
            Over the years, I have worked with a variety of technologies. Here
            are some of the technologies I have experience with:
          </motion.p>
          <motion.div
            variants={container("BTT")}
            initial="initial"
            whileInView="animate"
          >
            <Marquee pauseOnHover={true} className="overflow-hidden p-4">
              <motion.a
                variants={socialIcons()}
                initial="initial"
                whileHover="animate"
                whileTap="onClick"
                className="inline-block"
                href="https://html.com/"
                target="_blank"
              >
                <div className="flex flex-col justify-center items-center gap-4 mr-20">
                  <FaHtml5 size={100} color="#F06529" />{" "}
                  <span className="font-bold">HTML5</span>
                </div>
              </motion.a>

              <motion.a
                variants={socialIcons()}
                initial="initial"
                whileHover="animate"
                whileTap="onClick"
                className="inline-block"
                href="https://css3.com/"
                target="_blank"
              >
                <div className="flex flex-col justify-center items-center gap-4 mr-20">
                  <FaCss3 size={100} color="#2965f1" />{" "}
                  <span className="font-bold">CSS3</span>
                </div>
              </motion.a>

              <motion.a
                variants={socialIcons()}
                initial="initial"
                whileHover="animate"
                whileTap="onClick"
                className="inline-block"
                href="https://tailwindcss.com/"
                target="_blank"
              >
                <div className="flex flex-col justify-center items-center gap-4 mr-20">
                  <RiTailwindCssLine size={100} color="#3B82F6" />{" "}
                  <span className="font-bold">Tailwind CSS</span>
                </div>
              </motion.a>

              <motion.a
                variants={socialIcons()}
                initial="initial"
                whileHover="animate"
                whileTap="onClick"
                className="inline-block"
                href="https://daisyui.com/"
                target="_blank"
              >
                <div className="flex flex-col justify-center items-center gap-4 mr-20">
                  <SiDaisyui size={100} color="#ffe476" />{" "}
                  <span className="font-bold">Daisy UI</span>
                </div>
              </motion.a>

              <motion.a
                variants={socialIcons()}
                initial="initial"
                whileHover="animate"
                whileTap="onClick"
                className="inline-block"
                href="https://www.javascript.com/"
                target="_blank"
              >
                <div className="flex flex-col justify-center items-center gap-4 mr-20">
                  <FaJs size={100} color="#f0db4f" />{" "}
                  <span className="font-bold">JavaScript</span>
                </div>
              </motion.a>

              <motion.a
                variants={socialIcons()}
                initial="initial"
                whileHover="animate"
                whileTap="onClick"
                className="inline-block"
                href="https://react.dev/"
                target="_blank"
              >
                <div className="flex flex-col justify-center items-center gap-4 mr-20">
                  <FaReact size={100} color="#61DBFB" />{" "}
                  <span className="font-bold">React</span>
                </div>
              </motion.a>

              <motion.a
                variants={socialIcons()}
                initial="initial"
                whileHover="animate"
                whileTap="onClick"
                className="inline-block"
                href="https://nodejs.org/en"
                target="_blank"
              >
                <div className="flex flex-col justify-center items-center gap-4 mr-20">
                  <FaNodeJs size={100} color="#68A063" />{" "}
                  <span className="font-bold">Node.JS</span>
                </div>
              </motion.a>

              <motion.a
                variants={socialIcons()}
                initial="initial"
                whileHover="animate"
                whileTap="onClick"
                className="inline-block"
                href="https://expressjs.com/"
                target="_blank"
              >
                <div className="flex flex-col justify-center items-center gap-4 mr-20">
                  <SiExpress size={100} color="#005288" />{" "}
                  <span className="font-bold">Express.JS</span>
                </div>
              </motion.a>

              <motion.a
                variants={socialIcons()}
                initial="initial"
                whileHover="animate"
                whileTap="onClick"
                className="inline-block"
                href="https://www.mongodb.com/atlas"
                target="_blank"
              >
                <div className="flex flex-col justify-center items-center gap-4 mr-20">
                  <DiMongodb size={100} color="#4DB33D" />{" "}
                  <span className="font-bold">MongoDB</span>
                </div>
              </motion.a>

              <motion.a
                variants={socialIcons()}
                initial="initial"
                whileHover="animate"
                whileTap="onClick"
                className="inline-block"
                href="https://git-scm.com/"
                target="_blank"
              >
                <div className="flex flex-col justify-center items-center gap-4 mr-20">
                  <BsGit size={100} color="#F1502F" />{" "}
                  <span className="font-bold">Git</span>
                </div>
              </motion.a>

              <motion.a
                variants={socialIcons()}
                initial="initial"
                whileHover="animate"
                whileTap="onClick"
                className="inline-block"
                href="https://motion.dev/"
                target="_blank"
              >
                <div className="flex flex-col justify-center items-center gap-4 mr-20">
                  <TbBrandFramerMotion size={100} color="#E63946" />{" "}
                  <span className="font-bold">Motion</span>
                </div>
              </motion.a>

              <motion.a
                variants={socialIcons()}
                initial="initial"
                whileHover="animate"
                whileTap="onClick"
                className="inline-block"
                href="https://vercel.com/"
                target="_blank"
              >
                <div className="flex flex-col justify-center items-center gap-4 mr-20">
                  <CgVercel size={100} color="#4361EE" />{" "}
                  <span className="font-bold">Vercel</span>
                </div>
              </motion.a>
              <motion.a
                variants={socialIcons()}
                initial="initial"
                whileHover="animate"
                whileTap="onClick"
                className="inline-block"
                href="https://firebase.google.com/"
                target="_blank"
              >
                <div className="flex flex-col justify-center items-center gap-4 mr-20">
                  <RiFirebaseLine size={100} color="#FFA611" />{" "}
                  <span className="font-bold">Firebase</span>
                </div>
              </motion.a>
            </Marquee>
          </motion.div>
        </div>
      </Section>
    </Element>
  );
};

export default Skills;
