import { useState } from "react";
import Button from "./Button";
import { animateScroll, Element, Link } from "react-scroll";
import { CgProfile } from "react-icons/cg";
import { GiSkills } from "react-icons/gi";
import { MdContactMail } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import {
  LuArrowLeftToLine,
  LuArrowRightToLine,
  LuSunDim,
} from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa";

const Navbar = () => {
  const [isLeft, setIsLeft] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const offset = -120;

  const options = {
    duration: 500,
    smooth: true,
  };

  const handleGoUp = () => {
    animateScroll.scrollToTop(options);
  };

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={`${
              isDark ? "fill-white" : "fill-black"
            } w-10 scale-170 cursor-pointer`}
            xmlSpace="preserve"
            onClick={handleGoUp}
          >
            <path
              d="M94.2,127.5c3.5,0.4,9.8-0.4,13.7-0.6c5.6-0.2,11.3,0,17,0l92.1-0.2l127.2,0.1c11.4,0,22.7-0.1,34.1,0
	c3.7,0,7.4,0,11.1,0.1c3.1,0.1,6.2,0.4,9.3,0.1c22.8,3.5,42.8,11.8,56.9,31c14.3,19.5,18.2,46.6,14.5,70.1
	c-3.2,20.7-12.9,40.2-30.1,52.8c-5.7,4.2-12.2,7.5-18.9,9.9c-1.9,0.7-7.4,1.9-8.7,2.6c-0.5,0.2-0.6,0.4-0.8,0.9
	c0.1,1.1,1.6,2.6,2.3,3.5c3.2,3.9,6.5,7.7,9.7,11.6l29.2,35.2l25.7,31.3c1.7,2,3.1,4.2,4.8,6.2c0,1,0,2.1,0.1,3.1l-0.3,0
	c-3-0.2-6.1,0.1-9.1,0c-12-0.1-24-0.1-36-0.1c-4.8,0-9.7,0.3-14.6,0.1c-0.9,0-2-0.1-2.9-0.5c-1.7-2-3.2-4.2-4.8-6.3l-12.1-15.2
	c-10.9-13.7-21.8-27.3-32.8-40.8l-12.2-15c-2.1-2.6-4.2-5.8-6.7-8.1c-0.6-0.5-1-0.6-1.7-0.7c-4.4-0.5-10.4-0.1-14.9-0.1l-29.9,0
	c-5.2,0-10.4,0.3-15.6,0c-0.5,18.7-0.2,37.4-0.2,56.1c0,6.6,0,13.1,0.1,19.7c0,2.8-0.3,5.8,0.1,8.6c-0.4,0.8-0.7,1.7-1.6,2
	c-2.6,0.8-10.5,0.2-13.6,0.1l-16,0c-6.1,0-12.4,0.3-18.5,0.1c-1.4,0-3-0.1-4.4-0.5c-0.6-1.2-0.6-2.8-0.2-4c0.8-2.1,5.9-6.3,7.7-8.3
	c1.9-2.1,3.7-4.2,5.4-6.4c18-25,22.1-59.8,10.3-88.3c-5-12-12.7-22.1-22.5-30.6c0-7.4,0.4-14.9,0-22.3c17.7,0,35.4,0,53.1,0.2
	c0.1,8.7,0.5,17.7-0.1,26.5c6.2,0.4,12.5,0.2,18.8,0.2l30.5,0l26.2,0c8,0,16.1,0.3,24-1.1c6-1.1,12.2-3.6,16.8-7.6
	c7.8-6.9,11.2-16.3,11.8-26.5c0.7-10.8-1.1-22.3-8.6-30.6c-8.1-9-19.9-11.5-31.5-12.1c-7.1-0.3-14.3-0.1-21.4-0.1l-34.4,0l-106.3,0
	l-66.3,0l-21.5,0c-5.6,0-11.3-0.1-17,0.5c-6.8,0.7-14.3,2.3-19.4,7c-3.9,3.6-5.3,8.2-5.5,13.3c-0.2,5.4,1.1,10,4.8,13.9
	c6.7,7.1,19.5,10,28.6,12.8l51,15.4c19.1,5.7,43.5,12.7,58.3,26.7c6.2,5.9,10.7,12.7,13.9,20.5c4.2,10,5.8,20.6,5.6,31.3
	c-0.4,18.2-7,35.9-20.3,48.6c-10.1,9.6-22.7,15.1-36.1,18.4c-2.4,0.6-21.1,3-25.4,3l-25.4,0l-83.3,0l-18.2,0c-3,0-6.2-0.2-9.2,0.1
	c0.1-0.4,0.1-0.6,0.1-0.9c-0.4-3.4-0.2-7-0.2-10.5c0-6.6,0.1-13.2,0-19.8c-0.1-4.2-1.4-10.6-0.3-14.5c0.2-0.7,0.2-1.4,0.3-2.1
	l92.5-0.1l26.8,0c7.2,0,14.5,0.2,21.7-0.7c7.4-0.9,14.7-3.5,19.4-9.6c3.2-4.1,4.2-9.7,3.6-14.7c-0.9-6.5-4.2-10.4-9.6-14
	c-8.5-5.7-21.4-9.2-31.3-12.2c-12-3.7-24-7.3-36-10.9c-20.1-6-45.2-12.6-62-25.6C41.8,239.2,34.1,225.2,32,209
	c-0.4-3.5-0.9-7-0.9-10.5c-0.3-16,4.5-32.8,14.5-45.5C57.2,138.1,75.6,129.7,94.2,127.5z"
            />
          </svg>
          <ul className="lg:flex *:px-1 gap-4 hidden *:font-semibold *:text-lg">
            {links}
          </ul>
          <div className="flex items-center gap-4">
            <label>
              {/* this hidden checkbox controls the state */}
              <input
                id="themeToggle"
                type="checkbox"
                className="theme-controller hidden"
                onChange={() => setIsDark((prev) => !prev)}
                value="light-teal"
              />
              {isDark ? <LuSunDim size={25} /> : <FaRegMoon size={25} />}
            </label>
            <Button>Resume</Button>
          </div>
        </nav>
      </div>
      <div className="lg:hidden">
        <ul
          className={`*:block fixed z-100 bg-base-300 rounded-2xl p-4 bottom-50 space-y-4 ${
            isLeft ? "left-0" : "right-0"
          }`}
        >
          <li>
            <button onClick={handleGoUp} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={`${
                  isDark ? "fill-white" : "fill-black"
                } w-7 -mb-4 cursor-pointer `}
                onClick={handleGoUp}
                xmlSpace="preserve"
              >
                <path
                  d="M94.2,127.5c3.5,0.4,9.8-0.4,13.7-0.6c5.6-0.2,11.3,0,17,0l92.1-0.2l127.2,0.1c11.4,0,22.7-0.1,34.1,0
	c3.7,0,7.4,0,11.1,0.1c3.1,0.1,6.2,0.4,9.3,0.1c22.8,3.5,42.8,11.8,56.9,31c14.3,19.5,18.2,46.6,14.5,70.1
	c-3.2,20.7-12.9,40.2-30.1,52.8c-5.7,4.2-12.2,7.5-18.9,9.9c-1.9,0.7-7.4,1.9-8.7,2.6c-0.5,0.2-0.6,0.4-0.8,0.9
	c0.1,1.1,1.6,2.6,2.3,3.5c3.2,3.9,6.5,7.7,9.7,11.6l29.2,35.2l25.7,31.3c1.7,2,3.1,4.2,4.8,6.2c0,1,0,2.1,0.1,3.1l-0.3,0
	c-3-0.2-6.1,0.1-9.1,0c-12-0.1-24-0.1-36-0.1c-4.8,0-9.7,0.3-14.6,0.1c-0.9,0-2-0.1-2.9-0.5c-1.7-2-3.2-4.2-4.8-6.3l-12.1-15.2
	c-10.9-13.7-21.8-27.3-32.8-40.8l-12.2-15c-2.1-2.6-4.2-5.8-6.7-8.1c-0.6-0.5-1-0.6-1.7-0.7c-4.4-0.5-10.4-0.1-14.9-0.1l-29.9,0
	c-5.2,0-10.4,0.3-15.6,0c-0.5,18.7-0.2,37.4-0.2,56.1c0,6.6,0,13.1,0.1,19.7c0,2.8-0.3,5.8,0.1,8.6c-0.4,0.8-0.7,1.7-1.6,2
	c-2.6,0.8-10.5,0.2-13.6,0.1l-16,0c-6.1,0-12.4,0.3-18.5,0.1c-1.4,0-3-0.1-4.4-0.5c-0.6-1.2-0.6-2.8-0.2-4c0.8-2.1,5.9-6.3,7.7-8.3
	c1.9-2.1,3.7-4.2,5.4-6.4c18-25,22.1-59.8,10.3-88.3c-5-12-12.7-22.1-22.5-30.6c0-7.4,0.4-14.9,0-22.3c17.7,0,35.4,0,53.1,0.2
	c0.1,8.7,0.5,17.7-0.1,26.5c6.2,0.4,12.5,0.2,18.8,0.2l30.5,0l26.2,0c8,0,16.1,0.3,24-1.1c6-1.1,12.2-3.6,16.8-7.6
	c7.8-6.9,11.2-16.3,11.8-26.5c0.7-10.8-1.1-22.3-8.6-30.6c-8.1-9-19.9-11.5-31.5-12.1c-7.1-0.3-14.3-0.1-21.4-0.1l-34.4,0l-106.3,0
	l-66.3,0l-21.5,0c-5.6,0-11.3-0.1-17,0.5c-6.8,0.7-14.3,2.3-19.4,7c-3.9,3.6-5.3,8.2-5.5,13.3c-0.2,5.4,1.1,10,4.8,13.9
	c6.7,7.1,19.5,10,28.6,12.8l51,15.4c19.1,5.7,43.5,12.7,58.3,26.7c6.2,5.9,10.7,12.7,13.9,20.5c4.2,10,5.8,20.6,5.6,31.3
	c-0.4,18.2-7,35.9-20.3,48.6c-10.1,9.6-22.7,15.1-36.1,18.4c-2.4,0.6-21.1,3-25.4,3l-25.4,0l-83.3,0l-18.2,0c-3,0-6.2-0.2-9.2,0.1
	c0.1-0.4,0.1-0.6,0.1-0.9c-0.4-3.4-0.2-7-0.2-10.5c0-6.6,0.1-13.2,0-19.8c-0.1-4.2-1.4-10.6-0.3-14.5c0.2-0.7,0.2-1.4,0.3-2.1
	l92.5-0.1l26.8,0c7.2,0,14.5,0.2,21.7-0.7c7.4-0.9,14.7-3.5,19.4-9.6c3.2-4.1,4.2-9.7,3.6-14.7c-0.9-6.5-4.2-10.4-9.6-14
	c-8.5-5.7-21.4-9.2-31.3-12.2c-12-3.7-24-7.3-36-10.9c-20.1-6-45.2-12.6-62-25.6C41.8,239.2,34.1,225.2,32,209
	c-0.4-3.5-0.9-7-0.9-10.5c-0.3-16,4.5-32.8,14.5-45.5C57.2,138.1,75.6,129.7,94.2,127.5z"
                />
              </svg>
            </button>
          </li>
          {links}

          <label>
            {/* this hidden checkbox controls the state */}
            <input
              id="themeToggle"
              type="checkbox"
              className="theme-controller hidden"
              onChange={() => setIsDark((prev) => !prev)}
              value="light-teal"
            />
            {isDark ? <LuSunDim size={25} /> : <FaRegMoon size={25} />}
          </label>
          <button
            type="button"
            className="-mt-2"
            onClick={() => setIsLeft((prev) => !prev)}
          >
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
