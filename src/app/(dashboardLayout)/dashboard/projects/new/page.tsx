import { VscArrowLeft, VscNewFile } from "react-icons/vsc";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AddProjectForm } from "@/components/dashboard/AddProjectForm";

export default function NewProjectPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Breadcrumbs / Back */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full h-10 w-10 p-0"
          >
            <VscArrowLeft size={20} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <VscNewFile className="text-primary" />
            Initialize New Deployment
          </h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
            Direct Database Injection Mode
          </p>
        </div>
      </div>

      <div className="bg-card/30 backdrop-blur-2xl border border-border rounded-[2.5rem] p-8 shadow-2xl">
        <AddProjectForm />
      </div>
    </div>
  );
}
