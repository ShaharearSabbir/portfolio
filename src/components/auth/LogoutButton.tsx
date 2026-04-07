"use client";

import { useTransition } from "react";
import { terminateSession } from "@/actions/auth.action";
import { VscSignOut } from "react-icons/vsc";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => terminateSession())}
      disabled={isPending}
      className="flex items-center gap-3 w-full px-4 py-3 text-destructive hover:bg-destructive/10 rounded-xl transition-all disabled:opacity-50"
    >
      <VscSignOut className={isPending ? "animate-pulse" : ""} size={20} />
      <span className="text-sm font-medium">
        {isPending ? "Clearing Session..." : "Terminate Session"}
      </span>
    </button>
  );
}
