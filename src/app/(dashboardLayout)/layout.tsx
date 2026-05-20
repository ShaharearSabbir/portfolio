import { redirect } from "next/navigation";
import Link from "next/link";
import {
  VscLayers,
  VscProject,
  VscCode,
  VscSettingsGear,
  VscHome,
  VscComment,
} from "react-icons/vsc";
import { refreshSession } from "@/actions/auth.action";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { VscMail } from "react-icons/vsc";

const navLinks = [
  { name: "Overview", href: "/dashboard", icon: VscHome },
  { name: "Projects", href: "/dashboard/projects", icon: VscProject },
  { name: "Tech Stack", href: "/dashboard/skills", icon: VscLayers },
  { name: "Blog", href: "/dashboard/blog", icon: VscCode },
  { name: "Inbox", href: "/dashboard/inbox", icon: VscComment },
  { name: "Settings", href: "/dashboard/settings", icon: VscSettingsGear },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await refreshSession();

  // If the Refresh Token was deleted from PostgreSQL or expired, kick to login
  if (!session.success) {
    redirect("/login");
  }

  return (
    <div className="h-screen bg-background flex flex-col md:flex-row overflow-hidden">
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/50 backdrop-blur-xl h-screen sticky top-0">
        <div className="p-6 border-b border-border/50">
          <h2 className="text-sm font-bold tracking-widest uppercase opacity-50">
            Dashboard
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all group"
            >
              <link.icon className="text-xl group-hover:scale-110 transition-transform" />
              <span className="font-medium text-sm">{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <LogoutButton />
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-border/50 flex items-center justify-between px-6 bg-background/80 backdrop-blur-md z-20 shrink-0">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Shhaharear Rahman Sabbir
          </span>
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-bold">
            SR
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            {children}
          </div>
        </section>
      </main>

      {/* --- MOBILE BOTTOM NAV --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-card/80 backdrop-blur-2xl border-t border-border flex items-center justify-around px-2 pb-safe z-50">
        {navLinks.slice(0, 4).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-center justify-center gap-1 w-full h-full text-muted-foreground hover:text-primary transition-colors"
          >
            <link.icon size={22} />
            <span className="text-[10px] font-medium uppercase tracking-tighter">
              {link.name}
            </span>
          </Link>
        ))}
        {/* Mobile Settings Shortcut */}
        <Link
          href="/dashboard/settings"
          className="flex flex-col items-center justify-center gap-1 w-full h-full text-muted-foreground"
        >
          <VscSettingsGear size={22} />
          <span className="text-[10px] font-medium uppercase tracking-tighter">
            Admin
          </span>
        </Link>
      </nav>
    </div>
  );
}
