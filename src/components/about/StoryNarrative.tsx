import { Badge } from "@/components/ui/badge";

export function StoryNarrative({ projectCount }: { projectCount: number }) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-left duration-700">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
          The Philosophy
        </div>
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-foreground">
          Engineering <span className="text-primary">Scalability</span> <br /> 
          Beyond the Code.
        </h2>
      </div>

      <div className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
        <p className="relative">
          I am a <span className="text-foreground font-bold">MERN Stack Developer</span> driven 
          by the challenge of architecting scalable, data-driven applications. My approach 
          centers on creating seamless bridges between high-performance backends and 
          responsive, intuitive frontends.
        </p>
        
        <p>
          While many focus on "just making it work," I focus on <span className="text-foreground font-bold underline decoration-primary/30 underline-offset-4">how it scales</span>. 
          From implementing complex database relations in <span className="text-foreground font-semibold">Bloom</span>{" "}
           to handling state management in <span className="text-foreground font-semibold">Mamarshop</span>, 
          I treat every project as an opportunity to master system integrity and performance.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-12 pt-10 border-t border-border/50">
        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black text-foreground tracking-tighter">
              {projectCount < 10 ? `0${projectCount}` : projectCount}
            </span>
            <span className="text-primary font-bold text-xl">+</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50">Production Builds</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black text-foreground tracking-tighter">100</span>
            <span className="text-primary font-bold text-xl">%</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50">Commitment to Growth</p>
        </div>
      </div>
    </div>
  );
}