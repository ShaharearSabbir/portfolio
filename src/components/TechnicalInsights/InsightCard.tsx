"use client";


import { VscTools, VscCheckAll, VscArrowRight } from "react-icons/vsc";
import { Project } from "@/generated/client/browser";
import { ProjectDetail } from "../project/ProjectDetail";

export function InsightCard({ project }: { project: Project }) {
  return (
    <div className="group p-8 rounded-[2.5rem] bg-muted/30 border border-white/5 hover:border-primary/20 transition-all duration-500 flex flex-col space-y-6">
      {/* Category & Project Context */}
      <div className="flex justify-between items-center text-xs font-mono opacity-60">
        <span>CASE STUDY</span>
        <span className="text-primary font-bold">{project.name}</span>
      </div>

      {/* The Challenge */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <VscTools size={18} />
          <h3 className="font-bold uppercase tracking-tight text-sm">The Challenge</h3>
        </div>
        <p className="text-foreground/90 font-medium leading-relaxed line-clamp-3">
          {project.challenges}
        </p>
      </div>

      {/* The Solution Snippet */}
      <div className="space-y-3 p-4 rounded-2xl bg-background/50 border border-white/5">
        <div className="flex items-center gap-2 text-emerald-400">
          <VscCheckAll size={18} />
          <h4 className="font-bold uppercase tracking-tight text-[11px]">The Architect&apos;s Fix</h4>
        </div>
        <p className="text-sm text-muted-foreground italic line-clamp-2">
          {project.solutions}
        </p>
      </div>

      {/* Footer Link to Project Details */}
     <ProjectDetail
        project={project}
        className="pt-4 flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all"
      >
        Read Full Post-Mortem <VscArrowRight />
        </ProjectDetail>
    </div>
  );
}