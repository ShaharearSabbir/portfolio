"use client";

import { useLanyardWS } from "use-lanyard";
import * as m from "motion/react-client";
import { memo } from "react";

const DISCORD_ID = "341980587218698240";

const PresenceBadge = () => {
  const presence = useLanyardWS(DISCORD_ID);

  // 1. Status Check
  const status = presence?.discord_status;
  // Green if Online, Idle, or DND
  const isOnline = status === "online" || status === "idle" || status === "dnd";

  const coding = presence?.activities.find(
    (a) =>
      a.name === "Visual Studio Code" ||
      a.application_id === "383226344970059776",
  );

  // 2. Dynamic Colors
  const dotColor = coding
    ? "bg-primary shadow-primary/50"
    : isOnline
      ? "bg-emerald-500 shadow-emerald-500/50"
      : "bg-zinc-500 shadow-none";

  const pingColor = coding
    ? "bg-primary"
    : isOnline
      ? "bg-emerald-500"
      : "hidden";

  return (
    <m.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: presence ? 1 : 0, x: presence ? 0 : 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-8 right-8 z-50 flex items-center gap-3 px-4 py-2.5 bg-card/40 backdrop-blur-xl border border-border/50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] select-none"
    >
      {/* Status Dot */}
      <div className="relative flex h-2.5 w-2.5 items-center justify-center">
        {isOnline && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full animate-ping opacity-40 ${pingColor}`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 transition-colors duration-500 shadow-lg ${dotColor}`}
        />
      </div>

      {/* Info Container */}
      <div className="flex flex-col min-w-22.5 overflow-hidden">
        <div className="flex items-center gap-2">
          <m.span
            key={coding ? "coding" : status}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-widest text-primary/90 whitespace-nowrap"
          >
            {coding ? "Live Coding" : isOnline ? "Online" : "Offline"}
          </m.span>

          {coding?.details && (
            <m.span
              key={coding.details}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] text-foreground/90 font-bold border-l border-border/50 pl-2 truncate max-w-25"
            >
              {coding.details}
            </m.span>
          )}
        </div>

        {coding?.state ? (
          <m.span
            key={coding.state}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[9px] text-muted-foreground font-medium leading-none mt-0.5 truncate max-w-37.5"
          >
            {coding.state}
          </m.span>
        ) : (
          <span className="text-[9px] text-muted-foreground leading-none mt-0.5 opacity-70">
            {isOnline ? "Available for chat" : "Back soon"}
          </span>
        )}
      </div>
    </m.div>
  );
};

export default memo(PresenceBadge);
