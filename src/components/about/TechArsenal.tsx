
import { Skill } from "@/generated/client/client";
import { VscTerminal, VscRocket } from "react-icons/vsc";

export function TechArsenal({ skills }: { skills: Skill[] }) {
  const currentStack = skills.filter((s) => s.status === "WORKING_WITH");
  const learningStack = skills.filter((s) => s.status === "LEARNING");

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right duration-700">
      {/* Current Stack */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <VscTerminal className="text-primary" size={24} />
          <h3 className="text-xl font-bold uppercase tracking-widest">Active Arsenal</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {currentStack.map((skill) => (
            <div 
              key={skill.id}
              className="px-4 py-2 rounded-2xl bg-muted/50 border border-white/5 hover:border-primary/40 transition-all cursor-default"
            >
              <span className="font-semibold text-sm">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Stack */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4 text-orange-400">
          <VscRocket size={24} />
          <h3 className="text-xl font-bold uppercase tracking-widest">Next Horizons</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {learningStack.map((skill) => (
            <div 
              key={skill.id}
              className="px-4 py-2 rounded-2xl bg-orange-500/5 border border-orange-500/10 hover:border-orange-500/30 transition-all"
            >
              <span className="text-sm italic opacity-80">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}