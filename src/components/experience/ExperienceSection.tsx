import { prisma } from "@/lib/prisma";
import { Badge } from "../ui/badge";
import * as m from "motion/react-client";

export default async function ExperienceSection() {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-24 bg-background/30">
      <div className="lg:ml-32 lg:mr-32 px-4 space-y-16">
        <div className="space-y-4 text-center lg:text-left">
          <Badge variant="outline" className="text-primary border-primary/20">
            Professional Journey
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Work <span className="text-primary italic">Experience</span>
          </h2>
        </div>

        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent">
          {experiences.length > 0 ? (
            experiences.map((exp, i) => (
              <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/50 bg-background text-primary shadow-lg shadow-primary/20 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="text-xs font-bold">{experiences.length - i}</span>
                </div>
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-xl transition-all hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <time className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap bg-muted px-3 py-1 rounded-full">
                      {exp.startDate} – {exp.endDate || "Present"}
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-[10px] font-mono">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center border border-dashed rounded-[40px] border-border/50 bg-card/20 w-full">
              <p className="text-muted-foreground font-medium tracking-tight">The professional chronicle is currently being summarized. Check back soon for my career trajectory.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
