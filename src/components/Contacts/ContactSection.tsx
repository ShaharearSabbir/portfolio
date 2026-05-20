/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContactCards } from "./ContactCards";
import { Badge } from "@/components/ui/badge";
import * as m from "motion/react-client";

export default function ContactSection() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const lineVariants = {
    hidden: { width: "0%", opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
    <section
      id="contact"
      className="py-24 border-t border-white/5 bg-background/50 relative overflow-hidden"
    >
      {/* Animated background glow line */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={lineVariants as any}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
      />

      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="w-full space-y-16"
      >
        {/* Header Section */}
        <div className="lg:ml-32 px-4 space-y-4">
          <m.div variants={itemVariants as any}>
            <Badge
              variant="outline"
              className="text-primary border-primary/20 bg-primary/5 px-4 py-1"
            >
              Status: Open for Opportunities
            </Badge>
          </m.div>

          <m.h2
            variants={itemVariants as any}
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          >
            Let&apos;s Build Something <br />
            <span className="text-primary italic">Resilient.</span>
          </m.h2>

          <m.p
            variants={itemVariants as any}
            className="text-muted-foreground text-lg max-w-xl"
          >
            Whether you need a scalable MERN architecture or a type-safe system
            overhaul, I&apos;m ready to contribute to your engineering team.
          </m.p>
        </div>

        {/* Contact Methods Grid */}
        <m.div
          variants={itemVariants as any}
          className="lg:ml-32 lg:mr-32 px-4"
        >
          <ContactCards />
        </m.div>

        {/* Footer Note */}
        <m.div
          variants={itemVariants as any}
          className="lg:ml-32 px-4 pt-12 border-t border-white/5 text-sm text-muted-foreground/50 flex flex-col md:flex-row justify-between gap-4 lg:mr-32"
        >
          <p>
            © 2026{" "}
            <a
              href="https://www.linkedin.com/in/shaharearrahmansabbir/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Shaharear Rahman Sabbir
            </a>
            . Built with passion and love.
          </p>
          <p className="font-mono uppercase tracking-widest">
            Brahmanbaria, BD — UTC+6
          </p>
        </m.div>
      </m.div>
    </section>
  );
}
