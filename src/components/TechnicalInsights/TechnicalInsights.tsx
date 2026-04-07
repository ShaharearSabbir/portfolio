/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { VscBook } from "react-icons/vsc";
import { InsightCard } from "./InsightCard";
import { ProjectDetail } from "../project/ProjectDetail";
import * as m from "motion/react-client";

export default async function TechnicalInsights() {
  const deepDives = await prisma.project.findMany({
    where: {
      complexity: { gte: 3 },
      challenges: { not: "" },
    },
    take: 3,
    orderBy: { complexity: "desc" },
  });

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Slightly slower for a "journal" feel
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom "Out-Quart" ease for a premium feel
      },
    },
  };

  return (
    <section
      id="insights"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background Decor - Subtle Fade-in */}
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] -z-10"
      />

      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={containerVariants}
        className="w-full space-y-12"
      >
        {/* Header Section */}
        <div className="lg:ml-32 px-4 space-y-4">
          <m.div
            variants={itemVariants as any}
            className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm"
          >
            <VscBook /> Engineering Journal
          </m.div>

          <m.h2
            variants={itemVariants as any}
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          >
            Technical <span className="text-primary italic">Deep Dives</span>
          </m.h2>

          <m.p
            variants={itemVariants as any}
            className="text-muted-foreground text-lg max-w-2xl"
          >
            Breaking down the architectural challenges and logic-driven
            solutions behind my most complex builds.
          </m.p>
        </div>

        {/* Insights Grid */}
        <div className="lg:ml-32 lg:mr-32 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deepDives.map((project) => (
            <m.div
              key={project.id}
              variants={itemVariants as any}
              className="h-full"
            >
              <ProjectDetail project={project}>
                <InsightCard project={project} />
              </ProjectDetail>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  );
}
