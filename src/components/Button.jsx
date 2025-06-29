import { motion } from "motion/react";
import React from "react";
import { socialIcons } from "../Animation/animation";

const Button = ({ children }) => {
  return (
    <motion.button
      variants={socialIcons()}
      initial="initial"
      whileTap="onClick"
      className="btn btn-primary text-white hover:rounded-full"
    >
      {children}
    </motion.button>
  );
};

export default Button;
