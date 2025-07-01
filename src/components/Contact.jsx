import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { PiXLogoBold } from "react-icons/pi";
import { Element } from "react-scroll";
import ContactForm from "./ContactForm";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "motion/react";
import { container, socialIcons } from "../Animation/animation";
import useIsMobile from "../Hooks/useIsMobile";

const Contact = () => {
  const isMobile = useIsMobile();

  return (
    <Element name="contact">
      <Section>
        <div className="container px-4 md:px-8 mx-auto">
          <SectionHeader>Contact Me</SectionHeader>
          <div className="flex flex-col lg:flex-row justify-between overflow-x-hidden lg:items-center ">
            <motion.div
              variants={isMobile ? container("BTT") : container("LTR")}
              initial="initial"
              whileInView="animate"
              className="flex-1 flex justify-center items-center"
            >
              <div className="w-full lg:w-2/3">
                <ContactForm />
              </div>
            </motion.div>
            <motion.div
              variants={isMobile ? container("BTT") : container("RTL")}
              initial="initial"
              whileInView="animate"
              className="py-8 flex-1 lg:text-right space-y-4"
            >
              <div>
                <h5 className="font-bold">Email</h5>
                <a href="mailto:imshaharear@gmail.com">imshaharear@gmail.com</a>
              </div>
              <div>
                <h5 className="font-bold">Phone</h5>
                <a href="tel:+8801609067955">+880 01609 067955</a>
              </div>
              <div>
                <h5 className="font-bold">Address</h5>
                <address>Brahmanbaria, Dhaka</address>
              </div>

              <div>
                <h5 className="font-bold">Social</h5>
                <div className="flex justify-start mt-1 lg:justify-end items-center gap-2">
                  <motion.a
                    variants={socialIcons()}
                    initial="initial"
                    whileHover="animate"
                    whileTap="onClick"
                    href="https://github.com/ShaharearSabbir"
                    target="_blank"
                  >
                    <BsGithub size={24} />
                  </motion.a>
                  <motion.a
                    variants={socialIcons()}
                    initial="initial"
                    whileHover="animate"
                    whileTap="onClick"
                    href="https://www.linkedin.com/in/shaharearrahmansabbir/"
                    target="_blank"
                  >
                    <BsLinkedin color="#0077B5" size={24} />
                  </motion.a>
                  <motion.a
                    variants={socialIcons()}
                    initial="initial"
                    whileHover="animate"
                    whileTap="onClick"
                    href="https://x.com/Shaharear_"
                    target="_blank"
                  >
                    <PiXLogoBold size={24} />
                  </motion.a>
                  <motion.a
                    variants={socialIcons()}
                    initial="initial"
                    whileHover="animate"
                    whileTap="onClick"
                    href="https://wa.me/8801609067955"
                    target="_blank"
                  >
                    <FaWhatsapp color="#075e54" size={24} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>
    </Element>
  );
};

export default Contact;
