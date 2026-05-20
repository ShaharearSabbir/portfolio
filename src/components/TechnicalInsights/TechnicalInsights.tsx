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
      className="py-24 bg-background/50 relative overflow-hidden"
    >
      {/* Structural Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={containerVariants}
        className="w-full space-y-16 relative z-10"
      >
        {/* Header Section */}
        <div className="lg:ml-32 px-4 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-6 flex-1">
            <m.div
              variants={itemVariants as any}
              className="inline-flex items-center gap-3 px-4 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest"
            >
              <VscBook /> Logic Architecture
            </m.div>

            <m.h2
              variants={itemVariants as any}
              className="text-4xl md:text-7xl font-bold tracking-tighter leading-none"
            >
              Systems <span className="text-primary">Engineering</span>
            </m.h2>
          </div>

          <m.p
            variants={itemVariants as any}
            className="text-muted-foreground text-lg max-w-xl md:border-l-2 border-primary/20 md:pl-8 leading-relaxed"
          >
            A breakdown of high-complexity features where I solve for scale,
            data integrity, and performance optimization.
          </m.p>
        </div>

        {/* Insights Grid */}
        <div className="lg:ml-32 lg:mr-32 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deepDives.map((project) => (
            <m.div
              key={project.id}
              variants={itemVariants as any}
              className="h-full group"
            >
              <ProjectDetail project={project}>
                <div className="rounded-[2.5rem] hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20 relative overflow-hidden">
                  {/* Subtle Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />

                  <InsightCard project={project} />
                </div>
              </ProjectDetail>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  );
}
