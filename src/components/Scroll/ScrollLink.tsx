"use client";

import { Link } from "react-scroll";

/* eslint-disable @typescript-eslint/no-explicit-any */

const ScrollLink = ({ name, children, className, ...props }: any) => {
  return (
    <Link
      to={name}
      spy={true}
      smooth={true}
      duration={500}
      className={`cursor-pointer ${className ? className : ""}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ScrollLink;
