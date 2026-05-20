"use client";

import * as React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ExternalLink,
  Code2,
  Database,
  ShieldCheck,
  Wrench,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/generated/client/browser";

export function ProjectDetail({
  project,
  children,
  className,
}: {
  project: Project;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`cursor-pointer h-full ${className || ""}`}>
          {children}
        </div>
      </DialogTrigger>

      <DialogContent className="min-w-[90vw] h-[92vh] overflow-y-auto p-0 bg-background border-border select-none">
        {/* Header Image / Thumbnail */}
        <div className="relative w-full aspect-video md:aspect-21/9 bg-muted">
          <Image
            src={project.thumbnail || ""}
            alt={project.name}
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />

          {/* Status Badge Overlay */}
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
            {project.status}
          </Badge>
        </div>

        <div className="px-6 md:px-12 pb-12 -mt-20 relative z-10 space-y-10">
          {/* Main Title & Role */}
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-4xl md:text-6xl font-black tracking-tighter">
              {project.name}
            </DialogTitle>
            {project.role && (
              <p className="text-xl text-primary font-medium tracking-tight">
                {project.role}
              </p>
            )}
          </DialogHeader>

          {/* Technical Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left Column: The Narrative (Challenges & Solutions) */}
            <div className="md:col-span-2 space-y-8">
              <section className="space-y-4">
                <h4 className="text-2xl font-bold flex items-center gap-2">
                  <Code2 className="text-primary w-6 h-6" /> Overview
                </h4>
                <p className="text-muted-foreground leading-relaxed text-lg italic border-l-4 border-primary/20 pl-4">
                  {project.shortDescription}
                </p>
                <div className="text-muted-foreground leading-relaxed prose prose-invert max-w-none">
                  {project.fullDescription}
                </div>
              </section>

              {/* Engineering Logic Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-5 rounded-2xl bg-secondary/30 border border-border/50">
                  <h5 className="font-bold mb-2 flex items-center gap-2 text-red-400">
                    <Wrench className="w-4 h-4" /> Challenges
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    {project.challenges}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20">
                  <h5 className="font-bold mb-2 flex items-center gap-2 text-green-400">
                    <Lightbulb className="w-4 h-4" /> Solutions
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    {project.solutions}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Tech Arsenal & Links */}
            <div className="space-y-8">
              {/* Links Card */}
              <div className="flex flex-col gap-3">
                {project.liveLink && (
                  <Button asChild className="w-full justify-between group/link" size="lg">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <span>Live Preview</span>
                      <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                    </a>
                  </Button>
                )}
                <div className="grid grid-cols-2 gap-2">
                  {project.githubClient && (
                    <Button variant="outline" size="sm">
                      <a href={project.githubClient} target="_blank">
                        Client Repo
                      </a>
                    </Button>
                  )}
                  {project.githubServer && (
                    <Button variant="outline" size="sm">
                      <a href={project.githubServer} target="_blank">
                        Server Repo
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Stack Details */}
              <div className="space-y-6 bg-card p-6 rounded-3xl border border-border">
                <h4 className="font-bold uppercase text-xs tracking-[0.2em] text-muted-foreground">
                  Technical Arsenal
                </h4>

                <StackItem
                  icon={<Code2 size={16} />}
                  label="Frontend"
                  items={project.clientSideTech}
                />
                <StackItem
                  icon={<ShieldCheck size={16} />}
                  label="Backend"
                  items={project.serverSideTech}
                />
                <StackItem
                  icon={<Database size={16} />}
                  label="Database"
                  items={[project.databaseTech]}
                />
                {project.authTech && (
                  <StackItem
                    icon={<ShieldCheck size={16} />}
                    label="Auth"
                    items={[project.authTech]}
                  />
                )}
                <StackItem
                  icon={<Wrench size={16} />}
                  label="Libraries"
                  items={project.usedLibraries}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper component for the tech list
function StackItem({
  icon,
  label,
  items,
}: {
  icon: React.ReactNode;
  label: string;
  items: string[];
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs font-bold text-primary">
        {icon} <span>{label}</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {items.map((item) => (
          <Badge
            key={item}
            variant="secondary"
            className="text-[10px] font-mono"
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
