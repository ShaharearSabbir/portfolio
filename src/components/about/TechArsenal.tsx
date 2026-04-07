"use client";

import { Skill } from "@/generated/client/client";
import { VscTerminal, VscRocket } from "react-icons/vsc";
import Image from "next/image";
import { useState } from "react";


const getIconUrl = (name: string, isDark: boolean) => {
  const slug = name
    .toLowerCase()
    .replace(/\./g, "dot")
    .replace(/\+/g, "plus")
    .replace(/ /g, "");

  // Returns the icon with your primary emerald color or white
  return `https://cdn.simpleicons.org/${slug}/${isDark ? "white" : "000"}`;
};

export function TechArsenal({ skills }: { skills: Skill[] }) {
  const currentStack = skills.filter((s) => s.status === "WORKING_WITH");
  const learningStack = skills.filter((s) => s.status === "LEARNING");

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right duration-700">
      {/* Current Stack */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border/50 pb-4">
          <VscTerminal className="text-primary" size={24} />
          <h3 className="text-xl font-bold uppercase tracking-widest text-foreground">
            Active Arsenal
          </h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {currentStack.map((skill) => (
            <SkillBadge key={skill.id} skill={skill} color="primary" />
          ))}
        </div>
      </div>

      {/* Learning Stack */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border/50 pb-4 text-orange-400">
          <VscRocket size={24} />
          <h3 className="text-xl font-bold uppercase tracking-widest">
            Next Horizons
          </h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {learningStack.map((skill) => (
            <SkillBadge key={skill.id} skill={skill} color="orange" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Sub-component to handle Image Fallback logic
function SkillBadge({
  skill,
  color,
}: {
  skill: Skill;
  color: "primary" | "orange";
}) {
  const [error, setError] = useState(false);

  // 1. Try DB Icon 2. Try CDN 3. Hide if both fail
  const iconSrc = skill.iconUrl || getIconUrl(skill.name, true);

  return (
    <div
      className={`group flex items-center gap-3 px-4 py-2 rounded-2xl bg-card/40 border border-border/50 hover:border-${color}/40 transition-all cursor-default shadow-sm`}
    >
      {!error && (
        <Image
          src={iconSrc}
          alt=""
          width={16}
          height={16}
          unoptimized
          className="w-4 h-4 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
          onError={() => setError(true)} // If Google/CDN fails, don't show broken image
        />
      )}
      <span
        className={`text-sm font-semibold ${color === "orange" ? "italic opacity-80" : ""}`}
      >
        {skill.name}
      </span>
    </div>
  );
}
