"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { VscGithub, VscLinkExternal, VscLayers } from "react-icons/vsc";
import { Project } from "@/generated/client/browser";

export function ProjectCard({ project }: { project: Project }) {
  // Combine some tech for the preview, or show specific ones
  const topTech = [...project.clientSideTech.slice(0, 2), ...project.serverSideTech.slice(0, 1)];

  return (
    <div className="group bg-muted/10 border border-white/5 rounded-[2rem] overflow-hidden hover:bg-muted/20 hover:border-primary/20 transition-all duration-500 flex flex-col h-full">
      {/* Visual Header */}
      <div className="relative aspect-16/10 overflow-hidden m-3 rounded-[1.5rem]">
        <Image
          src={project.thumbnail || "/placeholder.png"}
          alt={project.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 flex gap-2">
           <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none">
             {project.category}
           </Badge>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 pt-2 flex flex-col grow space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold tracking-tight">{project.name}</h3>
          <div className="flex gap-3">
            {project.githubClient && (
              <Link href={project.githubClient} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <VscGithub size={22} />
              </Link>
            )}
            {project.liveLink && (
              <Link href={project.liveLink} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <VscLinkExternal size={22} />
              </Link>
            )}
          </div>
        </div>

        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Tech Stack - Systems Architect Style */}
        <div className="pt-4 mt-auto space-y-3">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary font-bold">
            <VscLayers /> Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Show Database Tech as a distinctive badge */}
            <Badge variant="outline" className="bg-emerald-500/5 text-emerald-400 border-emerald-500/20 rounded-lg">
              {project.databaseTech}
            </Badge>
            {/* Map through a few main techs */}
            {topTech.map((tech, i) => (
              <Badge key={i} variant="secondary" className="bg-primary/5 text-primary border-none rounded-lg capitalize">
                {tech}
              </Badge>
            ))}
            <span className="text-xs text-muted-foreground self-center ml-1">
              +{project.usedLibraries.length} libs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}