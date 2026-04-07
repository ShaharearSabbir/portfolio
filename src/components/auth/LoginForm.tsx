"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VscRefresh } from "react-icons/vsc";
import { toast } from "sonner";
import { sendAdminOTP, verifyAdminOTP } from "@/actions/auth.action";

export function LoginForm() {
  const [otp, setOtp] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const router = useRouter();

  // Handle resend timer countdown
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000,
      );
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (otp.length !== 6) return;

    setIsPending(true);

    // IMPORTANT: Convert the string input to a Number for the Prisma query
    const res = await verifyAdminOTP(Number(otp));

    if (res.success) {
      toast.success("Access Granted");
      // Use a more secure session flag if possible, but this works for a personal dashboard
      localStorage.setItem("portfolio_admin", "true");
      router.push("/dashboard");
    } else {
      toast.error(res.message || "Invalid security code");
      setOtp("");
    }
    setIsPending(false);
  };

  const handleResend = async () => {
    if (resendCountdown > 0) return;

    setIsPending(true);
    const res = await sendAdminOTP();

    if (res.success) {
      toast.success("New code sent to your email");
      setResendCountdown(60); // Disable resend for 60 seconds
    } else {
      toast.error("Failed to send code. Please try again.");
    }
    setIsPending(false);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleVerify} className="space-y-4">
        <Input
          type="text"
          inputMode="numeric" // Better for mobile keyboards
          maxLength={6}
          placeholder="000000"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="h-16 text-center text-3xl tracking-[0.6em] font-mono bg-background/50 border-border rounded-2xl focus:ring-primary transition-all select-none"
          autoFocus
          disabled={isPending}
        />
        <Button
          type="submit"
          disabled={isPending || otp.length < 6}
          className="w-full h-12 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
        >
          {isPending ? "Verifying..." : "Unlock Dashboard"}
        </Button>
      </form>

      <button
        onClick={handleResend}
        type="button"
        disabled={isPending || resendCountdown > 0}
        className="flex items-center justify-center gap-2 w-full text-xs text-muted-foreground hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <VscRefresh className={isPending ? "animate-spin" : ""} />
        {resendCountdown > 0
          ? `Wait ${resendCountdown}s to resend`
          : "Resend security code"}
      </button>
    </div>
  );
}
