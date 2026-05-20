/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { Badge } from "../ui/badge";
import { ProjectCard } from "./ProjectCard";
import { ProjectArchive } from "./ProjectArchive";
import { ProjectDetail } from "./ProjectDetail";
import * as m from "motion/react-client";

export default async function FeaturedProjects() {
  const featuredProjects = await prisma.project.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const allProjects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each project card
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section id="featured-projects" className="py-24 bg-background">
      {/* Using m.div with "viewport" makes the animation trigger 
          only when the user scrolls down to this section.
      */}
      <m.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="w-full space-y-16"
      >
        {/* Header Section */}
        <div className="lg:ml-32 px-4 flex flex-col md:flex-row md:items-end justify-between gap-6 lg:mr-32">
          <m.div variants={itemVariants as any} className="space-y-4">
            <Badge variant="outline" className="text-primary border-primary/20">
              Selected Works
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Featured{" "}
              <span className="text-primary italic">Architectures</span>
            </h2>
          </m.div>
          
          <m.div variants={itemVariants as any} className="mt-12 flex justify-center">
            <ProjectArchive projects={allProjects} />
          </m.div>
        </div>

        {/* Projects Grid */}
        <div className="lg:ml-32 lg:mr-32 px-4">
          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <m.div 
                  key={project.id} 
                  variants={itemVariants as any}
                  className="h-full"
                >
                  <ProjectDetail project={project}>
                    <ProjectCard project={project} />
                  </ProjectDetail>
                </m.div>
              ))}
            </div>
          ) : (
            <div className="p-20 text-center border border-dashed rounded-[40px] border-border/50 bg-card/20">
              <p className="text-muted-foreground font-medium tracking-tight">Project architecture gallery is currently being curated. Check back soon for my latest builds.</p>
            </div>
          )}
        </div>
      </m.div>
    </section>
  );
}