import { prisma } from "@/lib/prisma";
import { StoryNarrative } from "./StoryNarrative";
import { TechArsenal } from "./TechArsenal";
import { Reveal } from "../animation/Reveal";

export default async function AboutSection() {
  const [skills, projectCount] = await Promise.all([
    prisma.skill.findMany({ orderBy: { priority: "desc" } }),
    prisma.project.count(),
  ]);

  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start w-full gap-12 lg:gap-16">
        
        {/* Left Column: Narrative */}
        <div className="flex-1 lg:ml-32 p-4">
          <Reveal>
            <StoryNarrative projectCount={projectCount} />
          </Reveal>
        </div>

        {/* Right Column: Skills */}
        <div className="flex-1 lg:mr-32 p-4">
          {/* Slight delay on the second column for a staggered feel */}
          <Reveal delay={0.2}>
            <TechArsenal skills={skills} />
          </Reveal>
        </div>
        
      </div>
    </section>
  );
}