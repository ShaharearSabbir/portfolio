import { Badge } from "@/components/ui/badge";

export function StoryNarrative({ projectCount }: { projectCount: number }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
      <div className="space-y-4">
        <Badge className="bg-primary/10 text-primary border-none rounded-full px-4 py-1 hover:bg-primary/20">
          Systems Engineering
        </Badge>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
          Building Systems <br className="hidden lg:block" />
          with <span className="text-primary italic">Type-Safe</span> Precision.
        </h2>
      </div>

      <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
        <p>
          I am a <span className="text-foreground font-bold">MERN Stack Developer</span> driven 
          by the challenge of architecting scalable, data-driven applications. My approach 
          centers on creating seamless bridges between high-performance backends and 
          responsive, intuitive frontends.
        </p>
        <p>
          While many focus on &quot;just making it work,&quot; I focus on **how it scales**. 
          From implementing complex database relations in <span className="italic text-foreground">Bloom</span> 
          to handling state management in <span className="italic text-foreground">Mamarshop</span>, 
          I treat every project as an opportunity to master system integrity and performance.
        </p>
        <p className="text-base md:text-lg italic opacity-80 border-l-2 border-primary/20 pl-4">
          I am currently looking to bring my focus on clean architecture and 
          modern full-stack patterns to a forward-thinking engineering team.
        </p>
      </div>

      <div className="pt-8 flex gap-12 border-t border-white/5">
        <div>
          <p className="text-4xl font-black text-primary tracking-tighter">
            {projectCount < 10 ? `0${projectCount}` : projectCount}
          </p>
          <p className="text-xs uppercase tracking-widest opacity-50 mt-1">Full-Stack Repos</p>
        </div>
        <div>
          <p className="text-4xl font-black text-primary tracking-tighter">100%</p>
          <p className="text-xs uppercase tracking-widest opacity-50 mt-1">Dedicated Growth</p>
        </div>
      </div>
    </div>
  );
}