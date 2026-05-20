"use client";

import { useState } from "react";
import { VscAccount, VscCode, VscRemoteExplorer } from "react-icons/vsc";
import { BiGitBranch } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "../ui/ModeToggle";
import ScrollLink from "../Scroll/ScrollLink";

const Navbar = ({ experienceCount }: { experienceCount: number }) => {
  // Set the default active section
  const [activeSection, setActiveSection] = useState("about");

  const navLinks = [
    { href: "about", icon: <VscAccount size={24} />, label: "About" },
    ...(experienceCount > 0
      ? [
          {
            href: "experience",
            icon: <VscRemoteExplorer size={24} />,
            label: "Experience",
          },
        ]
      : []),
    {
      href: "featured-projects",
      icon: <VscCode size={24} />,
      label: "Projects",
    },
    {
      href: "blog",
      icon: <BiGitBranch size={24} />,
      label: "Blog",
    },
    {
      href: "contact",
      icon: <VscRemoteExplorer size={24} />,
      label: "Contact",
    },
  ];
  // gdfgdf

  return (
    <header className="fixed z-50 lg:left-6 lg:top-1/2 lg:-translate-y-1/2 bottom-6 left-1/2 -translate-x-1/2 lg:translate-x-0 max-w-100 lg:max-w-none">
      <nav className="p-2 sm:p-3 bg-card/40 backdrop-blur-xl border border-border/50 rounded-full shadow-2xl">
        <ul className="flex lg:flex-col items-center justify-around lg:justify-center gap-2 xs:gap-4 sm:gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;

            return (
              <li key={link.href} className="relative shrink-0">
                <ScrollLink
                  name={link.href}
                  onSetActive={() => setActiveSection(link.href)}
                  className={`relative z-10 transition-colors duration-300 flex items-center justify-center p-2 rounded-full group ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary/70"
                  }`}
                >
                  {link.icon}

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20 -z-10"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Desktop Tooltip */}
                  <span className="absolute left-14 scale-0 group-hover:scale-100 transition-all bg-card border border-border text-foreground text-[10px] px-2 py-1 rounded-md hidden lg:block uppercase tracking-widest font-bold whitespace-nowrap shadow-xl">
                    {link.label}
                  </span>
                </ScrollLink>
              </li>
            );
          })}

          <div className="hidden lg:block w-8 h-px bg-border/50 shrink-0" />
          <div className="lg:hidden w-px h-6 bg-border/50 shrink-0" />

          <li className="flex items-center justify-center shrink-0">
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
