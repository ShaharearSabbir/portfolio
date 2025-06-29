import React, { useState } from "react";
import logo from "../assets/logo.png";
import Button from "./Button";
import { Element, Link } from "react-scroll";
import ThemeToggle from "./ThemeToggle";
import { FcAbout } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { GiSkills } from "react-icons/gi";
import { MdContactMail } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
const Navbar = () => {
  const [isLeft, setIsLeft] = useState(true);
  const offset = -120;
  const links = (
    <>
      <Link
        to="about"
        smooth={true}
        activeClass="active"
        spy={true}
        duration={500}
        offset={offset}
      >
        <CgProfile size={25} className="lg:hidden" />
        <span className="hidden lg:inline">About Me</span>
      </Link>
      <Link
        to="skills"
        smooth={true}
        activeClass="active"
        spy={true}
        duration={500}
        offset={offset}
      >
        <GiSkills size={25} className="lg:hidden" />
        <span className="hidden lg:inline">Skills</span>
      </Link>
      <Link
        to="projects"
        activeClass="active"
        spy={true}
        smooth={true}
        duration={500}
        offset={offset}
      >
        <GrProjects size={25} className="lg:hidden" />
        <span className="hidden lg:inline">Projects</span>
      </Link>
      <Link
        to="contact"
        smooth={true}
        activeClass="active"
        spy={true}
        duration={500}
        offset={offset}
      >
        <MdContactMail size={25} className="lg:hidden" />
        <span className="hidden lg:inline">Contact Me</span>
      </Link>
    </>
  );
  return (
    <Element name="navbar">
      <div className="bg-base-200 not-lg:hidden fixed top-0 z-100 w-full">
        <nav className="container mx-auto flex justify-between items-center px-4 py-4">
          <a href="/">
            <img
              src={logo}
              className="w-12 h-8 lg:w-20 lg:h-12 object-cover"
              alt=""
            />
          </a>
          <ul className="lg:flex *:px-1 gap-4 hidden *:font-semibold *:text-lg">
            {links}
          </ul>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button>Resume</Button>
          </div>
        </nav>
      </div>
      <div className="lg:hidden">
        <ul
          className={`*:block fixed bg-base-200 p-4 bottom-50 space-y-4 ${
            isLeft ? "left-0" : "right-0"
          }`}
        >
          {links}
          <button type="button" onClick={() => setIsLeft((prev) => !prev)}>
            {isLeft ? (
              <LuArrowRightToLine size={25} />
            ) : (
              <LuArrowLeftToLine size={25} />
            )}
          </button>
        </ul>
      </div>
    </Element>
  );
};

export default Navbar;
