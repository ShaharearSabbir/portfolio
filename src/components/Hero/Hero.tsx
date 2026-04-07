/* eslint-disable @typescript-eslint/no-explicit-any */
import * as m from "motion/react-client";
import hero from "@/assets/hero.png";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { PiXLogoBold } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import { Button } from "../ui/button";
import { VscArrowRight } from "react-icons/vsc";
import ScrollLink from "../Scroll/ScrollLink";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <div className="min-h-screen overflow-hidden relative bg-background flex items-center">
      {/* 1. Subtle Background Decoration (Top Left) */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 blur-[120px] rounded-full -z-10 opacity-50" />

      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col lg:flex-row justify-center lg:justify-between items-center w-full gap-8 mt-20 lg:mt-0"
      >
        {/* Content Section (Left) */}
        <div className="flex-1 lg:ml-32 text-center lg:text-left space-y-8 p-4 z-10">
          <m.div variants={itemVariants as any} className="space-y-2">
            <h5 className="text-lg md:text-xl tracking-[0.2em] uppercase text-muted-foreground font-medium opacity-80">
              Hello! I&apos;m
            </h5>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tighter leading-tight">
              Shaharear <br className="hidden lg:block" />
              Rahman <span className="text-primary">Sabbir</span>
            </h1>
          </m.div>

          <m.h2
            variants={itemVariants as any}
            className="text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-2xl mx-auto lg:mx-0 text-foreground/80"
          >
            <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-400">
              Full-Stack Systems Architect:{" "}
            </span>
            Architecting type-safe applications and scalable backends with a
            focus on data integrity and performance.
          </m.h2>

          {/* Social Icons - RESTORED */}
          <m.div
            variants={itemVariants as any}
            className="flex gap-8 justify-center lg:justify-start text-2xl text-muted-foreground"
          >
            {[
              {
                icon: <BsGithub />,
                href: "https://github.com/ShaharearSabbir",
              },
              {
                icon: <BsLinkedin />,
                href: "https://www.linkedin.com/in/shaharearrahmansabbir/",
              },
              { icon: <PiXLogoBold />, href: "https://x.com/Shaharear_" },
              { icon: <FaWhatsapp />, href: "https://wa.me/8801609067955" },
              { icon: <MdEmail />, href: "mailto:dev@shaharear.top" },
            ].map((social, i) => (
              <m.a
                key={i}
                href={social.href}
                target="_blank"
                whileHover={{
                  y: -3,
                  scale: 1.1,
                  color: "var(--color-primary)",
                }}
                className="transition-all duration-200"
              >
                {social.icon}
              </m.a>
            ))}
          </m.div>

          {/* Buttons - RESTORED */}
          <m.div
            variants={itemVariants as any}
            className="flex flex-wrap gap-5 justify-center lg:justify-start pt-4"
          >
            <a href="./Resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 font-bold shadow-lg transition-all active:scale-95"
              >
                View Resume
              </Button>
            </a>
            <m.div whileHover="hover" className="inline-block">
              <ScrollLink name="featured-projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/50 text-primary hover:bg-primary/5 rounded-full px-10 font-bold backdrop-blur-sm"
                >
                  See My Work
                  <m.span
                    variants={{ hover: { x: 4 } }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="inline-flex items-center"
                  >
                    <VscArrowRight className="ml-2" />
                  </m.span>
                </Button>
              </ScrollLink>
            </m.div>
          </m.div>
        </div>

        {/* Hero Image Section (Right) */}
        <div className="flex-1 lg:min-h-screen w-full flex justify-end items-end relative overflow-visible">
          {/* 1. Static Glow Base (Visible behind image) */}
          <div className="absolute bottom-10 right-10 w-[80%] h-[80%] bg-primary/10 blur-[100px] animate-pulse rounded-full z-0" />

          {/* 2. Responsive Image Wrapper */}
          <m.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="w-full flex justify-end relative z-10"
          >
            <Image
              src={hero}
              alt="Shaharear Rahman Sabbir"
              className="w-full lg:w-[90%] h-auto object-contain select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              priority
            />
          </m.div>
        </div>
      </m.div>
    </div>
  );
};

export default Hero;
