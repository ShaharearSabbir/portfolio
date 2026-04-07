"use client";

import * as React from "react";
import { VscArrowRight, VscClose } from "react-icons/vsc";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Project } from "@/generated/client/client";
import { ProjectCard } from "./ProjectCard";
import { ProjectDetail } from "./ProjectDetail";

export function ProjectArchive({ projects }: { projects: Project[] }) {
  return (
    <Dialog>
      <DialogTrigger className="group gap-2 text-primary p-0 h-auto font-bold text-lg">
          View Full Archive{" "}
          <VscArrowRight className="group-hover:translate-x-1 transition-transform" />
      </DialogTrigger>

      <DialogContent className="min-w-[90vw] h-[90vh] overflow-y-auto p-0 border-none bg-background sm:rounded-3xl">
        <div className="sticky top-0 z-50 flex items-center justify-between p-6 bg-background/80 backdrop-blur-md border-b">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tighter">
              Project <span className="text-primary italic">Archive</span>
            </DialogTitle>
          </DialogHeader>

          <DialogClose>
            <Button variant="ghost" size="icon" className="rounded-full">
              <VscClose className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </div>

        <div className="p-8">
          {/* Your Grid of Cards here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectDetail key={project.id} project={project}>
                <ProjectCard project={project} />
              </ProjectDetail>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
