// components/animations/Reveal.tsx
"use client";
import * as m from "motion/react-client";

export const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <m.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
  >
    {children}
  </m.div>
);