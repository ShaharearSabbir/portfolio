import { sendAdminOTP } from "@/actions/auth.action";
import { LoginForm } from "@/components/auth/LoginForm";
import { VscShield } from "react-icons/vsc";
import { cookies } from "next/headers";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const hasRefreshToken = cookieStore.has("refreshToken");

  // Only trigger the automated email if we don't have a session
  // This prevents spamming your inbox on every accidental page refresh
  if (!hasRefreshToken) {
    await sendAdminOTP();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background relative px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute w-125 h-125 bg-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="w-full max-w-95 bg-card/40 backdrop-blur-2xl border border-border p-10 rounded-[2.5rem] shadow-2xl text-center space-y-8">
        <header className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20">
              <VscShield size={40} />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tighter text-foreground">
              System Access
            </h1>
            <p className="text-sm text-muted-foreground">
              Security code sent to <br />
              <span className="text-primary font-medium italic underline decoration-primary/30 underline-offset-4">
                dev@shaharear.top
              </span>
            </p>
          </div>
        </header>

        <LoginForm />

        <footer className="pt-4 border-t border-border/50">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
              Secure Architect Environment
            </p>
            <p className="text-[9px] text-primary/40 font-mono">
              BRAHMANBARIA_NODE_01
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
