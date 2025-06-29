import { motion } from "motion/react";
import React from "react";
import { container } from "../Animation/animation";

const SectionHeader = ({ children }) => {
  return (
    <motion.h2
      variants={container("BTT")}
      initial="initial"
      whileInView="animate"
      className="text-xl font-bold md:text-2xl lg:text-3xl text-center mb-4 lg:mb-8 "
    >
      {children}
    </motion.h2>
  );
};

export default SectionHeader;
