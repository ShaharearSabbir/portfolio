"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { VscSave, VscRocket, VscCode, VscBook, VscSymbolMethod } from "react-icons/vsc";
import { createProject } from "@/actions/projects.action";

export function AddProjectForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    role: "Full Stack Developer",
    thumbnail: "",
    shortDescription: "",
    fullDescription: "",

    clientSideTech: "",
    serverSideTech: "",
    usedLibraries: "", 
    topFeatures: "",
    futurePlans: "",
    
    databaseTech: "",
    authTech: "",
    complexity: 1,
    challenges: "",
    solutions: "",
    learningOutcomes: "",
    liveLink: "",
    githubClient: "",
    githubServer: "",
    isFeatured: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });

    const result = await createProject(data);
    console.log(result);
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50 rounded-2xl p-1 h-14">
          <TabsTrigger value="general" className="rounded-xl gap-2">
            <VscRocket /> Identity
          </TabsTrigger>
          <TabsTrigger value="tech" className="rounded-xl gap-2">
            <VscCode /> Stack
          </TabsTrigger>
          <TabsTrigger value="case-study" className="rounded-xl gap-2">
            <VscBook /> Case Study
          </TabsTrigger>
          <TabsTrigger value="links" className="rounded-xl gap-2">
            <VscSymbolMethod /> Links
          </TabsTrigger>
        </TabsList>

        {/* --- TAB 1: IDENTITY --- */}
        <TabsContent value="general" className="space-y-6 pt-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Mamarshop" className="rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <Label>URL Slug (lowercase-hyphens)</Label>
              <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="mamar-shop-v1" className="rounded-xl h-12 font-mono" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input name="category" value={formData.category} onChange={handleChange} placeholder="Full Stack / E-commerce" className="rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input name="role" value={formData.role} onChange={handleChange} className="rounded-xl h-12" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Top Features (Comma separated)</Label>
            <Input name="topFeatures" value={formData.topFeatures} onChange={handleChange} placeholder="Real-time Chat, Payment Gateway, SSR" className="rounded-xl h-12" />
          </div>
          <div className="space-y-2">
            <Label>Short Description</Label>
            <Textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} placeholder="A brief pitch for the project card..." className="rounded-2xl min-h-20" />
          </div>
        </TabsContent>

        {/* --- TAB 2: TECH STACK --- */}
        <TabsContent value="tech" className="space-y-6 pt-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Database Tech</Label>
              <Input name="databaseTech" value={formData.databaseTech} onChange={handleChange} placeholder="PostgreSQL / MongoDB" className="rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <Label>Auth Tech</Label>
              <Input name="authTech" value={formData.authTech} onChange={handleChange} placeholder="NextAuth / Clerk" className="rounded-xl h-12" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Client Side Tech</Label>
            <Input name="clientSideTech" value={formData.clientSideTech} onChange={handleChange} placeholder="Next.js, React, Tailwind" className="rounded-xl h-12" />
          </div>
          <div className="space-y-2">
            <Label>Server Side Tech</Label>
            <Input name="serverSideTech" value={formData.serverSideTech} onChange={handleChange} placeholder="Node.js, Prisma, Express" className="rounded-xl h-12" />
          </div>
          <div className="space-y-2">
            <Label>Used Libraries</Label>
            <Input name="usedLibraries" value={formData.usedLibraries} onChange={handleChange} placeholder="Framer Motion, Lucide React, Shadcn" className="rounded-xl h-12" />
          </div>
          <div className="flex items-center gap-6 p-4 border rounded-2xl bg-muted/20">
             <div className="flex-1 space-y-1">
                <Label>System Complexity (1-5)</Label>
                <p className="text-[10px] text-muted-foreground uppercase">Architecture difficulty</p>
             </div>
             <Input name="complexity" type="number" min="1" max="5" value={formData.complexity} onChange={handleChange} className="w-20 rounded-xl h-12 text-center font-bold" />
          </div>
        </TabsContent>

        {/* --- TAB 3: CASE STUDY --- */}
        <TabsContent value="case-study" className="space-y-6 pt-6 animate-in fade-in duration-300">
          <div className="space-y-2">
            <Label>Full Project Description</Label>
            <Textarea name="fullDescription" value={formData.fullDescription} onChange={handleChange} className="rounded-2xl min-h-30" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-red-400">Challenges</Label>
              <Textarea name="challenges" value={formData.challenges} onChange={handleChange} className="rounded-2xl min-h-25" />
            </div>
            <div className="space-y-2">
              <Label className="text-green-400">Solutions</Label>
              <Textarea name="solutions" value={formData.solutions} onChange={handleChange} className="rounded-2xl min-h-25" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Learning Outcomes</Label>
              <Textarea name="learningOutcomes" value={formData.learningOutcomes} onChange={handleChange} className="rounded-2xl min-h-25" />
            </div>
            <div className="space-y-2">
              <Label>Future Plans</Label>
              <Textarea name="futurePlans" value={formData.futurePlans} onChange={handleChange} placeholder="Comma separated plans..." className="rounded-2xl min-h-25" />
            </div>
          </div>
        </TabsContent>

        {/* --- TAB 4: LINKS & ASSETS --- */}
        <TabsContent value="links" className="space-y-6 pt-6 animate-in fade-in duration-300">
          <div className="space-y-2">
            <Label>Thumbnail URL</Label>
            <Input name="thumbnail" value={formData.thumbnail} onChange={handleChange} placeholder="https://res.cloudinary.com/..." className="rounded-xl h-12 font-mono text-xs" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Live Link</Label>
              <Input name="liveLink" value={formData.liveLink} onChange={handleChange} placeholder="https://..." className="rounded-xl h-12 font-mono text-xs" />
            </div>
            <div className="space-y-2">
              <Label>Featured Project</Label>
              <div className="flex items-center gap-3 h-12">
                <Switch 
                  checked={formData.isFeatured} 
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))} 
                />
                <span className="text-sm text-muted-foreground">Highlight on Home Page</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Github Client Repo</Label>
              <Input name="githubClient" value={formData.githubClient} onChange={handleChange} className="rounded-xl h-12 font-mono text-xs" />
            </div>
            <div className="space-y-2">
              <Label>Github Server Repo</Label>
              <Input name="githubServer" value={formData.githubServer} onChange={handleChange} className="rounded-xl h-12 font-mono text-xs" />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end pt-8 border-t border-white/5">
        <Button disabled={isLoading} type="submit" className="rounded-2xl h-14 px-12 gap-3 text-lg font-bold shadow-2xl shadow-primary/20">
          <VscSave size={20} />
          {isLoading ? "Synchronizing..." : "Inject into Database"}
        </Button>
      </div>
    </form>
  );
}