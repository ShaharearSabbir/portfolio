import Navbar from "@/components/Navbar/Navbar";
import PresenceBadge from "@/components/PresenceBadge";
import ChatWidget from "@/components/ChatWidget";
import { prisma } from "@/lib/prisma";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const experienceCount = await prisma.experience.count();

  return (
    <section>
      <PresenceBadge />
      <Navbar experienceCount={experienceCount} />
      {children}
      <ChatWidget />
    </section>
  );
}
