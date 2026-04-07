"use client";

import React from "react";
import { Link } from "react-scroll";

const ScrollLink = ({
  name,
  children,
  className,
}: {
  name: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Link
      to={name}
      spy={true}
      smooth={true}
      duration={500}
      className={`cursor-pointer ${className ? className : ""}`}
    >
      {children}
    </Link>
  );
};

export default ScrollLink;
