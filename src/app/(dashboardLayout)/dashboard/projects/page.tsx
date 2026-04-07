import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VscAdd, VscProject, VscRepo, VscTrash, VscEdit, VscLinkExternal } from "react-icons/vsc";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <VscProject className="text-primary" />
            Projects
          </h1>
          <p className="text-muted-foreground text-sm">
            Total <span className="text-foreground font-mono font-bold">{projects.length}</span> deployments active in the system.
          </p>
        </div>

        <Link href="/dashboard/projects/new">
          <Button className="rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-transform">
            <VscAdd size={18} />
            Add New Project
          </Button>
        </Link>
      </header>

      {/* Projects Table Section */}
      <div className="bg-card/30 backdrop-blur-md border border-border rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted/50 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
              <tr>
                <th className="px-6 py-5">Project & Architecture</th>
                <th className="px-6 py-5">Stack & Complexity</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-28 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-4 opacity-40">
                      <VscRepo size={60} />
                      <p className="text-lg font-medium">No system records found.</p>
                      <p className="text-xs max-w-50">Initialize your first project deployment to see data.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-primary/5 transition-all group">
                    {/* Project Details with GIF/Thumbnail */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-muted overflow-hidden border border-border shadow-inner shrink-0 group-hover:border-primary/50 transition-colors">
                          {project.thumbnail ? (
                            <Image
                             height={600}
                             width={600}
                              src={project.thumbnail} 
                              alt="" 
                              className="object-cover w-full h-full hover:scale-110 transition-transform duration-500" 
                            />
                          ) : (
                            <div className="h-full flex items-center justify-center text-[10px] text-muted-foreground font-mono italic">EMPTY</div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
                            {project.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground/80 uppercase tracking-widest font-semibold">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Tech Stack & Complexity Indicator */}
                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="flex gap-1 flex-wrap">
                          {[...project.serverSideTech, ...project.clientSideTech].slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-[8px] px-1.5 py-0 bg-background/50 border-primary/20">
                              {tech}
                            </Badge>
                          ))}
                          {[...project.serverSideTech, ...project.clientSideTech].length > 3 && (
                            <span className="text-[9px] text-muted-foreground">+{[...project.serverSideTech, ...project.clientSideTech].length - 3}</span>
                          )}
                        </div>
                        {/* Visual Complexity Indicator */}
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`h-1 w-3 rounded-full transition-colors ${i < (project.complexity || 0) ? 'bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]' : 'bg-muted'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-5 text-center">
                      <Badge className={`${
                        project.status === 'Live' 
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      } text-[10px] font-bold`}>
                        {project.status || 'Dev'}
                      </Badge>
                    </td>

                    {/* Role Display */}
                    <td className="px-6 py-5">
                      <span className="text-xs font-medium text-muted-foreground italic">
                        { project.role || "Solo Project"}
                      </span>
                    </td>

                    {/* Action Controls */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-1 md:opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-2">
                        {project.liveLink && (
                          <Link href={project.liveLink} target="_blank">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:text-primary">
                              <VscLinkExternal size={18} />
                            </Button>
                          </Link>
                        )}
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:text-primary">
                          <VscEdit size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:text-destructive">
                          <VscTrash size={18} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer System Info */}
      <footer className="flex items-center justify-between px-2">
        <p className="text-[10px] text-muted-foreground italic md:hidden">
          Swipe left for system controls
        </p>
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em] ml-auto">
          System Node: Brahmanbaria_Core
        </p>
      </footer>
    </div>
  );
}