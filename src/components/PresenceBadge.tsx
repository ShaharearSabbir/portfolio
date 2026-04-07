// components/hero/PresenceBadge.tsx
"use client";

import { useLanyardWS } from "use-lanyard";
import * as m from "motion/react-client";
import { memo } from "react";

const DISCORD_ID = "341980587218698240";

const PresenceBadge = () => {
  const presence = useLanyardWS(DISCORD_ID);

  const isOnline =
    presence?.discord_status && presence.discord_status !== "offline";

  // Find VS Code activity - looking for specific app name or Type 0 (Playing)
  const coding = presence?.activities.find(
    (a) => a.name === "Visual Studio Code" || a.type === 0,
  );

  return (
    <m.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-8 right-8 z-10 flex items-center gap-3 px-4 py-2.5 bg-card/40 backdrop-blur-xl border border-border/50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-primary/30 transition-colors duration-500 group"
    >
      {/* Status Indicator with Dynamic Glow */}
      <div className="relative flex h-2.5 w-2.5">
        {isOnline && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 ${
              coding ? "bg-primary" : "bg-emerald-500"
            }`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 transition-colors duration-500 shadow-[0_0_10px_rgba(0,0,0,0.5)] ${
            coding
              ? "bg-primary shadow-primary/50"
              : isOnline
                ? "bg-emerald-500 shadow-emerald-500/50"
                : "bg-muted-foreground"
          }`}
        />
      </div>

      {/* Info Container */}
      <div className="flex flex-col min-w-25 overflow-hidden">
        <div className="flex items-center gap-2">
          {/* Main Status Label */}
          <m.span
            key={coding ? "coding" : "status"} // Forces re-animation on state change
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-widest text-primary/90"
          >
            {coding ? "Live Coding" : isOnline ? "Online" : "Offline"}
          </m.span>

          {/* VS Code: Details (Usually the Project/Folder Name) */}
          {coding?.details && (
            <m.span
              key={coding.details}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] text-foreground/90 font-bold border-l border-border/50 pl-2 truncate max-w-[140px]"
            >
              {coding.details}
            </m.span>
          )}
        </div>

        {/* VS Code: State (Usually the current File or Action) */}
        {coding?.state && (
          <m.span
            key={coding.state}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[9px] text-muted-foreground font-medium leading-none mt-0.5 truncate max-w-[200px]"
          >
            {coding.state}
          </m.span>
        )}

        {/* Fallback for when Online but not Coding */}
        {!coding && isOnline && (
          <span className="text-[9px] text-muted-foreground leading-none mt-0.5">
            Ready for new challenges
          </span>
        )}
      </div>

      {/* Subtle "Live" Pulse for the text on mobile/hover */}
      {coding && (
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-bounce absolute inline-flex h-full w-full rounded-full bg-primary opacity-20"></span>
        </span>
      )}
    </m.div>
  );
};

export default memo(PresenceBadge);
